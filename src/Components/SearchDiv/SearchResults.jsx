import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ResultsPage = () => {
    const location = useLocation();
    const { searchParams, results } = location.state || { searchParams: {}, results: [] };

    return (
        <div className="container mx-auto p-6" data-aos="fade-up">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Search Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.length > 0 ? (
                    results.map((artisan) => (
                        <div
                            key={artisan.id}
                            className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
                            data-aos="fade-up"
                        >
                            {/* Artisan Image */}
                            <img
                                src={artisan.profile_image || 'default.jpg'}
                                alt={artisan.user?.username || 'No name'}
                                className="w-full h-40 object-cover rounded-lg mb-4"  
                            />

                            {/* Artisan Details */}
                            <h3 className="text-lg font-semibold mb-2 text-gray-800">
                                {artisan.user?.first_name} {artisan.user?.last_name}
                            </h3>
                            <div className="space-y-0 text-gray-600">
                                <p><strong className="text-sm">Username:</strong> {artisan.user?.username || 'N/A'}</p>
                                <p><strong className="text-sm">Location:</strong> {artisan.location?.location || 'N/A'}</p>
                                <p><strong className="text-sm">Service:</strong> {artisan.service?.title || 'N/A'}</p>
                                <p><strong className="text-sm">Experience:</strong> {artisan.experience || 'Unknown'} years</p>
                                <p><strong className="text-sm">Average Daily Pay:</strong> ${artisan.pay || 'Unknown'}</p>
                            </div>

                            {/* Order Button */}
                            <div className="mt-4">
                                <Link
                                    to={`/order/${artisan.id}`}
                                    className="inline-block w-full px-4 py-2 bg-green-500 text-white text-center rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300"
                                >
                                    Request Now
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-full">No results found.</p>
                )}
            </div>
        </div>
    );
};

export default ResultsPage;
