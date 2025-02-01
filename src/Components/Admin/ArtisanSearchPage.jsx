





// src/components/ArtisanSearch.jsx
import React, { useState } from "react";
import api from "../../api";

const ArtisanSearch = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");

    try {
      // Construct query parameters
      const params = new URLSearchParams({
        name,
        email,
        phone_number: phoneNumber,
      });

      // Fetch data from the Django backend using the authenticated API instance
      const response = await api.get(`/api/artisans/search/?${params}`);
      setResults(response.data);
    } catch (err) {
      setError("An error occurred while fetching data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Search Artisans</h1>

        {/* Search Form */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 mb-6">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center mb-6">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Results */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Results</h2>
          {results.length > 0 ? (
            <ul className="space-y-4">
              {results.map((artisan) => (
                <li
                  key={artisan.id}
                  className="p-4 bg-gray-50 rounded-lg shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    {/* Profile Image */}
                    {artisan.profile_image && (
                      <img
                        src={artisan.profile_image}
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    )}

                    {/* Artisan Details */}
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-gray-800">
                        {artisan.name}
                      </p>
                      <p className="text-gray-600">
                        <strong>Email:</strong> {artisan.email}
                      </p>
                      <p className="text-gray-600">
                        <strong>Phone:</strong> {artisan.phone_number}
                      </p>
                      <p className="text-gray-600">
                        <strong>Service:</strong> {artisan.service || "N/A"}
                      </p>
                      <p className="text-gray-600">
                        <strong>Experience:</strong> {artisan.experience || "N/A"} years
                      </p>
                      <p className="text-gray-600">
                        <strong>Location:</strong> {artisan.location || "N/A"}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtisanSearch;