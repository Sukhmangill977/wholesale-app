import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
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
    return {
      subtotal,
      tax,
      total: subtotal + tax,
    };
  };

  const handlePayNow = () => {
    if (!auth.currentUser) return alert("Login required");

    const { subtotal, tax, total } = calculateTotal();

    // Save order summary to localStorage for use in checkout
    localStorage.setItem("orderSummary", JSON.stringify({
      items: cart,
      subtotal,
      tax,
      total
    }));

    navigate('/checkout'); // Redirect to new checkout page
  };

  const { subtotal, tax, total } = calculateTotal();

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map(p => (
            <div className="cart-item" key={p.id}>
              <img src={p.imageBase64} alt={p.name} />
              <div>
                <h4>{p.name}</h4>
                <p>Price: ₹{p.price}</p>
                <p>
                  Quantity: 
                  <button onClick={() => updateQuantity(p.id, -1)}>-</button>
                  {p.quantity}
                  <button onClick={() => updateQuantity(p.id, 1)}>+</button>
                </p>
                <p>Total: ₹{p.price * p.quantity}</p>
                <button className="remove-btn" onClick={() => removeFromCart(p.id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
            <p>Tax (18%): ₹{tax.toFixed(2)}</p>
            <h3>Total: ₹{total.toFixed(2)}</h3>
            <button className="pay-now" onClick={handlePayNow}>Pay Now</button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
