# 📦 Inventory & Orders Management System

Ứng dụng quản lý kho hàng và đơn hàng dành cho các cửa hàng điện tử. Hệ thống giúp theo dõi hàng hóa, xử lý đơn hàng và giám sát tồn kho một cách hiệu quả.

---

## ✨ Các chức năng chính

* **Xác thực người dùng:** Đăng nhập và đăng ký để truy cập hệ thống.
* **Quản lý sản phẩm:** Cho phép thực hiện các thao tác **Thêm, Sửa, Xóa** sản phẩm điện tử.
* **Quản lý đơn hàng:** * Xem danh sách đơn hàng.
    * Tạo đơn hàng mới.
    * Chỉnh sửa trạng thái đơn hàng.
* **Quản lý tồn kho (Dashboard):** * Theo dõi lượng hàng hiện có.
    * Cảnh báo sản phẩm **Sắp hết hàng** hoặc **Đã hết hàng**.

---

## 🔑 Thông tin đăng nhập dùng thử

> **Lưu ý:** Bạn cần đăng nhập để sử dụng toàn bộ chức năng.
* **Tài khoản:** `123`
* **Mật khẩu:** `123`

---

## 🛠 Hướng dẫn chạy dự án trên Local

Để cài đặt và chạy ứng dụng tại máy cá nhân, hãy thực hiện theo các bước sau:

1.  **Tải mã nguồn:** Download hoặc Clone toàn bộ source code về máy.
2.  **Mở dự án:** Sử dụng các IDE như VS Code để mở thư mục dự án.
3.  **Cấu hình API:**
    * Tìm và đổi tất cả link API từ `https://project-final-otbm.onrender.com` thành `http://localhost:xxxx` (với `xxxx` là cổng Backend của bạn).
4.  **Chạy Backend:**
    ```bash
    cd backend
    npm install   # Cần cài đặt thêm các package cần thiết
    node server.js
    ```
5.  **Chạy Frontend:**
    ```bash
    cd frontend
    npm install   # Cài đặt thư viện liên quan
    npm start
    ```

---

## 🚧 Hạn chế hiện tại

* Chưa thực hiện chức năng **Upload ảnh**.
* Phần quản lý User sau khi đăng nhập chưa được xử lý sâu.
* Giao diện còn **thô sơ**, chưa có sự đồng bộ cao.

## 🚀 Tiện ích tích hợp thêm

* [ ] Xây dựng bộ lọc (**Filter**) sản phẩm thông minh.
* [ ] Tích hợp thanh **Tìm kiếm** (Search) nâng cao.
* [ ] Hoàn thiện và đồng bộ hóa giao diện người dùng.

---
*Chúc bạn cài đặt và trải nghiệm dự án thành công!*
