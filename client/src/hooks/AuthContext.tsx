// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";


interface AuthContextType {
    isAuthenticated: boolean;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const checkAuth = async () => {
        try {
            await axios.get("/checkIsLoggedIn");
            setIsAuthenticated(true);
        } catch (error) {
            setIsAuthenticated(false);
        }
    };


    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error();
    }
    return context;
};
