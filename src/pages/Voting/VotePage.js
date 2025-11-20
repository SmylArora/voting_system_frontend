import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { voteCandidate } from "../../redux/voteSlice";
import "./VotePage.scss";

export default function VotePage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const voteNow = () => {
    dispatch(voteCandidate(id));
  };

  return (
    <div className="vote-container">
      <div className="vote-card">
        <h2>Confirm Your Vote</h2>

        <p>Are you sure you want to vote for this candidate?</p>

        <button onClick={voteNow}>Yes, Vote</button>
      </div>
    </div>
  );
}
