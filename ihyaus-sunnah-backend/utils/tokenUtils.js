import jwt from "jsonwebtoken";

export const generateToken = (userId, role, expiresIn = "24h") =>
  jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn });

export const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

export const generateResetToken = () =>
  jwt.sign({ purpose: "password-reset", timestamp: Date.now() }, process.env.JWT_SECRET, { expiresIn: "1h" });
