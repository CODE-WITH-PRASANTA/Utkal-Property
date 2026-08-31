import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

import logo from '../../assets/Utkal Property Outro (2).webp'; 

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
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
      <nav className="navbar-container" aria-label="Main Navigation">

        {/* Logo Section */}
        <Link to="/" className="navbar-brand" aria-label="Utkal Property Home">
          <img 
            src={logo} 
            alt="Utkal Property Logo - Top Real Estate Agency in Bhubaneswar" 
            className="navbar-logo-img"
            width="170"
            height="70"
            loading="eager"
            decoding="async"
          />
        </Link>

        {/* Navigation Links */}
        <ul className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.path} className="navbar-item">
              <Link 
                to={link.path} 
                className="navbar-link" 
                onClick={closeMobileMenu}
              >
                {link.title}
              </Link>
            </li>
          ))}

          {/* Mobile Actions Menu */}
          <div className="navbar-mobile-actions">
            <Link 
              to="/sell-property" 
              className="navbar-sell-btn"
              onClick={closeMobileMenu}
              aria-label="Sell Property with Utkal Property"
            >
              <div className="navbar-sell-btn-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <text x="12" y="16.5" fontSize="9" fontWeight="800" textAnchor="middle" fill="currentColor" stroke="none">₹</text>
                </svg>
              </div>
              <span className="navbar-sell-btn-divider" aria-hidden="true"></span>
              <span>Sell Property</span>
            </Link>
          </div>
        </ul>

        {/* Desktop Actions Section */}
        <div className="navbar-desktop-actions">
          <Link 
            to="/sell-property" 
            className="navbar-sell-btn"
            aria-label="Sell Property with Utkal Property"
          >
            <div className="navbar-sell-btn-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <text x="12" y="16.5" fontSize="9" fontWeight="800" textAnchor="middle" fill="currentColor" stroke="none">₹</text>
              </svg>
            </div>
            <span className="navbar-sell-btn-divider" aria-hidden="true"></span>
            <span>Sell Property</span>
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          type="button"
          className="navbar-toggle-btn" 
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
        >
          <span className={`navbar-toggle-icon ${isMobileMenuOpen ? 'open' : ''}`} aria-hidden="true"></span>
        </button>

      </nav>
    </header>
  );
};

export default Navbar;