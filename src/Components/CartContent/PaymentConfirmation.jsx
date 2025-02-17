import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../api";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const PaymentConfirmation = () => {
  const location = useLocation();
  const [paymentInfo, setPaymentInfo] = useState({
    tx_ref: "",
    status: "",
    transaction_id: "",
  });
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  const [success, setSuccess] = useState(false); // Success state

  const token = Cookies.get("access_token");

  useEffect(() => {
    // Extract query parameters from URL
    const queryParams = new URLSearchParams(location.search);
    const tx_ref = queryParams.get("tx_ref");
    const status = queryParams.get("status");
    const transaction_id = queryParams.get("transaction_id");

    console.log("Extracted Params:", { tx_ref, status, transaction_id });

    // Ensure all required parameters are present
    if (tx_ref && status && transaction_id) {
      setPaymentInfo({ tx_ref, status, transaction_id });

      // Send payment details to the backend for verification
      verifyPayment(tx_ref, status, transaction_id);
    } else {
      console.error("Missing required fields in the payment confirmation state.");
      setError("Missing required payment details.");
      setLoading(false);
    }
  }, [location]);

  const verifyPayment = async (tx_ref, status, transaction_id) => {
    try {
      console.log("Sending payment details to backend...");
      const response = await api.post(
        "employer/payment_confirmation/", 
        {
          tx_ref,
          status,
          transaction_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Backend Response:", response.data);

      if (response.data.message === "Payment Successful") {
        setSuccess(true); // Mark payment as successful
      } else {
        setError("Payment verification failed.");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      setError("An error occurred while verifying the payment.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-700">Verifying payment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-6">
          Payment {success ? "Successful" : "Failed"}
        </h1>
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        {success && (
          <>
            <div className="space-y-4 text-left">
              <div>
                <p className="text-sm text-gray-600">Transaction Reference</p>
                <p className="text-lg font-semibold text-gray-800">{paymentInfo.tx_ref}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Transaction ID</p>
                <p className="text-lg font-semibold text-gray-800">{paymentInfo.transaction_id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="text-lg font-semibold text-green-600">Successful</p>
              </div>
            </div>
            <div className="mt-8 space-y-4">
              <Link
                to="/request-service" // Replace with your route
                className="block w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 text-center"
              >
                Request Another Service
              </Link>
              <Link
                to={`/transaction-details/${paymentInfo.transaction_id}`} // Replace with your route
                className="block w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition duration-300 text-center"
              >
                See Transaction Details
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentConfirmation;