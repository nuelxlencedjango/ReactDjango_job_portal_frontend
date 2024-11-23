



import React, { useEffect, useState } from "react";
import api from "../../api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
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
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
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
    <div className="container mx-auto px-4 mt-32">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>

      {loading && <div>Loading...</div>}

      {cartItems.length === 0 && !loading && (
        <p className="text-gray-600">Your cart is empty.</p>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section: Cart Items */}
        <div className="flex-grow">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md mb-4"
            >
              {/* Image */}
              {item.artisan.profile_img ? (
                <img
                  src={item.artisan.profile_img}
                  alt={`${item.artisan.user?.first_name}'s profile`}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-300"></div>
              )}

              {/* Details */}
              <div className="flex-grow px-4">
                <h2 className="text-lg font-semibold">
                  {item.artisan.user?.first_name} {item.artisan.user?.last_name}
                </h2>
                <p className="text-gray-600">
                  Service: {item.artisan.service?.title}
                </p>
                <p className="text-gray-600">Pay: ${item.artisan.pay}</p>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
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
          <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full lg:w-1/3">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <p className="text-gray-700 text-lg">Total Items: {cartItems.length}</p>
            <p className="text-gray-700 text-lg">
              Total Amount: <span className="font-bold">${calculateTotal()}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
