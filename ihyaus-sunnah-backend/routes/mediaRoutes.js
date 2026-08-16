import express from "express";
import {
  createMedia,
  getAllMedia,
  getTelegramMediaUrl,
  getTelegramMediaFile,
  getTelegramThumbnail,
  getTelegramThumbnailUrl,
  ingestTelegramMedia,
  updateMedia,
  deleteMedia,
  createPlaylist,
  updatePlaylist,
  getPlaylists
} from "../controllers/mediaController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeCrud } from "../middleware/crudAuthorization.js";

const router = express.Router();

// Media routes - GET is public
router.get("/", getAllMedia);
router.get("/playlists", getPlaylists);
router.get("/:id/telegram-url", getTelegramMediaUrl);
router.get("/:id/telegram-file", getTelegramMediaFile);
router.get("/:id/telegram-thumbnail", getTelegramThumbnail);
router.get("/:id/telegram-thumbnail-url", getTelegramThumbnailUrl);
router.post("/telegram/webhook", ingestTelegramMedia);

// Media routes - POST, PATCH, DELETE require auth
router.post("/", authenticate, authorizeCrud, createMedia);
router.patch("/:id", authenticate, authorizeCrud, updateMedia);
router.delete("/:id", authenticate, authorizeCrud, deleteMedia);

// Playlist routes - POST requires auth
router.post("/playlists", authenticate, authorizeCrud, createPlaylist);
router.patch("/playlists/:id", authenticate, authorizeCrud, updatePlaylist);

export default router;
