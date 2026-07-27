import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiChevronDown, FiSliders, FiArrowUpRight } from 'react-icons/fi';
import './HomeBreadcrum.css';

// Import your local hero image from src/assets/
import heroImg from '../../assets/slider-1.png'; 

const HomeBreadcrum = () => {
  const [activeTab, setActiveTab] = useState('Rent');
  const [keyword, setKeyword] = useState('');
  const [propertyType, setPropertyType] = useState('Property type');
  const [location, setLocation] = useState('Location');
  
  // Dropdown visibility states
  const [showPropertyDropdown, setShowPropertyDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Advanced Filter state
  const [baths, setBaths] = useState('Any');
  const [beds, setBeds] = useState('Any');
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const dropdownRef = useRef(null);

  // Dynamic readings/stats based on selected tab (Rent vs Buy)
  const statsData = {
    Rent: {
      properties: '1,500+',
      customers: '700+'
    },
    Buy: {
      properties: '3,200+',
      customers: '1,400+'
    }
  };

  // Property types matching Reference Image 2
  const propertyTypes = [
    'Bungalow',
    'Apartment',
    'House',
    'Smart Home',
    'Office',
    'Villa'
  ];

  // Dummy Location Data
  const locations = [
    'New York, USA',
    'Los Angeles, CA',
    'Chicago, IL',
    'London, UK',
    'Dubai, UAE',
    'Tokyo, Japan'
  ];

  // Amenities matching Reference Image 3
  const amenitiesList = [
    'Swimming pool', 'Balcony', 'Ensuite', 'Tennis court',
    'Garage', 'Outdoor area', 'Built in robes', 'Study',
    'Alarm system', 'Broadband', 'Gym', 'Outdoor spa'
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowPropertyDropdown(false);
        setShowLocationDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(item => item !== amenity)
        : [...prev, amenity]
    );
  };

  return (
    <div className="HomeBreadcrum">
      <div className="HomeBreadcrum-container">
        
        {/* Left Column: Hero Content & Search Bar */}
        <div className="HomeBreadcrum-left">
          <h1 className="HomeBreadcrum-title">
            We will find a perfect home for you
          </h1>
          <p className="HomeBreadcrum-subtitle">
            Find a variety of properties that suit you very easily, forget all difficulties in finding a residence for you
          </p>

          {/* Search Card Container */}
          <div className="HomeBreadcrum-searchCardContainer" ref={dropdownRef}>
            
            {/* Rent / Buy Tabs */}
            <div className="HomeBreadcrum-tabs">
              <button
                type="button"
                className={`HomeBreadcrum-tab ${activeTab === 'Rent' ? 'active' : ''}`}
                onClick={() => setActiveTab('Rent')}
              >
                Rent
              </button>
              <button
                type="button"
                className={`HomeBreadcrum-tab ${activeTab === 'Buy' ? 'active' : ''}`}
                onClick={() => setActiveTab('Buy')}
              >
                Buy
              </button>
            </div>

            {/* Main Search Controls */}
            <div className="HomeBreadcrum-searchCard">
              {/* Keyword Input */}
              <div className="HomeBreadcrum-field HomeBreadcrum-inputField">
                <input
                  type="text"
                  placeholder="Type keyword..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>

              {/* Property Type Dropdown */}
              <div className="HomeBreadcrum-field HomeBreadcrum-dropdownField">
                <div
                  className="HomeBreadcrum-dropdownHeader"
                  onClick={() => {
                    setShowPropertyDropdown(!showPropertyDropdown);
                    setShowLocationDropdown(false);
                  }}
                >
                  <span>{propertyType}</span>
                  <FiChevronDown className="HomeBreadcrum-arrowIcon" />
                </div>

                {/* Reference Image 2: Property Type Dropdown */}
                {showPropertyDropdown && (
                  <div className="HomeBreadcrum-dropdownMenu">
                    <div className="HomeBreadcrum-dropdownTitle">Property type</div>
                    <ul>
                      {propertyTypes.map((type, idx) => (
                        <li
                          key={idx}
                          onClick={() => {
                            setPropertyType(type);
                            setShowPropertyDropdown(false);
                          }}
                        >
                          {type}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Location Dropdown */}
              <div className="HomeBreadcrum-field HomeBreadcrum-dropdownField">
                <div
                  className="HomeBreadcrum-dropdownHeader"
                  onClick={() => {
                    setShowLocationDropdown(!showLocationDropdown);
                    setShowPropertyDropdown(false);
                  }}
                >
                  <span>{location}</span>
                  <FiChevronDown className="HomeBreadcrum-arrowIcon" />
                </div>

                {/* Location Dummy Dropdown */}
                {showLocationDropdown && (
                  <div className="HomeBreadcrum-dropdownMenu">
                    <div className="HomeBreadcrum-dropdownTitle">Location</div>
                    <ul>
                      {locations.map((loc, idx) => (
                        <li
                          key={idx}
                          onClick={() => {
                            setLocation(loc);
                            setShowLocationDropdown(false);
                          }}
                        >
                          {loc}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Filter Button */}
              <button
                type="button"
                className={`HomeBreadcrum-filterBtn ${showAdvancedFilters ? 'active' : ''}`}
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                title="Toggle Filters"
              >
                <FiSliders />
              </button>

              {/* Search Button */}
              <button type="button" className="HomeBreadcrum-searchBtn">
                Search Now <FiSearch className="HomeBreadcrum-searchIcon" />
              </button>
            </div>

            {/* Reference Image 3: Expanded Filter Panel */}
            {showAdvancedFilters && (
              <div className="HomeBreadcrum-filterPanel">
                <div className="HomeBreadcrum-filterTop">
                  <div className="HomeBreadcrum-filterSelectGroup">
                    <div className="HomeBreadcrum-filterSelect">
                      <select value={baths} onChange={(e) => setBaths(e.target.value)}>
                        <option value="Any">Baths: Any</option>
                        <option value="1">Baths: 1+</option>
                        <option value="2">Baths: 2+</option>
                        <option value="3">Baths: 3+</option>
                      </select>
                      <FiChevronDown className="HomeBreadcrum-selectArrow" />
                    </div>

                    <div className="HomeBreadcrum-filterSelect">
                      <select value={beds} onChange={(e) => setBeds(e.target.value)}>
                        <option value="Any">Beds: Any</option>
                        <option value="1">Beds: 1+</option>
                        <option value="2">Beds: 2+</option>
                        <option value="3">Beds: 3+</option>
                      </select>
                      <FiChevronDown className="HomeBreadcrum-selectArrow" />
                    </div>
                  </div>

                  <div className="HomeBreadcrum-filterHeaderLabel">
                    <span>Form —</span>
                  </div>

                  <div className="HomeBreadcrum-filterHeaderLabel">
                    <span>Size —</span>
                  </div>
                </div>

                <div className="HomeBreadcrum-divider" />

                <div className="HomeBreadcrum-amenitiesGrid">
                  {amenitiesList.map((amenity, index) => (
                    <label key={index} className="HomeBreadcrum-checkboxLabel">
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes(amenity)}
                        onChange={() => handleAmenityChange(amenity)}
                      />
                      <span className="HomeBreadcrum-customCheckbox"></span>
                      <span className="HomeBreadcrum-amenityText">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Dynamic Stats Counter Section */}
          <div className="HomeBreadcrum-stats">
            <div className="HomeBreadcrum-statItem">
              <h3>{statsData[activeTab].properties}</h3>
              <p>Property ready</p>
            </div>
            <div className="HomeBreadcrum-statItem">
              <h3>{statsData[activeTab].customers}</h3>
              <p>Happy customer</p>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Image & Rotating Circular Badge */}
        <div className="HomeBreadcrum-right">
          
          {/* Reference Image 4: Rotating Circular Badge */}
          <div className="HomeBreadcrum-badgeWrapper">
            <div className="HomeBreadcrum-badgeTextContainer">
              <svg viewBox="0 0 100 100" className="HomeBreadcrum-rotatingSvg">
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="transparent"
                />
                <text className="HomeBreadcrum-svgText">
                  <textPath href="#circlePath" startOffset="0%">
                    find your dreams real estate •
                  </textPath>
                </text>
              </svg>
            </div>
            <div className="HomeBreadcrum-badgeArrow">
              <FiArrowUpRight />
            </div>
          </div>

          {/* Arch Hero Image Container */}
          <div className="HomeBreadcrum-imageArch">
            <img
              src={heroImg}
              alt="Real Estate Architecture"
              className="HomeBreadcrum-heroImage"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomeBreadcrum;