import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FingerprintUpload = () => {
  const { artisanId } = useParams(); // Get artisan ID from the URL
  const [fingerprintImage, setFingerprintImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState(''); // For image preview

  console.log('artisan id:', artisanId)
  // Handle Fingerprint Image Change (File Upload)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFingerprintImage(file);
      setPreview(URL.createObjectURL(file)); // Set image preview
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
        `/upload-fingerprint/${artisanId}/`, 
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Upload Fingerprint for Artisan
        </h1>

        {/* Image Upload Section */}
        <div className="mb-8">
          <label htmlFor="fingerprintImage" className="block text-lg font-medium text-gray-700 mb-2">
            Upload Fingerprint Image (PNG, JPG, JPEG)
          </label>
          <div className="flex flex-col items-center space-y-4">
            {/* Image Preview */}
            {preview && (
              <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                <img
                  src={preview}
                  alt="Fingerprint Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* File Input */}
            <input
              type="file"
              id="fingerprintImage"
              accept=".png, .jpg, .jpeg"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={handleImageChange}
            />
          </div>
        </div>

        {/* Upload Button */}
        <div className="flex justify-center">
          <button
            onClick={handleUpload}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Uploading...
              </div>
            ) : (
              'Upload Fingerprint'
            )}
          </button>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mt-6 p-4 text-center rounded-lg ${
              message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            <p className="text-lg">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FingerprintUpload;