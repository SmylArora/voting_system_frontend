import React, { useEffect, useState } from "react";

export default function CandidateDialog({ open, onClose, candidate, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    party: "",
    description: "",
  });

  useEffect(() => {
    if (candidate) {
      setFormData({
        name: candidate.name,
        party: candidate.party,
        description: candidate.description,
      });
    } else {
      setFormData({ name: "", party: "", description: "" });
    }
  }, [candidate, open]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>{candidate ? "Edit Candidate" : "Add Candidate"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              value={formData.name}
              onChange={e => handleChange("name", e.target.value)}
              placeholder="Candidate name"
              required
            />
          </div>
          <div className="form-group">
            <label>Party</label>
            <input
              value={formData.party}
              onChange={e => handleChange("party", e.target.value)}
              placeholder="Party name"
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={e => handleChange("description", e.target.value)}
              placeholder="Description"
              required
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">{candidate ? "Update" : "Add"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
