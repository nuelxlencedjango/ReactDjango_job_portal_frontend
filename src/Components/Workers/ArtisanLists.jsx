// Artisans.js

{/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Artisans = () => {
  const { service_title } = useParams();
  const [artisans, setArtisans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        const response = await axios.get(
          `https://i-wanwok-backend.up.railway.app/artisans/artisans-by-service/${service_title}/`
        );
        setArtisans(response.data);
      } catch (error) {
        console.error("Error fetching artisans:", error);
      }
    };

    fetchArtisans();
  }, [service_title]);

  const handleOrderClick = (artisanId) => {
    const token = Cookies.get('token'); // Get the token from cookies

    if (token) {
      
      axios.post('https://i-wanwok-backend.up.railway.app/employers/auth/verify-token/', { token })
        .then(response => {
          if (response.data.valid) {
            navigate(`/order/${artisanId}`); // Token is valid, navigate to order form
          } else {
            navigate('/login'); // Token is not valid, navigate to login
          }
        })
        .catch(() => {
          navigate('/login'); // On error, navigate to login
        });
    } else {
      navigate('/login'); // No token, navigate to login
    }
  };

  return (
    <div className="container mx-auto px-4 mt-32" data-aos="fade-up">
      <h1 className="text-2xl font-semibold mb-4 artisanlist-heading display-center">
        Available {service_title} for your service
      </h1>
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
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-300 mb-4"></div>
            )}
            <h2 className="text-lg font-semibold mb-2">
              {artisan.user?.first_name} {artisan.user?.last_name}
            </h2>
            <p className="text-gray-600 mb-2">Location: {artisan.location?.location}</p>
            <p className="text-gray-600 mb-2">Service: {artisan.service?.title}</p>
            <p className="text-gray-600 mb-2">Experience: {artisan.experience} years</p>
            <p className="text-gray-600 mb-2">Pay: ${artisan.pay}</p>
            <button
              onClick={() => handleOrderClick(artisan.id)}
              className="mt-auto bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Order Service
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artisans;*/}


import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../api/axios';

const Artisans = () => {
  const { service_title } = useParams();  // Gets the service title from the URL
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        setLoading(true); 
        const response = await axiosInstance.get(
          `artisans/artisans-by-service/${service_title}/`  
        );
        setArtisans(response.data);  // Set fetched artisans to state
      } catch (error) {
        console.error("Error fetching artisans:", error);
      } finally {
        setLoading(false);  // End loading
      }
    };

    fetchArtisans();  // Trigger fetch when the component is mounted
  }, [service_title]);  // Dependency on service_title so it refetches if it changes

  // Handle "Order Now" button click
  const handleOrderClick = (artisanId) => {
    navigate(`/order/${artisanId}`);  // Navigate to order page for selected artisan
  };

  return (
    <div className="container mx-auto px-4 mt-32" data-aos="fade-up">
      <h1 className="text-2xl font-semibold mb-4 artisanlist-heading display-center">
        Available {service_title} for your service
      </h1>

      {/* Loading indicator */}
      {loading && <div className="loading-indicator">Loading...</div>}

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 py-10">
        {artisans.length === 0 ? (
          <p>No artisans found for this service.</p>  // Message if no artisans are found
        ) : (
          artisans.map(artisan => (
            <div
              key={artisan.id}
              className="p-4 bg-white rounded-lg shadow-lg flex flex-col items-center"
            >
              {artisan.profile_img ? (
                <img 
                  src={artisan.profile_img} 
                  alt={`${artisan.user?.first_name}'s profile`} 
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-300 mb-4"></div>
              )}
              <h2 className="text-lg font-semibold mb-2">
                {artisan.user?.first_name} {artisan.user?.last_name}
              </h2>
              <p className="text-gray-600 mb-2">Location: {artisan.location?.location}</p>
              <p className="text-gray-600 mb-2">Service: {artisan.service?.title}</p>
              <p className="text-gray-600 mb-2">Experience: {artisan.experience} years</p>
              <p className="text-gray-600 mb-2">Pay: ${artisan.pay}</p>
              <button
                onClick={() => handleOrderClick(artisan.id)}
                className="mt-auto bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Order Service
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Artisans;
