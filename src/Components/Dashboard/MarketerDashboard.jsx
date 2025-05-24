import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import Cookies from 'js-cookie';

const ManagerDashboard = () => {
  const [userDetails, setUserDetails] = useState({
    username: 'Loading...',
    companyName: 'Artisan Pro',
    companyLogo: '',
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
          companyName: response.data.company_name || "Marketer's Profile",
          companyLogo: response.data.company_logo ||  `${response.data.username}`,
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
                  <Link
                    to='/list-artisans'
                    className="flex items-center p-3 text-gray-700 hover:bg-indigo-100 rounded-lg transition duration-300"
                  >
                    Manage Artisan
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

                  <Link
                    to={''}
                    className={`flex items-center p-3 text-gray-700 rounded-lg transition duration-300`}
                  >
                    Register Employer
                  </Link>

                <li>
                  <a
                    href="#"
                    className="flex items-center p-3 text-gray-700 hover:bg-indigo-100 rounded-lg transition duration-300"
                  >
                    <span>Pending Approvals</span>
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
                Manager Dashboard Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h3 className="text-lg font-semibold text-blue-800">Managed Artisans</h3>
                  <p className="text-3xl font-bold text-blue-800">0</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h3 className="text-lg font-semibold text-green-800">Department Tasks</h3>
                  <p className="text-3xl font-bold text-green-800">0</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h3 className="text-lg font-semibold text-purple-800">Pending Approvals</h3>
                  <p className="text-3xl font-bold text-purple-800">0</p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Stats</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-yellow-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h4 className="text-lg font-semibold text-yellow-800">New Assignments</h4>
                  <p className="text-2xl font-bold text-yellow-800">0</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h4 className="text-lg font-semibold text-indigo-800">Team Reports</h4>
                  <p className="text-2xl font-bold text-indigo-800">0</p>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h4 className="text-lg font-semibold text-teal-800">Messages</h4>
                  <p className="text-2xl font-bold text-teal-800">0</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h4 className="text-lg font-semibold text-red-800">Issues Pending</h4>
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

export default ManagerDashboard;