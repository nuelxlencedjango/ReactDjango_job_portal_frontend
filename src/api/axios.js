

/*import axios from 'axios';
import { refreshToken } from './refreshToken';

//Axios instance
const instance = axios.create({
  baseURL: 'https://i-wanwok-backend.up.railway.app/', 
  withCredentials: true,  

// interceptor to handle token refresh on 401 errors
instance.interceptors.response.use(
  response => response,  
  async error => {
    if (error.response && error.response.status === 401) {  
      try {
        await refreshToken(); 
        return instance.request(error.config);  
      } catch (e) {
        console.error('Failed to refresh token', e);  
      }
    }
    return Promise.reject(error);  
  }
);

export default instance;*/




import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: 'https://i-wanwok-backend.up.railway.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  config => {
    const token = Cookies.get('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
