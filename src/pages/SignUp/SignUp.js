import { useState , useEffect } from "react";
import { signupUser } from "../../redux/authSlice";
import { useDispatch , useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Signup.scss";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    age: "",
    mobile: "",
    email: "",
    address: "",
    addharNumber: "",
    password: "",
    role: "voter"
  });

   const { token, status, error } = useSelector((state) => state.auth);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signupUser(form));
  };
   useEffect(() => {
    if (token) {
      navigate("/candidates");
    }
  }, [token, navigate]);

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="title">Create Account</h2>
        <p className="subtitle">Join our voting platform today</p>

        <form onSubmit={submitHandler}>
          <div className="input-group">
            <label>Name</label>
            <input placeholder="John Doe" onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>

          <div className="input-group">
            <label>Age</label>
            <input type="number" placeholder="25" onChange={(e) => setForm({ ...form, age: e.target.value })} />
          </div>

          <div className="input-group">
            <label>Mobile</label>
            <input placeholder="9876543210" onChange={(e) => setForm({ ...form, mobile: e.target.value })} />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="example@mail.com" onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>

          <div className="input-group">
            <label>Address</label>
            <input placeholder="123 Main St" onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </div>

          <div className="input-group">
            <label>Aadhaar Number</label>
            <input placeholder="1234 5678 9012" onChange={(e) => setForm({ ...form, addharNumber: e.target.value })} />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="********" onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>

          <div className="input-group">
            <label>Role</label>
            <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
              <option value="voter">Voter</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit">Signup</button>
            <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
        </form>
      </div>
    </div>
  );
}
