import express from "express";
import {
  createResearch,
  getAllResearch,
  updateResearch,
  deleteResearch
} from "../controllers/researchController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { verifyCrudOperation } from "../middleware/secretKeyMiddleware.js";

const router = express.Router();

// GET is public
router.get("/", getAllResearch);

// POST, PATCH, DELETE require auth
router.post("/", authenticate, verifyCrudOperation, createResearch);
router.patch("/:id", authenticate, verifyCrudOperation, updateResearch);
router.delete("/:id", authenticate, verifyCrudOperation, deleteResearch);

export default router;
