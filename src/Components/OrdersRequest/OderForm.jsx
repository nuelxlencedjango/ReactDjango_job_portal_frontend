// src/Components/OrdersRequest/OrderForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axiosInstance from '../../api/axios';

const OrderForm = () => {
  const { artisanId } = useParams();
  const [orderDetails, setOrderDetails] = useState({ description: '', date: '', budget: '' });
  const [artisan, setArtisan] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtisanDetails = async () => {
      try {
        const response = await axiosInstance.get(`artisans/${artisanId}/`);
        setArtisan(response.data);
      } catch (error) {
        console.error('Error fetching artisan details:', error);
      }
    };

    fetchArtisanDetails();
  }, [artisanId]);

  const handleChange = (e) => {
    setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('access_token');

    if (!token) {
      navigate('/login');
      return;
    }

    try {
      await axiosInstance.post('orders/create/', { ...orderDetails, artisan: artisanId });
      alert('Order submitted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to submit order.');
    }
  };

  return (
    <div className="container mx-auto px-4 mt-32">
      {artisan ? (
        <>
          <h2 className="text-2xl font-semibold mb-4">Order Service from {artisan.user?.first_name} {artisan.user?.last_name}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700">Service Description</label>
              <textarea id="description" name="description" value={orderDetails.description} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block text-gray-700">Service Date</label>
              <input id="date" name="date" type="date" value={orderDetails.date} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
            </div>
            <div className="mb-4">
              <label htmlFor="budget" className="block text-gray-700">Budget</label>
              <input id="budget" name="budget" type="number" value={orderDetails.budget} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit Order</button>
          </form>
        </>
      ) : (
        <p>Loading artisan details...</p>
      )}
    </div>
  );
};

export default OrderForm;
