import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo" onClick={() => navigate('/')}>
          <span className="logo-icon">🎬</span>
          <h1>MovieMagic</h1>
        </div>
        
        <nav className="nav-menu">
          <button className="nav-btn" onClick={() => navigate('/')}>
            <i className="fas fa-home"></i> Home
          </button>
          <button className="nav-btn" onClick={() => navigate('/movies')}>
            <i className="fas fa-film"></i> Movies
          </button>
          <button className="nav-btn" onClick={() => navigate('/bookings')}>
            <i className="fas fa-ticket-alt"></i> My Bookings
          </button>
          <button className="nav-btn" onClick={() => navigate('/admin/upload')}>
  <i className="fas fa-cloud-upload-alt"></i> Upload
</button>
        </nav>

        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search movies..." 
            className="search-input"
          />
          <button className="search-btn">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;