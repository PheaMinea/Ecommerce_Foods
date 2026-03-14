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
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/cart" element={<Card />} />
        <Route path="/user" element={<User />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/datapro" element={<Datapro />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
