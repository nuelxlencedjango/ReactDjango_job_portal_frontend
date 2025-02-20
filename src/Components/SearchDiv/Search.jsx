import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { FaMapMarkerAlt, FaBriefcase, FaIndustry, FaSearch } from 'react-icons/fa';

const JobSearch = ({ messages }) => {
    const [locations, setLocations] = useState([]);
    const [jobTypes, setJobTypes] = useState([]);
    const [industries, setIndustries] = useState([]);
    const [formState, setFormState] = useState({
        service: '',
        location: '',
        job_type: '',
        industry: ''
    });

    const navigate = useNavigate(); // Navigation

    useEffect(() => {
        fetchLocations();
        fetchJobTypes();
        fetchIndustries();
    }, []);

    const fetchLocations = async () => {
        try {
            const response = await axios.get('https://i-wanwok-backend.up.railway.app/api/location-list/');
            setLocations(response.data);
            
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    const fetchJobTypes = async () => {
        try {
            const response = await axios.get('https://i-wanwok-backend.up.railway.app/api/profession-list/');
            setJobTypes(response.data);
           
        } catch (error) {
            console.error('Error fetching job types:', error);
        }
    };

    const fetchIndustries = async () => {
        try {
            const response = await axios.get('https://i-wanwok-backend.up.railway.app/api/industry-list/');
            setIndustries(response.data);
            
        } catch (error) {
            console.error('Error fetching industries:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    

    const handleSubmit = async (e) => {
        e.preventDefault();

        // query string
        const queryParams = new URLSearchParams(formState).toString();

        try {
            //API request
            const response = await axios.get(`https://i-wanwok-backend.up.railway.app/api/artisans-search/?${queryParams}`);
            
            // Navigate to result
            navigate('/results', { state: { searchParams: formState, results: response.data } }); 
        } catch (error) {
            console.error('Error fetching search results:', error);
           
        }
    };

    return (
        <div data-aos="fade-right">
            {messages && messages.map((msg, index) => (
                <div key={index} className={`alert alert-${msg.tags}`} role="alert">
                    <b>{msg.text}</b>
                </div>
            ))}

            <h2 className="text-center text-2xl font-semibold mt-20 mb-8 my-2 text-green-500">
                Easy way to get your work done
            </h2>
          
            <section className="mb-8 bg-gray-100 p-6 rounded-lg">
                <div className="container mx-auto mt-5">
                    <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" onSubmit={handleSubmit}>
                        <div className="relative col-span-1">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="service"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={formState.service}
                                onChange={handleChange}
                                placeholder="Job Keyword"
                            />
                        </div>
                        <div className="relative col-span-1">
                            <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <select
                                name="location"
                                value={formState.location}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="">Select Location</option>
                                {locations.map((location) => (
                                    <option key={location.id} value={location.id}>
                                        {location.location}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="relative col-span-1">
                            <FaBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <select
                                name="service"
                                value={formState.service}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="">Select Job Type</option>
                                {jobTypes.map((jobType) => (
                                    <option key={jobType.id} value={jobType.title}>
                                        {jobType.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                     
                        <div className="relative col-span-1">
                            <FaIndustry className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <select
                                name="industry"
                                value={formState.industry}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="">Select Industry</option>
                                {industries.map((industry) => (
                                    <option key={industry.id} value={industry.id}>
                                        {industry.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="col-span-1 lg:col-span-4 text-right mt-4">
                            <button type="submit" className="w-full md:w-auto bg-green-500 text-white px-4 py-2 rounded">
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default JobSearch;
