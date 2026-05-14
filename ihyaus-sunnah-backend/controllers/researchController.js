import { Research } from "../models/Research.js";

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
    const { category, type, programId, status, search } = req.query;
    const filter = {};
    if (category) filter.researchCategory = category;
    if (type) filter.researchType = type;
    if (programId) filter.programId = programId;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { summary: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } }
      ];
    }

    const research = await Research.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: research });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateResearch = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Research.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "Research not found" });
    res.json({ success: true, message: "Research updated successfully", data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteResearch = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Research.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Research not found" });
    res.json({ success: true, message: "Research deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
