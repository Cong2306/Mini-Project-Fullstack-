import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProductById,
  updateProduct
} from "./services/productService";
import "./Products_Edit.css";

function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: ""
  });

  useEffect(() => {
    getProductById(id).then((res) => setForm(res.data));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct(id, form).then(() => {
      alert("Cập nhật thành công!");
      navigate("/products");
    });
  };

  return (
    <div className="product-edit">
      <h2>Chỉnh sửa sản phẩm</h2>

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
          placeholder="Giá"
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

        <button type="submit">💾 Lưu thay đổi</button>
      </form>
    </div>
  );
}

export default ProductEdit;
