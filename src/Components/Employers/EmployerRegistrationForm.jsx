
import React, { useState } from 'react';
import axios from 'axios';
import { FaUser } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useNavigate, Link } from "react-router-dom";
import { BsPersonCheckFill } from "react-icons/bs";
import { IoPersonCircle } from "react-icons/io5";


const InputField = ({ label, type, name, value, onChange, error }) => {
  return (
    <div className="relative">
      {label === "Username" && <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
      {label === "First Name" && <IoPersonCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
      {label === "Last Name" && <BsPersonCheckFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
      {label === "Email" && <MdOutlineEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
      {label === "Password" && <RiLockPasswordFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
     {label === "Confirm Password" && <RiLockPasswordFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />} 
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        className={`w-full pl-10 pr-4 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};



const BasicDetailsForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password2: '',  
    user_type: 'employer',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNext = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.first_name) newErrors.first_name = "First Name is required";
    if (!formData.last_name) newErrors.last_name = "Last Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.password2)  
      newErrors.password2 = "Passwords do not match";  
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    try {
      // Send a single POST request to register the user and create the artisan profile 
      const response = await axios.post(
        "https://api.i-wan-wok.com/acct/registration/", 
        formData,
        {
          headers: {
            "Content-Type": "application/json", // or 'multipart/form-data' if you have file uploads
          },
        }
      );

      console.log("Response:", response.data);

      if (response.status === 201) {
        alert("User registration and artisan profile creation was successful.");
        navigate(`/employer-details/${response.data.id}/${response.data.username}`);
      } else { 
        throw new Error("Unexpected response status from registration.");
      }
    } catch (error) {
      console.error("API Error:", error.response || error);
      if (error.response) {
        const backendErrors = error.response.data.username || error.response.data.email || error.response.data.first_name || error.response.data.last_name || error.response.data.errors || error.response.data.error;
        setErrors({
          general: backendErrors || "Failed to register user. Please try again."
        });
      } else {
        setErrors({
          general: "Network error. Please try again."
        });
      }
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-0" data-aos="fade-right">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md relative mb-10">
        <h1 className="text-1xl font-bold text-gray-800 text-center mb-6">Sign Up For Employers - Step 1</h1>
        {errors.general && (
          <div className="mb-4 text-red-500 text-md text-center">
            {errors.general}
          </div>
        )}
        {loading && (
          <div className="absolute inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center z-10">
    
       <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-gray-500" 
       role="status"> <span className="sr-only">Loading...</span>
        </div>  
        </div>
     )}

               <div className='bg-gray-200 p-4 rounded-md'>
                <form onSubmit={handleNext} className="space-y-6">
                    <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <InputField
        label="Username"
        type="text"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
        error={errors.username}
      />
                    </div>
                    <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <InputField
        label="First Name"
        type="text"
        name="first_name"
        value={formData.first_name}
        onChange={handleInputChange}
        error={errors.first_name}
      />
                    </div>
                    <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
       
       <InputField
        label="Last Name"
        type="text"
        name="last_name"
        value={formData.last_name}
        onChange={handleInputChange}
        error={errors.last_name}
      />
                    </div>
                    <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <InputField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email}
      />
                    </div>
                    <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <InputField
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        error={errors.password}
      />
                    </div>

                    <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <InputField
        label="Confirm Password" 
        type="password"
        name="password2" 
        value={formData.password2}
        onChange={handleInputChange}
        error={errors.password2} 
      />
                    </div>
              
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Next"}
                    </button>
                </form>
                {Object.keys(errors).length > 0 && (
    <div className="mb-4 text-red-500 text-md text-center">
      {Object.keys(errors).map((key) => (
        <p key={key}>{errors[key]}</p>))}
    </div>)}
      <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
              Already have an account?{" "}
                  <Link to="/login" className="text-green-500 hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
  </div>
</div>

);
};

export default BasicDetailsForm;



