import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "./ShopContext";
import { FiTrash2 } from "react-icons/fi";
import { IoMdAdd, IoMdRemove } from "react-icons/io";

const Card = () => {
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    quantity,
    total,
  } = useContext(ShopContext);

  const [checkoutMessage, setCheckoutMessage] = useState("");

  useEffect(() => {
    document.title = `Shopping Cart (${quantity}) - Foodie`;
  }, [quantity]);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    clearCart();
    setCheckoutMessage("✅ Thank you for your order!");
  };

  return (
    <div className="max-w-7xl mx-auto mt-[90px] p-6 grid md:grid-cols-3 gap-6">
      {/* Left Section */}
      <div className="md:col-span-2 bg-white shadow-lg rounded-2xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-800">🛒 Shopping Cart</h1>
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-medium text-gray-600">
              Items: ({quantity})
            </h2>
            <button
              onClick={clearCart}
              className="text-red-500 hover:text-red-700 transition"
              title="Clear Cart"
            >
              <FiTrash2 size={22} />
            </button>
          </div>
        </div>

        {cart.length > 0 ? (
          cart.map(({ id, name, image, price, amount }) => (
            <div
              key={id}
              className="grid grid-cols-4 items-center border-b py-4 gap-2"
            >
              <div className="flex items-center gap-4">
                <img
                  src={image}
                  alt={name}
                  className="w-16 h-16 object-contain bg-gray-50 rounded-lg shadow p-1"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{name}</h3>
                  <button
                    onClick={() => removeFromCart(id)}
                    className="flex items-center text-sm text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 className="mr-1" />
                    Remove
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => decreaseQuantity(id)}
                  className="bg-gray-200 hover:bg-gray-300 p-1 rounded-full"
                >
                  <IoMdRemove />
                </button>
                <span className="px-2 font-medium">{amount}</span>
                <button
                  onClick={() => increaseQuantity(id)}
                  className="bg-gray-200 hover:bg-gray-300 p-1 rounded-full"
                >
                  <IoMdAdd />
                </button>
              </div>
              <p className="text-center text-gray-700">${price.toFixed(2)}</p>
              <p className="text-center text-gray-800 font-semibold">
                ${(price * amount).toFixed(2)}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-6">
            {checkoutMessage || "Your cart is empty 🛍️"}
          </p>
        )}
      </div>

      {/* Right Section */}
      <div className="bg-white shadow-lg rounded-2xl p-6 h-fit">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
          🧾 Cart Summary
        </h2>

        <div className="flex justify-between py-2 text-gray-600">
          <span>Items:</span>
          <span>{quantity || 0}</span>
        </div>
        <div className="flex justify-between py-2 text-gray-600">
          <span>Subtotal:</span>
          <span>${(total || 0).toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-2 text-gray-600">
          <span>Shipping Fee:</span>
          <span className="text-orange-400 font-medium">Free</span>
        </div>

        <div className="border-t mt-3 pt-3 flex justify-between font-semibold text-gray-800">
          <span>Total Cost:</span>
          <span>${(total || 0).toFixed(2)}</span>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full mt-5 bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Card;
