
import { useState, useEffect } from "react";
import { completedSeriesAPI } from "../services/api";

const useCompletedSeries = () => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load all completed series from backend
  const refresh = async () => {
    setLoading(true);
    try {
      const data = await completedSeriesAPI.getAll();
      setSeries(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setSeries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const getSeriesData = (id) => series.find((s) => s._id === id) || null;

  const createSeries = async (newSeries, secretKey) => {
    await completedSeriesAPI.create(newSeries, secretKey);
    await refresh();
  };

  const updateSeriesData = async (id, updates, secretKey) => {
    await completedSeriesAPI.update(id, updates, secretKey);
    await refresh();
  };

  const deleteSeriesData = async (id, secretKey) => {
    await completedSeriesAPI.delete(id, secretKey);
    await refresh();
  };

  // Example stats (could be expanded)
  const stats = {
    totalSeries: series.length,
    // Add more stats as needed
  };

  return {
    series,
    getSeriesData,
    createSeries,
    updateSeriesData,
    deleteSeriesData,
    loading,
    error,
    stats,
    refresh,
  };
};

export default useCompletedSeries;
