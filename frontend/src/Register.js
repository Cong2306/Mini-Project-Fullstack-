import "./Register.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="auth-page">
      {/* Quay về trang chủ */}
      

      <div className="auth-card">
        <h2>Đăng ký</h2>

        <input type="text" placeholder="Tên đăng nhập" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Mật khẩu" />

        <button className="btn btn-primary">Tạo tài khoản</button>

        <p className="switch">
          Đã có tài khoản?
          <span onClick={() => navigate("/login")}> Đăng nhập</span>
        </p>
        <p
          className="back-home" onClick={() => navigate("/")}>
        ← Quay về trang chủ
      
        </p>
      </div>
    </div>
  );
}
