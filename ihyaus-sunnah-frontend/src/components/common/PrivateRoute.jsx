import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { authAPI } from "../../services/api";

const clearLegacyAuthStorage = () => {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("adminUser");
};

const PrivateRoute = () => {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    authAPI
      .getSession()
      .then(({ user }) => {
        setStatus(
          ["admin", "director"].includes(user?.role)
            ? "authorized"
            : "unauthorized"
        );
      })
      .catch(() => {
        clearLegacyAuthStorage();
        setStatus("unauthorized");
      });
  }, []);

  if (status === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-500">
        Checking session...
      </div>
    );
  }

  return status === "authorized" ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
