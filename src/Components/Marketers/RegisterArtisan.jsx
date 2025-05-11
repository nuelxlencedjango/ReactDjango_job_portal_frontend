import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axios';
import { FaUser, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordFill, RiBriefcase4Fill } from 'react-icons/ri';
import { FaNairaSign } from 'react-icons/fa6';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { BsPersonCheckFill } from 'react-icons/bs';
import { IoPersonCircle } from 'react-icons/io5';

const InputField = ({ label, type, name, value, onChange, error, accept, disabled }) => {
  return (
    <div className="relative">
      {label === 'Username' && <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
      {label === 'First Name' && <IoPersonCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
      {label === 'Last Name' && <BsPersonCheckFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
      {label === 'Email' && <MdOutlineEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
      {label === 'Password' && <RiLockPasswordFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
      {label === 'Confirm Password' && <RiLockPasswordFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
      {label === 'NIN' && <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
      {label === 'Location' && <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
      {label === 'Service' && <RiBriefcase4Fill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
      
      {/*{label === 'Job Type' && <RiBriefcase4Fill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
      {/*{label === 'Marketer Code' && <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
      {label === 'Industry' && <RiBriefcase4Fill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />} */}

      {label === 'Experience' && <RiBriefcase4Fill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
      {label === 'Address' && <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
      {label === 'Phone Number' && <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
      {label === 'Pay' && <FaNairaSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
      
      {type === 'file' ? (
        <input
          type="file"
          name={name}
          onChange={onChange}
          accept={accept}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={disabled}
        />
      ) : type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full pl-10 pr-4 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
          disabled={disabled}
        >
          {value}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={label}
          className={`w-full pl-10 pr-4 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
          disabled={disabled}
        />
      )}
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};

const ArtisanRegistrationForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  //const initialMarketerCode = queryParams.get('marketer_code') || '';

  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password2: '',
    user_type: 'artisan',
    nin: '',
    location: '',
    experience: '',
    address: '',
    phone_number: '',
    service: '',
    pay: '',
    profile_image: null,
   // job_type: '',
    //industry: '',
    //marketer_code: initialMarketerCode,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [services, setServices] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [industries, setIndustries] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone_number') {
      const phoneRegex = /^\+?234[0-9]{10}$/;
      if (value && !phoneRegex.test(value)) {
        setErrors((prev) => ({ ...prev, phone_number: 'Invalid phone number format (e.g., +2348012345678)' }));
      } else {
        setErrors((prev) => ({ ...prev, phone_number: '' }));
      }
    }
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxSize = 2.1 * 1024 * 1024;
      if (file.size > maxSize) {
        setErrors({ ...errors, profile_image: 'Image size should not exceed 2.1MB.' });
      } else {
        setErrors({ ...errors, profile_image: '' });
        setFormData((prevData) => ({ ...prevData, profile_image: file }));
      }
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await axiosInstance.get('api/location-list/');
      setLocations(response.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
      setErrors((prev) => ({ ...prev, general: 'Failed to fetch locations. Please try again.' }));
    }
  };

  const fetchServices = async () => {
    try {
      const response = await axiosInstance.get('api/profession-list/');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
      setErrors((prev) => ({ ...prev, general: 'Failed to fetch services. Please try again.' }));
    }
  };

  const fetchJobTypes = async () => {
    try {
      const response = await axiosInstance.get('api/job-type-list/');
      setJobTypes(response.data);
    } catch (error) {
      console.error('Error fetching job types:', error);
      setJobTypes([
        { id: 'full_time', title: 'Full Time' },
        { id: 'part_time', title: 'Part Time' },
        { id: 'contract', title: 'Contract' },
      ]);
    }
  };

  const fetchIndustries = async () => {
    try {
      const response = await axiosInstance.get('api/industry-list/');
      setIndustries(response.data);
    } catch (error) {
      console.error('Error fetching industries:', error);
      setIndustries([
        { id: 'construction', name: 'Construction' },
        { id: 'manufacturing', name: 'Manufacturing' },
        { id: 'services', name: 'Services' },
      ]);
    }
  };

  useEffect(() => {
    fetchLocations();
    fetchServices();
    fetchJobTypes();
    fetchIndustries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.first_name) newErrors.first_name = 'First Name is required';
    if (!formData.last_name) newErrors.last_name = 'Last Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.password2) newErrors.password2 = 'Passwords do not match';
    if (!formData.nin) newErrors.nin = 'NIN is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.service) newErrors.service = 'Service is required';
    if (!formData.experience) newErrors.experience = 'Experience is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.phone_number) newErrors.phone_number = 'Phone number is required';
    if (!formData.job_type) newErrors.job_type = 'Job type is required';
    if (!formData.industry) newErrors.industry = 'Industry is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'profile_image' && formData[key]) {
        formDataToSend.append(key, formData[key]);
      } else if (key !== 'profile_image') {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      setLoading(true);
      const response = await axiosInstance.post('acct/artisan-register/', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 201) {
        alert('Artisan registration successful.');
        navigate('/artisan-dashboard');
      }
    } catch (error) {
      console.error('API Error:', error.response || error);
      if (error.response && error.response.data) {
        setErrors({
          ...error.response.data,
          general: error.response.data.detail || 'An error occurred. Please try again.',
        });
      } else {
        setErrors({ general: 'A network error occurred. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-6">
      <div className="relative bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Artisan Registration</h1>

        {errors.general && (
          <div className="mb-4 text-red-500 text-md text-center">{errors.general}</div>
        )}

        {loading && (
          <div className="absolute inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center z-10">
            <div className="loader border-t-4 border-green-500 rounded-full w-8 h-8 animate-spin"></div>
          </div>
        )}

        <div className="bg-gray-200 p-4 rounded-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              error={errors.username}
              disabled={loading}
            />
            <InputField
              label="First Name"
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              error={errors.first_name}
              disabled={loading}
            />
            <InputField
              label="Last Name"
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              error={errors.last_name}
              disabled={loading}
            />
            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              disabled={loading}
            />
            <InputField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              disabled={loading}
            />
            <InputField
              label="Confirm Password"
              type="password"
              name="password2"
              value={formData.password2}
              onChange={handleInputChange}
              error={errors.password2}
              disabled={loading}
            />
            <InputField
              label="NIN"
              type="text"
              name="nin"
              value={formData.nin}
              onChange={handleInputChange}
              error={errors.nin}
              disabled={loading}
            />
          
                                  {/* Location Field */}
                                  <div className="relative">
                                      <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                      <select
                                          name="location"
                                          value={formData.location}
                                          onChange={handleInputChange}
                                          className={`w-full pl-10 pr-4 py-2 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                                          disabled={loading}
                                      >
                                          <option value="">Select Location</option>
                                          {locations.map(location => (
                                              <option key={location.id} value={location.id}>{location.location}</option>
                                          ))}
                                      </select>
                                      {errors.location && <div className="text-red-500 text-sm">{errors.location}</div>}
                                  </div>
           
                                   {/* Service Field */}
                                   <div className="relative">
                                       <RiBriefcase4Fill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                       <select
                                           name="service"
                                           value={formData.service}
                                           onChange={handleInputChange}
                                           className={`w-full pl-10 pr-4 py-2 border ${errors.service ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                                           disabled={loading}
                                       >
                                           <option value="">Select Profession</option>
                                           {services.map(service => (
                                               <option key={service.id} value={service.id}>{service.title}</option>
                                           ))}
                                       </select>
                                       {errors.service && <div className="text-red-500 text-sm">{errors.service}</div>}
                                   </div>
        
            <InputField
              label="Experience"
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              error={errors.experience}
              disabled={loading}
            />
            <InputField
              label="Address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              error={errors.address}
              disabled={loading}
            />
            <InputField
              label="Phone Number"
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              error={errors.phone_number}
              disabled={loading}
            />
            <InputField
              label="Pay"
              type="number"
              name="pay"
              value={formData.pay}
              onChange={handleInputChange}
              error={errors.pay}
              disabled={loading}
            />
            <InputField
              label="Profile Image"
              type="file"
              name="profile_image"
              onChange={handleFileChange}
              accept="image/*"
              error={errors.profile_image}
              disabled={loading}
            />
            <InputField
              label="Marketer Code"
              type="text"
              name="marketer_code"
              value={formData.marketer_code}
              onChange={handleInputChange}
              error={errors.marketer_code}
              disabled={loading}
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Register'}
            </button>
          </form>
          {Object.keys(errors).length > 0 && (
            <div className="mb-4 text-red-500 text-md text-center">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key]}</p>
              ))}
            </div>
          )}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-green-500 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanRegistrationForm;