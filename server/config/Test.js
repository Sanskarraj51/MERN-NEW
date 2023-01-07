import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const storedToken = localStorage.getItem("token");
  return storedToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;