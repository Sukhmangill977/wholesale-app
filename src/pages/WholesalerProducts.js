import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

function WholesalerProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const q = query(collection(db, 'products'), where('createdBy', '==', auth.currentUser.uid));
      const snapshot = await getDocs(q);
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetch();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Our Products</h2>
      {products.map(p => (
        <div key={p.id} style={{ borderBottom: '1px solid #ccc', marginBottom: '1rem' }}>
          <h3>{p.name}</h3>
          <p>Price: ₹{p.price}</p>
          <p>{p.description}</p>
        </div>
      ))}
    </div>
  );
}

export default WholesalerProducts;
