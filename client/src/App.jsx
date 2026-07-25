import {useState, useEffect} from 'react';
import './App.css';

function App(){
  const[health, setHealth] = useState(null);
  const[error,setError] = useState(null);


useEffect(()=>{
  fetch('http://localhost:5000/api/health')
  .then((res)=>res.json())
  .then((data)=>setHealth(data))
  .catch((err)=>setError(err.message));
},[]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Ben 5</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {health ? (
        <pre>{JSON.stringify(health, null, 2)}</pre>
      ) : (
        !error && <p>Loading...</p>
      )}
    </div>
  );
}
export default App;