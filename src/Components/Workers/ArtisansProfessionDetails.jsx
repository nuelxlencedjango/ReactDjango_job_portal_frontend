
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { RiBriefcase4Fill } from 'react-icons/ri';
import { FaNairaSign } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';

const ArtisanDetailsForm = () => {
    const [formData, setFormData] = useState({
        nin: '',
        location: '',
        experience: '',
        address: '',
        phone_number: '',
        service: '',
        pay: '',
        profile_image: null,
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [locations, setLocations] = useState([]);
    const [services, setServices] = useState([]);
    const [isMarketer, setIsMarketer] = useState(false);

    const { username } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user type to determine if the user is a marketer
        const fetchUserType = async () => {
            try {
                const response = await axios.get(`https://i-wanwok-backend.up.railway.app/api/user-details/${username}/`);
                if (response.data.user_type === 'marketer') {
                    setIsMarketer(true);
                    navigate('/marketer-app'); 
                }
            } catch (error) {
                console.error('Error fetching user type:', error);
            }
        };

        fetchUserType();
        fetchLocations();
        fetchServices();
    }, [username, navigate]);

    console.log(response.data.user_type )

    const fetchLocations = async () => {
        try {
            const response = await axios.get('https://i-wanwok-backend.up.railway.app/api/location-list/');
            setLocations(response.data);
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    const fetchServices = async () => {
        try {
            const response = await axios.get('https://i-wanwok-backend.up.railway.app/api/profession-list/');
            setServices(response.data);
        } catch (error) {
            console.error('Error fetching professions:', error);
            if (error.response) {
                const backendErrors = error.response.data.nin || error.response.data.location || error.response.data.service || error.response.data.address || error.response.data.experience || error.response.data.phone_number || error.response.data.profile_image;
                setErrors({
                    general: backendErrors || "Failed to register user. Please try again."
                });
            } else {
                setErrors({
                    general: "Network error. Please try again."
                });
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prevData => ({
            ...prevData,
            profile_image: file,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!formData.nin) newErrors.nin = "NIN is required";
        if (!formData.location) newErrors.location = "Location is required";
        if (!formData.service) newErrors.service = "Service is required";
        if (!formData.experience) newErrors.experience = "Experience is required";
        if (!formData.address) newErrors.address = "Address is required";
        if (!formData.phone_number) newErrors.phone_number = "Phone is required";

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }
        setLoading(true);

        const formDataToSend = new FormData();
        formDataToSend.append('username', username);
        formDataToSend.append('nin', formData.nin);
        formDataToSend.append('location', formData.location);
        formDataToSend.append('experience', formData.experience);
        formDataToSend.append('address', formData.address);
        formDataToSend.append('phone_number', formData.phone_number);
        formDataToSend.append('service', formData.service);
        formDataToSend.append('pay', formData.pay);

        if (formData.location) {
            formDataToSend.append('location', formData.location);
        }

        if (formData.profile_image) {
            formDataToSend.append('profile_image', formData.profile_image);
        }

        try {
            const response = await axios.post('https://i-wanwok-backend.up.railway.app/acct/user-register/', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.status === 201) {
                alert('Artisan details submitted successfully.');
                navigate('/dashboard');
            } else {
                throw new Error("Unexpected response status");
            }
        } catch (error) {
            console.error("API Error:", error.response || error);
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            } else {
                setErrors({ general: "An unexpected error occurred" });
            }
        } finally {
            setLoading(false);
        }
    };

    if (isMarketer) {
        return null; // Redirect will handle the navigation
    }

    return (
        <div className="min-h-screen mt-0 flex flex-col items-center justify-center bg-gray-100 py-6" data-aos="fade-up">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md mb-10 mt-10">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Hi, {username} ! Please fill in the rest</h1>
                {errors.general && (
                    <div className="mb-4 text-red-500 text-md text-center">
                        {errors.general}
                    </div>
                )}
                {Object.keys(errors).length > 0 && (
                    <div className="mb-4 text-red-500 text-md text-center">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key]}</p>
                        ))}
                    </div>
                )}

                {loading && (
                    <div className="absolute inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center z-10">
                        <div className="loader"></div>
                    </div>
                )}

                <div className='bg-gray-200 p-4 rounded-md'>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Form fields remain the same as in your original code */}
                        {/* ... */}
                        <button
                            type="submit"
                            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ArtisanDetailsForm;