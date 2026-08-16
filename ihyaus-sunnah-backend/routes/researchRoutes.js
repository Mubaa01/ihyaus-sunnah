import express from "express";
import {
  createResearch,
  getResearchById,
  getAllResearch,
  getTelegramResearchPdf,
  getTelegramResearchUrl,
  ingestTelegramResearch,
  updateResearch,
  deleteResearch
} from "../controllers/researchController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeCrud } from "../middleware/crudAuthorization.js";

const router = express.Router();

// GET is public
router.get("/", getAllResearch);
router.get("/telegram/webhook", (req, res) => res.status(405).json({ success: false, message: "Use POST for Telegram webhooks" }));
router.post("/telegram/webhook", ingestTelegramResearch);
router.get("/:id/pdf", getTelegramResearchPdf);
router.get("/:id/telegram-url", getTelegramResearchUrl);
router.get("/:id", getResearchById);

// POST, PATCH, DELETE require auth
router.post("/", authenticate, authorizeCrud, createResearch);
router.patch("/:id", authenticate, authorizeCrud, updateResearch);
router.delete("/:id", authenticate, authorizeCrud, deleteResearch);

export default router;
