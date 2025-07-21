// src/components/Navbar.js
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getUserRole } from '../utils/getUserRole';
import './navbar.css';

function Navbar() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const r = await getUserRole(u.uid);
        setRole(r);
      } else {
        setRole(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <Link to="/">🛍️ Wholesale Marketplace</Link>
      </div>
      <nav className="navbar-links">
        <Link to="/">Home</Link>
        {!user && <>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
        </>}
        {role === 'retailer' && <>
          <Link to="/cart">Cart</Link>
          <Link to="/retailer">Products</Link>
        </>}
        {role === 'wholesaler' && (
  <>
    
    <Link to="/wholesaler">My Products</Link> {/* ✅ NEW LINK */}
  </>
)}

        {/* {role === 'wholesaler' && <Link to="/orders">Orders</Link>} */}
        {user && <button onClick={async () => { await signOut(auth); navigate('/login'); }} className="logout-btn">Logout</button>}
      </nav>
    </header>
  );
}

export default Navbar;
