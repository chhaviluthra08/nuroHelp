import React, { useEffect, useState } from "react";

function ResultScreen({ score, onContinueToVideo }) {
  const [finalScore, setFinalScore] = useState(null);
  const videoResult = JSON.parse(localStorage.getItem("videoAnalysisResult"));
  const audioResult = JSON.parse(localStorage.getItem("audioAnalysisResult"));
  const mcqScore = JSON.parse(localStorage.getItem("mcqScore"));

  useEffect(() => {
    const calculateFinalScore = async () => {
      try {
        const response = await fetch("http://localhost:5000/final_score", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mcq_score: mcqScore.mcq_score || 0,
            video_score: videoResult ? videoResult.video_score : 0,
            audio_score: audioResult ? audioResult.audio_score : 0,
          }),
        });

        const result = await response.json();
        console.log("Total ADHD Score:", result.total_score);
        setFinalScore(result.total_score);
      } catch (err) {
        console.error("Failed to fetch final score:", err);
      }
    };

    calculateFinalScore();
  }, [score]);

  let message = "";

  if (score <= 10) message = "Low likelihood of ADHD.";
  else if (score <= 20) message = "Moderate likelihood of ADHD.";
  else message = "High likelihood of ADHD.";

  return (
    <div className="screen">
      <h2>Your Score: {score}</h2>
      <p>{message}</p>

      {finalScore !== null && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Total ADHD Score: {finalScore}</h3>
        </div>
      )}

      <button
        onClick={onContinueToVideo}
        style={{ marginTop: '1.5rem', padding: '10px 20px', fontSize: '16px' }}
      >
        Continue to Facial Analysis Test
      </button>
    </div>
  );
}

export default ResultScreen;
