


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const Artisans = () => {
  const { service_title } = useParams();
  const [artisans, setArtisans] = useState([]);
  
  const [employerUsername, setEmployerUsername] = useState('');
 

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        const response = await axios.get(
          `https://i-wanwok-backend.up.railway.app/artisans/artisans-by-service/${service_title}/`
        );
        setArtisans(response.data);
      } catch (error) {
        console.error("Error fetching artisans:", error);
      }
    };

    fetchArtisans();
  }, [service_title]);

  useEffect(() => {
    const fetchEmployerUsername = async () => {
      const employerId = Cookies.get('employer_id');

      if (employerId) {
        try {
          const response = await axios.get(
            `https://i-wanwok-backend.up.railway.app/employers/${employerId}/`
          );
          setEmployerUsername(response.data.username);
        } catch (error) {
          console.error("Error fetching employer username:", error);
        }
      }
    };

    fetchEmployerUsername();
  }, []);


 

  return (
    <div className="container mx-auto px-4 mt-32" data-aos="fade-up">
      <h1 className="text-2xl font-semibold mb-4 artisanlist-heading display-center">
        Available {service_title} for your service
      </h1>
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
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-300 mb-4"></div>
            )}
            <h2 className="text-lg font-semibold mb-2">
              {artisan.user?.first_name} {artisan.user?.last_name}
            </h2>
            <Link
              
              className="mt-auto bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Order Service
            </Link>
          </div>
        ))}
      </div>


    </div>
  );
};

export default Artisans;
