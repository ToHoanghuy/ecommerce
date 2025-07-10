import React from 'react';
import { Sparkles, X } from 'lucide-react';
import { useAppState } from '../context/AppContext';
import CourseCard from './CourseCard';
import './SuggestionsModal.css';

const SuggestionsModal = ({ isOpen, onClose, onViewDetails }) => {
  const state = useAppState();

  if (!isOpen) return null;

  return (
    <div className="suggestions-overlay" onClick={onClose}>
      <div className="suggestions-content" onClick={(e) => e.stopPropagation()}>
        <div className="suggestions-header">
          <div className="suggestions-title">
            <Sparkles className="suggestions-icon" />
            <h2>🤖 Gợi ý AI cho bạn</h2>
          </div>
          
          <button className="close-btn" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="suggestions-description">
          <p>Dựa trên sở thích và lịch sử xem của bạn, AI đã chọn ra những khóa học phù hợp nhất:</p>
        </div>

        <div className="suggestions-body">
          {state.suggestions.length === 0 ? (
            <div className="no-suggestions">
              <Sparkles className="empty-icon" />
              <h3>Chưa có gợi ý</h3>
              <p>Hãy nhấn nút "Gợi ý sản phẩm phù hợp" để nhận được gợi ý từ AI!</p>
            </div>
          ) : (
            <div className="suggestions-grid">
              {state.suggestions.map(course => (
                <div key={course.id} className="suggestion-item">
                  <div className="ai-badge">
                    <Sparkles className="ai-icon" />
                    <span>AI Gợi ý</span>
                  </div>
                  <CourseCard
                    course={course}
                    onViewDetails={onViewDetails}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuggestionsModal;
