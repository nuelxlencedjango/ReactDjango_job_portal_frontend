// api.js
import axios from 'axios';
import Cookies from 'js-cookie'; 

// Axios instance for API requests
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,  // Backend URL
  withCredentials: true,  // includes in requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to refresh access token
const refreshAccessToken = async () => {
  const refreshToken = Cookies.get('refresh_token');  // Get refresh token from cookies
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  try {
    const response = await api.post('/api/token/refresh/', { refresh: refreshToken });
    Cookies.set('access_token', response.data.access, {
      secure: true,
      httpOnly: true,
      sameSite: 'None',  // ensures cookies are sent with cross-origin requests
    });
    return response.data.access;
  } catch (error) {
    console.error('Error refreshing token:', error);
    window.location.href = '/login';  // Redirects to login if refresh fails
  }
};

// Axios response interceptor for handling token expiration
api.interceptors.response.use(
  (response) => response, // Return the response if successful
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axios(error.config);  // Retry the original request with new token
        }
      } catch (e) {
        console.error('Failed to refresh token', e);
        window.location.href = '/login';  // Redirect to login if token refresh fails
      }
    }
    return Promise.reject(error);  // If not a token issue, reject the error
  }
);

export default api;


