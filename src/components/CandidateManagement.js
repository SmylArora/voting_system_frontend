import React, { useState, useEffect } from "react";
import CandidateDialog from "./CandidateDialog";

export default function CandidateManagement({ api }) {
  const [candidates, setCandidates] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState(null);
  const [deleteCandidateId, setDeleteCandidateId] = useState(null);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    const res = await api.get("/candidate/allcandidates");
    setCandidates(res.data.candidates);
  };

  const handleSave = async data => {
    if (editingCandidate) {
      await api.put(`/candidate/${editingCandidate.id}`, data);
    } else {
      await api.post("/candidate", data);
    }
    fetchCandidates();
  };

  const handleDelete = async id => {
    if (!window.confirm("Are you sure you want to delete this candidate?")) return;
    await api.delete(`/candidate/${id}`);
    fetchCandidates();
  };

  const openAddDialog = () => {
    setEditingCandidate(null);
    setDialogOpen(true);
  };

  const openEditDialog = candidate => {
    setEditingCandidate(candidate);
    setDialogOpen(true);
  };

  return (
    <div className="candidate-management">
      <div className="header">
        <h2>Candidate Management</h2>
        <button onClick={openAddDialog}>Add Candidate</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Party</th>
            <th>Description</th>
            <th>Votes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map(c => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.party}</td>
              <td>{c.description}</td>
              <td>{c.votes}</td>
              <td>
                <button onClick={() => openEditDialog(c)}>Edit</button>
                <button onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {candidates.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No candidates yet
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <CandidateDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        candidate={editingCandidate}
        onSave={handleSave}
      />
    </div>
  );
}
