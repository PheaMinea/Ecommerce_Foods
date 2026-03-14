import React, { useEffect } from "react";
import Chef1 from "../../assets/cheffood.jpg";
import Chef2 from "../../assets/viste.jpg";
import { FaShoppingCart, FaLeaf, FaBox, FaTruck } from "react-icons/fa";
import HeroState from "../HeroState";

const AboutUs = () => {
  useEffect(() => {
    document.title = 'About Us - Foodie | Fresh Food Delivery';
  }, []);

  return (
    <section className="bg-gradient-to-b from-orange-50/50 to-amber-50/50 py-16 px-6 pt-24 sm:pt-28 sm:px-10 lg:px-20">
      {/* --- About Us Section --- */}
      <div className="max-w-400 bg-white m-auto shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row items-center md:items-stretch gap-8 border-t-4 border-gradient-to-r from-orange-500 to-amber-500 p-6 sm:p-10 hover:shadow-3xl transition-all duration-300">
        {/* Text Content */}
        <div className="flex-1 flex flex-col justify-center items-center md:items-start">
          <div className="w-full md:w-[70%]">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
              About Us
            </h2>
            <p className="text-orange-600 font-semibold text-lg mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              Fresh. Local. Organic.
            </p>

            <p className="text-gray-700 mb-4 leading-relaxed">
              At <span className="font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Foodie</span>
              , we bring you the freshest organic produce from our local partner
              farms. Our mission:{" "}
              <span className="font-semibold text-gray-800">
                healthy living, sustainable farming, and fair trade.
              </span>
            </p>

            <p className="text-gray-700 leading-relaxed">
              We only work with farms that follow natural, chemical-free
              practices — delivering pure, wholesome food straight to your
              table, guaranteed fresh.
            </p>

            <button className="mt-8 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:from-orange-600 hover:to-amber-600 hover:shadow-xl hover:scale-105 transition-all duration-300">
              Explore Our Story
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="flex-1">
          <img
            src={Chef1}
            alt="Chef preparing food"
            className="rounded-xl w-full object-cover h-64 sm:h-80 md:h-full shadow-md"
          />
        </div>
      </div>

      {/* <HeroState/> */}

      {/* --- Simple Process Section --- */}
      <div className="max-w-400 m-auto mt-16 bg-white shadow-2xl rounded-2xl border-t-4 border-gradient-to-r from-amber-500 to-orange-500 p-6 sm:p-10 hover:shadow-3xl transition-all duration-300">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-gray-900">
          Our Simple Process
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left Image */}
          <div className="flex-1 w-full">
            <img
              src={Chef2}
              alt="Chef in kitchen"
              className="rounded-xl shadow-md w-full object-cover h-64 sm:h-80 md:h-[420px]"
            />
          </div>

          {/* Steps */}
          <div className="flex-1 w-full flex flex-col items-center md:items-start space-y-5">
            <div className="w-full md:w-[70%] space-y-5">
              <Step
                number="01"
                icon={<FaShoppingCart />}
                title="Place Your Order"
                description="Browse our organic range and order in just a few clicks through our secure platform."
              />
              <Step
                number="02"
                icon={<FaLeaf />}
                title="Harvest from Farm"
                description="Our farmers hand-pick only the ripest produce fresh from the field."
              />
              <Step
                number="03"
                icon={<FaBox />}
                title="Eco-Packaging"
                description="We use compostable packaging to preserve freshness and protect the planet."
              />
              <Step
                number="04"
                icon={<FaTruck />}
                title="Quick Delivery"
                description="Your farm-fresh order arrives at your doorstep within hours."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Step Component ---
const Step = ({ number, icon, title, description }) => (
  <div className="flex items-start gap-4 bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-5 shadow-md hover:shadow-xl hover:scale-105 hover:border-orange-300 transition-all duration-300 w-full group">
    <div className="text-orange-600 text-xl sm:text-2xl font-bold flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md group-hover:bg-gradient-to-br group-hover:from-orange-500 group-hover:to-amber-500 group-hover:text-white transition-all duration-300">
      {number}
    </div>
    <div className="text-orange-500 text-2xl mt-1 group-hover:scale-110 transition-transform duration-300">{icon}</div>
    <div>
      <h4 className="font-bold text-gray-800 text-base sm:text-lg group-hover:text-orange-600 transition-colors duration-300">
        {title}
      </h4>
      <p className="text-gray-600 text-sm sm:text-base mt-1 leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

export default AboutUs;
