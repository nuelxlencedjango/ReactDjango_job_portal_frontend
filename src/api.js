{/*

import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true 
});

export default api;
*/}



import axios from "axios";
import Cookies from "js-cookie"; 
import { useNavigate } from "react-router-dom";

// Axios instance to make API requests
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // include cookies in the requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to refresh the access token
const refreshAccessToken = async () => {
  const refreshToken = Cookies.get("refresh_token"); // Get the refresh token from cookies
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  try {
    // Make a request to the refresh token endpoint
    const response = await api.post("/api/token/refresh/", {
      refresh: refreshToken,
    });
    
    // If successful, set the new access token in cookies
    Cookies.set("access_token", response.data.access, {
      secure: true, // Ensure this cookie is set over HTTPS
      httpOnly: true, // This will prevent JS access to the cookie
      sameSite: "Strict", // Recommended to prevent CSRF
    });
    return response.data.access;
  } catch (error) {
    console.error("Error refreshing token:", error);
    window.location.href = "/login"; // Redirect to login if refresh fails
  }
};

// Axios response interceptor to handle token expiration and refresh
api.interceptors.response.use(
  (response) => response,  // If the response is successful, just return it
  async (error) => {
    if (error.response && error.response.status === 401) {
      // If the error is due to an expired token, attempt to refresh it
      try {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          // Retry the original request with the new access token
          error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axios(error.config); // Retry the failed request with the new token
        }
      } catch (e) {
        console.error("Failed to refresh token", e);
        window.location.href = "/login"; // If refresh fails, force login
      }
    }
    return Promise.reject(error); // If it's not a token issue, reject the error
  }
);

export default api;
