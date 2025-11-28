import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/SignUp";
import CandidateList from "./pages/Candidate/CandidateList";
import VotePage from "./pages/Voting/VotePage";
import Results from "./pages/Voting/Result";
import AdminPanel from "./pages/Admin/AdminPanel";
import AdminDashboard from "./pages/Admin/AdminDashboard";

import "./assets/styles/global.scss";

export default function App() {
  return (
    <>
     <ToastContainer position="top-right" autoClose={3000} />
     
        <BrowserRouter>

      <Navbar />
      <Routes>
        <Route path="/candidates" element={<CandidateList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/vote/:id" element={<VotePage />} />
        {/* <Route path="/results" element={<Results />} /> */}
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/results" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
    </>
 
  );
}
