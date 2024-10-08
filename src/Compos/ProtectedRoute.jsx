

{/*import { Navigate } from "react-router-dom";
import * as jwtDecodeModule from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

const jwt_decode = jwtDecodeModule.default || jwtDecodeModule;

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
    }, []);


    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);

        try {
            const res = await api.post("/api/token/refresh", { refresh: refreshToken });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        const decoded = jwt_decode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };

    if (isAuthorized === null) {
        return <div>Loading ....</div>;
    }
    return isAuthorized ? children : <Navigate to="/login" />; 
}

export default ProtectedRoute;*/}

{/*import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode"; // Importing directly from the package
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null); // 'null' means loading

    useEffect(() => {
        // Check authentication status on component mount
        auth().catch(() => setIsAuthorized(false));
    }, []);

    // Function to refresh the token
    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);

        if (!refreshToken) {
            setIsAuthorized(false);
            return;
        }

        try {
            const response = await api.post("/api/token/refresh/", { refresh: refreshToken });
            if (response.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
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
        const token = localStorage.getItem(ACCESS_TOKEN);

        if (!token) {
            setIsAuthorized(false);
            return;
        }

        try {
            const decoded = jwtDecode(token);
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

export default ProtectedRoute;*/}


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
