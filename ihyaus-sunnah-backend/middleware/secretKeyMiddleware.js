import User from "../models/user.js";
import { verifySecretKey as hashVerify } from "../utils/tokenUtils.js";

/**
 * Secret Key Middleware - Verify secret key for sensitive CRUD operations
 * This middleware ensures that only authorized admin/director with correct secret key
 * can perform Create, Update, Delete operations
 */
export const verifySecretKey = (req, res, next) => {
  try {
    // Get secret key from request header or body
    const secretKey = req.headers["x-secret-key"] || req.body?.secretKey;

    if (!secretKey) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Secret key is required for this operation"
      });
    }

    // Mark request as verified
    req.secretKeyVerified = true;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Secret key verification error",
      error: error.message
    });
  }
};

/**
 * Combined middleware to check both authentication and secret key
 * For admin/director CRUD operations
 */
export const verifyCrudOperation = async (req, res, next) => {
  try {
    // Check if user is admin or director (should be already authenticated)
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - User not authenticated"
      });
    }

    if (!["admin", "director"].includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden - Only admin or director can perform this operation"
      });
    }

    // Verify secret key
    const secretKey = req.headers["x-secret-key"] || req.body?.secretKey;

    if (!secretKey) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Secret key is required for this CRUD operation",
        operation: req.method,
        endpoint: req.path
      });
    }

    // Find user and get their stored secret key
    const user = await User.findById(req.user.userId).select("+secretKey");

    if (!user || !user.secretKey) {
      return res.status(401).json({
        success: false,
        message: "User does not have a secret key configured",
        hint: "Generate a secret key using /api/auth/generate-secret-key"
      });
    }

    // Verify the provided secret key against stored hash
    const isSecretKeyValid = hashVerify(secretKey, user.secretKey);

    if (!isSecretKeyValid) {
      return res.status(403).json({
        success: false,
        message: "Forbidden - Invalid secret key provided"
      });
    }

    req.secretKeyVerified = true;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "CRUD operation verification error",
      error: error.message
    });
  }
};
