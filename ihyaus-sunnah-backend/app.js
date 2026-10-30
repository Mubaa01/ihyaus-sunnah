import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();

import staffRoutes from "./routes/staffRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import programRoutes from "./routes/programRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js";
import researchRoutes from "./routes/researchRoutes.js";
import majlisRoutes from "./routes/majlisRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import completedMajlisRoutes from "./routes/completedMajlisRoutes.js";

const app = express();
const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  app.set("trust proxy", 1);
}

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

const configuredOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  if (!isProduction) return true;

  try {
    const url = new URL(origin);
    const isLocalDevelopment =
      url.protocol === "http:" &&
      ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);

    return (
      isLocalDevelopment ||
      origin === "https://ihyau.netlify.app" ||
      origin.endsWith("--ihyau.netlify.app") ||
      configuredOrigins.includes(origin)
    );
  } catch {
    return false;
  }
};

app.use(cors({
  origin: (origin, callback) => {
    return isAllowedOrigin(origin)
      ? callback(null, true)
      : callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  credentials: true,
  optionsSuccessStatus: 204,
}));


app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// COOKIE
app.use(cookieParser());

// ROUTES
app.use("/api/staff", staffRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/research", researchRoutes);
app.use("/api/majlis", majlisRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/completed-majlis", completedMajlisRoutes);

// GLOBAL ERROR HANDLING MIDDLEWARE
app.use((err, req, res, _next) => {
  console.error("Unhandled App Error:", err);
  const status = err.status || err.statusCode || 500;
  return res.status(status).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

export default app;
