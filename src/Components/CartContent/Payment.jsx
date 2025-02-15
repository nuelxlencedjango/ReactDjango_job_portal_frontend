import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import Cookies from "js-cookie";
import api from "../../api";

const PaymentPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const totalAmount = location.state?.totalAmount || 0;
  const first_name = location.state?.first_name || "";
  const last_name = location.state?.last_name || "";
  const email = location.state?.email || "";
  const phone_number = location.state?.phone_number || "";

  const [amount, setAmount] = useState(totalAmount);
  const [userFirstName, setUserFirstName] = useState(first_name);
  const [userLastName, setUserLastName] = useState(last_name);
  const [userEmail, setUserEmail] = useState(email);
  const [userPhone, setUserPhone] = useState(phone_number);
  const [txRef, setTxRef] = useState(""); // Transaction reference

  // Generate a unique transaction reference 
  useEffect(() => {
    const ref = "iwanwok_" + Math.floor(Math.random() * 1000000000 + 1);
    setTxRef(ref);
  }, []);

  // Handle Flutterwave payment
  const handleFlutterPayment = useFlutterwave({
    public_key: "FLWPUBK_TEST-6941e4117be9902646d54ec0509e804c-X", 
    tx_ref: txRef, // generated ref id
    amount: amount, // Payment amount
    currency: "NGN", 
    redirect_url: `${window.location.origin}/payment-status`,
    customer: {
      email: userEmail,
      phone_number: userPhone,
      name: `${userFirstName} ${userLastName}`,
      
    },
    customizations: {
      title: "Iwan_wok",
      description: "Payment for the services requested",
    },
    callback: async (response) => {
      closePaymentModal(); // Close the payment modal

      // Payment was successful
      if (response.status === "successful") {
        alert("Payment was successfully completed!");

        // Save payment information with status "Successful"
        const isSaved = await savePaymentInformation("Successful");
        if (!isSaved) {
          alert("Failed to save payment information. Please try again.");
          return;
        }

        // Trigger backend API to update cart and items
        await api.post("/payment/process/", {
          tx_ref: txRef, // Pass tx_ref (the reference you generated)
          transaction_id: response.id, // Pass transaction_id 
          status: response.status,
          amount: amount,
        });

        navigate(`/payment-confirmation?status=success&tx_ref=${txRef}`);
      } 
      // Payment failed
      else {
        alert("Payment was not successful. Please try again.");

        // Save payment information with status "Failed"
        const isSaved = await savePaymentInformation("Failed");
        if (!isSaved) {
          alert("Failed to save payment information. Please try again.");
          return;
        }

        // Trigger backend API to process the failed payment
        await api.post("/payment/process/", {
          tx_ref: txRef, 
          transaction_id: response.transaction_id, 
          status: response.status,
          amount: amount,
        });

        navigate(`/payment-confirmation?status=failed&tx_ref=${txRef}`);
      }
    },
    onClose: () => {
      alert("Payment closed!");
    },
  });

  // Save payment information to the database (both pending and successful/failed payments)
  const savePaymentInformation = async (status = "Pending") => {
    const token = Cookies.get("access_token");
    if (!token) {
      alert("You need to log in to complete this action.");
      navigate("/login");
      return false;
    }

    try {
      const response = await api.post(
        "/employer/payment-details/",
        {
          tx_ref: txRef,
          amount: amount,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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

  // Form submission handler
  const onSubmit = async () => {
    // Save payment information as "Pending"
    const isSaved = await savePaymentInformation("Pending");
    if (!isSaved) {
      alert("Failed to save payment information. Please try again.");
      return;
    }

    // Trigger payment after saving payment info
    handleFlutterPayment();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-lg"
        onSubmit={handleSubmit(onSubmit)} // Now calls handleSubmit from react-hook-form
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Total Amount: ₦{amount.toFixed(2)}
        </h1>

        {/* User Details */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Full Name</label>
          <input
            type="text"
            value={`${userFirstName} ${userLastName}`}
            className="w-full p-2 border rounded"
            readOnly
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="text"
            value={userEmail}
            className="w-full p-2 border rounded"
            readOnly
          />
        </div>

        {/* Total Amount */}
        <div className="mb-4 text-right">
          <h3 className="text-xl font-bold">
            Total: ₦{amount.toFixed(2)}
          </h3>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <Link
            to="/cart"
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 w-1/3 text-center"
          >
            Go Back
          </Link>
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 w-1/3"
          >
            Pay Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentPage;
