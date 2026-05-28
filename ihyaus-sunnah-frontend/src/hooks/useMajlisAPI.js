// src/hooks/useMajlisAPI.js

import { useEffect, useState } from "react";
import { majlisAPI } from "../services/api";
import {
  dispatchAdminDataUpdate,
  subscribeAdminDataUpdates,
} from "../utils/adminDataSync";
import { logAdminActivity } from "../utils/activityLogger";

const useMajlisAPI = () => {
  const [majlis, setMajlis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // =========================
  // GET ALL MAJLIS
  // =========================
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

  // =========================
  // CREATE
  // =========================
  const addMajlis = async (data, secretKey) => {
    try {
      const response = await majlisAPI.create(data, secretKey);

      await logAdminActivity({
        type: "majlis",
        action: "Created majlis",
        details: `${data.title || data.name || "A majlis"} was added.`,
        reference: response?.data?._id || response?.data?.id || "",
      });
      await refreshMajlis();
      dispatchAdminDataUpdate({ majlis: true, activities: true });

      return response;
    } catch (err) {
      console.error("Failed to add majlis:", err);
      throw err;
    }
  };

  // =========================
  // UPDATE
  // =========================
  const editMajlis = async (id, data, secretKey) => {
    try {
      const response = await majlisAPI.update(id, data, secretKey);

      await logAdminActivity({
        type: "majlis",
        action: "Updated majlis",
        details: `${data.title || data.name || "A majlis"} was updated.`,
        reference: id,
      });
      await refreshMajlis();
      dispatchAdminDataUpdate({ majlis: true, activities: true });

      return response;
    } catch (err) {
      console.error("Failed to update majlis:", err);
      throw err;
    }
  };

  // =========================

  // DELETE
  // =========================
  const removeMajlis = async (id, secretKey) => {
    try {
      const existing = majlis.find((item) => item._id === id || item.id === id);
      await majlisAPI.delete(id, secretKey);
      await logAdminActivity({
        type: "majlis",
        action: "Deleted majlis",
        details: `${existing?.title || existing?.name || "A majlis"} was deleted.`,
        reference: id,
      });
      await refreshMajlis();
      dispatchAdminDataUpdate({ majlis: true, activities: true });
    } catch (err) {
      console.error("Failed to delete majlis:", err);
      throw err;
    }
  };

  const stats = {
    totalMajlis: Array.isArray(majlis) ? majlis.length : 0,
    publicCount: Array.isArray(majlis) ? majlis.filter(m => m.type === "public").length : 0,
    privateCount: Array.isArray(majlis) ? majlis.filter(m => m.type === "private").length : 0,
    totalEnrolled: Array.isArray(majlis)
      ? majlis.reduce((sum, m) => sum + (m.enrollment?.enrolled || 0), 0)
      : 0,
  };

  return {
    majlis,
    loading,
    error,
    refreshMajlis,
    addMajlis,
    editMajlis,
    removeMajlis,
    stats,
  };
};

export default useMajlisAPI;
