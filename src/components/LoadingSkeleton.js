import React from 'react';
import './LoadingSkeleton.css';

export const CourseCardSkeleton = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton-title"></div>
        <div className="skeleton-description"></div>
        <div className="skeleton-instructor"></div>
        <div className="skeleton-stats">
          <div className="skeleton-stat"></div>
          <div className="skeleton-stat"></div>
          <div className="skeleton-stat"></div>
        </div>
        <div className="skeleton-price"></div>
        <div className="skeleton-buttons">
          <div className="skeleton-button"></div>
          <div className="skeleton-button"></div>
        </div>
      </div>
    </div>
  );
};

export const SuggestionsSkeleton = () => {
  return (
    <div className="suggestions-skeleton">
      <div className="skeleton-header">
        <div className="skeleton-title-large"></div>
      </div>
      <div className="skeleton-grid">
        {[1, 2, 3, 4].map(i => (
          <CourseCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export const ChatMessageSkeleton = () => {
  return (
    <div className="message bot-message">
      <div className="message-avatar">
        <div className="skeleton-avatar"></div>
      </div>
      <div className="message-content">
        <div className="skeleton-chat-text"></div>
        <div className="skeleton-courses">
          {[1, 2, 3].map(i => (
            <div key={i} className="skeleton-chat-course">
              <div className="skeleton-course-thumb"></div>
              <div className="skeleton-course-info">
                <div className="skeleton-course-title"></div>
                <div className="skeleton-course-desc"></div>
                <div className="skeleton-course-price"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const HistoryPageSkeleton = () => {
  return (
    <div className="history-page">
      <div className="container">
        {/* Header Skeleton */}
        <div className="history-header">
          <div className="skeleton-back-btn"></div>
          
          <div className="header-content">
            <div className="title-section">
              <div className="skeleton-icon"></div>
              <div className="skeleton-title-large"></div>
              <div className="skeleton-count"></div>
            </div>
            
            <div className="header-actions">
              <div className="skeleton-search-box"></div>
              <div className="skeleton-clear-btn"></div>
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="history-content">
          <div className="skeleton-results-info"></div>
          
          <div className="courses-grid">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
