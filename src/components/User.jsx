import React, { useState, useEffect } from "react";
import {
  FiAlertCircle,
  FiCheck,
  FiCheckCircle,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
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
    const strengthColors = [
      "bg-red-500",
      "bg-brand-strong",
      "bg-brand",
      "bg-emerald-500",
      "bg-emerald-600",
    ];

    return {
      strength: Math.min(strength, 5),
      text: strengthText[Math.min(strength - 1, 4)] || "",
      color: strengthColors[Math.min(strength - 1, 4)] || "bg-line",
    };
  };

  const passwordStrength = isSignUp ? getPasswordStrength() : null;

  return (
    <div className="min-h-screen bg-cream px-4 pb-16 pt-28 sm:px-6 lg:pt-32">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-line bg-white shadow-card lg:grid-cols-2">
        {/* Brand panel */}
        <aside className="hidden flex-col justify-between bg-ink p-10 lg:flex">
          <div>
            <p className="font-display text-2xl font-extrabold tracking-tight text-cream">
              Foodie<span className="text-brand">.</span>
            </p>
            <h2 className="mt-12 font-display text-3xl font-extrabold leading-tight text-cream">
              Good food is one sign-up away.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cream/70">
              Save your details once and check out in a couple of taps next
              time.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-cream/80">
              <li className="flex items-center gap-2.5">
                <FiCheck className="shrink-0 text-brand" /> Fresh dishes from
                local kitchens
              </li>
              <li className="flex items-center gap-2.5">
                <FiCheck className="shrink-0 text-brand" /> Free delivery on
                orders over $25
              </li>
              <li className="flex items-center gap-2.5">
                <FiCheck className="shrink-0 text-brand" /> Hot at your door in
                about 35 minutes
              </li>
            </ul>
          </div>

          <figure className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-5">
            <blockquote className="text-sm leading-relaxed text-cream/80">
              “Ordered at 12:04. Eating by 12:38 — and it was still hot.”
            </blockquote>
            <figcaption className="mt-3 text-xs text-cream/50">
              Sokha · Phnom Penh
            </figcaption>
          </figure>
        </aside>

        {/* Form panel */}
        <div className="p-6 sm:p-8 md:p-10">
          <div className="mb-6">
            <h1 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
              {isSignUp ? "Create your account" : "Welcome back"}
            </h1>
            <p className="mt-1 text-sm text-ink-muted">
              {isSignUp
                ? "Sign up to start ordering in under a minute."
                : "Log in to pick up where you left off."}
            </p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-4 flex items-center gap-2.5 rounded-xl border border-brand/30 bg-brand-tint/40 p-4 text-ink">
              <FiCheckCircle className="shrink-0 text-lg text-brand-deep" />
              <span className="text-sm font-semibold">{successMessage}</span>
            </div>
          )}

          {/* General Error Message */}
          {errors.general && (
            <div className="mb-4 flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
              <FiAlertCircle className="shrink-0 text-lg" />
              <span className="text-sm font-semibold">{errors.general}</span>
            </div>
          )}

        {/* Form */}
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-ink font-semibold mb-1.5 text-sm">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className={`w-full border rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-line focus:border-brand focus:ring-brand/30'
                  }`}
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-ink font-semibold mb-1.5 text-sm">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className={`w-full border rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-line focus:border-brand focus:ring-brand/30'
                  }`}
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>
          )}

          <div>
            <label className="block text-ink font-semibold mb-1.5 text-sm">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john.doe@example.com"
              className={`w-full border rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-line focus:border-brand focus:ring-brand/30'
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-ink font-semibold mb-1.5 text-sm">
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
                  errors.password ? 'border-red-500 focus:ring-red-500' : 'border-line focus:border-brand focus:ring-brand/30'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-brand-deep transition"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
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
                        level <= passwordStrength.strength ? passwordStrength.color : 'bg-line'
                      }`}
                    ></div>
                  ))}
                </div>
                <p className="text-xs text-ink-soft">
                  Strength: <span className="font-semibold">{passwordStrength.text}</span>
                </p>
              </div>
            )}
          </div>

          {isSignUp && (
            <div>
              <label className="block text-ink font-semibold mb-1.5 text-sm">
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
                    errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-line focus:border-brand focus:ring-brand/30'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-brand-deep transition"
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
          )}

          {isSignUp && (
            <div>
              <label className="block text-ink font-semibold mb-1.5 text-sm">
                Phone (Optional)
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+855 12 345 678"
                className={`w-full border rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-line focus:border-brand focus:ring-brand/30'
                }`}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl bg-brand-strong text-sm font-bold text-white transition-colors hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSignUp ? "Create account" : "Log in"}
          </button>
        </form>

        {/* Toggle Form */}
        <div className="text-center mt-6">
          <p className="text-ink-soft text-sm">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-brand-deep font-semibold hover:text-ink hover:underline transition-colors duration-200"
            >
              {isSignUp ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>

          {/* Additional Info for Sign Up */}
          {isSignUp && (
            <p className="mt-4 text-center text-xs text-ink-muted">
              By signing up, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
