import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from '../../api';


const ArtisanDashboard = () => {
  const [userDetails, setUserDetails] = useState({
    username: 'Loading...',
    companyName: 'Artisan Pro',
    companyLogo: 'https://via.placeholder.com/50',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = Cookies.get('access_token');
        const response = await api.get('acct/user-profile/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserDetails({
          username: response.data.first_name
            ? `${response.data.first_name} ${response.data.last_name}`
            : response.data.username,
          companyName: response.data.company_name || 'Artisan Pro',
          companyLogo: response.data.company_logo || 'https://via.placeholder.com/50',
        });
      } catch (err) {
        setError('Failed to fetch user details.');
        console.error('Error fetching user details:', err);
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Company Logo and Name */}
            <div className="flex items-center">
              <img
                src={userDetails.companyLogo}
                alt="Company Logo"
                className="h-12 w-12 rounded-full"
              />
              <span className="ml-3 text-2xl font-semibold text-gray-800">
                {userDetails.companyName}
              </span>
            </div>

            {/* User Name */}
            <div className="flex items-center">
              <span className="text-gray-700 mr-2">Welcome,</span>
              <span className="font-semibold text-gray-800">{userDetails.username}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {error && <p className="text-red-500 mb-4">{error}</p>}
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
                  <a
                    href="#"
                    className="flex items-center p-3 text-gray-700 hover:bg-indigo-100 rounded-lg transition duration-300"
                  >
                    <span>Earnings</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-3 text-gray-700 hover:bg-indigo-100 rounded-lg transition duration-300"
                  >
                    <span>Jobs</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-3 text-gray-700 hover:bg-indigo-100 rounded-lg transition duration-300"
                  >
                    <span>Completed Jobs</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-3 text-gray-700 hover:bg-indigo-100 rounded-lg transition duration-300"
                  >
                    <span>Professional Dashboard</span>
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h3 className="text-lg font-semibold text-blue-800">Total Earnings</h3>
                  <p className="text-3xl font-bold text-blue-800">₦0.00</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h3 className="text-lg font-semibold text-green-800">Active Jobs</h3>
                  <p className="text-3xl font-bold text-green-800">0</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h3 className="text-lg font-semibold text-purple-800">Completed Jobs</h3>
                  <p className="text-3xl font-bold text-purple-800">0</p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Stats</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-yellow-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h4 className="text-lg font-semibold text-yellow-800">Pending Orders</h4>
                  <p className="text-2xl font-bold text-yellow-800">0</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h4 className="text-lg font-semibold text-indigo-800">Total Reviews</h4>
                  <p className="text-2xl font-bold text-indigo-800">0</p>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h4 className="text-lg font-semibold text-teal-800">New Messages</h4>
                  <p className="text-2xl font-bold text-teal-800">0</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h4 className="text-lg font-semibold text-red-800">Refunds Pending</h4>
                  <p className="text-2xl font-bold text-red-800">0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanDashboard;