import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVoteCount, fetchCandidates } from "../../redux/candidateSlice";
import { Bar, Pie } from "react-chartjs-2";
import "./AdminDashboard.scss";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { list: candidates, voteCount } = useSelector((s) => s.candidates);

  useEffect(() => {
    dispatch(fetchCandidates());
    dispatch(fetchVoteCount());
  }, [dispatch]);

  const totalVotes = candidates.reduce((sum, c) => sum + (c.voteCount || 0), 0);
  const activeCandidates = candidates.length;
  const leadingCandidate = candidates.reduce((prev, curr) => {
    return (prev.voteCount || 0) > (curr.voteCount || 0) ? prev : curr;
  }, {});

  const barData = {
    labels: voteCount.map((v) => v.party),
    datasets: [
      {
        label: "Votes",
        data: voteCount.map((v) => v.voteCount),
        backgroundColor: "#1a73e8"
      }
    ]
  };

  const pieData = {
    labels: candidates.map((c) => c.name),
    datasets: [
      {
        label: "Vote Share",
        data: candidates.map((c) => c.voteCount),
        backgroundColor: ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#06b6d4"]
      }
    ]
  };

  const sortedCandidates = [...candidates].sort((a, b) => (b.voteCount || 0) - (a.voteCount || 0));

  return (
    <div className="admin-dashboard">
      <h2>Voting Results</h2>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card">
          <h3>Total Votes</h3>
          <p>{totalVotes.toLocaleString()}</p>
          <small>Votes cast</small>
        </div>
        <div className="card">
          <h3>Leading Candidate</h3>
          <p>{leadingCandidate?.name || "N/A"}</p>
          <small>{leadingCandidate?.voteCount || 0} votes</small>
        </div>
        <div className="card">
          <h3>Turnout</h3>
          <p>{activeCandidates}</p>
          <small>Active candidates</small>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="charts">
        <div className="chart-card">
          <Bar data={barData} />
        </div>
      </div>

      {/* Pie Chart */}
      <div className="charts">
        <div className="chart-card">
          <h3>Vote Share</h3>
          <Pie data={pieData} />
        </div>
      </div>

      {/* Rankings */}
      <div className="rankings">
        <h3>Rankings</h3>
        <p>Candidates by vote count</p>
        <ul>
          {sortedCandidates.map((c, index) => (
            <li key={c._id} className="ranking-item">
              <span className="rank">{index + 1}</span>
              <span className="name">{c.name}</span>
              <span className="votes">{c.voteCount.toLocaleString()} votes</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
