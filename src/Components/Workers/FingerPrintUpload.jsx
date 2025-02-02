import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FingerprintUpload = () => {
  const { artisanId } = useParams(); // Get artisan ID from the URL
  const [fingerprintImage, setFingerprintImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle Fingerprint Image Change (File Upload)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFingerprintImage(file);
    }
  };

  // Handle Fingerprint Image Upload
  const handleUpload = async () => {
    if (!fingerprintImage) {
      setMessage('Please upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append('fingerprint_image', fingerprintImage);

    setLoading(true);
    try {
      const response = await axios.post(
        `/acct/upload-fingerprint/${artisanId}/`, 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setMessage('Fingerprint uploaded successfully!');
    } catch (error) {
      setMessage('Error uploading fingerprint.');
      console.error('Error uploading fingerprint:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Upload Fingerprint</h1>
      
      {/* Upload Section */}
      <div className="mb-6">
        <label htmlFor="fingerprintImage" className="block text-xl font-medium text-gray-700 mb-2">
          Upload Fingerprint Image (PNG, JPG, JPEG)
        </label>
        <input
          type="file"
          id="fingerprintImage"
          accept=".png, .jpg, .jpeg"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleImageChange}
        />
      </div>

      {/* Upload Button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={handleUpload}
          disabled={loading}
          className={`px-6 py-3 text-white rounded-lg w-full max-w-xs transition-all duration-300 ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Uploading...' : 'Upload Fingerprint'}
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className={`text-center mt-4 text-lg font-semibold ${
          message.includes('Error') ? 'text-red-600' : 'text-green-600'
        }`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default FingerprintUpload;
