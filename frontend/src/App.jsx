import { useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [yaps, setYaps] = useState(null);
  const [error, setError] = useState('');

  const fetchYaps = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/yaps`, {
        params: { username }
      });
      setYaps(res.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch YAPS score');
      setYaps(null);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '90vh',
        padding: 30,
        fontFamily: 'Arial, sans-serif',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 600,
          padding: 30,
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ textAlign: 'center', color: '#553d67', marginBottom: 20 }}>
          Kaito YAPS Score Checker
        </h2>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <input
            type="text"
            placeholder="Enter Twitter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              width: '250px',
              marginRight: '10px',
              fontSize: '16px',
            }}
          />
          <button
            onClick={fetchYaps}
            style={{
              padding: '10px 20px',
              backgroundColor: '#553d67',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Check
          </button>
        </div>

        {error && (
          <p style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>{error}</p>
        )}

        {yaps && (
          <div
            style={{
              marginTop: 30,
              padding: 20,
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              maxWidth: '100%',
              color: '#003f5c',
            }}
          >
            <h3 style={{ color: '#553d67' }}>YAPS Score for @{yaps.username}</h3>
            <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.6' }}>
              <li>
                <strong>user_id:</strong>{' '}
                <span>{yaps.user_id}</span>
              </li>
              <li>
                <strong>Total (All Time):</strong>{' '}
                <span>{yaps.yaps_all.toFixed(4)}</span>
              </li>
              <li>
                <strong>Last 24h:</strong>{' '}
                <span>{yaps.yaps_l24h.toFixed(4)}</span>
              </li>
              <li>
                <strong>Last 30d:</strong>{' '}
                <span>{yaps.yaps_l30d.toFixed(4)}</span>
              </li>
              <li>
                <strong>Last 12m:</strong>{' '}
                <span>{yaps.yaps_l12m.toFixed(4)}</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>

  );
}

export default App;
