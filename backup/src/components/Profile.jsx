import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaCalendar, FaSignOutAlt, FaEdit, FaCheckCircle } from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [editData, setEditData] = useState({
    firstName: "",
    lastName: "",
    phone: ""
  });

  useEffect(() => {
    document.title = 'Profile - Foodie | Your Account';
    
    // Get current user from localStorage
    const currentUser = JSON.parse(localStorage.getItem('foodie_current_user'));
    
    if (!currentUser) {
      // Redirect to login if not logged in
      navigate('/user');
    } else {
      setUser(currentUser);
      setEditData({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        phone: currentUser.phone || ""
      });
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear current user session
    localStorage.removeItem('foodie_current_user');
    navigate('/user');
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setSuccessMessage("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    
    // Update user in localStorage
    const updatedUser = {
      ...user,
      firstName: editData.firstName,
      lastName: editData.lastName,
      phone: editData.phone
    };

    // Update in current user
    localStorage.setItem('foodie_current_user', JSON.stringify(updatedUser));

    // Update in users array
    const users = JSON.parse(localStorage.getItem('foodie_users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('foodie_users', JSON.stringify(users));
    }

    setUser(updatedUser);
    setIsEditing(false);
    setSuccessMessage("Profile updated successfully!");
    
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Get user initials
  const getUserInitials = () => {
    if (!user) return "U";
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 pt-24 sm:pt-28 pb-8 sm:pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-700 shadow-lg animate-bounce">
            <FaCheckCircle className="text-green-500 text-xl" />
            <span className="font-medium text-sm sm:text-base">{successMessage}</span>
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-orange-100">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 h-24 sm:h-32 relative">
            <div className="absolute inset-0 bg-black/5"></div>
            <div className="absolute -bottom-12 sm:-bottom-16 left-4 sm:left-8">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full border-4 border-white shadow-2xl flex items-center justify-center hover:scale-105 transition-transform duration-300">
                <span className="text-3xl sm:text-5xl font-bold text-white">{getUserInitials()}</span>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-16 sm:pt-20 pb-6 sm:pb-8 px-4 sm:px-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-gray-500 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Foodie Member
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {!isEditing ? (
                  <button
                    onClick={handleEditToggle}
                    className="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-xl hover:scale-105 text-sm sm:text-base"
                  >
                    <FaEdit /> <span>Edit Profile</span>
                  </button>
                ) : (
                  <button
                    onClick={handleEditToggle}
                    className="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 bg-gray-400 text-white rounded-xl hover:bg-gray-500 transition-all duration-200 shadow-md hover:scale-105 text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                )}
                
                <button
                  onClick={handleLogout}
                  className="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-xl hover:scale-105 text-sm sm:text-base"
                >
                  <FaSignOutAlt /> <span>Logout</span>
                </button>
              </div>
            </div>

            {!isEditing ? (
              // View Mode
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl p-5 sm:p-6 border border-orange-200 hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                      <FaUser className="text-white text-lg" />
                    </div>
                    <h3 className="font-semibold text-gray-700 text-sm sm:text-base">First Name</h3>
                  </div>
                  <p className="text-gray-800 text-base sm:text-lg font-medium ml-0 sm:ml-13">{user.firstName}</p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl p-5 sm:p-6 border border-orange-200 hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                      <FaUser className="text-white text-lg" />
                    </div>
                    <h3 className="font-semibold text-gray-700 text-sm sm:text-base">Last Name</h3>
                  </div>
                  <p className="text-gray-800 text-base sm:text-lg font-medium ml-0 sm:ml-13">{user.lastName}</p>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-5 sm:p-6 border border-amber-200 hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                      <FaEnvelope className="text-white text-lg" />
                    </div>
                    <h3 className="font-semibold text-gray-700 text-sm sm:text-base">Email</h3>
                  </div>
                  <p className="text-gray-800 text-sm sm:text-base font-medium ml-0 sm:ml-13 break-all">{user.email}</p>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-5 sm:p-6 border border-amber-200 hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                      <FaPhone className="text-white text-lg" />
                    </div>
                    <h3 className="font-semibold text-gray-700 text-sm sm:text-base">Phone</h3>
                  </div>
                  <p className="text-gray-800 text-base sm:text-lg font-medium ml-0 sm:ml-13">{user.phone || "Not provided"}</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-5 sm:p-6 border border-green-200 md:col-span-2 hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <FaCalendar className="text-white text-lg" />
                    </div>
                    <h3 className="font-semibold text-gray-700 text-sm sm:text-base">Member Since</h3>
                  </div>
                  <p className="text-gray-800 text-base sm:text-lg font-medium ml-0 sm:ml-13">{formatDate(user.createdAt)}</p>
                </div>
              </div>
            ) : (
              // Edit Mode
              <form onSubmit={handleSaveChanges} className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={editData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={editData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={editData.phone}
                      onChange={handleChange}
                      placeholder="+855 12 345 678"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Email (Cannot be changed)
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-100 text-gray-500 cursor-not-allowed"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold py-3.5 rounded-xl 
                             hover:from-orange-600 hover:to-amber-600 active:scale-95 transition-all duration-200
                             shadow-lg hover:shadow-xl"
                >
                  Save Changes
                </button>
              </form>
            )}

            {/* Account Stats */}
            <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t-2 border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Account Statistics</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200 hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <p className="text-2xl sm:text-3xl font-bold text-orange-600">0</p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">Total Orders</p>
                </div>
                <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <p className="text-2xl sm:text-3xl font-bold text-amber-600">$0.00</p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">Total Spent</p>
                </div>
                <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 col-span-2 md:col-span-1 hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <p className="text-2xl sm:text-3xl font-bold text-green-600 flex items-center justify-center gap-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                    Active
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">Account Status</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
