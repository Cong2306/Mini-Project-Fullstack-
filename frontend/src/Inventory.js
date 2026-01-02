import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Inventory.css";

const ITEMS_PER_PAGE = 10;

function Inventory() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [summary, setSummary] = useState({
    totalProducts: 0,
    totalStock: 0,
    outOfStock: 0,
    lowStock: 0,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterByStock, setFilterByStock] = useState("all"); // "all" | "low" | "out"

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await axios.get("https://project-final-otbm.onrender.com/api/products");
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

  /* ===== FILTER SẢN PHẨM ===== */
  let filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filterByStock === "low") {
    filteredProducts = filteredProducts.filter((p) => p.stock > 0 && p.stock <= 5);
  } else if (filterByStock === "out") {
    filteredProducts = filteredProducts.filter((p) => p.stock === 0);
  }

  /* ===== PHÂN TRANG ===== */
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  if (loading) return <p>⏳ Đang tải dữ liệu...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      {/* ===== HEADER ===== */}
      <header className="header">
        <h2>Inventory & Orders</h2>
        <div className="auth-buttons">
          <button className="btn btn-outline" onClick={() => navigate("/login")}>
            Đăng nhập
          </button>
          <button className="btn btn-outline" onClick={() => navigate("/register")}>
            Đăng ký
          </button>
        </div>
      </header>

      {/* ===== DASHBOARD ===== */}
      <div className="inventory-dashboard">
        <h2>Dashboard Quản lý tồn kho</h2>

        {/* ===== Thống kê nhanh ===== */}
        <div className="inventory-summary" style={{ display: "flex", gap: "20px", justifyContent: "space-between" }}>
          <div
            className={`summary-card total`}
            onClick={() => { setFilterByStock("all"); setCurrentPage(1); }}
            style={{ flex: 1, cursor: "pointer" }}
          >
            Tổng sản phẩm: {summary.totalProducts}
          </div>
          <div
            className={`summary-card stock`}
            onClick={() => { setFilterByStock("all"); setCurrentPage(1); }}
            style={{ flex: 1, cursor: "pointer" }}
          >
            Tổng tồn kho: {summary.totalStock}
          </div>
          <div
            className={`summary-card low`}
            onClick={() => { setFilterByStock("low"); setCurrentPage(1); }}
            style={{ flex: 1, cursor: "pointer" }}
          >
            Sắp hết hàng: {summary.lowStock}
          </div>
          <div
            className={`summary-card out`}
            onClick={() => { setFilterByStock("out"); setCurrentPage(1); }}
            style={{ flex: 1, cursor: "pointer" }}
          >
            Hết hàng: {summary.outOfStock}
          </div>
        </div>

        {/* ===== Toolbar tìm kiếm ===== */}
        <div className="inventory-toolbar" style={{ marginTop: 20 }}>
          <input
            type="text"
            placeholder="🔍 Tìm kiếm theo tên sản phẩm..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* ===== Bảng sản phẩm ===== */}
        <table className="inventory-table" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Giá (VNĐ)</th>
              <th>Tồn kho</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.length > 0 ? (
              currentProducts.map((p) => (
                <tr
                  key={p.id}
                  className={
                    p.stock === 0 ? "out-of-stock" : p.stock <= 5 ? "low-stock" : ""
                  }
                >
                  <td>{p.name}</td>
                  <td>{p.price.toLocaleString()}</td>
                  <td>{p.stock}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: "center", padding: 20 }}>
                  Không tìm thấy sản phẩm
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* ===== PHÂN TRANG ===== */}
        {totalPages > 1 && (
          <div className="pagination" style={{ marginTop: 20 }}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              ◀
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={currentPage === i + 1 ? "active" : ""}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              ▶
            </button>
          </div>
        )}

        {/* ===== BACK ===== */}
        <p
          style={{ marginTop: 15, cursor: "pointer", color: "#1e90ff" }}
          onClick={() => navigate("/")}
        >
          ← Quay về trang chủ
        </p>
      </div>
    </div>
  );
}

export default Inventory;
