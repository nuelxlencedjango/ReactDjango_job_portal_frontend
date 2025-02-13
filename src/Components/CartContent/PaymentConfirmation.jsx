import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../../api"; 

const PaymentStatusPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  //  query parameters from the URL
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status"); 
  const tx_ref = queryParams.get("tx_ref"); 
  const transaction_id = queryParams.get("transaction_id"); 

  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch payment confirmation from the backend
  useEffect(() => {
    const confirmPayment = async () => {
      const token = Cookies.get("access_token");
      if (!token) {
        alert("Please log in to confirm payment.");
        navigate("/login");
        return;
      }

      try {
        const response = await api.get("https://i-wanwok-backend.up.railway.app/employer/payment_confirmation/", {
          params: {
            status: status,
            tx_ref: tx_ref,
            transaction_id: transaction_id,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
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
    return <div className="text-center mt-8">Loading payment status...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
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
              onClick={() => navigate("/")}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-all duration-300"
            >
              Go to Homepage
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4 text-red-600">Payment Failed</h1>
            <p className="text-gray-700 mb-4">
              Unfortunately, your payment was not successful. Please try again.
            </p>
            <button
              onClick={() => navigate("/cart")}
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






