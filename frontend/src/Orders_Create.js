import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Orders_Create.css";

const ITEMS_PER_PAGE = 5;

function CreateOrder() {
  const navigate = useNavigate();

  const [availableProducts, setAvailableProducts] = useState([]);
  const [apiStatus, setApiStatus] = useState({ text: "", type: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [customer, setCustomer] = useState({ name: "", phone: "", address: "", email: "" });
  const [orderProducts, setOrderProducts] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("COD");


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/products");
      setAvailableProducts(res.data);
      setApiStatus({ text: "✅ Kết nối API thành công", type: "success" });
    } catch (err) {
      setApiStatus({ text: "❌ Lỗi kết nối API", type: "error" });
    }
  };

  const handleSelectItem = (product) => {
    if (product.stock <= 0) return alert("Sản phẩm đã hết hàng!");
    const existingIndex = orderProducts.findIndex(item => item.productId === product._id);

    if (existingIndex !== -1) {
      updateOrderQty(existingIndex, orderProducts[existingIndex].quantity + 1);
    } else {
      setOrderProducts([...orderProducts, {
        productId: product._id,
        name: product.name,
        quantity: 1,
        price: product.price,
      }]);
      setAvailableProducts(prev => prev.map(p => 
        p._id === product._id ? { ...p, stock: p.stock - 1 } : p
      ));
    }
  };

  const updateOrderQty = (index, newQty) => {
    const item = orderProducts[index];
    const val = parseInt(newQty) || 0;
    const diff = val - item.quantity;
    const originProduct = availableProducts.find(p => p._id === item.productId);

    if (diff > 0 && originProduct.stock < diff) {
      alert("Không đủ hàng trong kho!");
      return;
    }

    setOrderProducts(prev => prev.map((p, i) => 
      i === index ? { ...p, quantity: Math.max(0, val) } : p
    ));
    setAvailableProducts(prev => prev.map(p => 
      p._id === item.productId ? { ...p, stock: p.stock - diff } : p
    ));
  };

  const removeOrderProduct = (index) => {
    const item = orderProducts[index];
    setAvailableProducts(prev => prev.map(p => 
      p._id === item.productId ? { ...p, stock: p.stock + item.quantity } : p
    ));
    setOrderProducts(prev => prev.filter((_, i) => i !== index));
  };

  const totalAmount = orderProducts.reduce((sum, p) => sum + p.quantity * p.price, 0);
  const totalQuantity = orderProducts.reduce((sum, p) => sum + p.quantity, 0);

  // --- XỬ LÝ LƯU ĐƠN HÀNG ---
  const handleSubmitOrder = async () => {
    // 1. Kiểm tra giỏ hàng
    if (orderProducts.length === 0) {
      return alert("⚠️ Lỗi: Đơn hàng chưa có sản phẩm nào!");
    }

    // 2. Kiểm tra thông tin khách hàng bắt buộc
    if (!customer.name.trim() || !customer.phone.trim()) {
      return alert("⚠️ Lỗi: Vui lòng nhập Tên và Số điện thoại khách hàng!");
    }

    // 3. Chuẩn bị gói dữ liệu gửi đi (Payload)
    const payload = {
      customer: customer,
      items: orderProducts.map(item => ({
        product: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.quantity * item.price
      })),
      totalAmount: totalAmount,
      totalQuantity: totalQuantity,
      paymentMethod: paymentMethod
    };

    try {
      // 4. Gọi API POST để lưu vào database
      const response = await axios.post("/api/orders", payload);

      if (response.status === 200 || response.status === 201) {
        alert("✅ THÀNH CÔNG: Đơn hàng đã được lưu vào hệ thống!");
        
        // 5. Reset lại form sau khi thành công
        setOrderProducts([]);
        setCustomer({ name: "", phone: "", address: "", email: "" });
        
        // Load lại kho từ server để đảm bảo số liệu chính xác nhất
        fetchProducts(); 
      }
    } catch (err) {
      console.error("Lỗi khi tạo đơn hàng:", err);
      alert("❌ THẤT BẠI: Không thể lưu đơn hàng. Vui lòng kiểm tra lại kết nối server!");
    }
  };

  const filteredProducts = availableProducts.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentTableProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="order-page-container">
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
      <div className={`api-status-bar ${apiStatus.type}`}>{apiStatus.text}</div>

      <div className="order-creation-header">
        <h2>📝 LẬP ĐƠN HÀNG MỚI</h2>
      </div>

      <div className="order-top-section">
        <div className="customer-column">
          <div className="card">
            <h3>👤 Thông tin khách hàng</h3>
            <div className="input-group">
              <label>Họ tên</label>
              <input type="text" placeholder="Nguyễn Văn A" value={customer.name} onChange={e => setCustomer({...customer, name: e.target.value})} />
            </div>
            <div className="input-group">
              <label>Số điện thoại</label>
              <input type="text" placeholder="090..." value={customer.phone} onChange={e => setCustomer({...customer, phone: e.target.value})} />
            </div>
            <div className="input-group">
              <label>Địa chỉ</label>
              <input type="text" placeholder="Số nhà, tên đường..." value={customer.address} onChange={e => setCustomer({...customer, address: e.target.value})} />
            </div>
            <div className="input-group">
              <label>Thanh toán</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="COD">Thanh toán khi nhận hàng (COD)</option>
                <option value="MOMO">Ví MoMo</option>
                <option value="ZALOPAY">Ví ZaloPay</option>
                <option value="BANK_TRANSFER">Chuyển khoản ngân hàng</option>
              </select>
            </div>
          </div>
        </div>

        <div className="items-column">
          <div className="card">
            <h3>🛒 Danh sách chọn ({totalQuantity})</h3>
            <div className="order-table-wrapper">
              <table className="order-items-table">
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th width="80">SL</th>
                    <th width="120">Giá</th>
                    <th width="120">Tổng</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orderProducts.map((p, index) => (
                    <tr key={index}>
                      <td><input type="text" value={p.name} readOnly className="input-name" /></td>
                      <td>
                        <input type="number" min="1" value={p.quantity} onChange={(e) => updateOrderQty(index, e.target.value)} />
                      </td>
                      <td>
                        <input type="number" value={p.price} onChange={(e) => setOrderProducts(prev => prev.map((item, i) => i === index ? {...item, price: parseInt(e.target.value) || 0} : item))} />
                      </td>
                      <td className="txt-bold">{(p.quantity * p.price).toLocaleString()}</td>
                      <td><button className="btn-del" onClick={() => removeOrderProduct(index)}>❌</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="order-summary-box">
              <div className="total-label">Tổng thanh toán:</div>
              <div className="total-value">{totalAmount.toLocaleString()} VNĐ</div>
              <button className="btn-confirm" onClick={handleSubmitOrder}>XÁC NHẬN ĐƠN HÀNG</button>
            </div>
          </div>
        </div>
      </div>

      <div className="inventory-bottom-section">
        <div className="card">
          <div className="inventory-header">
            <h3>📦 Danh sách sản phẩm (Kho)</h3>
            <input className="search-box" placeholder="🔍 Tìm kiếm sản phẩm..." onChange={e => setSearchTerm(e.target.value)} />
          </div>

          <table className="inventory-table">
            <thead>
              <tr>
                <th>Ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Giá niêm yết</th>
                <th>Kho còn</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {currentTableProducts.map(p => (
                <tr key={p._id}>
                  <td><img src={p.image} width="50" alt="" className="prod-img" /></td>
                  <td className="txt-bold">{p.name}</td>
                  <td>{p.price.toLocaleString()} VNĐ</td>
                  <td>
                    <span className={`stock-badge ${p.stock < 5 ? 'low' : ''}`}>
                      {p.stock}
                    </span>
                  </td>
                  <td>
                    <button className="btn-select-prod" onClick={() => handleSelectItem(p)} disabled={p.stock <= 0}>
                      {p.stock > 0 ? "➕ Chọn" : "Hết hàng"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="pagination">
            {[...Array(totalPages)].map((_, i) => (
              <button 
                key={i} 
                className={currentPage === i + 1 ? "active" : ""} 
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
        <p className="back-home" onClick={() => navigate("/orders")}>
          ← Quay về trang Orders
        </p>
      </div>
    </div>
  );
}

export default CreateOrder;