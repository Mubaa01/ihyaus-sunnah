// src/hooks/useCompletedMajlisAPI.js

import { useEffect, useState } from "react";
import { completedMajlisAPI } from "../services/api";
import {
  dispatchAdminDataUpdate,
  subscribeAdminDataUpdates,
} from "../utils/adminDataSync";

const useCompletedMajlisAPI = () => {
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // =========================
  // GET ALL COMPLETED MAJLIS
  // =========================
  const refreshCompleted = async (filters = {}) => {
    try {
      setLoading(true);

      const response = await completedMajlisAPI.getAll(filters);

      setCompleted(response.data || []);
      setError(null);
    } catch (err) {
      console.error("Failed to load completed majlis:", err);
      setError(err.message);
      setCompleted([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCompleted();

    const cleanup = subscribeAdminDataUpdates(() => {
      refreshCompleted();
    });

    return cleanup;
  }, []);

  // =========================
  // CREATE
  // =========================
  const addCompleted = async (data, secretKey) => {
    try {
      const response = await completedMajlisAPI.create(data, secretKey);

      await refreshCompleted();
      dispatchAdminDataUpdate({ completedMajlis: true });

      return response;
    } catch (err) {
      console.error("Failed to add completed majlis:", err);
      throw err;
    }
  };

  // =========================
  // UPDATE
  // =========================
  const editCompleted = async (id, data, secretKey) => {
    try {
      const response = await completedMajlisAPI.update(id, data, secretKey);

      await refreshCompleted();
      dispatchAdminDataUpdate({ completedMajlis: true });

      return response;
    } catch (err) {
      console.error("Failed to update completed majlis:", err);
      throw err;
    }
  };

  // =========================
  // DELETE
  // =========================
  const removeCompleted = async (id, secretKey) => {
    try {
      await completedMajlisAPI.delete(id, secretKey);

      await refreshCompleted();
      dispatchAdminDataUpdate({ completedMajlis: true });
    } catch (err) {
      console.error("Failed to delete completed majlis:", err);
      throw err;
    }
  };

  return {
    completed,
    loading,
    error,
    refreshCompleted,
    addCompleted,
    editCompleted,
    removeCompleted,
  };
};

export default useCompletedMajlisAPI;