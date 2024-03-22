import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AdminProvider";

const useAdmin = () => {
  const { isLoggedIn, logout } = useContext(AuthContext) || {};
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);

  useEffect(() => {
    setIsAdmin(isLoggedIn || false);
    setIsAdminLoading(false);
  }, [isLoggedIn]);

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
