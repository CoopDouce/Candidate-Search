import type React from "react";
import { useEffect, useState } from "react";
import type Candidate from "../interfaces/Candidate.interface";
import SavedCandidatesList from "../components/SavedCandidatesList";

// This component will display the list of saved candidates
const SavedCandidates = () => {
  const [candidatesSaved, setCandidatesSaved] = useState<Candidate[]>([]);

  // This function will remove a candidate from the saved list
  const removeFromStorage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const index = e.currentTarget.value;
    const newCandidates = [...candidatesSaved];
    newCandidates.splice(Number(index), 1);
    setCandidatesSaved(newCandidates);
    localStorage.setItem("savedCandidates", JSON.stringify(newCandidates));
  };

  useEffect(() => {
    const storedSavedCandidates = localStorage.getItem("savedCandidates");
    const parsedSavedCandidates: Candidate[] = storedSavedCandidates ? JSON.parse(storedSavedCandidates) : [];
    setCandidatesSaved(parsedSavedCandidates);
  }, []);

  // This will display the list of saved candidates
  return candidatesSaved.length > 0 ? (
    <>
      <h1>Potential Candidates</h1>
      <SavedCandidatesList
        candidatesSaved={candidatesSaved}
        removeFromStorage={removeFromStorage}
      />
    </>
  ) : (
    <>
      <h1>Potential Candidates</h1>
      <p style={{ textAlign: "center" }}>No candidates have been accepted</p>
    </>
  );
};

export default SavedCandidates;