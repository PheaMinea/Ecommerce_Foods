import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: ""
  });

  useEffect(() => {
    document.title = isSignUp 
      ? 'Sign Up - Foodie | Create Your Account' 
      : 'Login - Foodie | Sign In to Your Account';
  }, [isSignUp]);

  // Clear messages when switching forms
  useEffect(() => {
    setErrors({});
    setSuccessMessage("");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: ""
    });
  }, [isSignUp]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // At least 6 characters, 1 uppercase, 1 lowercase, 1 number
    return password.length >= 6;
  };

  const validatePhone = (phone) => {
    // Basic phone validation (10-15 digits)
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(phone.replace(/[\s-]/g, ''));
  };

  const validateSignUp = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = "Invalid phone number (10-15 digits)";
    }

    return newErrors;
  };

  const validateLogin = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const validationErrors = validateSignUp();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('foodie_users') || '[]');
    const userExists = users.some(user => user.email === formData.email);

    if (userExists) {
      setErrors({ email: "An account with this email already exists" });
      return;
    }

    // Save user to localStorage
    const newUser = {
      id: Date.now(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password, // In production, hash this!
      phone: formData.phone,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('foodie_users', JSON.stringify(users));
    localStorage.setItem('foodie_current_user', JSON.stringify(newUser));

    setSuccessMessage("Account created successfully! Welcome to Foodie!");
    setTimeout(() => {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: ""
      });
      setIsSignUp(false);
    }, 2000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const validationErrors = validateLogin();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Check credentials
    const users = JSON.parse(localStorage.getItem('foodie_users') || '[]');
    const user = users.find(
      u => u.email === formData.email && u.password === formData.password
    );

    if (!user) {
      setErrors({ general: "Invalid email or password" });
      return;
    }

    // Save current user session
    localStorage.setItem('foodie_current_user', JSON.stringify(user));
    setSuccessMessage(`Welcome back, ${user.firstName}!`);
    
    setTimeout(() => {
      setFormData({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "", phone: "" });
      navigate('/');
    }, 1500);
  };

  const handleSubmit = (e) => {
    if (isSignUp) {
      handleSignUp(e);
    } else {
      handleLogin(e);
    }
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, text: "" };
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    const strengthText = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500", "bg-emerald-500"];
    
    return {
      strength: Math.min(strength, 5),
      text: strengthText[Math.min(strength - 1, 4)] || "",
      color: strengthColors[Math.min(strength - 1, 4)] || "bg-gray-300"
    };
  };

  const passwordStrength = isSignUp ? getPasswordStrength() : null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 px-4 pt-24 pb-8 sm:pt-28 sm:pb-12">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 border border-orange-100">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-2">
          {isSignUp ? "Sign Up for" : "Login to"} <span className="text-orange-600">Foodie</span>
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          {isSignUp ? "Create your account and start ordering" : "Welcome back! Please login to continue"}
        </p>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2 text-green-700">
            <FaCheckCircle className="text-green-500" />
            <span className="text-sm font-medium">{successMessage}</span>
          </div>
        )}

        {/* General Error Message */}
        {errors.general && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700">
            <FaTimesCircle className="text-red-500" />
            <span className="text-sm font-medium">{errors.general}</span>
          </div>
        )}

        {/* Form */}
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1.5 text-sm">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className={`w-full border rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
                  }`}
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1.5 text-sm">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className={`w-full border rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
                  }`}
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>
          )}

          <div>
            <label className="block text-gray-700 font-semibold mb-1.5 text-sm">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john.doe@example.com"
              className={`w-full border rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1.5 text-sm">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`w-full border rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 pr-10 text-sm sm:text-base focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500 transition"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            
            {/* Password Strength Indicator */}
            {isSignUp && formData.password && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                        level <= passwordStrength.strength ? passwordStrength.color : 'bg-gray-200'
                      }`}
                    ></div>
                  ))}
                </div>
                <p className="text-xs text-gray-600">
                  Strength: <span className="font-semibold">{passwordStrength.text}</span>
                </p>
              </div>
            )}
          </div>

          {isSignUp && (
            <div>
              <label className="block text-gray-700 font-semibold mb-1.5 text-sm">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className={`w-full border rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 pr-10 text-sm sm:text-base focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500 transition"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
          )}

          {isSignUp && (
            <div>
              <label className="block text-gray-700 font-semibold mb-1.5 text-sm">
                Phone (Optional)
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+855 12 345 678"
                className={`w-full border rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
                }`}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold py-3 sm:py-3.5 rounded-xl 
                       text-sm sm:text-base hover:from-orange-600 hover:to-amber-600 active:scale-95 transition-all duration-200
                       shadow-lg hover:shadow-xl"
          >
            {isSignUp ? "Create Account" : "Login"}
          </button>
        </form>

        {/* Toggle Form */}
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-orange-600 font-semibold hover:text-orange-700 hover:underline transition-colors duration-200"
            >
              {isSignUp ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>

        {/* Additional Info for Sign Up */}
        {isSignUp && (
          <p className="text-xs text-gray-500 text-center mt-4">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        )}
      </div>
    </div>
  );
};

export default User;
