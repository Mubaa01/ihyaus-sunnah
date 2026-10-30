import express from "express";
import { login, logout, changePassword, forgotPassword, resetPassword, getSession } from "../controllers/authController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { authRateLimiter } from "../middleware/rateLimiters.js";

const router = express.Router();

router.post("/login", authRateLimiter, login);
router.post("/logout", logout);
router.post("/forgot-password", authRateLimiter, forgotPassword);
router.post("/reset-password", authRateLimiter, resetPassword);

router.post("/change-password", authenticate, changePassword);
router.get("/session", authenticate, getSession);

export default router;
