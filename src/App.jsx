import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./Pages/Homepage";
import Card from "./components/Card";
import User from "./components/User"
import Profile from "./components/Profile";
import About from "./components/meun/About";
import Datapro from "./components/meun/datapro";
import Contact from "./components/meun/Contact";
import ProductDetails from "./Pages/ProductDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <div className="app">
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        limit={3}
      />
      <Navbar />
      <Routes>
        {/* Public Route - Login/Signup */}
        <Route path="/user" element={<User />} />
        
        {/* Protected Routes - Require Authentication */}
        <Route path="/" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Card /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="/datapro" element={<ProtectedRoute><Datapro /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
        <Route path="/product-details/:id" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
