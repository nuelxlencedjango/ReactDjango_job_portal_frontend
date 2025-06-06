import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from '../../api';

const AdminDashboard = () => {
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
        if (!token) {
          throw new Error('No access token found. Please log in.');
        }
        const response = await api.get('acct/user-profile/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserDetails({
          username: response.data.first_name && response.data.last_name
            ? `${response.data.first_name} ${response.data.last_name}`
            : response.data.username || 'User',
          companyName: response.data.company_name || 'Artisan Pro',
          companyLogo: response.data.company_logo || 'https://via.placeholder.com/50',
        });
      } catch (err) {
        if (err.response?.status === 401) {
          window.location.href = '/login';
        }
        setError(err.message || 'Failed to fetch user details. Please try again.');
        console.error('Error fetching user details:', err);
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img
                src={userDetails.companyLogo}
                alt="Company Logo"
                className="h-12 w-12 rounded-full"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/50'; }}
              />
              <span className="ml-3 text-2xl font-semibold text-gray-800">
                {userDetails.companyName}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 mr-2">Welcome,</span>
              <span className="font-semibold text-gray-800">{userDetails.username}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex">
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
                    <span>Manage Users</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-3 text-gray-700 hover:bg-indigo-100 rounded-lg transition duration-300"
                  >
                    <span>Reports</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-3 text-gray-700 hover:bg-indigo-100 rounded-lg transition duration-300"
                  >
                    <span>System Settings</span>
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

          <div className="flex-1 ml-6">
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Admin Dashboard Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h3 className="text-lg font-semibold text-blue-800">Total Users</h3>
                  <p className="text-3xl font-bold text-blue-800">500</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h3 className="text-lg font-semibold text-green-800">Active Jobs</h3>
                  <p className="text-3xl font-bold text-green-800">120</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h3 className="text-lg font-semibold text-purple-800">Revenue</h3>
                  <p className="text-3xl font-bold text-purple-800">$50,000</p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Stats</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-yellow-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h4 className="text-lg font-semibold text-yellow-800">Pending Approvals</h4>
                  <p className="text-2xl font-bold text-yellow-800">10</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h4 className="text-lg font-semibold text-indigo-800">System Alerts</h4>
                  <p className="text-2xl font-bold text-indigo-800">5</p>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h4 className="text-lg font-semibold text-teal-800">New Registrations</h4>
                  <p className="text-2xl font-bold text-teal-800">25</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h4 className="text-lg font-semibold text-red-800">Issues Reported</h4>
                  <p className="text-2xl font-bold text-red-800">4</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;