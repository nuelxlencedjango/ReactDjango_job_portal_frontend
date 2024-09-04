
/*import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate('/login');
    }
  }, [navigate]);

  return isAuthenticated;
};

export default ProtectedRoute;*/



import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const useAuthRedirect = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = Cookies.get('access_token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);
};

const ProtectedRoute = ({ children }) => {
  useAuthRedirect();
  const token = Cookies.get('access_token');
  
  // Show a loading indicator or null while redirecting
  if (!token) return null;

  return children;
};

export default ProtectedRoute;
