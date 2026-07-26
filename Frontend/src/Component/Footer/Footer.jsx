import React from 'react';
import './Footer.css';

// Importing icons from react-icons
import { FaPhoneAlt, FaChevronRight, FaArrowRight, FaChevronUp } from 'react-icons/fa';
import { FaHouseUser, FaBuildingCircleCheck } from 'react-icons/fa6';
import { FiPhoneCall, FiMail } from 'react-icons/fi';
import { BiHomeAlt2 } from 'react-icons/bi';

const Footer = () => {
  return (
    <footer className="footer-container">
      {/* Top Banner Cards */}
      <div className="footer-top-cards">
        {/* Card 1 */}
        <div className="footer-card">
          <div className="footer-card-content">
            <div className="footer-card-icon-box card-icon-orange">
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
            <button className="footer-card-btn">
              <FaPhoneAlt className="btn-react-icon" />
              Contact Seller
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="footer-card">
          <div className="footer-card-content">
            <div className="footer-card-icon-box card-icon-yellow">
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
            <button className="footer-card-btn">
              <BiHomeAlt2 className="btn-react-icon" />
              Sell Property
            </button>
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
              2118 Thornridge Cir. Syracuse,<br />
              Connecticut 35624
            </p>
          </div>

          <div className="address-group">
            <span className="address-label">Branch:</span>
            <p className="address-text">
              3891 Ranchview Dr. Richardson,<br />
              California 62639
            </p>
          </div>

          <div className="address-group">
            <p className="address-text">
              3517 W. Gray St. Utica, Pennsylvania<br />
              57867
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
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" 
                alt="Darrell Steward" 
                className="agent-avatar"
              />
            </div>
            <div className="agent-info">
              <span className="agent-name">Darrell Steward</span>
              <span className="agent-phone">(405) 555-0128</span>
            </div>
            <button className="agent-action-btn" aria-label="Contact Agent">
              <FaChevronRight size={12} />
            </button>
          </div>

          {/* Hotline */}
          <div className="contact-detail-row">
            <div className="contact-icon-wrapper">
              <FiPhoneCall size={20} />
            </div>
            <div className="contact-detail-text">
              <span className="detail-label">Hotline:</span>
              <span className="detail-value bold-value">(201) 555-0124</span>
            </div>
          </div>

          {/* Email */}
          <div className="contact-detail-row">
            <div className="contact-icon-wrapper">
              <FiMail size={20} />
            </div>
            <div className="contact-detail-text">
              <span className="detail-label">Email:</span>
              <span className="detail-value">Realestatecp@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Column 3: Our Company */}
        <div className="footer-column footer-our-company">
          <h4 className="footer-column-title">Our Company</h4>
          <ul className="company-links-list">
            <li><FaChevronRight className="bullet-icon" /> Property For Sale</li>
            <li><FaChevronRight className="bullet-icon" /> About Us</li>
            <li><FaChevronRight className="bullet-icon" /> Our Agents</li>
            <li><FaChevronRight className="bullet-icon" /> FAQ</li>
            <li><FaChevronRight className="bullet-icon" /> Pricing</li>
            <li><FaChevronRight className="bullet-icon" /> Contact Us</li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="footer-column footer-newsletter">
          <h4 className="footer-column-title">Newsletter</h4>
          <p className="newsletter-subtitle">Sign up to receive the latest articles</p>

          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="newsletter-input" 
              required
            />
            <button type="submit" className="newsletter-submit-btn">
              Sign Up <FaArrowRight className="btn-arrow" />
            </button>
          </form>

          <div className="newsletter-terms">
            <input type="checkbox" id="terms-checkbox" className="terms-checkbox" />
            <label htmlFor="terms-checkbox" className="terms-label">
              I have read and agree to the terms &amp; conditions
            </label>
          </div>
        </div>
      </div>

      {/* Floating Scroll-to-Top Button */}
      <button 
        className="scroll-to-top-btn" 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        <FaChevronUp size={16} />
      </button>
    </footer>
  );
};

export default Footer;