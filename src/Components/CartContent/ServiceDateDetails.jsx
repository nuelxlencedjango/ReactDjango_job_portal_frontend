{/*import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../api'; 
import { FaUser, FaMapMarkerAlt } from 'react-icons/fa';
import { ImFileText } from "react-icons/im";

const ServiceDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { artisan, service } = location.state || {};

  if (!artisan || !service) {
    return <div>No details available</div>;
  }

  const [formData, setFormData] = useState({
    description: '',
    artisan: `${artisan?.user?.first_name} ${artisan?.user?.last_name}`,
    address: '',
    contact_person: '',
    contact_person_phone: '',
    expectedDate: '',
    location: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  const fetchLocations = async () => {
    try {
      const response = await api.get('/api/location-list/');  // Use the api instance for requests
      setLocations(response.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.contact_person) newErrors.contact_person = "Contact person is required";
    if (!formData.contact_person_phone) newErrors.contact_person_phone = "Contact phone is required";
    if (!formData.expectedDate) newErrors.expectedDate = "Expected date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await api.post(
        '/employer/job-details/',  // Use the api instance for requests
        formData
      );
      if (response.status === 201) {
        alert("Job details have been submitted successfully.");
        navigate('/cart');
      } else {
        throw new Error("Unexpected response status from API.");
      }
    } catch (error) {
      console.error("API Error:", error.response || error);
      setErrors({
        general: error.response?.data?.message || "Failed to submit job details. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-10">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md relative mb-10">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Detail Of The Job</h1>

        {errors.general && (
          <div className="mb-4 text-red-500 text-md text-center">
            {errors.general}
          </div>
        )}

        {loading && (
          <div className="absolute inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center z-10">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-gray-500" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

        <div className="bg-gray-200 p-4 rounded-md">
          <form onSubmit={handleNext} className="space-y-6">

            {/* Artisan Name (read-only) */}
            {/*<div className="relative">
              <label htmlFor="artisan" className="text-gray-500 mb-1 px-1 block">Artisan's Name</label>
              <FaUser className="absolute left-3 top-3/4 transform -translate-y-1/2 text-gray-400" />
              <input type="text" name="artisan" value={formData.artisan}
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md"
                readOnly
              />
            </div>

            {/* Description */}
            {/*<div className="relative">
              <label htmlFor="description" className="text-gray-500 mb-1 px-1 block">Describe the service you want</label>
              <ImFileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <textarea name="description" placeholder="Description"
                value={formData.description} onChange={handleInputChange}
                className="w-full py-12 pl-10 pr-4 border border-gray-300 rounded-md"
                rows="3"
              />
              {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
            </div>

            {/* Location Dropdown */}
            {/*<div className="relative">
              <label htmlFor="location" className="text-gray-500 mb-1 px-1 block">Select Location</label>
              <FaMapMarkerAlt className="absolute left-3 top-3/4 transform -translate-y-1/2 text-gray-400" />
              <select
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-2 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              >
                <option value="">Select Location</option>
                {locations.map(location => (
                  <option key={location.id} value={location.id}>{location.location}</option>
                ))}
              </select>
              {errors.location && <div className="text-red-500 text-sm">{errors.location}</div>}
            </div>

            {/* Address */}
            {/*<div className="relative">
              <label htmlFor="address" className="text-gray-500 mb-1 px-1 block">Address</label>
              <FaUser className="absolute left-3 top-3/4 transform -translate-y-1/2 text-gray-400" />
              <input type="text" name="address" placeholder="Address" 
                value={formData.address} onChange={handleInputChange}
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md"
              />
              {errors.address && <div className="text-red-500 text-sm">{errors.address}</div>}
            </div>

            {/* Contact Person */}
            {/*<div className="relative">
              <label htmlFor="contact_person" className="text-gray-500 mb-1 px-1 block">Contact Person</label>
              <FaUser className="absolute left-3 top-3/4 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text" name="contact_person" placeholder="Contact Person"
                value={formData.contact_person}
                onChange={handleInputChange}
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md"
              />
              {errors.contact_person && <div className="text-red-500 text-sm">{errors.contact_person}</div>}
            </div>

            {/* Contact Person Phone */}
            {/*<div className="relative">
              <label htmlFor="contact_person_phone" className="text-gray-500 mb-1 px-1 block">Phone Number</label>
              <FaUser className="absolute left-3 top-3/4 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text" name="contact_person_phone"placeholder="Contact Person Phone"
                value={formData.contact_person_phone}
                onChange={handleInputChange}
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md"
              />
              {errors.contact_person_phone && <div className="text-red-500 text-sm">{errors.contact_person_phone}</div>}
            </div>

            {/* Expected Date */}
            {/*<div className="relative">
              <label htmlFor="expectedDate" className="text-gray-500  mb-1 px-1 block">Expected Date</label>
              <FaUser className="absolute left-3 top-3/4 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date" name="expectedDate" value={formData.expectedDate}
                onChange={handleInputChange}
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md" />
              {errors.expectedDate && <div className="text-red-500 text-sm">{errors.expectedDate}</div>}
            </div>

            {/* Submit Button */}
            {/*<button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={loading}
            >
              {loading ? "Loading..." : "Next"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;*/}



