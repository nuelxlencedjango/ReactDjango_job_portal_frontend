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
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

const PaymentPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const totalAmount = location.state?.totalAmount || 0; // Get the totalAmount from the Cart component

  const [amount, setAmount] = useState(totalAmount);

  // Update the amount if the totalAmount changes
  useEffect(() => {
    setAmount(totalAmount);
  }, [totalAmount]);

  // Flutterwave configuration
  const config = {
    public_key: "FLWPUBK_TEST-6941e4117be9902646d54ec0509e804c-X", // Replace with your actual public key
    tx_ref: "iwanwok_" + Math.floor(Math.random() * 1000000000 + 1),
    amount: amount,
    currency: "NGN",
    redirect_url: "https://www.i-wan-wok.com/payment_confirmation/",
    customer: {
      email: "user@example.com", // Replace with dynamic email from form
      phone_number: "070********", // Replace with dynamic phone number from form
      name: "John Doe", // Replace with dynamic name from form
    },
    customizations: {
      title: "Iwan_wok",
      description: "Payment for the services requested",
    },
  };

  // Initialize Flutterwave payment
  const handleFlutterPayment = useFlutterwave(config);

  // Form submission handler
  const onSubmit = (data) => {
    console.log(data); // Form data (email, phoneNumber, fullname, etc.)

    // Trigger Flutterwave payment
    handleFlutterPayment({
      callback: (response) => {
        console.log(response);
        closePaymentModal(); // Close the payment modal
        alert("Payment was successfully completed!");
        navigate("/payment_confirmation"); // Redirect to a confirmation page
      },
      onClose: () => {
        alert("Payment closed!");
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Payment</h1>

        {/* Card Details */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Card Number</label>
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            {...register("cardNumber", { required: "Card number is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber.message}</p>}
        </div>

        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium mb-2">Expiration</label>
            <input
              type="text"
              placeholder="MM/YY"
              {...register("expiration", { required: "Expiration is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.expiration && <p className="text-red-500 text-sm">{errors.expiration.message}</p>}
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium mb-2">CVC</label>
            <input
              type="text"
              placeholder="123"
              {...register("cvc", { required: "CVC is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.cvc && <p className="text-red-500 text-sm">{errors.cvc.message}</p>}
          </div>
        </div>

        {/* Customer Info */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Full Name</label>
          <input
            type="text"
            placeholder="Full Name"
            {...register("fullname", { required: "Full name is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            placeholder="user@example.com"
            {...register("email", { required: "Email is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
          <input
            type="text"
            placeholder="070********"
            {...register("phoneNumber", { required: "Phone number is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
        </div>

        {/* Total Amount */}
        <div className="mb-4 text-right">
          <h3 className="text-xl font-bold">
            Total: ₦{amount.toFixed(2)}
          </h3>
        </div>

        {/* Terms and Conditions */}
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="terms"
            {...register("terms", { required: "You must agree to the terms" })}
            className="mr-2"
          />
          <label htmlFor="terms">
            I declare to have read the <a href="#" className="text-blue-600">Privacy Policy</a> and agree to the{" "}
            <a href="#" className="text-blue-600">T&C of Booking</a>.
          </label>
          {errors.terms && <p className="text-red-500 text-sm">{errors.terms.message}</p>}
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