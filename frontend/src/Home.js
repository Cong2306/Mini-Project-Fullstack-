import { useEffect, useState } from "react";
import "./Home.css";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import Login from "./Login";
import register from "./Register";
import Products from "./Products";

function App() {
  const [message, setMessage] = useState("Đang kiểm tra kết nối...");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5000/api/health")
      .then((res) => {
        if (!res.ok) throw new Error("DB error");
        return res.json();
      })
      .then((data) => {
        setMessage(data.message);
        setError(false);
      })
      .catch(() => {
        setMessage("Kết nối database thất bại");
        setError(true);
      });
  }, []);

  return (
    <>
      {/* ===== Header ===== */}
      <header className="header">
        <h2>Inventory & Orders</h2>

        <div className="auth-buttons">
          <button className="btn btn-outline"onClick={() => navigate("/login")}>
            Đăng nhập
          </button>
          <button className="btn btn-outline"onClick={() => navigate("/register")}>
            Đăng ký
          </button>
        </div>
      </header>

      {/* ===== Main ===== */}
      <main className="container">
        <h1>Inventory & Orders Management</h1>

        <p className={`db-status ${error ? "error" : "success"}`}>
          {message}
        </p>

        <p className="description">
          Đây là trang chủ của ứng dụng quản lý kho và đơn hàng cho cửa hàng điện tử.
        </p>

        {/* ===== Menu giữa trang ===== */}
        <div className="menu-grid">
          <div className="menu-card">
            📦
            <h3><Link to="/products">Quản lý sản phẩm</Link></h3>
            <ul className="submenu">
              {/* <li>➕ Thêm sản phẩm</li> */}
              <button
                className="btn btn-add"
                onClick={() => navigate("/products/create")}
              >
                ➕ Thêm sản phẩm
              </button>
              {/* <li>✏️ Sửa sản phẩm</li>
              <li>🗑️ Xoá sản phẩm</li> */}
            </ul>
          </div>

          <div className="menu-card">
            🧾
            <h3><Link to="/orders">Quản lý đơn hàng</Link></h3>
            <ul className="submenu">
              <button
                className="btn btn-add"
                onClick={() => navigate("/Orders_Create")}
              >
                ➕ 📝 Tạo đơn hàng
              </button>
               <li></li>
               {/* <li>🔍 Theo dõi đơn hàng</li> */}
            </ul>
          </div>

          <div className="menu-card">
            📊
            <h3><Link to="/inventory">Quản lý tồn kho</Link></h3>
            
          </div>
        </div>
      </main>
    </>
  );
}

export default App;

