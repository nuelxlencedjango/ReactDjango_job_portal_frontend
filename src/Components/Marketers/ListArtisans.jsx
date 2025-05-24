import { useState, useEffect } from 'react';
import api from '../../api';

const RegisteredArtisans = () => {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        setLoading(true);
        const response = await api.get('/marketers/list-registered-artisans/');
        console.log(response.data)
        
        setArtisans(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch artisans.');
        setLoading(false);
        console.error('Error fetching artisans:', err);
      }
    };
    fetchArtisans();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-600">Loading artisans...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Registered Artisans</h3>
      {artisans.length === 0 ? (
        <p className="text-gray-600">No artisans registered yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-3 px-4 text-left text-sm font-semibold">Profile</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Name</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Service</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Location</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Experience</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Pay</th>
              </tr>
            </thead>
            <tbody>
              {artisans.map((artisan, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <img
                      src={artisan.profile_image || 'https://via.placeholder.com/40'}
                      alt="Profile"
                      className="h-10 w-10 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/40';
                      }}
                    />
                  </td>
                  <td className="py-3 px-4 text-gray-800">
                    {artisan.user.first_name && artisan.user.last_name
                      ? `${artisan.user.first_name} ${artisan.user.last_name}`
                      : artisan.user.username}
                  </td>
                  <td className="py-3 px-4 text-gray-800">{artisan.service?.title || 'N/A'}</td>
                  <td className="py-3 px-4 text-gray-800">{artisan.location?.name || 'N/A'}</td>
                  <td className="py-3 px-4 text-gray-800">{artisan.experience || 0} years</td>
                  <td className="py-3 px-4 text-gray-800">₦{artisan.pay || '0.00'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RegisteredArtisans;