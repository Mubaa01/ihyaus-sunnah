// src/hooks/useMajlisAPI.js
// Updated hook using real API instead of mock data

import { useEffect, useState } from "react";
import { majlisAPI } from "../services/api";
import {
  dispatchAdminDataUpdate,
  subscribeAdminDataUpdates,
} from "../utils/adminDataSync";

const useMajlisAPI = () => {
  const [majlis, setMajlis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshMajlis = async (filters = {}) => {
    try {
      setLoading(true);
      const response = await majlisAPI.getAll(filters);
      setMajlis(response.data || []);
      setError(null);
    } catch (err) {
      console.error("Failed to load majlis:", err);
      setError(err.message);
      setMajlis([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshMajlis();

    const cleanup = subscribeAdminDataUpdates(() => {
      refreshMajlis();
    });

    return cleanup;
  }, []);

  const addMajlis = async (data, secretKey) => {
    try {
      const response = await majlisAPI.create(data, secretKey);
      // TODO: Optionally log activity to backend if needed
      await refreshMajlis();
      dispatchAdminDataUpdate({ majlis: true });
      return response;
    } catch (err) {
      console.error("Failed to add majlis:", err);
      throw err;
    }
  };

  const editMajlis = async (id, data, secretKey) => {
    try {
      const response = await majlisAPI.update(id, data, secretKey);
      // TODO: Optionally log activity to backend if needed
      await refreshMajlis();
      dispatchAdminDataUpdate({ majlis: true });
      return response;
    } catch (err) {
      console.error("Failed to edit majlis:", err);
      throw err;
    }
  };

  const removeMajlis = async (id, secretKey) => {
    try {
      const existing = majlis.find((item) => item._id === id);
      await majlisAPI.delete(id, secretKey);
      logActivity({
        type: "majlis",
        action: "Removed majlis",
        details: `${existing?.title || "A majlis"} was deleted`,
        reference: id,
      });
      await refreshMajlis();
      dispatchAdminDataUpdate({ majlis: true });
    } catch (err) {
      console.error("Failed to remove majlis:", err);
      throw err;
    }
  };

  return {
    majlis,
    loading,
    error,

    refreshMajlis,
    addMajlis,
    editMajlis,
    removeMajlis,
  };
};

export default useMajlisAPI;
