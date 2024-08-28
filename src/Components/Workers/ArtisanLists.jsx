{/*import React, { useEffect, useState } from 'react';
{/*import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Artisans = () => {
  const { service_title } = useParams();
  const [artisans, setArtisans] = useState([]);
  const [selectedArtisan, setSelectedArtisan] = useState(null);
  const [formData, setFormData] = useState({
    description: '',
    address: '',
    area: '',
    job_date: '',
    preferred_time: 'HH:mm',
    contact_person: '',
    phone_number: ''
  });
  const navigate = useNavigate(); 

  useEffect(() => {
    
    const fetchArtisans = async () => {
      try {
        const response = await axios.get(`https://i-wanwok-backend.up.railway.app/artisans/artisans-by-service/${service_title}/`);
        setArtisans(response.data);
      } catch (error) {
        console.error("Error fetching artisans:", error);
      }
    };

    fetchArtisans();
  }, [service_title]);

  const handleOrderClick = (artisan) => {
    setSelectedArtisan(artisan);
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
  

    const employerId = localStorage.getItem('employer_id');
    const accessToken = localStorage.getItem('access_token');
    console.log("access details:", accessToken) 
  
    if (!accessToken) {
      alert('You need to be logged in to place an order.');
      navigate('/login');
      return;
    }
  
    const payload = {
      employer: employerId,
      artisan: selectedArtisan.id,
      service: service_title,
      description: formData.description,
      address: formData.address,
      area: formData.area,
      job_date: formData.job_date,
      preferred_time: formData.preferred_time,
      contact_person: formData.contact_person,
      phone_number: formData.phone_number,
    };
  
    try {
      const response = await axios.post(
        'https://i-wanwok-backend.up.railway.app/employers/order-request/',
        payload,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 201) {
        alert('Order placed successfully!');
        setSelectedArtisan(null);
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('You need to be logged in to place an order.');
        navigate('/login');
      } else {
        console.error('Error placing order:', error);
      }
    }
  };
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container mx-auto px-4 mt-32" data-aos="fade-up">
      <h1 className="text-2xl font-semibold mb-4 artisanlist-heading display-center">Available {service_title} for your service</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 py-10">
        {artisans.map(artisan => (
          <div
            key={artisan.id}
            className="p-4 bg-white rounded-lg shadow-lg flex flex-col items-center"
          >
            {artisan.profile_img ? (
              <img 
                src={artisan.profile_img} 
                alt={`${artisan.user?.first_name}'s profile`} 
                className="w-32 h-32 object-cover rounded-full mb-4" 
              />
            ) : (
              <p>No profile image available</p>
            )}

            <h2 className="text-lg font-semibold">{artisan.user?.first_name} {artisan.user?.last_name}</h2>
            <p>{artisan.experience} years of experience</p>
            <p>{artisan.service?.title}</p>
            <p>Daily Fees: ${artisan.pay}</p>
            <p>Location: {artisan.location?.location}</p>

            <button
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-red-600"
              onClick={() => handleOrderClick(artisan)}
            >
              Order Now
            </button>
          </div>
        ))}
      </div>

      {selectedArtisan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-semibold mb-4">Order Service from {selectedArtisan.user?.first_name} {selectedArtisan.user?.last_name}</h2>
            <form onSubmit={handleOrderSubmit}>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Job Description"
                className="w-full p-2 mb-2 border rounded-lg"
                required
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full p-2 mb-2 border rounded-lg"
                required
              />
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="Area"
                className="w-full p-2 mb-2 border rounded-lg"
                required
              />
              <label htmlFor="preferred_time">Select A Date</label>
              <input
                type="date"
                name="job_date"
                value={formData.job_date}
                onChange={handleChange}
                className="w-full p-2 mb-2 border rounded-lg"
                required
              />
              <label htmlFor="preferred_time">Preferred Time</label>
              <input
                type="time"
                name="preferred_time"
                value={formData.preferred_time}
                onChange={handleChange}
                onFocus={() => formData.preferred_time === 'HH:MM' && setFormData({ ...formData, preferred_time: '' })}
                onBlur={() => formData.preferred_time === '' && setFormData({ ...formData, preferred_time: 'HH:MM' })}
                className="w-full p-2 mb-2 border rounded-lg"
                required
              />
              <input
                type="text"
                name="contact_person"
                value={formData.contact_person}
                onChange={handleChange}
                placeholder="Contact Person"
                className="w-full p-2 mb-2 border rounded-lg"
                required
              />
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full p-2 mb-2 border rounded-lg"
                required
              />
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="mr-4 px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
                  onClick={() => setSelectedArtisan(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-red-600"
                >
                  Submit Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Artisans;*/}

