// src/components/MarketerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../api'; 
import Cookies from 'js-cookie';

const MarketerDashboard = () => {
  const [marketerCode, setMarketerCode] = useState('');
  const [error, setError] = useState('');
  const userName = 'John Doe'; // Replace with actual user data
  const companyName = 'Artisan Pro';
  const companyLogo = 'https://via.placeholder.com/50';

  useEffect(() => {
    const fetchMarketerCode = async () => {
      try {
        const response = await axiosInstance.get('marketer-profile/'); // Endpoint to get marketer profile
        setMarketerCode(response.data.marketer_code);
      } catch (error) {
        console.error('Error fetching marketer code:', error);
        setError('Failed to load marketer code.');
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
              <img src={companyLogo} alt="Company Logo" className="h-12 w-12 rounded-full" />
              <span className="ml-3 text-2xl font-semibold text-gray-800">{companyName}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 mr-2">Welcome,</span>
              <span className="font-semibold text-gray-800">{userName}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Your Marketer Code</h3>
          <p className="text-2xl font-bold text-green-600">{marketerCode || 'Loading...'}</p>
        </div>
        <div className="flex">
          <div className="w-64 bg-white shadow-md rounded-lg p-4 h-screen">
            <nav>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/"
                    className="flex items-center p-3 text-gray-700 hover:bg-indigo-100 rounded-lg transition duration-300"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to='/register-artisan'
                    className="flex items-center p-3 text-gray-700 hover:bg-indigo-100 rounded-lg transition duration-300"
                  >
                    Register Artisan
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/register?marketer_code=${marketerCode}&user_type=employer`}
                    className="flex items-center p-3 text-gray-700 hover:bg-indigo-100 rounded-lg transition duration-300"
                  >
                    Register Employer
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="flex items-center p-3 text-gray-700 hover:bg-indigo-100 rounded-lg transition duration-300"
                  >
                    Completed Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="flex items-center p-3 text-gray-700 hover:bg-indigo-100 rounded-lg transition duration-300"
                  >
                    Professional Dashboard
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex-1 ml-6">
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Marketers Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h3 className="text-lg font-semibold text-blue-800">Total Earnings</h3>
                  <p className="text-3xl font-bold text-blue-800">$5,000</p>
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
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Stats</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-yellow-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h4 className="text-lg font-semibold text-yellow-800">Pending Orders</h4>
                  <p className="text-2xl font-bold text-yellow-800">8</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h4 className="text-lg font-semibold text-indigo-800">Total Reviews</h4>
                  <p className="text-2xl font-bold text-indigo-800">123</p>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h4 className="text-lg font-semibold text-teal-800">New Messages</h4>
                  <p className="text-2xl font-bold text-teal-800">7</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h4 className="text-lg font-semibold text-red-800">Refunds Pending</h4>
                  <p className="text-2xl font-bold text-red-800">2</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketerDashboard;