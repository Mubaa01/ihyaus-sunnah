import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUserRole,
  toggleUserActive,
  deleteUser
} from "../controllers/userController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";
import { verifyCrudOperation } from "../middleware/secretKeyMiddleware.js";

const router = express.Router();

// All user routes require authentication and admin/director role
router.use(authenticate);
router.use(authorize(["director", "admin"]));

// Get all users (READ - no secret key needed)
router.get("/", getAllUsers);

// Get single user (READ - no secret key needed)
router.get("/:id", getUserById);

// Update user role (UPDATE - requires secret key)
router.patch("/:id/role", verifyCrudOperation, updateUserRole);

// Toggle user active status (UPDATE - requires secret key)
router.patch("/:id/active", verifyCrudOperation, toggleUserActive);

// Delete user (DELETE - requires secret key)
router.delete("/:id", verifyCrudOperation, deleteUser);

export default router;
