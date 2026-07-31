import React from 'react';
import './GridContact.css';
import { FiPhoneCall } from 'react-icons/fi';

// Import images from your src/assets directory
import bgPattern from '../../assets/bg2.jpg'; 
import girlImage from '../../assets/jhia.png'; 

const GridContact = () => {
  // Linear gradient overlay combined with background image
  const bgStyle = {
    backgroundImage: `linear-gradient(rgba(11, 59, 36, 0.45), rgba(0, 0, 0, 0.65)), url(${bgPattern})`
  };

  return (
    <section className="GridContact">
      <div 
        className="GridContact-container"
        style={bgStyle}
      >
        <div className="GridContact-content">
          {/* Title styled with high contrast against the dark green gradient overlay */}
          <h2 className="GridContact-title">
            <span className="GridContact-title-light">Find for your </span>
            <span className="GridContact-title-green">dream home</span>
            <span className="GridContact-title-light"> and increase your investment </span>
            <span className="GridContact-title-green">opportunities</span>
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