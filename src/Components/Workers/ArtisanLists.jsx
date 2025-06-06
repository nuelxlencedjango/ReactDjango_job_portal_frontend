import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '../../api'; 

import { ClipLoader } from 'react-spinners'; 
import { GiMechanicGarage } from "react-icons/gi";
import { FaCircleQuestion } from "react-icons/fa6";

const Artisans = () => {
  const { service_title } = useParams();
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(false); // fetching artisans
  const [addingToCart, setAddingToCart] = useState(false); // adding to cart
  const [cartStatus, setCartStatus] = useState({}); // Track cart status for each artisan
  const [error, setError] = useState(null); // Track any errors that occur
  const navigate = useNavigate();

  // Fetch artisans when the component mounts or when service_title changes
  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/artisans-by-service/${service_title}/`);
        setArtisans(response.data);
        console.log('responses:', response.data);
      } catch (error) {
        setError('Error fetching artisans. Please try again later.');
        if (error.response && error.response.status === 401) {
          Cookies.remove('access_token');
          navigate('/login');
        } else {
          console.error('Error fetching artisans:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchArtisans();
  }, [service_title, navigate]);

  // Check if an artisan is already in the cart
  const checkIfArtisanInCart = async (email) => {
    const token = Cookies.get('access_token');
    if (token) {
      try {
        const response = await api.get(`/employer/check-artisan/${email}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data.in_cart;
      } catch (error) {
        console.error('Error checking artisan in cart:', error);
        return false;
      }
    }
    return false;
  };

  // Handle the "Add to Cart" button click  
  const handleOrderClick = async (email, artisanId, artisan) => {
    const token = Cookies.get('access_token');
    if (!email) {
      alert('Missing artisan email.');
      return;
    }

    // Check if the user is authenticated
    if (!token) {
      alert('Please log in to add artisans to your cart.');
      navigate('/login');
      return;
    }

    try {
      setAddingToCart(true); // loading spinner
      const response = await api.post(
        '/employer/add_to_cart/',
        { artisan_email: email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert('Service added to your cart!');
        navigate('/service-details', { state: { artisan, service: artisan.service } });
      } else {
        alert(response.data.detail); // Handle already in cart case
      }
    } catch (error) {
      console.error('Error adding to cart:', error.response?.data || error);
      alert('An error occurred while adding to the cart.');
    } finally {
      setAddingToCart(false); // Stop loading spinner
    }
  };

  // Update the cart status for all artisans
  useEffect(() => {
    const updateCartStatus = async () => {
      const status = {};
      for (const artisan of artisans) {
        const inCart = await checkIfArtisanInCart(artisan.user?.email);
        status[artisan.user?.email] = inCart;
      }
      setCartStatus(status);
    };

    if (artisans.length > 0) {
      updateCartStatus();
    }
  }, [artisans]);

  // Get button text and disabled status
  const getButtonTextAndDisabled = (email) => {
    const isInCart = cartStatus[email];
    return {
      text: isInCart ? 'Already Requested' : 'Make A Request', 
      disabled: isInCart || addingToCart, // Disable button if adding to cart is in progress
    };
  };

  // Helper function to check if user is logged in
  const checkIfUserLoggedIn = () => {
    const token = Cookies.get('access_token');
    if (!token) {
      alert('Please log in to add artisans to your cart.');
      navigate('/login');
      return false;
    }
    return true;
  };

  return (
    <div className="container mx-auto px-4 mt-20" data-aos="fade-up">
      <h1 className="text-2xl font-semibold mb-4 mt-10 artisanlist-heading display-center">
        Available {service_title}s for your service
      </h1>

      {/* Loading spinner for fetching artisans */}
      {loading && (
        <div className="flex justify-center items-center">
          <ClipLoader color="#36D7B7" size={50} />
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="text-red-500 text-center mb-4">
          {error}
        </div>
      )}

      {/* Artisans grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 py-10">
        {artisans.map((artisan) => {
          const { text, disabled } = getButtonTextAndDisabled(artisan.user?.email);
          const uniqueKey = artisan.id || artisan.user?.email || artisan.user?.id;

          return (
            <div
              key={uniqueKey}
              className="p-4 bg-white rounded-lg shadow-lg flex flex-col items-center relative transition-transform transform hover:scale-105"
            >
              {/* Icons */}
              <div className="absolute top-2 left-4">
                <FaCircleQuestion className="text-red-600 font-bold" style={{ fontSize: 24 }} />
              </div>
              <div className="absolute top-2 right-4">
                <GiMechanicGarage className="text-green-500 font-bold" style={{ fontSize: 24 }} />
              </div>

              {/* Artisan profile image */}
              <div className="flex justify-center w-full mb-4">
                {artisan.profile_image_resized ? (
                  <img
                    src={artisan.profile_image_resized}
                    alt={`${artisan.user?.first_name}'s profile`}
                    className="w-24 h-24 rounded-full object-cover transition-all duration-300 transform hover:scale-110"
                  />
                ) : artisan.profile_image ? (
                  <img
                    src={artisan.profile_image}
                    alt={`${artisan.user?.first_name}'s profile`}
                    className="w-24 h-24 rounded-full object-cover transition-all duration-300 transform hover:scale-110"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-300 mb-4"></div>
                )}
              </div>

              {/* Artisan details */}
              <h2 className="text-lg font-semibold mb-2">
                {artisan.user?.first_name} {artisan.user?.last_name}
                {/* Display verified status */}
                {artisan.is_verified && (
                  <span className="ml-2 text-green-500 font-semibold">Verified</span>
                )}
              </h2>

              <div className="flex justify-between w-full mb-2">
                <p className="text-black-300">Location: <span className='font-semibold'>{artisan.location?.location}</span></p>
                <p className="text-gray-500">Service: <span className='font-semibold'>{artisan.service?.title} </span></p>
              </div>

              <div className="flex justify-between w-full mb-2">
                <p className="text-gray-500">Experience: <span className='font-semibold'>{artisan.experience} years </span></p>
                
                <p className="">Pay: <span className='text-red-600 font-bold'>₦{artisan.pay}</span></p>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={() => handleOrderClick(artisan.user?.email, artisan.id, artisan)}
                className="mt-auto bg-green-500 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:bg-green-600"
                disabled={disabled}> 
                {addingToCart ? (
                  <ClipLoader color="#ffffff" size={20} /> // Spinner inside the button
                ) : (
                  text
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Artisans;
