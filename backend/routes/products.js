const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

/* =======================
   GET ALL PRODUCTS
   GET /api/products
======================= */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
});

/* =======================
   GET PRODUCT BY ID
   GET /api/products/:id
======================= */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "ID không hợp lệ" });
  }
});

/* =======================
   CREATE PRODUCT
   POST /api/products
======================= */
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Tạo sản phẩm thất bại" });
  }
});

/* =======================
   UPDATE PRODUCT
   PUT /api/products/:id
======================= */
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Cập nhật thất bại" });
  }
});

/* =======================
   DELETE PRODUCT
   DELETE /api/products/:id
======================= */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    res.json({ message: "Xóa sản phẩm thành công" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Xóa thất bại" });
  }
});

module.exports = router;

