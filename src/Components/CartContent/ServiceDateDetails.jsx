import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../api';  
import { 
  FaUser, 
  FaMapMarkerAlt, 
  FaHome, 
  FaPhone, 
  FaCalendarAlt,
  FaIdCard 
} from 'react-icons/fa';
import { ImFileText } from "react-icons/im";

const ServiceDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { artisan, service } = location.state || {};

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

  if (!artisan || !service) {
    return <div className="p-4 text-center">No details available</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
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
      const response = await api.post('/employer/job-details/', formData);
      if (response.status === 201) {
        navigate('/cart');
      }
    } catch (error) {
      setErrors({
        general: error.response?.data?.message || "Failed to submit job details"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLocations(); }, []);

  return (
    <div className="flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md relative">
        <h1 className="text-xl font-bold text-gray-800 text-center mb-4">Job Details</h1>

        {errors.general && (
          <div className="mb-3 text-red-500 text-sm text-center">
            {errors.general}
          </div>
        )}

        {loading && (
          <div className="absolute inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-500"></div>
          </div>
        )}

        <div className="bg-gray-200 p-3 rounded-md">
          <form onSubmit={handleNext} className="space-y-4">
            {/* Artisan Name */}
            <div className="relative">
              <label className="text-gray-500 text-sm block mb-1">Artisan's Name</label>
              <FaUser className="absolute left-3 top-9 text-gray-400" />
              <input 
                type="text" 
                value={formData.artisan}
                readOnly
                className="w-full py-1.5 pl-9 pr-3 border border-gray-300 rounded-md"
              />
            </div>

            {/* Description */}
            <div className="relative">
              <label className="text-gray-500 text-sm block mb-1">Service Description</label>
              <ImFileText className="absolute left-3 top-9 text-gray-400" />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full py-1.5 pl-9 pr-3 border border-gray-300 rounded-md"
                rows="2"
                placeholder="Describe your service needs"
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>

            {/* Location */}
            <div className="relative">
              <label className="text-gray-500 text-sm block mb-1">Location</label>
              <FaMapMarkerAlt className="absolute left-3 top-9 text-gray-400" />
              <select
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={`w-full py-1.5 pl-9 pr-3 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              >
                <option value="">Select location</option>
                {locations.map(location => (
                  <option key={location.id} value={location.id}>{location.location}</option>
                ))}
              </select>
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
            </div>

            {/* Address */}
            <div className="relative">
              <label className="text-gray-500 text-sm block mb-1">Address</label>
              <FaHome className="absolute left-3 top-9 text-gray-400" />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`w-full py-1.5 pl-9 pr-3 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                placeholder="Full address"
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>

            {/* Contact Person */}
            <div className="relative">
              <label className="text-gray-500 text-sm block mb-1">Contact Person</label>
              <FaIdCard className="absolute left-3 top-9 text-gray-400" />
              <input
                type="text"
                name="contact_person"
                value={formData.contact_person}
                onChange={handleInputChange}
                className={`w-full py-1.5 pl-9 pr-3 border ${errors.contact_person ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                placeholder="Contact name"
              />
              {errors.contact_person && <p className="text-red-500 text-xs mt-1">{errors.contact_person}</p>}
            </div>

            {/* Contact Phone */}
            <div className="relative">
              <label className="text-gray-500 text-sm block mb-1">Phone Number</label>
              <FaPhone className="absolute left-3 top-9 text-gray-400" />
              <input
                type="tel"
                name="contact_person_phone"
                value={formData.contact_person_phone}
                onChange={handleInputChange}
                className={`w-full py-1.5 pl-9 pr-3 border ${errors.contact_person_phone ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                placeholder="Phone number"
              />
              {errors.contact_person_phone && <p className="text-red-500 text-xs mt-1">{errors.contact_person_phone}</p>}
            </div>

            {/* Expected Date */}
            <div className="relative">
              <label className="text-gray-500 text-sm block mb-1">Expected Date</label>
              <FaCalendarAlt className="absolute left-3 top-9 text-gray-400" />
              <input
                type="date"
                name="expectedDate"
                value={formData.expectedDate}
                onChange={handleInputChange}
                className={`w-full py-1.5 pl-9 pr-3 border ${errors.expectedDate ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              />
              {errors.expectedDate && <p className="text-red-500 text-xs mt-1">{errors.expectedDate}</p>}
            </div>

            <button
              type="submit" 
              disabled={loading}
              className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              {loading ? 'Processing...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;