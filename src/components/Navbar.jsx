import React, { useContext, useEffect, useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiLogOut,
  FiMenu,
  FiPlus,
  FiSearch,
  FiShoppingBag,
  FiStar,
  FiUser,
  FiX,
} from "react-icons/fi";
import { ShopContext } from "./ShopContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/datapro", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const searchFields = [
  { value: "all", label: "All" },
  { value: "name", label: "Name" },
  { value: "category", label: "Category" },
  { value: "id", label: "ID" },
];

const Navbar = () => {
  const {
    quantity,
    searchProducts,
    clearSearch,
    searchTerm,
    isSearchActive,
    activateSearch,
    allProducts,
    addToCart,
    searchByField,
    setSearchByField,
  } = useContext(ShopContext);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSingleProduct, setShowSingleProduct] = useState(false);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if user is logged in
  useEffect(() => {
    const checkLoginStatus = () => {
      const currentUser = localStorage.getItem("foodie_current_user");
      setIsLoggedIn(!!currentUser);
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);

    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  // Sync search input with global search term
  useEffect(() => {
    setSearchInput(searchTerm || "");
  }, [searchTerm]);

  // Generate search suggestions based on input
  useEffect(() => {
    if (searchInput.trim().length > 1) {
      const suggestions = generateSearchSuggestions(searchInput);
      setSearchSuggestions(suggestions);
    } else {
      setSearchSuggestions([]);
    }
  }, [searchInput, searchByField]);

  // Keyboard navigation for single product view
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showSingleProduct) {
        if (e.key === "ArrowRight") {
          nextProduct();
        } else if (e.key === "ArrowLeft") {
          prevProduct();
        } else if (e.key === "Escape") {
          closeSingleProductView();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showSingleProduct, currentProductIndex, searchResults]);

  // Generate search suggestions
  const generateSearchSuggestions = (input) => {
    const lowercasedInput = input.toLowerCase();

    if (searchByField === "name" || searchByField === "all") {
      return allProducts
        .filter((product) => product.name.toLowerCase().includes(lowercasedInput))
        .slice(0, 5);
    } else if (searchByField === "id") {
      const exactMatch = allProducts.find(
        (product) => product.id.toString() === input
      );
      return exactMatch ? [exactMatch] : [];
    } else if (searchByField === "category") {
      return allProducts
        .filter((product) =>
          product.category?.toLowerCase().includes(lowercasedInput)
        )
        .slice(0, 5);
    }

    return [];
  };

  // Perform search
  const performSearch = (searchText) => {
    const lowercasedText = searchText.toLowerCase();

    if (searchByField === "id" && !isNaN(searchText)) {
      const byId = allProducts.find(
        (product) => product.id === parseInt(searchText)
      );
      return byId ? [byId] : [];
    }

    if (searchByField === "name") {
      return allProducts.filter((product) =>
        product.name.toLowerCase().includes(lowercasedText)
      );
    }

    if (searchByField === "category") {
      return allProducts.filter((product) =>
        product.category?.toLowerCase().includes(lowercasedText)
      );
    }

    // Search all fields
    return allProducts.filter((product) =>
      [product.name, product.category, product.description, product.code].some(
        (field) =>
          field && field.toString().toLowerCase().includes(lowercasedText)
      )
    );
  };

  const showAllMenuItems = () => {
    setSearchInput("");
    clearSearch();
    if (location.pathname !== "/datapro") {
      navigate("/datapro");
    } else {
      clearSearch();
    }
    setIsMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      const results = performSearch(searchInput);

      if (results.length > 0) {
        searchProducts(searchInput, searchByField);
        activateSearch();

        if (location.pathname !== "/datapro") {
          navigate("/datapro");
        }

        setIsMobileMenuOpen(false);
      } else {
        const toastId = "search-error";
        if (!toast.isActive(toastId)) {
          toast.error(`No dishes found for “${searchInput}”`, {
            toastId,
            position: "top-center",
            autoClose: 3000,
          });
        }
      }
    }
    setSearchSuggestions([]);
  };

  // Quick search for instant results
  const handleQuickSearch = (searchText, field = "name") => {
    setSearchInput(searchText);
    searchProducts(searchText, field);
    activateSearch();

    if (location.pathname !== "/datapro") {
      navigate("/datapro");
    }
    setIsMobileMenuOpen(false);
    setSearchSuggestions([]);
  };

  const nextProduct = () => {
    setCurrentProductIndex((prev) =>
      prev < searchResults.length - 1 ? prev + 1 : 0
    );
  };

  const prevProduct = () => {
    setCurrentProductIndex((prev) =>
      prev > 0 ? prev - 1 : searchResults.length - 1
    );
  };

  const closeSingleProductView = () => {
    setShowSingleProduct(false);
    setSearchResults([]);
  };

  const handleQuickView = (product) => {
    setSearchResults([product]);
    setCurrentProductIndex(0);
    setShowSingleProduct(true);
    setIsMobileMenuOpen(false);
    setSearchSuggestions([]);
  };

  const handleSuggestionClick = (product) => {
    handleQuickSearch(product.name, "name");
  };

  const handleClearSearch = () => {
    setSearchInput("");
    clearSearch();
    setSearchSuggestions([]);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value.trim().length > 2) {
      const results = performSearch(value);
      if (results.length > 0 && location.pathname === "/datapro") {
        searchProducts(value, searchByField);
        activateSearch();
      }
    } else if (value.trim().length === 0 && location.pathname === "/datapro") {
      clearSearch();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  const toggleSearchField = (field) => {
    setSearchByField(field);
    setSearchSuggestions([]);

    if (searchInput.trim()) {
      handleQuickSearch(searchInput, field);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleLogout = () => {
    localStorage.removeItem("foodie_current_user");
    setIsLoggedIn(false);
    toast.success("You're logged out. See you soon!", {
      position: "top-center",
      autoClose: 2000,
    });
    navigate("/user");
  };

  const getPopularProducts = () =>
    allProducts
      .filter((product) => product.popular)
      .slice(0, 3)
      .map((product) => ({ name: product.name, category: product.category }));

  const getPopularCategories = () => {
    const categories = [...new Set(allProducts.map((p) => p.category))];
    return categories.slice(0, 4);
  };

  const popularProducts = getPopularProducts();
  const popularCategories = getPopularCategories();

  const openProduct = searchResults[currentProductIndex];

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? "border-line bg-cream/90 shadow-[0_8px_24px_-20px_rgba(41,37,36,0.5)] backdrop-blur-md"
          : "border-transparent bg-cream/80 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="grid h-11 w-11 place-items-center rounded-xl text-ink transition-colors hover:bg-white md:hidden"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <FiX className="text-2xl" />
          ) : (
            <FiMenu className="text-2xl" />
          )}
        </button>

        {/* Wordmark */}
        <Link
          to="/"
          className="font-display text-2xl font-extrabold tracking-tight text-ink"
          onClick={handleClearSearch}
        >
          Foodie<span className="text-brand">.</span>
        </Link>

        {/* Desktop links */}
        <ul className="ml-6 hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive =
              link.to === "/"
                ? location.pathname === "/" || location.pathname === "/home"
                : location.pathname === link.to;
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={handleClearSearch}
                  className={`inline-flex h-10 items-center rounded-full px-4 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-white text-ink shadow-card"
                      : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          {/* Desktop search */}
          <div className="relative mr-1 hidden lg:block">
            <form onSubmit={handleSearch} className="relative">
              <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-ink-muted" />
              <input
                type="search"
                aria-label="Search dishes"
                placeholder={
                  searchByField === "name"
                    ? "Search by name…"
                    : searchByField === "category"
                    ? "Search by category…"
                    : searchByField === "id"
                    ? "Search by ID…"
                    : "Search dishes…"
                }
                value={searchInput}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                className="h-11 w-60 rounded-full border border-line bg-white pl-11 pr-10 text-sm text-ink placeholder:text-ink-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30 [&::-webkit-search-cancel-button]:hidden"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-ink-muted transition-colors hover:bg-cream hover:text-ink"
                >
                  <FiX />
                </button>
              )}
            </form>

            {searchSuggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-line bg-white p-1.5 shadow-lift">
                {searchSuggestions.map((product) => (
                  <div
                    key={product.id}
                    className="rounded-xl transition-colors hover:bg-cream"
                  >
                    <button
                      type="button"
                      onClick={() => handleSuggestionClick(product)}
                      className="block w-full px-3 py-2.5 text-left"
                    >
                      <span className="block text-sm font-semibold text-ink">
                        {product.name}
                      </span>
                      <span className="block text-xs text-ink-muted">
                        ${product.price} · {product.category}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuickView(product);
                      }}
                      className="mb-1 ml-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-deep hover:text-ink"
                    >
                      Quick view <FiChevronRight />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/cart"
            onClick={handleClearSearch}
            className="relative grid h-11 w-11 place-items-center rounded-xl text-ink transition-colors hover:bg-white"
            aria-label={`Cart, ${quantity} items`}
          >
            <FiShoppingBag className="text-xl" />
            {quantity > 0 && (
              <span className="absolute right-0.5 top-0.5 grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-brand-strong px-1 text-[11px] font-bold text-white ring-2 ring-cream">
                {quantity}
              </span>
            )}
          </Link>

          <Link
            to={isLoggedIn ? "/profile" : "/user"}
            onClick={handleClearSearch}
            className="grid h-11 w-11 place-items-center rounded-xl text-ink transition-colors hover:bg-white"
            aria-label={isLoggedIn ? "Your profile" : "Log in"}
          >
            <FiUser className="text-xl" />
          </Link>

          {isLoggedIn && (
            <button
              type="button"
              onClick={handleLogout}
              className="hidden h-11 w-11 place-items-center rounded-xl text-ink-soft transition-colors hover:bg-white hover:text-brand-deep sm:grid"
              title="Log out"
              aria-label="Log out"
            >
              <FiLogOut className="text-lg" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile sheet */}
      {isMobileMenuOpen && (
        <div className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-line bg-cream px-4 pb-8 pt-5 md:hidden">
          <form onSubmit={handleSearch} className="relative">
            <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-ink-muted" />
            <input
              type="search"
              aria-label="Search dishes"
              placeholder="Search dishes…"
              value={searchInput}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
              className="h-12 w-full rounded-full border border-line bg-white pl-11 pr-12 text-sm text-ink placeholder:text-ink-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30 [&::-webkit-search-cancel-button]:hidden"
            />
            {searchInput && (
              <button
                type="button"
                onClick={handleClearSearch}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-ink-muted hover:bg-cream hover:text-ink"
              >
                <FiX />
              </button>
            )}
          </form>

          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
              Search by
            </span>
            <div className="flex flex-wrap gap-1.5">
              {searchFields.map((field) => (
                <button
                  key={field.value}
                  type="button"
                  onClick={() => toggleSearchField(field.value)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    searchByField === field.value
                      ? "bg-ink text-cream"
                      : "border border-line bg-white text-ink-soft hover:text-ink"
                  }`}
                >
                  {field.label}
                </button>
              ))}
            </div>
          </div>

          {searchSuggestions.length > 0 && (
            <div className="mt-2 overflow-hidden rounded-2xl border border-line bg-white">
              {searchSuggestions.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => handleSuggestionClick(product)}
                  className="block w-full border-b border-line px-4 py-3 text-left last:border-b-0 hover:bg-cream"
                >
                  <span className="block text-sm font-semibold text-ink">
                    {product.name}
                  </span>
                  <span className="block text-xs text-ink-muted">
                    ${product.price} · {product.category}
                  </span>
                </button>
              ))}
            </div>
          )}

          <ul className="mt-5 space-y-1">
            {navLinks.map((link) => {
              const isActive =
                link.to === "/"
                  ? location.pathname === "/" || location.pathname === "/home"
                  : location.pathname === link.to;
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleClearSearch();
                    }}
                    className={`flex h-12 items-center rounded-xl px-4 text-base font-semibold transition-colors ${
                      isActive
                        ? "bg-white text-ink shadow-card"
                        : "text-ink-soft hover:bg-white hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={showAllMenuItems}
            className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-strong text-sm font-bold text-white transition-colors hover:bg-brand-deep"
          >
            Browse all {allProducts.length} dishes
          </button>

          {isSearchActive && searchTerm && (
            <div className="mt-5 flex items-center justify-between rounded-xl border border-line bg-white px-4 py-3">
              <span className="text-sm text-ink-soft">
                Searching for{" "}
                <span className="font-semibold text-ink">{searchTerm}</span>
              </span>
              <button
                type="button"
                onClick={handleClearSearch}
                className="text-xs font-bold text-brand-deep hover:text-ink"
              >
                Clear
              </button>
            </div>
          )}

          {(popularProducts.length > 0 || popularCategories.length > 0) && (
            <div className="mt-6 space-y-4">
              {popularProducts.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                    Popular now
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {popularProducts.map((product, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleQuickSearch(product.name, "name")}
                        className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-brand hover:text-ink"
                      >
                        {product.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {popularCategories.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                    Categories
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {popularCategories.map((category, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleQuickSearch(category, "category")}
                        className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-brand hover:text-ink"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {isLoggedIn && (
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleLogout();
              }}
              className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-line bg-white text-sm font-semibold text-ink-soft transition-colors hover:text-brand-deep"
            >
              <FiLogOut /> Log out
            </button>
          )}
        </div>
      )}

      {/* Quick view */}
      {showSingleProduct && openProduct && (
        <div className="fixed inset-0 z-[60] grid place-items-center p-4">
          <button
            type="button"
            aria-label="Close quick view"
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            onClick={closeSingleProductView}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${openProduct.name} quick view`}
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-line bg-white p-6 shadow-lift sm:p-8"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-deep">
                  {openProduct.category || "Dish"}
                </p>
                <h2 className="mt-1 font-display text-2xl font-extrabold text-ink">
                  {openProduct.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeSingleProductView}
                aria-label="Close"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:bg-cream hover:text-ink"
              >
                <FiX />
              </button>
            </div>

            {searchResults.length > 1 && (
              <p className="mb-4 text-sm text-ink-muted">
                Showing {currentProductIndex + 1} of {searchResults.length}
                {searchInput && ` for “${searchInput}”`}
              </p>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              <div className="grid h-64 place-items-center rounded-2xl bg-cream p-6">
                {openProduct.image ? (
                  <img
                    src={openProduct.image}
                    alt={openProduct.name}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="font-display text-5xl font-extrabold text-brand/40">
                    {openProduct.name.charAt(0)}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-3xl font-extrabold tabular-nums text-ink">
                    ${Number(openProduct.price).toFixed(2)}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm text-ink-soft">
                    <FiStar className="text-brand" /> 4.5
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {openProduct.description}
                </p>

                <dl className="mt-5 space-y-2 rounded-xl bg-cream p-4 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-ink-muted">Dish ID</dt>
                    <dd className="font-semibold text-ink">
                      #{openProduct.id}
                    </dd>
                  </div>
                  {openProduct.code && (
                    <div className="flex justify-between">
                      <dt className="text-ink-muted">Code</dt>
                      <dd className="font-semibold text-ink">
                        {openProduct.code}
                      </dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-ink-muted">Delivery</dt>
                    <dd className="font-semibold text-ink">About 35 min</dd>
                  </div>
                </dl>

                {isLoggedIn ? (
                  <button
                    type="button"
                    onClick={() => handleAddToCart(openProduct)}
                    className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-strong text-sm font-bold text-white transition-colors hover:bg-brand-deep"
                  >
                    <FiPlus /> Add to cart · ${Number(openProduct.price).toFixed(2)}
                  </button>
                ) : (
                  <Link
                    to="/user"
                    onClick={closeSingleProductView}
                    className="mt-6 inline-flex h-12 items-center justify-center rounded-xl border border-line bg-white text-sm font-bold text-ink transition-colors hover:border-ink/20"
                  >
                    Log in to order
                  </Link>
                )}
              </div>
            </div>

            {searchResults.length > 1 && (
              <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
                <button
                  type="button"
                  onClick={prevProduct}
                  disabled={currentProductIndex === 0}
                  className="inline-flex h-10 items-center gap-1 rounded-full border border-line px-4 text-sm font-semibold text-ink-soft transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <FiChevronLeft /> Previous
                </button>
                <span className="text-sm font-medium text-ink-muted">
                  {currentProductIndex + 1} / {searchResults.length}
                </span>
                <button
                  type="button"
                  onClick={nextProduct}
                  disabled={currentProductIndex === searchResults.length - 1}
                  className="inline-flex h-10 items-center gap-1 rounded-full bg-brand-strong px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next <FiChevronRight />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
