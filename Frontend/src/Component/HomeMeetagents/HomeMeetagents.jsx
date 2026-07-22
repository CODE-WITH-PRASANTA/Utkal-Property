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

// 3 Agents Data matching the reference design
const AGENTS_DATA = [
  {
    id: 1,
    name: 'Wade Warren',
    role: 'Salesperson',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    phone: '+1234567890',
    email: 'wade.warren@example.com',
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
    role: 'Commercial Broker',
    image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800',
    phone: '+1234567891',
    email: 'leslie.alexander@example.com',
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
    role: 'Realtor',
    image: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800',
    phone: '+1234567892',
    email: 'darlene.robertson@example.com',
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
    <div className="HomeMeetagents">
      <div className="HomeMeetagents-container">
        {/* Header */}
        <div className="HomeMeetagents-header">
          <h1 className="HomeMeetagents-main-heading">Meet the agents</h1>
          <p className="HomeMeetagents-subheading">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel lobortis justo
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

                {/* Orange Vertical Social Bar (Matches 2nd Reference Image) */}
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

        {/* Footer Link */}
        <div className="HomeMeetagents-footer-text">
          Become an agent and get the commission you deserve.{' '}
          <a href="#contact" className="HomeMeetagents-contact-link">
            Contact us
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomeMeetagents;