import React, { useState } from 'react';
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

export default Payment;

