// src/pages/ProductDetail.js
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const productDoc = await getDoc(doc(db, 'products', id));
      if (productDoc.exists()) {
        setProduct({ id: productDoc.id, ...productDoc.data() });
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail-container">
      <h2>{product.name}</h2>
      <img className="detail-image" src={product.imageBase64} alt={product.name} />
      <div className="product-detail-info">
        <p><strong>Description:</strong> {product.description}</p>
        <p><strong>Weight:</strong> {product.weight}</p>
        <p><strong>Dimensions:</strong> {product.dimensions}</p>
        <p><strong>Type:</strong> {product.type}</p>
        <p><strong>Stock:</strong> {product.quantityAvailable} {product.unit}</p>
        <p><strong>Price:</strong> ₹{product.price}</p>
        <p><strong>Min Order:</strong> {product.minOrderQty}</p>
        {product.brand && <p><strong>Brand:</strong> {product.brand}</p>}
        {product.SKU && <p><strong>SKU:</strong> {product.SKU}</p>}
        {product.expiryDate && <p><strong>Expiry:</strong> {product.expiryDate}</p>}
      </div>
    </div>
  );
}

export default ProductDetail;
