import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCandidates } from "../../redux/candidateSlice";
import { useNavigate } from "react-router-dom";
import "./CandidateList.scss";

export default function CandidateList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list } = useSelector((state) => state.candidates);
  console.log(list, "candidate list");

  useEffect(() => {
    dispatch(fetchCandidates());
  }, []);

  return (
    <div className="candidate-list">
        <h1>Candidate List</h1>
        <div className="card-container">
     {list.map((c) => (
        <div className="candidate-card" key={c._id}>
          <h3>{c.name}</h3>
          <p className="subtext">Party: {c.party}</p>
            <p className="subtext">Age: {c.age}</p>
          <button   onClick={() => navigate(`/vote/${c._id}`, { state: c })}>Vote</button>
          
        </div>
      ))}
        </div>
         
    </div>
  );
}
