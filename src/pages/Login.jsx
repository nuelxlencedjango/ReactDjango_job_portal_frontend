{/*
  

import React from 'react';
import Form from "../Compos/Form";

function Login() {
    return (
        <div>
            <Form route="/api/token/" method="login" />
        </div>
    );
}

export default Login;
  **/}

  {/*import React, { useState } from "react";
  import { useNavigate, Link } from "react-router-dom";
  import api from '../api'; 
  import '../Compos/Form.css';
  import { getCSRFToken } from '../Components/CsrfToken/csrf';
  
  function Login() {
      const [username, setUsername] = useState("");
      const [password, setPassword] = useState("");
      const [loading, setLoading] = useState(false);
      const navigate = useNavigate();
  
      const handleSubmit = async (e) => {
          e.preventDefault();
          setLoading(true);
          try {
              const csrfToken = getCSRFToken();
              const res = await api.post("/api/token/", { username, password }, {
                  headers: {
                      'X-CSRFToken': csrfToken,
                  },
                  withCredentials: true  // sending request with cookies
              });
  
              // fetching employer_id or artisan_id using a subsequent API call
              const userRes = await api.get("/api/get-user-type/", {
                  withCredentials: true  //  credentials 
              });
  
              if (userRes.data.is_employer) {
                  navigate("/employer-dashboard"); 
              } else if (userRes.data.is_artisan) {
                  navigate("/artisan-dashboard");
              }
          } catch (error) {
              console.error('Error during login:', error);
              alert(error.response?.data?.detail || error.message);
          } finally {
              setLoading(false);
          }
      };
  
      return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-6">
              <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm login-form">
                  <form onSubmit={handleSubmit} className="form-container space-y-6">
                      <h1 className="text-2xl font-bold text-gray-800 text-center">Login</h1>
                      <div className="relative">
                          <input
                              type="text"
                              className="form-input pl-10 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              placeholder="Username"
                          />
                      </div>
                      <div className="relative">
                          <input
                              type="password"
                              className="form-input pl-10 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Password"
                          />
                      </div>
                      <button
                          className="form-button w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                          type="submit"
                          disabled={loading}
                      >
                          {loading ? "Loading..." : "Login"}
                      </button>
                  </form>
                  <div className="mt-4 flex justify-between text-sm">
                      <Link to="/signup" className="button-link text-[#333] text-semi-bold hover:text-indigo-700">
                          Register
                      </Link>
                      <Link to="/forgot-password" className="button-link text-[#333] text-semi-bold hover:text-indigo-700">
                          Forgot Password?
                      </Link>
                  </div>
              </div>
          </div>
      );
  }
  
  export default Login;*/}
  




{/*import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from '../api'; 
import '../Compos/Form.css';
import { getCSRFToken } from '../Components/CsrfToken/csrf';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const csrfToken = getCSRFToken();
            const res = await api.post("/api/token/", { username, password }, {
                headers: {
                    'X-CSRFToken': csrfToken,
                }
            });

            // Instead of storing tokens in localStorage, they are now handled as cookies by the backend
            navigate("/"); 
        } catch (error) {
            console.error('Error during login:', error);
            alert(error.response?.data?.detail || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-6">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm login-form">
                <form onSubmit={handleSubmit} className="form-container space-y-6">
                    <h1 className="text-2xl font-bold text-gray-800 text-center">Login</h1>
                    <div className="relative">
                        <input
                            type="text"
                            className="form-input pl-10 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                        />
                    </div>
                    <div className="relative">
                        <input
                            type="password"
                            className="form-input pl-10 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </div>
                    <button
                        className="form-button w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>
                <div className="mt-4 flex justify-between text-sm">
                    <Link to="/signup" className="button-link text-[#333] text-semi-bold hover:text-indigo-700">
                        Register
                    </Link>
                    <Link to="/forgot-password" className="button-link text-[#333] text-semi-bold hover:text-indigo-700">
                        Forgot Password?
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;*/}




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ArtisanList = () => {
  const { service_title } = useParams(); // Get the service title from URL params
  const [artisans, setArtisans] = useState([]);
  const [selectedArtisan, setSelectedArtisan] = useState(null);
  const [formData, setFormData] = useState({
    description: '',
    address: '',
    area: '',
    job_date: '',
    preferred_time: 'HH:mm',
    contact_person: '',
    phone_number: ''
  });
  const navigate = useNavigate();

  const username = localStorage.getItem('username'); // Retrieve username from localStorage 
  const employerId = localStorage.getItem('employer_id');
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        const response = await axios.get(`https://i-wanwok-backend.up.railway.app/artisans/artisans-by-service/${service_title}/`);
        setArtisans(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching artisans:", error);
        setArtisans([]);
      }
    };

    fetchArtisans();
  }, [service_title]);

  const handleOrderClick = (artisan) => {
    setSelectedArtisan(artisan);
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
  
    if (!accessToken) {
      alert('You need to be logged in to place an order.');
      navigate('/login');
      return;
    }
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/artisans/order/${selectedArtisan.id}/`,
        {
          ...formData,
          artisan: selectedArtisan.id,
          employer: employerId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      alert('Order successfully placed!');
      navigate('/order-history');
    } catch (error) {
      console.error("Error submitting order:", error);
      alert('There was an error placing your order. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto px-4 mt-32" data-aos="fade-up">
      <h1 className="text-2xl font-semibold mb-4 artisanlist-heading display-center">Available {service_title} for your service</h1>
      {username && <h2 className="text-xl font-medium mb-4">Hi, {username}</h2>} {/* Display username here */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 py-10">
        {artisans.map(artisan => (
          <div
            key={artisan.id}
            className="p-4 bg-white rounded-lg shadow-lg flex flex-col items-center"
          >
            {artisan.profile_img ? (
              <img 
                src={artisan.profile_img} 
                alt={`${artisan.user?.first_name}'s profile`} 
                className="w-32 h-32 object-cover rounded-full mb-4" 
              />
            ) : (
              <p>No profile image available</p>
            )}

            <h2 className="text-lg font-semibold">{artisan.user?.first_name} {artisan.user?.last_name}</h2>
            <p>{artisan.experience} years of experience</p>
            <p>{artisan.service?.title}</p>
            <p>Daily Fees: ${artisan.pay}</p>
            <p>Location: {artisan.location?.location}</p>
            <button
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-red-600"
              onClick={() => handleOrderClick(artisan)}
            >
              Order Now
            </button>
          </div>
        ))}
      </div>

      {selectedArtisan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-semibold mb-4">Order Service from {selectedArtisan.user?.first_name} {selectedArtisan.user?.last_name}</h2>
            <form onSubmit={handleOrderSubmit}>
              <textarea
                name="description"
                placeholder="Job Description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              ></textarea>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="area"
                placeholder="Area"
                value={formData.area}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              />
              <input
                type="date"
                name="job_date"
                placeholder="Job Date"
                value={formData.job_date}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              />
              <input
                type="time"
                name="preferred_time"
                placeholder="Preferred Time"
                value={formData.preferred_time}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="contact_person"
                placeholder="Contact Person"
                value={formData.contact_person}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="phone_number"
                placeholder="Phone Number"
                value={formData.phone_number}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2"
                  onClick={() => setSelectedArtisan(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-4 rounded-md"
                >
                  Submit Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtisanList;

