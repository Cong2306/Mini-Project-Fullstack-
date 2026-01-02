Inventory & Orders Management System
Ứng dụng quản lý kho hàng và đơn hàng chuyên biệt cho các cửa hàng thiết bị điện tử. Hệ thống giúp tối ưu hóa quy trình theo dõi hàng hóa, xử lý đơn hàng và giám sát mức độ tồn kho theo thời gian thực.

🚀 Tính năng chính
Hệ thống cung cấp các nhóm chức năng cốt lõi sau:

Xác thực người dùng: Đăng ký và đăng nhập để bảo mật dữ liệu hệ thống.

Quản lý sản phẩm (CRUD): Thêm mới, chỉnh sửa thông tin và xóa sản phẩm khỏi danh mục kinh doanh.

Quản lý đơn hàng: Tạo đơn hàng mới, xem danh sách chi tiết và cập nhật trạng thái đơn hàng (đang xử lý, hoàn thành, hủy).

Quản lý tồn kho (Dashboard): * Theo dõi tổng lượng hàng trong kho.

Cảnh báo thông minh các sản phẩm sắp hết hàng hoặc đã hết hàng.

🛠 Hướng dẫn cài đặt (Local)
Để chạy dự án trên máy tính cá nhân, bạn vui lòng thực hiện theo các bước sau:

1. Tải mã nguồn
Tải toàn bộ source code về máy và mở bằng IDE của bạn (ví dụ: VS Code).

2. Cấu hình API Endpoint
Do dự án đang trỏ link API về server deploy, bạn cần thay đổi để chạy local:

Tìm kiếm toàn bộ link: https://project-final-otbm.onrender.com

Thay thế bằng: http://localhost:xxxx (Trong đó xxxx là cổng Backend của bạn).

3. Chạy Backend
Bash

cd backend
npm install  # Cài đặt các package cần thiết
node server.js
4. Chạy Frontend
Bash

cd frontend
npm install  # Cài đặt các package cần thiết
npm start
Lưu ý: Đảm bảo bạn đã cài đặt Node.js và đừng quên chạy npm install ở cả hai thư mục để tải các thư viện phụ thuộc.

🔐 Thông tin đăng nhập dùng thử
Để truy cập và sử dụng các chức năng, bạn có thể sử dụng tài khoản mặc định sau:

User: 123

Password: 123

⚠️ Hạn chế hiện tại & Hướng phát triển
Hạn chế
Hình ảnh: Chưa tích hợp chức năng upload ảnh trực tiếp cho sản phẩm.

Phân quyền: Hệ thống quản lý user còn đơn giản, chưa phân cấp sâu (Admin/Staff).

Giao diện: UI ở mức cơ bản (MVP), chưa được tối ưu hóa đồng bộ về trải nghiệm người dùng.

Kế hoạch phát triển (Roadmap)
[ ] Phát triển bộ lọc nâng cao (Filter) theo danh mục, giá cả.

[ ] Tích hợp thanh tìm kiếm thông minh (Search Bar).

[ ] Hoàn thiện giao diện người dùng (UI/UX) chuyên nghiệp hơn.

Cảm ơn bạn đã quan tâm đến dự án!
