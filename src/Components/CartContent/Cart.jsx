{/*import React, { useEffect, useState } from "react";
import api from "../../api";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import DryIcon from "@mui/icons-material/Dry";   

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
        const response = await api.get("/employer/cart-items/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCartItems(response.data.cart_items || []);
        setUserData(response.data.user_data || {});   
        console.log('response data:', response.data)
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
      await api.delete(`/employer/cart/${itemId}/`, {
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
     
        <div className="flex-grow">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-lg shadow-md mb-4 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex flex-col items-center sm:items-start">
                {item.artisan.profile_image ? ( 
                  <img
                    src={item.cart_items.profile_image} 
                    alt={`${item.artisan.last_name}'s profile`}
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

             
                <div className="cart-icon-wrapper absolute top-0 right-0 sm:relative sm:right-auto sm:top-auto sm:transform-none sm:translate-x-0 sm:translate-y-0">
                  <DryIcon className="cart-icon text-gray-400" style={{ fontSize: 18 }} />
                </div>

                <span className="pay-icon text-gray-600 sm:mr-2">
                  Pay: ${item.artisan.pay}
                </span>
              </div>

              <div className="buttons-container mt-2">
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 mr-2"
                >
                  Remove
                </button>

                <Link
                  to={`/api/artisans-by-service/${encodeURIComponent(item.artisan.service)}`}
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
                  pathname: "/payment",
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

export default Cart;*/}





{/*import React, { useEffect, useState } from "react";
import api from "../../api"; // Importing api.js
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import DryIcon from "@mui/icons-material/Dry";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});    
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartData = async () => {
      const token = Cookies.get("access_token");

      // Check if token exists before making the API call
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        // Use the api.js instance which automatically includes the token
        const response = await api.get("/employer/cart-items/");
        
        setCartItems(response.data.cart_items || []);
        setUserData(response.data.user_data || {});
        console.log("response data:", response.data);
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

    // Check if token exists before making the API call
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      // Use the api.js instance for removing an item from the cart
      await api.delete(`/employer/cart/${itemId}/`);
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
        <div className="flex-grow">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-lg shadow-md mb-4 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex flex-col items-center sm:items-start">
                {item.artisan.profile_image ? (
                  <img
                    src={item.artisan.profile_image}
                    alt={`${item.artisan.last_name}'s profile`}
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

                <div className="cart-icon-wrapper absolute top-0 right-0 sm:relative sm:right-auto sm:top-auto sm:transform-none sm:translate-x-0 sm:translate-y-0">
                  <DryIcon className="cart-icon text-gray-400" style={{ fontSize: 18 }} />
                </div>

                <span className="pay-icon text-gray-600 sm:mr-2">
                  Pay: ${item.artisan.pay}
                </span>
              </div>

              <div className="buttons-container mt-2">
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 mr-2"
                >
                  Remove
                </button>

                <Link
                  to={`/api/artisans-by-service/${encodeURIComponent(item.artisan.service)}`}
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
      </div>
    </div>
  );
};

export default Cart;*/}




{/*import React, { useEffect, useState } from "react";
import api from "../../api"; // Importing api.js
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import DryIcon from "@mui/icons-material/Dry";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});    
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartData = async () => {
      const token = Cookies.get("access_token");
      console.log('key access:', token)
      // Check if token exists before making the API call
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        // Manually include the token in the request headers
        const response = await api.get("/employer/cart-items/", {
          headers: {
            Authorization: `Bearer ${token}`,  // Include token here
          },
        });


        console.log("Request headers:", {
          Authorization: `Bearer ${token}`,
        });
        console.log("API Response:", response.data);


        setCartItems(response.data.cart_items || []);
        setUserData(response.data.user_data || {});
        console.log("response data:", response.data);
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
    console.log("key token:", token)

    // Check if token exists before making the API call
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      // Manually include the token in the request headers for the delete request
      await api.delete(`/employer/cart/${itemId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,  // Include token here
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
        <div className="flex-grow">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-lg shadow-md mb-4 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex flex-col items-center sm:items-start">
                {item.artisan.profile_image ? (
                  <img
                    src={item.artisan.profile_image}
                    alt={`${item.artisan.last_name}'s profile`}
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

                <div className="cart-icon-wrapper absolute top-0 right-0 sm:relative sm:right-auto sm:top-auto sm:transform-none sm:translate-x-0 sm:translate-y-0">
                  <DryIcon className="cart-icon text-gray-400" style={{ fontSize: 18 }} />
                </div>

                <span className="pay-icon text-gray-600 sm:mr-2">
                  Pay: ${item.artisan.pay}
                </span>
              </div>

              <div className="buttons-container mt-2">
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 mr-2"
                >
                  Remove
                </button>

                <Link
                  to={`/api/artisans-by-service/${encodeURIComponent(item.artisan.service)}`}
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
      </div>
    </div>
  );
};

export default Cart;*/}





