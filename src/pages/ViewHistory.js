import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Eye, Trash2 } from 'lucide-react';
import { useAppState, useAppDispatch } from '../context/AppContext';
import { coursesAPI } from '../services/api';
import './ViewHistory.css';

const ViewHistoryPage = () => {
  const navigate = useNavigate();
  const state = useAppState();
  const { dispatch, actionTypes } = useAppDispatch();
  const [viewHistoryCourses, setViewHistoryCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadViewHistoryCourses = async () => {
      if (state.viewHistory.length === 0) {
        setViewHistoryCourses([]);
        return;
      }

      try {
        setLoading(true);
        const courses = await Promise.all(
          state.viewHistory.map(courseId => 
            coursesAPI.getCourseById(courseId).catch(() => null)
          )
        );
        setViewHistoryCourses(courses.filter(Boolean));
      } catch (error) {
        console.error('Error loading view history:', error);
        setViewHistoryCourses([]);
      } finally {
        setLoading(false);
      }
    };

    loadViewHistoryCourses();
  }, [state.viewHistory]);

  const handleViewDetails = (course) => {
    navigate(`/course/${course.id}`);
  };

  const clearHistory = () => {
    localStorage.removeItem('viewHistory');
    dispatch({ type: actionTypes.CLEAR_VIEW_HISTORY });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="view-history-page">
      <div className="container">
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="back-btn">
          <ArrowLeft />
          Quay lại
        </button>

        {/* Page Header */}
        <div className="page-header">
          <div className="section-title">
            <Clock className="section-icon" />
            <h1>📚 Lịch sử xem khóa học</h1>
            <span className="history-count">({viewHistoryCourses.length})</span>
          </div>
          {viewHistoryCourses.length > 0 && (
            <button className="clear-history-btn" onClick={clearHistory}>
              <Trash2 className="trash-icon" />
              Xóa tất cả lịch sử
            </button>
          )}
        </div>

        {/* Content */}
        <div className="view-history-content">
          {loading ? (
            <div className="loading-skeleton">
              <div className="skeleton-grid">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="skeleton-card">
                    <div className="skeleton-image"></div>
                    <div className="skeleton-content">
                      <div className="skeleton-title"></div>
                      <div className="skeleton-text"></div>
                      <div className="skeleton-text short"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : viewHistoryCourses.length === 0 ? (
            <div className="empty-history">
              <Eye className="empty-icon" />
              <h3>Chưa có lịch sử xem khóa học</h3>
              <p>Hãy khám phá các khóa học để xây dựng lịch sử xem của bạn</p>
              <button 
                className="explore-btn"
                onClick={() => navigate('/')}
              >
                Khám phá khóa học
              </button>
            </div>
          ) : (
            <div className="history-full-grid">
              {viewHistoryCourses.map((course, index) => (
                <div 
                  key={course.id} 
                  className="history-item"
                  onClick={() => handleViewDetails(course)}
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
                    <span>Xem chi tiết</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewHistoryPage;
