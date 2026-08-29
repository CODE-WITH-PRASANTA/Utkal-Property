import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import './AboutMeetAgents.css';

// Image Imports
import agent1Img from '../../assets/agent1.webp';
import agent2Img from '../../assets/agent2.webp';
import agent3Img from '../../assets/agent3.webp';

export function AboutMeetAgents() {
  const directPhone = '+919861566735';
  const whatsappUrl = 'https://wa.me/919861566735?text=Hello%20Utkal%20Property%20Team%2C%20I%20would%20like%20to%20connect%20with%20a%20property%20consultant.';

  const agents = [
    {
      id: 1,
      name: 'Rakesh Mohanty',
      role: 'Residential Property Specialist',
      specialty: 'Patia, Pahala & Hanspal',
      image: agent1Img,
      phone: directPhone,
      whatsapp: `${whatsappUrl}%20Regarding%20Residential%20Plots%20and%20Flats.`,
      socials: {
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
        instagram: 'https://instagram.com',
      },
    },
    {
      id: 2,
      name: 'Satyajit Mishra',
      role: 'Commercial Real Estate Advisor',
      specialty: 'Jaydev Vihar, Saheed Nagar & Rasulgarh',
      image: agent2Img,
      phone: directPhone,
      whatsapp: `${whatsappUrl}%20Regarding%20Commercial%20Investments.`,
      socials: {
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
        instagram: 'https://instagram.com',
      },
    },
    {
      id: 3,
      name: 'Priyanka Das',
      role: 'Legal & RERA Land Consultant',
      specialty: 'Khandagiri, Sundarpada & Jatni',
      image: agent3Img,
      phone: directPhone,
      whatsapp: `${whatsappUrl}%20Regarding%20Legal%20Documentation%20and%20Land%20Verification.`,
      socials: {
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
        instagram: 'https://instagram.com',
      },
    },
  ];

  return (
    <section className="AboutMeetAgents-wrapper" aria-labelledby="property-consultant-heading">
      <div className="AboutMeetAgents-container">
        
        {/* Header Section with Target SEO Keyword */}
        <div className="AboutMeetAgents-header">
          <p className="AboutMeetAgents-badge">Utkal Property Expert Team</p>
          <h1 id="property-consultant-heading" className="AboutMeetAgents-title">
            <span className="AboutMeetAgents-title-dark">Meet the </span>
            <span className="AboutMeetAgents-title-green">Best Property Consultant in Bhubaneswar</span>
          </h1>
          <p className="AboutMeetAgents-subtitle">
            Get personalized advice from certified local real estate consultants specializing in RERA-approved plots, luxury villas, and high-ROI commercial properties across Bhubaneswar.
          </p>
        </div>

        {/* 3 Column Grid */}
        <div className="AboutMeetAgents-grid">
          {agents.map((agent) => (
            <div key={agent.id} className="AboutMeetAgents-card">
              
              {/* Image Container with Hover Overlay */}
              <div className="AboutMeetAgents-img-container">
                <img 
                  src={agent.image} 
                  alt={`${agent.name} - Property Consultant at Utkal Property Bhubaneswar`} 
                  className="AboutMeetAgents-img"
                  loading="lazy"
                />
                
                {/* Right Floating Social Strip */}
                <div className="AboutMeetAgents-social-overlay" aria-label={`Social profiles of ${agent.name}`}>
                  <a 
                    href={agent.socials.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="AboutMeetAgents-social-link AboutMeetAgents-social-facebook"
                    aria-label="Facebook Profile"
                  >
                    <FaFacebookF />
                  </a>
                  <a 
                    href={agent.socials.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="AboutMeetAgents-social-link AboutMeetAgents-social-twitter"
                    aria-label="Twitter Profile"
                  >
                    <FaTwitter />
                  </a>
                  <a 
                    href={agent.socials.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="AboutMeetAgents-social-link AboutMeetAgents-social-linkedin"
                    aria-label="LinkedIn Profile"
                  >
                    <FaLinkedinIn />
                  </a>
                  <a 
                    href={agent.socials.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="AboutMeetAgents-social-link AboutMeetAgents-social-instagram"
                    aria-label="Instagram Profile"
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
                  <span className="AboutMeetAgents-locality">{agent.specialty}</span>
                </div>

                <div className="AboutMeetAgents-contact-icons">
                  <a 
                    href={`tel:${agent.phone}`} 
                    className="AboutMeetAgents-icon-btn AboutMeetAgents-btn-phone" 
                    title={`Call ${agent.name}`}
                    aria-label={`Call ${agent.name}`}
                  >
                    <FaPhoneAlt />
                  </a>
                  <a 
                    href={agent.whatsapp} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="AboutMeetAgents-icon-btn AboutMeetAgents-btn-whatsapp" 
                    title={`WhatsApp ${agent.name}`}
                    aria-label={`Chat with ${agent.name} on WhatsApp`}
                  >
                    <FaWhatsapp />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Banner Note */}
        <div className="AboutMeetAgents-footer-note">
          Looking for trusted property deals or want to partner with us?{' '}
          <a href="tel:+919861566735" className="AboutMeetAgents-contact-link">
            Speak to an expert consultant at +91 9861566735
          </a>
        </div>

      </div>
    </section>
  );
}

export default AboutMeetAgents;