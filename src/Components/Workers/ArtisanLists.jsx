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
        
        // Fetch additional details for each artisan
        const artisansWithDetails = await Promise.all(
          response.data.map(async (artisan) => {
            const locationResponse = await axios.get(`https://i-wanwok-backend.up.railway.app/locations/${artisan.location}/`);
            const serviceResponse = await axios.get(`https://i-wanwok-backend.up.railway.app/services/${artisan.service}/`);
            
            return {
              ...artisan,
              location: locationResponse.data,
              service: serviceResponse.data,
            };
          })
        );

        setArtisans(artisansWithDetails);
        console.log("Responses:", artisansWithDetails);
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
            <p>Fees: ${artisan.fees}</p>
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
  // handle order
};

export default Artisans;










