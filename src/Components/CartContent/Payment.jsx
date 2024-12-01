import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState(100); // Sample amount for the payment
  const [userDetails, setUserDetails] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, City, Country',
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment submission logic here

    alert('Payment processed successfully!');
    navigate('/confirmation'); 
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center py-10">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Payment</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - User Details */}
          <div className="space-y-4">
            <h2 className="text-xl font-medium text-gray-800 mb-4">User Details</h2>
            <div className="space-y-2">
              <p><strong>Name:</strong> {userDetails.fullName}</p>
              <p><strong>Email:</strong> {userDetails.email}</p>
              <p><strong>Phone:</strong> {userDetails.phone}</p>
              <p><strong>Address:</strong> {userDetails.address}</p>
            </div>
          </div>

          {/* Right Column - Payment Details */}
          <div className="space-y-4">
            <h2 className="text-xl font-medium text-gray-800 mb-4">Payment Details</h2>
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
      </div>
    </div>
  );
};

export default Payment;
