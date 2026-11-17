import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiCalendar,
  FiCheckCircle,
  FiEdit2,
  FiLogOut,
  FiMail,
  FiPhone,
  FiUser,
} from "react-icons/fi";

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
      <div className="grid min-h-screen place-items-center bg-cream px-4">
        <div className="text-center">
          <div
            role="status"
            aria-label="Loading your profile"
            className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-line border-t-brand"
          />
          <p className="mt-4 text-sm font-medium text-ink-soft">
            Loading your profile…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream px-4 pb-20 pt-28 sm:px-6">
      <div className="mx-auto max-w-3xl">
        {successMessage && (
          <div className="mb-5 flex items-center gap-3 rounded-2xl border border-brand/30 bg-brand-tint/40 px-5 py-4 text-ink">
            <FiCheckCircle className="shrink-0 text-lg text-brand-deep" />
            <span className="text-sm font-semibold">{successMessage}</span>
          </div>
        )}

        <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-card">
          {/* Banner */}
          <div className="h-24 bg-brand-strong sm:h-28" aria-hidden="true" />

          <div className="px-5 pb-8 sm:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <span className="-mt-12 grid h-24 w-24 shrink-0 place-items-center rounded-full border-4 border-white bg-ink font-display text-3xl font-extrabold text-cream shadow-card sm:-mt-14 sm:h-28 sm:w-28 sm:text-4xl">
                {getUserInitials()}
              </span>

              <div className="flex flex-wrap gap-2">
                {!isEditing ? (
                  <button
                    onClick={handleEditToggle}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-brand-strong px-4 text-sm font-bold text-white transition-colors hover:bg-brand-deep"
                  >
                    <FiEdit2 /> Edit profile
                  </button>
                ) : (
                  <button
                    onClick={handleEditToggle}
                    className="inline-flex h-10 items-center justify-center rounded-full border border-line px-4 text-sm font-bold text-ink-soft transition-colors hover:border-ink/20 hover:text-ink"
                  >
                    Cancel
                  </button>
                )}

                <button
                  onClick={handleLogout}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-line px-4 text-sm font-bold text-ink-soft transition-colors hover:border-red-200 hover:text-red-600"
                >
                  <FiLogOut /> Log out
                </button>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-deep">
                Foodie member
              </p>
              <h1 className="mt-1 font-display text-2xl font-extrabold text-ink sm:text-3xl">
                {user.firstName} {user.lastName}
              </h1>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-muted">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-brand"
                  aria-hidden="true"
                />
                Active account
              </p>
            </div>

            {!isEditing ? (
              // View Mode
              <dl className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-line bg-cream p-5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-tint text-brand-deep">
                      <FiUser />
                    </span>
                    <dt className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                      First name
                    </dt>
                  </div>
                  <dd className="mt-3 text-base font-semibold text-ink">
                    {user.firstName}
                  </dd>
                </div>

                <div className="rounded-2xl border border-line bg-cream p-5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-tint text-brand-deep">
                      <FiUser />
                    </span>
                    <dt className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                      Last name
                    </dt>
                  </div>
                  <dd className="mt-3 text-base font-semibold text-ink">
                    {user.lastName}
                  </dd>
                </div>

                <div className="rounded-2xl border border-line bg-cream p-5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-tint text-brand-deep">
                      <FiMail />
                    </span>
                    <dt className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                      Email
                    </dt>
                  </div>
                  <dd className="mt-3 break-all text-base font-semibold text-ink">
                    {user.email}
                  </dd>
                </div>

                <div className="rounded-2xl border border-line bg-cream p-5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-tint text-brand-deep">
                      <FiPhone />
                    </span>
                    <dt className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                      Phone
                    </dt>
                  </div>
                  <dd className="mt-3 text-base font-semibold text-ink">
                    {user.phone || "Not provided"}
                  </dd>
                </div>

                <div className="rounded-2xl border border-line bg-cream p-5 sm:col-span-2">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-tint text-brand-deep">
                      <FiCalendar />
                    </span>
                    <dt className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                      Member since
                    </dt>
                  </div>
                  <dd className="mt-3 text-base font-semibold text-ink">
                    {formatDate(user.createdAt)}
                  </dd>
                </div>
              </dl>
            ) : (
              // Edit Mode
              <form onSubmit={handleSaveChanges} className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-ink font-semibold mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={editData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full border border-line rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:border-brand focus:ring-brand/30 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-ink font-semibold mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={editData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full border border-line rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:border-brand focus:ring-brand/30 transition-all duration-200"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-ink font-semibold mb-2">
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={editData.phone}
                      onChange={handleChange}
                      placeholder="+855 12 345 678"
                      className="w-full border border-line rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:border-brand focus:ring-brand/30 transition-all duration-200"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-ink font-semibold mb-2">
                      Email (Cannot be changed)
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="w-full border border-line rounded-xl px-4 py-3 bg-cream text-ink-muted cursor-not-allowed"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl bg-brand-strong text-sm font-bold text-white transition-colors hover:bg-brand-deep"
                >
                  Save changes
                </button>
              </form>
            )}

            {/* Account Stats */}
            <div className="mt-8 border-t border-line pt-6 sm:mt-10 sm:pt-8">
              <h2 className="font-display text-lg font-bold text-ink">
                Account statistics
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
                <div className="rounded-2xl bg-cream p-5">
                  <p className="font-display text-2xl font-extrabold tabular-nums text-ink">
                    0
                  </p>
                  <p className="mt-1 text-xs text-ink-muted">Total orders</p>
                </div>
                <div className="rounded-2xl bg-cream p-5">
                  <p className="font-display text-2xl font-extrabold tabular-nums text-ink">
                    $0.00
                  </p>
                  <p className="mt-1 text-xs text-ink-muted">Total spent</p>
                </div>
                <div className="col-span-2 rounded-2xl bg-cream p-5 md:col-span-1">
                  <p className="flex items-center gap-2 font-display text-2xl font-extrabold text-ink">
                    <span
                      className="h-2 w-2 rounded-full bg-brand"
                      aria-hidden="true"
                    />
                    Active
                  </p>
                  <p className="mt-1 text-xs text-ink-muted">Account status</p>
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
