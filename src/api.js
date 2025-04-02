import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

const getAccessToken = () => Cookies.get("access_token");

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

const refreshAccessToken = async () => {
  const refreshToken = Cookies.get("refresh_token");
  if (!refreshToken) throw new Error("No refresh token available");

  try {
    const response = await api.post("/api/token/refresh/", { refresh: refreshToken });
    const newAccessToken = response.data.access;
    Cookies.set("access_token", newAccessToken, { secure: true, httpOnly: true });
    return newAccessToken;
  } catch (error) {
    window.location.href = "/login";
    throw error;
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(error.config);
        }
      } catch (e) {
        console.error("Token refresh failed:", e);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
