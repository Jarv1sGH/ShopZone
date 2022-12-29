import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  if (loading === false)
    if (isAuthenticated === false) {
      return <Navigate to="/Login" />;
    }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
