
import React, { useEffect, useState } from "react";
import api from "../../api";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import DryIcon from "@mui/icons-material/Dry";
import { FaTrash, FaPlus } from 'react-icons/fa';


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
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });

        console.log("Response data:", response.data);
        setCartItems(response.data.cart.items || []); // Access items under 'cart'
        setUserData(response.data.user || {}); // Access user data
      } catch (error) {
        console.error("Error fetching cart data:", error);
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
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const pay = parseFloat(item.artisan?.pay) || 0; // Convert to number and handle non-numeric values
      return total + pay;
    }, 0);
  };

  // Inside Cart component

const handleProceedToCheckout = () => {
  navigate("/payment", { state: { totalAmount: calculateTotal() } });
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
        <p className="text-gray-600 text-center text-xl">Your cart is empty.</p>
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
              <button onClick={handleProceedToCheckout}
            
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






{/*

  import React from "react";
  import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
  import img1 from '../../assets/logos/logo1.jpg'
  import img2 from '../../assets/logos/logo2.jpg'
  import img3 from '../../assets/logos/logo3.jpg'
  
  const CartPage = () => {
    // Sample cart items data
    const cartItems = [
      {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        quantity: 2,
        image: img1,
      },
      {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        quantity: 1,
        image: img2,
      },
      {
        id: 3,
        name: "Bluetooth Speaker",
        price: 59.99,
        quantity: 3,
        image: img3,
      },
    ];
  
    // Calculate total price
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center mb-8">Your Cart</h1>
  
    
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow duration-300"
              >
            
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
  
             
                <div className="flex-1 mx-4 text-center sm:text-left">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
  
                <div className="flex items-center space-x-4">
                  <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
                    <FaMinus className="text-sm" />
                  </button>
                  <span className="text-lg font-medium">{item.quantity}</span>
                  <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
                    <FaPlus className="text-sm" />
                  </button>
                </div>
  
               
                <button className="p-2 text-red-500 hover:text-red-700">
                  <FaTrash className="text-lg" />
                </button>
              </div>
            ))}
          </div>
  
        
          <div className="mt-8 border-t pt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Total</h2>
              <p className="text-2xl font-bold">${totalPrice.toFixed(2)}</p>
            </div>
          </div>
  
        
          <div className="mt-8">
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default CartPage;
  
*/}