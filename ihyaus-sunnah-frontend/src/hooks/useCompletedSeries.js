import { useState, useEffect } from "react";
import {
  getCompletedSeries,
  getCompletedSeriesById,
  addCompletedSeries,
  updateCompletedSeries,
  deleteCompletedSeries,
  getSeriesStats,
} from "../data/mock/completedSeriesStore";

const useCompletedSeries = () => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load all completed series
  useEffect(() => {
    try {
      setLoading(true);
      const data = getCompletedSeries();
      setSeries(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get series by ID
  const getSeriesData = (id) => {
    return getCompletedSeriesById(id);
  };

  // Refresh function to manually update state
  const refresh = () => {
    try {
      const data = getCompletedSeries();
      setSeries(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Add new completed series
  const createSeries = (newSeries) => {
    try {
      const created = addCompletedSeries(newSeries);
      refresh(); // Refresh to get updated data
      return created;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  // Update series
  const updateSeriesData = (id, updates) => {
    try {
      const updated = updateCompletedSeries(id, updates);
      if (updated) {
        refresh(); // Refresh to get updated data
      }
      return updated;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  // Delete series
  const deleteSeriesData = (id) => {
    try {
      deleteCompletedSeries(id);
      refresh(); // Refresh to get updated data
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  // Get stats
  const stats = getSeriesStats();

  return {
    series,
    getSeriesData,
    createSeries,
    updateSeriesData,
    deleteSeriesData,
    loading,
    error,
    stats,
  };
};

export default useCompletedSeries;
