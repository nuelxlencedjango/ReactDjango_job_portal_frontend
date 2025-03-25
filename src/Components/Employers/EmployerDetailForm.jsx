
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { GiPostOffice } from "react-icons/gi";
import { useNavigate, useParams } from 'react-router-dom';

const ArtisanDetailsForm = () => {
    const [formData, setFormData] = useState({
       company_name:'',
        location: '',
        phone_number: '',
       
    });



    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [locations, setLocations] = useState([]);
   

    const { username } = useParams();

   
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

    


    const fetchLocations = async () => {
        try {
            const response = await axios.get('https://api.i-wan-wok.com/api/location-list/'); 
            setLocations(response.data);
            console.log("locations :",response.data)
            console.log(response.data.location)
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };



    

    useEffect(() => {
        fetchLocations();
        
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const newErrors = {};
        if (!formData.location) newErrors.location = "Location is required";
        if (!formData.phone_number) newErrors.phone_number = "Phone is required";
        if (!formData.company_name) newErrors.company_name = "Organization's is required";
    
        setErrors(newErrors);
    
        if (Object.keys(newErrors).length > 0) {
            return;
        }
        setLoading(true);
    
        const formDataToSend = new FormData();
        formDataToSend.append('username', username);
        formDataToSend.append('location', formData.location);
        formDataToSend.append('phone_number', formData.phone_number);
        formDataToSend.append('company_name', formData.company_name);
       

            // Ensure the location is correctly selected and passed
        if (formData.location) {
        formDataToSend.append('location', formData.location);
        console.log('chosen location:',formData.location)
         }
        
    
        try {
            const response = await axios.post('https://api.i-wan-wok.com/acct/user-register/', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
    
            if (response.status === 201) {
                alert('Employer registration submitted successfully.');
                navigate('/');
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
        <div className="min-h-screen mt-0 flex flex-col items-center justify-center bg-gray-100 py-6" data-aos="fade-right">
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
                            <GiPostOffice className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="company_name"
                                value={formData.company_name}
                                onChange={handleInputChange}
                                placeholder="Company name"
                                className={`w-full pl-10 pr-4 py-2 border ${errors.company_name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                            />
                            {errors.company_name && (
                                <div className="text-red-500 text-sm">
                                    {errors.company_name}
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





