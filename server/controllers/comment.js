import Comment from "../models/Comment.js";
import Post from "../models/post.js";
export const createComment = async (req, res) => {
  try {
    const { postId, comment } = req.body;
    console.log(postId, comment);
    if (!comment) {
      return res.json({ message: "Напиши коммент !" });
    }

    const newComment = new Comment({ comment });
    await newComment.save();
    console.log(postId, comment, "awfafwawf");
    try {
      await Post.findByIdAndUpdate(postId, {
        $push: { comments: newComment._id },
      });
    } catch (error) {
      console.log(error);
    }
    console.log(newComment);
    res.json(newComment);
  } catch (error) {
    res.json({ message: "Ошибка в создании комментария!" });
  }
};
