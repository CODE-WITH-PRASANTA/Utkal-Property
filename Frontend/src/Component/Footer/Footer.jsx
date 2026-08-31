import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

// Import assets from src/assets/
import logo from '../../assets/logo.webp';
import footerImage from '../../assets/footerImage.avif';

// Importing icons from react-icons
import {
  FaPhoneAlt,
  FaChevronRight,
  FaArrowRight,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from 'react-icons/fa';
import { FaHouseUser, FaBuildingCircleCheck } from 'react-icons/fa6';
import { FiPhoneCall, FiMail } from 'react-icons/fi';
import { BiHomeAlt2 } from 'react-icons/bi';

const Footer = () => {
  return (
    <footer className="footer-container" aria-label="Site Footer">
      {/* Brand Header Row */}
      <div className="footer-brand-row">
        <div className="footer-brand-mark">
          <div className="footer-brand-logo">
            <img 
              src={logo} 
              alt="Utkal Property Logo" 
              className="footer-logo-img" 
              width="170"
              height="70"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="footer-brand-text">
            <h2>
              UTKAL<span>PROPERTY</span>
            </h2>
            <p>A Unit of Legwork Services Pvt Ltd</p>
          </div>
        </div>

        <div className="footer-social-row" aria-label="Social Media Links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Visit Facebook">
            <FaFacebookF size={14} aria-hidden="true" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Visit Twitter">
            <FaTwitter size={14} aria-hidden="true" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Visit Instagram">
            <FaInstagram size={14} aria-hidden="true" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Visit LinkedIn">
            <FaLinkedinIn size={14} aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Top Banner Cards */}
      <div className="footer-top-cards">
        {/* Card 1 */}
        <div className="footer-card">
          <div className="footer-card-content">
            <div className="footer-card-icon-box card-icon-orange" aria-hidden="true">
              <FaHouseUser className="card-large-icon" />
            </div>
            <div className="footer-card-text">
              <h3 className="footer-card-title">You need a house</h3>
              <p className="footer-card-desc">
                Tell us your needs, we will give you thousands of suggestions for the dream home.
              </p>
            </div>
          </div>
          <div className="footer-card-btn-wrapper">
            <Link to="/contact" className="footer-card-btn" aria-label="Contact Seller for buying a house">
              <FaPhoneAlt className="btn-react-icon" aria-hidden="true" />
              Contact Seller
            </Link>
          </div>
        </div>

        {/* Card 2 */}
        <div className="footer-card">
          <div className="footer-card-content">
            <div className="footer-card-icon-box card-icon-yellow" aria-hidden="true">
              <FaBuildingCircleCheck className="card-large-icon" />
            </div>
            <div className="footer-card-text">
              <h3 className="footer-card-title">Sell your house</h3>
              <p className="footer-card-desc">
                We will connect you to thousands of people who need to buy a home.
              </p>
            </div>
          </div>
          <div className="footer-card-btn-wrapper">
            <Link to="/sell-property" className="footer-card-btn" aria-label="Sell your property with Utkal Property">
              <BiHomeAlt2 className="btn-react-icon" aria-hidden="true" />
              Sell Property
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info Grid */}
      <div className="footer-main-content">
        {/* Column 1: Office Address */}
        <div className="footer-column footer-office-address">
          <h4 className="footer-column-title">Office Address</h4>

          <div className="address-group">
            <span className="address-label">Head office:</span>
            <p className="address-text bold-address">
              Plot No-55, Ln 2, Jagannath Vihar, Baramunda,<br />
              Bhubaneswar, Odisha 751003
            </p>
          </div>

          <div className="address-group">
            <span className="address-label">Branch:</span>
            <p className="address-text">
              Patia Square, Near KIIT Road,<br />
              Bhubaneswar, Odisha 751024
            </p>
          </div>
        </div>

        {/* Column 2: Contact Seller */}
        <div className="footer-column footer-contact-seller">
          <h4 className="footer-column-title">Contact Seller</h4>

          {/* Agent Item */}
          <div className="contact-agent-row">
            <div className="agent-avatar-wrapper">
              <img
                src={footerImage}
                alt="Darrell Steward - Utkal Property Consultant"
                className="agent-avatar"
                width="46"
                height="58"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="agent-info">
              <span className="agent-name">Darrell Steward</span>
              <a href="tel:+919861566735" className="agent-phone" aria-label="Call Darrell Steward">+91 98615 66735</a>
            </div>
            <Link to="/contact" className="agent-action-btn" aria-label="Contact Darrell Steward">
              <FaChevronRight size={12} aria-hidden="true" />
            </Link>
          </div>

          {/* Hotline */}
          <div className="contact-detail-row">
            <div className="contact-icon-wrapper" aria-hidden="true">
              <FiPhoneCall size={20} />
            </div>
            <div className="contact-detail-text">
              <span className="detail-label">Hotline:</span>
              <a href="tel:+919861566735" className="detail-value bold-value" aria-label="Call Hotline">+91 98615 66735</a>
            </div>
          </div>

          {/* Email */}
          <div className="contact-detail-row">
            <div className="contact-icon-wrapper" aria-hidden="true">
              <FiMail size={20} />
            </div>
            <div className="contact-detail-text">
              <span className="detail-label">Email:</span>
              <a href="mailto:support@utkalproperty.com" className="detail-value" aria-label="Email Utkal Property Support">
                support@utkalproperty.com
              </a>
            </div>
          </div>
        </div>

        {/* Column 3: Our Company */}
        <div className="footer-column footer-our-company">
          <h4 className="footer-column-title">Our Company</h4>
          <ul className="company-links-list">
            <li><Link to="/properties"><FaChevronRight className="bullet-icon" aria-hidden="true" /> Property For Sale</Link></li>
            <li><Link to="/about"><FaChevronRight className="bullet-icon" aria-hidden="true" /> About Us</Link></li>
            <li><Link to="/our-team"><FaChevronRight className="bullet-icon" aria-hidden="true" /> Our Agents</Link></li>
            <li><Link to="/faq"><FaChevronRight className="bullet-icon" aria-hidden="true" /> FAQ</Link></li>
            <li><Link to="/contact"><FaChevronRight className="bullet-icon" aria-hidden="true" /> Contact Us</Link></li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="footer-column footer-newsletter">
          <h4 className="footer-column-title">Newsletter</h4>
          <p className="newsletter-subtitle">Sign up to receive the latest property articles</p>

          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()} aria-label="Newsletter Subscription Form">
            <input
              type="email"
              placeholder="Your email address"
              className="newsletter-input"
              aria-label="Email address for newsletter"
              required
            />
            <button type="submit" className="newsletter-submit-btn" aria-label="Subscribe to newsletter">
              Sign Up <FaArrowRight className="btn-arrow" aria-hidden="true" />
            </button>
          </form>

          <div className="newsletter-terms">
            <input type="checkbox" id="terms-checkbox" className="terms-checkbox" required />
            <label htmlFor="terms-checkbox" className="terms-label">
              I have read and agree to the terms &amp; conditions
            </label>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <p>© {new Date().getFullYear()} Utkal Property. All rights reserved.</p>
        <div className="footer-bottom-links">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <span className="footer-bottom-dot" aria-hidden="true">•</span>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;