const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("[DEBUG] /api/login body:", req.body);
  const user = await User.findOne({ username });
  if (!user) {
    console.log("[DEBUG] user not found for:", username);
    return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
  }

  if (user.password !== password) {
    console.log("[DEBUG] password mismatch for user:", username);
    return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
  }

  console.log("[DEBUG] login success for:", username);
  res.json({ username: user.username, fullName: user.fullName, role: user.role });
});

  module.exports = router;

// Dev-friendly GET helper so visiting the URL in a browser is informative
router.get('/login', (req, res) => {
  res.json({
    message: 'Endpoint expects POST with JSON { username, password }',
    method: 'POST',
    endpoint: '/api/auth/login'
  });
});
