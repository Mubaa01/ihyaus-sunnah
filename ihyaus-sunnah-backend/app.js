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

// const corsOptions = {
//   origin: [
//     "https://ihyaussunnah.netlify.app",
//     "https://6a20102e7232f710df350db4--ihyaussunnah.netlify.app"
//   ],
//   credentials: true
// };
app.use(cors({
  origin: true,
  credentials: true
}));
// CORS MUST BE FIRST
//app.use(cors(corsOptions));
//app.options("*", cors(corsOptions));

// BODY PARSER
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