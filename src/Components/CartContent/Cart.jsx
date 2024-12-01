import React, { useEffect, useState } from "react";
import api from "../../api";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import DryIcon from "@mui/icons-material/Dry";  // Assuming you're using DryIcon

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

        setCartItems(response.data.cart_items || []);
        setUserData(response.data.user_data || {});
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

    if (!token) {
      navigate("/login");
      return;
    }

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
      <p className="text-lg font-medium text-gray-700 mb-2">
        Welcome, {userData.first_name || "User"}!
      </p>

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
              className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-lg shadow-md mb-4 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
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

              <div className="artisan-main flex flex-col sm:flex-row flex-grow justify-between px-4 items-center mt-2 sm:mt-0 relative sm:px-1">
                <span className="job-icon text-gray-600 sm:ml-2">
                  {item.artisan.service}
                </span>

                <div className="absolute cart-icon-wrapper top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <DryIcon className="cart-icon text-gray-400" style={{ fontSize: 18 }} />
                </div>

                <span className="pay-icon text-gray-600 sm:mr-2">
                  Pay: ${item.artisan.pay}
                </span>
              </div>

              <div className="buttons-container">
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 mr-2"
                >
                  Remove
                </button>

                <Link
                  to={`/artisans/artisans-by-service/${encodeURIComponent(item.artisan.service)}`}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-black-600 color-white transition-all duration-300 transform hover:scale-110"
                >
                  Add
                </Link>
              </div>
            </div>
          ))}

          {cartItems.length > 0 && (
            <div className="text-right mt-4 text-xl font-bold">
              Total: ${calculateTotal()}
            </div>
          )}
        </div>

        {/* Order Summary */}
        {cartItems.length > 0 && (
          <div className="sticky top-20 bg-gray-100 p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl transform hover:scale-105 w-full lg:w-1/3 mt-10 max-h-[400px] overflow-y-auto">
            <div className="w-full h-32 mb-4">
              <img
                src="https://via.placeholder.com/300x200"
                alt="Order Summary"
                className="rounded-lg object-cover w-full h-full"
              />
            </div>

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
              <Link
                to={{     
                  pathname: "/pay",
                  state: { totalAmount: calculateTotal() },  
                }}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-110"
              >
                Checkout
              </Link> 
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
