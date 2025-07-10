import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowLeft, RefreshCw, Brain, Lock } from 'lucide-react';
import { useAppState, useAppDispatch } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { coursesAPI } from '../services/api';
import CourseCard from '../components/CourseCard';
import { CourseCardSkeleton } from '../components/LoadingSkeleton';
import './AISuggestions.css';

const AISuggestions = () => {
  const navigate = useNavigate();
  const state = useAppState();
  const { dispatch, actionTypes } = useAppDispatch();
  const { user } = useAuth();
  
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadSuggestions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Truyền userId để API có thể tạo gợi ý phù hợp
      const suggestionData = await coursesAPI.getAISuggestions(user?.id);
      setSuggestions(suggestionData);
      dispatch({ type: actionTypes.SET_SUGGESTIONS, payload: suggestionData });
    } catch (err) {
      setError('Không thể tải gợi ý AI. Vui lòng thử lại.');
      console.error('Error loading AI suggestions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state.suggestions.length > 0) {
      setSuggestions(state.suggestions);
    } else {
      loadSuggestions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.suggestions]);

  const handleViewDetails = (course) => {
    navigate(`/course/${course}`);
  };

  const handleRefresh = () => {
    dispatch({ type: actionTypes.SET_SUGGESTIONS, payload: [] });
    loadSuggestions();
  };

  if (loading) {
    return (
      <div className="ai-suggestions-page page-transition">
        <div className="container">
          <button className="back-button" onClick={() => navigate(-1)}>
            <ArrowLeft className="back-icon" />
            <span>Quay lại</span>
          </button>

          <div className="suggestions-header">
            <div className="suggestions-title">
              <Sparkles className="suggestions-icon" />
              <h1>🤖 Gợi ý AI cho bạn</h1>
            </div>
          </div>

          <div className="loading-state">
            <Brain className="loading-brain" />
            <h3>AI đang phân tích sở thích của bạn...</h3>
            <p>Vui lòng chờ trong giây lát</p>
            <div className="suggestions-grid">
              {[1, 2, 3, 4].map(i => (
                <CourseCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ai-suggestions-page page-transition">
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
                onClick={loadSuggestions}
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
    <div className="ai-suggestions-page page-transition">
      <div className="container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft className="back-icon" />
          <span>Quay lại</span>
        </button>

        <div className="suggestions-header">
          <div className="suggestions-title">
            <Sparkles className="suggestions-icon" />
            <h1>🤖 Gợi ý AI cho bạn</h1>
          </div>
          
          <button 
            className="refresh-btn"
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw className="refresh-icon" />
            Làm mới gợi ý
          </button>
        </div>

        <div className="suggestions-description">
          <p>Dựa trên sở thích và lịch sử xem của bạn, AI đã chọn ra những khóa học phù hợp nhất:</p>
        </div>

        {suggestions.length === 0 ? (
          <div className="no-suggestions">
            <Brain className="empty-icon" />
            <h3>Chưa có gợi ý</h3>
            <p>AI cần thêm dữ liệu về sở thích của bạn để đưa ra gợi ý tốt nhất. Hãy xem thêm một số khóa học!</p>
            <button 
              className="browse-courses-btn"
              onClick={() => navigate('/')}
            >
              Khám phá khóa học
            </button>
          </div>
        ) : (
          <div className="suggestions-grid">
            {suggestions.map(course => (
              <div key={course.id} className="suggestion-item">
                <div className="ai-badge">
                  <Sparkles className="ai-icon" />
                  <span>AI Gợi ý</span>
                </div>
                <CourseCard
                  course={course}
                  onViewDetails={handleViewDetails}
                />
              </div>
            ))}
          </div>
        )}

        <div className="ai-explanation">
          <h3>🧠 AI của chúng tôi hoạt động như thế nào?</h3>
          <div className="explanation-grid">
            <div className="explanation-item">
              <div className="explanation-icon">📊</div>
              <h4>Phân tích hành vi</h4>
              <p>Theo dõi các khóa học bạn xem, yêu thích và thêm vào giỏ hàng</p>
            </div>
            <div className="explanation-item">
              <div className="explanation-icon">🎯</div>
              <h4>Học máy nâng cao</h4>
              <p>Sử dụng thuật toán machine learning để dự đoán sở thích</p>
            </div>
            <div className="explanation-item">
              <div className="explanation-icon">✨</div>
              <h4>Cá nhân hóa</h4>
              <p>Đưa ra gợi ý phù hợp với mục tiêu học tập của riêng bạn</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISuggestions;
