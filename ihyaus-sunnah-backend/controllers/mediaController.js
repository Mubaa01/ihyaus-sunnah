import { Media } from "../models/Media.js";
import { Playlist } from "../models/Playlist.js";
import { saveTelegramMessageAsMedia } from "../services/telegramMediaService.js";
import { Readable } from "node:stream";

const proxyTelegramFile = async (req, res, fileId, contentType) => {
  const metadataResponse = await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getFile?file_id=${encodeURIComponent(fileId)}`
  );
  const metadata = await metadataResponse.json();

  if (!metadata.ok || !metadata.result?.file_path) {
    return res.status(502).json({ success: false, message: metadata.description || "Unable to get Telegram file" });
  }

  const headers = {};
  if (req.headers.range) headers.Range = req.headers.range;

  const fileResponse = await fetch(
    `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${metadata.result.file_path}`,
    { headers }
  );

  if (!fileResponse.ok && fileResponse.status !== 206) {
    return res.status(502).json({ success: false, message: "Unable to download Telegram file" });
  }

  res.status(fileResponse.status);
  for (const header of ["content-type", "content-length", "content-range", "accept-ranges"]) {
    const value = fileResponse.headers.get(header);
    if (value) res.setHeader(header, value);
  }
  if (contentType && !res.getHeader("content-type")) res.setHeader("Content-Type", contentType);
  res.setHeader("Cache-Control", "private, max-age=300");
  res.setHeader("X-Content-Type-Options", "nosniff");
  Readable.fromWeb(fileResponse.body).pipe(res);
};

const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const createMedia = async (req, res) => {
  try {
    const media = await Media.create(req.body);
    res.status(201).json({ success: true, message: "Media created successfully", data: media });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllMedia = async (req, res) => {
  try {
    const { category, type, staffId, playlistId, visibility, search } = req.query;
    const filter = {};
    if (category) filter.mediaCategory = category;
    if (type) filter.type = type;
    if (staffId) filter.staffId = staffId;
    if (playlistId) filter.playlistId = playlistId;
    if (visibility) filter.visibility = visibility;
    if (search) {
      const escaped = escapeRegExp(search);
      filter.$or = [
        { title: { $regex: escaped, $options: "i" } },
        { description: { $regex: escaped, $options: "i" } },
        { tags: { $in: [new RegExp(escaped, "i")] } }
      ];
    }

    const media = await Media.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: media });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTelegramMediaUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const media = await Media.findById(id);

    if (!media) {
      return res.status(404).json({ success: false, message: "Media not found" });
    }

    if (media.provider !== "telegram") {
      return res.json({ success: true, data: { url: media.url, provider: media.provider } });
    }

    if (!process.env.TELEGRAM_BOT_TOKEN) {
      return res.status(500).json({
        success: false,
        message: "Telegram bot token is not configured",
      });
    }

    const url = `${req.protocol}://${req.get("host")}/api/media/${media._id}/telegram-file`;

    res.json({
      success: true,
      data: {
        url,
        provider: "telegram",
        proxied: true,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTelegramMediaFile = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ success: false, message: "Media not found" });
    if (media.provider !== "telegram" || !media.telegramFileId) {
      return res.status(404).json({ success: false, message: "Telegram file not found" });
    }
    if (!process.env.TELEGRAM_BOT_TOKEN) {
      return res.status(500).json({ success: false, message: "Telegram bot token is not configured" });
    }
    return proxyTelegramFile(req, res, media.telegramFileId);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getTelegramThumbnail = async (req, res) => {
  try {
    const { id } = req.params;
    const media = await Media.findById(id);

    if (!media) {
      return res.status(404).json({ success: false, message: "Media not found" });
    }

    if (media.thumbnail) {
      return res.redirect(media.thumbnail);
    }

    if (!media.telegramThumbnailFileId) {
      return res.status(404).json({ success: false, message: "Thumbnail not found" });
    }

    if (!process.env.TELEGRAM_BOT_TOKEN) {
      return res.status(500).json({
        success: false,
        message: "Telegram bot token is not configured",
      });
    }

    return proxyTelegramFile(req, res, media.telegramThumbnailFileId, "image/jpeg");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTelegramThumbnailUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const media = await Media.findById(id);

    if (!media) {
      return res.status(404).json({ success: false, message: "Media not found" });
    }

    const thumbnailUrl = getMediaThumbnailUrl(req, media);
    if (!thumbnailUrl) {
      return res.status(404).json({ success: false, message: "Thumbnail not found" });
    }

    res.json({ success: true, data: { url: thumbnailUrl } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Media.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "Media not found" });
    res.json({ success: true, message: "Media updated successfully", data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Media.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Media not found" });
    res.json({ success: true, message: "Media deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const ingestTelegramMedia = async (req, res) => {
  try {
    const expectedSecret = process.env.TELEGRAM_WEBHOOK_SECRET;
    const receivedSecret = req.headers["x-telegram-bot-api-secret-token"];

    if (!expectedSecret) {
      return res.status(503).json({ success: false, message: "Telegram webhook secret is not configured" });
    }

    if (receivedSecret !== expectedSecret) {
      return res.status(401).json({ success: false, message: "Invalid Telegram webhook secret" });
    }

    const message = req.body.channel_post || req.body.message;
    if (!message) {
      return res.json({ success: true, message: "No Telegram message to process" });
    }

    const result = await saveTelegramMessageAsMedia(message);
    if (result.skipped) {
      return res.json({ success: true, message: result.message });
    }

    res.status(201).json({
      success: true,
      message: "Telegram media saved successfully",
      data: result.media,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({ success: false, message: error.message });
  }
};

// Playlist Controllers
export const createPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.create(req.body);
    res.status(201).json({ success: true, message: "Playlist created successfully", data: playlist });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updatePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!playlist) {
      return res.status(404).json({ success: false, message: "Playlist not found" });
    }

    res.json({ success: true, message: "Playlist updated successfully", data: playlist });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getPlaylists = async (req, res) => {
  try {
    const { trusteeId, mediaType } = req.query;
    const filter = {};
    if (trusteeId) filter.trusteeId = trusteeId;
    if (mediaType) filter.mediaType = mediaType;

    const playlists = await Playlist.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: playlists });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMediaThumbnailUrl = (req, media) => {
  if (media.thumbnail) return media.thumbnail;
  if (!media.telegramThumbnailFileId) return "";

  return `${req.protocol}://${req.get("host")}/api/media/${media._id}/telegram-thumbnail`;
};
