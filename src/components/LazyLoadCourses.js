import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { coursesAPI } from '../services/api';
import CourseCard from './CourseCard';
import { CourseCardSkeleton } from './LoadingSkeleton';
import './LazyLoadCourses.css';

const LazyLoadCourses = ({ searchTerm = '', category = '', priceRange = null }) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    hasMore: true,
    total: 0
  });
  const [initialLoad, setInitialLoad] = useState(true);
  
  const observerRef = useRef();

  const loadCourses = async (page = 1, reset = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await coursesAPI.getCoursesWithPagination(page, 12);
      
      if (reset) {
        setCourses(response.courses);
      } else {
        setCourses(prev => [...prev, ...response.courses]);
      }
      
      setPagination({
        page: response.pagination.page,
        hasMore: response.pagination.hasMore,
        total: response.pagination.total
      });
      
    } catch (err) {
      setError(err.message);
      console.error('Error loading courses:', err);
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  };

  const loadMoreCourses = useCallback(() => {
    if (!loading && pagination.hasMore) {
      loadCourses(pagination.page + 1, false);
    }
  }, [loading, pagination.hasMore, pagination.page]);

  const lastCourseElementRef = useCallback(node => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && pagination.hasMore) {
        loadMoreCourses();
      }
    });
    if (node) observerRef.current.observe(node);
  }, [loading, pagination.hasMore, loadMoreCourses]);

  // Filter courses based on search and filters
  const filteredCourses = courses.filter(course => {
    const matchesSearch = !searchTerm || 
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !category || category === 'Tất cả' || course.category === category;
    
    const matchesPrice = !priceRange || priceRange.label === 'Tất cả' || 
      (course.price >= priceRange.min && course.price <= priceRange.max);
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Reset when search params change
  useEffect(() => {
    setCourses([]);
    setPagination({ page: 1, hasMore: true, total: 0 });
    setInitialLoad(true);
    loadCourses(1, true);
  }, [searchTerm, category, priceRange]);

  // Initial load
  useEffect(() => {
    if (initialLoad && courses.length === 0) {
      loadCourses(1, true);
    }
  }, [initialLoad, courses.length]);

  const handleViewDetails = (course) => {
    navigate(`/course/${course}`);
  };

  if (error && courses.length === 0) {
    return (
      <div className="error-container">
        <div className="error-content">
          <h3>⚠️ Có lỗi xảy ra</h3>
          <p>{error}</p>
          <button 
            className="retry-button"
            onClick={() => loadCourses(1, true)}
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="lazy-load-courses">
      {/* Results Info */}
      {filteredCourses.length > 0 && (
        <div className="results-info">
          <p>Hiển thị {filteredCourses.length} trong tổng số {pagination.total} khóa học</p>
        </div>
      )}

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="courses-grid">
          {filteredCourses.map((course, index) => (
            <div
              key={course.id}
              ref={index === filteredCourses.length - 1 ? lastCourseElementRef : null}
            >
              <CourseCard
                course={course}
                onViewDetails={handleViewDetails}
              />
            </div>
          ))}
        </div>
      ) : !loading && !initialLoad ? (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h3>Không tìm thấy khóa học nào</h3>
          <p>Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc để tìm thấy khóa học phù hợp.</p>
        </div>
      ) : null}

      {/* Loading Skeletons */}
      {loading && (
        <div className="courses-grid">
          {Array.from({ length: 6 }, (_, index) => (
            <CourseCardSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      )}

      {/* Load More Button (fallback for intersection observer) */}
      {!loading && pagination.hasMore && filteredCourses.length > 0 && (
        <div className="load-more-container">
          <button 
            className="load-more-btn"
            onClick={loadMoreCourses}
          >
            Tải thêm khóa học
          </button>
        </div>
      )}

      {/* End of results indicator */}
      {!loading && !pagination.hasMore && filteredCourses.length > 0 && (
        <div className="end-of-results">
          <p>🎉 Bạn đã xem hết tất cả khóa học!</p>
        </div>
      )}
    </div>
  );
};

export default LazyLoadCourses;
