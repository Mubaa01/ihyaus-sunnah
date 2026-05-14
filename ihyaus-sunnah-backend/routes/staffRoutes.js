import express from "express";
import {
  createStaff,
  getAllStaff,
  getFilteredStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
  deleteAllStaff
} from "../controllers/staffController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";
import { verifyCrudOperation } from "../middleware/secretKeyMiddleware.js";

const router = express.Router();

// GET routes are public (READ - no authentication needed)
router.get("/", getAllStaff);
router.get("/filter", getFilteredStaff);
router.get("/:id", getStaffById);

// All other routes require authentication
router.use(authenticate);

// POST, PATCH, DELETE routes require director or admin role AND secret key
router.post("/", verifyCrudOperation, createStaff);
router.patch("/:id", verifyCrudOperation, updateStaff);

// DELETE routes require director role and secret key
router.delete("/:id", verifyCrudOperation, deleteStaff);
router.delete("/", verifyCrudOperation, deleteAllStaff);

export default router;