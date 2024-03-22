import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AdminProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check authentication status
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
        setLoading(false);
    }, []);

    const logout = () => {
        // Logout functionality
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AdminProvider;
