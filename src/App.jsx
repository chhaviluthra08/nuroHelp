import { useState } from 'react';
import questions from './data/questions';
import StartScreen from './components/StartScreen';
import QuestionScreen from './components/QuestionScreen';
import ResultScreen from './components/ResultScreen';
import VideoTaskScreen from './components/VideoTaskScreen';
import AudioTaskScreen from './components/AudioTaskScreen';

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
    setStep('video');
  };

  const progressPercent = ((currentQ + 1) / questions.length) * 100;

  return (
    <>
      <nav style={{
        width: '99%',
        padding: '10px 7.8px ',
        backgroundColor: '#604ccc',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 999
      }}>
        <h1 style={{ margin: '0px 20px' }}> nuroHelp</h1>
      </nav>

      {step === 'start' && <StartScreen onStart={() => setStep('quiz')} />}

      {step === 'quiz' && (
        <div style={{ padding: '0 45px' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '75px',
            marginTop: '15px'
          }}>
            <div style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#333',
              whiteSpace: 'nowrap'
            }}>
              ASSESSMENT
            </div>

            <div style={{
              maxWidth: '1000px',
              flex: 1,
              display: 'flex',
              alignItems: 'center',
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
                fontSize: '20px',
                fontWeight: 500,
                color: '#333',
                whiteSpace: 'nowrap',
                minWidth: '80px',
                textAlign: 'right',
              }}>
                {currentQ + 1} / {questions.length}
              </div>
            </div>
          </div>

          <div style={{
            maxWidth: '55vw',
            height: '75vh',
            margin: '30px auto',
            backgroundColor: '#fff',
            padding: '10px 10px 0px 30px',
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

      {step === 'video' && (
        <VideoTaskScreen onComplete={() => setStep('audio')} />
      )}

      {step === 'audio' && (
        <AudioTaskScreen onComplete={() => setStep('result')} />
      )}

      {step === 'result' && (
        <ResultScreen
          score={score}
          onRestart={() => {
            setAnswers(Array(questions.length).fill(null));
            setCurrentQ(0);
            setStep('start');
            setScore(0);
          }}
        />
      )}
    </>
  );
}

export default App;
