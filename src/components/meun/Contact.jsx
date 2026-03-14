import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  useEffect(() => {
    document.title = 'Contact Us - Foodie | Get in Touch';
  }, []);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.message) return;

    const toastId = 'contact-form';
    if (!toast.isActive(toastId)) {
      toast.success("✅ Thank you for your message!", {
        toastId,
        position: "top-right",
        autoClose: 3000,
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

    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/50 to-amber-50/50 pt-24 sm:pt-28 pb-12 flex flex-col items-center px-4 sm:px-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
          Contact <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Us</span>
        </h1>
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
          Get in touch with us. We'd love to hear from you!
        </p>
      </div>
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 md:gap-10 bg-white p-6 sm:p-8 rounded-2xl shadow-2xl border-2 border-orange-100 hover:shadow-3xl transition-all duration-300">
        {/* Contact Info */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border-2 border-orange-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="text-orange-600">📞</span> Get in Touch
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <span className="text-orange-600 text-xl mt-0.5">📍</span>
              <div>
                <strong className="text-gray-800">Address:</strong>
                <p className="text-gray-600">123 Foodie Street, Phnom Penh, Cambodia</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <span className="text-orange-600 text-xl mt-0.5">📱</span>
              <div>
                <strong className="text-gray-800">Phone:</strong>
                <p className="text-gray-600">+855 12 345 678</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <span className="text-orange-600 text-xl mt-0.5">✉️</span>
              <div>
                <strong className="text-gray-800">Email:</strong>
                <p className="text-gray-600">contact@foodie.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              className="border-2 border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              className="border-2 border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
              required
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="border-2 border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="border-2 border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            className="border-2 border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 resize-none"
            required
          ></textarea>

          <button
            type="submit"
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>Send Message</span>
            <span>✉️</span>
          </button>
        </form>
      </div>

      {/* Google Map */}
      <div className="w-full max-w-5xl mt-12 rounded-2xl overflow-hidden shadow-md">
        <iframe
          title="DaraPro Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.681376045193!2d104.8990464746716!3d11.556373988644962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109512e4d528a89%3A0x3c41b90597d8a986!2sPhnom%20Penh!5e0!3m2!1sen!2skh!4v1697350000000!5m2!1sen!2skh"
          width="100%"
          height="350"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
