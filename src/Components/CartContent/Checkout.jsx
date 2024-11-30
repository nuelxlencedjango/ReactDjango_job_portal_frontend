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
        const response = await api.get("employers/employer-details/", {
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
    <div className="min-h-screen bg-gray-50 flex justify-center items-center py-10">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Checkout</h1>
        
        {/* Checkout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* User Details Section */}
          <div className="user-details-section bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">User Details</h2>
            {userDetails ? (
              <div className="space-y-4">
                <p><strong className="font-medium text-gray-600">Name:</strong> {userDetails.full_name}</p>
                <p><strong className="font-medium text-gray-600">Email:</strong> {userDetails.email}</p>
                <p><strong className="font-medium text-gray-600">Phone:</strong> {userDetails.phone}</p>
                <p><strong className="font-medium text-gray-600">Address:</strong> {userDetails.address}</p>
              </div>
            ) : (
              <p className="text-gray-500">Loading user details...</p>
            )}
          </div>

          {/* Summary Section */}
          <div className="summary-section bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Summary</h2>
            <div className="space-y-4">
              <p><strong className="font-medium text-gray-600">Purchase Date:</strong> {purchaseDate}</p>
              <p><strong className="font-medium text-gray-600">Total Amount:</strong> ${totalAmount}</p>
            </div>
            <button
              className="mt-6 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none transition-all duration-300"
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
