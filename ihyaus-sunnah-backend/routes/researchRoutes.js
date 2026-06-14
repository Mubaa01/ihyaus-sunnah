import express from "express";
import {
  createResearch,
  getResearchById,
  getAllResearch,
  getTelegramResearchUrl,
  ingestTelegramResearch,
  updateResearch,
  deleteResearch
} from "../controllers/researchController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { verifyCrudOperation } from "../middleware/secretKeyMiddleware.js";

const router = express.Router();

// GET is public
router.get("/", getAllResearch);
router.get("/telegram/webhook", (req, res) => res.status(405).json({ success: false, message: "Use POST for Telegram webhooks" }));
router.post("/telegram/webhook", ingestTelegramResearch);
router.get("/:id/telegram-url", getTelegramResearchUrl);
router.get("/:id", getResearchById);

// POST, PATCH, DELETE require auth
router.post("/", authenticate, verifyCrudOperation, createResearch);
router.patch("/:id", authenticate, verifyCrudOperation, updateResearch);
router.delete("/:id", authenticate, verifyCrudOperation, deleteResearch);

export default router;
