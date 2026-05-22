import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  mediaCategory: { type: String, required: true },
  type: { type: String, enum: ["video", "audio", "short", "student"], required: true },
  staffId: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
  playlistId: { type: mongoose.Schema.Types.ObjectId, ref: "Playlist" },
  visibility: { type: String, enum: ["public", "private"], default: "public" },
  provider: { type: String, enum: ["external", "telegram"], default: "external" },
  url: String,
  thumbnail: String,
  telegramFileId: String,
  telegramMessageId: Number,
  telegramChatId: String,
  telegramMimeType: String,
  telegramFileName: String,
  telegramFileSize: Number,
  telegramThumbnailFileId: String,
  tags: [String],
  downloads: { type: Number, default: 0 },
  views: { type: Number, default: 0 }
}, { timestamps: true });

mediaSchema.pre("validate", function validateMediaSource(next) {
  if (this.provider === "telegram" && !this.telegramFileId) {
    this.invalidate("telegramFileId", "Telegram media requires a telegramFileId");
  }

  if (this.provider !== "telegram" && !this.url) {
    this.invalidate("url", "External media requires a URL");
  }

  next();
});

export const Media = mongoose.model("Media", mediaSchema);
