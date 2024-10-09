// src/components/RequireAuth.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const navigate = useNavigate();
    const { isAuthenticated, checkAuth } = useAuth(); 

    useEffect(() => {
        const performAuthCheck = async () => {
            await checkAuth(); 
            if (!isAuthenticated) {
                navigate("/login"); 
            }
        };

        performAuthCheck(); 

    }, [isAuthenticated, navigate, checkAuth]);

    if (!isAuthenticated) return <div>Loading...</div>;

    return children;
};