// components/VideoTaskScreen.jsx
import React, { useEffect, useRef, useState } from 'react';

const VideoTaskScreen = ({ onComplete }) => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    const initCamera = async () => {
      try {
        const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = userStream;
        }
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

  const uploadVideo = async (videoBlob) => {
    const formData = new FormData();
    formData.append('video', videoBlob, 'video.webm');

    try {
      const response = await fetch('http://localhost:5000/upload_video', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      localStorage.setItem('videoAnalysisResult', JSON.stringify(data));
      console.log('Video analysis result:', data);
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  const startRecording = () => {
    if (stream) {
      recordedChunksRef.current = [];
      setVideoUrl(null);
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = event => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        uploadVideo(blob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleComplete = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    console.log("Moving to next screen...");
    onComplete();
  };

  return (
    <div style={{
      padding: '25px',
      maxWidth: '800px',
      margin: '0 auto',
      overflow: 'auto',
      fontFamily: 'Poppins, sans-serif',
      color: '#333',
      textAlign: 'center'
    }}>
      <h1 style={{ color: '#604ccc' }}>
        Video Recording Task
      </h1>
      <p style={{ fontSize: '20px', color: '#555', marginBottom: '30px' }}>
        This video is being recorded to understand how your expressions relate to your focus and emotions. All data stays private.
      </p>
      <div style={{ border: '2px solid #604ccc', borderRadius: '12px', padding: '10px', display: 'inline-block', marginBottom: '20px', background: '#f9f9f9' }}>
        <video ref={videoRef} autoPlay muted style={{ width: '30vw', maxWidth: '500px', borderRadius: '10px' }} />
      </div>
      <div style={{ marginBottom: '20px', color: '#555' }}>
        <p style={{ fontSize: '20px', lineHeight: '1.6' }}>Now please raise both your hands and look straight at the camera for 5 seconds.</p>
      </div>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', justifyContent: 'center' }}>
        {!isRecording && !videoUrl && (
          <button onClick={startRecording} style={buttonStyle}>Start Recording</button>
        )}
        {isRecording && (
          <button onClick={stopRecording} style={buttonStyle}>Stop Recording</button>
        )}
      </div>

      {videoUrl && (
        <div style={{ marginBottom: '20px', overflowY: 'auto' }}>
          <h3 style={{ fontSize: '22px', marginBottom: '10px', color: '#604ccc' }}>Recording Preview</h3>
          <video src={videoUrl} controls style={{ width: '100%', maxWidth: '500px', borderRadius: '10px' }} />
        </div>
      )}

      {videoUrl && (
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
  fontSize: '22px'
};

export default VideoTaskScreen;
