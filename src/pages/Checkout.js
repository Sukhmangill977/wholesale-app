import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import './Checkout.css';

function Checkout() {
  const [form, setForm] = useState({
    fullName: '', businessName: '', gstNumber: '',
    email: '', phone: '',
    billing: { street: '', city: '', state: '', zip: '', country: '' },
    shippingSame: true,
    shipping: { street: '', city: '', state: '', zip: '', country: '' },
    deliveryDate: '', instructions: '',
    modeOfPayment: '', paymentStatus: '', paymentProof: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name.startsWith('billing.') || name.startsWith('shipping.')) {
      const [group, field] = name.split('.');
      setForm(prev => ({ ...prev, [group]: { ...prev[group], [field]: value } }));
    } else if (name === 'shippingSame') {
      setForm(prev => ({ ...prev, shippingSame: checked }));
    } else if (name === 'paymentProof') {
      setForm(prev => ({ ...prev, paymentProof: files[0] }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) return alert("Login required");

    const orderDetails = {
      userId: auth.currentUser.uid,
      createdAt: Timestamp.now(),
      ...form,
      cart: JSON.parse(localStorage.getItem("cart") || "[]"),
    };

    await addDoc(collection(db, 'orders'), orderDetails);
    localStorage.removeItem("cart");
    alert("Order placed successfully!");
    navigate('/thankyou');
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h2>Checkout Details</h2>

      <fieldset>
        <legend>1. Personal / Business Info</legend>
        <input name="fullName" placeholder="Full Name" onChange={handleChange} required />
        <input name="businessName" placeholder="Business Name (optional)" onChange={handleChange} />
        <input name="gstNumber" placeholder="GST Number (optional)" onChange={handleChange} />
      </fieldset>

      <fieldset>
        <legend>2. Contact Information</legend>
        <input name="email" type="email" placeholder="Email Address" onChange={handleChange} required />
        <input name="phone" type="tel" placeholder="Phone Number" onChange={handleChange} required />
      </fieldset>

      <fieldset>
        <legend>3. Billing Address</legend>
        <input name="billing.street" placeholder="Street Address" onChange={handleChange} required />
        <input name="billing.city" placeholder="City" onChange={handleChange} required />
        <input name="billing.state" placeholder="State" onChange={handleChange} required />
        <input name="billing.zip" placeholder="Postal/Zip Code" onChange={handleChange} required />
        <input name="billing.country" placeholder="Country" onChange={handleChange} required />
      </fieldset>

      <label>
        <input type="checkbox" name="shippingSame" checked={form.shippingSame} onChange={handleChange} />
        Shipping address same as billing?
      </label>

      {!form.shippingSame && (
        <fieldset>
          <legend>4. Shipping Address</legend>
          <input name="shipping.street" placeholder="Street Address" onChange={handleChange} />
          <input name="shipping.city" placeholder="City" onChange={handleChange} />
          <input name="shipping.state" placeholder="State" onChange={handleChange} />
          <input name="shipping.zip" placeholder="Postal/Zip Code" onChange={handleChange} />
          <input name="shipping.country" placeholder="Country" onChange={handleChange} />
        </fieldset>
      )}

      <fieldset>
        <legend>5. Order Preferences</legend>
        <input name="deliveryDate" type="date" onChange={handleChange} />
        <textarea name="instructions" placeholder="Delivery Instructions" onChange={handleChange}></textarea>
      </fieldset>

      <fieldset>
        <legend>6. Payment Info</legend>
        <select name="modeOfPayment" onChange={handleChange} required>
          <option value="">Select Mode</option>
          <option value="UPI">UPI</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="COD">Cash on Delivery</option>
        </select>
        <select name="paymentStatus" onChange={handleChange} required>
          <option value="">Select Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </select>
        <label>Upload Payment Proof (optional):</label>
        <input name="paymentProof" type="file" onChange={handleChange} />
      </fieldset>

      <button type="submit">Place Order</button>
    </form>
  );
}

export default Checkout;
