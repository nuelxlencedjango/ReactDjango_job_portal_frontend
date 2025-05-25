import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import Cookies from 'js-cookie';
import api from '../../api';
import logo from '../../assets/logo.jpg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Check if the user is logged in
  const isLoggedIn = !!Cookies.get('access_token');
  // Get user type from cookies
  const userType = Cookies.get('user_type') || '';

  // Map user types to dashboard routes
  const dashboardRoutes = {
    admin: '/admin-dashboard',
    manager: '/manager-dashboard',
    employer: '/employer-dashboard',
    artisan: '/artisan-dashboard',
    marketer: '/marketer-dashboard',
  };

  // Determine the dashboard route based on user type
  const dashboardRoute = dashboardRoutes[userType] || '/';

  const handleLogout = async () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      try {
        const refreshToken = Cookies.get('refresh_token');
        const accessToken = Cookies.get('access_token');

        if (!refreshToken) {
          throw new Error('No refresh token found');
        }

        // Send logout request to backend
        await api.post(
          'acct/logout/',
          { refresh_token: refreshToken },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        // Clear all auth-related cookies
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        Cookies.remove('user_type');
        Cookies.remove('cart_code');

        // Clear any user data from state/local storage if needed
        localStorage.removeItem('userData');

        // Force reload to ensure all state is cleared
        window.location.href = '/';
      } catch (error) {
        console.error('Logout failed:', error);
        // Even if API fails, clear client-side tokens
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        Cookies.remove('user_type');
        window.location.href = '/';
      }
    }
  };

  // Toggle the menu for mobile view
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close the menu when a link is clicked (for mobile view)
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <nav
        className="sticky-navbar p-4"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backgroundColor: 'white',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="logoDiv flex items-center">
            {/* Logo image */}
            <Link to="/">
              <img src={logo} alt="Logo" className="w-14 h-14 mr-2 rounded-full" />
            </Link>
            <h1 className="logo text-[25px] text-green-500">
              <strong>
                <Link to="/">I-wan-wok</Link>
              </strong>
            </h1>
          </div>
          <div className="hidden md:flex gap-8">
            <li className="menuList text-[#6f6f6f] hover:text-green-600" data-aos="fade-right">
              <Link to="/">Jobs</Link>
            </li>
            <li className="menuList text-[#6f6f6f] hover:text-green-600" data-aos="fade-right">
              <Link to="/company">Companies</Link>
            </li>
            <li className="menuList text-[#6f6f6f] hover:text-green-600" data-aos="fade-right">
              <Link to="/about_us">About Us</Link>
            </li>
            <li className="menuList text-[#6f6f6f] hover:text-green-600" data-aos="fade-right">
              <Link to="/contact_us">Contact Us</Link>
            </li>
            <li className="menuList text-[#6f6f6f] hover:text-green-600" data-aos="fade-right">
              <Link to="/">Blog</Link>
            </li>

            {/* Conditional rendering for login/register or dashboard/logout */}
            {isLoggedIn ? (
              <>
                <li className="menuList text-[#6f6f6f] hover:text-green-600" data-aos="fade-right">
                  <Link to="/cart">Cart</Link>
                </li>
                <li className="menuList text-[#6f6f6f] hover:text-green-600" data-aos="fade-right">
                  <Link to={dashboardRoute}>Dashboard</Link>
                </li>
                <li
                  className="menuList text-[#6f6f6f] hover:text-green-600 cursor-pointer"
                  data-aos="fade-right"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </>
            ) : (
              <>
                <li className="menuList text-[#6f6f6f] hover:text-green-600" data-aos="fade-right">
                  <Link to="/login">Login</Link>
                </li>
                <li className="menuList text-[#6f6f6f] hover:text-green-600" data-aos="fade-right">
                  <Link to="/signup">Register</Link>
                </li>
              </>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-2xl text-green-600">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden">
            <ul className="flex flex-col items-center gap-4 mt-4">
              <li className="menuList text-[#6f6f6f] hover:text-green-600" data-aos="fade-right">
                <Link to="/" onClick={closeMenu}>
                  Jobs
                </Link>
              </li>
              <li className="menuList text-[#6f6f6f] hover:text-green-600" data-aos="fade-right">
                <Link to="/company" onClick={closeMenu}>
                  Companies
                </Link>
              </li>
              <li className="menuList text-[#6f6f6f] hover:text-green-600" data-aos="fade-right">
                <Link to="/about_us" onClick={closeMenu}>
                  About Us
                </Link>
              </li>
              <li className="menuList text-[#6f6f6f] hover:text-green-600" data-aos="fade-right">
                <Link to="/contact_us" onClick={closeMenu}>
                  Contact Us
                </Link>
              </li>
              <li className="menuList text-[#6f6f6f] hover:text-green-600" data-aos="fade-right">
                <Link to="/" onClick={closeMenu}>
                  Blog
                </Link>
              </li>

              {/* Conditional rendering for login/register or dashboard/logout */}
              {isLoggedIn ? (
                <>
                  <li className="menuList text-[#6f6f6f] hover:text-green-600" data-aos="fade-right">
                    <Link to="/cart" onClick={closeMenu}>
                      Cart
                    </Link>
                  </li>
                  <li className="menuList text-[#6f6f6f] hover:text-green-600" data-aos="fade-right">
                    <Link to={dashboardRoute} onClick={closeMenu}>
                      Dashboard
                    </Link>
                  </li>
                  <li
                    className="menuList text-[#6f6f6f] hover:text-green-600 cursor-pointer"
                    data-aos="fade-right"
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }}
                  >
                    Logout
                  </li>
                </>
              ) : (
                <>
                  <li className="menuList text-[#6f6f6f] hover:text-green-600" data-aos="fade-right">
                    <Link to="/login" onClick={closeMenu}>
                      Login
                    </Link>
                  </li>
                  <li className="menuList text-[#6f6f6f] hover:text-green-600" data-aos="fade-right">
                    <Link to="/signup" onClick={closeMenu}>
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;