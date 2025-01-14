// api.js
{/*import axios from 'axios';
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

export default api;*/}



{/*import axios from 'axios';
import Cookies from 'js-cookie'; 

// Axios instance for API requests
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,  // Backend URL
  withCredentials: true,  // includes in requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get the access token from cookies
const getAccessToken = () => {
  return Cookies.get('access_token');  // Get the access token from cookies
};

// Add Authorization token to headers
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();  // Retrieve token from cookies
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;  // Attach token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to refresh the access token
const refreshAccessToken = async () => {
  const refreshToken = Cookies.get('refresh_token');  // Get refresh token from cookies
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  try {
    const response = await api.post('/api/token/refresh/', { refresh: refreshToken });
    const newAccessToken = response.data.access;
    
    // Save new access token in cookies
    Cookies.set('access_token', newAccessToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'None',
    });
    return newAccessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    window.location.href = '/login';  // Redirects to login if refresh fails
  }
};

// Axios response interceptor for handling token expiration
api.interceptors.response.use(
  (response) => response,  // Return the response if successful
  async (error) => {
    if (error.response && error.response.status === 401) {  // If token is expired
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

export default api;*/}




// api.js
{/*import axios from 'axios';
import Cookies from 'js-cookie';

// Axios instance for API requests
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,  // Backend URL
  withCredentials: true,  // include cookies in requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get the access token from cookies
const getAccessToken = () => {
  return Cookies.get('access_token');  // Retrieve the access token from cookies
};

// Add Authorization token to headers
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();  // Retrieve token from cookies
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;  // Attach token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to refresh the access token
const refreshAccessToken = async () => {
  const refreshToken = Cookies.get('refresh_token');  // Get refresh token from cookies
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  try {
    const response = await api.post('/api/token/refresh/', { refresh: refreshToken });
    const newAccessToken = response.data.access;

    // Save new access token in cookies
    Cookies.set('access_token', newAccessToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'None',  // Ensures cookies are sent with cross-origin requests
    });
    return newAccessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    window.location.href = '/login';  // Redirects to login if refresh fails
    throw error;
  }
};

// Axios response interceptor for handling token expiration
api.interceptors.response.use(
  (response) => response,  // Return the response if successful
  async (error) => {
    if (error.response && error.response.status === 401) {  // If token is expired or invalid
      try {
        // Attempt to refresh the token
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
          // Retry the original request with new token
          return axios(error.config); 
        }
      } catch (e) {
        console.error('Failed to refresh token', e);
        window.location.href = '/login';  // Redirect to login if token refresh fails
      }
    }
    return Promise.reject(error);  // If not a token issue, reject the error
  }
);

export default api;*/}




{/*import axios from 'axios';
import Cookies from 'js-cookie';

// Axios instance for API requests
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,  // Ensure it's correctly configured from the .env file
  withCredentials: true,  // Include cookies in requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get the access token from cookies
const getAccessToken = () => {
  return Cookies.get('access_token');  // Retrieve the access token from cookies
};

// Add Authorization token to headers
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();  // Retrieve token from cookies
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;  // Attach token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to refresh the access token
const refreshAccessToken = async () => {
  const refreshToken = Cookies.get('refresh_token');  // Get refresh token from cookies
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  try {
    // Send the refresh token to the backend to get a new access token
    const response = await api.post('/api/token/refresh/', { refresh: refreshToken });
    const newAccessToken = response.data.access;

    // Save the new access token in cookies
    Cookies.set('access_token', newAccessToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'None',  // Ensures cookies are sent with cross-origin requests
    });

    return newAccessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    window.location.href = '/login';  // Redirects to login if refresh fails
    throw error;
  }
};

// Axios response interceptor for handling token expiration
api.interceptors.response.use(
  (response) => response,  // Return the response if successful
  async (error) => {
    if (error.response && error.response.status === 401) {  // If token is expired or invalid
      try {
        // Attempt to refresh the token
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          // Retry the original request with the new token
          error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axios(error.config); 
        }
      } catch (e) {
        console.error('Failed to refresh token', e);
        window.location.href = '/login';  // Redirect to login if refresh fails
      }
    }
    return Promise.reject(error);  // If not a token issue, reject the error
  }
);

export default api;*/}



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
