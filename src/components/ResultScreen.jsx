function ResultScreen({ score }) {
  let message = "";

  if (score <= 10) message = "Low likelihood of ADHD.";
  else if (score <= 20) message = "Moderate likelihood of ADHD.";
  else message = "High likelihood of ADHD.";

  return (
    <div className="screen">
      <h2>Your Score: {score}</h2>
      <p>{message}</p>
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
