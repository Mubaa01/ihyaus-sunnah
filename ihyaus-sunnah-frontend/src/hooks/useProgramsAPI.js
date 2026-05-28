// // src/hooks/useProgramsAPI.js
// // Updated hook using real API instead of mock data

// import { useEffect, useMemo, useState } from "react";
// import { programsAPI } from "../services/api";
// import {
//   dispatchAdminDataUpdate,
//   subscribeAdminDataUpdates,
// } from "../utils/adminDataSync";

// const useProgramsAPI = () => {
//   const [programs, setPrograms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const refreshPrograms = async () => {
//     try {
//       setLoading(true);
//       const response = await programsAPI.getAll();
//       setPrograms(response.data || []);
//       setError(null);
//     } catch (err) {
//       console.error("Failed to load programs:", err);
//       setError(err.message);
//       setPrograms([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     refreshPrograms();

//     const cleanup = subscribeAdminDataUpdates(() => {
//       refreshPrograms();
//     });

//     return cleanup;
//   }, []);

//   const featuredPrograms = useMemo(
//     () => programs.filter((program) => program.isFeatured),
//     [programs]
//   );

//   const activePrograms = useMemo(
//     () => programs.filter((program) => program.status === "active"),
//     [programs]
//   );

//   const categories = useMemo(
//     () => [
//       ...new Set(
//         programs.map((program) => program.category).filter(Boolean)
//       ),
//     ],
//     [programs]
//   );

//   const addProgram = async (data, secretKey) => {
//     try {
//       const response = await programsAPI.create(data, secretKey);
//       // TODO: Optionally log activity to backend if needed
//       await refreshPrograms();
//       dispatchAdminDataUpdate({ programs: true });
//       return response;
//     } catch (err) {
//       console.error("Failed to add program:", err);
//       throw err;
//     }
//   };

//   const editProgram = async (id, data, secretKey) => {
//     try {
//       const response = await programsAPI.update(id, data, secretKey);
//       // TODO: Optionally log activity to backend if needed
//       await refreshPrograms();
//       dispatchAdminDataUpdate({ programs: true });
//       return response;
//     } catch (err) {
//       console.error("Failed to edit program:", err);
//       throw err;
//     }
//   };

//   const removeProgram = async (id, secretKey) => {
//     try {
//       const existing = programs.find((item) => item._id === id);
//       await programsAPI.delete(id, secretKey);
//       // TODO: Optionally log activity to backend if needed
//       await refreshPrograms();
//       dispatchAdminDataUpdate({ programs: true });
//     } catch (err) {
//       console.error("Failed to remove program:", err);
//       throw err;
//     }
//   };

//   return {
//     programs,
//     setPrograms,
//     loading,
//     error,

//     featuredPrograms,
//     activePrograms,
//     categories,

//     addProgram,
//     editProgram,
//     removeProgram,
//     refreshPrograms,
//   };
// };

// export default useProgramsAPI;


import { useEffect, useMemo, useState } from "react";
import { programsAPI } from "../services/api";
import {
  dispatchAdminDataUpdate,
  subscribeAdminDataUpdates,
} from "../utils/adminDataSync";
import { logAdminActivity } from "../utils/activityLogger";

const useProgramsAPI = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshPrograms = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await programsAPI.getAll();
      setPrograms(response?.data ?? []);
    } catch (err) {
      setError(err.message || "Failed to load programs");
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshPrograms();

    const cleanup = subscribeAdminDataUpdates(refreshPrograms);
    return cleanup;
  }, []);

  const featuredPrograms = useMemo(
    () => programs.filter((p) => p.isFeatured),
    [programs]
  );

  const activePrograms = useMemo(
    () => programs.filter((p) => p.status === "active"),
    [programs]
  );

  const categories = useMemo(
    () => [...new Set(programs.map((p) => p.category).filter(Boolean))],
    [programs]
  );

  const addProgram = async (data, secretKey) => {
    const res = await programsAPI.create(data, secretKey);
    await logAdminActivity({
      type: "program",
      action: "Created program",
      details: `${data.title || "A program"} was added.`,
      reference: res?.data?._id || res?.data?.id || data.slug || "",
    });
    await refreshPrograms();
    dispatchAdminDataUpdate({ programs: true, activities: true });
    return res;
  };

  const editProgram = async (id, data, secretKey) => {
    const res = await programsAPI.update(id, data, secretKey);
    await logAdminActivity({
      type: "program",
      action: "Updated program",
      details: `${data.title || "A program"} was updated.`,
      reference: id,
    });
    await refreshPrograms();
    dispatchAdminDataUpdate({ programs: true, activities: true });
    return res;
  };

  const removeProgram = async (id, secretKey) => {
    const existing = programs.find((program) => program._id === id || program.id === id);
    await programsAPI.delete(id, secretKey);
    await logAdminActivity({
      type: "program",
      action: "Deleted program",
      details: `${existing?.title || "A program"} was deleted.`,
      reference: id,
    });
    await refreshPrograms();
    dispatchAdminDataUpdate({ programs: true, activities: true });
  };

  return {
    programs,
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
