import React from 'react';
import './GridContact.css';
import { FiPhoneCall } from 'react-icons/fi';

// Import images from your src/assets directory
// Replace 'bg-pattern.png' and 'person-img.png' with your actual image file names
import bgPattern from '../../assets/bg2.jpg'; 
import girlImage from '../../assets/jhia.png'; 

const GridContact = () => {
  return (
    <section className="GridContact">
      <div 
        className="GridContact-container"
        style={{ backgroundImage: `url(${bgPattern})` }}
      >
        <div className="GridContact-content">
          <h2 className="GridContact-title">
            Find for your dream home and increase your investment opportunities
          </h2>
          
          <p className="GridContact-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed tristique metus proin id lorem odio
          </p>

          <button className="GridContact-btn">
            <FiPhoneCall className="GridContact-btn-icon" />
            <span>Contact Seller</span>
          </button>
        </div>

        <div className="GridContact-image-wrapper">
          <img 
            src={girlImage} 
            alt="Real estate professional holding laptop and coffee" 
            className="GridContact-person-img" 
          />
        </div>
      </div>
    </section>
  );
};

export default GridContact;