{/*1111112222import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../api';
import { FaUser, FaMapMarkerAlt } from 'react-icons/fa';
import { ImFileText } from "react-icons/im";

const ServiceDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { artisan, service } = location.state || {};

  if (!artisan || !service) {
    return <div>No details available</div>;
  }

  const [formData, setFormData] = useState({
    description: '',
    artisan: `${artisan?.user?.first_name} ${artisan?.user?.last_name}`,
    address: '',
    contact_person: '',
    contact_person_phone: '',
    expectedDate: '',
    location: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  const fetchLocations = async () => {
    try {
      const response = await api.get('/api/location-list/');
      setLocations(response.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.contact_person) newErrors.contact_person = "Contact person is required";
    if (!formData.contact_person_phone) newErrors.contact_person_phone = "Contact phone is required";
    if (!formData.expectedDate) newErrors.expectedDate = "Expected date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await api.post(
        '/employer/job-details/',
        formData
      );
      if (response.status === 201) {
        alert("Job details have been submitted successfully.");
        navigate('/cart');
      } else {
        throw new Error("Unexpected response status from API.");
      }
    } catch (error) {
      console.error("API Error:", error.response || error);
      setErrors({
        general: error.response?.data?.message || "Failed to submit job details. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-10">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md relative mb-10">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Detail Of The Job</h1>

        {errors.general && (
          <div className="mb-4 text-red-500 text-md text-center">
            {errors.general}
          </div>
        )}

        {loading && (
          <div className="absolute inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center z-10">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-gray-500" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

        <div className="bg-gray-200 p-4 rounded-md">
          <form onSubmit={handleNext} className="space-y-6">

            
            <div className="relative">
              <label htmlFor="artisan" className="text-gray-500 mb-1 px-1 block">Artisan's Name</label>
              <FaUser className="absolute left-3 top-3/4 transform -translate-y-1/2 text-gray-400" />
              <input type="text" name="artisan" value={formData.artisan}
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md"
                readOnly
              />
            </div>

           
            <div className="relative">
              <label htmlFor="description" className="text-gray-500 mb-1 px-1 block">Describe the service you want</label>
              <ImFileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <textarea name="description" placeholder="Description"
                value={formData.description} onChange={handleInputChange}
                className="w-full py-12 pl-10 pr-4 border border-gray-300 rounded-md"
                rows="3"
              />
              {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
            </div>

         
            <div className="relative">
              <label htmlFor="location" className="text-gray-500 mb-1 px-1 block">Select Location</label>
              <FaMapMarkerAlt className="absolute left-3 top-3/4 transform -translate-y-1/2 text-gray-400" />
              <select
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-2 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              >
                <option value="">Select Location</option>
                {locations.map(location => (
                  <option key={location.id} value={location.id}>{location.location}</option>
                ))}
              </select>
              {errors.location && <div className="text-red-500 text-sm">{errors.location}</div>}
            </div>

            
            <div className="relative">
              <label htmlFor="address" className="text-gray-500 mb-1 px-1 block">Address</label>
              <input type="text" name="address" placeholder="Address"
                value={formData.address} onChange={handleInputChange}
                className={`w-full py-2 pl-10 pr-4 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              />
              {errors.address && <div className="text-red-500 text-sm">{errors.address}</div>}
            </div>

            
            <div className="relative">
              <label htmlFor="contact_person" className="text-gray-500 mb-1 px-1 block">Contact Person</label>
              <input type="text" name="contact_person" placeholder="Contact Person"
                value={formData.contact_person} onChange={handleInputChange}
                className={`w-full py-2 pl-10 pr-4 border ${errors.contact_person ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              />
              {errors.contact_person && <div className="text-red-500 text-sm">{errors.contact_person}</div>}
            </div>

         
            <div className="relative">
              <label htmlFor="contact_person_phone" className="text-gray-500 mb-1 px-1 block">Contact Phone</label>
              <input type="tel" name="contact_person_phone" placeholder="Contact Phone"
                value={formData.contact_person_phone} onChange={handleInputChange}
                className={`w-full py-2 pl-10 pr-4 border ${errors.contact_person_phone ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              />
              {errors.contact_person_phone && <div className="text-red-500 text-sm">{errors.contact_person_phone}</div>}
            </div>

         
            <div className="relative">
              <label htmlFor="expectedDate" className="text-gray-500 mb-1 px-1 block">Expected Date</label>
              <input type="date" name="expectedDate" placeholder="Expected Date"
                value={formData.expectedDate} onChange={handleInputChange}
                className={`w-full py-2 pl-10 pr-4 border ${errors.expectedDate ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              />
              {errors.expectedDate && <div className="text-red-500 text-sm">{errors.expectedDate}</div>}
            </div>

            <button type="submit" disabled={loading} className="w-full py-3 bg-green-500 text-white font-bold rounded-md hover:bg-green-600">
              {loading ? 'Processing...' : 'Submit'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;*/}




