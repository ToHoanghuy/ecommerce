import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Eye, Trash2, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppState, useAppDispatch } from '../context/AppContext';
import { coursesAPI } from '../services/api';
import CourseCard from '../components/CourseCard';
import { HistoryPageSkeleton } from '../components/LoadingSkeleton';
import './History.css';

const History = () => {
  const navigate = useNavigate();
  const state = useAppState();
  const { dispatch, actionTypes } = useAppDispatch();
  
  const [allHistoryCourses, setAllHistoryCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadAllHistoryCourses = async () => {
      if (state.viewHistory.length === 0) {
        setAllHistoryCourses([]);
        setFilteredCourses([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Lấy tất cả khóa học trong lịch sử (theo thứ tự ngược lại - mới nhất trước)
        const courses = await Promise.all(
          state.viewHistory.slice().reverse().map(courseId => 
            coursesAPI.getCourseById(courseId).catch(() => null)
          )
        );
        const validCourses = courses.filter(Boolean);
        setAllHistoryCourses(validCourses);
        setFilteredCourses(validCourses);
      } catch (error) {
        console.error('Error loading history:', error);
        setAllHistoryCourses([]);
        setFilteredCourses([]);
      } finally {
        setLoading(false);
      }
    };

    loadAllHistoryCourses();
  }, [state.viewHistory]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCourses(allHistoryCourses);
    } else {
      const filtered = allHistoryCourses.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }, [searchTerm, allHistoryCourses]);

  const clearHistory = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử xem?')) {
      localStorage.removeItem('viewHistory');
      dispatch({ type: actionTypes.CLEAR_VIEW_HISTORY });
      navigate('/');
    }
  };

  const handleViewDetails = (course) => {
    navigate(`/course/${course}`);
  };

  if (loading) {
    return <HistoryPageSkeleton />;
  }

  return (
    <div className="history-page">
      <div className="container">
        {/* Header */}
        <div className="history-header">
          <button onClick={() => navigate(-1)} className="back-btn">
            <ArrowLeft />
            Quay lại
          </button>
          
          <div className="header-content">
            <div className="title-section">
              <Clock className="page-icon" />
              <h1>Lịch sử xem khóa học</h1>
              <span className="total-count">({allHistoryCourses.length} khóa học)</span>
            </div>
            
            <div className="header-actions">
              <div className="search-box">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Tìm kiếm trong lịch sử..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              
              <button className="clear-all-btn" onClick={clearHistory}>
                <Trash2 className="trash-icon" />
                Xóa tất cả
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        {filteredCourses.length === 0 ? (
          <div className="empty-history">
            {searchTerm ? (
              <>
                <Search className="empty-icon" />
                <h3>Không tìm thấy kết quả</h3>
                <p>Không có khóa học nào phù hợp với từ khóa "{searchTerm}"</p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="clear-search-btn"
                >
                  Xóa bộ lọc
                </button>
              </>
            ) : (
              <>
                <Eye className="empty-icon" />
                <h3>Chưa có lịch sử xem</h3>
                <p>Bạn chưa xem khóa học nào. Hãy khám phá các khóa học thú vị!</p>
                <button 
                  onClick={() => navigate('/')}
                  className="explore-btn"
                >
                  Khám phá khóa học
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="history-content">
            <div className="results-info">
              <p>
                {searchTerm ? (
                  <>Tìm thấy <strong>{filteredCourses.length}</strong> kết quả cho "{searchTerm}"</>
                ) : (
                  <>Hiển thị tất cả <strong>{filteredCourses.length}</strong> khóa học đã xem</>
                )}
              </p>
            </div>
            
            <div className="courses-grid">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
