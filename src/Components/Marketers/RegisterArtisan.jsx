import React, { useState, useEffect } from 'react';
import api from '../../api';
import { MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordFill, RiBriefcase4Fill } from 'react-icons/ri';
import { BsPersonCheckFill } from 'react-icons/bs';
import { IoPersonCircle } from 'react-icons/io5';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaNairaSign } from 'react-icons/fa6';
import { FaUser, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

// Reusable InputField component
const InputField = ({ label, type, name, value, onChange, error, accept, disabled, options = [] }) => {
    const iconMap = {
        'Username': <FaUser className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-lg" />,
        'First Name': <IoPersonCircle className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-lg" />,
        'Last Name': <BsPersonCheckFill className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-lg" />,
        'Email': <MdOutlineEmail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-lg" />,
        'Password': <RiLockPasswordFill className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-lg" />,
        'Confirm Password': <RiLockPasswordFill className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-lg" />,
        'NIN': <FaUser className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-lg" />,
        'Location': <FaMapMarkerAlt className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-lg" />,
        'Service': <RiBriefcase4Fill className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-lg" />,
        'Experience': <RiBriefcase4Fill className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-lg" />,
        'Address': <FaMapMarkerAlt className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-lg" />,
        'Phone Number': <FaPhone className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-lg" />,
        'Pay': <FaNairaSign className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-lg" />,
        
    };

    return (
        <div className="relative">
            {iconMap[label]}
            {type === 'file' ? (
                <input
                    type="file"
                    name={name}
                    onChange={onChange}
                    accept={accept}
                    className="w-full pl-8 pr-3 py-1.5 sm:pl-10 sm:pr-4 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                    disabled={disabled}
                />
            ) : type === 'select' ? (
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`w-full pl-8 pr-3 py-1.5 sm:pl-10 sm:pr-4 sm:py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base`}
                    disabled={disabled || options.length === 0}
                >
                    <option value="">{`Select ${label}`}</option>
                    {options.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.display}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={label}
                    className={`w-full pl-8 pr-3 py-1.5 sm:pl-10 sm:pr-4 sm:py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base`}
                    disabled={disabled}
                />
            )}
            {error && <div className="text-red-500 text-xs sm:text-sm mt-1">{error}</div>}
        </div>
    );
};

