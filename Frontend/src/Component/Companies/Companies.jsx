import React from 'react';
import './Companies.css';

const Companies = () => {
  return (
    <section className="companies-section" aria-label="Trusted Companies and Real Estate Partners of Utkal Property">
      <div className="companies-container">
        
        {/* Header Title optimized for SEO & Best Property Consultant Branding */}
        <div className="companies-header">
          <h2 className="companies-title">Trusted by over 150+ major companies</h2>
          <p className="companies-subtitle">
            Partnering with top developers and builders to bring you the best property consultant services in Bhubaneswar, Odisha.
          </p>
        </div>

        {/* Logo Cards Grid */}
        <div className="companies-grid">
          
          {/* Logo Card 1 */}
          <div className="company-card">
            <div className="company-logo-wrap">
              <svg className="company-logo-svg" viewBox="0 0 160 50" fill="currentColor">
                <path d="M20 15 L30 5 L40 15 L35 15 L35 25 L25 25 L25 15 Z M10 28 L50 28 L50 32 L10 32 Z M15 35 L45 35 L45 45 L15 45 Z" opacity="0.7"/>
                <text x="10" y="48" fontSize="11" fontWeight="700" fontFamily="Inter, sans-serif">Real Estate</text>
              </svg>
            </div>
            <span className="company-name">Real Estate Partners</span>
          </div>

          {/* Logo Card 2 */}
          <div className="company-card">
            <div className="company-logo-wrap">
              <svg className="company-logo-svg" viewBox="0 0 160 50" fill="currentColor">
                <path d="M15 10 L25 35 L35 15 L45 35 L55 10" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                <text x="15" y="46" fontSize="10" fontWeight="600" letterSpacing="2">COMPANY</text>
              </svg>
            </div>
            <span className="company-name">Vanguard Developers</span>
          </div>

          {/* Logo Card 3 */}
          <div className="company-card">
            <div className="company-logo-wrap">
              <svg className="company-logo-svg" viewBox="0 0 160 50" fill="currentColor">
                <rect x="10" y="15" width="8" height="25" rx="2"/>
                <text x="24" y="32" fontSize="16" fontWeight="800">Bauhouse</text>
                <text x="25" y="42" fontSize="8" fontWeight="600" letterSpacing="1.5">REAL ESTATE</text>
              </svg>
            </div>
            <span className="company-name">Bauhouse Group</span>
          </div>

          {/* Logo Card 4 */}
          <div className="company-card">
            <div className="company-logo-wrap">
              <svg className="company-logo-svg" viewBox="0 0 160 50" fill="currentColor">
                <circle cx="20" cy="15" r="3"/><circle cx="20" cy="25" r="3"/><circle cx="20" cy="35" r="3"/>
                <circle cx="30" cy="20" r="3"/><circle cx="30" cy="30" r="3"/>
                <text x="42" y="32" fontSize="16" fontWeight="700">Accusaf</text>
              </svg>
            </div>
            <span className="company-name">Accusaf Infra</span>
          </div>

          {/* Logo Card 5 */}
          <div className="company-card">
            <div className="company-logo-wrap">
              <svg className="company-logo-svg" viewBox="0 0 160 50" fill="currentColor">
                <polygon points="15,30 25,15 35,30" opacity="0.6"/>
                <polygon points="25,30 35,15 45,30"/>
                <text x="52" y="30" fontSize="11" fontWeight="700">COMPANY</text>
              </svg>
            </div>
            <span className="company-name">Prime Habitats</span>
          </div>

          {/* Logo Card 6 */}
          <div className="company-card">
            <div className="company-logo-wrap">
              <svg className="company-logo-svg" viewBox="0 0 160 50" fill="currentColor">
                <polyline points="15,35 25,25 35,30 45,15" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                <text x="15" y="46" fontSize="9" fontWeight="700" letterSpacing="1">BUSINESS NAME</text>
              </svg>
            </div>
            <span className="company-name">Ascent Builders</span>
          </div>

        </div>

      </div>

      {/* Skyline Background Graphic Element */}
      <div className="companies-skyline-bg" aria-hidden="true"></div>
    </section>
  );
};

export default Companies;