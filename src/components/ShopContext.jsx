import React, { createContext, useState, useEffect, useMemo } from "react";
import { ProductData } from "../data";
import { toast } from "react-toastify";

// Create a global context for the shop
export const ShopContext = createContext();

// Context provider component
const ShopContextProvider = ({ children }) => {
  // --- State variables ---
  const [products] = useState(ProductData);     // All products from data
  const [cart, setCart] = useState([]);         // Shopping cart items
  const [promoCode, setPromoCode] = useState(""); // Promo code text
  const [isPromoApplied, setIsPromoApplied] = useState(false); // Promo applied or not
  const [searchTerm, setSearchTerm] = useState(""); // User search input
  const [isSearchActive, setIsSearchActive] = useState(false); // Is search active?
  const [searchByField, setSearchByField] = useState("all"); // Search field
  const promoDiscountRate = 0.1; // 10% discount rate

  // --- Field map for search ---
  const fieldMap = {
    name: "name",
    description: "description",
    category: "category",
    code: "code",
    price: "price",
    all: ["name", "description", "category", "code"] // all fields for default search
  };

  // --- Search by one field ---
  const searchByFieldName = (data, searchTerm, fieldName) => {
    const lowercasedTerm = searchTerm.toLowerCase();

    return data.filter(item => {
      if (item[fieldName] && typeof item[fieldName] === 'string') {
        return item[fieldName].toLowerCase().includes(lowercasedTerm);
      }
      return false;
    });
  };

  // --- Search by multiple fields ---
  const searchByMultipleFields = (data, searchTerm, fields) => {
    const lowercasedTerm = searchTerm.toLowerCase();

    return data.filter(item =>
      fields.some(field =>
        item[field] &&
        typeof item[field] === 'string' &&
        item[field].toLowerCase().includes(lowercasedTerm)
      )
    );
  };

  // --- Filter products based on search ---
  const filteredProducts = useMemo(() => {
    if (!searchTerm || !isSearchActive) return products; // If no search, return all

    const lowercasedTerm = searchTerm.toLowerCase();

    // Search by specific field
    if (searchByField !== "all" && fieldMap[searchByField]) {
      if (Array.isArray(fieldMap[searchByField])) {
        return searchByMultipleFields(products, searchTerm, fieldMap[searchByField]);
      } else {
        return searchByFieldName(products, searchTerm, fieldMap[searchByField]);
      }
    }

    // Search all fields by default
    return products.filter(product =>
      Object.values(fieldMap.all).some(field =>
        product[field] &&
        typeof product[field] === 'string' &&
        product[field].toLowerCase().includes(lowercasedTerm)
      )
    );
  }, [products, searchTerm, isSearchActive, searchByField]);

  // --- Decide what products to show (searched or all) ---
  const currentProducts = useMemo(() => {
    return isSearchActive && searchTerm ? filteredProducts : products;
  }, [isSearchActive, searchTerm, filteredProducts, products]);

  // --- Cart totals ---
  const quantity = useMemo(
    () => cart.reduce((sum, item) => sum + item.amount, 0),
    [cart]
  );

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.amount, 0),
    [cart]
  );

  const discountAmount = isPromoApplied ? subtotal * promoDiscountRate : 0;
  const shippingFee = 0;
  const total = subtotal - discountAmount + shippingFee;

  // --- Search control functions ---
  const searchProducts = (term, field = "all") => {
    setSearchTerm(term);
    setSearchByField(field);
    setIsSearchActive(!!term); // active only if user types something
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchByField("all");
    setIsSearchActive(false);
  };

  const activateSearch = () => setIsSearchActive(true);
  const deactivateSearch = () => {
    setIsSearchActive(false);
    setSearchTerm("");
    setSearchByField("all");
  };

  // Update search active state automatically
  useEffect(() => {
    setIsSearchActive(!!searchTerm);
  }, [searchTerm]);

  // --- Cart functions ---
  const addToCart = (product) => {
    setCart(prev => {
      const exist = prev.find(item => item.id === product.id);
      const toastId = `cart-${product.id}`;
      
      if (exist) {
        // If already in cart, increase amount
        if (!toast.isActive(toastId)) {
          toast.success(`🔄 ${product.name} quantity increased!`, {
            toastId,
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            style: {
              background: 'linear-gradient(135deg, #f97316 0%, #f59e0b 100%)',
              color: '#fff',
              borderRadius: '12px',
              fontWeight: '600',
            },
          });
        }
        return prev.map(item =>
          item.id === product.id ? { ...item, amount: item.amount + 1 } : item
        );
      } else {
        // Add new item
        if (!toast.isActive(toastId)) {
          toast.success(`✅ ${product.name} added to cart!`, {
            toastId,
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            style: {
              background: 'linear-gradient(135deg, #f97316 0%, #f59e0b 100%)',
              color: '#fff',
              borderRadius: '12px',
              fontWeight: '600',
              boxShadow: '0 4px 12px rgba(249, 115, 22, 0.4)',
            },
          });
        }
        return [...prev, { ...product, amount: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    const item = cart.find(item => item.id === id);
    const toastId = `remove-${id}`;
    setCart(prev => prev.filter(item => item.id !== id));
    
    if (!toast.isActive(toastId)) {
      toast.info(`🗑️ ${item?.name || 'Item'} removed from cart`, {
        toastId,
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          color: '#fff',
          borderRadius: '12px',
          fontWeight: '600',
        },
      });
    }
  };

  const clearCart = () => {
    setCart([]);
    const toastId = 'clear-cart';
    
    if (!toast.isActive(toastId)) {
      toast.info("🧹 Cart cleared successfully!", {
        toastId,
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
          color: '#fff',
          borderRadius: '12px',
          fontWeight: '600',
        },
      });
    }
  };

  const increaseQuantity = (id) =>
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      )
    );

  const decreaseQuantity = (id) =>
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, amount: Math.max(1, item.amount - 1) } // can't go below 1
          : item
      )
    );

  // --- Promo code function ---
  const applyPromo = () => {
    const toastId = 'promo-code';
    
    if (promoCode.toUpperCase() === "SAVE10") {
      setIsPromoApplied(true);
      if (!toast.isActive(toastId)) {
        toast.success("🎉 Promo applied! You saved 10%", {
          toastId,
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: '#fff',
            borderRadius: '12px',
            fontWeight: '600',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
          },
        });
      }
    } else {
      setIsPromoApplied(false);
      if (!toast.isActive(toastId)) {
        toast.error("❌ Invalid promo code. Try SAVE10", {
          toastId,
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            color: '#fff',
            borderRadius: '12px',
            fontWeight: '600',
          },
        });
      }
    }
  };

  // --- Checkout ---
  const checkout = () => {
    const toastId = 'checkout';
    
    if (!toast.isActive(toastId)) {
      toast.success(`🎊 Order placed! Total: $${total.toFixed(2)}`, {
        toastId,
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          background: 'linear-gradient(135deg, #f97316 0%, #f59e0b 100%)',
          color: '#fff',
          borderRadius: '12px',
          fontWeight: '600',
          fontSize: '16px',
          boxShadow: '0 8px 16px rgba(249, 115, 22, 0.5)',
        },
      });
    }
    
    setTimeout(() => {
      clearCart();
      setPromoCode("");
      setIsPromoApplied(false);
    }, 500);
  };

  // --- Provide all values and functions to other components ---
  return (
    <ShopContext.Provider
      value={{
        // Product data
        products: currentProducts,
        allProducts: products,
        filteredProducts: isSearchActive ? filteredProducts : products,

        // Cart info
        cart,
        quantity,
        subtotal,
        total,
        discountAmount,
        shippingFee,

        // Search info
        searchTerm,
        setSearchTerm,
        searchProducts,
        clearSearch,
        isSearchActive,
        activateSearch,
        deactivateSearch,
        searchByField,
        setSearchByField,

        // Advanced search helpers
        searchByFieldName,
        searchByMultipleFields,
        availableSearchFields: Object.keys(fieldMap),

        // Cart actions
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        applyPromo,
        checkout,

        // Promo info
        promoCode,
        setPromoCode,
        isPromoApplied,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