{/*import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../api';
import { FaUser, FaMapMarkerAlt } from 'react-icons/fa';
import { ImFileText } from 'react-icons/im';

const ServiceDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { artisan, service } = location.state || {};

  if (!artisan || !service) {
    return <div>No details available</div>;
  }

  const [formData, setFormData] = useState({
    description: '',
    artisan: `${artisan?.user?.first_name} ${artisan?.user?.last_name}`,
    address: '',
    contact_person: '',
    contact_person_phone: '',
    expectedDate: '',
    location: ''
  });




  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '' // Clear specific error when field is modified
    }));
  };

  // Fetch locations from the API
  const fetchLocations = async () => {
    try {
      const response = await api.get('/api/location-list/');
      setLocations(response.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.contact_person) newErrors.contact_person = 'Contact person is required';
    if (!formData.contact_person_phone) newErrors.contact_person_phone = 'Contact phone is required';
    if (!formData.expectedDate) newErrors.expectedDate = 'Expected date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleNext = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await api.post('/employer/job-details/', formData);
      if (response.status === 201) {
        alert('Job details have been submitted successfully.');
        navigate('/cart');
      } else {
        throw new Error('Unexpected response status from API.');
      }
    } catch (error) {
      console.error('API Error:', error.response || error);
      const backendErrorMessage = error.response?.data?.message || 'Failed to submit job details. Please try again.';
      
      setErrors({
        general: backendErrorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-10">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md relative mb-10">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Detail Of The Job</h1>

     
        {errors.general && (
          <div className="mb-4 text-red-500 text-md text-center">
            {errors.general}
          </div>
        )}

      
        {loading && (
          <div className="absolute inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center z-10">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-gray-500" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

        <div className="bg-gray-200 p-4 rounded-md">
          <form onSubmit={handleNext} className="space-y-6">

       
            <div className="relative">
              <label htmlFor="artisan" className="text-gray-500 mb-1 px-1 block">Artisan's Name</label>
              <FaUser className="absolute left-3 top-3/4 transform -translate-y-1/2 text-gray-400" />
              <input type="text" name="artisan" value={formData.artisan}
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md"
                readOnly
              />
            </div>

            <div className="relative">
              <label htmlFor="description" className="text-gray-500 mb-1 px-1 block">Describe the service you want</label>
              <ImFileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <textarea name="description" placeholder="Description"
                value={formData.description} onChange={handleInputChange}
                className="w-full py-12 pl-10 pr-4 border border-gray-300 rounded-md"
                rows="3"
              />
              {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
            </div>

            <div className="relative">
              <label htmlFor="location" className="text-gray-500 mb-1 px-1 block">Select Location</label>
              <FaMapMarkerAlt className="absolute left-3 top-3/4 transform -translate-y-1/2 text-gray-400" />
              <select
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-2 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              >
                <option value="">Select Location</option>
                {locations.map(location => (
                  <option key={location.id} value={location.id}>{location.location}</option>
                ))}
              </select>
              {errors.location && <div className="text-red-500 text-sm">{errors.location}</div>}
            </div>

       
            <div className="relative">
              <label htmlFor="address" className="text-gray-500 mb-1 px-1 block">Address</label>
              <input type="text" name="address" placeholder="Address"
                value={formData.address} onChange={handleInputChange}
                className={`w-full py-2 pl-10 pr-4 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              />
              {errors.address && <div className="text-red-500 text-sm">{errors.address}</div>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-green-500 text-white font-bold rounded-md hover:bg-green-600"
            >
              {loading ? 'Processing...' : 'Submit'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;*/}




import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../api';  // Your Axios instance
import { FaUser, FaMapMarkerAlt } from 'react-icons/fa';
import { ImFileText } from "react-icons/im";

const ServiceDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { artisan, service } = location.state || {};

  if (!artisan || !service) {
    return <div>No details available</div>;
  }

  const [formData, setFormData] = useState({
    description: '',
    artisan: `${artisan?.user?.first_name} ${artisan?.user?.last_name}`,
    address: '',
    contact_person: '',
    contact_person_phone: '',
    expectedDate: '',
    location: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  // Fetch Locations (Automatically includes the token via interceptors)
  const fetchLocations = async () => {
    try {
      const response = await api.get('/api/location-list/');
      setLocations(response.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  // Validate the form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.contact_person) newErrors.contact_person = "Contact person is required";
    if (!formData.contact_person_phone) newErrors.contact_person_phone = "Contact phone is required";
    if (!formData.expectedDate) newErrors.expectedDate = "Expected date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleNext = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await api.post(
        '/employer/job-details/',
        formData
      );
      if (response.status === 201) {
        alert("Job details have been submitted successfully.");
        navigate('/cart');
      } else {
        throw new Error("Unexpected response status from API.");
      }
    } catch (error) {
      console.error("API Error:", error.response || error);
      setErrors({
        general: error.response?.data?.message || "Failed to submit job details. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-10">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md relative mb-10">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Detail Of The Job</h1>

        {errors.general && (
          <div className="mb-4 text-red-500 text-md text-center">
            {errors.general}
          </div>
        )}

        {loading && (
          <div className="absolute inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center z-10">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-gray-500" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

        <div className="bg-gray-200 p-4 rounded-md">
          <form onSubmit={handleNext} className="space-y-6">
            {/* Artisan Name */}
            <div className="relative">
              <label htmlFor="artisan" className="text-gray-500 mb-1 px-1 block">Artisan's Name </label>
              <FaUser className="absolute left-3 top-3/4 transform -translate-y-1/2 text-gray-400" />
              <input type="text" name="artisan" value={formData.artisan}
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md"
                readOnly
              />
            </div>

            {/* Description */}
            <div className="relative">
              <label htmlFor="description" className="text-gray-500 mb-1 px-1 block">Describe the service you want</label>
              <ImFileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <textarea name="description" placeholder="Description"
                value={formData.description} onChange={handleInputChange}
                className="w-full py-12 pl-10 pr-4 border border-gray-300 rounded-md"
                rows="3"
              />
              {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
            </div>

            {/* Location */}
            <div className="relative">
              <label htmlFor="location" className="text-gray-500 mb-1 px-1 block">Select Location</label>
              <FaMapMarkerAlt className="absolute left-3 top-3/4 transform -translate-y-1/2 text-gray-400" />
              <select
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-2 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              >
                <option value="">Select Location</option>
                {locations.map(location => (
                  <option key={location.id} value={location.id}>{location.location}</option>
                ))}
              </select>
              {errors.location && <div className="text-red-500 text-sm">{errors.location}</div>}
            </div>

            {/* Address */}
            <div className="relative">
              <label htmlFor="address" className="text-gray-500 mb-1 px-1 block">Address</label>
              <input type="text" name="address" placeholder="Address"
                value={formData.address} onChange={handleInputChange}
                className={`w-full py-2 pl-10 pr-4 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              />
              {errors.address && <div className="text-red-500 text-sm">{errors.address}</div>}
            </div>

            {/* Contact Person */}
            <div className="relative">
              <label htmlFor="contact_person" className="text-gray-500 mb-1 px-1 block">Contact Person</label>
              <input type="text" name="contact_person" placeholder="Contact Person"
                value={formData.contact_person} onChange={handleInputChange}
                className={`w-full py-2 pl-10 pr-4 border ${errors.contact_person ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              />
              {errors.contact_person && <div className="text-red-500 text-sm">{errors.contact_person}</div>}
            </div>

            {/* Contact Phone */}
            <div className="relative">
              <label htmlFor="contact_person_phone" className="text-gray-500 mb-1 px-1 block">Contact Phone</label>
              <input type="tel" name="contact_person_phone" placeholder="Contact Phone"
                value={formData.contact_person_phone} onChange={handleInputChange}
                className={`w-full py-2 pl-10 pr-4 border ${errors.contact_person_phone ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              />
              {errors.contact_person_phone && <div className="text-red-500 text-sm">{errors.contact_person_phone}</div>}
            </div>

            {/* Expected Date */}
            <div className="relative">
              <label htmlFor="expectedDate" className="text-gray-500 mb-1 px-1 block">Expected Date</label>
              <input type="date" name="expectedDate" placeholder="Expected Date"
                value={formData.expectedDate} onChange={handleInputChange}
                className={`w-full py-2 pl-10 pr-4 border ${errors.expectedDate ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              />
              {errors.expectedDate && <div className="text-red-500 text-sm">{errors.expectedDate}</div>}
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={loading} className="w-full py-3 bg-green-500 text-white font-bold rounded-md hover:bg-green-600">
              {loading ? 'Processing...' : 'Submit'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
