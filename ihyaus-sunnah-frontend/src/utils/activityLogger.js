import { activitiesAPI } from "../services/api";

export const logAdminActivity = async (entry) => {
  try {
    await activitiesAPI.create({
      type: entry.type || "default",
      action: entry.action || "Admin update",
      details: entry.details || "A dashboard record was updated.",
      reference: entry.reference || "",
    });
  } catch (error) {
    console.warn("Failed to log admin activity:", error);
  }
};
