import mongoose from "mongoose";

const researchSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  researchCategory: { type: String, required: true },
  researchType: { type: String, required: true },
  programId: { type: mongoose.Schema.Types.ObjectId, ref: "Program" },
  status: { type: String, enum: ["published", "draft", "under-review"], default: "published" },
  summary: String,
  pdfUrl: String,
  pdfFileName: String,
  imageUrl: String,
  imageKey: String,
  tags: [String]
}, { timestamps: true });

export const Research = mongoose.model("Research", researchSchema);
