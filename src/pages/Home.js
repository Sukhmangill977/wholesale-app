// src/pages/Home.js
import './home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>Wholesaler & Retailer Hub</h1>
        <p>Empowering retailers with quality products directly from wholesalers.</p>
        <div className="home-buttons">
          <Link to="/signup" className="btn">Sign Up</Link>
          <Link to="/login" className="btn btn-outline">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
