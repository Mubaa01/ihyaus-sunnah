import express from "express";
import { login, logout, changePassword, forgotPassword, resetPassword, generateNewSecretKey, resetSecretKey, changeSecretKey, getSecretKeyStatus, setCustomSecretKey } from "../controllers/authController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Protected routes (require authentication)
router.post("/change-password", authenticate, changePassword);

// Secret key management routes (admin/director only)
router.post("/generate-secret-key", authenticate, generateNewSecretKey);
router.post("/reset-secret-key", authenticate, resetSecretKey);
router.post("/change-secret-key", authenticate, changeSecretKey);
router.post("/set-secret-key", authenticate, setCustomSecretKey);
router.get("/secret-key-status", authenticate, getSecretKeyStatus);

export default router;