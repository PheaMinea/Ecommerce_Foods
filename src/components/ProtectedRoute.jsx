import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('foodie_current_user');
    setIsAuthenticated(!!currentUser);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-cream px-4">
        <div className="text-center">
          <div
            role="status"
            aria-label="Loading"
            className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-line border-t-brand"
          />
          <p className="mt-4 text-sm font-medium text-ink-soft">Loading…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/user" replace />;
  }

  return children;
};

export default ProtectedRoute;
