import React from 'react';
import { FaPlay } from 'react-icons/fa';
import './AboutBetterLives.css';

import aboutVideoImg from '../../assets/about-video.webp';
import about1Img from '../../assets/about-2.webp';
import about2Img from '../../assets/about-1.webp';
import aboutSignatureImg from '../../assets/about-signature.webp';

export function AboutBetterLives() {
  return (
    <section className="about-modern-section">
      <div className="about-modern-container">
        
        {/* Left Column: Text & Content */}
        <div className="about-modern-content">
          <h1 className="about-modern-title">
            Better lives with<br />
            better homes
          </h1>

          <p className="about-modern-bold-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas vitae auctor in gravida tellus vestibulum faucibus in ut. Dolor bibendum suspendisse vestibulum ullamcorper morbi morbi vulputate.
          </p>

          <p className="about-modern-sub-text">
            Donec bibendum nibh quis nisi luctus, at aliquet ipsum bibendum. Fusce at dui tincidunt nulla semper venenatis at et magna. Mauris turpis lorem, ultricies vel justo sed, ultrices auctor nisi.
          </p>

          <div className="about-modern-quote-wrapper">
            <span className="about-modern-quote-bar"></span>
            <p className="about-modern-quote-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse auctor, mi euismod dignissim scelerisque, eros augue vehicula lectus, quis vestibulum enim augue ut est
            </p>
          </div>

          <div className="about-modern-author-block">
            <h4 className="about-modern-author-name">Ralph Edwards</h4>
            <span className="about-modern-author-title">CEO & Co-Founder</span>
            <div className="about-modern-signature-box">
              <img 
                src={aboutSignatureImg} 
                alt="Ralph Edwards Signature" 
                className="about-modern-signature-img" 
              />
            </div>
          </div>
        </div>

        {/* Right Column: Visual & Stats Grid */}
        <div className="about-modern-visual-col">
          <div className="about-modern-image-frame">
            <img 
              src={aboutVideoImg} 
              alt="Aerial View" 
              className="about-modern-main-image" 
            />
            <button className="about-modern-play-btn" aria-label="Play Video">
              <FaPlay className="about-modern-play-icon" />
            </button>
          </div>

          <div className="about-modern-stats-grid">
            <div className="about-stat-card card-orange">
              <div className="stat-icon-wrapper">
                <img src={about1Img} alt="Sales rate icon" className="stat-card-img" />
              </div>
              <div className="stat-info">
                <span className="stat-value">87%</span>
                <span className="stat-label">Sales Rate</span>
              </div>
            </div>

            <div className="about-stat-card card-cream">
              <div className="stat-icon-wrapper">
                <img src={about2Img} alt="Listing icon" className="stat-card-img" />
              </div>
              <div className="stat-info">
                <span className="stat-value">975K⁺</span>
                <span className="stat-label">Listing</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutBetterLives;