import express from "express";
import { getNotifications, addNotification } from "../controllers/notificationController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getNotifications);
router.post("/", authenticate, authorize(["director", "admin"]), addNotification);

export default router;
