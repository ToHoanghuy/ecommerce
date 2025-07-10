# EduMart - Sàn Giáo Dục Thương Mại Điện Tử với AI

Một sàn giáo dục thương mại điện tử hiện đại được xây dựng với React.js, tích hợp các tính năng AI thông minh và hệ thống đăng nhập để cải thiện trải nghiệm người dùng.

## 🌟 Tính năng nổi bật

### � Hệ thống đăng nhập/đăng ký
- **Đăng nhập/Đăng ký**: Form đầy đủ với validation
- **Bảo vệ route**: Các trang yêu cầu đăng nhập được bảo vệ
- **Quản lý session**: Lưu trữ thông tin người dùng
- **Redirect thông minh**: Chuyển hướng sau khi đăng nhập
- **UI/UX hiện đại**: Giao diện đẹp với animation

### �📚 Quản lý khóa học
- **Hiển thị danh sách**: Grid layout responsive với lazy loading
- **Chi tiết khóa học**: Trang riêng với đầy đủ thông tin
- **Phân loại khóa học**: Lập trình, AI/ML, Data Science, Mobile, v.v.
- **Skeleton loading**: Hiệu ứng loading khi tải dữ liệu
- **Error handling**: Xử lý lỗi một cách graceful

### 🔍 Tìm kiếm và lọc nâng cao
- **Tìm kiếm realtime**: Tìm theo tên, mô tả, giảng viên
- **Lọc theo giá**: Nhiều khoảng giá linh hoạt
- **Lọc theo danh mục**: 10+ danh mục chi tiết
- **Lọc theo trình độ**: Cơ bản, Trung cấp, Nâng cao
- **URL parameters**: Lưu trạng thái search trong URL

### 🤖 AI thông minh
- **Gợi ý cá nhân hóa**: AI phân tích hành vi và đưa ra gợi ý
- **Thuật toán thông minh**: Dựa trên lịch sử, sở thích, giỏ hàng
- **AI Score Badge**: Hiển thị điểm AI và lý do gợi ý
- **Chatbot tư vấn**: Trò chuyện với AI (tính năng mở rộng)
- **Machine Learning**: Học từ hành vi người dùng

### 💝 Quản lý yêu thích
- **Toast animation**: Hiệu ứng đẹp mắt khi thêm/xóa
- **Trang riêng**: `/favorites` với quản lý đầy đủ
- **Sync dữ liệu**: Đồng bộ với localStorage
- **Bulk actions**: Xóa tất cả, quản lý hàng loạt
- **Floating hearts**: Animation trái tim bay khi yêu thích

### 🛒 Giỏ hàng nâng cao
- **Trang riêng**: `/cart` với giao diện chuyên nghiệp
- **Tính tổng tiền**: Hiển thị tổng giá trị đơn hàng
- **Quản lý items**: Thêm, xóa, cập nhật số lượng
- **Persistent storage**: Lưu trữ bền vững
- **Checkout flow**: Luồng thanh toán hoàn chỉnh

### 📖 Lịch sử xem thông minh
- **Trang Home**: Hiển thị 4 khóa học gần nhất
- **Trang riêng**: `/history` với tìm kiếm và lọc
- **Auto tracking**: Tự động ghi nhận khi xem chi tiết
- **Search trong lịch sử**: Tìm kiếm nhanh trong lịch sử
- **Responsive design**: Hiển thị tốt trên mọi thiết bị

### 🎨 UI/UX hiện đại
- **Responsive design**: Hoạt động tốt trên mọi thiết bị
- **Loading states**: Skeleton loading cho mọi component
- **Error boundaries**: Xử lý lỗi graceful
- **Toast notifications**: Thông báo đẹp mắt với animation
- **Dark mode ready**: Chuẩn bị sẵn cho chế độ tối

### 🔗 Routing nâng cao
- **React Router**: Navigation mượt mà giữa các trang
- **Protected routes**: Bảo vệ trang cần đăng nhập
- **Dynamic routing**: Route động cho course detail
- **404 handling**: Xử lý trang không tồn tại
- **Back navigation**: Nút quay lại thông minh

## 🛠️ Cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js >= 14.0.0
- npm >= 6.0.0

### Bước 1: Clone repository
```bash
git clone https://github.com/ToHoanghuy/ecommerce
cd ecommerce
```

### Bước 2: Cài đặt dependencies
```bash
npm install
```

### Bước 3: Chạy development server
```bash
npm start
```

Ứng dụng sẽ chạy tại http://localhost:3000

