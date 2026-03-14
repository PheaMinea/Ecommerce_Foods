import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../components/ShopContext";
import { useParams, Link } from "react-router-dom";
import { ProductData } from "../data";
import { BiCart } from "react-icons/bi";
import { FaArrowLeft, FaStar, FaShoppingCart } from "react-icons/fa";

const ProductDetails = () => {
  const { addToCart } = useContext(ShopContext);
  const { id } = useParams();
  const product = ProductData.find((p) => p.id === parseInt(id));

  const [mainImage, setMainImage] = useState(product ? product.image : "");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const checkLoginStatus = () => {
      const currentUser = localStorage.getItem('foodie_current_user');
      setIsLoggedIn(!!currentUser);
    };

    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    
    return () => window.removeEventListener('storage', checkLoginStatus);
  }, []);

  useEffect(() => {
    if (product) {
      document.title = `${product.name} - Foodie`;
    } else {
      document.title = 'Product Not Found - Foodie';
    }
  }, [product]);

  const handleAddToCart = () => {
    addToCart(product);
    // Toast notification is handled in ShopContext
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center border-2 border-orange-100">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <FaArrowLeft /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/50 to-amber-50/50 py-8 sm:py-12 px-4">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto mb-6 mt-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 transition-colors group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Products
        </Link>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10 border-2 border-orange-100">
        {/* LEFT: Image Section */}
        <div className="flex-1 flex flex-col items-center lg:sticky lg:top-24">
          <div className="w-full max-w-md bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl overflow-hidden shadow-xl p-4 border-2 border-orange-200">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-[350px] object-contain transition-transform duration-500 hover:scale-110"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-5 flex-wrap justify-center">
            {[product.image, product.image1, product.image2, product.image3].map(
              (img, index) =>
                img && (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.name}-${index}`}
                    onClick={() => setMainImage(img)}
                    className={`w-20 h-20 sm:w-20 sm:h-24 object-contain bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl cursor-pointer border-2 transition-all duration-300 p-2 hover:scale-110 ${
                      mainImage === img
                        ? "border-orange-500 ring-2 ring-orange-300 shadow-lg"
                        : "border-orange-200 hover:border-orange-400 shadow-md"
                    }`}
                  />
                )
            )}
          </div>
        </div>

        {/* RIGHT: Info */}
        <div className="flex-1 w-full">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar key={star} className="text-amber-400 text-lg" />
              ))}
            </div>
            <span className="text-gray-600 font-medium">(4.5)</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">128 reviews</span>
          </div>

          {/* Category Badge */}
          {product.category && (
            <div className="inline-block mb-4">
              <span className="px-4 py-1.5 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 rounded-full text-sm font-semibold border-2 border-orange-200">
                {product.category}
              </span>
            </div>
          )}

          {/* Description */}
          <div className="bg-gradient-to-br from-orange-50/50 to-amber-50/50 rounded-xl p-5 mb-6 border border-orange-100">
            <h3 className="font-bold text-gray-800 mb-2 text-lg">Description</h3>
            <p className="text-gray-700 text-base leading-relaxed">
              {product.description || product.discription}
            </p>
            <p className="text-gray-600 mt-3 text-sm italic">
              🍴 This dish is flavorful, easy to enjoy, and perfect for any mealtime.
            </p>
          </div>

          {/* Price and Discount */}
          <div className="bg-white rounded-xl p-5 mb-6 border-2 border-orange-200 shadow-md">
            <p className="text-gray-500 text-sm mb-1">Regular Price</p>
            <p className="text-gray-400 text-xl line-through mb-2">
              ${product.price.toFixed(2)}
            </p>
            <div className="flex items-baseline gap-3">
              <p className="text-orange-600 text-4xl sm:text-5xl font-bold">
                ${(product.price * 0.9).toFixed(2)}
              </p>
              <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold rounded-full shadow-md animate-pulse">
                10% OFF
              </span>
            </div>
            <p className="text-green-600 text-sm mt-2 font-medium">✔️ You save ${(product.price * 0.1).toFixed(2)}!</p>
          </div>

          {/* Buttons */}
          <button
            onClick={() => isLoggedIn && handleAddToCart()}
            disabled={!isLoggedIn}
            className={`w-full px-6 py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-3 ${
              isLoggedIn
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white hover:shadow-xl hover:scale-105 cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
            }`}
            title={!isLoggedIn ? "Please login to add items to cart" : "Add to Cart"}
          >
            <FaShoppingCart size={24} /> {isLoggedIn ? 'Add to Cart' : 'Login to Add to Cart'}
          </button>

          {/* Additional Info */}
          <div className="mt-6 grid grid-cols-2 gap-4 text-center">
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <p className="text-green-600 font-bold text-lg">✓ In Stock</p>
              <p className="text-gray-600 text-sm mt-1">Ready to ship</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <p className="text-blue-600 font-bold text-lg">🚚 Free Shipping</p>
              <p className="text-gray-600 text-sm mt-1">On orders over $50</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProductDetails;
