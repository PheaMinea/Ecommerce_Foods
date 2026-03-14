import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-orange-500 via-orange-600 to-amber-400 mt-16 relative overflow-hidden">
      {/* Decorative overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-orange-800/10 to-transparent"></div>
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-3xl text-white font-extrabold mb-3 drop-shadow-lg">Foodie</h2>
            <p className="text-sm text-white/95 leading-6">
              Taste the happiness with every bite. From everyday dishes to gourmet
              delights — we make food that speaks your language.
            </p>
            <div className="flex space-x-4 mt-6">
            <a
              href="#"
              className="p-3 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-amber-400 hover:text-slate-900 transition-all duration-300 hover:scale-110 border border-white/20"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="p-3 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-amber-400 hover:text-slate-900 transition-all duration-300 hover:scale-110 border border-white/20"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="p-3 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-amber-400 hover:text-slate-900 transition-all duration-300 hover:scale-110 border border-white/20"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="p-3 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-amber-400 hover:text-slate-900 transition-all duration-300 hover:scale-110 border border-white/20"
            >
              <FaYoutube />
            </a>
          </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-4 drop-shadow-md">Quick Links</h3>
            <ul className="space-y-2 text-white/90">
            <li>
              <a href="#home" className="hover:text-white hover:translate-x-2 inline-block transition-all duration-300">
                Home
              </a>
            </li>
            <li>
              <a href="#dishes" className="hover:text-white hover:translate-x-2 inline-block transition-all duration-300">
                Dishes
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white hover:translate-x-2 inline-block transition-all duration-300">
                Contact
              </a>
            </li>
            <li>
              <a href="#useapp" className="hover:text-white hover:translate-x-2 inline-block transition-all duration-300">
                Use App
              </a>
            </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-4 drop-shadow-md">Services</h3>
          <ul className="space-y-2 text-white/90">
            <li>
              <a href="#" className="hover:text-white hover:translate-x-2 inline-block transition-all duration-300">
                Food Delivery
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white hover:translate-x-2 inline-block transition-all duration-300">
                Catering
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white hover:translate-x-2 inline-block transition-all duration-300">
                Mobile App
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white hover:translate-x-2 inline-block transition-all duration-300">
                Become a Partner
              </a>
            </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-4 drop-shadow-md">Contact</h3>
            <ul className="space-y-3 text-white/90">
              <li className="flex items-center gap-3 hover:text-white transition-colors duration-300">
                <FaMapMarkerAlt className="text-amber-300" /> Phnom Penh, Cambodia
              </li>
              <li className="flex items-center gap-3 hover:text-white transition-colors duration-300">
                <FaPhoneAlt className="text-amber-300" /> +855 12 345 678
              </li>
              <li className="flex items-center gap-3 hover:text-white transition-colors duration-300">
                <FaEnvelope className="text-amber-300" /> info@foodie.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-amber-400/30 mt-10 py-6 text-center text-white/90 text-sm bg-gradient-to-r from-orange-700/30 via-orange-800/20 to-orange-700/30">
          © {new Date().getFullYear()}{" "}
          <span className="font-bold text-amber-300">Foodie</span>. All Rights
          Reserved. Designed with <span className="text-amber-400">❤️</span> by Food Empire.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
