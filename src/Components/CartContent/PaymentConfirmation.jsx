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
    console.log('Location Object:', location); // Log the entire location object
    console.log('Location Search:', location.search); // Log the query string

    const queryParams = new URLSearchParams(location.search);
    console.log('Query Params:', queryParams); // Log the query params object

    const tx_ref = queryParams.get("tx_ref");
    const status = queryParams.get("status");
    const transaction_id = queryParams.get("transaction_id");

    console.log('Extracted Params:', { tx_ref, status, transaction_id }); // Log extracted params

    if (tx_ref && status && transaction_id) {
      setPaymentInfo({
        tx_ref,
        status,
        transaction_id,
      });
    } else {
      console.error("Missing required fields in the payment confirmation state.");
    }
  }, [location]);

  return (
    <div>
      <h1>Payment {paymentInfo.status === "successful" ? "Successful" : "Failed"}</h1>
      <p><strong>Transaction Reference:</strong> {paymentInfo.tx_ref}</p>
      <p><strong>Transaction ID:</strong> {paymentInfo.transaction_id}</p>
      <p><strong>Status:</strong> {paymentInfo.status}</p>
    </div>
  );
};

export default PaymentConfirmation;