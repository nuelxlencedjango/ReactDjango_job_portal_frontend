import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Token management helpers
const getAccessToken = () => {
  return Cookies.get("access_token") || localStorage.getItem("access_token");
};

const setAccessToken = (token) => {
  Cookies.set("access_token", token, { secure: true, sameSite: 'strict', expires: 1 });
  localStorage.setItem("access_token", token);
};

const clearTokens = () => {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor with token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = Cookies.get("refresh_token") || localStorage.getItem("refresh_token");
        if (!refreshToken) {
          clearTokens();
          window.location.href = "/login";
          return Promise.reject(error);
        }

        // Refresh token request
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/token/refresh/`,
          { refresh: refreshToken },
          { withCredentials: true }
        );

        const newAccessToken = response.data.access;
        setAccessToken(newAccessToken);
        
        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        clearTokens();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;