import { Router } from "express";
import { register, login, getMe } from "../controllers/auth.js";
import { checkAuth } from "../utils/checkAuth.js";
const router = new Router();

// Register
router.post("/auth/register", register);

// Login
router.post("/auth/login", login);

// GetMe
router.get("/auth/me", checkAuth, getMe);

export default router;
