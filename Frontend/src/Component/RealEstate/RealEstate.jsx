import React from 'react';
import './RealEstate.css';
import agentImage from '../../assets/mark-contact3.png'; // Ensure your image file is in the same directory

const RealEstate = () => {
  return (
    <section className="real-estate-container" aria-label="Utkal Property - Best Property Consultant in Bhubaneswar">
      <div className="real-estate-content-wrapper">
        
        {/* Left Information Section - SEO Optimized */}
        <div className="real-estate-info-side">
          <header>
            <h1 className="real-estate-title">
              Utkal Property <span className="real-estate-highlight">(Best Property Consultant in Bhubaneswar)</span>
            </h1>
            <p className="real-estate-subtitle">
              Buying your first home can be fun and exciting but requires lots of research and visits to various brokers to find a perfect home for you and your family. We offer trusted property options on our site that can fit your budget.
            </p>
          </header>

          <div className="real-estate-contact-list">
            
            {/* Office Address */}
            <div className="real-estate-contact-item">
              <div className="real-estate-icon-box">
                {/* Location Icon SVG */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div className="real-estate-details">
                <span className="real-estate-label">Address</span>
                <span className="real-estate-value">Plot No-55, Ln 2, Jagannath Vihar, Baramunda, Bhubaneswar, Odisha 751003</span>
              </div>
            </div>

            {/* Request a call back / Phone */}
            <div className="real-estate-contact-item">
              <div className="real-estate-icon-box">
                {/* Phone Call Icon SVG */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div className="real-estate-details">
                <span className="real-estate-label">Phone</span>
                <a href="tel:09861566735" className="real-estate-phone">098615 66735</a>
              </div>
            </div>

            {/* Email us */}
            <div className="real-estate-contact-item">
              <div className="real-estate-icon-box">
                {/* Email Envelope Icon SVG */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div className="real-estate-details">
                <span className="real-estate-label">Email us</span>
                <a href="mailto:hellosupport@gmail.com" className="real-estate-email">hellosupport@gmail.com</a>
              </div>
            </div>

          </div>
        </div>

        {/* Right Image Section */}
        <div className="real-estate-image-side">
          <div className="real-estate-image-wrapper">
            <img 
              src={agentImage} 
              alt="Utkal Property - Best Property Consultant in Bhubaneswar" 
              className="real-estate-agent-img"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default RealEstate;