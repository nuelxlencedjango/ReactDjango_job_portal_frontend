import React, { useEffect, useState } from "react";
import { useLocation,Link } from "react-router-dom";

import api from "../../api";

const PaymentConfirmation = () => {
  const location = useLocation();
  const { state } = location;
  const { status, tx_ref, amount, transaction_id } = state || {};

  console.log('Location State:', state); // Debug location.state

  const [paymentDetails, setPaymentDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Submit payment details to the backend
  useEffect(() => {
    const submitPaymentDetails = async () => {
      try {
        const response = await api.post("/employer/payment-details/", {
          tx_ref: tx_ref,
          amount: parseFloat(amount), // Ensure amount is a number
          status: status,
          transaction_id: transaction_id, // Include transaction_id
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

    if (tx_ref && amount && status && transaction_id) {
      submitPaymentDetails();
    } else {
      console.error("Missing required fields in state:", { tx_ref, amount, status, transaction_id });
      setIsLoading(false);
    }
  }, [tx_ref, amount, status, transaction_id]);

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
            <p><strong>Transaction ID:</strong> {paymentDetails.transaction_id}</p>
            <p><strong>Amount:</strong> ₦{paymentDetails.amount.toFixed(2)}</p>
            <p><strong>Status:</strong> {paymentDetails.status}</p>
            <p><strong>Date:</strong> {new Date(paymentDetails.created_at).toLocaleString()}</p>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-all duration-300"
          >
            view order details
          </Link>
          <Link
            to="/"
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-all duration-300"
          >
            request another service
          </Link>

        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;