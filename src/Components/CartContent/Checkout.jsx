import React, { useEffect, useState } from "react";
import api from "../../api";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [purchaseDate] = useState(new Date().toLocaleDateString());
  const location = useLocation();
  const totalAmount = location.state?.totalAmount || 0;  // Retrieve total amount from state

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

  const handleCancel = () => {
    alert("Checkout process canceled");
    // Logic for canceling (e.g., redirecting or resetting state)
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center py-10">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="user-details-section bg-gray-50 p-6 rounded-lg shadow-md col-span-1 lg:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">User Details</h2>

            {userDetails ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-600 font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      value={userDetails.full_name}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium mb-1">Email</label>
                    <input
                      type="email"
                      value={userDetails.email}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium mb-1">Phone</label>
                    <input
                      type="text"
                      value={userDetails.phone}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium mb-1">Address</label>
                    <input
                      type="text"
                      value={userDetails.address}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled
                    />
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Loading user details...</p>
            )}
          </div>

          <div className="summary-section bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Summary</h2>
            <div className="space-y-4">
              <p><strong className="font-medium text-gray-600">Purchase Date:</strong> {purchaseDate}</p>
              <hr className="my-2 border-gray-300" />
              <p><strong className="font-medium text-gray-600">Total Amount:</strong> ${totalAmount}</p>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                className="w-1/2 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none transition-all duration-300"
                onClick={handleContinue}
              >
                Continue
              </button>
              <button
                className="w-1/2 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none transition-all duration-300"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
