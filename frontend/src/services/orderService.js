import axios from "axios";

const api = axios.create({
  baseURL: "https://project-final-otbm.onrender.com/api",
});

// Lấy danh sách tất cả orders
export const getOrders = () => api.get("/orders");

// Lấy chi tiết 1 order
export const getOrderById = (id) => api.get(`/orders/${id}`);

// Cập nhật trạng thái order
export const updateOrderStatus = (id, status) => api.put(`/orders/${id}/status`, { status });



