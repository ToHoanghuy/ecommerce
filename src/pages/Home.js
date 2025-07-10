import React, { useState } from 'react';
import { useAppState } from '../context/AppContext';
import Filter from '../components/Filter';
import CourseCard from '../components/CourseCard';
import ViewHistory from '../components/ViewHistory';
import { CourseCardSkeleton } from '../components/LoadingSkeleton';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const state = useAppState();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleViewDetails = (course) => {
    console.log('Home - handleViewDetails called', { course, courseId: course.id });
    navigate(`/course/${course.id}`);
  };

  return (
    <div className="home-page">
      <div className="container">
        {/* Filter Section */}
        <Filter />

        {/* View History */}
        <ViewHistory onViewDetails={handleViewDetails} />

        {/* Courses Grid */}
        <section className="courses-section">
          <div className="section-header">
            <h2>
              {state.searchTerm || state.selectedCategory !== 'Tất cả' 
                ? 'Kết quả tìm kiếm' 
                : 'Tất cả khóa học'}
            </h2>
            <p>Khám phá những khóa học chất lượng cao từ các chuyên gia hàng đầu</p>
          </div>

          {isLoading ? (
            <div className="courses-grid">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <CourseCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              {state.filteredCourses.length === 0 ? (
                <div className="no-results">
                  <div className="no-results-icon">🔍</div>
                  <h3>Không tìm thấy khóa học nào</h3>
                  <p>Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc để tìm thấy khóa học phù hợp.</p>
                </div>
              ) : (
                <div className="courses-grid">
                  {state.filteredCourses.map(course => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
