import React, { useEffect } from 'react';
import { X, Star, Users, Clock, Heart, ShoppingCart, Award, BookOpen } from 'lucide-react';
import { useAppState, useAppDispatch } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import './CourseModal.css';

const CourseModal = ({ course, isOpen, onClose }) => {
  const state = useAppState();
  const { dispatch, actionTypes } = useAppDispatch();
  const { showSuccess, showFavorite, showUnfavorite } = useToast();

  const isFavorite = course && state.favorites.includes(course.id);
  const isInCart = course && state.cart.includes(course.id);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch({ type: actionTypes.REMOVE_FROM_FAVORITES, payload: course.id });
      showUnfavorite(`Đã bỏ yêu thích "${course.name}"`);
    } else {
      dispatch({ type: actionTypes.ADD_TO_FAVORITES, payload: course.id });
      showFavorite(`❤️ Đã thêm "${course.name}" vào yêu thích!`);
    }
  };

  const handleAddToCart = () => {
    if (!isInCart) {
      dispatch({ type: actionTypes.ADD_TO_CART, payload: course.id });
      showSuccess(`🛒 Đã thêm "${course.name}" vào giỏ hàng!`);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  if (!isOpen || !course) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X />
        </button>

        <div className="modal-header">
          <div className="modal-image-container">
            <img 
              src={course.image} 
              alt={course.name}
              className="modal-image"
            />
            <div className="modal-category">{course.category}</div>
          </div>
          
          <div className="modal-header-content">
            <h2 className="modal-title">{course.name}</h2>
            <p className="modal-description">{course.fullDescription}</p>
            
            <div className="modal-instructor">
              <span>👨‍🏫 Giảng viên: <strong>{course.instructor}</strong></span>
            </div>

            <div className="modal-stats">
              <div className="modal-stat">
                <Star className="stat-icon" />
                <span><strong>{course.rating}</strong> đánh giá</span>
              </div>
              <div className="modal-stat">
                <Users className="stat-icon" />
                <span><strong>{course.students.toLocaleString()}</strong> học viên</span>
              </div>
              <div className="modal-stat">
                <Clock className="stat-icon" />
                <span><strong>{course.duration}</strong> học</span>
              </div>
              <div className="modal-stat">
                <Award className="stat-icon" />
                <span><strong>{course.level}</strong></span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-body">
          <div className="course-details">
            <h3>📖 Nội dung khóa học</h3>
            <div className="course-content-list">
              <div className="content-item">
                <BookOpen className="content-icon" />
                <div>
                  <h4>Kiến thức cơ bản</h4>
                  <p>Nắm vững các khái niệm và nguyên lý cơ bản</p>
                </div>
              </div>
              <div className="content-item">
                <BookOpen className="content-icon" />
                <div>
                  <h4>Thực hành dự án</h4>
                  <p>Áp dụng kiến thức vào các dự án thực tế</p>
                </div>
              </div>
              <div className="content-item">
                <BookOpen className="content-icon" />
                <div>
                  <h4>Chứng chỉ hoàn thành</h4>
                  <p>Nhận chứng chỉ sau khi hoàn thành khóa học</p>
                </div>
              </div>
            </div>

            <h3>🎯 Đối tượng học viên</h3>
            <ul className="target-audience">
              <li>Người mới bắt đầu muốn học từ cơ bản</li>
              <li>Học viên có kinh nghiệm muốn nâng cao kỹ năng</li>
              <li>Người làm việc muốn chuyển đổi ngành nghề</li>
              <li>Sinh viên muốn bổ sung kiến thức thực tế</li>
            </ul>

            <h3>💪 Kỹ năng đạt được</h3>
            <div className="skills-grid">
              <span className="skill-tag">Kiến thức chuyên môn</span>
              <span className="skill-tag">Kỹ năng thực hành</span>
              <span className="skill-tag">Tư duy logic</span>
              <span className="skill-tag">Giải quyết vấn đề</span>
              <span className="skill-tag">Làm việc nhóm</span>
              <span className="skill-tag">Presentation</span>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <div className="modal-price">
            <span className="price-label">Giá khóa học:</span>
            <span className="price-value">{formatPrice(course.price)}</span>
          </div>
          
          <div className="modal-actions">
            <button 
              className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
              onClick={handleToggleFavorite}
            >
              <Heart className="action-icon" />
              {isFavorite ? 'Đã yêu thích' : 'Yêu thích'}
            </button>
            
            <button 
              className={`cart-btn ${isInCart ? 'in-cart' : ''}`}
              onClick={handleAddToCart}
              disabled={isInCart}
            >
              <ShoppingCart className="action-icon" />
              {isInCart ? 'Đã thêm vào giỏ' : 'Thêm vào giỏ hàng'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseModal;
