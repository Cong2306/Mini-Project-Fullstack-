// routes/auth.js
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("📥 Login request:", { username, password });

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔍 Password match:", isMatch);
    if (!isMatch) {
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        fullName: user.fullName, // sửa từ email -> fullName
        role: user.role,
      },
    });
  } catch (err) {
    console.error("🔥 Login error:", err);
    return res.status(500).json({ message: "Lỗi server" });
  }
});

/* ================= REGISTER ================= */
router.post("/register", async (req, res) => {
  try {
    console.log("📥 Register request body:", req.body); // log body
    const { username, fullName, password, role } = req.body;

    if (!username || !fullName || !password) {
      console.log("❌ Thiếu thông tin");
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log("❌ Username đã tồn tại");
      return res.status(400).json({ message: "Username đã tồn tại" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔐 Password hashed");

    const newUser = await User.create({
      username,
      fullName,
      password: hashedPassword,
      role: role || "user",
    });

    console.log("✅ User created:", newUser.username);

    return res.status(201).json({
      id: newUser._id,
      username: newUser.username,
      fullName: newUser.fullName,
      role: newUser.role,
    });
  } catch (err) {
    console.error("🔥 Register error:", err);
    return res.status(500).json({ message: "Lỗi server" });
  }
});

module.exports = router;
