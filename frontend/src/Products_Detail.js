import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "./services/productService";
import "./Products_Detail.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductById(id).then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <p>Đang tải...</p>;

  return (
    <div className="product-detail">
      <h2>Chi tiết sản phẩm</h2>

      <img src={product.image} alt={product.name} />

      <p><b>Tên:</b> {product.name}</p>
      <p><b>Mô tả:</b> {product.description}</p>
      <p><b>Giá:</b> {product.price.toLocaleString()} VNĐ</p>
      <p><b>Tồn kho:</b> {product.stock}</p>

      <button onClick={() => navigate(-1)}>← Quay lại</button>
    </div>
  );
}

export default ProductDetail;
