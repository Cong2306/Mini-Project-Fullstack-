// src/pages/Products.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "./services/productService";
import "./Products.css";

const ITEMS_PER_PAGE = 10;

function Products() {
  const [products, setProducts] = useState([]);
  const [apiStatus, setApiStatus] = useState("");
  const [statusType, setStatusType] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  /* ===== FETCH PRODUCTS ===== */
  useEffect(() => {
    getProducts()
      .then((res) => {
        setProducts(res.data);
        setApiStatus("✅ Kết nối API thành công");
        setStatusType("success");
      })
      .catch((err) => {
        console.error(err);
        setApiStatus("❌ Không thể kết nối API");
        setStatusType("error");
      });
  }, []);

  /* ===== SEARCH ===== */
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* ===== PAGINATION ===== */
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  /* ===== DELETE ===== */
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;

    try {
      await deleteProduct(id); // 🔥 XÓA TRONG DATABASE

      setProducts((prev) =>
        prev.filter((p) => p._id !== id)
      ); // 🔥 CẬP NHẬT UI

      alert("✅ Xóa sản phẩm thành công");
    } catch (error) {
      console.error(error);
      alert("❌ Xóa sản phẩm thất bại");
    }
  };

  return (
    <>
      {/* ===== HEADER ===== */}
      <header className="header">
        <h2>Inventory & Orders</h2>
        <div className="auth-buttons">
          <button className="btn btn-outline" onClick={() => navigate("/login")}>
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

      {/* ===== API STATUS ===== */}
      <div className={`api-status ${statusType}`}>
        {apiStatus || "Đang kiểm tra kết nối API..."}
      </div>

      {/* ===== CONTENT ===== */}
      <div className="products-container">
        <h2>Danh sách sản phẩm</h2>

        {/* ===== TOOLBAR ===== */}
        <div className="products-toolbar">
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

          <button
            className="btn btn-add"
            onClick={() => navigate("/products/create")}
          >
            ➕ Thêm sản phẩm
          </button>
        </div>

        {/* ===== TABLE ===== */}
        <table className="products-table">
          <thead>
            <tr>
              <th>Hình ảnh</th>
              <th>Tên</th>
              <th>Mô tả</th>
              <th>Giá (VNĐ)</th>
              <th>Tồn kho</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {currentProducts.length > 0 ? (
              currentProducts.map((p) => (
                <tr key={p._id}>
                  <td>
                    <img src={p.image} alt={p.name} />
                  </td>
                  <td>{p.name}</td>
                  <td>{p.description}</td>
                  <td>{p.price.toLocaleString()}</td>
                  <td>{p.stock}</td>
                  <td>
                    <button
                      className="btn btn-detail"
                      onClick={() => navigate(`/products/${p._id}`)}
                    >
                      Detail
                    </button>
                    <button
                      className="btn btn-edit"
                      onClick={() => navigate(`/products/edit/${p._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(p._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: 20 }}>
                  Không tìm thấy sản phẩm
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* ===== PAGINATION ===== */}
        {totalPages > 1 && (
          <div className="pagination">
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
    </>
  );
}

export default Products;
