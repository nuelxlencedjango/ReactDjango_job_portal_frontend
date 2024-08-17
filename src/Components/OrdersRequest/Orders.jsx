import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrderForm = ({ artisanId }) => {
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');  // Get token from localStorage

        try {
            const response = await axios.post('https://i-wanwok-backend.up.railway.app/artisans/order-request/', {
                artisan: artisanId,
                description,
            }, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });

            if (response.status === 201) {
                // Navigate to a success page or display success message
                navigate('/success');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // User is not logged in, redirect to login page
                navigate('/login');
            } else {
                console.error('There was an error submitting the order request:', error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your request"
                required
            />
            <button type="submit">Order Now</button>
        </form>
    );
};

export default OrderForm;
