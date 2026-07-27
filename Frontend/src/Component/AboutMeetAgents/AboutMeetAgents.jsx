import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import './AboutMeetAgents.css';

// Image Imports (Adjust relative paths as needed)
import agent1Img from '../../assets/agent1.webp';
import agent2Img from '../../assets/agent2.webp';
import agent3Img from '../../assets/agent3.webp';

export function AboutMeetAgents() {
  const agents = [
    {
      id: 1,
      name: 'Wade Warren',
      role: 'Salesperson',
      image: agent1Img,
      phone: '#',
      email: '#',
      socials: {
        facebook: '#',
        twitter: '#',
        linkedin: '#',
        instagram: '#',
      },
    },
    {
      id: 2,
      name: 'Leslie Alexander',
      role: 'Commercial Broker',
      image: agent2Img,
      phone: '#',
      email: '#',
      socials: {
        facebook: '#',
        twitter: '#',
        linkedin: '#',
        instagram: '#',
      },
    },
    {
      id: 3,
      name: 'Darlene Robertson',
      role: 'Realtor',
      image: agent3Img,
      phone: '#',
      email: '#',
      socials: {
        facebook: '#',
        twitter: '#',
        linkedin: '#',
        instagram: '#',
      },
    },
  ];

  return (
    <section className="AboutMeetAgents-wrapper">
      <div className="AboutMeetAgents-container">
        
        {/* Header Section */}
        <div className="AboutMeetAgents-header">
          <h2 className="AboutMeetAgents-title">Meet the agents</h2>
          <p className="AboutMeetAgents-subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel lobortis justo
          </p>
        </div>

        {/* 3 Column Grid */}
        <div className="AboutMeetAgents-grid">
          {agents.map((agent) => (
            <div key={agent.id} className="AboutMeetAgents-card">
              
              {/* Image Container with Hover Overlay */}
              <div className="AboutMeetAgents-img-container">
                <img src={agent.image} alt={agent.name} className="AboutMeetAgents-img" />
                
                {/* Right Floating Social Strip (Visible on Hover) */}
                <div className="AboutMeetAgents-social-overlay">
                  <a 
                    href={agent.socials.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="AboutMeetAgents-social-link AboutMeetAgents-social-facebook"
                  >
                    <FaFacebookF />
                  </a>
                  <a 
                    href={agent.socials.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="AboutMeetAgents-social-link AboutMeetAgents-social-twitter"
                  >
                    <FaTwitter />
                  </a>
                  <a 
                    href={agent.socials.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="AboutMeetAgents-social-link AboutMeetAgents-social-linkedin"
                  >
                    <FaLinkedinIn />
                  </a>
                  <a 
                    href={agent.socials.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="AboutMeetAgents-social-link AboutMeetAgents-social-instagram"
                  >
                    <FaInstagram />
                  </a>
                </div>
              </div>

              {/* Details Below Image */}
              <div className="AboutMeetAgents-info-row">
                <div className="AboutMeetAgents-text-group">
                  <h3 className="AboutMeetAgents-name">{agent.name}</h3>
                  <p className="AboutMeetAgents-role">{agent.role}</p>
                </div>

                <div className="AboutMeetAgents-contact-icons">
                  <a 
                    href={`tel:${agent.phone}`} 
                    className="AboutMeetAgents-icon-btn AboutMeetAgents-btn-phone" 
                    title="Call Agent"
                  >
                    <FaPhoneAlt />
                  </a>
                  <a 
                    href={`mailto:${agent.email}`} 
                    className="AboutMeetAgents-icon-btn AboutMeetAgents-btn-email" 
                    title="Email Agent"
                  >
                    <FaEnvelope />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Banner Note */}
        <div className="AboutMeetAgents-footer-note">
          Become an agent and get the commission you deserve.{' '}
          <a href="#contact" className="AboutMeetAgents-contact-link">Contact us</a>
        </div>

      </div>
    </section>
  );
}

export default AboutMeetAgents;