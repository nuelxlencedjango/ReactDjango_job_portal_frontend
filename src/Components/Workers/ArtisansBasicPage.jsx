import React, { useState } from 'react';
import axios from 'axios';
import { FaUser } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const BasicDetailsForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleNext = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!formData.username) newErrors.username = "Username is required";
        if (!formData.first_name) newErrors.first_name = "First Name is required";
        if (!formData.last_name) newErrors.last_name = "Last Name is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        setLoading(true); // Start loading
        try {
            const response = await axios.post('https://i-wanwok-backend.up.railway.app/accounts/register-artisan/', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            console.log('Response:', response.data);

            if (response.status === 201) {
                const userId = response.data.id;
                const username = response.data.username;

                alert('User registration was successful.');
                navigate(`/profession-details/${userId}/${username}`);
            } else {
                throw new Error("Unexpected response status");
            }
        } catch (error) {
            console.error("API Error:", error.response || error);
            if (error.response) {
                if (error.response.data.errors) {
                    setErrors(error.response.data.errors);
                } else if (error.response.data.error) {
                    setErrors({ general: error.response.data.error });
                } else {
                    setErrors({ general: "An unexpected error occurred" });
                }
            } else {
                setErrors({ general: "An unexpected error occurred" });
            }
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-6">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md relative">
                <h1 className="text-1xl font-bold text-gray-800 text-center mb-6">Sign Up For Workers - Step 1</h1>
                {errors.general && (
                    <div className="mb-4 text-red-500 text-md text-center">
                        {errors.general}
                    </div>
                )}
                {loading && (
                    <div className="absolute inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center z-10">
                        <div className="loader"></div>
                    </div>
                )}
                 <div className='bg-gray-200 p-4 rounded-md'>
                <form onSubmit={handleNext} className="space-y-6">
                    <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Username"
                            className={`w-full pl-10 pr-4 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                        />
                        {errors.username && (
                            <div className="text-red-500 text-sm">
                                {errors.username}
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                            placeholder="First Name"
                            className={`w-full pl-10 pr-4 py-2 border ${errors.first_name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                        />
                        {errors.first_name && (
                            <div className="text-red-500 text-sm">
                                {errors.first_name}
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                            placeholder="Last Name"
                            className={`w-full pl-10 pr-4 py-2 border ${errors.last_name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                        />
                        {errors.last_name && (
                            <div className="text-red-500 text-sm">
                                {errors.last_name}
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <MdOutlineEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            className={`w-full pl-10 pr-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                        />
                        {errors.email && (
                            <div className="text-red-500 text-sm">
                                {errors.email}
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <RiLockPasswordFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Password"
                            className={`w-full pl-10 pr-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                        />
                        {errors.password && (
                            <div className="text-red-500 text-sm">
                                {errors.password}
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <RiLockPasswordFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm Password"
                            className={`w-full pl-10 pr-4 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                        />
                        {errors.confirmPassword && (
                            <div className="text-red-500 text-sm">
                                {errors.confirmPassword}
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                        disabled={loading} // Disable the button when loading
                    >
                        {loading ? "Loading..." : "Next"} {/* Display loading text when loading */}
                    </button>
                </form>

                  {/* Link to login page */}
                  <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Already have an account?{" "}
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

export default BasicDetailsForm;



