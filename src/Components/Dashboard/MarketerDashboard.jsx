import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import Cookies from 'js-cookie';
import RegisteredArtisans from './RegisteredArtisans';

const MarketerDashboard = () => {
  const [marketerCode, setMarketerCode] = useState('');
  const [userDetails, setUserDetails] = useState({
    username: 'Loading...',
    companyName: 'User Profile',
    companyLogo: 'https://via.placeholder.com/50',
  });
  const [error, setError] = useState({
    marketerCode: null,
    user: null,
  });

  // Fetch user details
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
          companyName: response.data.company_name || `${response.data.user_type} Profile`,
          companyLogo: response.data.company_logo || 'https://via.placeholder.com/50',
        });
      } catch (err) {
        if (err.response?.status === 401) {
          window.location.href = '/login';
        }
        setError(prev => ({ ...prev, user: err.message || 'Failed to fetch user details.' }));
        console.error('Error fetching user details:', err);
      }
    };
    fetchUserDetails();
  }, []);

  // Fetch marketer code
  useEffect(() => {
    const fetchMarketerCode = async () => {
      try {
        const token = Cookies.get('access_token');
        if (!token) {
          throw new Error('No access token found. Please log in.');
        }
        const response = await api.get('marketer-profile/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMarketerCode(response.data.marketer_code);
      } catch (err) {
        setError(prev => ({ ...prev, marketerCode: 'Failed to load marketer code.' }));
        console.error('Error fetching marketer code:', err);
      }
    };
    fetchMarketerCode();
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
              <span className="ml-3 text-xl sm:text-2xl font-semibold text-gray-800">
                {userDetails.companyName}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 mr-2 text-sm sm:text-base">Welcome,</span>
              <span className="font-semibold text-gray-800 text-sm sm:text-base">{userDetails.username}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {error.user && <p className="text-red-500 mb-4 text-sm sm:text-base">{error.user}</p>}
        {error.marketerCode && <p className="text-red-500 mb-4 text-sm sm:text-base">{error.marketerCode}</p>}
        <div className="mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Your Marketer Code</h3>
          <p className="text-xl sm:text-2xl font-bold text-green-600">{marketerCode || 'Loading...'}</p>
        </div>
        <div className="flex flex-col custom:flex-row">
          <div className="w-full custom:w-64 bg-white shadow-md rounded-lg p-4 mb-4 custom:mb-0 custom:h-screen custom:mr-6">
            <nav>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/"
                    className="flex items-center p-3 text-gray-700 hover:bg-indigo-100 rounded-lg transition duration-300 text-sm sm:text-base"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register-artisan"
                    className="flex items-center p-3 text-gray-700 hover:bg-indigo-100 rounded-lg transition duration-300 text-sm sm:text-base"
                  >
                    Register Artisan
                  </Link>
                </li>
                <li>
                  <Link
                    to={marketerCode ? `/register?marketer_code=${marketerCode}&user_type=employer` : '#'}
                    className={`flex items-center p-3 text-gray-700 rounded-lg transition duration-300 text-sm sm:text-base ${!marketerCode ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-100'}`}
                  >
                    Register Employer
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="flex items-center p-3 text-gray-700 hover:bg-indigo-100 rounded-lg transition duration-300 text-sm sm:text-base"
                  >
                    Completed Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="flex items-center p-3 text-gray-700 hover:bg-indigo-100 rounded-lg transition duration-300 text-sm sm:text-base"
                  >
                    Professional Dashboard
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex-1">
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">Marketers Overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h3 className="text-base sm:text-lg font-semibold text-blue-800">Total Earnings</h3>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-800">₦0.00</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h3 className="text-base sm:text-lg font-semibold text-green-800">Active Jobs</h3>
                  <p className="text-2xl sm:text-3xl font-bold text-green-800">0</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h3 className="text-base sm:text-lg font-semibold text-purple-800">Completed Jobs</h3>
                  <p className="text-2xl sm:text-3xl font-bold text-purple-800">0</p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Quick Stats</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-yellow-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h4 className="text-base sm:text-lg font-semibold text-yellow-800">Pending Orders</h4>
                  <p className="text-xl sm:text-2xl font-bold text-yellow-800">0</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h4 className="text-base sm:text-lg font-semibold text-indigo-800">Total Reviews</h4>
                  <p className="text-xl sm:text-2xl font-bold text-indigo-800">0</p>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h4 className="text-base sm:text-lg font-semibold text-teal-800">New Messages</h4>
                  <p className="text-xl sm:text-2xl font-bold text-teal-800">0</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h4 className="text-base sm:text-lg font-semibold text-red-800">Refunds Pending</h4>
                  <p className="text-xl sm:text-2xl font-bold text-red-800">0</p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
              <RegisteredArtisans />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketerDashboard;