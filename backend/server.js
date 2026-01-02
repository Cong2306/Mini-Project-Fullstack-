// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const connectDB = require("./db");

// Routes
const authRouter = require("./routes/Auth");      
const productsRouter = require("./routes/products");
const ordersRouter = require("./routes/orders");

const app = express();

/* ================== MIDDLEWARES ================== */
app.use(cors());
app.use(express.json()); // parse JSON body
app.set("json spaces", 2); // pretty print JSON

/* ================== DATABASE ================== */
connectDB();

/* ================== ROUTES ================== */
app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);

/* ================== HEALTH CHECK ================== */
app.get("/api/health", (req, res) => {
  res.set("Cache-Control", "no-store"); // tắt cache để tránh 304
  const dbStatus = mongoose.connection.readyState; // 1 = connected
  if (dbStatus === 1) {
    return res.json({
      success: true,
      message: "✅ Kết nối database thành công",
    });
  }
  res.status(500).json({
    success: false,
    message: "❌ Database chưa kết nối",
  });
});

/* ================== START SERVER ================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});


