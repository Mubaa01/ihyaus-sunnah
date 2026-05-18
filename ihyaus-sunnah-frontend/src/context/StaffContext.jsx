// src/context/StaffContext.jsx

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { staffAPI, activitiesAPI } from "../services/api";
import {
  dispatchAdminDataUpdate,
  subscribeAdminDataUpdates,
} from "../utils/adminDataSync";

const StaffContext = createContext();

export const StaffProvider = ({ children }) => {
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
      await refreshStaff();
      dispatchAdminDataUpdate({ staff: true });
      return response;
    } catch (err) {
      throw err;
    }
  };

  const editStaff = async (id, data, secretKey) => {
    try {
      console.log("[editStaff] Calling staffAPI.update", id, data, secretKey);
      const response = await staffAPI.update(id, data, secretKey);
      await refreshStaff();
      dispatchAdminDataUpdate({ staff: true });
      return response;
    } catch (err) {
      throw err;
    }
  };

  const removeStaff = async (id, secretKey) => {
    try {
      const existing = staff.find((item) => item._id === id);
      await staffAPI.delete(id, secretKey);
      await activitiesAPI.create({
        type: "staff",
        action: "Removed staff member",
        details: `${existing?.name || "A staff member"} was deleted`,
        reference: id,
      });
      await refreshStaff();
      dispatchAdminDataUpdate({ staff: true });
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