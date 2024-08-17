import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BiTimeFive } from 'react-icons/bi';
import Search from '../SearchDiv/Search.jsx';
import { Link } from 'react-router-dom';

const Jobs = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');  //localStorage

      try {
        const response = await axios.get('https://i-wanwok-backend.up.railway.app', {
          headers: {
            Authorization: `Token ${token}`
          }
        });
        
        // Log the response to the console
        console.log('Response data:', response.data);

        setData(response.data);
      } catch (error) {
        console.error("There was an error fetching the services!", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4">
      {/* job search */}
      <Search />

      {/* job display */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-10">
        {data.map(job => {
          return (
            <div className='' data-aos="fade-up" key={job.id}>
              <div className="group group/item singleJob w-full p-4 bg-white rounded-lg hover:bg-[#E5E7EB;] shadow-lg hover:shadow-2xl transition duration-300">
                <div className="flex justify-between items-center mb-2" data-aos="fade-up">
                  <h1 className="text-lg font-semibold text-gray-800 group-hover:text-white">{job.title}</h1>
                  <span className="flex items-center text-gray-400">
                    <BiTimeFive className="mr-1" />{job.time}
                  </span>
                </div>
                <h6 className="text-gray-600 mb-4">{job.location}</h6>
                <p className="text-sm text-gray-500 border-t pt-2 group-hover:text-white">
                  {job.description}
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <img src={job.img} alt="job logo" className="w-8 h-8 rounded-full" />
                  <span className="text-sm text-gray-700 group-hover:text-white">{job.company}</span>
                </div>
                
                <Link 
                  to={`/artisans/artisans-by-service/${encodeURIComponent(job.id)}`} 
                  className="mt-4 border-2 border-green-500 rounded-lg py-2 px-4 w-full text-center text-gray-800 font-semibold hover:bg-green-500 hover:text-white transition duration-300 block"
                >
                See Workers
                </Link>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Jobs;
