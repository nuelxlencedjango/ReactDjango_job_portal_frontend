

import axios from 'axios';
import { refreshToken } from './refreshToken';

// Create an Axios instance
const instance = axios.create({
  baseURL: 'https://i-wanwok-backend.up.railway.app/',  // Adjust according to your Django server URL
  withCredentials: true,  // Ensure cookies are sent with requests
});

// Add an interceptor to handle token refresh on 401 errors
instance.interceptors.response.use(
  response => response,  // Pass through successful responses
  async error => {
    if (error.response && error.response.status === 401) {  // Check for unauthorized status
      try {
        await refreshToken();  // Attempt to refresh the token
        return instance.request(error.config);  // Retry the original request
      } catch (e) {
        console.error('Failed to refresh token', e);  // Handle token refresh failure
      }
    }
    return Promise.reject(error);  // Pass through other errors
  }
);

export default instance;
