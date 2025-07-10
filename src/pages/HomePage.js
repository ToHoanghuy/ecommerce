import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../context/AppContext';
import Filter from '../components/Filter';
import LazyLoadCourses from '../components/LazyLoadCourses';
import ViewHistory from '../components/ViewHistory';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const state = useAppState();

  const handleViewDetails = (course) => {
    navigate(`/course/${course.id}`);
  };

  return (
    <div className="home-page">
      <div className="container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>🎓 Chào mừng đến EduMart</h1>
            <p>Khám phá hàng nghìn khóa học chất lượng cao với sự hỗ trợ của AI thông minh</p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">1000+</span>
                <span className="stat-label">Khóa học</span>
              </div>
              <div className="stat">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Học viên</span>
              </div>
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Giảng viên</span>
              </div>
            </div>
          </div>
        </section>

        {/* View History Section */}
        <ViewHistory onViewDetails={handleViewDetails} />
        
        {/* Filter Section */}
        <Filter />
        
        {/* Courses Section with Lazy Loading */}
        <section className="courses-section">
          <div className="section-header">
            <h2>
              {state.searchTerm || state.selectedCategory !== 'Tất cả' 
                ? 'Kết quả tìm kiếm' 
                : 'Tất cả khóa học'}
            </h2>
            <p>Khám phá những khóa học chất lượng cao từ các chuyên gia hàng đầu</p>
          </div>

          {/* Lazy Load Courses Component */}
          <LazyLoadCourses 
            searchTerm={state.searchTerm}
            category={state.selectedCategory}
            priceRange={state.selectedPriceRange}
          />
        </section>
      </div>
    </div>
  );
};

export default HomePage;
