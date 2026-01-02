import axios from "axios";

export const login = async (username, password) => {
  const res = await axios.post("http://localhost:5000/api/auth/login", { username, password });

  // lưu vào localStorage để header hoặc dashboard dùng
  localStorage.setItem("currentUser", JSON.stringify(res.data));
  console.log("Login attempt:", username, password);
  console.log("User in DB:", res.data);

  return res.data;
  
};
