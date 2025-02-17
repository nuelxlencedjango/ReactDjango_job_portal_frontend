// src/pages/ManagerDashboard.jsx
import React from 'react';
import { useNavigate, Link } from "react-router-dom";

const ManagerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold text-gray-800">Manager Dashboard</h1>
      <p className="text-gray-600">Welcome to the manager's page!</p>

      <Link to={'/artisan-search'}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-300 flex items-center gap-2">
                  Add Finger Print
              </Link>
    </div>
  );
};

export default ManagerDashboard;