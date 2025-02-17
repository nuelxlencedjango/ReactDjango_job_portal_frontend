import { useEffect, useState } from "react";
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

export default PaymentConfirmation;