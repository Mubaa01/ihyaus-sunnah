// src/hooks/useStudentResearchAPI.js
// Updated hook using real API instead of mock data


import { useEffect, useState } from "react";
import { researchAPI } from "../services/api";
import {
  dispatchAdminDataUpdate,
  subscribeAdminDataUpdates,
} from "../utils/adminDataSync";

const useStudentResearchAPI = () => {
  const [research, setResearch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshResearch = async (filters = {}) => {
    try {
      setLoading(true);
      const response = await researchAPI.getAll(filters);
      setResearch(response.data || []);
      setError(null);
    } catch (err) {
      console.error("Failed to load research:", err);
      setError(err.message);
      setResearch([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshResearch();

    const cleanup = subscribeAdminDataUpdates(() => {
      refreshResearch();
    });

    return cleanup;
  }, []);

  const addResearch = async (data, secretKey) => {
    try {
      const response = await researchAPI.create(data, secretKey);
      await refreshResearch();
      dispatchAdminDataUpdate({ research: true });
      return response;
    } catch (err) {
      console.error("Failed to add research:", err);
      throw err;
    }
  };

  const editResearch = async (id, data, secretKey) => {
    try {
      const response = await researchAPI.update(id, data, secretKey);
      await refreshResearch();
      dispatchAdminDataUpdate({ research: true });
      return response;
    } catch (err) {
      console.error("Failed to edit research:", err);
      throw err;
    }
  };

  const removeResearch = async (id, secretKey) => {
    try {
      const existing = research.find((item) => item._id === id);
      await researchAPI.delete(id, secretKey);
      logActivity({
        type: "research",
        action: "Removed research",
        details: `${existing?.title || "A research item"} was deleted`,
        reference: id,
      });
      await refreshResearch();
      dispatchAdminDataUpdate({ research: true });
    } catch (err) {
      console.error("Failed to remove research:", err);
      throw err;
    }
  };

  return {
    research,
    loading,
    error,

    refreshResearch,
    addResearch,
    editResearch,
    removeResearch,
  };
};

export default useStudentResearchAPI;
