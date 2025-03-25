


import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode"; 
import api from "../api";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        // Check authentication status on component mount
        auth().catch(() => setIsAuthorized(false));
    }, []);

    // Function to refresh the token
    const refreshToken = async () => {
        try {
            const response = await api.post("/api/token/refresh/");
            if (response.status === 200) {
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.error("Error refreshing token:", error);
            setIsAuthorized(false);
        }
    };

    // Function to check authentication status
    const auth = async () => {
        try {
            const token = document.cookie.split('; ').find(row => row.startsWith('access_token='));
            if (!token) {
                setIsAuthorized(false);
                return;
            }
            const decoded = jwtDecode(token.split('=')[1]);
            const tokenExpiration = decoded.exp;
            const now = Date.now() / 1000;

            if (tokenExpiration < now) {
                await refreshToken();
            } else {
                setIsAuthorized(true);
            }
        } catch (error) {
            console.error("Error decoding token:", error);
            setIsAuthorized(false);
        }
    };

    // Show loading message while checking authentication
    if (isAuthorized === null) {
        return <div>Loading ....</div>;
    }

    // Redirect to login if not authorized
    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
