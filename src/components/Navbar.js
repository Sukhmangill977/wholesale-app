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
  const [menuOpen, setMenuOpen] = useState(false);
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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <Link to="/">🛍️ Wholesale Marketplace</Link>
      </div>

      {/* Hamburger icon */}
      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Menu links */}
      <nav className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <Link to="/">Home</Link>
        {!user && <>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
        </>}
        {role === 'retailer' && <>
          <Link to="/cart">Cart</Link>
          <Link to="/retailer">Products</Link>
        </>}
        {role === 'wholesaler' && <>
          <Link to="/wholesaler">My Products</Link>
        </>}
        {user && (
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
