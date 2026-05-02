import Navbar from '../components/Navbar';

export default function About() {
  const handleContact = (e) => {
    e.preventDefault();
    alert("Thanks for contacting us! Our team will reach out soon.");
  };

  return (
    <div className="app-container">
      <Navbar />
      <header className="header" style={{textAlign: 'left'}}>
        <h1>About Us</h1>
        <p>The smartest AI Content Engine for creators and startups.</p>
      </header>

      <main className="grid">
        <section className="card">
          <h2>Our Mission</h2>
          <p style={{color: 'var(--color-text-muted)', lineHeight: '1.8'}}>
            We believe that every creator deserves to go viral. With ViralPredict AI, we decode algorithmic trends,
            competitor data, and aesthetic engagement metrics before you even click post. Built on state-of-the-art predictive
            deep learning models, our SaaS helps you maximize reach and build your community 10x faster.
          </p>
        </section>

        <section className="card">
          <h2>Contact Us</h2>
          <form onSubmit={handleContact}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Your Name" required/>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea placeholder="How can we help you?" required></textarea>
            </div>
            <button type="submit" className="btn">Send Message</button>
          </form>
        </section>
      </main>
    </div>
  );
}
