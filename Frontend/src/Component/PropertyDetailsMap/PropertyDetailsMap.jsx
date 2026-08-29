import './PropertyDetailsMap.css';

const PropertyDetailsMap = ({ property }) => {
  const location = property?.address || '6PM9+7GX, Infosys Rd, Chandiheta, Odisha 752054, India';

  return (
    <div className="PropertyDetailsMap-wrapper">
      <div className="PropertyDetailsMap-card">
        <p className="PropertyDetailsMap-location-text">
          <strong>Location:</strong> {location}
        </p>
        
        <div className="PropertyDetailsMap-iframe-container">
          <iframe
            className="PropertyDetailsMap-iframe"
            title={`${property?.title || 'Property'} Location`}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(location)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
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