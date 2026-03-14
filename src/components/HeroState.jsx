import React from "react";
import { FaLeaf, FaTruck, FaHandshake, FaCheckCircle } from "react-icons/fa"; 
// ✅ បន្ថែម FaCheckCircle នៅទីនេះ

const HeroState = () => {
  // 🔹 បញ្ជី feature cards ដែលបង្ហាញលក្ខណៈពិសេសរបស់សេវា
  const features = [
    {
      icon: <FaLeaf className="text-green-600 text-4xl" />,
      title: "100% Organic",
      desc: "All our produce is grown without harmful chemicals or pesticides.",
      color: "from-green-500 to-emerald-500",
      bg: "from-green-50 to-emerald-50"
    },
    {
      icon: <FaTruck className="text-orange-600 text-4xl" />,
      title: "Fast Delivery",
      desc: "We deliver fresh produce at your doorstep within hours of harvesting.",
      color: "from-orange-500 to-amber-500",
      bg: "from-orange-50 to-amber-50"
    },
    {
      icon: <FaHandshake className="text-amber-600 text-4xl" />,
      title: "Farmer Support",
      desc: "Empowering local farmers with fair trade and sustainable practices.",
      color: "from-amber-500 to-orange-500",
      bg: "from-amber-50 to-orange-50"
    },
    {
      icon: <FaCheckCircle className="text-orange-600 text-4xl" />,
      title: "Quality Assured",
      desc: "Every item is checked for freshness and quality before delivery.",
      color: "from-orange-500 to-red-500",
      bg: "from-orange-50 to-red-50"
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-orange-50/30 to-amber-50/30">
      <div className="max-w-6xl mx-auto text-center px-4">
        {/* ចំណងជើង */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Why Choose Us
        </h2>
        <p className="text-gray-600 text-base sm:text-lg mb-10 max-w-2xl mx-auto">
          Experience the best in quality, service, and commitment
        </p>

        {/* បង្ហាញ Feature Cards ជា Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-orange-100 group relative overflow-hidden"
            >
              {/* Background Gradient Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              {/* Icon Container */}
              <div className={`relative w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${item.bg} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
              
              {/* Decorative Corner */}
              <div className={`absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br ${item.color} rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroState;
