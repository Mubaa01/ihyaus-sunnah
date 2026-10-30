import jwt from "jsonwebtoken";

// Single source of truth for bcrypt work factor across login, password change,
// password reset and the admin seed script. Keep these in sync.
export const BCRYPT_SALT_ROUNDS = 12;

export const generateToken = (userId, role, expiresIn = "24h") =>
  jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn });

export const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

export const generateResetToken = () =>
  jwt.sign({ purpose: "password-reset", timestamp: Date.now() }, process.env.JWT_SECRET, { expiresIn: "1h" });
