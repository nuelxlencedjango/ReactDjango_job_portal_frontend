import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '../../api'; 
import { ClipLoader } from 'react-spinners'; 
import { GiMechanicGarage } from "react-icons/gi";
import { FaCircleQuestion } from "react-icons/fa6";

const ResultsPage = () => {
    const location = useLocation();
    const { searchParams, results } = location.state || { searchParams: {}, results: [] };
    const [addingToCart, setAddingToCart] = useState(false);
    const [cartStatus, setCartStatus] = useState({}); 
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

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

    // Handle the "Make A Request" button click
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
            setAddingToCart(true); //  loading spinner
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
        } finally {
            setAddingToCart(false); // Stop loading spinner
        }
    };

    // Update the cart status for all artisans
    useEffect(() => {
        const updateCartStatus = async () => {
            const status = {};
            for (const artisan of results) {
                const inCart = await checkIfArtisanInCart(artisan.user?.email);
                status[artisan.user?.email] = inCart;
            }
            setCartStatus(status);
        };

        if (results.length > 0) {
            updateCartStatus();
        }
    }, [results]);

    // Get button text and disabled status
    const getButtonTextAndDisabled = (email) => {
        const isInCart = cartStatus[email];
        return {
            text: isInCart ? 'Already requested' : 'Make A Request',
            disabled: isInCart || addingToCart, // Disable button if adding to cart is in progress
        };
    };

    return (
        <div className="container mx-auto p-6" data-aos="fade-up">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Search Results</h2>
            {loading && (
                <div className="flex justify-center items-center">
                    <ClipLoader color="#36D7B7" size={50} /> 
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.length > 0 ? (
                    results.map((artisan) => {
                        const { text, disabled } = getButtonTextAndDisabled(artisan.user?.email);
                        const uniqueKey = artisan.id || artisan.user?.email || artisan.user?.id;

                        return (
                            <div
                                key={uniqueKey}
                                className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
                                data-aos="fade-up"
                            >
                                {/* Artisan Image */}
                                <img
                                    src={artisan.profile_image || 'default.jpg'}
                                    alt={artisan.user?.username || 'No name'}
                                    className="w-full h-40 object-cover rounded-lg mb-4"  
                                />

                                {/* Artisan Details */}
                                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                                    {artisan.user?.first_name} {artisan.user?.last_name}
                                </h3>
                                <div className="space-y-0 text-gray-600">
                                    <p><strong className="text-sm">Username:</strong> {artisan.user?.username || 'N/A'}</p>
                                    <p><strong className="text-sm">Location:</strong> {artisan.location?.location || 'N/A'}</p>
                                    <p><strong className="text-sm">Service:</strong> {artisan.service?.title || 'N/A'}</p>
                                    <p><strong className="text-sm">Experience:</strong> {artisan.experience || 'Unknown'} years</p>
                                    <p><strong className="text-sm">Average Daily Pay:</strong> ${artisan.pay || 'Unknown'}</p>
                                </div>

                                {/* Order Button */}
                                <div className="mt-4">
                                    <button
                                        onClick={() => handleOrderClick(artisan.user?.email, artisan.id, artisan)}
                                        className="inline-block w-full px-4 py-2 bg-green-500 text-white text-center rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300"
                                        disabled={disabled}
                                    >
                                        {addingToCart ? (
                                            <ClipLoader color="#ffffff" size={20} /> // Spinner inside the button
                                        ) : (
                                            text
                                        )}
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-center text-gray-500 col-span-full">No results found.</p>
                )}
            </div>
        </div>
    );
};

export default ResultsPage;
