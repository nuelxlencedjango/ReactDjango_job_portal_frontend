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
  import { useParams, useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory
  
  const Artisans = () => {
    const { service_title } = useParams();
    const [artisans, setArtisans] = useState([]);
    const [formData, setFormData] = useState({
      description: '',
      address: '',
      area: '',
      job_date: '',
      time: '',
      contact_person: '',
      phone_number: ''
    });
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
  
    useEffect(() => {
      const fetchArtisans = async () => {
        try {
          const response = await axios.get(`https://i-wanwok-backend.up.railway.app/artisans/artisans-by-service/${service_title}/`);
          setArtisans(response.data);
          console.log("Responses:", response);
        } catch (error) {
          console.error("There was an error fetching the artisans!", error);
        }
      };
  
      fetchArtisans();
    }, [service_title]);
  
    const handleOrder = async (artisanId) => {
      try {
        const response = await axios.post('https://i-wanwok-backend.up.railway.app/order-request/', {
          artisan: artisanId,
          service: service_title,
          ...formData,
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Ensure the user is authenticated
          },
        });
  
        if (response.status === 201) {
          navigate('/dashboard'); // Use navigate instead of history.push
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert('You need to be logged in to place an order.');
          navigate('/login'); // Use navigate instead of history.push
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
  
              {/* Form Fields for Order Details */}
              <form onSubmit={(e) => { e.preventDefault(); handleOrder(artisan.id); }}>
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
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
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
                <button
                  type="submit"
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-red-600"
                >
                  Order Now
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Artisans;
  