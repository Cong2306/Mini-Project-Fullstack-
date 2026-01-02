import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "./services/authService";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔌 trạng thái DB
  const [dbStatus, setDbStatus] = useState("checking"); 
  // checking | connected | disconnected

  // 👤 trạng thái user
  const [user, setUser] = useState(null); // null = chưa login

  const navigate = useNavigate();

  // ===== CHECK DATABASE HEALTH =====
  useEffect(() => {
    const checkDB = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/health");
        if (res.data.success) {
          setDbStatus("connected");
        } else {
          setDbStatus("disconnected");
        }
      } catch (err) {
        setDbStatus("disconnected");
      }
    };

    checkDB();
  }, []);

  // ===== LOAD USER TỪ LOCALSTORAGE =====
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ===== LOGIN =====
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("⚠️ Vui lòng nhập đầy đủ tài khoản và mật khẩu");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // giả sử login trả về object user
      const userData = await login(username, password);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/"); // nếu muốn redirect, hoặc xóa navigate nếu stay trang login
    } catch (err) {
      console.error(err);
      setError("❌ Sai tài khoản hoặc mật khẩu");
    } finally {
      setLoading(false);
    }
  };

  // ===== LOGOUT =====
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <div style={{ maxWidth: 400, margin: "80px auto" }}>
      <h2>Đăng nhập</h2>

      {/* ===== DB STATUS VIEW ===== */}
      <div style={{ marginBottom: 15 }}>
        {dbStatus === "checking" && (
          <span style={{ color: "#555" }}>🔄 Đang kiểm tra kết nối database...</span>
        )}

        {dbStatus === "connected" && (
          <span style={{ color: "green", fontWeight: "bold" }}>
            ✅ Database đã kết nối
          </span>
        )}

        {dbStatus === "disconnected" && (
          <span style={{ color: "red", fontWeight: "bold" }}>
            ❌ Không kết nối được database
          </span>
        )}
      </div>

      {/* ===== USER INFO & LOGOUT ===== */}
      {user && (
        <div style={{ marginBottom: 20 }}>
          <p>👋 Xin chào, <strong>{user.fullName || user.username}</strong></p>
          <button onClick={handleLogout} style={{ padding: "5px 10px" }}>
            Đăng xuất
          </button>
        </div>
      )}

      {/* ===== ERROR ===== */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ===== LOGIN FORM ===== */}
      {!user && (
        <form onSubmit={handleLogin}>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: 10, marginBottom: 10 }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: 10, marginBottom: 20 }}
          />

          <button
            className="btn btn-primary"
            style={{ width: "100%" }}
            disabled={loading || dbStatus !== "connected"}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      )}
    </div>
  );
}

export default Login;
