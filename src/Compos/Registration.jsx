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


import React, { useState } from 'react';
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

export default Register;


