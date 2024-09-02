import axios from 'axios';
import Cookies from 'js-cookie';

export const placeOrder = async (payload) => {
  const accessToken = Cookies.get('access_token');

  if (!accessToken) {
    throw new Error('Authentication credentials were not provided.');
  }

  try {
    const response = await axios.post(
      'https://i-wanwok-backend.up.railway.app/employers/order-request/',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
};







{/*import axios from 'axios';
import Cookies from 'js-cookie';

export const placeOrder = async (payload) => {
  const token = Cookies.get('access_token'); // Get the token from cookies
  
  try {
    const response = await axios.post(
      'https://i-wanwok-backend.up.railway.app/orders/',
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};*/}

