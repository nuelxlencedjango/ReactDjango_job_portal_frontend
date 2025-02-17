



import React, { useState } from 'react';

const Values = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to toggle sidebar

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white w-64 p-6 transform transition-transform duration-300 ease-in-out fixed md:relative md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Burger Menu Button (Top of Sidebar) */}
        <button
          className="md:hidden mb-6 p-2 bg-gray-700 rounded-lg hover:bg-gray-600"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Sidebar Content */}
        <div className="flex flex-col h-full">
        
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-4">Dashboard</h2>
            <ul>
              <li className="mb-2">
                <a href="#" className="text-gray-300 hover:text-white">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-300 hover:text-white">
                  Orders
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-300 hover:text-white">
                  Inbox
                </a>
              </li>
            </ul>
          </div>

          {/* Profile and Logout Section (Bottom of Sidebar) */}
          <div className="mt-auto">
            {/* User Profile Logo */}
            <div className="flex flex-col items-center mb-4">
              <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mb-2">
                <span className="text-xl">👤</span> 
              </div>
              <h2 className="text-sm font-semibold">User</h2>
              <p className="text-xs text-gray-400">Artisan</p>
            </div>

            {/* Logout Button */}
            <button
              className="w-full bg-lime-400 text-black py-2 px-4 rounded-lg hover:bg-red-600 hover:text-white transition duration-300"
            
            >
              Log Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Burger Menu Button (Top of Main Content for Mobile) */}
        <button
          className="md:hidden mb-6 p-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Dashboard Title */}
        <h1 className="text-textColor text-[22px] py-[2rem] pb-[3rem] font-bold block">
          Hello, User!
        </h1>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Pending Orders */}
          <div className="bg-lime-300 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Pending Orders</h2>
            <p className="text-3xl mt-2">0</p>
          </div>

          {/* Completed Orders */}
          <div className="bg-lime-300 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold"> Completed Orders</h2>
            <p className="text-3xl mt-2">0</p>
          </div>

          {/* Earnings */}
          <div className="bg-lime-300 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Earnings</h2>
            <p className="text-3xl mt-2">0</p>
          </div>
        </div>

        {/* Artisan Performance Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Artisan Performance</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600">Performance metrics loading......</p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Values;