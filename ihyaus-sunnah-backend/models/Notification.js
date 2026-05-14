import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  type: { type: String, required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export const Notification = mongoose.model("Notification", notificationSchema);
