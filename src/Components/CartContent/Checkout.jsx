import React, { useState } from 'react';
import axios from 'axios';

function CheckoutPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    shipping_address: '',
    billing_address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem('authToken'); // Replace with your authentication token retrieval method
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/checkout/',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Checkout successful:', response.data);
      // Redirect to payment page or show success message
    } catch (error) {
      console.error('Error during checkout:', error.response.data);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <form>
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="shipping_address"
          placeholder="Shipping Address"
          value={formData.shipping_address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="billing_address"
          placeholder="Billing Address (Optional)"
          value={formData.billing_address}
          onChange={handleChange}
        />
        <button type="button" onClick={handleCheckout}>
          Proceed to Payment
        </button>
      </form>
    </div>
  );
}

export default CheckoutPage;
