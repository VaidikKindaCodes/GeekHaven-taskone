import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router';

type Props = { children: React.ReactNode };

export default function Publicroutes(children: Props) {
    const auth = useAuth();
    if(auth?.isAuthenticated){
        return <>{children}</>
    }
    return <Navigate to="/dashboard" replace/>
}