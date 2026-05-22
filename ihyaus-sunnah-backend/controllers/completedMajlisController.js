// controllers/completedMajlisController.js

import { CompletedMajlis } from "../models/CompletedMajlis.js";


// ========================================
// CREATE COMPLETED MAJLIS
// ========================================
export const createCompletedMajlis = async (req, res) => {
  try {
    const completedMajlis = await CompletedMajlis.create(req.body);

    res.status(201).json({
      success: true,
      message: "Completed majlis added successfully",
      data: completedMajlis,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// ========================================
// GET ALL COMPLETED MAJLIS
// ========================================
export const getAllCompletedMajlis = async (req, res) => {
  try {
    const {
      category,
      featured,
    } = req.query;

    const filter = {};

    // =========================
    // FILTERS
    // =========================
    if (category) {
      filter["book.category"] = category;
    }

    if (featured !== undefined) {
      filter.featured = featured === "true";
    }

    const completedMajlis = await CompletedMajlis.find(filter).sort({
      "studyPeriod.completionDate": -1,
    });

    res.status(200).json({
      success: true,
      total: completedMajlis.length,
      data: completedMajlis,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ========================================
// GET SINGLE COMPLETED MAJLIS
// ========================================
export const getSingleCompletedMajlis = async (req, res) => {
  try {
    const { id } = req.params;

    const completedMajlis = await CompletedMajlis.findById(id);

    if (!completedMajlis) {
      return res.status(404).json({
        success: false,
        message: "Completed majlis not found",
      });
    }

    res.status(200).json({
      success: true,
      data: completedMajlis,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ========================================
// UPDATE COMPLETED MAJLIS
// ========================================
export const updateCompletedMajlis = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedCompletedMajlis =
      await CompletedMajlis.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedCompletedMajlis) {
      return res.status(404).json({
        success: false,
        message: "Completed majlis not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Completed majlis updated successfully",
      data: updatedCompletedMajlis,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// ========================================
// DELETE COMPLETED MAJLIS
// ========================================
export const deleteCompletedMajlis = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCompletedMajlis =
      await CompletedMajlis.findByIdAndDelete(id);

    if (!deletedCompletedMajlis) {
      return res.status(404).json({
        success: false,
        message: "Completed majlis not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Completed majlis deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};