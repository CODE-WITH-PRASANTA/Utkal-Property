import React from 'react';
import { FaPlay, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import './AboutBetterLives.css';

import aboutVideoImg from '../../assets/about-video.webp';
import about1Img from '../../assets/about-2.webp';
import about2Img from '../../assets/about-1.webp';

export function AboutBetterLives() {
  return (
    <section className="about-modern-section">
      <div className="about-modern-container">
        
        {/* Left Column: Text & Professional Real Estate Content */}
        <div className="about-modern-content">
          
          {/* Target SEO Keyword Hierarchy */}
          <h1 className="about-modern-title">
            <span className="about-modern-title-dark">Best Property Consultant</span>{' '}
            <span className="about-modern-title-green">in Bhubaneswar</span>
          </h1>

          <p className="about-modern-bold-text">
            Welcome to <strong>Utkal Property</strong>, your trusted real estate advisory and consultancy partner in Bhubaneswar, Odisha. We specialize in connecting homebuyers, investors, and businesses with verified residential plots, luxury flats, and commercial properties.
          </p>

          <p className="about-modern-sub-text">
            Backed by in-depth market expertise and a client-first approach, our team delivers seamless property transactions, transparent legal verification, and strategic investment guidance tailored to your specific requirements across Odisha.
          </p>

          <div className="about-modern-quote-wrapper">
            <span className="about-modern-quote-bar"></span>
            <p className="about-modern-quote-text">
              “Our mission at Utkal Property is to simplify property buying and selling through complete transparency, authentic verified listings, and end-to-end consultancy.”
            </p>
          </div>

          {/* Business NAP & Contact Card */}
          <div className="about-modern-nap-box">
            <div className="nap-item">
              <FaMapMarkerAlt className="nap-icon" />
              <span>
                <strong>Locate At Us:</strong> Plot No-55, Ln 2, Jagannath Vihar, Baramunda, Bhubaneswar, Odisha 751003
              </span>
            </div>
            <div className="nap-item">
              <FaPhoneAlt className="nap-icon" />
              <span>
                <strong>Call Us:</strong> <a href="tel:+919861566735">+91 9861566735</a>
              </span>
            </div>
          </div>

          {/* Author Block */}
          <div className="about-modern-author-block">
            <h4 className="about-modern-author-name">Utkal Property Leadership</h4>
            <span className="about-modern-author-title">Property Consultant & Advisory Team</span>
          </div>
        </div>

        {/* Right Column: Visual & Verified Stats */}
        <div className="about-modern-visual-col">
          <div className="about-modern-image-frame">
            <img 
              src={aboutVideoImg} 
              alt="Utkal Property Real Estate Projects in Bhubaneswar" 
              className="about-modern-main-image"
              loading="lazy"
              decoding="async"
              width="480"
              height="400"
            />
            <button className="about-modern-play-btn" aria-label="Play Corporate Overview Video">
              <FaPlay className="about-modern-play-icon" />
            </button>
          </div>

          <div className="about-modern-stats-grid">
            <div className="about-stat-card card-green">
              <div className="stat-icon-wrapper">
                <img 
                  src={about1Img} 
                  alt="Client Satisfaction Rate" 
                  className="stat-card-img" 
                  loading="lazy"
                  decoding="async"
                  width="48"
                  height="48"
                />
              </div>
              <div className="stat-info">
                <span className="stat-value">98%</span>
                <span className="stat-label">Client Satisfaction</span>
              </div>
            </div>

            <div className="about-stat-card card-cream">
              <div className="stat-icon-wrapper">
                <img 
                  src={about2Img} 
                  alt="Verified Property Listings" 
                  className="stat-card-img" 
                  loading="lazy"
                  decoding="async"
                  width="48"
                  height="48"
                />
              </div>
              <div className="stat-info">
                <span className="stat-value">100⁺</span>
                <span className="stat-label">Verified Listings</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutBetterLives;