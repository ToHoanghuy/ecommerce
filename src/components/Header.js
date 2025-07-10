import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingCart, Menu, X, BookOpen, Bot, User, LogOut, Sparkles } from 'lucide-react';
import { useAppState, useAppDispatch } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import './Header.css';

const Header = ({ onOpenChatbot }) => {
  const navigate = useNavigate();
  const state = useAppState();
  const { dispatch, actionTypes } = useAppDispatch();
  const { isLoggedIn, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');

  const handleSearchChange = (e) => {
    dispatch({ type: actionTypes.SET_SEARCH_TERM, payload: e.target.value });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (state.searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(state.searchTerm.trim())}`);
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleFavoritesClick = () => {
    navigate('/favorites');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAISuggestionsClick = () => {
    if (!isLoggedIn) {
      setAuthModalMode('login');
      setShowAuthModal(true);
    } else {
      navigate('/ai-suggestions');
    }
  };

  const handleLoginClick = () => {
    setAuthModalMode('login');
    setShowAuthModal(true);
  };

  const handleRegisterClick = () => {
    setAuthModalMode('register');
    setShowAuthModal(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <BookOpen className="logo-icon" />
          <span className="logo-text">EduMart</span>
        </div>

        {/* Search Bar - Desktop */}
        <form className="search-container desktop-only" onSubmit={handleSearchSubmit}>
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Tìm kiếm khóa học, giáo trình..."
            value={state.searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </form>

        {/* Navigation Icons */}
        <nav className="nav-icons">
          {/* AI Chatbot */}
          <button 
            className="nav-button"
            onClick={onOpenChatbot}
            title="AI Tư vấn"
          >
            <Bot className="nav-icon" />
            <span className="nav-label">AI Tư vấn</span>
          </button>

          {/* AI Suggestions */}
          <button 
            className="nav-button"
            onClick={handleAISuggestionsClick}
            title="AI Gợi ý"
          >
            <Sparkles className="nav-icon" />
            <span className="nav-label">AI Gợi ý</span>
          </button>

          {/* Favorites */}
          <button 
            className="nav-button"
            onClick={handleFavoritesClick}
            title="Yêu thích"
          >
            <Heart className="nav-icon" />
            {state.favorites.length > 0 && (
              <span className="badge">{state.favorites.length}</span>
            )}
            <span className="nav-label">Yêu thích</span>
          </button>

          {/* Cart */}
          <button 
            className="nav-button"
            onClick={handleCartClick}
            title="Giỏ hàng"
          >
            <ShoppingCart className="nav-icon" />
            {state.cart.length > 0 && (
              <span className="badge">{state.cart.length}</span>
            )}
            <span className="nav-label">Giỏ hàng</span>
          </button>

          {/* User Actions */}
          {isLoggedIn ? (
            <div className="user-menu desktop-only">
              <button className="nav-button user-button" title={user?.name}>
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="user-avatar" />
                ) : (
                  <User className="nav-icon" />
                )}
                <span className="nav-label">{user?.name}</span>
              </button>
              <div className="user-dropdown">
                <button onClick={handleLogout} className="dropdown-item">
                  <LogOut className="dropdown-icon" />
                  Đăng xuất
                </button>
              </div>
            </div>
          ) : (
            <button 
              className="nav-button login-button desktop-only"
              onClick={handleLoginClick}
              title="Đăng nhập"
            >
              <User className="nav-icon" />
              <span className="nav-label">Đăng nhập</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle mobile-only"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <form className="mobile-search" onSubmit={handleSearchSubmit}>
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Tìm kiếm khóa học..."
                value={state.searchTerm}
                onChange={handleSearchChange}
                className="search-input"
              />
            </form>
            
            {/* Mobile User Actions */}
            <div className="mobile-user-actions">
              {isLoggedIn ? (
                <div className="mobile-user-info">
                  <div className="mobile-user-profile">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="user-avatar" />
                    ) : (
                      <User className="nav-icon" />
                    )}
                    <span>{user?.name}</span>
                  </div>
                  <button onClick={handleLogout} className="mobile-logout-btn">
                    <LogOut className="nav-icon" />
                    Đăng xuất
                  </button>
                </div>
              ) : (
                <div className="mobile-auth-buttons">
                  <button onClick={handleLoginClick} className="mobile-auth-btn">
                    Đăng nhập
                  </button>
                  <button onClick={handleRegisterClick} className="mobile-auth-btn secondary">
                    Đăng ký
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        initialMode={authModalMode}
      />
    </header>
  );
};

export default Header;
