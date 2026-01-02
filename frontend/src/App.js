// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Products from "./Products";
import ProductDetail from "./Products_Detail";
import ProductEdit from "./Products_Edit";
import CreateProduct from "./Products_Create";
import Orders from "./Orders";
import OrderDetail from "./Orders_Detail";
import CreateOrder from "./Orders_Create"; // hoặc CreateOrder.js
import Inventory from "./Inventory";




function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/products" element={<Products />} />
      <Route path="/products/create" element={<CreateProduct />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/products/edit/:id" element={<ProductEdit />} />

      <Route path="/orders" element={<Orders />} />
      <Route path="/orders_Detail/:id" element={<OrderDetail />} />
      <Route path="/Orders_Create" element={<CreateOrder />} /> {/* ← đây */}

      <Route path="/inventory" element={<Inventory />} />
      
    </Routes>
  );
}

export default App;
