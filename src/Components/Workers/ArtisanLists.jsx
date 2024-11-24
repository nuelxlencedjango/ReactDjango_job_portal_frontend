import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '../../api';

const Artisans = () => {
  const { service_title } = useParams();
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/artisans/artisans-by-service/${service_title}/`);
        setArtisans(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          Cookies.remove('access_token');
          navigate('/login');
        } else {
          console.error("Error fetching artisans:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchArtisans();
  }, [service_title]);

  const handleOrderClick = async (email) => {
    const token = Cookies.get('access_token');
    if (!email) {
      console.error('Missing artisan email.');
      return;
    }

    if (token) {
      try {
        const response = await api.post(
          '/employers/add_to_cart/',
          { artisan_email: email },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201) {
          alert('Service added to your cart!');
          // Update the UI to reflect the change
          setArtisans((prevArtisans) =>
            prevArtisans.map((artisan) =>
              artisan.user?.email === email
                ? { ...artisan, already_in_cart: true }
                : artisan
            )
          );
        }
      } catch (error) {
        if (error.response) {
          console.error("Error adding to cart:", error.response.data);
        } else {
          console.error("Error adding to cart:", error);
        }
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="container mx-auto px-4 mt-32" data-aos="fade-up">
      <h1 className="text-2xl font-semibold mb-4 artisanlist-heading display-center">
        Available {service_title} for your service
      </h1>

      {loading && <div className="loading-indicator">Loading...</div>}

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 py-10">
        {artisans.map((artisan) => (
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
              onClick={() => handleOrderClick(artisan.user?.email)}
              className={`mt-auto px-4 py-2 rounded-lg ${
                artisan.already_in_cart
                  ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 text-white'
              }`}
              disabled={artisan.already_in_cart}
            >
              {artisan.already_in_cart ? 'Already in Cart' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artisans;
