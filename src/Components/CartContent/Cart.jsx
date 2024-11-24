import React, { useEffect, useState } from "react";
import api from "../../api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartData = async () => {
      const token = Cookies.get("access_token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        const response = await api.get("/employers/cart-items/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCartItems(response.data.cart_items || []); // Set cart items if available
        setUserData(response.data.user_data || {}); // Set user details
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, [navigate]);

  const handleRemoveFromCart = async (itemId) => {
    const token = Cookies.get("access_token");
    try {
      await api.delete(`/employers/cart/${itemId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
      alert("Item removed from cart!");
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.artisan.pay, 0);

  return (
    <div className="container mx-auto px-4 mt-10 mb-20">
      {/* Welcome User */}
      <p className="text-lg font-medium text-gray-700 mb-2">
        Welcome, {userData.first_name || "User"}!
      </p>

      {/* Header */}
      <h1 className="text-2xl font-bold text-center mb-10">Your Cart</h1>

      {loading && <div>Loading...</div>}

      {!loading && cartItems.length === 0 && (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section */}
        <div className="flex-grow">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center justify-between p-2 bg-white rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow duration-200 cusor-pointer"
            >
              {/* Image and Name */}
              <div className="flex flex-col items-center sm:items-start">
                {item.artisan.profile_img ? (
                  <img
                    src={item.artisan.profile_img}
                    alt={`${item.artisan.first_name}'s profile`}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-300"></div>
                )}
                <p className="text-center sm:text-left text-lg font-medium mt-1">
                  {item.artisan.first_name} {item.artisan.last_name}
                </p>
              </div>

              {/* Details */}
              <div className="flex flex-col sm:flex-row flex-grow justify-between px-4 items-center mt-4 sm:mt-0">
                <span className="text-gray-600 sm:ml-4">
                   {item.artisan.service}
                </span>
                <span className="text-gray-600 sm:mr-4">
                  Pay: ${item.artisan.pay}
                </span>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 mt-4 sm:mt-0"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total Below Items */}
          {cartItems.length > 0 && (
            <div className="text-right mt-4 text-xl font-bold">
              Total: ${calculateTotal()}
            </div>
          )}
        </div>

        {/* Right Section: Total Box */}
        {cartItems.length > 0 && (
          <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full lg:w-1/3 mt-8 lg:mt-4"  style={{ maxWidth: "500px" }}>
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-700 text-lg">Total Items:</p>
              <p className="font-bold text-lg">{cartItems.length}</p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-700 text-lg">Total Amount:</p>
              <p className="font-bold text-lg">${calculateTotal()}</p>
            </div>
            <div className="flex justify-end">
                 <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                 Pay Now
                </button>
              </div>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

