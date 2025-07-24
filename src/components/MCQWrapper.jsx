import { useState } from "react";
import QuestionScreen from "./QuestionScreen";

const MCQWrapper = ({ questions }) => {
  const [currentIndex, setCurrentIndex] = useState (0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(null);

  const handleSelect = (idx) => {
    const updated = [...answers];
    updated[currentIndex] = idx;
    setAnswers(updated);
    setSelected(idx);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
    setSelected(answers[currentIndex + 1]);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => prev - 1);
    setSelected(answers[currentIndex - 1]);
  };

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:5000/evaluate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers })
    });
    const data = await res.json();
    localStorage.setItem("mcqScore", data.mcq_score);
    setScore(data.mcq_score);
  };

  if (score !== null) {
    return (
      <div className="result-screen">
        <h2>Your Score: {score}</h2>
      </div>
    );
  }

  return (
    <QuestionScreen
      question={questions[currentIndex]}
      currentIndex={currentIndex}
      total={questions.length}
      selected={answers[currentIndex]}
      onSelect={handleSelect}
      onNext={handleNext}
      onPrev={handlePrev}
      onSubmit={handleSubmit}
    />
  );
};
