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
    const staff = await Staff.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: staff
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFilteredStaff = async (req, res) => {
  try {
    const { role, name, section } = req.query;
    const filter = {};

    if (role) filter.role = role;
    if (section) filter.sections = section;
    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    const staff = await Staff.find(filter);
    
    // Sort by role order manually if needed or via aggregation
    const sortedStaff = staff.sort((a, b) => {
      return (roleOrderMap[a.role] || 99) - (roleOrderMap[b.role] || 99);
    });

    res.json({
      success: true,
      data: sortedStaff
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