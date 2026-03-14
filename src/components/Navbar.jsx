import React, { useContext, useEffect, useState } from "react";
import { BiCart, BiUser } from "react-icons/bi";
import { FaBars, FaTimes, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { ShopContext } from "./ShopContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

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
    setSearchByField
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
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if user is logged in
  useEffect(() => {
    const checkLoginStatus = () => {
      const currentUser = localStorage.getItem('foodie_current_user');
      setIsLoggedIn(!!currentUser);
    };

    checkLoginStatus();
    // Listen for storage changes
    window.addEventListener('storage', checkLoginStatus);
    
    return () => window.removeEventListener('storage', checkLoginStatus);
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
        .filter((product) =>
          product.name.toLowerCase().includes(lowercasedInput)
        )
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

  // Show all menu items
  const showAllMenuItems = () => {
    setSearchInput("");
    clearSearch();
    if (location.pathname !== "/datapro") {
      navigate("/datapro");
    } else {
      // If already on menu page, just clear search
      clearSearch();
    }
    setIsMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      const results = performSearch(searchInput);

      if (results.length > 0) {
        // Use the context search function to update global state
        searchProducts(searchInput, searchByField);
        activateSearch();
        
        // Navigate to menu page if not already there
        if (location.pathname !== "/datapro") {
          navigate("/datapro");
        }
        
        // Close mobile menu
        setIsMobileMenuOpen(false);
      } else {
        const toastId = 'search-error';
        if (!toast.isActive(toastId)) {
          toast.error(`❌ No products found for "${searchInput}"`, {
            toastId,
            position: "top-center",
            autoClose: 3000,
            style: {
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: '#fff',
              borderRadius: '12px',
              fontWeight: '600',
            },
          });
        }
      }
    }
    setSearchSuggestions([]);
  };

  // Quick search function for instant results
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

  // Navigation functions for single product view
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
    
    // Auto-search when user types (optional)
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
    
    // If there's search input, perform search with new field
    if (searchInput.trim()) {
      handleQuickSearch(searchInput, field);
    }
  };

  // Add to cart function
  const handleAddToCart = (product) => {
    addToCart(product);
    // Toast notification is handled in ShopContext.addToCart
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('foodie_current_user');
    setIsLoggedIn(false);
    toast.success('👋 Logged out successfully!', {
      position: "top-center",
      autoClose: 2000,
    });
    navigate('/user');
  };

  // Get popular products
  const getPopularProducts = () => {
    return allProducts
      .filter((product) => product.popular)
      .slice(0, 3)
      .map((product) => ({ name: product.name, category: product.category }));
  };

  // Get unique categories
  const getPopularCategories = () => {
    const categories = [...new Set(allProducts.map(product => product.category))];
    return categories.slice(0, 4);
  };

  const popularProducts = getPopularProducts();
  const popularCategories = getPopularCategories();

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8">
        {/* Hamburger for Mobile */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="text-2xl text-gray-800" />
            ) : (
              <FaBars className="text-2xl text-gray-800" />
            )}
          </button>
        </div>

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-orange-600 tracking-tight hover:text-orange-700 transition-colors"
          onClick={handleClearSearch}
        >
          Foodie
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8 text-base font-medium text-gray-700">
          <Link
            to="/"
            className={`hover:text-orange-500 transition-colors ${
              location.pathname === "/" 
                ? "text-orange-600 font-bold border-b-2 border-orange-600 pb-1" 
                : ""
            }`}
            onClick={handleClearSearch}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`hover:text-orange-500 transition-colors ${
              location.pathname === "/about" 
                ? "text-orange-600 font-bold border-b-2 border-orange-600 pb-1" 
                : ""
            }`}
            onClick={handleClearSearch}
          >
            About
          </Link>
          <Link
            to="/datapro"
            className={`hover:text-orange-500 transition-colors ${
              location.pathname === "/datapro" 
                ? "text-orange-600 font-bold border-b-2 border-orange-600 pb-1" 
                : ""
            }`}
            onClick={handleClearSearch}
          >
            Menu
          </Link>
          <Link
            to="/contact"
            className={`hover:text-orange-500 transition-colors ${
              location.pathname === "/contact" 
                ? "text-orange-600 font-bold border-b-2 border-orange-600 pb-1" 
                : ""
            }`}
            onClick={handleClearSearch}
          >
            Contact
          </Link>

          {/* Search Input with Field Selection */}
          <div className="relative">
            <div className="flex items-center space-x-2">
              {/* Search Input */}
              <div className="relative">
                <input
                  type="search"
                  placeholder={
                    searchByField === "name" ? "Search by name..." :
                    searchByField === "category" ? "Search by category..." :
                    searchByField === "id" ? "Search by ID..." :
                    "Search products..."
                  }
                  value={searchInput}
                  onChange={handleSearchChange}
                  onKeyPress={handleKeyPress}
                  className="w-48 rounded-full border border-gray-300 py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500 transition"
                >
                  <FaSearch />
                </button>
                {searchInput && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition text-lg"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Show All Menu Button */}
              <button
                onClick={showAllMenuItems}
                className="px-4 py-2 text-smtransition font-medium"
                title={`Show all ${allProducts.length} menu items`}
              >
              </button>
            </div>

            {/* Search Suggestions */}
            {searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                {searchSuggestions.map((product) => (
                  <div
                    key={product.id}
                    className="border-b border-gray-100 last:border-b-0"
                  >
                    <div
                      onClick={() => handleSuggestionClick(product)}
                      className="px-4 py-3 hover:bg-orange-50 cursor-pointer transition-colors"
                    >
                      <div className="font-medium text-gray-800">
                        {product.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        ${product.price} • {product.category}
                      </div>
                    </div>

                    {/* Quick View Button */}
                    <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuickView(product);
                        }}
                        className="w-full text-xs text-center text-orange-500 hover:text-orange-700 font-medium py-1 transition-colors"
                      >
                        Quick View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ul>

        {/* Icons */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <Link to="/cart" onClick={handleClearSearch}>
            <div className="relative">
              <BiCart className="text-2xl md:text-3xl cursor-pointer hover:text-orange-500 transition-colors" />
              {quantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {quantity}
                </span>
              )}
            </div>
          </Link>

          <Link to={isLoggedIn ? "/profile" : "/user"} onClick={handleClearSearch}>
            <BiUser className="text-2xl md:text-3xl cursor-pointer hover:text-orange-500 transition-colors" />
          </Link>

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="text-2xl md:text-3xl cursor-pointer hover:text-red-500 transition-colors"
              title="Logout"
            >
              <FaSignOutAlt />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4 px-6 space-y-4">
          <Link
            to="/"
            className={`block text-lg font-medium py-2 transition-colors ${
              location.pathname === "/" 
                ? "text-orange-600 font-bold bg-orange-50 px-3 rounded-lg" 
                : "text-gray-800 hover:text-orange-500"
            }`}
            onClick={() => {
              setIsMobileMenuOpen(false);
              handleClearSearch();
            }}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`block text-lg font-medium py-2 transition-colors ${
              location.pathname === "/about" 
                ? "text-orange-600 font-bold bg-orange-50 px-3 rounded-lg" 
                : "text-gray-800 hover:text-orange-500"
            }`}
            onClick={() => {
              setIsMobileMenuOpen(false);
              handleClearSearch();
            }}
          >
            About
          </Link>
          <Link
            to="/datapro"
            className={`block text-lg font-medium py-2 transition-colors ${
              location.pathname === "/datapro" 
                ? "text-orange-600 font-bold bg-orange-50 px-3 rounded-lg" 
                : "text-gray-800 hover:text-orange-500"
            }`}
            onClick={() => {
              setIsMobileMenuOpen(false);
              handleClearSearch();
            }}
          >
            Menu
          </Link>
          <Link
            to="/contact"
            className={`block text-lg font-medium py-2 transition-colors ${
              location.pathname === "/contact" 
                ? "text-orange-600 font-bold bg-orange-50 px-3 rounded-lg" 
                : "text-gray-800 hover:text-orange-500"
            }`}
            onClick={() => {
              setIsMobileMenuOpen(false);
              handleClearSearch();
            }}
          >
            Contact
          </Link>

          {/* Show All Menu Button for Mobile */}
          <div className="pt-2">
            <button
              onClick={showAllMenuItems}
              className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-medium text-base"
            >
              Show All Menu Items ({allProducts.length})
            </button>
          </div>

          {/* Mobile Search */}
          <div className="relative pt-4">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-sm text-gray-600 font-medium">Search by:</span>
              <select
                value={searchByField}
                onChange={(e) => toggleSearchField(e.target.value)}
                className="px-3 py-1 text-xs bg-orange-500 text-white rounded-full hover:bg-orange-600 transition font-medium"
              >
                <option value="all">All</option>
                <option value="name">Name</option>
                <option value="category">Category</option>
                <option value="id">ID</option>
              </select>
            </div>

            <form onSubmit={handleSearch} className="relative">
              <input
                type="search"
                placeholder={
                  searchByField === "name" ? "Search by name..." :
                  searchByField === "category" ? "Search by category..." :
                  searchByField === "id" ? "Search by ID..." :
                  "Search products..."
                }
                value={searchInput}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                className="w-full rounded-full border border-gray-300 py-3 pl-4 pr-12 text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500 transition"
              >
                <FaSearch />
              </button>
              {searchInput && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition text-lg"
                >
                  ×
                </button>
              )}
            </form>

            {/* Mobile Search Suggestions */}
            {searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                {searchSuggestions.map((product) => (
                  <div
                    key={product.id}
                    className="border-b border-gray-100 last:border-b-0"
                  >
                    <div
                      onClick={() => handleSuggestionClick(product)}
                      className="px-4 py-3 hover:bg-orange-50 cursor-pointer transition-colors"
                    >
                      <div className="font-medium text-gray-800">
                        {product.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        ${product.price} • {product.category}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Popular Searches */}
          <div className="space-y-4 pt-4">
            {popularProducts.length > 0 && (
              <div className="text-sm text-gray-600">
                <div className="font-medium mb-2">Popular Items:</div>
                <div className="flex flex-wrap gap-2">
                  {popularProducts.map((product, index) => (
                    <span
                      key={index}
                      onClick={() => handleQuickSearch(product.name, "name")}
                      className="px-3 py-1 bg-gray-100 rounded-full cursor-pointer hover:bg-orange-100 transition-colors text-xs"
                    >
                      {product.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {popularCategories.length > 0 && (
              <div className="text-sm text-gray-600">
                <div className="font-medium mb-2">Categories:</div>
                <div className="flex flex-wrap gap-2">
                  {popularCategories.map((category, index) => (
                    <span
                      key={index}
                      onClick={() => handleQuickSearch(category, "category")}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full cursor-pointer hover:bg-blue-200 transition-colors text-xs"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Show current search term in mobile */}
          {isSearchActive && searchTerm && (
            <div className="text-sm text-gray-600 pt-2 border-t">
              <div className="flex justify-between items-center">
                <span>
                  Active search: "<span className="font-medium">{searchTerm}</span>"
                </span>
                <button 
                  onClick={handleClearSearch}
                  className="text-orange-500 hover:text-orange-700 text-xs font-medium"
                >
                  Clear
                </button>
              </div>
            </div>
          )}

          {/* Mobile Logout Button */}
          {isLoggedIn && (
            <div className="pt-4 border-t mt-4">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium text-base flex items-center justify-center gap-2"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      )}

      {/* Single Product Search View */}
      {showSingleProduct && searchResults.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Background */}
          <div
            className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
            onClick={closeSingleProductView}
          ></div>

          {/* Product Card */}
          <div className="relative bg-gradient-to-br from-white via-orange-50/30 to-amber-50/30 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-orange-200">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {searchResults[currentProductIndex].name}
                </h2>
                <button
                  onClick={closeSingleProductView}
                  className="text-gray-400 hover:text-gray-600 text-2xl transition-colors"
                >
                  ×
                </button>
              </div>

              {/* Results Count */}
              <div className="mb-4 p-3 bg-gradient-to-r from-orange-100 via-amber-100 to-yellow-100 rounded-lg shadow-md border-2 border-orange-200">
                <div className="text-sm font-medium text-orange-900">
                  Showing {currentProductIndex + 1} of {searchResults.length} products
                  {searchInput && ` for "${searchInput}"`}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col items-center">
                  {searchResults[currentProductIndex].image ? (
                    <img
                      src={searchResults[currentProductIndex].image}
                      alt={searchResults[currentProductIndex].name}
                      className="w-full h-64 object-contain bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg shadow-lg p-3 border-2 border-orange-200 hover:shadow-xl transition-all duration-300"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gradient-to-br from-orange-200 via-amber-200 to-yellow-200 rounded-lg flex items-center justify-center shadow-lg border-2 border-orange-300">
                      <span className="text-4xl text-orange-300 font-bold">
                        {searchResults[currentProductIndex].name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-orange-500">
                      ${searchResults[currentProductIndex].price}
                    </span>
                    <span className="ml-2 px-3 py-1 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 text-sm rounded-full font-semibold shadow-md border border-orange-200">
                      {searchResults[currentProductIndex].category}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {searchResults[currentProductIndex].description}
                  </p>

                  <div className="space-y-2 text-sm text-gray-700 bg-gradient-to-br from-orange-50/50 to-amber-50/50 p-4 rounded-lg border-2 border-orange-100 shadow-md">
                    <div className="flex items-center">
                      <span className="font-medium w-20">ID:</span>
                      <span>#{searchResults[currentProductIndex].id}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium w-20">Code:</span>
                      <span>{searchResults[currentProductIndex].code}</span>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => isLoggedIn && handleAddToCart(searchResults[currentProductIndex])}
                    disabled={!isLoggedIn}
                    className={`w-full mt-6 py-4 rounded-xl transition-all duration-300 font-bold text-lg shadow-xl flex items-center justify-center gap-2 border-2 ${
                      isLoggedIn
                        ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white hover:from-orange-600 hover:via-amber-600 hover:to-orange-700 hover:shadow-2xl hover:scale-105 border-orange-400 hover:border-amber-500 cursor-pointer'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60 border-gray-400'
                    }`}
                    title={!isLoggedIn ? "Please login to add items to cart" : ""}
                  >
                    <BiCart className="text-2xl" />
                    {isLoggedIn ? `Add to Cart - $${searchResults[currentProductIndex].price}` : 'Login to Add to Cart'}
                  </button>
                </div>
              </div>

              {/* Navigation */}
              {searchResults.length > 1 && (
                <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={prevProduct}
                    className="flex items-center px-4 py-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg hover:from-gray-300 hover:to-gray-400 disabled:opacity-50 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
                    disabled={currentProductIndex === 0}
                  >
                    ← Previous
                  </button>

                  <span className="text-gray-600 font-medium">
                    {currentProductIndex + 1} / {searchResults.length}
                  </span>

                  <button
                    onClick={nextProduct}
                    className="flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 disabled:opacity-50 transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:scale-105"
                    disabled={currentProductIndex === searchResults.length - 1}
                  >
                    Next →
                  </button>
                </div>
              )}

              {/* View All Results Button */}
              <div className="text-center mt-4">
                <button
                  onClick={() => {
                    closeSingleProductView();
                    handleQuickSearch(searchInput, searchByField);
                  }}
                  className="text-orange-600 hover:text-orange-800 font-semibold transition-colors hover:underline"
                >
                  View All Search Results ({searchResults.length} products)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;