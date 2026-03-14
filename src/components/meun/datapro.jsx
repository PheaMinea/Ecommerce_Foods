import React, { useRef, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../ShopContext";
import HeroBg from "../../assets/cheffood.jpg";
import Food1 from "../../assets/Food1.png";
import Food2 from "../../assets/Food2.png";
import Food3 from "../../assets/Food3.png";
import Food4 from "../../assets/Food4.png";
import Food5 from "../../assets/Food5.png";
import Food6 from "../../assets/Food6.png";
import Food7 from "../../assets/Food7.png";
import Food8 from "../../assets/Food8.png";
import Food9 from "../../assets/Food9.png";
import Food10 from "../../assets/Food10.png";
import Food11 from "../../assets/Food11.png";
import Food12 from "../../assets/Food12.png";
import Food13 from "../../assets/Food13.png";
import Food14 from "../../assets/Food14.png";
import Food15 from "../../assets/Food15.png";
import Food16 from "../../assets/Food16.png";
import Food17 from "../../assets/Food17.png";
import Food18 from "../../assets/Food18.png";
import Food19 from "../../assets/Food19.png";
import Food20 from "../../assets/Food20.png";

const MenuFood = () => {
  const menuRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const {
    products,
    searchTerm,
    isSearchActive,
    clearSearch,
    searchByField,
    addToCart,
    cart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(ShopContext);

  useEffect(() => {
    document.title = 'Menu - Foodie | Browse Our Delicious Food';
  }, []);

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

  const foods = [
    {
      id: 1,
      name: "Best Special Rice",
      price: 8.99,
      img: Food1,
      category: "Main Course",
      description: "Steamed jasmine rice served with a special homemade sauce.",
    },
    {
      id: 2,
      name: "Spicy Chicken Noodles",
      price: 10.49,
      img: Food2,
      category: "Noodles",
      description: "Hot and spicy chicken noodles with mixed vegetables.",
    },
    {
      id: 3,
      name: "Grilled Chicken Breast",
      price: 6.99,
      img: Food3,
      category: "Grill",
      description: "Tender chicken breast grilled with herbs and garlic butter.",
    },
    {
      id: 4,
      name: "Garden Fresh Salad",
      price: 9.99,
      img: Food4,
      category: "Salad",
      description: "Crisp lettuce, tomatoes, cucumbers, and house dressing.",
    },
    {
      id: 5,
      name: "Classic Beef Steak",
      price: 7.99,
      img: Food5,
      category: "Steak",
      description: "Juicy beef steak cooked to perfection with pepper sauce.",
    },
    {
      id: 6,
      name: "Seafood Tom Yum Soup",
      price: 8.49,
      img: Food6,
      category: "Soup",
      description: "Spicy and sour Thai-style seafood soup with lemongrass.",
    },
    {
      id: 7,
      name: "Grilled Salmon Fillet",
      price: 11.49,
      img: Food7,
      category: "Seafood",
      description: "Salmon grilled with lemon butter and fresh herbs.",
    },
    {
      id: 8,
      name: "Premium Ribeye Steak",
      price: 13.99,
      img: Food8,
      category: "Steak",
      description: "Premium ribeye steak served with mashed potatoes.",
    },
    {
      id: 9,
      name: "Thai Chicken Curry",
      price: 15.99,
      img: Food9,
      category: "Curry",
      description: "Rich coconut curry with tender chicken and spices.",
    },
    {
      id: 10,
      name: "Vegetable Fried Rice",
      price: 14.49,
      img: Food10,
      category: "Rice",
      description: "Fried rice with mixed vegetables and soy seasoning.",
    },
    {
      id: 11,
      name: "Spicy Beef Noodles",
      price: 7.49,
      img: Food11,
      category: "Noodles",
      description: "Stir-fried noodles with beef and spicy chili sauce.",
    },
    {
      id: 12,
      name: "Mango Sticky Rice",
      price: 6.99,
      img: Food12,
      category: "Dessert",
      description: "Sweet ripe mango served with coconut sticky rice.",
    },
    {
      id: 13,
      name: "Margherita Pizza",
      price: 11.99,
      img: Food13,
      category: "Pizza",
      description: "Classic Italian pizza with tomato, mozzarella, and basil.",
    },
    {
      id: 14,
      name: "Herb Grilled Chicken",
      price: 9.49,
      img: Food14,
      category: "Grill",
      description: "Grilled chicken marinated with rosemary and olive oil.",
    },
    {
      id: 15,
      name: "Vegetable Spring Rolls",
      price: 12.99,
      img: Food15,
      category: "Appetizer",
      description: "Crispy fried rolls stuffed with mixed vegetables.",
    },
    {
      id: 16,
      name: "Classic Beef Burger",
      price: 8.99,
      img: Food16,
      category: "Burger",
      description: "Grilled beef patty with cheese, lettuce, and tomato.",
    },
    {
      id: 17,
      name: "Traditional Pad Thai",
      price: 10.99,
      img: Food17,
      category: "Noodles",
      description: "Thai stir-fried rice noodles with shrimp, tofu, and peanuts.",
    },
    {
      id: 18,
      name: "Caesar Salad",
      price: 7.49,
      img: Food18,
      category: "Salad",
      description: "Fresh romaine lettuce with Caesar dressing and croutons.",
    },
    {
      id: 19,
      name: "Crispy Fish Tacos",
      price: 8.99,
      img: Food19,
      category: "Tacos",
      description: "Soft tacos filled with crispy fish, cabbage, and lime sauce.",
    },
    {
      id: 20,
      name: "Mushroom Risotto",
      price: 9.49,
      img: Food20,
      category: "Rice",
      description: "Creamy Italian rice cooked with mushrooms and parmesan.",
    },
  ];

  const displayFoods = products && products.length > 0 ? products : foods;

  const getCartItemQuantity = (id) => {
    const item = cart.find((item) => item.id === id);
    return item ? item.amount : 0;
  };

  const isInCart = (id) => {
    return cart.some((item) => item.id === id);
  };

  const handleAddToCart = (food) => {
    addToCart(food);
  };

  const scrollToMenu = () => {
    if (menuRef.current) {
      menuRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClearSearch = () => {
    clearSearch();
  };

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
    e.target.alt = "Image not available";
  };

  return (
    <div className="mt-[70px]">
      {/* Hero Section */}
      <div
        className="relative w-full h-[80vh] flex flex-col justify-center items-center text-white text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${HeroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        <div className="relative z-10 max-w-2xl px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            🍕 Welcome to <span className="text-amber-400">Foodie Menu</span>
          </h1>
          <p className="text-xl mb-8 text-gray-200">
            Discover {displayFoods.length}+ delicious food items
          </p>
          <button
            onClick={scrollToMenu}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 px-8 py-3 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            Explore Menu
          </button>
        </div>
      </div>

      {/* Food Menu Section */}
      <div ref={menuRef} className="p-8 bg-gradient-to-b from-orange-50/30 to-amber-50/30 min-h-screen">
        <div className="max-w-7xl mx-auto mb-8">
          {isSearchActive && searchTerm ? (
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-5 mb-6 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-orange-800 mb-2 flex items-center gap-2">
                    <span>🔍</span> Search Results
                  </h2>
                  <p className="text-orange-600">
                    Showing {displayFoods.length} results for "{searchTerm}"
                    {searchByField && searchByField !== "all" && ` in ${searchByField}`}
                  </p>
                </div>
                <button
                  onClick={handleClearSearch}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-5 py-2.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 font-semibold"
                >
                  Clear Search
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
                🍽️ Our Food Menu
              </h2>
              <p className="text-gray-600 text-base sm:text-lg">
                Total {displayFoods.length} delicious items available
              </p>
            </div>
          )}
        </div>

        {/* Food Grid */}
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayFoods.length > 0 ? (
            displayFoods.map((food) => {
              const cartQuantity = getCartItemQuantity(food.id);
              const isInCartItem = isInCart(food.id);

              return (
                <div
                  key={food.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:transform hover:-translate-y-2 border-2 border-orange-100 group"
                >
                  <div className="relative bg-gradient-to-br from-orange-50 to-amber-50 p-3">
                    <img
                      src={food.img || food.image}
                      alt={food.name}
                      className="w-full h-48 object-contain group-hover:scale-110 transition-transform duration-500"
                      onError={handleImageError}
                      loading="lazy"
                    />
                    {food.category && (
                      <span className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                        {food.category}
                      </span>
                    )}
                    {cartQuantity > 0 && (
                      <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg animate-pulse">
                        {cartQuantity}
                      </div>
                    )}
                  </div>
                  <div className="p-4 bg-gradient-to-b from-white to-orange-50/30">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors duration-300">
                      {food.name}
                    </h3>
                    {food.description && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {food.description}
                      </p>
                    )}
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-orange-600 font-bold text-xl bg-orange-50 px-3 py-1 rounded-lg">
                        ${parseFloat(food.price || 0).toFixed(2)}
                      </span>
                      {food.code && (
                        <span className="text-gray-500 text-xs bg-gray-100 px-2 py-1 rounded">#{food.code}</span>
                      )}
                    </div>

                    {isInCartItem ? (
                      <div className="flex items-center justify-between gap-2">
                        <button
                          onClick={() => decreaseQuantity(food.id)}
                          className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl flex items-center justify-center hover:from-red-600 hover:to-red-700 hover:scale-110 transition-all duration-300 shadow-md font-bold text-lg"
                        >
                          -
                        </button>
                        <span className="flex-1 text-center font-bold text-orange-600 bg-orange-50 py-2 rounded-lg">
                          {cartQuantity} in Cart
                        </span>
                        <button
                          onClick={() => increaseQuantity(food.id)}
                          className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl flex items-center justify-center hover:from-orange-600 hover:to-amber-600 hover:scale-110 transition-all duration-300 shadow-md font-bold text-lg"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => isLoggedIn && handleAddToCart(food)}
                        disabled={!isLoggedIn}
                        className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 shadow-md ${
                          isLoggedIn
                            ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white transform hover:scale-105 hover:shadow-lg cursor-pointer'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
                        }`}
                        title={!isLoggedIn ? "Please login to add items to cart" : "Add to Cart"}
                      >
                        {isLoggedIn ? 'Add to Cart' : 'Login First'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-500 text-lg">
                <p className="text-2xl mb-2">😔 No items found</p>
                <p>Try adjusting your search criteria</p>
                <button
                  onClick={handleClearSearch}
                  className="mt-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-semibold"
                >
                  Show All Items
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuFood;
