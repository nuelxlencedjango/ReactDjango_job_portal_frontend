
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { totalAmount = 0, first_name = "", last_name = "", email = "", phone_number = "" } = location.state || {};
  const [txRef, setTxRef] = useState("");

  // Generate a unique transaction reference
  useEffect(() => {
    setTxRef("iwanwok_" + Math.floor(Math.random() * 1000000000 + 1));
  }, []);

  // Handle Flutterwave payment
  const handleFlutterPayment = useFlutterwave({
    public_key: "FLWPUBK_TEST-6941e4117be9902646d54ec0509e804c-X", // Replace with your public key
    tx_ref: txRef,
    amount: totalAmount, 
    currency: "NGN",
    redirect_url: "https://react-django-job-portal-frontend.vercel.app/payment-confirmation/", // Redirect to frontend page
    customer: { email, phone_number, name: `${first_name} ${last_name}` },
    customizations: { title: "Iwan_wok", description: "Payment for the services requested" },
    callback: (response) => {
      closePaymentModal();
      if (response.status === "successful") {
        console.log('Flutterwave response:', response);
        console.log('Total Amount:', totalAmount); 
        navigate(`/payment-confirmation`, {
          state: {
            status: "success",
            tx_ref: txRef,
            amount: totalAmount, 
            transaction_id: response.transaction_id,
          },
        });
      } else {
        navigate(`/payment-confirmation`, {
          state: {
            status: "failed",
            tx_ref: txRef,
            amount: totalAmount, // Pass totalAmount here
            transaction_id: response.transaction_id,
          },
        });
      }
    },
    onClose: () => alert("Payment closed!"),
  });
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Total Amount: ₦{totalAmount.toFixed(2)} 
        </h1>

        <button
          onClick={handleFlutterPayment}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-all duration-300 w-full"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;