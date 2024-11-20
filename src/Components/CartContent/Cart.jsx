import React, { useEffect, useState } from 'react';
import api from '../../api';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = Cookies.get('access_token');
      if (!token) {
        navigate('/login'); 
        return;
      }

      try {
        setLoading(true);
        const response = await api.get('/employers/cart/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [navigate]);

  const handleRemoveFromCart = async (itemId) => {
    const token = Cookies.get('access_token');
    try {
      await api.delete(`/employers/cart/${itemId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
      alert('Item removed from cart!');
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 mt-32">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>

      {loading && <div>Loading...</div>}

      {cartItems.length === 0 && !loading && (
        <p className="text-gray-600">Your cart is empty.</p>
      )}

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-white rounded-lg shadow-lg flex flex-col items-center"
          >
            {item.artisan.profile_img ? (
              <img
                src={item.artisan.profile_img}
                alt={`${item.artisan.user?.first_name}'s profile`}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-300 mb-4"></div>
            )}
            <h2 className="text-lg font-semibold mb-2">
              {item.artisan.user?.first_name} {item.artisan.user?.last_name}
            </h2>
            <p className="text-gray-600 mb-2">Location: {item.artisan.location?.location}</p>
            <p className="text-gray-600 mb-2">Service: {item.artisan.service?.title}</p>
            <p className="text-gray-600 mb-2">Pay: ${item.artisan.pay}</p>

            <button
              onClick={() => handleRemoveFromCart(item.id)}
              className="mt-auto bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Remove from Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
