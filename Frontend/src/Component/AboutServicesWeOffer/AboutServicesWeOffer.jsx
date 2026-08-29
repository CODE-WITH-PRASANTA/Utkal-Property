import React from 'react';
import { FiHome, FiTrendingUp, FiShield } from 'react-icons/fi';
import './AboutServicesWeOffer.css';

export function AboutServicesWeOffer() {
  const services = [
    {
      id: 1,
      icon: <FiHome className="ServicesWeOffer-icon mgmt-portal-anim" />,
      tag: 'RESIDENTIAL',
      title: 'Premium Apartments and Flats Dealer in Bhubaneswar',
      description:
        'Explore verified 2, 3 & 4 BHK luxury duplexes and gated community apartments across prime localities in Bhubaneswar, Odisha.',
    },
    {
      id: 2,
      icon: <FiTrendingUp className="ServicesWeOffer-icon adv-flip-teleport" />,
      tag: 'CONSULTANCY',
      title: 'Best Real Estate Company in Bhubaneswar',
      description:
        'Strategic property valuation, legal advisory, and verified market consulting to help you secure the highest ROI on property investments.',
    },
    {
      id: 3,
      icon: <FiShield className="ServicesWeOffer-icon creative-anim-3" />,
      tag: 'COMMERCIAL & PLOTS',
      title: 'Top Real Estate Company in Bhubaneswar, Odisha',
      description:
        'End-to-end solutions for buying, selling, and leasing high-growth commercial properties and residential plots across Odisha.',
    },
  ];

  return (
    <section className="ServicesWeOffer-section">
      <div className="ServicesWeOffer-container">
        
        {/* Section Header with Targeted SEO Keywords */}
        <div className="ServicesWeOffer-header">
          <span className="ServicesWeOffer-badge">Our Real Estate Services</span>
          
          <h2 className="ServicesWeOffer-title">
            <span className="ServicesWeOffer-title-dark">Top Real Estate Company</span>{' '}
            <span className="ServicesWeOffer-title-green">in Bhubaneswar, Odisha</span>
          </h2>
          
          <p className="ServicesWeOffer-subtitle">
            Recognized as the <strong>best real estate company in Bhubaneswar</strong> and the leading <strong>premium apartments and flats dealer in Bhubaneswar</strong>, Utkal Property provides verified listings, seamless site visits, and trusted legal assistance across Odisha.
          </p>
        </div>

        {/* Services Grid with Integrated Keywords */}
        <div className="ServicesWeOffer-grid">
          {services.map((service) => (
            <div key={service.id} className="ServicesWeOffer-card">
              
              <div className="ServicesWeOffer-card-accent"></div>

              <div className="ServicesWeOffer-card-top">
                <div className="ServicesWeOffer-icon-box">
                  {service.icon}
                </div>
                <span className="ServicesWeOffer-tag">{service.tag}</span>
              </div>

              <div className="ServicesWeOffer-card-body">
                <h3 className="ServicesWeOffer-card-title">{service.title}</h3>
                <p className="ServicesWeOffer-card-description">{service.description}</p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default AboutServicesWeOffer;