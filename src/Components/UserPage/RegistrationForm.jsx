// src/components/RegistrationForm.jsx
{/*import React, { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

const RegistrationForm = ({ userType }) => {
  const navigate = useNavigate();
  
  // State to hold form data
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    user_type: userType,
    profile_image: null, // file for profile image
    fingerprint_image: null, // file for fingerprint image (Artisan only)
    experience: "",
    job_type: "",
    industry: "",
    pay: "",
    company_name: "",
    company_address: "",
    department: "",
    location: "",
    nin: "",
  });

  // State for error messages
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== undefined && formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await api.post(`${userType}/register/`, data, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });
      console.log(response.data); // Handle success (redirect or show success message)
      navigate("/success"); // Redirect to success page
    } catch (err) {
      setError("Failed to register. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="registration-form">
      <h2>Register as {userType.charAt(0).toUpperCase() + userType.slice(1)}</h2>
      
      {error && <p className="error">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            required
          />
        </label>

        {/* Conditionally render fields based on user type */}
       {/*{userType === "artisan" && (
          <>
            <label>
              Experience:
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Job Type:
              <input
                type="text"
                name="job_type"
                value={formData.job_type}
                onChange={handleChange}
              />
            </label>
            <label>
              Industry:
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
              />
            </label>
            <label>
              Pay:
              <input
                type="number"
                name="pay"
                value={formData.pay}
                onChange={handleChange}
              />
            </label>
            <label>
              NIN:
              <input
                type="text"
                name="nin"
                value={formData.nin}
                onChange={handleChange}
                required
              />
            </label>
          </>
        )}

        {userType === "employer" && (
          <>
            <label>
              Company Name:
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
              />
            </label>
            <label>
              Company Address:
              <input
                type="text"
                name="company_address"
                value={formData.company_address}
                onChange={handleChange}
              />
            </label>
          </>
        )}

        {userType === "manager" && (
          <label>
            Department:
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
          </label>
        )}

        {/* File upload for profile image */}
        {/*<label>
          Profile Image:
          <input
            type="file"
            name="profile_image"
            onChange={handleChange}
          />
        </label>

        {userType === "artisan" && (
          <label>
            Fingerprint Image:
            <input
              type="file"
              name="fingerprint_image"
              onChange={handleChange}
            />
          </label>
        )}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;*/}



// src/components/RegistrationForm.jsx
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

const RegistrationForm = ({ userType }) => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    profile_image: null,
    fingerprint_image: null,
    experience: "",
    job_type: "",
    industry: "",
    pay: "",
    company_name: "",
    company_address: "",
    department: "",
    nin: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    // Create FormData to send files and other data
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== undefined && formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await registerUser(userType, data);
      setSuccess(response.message);
      navigate("/success"); // Redirect after successful registration
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="registration-form">
      <h2>Register as {userType.charAt(0).toUpperCase() + userType.slice(1)}</h2>
      
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form onSubmit={handleSubmit}>
        <label>Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </label>
        <label>Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        <label>Confirm Password:
          <input type="password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} required />
        </label>

        {userType === "artisan" && (
          <>
            <label>Experience:
              <input type="number" name="experience" value={formData.experience} onChange={handleChange} required />
            </label>
            <label>Job Type:
              <input type="text" name="job_type" value={formData.job_type} onChange={handleChange} />
            </label>
            <label>Industry:
              <input type="text" name="industry" value={formData.industry} onChange={handleChange} />
            </label>
            <label>Pay:
              <input type="number" name="pay" value={formData.pay} onChange={handleChange} />
            </label>
            <label>NIN:
              <input type="text" name="nin" value={formData.nin} onChange={handleChange} required />
            </label>
          </>
        )}

        {userType === "employer" && (
          <>
            <label>Company Name:
              <input type="text" name="company_name" value={formData.company_name} onChange={handleChange} required />
            </label>
            <label>Company Address:
              <input type="text" name="company_address" value={formData.company_address} onChange={handleChange} required />
            </label>
          </>
        )}

        {userType === "manager" && (
          <label>Department:
            <input type="text" name="department" value={formData.department} onChange={handleChange} required />
          </label>
        )}

        <label>Profile Image:
          <input type="file" name="profile_image" onChange={handleChange} />
        </label>
        <label>Fingerprint Image:
          <input type="file" name="fingerprint_image" onChange={handleChange} />
        </label>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
