import express from "express";
import { getActivities, addActivity, clearActivities } from "../controllers/activityController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authenticate);
router.use(authorize(["director", "admin"]));

router.get("/", getActivities);
router.post("/", addActivity);
router.delete("/", clearActivities);

export default router;
