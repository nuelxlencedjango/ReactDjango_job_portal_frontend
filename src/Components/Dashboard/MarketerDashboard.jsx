import React from 'react';
import { Link } from 'react-router-dom';
import RegisteredArtisans from './RegisteredArtisans';

const MarketerDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-4 sm:py-6">
            <div className="w-full max-w-4xl mx-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
                    Marketer Dashboard
                </h1>
                <div className="mb-4 sm:mb-6">
                    <Link
                        to="/artisan-registration"
                        className="inline-block bg-green-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded hover:bg-green-600 text-sm sm:text-base"
                    >
                        Register New Artisan
                    </Link>
                </div>
                <RegisteredArtisans />
            </div>
        </div>
    );
};

export default MarketerDashboard;