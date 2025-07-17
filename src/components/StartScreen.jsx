function StartScreen({ onStart }) {
  const wrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  };



  return (
    <main style={wrapperStyle}>
      <img
        src="/1.jpeg"
        alt="Logo"
        style={{
          width: '70vw',
          height: '40vh',
          objectFit: 'cover',
          display: 'block',
          margin: '40px',
          borderRadius : "10px"
        }}
      />
      <h1>Start understanding your mind <br></br>one at a time</h1>
      <button onClick={onStart}>Start</button>
    </main>
  );
}

export default StartScreen;
