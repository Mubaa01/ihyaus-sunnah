import express from "express";

import {
  createCompletedMajlis,
  getAllCompletedMajlis,
  getSingleCompletedMajlis,
  updateCompletedMajlis,
  deleteCompletedMajlis,
} from "../controllers/completedMajlisController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeCrud } from "../middleware/crudAuthorization.js";

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
  authorizeCrud,
  createCompletedMajlis
);

router.patch(
  "/:id",
  authenticate,
  authorizeCrud,
  updateCompletedMajlis
);

router.delete(
  "/:id",
  authenticate,
  authorizeCrud,
  deleteCompletedMajlis
);

export default router;
