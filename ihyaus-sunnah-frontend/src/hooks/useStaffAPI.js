// src/hooks/useStaffAPI.js
// Updated hook using real API instead of mock data

import { useEffect, useMemo, useState } from "react";
import { staffAPI } from "../services/api";
import { logActivity } from "../data/mock/activityStore";
import {
  dispatchAdminDataUpdate,
  subscribeAdminDataUpdates,
} from "../utils/adminDataSync";

const useStaffAPI = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshStaff = async () => {
    try {
      setLoading(true);
      const response = await staffAPI.getAll();
      setStaff(response.data || []);
      setError(null);
    } catch (err) {
      console.error("Failed to load staff:", err);
      setError(err.message);
      setStaff([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshStaff();

    const cleanup = subscribeAdminDataUpdates(() => {
      refreshStaff();
    });

    return cleanup;
  }, []);

  // =========================
  // GROUPED STAFF
  // =========================

  const groupedStaff = useMemo(() => {
    return {
      directors: staff.filter((item) => item.role === "director"),
      board: staff.filter((item) => item.role === "board"),
      senior: staff.filter((item) => item.role === "senior"),
      staffI: staff.filter((item) => item.role === "staff-i"),
      staffII: staff.filter((item) => item.role === "staff-ii"),
      staffIII: staff.filter((item) => item.role === "staff-iii"),
    };
  }, [staff]);

  // =========================
  // CRUD OPERATIONS
  // =========================

  const addStaff = async (data, secretKey) => {
    try {
      const response = await staffAPI.create(data, secretKey);
      logActivity({
        type: "staff",
        action: "Added staff member",
        details: `${data.name} was added as ${data.position || data.role}`,
        reference: response.data?._id || null,
      });
      await refreshStaff();
      dispatchAdminDataUpdate({ staff: true });
      return response;
    } catch (err) {
      console.error("Failed to add staff:", err);
      throw err;
    }
  };

  const editStaff = async (id, data, secretKey) => {
    try {
      const response = await staffAPI.update(id, data, secretKey);
      logActivity({
        type: "staff",
        action: "Updated staff member",
        details: `${data.name} was updated`,
        reference: id,
      });
      await refreshStaff();
      dispatchAdminDataUpdate({ staff: true });
      return response;
    } catch (err) {
      console.error("Failed to edit staff:", err);
      throw err;
    }
  };

  const removeStaff = async (id, secretKey) => {
    try {
      const existing = staff.find((item) => item._id === id);
      await staffAPI.delete(id, secretKey);
      logActivity({
        type: "staff",
        action: "Removed staff member",
        details: `${existing?.name || "A staff member"} was deleted`,
        reference: id,
      });
      await refreshStaff();
      dispatchAdminDataUpdate({ staff: true });
    } catch (err) {
      console.error("Failed to remove staff:", err);
      throw err;
    }
  };

  // =========================
  // RETURN
  // =========================

  return {
    // raw
    staff,
    loading,
    error,

    // grouped
    groupedStaff,

    // CRUD
    addStaff,
    editStaff,
    removeStaff,
    refreshStaff,
  };
};

export default useStaffAPI;
