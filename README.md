# EduMart - Sàn Giáo Dục Thương Mại Điện Tử với AI

Một sàn giáo dục thương mại điện tử hiện đại được xây dựng với React.js, tích hợp các tính năng AI thông minh để cải thiện trải nghiệm người dùng.

## 🌟 Tính năng nổi bật

### 📚 Quản lý khóa học
- **Hiển thị danh sách khóa học**: Grid layout responsive với thông tin chi tiết
- **Chi tiết khóa học**: Modal popup với đầy đủ thông tin, nội dung học, kỹ năng đạt được
- **Phân loại khóa học**: Lập trình, Ngoại ngữ, Thiết kế, Marketing, Sức khỏe, Tài chính

### 🔍 Tìm kiếm và lọc
- **Tìm kiếm thông minh**: Tìm theo tên, mô tả, danh mục
- **Lọc theo giá**: Dưới 500K, 500K-1M, trên 1M
- **Lọc theo danh mục**: 7 danh mục chính
- **Kết quả realtime**: Cập nhật ngay khi thay đổi bộ lọc

### 🤖 Tính năng AI
- **Gợi ý thông minh**: AI phân tích và đề xuất khóa học phù hợp
- **Chatbot tư vấn**: Trò chuyện với AI để tìm khóa học theo nhu cầu
- **Phân tích hành vi**: Dựa trên lịch sử xem và sở thích
- **Loading skeleton**: Hiệu ứng loading khi AI đang xử lý

### 💝 Quản lý yêu thích
- **Thêm/xóa yêu thích**: Click vào icon trái tim
- **Danh sách yêu thích**: Modal hiển thị tất cả khóa học đã yêu thích
- **Lưu trữ local**: Dữ liệu được lưu trong localStorage
- **Xóa hàng loạt**: Nút xóa tất cả yêu thích

### 🛒 Giỏ hàng
- **Thêm vào giỏ**: Nút thêm vào giỏ hàng trên mỗi khóa học
- **Quản lý giỏ hàng**: Xem, xóa, tính tổng tiền
- **Thanh toán**: Giao diện thanh toán (demo)
- **Persistent storage**: Lưu trữ trong localStorage

### 📖 Lịch sử xem
- **Tự động ghi nhận**: Lưu lại khóa học đã xem
- **Hiển thị gần đây**: 6 khóa học xem gần nhất
- **Xem lại nhanh**: Click để xem lại chi tiết
- **Xóa lịch sử**: Nút xóa toàn bộ lịch sử

### 💬 Chatbot AI tư vấn
- **Giao diện chat**: UI giống messenger hiện đại
- **Tư vấn thông minh**: AI hiểu ngữ cảnh và đưa ra gợi ý
- **Hiển thị khóa học**: Kết quả tư vấn kèm thông tin khóa học
- **Câu hỏi gợi ý**: Quick buttons cho các câu hỏi phổ biến

## 🛠️ Cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js >= 14.0.0
- npm >= 6.0.0

### Bước 1: Cài đặt dependencies
```bash
npm install
```

### Bước 2: Chạy development server
```bash
npm start
```

Ứng dụng sẽ chạy tại http://localhost:3000

### Bước 3: Build production
```bash
npm run build
```

## 📁 Cấu trúc dự án

```
src/
├── components/           # React components
│   ├── Header.js        # Navigation header
│   ├── Filter.js        # Search & filter component
│   ├── CourseCard.js    # Individual course card
│   ├── CourseModal.js   # Course details modal
│   ├── FavoritesModal.js # Favorites list modal
│   ├── SuggestionsModal.js # AI suggestions modal
│   ├── CartModal.js     # Shopping cart modal
│   ├── Chatbot.js       # AI chatbot component
│   ├── ViewHistory.js   # View history component
│   └── LoadingSkeleton.js # Loading placeholders
├── context/             # React Context
│   └── AppContext.js    # Global state management
├── data/                # Mock data
│   └── mockData.js      # Courses data & API simulation
├── App.js              # Main app component
├── App.css             # Global styles
└── index.js            # App entry point
```

## 🎯 Hướng dẫn sử dụng

### 1. Tìm kiếm khóa học
- Sử dụng thanh tìm kiếm ở header
- Chọn danh mục từ bộ lọc
- Lọc theo khoảng giá phù hợp

### 2. Xem chi tiết khóa học
- Click vào khóa học hoặc nút "Xem chi tiết"
- Modal sẽ hiển thị đầy đủ thông tin
- Có thể thêm vào yêu thích hoặc giỏ hàng

### 3. Sử dụng AI
- Click nút "Gợi ý sản phẩm phù hợp" để nhận gợi ý
- Mở chatbot để tư vấn trực tiếp
- AI sẽ phân tích và đưa ra khuyến nghị

### 4. Quản lý yêu thích và giỏ hàng
- Click icon trái tim để thêm/xóa yêu thích
- Click icon giỏ hàng để xem giỏ hàng
- Quản lý các item trong modal tương ứng

## 🚀 Triển khai

### Vercel (Recommended)
1. Push code lên GitHub
2. Import project vào Vercel
3. Deploy tự động

### Netlify
1. Build project: `npm run build`
2. Drag & drop folder `build` vào Netlify

## 🔮 Tính năng trong tương lai

- [ ] **Authentication**: Đăng nhập/đăng ký người dùng
- [ ] **Payment Integration**: Tích hợp cổng thanh toán
- [ ] **Reviews System**: Đánh giá và bình luận khóa học
- [ ] **Progress Tracking**: Theo dõi tiến độ học
- [ ] **Advanced AI**: Machine learning recommendations

---

⭐ **Nếu dự án hữu ích, hãy cho một star trên GitHub!** ⭐

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
