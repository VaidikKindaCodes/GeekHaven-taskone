import type { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import type { AuthContextType } from "../context/AuthContext";
import NotAuthorized from "../pages/NotAuthorized";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuth() as AuthContextType;

  if (!isAuthenticated) {
    return <NotAuthorized />;
  }

  return children;
};
