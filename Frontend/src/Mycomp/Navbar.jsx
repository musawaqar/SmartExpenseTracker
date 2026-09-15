import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="AppName">Expense Tracker</Link>
        <Link to="/" className="nav-link">Home</Link>
        {token && <Link to="/Expense" className="nav-link">Expense</Link>}
      </div>

      <div className="nav-right">
        {token ? (
          <div className="user-nav-group">
            <span className="user-welcome">Hello, {user.username || 'User'}</span>
            <button onClick={handleLogout} className="nav-link logout-btn">Log Out</button>
          </div>
        ) : (
          <Link to="/login" className="nav-link login-pill">Login</Link>
        )}
      </div>
    </nav>
  );
}