{/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Artisans = () => {
  const { service_title } = useParams();
  const [artisans, setArtisans] = useState([]);
  const [selectedArtisan, setSelectedArtisan] = useState(null);
  const [formData, setFormData] = useState({
    description: '',
    address: '',
    area: '',
    job_date: '',
    preferred_time: 'HH:mm',
    contact_person: '',
    phone_number: ''
  });
  const navigate = useNavigate(); 
  const username = localStorage.getItem('username'); // Retrieve username from localStorage 

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        const response = await axios.get(`https://i-wanwok-backend.up.railway.app/artisans/artisans-by-service/${service_title}/`);
        console.log("API response artisan list:", response.data); // Log the API response for debugging
        setArtisans(Array.isArray(response.data) ? response.data : []); // Ensure artisans is an array
      } catch (error) {
        console.error("Error fetching artisans:", error);
        setArtisans([]); // Default to an empty array on error
      }
    };

    fetchArtisans();
  }, [service_title]);

  const handleOrderClick = (artisan) => {
    setSelectedArtisan(artisan);
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
  
    const employerId = localStorage.getItem('employer_id');
    const accessToken = localStorage.getItem('access_token');
    console.log("access details:", accessToken);
    console.log("username:", employerId, "access token:", accessToken) 
  
    if (!accessToken) {
      alert('You need to be logged in to place an order.');
      navigate('/login');
      return;
    }
  
    try {
      const response = await axios.post(
        `${process.env.VITE_API_URL}/artisans/order/${selectedArtisan.id}/`,
        {
          ...formData,
          artisan: selectedArtisan.id,
          employer: employerId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      alert('Order successfully placed!');
      navigate('/order-history');
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto px-4 mt-32" data-aos="fade-up">
      <h1 className="text-2xl font-semibold mb-4 artisanlist-heading display-center">Available {service_title} for your service</h1>
      {username && <h2 className="text-xl font-medium mb-4">Hi, {username}</h2>} {/* Display username here */}
      {/*<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 py-10">
        {artisans.map(artisan => (
          <div
            key={artisan.id}
            className="p-4 bg-white rounded-lg shadow-lg flex flex-col items-center"
          >
            {artisan.profile_img ? (
              <img 
                src={artisan.profile_img} 
                alt={`${artisan.user?.first_name}'s profile`} 
                className="w-32 h-32 object-cover rounded-full mb-4" 
              />
            ) : (
              <p>No profile image available</p>
            )}

            <h2 className="text-lg font-semibold">{artisan.user?.first_name} {artisan.user?.last_name}</h2>
            <p>{artisan.experience} years of experience</p>
            <p>{artisan.service?.title}</p>
            <p>Daily Fees: ${artisan.pay}</p>
            <p>Location: {artisan.location?.location}</p>

            <button
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-red-600"
              onClick={() => handleOrderClick(artisan)}
            >
              Order Now
            </button>
          </div>
        ))}
      </div>

      {selectedArtisan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-semibold mb-4">Order Service from {selectedArtisan.user?.first_name} {selectedArtisan.user?.last_name}</h2>
            <form onSubmit={handleOrderSubmit}>
              <textarea
                name="description"
                placeholder="Job Description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              ></textarea>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="area"
                placeholder="Area"
                value={formData.area}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              />
              <input
                type="date"
                name="job_date"
                placeholder="Job Date"
                value={formData.job_date}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              />
              <input
                type="time"
                name="preferred_time"
                placeholder="Preferred Time"
                value={formData.preferred_time}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="contact_person"
                placeholder="Contact Person"
                value={formData.contact_person}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="phone_number"
                placeholder="Phone Number"
                value={formData.phone_number}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2"
                  onClick={() => setSelectedArtisan(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-4 rounded-md"
                >
                  Submit Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Artisans;*/}



{/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Artisans = () => {
  const { service_title } = useParams();
  const [artisans, setArtisans] = useState([]);
  const [selectedArtisan, setSelectedArtisan] = useState(null);
  const [formData, setFormData] = useState({
    description: '',
    address: '',
    area: '',
    job_date: '',
    preferred_time: 'HH:mm',
    contact_person: '',
    phone_number: ''
  });
  const navigate = useNavigate(); 
  const username = localStorage.getItem('username'); // Retrieve username from localStorage 

  const employerId = localStorage.getItem('employer_id');
  const accessToken = localStorage.getItem('access_token');
  console.log('employer id:', employerId);
  console.log('access token:',accessToken);
  console.log('username:', username);

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        const response = await axios.get(`https://i-wanwok-backend.up.railway.app/artisans/artisans-by-service/${service_title}/`);
        console.log("API response artisan list:", response.data); // Log the API response for debugging
        setArtisans(Array.isArray(response.data) ? response.data : []); // Ensure artisans is an array
      } catch (error) {
        console.error("Error fetching artisans:", error);
        setArtisans([]); // Default to an empty array on error
      }
    };

    fetchArtisans();
  }, [service_title]);

  const handleOrderClick = (artisan) => {
    setSelectedArtisan(artisan);
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
  
    const employerId = localStorage.getItem('employer_id');
    const accessToken = localStorage.getItem('access_token');
    console.log("access details:", accessToken);
    console.log("username:", employerId, "access token:", accessToken) 
  
    if (!accessToken) {
      alert('You need to be logged in to place an order.');
      navigate('/login');
      return;
    }
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/artisans/order/${selectedArtisan.id}/`,
        {
          ...formData,
          artisan: selectedArtisan.id,
          employer: employerId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      alert('Order successfully placed!');
      navigate('/order-history');
    } catch (error) {
      console.error("Error submitting order:", error);
      alert('There was an error placing your order. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto px-4 mt-32" data-aos="fade-up">
      <h1 className="text-2xl font-semibold mb-4 artisanlist-heading display-center">Available {service_title} for your service</h1>
      {username && <h2 className="text-xl font-medium mb-4">Hi, {username}</h2>} {/* Display username here */}
      {/*<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 py-10">
        {artisans.map(artisan => (
          <div
            key={artisan.id}
            className="p-4 bg-white rounded-lg shadow-lg flex flex-col items-center"
          >
            {artisan.profile_img ? (
              <img 
                src={artisan.profile_img} 
                alt={`${artisan.user?.first_name}'s profile`} 
                className="w-32 h-32 object-cover rounded-full mb-4" 
              />
            ) : (
              <p>No profile image available</p>
            )}

            <h2 className="text-lg font-semibold">{artisan.user?.first_name} {artisan.user?.last_name}</h2>
            <p>{artisan.experience} years of experience</p>
            <p>{artisan.service?.title}</p>
            <p>Daily Fees: ${artisan.pay}</p>
            <p>Location: {artisan.location?.location}</p>
            <button
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-red-600"
              onClick={() => handleOrderClick(artisan)}
            >
              Order Now
            </button>
          </div>
        ))}
      </div>

      {selectedArtisan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-semibold mb-4">Order Service from {selectedArtisan.user?.first_name} {selectedArtisan.user?.last_name}</h2>
            <form onSubmit={handleOrderSubmit}>
              <textarea
                name="description"
                placeholder="Job Description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              ></textarea>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="area"
                placeholder="Area"
                value={formData.area}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              />
              <input
                type="date"
                name="job_date"
                placeholder="Job Date"
                value={formData.job_date}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              />
              <input
                type="time"
                name="preferred_time"
                placeholder="Preferred Time"
                value={formData.preferred_time}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="contact_person"
                placeholder="Contact Person"
                value={formData.contact_person}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="phone_number"
                placeholder="Phone Number"
                value={formData.phone_number}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2"
                  onClick={() => setSelectedArtisan(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-4 rounded-md"
                >
                  Submit Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Artisans;*/}
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ArtisanList() {
    const { service_title } = useParams(); // Fetch service title from URL params
    const [artisans, setArtisans] = useState([]);
    const [selectedArtisan, setSelectedArtisan] = useState(null);
    const [formData, setFormData] = useState({
        description: '',
        address: '',
        area: '',
        job_date: '',
        preferred_time: 'HH:mm',
        contact_person: '',
        phone_number: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArtisans = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/artisans/artisans-by-service/${service_title}/`);
                console.log("API response artisan list:", response.data);
                setArtisans(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error("Error fetching artisans:", error);
                setArtisans([]);
            }
        };

        fetchArtisans();
    }, [service_title]);

    const handleOrderClick = (artisan) => {
        setSelectedArtisan(artisan);
    };

    const handleOrderSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/artisans/order/${selectedArtisan.id}/`,
                {
                    ...formData,
                    artisan: selectedArtisan.id,
                },
                {
                    withCredentials: true 
                }
            );

            alert('Order successfully placed!');
            navigate('/order-history');
        } catch (error) {
            console.error("Error submitting order:", error);
            alert('There was an error placing your order. Please try again.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="container mx-auto px-4 mt-32">
            <h1 className="text-2xl font-semibold mb-4 artisanlist-heading">Available {service_title} for your service</h1>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 py-10">
                {artisans.map(artisan => (
                    <div
                        key={artisan.id}
                        className="p-4 bg-white rounded-lg shadow-lg flex flex-col items-center"
                    >
                        {artisan.profile_img ? (
                            <img 
                                src={artisan.profile_img} 
                                alt={`${artisan.user?.first_name}'s profile`} 
                                className="w-32 h-32 object-cover rounded-full mb-4" 
                            />
                        ) : (
                            <p>No profile image available</p>
                        )}

                        <h2 className="text-lg font-semibold">{artisan.user?.first_name} {artisan.user?.last_name}</h2>
                        <p>{artisan.experience} years of experience</p>
                        <p>{artisan.service?.title}</p>
                        <p>Daily Fees: ${artisan.pay}</p>
                        <p>Location: {artisan.location?.location}</p>
                        <button
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-red-600"
                            onClick={() => handleOrderClick(artisan)}
                        >
                            Order Now
                        </button>
                    </div>
                ))}
            </div>

            {selectedArtisan && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                        <h2 className="text-2xl font-semibold mb-4">Order Service from {selectedArtisan.user?.first_name} {selectedArtisan.user?.last_name}</h2>
                        <form onSubmit={handleOrderSubmit}>
                            <textarea
                                name="description"
                                placeholder="Job Description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                            ></textarea>
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                            />
                            <input
                                type="text"
                                name="area"
                                placeholder="Area"
                                value={formData.area}
                                onChange={handleInputChange}
                                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                            />
                            <input
                                type="date"
                                name="job_date"
                                placeholder="Job Date"
                                value={formData.job_date}
                                onChange={handleInputChange}
                                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                            />
                            <input
                                type="time"
                                name="preferred_time"
                                placeholder="Preferred Time"
                                value={formData.preferred_time}
                                onChange={handleInputChange}
                                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                            />
                            <input
                                type="text"
                                name="contact_person"
                                placeholder="Contact Person"
                                value={formData.contact_person}
                                onChange={handleInputChange}
                                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                            />
                            <input
                                type="text"
                                name="phone_number"
                                placeholder="Phone Number"
                                value={formData.phone_number}
                                onChange={handleInputChange}
                                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                            />
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2"
                                    onClick={() => setSelectedArtisan(null)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white py-2 px-4 rounded-md"
                                >
                                    Submit Order
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ArtisanList;




