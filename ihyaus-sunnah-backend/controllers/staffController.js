import { Staff } from "../models/Staff.js";
import { staffSchema } from "../validators/staffValidator.js";
import mongoose from "mongoose";


const roleOrderMap = {
  "director": 1,
  "board": 2,
  "senior": 3,
  "staff-i": 4,
  "staff-ii": 5,
  "staff-iii": 6
};

export const createStaff = async (req, res) => {
  try {
    const data = staffSchema.parse(req.body);
    const staff = await Staff.create(data);

    res.status(201).json({
      success: true,
      message: "Staff created successfully",
      data: staff
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.errors || error.message
    });
  }
};

export const getAllStaff = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 50, 1), 100);
    const skip = (page - 1) * limit;

    const [staff, total] = await Promise.all([
      Staff.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Staff.countDocuments()
    ]);

    res.json({
      success: true,
      data: staff,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFilteredStaff = async (req, res) => {
  try {
    const { role, name, section } = req.query;
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 50, 1), 100);
    const filter = {};
    const skip = (page - 1) * limit;

    if (role) filter.role = role;
    if (section) filter.sections = section;
    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    const [staff, total] = await Promise.all([
      Staff.find(filter)
        .skip(skip)
        .limit(limit)
        .lean(),
      Staff.countDocuments(filter)
    ]);
    
    // Sort by role order manually if needed or via aggregation
    const sortedStaff = staff.sort((a, b) => {
      return (roleOrderMap[a.role] || 99) - (roleOrderMap[b.role] || 99);
    });

    res.json({
      success: true,
      data: sortedStaff,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getStaffById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const staff = await Staff.findById(id);

    if (!staff) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ success: true, data: staff });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("[updateStaff] Updating staff:", id, req.body);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const updated = await Staff.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Not found" });
    }

    console.log("[updateStaff] Updated staff:", updated);

    res.json({
      success: true,
      message: "Updated successfully",
      data: updated
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



export const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const deleted = await Staff.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({
      success: true,
      message: "Deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAllStaff = async (req, res) => {
  try {
    await Staff.deleteMany({});

    res.json({
      success: true,
      message: "All staff deleted"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
