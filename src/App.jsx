// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header.jsx'; 
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail'; 
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Catalog from './components/Catalog';
import Profile from './components/Profile.jsx'; 
import Login from './components/Login.jsx'; 
import Orders from './pages/Orders.jsx'; 
import EditProfile from './pages/EditProfile.jsx'; 
import Wishlist from './pages/Wishlist.jsx'; 
import StoreLocator from './pages/StoreLocator.jsx'; // ДОБАВЛЕНО
import EnhancedProfile from './pages/EnhancedProfile.jsx'; // ДОБАВЛЕНО
import './styles/glav.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Header />
            <main style={{ minHeight: 'calc(100vh - 200px)' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/product/:id" element={<ProductDetail />} /> 
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/enhanced-profile" element={<EnhancedProfile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/store-locator" element={<StoreLocator />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;