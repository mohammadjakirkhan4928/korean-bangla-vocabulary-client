import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AdminProvider";
import useAdmin from "../hooks/useAdmin";
import Loader from "../shared/loader/Loader";

const Adminroute = ({ children }) => {
  const { isLoggedIn, loading } = useContext(AuthContext) || {};
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      // Redirect to login page if not logged in
      return <Navigate to="/adminlogin" />;
    }
  }, [isLoggedIn]);

  if (loading || isAdminLoading) {
    return <Loader />;
  }

  if (isLoggedIn && isAdmin) {
    // If logged in and admin, render children
    return children;
  } else {
    // If not an admin, redirect to login
    return <Navigate to="/adminlogin" state={{ from: location }} replace />;
  }
};

export default Adminroute;
