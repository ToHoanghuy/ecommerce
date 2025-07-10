import React, { useState, useEffect } from 'react';
import { Clock, Eye, Trash2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppState, useAppDispatch } from '../context/AppContext';
import { coursesAPI } from '../services/api';
import './ViewHistory.css';

const ViewHistory = ({ onViewDetails }) => {
  const navigate = useNavigate();
  const state = useAppState();
  const { dispatch, actionTypes } = useAppDispatch();
  const [viewHistoryCourses, setViewHistoryCourses] = useState([]);

  useEffect(() => {
    const loadViewHistoryCourses = async () => {
      if (state.viewHistory.length === 0) {
        setViewHistoryCourses([]);
        return;
      }

      try {
        // Chỉ lấy 4 khóa học gần nhất cho hiển thị ở trang chủ (1 hàng)
        const recentIds = state.viewHistory.slice(-4).reverse(); // Lấy 4 cái mới nhất và đảo ngược
        const courses = await Promise.all(
          recentIds.map(courseId => 
            coursesAPI.getCourseById(courseId).catch(() => null)
          )
        );
        setViewHistoryCourses(courses.filter(Boolean));
      } catch (error) {
        console.error('Error loading view history:', error);
        setViewHistoryCourses([]);
      }
    };

    loadViewHistoryCourses();
  }, [state.viewHistory]);

  const clearHistory = () => {
    localStorage.removeItem('viewHistory');
    dispatch({ type: actionTypes.CLEAR_VIEW_HISTORY });
  };

  const handleViewAllHistory = () => {
    navigate('/history');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  if (viewHistoryCourses.length === 0) {
    return (
      <div className="view-history-section">
        <div className="view-history-header">
          <div className="section-title">
            <Clock className="section-icon" />
            <h3>📚 Lịch sử xem gần đây</h3>
          </div>
        </div>
        <div className="empty-history">
          <Eye className="empty-icon" />
          <p>Chưa có lịch sử xem khóa học nào</p>
        </div>
      </div>
    );
  }

  return (
    <div className="view-history-section">        <div className="view-history-header">
          <div className="section-title">
            <Clock className="section-icon" />
            <h3>📚 Lịch sử xem gần đây</h3>
            <span className="history-count">({viewHistoryCourses.length})</span>
          </div>
          <div className="header-actions">
            <button className="view-all-btn" onClick={handleViewAllHistory}>
              <span>Xem tất cả</span>
              <ArrowRight className="arrow-icon" />
            </button>
            <button className="clear-history-btn" onClick={clearHistory}>
              <Trash2 className="trash-icon" />
              Xóa lịch sử
            </button>
          </div>
        </div>

      <div className="history-grid">
        {viewHistoryCourses.map((course, index) => (
          <div 
            key={course.id} 
            className="history-item"
            onClick={() => onViewDetails(course)}
          >
            <div className="history-index">{index + 1}</div>
            <img 
              src={course.image} 
              alt={course.name}
              className="history-image"
            />
            <div className="history-content">
              <h4 className="history-title">{course.name}</h4>
              <p className="history-instructor">👨‍🏫 {course.instructor}</p>
              <div className="history-meta">
                <span className="history-category">{course.category}</span>
                <span className="history-price">{formatPrice(course.price)}</span>
              </div>
            </div>
            <div className="history-overlay">
              <Eye className="view-icon" />
              <span>Xem lại</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewHistory;
