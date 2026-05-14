import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginSchema, changePasswordSchema, forgotPasswordSchema, resetPasswordSchema, generateSecretKeySchema, resetSecretKeySchema, changeSecretKeySchema, setCustomSecretKeySchema } from "../validators/authValidator.js";

import { generateToken, generateResetToken, verifyToken, generateSecretKey, hashSecretKey, verifySecretKey } from "../utils/tokenUtils.js";
import { z } from "zod";

/**
 * Login - Simple email + password authentication
 * Returns JWT token
 */
export const login = async (req, res) => {
  try {
    // 1. Validate input
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
        errors: result.error.errors
      });
    }

    const { email, password } = result.data;

    // 2. Find user (must include password field)
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // 3. Verify password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // 4. Check if user is active
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is inactive"
      });
    }

    // 5. Generate JWT token
    const token = generateToken(user._id, user.role);

    // 6. Update last login time
    user.lastLoginAt = new Date();
    await user.save();

    // 7. Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("❌ Login error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Logout - Clear authentication
 */
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");

    res.json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Change Password - For logged-in users
 * Requires old password verification
 */
export const changePassword = async (req, res) => {
  try {
    // 1. Validate input
    const result = changePasswordSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
        errors: result.error.errors
      });
    }

    const { oldPassword, newPassword } = result.data;
    const userId = req.user.userId;

    // 2. Find user and get password
    const user = await User.findById(userId).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // 3. Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect"
      });
    }

    // 4. Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // 5. Save user
    await user.save();

    return res.json({
      success: true,
      message: "Password changed successfully"
    });
  } catch (error) {
    console.error("❌ Change password error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Forgot Password - Send reset email
 */
export const forgotPassword = async (req, res) => {
  try {
    // 1. Validate input
    const result = forgotPasswordSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
        errors: result.error.errors
      });
    }

    const { email } = result.data;

    // 2. Find user
    const user = await User.findOne({ email });

    if (!user) {
      // Don't reveal if email exists or not (security)
      return res.json({
        success: true,
        message: "If this email exists, a reset link will be sent"
      });
    }

    // 3. Generate reset token
    const resetToken = generateResetToken();

    // 4. Store reset token in user
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save();

    // 5. Send reset email
    const to = user.email;
    const from = process.env.SENDGRID_SENDER_EMAIL;
    const subject = "Password Reset Request";
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&email=${email}`;
    const html = `
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `;

    await sendEmail(to, from, subject, html);

    return res.json({
      success: true,
      message: "If this email exists, a reset link will be sent"
    });
  } catch (error) {
    console.error("❌ Forgot password error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Reset Password - Verify token and update password
 */
export const resetPassword = async (req, res) => {
  try {
    // 1. Validate input
    const result = resetPasswordSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
        errors: result.error.errors
      });
    }

    const { email, code, newPassword } = result.data;

    // 2. Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or reset code"
      });
    }

    // 3. Verify reset token
    if (!user.resetPasswordToken || user.resetPasswordToken !== code) {
      return res.status(400).json({
        success: false,
        message: "Invalid reset code"
      });
    }

    // 4. Check if token is expired
    if (new Date() > user.resetPasswordExpiresAt) {
      return res.status(400).json({
        success: false,
        message: "Reset code has expired"
      });
    }

    // 5. Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // 6. Clear reset token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    // 7. Save user
    await user.save();

    return res.json({
      success: true,
      message: "Password reset successfully"
    });
  } catch (error) {
    console.error("❌ Reset password error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Generate Secret Key - For admin/director users
 * Creates a new secret key for CRUD operations
 */
export const generateNewSecretKey = async (req, res) => {
  try {
    // 1. Validate input
    const result = generateSecretKeySchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
        errors: result.error.errors
      });
    }

    const { password } = result.data;
    const userId = req.user.userId;

    // 2. Check if user is admin or director
    if (!["admin", "director"].includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Only admin and director users can generate secret keys"
      });
    }

    // 3. Find user and verify password
    const user = await User.findById(userId).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // 4. Verify password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password"
      });
    }

    // 5. Generate new secret key
    const { plainSecretKey, hashedSecretKey } = generateSecretKey();

    // 6. Update user with new secret key
    user.secretKey = hashedSecretKey;
    user.secretKeyLastGeneratedAt = new Date();
    await user.save();

    return res.json({
      success: true,
      message: "Secret key generated successfully",
      secretKey: plainSecretKey,
      warning: "⚠️  Save this secret key. It will not be shown again!",
      expiresAt: user.secretKeyExpiresAt,
      generatedAt: user.secretKeyLastGeneratedAt
    });
  } catch (error) {
    console.error("❌ Generate secret key error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Reset Secret Key - Invalidate current key and generate new one
 */
export const resetSecretKey = async (req, res) => {
  try {
    // 1. Validate input
    const result = resetSecretKeySchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
        errors: result.error.errors
      });
    }

    const { password } = result.data;
    const userId = req.user.userId;

    // 2. Check if user is admin or director
    if (!["admin", "director"].includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Only admin and director users can reset secret keys"
      });
    }

    // 3. Find user and verify password
    const user = await User.findById(userId).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // 4. Verify password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password"
      });
    }

    // 5. Generate new secret key
    const { plainSecretKey, hashedSecretKey } = generateSecretKey();

    // 6. Update user with new secret key
    user.secretKey = hashedSecretKey;
    user.secretKeyLastGeneratedAt = new Date();
    await user.save();

    return res.json({
      success: true,
      message: "Secret key has been reset",
      secretKey: plainSecretKey,
      warning: "⚠️  Save this secret key. It will not be shown again!",
      generatedAt: user.secretKeyLastGeneratedAt
    });
  } catch (error) {
    console.error("❌ Reset secret key error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Change Secret Key - Verify current key and generate new one
 */
export const changeSecretKey = async (req, res) => {
  try {
    // 1. Validate input
    const result = changeSecretKeySchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
        errors: result.error.errors
      });
    }

    const { currentSecretKey, password } = result.data;
    const userId = req.user.userId;

    // 2. Check if user is admin or director
    if (!["admin", "director"].includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Only admin and director users can change secret keys"
      });
    }

    // 3. Find user and verify password + secret key
    const user = await User.findById(userId).select("+password +secretKey");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // 4. Verify password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password"
      });
    }

    // 5. Verify current secret key
    if (!user.secretKey) {
      return res.status(400).json({
        success: false,
        message: "No secret key exists. Generate one first.",
        hint: "Use /generate-secret-key endpoint"
      });
    }

    const isSecretKeyMatch = verifySecretKey(currentSecretKey, user.secretKey);

    if (!isSecretKeyMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid current secret key"
      });
    }

    // 6. Generate new secret key
    const { plainSecretKey, hashedSecretKey } = generateSecretKey();

    // 7. Update user with new secret key
    user.secretKey = hashedSecretKey;
    user.secretKeyLastGeneratedAt = new Date();
    await user.save();

    return res.json({
      success: true,
      message: "Secret key changed successfully",
      secretKey: plainSecretKey,
      warning: "⚠️  Save this secret key. It will not be shown again!",
      changedAt: user.secretKeyLastGeneratedAt
    });
  } catch (error) {
    console.error("❌ Change secret key error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get Secret Key Status - Check if user has a valid secret key
 */
export const getSecretKeyStatus = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Check if user is admin or director
    if (!["admin", "director"].includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Only admin and director users have secret keys"
      });
    }

    // Find user
    const user = await User.findById(userId).select("secretKey secretKeyLastGeneratedAt");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.json({
      success: true,
      data: {
        hasSecretKey: !!user.secretKey,
        lastGeneratedAt: user.secretKeyLastGeneratedAt,
        role: req.user.role
      }
    });
  } catch (error) {
    console.error("❌ Get secret key status error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Set Custom Secret Key - Admin/Director can set their own 4-digit secret key
 */
export const setCustomSecretKey = async (req, res) => {
  try {
    // 1. Validate input
    const result = setCustomSecretKeySchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
        errors: result.error.errors
      });
    }

    const { secretKey, password } = result.data;
    const userId = req.user.userId;

    // 2. Check if user is admin or director
    if (!["admin", "director"].includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Only admin and director users can set custom secret keys"
      });
    }

    // 3. Find user and verify password
    const user = await User.findById(userId).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // 4. Verify password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password"
      });
    }

    // 5. Hash and store the custom secret key
    const hashedSecretKey = hashSecretKey(secretKey);
    user.secretKey = hashedSecretKey;
    user.secretKeyLastGeneratedAt = new Date();
    await user.save();

    return res.json({
      success: true,
      message: "Custom secret key set successfully",
      secretKey: secretKey,
      setAt: user.secretKeyLastGeneratedAt
    });
  } catch (error) {
    console.error("❌ Set custom secret key error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

