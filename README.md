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

---

# Hướng dẫn chạy chương trình

Đây là hướng dẫn để chạy phần mềm quản lý đơn hàng và tồn kho.

---

## 1. Backend
1. Mở terminal, chuyển vào thư mục `backend`:
   ```bash
   cd backend
Cài các package cần thiết:

bash
Sao chép mã
npm install
Kiểm tra và cập nhật các biến môi trường trong file .env nếu có.

Khởi chạy server:

bash
Sao chép mã
node server.js
Backend mặc định chạy trên port trong .env (ví dụ 5000).

2. Frontend
Mở terminal, chuyển vào thư mục frontend:

bash
Sao chép mã
cd frontend
Cài các package:

bash
Sao chép mã
npm install
Khởi chạy ứng dụng:

bash
Sao chép mã
npm start
Ứng dụng mặc định chạy tại http://localhost:3000.

3. Chạy môi trường Production (tùy chọn)
Build frontend:

bash
Sao chép mã
npm run build
Cấu hình backend phục vụ thư mục build để chạy sản phẩm ở môi trường production.


