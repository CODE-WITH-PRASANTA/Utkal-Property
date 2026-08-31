import React, { useState } from 'react';
import './Navbar.css';

// 1. IMPORT YOUR LOGO HERE (Update the file path & extension as needed)
import logo from '../../assets/Utkal Property Outro (2).png'; 

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Properties', path: '/properties' },
    { title: 'About', path: '/about' },
    { title: 'FAQ', path: '/faq' },
    { title: 'Blog', path: '/blog' },
    { title: 'Our Team', path: '/our-team' },
    { title: 'Contact', path: '/contact' },
  ];

  return (
    <header className="navbar-header">
      <nav className="navbar-container">
        
        {/* Logo Section */}
        <a href="/" className="navbar-brand">
          <img src={logo} alt="Dream Home Logo" className="navbar-logo-img" />
        </a>

        {/* Navigation Links */}
        <ul className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.path} className="navbar-item">
              <a href={link.path} className="navbar-link">
                {link.title}
              </a>
            </li>
          ))}

          {/* Mobile Actions Menu */}
          <div className="navbar-mobile-actions">
            <a href="/sell-property" className="navbar-sell-btn">
              <div className="navbar-sell-btn-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <text x="12" y="16.5" fontSize="9" fontWeight="800" textAnchor="middle" fill="currentColor" stroke="none">$</text>
                </svg>
              </div>
              <span className="navbar-sell-btn-divider"></span>
              <span>Sell & Rent Property</span>
            </a>
          </div>
        </ul>

        {/* Desktop Actions Section */}
        <div className="navbar-desktop-actions">
          <a href="/sell-property" className="navbar-sell-btn">
            <div className="navbar-sell-btn-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <text x="12" y="16.5" fontSize="9" fontWeight="800" textAnchor="middle" fill="currentColor" stroke="none">$</text>
              </svg>
            </div>
            <span className="navbar-sell-btn-divider"></span>
            <span>Sell & Rent Property</span>
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