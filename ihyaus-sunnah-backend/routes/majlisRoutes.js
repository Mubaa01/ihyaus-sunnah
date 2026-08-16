import express from "express";

import {
  createMajlis,
  getAllMajlis,
  getSingleMajlis,
  updateMajlis,
  deleteMajlis,
} from "../controllers/majlisController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeCrud } from "../middleware/crudAuthorization.js";

const router = express.Router();


// =========================
// PUBLIC ROUTES
// =========================
router.get("/", getAllMajlis);
router.get("/:id", getSingleMajlis);


// =========================
// PROTECTED ROUTES (ADMIN)
// =========================
router.post("/", authenticate, authorizeCrud, createMajlis);

router.patch("/:id", authenticate, authorizeCrud, updateMajlis);

router.delete("/:id", authenticate, authorizeCrud, deleteMajlis);

export default router;
