import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  trusteeId: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
  mediaType: { type: String, enum: ["video", "audio", "short", "student"], required: true },
  playlistName: { type: String, required: true },
}, { timestamps: true });

export const Playlist = mongoose.model("Playlist", playlistSchema);
