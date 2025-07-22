// src/pages/Home.js
import './home.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home() {
  return (
    <div className="home">
      <motion.div className="hero" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h1>Wholesaler & Retailer Hub</h1>
        <p>Empowering retailers with quality products directly from trusted wholesalers.</p>
        <div className="home-buttons">
          <Link to="/signup" className="btn">Sign Up</Link>
          <Link to="/login" className="btn btn-outline">Login</Link>
        </div>
      </motion.div>

      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-cards">
          <div className="card">
            <img src="https://cdn-icons-png.flaticon.com/512/1055/1055641.png" alt="Fast Delivery" />
            <h3>Fast Delivery</h3>
            <p>Get products delivered on time, every time.</p>
          </div>
          <div className="card">
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Bulk Discounts" />
            <h3>Bulk Discounts</h3>
            <p>Save more when you buy more.</p>
          </div>
          <div className="card">
            <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="Easy Tracking" />
            <h3>Easy Tracking</h3>
            <p>Track your orders with real-time updates.</p>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-cards">
          <div className="t-card">
            <p>"This platform changed how I source my products! Simple and affordable."</p>
            <strong>- Aarti, Retailer</strong>
          </div>
          <div className="t-card">
            <p>"The user interface is super easy and the support team is amazing."</p>
            <strong>- Mohan, Wholesaler</strong>
          </div>
        </div>
      </section>

      {/* New Sections Start Here */}

      <section className="features">
        <div className="feature-cards">
          <div className="card">
            <img src="https://cdn-icons-png.flaticon.com/512/833/833472.png" alt="Verified Sellers" />
            <h3>Connect with Verified Sellers</h3>
            <p>Tell us your requirement & let our experts find verified sellers for you.</p>
            <button className="btn">Get Verified Sellers</button>
          </div>

          <div className="card">
            <img src="https://cdn-icons-png.flaticon.com/512/891/891462.png" alt="Start Selling" />
            <h3>Start Selling on WholesMarket</h3>
            <p>Reach out to more than 21+ crore buyers. Sell with us for free.</p>
            <button className="btn btn-outline">Start Selling</button>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Explore Products from Premium Brands</h2>
        <div className="feature-cards">
          <div className="card">
            <img src="https://cdn-icons-png.flaticon.com/512/2304/2304994.png" alt="Brands" />
            <h3>Top Brands</h3>
            <p>Get quality products from trusted premium manufacturers and distributors.</p>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Suppliers from Top Cities</h2>
        <div className="feature-cards">
          {["Delhi", "Bengaluru", "Chennai", "Mumbai", "Ahmedabad", "Kolkata", "Pune", "Surat", "Jaipur", "Hyderabad"].map(city => (
            <div className="card" key={city}>
              <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" alt={city} />
              <h3>{city}</h3>
              <p>Verified suppliers available in {city}.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="features" id="contact">
        <h2>Contact Us</h2>
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <input type="text" placeholder="Contact Number" required />
          <textarea placeholder="Your Requirements / Query" rows="4" required></textarea>
          <button className="btn">Send Message</button>
        </form>
        <p>Or email us at: <a href="mailto:sukhmangill977@gmail.com">sukhmangill977@gmail.com</a></p>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2025 Wholesaler-Retailer Hub | Built with 💚</p>
      </footer>
    </div>
  );
}

export default Home;
