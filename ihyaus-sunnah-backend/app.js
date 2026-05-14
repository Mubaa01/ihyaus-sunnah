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

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/staff", staffRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/research", researchRoutes);
app.use("/api/majlis", majlisRoutes);


export default app;