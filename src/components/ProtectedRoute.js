import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, User } from 'lucide-react';
import AuthModal from './AuthModal';
import './ProtectedRoute.css';

const ProtectedRoute = ({ children, requireAuth = true, showModal = false }) => {
  const { isLoggedIn, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (!loading && requireAuth && !isLoggedIn) {
      if (showModal) {
        setShowAuthModal(true);
      } else {
        // Redirect to auth page with redirect parameter
        const redirect = location.pathname;
        navigate(`/auth?mode=login&redirect=${encodeURIComponent(redirect.slice(1))}`);
      }
    }
  }, [loading, requireAuth, isLoggedIn, showModal, navigate, location.pathname]);

  const handleModalClose = () => {
    setShowAuthModal(false);
    navigate('/');
  };

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="protected-route-loading">
        <div className="loading-spinner"></div>
        <p>Đang kiểm tra đăng nhập...</p>
      </div>
    );
  }

  // If user is not logged in and we're in modal mode
  if (requireAuth && !isLoggedIn && showModal) {
    return (
      <>
        <div className="protected-route-placeholder">
          <div className="protection-message">
            <Lock className="protection-icon" />
            <h2>Tính năng này cần đăng nhập</h2>
            <p>Vui lòng đăng nhập để sử dụng tính năng này</p>
            <button 
              className="login-prompt-btn"
              onClick={() => setShowAuthModal(true)}
            >
              <User />
              Đăng nhập ngay
            </button>
          </div>
        </div>
        <AuthModal 
          isOpen={showAuthModal}
          onClose={handleModalClose}
          initialMode="login"
        />
      </>
    );
  }

  // If user is not logged in and we're in redirect mode, the redirect happens in useEffect
  if (requireAuth && !isLoggedIn) {
    return (
      <div className="protected-route-loading">
        <div className="loading-spinner"></div>
        <p>Đang chuyển hướng...</p>
      </div>
    );
  }

  // User is logged in or auth is not required
  return children;
};

export default ProtectedRoute;
