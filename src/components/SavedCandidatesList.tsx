import type React from "react";
import type Candidate from "../interfaces/Candidate.interface";

interface SavedCandidatesProps {
  candidatesSaved: Candidate[];
  removeFromStorage:
    | ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | null;
}

const SavedCandidatesList = ({
  candidatesSaved,
  removeFromStorage,
}: SavedCandidatesProps) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Username</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>HTML-URL</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {candidatesSaved.map((candidate, index) => (
            <tr key={index}>
              <td style={{ textAlign: "center" }}>
                <img
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "contain",
                    textAlign: "center",
                  }}
                  src={candidate.avatar_url}
                  alt={candidate.name}
                />
              </td>
              <td>{candidate.name}</td>
              <td>{candidate.login}</td>
              <td>{candidate.location}</td>
              <td>{candidate.email}</td>
              <td>{candidate.company}</td>
              <td>{candidate.html_url}</td>
              <td style={{ textAlign: "center" }}>
                <button
                  style={{
                    backgroundColor: "red",
                    borderRadius: "50%",
                  }}
                  value={index}
                  onClick={(
                    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                  ) => removeFromStorage?.(e)}
                >
                  -
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavedCandidatesList;