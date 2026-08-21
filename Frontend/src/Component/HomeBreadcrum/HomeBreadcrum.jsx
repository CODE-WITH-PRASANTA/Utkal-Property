import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiChevronDown, FiSliders, FiArrowUpRight } from 'react-icons/fi';
import './HomeBreadcrum.css';
import heroImg from '../../assets/slider-1.png'; 

const HomeBreadcrum = () => {
  const [activeTab, setActiveTab] = useState('Rent');
  const [keyword, setKeyword] = useState('');
  const [propertyType, setPropertyType] = useState('Flat / Apartment');
  const [location, setLocation] = useState('Bhubaneswar, Odisha');
  
  const [showPropertyDropdown, setShowPropertyDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const [baths, setBaths] = useState('Any');
  const [beds, setBeds] = useState('Any');
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const searchContainerRef = useRef(null);

  const statsData = {
    Rent: { properties: '50+', customers: '200+' },
    Buy: { properties: '50+', customers: '100+' }
  };

  const propertyTypes = [
    'Flat / Apartment',
    'Luxury Penthouse',
    'Bungalow / Villa',
    'Duplex Home',
    'Commercial Office',
    'Residential Plot'
  ];

  const locations = [
    'Patia, Bhubaneswar',
    'Jayadev Vihar, Bhubaneswar',
    'Khandagiri, Bhubaneswar',
    'Saheed Nagar, Bhubaneswar',
    'Nayapalli, Bhubaneswar',
    'Cuttack, Odisha'
  ];

  const amenitiesList = [
    'Swimming pool', 'Balcony', 'Ensuite', 'Tennis court',
    'Garage', 'Outdoor area', 'Built in robes', 'Study',
    'Alarm system', 'Broadband', 'Gym', 'Outdoor spa'
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
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
    <section className="HomeBreadcrum">
      <div className="HomeBreadcrum-container">
        
        {/* Left Column */}
        <div className="HomeBreadcrum-left">
          <div className="HomeBreadcrum-badgeTag">
            Utkal Property Services
          </div>

          <h1 className="HomeBreadcrum-title">
            Leading <span className="highlight-green">Premium Apartments and Flats</span> in Bhubaneswar
          </h1>

          <p className="HomeBreadcrum-subtitle">
            Find your dream home with the leading premium apartments dealer. Explore verified luxury residences, high-end gated communities, and modern spaces built for your lifestyle.
          </p>

          {/* Search Card */}
          <div className="HomeBreadcrum-searchCardContainer" ref={searchContainerRef}>
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

            <div className="HomeBreadcrum-searchCard">
              {/* Keyword Input */}
              <div className="HomeBreadcrum-field HomeBreadcrum-inputField">
                <input
                  type="text"
                  placeholder="Search 2 BHK, 3 BHK, luxury flats..."
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
                  <FiChevronDown className={`HomeBreadcrum-arrowIcon ${showPropertyDropdown ? 'rotate' : ''}`} />
                </div>

                {showPropertyDropdown && (
                  <div className="HomeBreadcrum-dropdownMenu">
                    <div className="HomeBreadcrum-dropdownTitle">Property Type</div>
                    <ul>
                      {propertyTypes.map((type, idx) => (
                        <li
                          key={idx}
                          className={propertyType === type ? 'selected' : ''}
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
                  <FiChevronDown className={`HomeBreadcrum-arrowIcon ${showLocationDropdown ? 'rotate' : ''}`} />
                </div>

                {showLocationDropdown && (
                  <div className="HomeBreadcrum-dropdownMenu">
                    <div className="HomeBreadcrum-dropdownTitle">Location</div>
                    <ul>
                      {locations.map((loc, idx) => (
                        <li
                          key={idx}
                          className={location === loc ? 'selected' : ''}
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

              {/* Action Buttons */}
              <button
                type="button"
                className={`HomeBreadcrum-filterBtn ${showAdvancedFilters ? 'active' : ''}`}
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                title="Toggle Filters"
                aria-label="Filter Options"
              >
                <FiSliders />
              </button>

              <button type="button" className="HomeBreadcrum-searchBtn">
                <span>Search</span>
                <FiSearch className="HomeBreadcrum-searchIcon" />
              </button>
            </div>

            {/* Advanced Filters */}
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
                        <option value="Any">Bedrooms: Any</option>
                        <option value="1">1 BHK</option>
                        <option value="2">2 BHK</option>
                        <option value="3">3 BHK</option>
                        <option value="4">4+ BHK</option>
                      </select>
                      <FiChevronDown className="HomeBreadcrum-selectArrow" />
                    </div>
                  </div>

                  <span className="HomeBreadcrum-filterHeaderLabel">Featured Amenities</span>
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
                      <span className="HomeBreadcrum-customCheckbox" />
                      <span className="HomeBreadcrum-amenityText">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Dynamic Stats */}
          <div className="HomeBreadcrum-stats">
            <div className="HomeBreadcrum-statItem">
              <h3>{statsData[activeTab].properties}</h3>
              <p>Properties Available</p>
            </div>
            <div className="HomeBreadcrum-statItem">
              <h3>{statsData[activeTab].customers}</h3>
              <p>Verified Listings</p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="HomeBreadcrum-right">
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
                    PREMIUM APARTMENTS & FLATS IN BHUBANESWAR •
                  </textPath>
                </text>
              </svg>
            </div>
            <div className="HomeBreadcrum-badgeArrow">
              <FiArrowUpRight className="HomeBreadcrum-badgeIcon" />
            </div>
          </div>

          <div className="HomeBreadcrum-imageArch">
            <img
              src={heroImg}
              alt="Premium Apartments in Bhubaneswar"
              className="HomeBreadcrum-heroImage"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default HomeBreadcrum;