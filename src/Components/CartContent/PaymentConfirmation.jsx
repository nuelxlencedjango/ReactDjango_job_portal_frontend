import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const PaymentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Initialize state from localStorage if available
  const [paymentInfo, setPaymentInfo] = useState(() => {
    const saved = localStorage.getItem('paymentConfirmation');
    return saved ? JSON.parse(saved) : {
      tx_ref: "",
      status: "",
      transaction_id: "",
      confirmed: false,
      verified: false
    };
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(() => {
    return localStorage.getItem('paymentSuccess') === 'true';
  });

  const token = Cookies.get("access_token");

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('paymentConfirmation', JSON.stringify(paymentInfo));
    localStorage.setItem('paymentSuccess', success.toString());
  }, [paymentInfo, success]);

  const verifyPayment = async (tx_ref, status, transaction_id) => {
    try {
      const response = await api.post(
        'employer/payment_confirmation/',
        { 
          tx_ref,
          status,
          transaction_id 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message && response.data.message.includes("Payment Successful")) {
        setSuccess(true);
        setPaymentInfo(prev => ({ 
          ...prev, 
          confirmed: true,
          verified: true
        }));
      } else {
        setError(response.data.message || "Payment verification failed.");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      setError(error.response?.data?.message || "An error occurred while verifying the payment.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkPaymentStatus = async () => {
      // If payment is already verified, skip processing
      if (paymentInfo.verified) {
        setLoading(false);
        return;
      }

      // First try to get params from URL
      const queryParams = new URLSearchParams(location.search);
      const tx_ref = queryParams.get("tx_ref");
      const status = queryParams.get("status");
      const transaction_id = queryParams.get("transaction_id");

      if (tx_ref && status && transaction_id) {
        // Update state with new params and verify
        setPaymentInfo({ 
          tx_ref, 
          status, 
          transaction_id,
          confirmed: false,
          verified: false
        });
        await verifyPayment(tx_ref, status, transaction_id);
      } else if (paymentInfo.tx_ref && !success) {
        // If no URL params but have stored payment info, try to verify
        await verifyPayment(
          paymentInfo.tx_ref,
          paymentInfo.status,
          paymentInfo.transaction_id
        );
      } else {
        setError("Missing required payment details.");
        setLoading(false);
      }
    };

    checkPaymentStatus();
  }, [location]);

  const handleDashboardVisit = () => {
    // Clear payment confirmation from localStorage
    localStorage.removeItem('paymentConfirmation');
    localStorage.removeItem('paymentSuccess');
    navigate('/employer-dashboard');
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

        <div className="space-y-4 text-left">
          <div>
            <p className="text-sm text-gray-600">Transaction Reference</p>
            <p className="text-lg font-semibold text-gray-800">
              {paymentInfo.tx_ref || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Transaction ID</p>
            <p className="text-lg font-semibold text-gray-800">
              {paymentInfo.transaction_id || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <p className={`text-lg font-semibold ${
              success ? "text-green-600" : "text-red-600"
            }`}>
              {success ? "Successful" : "Failed"}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row justify-between gap-2">
          <Link
            to="/"
            className="w-full sm:w-auto bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 text-center text-sm"
          >
            Request Another Service
          </Link>
          <button
            onClick={handleDashboardVisit}
            className="w-full sm:w-auto bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300 text-center text-sm"
          >
            See Transaction Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;