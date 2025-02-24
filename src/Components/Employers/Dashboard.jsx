// src/pages/ManagerDashboard.jsx
import React from 'react';
import { useNavigate, Link } from "react-router-dom";

const ManagerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8" data-aos="fade-right">
      <h1 className="text-2xl font-bold text-gray-800">Payment confirmation Dashboard</h1>
      <p className="text-gray-600">Transaction history</p>

      <Link to={'/'}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-300 flex items-center gap-2">
                  Home page
              </Link>
    </div>
  );
};

export default ManagerDashboard;