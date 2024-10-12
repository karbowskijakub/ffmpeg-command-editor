import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    return <>{children}</>;
};