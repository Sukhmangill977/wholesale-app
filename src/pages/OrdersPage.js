import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import './OrdersPage.css';

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h2>📦 Incoming Orders</h2>
      {orders.length === 0 ? <p>No orders yet.</p> : (
        orders.map(order => (
          <div key={order.id} className="order-card">
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Retailer:</strong> {order.userId}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Total:</strong> ₹{order.total.toFixed(2)}</p>
            <p><strong>Items:</strong></p>
            <ul>
              {order.items.map(item => (
                <li key={item.id}>{item.name} - Qty: {item.quantity}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default OrdersPage;
