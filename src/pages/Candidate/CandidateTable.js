import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import {
  fetchCandidates,
  addCandidate,
  updateCandidate,
  deleteCandidate,
} from "../../redux/candidateSlice";

import CandidateDialog from "./CandidateDialog";
import ConfirmDialog from "./ConfirmDialog";
import { MdModeEdit } from "react-icons/md";

import "./CandidateManagement.scss";

export default function CandidateManagement() {
  const dispatch = useDispatch();
  const { list } = useSelector((s) => s.candidates);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState(null);
  const [candidateToDelete, setCandidateToDelete] = useState(null);
  console.log(list, "list");

  // Load candidates
  useEffect(() => {
    dispatch(fetchCandidates());
  }, [dispatch]);

  // Add button
  const handleAdd = () => {
    setEditingCandidate(null);
    setDialogOpen(true);
  };

  // Edit button
  const handleEdit = (candidate) => {
    setEditingCandidate(candidate);
    setDialogOpen(true);
  };

  // Delete button
  const handleDeleteClick = (id) => {
    setCandidateToDelete(id);
    setDeleteOpen(true);
  };

  // Delete confirm
  const confirmDelete = () => {
    dispatch(deleteCandidate(candidateToDelete));
    setDeleteOpen(false);
  };

  // Save (add or update)
  const handleSave = (data) => {
    if (editingCandidate) {
      dispatch(updateCandidate({ id: editingCandidate._id, data }));
    } else {
      dispatch(addCandidate(data));
    }
    setDialogOpen(false);
  };

  return (
    <div className="candidate-management">
      <div className="header-row">
        <h2>Total Candidate : {list.length}</h2>
        <button className="btn primary" onClick={handleAdd}>
          + Add Candidate
        </button>
      </div>

      <div className="table-container">
        <table className="candidate-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Party</th>
              <th>Total Votes</th>
              <th>Description</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {list.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty">
                  No candidates found.
                </td>
              </tr>
            ) : (
              list.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{c.party}</td>
                  <td>{c.voteCount}</td>
                  <td>{c.description || "—"}</td>
                  <td className="text-right">
                    <button className="btn small" onClick={() => handleEdit(c)}>
                      <MdModeEdit color="#6E44FF" size={"1.5em"}/>
                    </button>

                    <button
                      className="btn small danger"
                      onClick={() => handleDeleteClick(c._id)}
                    >
                      <AiFillDelete  color="#6E44FF" size={"1.5em"}/>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Dialog */}
      <CandidateDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        candidate={editingCandidate}
        onSave={handleSave}
      />

      {/* Confirm Delete */}
      <ConfirmDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Candidate?"
        message="This action cannot be undone."
      />
    </div>
  );
}
