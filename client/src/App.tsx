
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Main from "./pages/Main";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ConfirmationEmail from "./pages/ConfirmationEmail";
import { RequireAuth } from "./components/RequireAuth";
import { AuthProvider } from "./hooks/AuthContext"; 

const queryClient = new QueryClient();

const App = () => {  
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider> 
                <Router>
                    <Routes>
                        <Route
                            path="/main"
                            element={
                                <RequireAuth>
                                    <Main />
                                </RequireAuth>
                            }
                        />
                        <Route path="/" element={<Navigate to="/main" />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/confirmation-email" element={<ConfirmationEmail />} />
                        <Route path="*" element={<Navigate to="/main" />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </QueryClientProvider>
    );
};

export default App;  
