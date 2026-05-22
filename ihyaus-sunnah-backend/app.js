import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

// Routes
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

/* =========================
   CORS CONFIG
========================= */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:3001",
      "http://127.0.0.1:3002",
    ],
    credentials: true,
  })
);

/* =========================
   BODY PARSERS (FIX APPLIED HERE)
   THIS FIXES PayloadTooLargeError
========================= */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/* =========================
   COOKIE PARSER
========================= */
app.use(cookieParser());

/* =========================
   ROUTES
========================= */
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

export default app;
