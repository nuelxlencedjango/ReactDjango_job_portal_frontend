



import React, { useState } from 'react';
import ArtisanRegistrationForm from '../Components/Workers/ArtisansBasicPage';
import EmployerRegistrationForm from '../Components/Employers/EmployerRegistrationForm';
import { useNavigate } from "react-router-dom";

const RegistrationToggle = () => {
    const [isArtisan, setIsArtisan] = useState(true); // Default to artisan form

    const handleToggle = (userType) => {
        if (userType === 'artisan') {
            setIsArtisan(true);
        } else {
            setIsArtisan(false);
        }
    };

    return (
        <div className="register-div mt-0 bg-gray-100">
            <div>
                <div className="flex justify-center register-buttons mb-5">
                    {/* Artisan Button */}
                    <button
                        onClick={() => handleToggle('artisan')} // Toggle to artisan form
                        className={`py-2 px-4 mt-4 sm:mt-6 md:mt-10 font-semibold rounded-md 
                            ${isArtisan ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'} 
                            focus:outline-none focus:ring-2 focus:ring-green-500`}
                        aria-label="Toggle to Artisan Registration"
                    >
                        Worker
                    </button>

                    {/* Employer Button */}
                    <button
                        onClick={() => handleToggle('employer')} // Toggle to employer form
                        className={`py-2 px-4 mt-4 sm:mt-6 md:mt-10 font-semibold rounded-md 
                            ${!isArtisan ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'} 
                            focus:outline-none focus:ring-2 focus:ring-green-500`}
                        aria-label="Toggle to Employer Registration"
                    >
                        Employer
                    </button>
                </div>

                {/* Conditionally render forms based on `isArtisan` state */}
                {isArtisan ? (
                    <ArtisanRegistrationForm user_type="artisan" />
                ) : (
                    <EmployerRegistrationForm user_type="employer" />
                )}
            </div>
        </div>
    );
};

export default RegistrationToggle;
