import React, { useEffect, useState } from "react";
import api from "../../api";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import DryIcon from "@mui/icons-material/Dry";
import { FaTrash, FaPlus } from "react-icons/fa";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartData = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("access_token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await api.get("employer/cart-items/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Response data:", response.data);

        if (response.data.cart === null) {
          setCartItems([]);
        } else {
          setCartItems(response.data.cart.items || []);
        }

        setUserData(response.data.user || {});
      } catch (error) {
        console.error("Error fetching cart data:", error);
        alert("An error occurred while fetching your cart. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, [navigate]);

  const handleRemoveFromCart = async (itemId) => {
    try {
      const token = Cookies.get("access_token");
      if (!token) {
        navigate("/login");
        return;
      }

      await api.delete(`/employer/cart-items/${itemId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const pay = parseFloat(item.artisan?.pay) || 0;
      return total + pay;
    }, 0);
  };

  const handleProceedToCheckout = () => {
    navigate("/payment", {
      state: {
        totalAmount: calculateTotal(),
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
      },
    });
  };

  return (
    <div className="container mx-auto px-4 mt-10 mb-20">
      <p className="text-lg font-medium text-gray-700 mb-2">
        Welcome, {userData.first_name || "User"}!
      </p>

      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">Your Cart</h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600 text-xl mb-4">Your cart is empty.</p>
          <Link
            to="/services"
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-300"
          >
            Browse Services
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="flex-1">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between p-6 bg-gray-50 rounded-lg shadow-md mb-6 hover:shadow-lg transition-all duration-300"
              >
                {/* Artisan Image and Details */}
                <div className="flex items-center w-full sm:w-auto">
                  <img
                    src={item.artisan?.profile_image || "/default-avatar.png"}
                    alt="Artisan"
                    className="w-20 h-20 rounded-full object-cover mr-4"
                    onError={(e) => {
                      e.target.src = "/default-avatar.png";
                    }}
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {item.artisan?.service || "N/A"}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {item.artisan?.first_name || "Unknown"}{" "}
                      {item.artisan?.last_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Location: {item.artisan?.location || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Experience: {item.artisan?.experience || "N/A"} years
                    </p>
                    <p className="text-sm text-gray-800 font-bold">
                      Pay: ₦{item.artisan?.pay || "0.00"}
                    </p>
                  </div>
                </div>

                {/* Actions (Remove and Add Buttons) */}
                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 flex items-center gap-2"
                  >
                    <FaTrash className="text-sm" /> Remove
                  </button>
                  <Link
                    to={`/api/artisans-by-service/${encodeURIComponent(
                      item.artisan.service || ""
                    )}`}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-300 flex items-center gap-2"
                  >
                    <FaPlus className="text-sm" /> Add
                  </Link>
                </div>
              </div>
            ))}

            {/* Total Price */}
            <div className="text-right mt-8">
              <h3 className="text-2xl font-bold text-gray-800">
                Total: ₦
                {Number.isFinite(calculateTotal())
                  ? calculateTotal().toFixed(2)
                  : "0.00"}
              </h3>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="sticky top-20 bg-white p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl transform hover:scale-105 w-full lg:w-1/3 max-h-[400px] overflow-y-auto">
            <div className="w-full h-32 mb-4">
              <img
                src="https://via.placeholder.com/300x200"
                alt="Order Summary"
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Order Summary
            </h2>
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-700 text-lg">Total Items:</p>
              <p className="font-bold text-lg">{cartItems.length}</p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-700 text-lg">Total Amount: </p>
              <p className="font-bold text-lg">₦{calculateTotal().toFixed(2)}</p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleProceedToCheckout}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;