### Bước 4: Build production
```bash
npm run build
```

## 📁 Cấu trúc dự án

```
src/
├── components/           # React components
│   ├── Header.js        # Navigation header với auth
│   ├── Layout.js        # Layout wrapper component
│   ├── Filter.js        # Search & filter component
│   ├── CourseCard.js    # Individual course card
│   ├── CartModal.js     # Shopping cart modal
│   ├── AuthModal.js     # Login/Register modal
│   ├── ViewHistory.js   # View history component
│   ├── LazyLoadCourses.js # Lazy loading courses
│   ├── LoadingSkeleton.js # Loading placeholders
│   ├── Toast.js         # Toast notification system
│   ├── AIScoreBadge.js  # AI score display
│   └── ProtectedRoute.js # Route protection
├── pages/               # Page components
│   ├── HomePage.js      # Main homepage
│   ├── CourseDetail.js  # Course detail page
│   ├── Favorites.js     # Favorites management
│   ├── Cart.js          # Shopping cart page
│   ├── AISuggestions.js # AI suggestions page
│   ├── History.js       # View history page
│   └── Auth.js          # Login/Register page
├── context/             # React Context
│   ├── AppContext.js    # Global app state
│   ├── AuthContext.js   # Authentication state
│   └── ToastContext.js  # Toast notifications
├── services/            # API services
│   └── api.js          # API calls & mock data
├── data/                # Mock data
│   ├── mockData.js     # Courses data
│   └── mockUsers.js    # Users data
├── App.js              # Main app component
├── App.css             # Global styles
└── index.js            # App entry point
```

## 🎯 Hướng dẫn sử dụng

### 1. Đăng nhập/Đăng ký
- Truy cập `/auth` hoặc click nút đăng nhập
- **Demo account**: `nguyenvana@example.com` / `123456`
- Đăng ký tài khoản mới với email và mật khẩu
- Tự động redirect sau khi đăng nhập thành công

### 2. Tìm kiếm khóa học
- Sử dụng thanh tìm kiếm ở header
- Áp dụng filter theo danh mục, giá, trình độ
- Xem kết quả realtime với lazy loading

### 3. Xem chi tiết khóa học
- Click vào khóa học hoặc nút "Xem chi tiết"
- Trang riêng với đầy đủ thông tin
- Thêm vào yêu thích hoặc giỏ hàng với toast animation

### 4. Sử dụng AI Suggestions
- **Yêu cầu đăng nhập**: Tính năng chỉ dành cho thành viên
- AI phân tích lịch sử, sở thích, giỏ hàng
- Nhận gợi ý cá nhân hóa với AI Score
- Refresh để có gợi ý mới

### 5. Quản lý yêu thích và giỏ hàng
- Click icon trái tim với animation floating hearts
- Quản lý danh sách yêu thích tại `/favorites`
- Xem giỏ hàng tại `/cart` với tính năng đầy đủ

### 6. Lịch sử xem
- Tự động ghi nhận khi xem chi tiết khóa học
- Xem 4 khóa học gần nhất ở homepage
- Xem toàn bộ lịch sử tại `/history` với tìm kiếm

## 🚀 Công nghệ sử dụng

### Frontend
- **React 19.1.0**: UI library hiện đại
- **React Router 7.6.3**: Client-side routing
- **Lucide React**: Icon library đẹp
- **Axios**: HTTP client cho API calls

### State Management
- **React Context**: Global state management
- **Local Storage**: Persistent data storage
- **Custom Hooks**: Reusable logic

### Styling
- **CSS Modules**: Component-scoped styling
- **Responsive Design**: Mobile-first approach
- **CSS Animations**: Smooth transitions

### Tools & Libraries
- **React Scripts**: Build tooling
- **ESLint**: Code linting
- **Web Vitals**: Performance monitoring

## 📱 Responsive Design

Ứng dụng được thiết kế responsive cho:
- **Desktop**: > 1200px
- **Tablet**: 768px - 1199px  
- **Mobile**: < 768px

Tất cả components đều tối ưu cho mobile với:
- Touch-friendly interface
- Optimized loading states
- Compressed layouts

## 🧪 Testing

```bash
# Chạy tests
npm test

# Chạy tests với coverage
npm test -- --coverage
```

## 🚀 Triển khai

### Vercel 
link: https://ecommerce-nu-smoky-85.vercel.app/


---

⭐ **Nếu dự án hữu ích, hãy cho một star trên GitHub!** ⭐

**Được phát triển với ❤️ bởi EduMart Team**
