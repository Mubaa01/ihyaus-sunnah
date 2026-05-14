// src/hooks/useProgramsAPI.js
// Updated hook using real API instead of mock data

import { useEffect, useMemo, useState } from "react";
import { programsAPI } from "../services/api";
import { logActivity } from "../data/mock/activityStore";
import {
  dispatchAdminDataUpdate,
  subscribeAdminDataUpdates,
} from "../utils/adminDataSync";

const useProgramsAPI = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshPrograms = async () => {
    try {
      setLoading(true);
      const response = await programsAPI.getAll();
      setPrograms(response.data || []);
      setError(null);
    } catch (err) {
      console.error("Failed to load programs:", err);
      setError(err.message);
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshPrograms();

    const cleanup = subscribeAdminDataUpdates(() => {
      refreshPrograms();
    });

    return cleanup;
  }, []);

  const featuredPrograms = useMemo(
    () => programs.filter((program) => program.isFeatured),
    [programs]
  );

  const activePrograms = useMemo(
    () => programs.filter((program) => program.status === "active"),
    [programs]
  );

  const categories = useMemo(
    () => [
      ...new Set(
        programs.map((program) => program.category).filter(Boolean)
      ),
    ],
    [programs]
  );

  const addProgram = async (data, secretKey) => {
    try {
      const response = await programsAPI.create(data, secretKey);
      logActivity({
        type: "program",
        action: "Created program",
        details: `${data.title || data.name} was added to the program lineup`,
        reference: response.data?._id || null,
      });
      await refreshPrograms();
      dispatchAdminDataUpdate({ programs: true });
      return response;
    } catch (err) {
      console.error("Failed to add program:", err);
      throw err;
    }
  };

  const editProgram = async (id, data, secretKey) => {
    try {
      const response = await programsAPI.update(id, data, secretKey);
      logActivity({
        type: "program",
        action: "Updated program",
        details: `${data.title || data.name} was updated`,
        reference: id,
      });
      await refreshPrograms();
      dispatchAdminDataUpdate({ programs: true });
      return response;
    } catch (err) {
      console.error("Failed to edit program:", err);
      throw err;
    }
  };

  const removeProgram = async (id, secretKey) => {
    try {
      const existing = programs.find((item) => item._id === id);
      await programsAPI.delete(id, secretKey);
      logActivity({
        type: "program",
        action: "Removed program",
        details: `${existing?.title || "A program"} was deleted`,
        reference: id,
      });
      await refreshPrograms();
      dispatchAdminDataUpdate({ programs: true });
    } catch (err) {
      console.error("Failed to remove program:", err);
      throw err;
    }
  };

  return {
    programs,
    setPrograms,
    loading,
    error,

    featuredPrograms,
    activePrograms,
    categories,

    addProgram,
    editProgram,
    removeProgram,
    refreshPrograms,
  };
};

export default useProgramsAPI;
