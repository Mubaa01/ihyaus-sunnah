import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  mediaCategory: { type: String, required: true },
  type: { type: String, enum: ["video", "audio", "short", "student"], required: true },
  staffId: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
  playlistId: { type: mongoose.Schema.Types.ObjectId, ref: "Playlist" },
  visibility: { type: String, enum: ["public", "private"], default: "public" },
  url: { type: String, required: true },
  thumbnail: String,
  tags: [String],
  downloads: { type: Number, default: 0 },
  views: { type: Number, default: 0 }
}, { timestamps: true });

export const Media = mongoose.model("Media", mediaSchema);
