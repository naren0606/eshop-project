import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductsPage from './component/ProductsPage';
import Home from './component/Home';
import ProductDetails from './component/ProductDetails';
import Navbar from './component/Navbar';
import './App.css';
import Cart from './component/Cart';
import CreateOrderPage from './component/Orders';
import Address from './component/address';
import Addproducts from './component/addproducts';
import Login from './component/Login';

export default function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (item) => {
    setCartItems((prevCartItems) => [...prevCartItems, item]);
  };

  const deleteItem = (itemId) => {
    // Find the index of the item to be deleted in the cart array
    const itemIndex = cartItems.findIndex((item) => item._id === itemId);

    // If the item is found, remove it from the cart
    if (itemIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart.splice(itemIndex, 1);
      setCartItems(updatedCart);
    }
  };

  const handleQuantityChange = (itemId, quantity) => {
    const updatedCart = cartItems.map((item) => {
      if (item._id === itemId) {
        return { ...item, quantity: parseInt(quantity, 10) };
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };


  return (
    <div className="app">
      <BrowserRouter>
        <Navbar handleOpenLoginModal={handleOpenLoginModal} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage  />} />
          <Route
            path="/cart"
            element={<Cart cart={cartItems} onUpdateQuantity={handleQuantityChange} onDeleteItem={deleteItem} />}
          />
          <Route
            path="/product-details/:productId"
            element={<ProductDetails addToCart={handleAddToCart} />}
          />
          <Route path="/address" element={<Address  />} />
          <Route path="/addproducts" element={<Addproducts />} />
          <Route path="/place-order" element={<CreateOrderPage  />} />
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