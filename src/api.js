
import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants';
import jwt_decode from "jwt-decode";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Automatically refresh token if it’s expired before making the request
api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem(REFRESH_TOKEN);
            try {
                const res = await api.post("/api/token/refresh/", { refresh: refreshToken });
                if (res.status === 200) {
                    localStorage.setItem(ACCESS_TOKEN, res.data.access);
                    originalRequest.headers['Authorization'] = `Bearer ${res.data.access}`;
                    return api(originalRequest);
                }
            } catch (err) {
                console.log("Refresh token expired or invalid.");
            }
        }
        return Promise.reject(error);
    }
);

export default api;




