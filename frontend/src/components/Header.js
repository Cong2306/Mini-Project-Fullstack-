import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="header">
      <h2>Inventory & Orders</h2>

      <div className="auth-buttons">
        {user ? (
          <>
            <span style={{ marginRight: 12 }}>
              👋 {user.fullName || user.username}
            </span>

            <button
              className="btn btn-outline"
              onClick={() => {
                localStorage.clear();
                navigate("/");
                window.location.reload();
              }}
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-outline"
              onClick={() => navigate("/login")}
            >
              Đăng nhập
            </button>

            <button
              className="btn btn-outline"
              onClick={() => navigate("/register")}
            >
              Đăng ký
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
