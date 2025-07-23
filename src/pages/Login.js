// src/pages/Login.js
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './login.css';
import loginIllustration from '../assets/login-illustration.svg'; // Add this SVG to your project

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', userCred.user.uid));

      if (!userDoc.exists()) {
        setError('User data not found.');
        return;
      }

      const role = userDoc.data().role;

      if (role === 'wholesaler') {
        navigate('/wholesaler');
      } else if (role === 'retailer') {
        navigate('/retailer');
      } else {
        setError('Invalid user role.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="login-left">
          <img src={loginIllustration} alt="Login Illustration" />
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <h2>Welcome Back 👋</h2>
          <p className="subheading">Please login to your account</p>

          {error && <p className="error-msg">{error}</p>}

          <input
            type="email"
            placeholder="📧 Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="🔒 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* <div className="form-footer">
            <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
          </div> */}

          <button type="submit">Login</button>

          <p className="signup-prompt">
            Don't have an account? <Link to="/Signup">Sign up</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
