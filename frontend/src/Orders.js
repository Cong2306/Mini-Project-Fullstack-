import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrders } from "./services/orderService";
import "./Orders.css";

const ITEMS_PER_PAGE = 10;

function Orders() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    getOrders()
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  
  /* ===== FILTER ===== */
  const filteredOrders = orders.filter((order) => {
    const keyword = searchTerm.toLowerCase();

    const matchText =
      order.customer?.name?.toLowerCase().includes(keyword) ||
      order.customer?.phone?.includes(keyword);

    const matchStatus =
      statusFilter === "all" || order.status === statusFilter;

    const matchDate =
      !dateFilter ||
      new Date(order.createdAt).toISOString().slice(0, 10) === dateFilter;

    return matchText && matchStatus && matchDate;
  });

  /* ===== PAGINATION ===== */
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentOrders = filteredOrders.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <>
      {/* ===== HEADER ===== */}
      <header className="header">
        <h2>Inventory & Orders</h2>
        <div className="auth-buttons">
          <button className="btn btn-outline" onClick={() => navigate("/login")}>
            Đăng nhập
          </button>
          <button className="btn btn-outline" onClick={() => navigate("/register")}>
            Đăng ký
          </button>
        </div>
      </header>

      {/* ===== CONTENT ===== */}
      <div className="orders-container">
        {/* Nút tạo đơn hàng */}
  <button
    className="create-order-btn"
    onClick={() => navigate("/Orders_Create")}
  >
    + Tạo đơn hàng
  </button>

        <h2>Danh sách đơn hàng</h2>

        {/* ===== TOOLBAR ===== */}
        <div className="orders-toolbar">
          <input
            type="text"
            placeholder="🔍 Tên hoặc SĐT khách hàng..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />

          <input
            type="date"
            className="date-input"
            value={dateFilter}
            onChange={(e) => {
              setDateFilter(e.target.value);
              setCurrentPage(1);
            }}
          />

          <select
            className="status-select"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <table className="orders-table">
          <thead>
            <tr>
              <th>Khách hàng</th>
              <th>SĐT</th>
              <th>Tổng tiền</th>
              <th>Thanh toán</th>
              <th>Trạng thái</th>
              <th>Ngày tạo</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {currentOrders.length > 0 ? (
              currentOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order.customer?.name}</td>
                  <td>{order.customer?.phone}</td>
                  <td>{order.totalAmount?.toLocaleString()} VNĐ</td>
                  <td>{order.paymentMethod}</td>
                  <td className={`status ${order.status}`}>
                    {order.status}
                  </td>
                  <td>
                    {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td>
                    <button
                      className="btn-detail"
                      
                      onClick={() => navigate(`/orders_Detail/${order._id}`)}
                    >
                      Chi tiết
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="empty">
                  Không tìm thấy đơn hàng
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* ===== PAGINATION ===== */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              ◀
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={currentPage === i + 1 ? "active" : ""}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              ▶
            </button>
          </div>
        )}

        <p className="back-home" onClick={() => navigate("/")}>
          ← Quay về trang chủ
        </p>
      </div>
    </>
  );
}

export default Orders;
