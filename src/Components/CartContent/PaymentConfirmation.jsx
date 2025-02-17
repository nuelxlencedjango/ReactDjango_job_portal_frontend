{/*import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PaymentConfirmation = () => {
  const location = useLocation();
  const [paymentInfo, setPaymentInfo] = useState({
    tx_ref: "",
    status: "",
    transaction_id: "",
  });

  useEffect(() => {
    // Extract query parameters from URL
    const queryParams = new URLSearchParams(location.search);
    const tx_ref = queryParams.get("tx_ref");
    const status = queryParams.get("status");
    const transaction_id = queryParams.get("transaction_id");

    // Ensure all required parameters are present
    if (tx_ref && status && transaction_id) {
      setPaymentInfo({ tx_ref, status, transaction_id });
    } else {
      console.error("Missing required fields in the payment confirmation state.");
    }
  }, [location]);

  return (
    <div className="payment-confirmation">
      <h1 className="payment-status">
        Payment {paymentInfo.status === "successful" ? "Successful" : "Failed"}
      </h1>
      <div className="payment-details">
        <p>
          <strong>Transaction Reference:</strong> {paymentInfo.tx_ref}
        </p>
        <p>
          <strong>Transaction ID:</strong> {paymentInfo.transaction_id}
        </p>
        <p>
          <strong>Status:</strong> {paymentInfo.status}
        </p>
      </div>
    </div>
  );
};

export default PaymentConfirmation;*/}


import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PaymentConfirmation = () => {
  const location = useLocation();
  const [paymentInfo, setPaymentInfo] = useState({
    tx_ref: "",
    status: "",
    transaction_id: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    console.log('Query Params:', queryParams);

    const tx_ref = queryParams.get("tx_ref");
    const status = queryParams.get("status");
    const transaction_id = queryParams.get("transaction_id");

    console.log('Extracted Params:', { tx_ref, status, transaction_id });

    if (tx_ref && status && transaction_id) {
      setPaymentInfo({
        tx_ref,
        status,
        transaction_id,
      });
    } else {
      console.error("Missing required fields in the payment confirmation state.");
    }
    setLoading(false);
  }, [location]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-700">Loading payment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-6">
          Payment {paymentInfo.status === "successful" ? "Successful" : "Failed"}
        </h1>
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
            <p
              className={`text-lg font-semibold ${
                paymentInfo.status === "successful" ? "text-green-600" : "text-red-600"
              }`}
            >
              {paymentInfo.status}
            </p>
          </div>
        </div>
        <button
          onClick={() => window.location.href = "/"}
          className="mt-8 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentConfirmation;