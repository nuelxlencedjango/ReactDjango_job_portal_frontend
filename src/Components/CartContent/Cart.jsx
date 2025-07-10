import React, { useEffect, useState } from "react";
import api from "../../api";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import { FaTrash, FaPlus, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [imageLoading, setImageLoading] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const token = Cookies.get("access_token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await api.get("employer/cart-items/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.cart?.length > 0) {
          const allItems = response.data.cart.flatMap((cart) => cart.items);
          setCartItems(allItems);
          Cookies.set("cart_code", response.data.cart[0]?.cart_code);
        }

        setUserData(response.data.user || {});
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, [navigate]);

  const handleRemoveItem = async (itemId) => {
    try {
      const token = Cookies.get("access_token");
      await api.delete(`/employer/cart-item-delete/${itemId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(prev => prev.filter(item => item.id !== itemId));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (parseFloat(item.artisan?.pay) || 0), 0);
  };

  const handleCheckout = () => {
    navigate("/payment", {
      state: {
        totalAmount: calculateTotal(),
        ...userData
      },
    });
  };

  const handleImageLoad = (itemId) => {
    setImageLoading(prev => ({ ...prev, [itemId]: false }));
  };

  const handleImageError = (itemId) => {
    setImageLoading(prev => ({ ...prev, [itemId]: false }));
  };

  const Avatar = ({ artisan, className = "" }) => {
    const [error, setError] = useState(false);
    const itemId = artisan?.id;

    if (error || !artisan?.profile_image) {
      return (
        <div className={`${className} rounded-full bg-gray-200 flex items-center justify-center`}>
          <FaUserCircle className="text-gray-400 text-3xl" />
        </div>
      );
    }

    return (
      <div className="relative">
        {imageLoading[itemId] !== false && (
          <div className="absolute inset-0 flex items-center justify-center">
            <ImSpinner8 className="animate-spin text-gray-400" />
          </div>
        )}
        <img
          src={artisan.profile_image}
          alt={`${artisan.first_name} ${artisan.last_name}`}
          className={`${className} rounded-full object-cover ${imageLoading[itemId] !== false ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => handleImageLoad(itemId)}
          onError={() => {
            setError(true);
            handleImageError(itemId);
          }}
        />
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ImSpinner8 className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Cart Content */}
        <div className="md:w-2/3">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FaShoppingCart /> Your Service Request ({cartItems.length})
            </h1>

            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FaShoppingCart className="text-gray-400 text-3xl" />
                </div>
                <h2 className="text-xl font-medium text-gray-700 mb-2">Your service request is empty</h2>
                <p className="text-gray-500 mb-6">Browse our services to find artisans</p>
                <Link
                  to="/"
                  className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                >
                  Find Services
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
                    <Avatar 
                      artisan={item.artisan} 
                      className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0" 
                    />

                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-800">
                        {item.artisan?.service || "Service"}
                      </h3>
                      <p className="text-gray-600">
                        {item.artisan?.first_name} {item.artisan?.last_name}
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm">
                        <span className="text-gray-500">
                          <span className="font-medium">Location:</span> {item.artisan?.location || "N/A"}
                        </span>
                        <span className="text-gray-500">
                          <span className="font-medium">Experience:</span> {item.artisan?.experience || "0"} years
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between sm:ml-auto">
                      <p className="text-lg font-bold text-gray-800">
                        ₦{(item.artisan?.pay || 0).toLocaleString()}
                      </p>
                      <div className="flex gap-2 mt-2 sm:mt-0">
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-2 text-red-500 hover:text-red-700 transition-colors"
                          title="Remove"
                        >
                          <FaTrash />
                        </button>
                        <Link
                          to={`/api/artisans-by-service/${encodeURIComponent(item.artisan.service || "")}`}
                          className="p-2 text-green-500 hover:text-green-700 transition-colors"
                          title="Add more"
                        >
                          <FaPlus />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        {cartItems.length > 0 && (
          <div className="md:w-1/3">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Service Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₦{calculateTotal().toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between border-t border-gray-100 pt-4">
                  <span className="text-gray-600">Total</span>
                  <span className="text-lg font-bold text-green-600">
                    ₦{calculateTotal().toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                  className={`w-full py-3 rounded-lg font-medium mt-6 transition-colors ${
                    cartItems.length === 0 
                      ? 'bg-gray-300 cursor-not-allowed' 
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
