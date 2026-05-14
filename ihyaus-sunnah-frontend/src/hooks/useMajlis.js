import { useState, useEffect, useMemo } from "react";
import {
  getMajlis,
  getMajlisByType,
  getMajlisById,
  addMajlis,
  updateMajlis,
  deleteMajlis,
  updateMajlisEnrollment,
} from "../data/mock/majlisStore";
import {
  dispatchAdminDataUpdate,
  subscribeAdminDataUpdates,
} from "../utils/adminDataSync";

const useMajlis = () => {
  const [majlis, setMajlis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load all majlis and keep in sync with shared updates
  const refresh = () => {
    try {
      const data = getMajlis();
      setMajlis(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    refresh();
    setLoading(false);

    const cleanup = subscribeAdminDataUpdates(() => {
      refresh();
    })

    return cleanup
  }, []);

  // Get public majlis
  const publicMajlis = majlis.filter((m) => m.type === "public");

  // Get private majlis (for serious students)
  const privateMajlis = majlis.filter((m) => m.type === "private");

  // Get majlis by ID
  const getMajlisData = (id) => {
    return getMajlisById(id);
  };

  // Add new majlis
  const createMajlis = (newMajlis) => {
    try {
      const created = addMajlis(newMajlis);
      refresh();
      dispatchAdminDataUpdate({ majlis: true });
      return created;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  // Update majlis
  const updateMajlisData = (id, updates) => {
    try {
      const updated = updateMajlis(id, updates);
      if (updated) {
        refresh();
        dispatchAdminDataUpdate({ majlis: true });
      }
      return updated;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  // Delete majlis
  const deleteMajlisData = (id) => {
    try {
      deleteMajlis(id);
      refresh();
      dispatchAdminDataUpdate({ majlis: true });
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  // Update enrollment
  const updateEnrollment = (id, delta) => {
    try {
      const updated = updateMajlisEnrollment(id, delta);
      if (updated) {
        refresh();
        dispatchAdminDataUpdate({ majlis: true });
      }
      return updated;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  // Get stats - memoized for performance and reactivity
  const stats = useMemo(
    () => ({
      totalMajlis: majlis.length,
      publicCount: publicMajlis.length,
      privateCount: privateMajlis.length,
      totalEnrolled: majlis.reduce((sum, m) => sum + m.enrolled, 0),
      totalCapacity: majlis.reduce((sum, m) => sum + m.capacity, 0),
    }),
    [majlis, publicMajlis.length, privateMajlis.length]
  );

  return {
    majlis,
    publicMajlis,
    privateMajlis,
    getMajlisData,
    createMajlis,
    updateMajlisData,
    deleteMajlisData,
    updateEnrollment,
    loading,
    error,
    stats,
  };
};

export default useMajlis;
