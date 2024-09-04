// src/api/auth.js
import axiosInstance from './axios';
import Cookies from 'js-cookie';

export const isAuthenticated = () => {
  const token = Cookies.get('access_token');
  return !!token;
};

export const verifyToken = async (token) => {
  try {
    const response = await axiosInstance.post('employers/auth/verify-token/', { token });
    return response.data.valid;
  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
};
