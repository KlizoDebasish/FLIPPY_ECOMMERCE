import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setLoading } from "../redux/userSlice";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URI}/cart`, {
        withCredentials: true,
      });
      setCartItems(res.data.cartItems);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch cart items"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId, quantity) => {
    if (quantity <= 0) {
      toast.error("Quantity must be at least 1");
      return;
    }
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URI}/cart/${itemId}`,
        { quantity },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      fetchCartItems(); // Refresh the cart
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update quantity"
      );
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URI}/cart/${itemId}`,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      fetchCartItems(); // Refresh the cart
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to remove item");
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty!</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
              >
                <div className="flex items-center">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-16 h-16 rounded-lg object-cover mr-4"
                  />
                  <div>
                    <h2 className="font-bold text-gray-800">
                      {item.product.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      ₹{item.product.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    className="px-2 py-1 bg-gray-200 text-gray-800 rounded-lg"
                    onClick={() =>
                      handleUpdateQuantity(item._id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 text-gray-800 rounded-lg"
                    onClick={() =>
                      handleUpdateQuantity(item._id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded-lg"
                    onClick={() => handleRemoveItem(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="font-bold text-lg text-gray-800 mb-4">Summary</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Total Items:</span>
              <span>{cartItems.length}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Total Price:</span>
              <span>₹{calculateTotal().toLocaleString("en-IN")}</span>
            </div>
            <button className="w-full py-2 mt-4 bg-blue-500 text-white font-bold rounded-lg">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
