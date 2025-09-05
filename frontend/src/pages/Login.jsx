import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // clear error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Sending login request with:", formData);

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        console.log("Login successful, token saved ✅");
        navigate("/dashboard");
      } else {
        setError("Login failed: No token received.");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Invalid credentials. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-section">
      <div className="login-container">
        {/* Info Section */}
        <div className="login-info">
          <h1 className="login-title">Welcome Back 👋</h1>
          <p className="login-text">
            Log in to track your expenses, analyze reports, and take control of
            your financial journey.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="login-form-title">Login</h2>

          {error && <p className="login-error">{error}</p>}

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
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="login-note">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="link"
            >
              Sign up here
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
