import React, { useState, useEffect } from 'react';
import api from '../../api';

// Reusable Loading Spinner
const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-4">
        <div className="border-t-4 border-green-500 rounded-full w-6 h-6 animate-spin"></div>
    </div>
);

const RegisteredArtisans = () => {
    const [artisans, setArtisans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [retryCount, setRetryCount] = useState(0);

    // Fetch artisans with retry logic
    const fetchArtisans = async () => {
        try {
            const response = await api.get('marketers/registered-artisans/');
            setArtisans(response.data);
            setError('');
        } catch (err) {
            console.error('Artisan fetch error:', err);
            setError(err.response?.data?.detail || 'Failed to load artisans');
            throw err;
        }
    };

    const fetchWithRetry = async (maxRetries = 2) => {
        let attempts = 0;
        while (attempts < maxRetries) {
            try {
                setLoading(true);
                await fetchArtisans();
                setLoading(false);
                setRetryCount(0);
                return;
            } catch (err) {
                attempts++;
                console.error(`Attempt ${attempts} failed:`, err);
                if (attempts < maxRetries) {
                    await new Promise(resolve => setTimeout(resolve, 2000 * attempts));
                } else {
                    setLoading(false);
                    throw err;
                }
            }
        }
    };

    useEffect(() => {
        fetchWithRetry();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="text-center">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Error Loading Artisans</h2>
                <p className="mb-3 sm:mb-4 text-red-500 text-sm sm:text-base">{error}</p>
                <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-4 justify-center">
                    <button
                        onClick={() => {
                            setRetryCount(prev => prev + 1);
                            fetchWithRetry();
                        }}
                        className="bg-green-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded hover:bg-green-600 disabled:bg-gray-400 text-sm sm:text-base"
                        disabled={retryCount >= 2}
                    >
                        {retryCount >= 2 ? 'Max retries reached' : 'Try Again'}
                    </button>
                    <button
                        onClick={() => setError('')}
                        className="text-green-500 hover:underline text-sm sm:text-base"
                    >
                        Continue without artisans
                    </button>
                </div>
                {retryCount > 0 && (
                    <p className="mt-2 text-xs sm:text-sm text-gray-600">
                        Attempt {retryCount} of 2
                    </p>
                )}
            </div>
        );
    }

    if (artisans.length === 0) {
        return (
            <div className="text-center">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">No Artisans Registered</h2>
                <p className="text-sm sm:text-base text-gray-600">You haven't registered any artisans yet.</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
                Registered Artisans
            </h2>
            {/* Desktop: Table */}
            <div className="hidden custom:block bg-white rounded-lg overflow-hidden">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 text-sm">
                            <th className="py-2 px-3 text-left">Name</th>
                            <th className="py-2 px-3 text-left">Service</th>
                            <th className="py-2 px-3 text-left">Experience</th>
                            <th className="py-2 px-3 text-left">Pay (₦)</th>
                            <th className="py-2 px-3 text-left">Commission (₦)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {artisans.map(artisan => (
                            <tr key={artisan.id} className="border-b text-sm">
                                <td className="py-2 px-3">
                                    {artisan.first_name} {artisan.last_name}
                                </td>
                                <td className="py-2 px-3">
                                    {artisan.service?.title || 'N/A'}
                                </td>
                                <td className="py-2 px-3">
                                    {artisan.experience ? `${artisan.experience} yrs` : 'N/A'}
                                </td>
                                <td className="py-2 px-3">
                                    {artisan.pay ? Number(artisan.pay).toLocaleString() : 'N/A'}
                                </td>
                                <td className="py-2 px-3">
                                    {artisan.commission ? Number(artisan.commission).toLocaleString() : 'N/A'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Mobile: Cards */}
            <div className="block custom:hidden space-y-3">
                {artisans.map(artisan => (
                    <div key={artisan.id} className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex items-center space-x-3">
                            {artisan.profile_image ? (
                                <img
                                    src={`https://res.cloudinary.com/your-cloud-name/image/upload/w_40,h_40,c_thumb,g_face/${artisan.profile_image}.jpg`}
                                    alt={`${artisan.first_name} ${artisan.last_name}`}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-500 text-xs">
                                        {artisan.first_name?.[0]}{artisan.last_name?.[0]}
                                    </span>
                                </div>
                            )}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-800">
                                    {artisan.first_name} {artisan.last_name}
                                </h3>
                                <p className="text-xs text-gray-600">
                                    {artisan.service?.title || 'N/A'}
                                </p>
                            </div>
                        </div>
                        <div className="mt-2 text-xs text-gray-600 space-y-1">
                            <p><strong>Experience:</strong> {artisan.experience ? `${artisan.experience} yrs` : 'N/A'}</p>
                            <p><strong>Pay:</strong> ₦{artisan.pay ? Number(artisan.pay).toLocaleString() : 'N/A'}</p>
                            <p><strong>Commission:</strong> ₦{artisan.commission ? Number(artisan.commission).toLocaleString() : 'N/A'}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RegisteredArtisans;