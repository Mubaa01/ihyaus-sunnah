import express from "express";
import {
  createProgram,
  getAllPrograms,
  getProgramBySlug,
  updateProgram,
  deleteProgram
} from "../controllers/programController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { verifyCrudOperation } from "../middleware/secretKeyMiddleware.js";

const router = express.Router();

// Public routes (GET endpoints)
router.get("/", getAllPrograms);
router.get("/:slug", getProgramBySlug);

// Protected routes (POST, PATCH, DELETE)
router.post("/", authenticate, verifyCrudOperation, createProgram);
router.patch("/:id", authenticate, verifyCrudOperation, updateProgram);
router.delete("/:id", authenticate, verifyCrudOperation, deleteProgram);

export default router;
