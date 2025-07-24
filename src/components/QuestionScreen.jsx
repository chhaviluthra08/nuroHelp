function QuestionScreen({
  question,
  currentIndex,
  total,
  selected,
  onSelect,
  onNext,
  onPrev,
  onSubmit
}) 

{

  return (
    
    <div className="screen" style={{ width: '100%', height: '100vh', overflowY: 'auto', padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Poppins, sans-serif', color: '#333', textAlign: 'center' }}>
      <p style={{ fontSize: "2rem", marginBottom: '20px' }}>
        {question.question}
      </p>
      
      {question.options.map((option, idx) => (
        <div
          key={idx}
          onClick={() => onSelect(idx)}
          style={{
            width: '90%',
            padding: '10px 20px',
            margin: '12px 0',
            borderRadius: '8px',
            backgroundColor: selected === idx ? '#d0c3e0' : '#f1f1f1',
            border: selected === idx ? '2px solid #5e4b8b' : '1px solid #ccc',
            cursor: 'pointer',
            fontWeight: '500',
            transition: 'all 0.2s ease',
            boxShadow: selected === idx ? '0 0 10px rgba(0,0,0,0.1)' : 'none',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <input
            type="radio"
            name={`q${currentIndex}`}
            checked={selected === idx}
            onChange={() => onSelect(idx)}
            style={{ display: 'none' }}
          />
          {option}
        </div>
      ))}

      <div style={{ marginTop: "30px", display: 'flex', gap: '15px' }}>
        <button onClick={onPrev} disabled={currentIndex === 0}>
          Previous
        </button>
        {currentIndex < total - 1 ? (
          <button onClick={onNext}>Next</button>
        ) : (
          <button onClick={onSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
}

export default QuestionScreen;
