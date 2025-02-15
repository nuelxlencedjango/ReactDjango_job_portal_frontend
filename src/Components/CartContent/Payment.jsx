import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api";
import Cookies from "js-cookie";
//import { TailSpin } from "react-loader-spinner"; 
import { ClipLoader } from 'react-spinners'

const PaymentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status"); 
  const txRef = queryParams.get("tx_ref"); 
  const [isLoading, setIsLoading] = useState(true); 
  const [message, setMessage] = useState(""); 

  useEffect(() => {
    const savePaymentDetails = async () => {
      const token = Cookies.get("access_token");
      if (!token) {
        alert("You need to log in to complete this action.");
        navigate("/login");
        return;
      }

      try {
        // Send payment details to backend
        const response = await api.post(
          "/payment-details/",
          {
            tx_ref: txRef,
            status: status === "success" ? "Successful" : "Failed",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201) {
          setMessage(
            status === "success"
              ? "Payment successful! Your cart has been updated."
              : "Payment failed. Please try again."
          );
        } else {
          setMessage("Failed to process payment. Please contact support.");
        }
      } catch (error) {
        setMessage("An error occurred. Please try again.");
        console.error("Error saving payment details:", error);
      } finally {
        setIsLoading(false); // Hide loading spinner
      }
    };

    savePaymentDetails();
  }, [status, txRef, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        {isLoading ? (
          <div className="flex flex-col items-center">
            <ClipLoader color="#3B82F6" height={50} width={50} />
            <p className="mt-4 text-gray-700">Processing payment...</p>
          </div>
        ) : (
          <>
            <h1
              className={`text-2xl font-bold mb-4 ${
                status === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {status === "success" ? "Payment Successful!" : "Payment Failed!"}
            </h1>
            <p className="text-gray-700">{message}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentConfirmation;



