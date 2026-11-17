import React, { useRef, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiClock, FiMinus, FiPlus, FiSearch } from "react-icons/fi";
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
    <div>
      {/* Page header */}
      <section className="bg-cream px-4 pb-12 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-deep">
              The menu
            </p>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
              Everything on the menu.
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">
              {displayFoods.length} dishes cooked to order — from slow-cooked
              curries and wood-fired pizza to something sweet at the end.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={scrollToMenu}
                className="inline-flex h-12 items-center rounded-full bg-brand-strong px-6 text-sm font-bold text-white shadow-card transition-colors hover:bg-brand-deep"
              >
                Browse dishes
              </button>
              <span className="inline-flex items-center gap-2 text-sm text-ink-soft">
                <FiClock className="text-brand-deep" /> About 35 min delivery
              </span>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="overflow-hidden rounded-3xl border border-line shadow-card">
              <img
                src={HeroBg}
                alt="Chef preparing a dish in the kitchen"
                className="h-72 w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 rounded-2xl border border-line bg-white px-5 py-4 shadow-lift">
              <p className="font-display text-2xl font-extrabold tabular-nums text-ink">
                {displayFoods.length}+
              </p>
              <p className="text-xs text-ink-muted">dishes available today</p>
            </div>
          </div>
        </div>
      </section>

      {/* Food Menu Section */}
      <section
        ref={menuRef}
        className="min-h-screen border-t border-line bg-cream px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
      >
        <div className="mx-auto mb-8 max-w-7xl">
          {isSearchActive && searchTerm ? (
            <div className="flex flex-col gap-4 rounded-2xl border border-brand/30 bg-brand-tint/40 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="flex items-center gap-2 font-display text-xl font-bold text-ink">
                  <FiSearch className="text-brand-deep" /> Search results
                </h2>
                <p className="mt-1 text-sm text-ink-soft">
                  Showing {displayFoods.length} results for “{searchTerm}”
                  {searchByField &&
                    searchByField !== "all" &&
                    ` in ${searchByField}`}
                </p>
              </div>
              <button
                type="button"
                onClick={handleClearSearch}
                className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-ink px-5 text-sm font-bold text-cream transition-colors hover:bg-ink-soft"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-deep">
                  All dishes
                </p>
                <h2 className="mt-2 font-display text-2xl font-extrabold text-ink sm:text-3xl">
                  Pick something good
                </h2>
              </div>
              <p className="text-sm text-ink-muted">
                {displayFoods.length} items
              </p>
            </div>
          )}
        </div>

        {/* Food Grid */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {displayFoods.length > 0 ? (
            displayFoods.map((food) => {
              const cartQuantity = getCartItemQuantity(food.id);
              const isInCartItem = isInCart(food.id);

              return (
                <article
                  key={food.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <div className="relative bg-cream p-4">
                    <img
                      src={food.img || food.image}
                      alt={food.name}
                      className="h-44 w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      onError={handleImageError}
                      loading="lazy"
                    />
                    {food.category && (
                      <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink-soft ring-1 ring-line">
                        {food.category}
                      </span>
                    )}
                    {cartQuantity > 0 && (
                      <span className="absolute right-3 top-3 grid h-6 min-w-6 place-items-center rounded-full bg-brand-strong px-1.5 text-[11px] font-bold text-white ring-2 ring-cream">
                        {cartQuantity}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="font-display text-base font-bold leading-snug text-ink">
                      {food.name}
                    </h3>
                    {food.description && (
                      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-muted">
                        {food.description}
                      </p>
                    )}

                    <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                      <span className="font-display text-lg font-bold tabular-nums text-ink">
                        ${parseFloat(food.price || 0).toFixed(2)}
                      </span>

                      {isInCartItem ? (
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => decreaseQuantity(food.id)}
                            aria-label={`Remove one ${food.name}`}
                            className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink/25"
                          >
                            <FiMinus />
                          </button>
                          <span className="min-w-6 text-center text-sm font-bold tabular-nums text-ink">
                            {cartQuantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => increaseQuantity(food.id)}
                            aria-label={`Add one ${food.name}`}
                            className="grid h-9 w-9 place-items-center rounded-full bg-brand-strong text-white transition-colors hover:bg-brand-deep"
                          >
                            <FiPlus />
                          </button>
                        </div>
                      ) : isLoggedIn ? (
                        <button
                          type="button"
                          onClick={() => handleAddToCart(food)}
                          className="inline-flex h-9 items-center gap-1.5 rounded-full bg-brand-strong px-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-deep"
                        >
                          <FiPlus /> Add
                        </button>
                      ) : (
                        <Link
                          to="/user"
                          className="inline-flex h-9 items-center rounded-full border border-line px-3.5 text-sm font-bold text-ink transition-colors hover:border-ink/20"
                        >
                          Log in
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="col-span-full flex flex-col items-center rounded-2xl border border-dashed border-line bg-white px-6 py-16 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-cream text-2xl text-ink-muted">
                <FiSearch />
              </span>
              <p className="mt-4 font-display text-xl font-bold text-ink">
                Nothing matched your search
              </p>
              <p className="mt-1 text-sm text-ink-muted">
                Try a different dish name, category or ID.
              </p>
              <button
                type="button"
                onClick={handleClearSearch}
                className="mt-5 inline-flex h-11 items-center rounded-full bg-brand-strong px-5 text-sm font-bold text-white transition-colors hover:bg-brand-deep"
              >
                Show all dishes
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MenuFood;
