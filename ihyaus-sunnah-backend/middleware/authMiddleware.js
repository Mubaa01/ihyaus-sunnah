import jwt from "jsonwebtoken";
import User from "../models/user.js";

/**
 * Authenticate middleware - Verify JWT token
 * Adds user data to req.user if token is valid
 */
export const authenticate = async (req, res, next) => {
  try {
    // Get token from Authorization header (Bearer token) or from cookies
    const token =
      req.headers.authorization?.split(" ")[1] || req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No token provided"
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.userId).select("role isActive");

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Account is unavailable or inactive"
      });
    }

    // Always use the current database role instead of the stale JWT role.
    req.user = {
      userId: user._id.toString(),
      role: user.role
    };
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized - Invalid token",
      error: error.message
    });
  }
};

/**
 * Authorize middleware - Check if user has required role
 * Usage: authorize(['director', 'admin'])
 */
export const authorize = (allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized - User not found"
        });
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: `Forbidden - Required role: ${allowedRoles.join(" or ")}`
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Authorization error",
        error: error.message
      });
    }
  };
};
