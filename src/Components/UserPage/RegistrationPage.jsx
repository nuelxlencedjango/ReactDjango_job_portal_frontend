// src/pages/RegistrationPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";

const RegistrationPage = () => {
  const { userType } = useParams(); // Get userType from URL params

  return (
    <div className="registration-page">
      <h1>Register as {userType.charAt(0).toUpperCase() + userType.slice(1)}</h1>
      <RegistrationForm userType={userType} />
    </div>
  );
};

export default RegistrationPage;
