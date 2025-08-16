import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type Props = { children: React.ReactNode };

export const PrivateRoute = ({ children }: Props) => {
    const auth = useAuth();
    if (!auth || auth.isAuthenticated === undefined) return null;

    return auth.isAuthenticated ? <>{children}</> : <Navigate to="/sign-in" replace />;
};
