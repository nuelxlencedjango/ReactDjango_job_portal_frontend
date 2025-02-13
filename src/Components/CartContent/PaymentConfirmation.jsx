import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../../api";

const PaymentStatusPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract query parameters from the URL
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");
  const tx_ref = queryParams.get("tx_ref");
  const transaction_id = queryParams.get("transaction_id");

  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If any required query param is missing, show error
    if (!status || !tx_ref || !transaction_id) {
      setError("Missing payment parameters.");
      setLoading(false);
      return;
    }

    const confirmPayment = async () => {
      const token = Cookies.get("access_token");
      if (!token) {
        setError("Please log in to confirm payment.");
        setTimeout(() => navigate("/login"), 1000);
        return;
      }

      try {
        const response = await api.get("/employer/payment_confirmation/", {
          params: { status, tx_ref, transaction_id },
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200 && response.data.status === "successful") {
          setPaymentStatus("successful");
        } else {
          setPaymentStatus("failed");
        }
      } catch (error) {
        console.error("Error confirming payment:", error.response?.data || error);
        setError("An error occurred while confirming payment.");
        setPaymentStatus("failed");
      } finally {
        setLoading(false);
      }
    };

    confirmPayment();
  }, [status, tx_ref, transaction_id, navigate]);

  if (loading) {
    return <div className="text-center mt-8">Verifying payment status, please wait...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-8 text-red-500">
        <p>{error}</p>
        <button
          onClick={() => navigate("/cart")}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 mt-4"
        >
          Go to Cart
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg text-center">
        {paymentStatus === "successful" ? (
          <>
            <h1 className="text-2xl font-bold mb-4 text-green-600">Payment Successful!</h1>
            <p className="text-gray-700 mb-4">
              Your payment has been processed successfully. Thank you for your purchase!
            </p>
            <button
              onClick={() => setTimeout(() => navigate("/"), 1000)}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-all duration-300"
            >
              Go to Homepage
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4 text-red-600">Payment Failed</h1>
            <p className="text-gray-700 mb-4">
              Unfortunately, your payment was not successful. Please try again or contact support.
            </p>
            <button
              onClick={() => setTimeout(() => navigate("/cart"), 1000)}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-all duration-300"
            >
              Go to Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentStatusPage;
