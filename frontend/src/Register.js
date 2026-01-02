// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css"; // giữ CSS bạn đang dùng

const API_URL = "http://localhost:5000/api/auth";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // mặc định user
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/register`, {
        username,
        fullName,
        password,
        role,
      });

      setMessage(`✅ Tạo tài khoản thành công: ${res.data.username}`);

      // Reset form
      setUsername("");
      setFullName("");
      setPassword("");
      setRole("user");

      // Redirect sang login sau 2s
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "❌ Lỗi tạo tài khoản");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Đăng ký</h2>

        <form onSubmit={handleRegister} className="form-register">
          <input
            type="text"
            placeholder="Tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Họ và tên"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="role-select"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" className="btn btn-primary">
            Tạo tài khoản
          </button>
        </form>

        {message && <p className="message">{message}</p>}

        <p className="switch">
          Đã có tài khoản?
          <span onClick={() => navigate("/login")}> Đăng nhập</span>
        </p>

        <p className="back-home" onClick={() => navigate("/")}>
          ← Quay về trang chủ
        </p>
      </div>
    </div>
  );
}
