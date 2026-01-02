import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById, updateOrderStatus } from "./services/orderService";
import "./Orders_Detail.css";

function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getOrderById(id).then(res => {
      setOrder(res.data);
      setNewStatus(res.data.status);
    });
  }, [id]);

  if (!order) return <p>⏳ Loading...</p>;

  // ===== Logic trạng thái tuần tự =====
  const statusOrder = ["pending", "confirmed", "shipping", "completed"];
  const currentIndex = statusOrder.indexOf(order.status);

  const allowedStatuses = [
    order.status, // luôn hiển thị trạng thái hiện tại
    ...statusOrder.slice(currentIndex + 1),
  ];

  // luôn cho phép cancelled nếu chưa bị cancelled
  if (order.status !== "cancelled") allowedStatuses.push("cancelled");

  // ===== Tính tổng giá trị đơn hàng =====
  const totalAmount = order.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const handleStatusChange = async () => {
    if (newStatus === order.status) {
      alert("Trạng thái không thay đổi!");
      return;
    }

    setLoading(true);
    try {
      await updateOrderStatus(id, newStatus); // gọi API backend
      setOrder({ ...order, status: newStatus });
      alert("✅ Cập nhật trạng thái thành công!");
    } catch (err) {
      console.error("Lỗi khi cập nhật trạng thái:", err.response?.data || err);
      alert("❌ Cập nhật thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-detail-container">

      {/* ===== Header ===== */}
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

      <button onClick={() => navigate(-1)}>← Quay lại</button>

      <h2>Chi tiết đơn hàng</h2>
      <p><strong>Mã đơn:</strong> {order._id}</p>

      <div className="order-detail-content">
        <div className="order-detail-left">
          <h3>Thông tin người nhận</h3>
          <p><strong>Tên:</strong> {order.recipientName || order.customer?.name || "Chưa có"}</p>
          <p><strong>Địa chỉ:</strong> {order.address || order.customer?.address || "Chưa có"}</p>
          <p><strong>Số điện thoại:</strong> {order.phone || order.customer?.phone || "Chưa có"}</p>
        </div>

        <div className="order-detail-right">
          <p>
            <strong>Trạng thái:</strong>{" "}
            {/* giữ trạng thái hiện tại là default */}
            <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
              {/* luôn hiện trạng thái hiện tại + trạng thái kế tiếp + cancelled */}
              {[order.status, ...statusOrder.slice(currentIndex + 1), "cancelled"]
                .filter((s, i, arr) => arr.indexOf(s) === i) // loại trùng
                .map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
            </select>
            <button onClick={handleStatusChange} disabled={loading}>
              {loading ? "Đang lưu..." : "Lưu"}
            </button>
          </p>

          <h3>Sản phẩm</h3>
          <table>
            <thead>
              <tr>
                <th>Tên</th>
                <th>Số lượng</th>
                <th>Giá</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, i) => (
                <tr key={i} className={item.stock === 0 ? "out-of-stock" : ""}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price.toLocaleString()}</td>
                  <td>{(item.quantity * item.price).toLocaleString()}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="3" style={{ textAlign: "right", fontWeight: "bold" }}>Tổng cộng:</td>
                <td style={{ fontWeight: "bold" }}>{totalAmount.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
