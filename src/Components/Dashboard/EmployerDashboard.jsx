import React, { useState } from "react";
import api from "../../api";
import Cookies from "js-cookie";

const Dashboard = () => {
  const [lastPayment, setLastPayment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLastPayment = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = Cookies.get("token"); // Get the token from cookies
      const response = await api.get("/employer/last-payment/", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });
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
                src="https://via.placeholder.com/50"
                alt="Company Logo"
                className="h-12 w-12 rounded-full"
              />
              <span className="ml-3 text-2xl font-semibold text-gray-800">
                Artisan Pro
              </span>
            </div>

            {/* User Name */}
            <div className="flex items-center">
              <span className="text-gray-700 mr-2">Welcome,</span>
              <span className="font-semibold text-gray-800">John Doe</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Flex container for sidebar and main content */}
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white shadow-md rounded-lg p-4 mb-6 md:mb-0 md:mr-6">
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
                    <span>Expected Artisan</span>
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
          <div className="flex-1">
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Dashboard Overview
              </h2>

              {/* Example Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h3 className="text-lg font-semibold text-blue-800">Pending Orders</h3>
                  <p className="text-3xl font-bold text-blue-800">3</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h3 className="text-lg font-semibold text-green-800">Active Jobs</h3>
                  <p className="text-3xl font-bold text-green-800">12</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h3 className="text-lg font-semibold text-purple-800">Completed Jobs</h3>
                  <p className="text-3xl font-bold text-purple-800">45</p>
                </div>
              </div>

              {/* Last Payment Section */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Last Payment Details
                </h3>

                {loading && <p className="text-gray-600">Loading...</p>}
                {error && (
                  <p className="text-red-500">{error}</p>
                )}
                {lastPayment && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-600">Transaction Reference:</p>
                        <p className="font-semibold">{lastPayment.tx_ref}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Cart:</p>
                        <p className="font-semibold">{lastPayment.cart}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Total Amount:</p>
                        <p className="font-semibold">{lastPayment.total_amount}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Transaction ID:</p>
                        <p className="font-semibold">{lastPayment.transaction_id}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Status:</p>
                        <p className="font-semibold">{lastPayment.status}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Last Modified:</p>
                        <p className="font-semibold">
                          {new Date(lastPayment.modified_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;