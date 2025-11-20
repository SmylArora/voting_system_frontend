import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVoteCount } from "../../redux/candidateSlice";
import { Bar } from "react-chartjs-2";
import "./AdminDashboard.scss";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { voteCount } = useSelector((s) => s.candidates);

  useEffect(() => {
    dispatch(fetchVoteCount());
  }, []);

  const data = {
    labels: voteCount.map((v) => v.party),
    datasets: [
      {
        label: "Votes",
        data: voteCount.map((v) => v.voteCount),
        backgroundColor: "#1a73e8"
      }
    ]
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <div className="charts">
        <div className="chart-card">
          <Bar data={data} />
        </div>
      </div>
    </div>
  );
}
