import User from "../models/user.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, role, isActive } = req.query;

    const filter = {};

    if (role) filter.role = role;
    if (isActive !== undefined) filter.isActive = isActive === "true";

  
    const skip = (page - 1) * limit;

  
    const users = await User.find(filter)
      .select("-password -resetPasswordToken -resetPasswordExpiresAt")
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(filter);

    return res.json({
      success: true,
      data: users,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("❌ Get users error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select(
      "-password -resetPasswordToken -resetPasswordExpiresAt"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error("❌ Get user error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

  
    const validRoles = ["director", "admin", "staff"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: `Invalid role. Must be one of: ${validRoles.join(", ")}`
      });
    }

  
    const currentUser = await User.findById(id);
    if (currentUser.role === "director" && role !== "director") {
      const directorCount = await User.countDocuments({ role: "director" });
      if (directorCount === 1) {
        return res.status(400).json({
          success: false,
          message: "Cannot remove the last director. At least one director must exist."
        });
      }
    }

    
    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).select("-password -resetPasswordToken -resetPasswordExpiresAt");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.json({
      success: true,
      message: "User role updated successfully",
      data: user
    });
  } catch (error) {
    console.error("❌ Update user role error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const toggleUserActive = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    user.isActive = !user.isActive;
    await user.save();

    return res.json({
      success: true,
      message: `User ${user.isActive ? "activated" : "deactivated"} successfully`,
      data: user
    });
  } catch (error) {
    console.error("❌ Toggle user active error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

  
    if (user.role === "director") {
      const directorCount = await User.countDocuments({ role: "director" });
      if (directorCount === 1) {
        return res.status(400).json({
          success: false,
          message: "Cannot delete the last director. At least one director must exist."
        });
      }
    }

    await User.findByIdAndDelete(id);

    return res.json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (error) {
    console.error("❌ Delete user error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
