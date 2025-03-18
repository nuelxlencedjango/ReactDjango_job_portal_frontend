import React, { useState } from 'react';
import api from "../../api";

const Dashboard = () => {
  const userName = "John Doe";
  const companyName = "Artisan Pro";
  const companyLogo = "https://via.placeholder.com/50";
  const [lastPayment, setLastPayment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLastPayment = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/api/last-payment/');
      setLastPayment(response.data);
    } catch (err) {
      setError("Failed to fetch last payment details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Company Logo and Name */}
            <div className="flex items-center">
              <img
                src={companyLogo}
                alt="Company Logo"
                className="h-12 w-12 rounded-full"
              />
              <span className="ml-3 text-2xl font-semibold text-gray-800">
                {companyName}
              </span>
            </div>

            {/* User Name */}
            <div className="flex items-center">
              <span className="text-gray-700 mr-2">Welcome,</span>
              <span className="font-semibold text-gray-800">{userName}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white shadow-md rounded-lg p-4 h-screen">
            <nav>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="flex items-center p-3 text-gray-700 hover:bg-indigo-100 rounded-lg transition duration-300"
                  >
                    <span>Home</span>
                  </a>
                </li>
                <li>
                  <button
                    onClick={fetchLastPayment}
                    className="flex items-center p-3 text-gray-700 hover:bg-indigo-100 rounded-lg transition duration-300 w-full text-left"
                  >
                    <span>Last Payment</span>
                  </button>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-3 text-gray-700 hover:bg-indigo-100 rounded-lg transition duration-300"
                  >
                    <span>Order History</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-3 text-gray-700 hover:bg-indigo-100 rounded-lg transition duration-300"
                  >
                    <span>Expected artisan</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-3 text-gray-700 hover:bg-indigo-100 rounded-lg transition duration-300"
                  >
                    <span>Customer Support</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-3 text-gray-700 hover:bg-indigo-100 rounded-lg transition duration-300"
                  >
                    <span>Logout</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-3 text-gray-700 hover:bg-indigo-100 rounded-lg transition duration-300"
                  >
                    <span>Settings</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main Dashboard Content */}
          <div className="flex-1 ml-6">
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Dashboard Overview
              </h2>

              {/* Display Last Payment Details */}
              {loading && <p>Loading...</p>}
              {error && <p className="text-red-500">{error}</p>}
              {lastPayment && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Last Payment Details</h3>
                  <div className="space-y-2">
                    <p><strong>Transaction Reference:</strong> {lastPayment.tx_ref}</p>
                    <p><strong>Cart:</strong> {lastPayment.cart}</p>
                    <p><strong>Total Amount:</strong> {lastPayment.total_amount}</p>
                    <p><strong>Transaction ID:</strong> {lastPayment.transaction_id}</p>
                    <p><strong>Status:</strong> {lastPayment.status}</p>
                    <p><strong>Last Modified:</strong> {new Date(lastPayment.modified_at).toLocaleString()}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;