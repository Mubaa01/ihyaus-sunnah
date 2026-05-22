import express from "express";
import {
  createMedia,
  getAllMedia,
  getTelegramMediaUrl,
  getTelegramThumbnail,
  getTelegramThumbnailUrl,
  ingestTelegramMedia,
  updateMedia,
  deleteMedia,
  createPlaylist,
  getPlaylists
} from "../controllers/mediaController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { verifyCrudOperation } from "../middleware/secretKeyMiddleware.js";

const router = express.Router();

// Media routes - GET is public
router.get("/", getAllMedia);
router.get("/playlists", getPlaylists);
router.get("/:id/telegram-url", getTelegramMediaUrl);
router.get("/:id/telegram-thumbnail", getTelegramThumbnail);
router.get("/:id/telegram-thumbnail-url", getTelegramThumbnailUrl);
router.post("/telegram/webhook", ingestTelegramMedia);

// Media routes - POST, PATCH, DELETE require auth
router.post("/", authenticate, verifyCrudOperation, createMedia);
router.patch("/:id", authenticate, verifyCrudOperation, updateMedia);
router.delete("/:id", authenticate, verifyCrudOperation, deleteMedia);

// Playlist routes - POST requires auth
router.post("/playlists", authenticate, verifyCrudOperation, createPlaylist);

export default router;
