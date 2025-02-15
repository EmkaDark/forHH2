import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { createComment } from "../controllers/comment.js";
const router = new Router();

router.post("/comments/:id", checkAuth, createComment);

export default router;
