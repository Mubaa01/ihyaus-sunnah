import mongoose from "mongoose";
import { Research, researchCategories, researchTypes } from "../models/Research.js";

const buildResearchFilter = ({ category, type, programId, status, search }) => {
  const filter = {};

  if (category) filter.researchCategory = category;
  if (type) filter.researchType = type;
  if (programId) filter.programId = programId;
  if (status) filter.status = status;
  if (search) {
    const regex = { $regex: search, $options: "i" };
    filter.$or = [
      { title: regex },
      { summary: regex },
      { author: regex },
      { tags: regex },
    ];
  }

  return filter;
};

export const createResearch = async (req, res) => {
  try {
    const research = await Research.create(req.body);
    res.status(201).json({ success: true, message: "Research created successfully", data: research });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllResearch = async (req, res) => {
  try {
    const filter = buildResearchFilter(req.query);

    const research = await Research.find(filter)
      .populate("staffId", "name image position role sections")
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: research,
      meta: {
        total: research.length,
        categories: researchCategories,
        types: researchTypes,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getResearchById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid research ID" });
    }

    const research = await Research.findById(id).populate("staffId", "name image position role sections");
    if (!research) {
      return res.status(404).json({ success: false, message: "Research not found" });
    }

    res.json({ success: true, data: research });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateResearch = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid research ID" });
    }

    const updated = await Research.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).populate("staffId", "name image position role sections");
    if (!updated) return res.status(404).json({ success: false, message: "Research not found" });
    res.json({ success: true, message: "Research updated successfully", data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteResearch = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid research ID" });
    }

    const deleted = await Research.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Research not found" });
    res.json({ success: true, message: "Research deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
