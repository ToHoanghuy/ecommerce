import React from 'react';
import { X, Heart, BookOpen } from 'lucide-react';
import { useAppState, useAppDispatch } from '../context/AppContext';
import { courses } from '../data/mockData';
import CourseCard from './CourseCard';
import './FavoritesModal.css';

const FavoritesModal = ({ isOpen, onClose, onViewDetails }) => {
  const state = useAppState();
  const { dispatch, actionTypes } = useAppDispatch();

  const favoriteCourses = courses.filter(course => 
    state.favorites.includes(course.id)
  );

  const clearAllFavorites = () => {
    state.favorites.forEach(courseId => {
      dispatch({ type: actionTypes.REMOVE_FROM_FAVORITES, payload: courseId });
    });
  };

  if (!isOpen) return null;

  return (
    <div className="favorites-overlay" onClick={onClose}>
      <div className="favorites-content" onClick={(e) => e.stopPropagation()}>
        <div className="favorites-header">
          <div className="favorites-title">
            <Heart className="favorites-icon" />
            <h2>Khóa học yêu thích</h2>
            <span className="favorites-count">({state.favorites.length})</span>
          </div>
          
          <div className="favorites-actions">
            {state.favorites.length > 0 && (
              <button 
                className="clear-all-btn"
                onClick={clearAllFavorites}
              >
                Xóa tất cả
              </button>
            )}
            <button className="close-btn" onClick={onClose}>
              <X />
            </button>
          </div>
        </div>

        <div className="favorites-body">
          {favoriteCourses.length === 0 ? (
            <div className="empty-favorites">
              <BookOpen className="empty-icon" />
              <h3>Chưa có khóa học yêu thích</h3>
              <p>Hãy thêm các khóa học bạn quan tâm vào danh sách yêu thích để dễ dàng theo dõi!</p>
            </div>
          ) : (
            <div className="favorites-grid">
              {favoriteCourses.map(course => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesModal;
