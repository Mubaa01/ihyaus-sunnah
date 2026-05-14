import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  type: { type: String, required: true },
  action: { type: String, required: true },
  details: String,
  reference: String, // Can be ID of the related object
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export const Activity = mongoose.model("Activity", activitySchema);
