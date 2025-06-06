import React, { useEffect, useState } from "react";
import api from "../../api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Checkout = () => { 
  const [userDetails, setUserDetails] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [purchaseDate] = useState(new Date().toLocaleDateString());
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartData = async () => {
      const token = Cookies.get("access_token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await api.get("/employer/cart-items/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.cart_items && response.data.cart_items.length === 0) {
          alert("Your cart is empty. Redirecting to the cart page...");
          navigate("/cart");
        } else {
          setCartItems(response.data.cart_items || []);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
        alert("There was an issue fetching cart data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, [navigate]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = Cookies.get("access_token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await api.get("/employer/employer-details/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
        alert("There was an issue fetching your details. Please try again.");
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.artisan.pay, 0);

  const handleContinue = async () => {
    const token = Cookies.get("access_token");
    if (!token) {
      alert("You need to be logged in to continue.");
      navigate("/login");
      return;
    }

    const checkoutData = {  
      user_id: userDetails?.id, // Assuming you have an ID in `userDetails`
      cart_items: cartItems.map((item) => ({
        artisan_id: item.artisan.id,
        pay: item.artisan.pay,
      })),
      total_amount: calculateTotal(),
      purchase_date: purchaseDate,
    };

    try {
      const response = await api.post("/api/checkout/", checkoutData, { 
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        const { order_id } = response.data;
        navigate("/payment-page", { state: { totalAmount: calculateTotal(), order_id } });
      }
    } catch (error) {
      console.error("Error submitting checkout data:", error); 
      alert("There was an issue with your checkout. Please try again."); 
    }
  };

  const handleCancel = () => {
    alert("Checkout process canceled"); 
    navigate("/cart");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const totalAmount = calculateTotal();

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center py-10">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Checkout</h1> 

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Details Section */}
          <div className="user-details-section bg-gray-50 p-6 rounded-lg shadow-md col-span-1 lg:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">User Details</h2>

            {userDetails ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-600 font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      value={userDetails.full_name || ""}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium mb-1">Email</label>
                    <input
                      type="email"
                      value={userDetails.email || ""}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium mb-1">Phone</label>
                    <input
                      type="text"
                      value={userDetails.phone || ""}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium mb-1">Address</label>
                    <input
                      type="text"
                      value={userDetails.address || ""}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled
                    />
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Loading user details...</p>
            )}
          </div>

          {/* Summary Section */}
          <div className="summary-section bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Summary</h2>
            <div className="space-y-4">
              <p><strong className="font-medium text-gray-600">Purchase Date:</strong> {purchaseDate}</p>
              <hr className="my-2 border-gray-300" />
              <p><strong className="font-medium text-gray-600">Total Amount:</strong> ${totalAmount}</p>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                className="w-2/3 py-2 text-sm bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none transition-all duration-300"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="w-2/3 py-2 text-sm bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none transition-all duration-300"
                onClick={handleContinue}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 
