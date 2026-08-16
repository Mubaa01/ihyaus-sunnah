import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { authAPI } from "../../services/api";

const PrivateRoute = () => {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      setStatus("unauthorized");
      return;
    }

    authAPI.getSession()
      .then(({ user }) => {
        setStatus(["admin", "director"].includes(user?.role) ? "authorized" : "unauthorized");
      })
      .catch(() => {
        window.localStorage.removeItem("token");
        setStatus("unauthorized");
      });
  }, []);

  if (status === "checking") {
    return <div className="flex min-h-screen items-center justify-center text-gray-500">Checking session...</div>;
  }

  return status === "authorized" ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
