// src/pages/WholesalerOrders.js
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function WholesalerOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const snapshot = await getDocs(collection(db, 'orders'));
    setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Retailer Orders</h2>
      {orders.map(order => (
        <div key={order.id} style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
          <h4>From: {order.email}</h4>
          <p>Subtotal: ₹{order.subtotal.toFixed(2)}</p>
          <p>Tax: ₹{order.tax.toFixed(2)}</p>
          <p>Total: ₹{order.total.toFixed(2)}</p>
          <ul>
            {order.items.map(item => (
              <li key={item.id}>{item.name} × {item.quantity} = ₹{item.price * item.quantity}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default WholesalerOrders;
