import React from 'react';
import './HomeMeetagents.css';

// React Icons
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram
} from 'react-icons/fa';

// 3 Agents Data updated with Indian contact formats
const AGENTS_DATA = [
  {
    id: 1,
    name: 'Wade Warren',
    role: 'Senior Property Consultant',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    phone: '+91 98765 43210',
    email: 'wade.warren@utkalproperty.com',
    socials: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com'
    }
  },
  {
    id: 2,
    name: 'Leslie Alexander',
    role: 'Commercial Real Estate Broker',
    image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800',
    phone: '+91 98765 43211',
    email: 'leslie.alexander@utkalproperty.com',
    socials: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com'
    }
  },
  {
    id: 3,
    name: 'Darlene Robertson',
    role: 'Residential Property Specialist',
    image: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800',
    phone: '+91 98765 43212',
    email: 'darlene.robertson@utkalproperty.com',
    socials: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com'
    }
  }
];

const HomeMeetagents = () => {
  return (
    <section className="HomeMeetagents">
      <div className="HomeMeetagents-container">
        {/* Section Header */}
        <div className="HomeMeetagents-header">
          <span className="HomeMeetagents-tag">Expert Team</span>
          <h1 className="HomeMeetagents-main-heading">Meet Our Agents</h1>
          <p className="HomeMeetagents-subheading">
            Our experienced team at Utkal Property is ready to guide you to your ideal real estate investment
          </p>
        </div>

        {/* Agents 3-Card Grid */}
        <div className="HomeMeetagents-grid">
          {AGENTS_DATA.map((agent) => (
            <div key={agent.id} className="HomeMeetagents-card">
              {/* Image Box with Hover Overlay Bar */}
              <div className="HomeMeetagents-img-wrapper">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="HomeMeetagents-img"
                />

                {/* Utkal Green Vertical Social Bar */}
                <div className="HomeMeetagents-social-sidebar">
                  <a
                    href={agent.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="HomeMeetagents-social-icon"
                    aria-label="Facebook"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href={agent.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="HomeMeetagents-social-icon"
                    aria-label="Twitter"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href={agent.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="HomeMeetagents-social-icon"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedinIn />
                  </a>
                  <a
                    href={agent.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="HomeMeetagents-social-icon"
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </a>
                </div>
              </div>

              {/* Agent Details & Buttons */}
              <div className="HomeMeetagents-card-body">
                <div className="HomeMeetagents-info">
                  <h3 className="HomeMeetagents-name">{agent.name}</h3>
                  <p className="HomeMeetagents-role">{agent.role}</p>
                </div>

                <div className="HomeMeetagents-actions">
                  <a
                    href={`tel:${agent.phone}`}
                    className="HomeMeetagents-action-btn"
                    title={`Call ${agent.name}`}
                    aria-label="Call Agent"
                  >
                    <FaPhoneAlt />
                  </a>
                  <a
                    href={`mailto:${agent.email}`}
                    className="HomeMeetagents-action-btn"
                    title={`Email ${agent.name}`}
                    aria-label="Email Agent"
                  >
                    <FaEnvelope />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Callout Link */}
        <div className="HomeMeetagents-footer-text">
          Become an agent and get the commission you deserve.{' '}
          <a href="#contact" className="HomeMeetagents-contact-link">
            Contact us
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomeMeetagents;