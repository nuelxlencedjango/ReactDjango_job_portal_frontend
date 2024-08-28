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

  import React, { useState } from "react";
  import { useNavigate, Link } from "react-router-dom";
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
              const csrfToken = getCSRFToken();
              const res = await api.post("/api/token/", { username, password }, {
                  headers: {
                      'X-CSRFToken': csrfToken,
                  },
                  withCredentials: true  // sending request with cookies
              });
  
              // fetching employer_id or artisan_id using a subsequent API call
              const userRes = await api.get("/api/get-user-type/", {
                  withCredentials: true  //  credentials 
              });
  
              if (userRes.data.is_employer) {
                  navigate("/employer-dashboard"); 
              } else if (userRes.data.is_artisan) {
                  navigate("/artisan-dashboard");
              }
          } catch (error) {
              console.error('Error during login:', error);
              alert(error.response?.data?.detail || error.message);
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
                              className="form-input pl-10 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              placeholder="Username"
                          />
                      </div>
                      <div className="relative">
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
  
  export default Login;
  




{/*import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
            const csrfToken = getCSRFToken();
            const res = await api.post("/api/token/", { username, password }, {
                headers: {
                    'X-CSRFToken': csrfToken,
                }
            });

            // Instead of storing tokens in localStorage, they are now handled as cookies by the backend
            navigate("/"); 
        } catch (error) {
            console.error('Error during login:', error);
            alert(error.response?.data?.detail || error.message);
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
                            className="form-input pl-10 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                        />
                    </div>
                    <div className="relative">
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
