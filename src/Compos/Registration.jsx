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


import React, { useState } from 'react';
import api from '../api';
import { getCSRFToken } from '../Components/CsrfToken/csrf';
import { Link } from 'react-router-dom';

const Register = () => {
    const [isArtisan, setIsArtisan] = useState(true);  // Toggle between Artisan and Employer
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [experience, setExperience] = useState("");
    const [pay, setPay] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [fingerprintImage, setFingerprintImage] = useState(null);
    const [nin, setNin] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [companyAddress, setCompanyAddress] = useState("");
    const [location, setLocation] = useState("");  // Location state
    const [service, setService] = useState("");  // Service state
    const [loading, setLoading] = useState(false);

    // Toggle between Artisan and Employer form
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
            const csrfToken = getCSRFToken();  // Retrieve the CSRF token
            const route = isArtisan ? "/api/register/artisan/" : "/api/register/employer/";

            // Form data for Artisan or Employer
            const formData = new FormData();
            formData.append('username', username);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('confirm_password', confirmPassword);
            formData.append('location', location);  // Add location to formData
            formData.append('service', service);    // Add service to formData

            if (isArtisan) {
                formData.append('experience', experience);
                formData.append('pay', pay);
                formData.append('profile_image', profileImage);
                formData.append('fingerprint_image', fingerprintImage);
                formData.append('nin', nin);
            } else {
                formData.append('company_name', companyName);
                formData.append('company_address', companyAddress);
            }

            // Send data to the backend API
            await api.post(route, formData, {
                headers: {
                    'X-CSRFToken': csrfToken, // Include CSRF token in the header
                    'Content-Type': 'multipart/form-data',
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

                    {/* Username */}
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

                    {/* Email */}
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

                    {/* Password */}
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

                    {/* Confirm Password */}
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

                    {/* Location Select */}
                    <div className="relative">
                        <select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="form-input block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        >
                            <option value="">Select Location</option>
                            <option value="location1">Location 1</option>
                            <option value="location2">Location 2</option>
                            <option value="location3">Location 3</option>
                        </select>
                    </div>

                    {/* Service Select */}
                    <div className="relative">
                        <select
                            value={service}
                            onChange={(e) => setService(e.target.value)}
                            className="form-input block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        >
                            <option value="">Select Service</option>
                            <option value="service1">Service 1</option>
                            <option value="service2">Service 2</option>
                            <option value="service3">Service 3</option>
                        </select>
                    </div>

                    {/* Conditional Fields for Artisan */}
                    {isArtisan ? (
                        <>
                            <div className="relative">
                                <input
                                    type="number"
                                    className="form-input block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={experience}
                                    onChange={(e) => setExperience(e.target.value)}
                                    placeholder="Experience (years)"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <input
                                    type="number"
                                    className="form-input block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={pay}
                                    onChange={(e) => setPay(e.target.value)}
                                    placeholder="Expected Pay"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <input
                                    type="file"
                                    className="form-input block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    onChange={(e) => setProfileImage(e.target.files[0])}
                                    placeholder="Profile Image"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <input
                                    type="file"
                                    className="form-input block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    onChange={(e) => setFingerprintImage(e.target.files[0])}
                                    placeholder="Fingerprint Image"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    className="form-input block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={nin}
                                    onChange={(e) => setNin(e.target.value)}
                                    placeholder="National ID (NIN)"
                                    required
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="relative">
                                <input
                                    type="text"
                                    className="form-input block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    placeholder="Company Name"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    className="form-input block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={companyAddress}
                                    onChange={(e) => setCompanyAddress(e.target.value)}
                                    placeholder="Company Address"
                                    required
                                />
                            </div>
                        </>
                    )}

                    {/* Submit Button */}
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

export default Register;
