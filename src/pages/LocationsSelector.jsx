// LocationSelector.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationSelector = ({ onSelectLocation }) => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/artisans/location-list/')
      .then(response => {
        console.log('API Response:', response);  // Log the entire response
        console.log('Response Data:', response.data);  // Log the response data
        console.log('Response Type:', typeof response.data); // Log the response type
        console.log('Is Array:', Array.isArray(response.data)); // Check if response is an array
        if (Array.isArray(response.data)) {
          setLocations(response.data);
        } else {
          setError('Unexpected response format.');
        }
        setLoading(false);
      })
      .catch(error => {
        setError('There was an error fetching the locations.');
        setLoading(false);
        console.error('There was an error fetching the locations!', error);
      });
  }, []);

  const handleChange = (event) => {
    const selected = event.target.value;
    setSelectedLocation(selected);
    onSelectLocation(selected);
  };

  return (
    <div>
      <label htmlFor="location">Select Location:</label>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <select id="location" value={selectedLocation} onChange={handleChange}>
          <option value="">--Select a location--</option>
          {locations.map(location => (
            <option key={location.id} value={location.id}>{location.name}</option>
          ))}
        </select>
      )}
    </div>
  );
};

export default LocationSelector;
