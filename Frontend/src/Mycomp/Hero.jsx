import { useNavigate } from 'react-router-dom';
import './Hero.css';

export default function Hero() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  return (
    <div className="hero-page">
      {/* Hero Content Section */}
      <header className="hero-content">
        <div className="hero-badge">Smart Financial Tracking</div>
        <h1 className="hero-title">Take Control of Your Money, Effortlessly.</h1>
        <p className="hero-subtitle">
          Track expenses, analyze spending habits, and secure your financial future with 
          our fast, private, and intuitive dashboard.
        </p>
        <div className="hero-cta-group">
          <button 
            className="hero-main-btn" 
            onClick={() => navigate(token ? '/expense' : '/signup')}
          >
            {token ? 'Open Dashboard' : 'Start Tracking Free'}
          </button>
        </div>

        {/* Feature Highlights Grid */}
        <div className="hero-features">
          <div className="feature-card">
            <h3>🔒 Secure Isolation</h3>
            <p>Your financial data is encrypted and securely linked exclusively to your account.</p>
          </div>
          <div className="feature-card">
            <h3>📊 Real-time Insights</h3>
            <p>Instantly monitor where your money goes with clean visual breakdowns.</p>
          </div>
          <div className="feature-card">
            <h3>⚡ Lightning Fast</h3>
            <p>Built on a high-performance MERN stack for seamless responsiveness.</p>
          </div>
        </div>
      </header>
    </div>
  );
}