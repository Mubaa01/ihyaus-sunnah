import { Activity } from "../models/Activity.js";

export const getActivities = async (req, res) => {
  try {
    const { limit = 100 } = req.query;
    const activities = await Activity.find()
      .sort({ createdAt: -1 })
      .limit(Number(limit));
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addActivity = async (req, res) => {
  try {
    const activity = new Activity({
      ...req.body,
      user: req.user?.userId || req.body.user,
    });
    await activity.save();
    res.status(201).json(activity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const clearActivities = async (req, res) => {
  try {
    await Activity.deleteMany({});
    res.json({ success: true, message: "Activity log cleared" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
