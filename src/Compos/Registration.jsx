import React, { useState } from 'react';
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

export default RegistrationToggle;