{/*import React, { useEffect, useState } from "react";
import api from "../../api"; // Importing api.js
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import DryIcon from "@mui/icons-material/Dry";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});    
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartData = async () => {
      const token = Cookies.get("access_token");  // Get token from cookies
      console.log('key access:', token);
      
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        // Make an API call to fetch the cart items
        const response = await api.get("/employer/cart-items/", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        });

        console.log("API Response:", response.data);

        // Assuming the response contains the `cart_items` and `user_data`
        setCartItems(response.data.items || []);
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
      await api.delete(`/employer/cart/${itemId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Update the cart items by filtering out the removed item
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
        <div className="flex-grow">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-lg shadow-md mb-4 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex flex-col items-center sm:items-start">
                {item.artisan.profile_image ? (
                  <img
                    src={item.artisan.profile_image}
                    alt={`${item.artisan.last_name}'s profile`}
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

                <div className="cart-icon-wrapper absolute top-0 right-0 sm:relative sm:right-auto sm:top-auto sm:transform-none sm:translate-x-0 sm:translate-y-0">
                  <DryIcon className="cart-icon text-gray-400" style={{ fontSize: 18 }} />
                </div>

                <span className="pay-icon text-gray-600 sm:mr-2">
                  Pay: ${item.artisan.pay}
                </span>
              </div>

              <div className="buttons-container mt-2">
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 mr-2"
                >
                  Remove
                </button>

                <Link
                  to={`/api/artisans-by-service/${encodeURIComponent(item.artisan.service)}`}
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
      </div>
    </div>
  );
};

export default Cart;*/}

{/*import React, { useEffect, useState } from "react";
import api from "../../api"; // Axios instance
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import DryIcon from "@mui/icons-material/Dry";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        setLoading(true);
        const token = Cookies.get("access_token");

        if (!token) {
          navigate("/login"); // Redirect to login if no token
          return;
        }

        const response = await api.get("/employer/cart-items/", {
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

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + (item.artisan.pay || 0), 0);

  return (
    <div className="container mx-auto px-4 mt-10 mb-20">
      <p className="text-lg font-medium text-gray-700 mb-2">
        Welcome, {userData.first_name || "User"}!
      </p>

      <h1 className="text-2xl font-bold text-center mb-10">Your Cart</h1>

      {loading ? (
        <div>Loading...</div>
      ) : cartItems.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-8">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md mb-4 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center">
                <img
                  src={item.artisan.profile_image || "/default-profile.png"}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="ml-4">
                  <p className="text-lg font-medium">
                    {item.artisan.first_name} {item.artisan.last_name}
                  </p>
                  <p className="text-gray-600">{item.artisan.service}</p>
                </div>
              </div>

              <div className="flex items-center">
                <span className="text-gray-700 font-bold mr-4">
                  Pay: ${item.artisan.pay}
                </span>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right text-xl font-bold">
            Total: ${calculateTotal()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;*/}


{/*import React, { useEffect, useState } from "react";
import api from "../../api"; // Axios instance configured with baseURL
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

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
          navigate("/login"); // Redirect to login if no token
          return;
        }

        const response = await api.get("employer/cart-items/", {
          
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        

        console.log('responses:', response.data)
        setCartItems(response.data.items || []);
        setUserData(response.data.user || {});
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

      await api.delete(`/cart-items/${itemId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + (item.artisan?.pay || 0), 0);

  return (
    <div className="container mx-auto px-4 mt-10 mb-20">
      <p className="text-lg font-medium text-gray-700 mb-2">
        Welcome, {userData.first_name || "User"}!
      </p>

      <h1 className="text-2xl font-bold text-center mb-10">Your Cart</h1>

      {loading ? (
        <div>Loading...</div>
      ) : cartItems.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-8">




          {cartItems.map((item) => (
            <div key={item.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md mb-4 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center">
                <img src={item.artisan_details?.profile_image || "/default-avatar.png"}
                  alt="Artisan"
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h2 className="font-medium text-lg">{item.service_title}</h2>
                  <p className="text-sm text-gray-600">
        
                    {item.artisan_details?.first_name} {item.artisan_details?.last_name}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-lg font-medium text-gray-700">
                  <p>Pay: ${item.artisan_details?.pay?.toFixed(2) || "0.00"}</p>
                </p>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="text-right mt-8">
            <h3 className="text-xl font-bold">
              Total: ${calculateTotal().toFixed(2)}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;*/}




