import express from "express";
import {
  createMajlis,
  getAllMajlis,
  updateMajlis,
  deleteMajlis
} from "../controllers/majlisController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { verifyCrudOperation } from "../middleware/secretKeyMiddleware.js";

const router = express.Router();

// GET is public
router.get("/", getAllMajlis);

// POST, PATCH, DELETE require auth
router.post("/", authenticate, verifyCrudOperation, createMajlis);
router.patch("/:id", authenticate, verifyCrudOperation, updateMajlis);
router.delete("/:id", authenticate, verifyCrudOperation, deleteMajlis);

export default router;
