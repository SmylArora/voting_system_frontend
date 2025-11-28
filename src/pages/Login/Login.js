import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    addharNumber: "",
    password: "",
  });

  const { token, user, status, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  useEffect(() => {
    if (token && user) {
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/candidates");
      }
    }
  }, [token, user, navigate]);

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="title">Welcome Back 👋</h2>
        <p className="subtitle">Login to continue voting securely</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Aadhaar Number</label>
            <input
              value={form.addharNumber}
              onChange={(e) =>
                setForm({ ...form, addharNumber: e.target.value })
              }
              placeholder="Enter Aadhaar Number"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              placeholder="Enter Password"
            />
          </div>

          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="signup-link">
          Don’t have an account? <a href="/signup">Signup</a>
        </p>
      </div>
    </div>
  );
}