{/*main import React, { useEffect, useState } from "react";
import api from "../../api"; // Axios instance configured with baseURL
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import DryIcon from "@mui/icons-material/Dry";  

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
          navigate("/login"); // Redirect to login if no token
          return;
        }

        const response = await api.get("employer/cart-items/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('responses:', response.data)
        setCartItems(response.data.items || []);
        setUserData(response.data.user || {});
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      

      setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + (item.artisan?.pay || 0), 0);

  return (
    <div className="container mx-auto px-4 mt-10 mb-20">
      <p className="text-lg font-medium text-gray-700 mb-2">
        Welcome, {userData.first_name || "User"}! 
      </p>

      <h1 className="text-2xl font-bold text-center mb-10">Your Cart</h1>

      {loading ? (
        <div>Loading...</div>
      ) : cartItems.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-8">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md mb-4 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center">
                <img
                  src={item.artisan?.profile_image || "/default-avatar.png"}
                  alt="Artisan"
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h2 className="font-medium text-lg">{item.artisan?.service}</h2>
                  <p className="text-sm text-gray-600">
                    {item.artisan?.first_name} {item.artisan?.last_name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Location: {item.artisan?.location || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Experience: {item.artisan?.experience || "N/A"} years
                  </p>
                </div>
              </div>
              <div className="cart-icon-wrapper absolute top-0 right-0 sm:relative sm:right-auto sm:top-auto sm:transform-none sm:translate-x-0 sm:translate-y-0">
                  <DryIcon className="cart-icon text-gray-400" style={{ fontSize: 18 }} />
                </div>
              <div>
                <p className="text-lg font-medium text-gray-700">
                  ${item.artisan?.pay || "0.00"}
                </p>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
                <Link
                  to={`/api/artisans-by-service/${encodeURIComponent(item.artisan.service)}`}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-black-600 color-white transition-all duration-300 transform hover:scale-110"
                >
                  Add
                </Link>
              </div>
            </div>
          ))}
          <div className="text-right mt-8">
            <h3 className="text-xl font-bold">
              Total: ${calculateTotal().toFixed(2)}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;*/}


{/*import React, { useEffect, useState } from "react";
import api from "../../api";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import DryIcon from "@mui/icons-material/Dry";

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
        console.log('res anser:',response.data)
        setCartItems(response.data.items || []);
        setUserData(response.data.user || {});
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
      const pay = parseFloat(item.artisan?.pay) || 0; // Convert to number and handle non-numeric values
      return total + pay;
    }, 0);
  };

  return (
    <div className="container mx-auto px-4 mt-10 mb-20">
      <p className="text-lg font-medium text-gray-700 mb-2">
        Welcome, {userData.first_name || "User"}!
      </p>

      <h1 className="text-2xl font-bold text-center mb-10">Your Cart</h1>

      {loading ? (
        <div>Loading...</div>
      ) : cartItems.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-8">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-lg shadow-md mb-4 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center w-full sm:w-auto">
                <img
                  src={item.cart?.profile_image || "/default-avatar.png"}
                  alt="Artisan"
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h2 className="font-medium text-lg">{item.artisan?.service}</h2>
                  <p className="text-sm text-gray-600">
                    {item.artisan?.first_name} {item.artisan?.last_name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Location: {item.artisan?.location || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Experience: {item.artisan?.experience || "N/A"} years
                  </p>
                </div>
              </div>
              <div className="mt-4 sm:mt-0 sm:flex sm:items-center sm:gap-4">
                <p className="text-lg font-medium text-gray-700">
                  ${item.artisan?.pay || "0.00"}
                </p>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300"
                >
                  Remove
                </button>
                <Link
                  to={`/api/artisans-by-service/${encodeURIComponent(item.artisan.service)}`}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-300"
                >
                  Add
                </Link>
              </div>
            </div>
          ))}
          <div className="text-right mt-8">
            <h3 className="text-xl font-bold">
              Total: ${Number.isFinite(calculateTotal()) ? calculateTotal().toFixed(2) : "0.00"}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;*/}








