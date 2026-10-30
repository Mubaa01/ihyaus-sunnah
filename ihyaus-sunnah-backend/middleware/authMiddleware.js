import jwt from "jsonwebtoken";
import User from "../models/user.js";

const getTokenFromRequest = (req) =>
  req.cookies?.token || req.headers.authorization?.split(" ")[1];

const loadActiveUser = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.userId).select("role isActive");

  if (!user || !user.isActive) {
    return null;
  }

  return {
    userId: user._id.toString(),
    role: user.role,
  };
};

export const isAdminUser = (user) =>
  Boolean(user && ["admin", "director"].includes(user.role));

/**
 * Authenticate middleware - Verify JWT from cookie (preferred) or Bearer header
 */
export const authenticate = async (req, res, next) => {
  try {
    const token = getTokenFromRequest(req);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No token provided",
      });
    }

    const user = await loadActiveUser(token);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Account is unavailable or inactive",
      });
    }

    req.user = user;
    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Unauthorized - Invalid token",
    });
  }
};

/**
 * Attach user when a valid session exists; never block the request.
 * Used for public reads that hide private content from anonymous callers.
 */
export const optionalAuthenticate = async (req, res, next) => {
  try {
    const token = getTokenFromRequest(req);
    if (!token) return next();

    const user = await loadActiveUser(token);
    if (user) req.user = user;
  } catch {
    // Ignore invalid/expired tokens on optional paths.
  }

  return next();
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
