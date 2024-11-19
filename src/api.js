

/*import axios from "axios";
import { ACCESS_TOKEN } from './constants'; 

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
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

export default api;*/


import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true  // Including credentials with requests
});

export default api;


/*import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://your-backend-url/api/',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
});

export default axiosInstance;*/


// authUtils.js
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const useAuthCheck = () => {
  const navigate = useNavigate();

  return () => {
    const token = Cookies.get('access_token');
    if (!token) {
      navigate('/login'); 
      return false;
    }
    return token; 
  };
};
