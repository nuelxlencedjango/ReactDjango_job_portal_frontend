import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import Cookies from "js-cookie";
import api from "../../api";
import "./PaymentPage.css"; // Custom CSS for styling

const PaymentPage = () => {
  const { handleSubmit } = useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const { totalAmount = 0, first_name = "", last_name = "", email = "", phone_number = "" } = location.state || {};
  const [txRef, setTxRef] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Generate a unique transaction reference
  useEffect(() => {
    setTxRef("iwanwok_" + Math.floor(Math.random() * 1000000000 + 1));
  }, []);

  // Save payment information to the backend
  const savePaymentInformation = async (status = "Pending") => {
    const token = Cookies.get("access_token");
    if (!token) {
      alert("You need to log in to complete this action.");
      navigate("/login");
      return false;
    }

    try {
      const response = await api.post(
        "/api/payment-details/",
        { tx_ref: txRef, amount: totalAmount, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        console.log("Payment information saved:", response.data);
        return true;
      } else {
        console.error("Failed to save payment information:", response.data);
        return false;
      }
    } catch (error) {
      console.error("Error saving payment information:", error.response?.data || error);
      return false;
    }
  };

  // Handle Flutterwave payment
  const handleFlutterPayment = useFlutterwave({
    public_key: "FLWPUBK_TEST-6941e4117be9902646d54ec0509e804c-X", // Replace with your public key
    tx_ref: txRef,
    amount: totalAmount,
    currency: "NGN",
    redirect_url: "https://i-wanwok-backend.up.railway.app/employer/payment-details", // Backend callback URL
    customer: { email, phone_number, name: `${first_name} ${last_name}` },
    customizations: { title: "Iwan_wok", description: "Payment for the services requested" },
    callback: async (response) => {
      closePaymentModal();
      setIsLoading(true);

      if (response.status === "successful") {
        await savePaymentInformation("Successful");
        navigate(`/payment-confirmation?status=success&tx_ref=${txRef}`);
      } else {
        await savePaymentInformation("Failed");
        navigate(`/payment-confirmation?status=failed&tx_ref=${txRef}`);
      }
      setIsLoading(false);
    },
    onClose: () => alert("Payment closed!"),
  });

  // Form submission handler
  const onSubmit = async () => {
    setIsLoading(true);
    const isSaved = await savePaymentInformation("Pending");
    if (!isSaved) {
      alert("Failed to save payment information. Please try again.");
      setIsLoading(false);
      return;
    }
    handleFlutterPayment();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Total Amount: ₦{totalAmount.toFixed(2)}
        </h1>

        {/* User Details */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Full Name</label>
          <input
            type="text"
            value={`${first_name} ${last_name}`}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            readOnly
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="text"
            value={email}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            readOnly
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <Link
            to="/cart"
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 text-center"
          >
            Go Back
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center"
          >
            {isLoading ? <div className="spinner"></div> : "Pay Now"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentPage;