import React, { createContext, useState, useEffect } from "react";
import { login, logout, refreshToken, getToken } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setUser({ token });
    }
  }, []);

  const handleLogin = async (username, password) => {
    const token = await login(username, password);
    setUser({ token });
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  const handleRefreshToken = async () => {
    const token = await refreshToken();
    setUser({ token });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login: handleLogin,
        logout: handleLogout,
        refreshToken: handleRefreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
