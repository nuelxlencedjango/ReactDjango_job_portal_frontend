import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../api";

const PaymentConfirmation = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");
  const txRef = queryParams.get("tx_ref");
  const amount = queryParams.get("amount");

  const [paymentDetails, setPaymentDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Submit payment details to the backend
  useEffect(() => {
    const submitPaymentDetails = async () => {
      try {
        const response = await api.post("/employer/payment-details/", {
          tx_ref: txRef,
          amount: amount,
          status: status,
        });

        if (response.status === 201) {
          setPaymentDetails(response.data);
        } else {
          console.error("Failed to submit payment details:", response.data);
        }
      } catch (error) {
        console.error("Error submitting payment details:", error.response?.data || error);
      } finally {
        setIsLoading(false);
      }
    };

    submitPaymentDetails();
  }, [txRef, amount, status]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Payment {status === "success" ? "Successful" : "Failed"}
        </h1>

        {paymentDetails && (
          <div className="space-y-4">
            <p><strong>Transaction Reference:</strong> {paymentDetails.tx_ref}</p>
            <p><strong>Amount:</strong> ₦{paymentDetails.amount.toFixed(2)}</p>
            <p><strong>Status:</strong> {paymentDetails.status}</p>
            <p><strong>Date:</strong> {new Date(paymentDetails.created_at).toLocaleString()}</p>
          </div>
        )}

        <div className="mt-6 text-center">
          <a
            href="/"
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-all duration-300"
          >
            Return Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;