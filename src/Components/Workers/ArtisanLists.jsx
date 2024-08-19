{/*
  import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Artisans = () => {
  const { service_title } = useParams();
  const [artisans, setArtisans] = useState([]);

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        const response = await axios.get(`https://i-wanwok-backend.up.railway.app/artisans/artisans-by-service/${service_title}/`);
        setArtisans(response.data);
        console.log("Responses:",response)
      } catch (error) {
        console.error("There was an error fetching the artisans!", error);
      }
    };

    fetchArtisans();
  }, [service_title]);
 
  

  return (
    <div className="container mx-auto px-4 mt-32" data-aos="fade-up">
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
              onClick={() => handleOrder(artisan.id)}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-red-600"
            >
              Order Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};


const handleOrder = (artisanId) => {
 

};

export default Artisans;
  */}

  
  import React, { useEffect, useState } from 'react';
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
    time: '',
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
        console.error("There was an error fetching the artisans!", error);
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
      const response = await axios.post('https://i-wanwok-backend.up.railway.app/order-request/', {
        artisan: selectedArtisan.id,
        service: service_title,
        ...formData,
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      if (response.status === 201) {
        setSelectedArtisan(null);
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('You need to be logged in to place an order.');
        navigate('/login');
      } else {
        console.error("There was an error placing the order!", error);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCloseModal = () => {
    setSelectedArtisan(null);
  };

  return (
    <div className="container mx-auto px-4 mt-32" data-aos="fade-up">
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
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
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
              <input
                type="date"
                name="job_date"
                value={formData.job_date}
                onChange={handleChange}
                className="w-full p-2 mb-2 border rounded-lg"
                required
              />
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Preferred Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
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
                  onClick={handleCloseModal}
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

export default Artisans;
