import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="signup-section">
      <div className="signup-container">
        {/* Info Section */}
        <div className="signup-info">
          <h1 className="signup-title">Join Our Expense Tracker 🚀</h1>
          <p className="signup-text">
            Track your expenses, manage your budget, and stay on top of your
            financial health. Sign up in just a few seconds!
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="signup-form">
          <h2 className="signup-form-title">Create Account</h2>

          {error && <p className="signup-error">{error}</p>}

          <div className="form-group">
            <label htmlFor="fullName" className="form-label">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`btn ${loading ? "btn-disabled" : "btn-primary"}`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <p className="signup-note">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} className="link">
              Login here
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Signup;
