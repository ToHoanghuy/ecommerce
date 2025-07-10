import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Users, Clock, Heart, ShoppingCart, Award, BookOpen } from 'lucide-react';
import { useAppState, useAppDispatch } from '../context/AppContext';
import { coursesAPI } from '../services/api';
import './CourseDetail.css';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const state = useAppState();
  const { dispatch, actionTypes } = useAppDispatch();
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isFavorite = course && state.favorites.includes(course.id);
  const isInCart = course && state.cart.includes(course.id);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError(null);
        const courseData = await coursesAPI.getCourseById(parseInt(id));
        setCourse(courseData);
        
        // Add to view history
        dispatch({ type: actionTypes.ADD_TO_VIEW_HISTORY, payload: courseData.id });
      } catch (err) {
        setError('Không thể tải thông tin khóa học. Vui lòng thử lại.');
        console.error('Error fetching course:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id, dispatch, actionTypes]);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch({ type: actionTypes.REMOVE_FROM_FAVORITES, payload: course.id });
    } else {
      dispatch({ type: actionTypes.ADD_TO_FAVORITES, payload: course.id });
    }
  };

  const handleAddToCart = () => {
    if (!isInCart) {
      dispatch({ type: actionTypes.ADD_TO_CART, payload: course.id });
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="course-detail-page">
        <div className="container">
          <div className="loading-skeleton">
            <div className="skeleton-header"></div>
            <div className="skeleton-content"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="course-detail-page">
        <div className="container">
          <div className="error-state">
            <h2>❌ Lỗi</h2>
            <p>{error || 'Không tìm thấy khóa học'}</p>
            <button onClick={() => navigate('/')} className="back-home-btn">
              <ArrowLeft /> Về trang chủ
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="course-detail-page">
      <div className="container">
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="back-btn">
          <ArrowLeft />
          Quay lại
        </button>

        {/* Course Header */}
        <div className="course-header">
          <div className="course-image-section">
            <img 
              src={course.image} 
              alt={course.name}
              className="course-main-image"
            />
            <div className="course-category-badge">{course.category}</div>
          </div>
          
          <div className="course-info-section">
            <h1 className="course-title">{course.name}</h1>
            <p className="course-description">{course.fullDescription}</p>
            
            <div className="course-instructor">
              <span>👨‍🏫 Giảng viên: <strong>{course.instructor}</strong></span>
            </div>

            <div className="course-stats-grid">
              <div className="stat-item">
                <Star className="stat-icon" />
                <div>
                  <span className="stat-value">{course.rating}</span>
                  <span className="stat-label">Đánh giá</span>
                </div>
              </div>
              <div className="stat-item">
                <Users className="stat-icon" />
                <div>
                  <span className="stat-value">{course.students.toLocaleString()}</span>
                  <span className="stat-label">Học viên</span>
                </div>
              </div>
              <div className="stat-item">
                <Clock className="stat-icon" />
                <div>
                  <span className="stat-value">{course.duration}</span>
                  <span className="stat-label">Thời lượng</span>
                </div>
              </div>
              <div className="stat-item">
                <Award className="stat-icon" />
                <div>
                  <span className="stat-value">{course.level}</span>
                  <span className="stat-label">Trình độ</span>
                </div>
              </div>
            </div>

            <div className="course-price-section">
              <span className="price-label">Giá khóa học:</span>
              <span className="price-value">{formatPrice(course.price)}</span>
            </div>
            
            <div className="course-actions">
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

        {/* Course Content */}
        <div className="course-content">
          <div className="content-section">
            <h2>📖 Nội dung khóa học</h2>
            <div className="content-list">
              <div className="content-item">
                <BookOpen className="content-icon" />
                <div>
                  <h3>Kiến thức cơ bản</h3>
                  <p>Nắm vững các khái niệm và nguyên lý cơ bản của lĩnh vực</p>
                </div>
              </div>
              <div className="content-item">
                <BookOpen className="content-icon" />
                <div>
                  <h3>Thực hành dự án</h3>
                  <p>Áp dụng kiến thức vào các dự án thực tế với sự hướng dẫn chi tiết</p>
                </div>
              </div>
              <div className="content-item">
                <BookOpen className="content-icon" />
                <div>
                  <h3>Chứng chỉ hoàn thành</h3>
                  <p>Nhận chứng chỉ được công nhận sau khi hoàn thành khóa học</p>
                </div>
              </div>
            </div>
          </div>

          <div className="content-section">
            <h2>🎯 Đối tượng học viên</h2>
            <ul className="target-list">
              <li>Người mới bắt đầu muốn học từ cơ bản</li>
              <li>Học viên có kinh nghiệm muốn nâng cao kỹ năng</li>
              <li>Người làm việc muốn chuyển đổi ngành nghề</li>
              <li>Sinh viên muốn bổ sung kiến thức thực tế</li>
            </ul>
          </div>

          <div className="content-section">
            <h2>💪 Kỹ năng đạt được</h2>
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
      </div>
    </div>
  );
};

export default CourseDetail;
