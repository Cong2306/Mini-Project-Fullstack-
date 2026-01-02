// src/pages/Products_Create.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "./services/productService";
import "./Products_Edit.css"; // dùng chung CSS với Edit

function Products_Create() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ===== VALIDATE =====
    if (!form.name.trim()) {
      setError(true);
      setMessage("❌ Tên sản phẩm không được để trống!");
      return;
    }
    if (Number(form.price) <= 0) {
      setError(true);
      setMessage("❌ Giá phải lớn hơn 0!");
      return;
    }
    if (Number(form.stock) < 0) {
      setError(true);
      setMessage("❌ Tồn kho không được âm!");
      return;
    }

    // Chuẩn hóa dữ liệu gửi lên API
    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock)
    };

    try {
      console.log("Sending payload:", payload); // debug payload
      await createProduct(payload);

      setError(false);
      setMessage("✅ Thêm sản phẩm thành công!");
      setTimeout(() => navigate("/products"), 1500);
    } catch (err) {
      setError(true);
      setMessage("❌ Thêm sản phẩm thất bại!");
      console.error(err.response?.data || err);
    }
  };

  return (
    
    <div className="product-edit">
      <h2>Thêm sản phẩm mới</h2>

      {message && (
        <p className={`db-status ${error ? "error" : "success"}`}>{message}</p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Tên sản phẩm"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Mô tả"
        />

        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Giá (VNĐ)"
          required
        />

        <input
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          placeholder="Tồn kho"
          required
        />

        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Link hình ảnh"
        />

        {form.image && (
          <div className="image-preview">
            <img src={form.image} alt="Preview" />
          </div>
        )}

        <div style={{ marginTop: 10 }}>
          <button type="submit" className="btn btn-add">
            💾 Thêm sản phẩm
          </button>
          <button
            type="button"
            className="btn btn-outline"
            style={{ marginLeft: 10 }}
            onClick={() => navigate("/products")}
          >
            ← Quay về
          </button>
        </div>
      </form>
    </div>
  );
}

export default Products_Create;
