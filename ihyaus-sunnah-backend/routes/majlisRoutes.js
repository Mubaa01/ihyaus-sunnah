import express from "express";

import {
  createMajlis,
  getAllMajlis,
  getSingleMajlis,
  updateMajlis,
  deleteMajlis,
} from "../controllers/majlisController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { verifyCrudOperation } from "../middleware/secretKeyMiddleware.js";

const router = express.Router();


// =========================
// PUBLIC ROUTES
// =========================
router.get("/", getAllMajlis);
router.get("/:id", getSingleMajlis);


// =========================
// PROTECTED ROUTES (ADMIN)
// =========================
router.post("/", authenticate, verifyCrudOperation, createMajlis);

router.patch("/:id", authenticate, verifyCrudOperation, updateMajlis);

router.delete("/:id", authenticate, verifyCrudOperation, deleteMajlis);

export default router;