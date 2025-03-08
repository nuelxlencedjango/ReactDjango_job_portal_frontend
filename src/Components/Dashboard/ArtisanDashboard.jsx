import React from 'react';

const Dashboard = () => {
  const userName = "John Doe"; 
  const companyName = "Artisan Pro";
  const companyLogo = "https://via.placeholder.com/50";

  return (
    <div className="min-h-screen bg-gray-100 transition duration-300" data-aos="fade-up">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Company Logo and Name */}
            <div className="flex items-center">
              <img
                src={companyLogo}
                alt="Company Logo"
                className="h-10 w-10 rounded-full"
              />
              <span className="ml-3 text-xl font-semibold text-gray-800">
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
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <span>Home</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <span>Earnings</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <span>Jobs</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <span>Completed Jobs</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <span>Professional Dashboard</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main Dashboard Content */}
          <div className="flex-1 ml-6">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Dashboard Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Example Cards */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800">Total Earnings</h3>
                  <p className="text-2xl font-bold text-blue-800">$5,000</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800">Active Jobs</h3>
                  <p className="text-2xl font-bold text-green-800">12</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-800">Completed Jobs</h3>
                  <p className="text-2xl font-bold text-purple-800">45</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;