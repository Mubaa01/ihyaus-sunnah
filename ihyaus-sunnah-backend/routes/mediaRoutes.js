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
import { authenticate, optionalAuthenticate } from "../middleware/authMiddleware.js";
import { authorizeCrud } from "../middleware/crudAuthorization.js";

const router = express.Router();

// Public GETs still run optional auth so admins can access private media.
router.get("/", optionalAuthenticate, getAllMedia);
router.get("/playlists", getPlaylists);
router.get("/:id/telegram-url", optionalAuthenticate, getTelegramMediaUrl);
router.get("/:id/telegram-file", optionalAuthenticate, getTelegramMediaFile);
router.get("/:id/telegram-thumbnail", optionalAuthenticate, getTelegramThumbnail);
router.get("/:id/telegram-thumbnail-url", optionalAuthenticate, getTelegramThumbnailUrl);
router.post("/telegram/webhook", ingestTelegramMedia);

// Media routes - POST, PATCH, DELETE require auth
router.post("/", authenticate, authorizeCrud, createMedia);
router.patch("/:id", authenticate, authorizeCrud, updateMedia);
router.delete("/:id", authenticate, authorizeCrud, deleteMedia);

// Playlist routes - POST requires auth
router.post("/playlists", authenticate, authorizeCrud, createPlaylist);
router.patch("/playlists/:id", authenticate, authorizeCrud, updatePlaylist);

export default router;
