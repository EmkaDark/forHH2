import mongoose from "mongoose";
import Post from "../models/post.js";
import User from "../models/User.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import Comment from "../models/Comment.js";
export const createPost = async (req, res) => {
  try {
    const { title, text } = req.body;

    const user = await User.findById(req.userId);

    if (req.files) {
      let filename = Date.now().toString() + req.files.image.name;
      const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.image.mv(path.join(__dirname, "..", "uploads", filename));

      const newPostWithImage = new Post({
        username: user.username,
        title,
        text,
        imgUrl: filename,
        author: req.userId,
      });

      await newPostWithImage.save();
      await User.findByIdAndUpdate(req.userId, {
        $push: {
          posts: newPostWithImage,
        },
      });
      return res.json(newPostWithImage);
    }

    const newPostWithOutImage = new Post({
      usernme: user.username,
      title,
      text,
      imgUrl: "",
      author: req.userId,
    });
    await newPostWithOutImage.save();
    await User.findByIdAndUpdate(req.userId, {
      $push: {
        posts: newPostWithOutImage,
      },
    });
    return res.json(newPostWithOutImage);
  } catch (error) {
    res.json({ message: "Что-то пошло не так!" });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await Post.find().sort("-createdAt");
    const popularPosts = await Post.find().limit(5).sort("-views");

    if (!posts) {
      return res.json({ message: "Постов нет!" });
    }

    res.json({ posts, popularPosts });
  } catch (error) {
    res.json({ message: "Что то пошло не так!" });
  }
};

export const getById = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $inc: { views: 1 },
      }
    );
    res.json(post);
  } catch (error) {
    res.json({ message: "Что то пошло не так!" });
  }
};
export const getMyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const list = await Promise.all(
      user.posts.map((post) => {
        return Post.findById({ _id: post._id });
      })
    );
    console.log(list, "posts");
    res.json(list);
  } catch (error) {
    res.json({ message: "Что то пошло не так!" });
  }
};

export const removePost = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      res.json({ message: "Такого поста не существкет!" });
    }

    await User.findByIdAndUpdate(req.userId, {
      $pull: { posts: req.params.id },
    });
    console.log(list, "posts");
    res.json({ message: "Пост был Удален!" });
  } catch (error) {
    res.json({ message: "Что то пошло не так!" });
  }
};
export const updatePost = async (req, res) => {
  try {
    const { title, text, id } = req.body;
    const post = await Post.findByIdAndUpdate(id);
    if (req.files) {
      let filename = Date.now().toString() + req.files.image.name;
      const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.image.mv(path.join(__dirname, "..", "uploads", filename));
      post.imgUrl = filename || "";
    }
    post.title = title;
    post.text = text;
    await post.save();
    console.log(list, "posts");
    res.json(post);
  } catch (error) {
    res.json({ message: "Что то пошло не так!" });
  }
};

// getPostComments
export const getPostComments = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const list = await Promise.all(
      post.comments.map((comment) => {
        return Comment.findById(comment);
      })
    );
    res.json(list);
  } catch (error) {
    res.json({ message: "Что то пшло не так" });
  }
};
