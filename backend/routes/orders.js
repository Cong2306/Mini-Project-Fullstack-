const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");

/* ===== GET ALL ORDERS ===== */
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ===== GET ORDER BY ID ===== */
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.product");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ===== CREATE NEW ORDER + TRỪ TỒN KHO ===== */
router.post("/", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { customer, items, totalAmount, status, paymentMethod, totalQuantity } = req.body;

    if (!items || items.length === 0) {
      throw new Error("Đơn hàng chưa có sản phẩm");
    }

    // 1️⃣ Kiểm tra & trừ tồn kho
    for (const item of items) {
      const product = await Product.findById(item.product).session(session);

      if (!product) {
        throw new Error("Không tìm thấy sản phẩm");
      }

      if (product.stock < item.quantity) {
        throw new Error(`Không đủ tồn kho cho sản phẩm: ${product.name}`);
      }

      product.stock -= item.quantity;
      await product.save({ session });
    }

    // 2️⃣ Tạo đơn hàng, lưu đúng paymentMethod từ client
    const newOrder = new Order({
      customer,
      items,
      totalAmount,
      totalQuantity,
      paymentMethod: paymentMethod || "COD", // ← sửa đây
      status: status || "pending",
    });

    await newOrder.save({ session });

    // 3️⃣ Commit transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json(newOrder);

  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    console.error(err);
    res.status(400).json({
      message: err.message || "Tạo đơn hàng thất bại",
    });
  }
});

/* ===== UPDATE ORDER STATUS ===== */
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Logic trạng thái tuần tự
    const statusOrder = ["pending", "confirmed", "shipping", "completed", "cancelled"];
    const currentIndex = statusOrder.indexOf(order.status);
    const newIndex = statusOrder.indexOf(status);

    if (status === "cancelled" || newIndex === currentIndex + 1) {
      order.status = status;
      await order.save();
      return res.json(order);
    } else {
      return res.status(400).json({ message: "Không thể chuyển trạng thái này" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
