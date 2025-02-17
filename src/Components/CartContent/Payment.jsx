




import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; 
import api from "../../api";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve state passed from the Cart component
  const { totalAmount, first_name, last_name, email } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const initiatePayment = async () => {
    setLoading(true);
    setError("");

    const cartCode = Cookies.get("cart_code");
      // Retrieve the access token from cookies
      const token = Cookies.get("access_token");
      console.log('access token:', token)

    if (!cartCode) {
        setError("No Cart code missing. Please try again.");
        setLoading(false);
        navigate("/cart"); 
        return;
      }

    console.log("cart code:", cartCode);

  
    // Check if the access token is present
    if (!token) {
      setError("You are not authenticated. Please log in.");
      setLoading(false);
      navigate("/login"); 
      return;
    }

    console.log("cart code",Cookies.get("cart_code"))
   
    console.log("Headers:", {
      Authorization: `Bearer ${token}`,
    });


    try {
      
      // Send a POST request to the backend with the access token
      const response = await api.post(
        "https://i-wanwok-backend.up.railway.app/employer/payment-details/", 
        {
          cart_code: Cookies.get("cart_code"), 
          totalAmount,
          
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        
      );

      // Check if the response contains the Flutterwave payment link
      if (response.data && response.data.data && response.data.data.link) {
        // Redirect the user to the Flutterwave payment page
        window.location.href = response.data.data.link;
      } else {
        setError("Failed to initiate payment. Please try again.");
      }

    } catch (err) {
      setError(
        err.response?.data?.error ||
          "An error occurred while initiating the payment."
      );
      console.error("Payment error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg text-center">
        <h1 className="text-2xl font-bold mb-6">Complete Your Payment</h1>

        {/* Display user details */}
        <div className="mb-6 text-left">
          <p className="text-gray-700">
            <strong>Name:</strong> {first_name} {last_name}
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> {email}
          </p>
          <p className="text-gray-700">
            <strong>Total Amount:</strong> ₦{totalAmount?.toFixed(2)}
          </p>
        </div>

        {/* Display error message */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Pay Now button */}
        <button
          onClick={initiatePayment}
          disabled={loading}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 w-full flex items-center justify-center"
        >
          {loading ? (
            <>
              {/* Loading spinner */}
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            "Pay Now"
          )}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;


