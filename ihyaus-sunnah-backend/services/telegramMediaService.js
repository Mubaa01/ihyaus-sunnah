import { Media } from "../models/Media.js";
import { Playlist } from "../models/Playlist.js";
import { Staff } from "../models/Staff.js";
import { Program } from "../models/Program.js";
import {
  getTelegramMediaPayload,
  parseTelegramCaption,
  parseProgramVideoCaption,
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

// New: Save Telegram Message as Program Video
export const saveTelegramMessageAsProgramVideo = async (message = {}) => {
  const telegramMedia = getTelegramMediaPayload(message);
  if (!telegramMedia) {
    return {
      skipped: true,
      message: "Telegram message does not contain supported media",
    };
  }

  const metadata = parseProgramVideoCaption(message.caption || "");
  const missingFields = ["title", "program", "category"].filter(
    (field) => !metadata[field]
  );

  if (missingFields.length > 0) {
    const error = new Error(
      `Telegram caption is missing: ${missingFields.join(", ")}`
    );
    error.statusCode = 400;
    throw error;
  }

  // Find program by name
  const program = await Program.findOne({
    title: { $regex: `^${escapeRegExp(metadata.program)}$`, $options: "i" },
  });

  if (!program) {
    const error = new Error(`Program not found: ${metadata.program}`);
    error.statusCode = 404;
    throw error;
  }

  // Find or create the category
  let categoryIndex = program.categories.findIndex(
    (cat) =>
      cat.title.toLowerCase() === metadata.category.toLowerCase()
  );

  if (categoryIndex === -1) {
    const error = new Error(
      `Category not found in program: ${metadata.category}`
    );
    error.statusCode = 404;
    throw error;
  }

  // Fetch media thumbnail from Telegram if available
  let thumbnail = "";
  if (telegramMedia.thumbnailFileId) {
    // In a real implementation, you'd call getTelegramFileUrl(telegramMedia.thumbnailFileId)
    // For now, we'll just store the fileId
    thumbnail = telegramMedia.thumbnailFileId;
  }

  // Create preview video object
  const previewVideo = {
    title: metadata.title,
    duration: metadata.duration,
    thumbnail: thumbnail,
    provider: "telegram",
    mediaId: null, // Will be set if we save to Media collection
    telegramFileId: telegramMedia.fileId,
    telegramMessageId: message.message_id,
    telegramChatId: String(message.chat?.id || ""),
    telegramThumbnailFileId: telegramMedia.thumbnailFileId,
  };

  // Optional: Also save to Media collection for library
  let savedMedia = null;
  const mediaRecord = await Media.findOne({
    provider: "telegram",
    telegramFileId: telegramMedia.fileId,
  });

  if (!mediaRecord) {
    savedMedia = new Media({
      title: metadata.title,
      description: metadata.description,
      mediaCategory: "program_video",
      type: "video",
      visibility: "public",
      thumbnail: thumbnail,
      provider: "telegram",
      telegramFileId: telegramMedia.fileId,
      telegramMessageId: message.message_id,
      telegramChatId: String(message.chat?.id || ""),
      telegramMimeType: telegramMedia.mimeType,
      telegramFileName: telegramMedia.fileName,
      telegramFileSize: telegramMedia.fileSize,
      telegramThumbnailFileId: telegramMedia.thumbnailFileId,
    });
    await savedMedia.save();
  } else {
    savedMedia = mediaRecord;
  }

  // Add mediaId to preview video
  previewVideo.mediaId = savedMedia._id;

  // Add video to category (max 3)
  program.categories[categoryIndex].previewVideos.push(previewVideo);
  if (program.categories[categoryIndex].previewVideos.length > 3) {
    program.categories[categoryIndex].previewVideos.pop();
  }

  await program.save();

  return {
    skipped: false,
    program,
    previewVideo,
    media: savedMedia,
  };
};

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
