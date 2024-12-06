import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import CandidateCard from "../components/CandidateCard";
import type Candidate from "../interfaces/Candidate.interface";

// CandidateSearch component
const CandidateSearch = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  const currentCandidate = candidates[currentIndex];

  // Fetch candidates from Github API
  useEffect(() => {
    const fetchCandidates = async () => {
      const fetchedCandidates = await searchGithub();
      const enrichedCandidates = await Promise.all(
        fetchedCandidates.map(async (candidate: Candidate) => {
          try {
            const detailedCandidate = await searchGithubUser(candidate.login);
            return detailedCandidate ? { ...candidate, ...detailedCandidate } : null;
          } catch (error) {
            if (error instanceof Error && error.message.includes("404")) {
              console.log(`user ${candidate.login} not found. Skipping to the next`);
              return null;
            }
            throw error;
          }
        })
      );
      const validCandidates = enrichedCandidates.filter(candidate => candidate !== null);
      setCandidates(validCandidates);
    };

    fetchCandidates();
  }, []);

  // Save candidate to savedCandidates
  const handleSave = () => {
    const currentCandidate = candidates[currentIndex];
    setSavedCandidates([...savedCandidates, currentCandidate]);
    addToSaved(currentCandidate);
    handleNext();
  };

  // Move to the next candidate
  const handleNext = () => {
    if (currentIndex + 1 < candidates.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      console.log("no more candidates, reload the page"); 
    }
  };

  // Add candidate to savedCandidates in localStorage
  const addToSaved = (currentCandidate: Candidate) => {
    let parsedSavedCandidates: Candidate[] = [];
    const storedSavedCandidates = localStorage.getItem("savedCandidates");
    if (storedSavedCandidates) {
      parsedSavedCandidates = JSON.parse(storedSavedCandidates);
    }
    parsedSavedCandidates.push(currentCandidate);
    localStorage.setItem(
      "savedCandidates",
      JSON.stringify(parsedSavedCandidates)
    );
  };

  console.log(`currentCandidate:`, currentCandidate);
  
  // Render CandidateCard component
  return currentCandidate ? (
    <div>
      <h1>Candidate Search</h1>
      <CandidateCard
        currentCandidate={currentCandidate}
        onSave={handleSave}
        onSkip={handleNext}
      />
    </div>
  ) : (
    <div>
      <h1>Candidate Search</h1>
      <p style={{ textAlign: "center" }}>No more candidates to review. Refresh the page.</p>
    </div>
  );
};

export default CandidateSearch;