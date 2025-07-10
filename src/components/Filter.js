import React from 'react';
import { Filter as FilterIcon, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppState, useAppDispatch } from '../context/AppContext';
import { coursesAPI } from '../services/api';
import './Filter.css';

// Static data cho categories và price ranges
const categories = [
  "Tất cả",
  "Lập trình", 
  "Ngoại ngữ",
  "Thiết kế",
  "Marketing",
  "Sức khỏe",
  "Tài chính"
];

const priceRanges = [
  { label: "Tất cả", min: 0, max: Infinity },
  { label: "Dưới 500K", min: 0, max: 500000 },
  { label: "500K - 1 triệu", min: 500000, max: 1000000 },
  { label: "Trên 1 triệu", min: 1000000, max: Infinity }
];

const Filter = () => {
  const navigate = useNavigate();
  const state = useAppState();
  const { dispatch, actionTypes } = useAppDispatch();

  const handleCategoryChange = (category) => {
    dispatch({ type: actionTypes.SET_CATEGORY, payload: category });
  };

  const handlePriceRangeChange = (priceRange) => {
    dispatch({ type: actionTypes.SET_PRICE_RANGE, payload: priceRange });
  };

  const handleGetSuggestions = async () => {
    try {
      dispatch({ type: actionTypes.SET_LOADING_SUGGESTIONS, payload: true });
      dispatch({ type: actionTypes.SET_ERROR, payload: null });
      
      const suggestions = await coursesAPI.getAISuggestions();
      
      dispatch({ type: actionTypes.SET_SUGGESTIONS, payload: suggestions });
      
      // Navigate to AI suggestions page
      navigate('/ai-suggestions');
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: 'Không thể lấy gợi ý lúc này. Vui lòng thử lại sau.' });
    } finally {
      dispatch({ type: actionTypes.SET_LOADING_SUGGESTIONS, payload: false });
    }
  };

  return (
    <div className="filter-container">
      <div className="filter-header">
        <FilterIcon className="filter-icon" />
        <h3>Bộ lọc & Gợi ý</h3>
      </div>

      {/* AI Suggestions */}
      <div className="filter-section">
        <h4>🤖 Gợi ý thông minh</h4>
        <button 
          className={`suggestion-button ${state.isLoadingSuggestions ? 'loading' : ''}`}
          onClick={handleGetSuggestions}
          disabled={state.isLoadingSuggestions}
        >
          <Sparkles className="sparkles-icon" />
          {state.isLoadingSuggestions ? 'Đang tìm gợi ý...' : 'Gợi ý sản phẩm phù hợp'}
        </button>
        
        {state.error && (
          <div className="error-message">
            {state.error}
          </div>
        )}
      </div>

      {/* Category Filter */}
      <div className="filter-section">
        <h4>📚 Danh mục</h4>
        <div className="filter-options">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-option ${state.selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="filter-section">
        <h4>💰 Khoảng giá</h4>
        <div className="filter-options">
          {priceRanges.map((range, index) => (
            <button
              key={index}
              className={`filter-option ${state.selectedPriceRange.label === range.label ? 'active' : ''}`}
              onClick={() => handlePriceRangeChange(range)}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Results Info */}
      <div className="filter-results">
        <p>Tìm thấy <strong>{state.filteredCourses.length}</strong> khóa học</p>
      </div>
    </div>
  );
};

export default Filter;
