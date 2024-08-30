// src/api/refreshToken.js

import axios from './axios';

export const refreshToken = async () => {
  try {
    await axios.post('token/refresh/');
    console.log('Token refreshed');
  } catch (error) {
    console.error('Token refresh failed', error);
  }
};




