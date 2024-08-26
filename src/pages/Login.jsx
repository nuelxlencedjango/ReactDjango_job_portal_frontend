{/*
  

import React from 'react';
import Form from "../Compos/Form";

function Login() {
    return (
        <div>
            <Form route="/api/token/" method="login" />
        </div>
    );
}

export default Login;
  **/}



{/*import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import api from '../api'; 
import '../Compos/Form.css';
import { getCSRFToken } from '../Components/CsrfToken/csrf';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const csrfToken = getCSRFToken(); // Retrieve the CSRF token
            const res = await api.post("/api/token/", { username, password }, {
                headers: {
                    'X-CSRFToken': csrfToken, // Include CSRF token in the header
                }
            });

            console.log("Response Data:", res.data);

            // Store tokens in local storage
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

            navigate("/"); // Redirect to home page after login
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
                    <h1 className="text-2xl font-bold text-gray-800 text-center">Login</h1>
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
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>
                <div className="mt-4 flex justify-between text-sm">
                    <Link to="/signup" className="button-link text-[#333] text-semi-bold hover:text-indigo-700">
                        Register
                    </Link>
                    <Link to="/forgot-password" className="button-link text-[#333] text-semi-bold hover:text-indigo-700">
                        Forgot Password?
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;*/}

{/*import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import api from '../api'; 
import '../Compos/Form.css';
import { getCSRFToken } from '../Components/CsrfToken/csrf';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const csrfToken = getCSRFToken(); // Retrieve the CSRF token
            const res = await api.post("/api/token/", { username, password }, {
                headers: {
                    'X-CSRFToken': csrfToken, // Include CSRF token in the header
                }
            });

            if (res.data && res.data.access && res.data.refresh) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                localStorage.setItem('username', username); // Store the username

                console.log(`username: ${username} access token: ${res.data.access}`);
                navigate("/"); // Redirect to home page after login
            } else {
                throw new Error("Invalid response from server");
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
                    <h1 className="text-2xl font-bold text-gray-800 text-center">Login</h1>
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
                            type="password"
                            className="form-input block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button
                        className="form-button w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;*/}



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.VITE_API_URL}/login/`, loginData);
      const { access_token, user } = response.data;

      // Store access token and employerId in localStorage
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('employer_id', user.id); // Assuming the user object has an `id` field

      console.log("Login successful, user ID:", user.id);
      navigate('/dashboard'); // Redirect after login
    } catch (error) {
      console.error("Login error:", error);
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        name="username"
        value={loginData.username}
        onChange={handleChange}
        placeholder="Username"
        required
      />
      <input
        type="password"
        name="password"
        value={loginData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;



