
{/*import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Artisans = () => {
  const { service_title } = useParams();
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(false);  // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        setLoading(true);  // Set loading to true while fetching
        const response = await axios.get(
          `https://i-wanwok-backend.up.railway.app/artisans/artisans-by-service/${service_title}/`
        );
        setArtisans(response.data);  // Set fetched artisans to state
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
  }, [service_title]);  // Dependency on service_title so it refetches if it changes

  return (
    <div className="container mx-auto px-4 mt-32" data-aos="fade-up">
      <h1 className="text-2xl font-semibold mb-4 artisanlist-heading display-center">
        Available {service_title} for your service
      </h1>

      {/* Loading indicator */}
      {/*{loading && <div className="loading-indicator">Loading...</div>}

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
import axios from 'axios';
import Cookies from 'js-cookie';

const Artisans = () => {
  const { service_title } = useParams();
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        setLoading(true); // Set loading to true while fetching
        const response = await axios.get(
          `https://i-wanwok-backend.up.railway.app/artisans/artisans-by-service/${service_title}/`
        );
        setArtisans(response.data); // Set fetched artisans to state
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // If 401 Unauthorized, clear the token and redirect to login
          Cookies.remove('access_token');
          navigate('/login');
        } else {
          console.error("Error fetching artisans:", error);
        }
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchArtisans();
  }, [service_title]); // Dependency on service_title so it refetches if it changes


  const handleOrderClick = async (artisanId) => {
    const token = Cookies.get('access_token'); // Get token from cookies
  
    if (!artisanId) {
      console.error('Missing artisanId or serviceId');
      return;
    }
  
    console.log('artisanId:', artisanId);
   // console.log('serviceId:', serviceId);
  
    if (token) {
      try {
        // Attempt to add to cart
        const response = await axios.post(
          'https://i-wanwok-backend.up.railway.app/employers/add_to_cart/',
          { artisan_id: artisanId }, // Correct payload keys
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass token in headers
            },
          }
        );
  
        if (response.status === 200) {
          // Successfully added to cart
          alert('Service added to your cart!');
        }
      } catch (error) {
        if (error.response) {
          // Log more details of the error
          console.error("Error adding to cart:", error.response.data);  // Log response data
          console.error("Status code:", error.response.status);         // Log status code
        } else {
          console.error("Error adding to cart:", error);
        }
      }
    } else {
      // No token, redirect to login
      navigate('/login');
    }
  };
  



  return (
    <div className="container mx-auto px-4 mt-32" data-aos="fade-up">
      <h1 className="text-2xl font-semibold mb-4 artisanlist-heading display-center">
        Available {service_title} for your service
      </h1>

      {/* Loading indicator */}
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
            {/*<button
              onClick={() => handleOrderClick(artisan.id)}
              className="mt-auto bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Order Now
            </button>*/}

             <button
    onClick={() => handleOrderClick(artisan.id)}
    className="mt-auto bg-blue-500 text-white px-4 py-2 rounded-lg"
>
    Order Now
</button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Artisans;


