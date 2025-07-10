import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Trash2, BookOpen, CreditCard } from 'lucide-react';
import { useAppState, useAppDispatch } from '../context/AppContext';
import { coursesAPI } from '../services/api';
import { CourseCardSkeleton } from '../components/LoadingSkeleton';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const state = useAppState();
  const { dispatch, actionTypes } = useAppDispatch();
  
  const [cartCourses, setCartCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCartCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (state.cart.length === 0) {
          setCartCourses([]);
          setLoading(false);
          return;
        }

        // Load cart courses from API
        const courses = await Promise.all(
          state.cart.map(courseId => coursesAPI.getCourseById(courseId))
        );
        
        setCartCourses(courses.filter(course => course !== null));
      } catch (err) {
        setError('Không thể tải giỏ hàng. Vui lòng thử lại.');
        console.error('Error loading cart courses:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCartCourses();
  }, [state.cart]);

  const handleViewDetails = (course) => {
    navigate(`/course/${course.id}`);
  };

  const removeFromCart = (courseId) => {
    dispatch({ type: actionTypes.REMOVE_FROM_CART, payload: courseId });
  };

  const clearCart = () => {
    state.cart.forEach(courseId => {
      dispatch({ type: actionTypes.REMOVE_FROM_CART, payload: courseId });
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const totalPrice = cartCourses.reduce((sum, course) => sum + course.price, 0);

  if (loading) {
    return (
      <div className="cart-page page-transition">
        <div className="container">
          <button className="back-button" onClick={() => navigate(-1)}>
            <ArrowLeft className="back-icon" />
            <span>Quay lại</span>
          </button>

          <div className="cart-header">
            <div className="cart-title">
              <ShoppingCart className="cart-icon" />
              <h1>Giỏ hàng của bạn</h1>
            </div>
          </div>

          <div className="cart-items">
            {[1, 2, 3].map(i => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cart-page page-transition">
        <div className="container">
          <button className="back-button" onClick={() => navigate(-1)}>
            <ArrowLeft className="back-icon" />
            <span>Quay lại</span>
          </button>

          <div className="error-page">
            <div className="error-content">
              <h2>⚠️ Có lỗi xảy ra</h2>
              <p>{error}</p>
              <button 
                className="retry-button"
                onClick={() => window.location.reload()}
              >
                Thử lại
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page page-transition">
      <div className="container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft className="back-icon" />
          <span>Quay lại</span>
        </button>

        <div className="cart-header">
          <div className="cart-title">
            <ShoppingCart className="cart-icon" />
            <h1>Giỏ hàng của bạn</h1>
            <span className="cart-count">({state.cart.length})</span>
          </div>
          
          {state.cart.length > 0 && (
            <button 
              className="clear-cart-btn"
              onClick={clearCart}
            >
              <Trash2 className="trash-icon" />
              Xóa tất cả
            </button>
          )}
        </div>

        {cartCourses.length === 0 ? (
          <div className="empty-cart">
            <ShoppingCart className="empty-icon" />
            <h3>Giỏ hàng trống</h3>
            <p>Hãy thêm các khóa học bạn quan tâm vào giỏ hàng để thanh toán!</p>
            <button 
              className="browse-courses-btn"
              onClick={() => navigate('/')}
            >
              Khám phá khóa học
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartCourses.map(course => (
                <div key={course.id} className="cart-item">
                  <img 
                    src={course.image} 
                    alt={course.name}
                    className="cart-item-image"
                  />
                  
                  <div className="cart-item-info">
                    <h3 className="cart-item-title">{course.name}</h3>
                    <p className="cart-item-instructor">👨‍🏫 {course.instructor}</p>
                    <p className="cart-item-description">{course.shortDescription}</p>
                    <div className="cart-item-details">
                      <span className="cart-item-category">{course.category}</span>
                      <span className="cart-item-level">{course.level}</span>
                    </div>
                  </div>
                  
                  <div className="cart-item-actions">
                    <div className="cart-item-price">{formatPrice(course.price)}</div>
                    <button 
                      className="view-details-btn"
                      onClick={() => handleViewDetails(course)}
                    >
                      <BookOpen className="view-icon" />
                      Xem chi tiết
                    </button>
                    <button 
                      className="remove-btn"
                      onClick={() => removeFromCart(course.id)}
                    >
                      <Trash2 className="remove-icon" />
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-content">
                <div className="summary-details">
                  <div className="summary-row">
                    <span>Tổng số khóa học:</span>
                    <span className="summary-value">{cartCourses.length} khóa</span>
                  </div>
                  <div className="summary-row">
                    <span>Phí dịch vụ:</span>
                    <span className="summary-value">Miễn phí</span>
                  </div>
                  <div className="summary-row total">
                    <span>Tổng tiền:</span>
                    <span className="summary-value">{formatPrice(totalPrice)}</span>
                  </div>
                </div>
                
                <button className="checkout-btn">
                  <CreditCard className="checkout-icon" />
                  Thanh toán ngay
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
