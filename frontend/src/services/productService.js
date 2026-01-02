import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

/* ===== GET ALL PRODUCTS ===== */
export const getProducts = () => {
  return axios.get(API_URL);
};

/* ===== GET PRODUCT BY ID ===== */
export const getProductById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

/* ===== CREATE PRODUCT ===== */
export const createProduct = (data) => {
  return axios.post(API_URL, data);
};

/* ===== UPDATE PRODUCT ===== */
export const updateProduct = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};

/* ===== DELETE PRODUCT ===== */
export const deleteProduct = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};


