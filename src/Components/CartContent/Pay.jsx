

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaCreditCard, FaShoppingCart } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

const Checkout = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Fetch user details and cart items from the API
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) return navigate('/login');
        
        const userResponse = await axios.get('/api/user/details', { headers: { Authorization: `Bearer ${token}` } });
        setUserDetails(userResponse.data);
        
        const cartResponse = await axios.get('/api/cart/items', { headers: { Authorization: `Bearer ${token}` } });
        setCartItems(cartResponse.data.items);
        setTotalAmount(cartResponse.data.totalAmount);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [navigate]);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) return navigate('/login');
      
      const checkoutData = {
        user_id: userDetails.id,
        items: cartItems.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price
        })),
        total_amount: totalAmount,
        shipping_address: data.shipping_address,
        payment_method: data.payment_method
      };

      const response = await axios.post('/api/checkout', checkoutData, { headers: { Authorization: `Bearer ${token}` } });
      if (response.status === 201) {
        navigate(`/payment/${response.data.order_id}`);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Checkout</h2>

        {/* User Info */}
        {userDetails && (
          <div className="space-y-4">
            <p><strong>Name:</strong> {userDetails.full_name}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>Phone:</strong> {userDetails.phone}</p>
            <p><strong>Address:</strong> {userDetails.address}</p>
          </div>
        )}

        {/* Cart Items */}
        <div className="mt-8 space-y-4">
          <h3 className="text-2xl font-medium text-gray-700">Cart Items</h3>
          <ul className="space-y-2">
            {cartItems.map(item => (
              <li key={item.product_id} className="flex justify-between items-center">
                <span>{item.name} (x{item.quantity})</span>
                <span>${item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Total */}
        <div className="mt-6 flex justify-between items-center text-lg font-semibold">
          <span>Total Amount</span>
          <span>${totalAmount}</span>
        </div>

        {/* Shipping Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="shipping_address">Shipping Address</label>
            <input
              {...register('shipping_address', { required: true })}
              type="text"
              id="shipping_address"
              placeholder="Enter your shipping address"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 mb-2" htmlFor="payment_method">Payment Method</label>
            <select
              {...register('payment_method', { required: true })}
              id="payment_method"
              className="w-full p-3 border border-gray-300 rounded-md"
            >
              <option value="credit_card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bank_transfer">Bank Transfer</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full mt-6 py-3 bg-blue-600 text-white font-semibold rounded-md flex items-center justify-center gap-2 hover:bg-blue-700 transition duration-300"
          >
            <FaCreditCard />
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
