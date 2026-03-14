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
    <div className="max-w-7xl mx-auto mt-[90px] p-6 grid md:grid-cols-3 gap-6 min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Left Section */}
      <div className="md:col-span-2 bg-white shadow-xl rounded-3xl p-6 max-h-[80vh] overflow-y-auto border-2 border-orange-200 hover:shadow-2xl transition-shadow duration-300">
        <div className="flex items-center justify-between mb-6 border-b-2 border-orange-200 pb-4 bg-gradient-to-r from-orange-50 to-amber-50 -mx-6 -mt-6 px-6 pt-6 rounded-t-3xl">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">🛒 Shopping Cart</h1>
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-orange-700 bg-white px-4 py-2 rounded-full shadow-md border-2 border-orange-300">
              Items: ({quantity})
            </h2>
            <button
              onClick={clearCart}
              className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-all p-2 rounded-full border-2 border-red-200 hover:border-red-300 shadow-md hover:shadow-lg"
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
              className="grid grid-cols-4 items-center border-b-2 border-orange-100 py-4 gap-2 hover:bg-orange-50/50 transition-colors duration-200 rounded-lg px-2"
            >
              <div className="flex items-center gap-4">
                <img
                  src={image}
                  alt={name}
                  className="w-16 h-16 object-contain bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg shadow-md p-1 border-2 border-orange-200 hover:shadow-lg transition-all"
                />
                <div>
                  <h3 className="font-bold text-gray-800">{name}</h3>
                  <button
                    onClick={() => removeFromCart(id)}
                    className="flex items-center text-sm text-red-500 hover:text-red-700 font-medium mt-1 hover:underline transition-all"
                  >
                    <FiTrash2 className="mr-1" />
                    Remove
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => decreaseQuantity(id)}
                  className="bg-gradient-to-r from-orange-200 to-amber-200 hover:from-orange-300 hover:to-amber-300 p-2 rounded-full transition-all shadow-md hover:shadow-lg border border-orange-300"
                >
                  <IoMdRemove className="text-orange-700" />
                </button>
                <span className="px-3 py-1 font-bold text-gray-800 bg-orange-50 rounded-lg border-2 border-orange-200 min-w-[40px] text-center">{amount}</span>
                <button
                  onClick={() => increaseQuantity(id)}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 p-2 rounded-full transition-all shadow-md hover:shadow-lg hover:scale-110"
                >
                  <IoMdAdd className="text-white" />
                </button>
              </div>
              <p className="text-center text-gray-700 font-medium">${price.toFixed(2)}</p>
              <p className="text-center text-orange-600 font-bold text-lg">
                ${(price * amount).toFixed(2)}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center mt-8 p-8 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border-2 border-orange-200">
            <p className="text-xl text-gray-600 font-medium">
              {checkoutMessage || "Your cart is empty 🛍️"}
            </p>
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="bg-gradient-to-br from-white to-orange-50/30 shadow-xl rounded-3xl p-6 h-fit border-2 border-orange-200 hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-4 border-b-2 border-orange-200 pb-3">
          🧾 Cart Summary
        </h2>

        <div className="flex justify-between py-3 text-gray-700 font-medium">
          <span>Items:</span>
          <span className="font-bold text-gray-800">{quantity || 0}</span>
        </div>
        <div className="flex justify-between py-3 text-gray-700 font-medium">
          <span>Subtotal:</span>
          <span className="font-bold text-gray-800">${(total || 0).toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-3 text-gray-700 font-medium">
          <span>Shipping Fee:</span>
          <span className="text-orange-500 font-bold">Free</span>
        </div>

        <div className="border-t-2 border-orange-200 mt-4 pt-4 flex justify-between bg-gradient-to-r from-orange-50 to-amber-50 -mx-6 px-6 py-4 rounded-lg">
          <span className="font-bold text-gray-800 text-lg">Total Cost:</span>
          <span className="font-extrabold text-orange-600 text-2xl">${(total || 0).toFixed(2)}</span>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full mt-6 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:via-amber-600 hover:to-orange-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 border-2 border-orange-400"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Card;
