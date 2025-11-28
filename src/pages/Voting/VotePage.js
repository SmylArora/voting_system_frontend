import { useDispatch } from "react-redux";
import { useParams, useNavigate ,useLocation} from "react-router-dom";
import { voteCandidate } from "../../redux/voteSlice";
import "./VotePage.scss";

export default function VotePage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const candidate = location?.state;
  console.log(candidate, "candidate");

  const voteNow = () => {
    dispatch(voteCandidate(id));
  };

  const cancelVote = () => {
    navigate(-1); 
  };

  return (
    <div className="vote-container">
      <div className="vote-card">
        <h2>Confirm Your Vote</h2>
         <div className="candidate-info">
        <p>
            <strong>Candidate Name : </strong> <span className="candidateName">  {candidate.name}</span>
        </p>
         
          <p><strong>Party : </strong>  {candidate.party}</p>
          <p><strong>Age : </strong> {candidate.age}</p>
        </div>
        <p className="confirm-text">Are you sure you want to vote for this candidate?</p>
        <div className="button-group">
          <button className="confirm-btn" onClick={voteNow}>
            Vote
          </button>

          <button className="cancel-btn" onClick={cancelVote}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
