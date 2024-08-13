
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { RiBriefcase4Fill } from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';

const ArtisanDetailsForm = () => {
    const [formData, setFormData] = useState({
        nin: '',
        location: '',
        experience: '',
        address: '',
        phone: '',
        service: '',
        profile_img: null,
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [locations, setLocations] = useState([]);
    const [services, setServices] = useState([]);

    const { userId, username } = useParams();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prevData => ({
            ...prevData,
            profile_img: file
        }));
    };

    const fetchLocations = async () => {
        try {
            const response = await axios.get('https://web-production-b1ed.up.railway.app/artisans/location-list/');
            setLocations(response.data);
            console.log(response)
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    
    const fetchServices = async () => {
        try {
            const response = await axios.get('https://web-production-b1ed.up.railway.app/artisans/profession-list/');
            setServices(response.data);
            console.log("profession:",response)
        } catch (error) {
            console.error('Error fetching professions:', error);
        }
        finally{
            console.log('loading')
        }
    };

    useEffect(() => {
        fetchLocations();
        fetchServices();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!formData.nin) newErrors.nin = "NIN is required";
        if (!formData.location) newErrors.location = "Location is required";
        if (!formData.service) newErrors.service = "Service is required";
        if (!formData.experience) newErrors.experience = "Experience is required";
        if (!formData.address) newErrors.address = "Address is required";
        if (!formData.phone) newErrors.phone = "Phone is required";

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }
    
        const formDataToSend = new FormData();
        formDataToSend.append('user_id', userId);
        formDataToSend.append('nin', formData.nin);
        formDataToSend.append('location', formData.location);
        formDataToSend.append('experience', formData.experience);
        formDataToSend.append('address', formData.address);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('service', formData.service);
        if (formData.profile_img) {
            formDataToSend.append('profile_img', formData.profile_img);
        }
    
        try {
            setLoading(true);
            const response = await axios.post('https://web-production-b1ed.up.railway.app/artisans/add_artisan/', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
    
            if (response.status === 201) {
                alert('Artisan details submitted successfully.');
                navigate('/available-jobs');
            } else {
                throw new Error("Unexpected response status");
            }
        } catch (error) {
            console.error("API Error:", error.response || error);
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            } else {
                setErrors({ general: "An unexpected error occurred" });
            }
        } finally {
            setLoading(false);
        }
    };
    
    

    return (
        <div className="min-h-screen mt-20 flex flex-col items-center justify-center bg-gray-100 py-6">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Hi, {username} ! Please fill in the rest</h1>
                {errors.general && (
                    <div className="mb-4 text-red-500 text-md text-center">
                        {errors.general}
                    </div>
                )}
                {loading && (
                    <div className="absolute inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center z-10">
                        <div className="loader"></div>
                    </div>
                )}

                <div className='bg-gray-200 p-4 rounded-md'>
                <form onSubmit={handleSubmit} className="space-y-6">

                <div className="relative">
                            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="nin"
                                value={formData.nin}
                                onChange={handleInputChange}
                                placeholder="NIN"
                                className={`w-full pl-10 pr-4 py-2 border ${errors.nin ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                            />
                            {errors.nin && (
                                <div className="text-red-500 text-sm">
                                    {errors.nin}
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <select
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                className={`w-full pl-10 pr-4 py-2 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                            >
                                <option value="">Select Location</option>
                                {locations.map(location => (
                                    <option key={location.id} value={location.id}>{location.location}</option>
                                ))}
                            </select>
                            {errors.location && (
                                <div className="text-red-500 text-sm">
                                    {errors.location}
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <RiBriefcase4Fill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <select
                                name="service"
                                value={formData.service}
                                onChange={handleInputChange}
                                className={`w-full pl-10 pr-4 py-2 border ${errors.service ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                            >
                                <option value="">Select Profession</option>
                                {services.map(service => (
                                    <option key={service.id} value={service.id}>{service.title}</option>
                                ))}
                            </select>
                            {errors.service && (
                                <div className="text-red-500 text-sm">
                                    {errors.service}
                                </div>
                            )}
                        </div>
                   
                     
                        <div className="relative">
                            <RiBriefcase4Fill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="number"
                                name="experience"
                                value={formData.experience}
                                onChange={handleInputChange}
                                placeholder="Years of Experience"
                                className={`w-full pl-10 pr-4 py-2 border ${errors.experience ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                            />
                            {errors.experience && (
                                <div className="text-red-500 text-sm">
                                    {errors.experience}
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="Address"
                                className={`w-full pl-10 pr-4 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                            />
                            {errors.address && (
                                <div className="text-red-500 text-sm">
                                    {errors.address}
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="Phone Number"
                                className={`w-full pl-10 pr-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                            />
                            {errors.phone && (
                                <div className="text-red-500 text-sm">
                                    {errors.phone}
                                </div>
                            )}
                        </div>
                        
                        <div className="relative">
                           
                           <input
                               type="file"
                               name="profile_img"
                               onChange={handleFileChange}
                               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                           />
                       </div>
                   
                  
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
                </div>
            </div>
        </div>
    );
};

export default ArtisanDetailsForm;

