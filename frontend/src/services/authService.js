import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const login = async (username, password) => {
  const res = await axios.post(`${API_URL}/login`, {
    username,
    password,
  });

  /**
   * Backend nên trả:
   * {
   *   token: "...",
   *   user: { id, name, role, ... }
   * }
   */

  const { token, user } = res.data;

  // 🔐 LƯU TOKEN (quan trọng nhất)
  localStorage.setItem("token", token);

  // 👤 LƯU USER
  localStorage.setItem("currentUser", JSON.stringify(user));

  console.log("✅ Login success:", user);

  return res.data;
};
