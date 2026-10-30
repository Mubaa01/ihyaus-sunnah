import User from "../models/user.js";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import sgMail from "@sendgrid/mail";
import { loginSchema, changePasswordSchema, forgotPasswordSchema, resetPasswordSchema } from "../validators/authValidator.js";
import { generateToken, generateResetToken, BCRYPT_SALT_ROUNDS } from "../utils/tokenUtils.js";
import { clearAuthCookie, getAuthCookieOptions } from "../utils/authCookie.js";

export const login = async (req, res) => {
  try {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json({ success: false, message: "Invalid input", errors: result.error.issues });
    const user = await User.findOne({ email: result.data.email }).select("+password");
    if (!user || !(await bcrypt.compare(result.data.password, user.password))) return res.status(400).json({ success: false, message: "Invalid email or password" });
    if (!user.isActive) return res.status(403).json({ success: false, message: "Account is inactive" });
    if (!["admin", "director"].includes(user.role)) return res.status(403).json({ success: false, message: "Admin dashboard access is not permitted for this account" });
    const token = generateToken(user._id, user.role);
    user.lastLoginAt = new Date();
    await user.save();
    res.cookie("token", token, getAuthCookieOptions());
    return res.json({
      success: true,
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Login failed:", error);
    return res.status(500).json({ success: false, message: "Login failed" });
  }
};

export const getSession = async (req, res) => {
  const user = await User.findById(req.user.userId).select("name email role isActive");
  if (!user) return res.status(401).json({ success: false, message: "Session account was not found" });

  return res.json({
    success: true,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
};

export const logout = async (req, res) => {
  clearAuthCookie(res);
  return res.json({ success: true, message: "Logged out successfully" });
};

export const changePassword = async (req, res) => {
  try {
    const result = changePasswordSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json({ success: false, message: "Invalid input", errors: result.error.issues });
    const user = await User.findById(req.user.userId).select("+password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    if (!(await bcrypt.compare(result.data.oldPassword, user.password))) return res.status(400).json({ success: false, message: "Old password is incorrect" });
    user.password = await bcrypt.hash(result.data.newPassword, BCRYPT_SALT_ROUNDS);
    await user.save();
    return res.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Unable to change password" });
  }
};

export const forgotPassword = async (req, res) => {
  const response = { success: true, message: "If this email exists, a reset link will be sent" };
  try {
    const result = forgotPasswordSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json({ success: false, message: "Invalid input", errors: result.error.issues });
    const user = await User.findOne({ email: result.data.email });
    if (!user) return res.json(response);
    const token = generateResetToken();
    user.resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");
    user.resetPasswordExpiresAt = new Date(Date.now() + 3600000);
    await user.save();
    if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_SENDER_EMAIL || !process.env.FRONTEND_URL) throw new Error("Reset email is not configured");
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const link = `${process.env.FRONTEND_URL}/reset-password?token=${encodeURIComponent(token)}&email=${encodeURIComponent(user.email)}`;
    await sgMail.send({ to: user.email, from: process.env.SENDGRID_SENDER_EMAIL, subject: "Password Reset Request", html: `<p><a href="${link}">Reset Password</a></p><p>This link expires in one hour.</p>` });
    return res.json(response);
  } catch (error) {
    return res.status(500).json({ success: false, message: "Unable to process password reset" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const result = resetPasswordSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json({ success: false, message: "Invalid input", errors: result.error.issues });
    const hashedToken = crypto.createHash("sha256").update(result.data.code).digest("hex");
    const user = await User.findOne({ email: result.data.email, resetPasswordToken: hashedToken, resetPasswordExpiresAt: { $gt: new Date() } });
    if (!user) return res.status(400).json({ success: false, message: "Invalid or expired reset code" });
    user.password = await bcrypt.hash(result.data.newPassword, BCRYPT_SALT_ROUNDS);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();
    return res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Unable to reset password" });
  }
};
