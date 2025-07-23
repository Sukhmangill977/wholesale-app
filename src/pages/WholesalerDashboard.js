// src/pages/WholesalerDashboard.js
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import {
  collection, addDoc, query, where,
  getDocs, doc, deleteDoc, updateDoc
} from 'firebase/firestore';
import { motion } from 'framer-motion';
import './WholesalerDashboard.css';

function WholesalerDashboard() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '', description: '', weight: '', dimensions: '',
    type: '', quantityAvailable: '', unit: '', price: '',
    minOrderQty: '', brand: '', contact: '', address: ''
  });
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchProducts = async () => {
    const q = query(collection(db, 'products'), where('createdBy', '==', auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleAddOrUpdate = async () => {
    const imageBase64 = image ? await convertToBase64(image) : '';
    const productData = {
      ...formData,
      createdBy: auth.currentUser.uid,
      createdAt: new Date().toISOString(),
      imageBase64,
    };

    if (editId) {
      const updateData = { ...productData };
      if (!imageBase64) delete updateData.imageBase64;
      await updateDoc(doc(db, 'products', editId), updateData);
      setEditId(null);
    } else {
      await addDoc(collection(db, 'products'), productData);
    }

    setFormData({
      name: '', description: '', weight: '', dimensions: '',
      type: '', quantityAvailable: '', unit: '', price: '',
      minOrderQty: '', brand: '', contact: '', address: ''
    });
    setImage(null);
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'products', id));
    fetchProducts();
  };

  const handleEdit = (product) => {
    setFormData({ ...product });
    setEditId(product.id);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="dashboard-container">
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>Wholesaler Dashboard</motion.h2>
      <motion.div className="form-container" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
        {Object.entries(formData).map(([key, value]) => (
          key === 'description' ? (
            <textarea key={key} name={key} value={value} onChange={handleChange} placeholder={key.charAt(0).toUpperCase() + key.slice(1)} />
          ) : (
            <input key={key} name={key} value={value} onChange={handleChange} placeholder={key.charAt(0).toUpperCase() + key.slice(1)} />
          )
        ))}
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        <button onClick={handleAddOrUpdate}>{editId ? 'Update Product' : 'Add Product'}</button>
      </motion.div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by product name, type, brand..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
        />
      </div>

      <motion.div className="product-list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        {products
          .filter((p) =>
            p.name?.toLowerCase().includes(searchQuery) ||
            p.type?.toLowerCase().includes(searchQuery) ||
            p.brand?.toLowerCase().includes(searchQuery)
          )
          .map((p) => (
            <motion.div className="product-card" key={p.id} whileHover={{ scale: 1.03 }}>
              {p.imageBase64 && <img src={p.imageBase64} alt={p.name} />}
              <div className="product-info">
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <p><strong>Weight:</strong> {p.weight}</p>
                <p><strong>Dimensions:</strong> {p.dimensions}</p>
                <p><strong>Type:</strong> {p.type}</p>
                <p><strong>Stock:</strong> {p.quantityAvailable} {p.unit}</p>
                <p><strong>Price:</strong> ₹{p.price}</p>
                <p><strong>Min Order:</strong> {p.minOrderQty}</p>
                {p.brand && <p><strong>Brand:</strong> {p.brand}</p>}
                {p.contact && <p><strong>Contact:</strong> {p.contact}</p>}
                {p.address && <p><strong>Address:</strong> {p.address}</p>}
                <div className="action-buttons">
                  <button onClick={() => handleEdit(p)}>Edit</button>
                  <button onClick={() => handleDelete(p.id)}>Delete</button>
                </div>
              </div>
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
}

export default WholesalerDashboard;
