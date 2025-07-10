import React, { useState, useEffect } from "react";
import api from "../../api";
import Cookies from "js-cookie";

const EmployerDashboard = () => {
  
  const [activeView, setActiveView] = useState('overview'); 

  const [lastPayment, setLastPayment] = useState(null);

  const [artisanDetails, setArtisanDetails] = useState([]); 
  const [userDetails, setUserDetails] = useState({
    username: "Loading...",
    companyName: "User Profile",
    companyLogo: "https://via.placeholder.com/50",
  });
  const [loading, setLoading] = useState({
    payment: false,
    artisan: false,
    activeJobs: false,
    completedJobs: false,
  });
  const [error, setError] = useState({
    payment: null,
    artisan: null,
    user: null,
  });
  const [stats, setStats] = useState({
    pendingOrders: 0,
    activeJobs: 0,
    completedJobs: 0,
  });

  // Fetch user details on initial load
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = Cookies.get("access_token");
        if (!token) throw new Error("No access token found. Please log in.");
        
        const response = await api.get("acct/user-profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        setUserDetails({
          username: response.data.first_name && response.data.last_name
            ? `${response.data.first_name} ${response.data.last_name}`
            : response.data.username || "User",
          companyName: response.data.company_name || `${response.data.user_type} Profile`,
          companyLogo: response.data.company_logo || "https://via.placeholder.com/50",
        });
      } catch (err) {
        if (err.response?.status === 401) window.location.href = "/login";
        setError(prev => ({ ...prev, user: err.message || "Failed to fetch user details." }));
        console.error("Error fetching user details:", err);
      }
    };
    fetchUserDetails();
  }, []);

  // Fetch last payment details
  const fetchLastPayment = async () => {
    setLoading(prev => ({ ...prev, payment: true }));
    setError(prev => ({ ...prev, payment: null }));
    try {
      const token = Cookies.get("access_token");
      if (!token) throw new Error("No access token found.");

      const response = await api.get("/employer/last-payment/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLastPayment(response.data);
    } catch (err) {
      setError(prev => ({ ...prev, payment: "Failed to fetch last payment details." }));
    } finally {
      setLoading(prev => ({ ...prev, payment: false }));
    }
  };

  // Fetch expected artisan details (now expects an array)
  const fetchExpectedArtisan = async () => {
    setLoading(prev => ({ ...prev, artisan: true }));
    setError(prev => ({ ...prev, artisan: null }));
    setArtisanDetails([]); // Clear previous results
    try {
      const token = Cookies.get("access_token");
      if (!token) throw new Error("No access token found.");

      const response = await api.get("/employer/expected-artisan/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Ensure the response is an array before setting it
      if (Array.isArray(response.data)) {
        setArtisanDetails(response.data);
      } else {
        console.error("Expected an array of artisans, but received:", response.data);
        setArtisanDetails([]); // Fallback to an empty array
      }
    } catch (err) {
      setError(prev => ({ ...prev, artisan: "Failed to fetch expected artisan details." }));
    } finally {
      setLoading(prev => ({ ...prev, artisan: false }));
    }
  };

  // Handler for switching views from the sidebar
  const handleViewChange = (view) => {
    setActiveView(view);
    if (view === 'payment') {
      fetchLastPayment();
    } else if (view === 'artisan') {
      fetchExpectedArtisan();
    }
  };
  
  // (Simulated API calls for stats remain the same)
  // ...

  return (
    <div className="min-h-screen bg-gray-50">
   
      <div className="bg-white shadow-md">
        {/* ... */}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {error.user && (
          {/* ... User error display (No changes) ... */}
        )}
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white shadow-md rounded-lg p-4 mb-6 md:mb-0 md:mr-6">
            <nav>
              <ul className="space-y-2">
              
                <li>
                  <button
                    onClick={() => handleViewChange('overview')}
                    className={`flex items-center p-3 w-full text-left rounded-lg transition-all duration-200 ease-in-out transform hover:translate-x-1 ${
                      activeView === 'overview' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
                    }`}
                  >
                    {/* Home Icon */}
                    <span>Home</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleViewChange('payment')}
                    className={`flex items-center p-3 w-full text-left rounded-lg transition-all duration-200 ease-in-out transform hover:translate-x-1 ${
                      activeView === 'payment' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
                    }`}
                  >
                    {/* Payment Icon */}
                    <span>Last Payment</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleViewChange('artisan')}
                    className={`flex items-center p-3 w-full text-left rounded-lg transition-all duration-200 ease-in-out transform hover:translate-x-1 ${
                      activeView === 'artisan' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
                    }`}
                  >
                    {/* Artisan Icon */}
                    <span>Expected Artisan</span>
                  </button>
                </li>
                {/* ... Other sidebar buttons ... */}
              </ul>
            </nav>
          </div>

          {/* --- UPDATED MAIN CONTENT AREA --- */}
          <div className="flex-1">
            {/* View 1: Dashboard Overview */}
            {activeView === 'overview' && (
              <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Dashboard Overview
                </h2>
                {/* Stats Cards (No changes) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {/* ... */}
                </div>
              </div>
            )}

            {/* View 2: Last Payment Details */}
            {activeView === 'payment' && (
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Last Payment Details
                </h3>
                {/* ... The existing JSX for displaying last payment ... */}
                {/* This includes loading spinners, error messages, and the details card */}
              </div>
            )}

            {/* View 3: Expected Artisan Details */}
            {activeView === 'artisan' && (
              <div className="bg-white shadow-lg rounded-lg p-6">
                 <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Expected Artisan Details
                  </h3>
                  <button
                    onClick={fetchExpectedArtisan}
                    // ... refresh button logic ...
                  >
                    {/* ... */}
                  </button>
                </div>
                
                {/* --- NEW ARTISAN LIST RENDERING LOGIC --- */}
                
                {/* Loading State */}
                {loading.artisan && (
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                  </div>
                )}
                
                {/* Error State */}
                {!loading.artisan && error.artisan && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4">
                    <p className="text-sm text-red-700">{error.artisan}</p>
                  </div>
                )}

                {/* No Data State */}
                {!loading.artisan && !error.artisan && artisanDetails.length === 0 && (
                  <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-500">
                    <p>No artisans found for currently paid services.</p>
                  </div>
                )}
                
                {/* Data Found State: Map over the array */}
                {!loading.artisan && !error.artisan && artisanDetails.length > 0 && (
                  <div className="space-y-6">
                    {artisanDetails.map((artisan, index) => (
                      <div key={artisan.artisan_details.id || index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Artisan Profile Image */}
                          <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center">
                            <img
                              src={artisan.artisan_details.profile_image || "https://via.placeholder.com/128"}
                              alt="Artisan Profile"
                              className="h-32 w-32 rounded-full object-cover mb-4"
                              onError={(e) => { e.target.src = "https://via.placeholder.com/128"; }}
                            />
                            <h4 className="text-xl font-semibold text-gray-900 text-center">
                              {artisan.artisan_details.first_name}{" "}
                              {artisan.artisan_details.last_name}
                            </h4>
                            <p className="text-gray-600">
                              {artisan.artisan_details.service}
                            </p>
                          </div>

                          {/* Artisan Details */}
                          <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">
                              Artisan Details
                            </h4>
                            <div className="space-y-3">
                              {/* ... (Access data like artisan.artisan_details.experience) */}
                            </div>
                          </div>

                          {/* Job Details */}
                          <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">
                              Job Details
                            </h4>
                            <div className="space-y-3">
                              {/* ... (Access data like artisan.job_details.expectedDate) */}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;