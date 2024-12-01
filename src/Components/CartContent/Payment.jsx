{/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState(0); 

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment submission logic here

    alert('Payment processed successfully!');
    navigate('/confirmation'); 
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center py-10">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Payment</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-1">Payment Method</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">Select a payment method</option>
              <option value="creditCard">Credit Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>

          {paymentMethod === 'creditCard' && (
            <div>
              <div>
                <label className="block text-gray-600 font-medium mb-1">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="1234 5678 1234 5678"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Expiration Date</label>
                  <input
                    type="text"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">CVV</label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="123"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-gray-600 font-medium mb-1">Amount</label>
            <input
              type="text"
              value={`$${amount}`}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none transition-all duration-300"
            >
              Submit Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;*/}


import React from "react";
import { useForm } from "react-hook-form";
import { FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";

const PaymentPage = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Payment</h1>

        {/* Payment Options */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="card"
              value="card"
              {...register("paymentMethod", { required: true })}
              className="mr-2"
            />
            <label htmlFor="card" className="flex items-center">
              Cards <FaCcVisa className="ml-1 text-blue-600" />
              <FaCcMastercard className="ml-1 text-red-600" />
              <FaCcAmex className="ml-1 text-purple-600" />
            </label>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <input
              type="radio"
              id="googlepay"
              value="googlepay"
              {...register("paymentMethod")}
              className="mr-2"
            />
            <label htmlFor="googlepay">Google Pay</label>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <input
              type="radio"
              id="paypal"
              value="paypal"
              {...register("paymentMethod")}
              className="mr-2"
            />
            <label htmlFor="paypal">PayPal</label>
          </div>
        </div>

        {/* Card Details */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Card Number</label>
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            {...register("cardNumber", { required: true })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium mb-2">Expiration</label>
            <input
              type="text"
              placeholder="MM/YY"
              {...register("expiration", { required: true })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium mb-2">CVC</label>
            <input
              type="text"
              placeholder="3 digits"
              {...register("cvc", { required: true })}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Card Holder Name</label>
          <input
            type="text"
            placeholder="Card Holder Name"
            {...register("cardHolderName", { required: true })}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Terms and Conditions */}
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="terms"
            {...register("terms", { required: true })}
            className="mr-2"
          />
          <label htmlFor="terms">
            I declare to have read the <a href="#" className="text-blue-600">Privacy Policy</a> and agree to the{" "}
            <a href="#" className="text-blue-600">T&C of Booking</a>.
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 w-full"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;

