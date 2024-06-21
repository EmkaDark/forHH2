import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import {
  createPost,
  getAll,
  getById,
  getMyPosts,
  removePost,
  updatePost,
  getPostComments,
} from "../controllers/posts.js";
const router = new Router();

router.post("/posts", checkAuth, createPost);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/posts/:id", checkAuth, updatePost);
router.get("/posts/user/me", checkAuth, getMyPosts);
router.delete("/posts/:id", checkAuth, removePost);
// get Comments
router.get("/posts/comments/:id", getPostComments);
export default router;
