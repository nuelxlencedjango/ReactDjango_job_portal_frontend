import React, { useState } from "react";
import Cookies from "js-cookie"; // Import Cookies library
import api from "../../api";

const PaymentPage = () => {
  const cart_code = Cookies.get("cart_code"); // Retrieve cart_code from cookies
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const initiatePayment = async () => {
    setLoading(true);
    setError("");

    try {
      // Send a POST request to the backend
      const response = await api.post("employer/payment-details/", {
        cart_code, // Send cart_code to the backend
      });

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
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 w-full flex items-center justify-center"
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