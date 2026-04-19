import { useState } from 'react';
import './index.css';

function App() {
  const [formData, setFormData] = useState({
    caption: '',
    hashtags: '',
    category: 'general'
  });
  
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/content/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setResults(data.predictions);
      } else {
        setError(data.error || 'Failed to predict virality.');
      }
    } catch (err) {
      setError('Cannot connect to the backend server. Make sure it is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>ViralPredict AI</h1>
        <p>Predict & Optimize Your Content's Virality Before Publishing</p>
      </header>

      <main className="grid">
        {/* Input Form Section */}
        <section className="card form-section">
          <h2>Content Details</h2>
          <form onSubmit={handlePredict}>
            <div className="form-group">
              <label htmlFor="caption">Draft Caption</label>
              <textarea 
                id="caption"
                name="caption" 
                placeholder="Write your amazing post caption here..." 
                value={formData.caption}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="hashtags">Hashtags (Optional)</label>
              <input 
                id="hashtags"
                type="text" 
                name="hashtags" 
                placeholder="#viral #trending" 
                value={formData.hashtags}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Content Category</label>
              <select 
                id="category"
                name="category" 
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="general">General Lifestyle</option>
                <option value="tech">Technology & Logic</option>
                <option value="comedy">Comedy & Memes</option>
                <option value="education">Education & Tips</option>
                <option value="fashion">Fashion & Beauty</option>
              </select>
            </div>

            <button type="submit" className="btn" disabled={loading}>
              {loading ? <span className="loader"></span> : 'Analyze Virality'}
            </button>
            {error && <p style={{ color: 'var(--color-secondary)', marginTop: '1rem' }}>{error}</p>}
          </form>
        </section>

        {/* Results Section */}
        <section className="card results-section">
          <h2>Analysis Results</h2>
          
          {!results && !loading && (
            <div style={{ color: 'var(--color-text-muted)', textAlign: 'center', marginTop: '2rem' }}>
              <p>Enter your content details and hit analyze to see predictions here.</p>
            </div>
          )}

          {loading && (
            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
               <div className="loader" style={{ width: '40px', height: '40px', borderWidth: '4px' }}></div>
               <p style={{ color: 'var(--color-primary)' }}>Analyzing across ML models...</p>
            </div>
          )}

          {results && !loading && (
            <div className="results-grid">
              
              <div className="result-item">
                 <div className="result-title">Predicted Engagement Score</div>
                 <div className="score-display">
                    <span className="score-number">{results.engagement?.engagementScore?.toFixed(1) || '?'}</span>
                    <span style={{ color: 'var(--color-text-muted)' }}>/ 100</span>
                 </div>
              </div>

              <div className="result-item">
                 <div className="result-title">AI Suggested Captions</div>
                 <ul className="suggestion-list">
                    {results.captions?.map((cap, i) => (
                      <li key={i} className="suggestion-item">
                        {cap}
                      </li>
                    ))}
                 </ul>
              </div>

              <div className="result-item">
                 <div className="result-title">Recommended Trending Hashtags</div>
                 <div>
                    {results.hashtags?.map((tag, i) => (
                      <span key={i} className="hashtag-pill">{tag}</span>
                    ))}
                 </div>
              </div>

              <div className="result-item">
                 <div className="result-title">Optimal Time to Post</div>
                 <div className="time-display">
                    {results.time?.bestPostingTime || 'N/A'} <span style={{fontSize:'1rem'}}>{results.time?.timezone}</span>
                 </div>
              </div>

            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
