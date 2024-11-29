import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '../../api';

const Artisans = () => {
  const { service_title } = useParams();
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartStatus, setCartStatus] = useState({});
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

  // Check if artisan is in the cart
  const checkIfArtisanInCart = async (email) => {
    const token = Cookies.get('access_token');
    if (token) {
      try {
        const response = await api.get(`/employers/check-artisan/${email}/`, {
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

  // Handle the button click (add to cart)
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
          navigate('/cart');
        } else {
          alert(response.data.detail);  // Handle already in cart case
        }
      } catch (error) {
        console.error("Error adding to cart:", error.response.data);
      }
    } else {
      navigate('/login');
    }
  };

  // Update cart status when an artisan is rendered
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

  // Determine button text and disabled state based on the cart status
  const getButtonTextAndDisabled = (email) => {
    const isInCart = cartStatus[email];
    return {
      text: isInCart ? 'Already in the cart' : 'Add to cart',
      disabled: isInCart,  // Disable button if artisan is in the cart
    };
  };

  return (
    <div className="container mx-auto px-4 mt-32" data-aos="fade-up">
      <h1 className="text-2xl font-semibold mb-4 artisanlist-heading display-center">
        Available {service_title} for your service
      </h1>

      {loading && <div className="loading-indicator">Loading...</div>}

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 py-10">
        {artisans.map((artisan) => {
          const { text, disabled } = getButtonTextAndDisabled(artisan.user?.email);

          return (
            <div
              key={artisan.id}
              className="p-4 bg-white rounded-lg shadow-lg flex flex-col items-center"
            >
              {/* Icon and Profile Image */}
              <div className="flex items-center justify-between w-full mb-4">
                <div className="w-6 h-6 bg-blue-500 rounded-full mr-2" title="Ready for work"></div>
                {artisan.profile_img ? (
                  <img
                    src={artisan.profile_img}
                    alt={`${artisan.user?.first_name}'s profile`}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-300"></div>
                )}
              </div>

              {/* Artisan details */}
              <h2 className="text-lg font-semibold mb-2">
                {artisan.user?.first_name} {artisan.user?.last_name}
              </h2>

              <div className="flex justify-between w-full mb-2">
                <p className="text-gray-600">Location: {artisan.location?.location}</p>
                <p className="text-gray-600">Service: {artisan.service?.title}</p>
              </div>

              <div className="flex justify-between w-full mb-2">
                <p className="text-gray-600">Experience: {artisan.experience} years</p>
                <p className="text-gray-600">Pay: ${artisan.pay}</p>
              </div>

              {/* Add to cart button */}
              <button
                onClick={() => handleOrderClick(artisan.user?.email)}
                className="mt-auto bg-green-500 text-white px-4 py-2 rounded-lg"
                disabled={disabled}
              >
                {text}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Artisans;
