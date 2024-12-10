import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.jpg'; 

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        
        <div>
            <nav className="sticky-navbar p-4" style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                <div className="container mx-auto flex justify-between items-center">
                    <div className="logoDiv flex items-center">
                        
                        {/* logo image */}
                        <Link to={'/'}><img src={logo} alt="Logo" className="w-14 h-14 mr-2 rounded-full" /></Link>
                        <h1 className='logo text-[25px] text-green-500'><strong><Link to={'/'}>I-won-wok</Link></strong></h1>
                    </div>
                    <div className="hidden md:flex gap-8">
                        <li className='menuList text-[#6f6f6f] hover:text-blue-600'><Link to={'/'}>Jobs</Link></li>
                        <li className='menuList text-[#6f6f6f] hover:text-blue-600'><Link to={'/company'}>Companies</Link></li>
                        <li className='menuList text-[#6f6f6f] hover:text-blue-600'><Link to={'/'}>About</Link></li>
                        <li className='menuList text-[#6f6f6f] hover:text-blue-600'><Link to={'/'}>Contact</Link></li>
                        <li className='menuList text-[#6f6f6f] hover:text-blue-600'><Link to={'/'}>Blog</Link></li>
                        <li className='menuList text-[#6f6f6f] hover:text-blue-600'><Link to={'/login'}>Login</Link></li>  
                        <li className='menuList text-[#6f6f6f] hover:text-blue-600'><Link to={'/signup'}>Register</Link></li>
                        <li className='menuList text-[#6f6f6f] hover:text-blue-600'><Link to={`/register/artisan`}>Regista</Link> </li>

                        
                        <li className='menuList text-[#6f6f6f] hover:text-blue-600'><Link to={'/dashboard'}>Dashboard</Link></li>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMenu} className="text-2xl text-blue-600">
                            {isOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>
                {isOpen && (
                    <div className="md:hidden">
                        <ul className="flex flex-col items-center gap-4 mt-4">
                            <li className='menuList text-[#6f6f6f] hover:text-blue-600'><Link to={'/'}>Jobs</Link></li>
                            <li className='menuList text-[#6f6f6f] hover:text-blue-600'><Link to={'/company'}>Companies</Link></li>
                            <li className='menuList text-[#6f6f6f] hover:text-blue-600'><Link to={'/'}>About</Link></li>
                            <li className='menuList text-[#6f6f6f] hover:text-blue-600'><Link to={'/'}>Contact</Link></li>
                            <li className='menuList text-[#6f6f6f] hover:text-blue-600'><Link to={'/'}>Blog</Link></li>
                            <li className='menuList text-[#6f6f6f] hover:text-blue-600'><Link to={'/login'}>Login</Link></li> 
                            <li className='menuList text-[#6f6f6f] hover:text-blue-600'><Link to={'/signup'}>Register</Link></li>
                            <li className='menuList text-[#6f6f6f] hover:text-blue-600'><Link to={`/register/user`}>Regista</Link> </li>

                            <li className='menuList text-[#6f6f6f] hover:text-blue-600'><Link to={'/dashboard'}>Dashboard</Link></li>
                        </ul>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;

