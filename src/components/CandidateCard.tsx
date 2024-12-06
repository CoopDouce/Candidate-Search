import type Candidate from "../interfaces/Candidate.interface";

type CandidateCardProps = {
  currentCandidate: Candidate;
  onSave: () => void;
  onSkip: () => void;
};

const CandidateCard = ({ currentCandidate, onSave, onSkip }: CandidateCardProps) => {
  return (
    <div className="card">
      <img
        className="candidateCardImg"
        src={currentCandidate.avatar_url}
        alt={currentCandidate.name}
      />
      <h2>
        {currentCandidate.name}({currentCandidate.login})
      </h2>
      <p>Location: {currentCandidate.location}</p>
      <p>
        Email: <a href={`mailto:${currentCandidate.email}`}>{currentCandidate.email}</a>
      </p>
      <p>Company: {currentCandidate.company}</p>
      <p>
        html-URL:{" "}
        <a href={currentCandidate.html_url}>{currentCandidate.html_url}</a>
      </p>
      <div>
        <button
          style={{ backgroundColor: "red" }}
          onClick={onSkip}
        >
          -
        </button>
        <button
          style={{ backgroundColor: "green", marginLeft: "270px" }}
          onClick={onSave}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CandidateCard;