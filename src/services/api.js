import axios from 'axios';

// Base URL cho API (có thể thay đổi theo environment)
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://jsonplaceholder.typicode.com';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor để thêm auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor để handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Functions
export const coursesAPI = {
  // Lấy tất cả khóa học
  getAllCourses: async (params = {}) => {
    try {
      // Sử dụng JSONPlaceholder như một mock API
      const response = await apiClient.get('/posts', { params });
      
      // Transform data to match our course structure
      const courses = response.data.map((post, index) => ({
        id: post.id,
        name: `Khóa học ${post.title.split(' ').slice(0, 3).join(' ')}`,
        price: Math.floor(Math.random() * 1000000) + 200000,
        image: `https://picsum.photos/400/250?random=${post.id}`,
        shortDescription: post.body.substring(0, 100) + '...',
        fullDescription: post.body,
        category: ['Lập trình', 'Ngoại ngữ', 'Thiết kế', 'Marketing', 'Sức khỏe', 'Tài chính'][index % 6],
        rating: (Math.random() * 2 + 3).toFixed(1),
        students: Math.floor(Math.random() * 2000) + 100,
        duration: `${Math.floor(Math.random() * 50) + 10} giờ`,
        level: ['Cơ bản', 'Trung cấp', 'Nâng cao'][Math.floor(Math.random() * 3)],
        instructor: `Giảng viên ${String.fromCharCode(65 + (index % 26))}`
      }));
      
      return courses;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw new Error('Không thể tải danh sách khóa học');
    }
  },

  // Lấy chi tiết khóa học
  getCourseById: async (id) => {
    try {
      const response = await apiClient.get(`/posts/${id}`);
      const post = response.data;
      
      return {
        id: post.id,
        name: `Khóa học ${post.title}`,
        price: Math.floor(Math.random() * 1000000) + 200000,
        image: `https://picsum.photos/400/250?random=${post.id}`,
        shortDescription: post.body.substring(0, 100) + '...',
        fullDescription: post.body,
        category: ['Lập trình', 'Ngoại ngữ', 'Thiết kế', 'Marketing', 'Sức khỏe', 'Tài chính'][post.id % 6],
        rating: (Math.random() * 2 + 3).toFixed(1),
        students: Math.floor(Math.random() * 2000) + 100,
        duration: `${Math.floor(Math.random() * 50) + 10} giờ`,
        level: ['Cơ bản', 'Trung cấp', 'Nâng cao'][Math.floor(Math.random() * 3)],
        instructor: `Giảng viên ${String.fromCharCode(65 + (post.id % 26))}`
      };
    } catch (error) {
      console.error('Error fetching course:', error);
      throw new Error('Không thể tải thông tin khóa học');
    }
  },

  // Tìm kiếm khóa học
  searchCourses: async (query, filters = {}) => {
    try {
      const params = {
        q: query,
        ...filters
      };
      
      const response = await apiClient.get('/posts', { params });
      const courses = response.data.map((post, index) => ({
        id: post.id,
        name: `Khóa học ${post.title.split(' ').slice(0, 3).join(' ')}`,
        price: Math.floor(Math.random() * 1000000) + 200000,
        image: `https://picsum.photos/400/250?random=${post.id}`,
        shortDescription: post.body.substring(0, 100) + '...',
        fullDescription: post.body,
        category: ['Lập trình', 'Ngoại ngữ', 'Thiết kế', 'Marketing', 'Sức khỏe', 'Tài chính'][index % 6],
        rating: (Math.random() * 2 + 3).toFixed(1),
        students: Math.floor(Math.random() * 2000) + 100,
        duration: `${Math.floor(Math.random() * 50) + 10} giờ`,
        level: ['Cơ bản', 'Trung cấp', 'Nâng cao'][Math.floor(Math.random() * 3)],
        instructor: `Giảng viên ${String.fromCharCode(65 + (index % 26))}`
      }));
      
      return courses;
    } catch (error) {
      console.error('Error searching courses:', error);
      throw new Error('Không thể tìm kiếm khóa học');
    }
  },

  // AI Suggestions - Thuật toán gợi ý thông minh
  getAISuggestions: async (userId, preferences = {}) => {
    try {
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Lấy dữ liệu user profile và lịch sử
      const userProfile = await getUserProfile(userId);
      const userHistory = await getUserHistory(userId);
      const userFavorites = await getUserFavorites(userId);
      const userCart = await getUserCart(userId); // Thêm phân tích giỏ hàng
      
      // Simulate API call to get all available courses
      const response = await apiClient.get('/posts', { params: { _limit: 20 } });
      
      // AI Algorithm: Tính điểm phù hợp cho từng khóa học
      const suggestions = response.data.map((post, index) => {
        const course = {
          id: post.id,
          name: `[AI Gợi ý] ${post.title.split(' ').slice(0, 4).join(' ')}`,
          price: Math.floor(Math.random() * 800000) + 300000,
          image: `https://picsum.photos/400/250?random=${post.id + 100}`,
          shortDescription: `Khóa học được AI gợi ý dựa trên sở thích của bạn. ${post.body.substring(0, 80)}...`,
          fullDescription: post.body,
          category: ['AI/ML', 'Data Science', 'Python', 'JavaScript', 'React', 'Node.js', 'DevOps', 'Mobile', 'UI/UX'][index % 9],
          rating: (Math.random() * 1 + 4).toFixed(1),
          students: Math.floor(Math.random() * 1500) + 500,
          duration: `${Math.floor(Math.random() * 40) + 20} giờ`,
          level: ['Cơ bản', 'Trung cấp', 'Nâng cao'][Math.floor(Math.random() * 3)],
          instructor: `AI Mentor ${String.fromCharCode(65 + (index % 26))}`,
          isAISuggestion: true
        };

        // Tính AI Score dựa trên nhiều yếu tố
        let aiScore = 50; // Base score
        let reasons = [];

        // 1. Phân tích lịch sử xem (20 điểm)
        if (userHistory.viewedCategories?.includes(course.category)) {
          aiScore += 20;
          reasons.push('Phù hợp với lịch sử học tập của bạn');
        }

        // 2. Phân tích sở thích (15 điểm)
        if (userFavorites.preferredCategories?.includes(course.category)) {
          aiScore += 15;
          reasons.push('Thuộc lĩnh vực bạn yêu thích');
        }

        // 3. Phân tích giỏ hàng - NEW! (20 điểm)
        const cartAnalysis = analyzeCartForRecommendations(userCart, course);
        if (cartAnalysis.score > 0) {
          aiScore += cartAnalysis.score;
          reasons.push(cartAnalysis.reason);
        }

        // 4. Level progression (10 điểm)
        if (shouldRecommendLevel(userProfile.currentLevel, course.level)) {
          aiScore += 10;
          reasons.push('Phù hợp với trình độ hiện tại của bạn');
        }

        // 5. Trending factor (10 điểm)
        if (isTrendingCourse(course.category)) {
          aiScore += 10;
          reasons.push('Trending trong lĩnh vực bạn quan tâm');
        }

        // 6. Skill gap analysis (15 điểm)
        if (fillsSkillGap(userProfile.currentSkills, course.category)) {
          aiScore += 15;
          reasons.push('Kỹ năng bổ trợ cần thiết cho career path');
        }

        // 7. Similar user behavior (5 điểm)
        if (Math.random() > 0.5) { // Simulate collaborative filtering
          aiScore += 5;
          reasons.push('Được học viên có profile tương tự đánh giá cao');
        }

        // 8. Time-based relevance (5 điểm)
        if (isTimeRelevant(course.category)) {
          aiScore += 5;
          reasons.push('Phù hợp với xu hướng thị trường hiện tại');
        }

        course.aiScore = Math.min(aiScore, 100); // Cap at 100
        course.reasons = reasons.length > 0 ? reasons[0] : 'Được AI đề xuất dành cho bạn';
        course.matchPercentage = course.aiScore;

        return course;
      });
      
      // Lọc và sắp xếp theo AI score
      const topSuggestions = suggestions
        .filter(course => course.aiScore >= 70) // Chỉ lấy khóa học có điểm >= 70
        .sort((a, b) => b.aiScore - a.aiScore)
        .slice(0, 8); // Lấy top 8

      // Nếu không đủ 8 khóa học, thêm các khóa học random nhưng chất lượng cao
      if (topSuggestions.length < 8) {
        const additionalCourses = suggestions
          .filter(course => course.aiScore < 70 && course.rating >= 4.0)
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 8 - topSuggestions.length);
        
        topSuggestions.push(...additionalCourses);
      }

      return topSuggestions;
    } catch (error) {
      console.error('Error getting AI suggestions:', error);
      throw new Error('Không thể lấy gợi ý từ AI');
    }
  },

  // Lấy khóa học với phân trang (lazy loading)
  getCoursesWithPagination: async (page = 1, limit = 12) => {
    try {
      const start = (page - 1) * limit;
      const response = await apiClient.get('/posts', { 
        params: { 
          _start: start,
          _limit: limit 
        } 
      });
      
      const courses = response.data.map((post, index) => ({
        id: post.id,
        name: `Khóa học ${post.title.split(' ').slice(0, 3).join(' ')}`,
        price: Math.floor(Math.random() * 1000000) + 200000,
        image: `https://picsum.photos/400/250?random=${post.id}`,
        shortDescription: post.body.substring(0, 100) + '...',
        fullDescription: post.body,
        category: ['Lập trình', 'Ngoại ngữ', 'Thiết kế', 'Marketing', 'Sức khỏe', 'Tài chính'][index % 6],
        rating: (Math.random() * 2 + 3).toFixed(1),
        students: Math.floor(Math.random() * 2000) + 100,
        duration: `${Math.floor(Math.random() * 50) + 10} giờ`,
        level: ['Cơ bản', 'Trung cấp', 'Nâng cao'][Math.floor(Math.random() * 3)],
        instructor: `Giảng viên ${String.fromCharCode(65 + (index % 26))}`
      }));
      
      // Get total count for pagination (simulate)
      const total = 100; // Simulate total courses
      const hasMore = start + limit < total;
      
      return {
        courses,
        pagination: {
          page,
          limit,
          total,
          hasMore,
          totalPages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      console.error('Error fetching courses with pagination:', error);
      throw new Error('Không thể tải danh sách khóa học');
    }
  }
};

// User API
export const userAPI = {
  // Đăng nhập
  login: async (credentials) => {
    try {
      const response = await apiClient.post('/posts', {
        title: 'User Login',
        body: JSON.stringify(credentials),
        userId: 1
      });
      
      // Mock successful login
      const token = 'mock-jwt-token-' + Date.now();
      localStorage.setItem('authToken', token);
      
      return {
        user: {
          id: 1,
          name: 'Người dùng EduMart',
          email: credentials.email,
          avatar: 'https://picsum.photos/100/100?random=1'
        },
        token
      };
    } catch (error) {
      throw new Error('Đăng nhập thất bại');
    }
  },

  // Đăng ký
  register: async (userData) => {
    try {
      const response = await apiClient.post('/posts', {
        title: 'User Registration',
        body: JSON.stringify(userData),
        userId: 1
      });
      
      return {
        user: {
          id: response.data.id,
          name: userData.name,
          email: userData.email,
          avatar: 'https://picsum.photos/100/100?random=2'
        }
      };
    } catch (error) {
      throw new Error('Đăng ký thất bại');
    }
  },

  // Lấy profile user
  getProfile: async () => {
    try {
      const response = await apiClient.get('/users/1');
      return {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        avatar: 'https://picsum.photos/100/100?random=3'
      };
    } catch (error) {
      throw new Error('Không thể tải thông tin người dùng');
    }
  }
};

// Orders API
export const ordersAPI = {
  // Tạo đơn hàng
  createOrder: async (orderData) => {
    try {
      const response = await apiClient.post('/posts', {
        title: 'Course Order',
        body: JSON.stringify(orderData),
        userId: 1
      });
      
      return {
        id: response.data.id,
        ...orderData,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      throw new Error('Không thể tạo đơn hàng');
    }
  },

  // Lấy lịch sử đơn hàng
  getOrderHistory: async () => {
    try {
      const response = await apiClient.get('/posts', { 
        params: { userId: 1, _limit: 10 } 
      });
      
      return response.data.map(post => ({
        id: post.id,
        courseName: `Khóa học ${post.title.split(' ').slice(0, 3).join(' ')}`,
        price: Math.floor(Math.random() * 1000000) + 200000,
        status: ['completed', 'pending', 'cancelled'][Math.floor(Math.random() * 3)],
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
      }));
    } catch (error) {
      throw new Error('Không thể tải lịch sử đơn hàng');
    }
  }
};

// AI Helper Functions for Smart Recommendations
const getUserProfile = async (userId) => {
  // Simulate getting user profile from localStorage or API
  const defaultProfile = {
    currentLevel: 'Cơ bản',
    currentSkills: ['JavaScript', 'HTML', 'CSS'],
    learningGoals: ['React', 'Node.js', 'AI/ML'],
    careerPath: 'Full-stack Developer',
    experienceYears: 1
  };

  try {
    const storedProfile = localStorage.getItem(`userProfile_${userId}`);
    return storedProfile ? JSON.parse(storedProfile) : defaultProfile;
  } catch {
    return defaultProfile;
  }
};

const getUserHistory = async (userId) => {
  // Simulate getting user history from localStorage
  const defaultHistory = {
    viewedCategories: ['Lập trình', 'JavaScript'],
    completedCourses: [],
    timeSpentByCategory: {
      'Lập trình': 120, // minutes
      'JavaScript': 80
    },
    recentSearches: ['React', 'JavaScript']
  };

  try {
    const viewHistory = localStorage.getItem('viewHistory');
    const parsedHistory = viewHistory ? JSON.parse(viewHistory) : [];
    
    const viewedCategories = [...new Set(parsedHistory.map(course => course.category))];
    
    return {
      ...defaultHistory,
      viewedCategories: viewedCategories.length > 0 ? viewedCategories : defaultHistory.viewedCategories
    };
  } catch {
    return defaultHistory;
  }
};

const getUserFavorites = async (userId) => {
  // Simulate getting user favorites
  const defaultFavorites = {
    preferredCategories: ['Lập trình'],
    favoriteInstructors: [],
    preferredDifficulty: 'Trung cấp',
    preferredDuration: '20-40 giờ'
  };

  try {
    const favorites = localStorage.getItem('favorites');
    const parsedFavorites = favorites ? JSON.parse(favorites) : [];
    
    const preferredCategories = [...new Set(parsedFavorites.map(course => course.category))];
    
    return {
      ...defaultFavorites,
      preferredCategories: preferredCategories.length > 0 ? preferredCategories : defaultFavorites.preferredCategories
    };
  } catch {
    return defaultFavorites;
  }
};

const getUserCart = async (userId) => {
  // Simulate getting user cart from localStorage
  const defaultCart = {
    items: [],
    categories: [],
    totalValue: 0,
    preferredPriceRange: { min: 0, max: 1000000 }
  };

  try {
    const cart = localStorage.getItem('cart');
    const parsedCart = cart ? JSON.parse(cart) : [];
    
    if (parsedCart.length === 0) {
      return defaultCart;
    }

    // Analyze cart items (simulate getting course details from cart IDs)
    const cartCategories = ['Lập trình', 'JavaScript', 'React']; // Simulated categories
    const totalValue = parsedCart.length * 500000; // Estimate total value
    
    return {
      items: parsedCart,
      categories: cartCategories,
      totalValue,
      preferredPriceRange: {
        min: Math.floor(totalValue * 0.7),
        max: Math.floor(totalValue * 1.3)
      }
    };
  } catch {
    return defaultCart;
  }
};

const analyzeCartForRecommendations = (userCart, course) => {
  let score = 0;
  let reason = '';

  // 1. Category matching với items trong giỏ hàng (15 điểm)
  if (userCart.categories?.includes(course.category)) {
    score += 15;
    reason = 'Bổ sung cho các khóa học trong giỏ hàng của bạn';
    return { score, reason };
  }

  // 2. Complementary skills (12 điểm)
  const complementarySkills = getComplementarySkills(userCart.categories, course.category);
  if (complementarySkills) {
    score += 12;
    reason = 'Kỹ năng bổ trợ hoàn hảo cho khóa học trong giỏ hàng';
    return { score, reason };
  }

  // 3. Price range compatibility (8 điểm)
  if (isPriceCompatible(userCart.preferredPriceRange, course.price)) {
    score += 8;
    reason = 'Phù hợp với ngân sách bạn đã chọn';
    return { score, reason };
  }

  // 4. Learning path progression (10 điểm)
  if (isLearningPathProgression(userCart.categories, course.category)) {
    score += 10;
    reason = 'Bước tiếp theo trong lộ trình học tập của bạn';
    return { score, reason };
  }

  // 5. Nếu giỏ hàng trống nhưng user có lịch sử browsing (5 điểm)
  if (userCart.items.length === 0) {
    score += 5;
    reason = 'Khóa học phổ biến cho người mới bắt đầu';
  }

  return { score, reason };
};

const getComplementarySkills = (cartCategories, courseCategory) => {
  const complementaryMap = {
    'JavaScript': ['React', 'Node.js', 'Vue.js', 'Angular'],
    'React': ['Node.js', 'Mobile', 'UI/UX', 'DevOps'],
    'Python': ['AI/ML', 'Data Science', 'Django', 'Flask'],
    'Lập trình': ['JavaScript', 'Python', 'React', 'Node.js'],
    'HTML': ['CSS', 'JavaScript', 'UI/UX'],
    'CSS': ['JavaScript', 'UI/UX', 'Thiết kế'],
    'Node.js': ['Database', 'DevOps', 'API Design'],
    'AI/ML': ['Data Science', 'Python', 'Deep Learning'],
    'Data Science': ['Python', 'AI/ML', 'Statistics']
  };

  for (const cartCategory of cartCategories) {
    if (complementaryMap[cartCategory]?.includes(courseCategory)) {
      return true;
    }
  }
  return false;
};

const isPriceCompatible = (preferredRange, coursePrice) => {
  return coursePrice >= preferredRange.min && coursePrice <= preferredRange.max;
};

const isLearningPathProgression = (cartCategories, courseCategory) => {
  const learningPaths = {
    'HTML': ['CSS', 'JavaScript'],
    'CSS': ['JavaScript', 'React'],
    'JavaScript': ['React', 'Node.js', 'Vue.js'],
    'React': ['Node.js', 'Mobile', 'Advanced React'],
    'Python': ['Django', 'Flask', 'AI/ML', 'Data Science'],
    'AI/ML': ['Deep Learning', 'Computer Vision', 'NLP'],
    'Lập trình': ['JavaScript', 'Python', 'Java']
  };

  for (const cartCategory of cartCategories) {
    if (learningPaths[cartCategory]?.includes(courseCategory)) {
      return true;
    }
  }
  return false;
};

const shouldRecommendLevel = (currentLevel, courseLevel) => {
  const levelHierarchy = {
    'Cơ bản': ['Cơ bản', 'Trung cấp'],
    'Trung cấp': ['Trung cấp', 'Nâng cao'],
    'Nâng cao': ['Nâng cao']
  };
  
  return levelHierarchy[currentLevel]?.includes(courseLevel) || false;
};

const isTrendingCourse = (category) => {
  const trendingCategories = [
    'AI/ML', 
    'Data Science', 
    'React', 
    'Node.js', 
    'Python', 
    'DevOps',
    'Blockchain',
    'Mobile'
  ];
  
  return trendingCategories.includes(category);
};

const fillsSkillGap = (currentSkills = [], courseCategory) => {
  const skillGaps = {
    'JavaScript': ['React', 'Node.js', 'Vue.js'],
    'Python': ['AI/ML', 'Data Science', 'Django'],
    'HTML': ['CSS', 'JavaScript', 'UI/UX'],
    'CSS': ['JavaScript', 'UI/UX', 'Thiết kế'],
    'React': ['Node.js', 'Mobile', 'DevOps'],
    'Node.js': ['DevOps', 'Database', 'API Design']
  };
  
  // Check if course category fills a skill gap
  for (const skill of currentSkills) {
    if (skillGaps[skill]?.includes(courseCategory)) {
      return true;
    }
  }
  
  return false;
};

const isTimeRelevant = (category) => {
  // Categories that are particularly relevant in current time
  const currentHotTopics = [
    'AI/ML',
    'Data Science', 
    'React',
    'Node.js',
    'DevOps',
    'Mobile',
    'Blockchain'
  ];
  
  return currentHotTopics.includes(category);
};

export default apiClient;