{/*import React, { useEffect, useState } from "react";
import api from "../../api";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import DryIcon from "@mui/icons-material/Dry";

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
        setCartItems(response.data.cart.items || []); // Access items under 'cart'
        setUserData(response.data.user || {});        // Access user data
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
      const pay = parseFloat(item.artisan?.pay) || 0; // Convert to number and handle non-numeric values
      return total + pay;
    }, 0);
  };

  return (
    <div className="container mx-auto px-4 mt-10 mb-20">
      <p className="text-lg font-medium text-gray-700 mb-2">
        Welcome, {userData.first_name || "User"}!
      </p>

      <h1 className="text-2xl font-bold text-center mb-10">Your Cart</h1>

      {loading ? (
        <div>Loading...</div>
      ) : cartItems.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-8">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-lg shadow-md mb-4 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center w-full sm:w-auto">
                <img
                  src={item.artisan?.profile_image || "/default-avatar.png"}
                  alt="Artisan"
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h2 className="font-medium text-lg">{item.artisan?.service || "N/A"}</h2>
                  <p className="text-sm text-gray-600">
                    {item.artisan?.first_name || "Unknown"} <span> {item.artisan?.last_name }</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Location: {item.artisan?.location || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Experience: {item.artisan?.experience || "N/A"} years
                  </p>
                  <p className="text-sm text-gray-800">
                    Pay: ₦<span className="text-black-700 font-bold">{item.artisan?.pay || "0.00"}</span>
                  </p>
                </div>
              </div>
              <div className="cart-icon-wrapper absolute top-0 right-0 sm:relative sm:right-auto sm:top-auto sm:transform-none sm:translate-x-0 sm:translate-y-0">
                  <DryIcon className="cart-icon text-gray-400" style={{ fontSize: 18 }} />
                </div>
              <div className="mt-4 sm:mt-0 sm:flex sm:items-center sm:gap-4">
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300"
                >
                  Remove
                </button>
                <Link
                  to={`/api/artisans-by-service/${encodeURIComponent(item.artisan.service || "")}`}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-300"
                >
                  Add
                </Link>
              </div>
            </div>
          ))}
          <div className="text-right mt-8">
            <h3 className="text-xl font-bold">
              Total: ${Number.isFinite(calculateTotal()) ? calculateTotal().toFixed(2) : "0.00"}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;*/}


  


import React, { useEffect, useState } from "react";
import api from "../../api";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import DryIcon from "@mui/icons-material/Dry";

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
           // Authorization: `Bearer ${token}`,
          //},
        });

        console.log("Response data:", response.data);
        setCartItems(response.data.cart.items || []); // Access items under 'cart'
        setUserData(response.data.user || {});        // Access user data
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
        //headers: {
          //Authorization: `Bearer ${token}`,
        //},
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

  return (
    <div className="container mx-auto px-4 mt-10 mb-20">
      <p className="text-lg font-medium text-gray-700 mb-2">
        Welcome, {userData.first_name || "User"}!
      </p>

      <h1 className="text-2xl font-bold text-center mb-10">Your Cart</h1>

      {loading ? (
        <div>Loading...</div>
      ) : cartItems.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-lg shadow-md mb-4 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center w-full sm:w-auto">
                  <img
                    src={item.artisan?.profile_image || "/default-avatar.png"}
                    alt="Artisan"
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h2 className="font-medium text-lg">{item.artisan?.service || "N/A"}</h2>
                    <p className="text-sm text-gray-600">
                      {item.artisan?.first_name || "Unknown"}{" "}
                      <span>{item.artisan?.last_name}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Location: {item.artisan?.location || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Experience: {item.artisan?.experience || "N/A"} years
                    </p>
                    <p className="text-sm text-gray-800">
                      Pay: ₦
                      <span className="text-black-700 font-bold">
                        {item.artisan?.pay || "0.00"}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="cart-icon-wrapper absolute top-0 right-0 sm:relative sm:right-auto sm:top-auto sm:transform-none sm:translate-x-0 sm:translate-y-0">
                  <DryIcon className="cart-icon text-gray-400" style={{ fontSize: 18 }} />
                </div>
                <div className="mt-4 sm:mt-0 sm:flex sm:items-center sm:gap-4">
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300"
                  >
                    Remove
                  </button>
                  <Link
                    to={`/api/artisans-by-service/${encodeURIComponent(item.artisan.service || "")}`}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-300"
                  >
                    Add
                  </Link>
                </div>
              </div>
            ))}
            <div className="text-right mt-8">
              <h3 className="text-xl font-bold">
                Total: ₦
                {Number.isFinite(calculateTotal()) ? calculateTotal().toFixed(2) : "0.00"}
              </h3>
            </div>
          </div>
          <div className="sticky top-20 bg-gray-100 p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl transform hover:scale-105 w-full lg:w-1/3 max-h-[400px] overflow-y-auto">
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
              <p className="font-bold text-lg">₦{calculateTotal().toFixed(2)}</p>
            </div>
            <div className="flex justify-end">
              <Link
                to={{
                  pathname: "/payment",
                  state: { totalAmount: calculateTotal() },
                }}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-110"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
