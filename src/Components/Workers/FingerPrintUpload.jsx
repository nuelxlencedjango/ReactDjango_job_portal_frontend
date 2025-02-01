import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FingerprintUpload = () => {
  const [artisanProfiles, setArtisanProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [fingerprintImage, setFingerprintImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Fetch Artisan Profiles from the API
  useEffect(() => {
    const fetchArtisanProfiles = async () => {
      try {
        const response = await axios.get('/api/artisan-profiles/');
        setArtisanProfiles(response.data);
      } catch (error) {
        console.error('Error fetching artisan profiles:', error);
      }
    };

    fetchArtisanProfiles();
  }, []);

  // Handle Artisan Profile Selection
  const handleProfileChange = (e) => {
    setSelectedProfile(e.target.value);
  };

  // Handle Fingerprint Image Change (File Upload)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFingerprintImage(file);
    }
  };

  // Handle Fingerprint Image Upload
  const handleUpload = async () => {
    if (!selectedProfile || !fingerprintImage) {
      setMessage('Please select a profile and upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append('artisan_profile', selectedProfile);
    formData.append('fingerprint_image', fingerprintImage);

    setLoading(true);
    try {
      const response = await axios.post('/api/upload-fingerprint/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('Fingerprint uploaded successfully!');
    } catch (error) {
      setMessage('Error uploading fingerprint.');
      console.error('Error uploading fingerprint:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 mt-10">
      <h1 className="text-3xl font-bold text-center mb-10">Upload Fingerprint</h1>

      {/* Artisan Profile Selection */}
      <div className="mb-6">
        <label htmlFor="artisanProfile" className="block text-xl mb-2">
          Select Artisan Profile
        </label>
        <select
          id="artisanProfile"
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={selectedProfile}
          onChange={handleProfileChange}
        >
          <option value="">--Select Profile--</option>
          {artisanProfiles.map((profile) => (
            <option key={profile.id} value={profile.id}>
              {profile.service} ({profile.user.username})
            </option>
          ))}
        </select>
      </div>

      {/* Fingerprint Image Upload */}
      <div className="mb-6">
        <label htmlFor="fingerprintImage" className="block text-xl mb-2">
          Upload Fingerprint Image (PNG, JPG, JPEG)
        </label>
        <input
          type="file"
          id="fingerprintImage"
          accept=".png, .jpg, .jpeg"
          className="w-full p-2 border border-gray-300 rounded-lg"
          onChange={handleImageChange}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
        >
          {loading ? 'Uploading...' : 'Upload Fingerprint'}
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className="mt-4 text-center">
          <p className="text-xl">{message}</p>
        </div>
      )}
    </div>
  );
};

export default FingerprintUpload;
