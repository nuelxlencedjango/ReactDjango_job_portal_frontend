import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PaymentConfirmation = () => {
  const location = useLocation();
  const { status, tx_ref, amount, transaction_id } = location.state || {};
  
  console.log("Payment Confirmation - amount:", amount, "txRef:", tx_ref, "status:", status, "transaction_id:", transaction_id);

  if (!status || !tx_ref || !amount || !transaction_id) {
    return <div>Error: Missing payment information</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Payment {status === "success" ? "Successful" : "Failed"}
        </h1>

        <div className="space-y-4">
          <p><strong>Transaction Reference:</strong> {tx_ref}</p>
          <p><strong>Amount:</strong> ₦{parseFloat(amount).toFixed(2)}</p>
          <p><strong>Status:</strong> {status}</p>
          <p><strong>Transaction ID:</strong> {transaction_id}</p>
        </div>

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
