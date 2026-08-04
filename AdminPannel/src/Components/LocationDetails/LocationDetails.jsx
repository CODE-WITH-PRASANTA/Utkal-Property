import React, { useState } from 'react';
import './LocationDetails.css'; // Import the CSS file

const LocationDetails = () => {
  // State to manage the working input boxes
  const [location, setLocation] = useState('No locations found');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  return (
    <div className="ld-main-container">
      {/* Header Section - Takes 60% width on desktop, stacked on mobile */}
      <div className="ld-header-wrapper">
        <h2 className="ld-main-header">
          <span className="ld-header-icon">
            {/* SVG for the location pin icon */}
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </span>
          Location & Details
        </h2>
      </div>

      {/* Form Fields Section */}
      <form className="ld-form">
        {/* Full width Location field */}
        <div className="ld-form-group ld-w-full">
          <label htmlFor="location" className="ld-label ld-bold-label">
            Location <span className="ld-asterisk">*</span>
          </label>
          <select 
            id="location" 
            className="ld-select ld-input-field"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="No locations found">No locations found</option>
            {/* Add other locations here if needed */}
          </select>
        </div>

        {/* City, State, Country fields - Responsive grid */}
        <div className="ld-form-row">
          <div className="ld-form-group">
            <label htmlFor="city" className="ld-label ld-bold-label">City</label>
            <input
              type="text"
              id="city"
              className="ld-text-input ld-input-field"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="ld-form-group">
            <label htmlFor="state" className="ld-label ld-bold-label">State</label>
            <input
              type="text"
              id="state"
              className="ld-text-input ld-input-field"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>

          <div className="ld-form-group">
            <label htmlFor="country" className="ld-label ld-bold-label">Country</label>
            <input
              type="text"
              id="country"
              className="ld-text-input ld-input-field"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default LocationDetails;