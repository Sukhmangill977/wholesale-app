// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './utils/ProtectedRoute';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import RetailerDashboard from './pages/RetailerDashboard';
import CartPage from './pages/CartPage';
import ProductDetail from './pages/ProductDetail';
import WholesalerDashboard from './pages/WholesalerDashboard';
import OrdersPage from './pages/OrdersPage';
import PaymentPage from './pages/PaymentPage';
import WholesalerOrders from './pages/WholesalerOrders';
import WholesalerProducts from './pages/WholesalerProducts';
import Checkout from './pages/Checkout';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Retailer Routes */}
        <Route path="/retailer" element={<ProtectedRoute role="retailer"><RetailerDashboard /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute role="retailer"><CartPage /></ProtectedRoute>} />
        <Route path="/product/:id" element={<ProtectedRoute role="retailer"><ProductDetail /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute role="retailer"><PaymentPage /></ProtectedRoute>} />

        {/* Wholesaler Routes */}
        <Route path="/wholesaler" element={<ProtectedRoute role="wholesaler"><WholesalerDashboard /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute role="wholesaler"><OrdersPage /></ProtectedRoute>} />
        <Route path="/wholesaler-orders" element={<ProtectedRoute role="wholesaler"><WholesalerOrders /></ProtectedRoute>} />
        <Route path="/our-products" element={<ProtectedRoute role="wholesaler"><WholesalerProducts /></ProtectedRoute>} />
        <Route path="/checkout" element={<Checkout />} />

        {/* Catch-all route */}
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
