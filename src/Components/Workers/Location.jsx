import React, { useState } from 'react';
import axios from 'axios';

const AreaForm = () => {
  const [location, setLocation] = useState('');
  const [area_code, setAreaCode] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    axios.post('/artisans/add_location/', { location,area_code })

      .then(response => {
        setMessage('Location added successfully!');
        setLocation('');
        setAreaCode('');
      })
      .catch(error => {
        setMessage('There was an error adding a location.');
        console.error('There was an error!', error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Add Area Name:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Area Code:</label>
          <input
            type="text"
            id="area_code"
            value={area_code}
            onChange={(e) => setAreaCode(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AreaForm;
