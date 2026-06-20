import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
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

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (
      origin === "http://localhost:3000" ||
      origin === "http://localhost:5173" ||
      origin === "http://127.0.0.1:5173" ||
      origin === "https://ihyau.netlify.app" ||
      origin.endsWith("--ihyau.netlify.app")
    ) {
      return callback(null, true);
    }

    callback(new Error("Not allowed by CORS"));
  },
  credentials: true
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

export default app;
