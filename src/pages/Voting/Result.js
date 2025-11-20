import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVoteCount } from "../../redux/candidateSlice";
import "./Results.scss";

export default function Results() {
  const dispatch = useDispatch();
  const { voteCount } = useSelector((s) => s.candidates);

  useEffect(() => {
    dispatch(fetchVoteCount());
  }, []);

  return (
    <div className="results-container">
      <h2>Live Election Results</h2>

      {voteCount.map((res) => (
        <div className="results-card" key={res.party}>
          <p><strong>Party:</strong> {res.party}</p>
          <p><strong>Votes:</strong> {res.voteCount}</p>
        </div>
      ))}
    </div>
  );
}
