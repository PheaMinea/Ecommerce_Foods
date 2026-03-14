import React, { useContext } from "react";
import { ShopContext } from "./ShopContext";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaEye, FaStar } from "react-icons/fa";

const ProductList = () => {
  const { products, addToCart } = useContext(ShopContext);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
          🍽️ Our Awesome Dishes
        </h2>
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
          Discover our delicious selection of handcrafted meals
        </p>
      </div>

      {/* Responsive Grid */}
      <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
        {products.map((product) => {
          const { id, image, name, description, price } = product;

          return (
            <div
              key={id}
              className="bg-white w-full max-w-[320px] shadow-lg rounded-2xl overflow-hidden 
              hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 
              border-2 border-orange-100 group relative"
            >
              {/* Image with Link */}
              <div className="relative bg-gradient-to-br from-orange-50 to-amber-50 p-4 overflow-hidden">
                <Link to={`/product-details/${id}`} className="block">
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-56 object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </Link>

                {/* Floating Price Badge */}
                <span className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-amber-500 
                text-white text-base font-bold px-4 py-2 rounded-full shadow-xl 
                backdrop-blur-sm bg-opacity-95 z-10 group-hover:scale-110 transition-transform duration-300">
                  ${price}
                </span>
                
                {/* Rating Badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                  <FaStar className="text-amber-400 text-sm" />
                  <span className="text-gray-800 font-semibold text-sm">4.5</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-4 bg-gradient-to-b from-white to-orange-50/30">
                <div className="min-h-[85px]">
                  <h4 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors duration-300">
                    {name}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                    {description}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  {/* View Details Button */}
                  <Link
                    to={`/product-details/${id}`}
                    className="flex-1 py-3 text-center 
                    bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 
                    font-semibold text-sm tracking-wide border-2 border-orange-200
                    rounded-xl shadow-sm 
                    hover:from-orange-200 hover:to-amber-200 hover:shadow-md hover:border-orange-300
                    active:scale-95 
                    transition-all duration-200 ease-in-out
                    flex items-center justify-center gap-2"
                  >
                    <FaEye className="text-base" />
                    <span>View</span>
                  </Link>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-[2] py-3 
                    bg-gradient-to-r from-orange-500 to-amber-500 text-white
                    font-semibold text-sm tracking-wide
                    rounded-xl shadow-md
                    hover:from-orange-600 hover:to-amber-600 hover:shadow-xl
                    active:scale-95
                    transition-all duration-200 ease-in-out
                    flex items-center justify-center gap-2"
                  >
                    <FaShoppingCart className="text-base" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
