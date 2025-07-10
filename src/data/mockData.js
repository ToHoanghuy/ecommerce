// Mock data cho sàn giáo dục thương mại điện tử
export const courses = [
  {
    id: 1,
    name: "Khóa học JavaScript từ cơ bản đến nâng cao",
    price: 299000,
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400&h=250&fit=crop",
    shortDescription: "Học JavaScript từ A-Z với các dự án thực tế",
    fullDescription: "Khóa học JavaScript toàn diện bao gồm ES6+, DOM manipulation, Async/Await, và nhiều dự án thực tế. Phù hợp cho người mới bắt đầu đến trung cấp.",
    category: "Lập trình",
    rating: 4.8,
    students: 1250,
    duration: "40 giờ",
    level: "Cơ bản đến Nâng cao",
    instructor: "Nguyễn Văn A"
  },
  {
    id: 2,
    name: "Tiếng Anh giao tiếp với người bản xứ",
    price: 599000,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop",
    shortDescription: "Luyện nói tiếng Anh tự tin với giáo viên nước ngoài",
    fullDescription: "Khóa học tiếng Anh giao tiếp 1-1 với giáo viên người Mỹ có kinh nghiệm. Tập trung vào phát âm, từ vựng thực tế và giao tiếp hàng ngày.",
    category: "Ngoại ngữ",
    rating: 4.9,
    students: 890,
    duration: "30 buổi",
    level: "Trung cấp",
    instructor: "John Smith"
  },
  {
    id: 3,
    name: "Thiết kế UI/UX với Figma",
    price: 450000,
    image: "https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=400&h=250&fit=crop",
    shortDescription: "Thiết kế giao diện người dùng chuyên nghiệp",
    fullDescription: "Học cách thiết kế UI/UX hiện đại với Figma. Bao gồm design system, wireframe, prototype và handoff cho developer.",
    category: "Thiết kế",
    rating: 4.7,
    students: 670,
    duration: "25 giờ",
    level: "Cơ bản",
    instructor: "Trần Thị B"
  },
  {
    id: 4,
    name: "Marketing Online hiệu quả",
    price: 399000,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    shortDescription: "Chiến lược marketing số thành công",
    fullDescription: "Khóa học marketing online toàn diện: SEO, SEM, Social Media Marketing, Email Marketing và Analytics. Kèm theo case study thực tế.",
    category: "Marketing",
    rating: 4.6,
    students: 1100,
    duration: "35 giờ",
    level: "Trung cấp",
    instructor: "Lê Văn C"
  },
  {
    id: 5,
    name: "Python cho Data Science",
    price: 750000,
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop",
    shortDescription: "Phân tích dữ liệu với Python và Machine Learning",
    fullDescription: "Khóa học Python Data Science với Pandas, NumPy, Matplotlib, Seaborn và Scikit-learn. Bao gồm các dự án ML thực tế.",
    category: "Lập trình",
    rating: 4.8,
    students: 550,
    duration: "50 giờ",
    level: "Trung cấp đến Nâng cao",
    instructor: "Dr. Phạm Minh D"
  },
  {
    id: 6,
    name: "React.js Mastery",
    price: 699000,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    shortDescription: "Trở thành React Developer chuyên nghiệp",
    fullDescription: "Khóa học React.js từ cơ bản đến nâng cao: Hooks, Context API, Redux, Next.js và deployment. Xây dựng 5 dự án thực tế.",
    category: "Lập trình",
    rating: 4.9,
    students: 980,
    duration: "45 giờ",
    level: "Trung cấp đến Nâng cao",
    instructor: "Hoàng Văn E"
  },
  {
    id: 7,
    name: "Yoga cho người mới bắt đầu",
    price: 299000,
    image: "https://images.unsplash.com/photo-1506629905607-bb019b4e36a8?w=400&h=250&fit=crop",
    shortDescription: "Tập yoga tại nhà với huấn luyện viên chuyên nghiệp",
    fullDescription: "Khóa học yoga cơ bản với các tư thế đơn giản, hướng dẫn thở và thiền. Phù hợp cho mọi lứa tuổi và trình độ.",
    category: "Sức khỏe",
    rating: 4.5,
    students: 420,
    duration: "20 buổi",
    level: "Cơ bản",
    instructor: "Yoga Master Linh"
  },
  {
    id: 8,
    name: "Đầu tư chứng khoán thông minh",
    price: 899000,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
    shortDescription: "Chiến lược đầu tư chứng khoán hiệu quả",
    fullDescription: "Học cách phân tích cơ bản và kỹ thuật, quản lý rủi ro, xây dựng danh mục đầu tư và tâm lý giao dịch chứng khoán.",
    category: "Tài chính",
    rating: 4.7,
    students: 780,
    duration: "30 giờ",
    level: "Trung cấp",
    instructor: "Chuyên gia Đức"
  }
];

export const categories = [
  "Tất cả",
  "Lập trình", 
  "Ngoại ngữ",
  "Thiết kế",
  "Marketing",
  "Sức khỏe",
  "Tài chính"
];

export const priceRanges = [
  { label: "Tất cả", min: 0, max: Infinity },
  { label: "Dưới 500K", min: 0, max: 500000 },
  { label: "500K - 1 triệu", min: 500000, max: 1000000 },
  { label: "Trên 1 triệu", min: 1000000, max: Infinity }
];

// Mock API functions
export const mockAPI = {
  getSuggestions: async (userId) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock logic: return random courses as suggestions
    const shuffled = [...courses].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  },
  
  getCourseDetails: async (courseId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return courses.find(course => course.id === courseId);
  }
};
