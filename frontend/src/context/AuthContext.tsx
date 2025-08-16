import React, { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface User {
  _id: string;
  username: string;
  email: string;
}

export interface AuthContextType {
  token: string | null;
  user: User | null;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(getCookie("token"));
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const cookieToken = getCookie("token");
    const storedUser = getCookie("user");
    if (cookieToken) setToken(cookieToken);
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const logout = () => {
    setToken(null);
    setUser(null);
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("user");
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, user, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
