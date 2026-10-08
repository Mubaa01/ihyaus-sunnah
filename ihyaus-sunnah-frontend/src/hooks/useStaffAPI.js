

import { useStaffContext } from "../context/StaffContext";

const useStaffAPI = () => {
  // Use the context for all staff data and actions
  return useStaffContext();
};

export default useStaffAPI;
