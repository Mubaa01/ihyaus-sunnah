import { Program } from "../models/Program.js";
import mongoose from "mongoose";

export const createProgram = async (req, res) => {
  try {
    const program = await Program.create(req.body);
    res.status(201).json({
      success: true,
      message: "Program created successfully",
      data: program
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllPrograms = async (req, res) => {
  try {
    const { category, status, isFeatured } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (isFeatured) filter.isFeatured = isFeatured === "true";

    const programs = await Program.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: programs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProgramBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const program = await Program.findOne({ slug }).populate("staffHighlights.staffId");
    if (!program) return res.status(404).json({ success: false, message: "Program not found" });
    res.json({ success: true, data: program });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Program.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ success: false, message: "Program not found" });
    res.json({ success: true, message: "Program updated successfully", data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Program.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Program not found" });
    res.json({ success: true, message: "Program deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
