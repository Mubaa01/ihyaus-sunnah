import { Majlis } from "../models/Majlis.js";

export const createMajlis = async (req, res) => {
  try {
    const majlis = await Majlis.create(req.body);
    res.status(201).json({ success: true, message: "Majlis created successfully", data: majlis });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllMajlis = async (req, res) => {
  try {
    const { type } = req.query;
    const filter = {};
    if (type) filter.type = type;

    const majlis = await Majlis.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: majlis });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateMajlis = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Majlis.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "Majlis not found" });
    res.json({ success: true, message: "Majlis updated successfully", data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteMajlis = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Majlis.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Majlis not found" });
    res.json({ success: true, message: "Majlis deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
