import React from 'react';
import { Heart, Star, Users, Clock, ShoppingCart, Eye } from 'lucide-react';
import { useAppState, useAppDispatch } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import AIScoreBadge from './AIScoreBadge';
import './CourseCard.css';

const CourseCard = ({ course, onViewDetails }) => {
  const state = useAppState();
  const { dispatch, actionTypes } = useAppDispatch();
  const { showFavorite, showUnfavorite, showSuccess } = useToast();

  const isFavorite = state.favorites.includes(course.id);
  const isInCart = state.cart.includes(course.id);

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      dispatch({ type: actionTypes.REMOVE_FROM_FAVORITES, payload: course.id });
      showUnfavorite(`Đã bỏ yêu thích "${course.name}"`);
    } else {
      dispatch({ type: actionTypes.ADD_TO_FAVORITES, payload: course.id });
      showFavorite(`❤️ Đã thêm "${course.name}" vào yêu thích!`);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!isInCart) {
      dispatch({ type: actionTypes.ADD_TO_CART, payload: course.id });
      showSuccess(`🛒 Đã thêm "${course.name}" vào giỏ hàng!`);
    }
  };

  const handleViewDetails = () => {
    console.log('CourseCard - handleViewDetails called', { course, courseId: course.id });
    dispatch({ type: actionTypes.ADD_TO_VIEW_HISTORY, payload: course.id });
    onViewDetails(course.id || course);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="course-card" onClick={handleViewDetails}>
      <div className="course-image-container">
        <img 
          src={course.image} 
          alt={course.name}
          className="course-image"
          loading="lazy"
        />
        <div className="course-category">{course.category}</div>
        
        {/* AI Score Badge for AI suggestions */}
        {course.isAISuggestion && (
          <AIScoreBadge course={course} />
        )}
        
        <button 
          className={`favorite-button ${isFavorite ? 'favorite' : ''}`}
          onClick={handleToggleFavorite}
          aria-label={isFavorite ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
        >
          <Heart className="heart-icon" />
        </button>
      </div>

      <div className="course-content">
        <h3 className="course-title">{course.name}</h3>
        <p className="course-description">{course.shortDescription}</p>
        
        <div className="course-instructor">
          <span>👨‍🏫 {course.instructor}</span>
        </div>

        <div className="course-stats">
          <div className="stat">
            <Star className="stat-icon" />
            <span>{course.rating}</span>
          </div>
          <div className="stat">
            <Users className="stat-icon" />
            <span>{course.students.toLocaleString()}</span>
          </div>
          <div className="stat">
            <Clock className="stat-icon" />
            <span>{course.duration}</span>
          </div>
        </div>

        <div className="course-footer">
          <div className="course-price-level">
            <div className="course-price">
              {formatPrice(course.price)}
            </div>
            <div className="course-level">
              <span className="level-badge">{course.level}</span>
            </div>
          </div>
          
          <div className="course-actions">
            <button 
              className="view-details-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleViewDetails();
              }}
            >
              <Eye className="action-icon" />
              Xem chi tiết
            </button>
            
            <button 
              className={`add-to-cart-btn ${isInCart ? 'in-cart' : ''}`}
              onClick={handleAddToCart}
              disabled={isInCart}
            >
              <ShoppingCart className="action-icon" />
              {isInCart ? 'Đã thêm' : 'Thêm vào giỏ'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
