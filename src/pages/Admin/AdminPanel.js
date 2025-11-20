import { useState } from "react";
import API from "../../utils/axios";
import "./AdminPanel.scss";

export default function AdminPanel() {
  const [form, setForm] = useState({
    name: "",
    party: "",
    age: ""
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    await API.post("/candidates/newcandidate", form);
    alert("Candidate added!");
  };

  return (
    <div className="admin-panel">
      <div className="admin-card">
        <h2>Add Candidate</h2>

        <form onSubmit={submitHandler}>
          <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Party" onChange={(e) => setForm({ ...form, party: e.target.value })} />
          <input type="number" placeholder="Age" onChange={(e) => setForm({ ...form, age: e.target.value })} />
          <button>Add Candidate</button>
        </form>
      </div>
    </div>
  );
}
