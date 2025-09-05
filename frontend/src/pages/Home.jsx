import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Take Control of Your <span className="highlight">Finances</span>
          </h1>
          <p className="hero-subtitle">
            Track income & expenses, analyze spending, and reach your goals with
            interactive dashboards — all in one secure place.
          </p>

          <div className="hero-buttons">
            {isLoggedIn ? (
              <button className="btn-primary" onClick={() => navigate("/dashboard")}>
                Go to Dashboard
              </button>
            ) : (
              <>
                <button className="btn-primary" onClick={() => navigate("/signup")}>
                  Create Account
                </button>
                <button className="btn-secondary" onClick={() => navigate("/login")}>
                  Login
                </button>
              </>
            )}
          </div>

          <p className="trust-badge">
            🔒 100% Secure • ⚡ Fast • ✅ Easy to Use
          </p>
        </div>

        <div className="hero-image">
          <img
            src="/assets/dashboard.png"
            alt="Expense Dashboard Preview"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Expense Tracker?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>📊 Visual Reports</h3>
            <p>Understand your money with interactive charts and insights.</p>
          </div>
          <div className="feature-card">
            <h3>💰 Budget Management</h3>
            <p>Set spending limits and stay on track with your goals.</p>
          </div>
          <div className="feature-card">
            <h3>📱 Access Anywhere</h3>
            <p>Track your expenses on desktop, tablet, or mobile devices.</p>
          </div>
          <div className="feature-card">
            <h3>🔒 Data Security</h3>
            <p>Your data is encrypted and stored securely at all times.</p>
          </div>
          <div className="feature-card">
            <h3>⚡ Quick Add</h3>
            <p>Add transactions in just seconds — no clutter, no hassle.</p>
          </div>
          <div className="feature-card">
            <h3>🎯 Goal Tracking</h3>
            <p>Stay motivated by setting and achieving financial goals.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      {!isLoggedIn && (
        <section className="cta">
          <h2>Start your journey toward smarter money management today</h2>
          <button className="btn-primary" onClick={() => navigate("/signup")}>
            Get Started Free
          </button>
        </section>
      )}

      {/* Footer */}
   {/* Footer */}
<footer className="footer">
  <div className="footer-container">
    <div className="footer-column">
      <h3>Expense Tracker</h3>
      <p>
        Simplify your finances. Track expenses, manage budgets, and stay in
        control of your money — anytime, anywhere.
      </p>
    </div>

    <div className="footer-column">
      <h4>Quick Links</h4>
      <ul>
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={() => navigate("/dashboard")}>Dashboard</li>
        {!isLoggedIn && (
          <>
            <li onClick={() => navigate("/login")}>Login</li>
            <li onClick={() => navigate("/signup")}>Sign Up</li>
          </>
        )}
      </ul>
    </div>

    <div className="footer-column">
      <h4>Contact</h4>
    </div>
  </div>

  <div className="footer-bottom">
    <div className="social-icons">
      <a href="#"><i className="fab fa-facebook"></i></a>
      <a href="#"><i className="fab fa-twitter"></i></a>
      <a href="#"><i className="fab fa-linkedin"></i></a>
      <a href="#"><i className="fab fa-instagram"></i></a>
    </div>
    <p>© {new Date().getFullYear()} Expense Tracker. All rights reserved.</p>
  </div>
</footer>

    </div>
  );
};

export default Home;
