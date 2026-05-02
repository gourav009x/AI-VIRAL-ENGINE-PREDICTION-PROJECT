import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Dummy login logic
    navigate('/dashboard');
  };

  return (
    <div className="app-container" style={{maxWidth: '500px', marginTop: '10vh'}}>
      <header className="header" style={{marginBottom: '1.5rem'}}>
        <h1 style={{fontSize: '2.5rem'}}>ViralPredict AI</h1>
        <p>Login to your account</p>
      </header>
      
      <section className="card">
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="you@startup.com" 
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••" 
              required
            />
          </div>
          <button type="submit" className="btn" style={{marginTop: '1rem'}}>Sign In</button>
        </form>
        
        <p style={{textAlign: 'center', marginTop: '1.5rem', color: 'var(--color-text-muted)'}}>
          Don't have an account? <Link to="/signup" style={{color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 'bold'}}>Sign up here</Link>
        </p>
      </section>
    </div>
  );
}
