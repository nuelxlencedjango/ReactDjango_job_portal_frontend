import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ResultsPage = () => {
    const location = useLocation();
    const { searchParams, results } = location.state || { searchParams: {}, results: [] };

    //console.log('Search Params:', searchParams);
    //console.log('Results:', results);

    return (
        <div className="container mx-auto p-6" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-6 text-center">Search Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.length > 0 ? (
                    results.map((artisan) => (
                        <div key={artisan.id} className="bg-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300" data-aos="fade-up">
                            <img
                                src={artisan.profile_img || 'default.jpg'}
                                alt={artisan.user?.username || 'No name'}
                                className="w-full h-48 object-cover rounded-lg mb-2"
                            />
                            <h3 className="text-xl font-semibold mb-2">
                                {artisan.user?.first_name} {artisan.user?.last_name}
                            </h3>
                            <p className="text-gray-700 mb-.5"><strong>Username:</strong> {artisan.user?.username || 'N/A'}</p>
                            <p className="text-gray-700 mb-.5"><strong>Location:</strong> {artisan.location?.location || 'N/A'}</p>
                            <p className="text-gray-700 mb-.5"><strong>Service:</strong> {artisan.service?.title || 'N/A'}</p>
                            <p className="text-gray-700 mb-2"><strong>Experience:</strong> {artisan.experience || 'Unknown'} years</p>
                            <Link
                                to={`/order/${artisan.id}`} 
                                className="inline-block px-4 py-2 bg-green-500 text-white rounded-lg text-center hover:bg-red-600 transition-colors duration-300"
                            >
                                Order Now
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No results found.</p>
                )}
            </div>
        </div>
    );
};

export default ResultsPage;
