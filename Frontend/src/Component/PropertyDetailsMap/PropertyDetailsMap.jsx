import React from 'react';
import './PropertyDetailsMap.css';

const PropertyDetailsMap = () => {
  return (
    <div className="PropertyDetailsMap-wrapper">
      <div className="PropertyDetailsMap-card">
        <p className="PropertyDetailsMap-location-text">
          <strong>Location:</strong> 6PM9+7GX, Infosys Rd, Chandiheta, Odisha 752054, India
        </p>
        
        <div className="PropertyDetailsMap-iframe-container">
          <iframe
            className="PropertyDetailsMap-iframe"
            title="Rudransh South Kingdom Location"
            src="https://maps.google.com/maps?q=6PM9%2B7GX,%20Infosys%20Rd,%20Chandiheta,%20Odisha%20752054,%20India&t=&z=15&ie=UTF8&iwloc=&output=embed"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsMap;