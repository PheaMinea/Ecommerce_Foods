import React from "react";
import hero_img from "../assets/Chef.png";

const Hero = () => {
  return (
    <section className="w-full  bg-gray-50">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 pt-22 items-center px-6 py-20">
        {/* Left Content */}
        <div className="space-y-6 text-center md:text-left">
          <h2 className="text-sm md:text-lg text-orange-600 font-semibold tracking-widest uppercase mt-16 md:mt-0">
            Welcome To Food Empire
          </h2>

          <h1 className="text-2xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            All Happiness Depends On{" "}
            <span className="text-orange-600">A Lovely Dish</span>
          </h1>

          <p className="text-gray-700 text-base md:text-lg max-w-md mx-auto md:mx-0 leading-relaxed">
            From everyday essentials to statement dishes, redefine your taste
            with food that's as bold and unique as you are.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-6">
            <button className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-2xl shadow-lg hover:bg-orange-700 transition transform hover:scale-105">
              Order Now
            </button>
            <button className="px-6 py-3 border border-orange-600 text-orange-600 font-semibold rounded-2xl hover:bg-orange-100 transition transform hover:scale-105">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex justify-center relative">
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-orange-100 rounded-full blur-2xl opacity-50"></div>
          <img
            className="w-[250px] md:w-[300px] drop-shadow-2xl hover:scale-105 transition"
            src={hero_img}
            alt="Delicious Pizza"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
