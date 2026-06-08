// src/context/StaffContext.jsx

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { staffAPI } from "../services/api";
import {
  dispatchAdminDataUpdate,
  subscribeAdminDataUpdates,
} from "../utils/adminDataSync";
import { logAdminActivity } from "../utils/activityLogger";

const StaffContext = createContext();

export const StaffProvider = ({ children }) => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshStaff = async () => {
    try {
      setLoading(true);
      const response = await staffAPI.getAll();
      
      if (!response) {
        throw new Error("No response from server");
      }
      
      if (!response.data) {
        console.warn("Invalid response structure from /staff:", response);
        throw new Error("Invalid response format: missing data field");
      }
      
      setStaff(Array.isArray(response.data) ? response.data : []);
      setError(null);
    } catch (err) {
      console.error("Error fetching staff:", err);
      setError(err.message || "Failed to load staff data");
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

  const addStaff = async (data, secretKey) => {
    try {
      const response = await staffAPI.create(data, secretKey);
      await logAdminActivity({
        type: "staff",
        action: "Added staff member",
        details: `${data.name || "A staff member"} was added.`,
        reference: response?.data?._id || response?.data?.id || "",
      });
      await refreshStaff();
      dispatchAdminDataUpdate({ staff: true, activities: true });
      return response;
    } catch (err) {
      throw err;
    }
  };

  const editStaff = async (id, data, secretKey) => {
    try {
      const response = await staffAPI.update(id, data, secretKey);
      await logAdminActivity({
        type: "staff",
        action: "Updated staff member",
        details: `${data.name || "A staff member"} was updated.`,
        reference: id,
      });
      await refreshStaff();
      dispatchAdminDataUpdate({ staff: true, activities: true });
      return response;
    } catch (err) {
      throw err;
    }
  };

  const removeStaff = async (id, secretKey) => {
    try {
      const existing = staff.find((item) => item._id === id);
      await staffAPI.delete(id, secretKey);
      await logAdminActivity({
        type: "staff",
        action: "Removed staff member",
        details: `${existing?.name || "A staff member"} was deleted`,
        reference: id,
      });
      await refreshStaff();
      dispatchAdminDataUpdate({ staff: true, activities: true });
    } catch (err) {
      throw err;
    }
  };

  return (
    <StaffContext.Provider
      value={{ staff, loading, error, groupedStaff, addStaff, editStaff, removeStaff, refreshStaff }}
    >
      {children}
    </StaffContext.Provider>
  );
};

export const useStaffContext = () => useContext(StaffContext);
