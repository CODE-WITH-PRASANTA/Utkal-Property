import React from 'react';
import { FiPhone } from 'react-icons/fi';
import './AboutFindDreamHome.css';

// Replace with your actual cutout image path
import sellerImage from '../../assets/bg.1.webp'; 

export function AboutFindDreamHome() {
  return (
    <section className="AboutFindDreamHome-wrapper">
      <div className="AboutFindDreamHome-container">
        
        {/* Left Side: Text & Call to Action */}
        <div className="AboutFindDreamHome-content">
          <h1 className="AboutFindDreamHome-title">
            Find for your dream home and increase your investment opportunities
          </h1>
          <p className="AboutFindDreamHome-subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed tristique metus proin id lorem odio
          </p>
          <button className="AboutFindDreamHome-button">
            <FiPhone className="AboutFindDreamHome-button-icon" />
            <span>Contact Seller</span>
          </button>
        </div>

        {/* Right Side: Image & Geometric Pattern */}
        <div className="AboutFindDreamHome-visuals">
          {/* Subtle geometric pattern layer using actual SVG elements */}
          <div className="AboutFindDreamHome-pattern">
            <svg width="100%" height="100%" viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="isometricGrid" width="60" height="104" patternUnits="userSpaceOnUse">
                  <path d="M30 0l30 17.32v34.64L30 69.28 0 51.96V17.32L30 0zm0 34.64l30-17.32M30 34.64v34.64M30 34.64L0 17.32" stroke="#fca311" strokeWidth="1.5" fill="none" fillRule="evenodd" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#isometricGrid)" />
            </svg>
          </div>
          
          {/* Main Cutout Image */}
          <img 
            src={sellerImage} 
            alt="Real Estate Agent with Laptop" 
            className="AboutFindDreamHome-image" 
          />
        </div>

      </div>
    </section>
  );
}

export default AboutFindDreamHome;