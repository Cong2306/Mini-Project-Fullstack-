**Phần mềm quản lý đơn hàng và tồn kho**

**Chức năng chính:**

- Quản lý sản phẩm: xem danh sách, thêm mới, chỉnh sửa, xóa sản phẩm.
- Quản lý đơn hàng: xem danh sách, tạo mới đơn hàng (tự động trừ số lượng tồn kho tương ứng).
- Dashboard hiển thị tổng quan về tồn kho và danh sách sản phẩm hiện có.

**Hạn chế hiện tại:**

- Chưa hỗ trợ đăng nhập/đăng xuất.
- Chưa thể tải lên hình ảnh sản phẩm.
- Trạng thái đơn hàng chưa thể cập nhật.

**Phát triển thêm:**

- Thêm chức năng tìm kiếm nâng cao và bộ lọc (filter) khi tra cứu sản phẩm hoặc đơn hàng.


# Hướng dẫn chạy chương trình

Đây là hướng dẫn để chạy phần mềm quản lý đơn hàng và tồn kho.

## Backend
1. Mở terminal, chuyển vào thư mục `backend`:
   cd backend
2. Cài các package cần thiết:
    npm install
3. Kiểm tra và cập nhật các biến môi trường trong file .env nếu có.
4. Khởi chạy server:
    node server.js
    Backend mặc định chạy trên port trong .env (ví dụ 5000).
## Frontend
1. Mở terminal, chuyển vào thư mục frontend:
   cd frontend
2. Cài các package:
   npm install
3. Khởi chạy ứng dụng:
   npm start
   Ứng dụng mặc định chạy tại http://localhost:3000
