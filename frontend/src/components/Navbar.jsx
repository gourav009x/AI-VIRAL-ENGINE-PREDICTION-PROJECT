import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="main-nav">
      <span className="nav-logo">ViralPredict</span>
      <Link to="/dashboard" className="nav-link">Dashboard</Link>
      <Link to="/about" className="nav-link">About Us</Link>
      <Link to="/" className="nav-link nav-logout">Logout</Link>
    </nav>
  );
}
