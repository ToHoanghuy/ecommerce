import React from 'react';
import { X, ShoppingCart, Trash2, BookOpen } from 'lucide-react';
import { useAppState, useAppDispatch } from '../context/AppContext';
import { courses } from '../data/mockData';
import './CartModal.css';

const CartModal = ({ isOpen, onClose, onViewDetails }) => {
  const state = useAppState();
  const { dispatch, actionTypes } = useAppDispatch();

  const cartCourses = courses.filter(course => 
    state.cart.includes(course.id)
  );

  const totalPrice = cartCourses.reduce((sum, course) => sum + course.price, 0);

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

  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-content" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <div className="cart-title">
            <ShoppingCart className="cart-icon" />
            <h2>Giỏ hàng của bạn</h2>
            <span className="cart-count">({state.cart.length})</span>
          </div>
          
          <div className="cart-actions">
            {state.cart.length > 0 && (
              <button 
                className="clear-cart-btn"
                onClick={clearCart}
              >
                <Trash2 className="trash-icon" />
                Xóa tất cả
              </button>
            )}
            <button className="close-btn" onClick={onClose}>
              <X />
            </button>
          </div>
        </div>

        <div className="cart-body">
          {cartCourses.length === 0 ? (
            <div className="empty-cart">
              <ShoppingCart className="empty-icon" />
              <h3>Giỏ hàng trống</h3>
              <p>Hãy thêm các khóa học bạn quan tâm vào giỏ hàng để thanh toán!</p>
            </div>
          ) : (
            <div className="cart-items">
              {cartCourses.map(course => (
                <div key={course.id} className="cart-item">
                  <img 
                    src={course.image} 
                    alt={course.name}
                    className="cart-item-image"
                  />
                  
                  <div className="cart-item-info">
                    <h4 className="cart-item-title">{course.name}</h4>
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
                      onClick={() => onViewDetails(course)}
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
          )}
        </div>

        {cartCourses.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary">
              <div className="summary-row">
                <span>Tổng số khóa học:</span>
                <span className="summary-value">{cartCourses.length} khóa</span>
              </div>
              <div className="summary-row total">
                <span>Tổng tiền:</span>
                <span className="summary-value">{formatPrice(totalPrice)}</span>
              </div>
            </div>
            
            <button className="checkout-btn">
              <ShoppingCart className="checkout-icon" />
              Thanh toán ngay
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
