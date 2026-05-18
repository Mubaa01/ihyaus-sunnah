// src/hooks/useStaffAPI.js
// Updated hook using real API instead of mock data

import { useStaffContext } from "../context/StaffContext";

const useStaffAPI = () => {
  // Use the context for all staff data and actions
  return useStaffContext();
};

export default useStaffAPI;
