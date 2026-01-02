import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./services/authService";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(username, password);
      navigate("/");
      window.location.reload(); // refresh header
    } catch (err) {
      setError("❌ Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "80px auto" }}>
      <h2>Đăng nhập</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

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
        onClick={handleLogin}
      >
        Đăng nhập
      </button>
    </div>
  );
}

export default Login;
