{/*import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import api from '../api'; 
import '../Compos/Form.css';




function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const res = await api.post(route, { username, password });
            console.log("Login Response:", res.data); // Log the entire response
            
            
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };
    

    

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-6">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm login-form">
                <form onSubmit={handleSubmit} className="form-container space-y-6">
                    <h1 className="text-2xl font-bold text-gray-800 text-center">{name}</h1>
                    <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            className="form-input pl-10 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                        />
                    </div>
                    <div className="relative">
                        <RiLockPasswordFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="password"
                            className="form-input pl-10 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </div>
                    <button
                        className="form-button w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : name}
                    </button>
                </form>
                <div className="mt-4 flex justify-between text-sm">
                    {method === "login" ? (
                        <>
                         

                            <Link
                                to="/signup"
                                className="button-link text-[#333] text-semi-bold hover:text-indigo-700"
                            >
                                Register
                            </Link>

                         
                            <Link
                                to="/forgot-password"
                                className="button-link text-[#333] text-semi-bold hover:text-indigo-700"
                            >
                                Forgot Password?
                            </Link>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="button-link text-indigo-600 hover:text-indigo-700"
                        >
                            Already have an account? Login
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Form;*/}



{/*import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import api from '../api'; 
import '../Compos/Form.css';

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post(route, { username, password });
            console.log("Login Response:", res.data); 
            
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-6">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm login-form">
                <form onSubmit={handleSubmit} className="form-container space-y-6">
                    <h1 className="text-2xl font-bold text-gray-800 text-center">{name}</h1>
                    <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            className="form-input pl-10 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                        />
                    </div>
                    <div className="relative">
                        <RiLockPasswordFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="password"
                            className="form-input pl-10 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </div>
                    <button
                        className="form-button w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : name}
                    </button>
                </form>
                <div className="mt-4 flex justify-between text-sm">
                    {method === "login" ? (
                        <>
                            <Link
                                to="/signup"
                                className="button-link text-[#333] text-semi-bold hover:text-indigo-700"
                            >
                                Register
                            </Link>
                            <Link
                                to="/forgot-password"
                                className="button-link text-[#333] text-semi-bold hover:text-indigo-700"
                            >
                                Forgot Password?
                            </Link>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="button-link text-indigo-600 hover:text-indigo-700"
                        >
                            Already have an account? Login
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Form;*/}


// src/components/Form.jsx

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import api from '../api'; 
import '../Compos/Form.css';
import { getCSRFToken } from '../Components/CsrfToken/csrf';

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const csrfToken = getCSRFToken(); // Retrieve the CSRF token
            const res = await api.post(route, { username, password }, {
                headers: {
                    'X-CSRFToken': csrfToken, // Include CSRF token in the header
                }
            });

            console.log("Response Data:", res.data);

            if (method === "login") {
                // Store tokens in local storage
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

                // Optionally store user data
                // localStorage.setItem('user', JSON.stringify(res.data.user));

                navigate("/"); // Redirect to home page after login
            } else {
                navigate("/login"); // Redirect to login page after registration
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert(error.response?.data?.detail || error.message); // Show a meaningful error message
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-6">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm login-form">
                <form onSubmit={handleSubmit} className="form-container space-y-6">
                    <h1 className="text-2xl font-bold text-gray-800 text-center">{name}</h1>
                    <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            className="form-input pl-10 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                        />
                    </div>
                    <div className="relative">
                        <RiLockPasswordFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="password"
                            className="form-input pl-10 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </div>
                    <button
                        className="form-button w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : name}
                    </button>
                </form>
                <div className="mt-4 flex justify-between text-sm">
                    {method === "login" ? (
                        <>
                            <Link to="/signup" className="button-link text-[#333] text-semi-bold hover:text-indigo-700">
                                Register
                            </Link>
                            <Link to="/forgot-password" className="button-link text-[#333] text-semi-bold hover:text-indigo-700">
                                Forgot Password?
                            </Link>
                        </>
                    ) : (
                        <Link to="/login" className="button-link text-indigo-600 hover:text-indigo-700">
                            Already have an account? Login
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Form;
