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
        const response = await api.get('/employers/cart-items/', {
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

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.artisan.pay, 0);
  };

  return (
    <div className="container mx-auto px-4 mt-32">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>

      {loading && <div>Loading...</div>}

      {cartItems.length === 0 && !loading && (
        <p className="text-gray-600">Your cart is empty.</p>
      )}

      <div className="flex gap-4">
        {/* Cart Items Section */}
        <div className="w-3/4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-white rounded-lg shadow-lg flex items-center mb-4"
            >
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="mr-4 bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Remove
              </button>

              {item.artisan.profile_img ? (
                <img
                  src={item.artisan.profile_img}
                  alt={`${item.artisan.user?.first_name}'s profile`}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-300 mr-4"></div>
              )}

              <div className="flex-grow">
                <h2 className="text-lg font-semibold">
                  {item.artisan.user?.first_name} {item.artisan.user?.last_name}
                </h2>
                <p className="text-gray-600">Location: {item.artisan.location?.location}</p>
                <p className="text-gray-600">Service: {item.artisan.service?.title}</p>
                <p className="text-gray-600">Pay: ${item.artisan.pay}</p>
              </div>
            </div>
          ))}
          
          {/* Total Amount under Items */}
          <div className="bg-gray-200 p-4 rounded-lg mt-6">
            <p className="font-semibold text-lg">Total Amount:</p>
            <p className="text-xl font-bold">${calculateTotal().toFixed(2)}</p>
          </div>
        </div>

        {/* Total Box on the Right */}
        <div className="w-1/4">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <p className="text-lg">Total Amount</p>
            <p className="text-3xl font-bold">${calculateTotal().toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
