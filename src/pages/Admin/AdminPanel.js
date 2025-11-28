import { useState } from "react";
import API from "../../utils/axios";
import "./AdminPanel.scss";
import CandidateManagement from "../Candidate/CandidateTable";

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
      <h2>Manage Candidates</h2>
      <div className="admin-card">

        <CandidateManagement />

      </div>
    </div>
  );
}
