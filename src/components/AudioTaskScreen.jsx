import React, { useEffect, useRef, useState } from 'react';

const AudioTaskScreen = ({ onComplete }) => {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const audioChunksRef = useRef([]);

  const paragraph = `The quick brown fox jumps over the lazy dog. This sentence is used to test audio pronunciation and clarity. Please read it out loud clearly.`;

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      recorder.ondataavailable = event => {
        audioChunksRef.current.push(event.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
      };
    });
  }, []);

  const handleStart = () => {
    if (mediaRecorder) {
      audioChunksRef.current = [];
      mediaRecorder.start();
      setRecording(true);
    }
  };

  const handleStop = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const handleComplete = () => {
    console.log("Moving to result screen...");
    onComplete(); // ✅ move to result screen
  };

  return (
    <div style={{
      padding: '40px',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'Poppins, sans-serif',
      color: '#333'
    }}>
      <h2 style={{ fontSize: '28px', marginBottom: '16px', color: '#604ccc' }}>
        Audio Recording Task
      </h2>

      <p style={{ fontSize: '16px', color: '#555', marginBottom: '20px' }}>
        This task helps us understand your pronunciation and tone. Your recording will not be shared with anyone.
      </p>

      <div style={{
        background: '#f9f9f9',
        border: '1px solid #ccc',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px',
        fontSize: '18px',
        lineHeight: '1.6'
      }}>
        {paragraph}
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        {!recording && (
          <button onClick={handleStart} style={buttonStyle}>Start Recording</button>
        )}
        {recording && (
          <button onClick={handleStop} style={buttonStyle}>Stop Recording</button>
        )}
        {audioUrl && (
          <audio controls src={audioUrl} />
        )}
      </div>

      {audioUrl && (
        <button onClick={handleComplete} style={{ ...buttonStyle, backgroundColor: '#4caf50' }}>
          Submit and Continue
        </button>
      )}
    </div>
  );
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#604ccc',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '16px'
};

export default AudioTaskScreen;
