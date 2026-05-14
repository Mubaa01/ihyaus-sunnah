import jwt from "jsonwebtoken";

/**
 * Authenticate middleware - Verify JWT token
 * Adds user data to req.user if token is valid
 */
export const authenticate = (req, res, next) => {
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
    
    // Attach user info to request
    req.user = decoded;
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
