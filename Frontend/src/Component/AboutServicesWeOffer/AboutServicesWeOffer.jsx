import React from 'react';
import { FiKey, FiBriefcase, FiTrendingUp } from 'react-icons/fi';
import './AboutServicesWeOffer.css';

export function AboutServicesWeOffer() {
  const services = [
    {
      id: 1,
      icon: <FiKey className="ServicesWeOffer-icon mgmt-portal-anim" />,
      tag: 'MANAGEMENT',
      title: 'Property Management',
      description:
        'Seamless operations, asset protection, and tenant management tailored to maximize your real estate potential.',
    },
    {
      id: 2,
      icon: <FiBriefcase className="ServicesWeOffer-icon adv-flip-teleport" />,
      tag: 'ADVISORY',
      title: 'Consulting Service',
      description:
        'Strategic market insights and valuation analysis to empower confident, high-yield investment decisions.',
    },
    {
      id: 3,
      icon: <FiTrendingUp className="ServicesWeOffer-icon creative-anim-3" />,
      tag: 'TRANSACTIONS',
      title: 'Buy and Sell Real Estate',
      description:
        'End-to-end guidance for residential and commercial transactions with high market efficiency.',
    },
  ];

  return (
    <section className="ServicesWeOffer-section">
      <div className="ServicesWeOffer-container">
        
        <div className="ServicesWeOffer-header">
          <h2 className="ServicesWeOffer-title">
            Services <span className="ServicesWeOffer-title-highlight">We Offer</span>
          </h2>
          <p className="ServicesWeOffer-subtitle">
            Tailored solutions and expert guidance designed to elevate your real estate portfolio.
          </p>
        </div>

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