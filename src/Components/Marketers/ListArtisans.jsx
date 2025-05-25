import { useState, useEffect } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';

const RegisteredArtisans = () => {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        setLoading(true);
        const response = await api.get('/marketers/list-registered-artisans/');
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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this artisan?')) {
      try {
        await api.delete(`/artisans/${id}/`);
        setArtisans(artisans.filter(artisan => artisan.id !== id));
      } catch (err) {
        setError('Failed to delete artisan.');
        console.error('Error deleting artisan:', err);
      }
    }
  };

  if (loading) {
    return <div className="text-center text-gray-600 py-4">Loading artisans...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Registered Artisans</h3>
        <Link 
          to="/register-artisan" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
        >
          Add New Artisan
        </Link>
      </div>
      
      {artisans.length === 0 ? (
        <p className="text-gray-600 py-4">No artisans registered yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-2 px-3 text-left text-sm font-semibold">Profile</th>
                <th className="py-2 px-3 text-left text-sm font-semibold">Name</th>
                <th className="py-2 px-3 text-left text-sm font-semibold">Service</th>
                <th className="py-2 px-3 text-left text-sm font-semibold">Location</th>
                <th className="py-2 px-3 text-left text-sm font-semibold">Experience</th>
                <th className="py-2 px-3 text-left text-sm font-semibold">Pay</th>
                <th className="py-2 px-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {artisans.map((artisan) => (
                <tr key={artisan.id} className="hover:bg-gray-50">
                  <td className="py-2 px-3">
                    <img
                      src={artisan.profile_image || 'https://via.placeholder.com/40'}
                      alt="Profile"
                      className="h-8 w-8 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/40';
                      }}
                    />
                  </td>
                  <td className="py-2 px-3 text-gray-800 text-sm">
                    {artisan.user.first_name && artisan.user.last_name
                      ? `${artisan.user.first_name} ${artisan.user.last_name}`
                      : artisan.user.username}
                  </td>
                  <td className="py-2 px-3 text-gray-800 text-sm">{artisan.service?.title || 'N/A'}</td>
                  <td className="py-2 px-3 text-gray-800 text-sm">{artisan.location?.location || 'N/A'}</td>
                  <td className="py-2 px-3 text-gray-800 text-sm">{artisan.experience || 0} years</td>
                  <td className="py-2 px-3 text-gray-800 text-sm">₦{artisan.pay || '0.00'}</td>
                  <td className="py-2 px-3 text-sm">
                    <div className="flex space-x-2">
                      <Link
                        to={`/artisans/${artisan.id}`}
                        className="text-blue-600 hover:text-blue-800"
                        title="View"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link>
                      
                      <Link
                        to={`/artisans/${artisan.id}/edit`}
                        className="text-green-600 hover:text-green-800"
                        title="Edit"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => handleDelete(artisan.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
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