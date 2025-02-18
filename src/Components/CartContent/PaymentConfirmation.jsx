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
      console.log("Query Params:", { tx_ref, status, transaction_id });
    
      const response = await api.post(
        `employer/payment_confirmation/?tx_ref=${tx_ref}&status=${status}&transaction_id=${transaction_id}`,
        {}, // Empty body (since parameters are in the URL)
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    
      console.log("Backend Response:", response.data);
    
      // Check if the message contains "Payment Successful"
      if (response.data.message && response.data.message.includes("Payment Successful")) {
        setSuccess(true); 
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
          </>
        )}
        {!success && (
          <div className="space-y-4 text-left">
            <p className="text-sm text-gray-600">Transaction Reference</p>
            <p className="text-lg font-semibold text-gray-800">{paymentInfo.tx_ref}</p>
            <p className="text-sm text-gray-600">Transaction ID</p>
            <p className="text-lg font-semibold text-gray-800">{paymentInfo.transaction_id}</p>
            <p className="text-lg font-semibold text-red-600">Payment Failed</p>
          </div>
        )}

        {/* Links with reduced size */}
        <div className="mt-6 flex justify-between space-x-2">
          <Link
            to="/request-service" // Replace with your route
            className="w-full sm:w-auto bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 text-center text-sm"
          >
            Request Another Service
          </Link>
          <Link
            to={`/transaction-details/${paymentInfo.transaction_id}`} // Replace with your route
            className="w-full sm:w-auto bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300 text-center text-sm"
          >
            See Transaction Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
