require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./db");
const cors = require("cors");

const app = express();




// 1. Middlewares
app.use(cors());
app.use(express.json()); // Bắt buộc phải có để đọc dữ liệu POST từ Frontend

// Pretty-print JSON responses
app.set('json spaces', 2);

// 2. Kết nối Database
connectDB();

// 3. Khai báo và Gắn Routes (Mount Routes)
// Chỉ khai báo mỗi loại 1 lần duy nhất
const productsRouter = require("./routes/products");
const ordersRouter = require("./routes/orders");


app.use("/api/auth", require("./routes/Auth"));
app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);

// 4. API Check Database Health
app.get("/api/health", (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  /*
    0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  */
  if (dbStatus === 1) {
    return res.json({
      success: true,
      message: "Kết nối database thành công"
    });
  }
  res.status(500).json({
    success: false,
    message: "Chưa kết nối database"
  });
});

// 5. Khởi chạy Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});