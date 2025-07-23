// src/pages/CartPage.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { motion } from 'framer-motion';
import './CartPage.css';

function CartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  const updateQuantity = (id, delta) => {
    const updated = cart.map(p =>
      p.id === id ? { ...p, quantity: Math.max(1, p.quantity + delta) } : p
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeFromCart = (id) => {
    const updated = cart.filter(p => p.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.18;
    return { subtotal, tax, total: subtotal + tax };
  };

  const handlePayNow = () => {
    if (!auth.currentUser) return alert("Login required");
    const { subtotal, tax, total } = calculateTotal();
    localStorage.setItem("orderSummary", JSON.stringify({ items: cart, subtotal, tax, total }));
    navigate('/checkout');
  };

  const { subtotal, tax, total } = calculateTotal();

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Your cart is empty.
        </motion.p>
      ) : (
        <>
          {cart.map(p => (
            <motion.div
              className="cart-item"
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img src={p.imageBase64} alt={p.name} />
              <div className="cart-details">
                <h4>{p.name}</h4>
                <p>Price: ₹{p.price}</p>
                <div className="quantity-control">
                  <button onClick={() => updateQuantity(p.id, -1)}>-</button>
                  <span>{p.quantity}</span>
                  <button onClick={() => updateQuantity(p.id, 1)}>+</button>
                </div>
                <p>Total: ₹{p.price * p.quantity}</p>
                <button className="remove-btn" onClick={() => removeFromCart(p.id)}>Remove</button>
              </div>
            </motion.div>
          ))}

          <motion.div className="cart-summary" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
            <p>Tax (18%): ₹{tax.toFixed(2)}</p>
            <h3>Total: ₹{total.toFixed(2)}</h3>
            {/* <button className="pay-now" onClick={handlePayNow}>Pay Now</button> */}
          </motion.div>
        </>
      )}
    </div>
  );
}

export default CartPage;
