import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrderForm = ({ artisanId }) => {
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');  // Get token from localStorage

        try {
            const response = await axios.post('https://api.i-wan-wok.com/artisans/order-request/', {
                artisan: artisanId,
                description,
            }, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });

            if (response.status === 201) {
                // Navigate to a success page or display success message
                navigate('/success');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // User is not logged in, redirect to login page
                navigate('/login');
            } else {
                console.error('There was an error submitting the order request:', error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your request"
                required
            />
            <button type="submit">Order Now</button>
        </form>
    );
};

export default OrderForm;






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

