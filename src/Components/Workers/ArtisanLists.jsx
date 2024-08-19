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
import { useParams, useHistory } from 'react-router-dom';

const Artisans = () => {
  const { service_title } = useParams();
  const [artisans, setArtisans] = useState([]);
  const history = useHistory();

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
        location: 'Specify location here', // You can update this field based on user input
        phone: 'Specify phone number here', // You can update this field based on user input
        pay: 100, // Replace this with the actual payment value or calculate it
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Ensure the user is authenticated
        },
      });

      if (response.status === 201) {
        history.push('/dashboard'); // Redirect to dashboard upon successful order
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('You need to be logged in to place an order.');
        history.push('/login'); // Redirect to login if not authenticated
      } else {
        console.error("There was an error placing the order!", error);
      }
    }
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

export default Artisans;
