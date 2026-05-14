import mongoose from "mongoose";

const majlisSchema = new mongoose.Schema({
  title: { type: String, required: true },
  day: String,
  time: String,
  endTime: String,
  book: String,
  bookImage: String,
  tutor: String,
  tutorImage: String,
  tutorRole: String,
  description: String,
  type: { type: String, enum: ["public", "private"], default: "public" },
  format: String,
  capacity: Number,
  enrolled: { type: Number, default: 0 },
  level: String,
  intensity: String,
  requirements: [String]
}, { timestamps: true });

export const Majlis = mongoose.model("Majlis", majlisSchema);
