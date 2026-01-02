import { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate, Link } from "react-router-dom";

function Home() {
  const [message, setMessage] = useState("Đang kiểm tra kết nối...");
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null); // trạng thái user
  const navigate = useNavigate();

  // ===== CHECK DB =====
  useEffect(() => {
    fetch("https://project-final-otbm.onrender.com/api/health")
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

  // ===== LOAD USER TỪ LOCALSTORAGE =====
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ===== LOGOUT =====
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <>
      {/* ===== Header ===== */}
      <header className="header">
        <h2>Inventory & Orders</h2>

        <div className="auth-buttons">
          {user ? (
            <>
              <span>👋 Xin chào, <strong>{user.fullName || user.username}</strong></span>
              <button className="btn btn-outline" onClick={handleLogout}>
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-outline" onClick={() => navigate("/login")}>
                Đăng nhập
              </button>
              <button className="btn btn-outline" onClick={() => navigate("/register")}>
                Đăng ký
              </button>
            </>
          )}
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

        {/* ===== Menu hoặc thông báo ===== */}
        {user ? (
          <div className="menu-grid">
            <div className="menu-card">
              📦
              <h3><Link to="/products">Quản lý sản phẩm</Link></h3>
              <ul className="submenu">
                <button
                  className="btn btn-add"
                  onClick={() => navigate("/products/create")}
                >
                  ➕ Thêm sản phẩm
                </button>
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
              </ul>
            </div>

            <div className="menu-card">
              📊
              <h3><Link to="/inventory">Quản lý tồn kho</Link></h3>
            </div>
          </div>
        ) : (
          <p style={{ marginTop: 40, fontSize: "1.2rem", color: "#555" }}>
            ⚠️ Hãy đăng nhập để trải nghiệm các tính năng
          </p>
        )}
      </main>
    </>
  );
}

export default Home;
