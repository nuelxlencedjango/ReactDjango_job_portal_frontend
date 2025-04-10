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
      const token = Cookies.get("token"); 
      const response = await api.get("/employer/last-payment/", {
        headers: {
          Authorization: `Bearer ${token}`, 
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
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="flex items-center p-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 ease-in-out transform hover:translate-x-1"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>Home</span>
                  </a>
                </li>
                <li>
                  <button
                    onClick={fetchLastPayment}
                    className="flex items-center p-3 w-full text-left text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 ease-in-out transform hover:translate-x-1"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Last Payment</span>
                  </button>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 ease-in-out transform hover:translate-x-1"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span>Expected Artisan</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 ease-in-out transform hover:translate-x-1"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span>Order History</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 ease-in-out transform hover:translate-x-1"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span>Customer Support</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 ease-in-out transform hover:translate-x-1"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 ease-in-out transform hover:translate-x-1"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Pending Orders</h3>
                  <p className="text-3xl font-bold text-blue-800">3</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-green-500">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Active Jobs</h3>
                  <p className="text-3xl font-bold text-green-800">12</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-purple-500">
                  <h3 className="text-lg font-semibold text-purple-800 mb-2">Completed Jobs</h3>
                  <p className="text-3xl font-bold text-purple-800">45</p>
                </div>
              </div>

              {/* Last Payment Section */}
              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Last Payment Details
                  </h3>
                  <button
                    onClick={fetchLastPayment}
                    disabled={loading}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading...
                      </>
                    ) : (
                      "Refresh"
                    )}
                  </button>
                </div>

                {loading && !lastPayment && (
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                  </div>
                )}
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    </div>
                  </div>
                )}
                {lastPayment && (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-sm font-medium text-gray-500">Transaction Reference:</p>
                        <p className="mt-1 text-lg font-semibold text-gray-900">{lastPayment.tx_ref}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-sm font-medium text-gray-500">Cart No:</p>
                        <p className="mt-1 text-lg font-semibold text-gray-900">{lastPayment.cart}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-sm font-medium text-gray-500">Total Amount:</p>
                        <p className="mt-1 text-lg font-semibold text-gray-900">{lastPayment.total_amount}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-sm font-medium text-gray-500">Transaction ID:</p>
                        <p className="mt-1 text-lg font-semibold text-gray-900">{lastPayment.transaction_id}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-sm font-medium text-gray-500">Status:</p>
                        <p className={`mt-1 text-lg font-semibold ${
                          lastPayment.status === 'successful' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {lastPayment.status}
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-sm font-medium text-gray-500">Transaction Date:</p>
                        <p className="mt-1 text-lg font-semibold text-gray-900">
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