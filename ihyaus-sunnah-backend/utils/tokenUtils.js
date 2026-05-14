import jwt from "jsonwebtoken";
import crypto from "crypto";

/**
 * Generate JWT token
 * @param {string} userId - User ID
 * @param {string} role - User role
 * @param {number} expiresIn - Expiration time (default: 24h)
 * @returns {string} JWT token
 */
export const generateToken = (userId, role, expiresIn = "24h") => {
  const payload = {
    userId,
    role
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

/**
 * Verify JWT token
 * @param {string} token - JWT token
 * @returns {object} Decoded token data
 * @throws Error if token is invalid
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error(`Invalid token: ${error.message}`);
  }
};

/**
 * Generate password reset token
 * Simple token for email verification
 * @returns {string} Reset token
 */
export const generateResetToken = () => {
  return jwt.sign(
    { purpose: "password-reset", timestamp: Date.now() },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

/**
 * Generate a 4-digit random secret key for admin/director
 * Format: 0000-9999
 * @returns {object} { plainSecretKey, hashedSecretKey }
 */
export const generateSecretKey = () => {
  // Generate random 4-digit number (0000-9999)
  const randomNumber = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  
  const plainSecretKey = randomNumber;
  
  // Hash the secret key for storage
  const hashedSecretKey = crypto
    .createHash("sha256")
    .update(plainSecretKey)
    .digest("hex");

  return {
    plainSecretKey,
    hashedSecretKey
  };
};

/**
 * Hash a secret key for comparison
 * @param {string} secretKey - Plain secret key
 * @returns {string} Hashed secret key
 */
export const hashSecretKey = (secretKey) => {
  return crypto
    .createHash("sha256")
    .update(secretKey)
    .digest("hex");
};

/**
 * Verify a secret key against its hash
 * @param {string} plainSecretKey - Plain secret key
 * @param {string} hashedSecretKey - Hashed secret key from database
 * @returns {boolean} True if keys match
 */
export const verifySecretKey = (plainSecretKey, hashedSecretKey) => {
  const hash = hashSecretKey(plainSecretKey);
  return hash === hashedSecretKey;
};
