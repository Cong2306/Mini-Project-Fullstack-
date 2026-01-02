import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // cần navigate cho nút
import axios from "axios";
import "./Inventory.css";

function Inventory() {
  const navigate = useNavigate(); // dùng để điều hướng
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [summary, setSummary] = useState({
    totalProducts: 0,
    totalStock: 0,
    outOfStock: 0,
    lowStock: 0, // < 5
  });

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products"); // API backend
      setProducts(res.data);

      // Tính thống kê tồn kho
      const totalProducts = res.data.length;
      let totalStock = 0,
        outOfStock = 0,
        lowStock = 0;

      res.data.forEach((p) => {
        totalStock += p.stock;
        if (p.stock === 0) outOfStock++;
        if (p.stock > 0 && p.stock <= 5) lowStock++;
      });

      setSummary({ totalProducts, totalStock, outOfStock, lowStock });
      setError("");
    } catch (err) {
      console.error(err);
      setError("Không tải được dữ liệu tồn kho");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>⏳ Đang tải dữ liệu...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      {/* ===== HEADER ===== */}
      <header className="header">
        <h2>Inventory & Orders</h2>

        <div className="auth-buttons">
          <button
            className="btn btn-outline"
            onClick={() => navigate("/login")}
          >
            Đăng nhập
          </button>
          <button
            className="btn btn-outline"
            onClick={() => navigate("/register")}
          >
            Đăng ký
          </button>
        </div>
      </header>

      {/* ===== DASHBOARD TỒN KHO ===== */}
      <div className="inventory-dashboard">
        <h2>Dashboard Quản lý tồn kho</h2>

        {/* ===== Thống kê nhanh ===== */}
        <div className="inventory-summary">
          <div className="summary-card total">
            Tổng sản phẩm: {summary.totalProducts}
          </div>
          <div className="summary-card stock">
            Tổng tồn kho: {summary.totalStock}
          </div>
          <div className="summary-card low">
            Sắp hết hàng: {summary.lowStock}
          </div>
          <div className="summary-card out">
            Hết hàng: {summary.outOfStock}
          </div>
        </div>

        {/* ===== Bảng sản phẩm ===== */}
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Giá (VNĐ)</th>
              <th>Tồn kho</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                className={
                  p.stock === 0
                    ? "out-of-stock"
                    : p.stock <= 5
                    ? "low-stock"
                    : ""
                }
              >
                <td>{p.name}</td>
                <td>{p.price.toLocaleString()}</td>
                <td>{p.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;
