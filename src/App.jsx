import { useState } from 'react';
import questions from './data/questions';
import StartScreen from './components/StartScreen';
import QuestionScreen from './components/QuestionScreen';
import ResultScreen from './components/ResultScreen';

function App() {
  const [step, setStep] = useState('start');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [score, setScore] = useState(0);

  const handleAnswer = (idx) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = idx;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    let total = 0;
    answers.forEach((ans, i) => {
      if (ans !== null) {
        total += questions[i].scores[ans];
      }
    });
    setScore(total);
    setStep('result');
  };

  const progressPercent = ((currentQ + 1) / questions.length) * 100;

  return (
    <>

      <nav style={{
        width: '100%',
        padding: '10px 30px',
        backgroundColor: '#604ccc',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 999
      }}>
        <h2  style={{ margin: 0 }}>nuroHelp</h2>
      </nav>

      {step === 'start' && <StartScreen onStart={() => setStep('quiz')} />}

      {step === 'quiz' && (
        <div style={{ padding: '0 20px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#333',
            margin: '30px 0 20px',
          }}>
            ASSESSMENT
          </div>

          {/* Progress Bar */}
          <div style={{
            maxWidth: '1000px',
            margin: '0 auto 30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
          }}>
            <div style={{
              flex: 1,
              height: '10px',
              backgroundColor: '#ccc',
              borderRadius: '5px',
              overflow: 'hidden',
            }}>
              <div style={{
                width: `${progressPercent}%`,
                height: '100%',
                backgroundColor: '#4caf50',
                transition: 'width 0.3s ease-in-out',
              }} />
            </div>
            <div style={{
              fontSize: '16px',
              fontWeight: 500,
              color: '#333',
              whiteSpace: 'nowrap',
              minWidth: '100px',
              textAlign: 'right',
            }}>
              {currentQ + 1} / {questions.length}
            </div>
          </div>

          {/* Question Box */}
          <div style={{
            maxWidth: '700px',
            margin: '0 auto',
            backgroundColor: '#fff',
            padding: '20px 20px 20px 40px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}>
            <QuestionScreen
              question={questions[currentQ]}
              total={questions.length}
              currentIndex={currentQ}
              selected={answers[currentQ]}
              onSelect={handleAnswer}
              onNext={() => setCurrentQ((prev) => Math.min(prev + 1, questions.length - 1))}
              onPrev={() => setCurrentQ((prev) => Math.max(prev - 1, 0))}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      )}

      {step === 'result' && <ResultScreen score={score} />}
    </>
  );
}

export default App;
