import React, { useEffect, useState } from "react";
import "./CandidateDialog.scss";

export default function CandidateDialog({ open, onClose, candidate, onSave }) {
  const [form, setForm] = useState({
    name: "",
    party: "",
    age:""
  });

  useEffect(() => {
    if (candidate) {
      setForm({
        name: candidate.name,
        party: candidate.party,
        age: candidate.age,
      });
    } else {
      setForm({ name: "", party: "", age: "" });
    }
  }, [candidate]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <h3>{candidate ? "Edit Candidate" : "Add Candidate"}</h3>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

        <div className="form-group">
            <label>Age</label>
            <input
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Party</label>
            <input
              value={form.party}
              onChange={(e) => setForm({ ...form, party: e.target.value })}
              required
            />
          </div>

         

          <div className="dialog-actions">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn primary">
              {candidate ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
