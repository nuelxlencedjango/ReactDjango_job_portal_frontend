import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

const PaymentPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const totalAmount = location.state?.totalAmount || 0; // Get the totalAmount from the Cart component
  const first_name = location.state?.first_name || "";
  const last_name = location.state?.last_name || "";
  const email = location.state?.email || "";
  const phone_number = location.state?.phone_number || ""; // Make sure you get phone_number

  const [amount, setAmount] = useState(totalAmount);
  const [userFirstName, setUserFirstName] = useState(first_name);
  const [userLastName, setUserLastName] = useState(last_name);
  const [userEmail, setUserEmail] = useState(email);
  const [userPhone, setUserPhone] = useState(phone_number);

  // Update the amount if the totalAmount changes
  useEffect(() => {
    setAmount(totalAmount);
    setUserFirstName(first_name);
    setUserLastName(last_name);
    setUserEmail(email);
    setUserPhone(phone_number);
  }, [totalAmount, first_name, last_name, email, phone_number]);

  // Flutterwave configuration
  const config = {
    public_key: "FLWPUBK_TEST-6941e4117be9902646d54ec0509e804c-X", // Replace with your actual public key
    tx_ref: "iwanwok_" + Math.floor(Math.random() * 1000000000 + 1),
    amount: amount,
    currency: "NGN",
    redirect_url: "https://www.i-wan-wok.com/payment_confirmation/",
    customer: {
      email: userEmail, // Replace with dynamic email from form
      phone_number: userPhone, // Replace with dynamic phone number from form
      name: `${userFirstName} ${userLastName}`, // Concatenate first name and last name
    },
    customizations: {
      title: "Iwan_wok",
      description: "Payment for the services requested",
    },
  };

  // Initialize Flutterwave payment
  const handleFlutterPayment = useFlutterwave(config);

  // Form submission handler
  const onSubmit = (data) => {
    console.log(data); // Form data (email, phoneNumber, fullname, etc.)

    // Trigger Flutterwave payment
    handleFlutterPayment({
      callback: (response) => {
        console.log(response);
        closePaymentModal(); // Close the payment modal
        alert("Payment was successfully completed!");
        navigate("/payment_confirmation"); // Redirect to a confirmation page
      },
      onClose: () => {
        alert("Payment closed!");
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Total Amount: ₦{amount.toFixed(2)}</h1>

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

        {/* Button and Link on the Same Line */}
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
