import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Login function: save user and token
  function login(data: any) {
    localStorage.setItem("user", JSON.stringify(data?.user));
    localStorage.setItem("token", data?.token);
    setUser(data?.user);
  }

  // Logout function: clear user and token, redirect to signin
  function logout() {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  // On mount: check token and user in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, []);

  // Authentication status based on token existence
  const isAuthenticated = !!localStorage.getItem("token");

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
