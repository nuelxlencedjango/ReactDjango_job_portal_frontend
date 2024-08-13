import React, { useState } from 'react';
import axios from 'axios';

const ProfessionForm = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    axios.post('/artisans/add_artisan/', { name })
      .then(response => {
        setMessage('Profession created successfully!');
        setName('');
      })
      .catch(error => {
        setMessage('There was an error creating the profession.');
        console.error('There was an error!', error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Add A Profession:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ProfessionForm;
