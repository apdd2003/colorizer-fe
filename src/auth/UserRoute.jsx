import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const UserRoute = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default UserRoute;
