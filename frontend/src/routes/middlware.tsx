import {  type ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import type { AuthContextType } from "../context/AuthContext";
import NotAuthorized from "../pages/NotAuthorized";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated, loading } = useAuth() as AuthContextType;
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <NotAuthorized />;
  }

  return children;
};
