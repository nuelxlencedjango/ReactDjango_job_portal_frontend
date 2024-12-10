{/*import React, { useState } from 'react';
import ArtisanRegistrationForm from '../Components/Workers/ArtisansBasicPage';
import EmployerRegistrationForm from '../Components/Employers/EmployerRegistrationForm';

const RegistrationToggle = () => {
    const [isArtisan, setIsArtisan] = useState(true);

    const toggleForm = () => {
        setIsArtisan(prev => !prev);
    };

    return (
        <div className="mt-28">
            <div className="">
                <div className="flex justify-center mb-6">
                    <button
                        onClick={toggleForm}
                        className={`py-2 px-4 font-semibold rounded-md ${isArtisan ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                    >
                        Artisan
                    </button>
                    <button
                        onClick={toggleForm}
                        className={`py-2 px-4 font-semibold rounded-md ${!isArtisan ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                    >
                        Employer
                    </button>
                </div>
                {isArtisan ? <ArtisanRegistrationForm /> : <EmployerRegistrationForm />}
            </div>
        </div>
    );
};

export default RegistrationToggle;*/}


{/*import React, { useState } from 'react';
import api from '../api'; 
import { getCSRFToken } from '../Components/CsrfToken/csrf';
import '../Compos/Form.css';
import { Link } from 'react-router-dom';


const Register = () => {
    const [isArtisan, setIsArtisan] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const toggleForm = () => {
        setIsArtisan(prev => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            setLoading(false);
            return;
        }

        try {
            const csrfToken = getCSRFToken(); // Retrieve the CSRF token
            const route = isArtisan ? "/api/artisan/register/" : "/api/employer/register/";
            
            await api.post(route, { username, password, email }, {
                headers: {
                    'X-CSRFToken': csrfToken, // Include CSRF token in the header
                }
            });

            alert("Registration successful! Please log in.");
            // Redirect to login page or clear form, depending on UX flow 
        } catch (error) {
            console.error('Error during registration:', error);
            alert(error.response?.data?.detail || error.message); // Show a meaningful error message
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-6">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
                <div className="flex justify-center mb-6">
                    <button
                        onClick={toggleForm}
                        className={`py-2 px-4 font-semibold rounded-md ${isArtisan ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                    >
                        Artisan
                    </button>
                    <button
                        onClick={toggleForm}
                        className={`py-2 px-4 font-semibold rounded-md ${!isArtisan ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                    >
                        Employer
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <h1 className="text-2xl font-bold text-gray-800 text-center">{isArtisan ? "Artisan Registration" : "Employer Registration"}</h1>
                    <div className="relative">
                        <input
                            type="text"
                            className="form-input block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                        />
                    </div>
                    <div className="relative">
                        <input
                            type="email"
                            className="form-input block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="relative">
                        <input
                            type="password"
                            className="form-input block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div className="relative">
                        <input
                            type="password"
                            className="form-input block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                            required
                        />
                    </div>
                    <button
                        className="form-button w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Register"}
                    </button>
                </form>
                <div className="mt-4 text-sm text-center">
                    <Link to="/login" className="text-indigo-600 hover:text-indigo-700">
                        Already have an account? Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;*/}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { RiBriefcase4Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        user_type: 'artisan', // Default to artisan
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        nin: '',
        location: '',
        experience: '',
        address: '',
        phone: '',
        service: '',
        profile_img: null,
        company_name: '',
        company_address: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [locations, setLocations] = useState([]);
    const [services, setServices] = useState([]);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            profile_img: file,
        }));
    };

    const fetchLocations = async () => {
        try {
            const response = await axios.get('https://i-wanwok-backend.up.railway.app/artisans/location-list/');
            setLocations(response.data);
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    const fetchServices = async () => {
        try {
            const response = await axios.get('https://i-wanwok-backend.up.railway.app/artisans/profession-list/');
            setServices(response.data);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    useEffect(() => {
        fetchLocations();
        fetchServices();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!formData.username) newErrors.username = "Username is required";
        if (!formData.first_name) newErrors.first_name = "First name is required";
        if (!formData.last_name) newErrors.last_name = "Last name is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";

        if (formData.user_type === 'artisan') {
            if (!formData.nin) newErrors.nin = "NIN is required";
            if (!formData.location) newErrors.location = "Location is required";
            if (!formData.service) newErrors.service = "Service is required";
            if (!formData.experience) newErrors.experience = "Experience is required";
        } else {
            if (!formData.company_name) newErrors.company_name = "Company name is required";
            if (!formData.company_address) newErrors.company_address = "Company address is required";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });

        try {
            setLoading(true);
            const endpoint =
                formData.user_type === 'artisan'
                    ? 'https://i-wanwok-backend.up.railway.app/artisans/add_artisan/'
                    : 'https://i-wanwok-backend.up.railway.app/employers/add_employer/';
            const response = await axios.post(endpoint, formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status === 201) {
                alert(`${formData.user_type === 'artisan' ? 'Artisan' : 'Employer'} registered successfully.`);
                navigate('/available-jobs');
            } else {
                throw new Error('Unexpected response status');
            }
        } catch (error) {
            console.error('API Error:', error.response || error);
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            } else {
                setErrors({ general: 'An unexpected error occurred' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen mt-20 flex flex-col items-center justify-center bg-gray-100 py-6">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    {formData.user_type === 'artisan' ? 'Artisan Registration' : 'Employer Registration'}
                </h1>
                <div className="flex justify-center mb-4">
                    <button
                        onClick={() => setFormData({ ...formData, user_type: 'artisan' })}
                        className={`px-4 py-2 ${formData.user_type === 'artisan' ? 'bg-green-500 text-white' : 'bg-gray-300 text-black'} rounded-l-md`}
                    >
                        Artisan
                    </button>
                    <button
                        onClick={() => setFormData({ ...formData, user_type: 'employer' })}
                        className={`px-4 py-2 ${formData.user_type === 'employer' ? 'bg-green-500 text-white' : 'bg-gray-300 text-black'} rounded-r-md`}
                    >
                        Employer
                    </button>
                </div>
                {errors.general && <div className="mb-4 text-red-500 text-md text-center">{errors.general}</div>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Username"
                            className={`w-full pl-10 pr-4 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none`}
                        />
                        {errors.username && <div className="text-red-500 text-sm">{errors.username}</div>}
                    </div>

                    {/* Repeat similar inputs for first_name, last_name, email, and password */}
                    {formData.user_type === 'artisan' && (
                        <>
                            {/* Artisan-specific inputs */}
                            <div className="relative">
                                <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <select
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    className={`w-full pl-10 pr-4 py-2 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none`}
                                >
                                    <option value="">Select Location</option>
                                    {locations.map((location) => (
                                        <option key={location.id} value={location.id}>
                                            {location.location}
                                        </option>
                                    ))}
                                </select>
                                {errors.location && <div className="text-red-500 text-sm">{errors.location}</div>}
                            </div>
                        </>
                    )}

                    {formData.user_type === 'employer' && (
                        <>
                            {/* Employer-specific inputs */}
                            <div className="relative">
                                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    name="company_name"
                                    value={formData.company_name}
                                    onChange={handleInputChange}
                                    placeholder="Company Name"
                                    className={`w-full pl-10 pr-4 py-2 border ${errors.company_name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none`}
                                />
                                {errors.company_name && <div className="text-red-500 text-sm">{errors.company_name}</div>}
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;
