




{/*import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import axiosInstance from '../api/axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('acct/login/', { username, password });
      Cookies.set('access_token', response.data.access, { path: '/', secure: true, sameSite: 'Lax' });
      Cookies.set('refresh_token', response.data.refresh, { path: '/', secure: true, sameSite: 'Lax' });
      console.log('response:', response.data)
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className='bg-gray-200 p-4 rounded-md'>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}

        
          <div className="mb-4 relative">
            <FaUser className="absolute left-2 top-3/4 transform -translate-y-1/2 text-gray-400" />
            <label htmlFor="username" className="block text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded pl-10"
              required
            />
          </div>

  
          <div className="mb-4 relative">
            <RiLockPasswordFill className="absolute left-3 top-3/4 transform -translate-y-1/2 text-gray-400" />
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded pl-10"
              required
            />
          </div>

          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-red-600">Login</button>
        </form>

        <div className="text-center mt-4">
            <p className="text-sm text-black-700">
              Don't have an account?{" "}
                <Link to="/signup" className="text-green-800 hover:underline">Signup Here
                  </Link>
              </p>
          </div>
      </div>
    </div>
  );
};

export default Login;*/}









import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import axiosInstance from '../api/axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted
    setError('');

    try {
      const response = await axiosInstance.post('acct/login/', { username, password });
      
      // Store the access and refresh tokens in cookies
      Cookies.set('access_token', response.data.access, { path: '/', secure: true, sameSite: 'Lax' });
      Cookies.set('refresh_token', response.data.refresh, { path: '/', secure: true, sameSite: 'Lax' });

      console.log('Login successful:', response.data);

      // Redirect based on user_type
      const { user_type } = response.data;
      if (user_type === 'manager') {
        navigate('/manager-dashboard');  
      } else if (user_type === 'employer') {
        navigate('/');  
      } else if (user_type === 'artisan') {
        navigate('/artisan-dashboard');  
      } else {
        navigate('/'); 
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false); // Set loading to false when the request is complete
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className='bg-gray-200 p-4 rounded-md'>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="mb-4 relative">
            <FaUser className="absolute left-2 top-3/4 transform -translate-y-1/2 text-gray-400" />
            <label htmlFor="username" className="block text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded pl-10"
              required
            />
          </div>

          <div className="mb-4 relative">
            <RiLockPasswordFill className="absolute left-3 top-3/4 transform -translate-y-1/2 text-gray-400" />
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded pl-10"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-red-600 flex items-center justify-center"
            disabled={loading} // Disable the button when loading
          >
            {loading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging in...
              </div>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-black-700">
            Don't have an account?{" "}
            <Link to="/signup" className="text-green-800 hover:underline">Signup Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;