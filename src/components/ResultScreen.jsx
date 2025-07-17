function ResultScreen({ score }) {
  let message = "";

  if (score <= 10) message = "Low likelihood of ADHD.";
  else if (score <= 20) message = "Moderate likelihood of ADHD.";
  else message = "High likelihood of ADHD.";

  return (
    <div className="screen">
      <h2>Your Score: {score}</h2>
      <p>{message}</p>
    </div>
  );
}

export default ResultScreen;
