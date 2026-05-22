import express from "express";

import {
  createCompletedMajlis,
  getAllCompletedMajlis,
  getSingleCompletedMajlis,
  updateCompletedMajlis,
  deleteCompletedMajlis,
} from "../controllers/completedMajlisController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { verifyCrudOperation } from "../middleware/secretKeyMiddleware.js";

const router = express.Router();


// =========================
// PUBLIC ROUTES
// =========================
router.get("/", getAllCompletedMajlis);
router.get("/:id", getSingleCompletedMajlis);


// =========================
// ADMIN ROUTES
// =========================
router.post(
  "/",
  authenticate,
  verifyCrudOperation,
  createCompletedMajlis
);

router.patch(
  "/:id",
  authenticate,
  verifyCrudOperation,
  updateCompletedMajlis
);

router.delete(
  "/:id",
  authenticate,
  verifyCrudOperation,
  deleteCompletedMajlis
);

export default router;