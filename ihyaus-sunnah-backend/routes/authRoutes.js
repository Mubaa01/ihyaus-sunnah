import express from "express";
import { login, logout, changePassword, forgotPassword, resetPassword, getSession } from "../controllers/authController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Protected routes (require authentication)
router.post("/change-password", authenticate, changePassword);
router.get("/session", authenticate, getSession);

export default router;
