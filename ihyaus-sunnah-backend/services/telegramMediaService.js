import { Media } from "../models/Media.js";
import { Playlist } from "../models/Playlist.js";
import { Staff } from "../models/Staff.js";
import {
  getTelegramMediaPayload,
  parseTelegramCaption,
} from "../utils/telegramMediaUtils.js";

export const saveTelegramMessageAsMedia = async (message = {}) => {
  const telegramMedia = getTelegramMediaPayload(message);
  if (!telegramMedia) {
    return {
      skipped: true,
      message: "Telegram message does not contain supported media",
    };
  }

  const metadata = parseTelegramCaption(message.caption || "");
  const missingFields = ["title", "type", "mediaCategory", "playlistName"].filter(
    (field) => !metadata[field]
  );

  if (missingFields.length > 0) {
    const error = new Error(`Telegram caption is missing: ${missingFields.join(", ")}`);
    error.statusCode = 400;
    throw error;
  }

  let staff = null;
  if (metadata.trusteeName) {
    staff = await Staff.findOne({
      name: { $regex: `^${escapeRegExp(metadata.trusteeName)}$`, $options: "i" },
    });
  }

  const playlist = await Playlist.findOneAndUpdate(
    {
      playlistName: { $regex: `^${escapeRegExp(metadata.playlistName)}$`, $options: "i" },
      mediaType: metadata.type,
      trusteeId: staff?._id || null,
    },
    {
      $setOnInsert: {
        playlistName: metadata.playlistName,
        mediaType: metadata.type,
        trusteeId: staff?._id || null,
      },
    },
    { new: true, upsert: true }
  );

  const media = await Media.findOneAndUpdate(
    {
      provider: "telegram",
      telegramFileId: telegramMedia.fileId,
    },
    {
      $set: {
        title: metadata.title,
        description: metadata.description,
        mediaCategory: metadata.mediaCategory,
        type: metadata.type,
        staffId: staff?._id || null,
        playlistId: playlist._id,
        visibility: metadata.visibility,
        thumbnail: metadata.thumbnail,
        tags: metadata.tags,
        provider: "telegram",
        telegramFileId: telegramMedia.fileId,
        telegramMessageId: message.message_id,
        telegramChatId: String(message.chat?.id || ""),
        telegramMimeType: telegramMedia.mimeType,
        telegramFileName: telegramMedia.fileName,
        telegramFileSize: telegramMedia.fileSize,
        telegramThumbnailFileId: telegramMedia.thumbnailFileId,
      },
    },
    { new: true, upsert: true, runValidators: true }
  );

  return {
    skipped: false,
    media,
  };
};

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
