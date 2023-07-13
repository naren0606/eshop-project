import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductsPage from './component/ProductsPage';
import Home from './component/Home';
import ProductDetails from './component/ProductDetails';
import Navbar from './component/Navbar';
import './App.css';
import CreateOrderPage from './component/Orders';
import Addproducts from './component/addproducts';
import Login from './component/Login';

export default function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);


  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const cart = [
    // Cart items with product details
    // { name: 'Product Name', price: 10, image: 'product-image.jpg', quantity: 1 },
    // { name: 'Another Product', price: 20, image: 'another-product-image.jpg', quantity: 2 },
    // ...
  ];


  return (
    <div className="app">
      <BrowserRouter>
        <Navbar handleOpenLoginModal={handleOpenLoginModal} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage  />} />
          <Route
            path="/product-details/:productId"
            element={<ProductDetails/>}
          />
          <Route path="/addproducts" element={<Addproducts />} />
          <Route path="/place-order" element={  <CreateOrderPage />
} />
        </Routes>
      </BrowserRouter>

      {isLoginModalOpen && (
        <Login
          isOpen={isLoginModalOpen}
          onClose={handleCloseLoginModal}
        />
      )}
    </div>
  );
}