const ArtisanRegistrationForm = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
   

    // Form state
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password2: '',
        user_type: 'artisan',
        nin: '',
        location: '',
        experience: '',
        address: '',
        phone_number: '',
        service: '',
        pay: '',
        profile_image: null,
      
    });

    // UI state
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [loadingLocations, setLoadingLocations] = useState(true);
    const [loadingServices, setLoadingServices] = useState(true);
    const [retryCount, setRetryCount] = useState(0);
    const navigate = useNavigate();

    // Data state
    const [locations, setLocations] = useState([]);
    const [services, setServices] = useState([]);

    // Enhanced data fetching with retry logic
    const fetchWithRetry = async (fetchFn, setLoadingState, maxRetries = 2) => {
        let attempts = 0;
        while (attempts < maxRetries) {
            try {
                setLoadingState(true);
                await fetchFn();
                setLoadingState(false);
                setRetryCount(0); // Reset on success
                return;
            } catch (error) {
                attempts++;
                console.error(`Attempt ${attempts} failed:`, error);
                if (attempts < maxRetries) {
                    await new Promise(resolve => setTimeout(resolve, 2000 * attempts));
                } else {
                    setLoadingState(false);
                    throw error;
                }
            }
        }
    };

    // Fetch locations data
    const fetchLocations = async () => {
        try {
            const response = await api.get('api/location-list/');
            const locationData = response.data.map((loc) => ({
                id: loc.id,
                display: loc.location || loc.name || 'Unknown Location',
            }));
            setLocations(locationData);
            setErrors(prev => ({ ...prev, locations: '' }));
        } catch (error) {
            console.error('Location fetch error:', error);
            setErrors(prev => ({
                ...prev,
                locations: error.response?.data?.detail || 'Failed to load locations',
            }));
            throw error;
        }
    };

    // Fetch services data
    const fetchServices = async () => {
        try {
            const response = await api.get('api/profession-list/');
            const serviceData = response.data.map((srv) => ({
                id: srv.id,
                display: srv.title || srv.name || 'Unknown Service',
            }));
            setServices(serviceData);
            setErrors(prev => ({ ...prev, services: '' }));
        } catch (error) {
            console.error('Service fetch error:', error);
            setErrors(prev => ({
                ...prev,
                services: error.response?.data?.detail || 'Failed to load services',
            }));
            throw error;
        }
    };

    // Input change handler
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone_number') {
            const phoneRegex = /^(?:\+234|0)[0-9]{10}$/;
            if (value && !phoneRegex.test(value)) {
                setErrors(prev => ({
                    ...prev,
                    phone_number: 'Invalid format (e.g., +2348012345678 or 08012345678)',
                }));
            } else {
                setErrors(prev => ({ ...prev, phone_number: '' }));
            }
        }
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // File upload handler
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const maxSize = 2.1 * 1024 * 1024; // 2.1MB
            if (file.size > maxSize) {
                setErrors(prev => ({
                    ...prev,
                    profile_image: 'Image size should not exceed 2.1MB',
                }));
            } else {
                setErrors(prev => ({ ...prev, profile_image: '' }));
                setFormData(prev => ({ ...prev, profile_image: file }));
            }
        }
    };

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validation
        const newErrors = {};
        const requiredFields = {
            username: 'Username is required',
            first_name: 'First name is required',
            last_name: 'Last name is required',
            email: 'Email is required',
            password: 'Password is required',
            password2: 'Confirm password is required',
            nin: 'NIN is required',
            location: 'Location is required',
            service: 'Service is required',
            experience: 'Experience is required',
            address: 'Address is required',
            phone_number: 'Phone number is required',
            pay: 'Pay is required',
           
        };

        Object.entries(requiredFields).forEach(([field, message]) => {
            if (!formData[field]) newErrors[field] = message;
        });

        if (formData.password !== formData.password2) {
            newErrors.password2 = 'Passwords do not match';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        // Prepare form data
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null && value !== '') {
                formDataToSend.append(key, value);
            }
        });

        // Submit data
        try {
            const response = await api.post(
                'marketers/artisan-register/',
                formDataToSend,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            if (response.status === 201) {
                alert('Registration successful!');
                navigate('/marketer-dashboard');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setErrors({
                ...error.response?.data,
                general: error.response?.data?.detail || 'An error occurred. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };

    // Initial data load
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                await Promise.all([
                    fetchWithRetry(fetchLocations, setLoadingLocations, 2),
                    fetchWithRetry(fetchServices, setLoadingServices, 2),
                ]);
            } catch (error) {
                console.error('Initial data load failed:', error);
            }
        };
        loadInitialData();

        // Set up periodic refresh (every 15 minutes)
        const refreshInterval = setInterval(() => {
            fetchLocations().catch(console.error);
            fetchServices().catch(console.error);
        }, 900000);

        return () => clearInterval(refreshInterval);
    }, []);

    // Main form render
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-4 sm:py-6">
            {(errors.locations || errors.services) && (
                <div className="w-full max-w-md mx-4 bg-white p-6 sm:p-8 rounded-lg shadow-md text-center mb-4 sm:mb-6">
                    <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Data Loading Issue</h2>
                    <p className="mb-3 sm:mb-4 text-red-500 text-sm sm:text-base">
                        {errors.locations || errors.services}
                    </p>
                    <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-4 justify-center">
                        <button
                            onClick={() => {
                                setRetryCount(prev => prev + 1);
                                fetchWithRetry(fetchLocations, setLoadingLocations, 2);
                                fetchWithRetry(fetchServices, setLoadingServices, 2);
                            }}
                            className="bg-green-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded hover:bg-green-600 disabled:bg-gray-400 text-sm sm:text-base"
                            disabled={retryCount >= 2}
                        >
                            {retryCount >= 2 ? 'Max retries reached' : 'Try Again'}
                        </button>
                        <button
                            onClick={() => setErrors(prev => ({ ...prev, locations: '', services: '' }))}
                            className="text-green-500 hover:underline text-sm sm:text-base"
                        >
                            Continue with limited functionality
                        </button>
                    </div>
                    {retryCount > 0 && (
                        <p className="mt-2 text-xs sm:text-sm text-gray-600">
                            Attempt {retryCount} of 2
                        </p>
                    )}
                </div>
            )}
            <div className="relative w-full max-w-lg mx-4 bg-white shadow-md rounded-lg p-6 sm:p-8">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-4 sm:mb-6">
                    Artisan Registration
                </h1>
                {errors.general && (
                    <div className="mb-3 sm:mb-4 text-red-500 text-center text-sm sm:text-base">{errors.general}</div>
                )}
                {loading && (
                    <div className="absolute inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center z-10 rounded-lg">
                        <div className="loader border-t-4 border-green-500 rounded-full w-6 h-6 sm:w-8 sm:h-8 animate-spin"></div>
                    </div>
                )}
                <div className="bg-gray-200 p-3 sm:p-4 rounded-md">
                    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                        <div className="grid grid-cols-1 custom:grid-cols-2 gap-3 sm:gap-4">
                            <InputField
                                label="First Name"
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleInputChange}
                                error={errors.first_name}
                                disabled={loading}
                            />
                            <InputField
                                label="Last Name"
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleInputChange}
                                error={errors.last_name}
                                disabled={loading}
                            />
                        </div>
                        <InputField
                            label="Username"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            error={errors.username}
                            disabled={loading}
                        />
                        <InputField
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            error={errors.email}
                            disabled={loading}
                        />
                        <div className="grid grid-cols-1 custom:grid-cols-2 gap-3 sm:gap-4">
                            <InputField
                                label="Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                error={errors.password}
                                disabled={loading}
                            />
                            <InputField
                                label="Confirm Password"
                                type="password"
                                name="password2"
                                value={formData.password2}
                                onChange={handleInputChange}
                                error={errors.password2}
                                disabled={loading}
                            />
                        </div>
                        <InputField
                            label="NIN"
                            type="text"
                            name="nin"
                            value={formData.nin}
                            onChange={handleInputChange}
                            error={errors.nin}
                            disabled={loading}
                        />
                        {errors.locations ? (
                            <InputField
                                label="Location (Enter manually)"
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                error={errors.location}
                                disabled={loading}
                            />
                        ) : (
                            <InputField
                                label="Location"
                                type="select"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                error={errors.location}
                                disabled={loading || loadingLocations}
                                options={locations}
                            />
                        )}
                        {errors.services ? (
                            <InputField
                                label="Service (Enter manually)"
                                type="text"
                                name="service"
                                value={formData.service}
                                onChange={handleInputChange}
                                error={errors.service}
                                disabled={loading}
                            />
                        ) : (
                            <InputField
                                label="Service"
                                type="select"
                                name="service"
                                value={formData.service}
                                onChange={handleInputChange}
                                error={errors.service}
                                disabled={loading || loadingServices}
                                options={services}
                            />
                        )}
                        <InputField
                            label="Experience (years)"
                            type="number"
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            error={errors.experience}
                            disabled={loading}
                        />
                        <InputField
                            label="Address"
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            error={errors.address}
                            disabled={loading}
                        />
                        <InputField
                            label="Phone Number"
                            type="tel"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleInputChange}
                            error={errors.phone_number}
                            disabled={loading}
                        />
                        <InputField
                            label="Pay (₦)"
                            type="number"
                            name="pay"
                            value={formData.pay}
                            onChange={handleInputChange}
                            error={errors.pay}
                            disabled={loading}
                        />
                        <InputField
                            label="Profile Image"
                            type="file"
                            name="profile_image"
                            onChange={handleFileChange}
                            accept="image/*"
                            error={errors.profile_image}
                            disabled={loading}
                        />
                      
                        <button
                            type="submit"
                            className="w-full bg-green-500 text-white py-1.5 sm:py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-400 transition-colors text-sm sm:text-base"
                            disabled={loading || loadingLocations || loadingServices}
                        >
                            {loading ? 'Registering...' : 'Register Artisan'}
                        </button>
                    </form>
                    <div className="text-center mt-3 sm:mt-4">
                        <p className="text-xs sm:text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="text-green-500 hover:underline">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtisanRegistrationForm;