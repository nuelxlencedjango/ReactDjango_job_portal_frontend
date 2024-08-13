import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaPhone } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';

const EmployerRegistrationForm = () => {
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone_number: '',
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (formData.password !== formData.confirmPassword) {
            setFormErrors({ ...formErrors, confirmPassword: "Passwords do not match" });
            return;
        }
    
        if (!formData.username || !formData.first_name || !formData.last_name || !formData.email || !formData.password) {
            setFormErrors({ ...formErrors, form: "Please fill in all required fields" });
            return;
        }
    
        setLoading(true);
        setFormErrors({});
    
        try {
            const userData = {
                username: formData.username,
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                password: formData.password
            };
    
            const completeData = {
                user: userData,
                phone_number: formData.phone_number
            };
    
            await axios.post('https://web-production-b1ed.up.railway.app/employers/add_employer/', completeData, {
                headers: { 'Content-Type': 'application/json' }
            });
    
            alert('User registration was successful.');
            navigate('/available-jobs');
    
        } catch (error) {
            alert('ERROR! Username or email is wrong.', error.response ? error.response.data : error.message); 
            if (error.response && error.response.data) {
                setFormErrors(error.response.data.errors || { form: 'An unknown error occurred' });
            } else {
                setFormErrors({ form: 'An unknown error occurred' });
            }
        } finally {
            setLoading(false);
        }
    };
      

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-6">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md artisan-form">
                <h1 className="text-1xl font-bold text-gray-800 text-center mb-6">Employer Sign Up</h1>
                {formErrors.form && (
                    <div className="mb-4 text-red-500 text-md text-center">
                        {formErrors.form}
                    </div>
                )}
                <div className='bg-gray-200 p-4 rounded-md'>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                placeholder="Username"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            {formErrors.username && (
                                <div className="text-red-500 text-sm">{formErrors.username}</div>
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
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            {formErrors.first_name && (
                                <div className="text-red-500 text-sm">{formErrors.first_name}</div>
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
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            {formErrors.last_name && (
                                <div className="text-red-500 text-sm">{formErrors.last_name}</div>
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
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                           
                             {formErrors.email && (
                                <div className="text-red-500 text-sm">{formErrors.email}</div>
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
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            {formErrors.password && (
                                <div className="text-red-500 text-sm">{formErrors.password}</div>
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
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            {formErrors.confirmPassword && (
                                <div className="text-red-500 text-sm">{formErrors.confirmPassword}</div>
                            )}
                        </div>
                        <div className="relative">
                            <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleInputChange}
                                placeholder="Phone Number"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            {formErrors.phone_number && (
                                <div className="text-red-500 text-sm">{formErrors.phone_number}</div>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            {loading ? 'Submitting...' : 'Register'}
                        </button>
                    </form>
                </div>
                <p className="text-center mt-4 text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-green-500 hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default EmployerRegistrationForm;
