import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import Cookies from 'js-cookie';
import api from '../../api'; 
import logo from '../../assets/logo.jpg'; 

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    // Checking if the user is logged in
    const isLoggedIn = !!Cookies.get('access_token'); 

    // Function to handle logout
    const handleLogout = async () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            try {
                // refresh token from Cookies
                const refreshToken = Cookies.get('refresh_token');

                if (refreshToken) {
                    await api.post('/logout/', { refresh_token: refreshToken });

                    // remove access token
                    Cookies.remove('access_token');
                    Cookies.remove('refresh_token');

                    // Redirect to login page
                    navigate('/');
                } else {
                    console.error('Refresh token not found.');
                }
            } catch (error) {
                console.error('Error during logout:', error);
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
            <nav className="sticky-navbar p-4" style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                <div className="container mx-auto flex justify-between items-center">
                    <div className="logoDiv flex items-center">
                        {/* Logo image */}
                        <Link to={'/'}><img src={logo} alt="Logo" className="w-14 h-14 mr-2 rounded-full" /></Link>
                        <h1 className='logo text-[25px] text-green-500'><strong><Link to={'/'}>I-wan-wok</Link></strong></h1>
                    </div>
                    <div className="hidden md:flex gap-8">
                        <li className='menuList text-[#6f6f6f] hover:text-green-600' data-aos="fade-right"><Link to={'/'}>Jobs</Link></li>
                        <li className='menuList text-[#6f6f6f] hover:text-green-600' data-aos="fade-right"><Link to={'/company'}>Companies</Link></li>
                        <li className='menuList text-[#6f6f6f] hover:text-green-600' data-aos="fade-right"><Link to={'/'}>About</Link></li>
                        <li className='menuList text-[#6f6f6f] hover:text-green-600' data-aos="fade-right"><Link to={'/'}>Contact</Link></li>
                        <li className='menuList text-[#6f6f6f] hover:text-green-600' data-aos="fade-right"><Link to={'/'}>Blog</Link></li> 

                        {/* Conditional rendering for login/register or logout */}
                        {isLoggedIn ? (
                            <>
                                <li className='menuList text-[#6f6f6f] hover:text-green-600' data-aos="fade-right"><Link to={'/cart'}>Cart</Link></li>
                                <li className='menuList text-[#6f6f6f] hover:text-green-600' data-aos="fade-right"><Link to={'/dashboard'}>Dashboard</Link></li>
                                <li className='menuList text-[#6f6f6f] hover:text-green-600' data-aos="fade-right" onClick={handleLogout}>Logout</li> 
                            </>
                        ) : (
                            <>
                                <li className='menuList text-[#6f6f6f] hover:text-green-600' data-aos="fade-right"><Link to={'/login'}>Login</Link></li>
                                <li className='menuList text-[#6f6f6f] hover:text-green-600' data-aos="fade-right"><Link to={'/signup'}>Register</Link></li> 
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
                            <li className='menuList text-[#6f6f6f] hover:text-green-600' data-aos="fade-right"><Link to={'/'} onClick={closeMenu}>Jobs</Link></li>
                            <li className='menuList text-[#6f6f6f] hover:text-green-600' data-aos="fade-right"><Link to={'/company'} onClick={closeMenu}>Companies</Link></li>
                            <li className='menuList text-[#6f6f6f] hover:text-green-600' data-aos="fade-right"><Link to={'/'} onClick={closeMenu}>About</Link></li>
                            <li className='menuList text-[#6f6f6f] hover:text-green-600' data-aos="fade-right"><Link to={'/'} onClick={closeMenu}>Contact</Link></li>
                            <li className='menuList text-[#6f6f6f] hover:text-green-600' data-aos="fade-right"><Link to={'/'} onClick={closeMenu}>Blog</Link></li> 

                            {/* Conditional rendering for login/register or logout */}
                            {isLoggedIn ? (
                                <>
                                    <li className='menuList text-[#6f6f6f] hover:text-green-600' data-aos="fade-right"><Link to={'/cart'} onClick={closeMenu}>Cart</Link></li>
                                    <li className='menuList text-[#6f6f6f] hover:text-green-600' data-aos="fade-right"><Link to={'/dashboard'} onClick={closeMenu}>Dashboard</Link></li>
                                    <li className='menuList text-[#6f6f6f] hover:text-green-600'data-aos="fade-right" onClick={handleLogout}>Logout</li> 
                                </>
                            ) : (
                                <>
                                    <li className='menuList text-[#6f6f6f] hover:text-green-600' data-aos="fade-right"><Link to={'/login'} onClick={closeMenu}>Login</Link></li>
                                    <li className='menuList text-[#6f6f6f] hover:text-green-600' data-aos="fade-right"><Link to={'/signup'} onClick={closeMenu}>Register</Link></li>
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
