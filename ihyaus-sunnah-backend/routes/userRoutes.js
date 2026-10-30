import express from "express";
import {
  getCurrentUser,
  getAllUsers,
  getUserById,
  updateCurrentUser,
  updateUserRole,
  toggleUserActive,
  deleteUser
} from "../controllers/userController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";
import { authorizeCrud } from "../middleware/crudAuthorization.js";

const router = express.Router();

// All user routes require authentication and admin/director role
router.use(authenticate);
router.use(authorize(["director", "admin"]));

// Get all users
router.get("/", getAllUsers);

// Current authenticated profile
router.get("/me/profile", getCurrentUser);
router.patch("/me/profile", updateCurrentUser);

// Get single user
router.get("/:id", getUserById);

// Update user role (requires director or admin role)
router.patch("/:id/role", authorizeCrud, updateUserRole);

// Toggle user active status (requires director or admin role)
router.patch("/:id/active", authorizeCrud, toggleUserActive);

// Delete user (requires director or admin role)
router.delete("/:id", authorizeCrud, deleteUser);

export default router;
