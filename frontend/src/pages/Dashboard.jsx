import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../index.css';

function Dashboard() {
  const [formData, setFormData] = useState({
    caption: '',
    hashtags: '',
    category: 'general',
    tone: 'professional'
  });
  
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  // SaaS Model Simulation
  const [predictionsUsed, setPredictionsUsed] = useState(8);
  const MAX_FREE = 10;
  const isPro = false; // Mock pro status

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    if (!isPro && predictionsUsed >= MAX_FREE) {
        setError('Daily limit reached! Upgrade to Pro for unlimited predictions.');
        return;
    }

    setLoading(true);
    setError(null);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/content/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setResults(data.predictions);
        if (!isPro) setPredictionsUsed(prev => prev + 1);
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
      <Navbar />
      <header className="header">
        <div className="saas-banner">
            <span className="plan-badge">{isPro ? 'PRO PLAN' : 'FREE PLAN'}</span>
            {!isPro && (
                <span className="usage-stats">
                    {predictionsUsed}/{MAX_FREE} Predictions Used Today
                    {predictionsUsed >= MAX_FREE && <button className="upgrade-btn">Upgrade 🚀</button>}
                </span>
            )}
        </div>
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

            <div className="form-row">
                <div className="form-group half">
                  <label htmlFor="category">Category</label>
                  <select id="category" name="category" value={formData.category} onChange={handleInputChange}>
                    <option value="general">General Lifestyle</option>
                    <option value="tech">Technology & Logic</option>
                    <option value="comedy">Comedy & Memes</option>
                    <option value="education">Education & Tips</option>
                    <option value="fashion">Fashion & Beauty</option>
                  </select>
                </div>
                <div className="form-group half">
                  <label htmlFor="tone">AI Tone (🧠)</label>
                  <select id="tone" name="tone" value={formData.tone} onChange={handleInputChange}>
                    <option value="professional">Professional / Crisp</option>
                    <option value="funny">Funny / GenZ / Memes</option>
                    <option value="emotional">Emotional / Storytelling</option>
                  </select>
                </div>
            </div>

            <button type="submit" className="btn" disabled={loading || (!isPro && predictionsUsed >= MAX_FREE)}>
              {loading ? <span className="loader"></span> : 'Analyze Virality'}
            </button>
            {error && <p style={{ color: 'var(--color-secondary)', marginTop: '1rem', fontWeight:'bold' }}>{error}</p>}
          </form>
        </section>

        {/* Results Section */}
        <section className="card results-section line-clamp">
          <h2>Analysis Results</h2>
          
          {!results && !loading && (
            <div style={{ color: 'var(--color-text-muted)', textAlign: 'center', marginTop: '2rem' }}>
              <p>Enter your content details and hit analyze to see AI predictions.</p>
            </div>
          )}

          {loading && (
            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
               <div className="loader" style={{ width: '40px', height: '40px', borderWidth: '4px' }}></div>
               <p style={{ color: 'var(--color-primary)', marginTop: '1rem' }}>Running Deep Learning Models & A/B Tests...</p>
            </div>
          )}

          {results && !loading && (
            <div className="results-grid">
              
              <div className="result-item spotlight">
                 <div className="result-title">Predicted Engagement Score</div>
                 <div className="score-display">
                    <span className="score-number">{results.engagement?.engagementScore?.toFixed(1) || '?'}</span>
                    <span style={{ color: 'var(--color-text-muted)' }}>/ 100</span>
                 </div>
                 {/* Growth Chart Mock */}
                 <div className="growth-chart">
                    <div className="chart-bars">
                        {results.engagement?.history?.map((h, i) => (
                            <div key={i} className="chart-bar-container" title={h.day + ': ' + h.score.toFixed(1)}>
                                <div className="chart-bar" style={{ height: `${h.score}%` }}></div>
                            </div>
                        ))}
                    </div>
                    <div className="chart-label">Growth Prediction 📊</div>
                 </div>
              </div>

              <div className="result-item">
                 <div className="result-title">AI Suggested Captions ({formData.tone})</div>
                 <ul className="suggestion-list">
                    {results.captions?.map((cap, i) => (
                      <li key={i} className="suggestion-item">
                        {cap}
                      </li>
                    ))}
                 </ul>
              </div>

              <div className="result-item feature-ab">
                 <div className="result-title">A/B Testing Variants</div>
                 <div className="ab-grid">
                    {results.abTesting?.map((variant, i) => (
                        <div key={i} className="ab-card">
                            <span className="ab-badge">Variant {variant.variant}</span>
                            <div className="ab-hook">{variant.hook}</div>
                            <div className="ab-example">"{variant.example}"</div>
                        </div>
                    ))}
                 </div>
              </div>

              <div className="result-item feature-comp">
                 <div className="result-title">Competitor Analysis</div>
                 <div className="comp-stats">
                    <div><span className="stat-value">{results.competitor?.topCompetitorAvgEngagement || 0}</span> <br/>Avg Competitor Score</div>
                    <div><span className="stat-label">Market:</span> <span style={{color: 'var(--color-success)'}}>{results.competitor?.marketSaturation}</span></div>
                    <div>
                        <span className="stat-label">Keywords:</span>
                        <div className="keyword-tags">
                            {results.competitor?.competitorKeywords?.map((kw, i) => (
                                <span key={i} className="kw-tag">{kw}</span>
                            ))}
                        </div>
                    </div>
                 </div>
              </div>

              <div className="result-row split">
                  <div className="result-item half">
                     <div className="result-title">Recommended Hashtags</div>
                     <div>
                        {results.hashtags?.map((tag, i) => (
                          <span key={i} className="hashtag-pill">{tag}</span>
                        ))}
                     </div>
                  </div>

                  <div className="result-item half">
                     <div className="result-title">Best Time to Post</div>
                     <div className="time-display">
                        {results.time?.bestPostingTime || 'N/A'} <span style={{fontSize:'1rem'}}>{results.time?.timezone}</span>
                     </div>
                  </div>
              </div>

            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
