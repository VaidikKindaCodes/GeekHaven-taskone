import React, { createContext, useEffect, useState} from "react";
import type { ReactNode } from "react";

interface User {
  _id: string;
  username : string;
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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [user , setUser] = useState<User | null>(null);

  useEffect(()=>{
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser));
  } , [])

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
  let isAuthenticated = false;
  if(token) isAuthenticated = true;

  return (
    <AuthContext.Provider value={{ token, user,  logout, isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
};
