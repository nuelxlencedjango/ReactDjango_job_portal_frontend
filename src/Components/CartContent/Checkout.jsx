import React, { useEffect, useState } from "react";
import api from "../../api";
import Cookies from "js-cookie";

const Checkout = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [totalAmount, setTotalAmount] = useState(100); // Example total amount
  const [purchaseDate] = useState(new Date().toLocaleDateString());

  useEffect(() => {
    // Fetch user details on component mount
    const fetchUserDetails = async () => {
      try {
        const response = await api.get("/employer-details/", {
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        });
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleContinue = () => {
    alert("Proceeding to payment...");
    // Redirect to payment page logic here
  };

  return (
    <div className="checkout-page">
      <h1 className="page-title">Checkout</h1>
      <div className="checkout-container">
        {/* User Details Section */}
        <div className="user-details-section">
          <h2>User Details</h2>
          {userDetails ? (
            <div className="user-details">
              <p><strong>Name:</strong> {userDetails.full_name}</p>
              <p><strong>Email:</strong> {userDetails.email}</p>
              <p><strong>Phone:</strong> {userDetails.phone}</p>
              <p><strong>Address:</strong> {userDetails.address}</p>
            </div>
          ) : (
            <p>Loading user details...</p>
          )}
        </div>

        {/* Summary Section */}
        <div className="summary-section">
          <h2>Summary</h2>
          <p><strong>Purchase Date:</strong> {purchaseDate}</p>
          <p><strong>Total Amount:</strong> ${totalAmount}</p>
          <button className="continue-button" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
