
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { RiBriefcase4Fill } from 'react-icons/ri';
import { FaNairaSign } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';

const ArtisanDetailsForm = () => {
    const [formData, setFormData] = useState({
        nin: '',
        location: '',
        experience: '',
        address: '',
        phone_number: '',
        service: '',
        pay: '',
        //user_type: 'artisan', 
        profile_image: null,
       
    });



    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [locations, setLocations] = useState([]);
    const [services, setServices] = useState([]);

    const { username } = useParams();

    //const storedUserId = localStorage.getItem('user_id'); 
    console.log("" + "username:", username) 
    //const [userIdd, setUserId] = useState(null); 

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
            profile_image: file,
           
        }));
    };

    const fetchLocations = async () => {
        try {
            const response = await axios.get('https://i-wanwok-backend.up.railway.app/api/location-list/'); 
            setLocations(response.data);
            console.log("locations :",response.data)
            console.log(response.data.location)
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };




    const fetchServices = async () => {
        try {
            const response = await axios.get('https://i-wanwok-backend.up.railway.app/api/profession-list/');
            setServices(response.data);
            console.log("profession:", response);
        } catch (error) {
            console.error('Error fetching professions:', error);
            if (error.response) {
                //general: error.response.data.detail || "Error occurred fetching professions."
                const backendErrors = error.response.data.nin || error.response.data.location || error.response.data.service || error.response.data.address || error.response.data.experience|| error.response.data.phone_number || error.response.data.profile_image; 
                
                setErrors({
                    general: backendErrors || "Failed to register user. Please try again."  
                  });
            } else {
                setErrors({
                    general: "Network error. Please try again."
                });
            }
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
        if (!formData.phone_number) newErrors.phone_number = "Phone is required";
    
        setErrors(newErrors);
    
        if (Object.keys(newErrors).length > 0) {
            return;
        }
        setLoading(true);
    
        const formDataToSend = new FormData();
        formDataToSend.append('username', username); 
        formDataToSend.append('nin', formData.nin);
        formDataToSend.append('location', formData.location);
        formDataToSend.append('experience', formData.experience);
        formDataToSend.append('address', formData.address);
        formDataToSend.append('phone_number', formData.phone_number);
        formDataToSend.append('service', formData.service);
        formDataToSend.append('pay', formData.pay);


            // Ensure the location is correctly selected and passed
        if (formData.location) {
        formDataToSend.append('location', formData.location);
        console.log('chosen location:',formData.location)
         }
        
        // Append image files to FormData if they exist
        if (formData.profile_image) {
            formDataToSend.append('profile_image', formData.profile_image);
        }
       
    
        try {
            const response = await axios.post('https://i-wanwok-backend.up.railway.app/acct/user-register/', formDataToSend, { 
                headers: { 'Content-Type': 'multipart/form-data' }
            });
    
            if (response.status === 201) {
                alert('Artisan details submitted successfully.');
                navigate('/dashboard');
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
        <div className="min-h-screen mt-0 flex flex-col items-center justify-center bg-gray-100 py-6" data-aos="fade-up">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md mb-10 mt-10">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Hi, {username} ! Please fill in the rest</h1>  
                {errors.general && (
                    <div className="mb-4 text-red-500 text-md text-center">
                        {errors.general} 
                    </div>
                )}
                {Object.keys(errors).length > 0 && (
                    <div className="mb-4 text-red-500 text-md text-center">
                        {Object.keys(errors).map((key) => (
                           <p key={key}>{errors[key]}</p>
                     ))}
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
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleInputChange}
                                placeholder="Phone Number"
                                className={`w-full pl-10 pr-4 py-2 border ${errors.phone_number ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                            />
                            {errors.phone_number && (
                                <div className="text-red-500 text-sm">
                                    {errors.phone_number}
                                </div>
                            )}
                        </div>
                        
                        <div className="relative">
                           
                           <input
                               type="file"
                               name="profile_image"
                               onChange={handleFileChange}
                               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                           />
                       </div>
                       {/*<div className="relative">
                           <input
                               type="file"
                               name="fingerprint_image"
                               onChange={handleFileChange}
                               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                           />
                       </div>*/}


                       <div className="relative">
                            <FaNairaSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="number"
                                name="pay"
                                value={formData.pay}
                                onChange={handleInputChange}
                                placeholder="A day pay"
                                className={`w-full pl-10 pr-4 py-2 border ${errors.pay ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                            />
                            {errors.experience && (
                                <div className="text-red-500 text-sm">
                                    {errors.pay}
                                </div>
                            )}
                        </div>
                   
                  
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
                {Object.keys(errors).length > 0 && (
                    <div className="mb-4 text-red-500 text-md text-center">
                        {Object.keys(errors).map((key) => (
                           <p key={key}>{errors[key]}</p>
                     ))}
                    </div>
                    )}
                </div>
           
            </div>
        </div>
    );
};

export default ArtisanDetailsForm;





