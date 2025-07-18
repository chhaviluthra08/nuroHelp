// components/VideoTaskScreen.jsx
import React, { useEffect, useRef, useState } from 'react';

const VideoTaskScreen = ({ onComplete }) => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    const initCamera = async () => {
      try {
        const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        videoRef.current.srcObject = userStream;
        setStream(userStream);
      } catch (err) {
        console.error("Error accessing media devices.", err);
      }
    };
    initCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startRecording = () => {
    setRecordedChunks([]);
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.ondataavailable = event => {
      if (event.data.size > 0) {
        setRecordedChunks(prev => [...prev, event.data]);
      }
    };
    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'user_video.webm';
      a.click();
    };
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <p style={{ background: '#e3f2fd', padding: '10px', borderRadius: '8px', marginBottom: '20px' }}>
        This video is being recorded to understand how your expressions relate to your focus and emotions. All data stays private.
      </p>
      <div style={{ border: '2px solid #6c63ff', borderRadius: '10px', padding: '10px', display: 'inline-block', marginBottom: '20px' }}>
        <video ref={videoRef} autoPlay muted style={{ width: '100%', maxWidth: '500px', borderRadius: '10px' }} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <p>Now please raise both your hands and look straight at the camera for 5 seconds.</p>
      </div>
      <div>
        {!isRecording && <button onClick={startRecording}>Start Recording</button>}
        {isRecording && <button onClick={stopRecording}>Stop Recording</button>}
      </div>
      <button onClick={onComplete} style={{ marginTop: '20px' }}>Continue to Audio Task</button>
    </div>
  );
};

export default VideoTaskScreen;
