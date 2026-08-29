import React from 'react';
import './GridContact.css';
import { FaWhatsapp } from 'react-icons/fa'; // Swapped to WhatsApp icon

// Import images from your src/assets directory
import bgPattern from '../../assets/bg2.jpg'; 
import girlImage from '../../assets/jhia.png'; 

const GridContact = () => {
  const phoneNumber = '919861566735';
  const defaultMessage = encodeURIComponent(
    'Hi Utkal Property, I would like to get expert advice on properties in Bhubaneswar.'
  );

  const handleWhatsAppRedirect = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${defaultMessage}`, '_blank', 'noopener,noreferrer');
  };

  // Linear gradient overlay combined with background image
  const bgStyle = {
    backgroundImage: `linear-gradient(rgba(11, 59, 36, 0.75), rgba(15, 23, 42, 0.85)), url(${bgPattern})`
  };

  return (
    <section className="GridContact" aria-labelledby="grid-contact-heading">
      <div 
        className="GridContact-container"
        style={bgStyle}
      >
        <div className="GridContact-content">
          <span className="GridContact-badge">Top Real Estate Agency</span>

          <h2 id="grid-contact-heading" className="GridContact-title">
            <span className="GridContact-title-light">Get Expert Advice from the </span>
            <span className="GridContact-title-green">Best Property Consultant in Bhubaneswar</span>
          </h2>
          
          <p className="GridContact-description">
            Looking for verified residential plots, luxury duplexes, or high-growth commercial spaces? 
            Partner with <strong>Utkal Property</strong> for 100% legal clearance, transparent pricing, and end-to-end guidance across Bhubaneswar.
          </p>

          <div className="GridContact-action-group">
            <button 
              type="button"
              className="GridContact-btn" 
              onClick={handleWhatsAppRedirect}
              aria-label="Chat with Utkal Property Consultant on WhatsApp"
            >
              <FaWhatsapp className="GridContact-btn-icon" aria-hidden="true" />
              <span>Chat with Expert on WhatsApp</span>
            </button>
            <span className="GridContact-helpline">
              Direct Helpline: <a href="tel:+919861566735">+91 9861566735</a>
            </span>
          </div>
        </div>

        <div className="GridContact-image-wrapper">
          <img 
            src={girlImage} 
            alt="Best Property Consultant in Bhubaneswar - Utkal Property Real Estate Advisor" 
            className="GridContact-person-img" 
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default GridContact;