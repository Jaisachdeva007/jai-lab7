import { Link } from 'react-router-dom';

function Header({ darkMode, toggleTheme }) {
  return (
    <nav className="navbar fixed-top">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-brand">Jai Sachdeva</Link>
        <div className="d-flex align-items-center gap-3">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/messages">Messages</Link>    
          <button className="theme-toggle-btn" onClick={toggleTheme}>
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
