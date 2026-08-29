import React from 'react';
import { FiPhoneCall } from 'react-icons/fi';
import './AboutFindDreamHome.css';

// Cutout / Seller image path
import sellerImage from '../../assets/bg.1.webp'; 

export function AboutFindDreamHome() {
  const handleContactClick = () => {
    window.location.href = 'tel:+919861566735';
  };

  return (
    <section className="AboutFindDreamHome-wrapper" aria-labelledby="dream-home-heading">
      <div className="AboutFindDreamHome-container">
        
        {/* Left Side: Text & Call to Action */}
        <div className="AboutFindDreamHome-content">
          <span className="AboutFindDreamHome-badge">Utkal Property Advisory</span>
          
          <h2 id="dream-home-heading" className="AboutFindDreamHome-title">
            <span className="AboutFindDreamHome-title-dark">Find Your Dream Home with the </span>
            <span className="AboutFindDreamHome-title-green">Best Property Consultant in Bhubaneswar</span>
          </h2>
          
          <p className="AboutFindDreamHome-subtitle">
            Whether you want to buy prime residential plots, move into luxury duplexes, or secure high-growth commercial spaces, <strong>Utkal Property</strong> delivers verified titles, transparent paperwork, and maximum investment returns.
          </p>

          <div className="AboutFindDreamHome-action-group">
            <button 
              type="button" 
              className="AboutFindDreamHome-button" 
              onClick={handleContactClick}
              aria-label="Call Utkal Property Consultant at +91 9861566735"
            >
              <FiPhoneCall className="AboutFindDreamHome-button-icon" aria-hidden="true" />
              <span>Contact Expert Consultant</span>
            </button>
            <span className="AboutFindDreamHome-call-direct">
              Direct Helpline: <a href="tel:+919861566735">+91 9861566735</a>
            </span>
          </div>
        </div>

        {/* Right Side: Image & Geometric Pattern */}
        <div className="AboutFindDreamHome-visuals">
          {/* Decorative geometric SVG pattern background */}
          <div className="AboutFindDreamHome-pattern" aria-hidden="true">
            <svg width="100%" height="100%" viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="isometricGrid" width="60" height="104" patternUnits="userSpaceOnUse">
                  <path d="M30 0l30 17.32v34.64L30 69.28 0 51.96V17.32L30 0zm0 34.64l30-17.32M30 34.64v34.64M30 34.64L0 17.32" stroke="#18522e" strokeWidth="1.5" fill="none" fillRule="evenodd" />
                  <path d="M30 0l30 17.32v34.64L30 69.28 0 51.96V17.32L30 0zm0 34.64l30-17.32M30 34.64v34.64M30 34.64L0 17.32" stroke="#10532e" strokeWidth="1.5" fill="none" fillRule="evenodd" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#isometricGrid)" opacity="0.18" />
            </svg>
          </div>
          
          {/* Cutout Image with Targeted Alt SEO Tag */}
          <img 
            src={sellerImage} 
            alt="Best Property Consultant in Bhubaneswar - Utkal Property" 
            className="AboutFindDreamHome-image"
            loading="lazy" 
          />
        </div>

      </div>
    </section>
  );
}

export default AboutFindDreamHome;