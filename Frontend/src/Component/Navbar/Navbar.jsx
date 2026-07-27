import React, { useState } from 'react';
import './Navbar.css';

// 1. IMPORT YOUR LOGO HERE (Update the file path & extension as needed)
import logo from '../../assets/logoo.png'; 

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="navbar-header">
      <nav className="navbar-container">
        
        {/* Logo Section */}
        <a href="/" className="navbar-brand">
          <img src={logo} alt="Dream Home Logo" className="navbar-logo-img" />
         
        </a>

        {/* Navigation Links */}
        <ul className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <a href="/" className="navbar-link active">
              Home
            </a>
          </li>

          <li className="navbar-item">
            <a href="/property" className="navbar-link">
              Property
            </a>
          </li>

          <li className="navbar-item">
            <a href="/pages" className="navbar-link">
              Page
            </a>
          </li>

          <li className="navbar-item">
            <a href="/blog" className="navbar-link">
              Blog
            </a>
          </li>

          <li className="navbar-item">
            <a href="/contact" className="navbar-link">
              Contact
            </a>
          </li>

          {/* Mobile Actions Menu */}
          <div className="navbar-mobile-actions">
            <a href="/login" className="navbar-auth-link">
              <svg className="navbar-auth-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Register / Login</span>
            </a>
            <a href="/sell-property" className="navbar-sell-btn">
              <div className="navbar-sell-btn-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <text x="12" y="16.5" fontSize="9" fontWeight="800" textAnchor="middle" fill="currentColor" stroke="none">$</text>
                </svg>
              </div>
              <span className="navbar-sell-btn-divider"></span>
              <span>Sell Property</span>
            </a>
          </div>
        </ul>

        {/* Desktop Actions Section */}
        <div className="navbar-desktop-actions">
          <a href="/login" className="navbar-auth-link">
            <svg className="navbar-auth-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>Register / Login</span>
          </a>

          <a href="/sell-property" className="navbar-sell-btn">
            <div className="navbar-sell-btn-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <text x="12" y="16.5" fontSize="9" fontWeight="800" textAnchor="middle" fill="currentColor" stroke="none">$</text>
              </svg>
            </div>
            <span className="navbar-sell-btn-divider"></span>
            <span>Sell Property</span>
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          className="navbar-toggle-btn" 
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
        >
          <span className={`navbar-toggle-icon ${isMobileMenuOpen ? 'open' : ''}`}></span>
        </button>

      </nav>
    </header>
  );
};

export default Navbar;