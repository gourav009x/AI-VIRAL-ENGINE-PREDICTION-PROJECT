import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate();
  
  const handleSignUp = (e) => {
    e.preventDefault();
    // Dummy sign up logic
    navigate('/dashboard');
  };

  return (
    <div className="app-container" style={{maxWidth: '500px', marginTop: '10vh'}}>
      <header className="header" style={{marginBottom: '1.5rem'}}>
        <h1 style={{fontSize: '2.5rem'}}>Join ViralPredict AI</h1>
        <p>Create your new account</p>
      </header>
      
      <section className="card">
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" placeholder="Steve Jobs" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="steve@apple.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="••••••••" required />
          </div>
          <button type="submit" className="btn" style={{marginTop: '1rem'}}>Create Account</button>
        </form>
        
        <p style={{textAlign: 'center', marginTop: '1.5rem', color: 'var(--color-text-muted)'}}>
          Already have an account? <Link to="/" style={{color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 'bold'}}>Log in</Link>
        </p>
      </section>
    </div>
  );
}
