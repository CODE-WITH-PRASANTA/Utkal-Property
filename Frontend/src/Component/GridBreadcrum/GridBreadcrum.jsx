import React, { useState } from 'react';
import './GridBreadcrum.css';

// React Icons
import {
  FiSearch,
  FiSliders,
  FiChevronDown,
  FiCheck
} from 'react-icons/fi';
import {
  BiBed,
  BiBath,
  BiArea
} from 'react-icons/bi';
import { HiOutlineMapPin } from 'react-icons/hi2';

// Local Asset Image Import
import heroBg from '../../assets/bg1.jpg';

const GridBreadcrum = () => {
  // Toggle Rent / Buy Tabs
  const [activeTab, setActiveTab] = useState('Rent');

  // Toggle Extended Filter Panel (2nd Reference Image)
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Form Field States
  const [keyword, setKeyword] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [location, setLocation] = useState('');
  const [baths, setBaths] = useState('');
  const [beds, setBeds] = useState('');

  // Extended Filter Checkboxes State
  const [amenities, setAmenities] = useState({
    swimmingPool: false,
    garage: false,
    alarmSystem: false,
    balcony: false,
    outdoorArea: false,
    broadband: false,
    ensuite: false,
    builtInRobes: false,
    gym: false,
    tennisCourt: false,
    study: false,
    outdoorSpa: false
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setAmenities((prev) => ({
      ...prev,
      [name]: checked
    }));
  };

  // Fallback background image if src/assets/hero-bg.jpg is not found
  const bgStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.45)), url(${heroBg || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1600'})`
  };

  return (
    <div className="GridBreadcrum">
      
      {/* Top Search & Filter Bar Bar Area */}
      <div className="GridBreadcrum-filter-section">
        <div className="GridBreadcrum-container">
          
          {/* Rent / Buy Toggle Tabs */}
          <div className="GridBreadcrum-tab-wrapper">
            <button
              className={`GridBreadcrum-tab-btn ${activeTab === 'Rent' ? 'active' : ''}`}
              onClick={() => setActiveTab('Rent')}
            >
              {activeTab === 'Rent' && <FiCheck className="GridBreadcrum-check-icon" />}
              Rent
            </button>
            <button
              className={`GridBreadcrum-tab-btn ${activeTab === 'Buy' ? 'active' : ''}`}
              onClick={() => setActiveTab('Buy')}
            >
              {activeTab === 'Buy' && <FiCheck className="GridBreadcrum-check-icon" />}
              Buy
            </button>
          </div>

          {/* Main Search Filter Inputs Row */}
          <div className="GridBreadcrum-search-bar">
            
            {/* Keyword Input */}
            <div className="GridBreadcrum-input-box">
              <FiSearch className="GridBreadcrum-input-icon" />
              <input
                type="text"
                placeholder="Type keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="GridBreadcrum-input"
              />
            </div>

            {/* Property Type Dropdown */}
            <div className="GridBreadcrum-select-box">
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="GridBreadcrum-select"
              >
                <option value="">Property type</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
                <option value="commercial">Commercial</option>
              </select>
              <FiChevronDown className="GridBreadcrum-select-icon" />
            </div>

            {/* Location Dropdown */}
            <div className="GridBreadcrum-select-box">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="GridBreadcrum-select"
              >
                <option value="">Location</option>
                <option value="san-jose">San Jose</option>
                <option value="billesley">Billesley</option>
                <option value="london">London</option>
                <option value="new-york">New York</option>
              </select>
              <FiChevronDown className="GridBreadcrum-select-icon" />
            </div>

            {/* Baths Dropdown */}
            <div className="GridBreadcrum-select-box">
              <select
                value={baths}
                onChange={(e) => setBaths(e.target.value)}
                className="GridBreadcrum-select"
              >
                <option value="">Baths</option>
                <option value="1">1 Bath</option>
                <option value="2">2 Baths</option>
                <option value="3">3+ Baths</option>
              </select>
              <FiChevronDown className="GridBreadcrum-select-icon" />
            </div>

            {/* Beds Dropdown */}
            <div className="GridBreadcrum-select-box">
              <select
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                className="GridBreadcrum-select"
              >
                <option value="">Beds</option>
                <option value="1">1 Bed</option>
                <option value="2">2 Beds</option>
                <option value="3">3 Beds</option>
                <option value="4">4 Beds</option>
              </select>
              <FiChevronDown className="GridBreadcrum-select-icon" />
            </div>

            {/* Filters Toggle Button */}
            <button
              className={`GridBreadcrum-filters-toggle-btn ${isFilterOpen ? 'active' : ''}`}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <span>Filters</span>
              <FiSliders className="GridBreadcrum-sliders-icon" />
            </button>

            {/* Search Button */}
            <button className="GridBreadcrum-search-btn">
              <span>Search Now</span>
              <FiSearch className="GridBreadcrum-btn-search-icon" />
            </button>

          </div>

          {/* Extended Filters Drawer (Shown in 2nd Reference Image) */}
          {isFilterOpen && (
            <div className="GridBreadcrum-extended-panel">
              
              {/* Top Selects & Sliders Row */}
              <div className="GridBreadcrum-extended-header-row">
                
                <div className="GridBreadcrum-extended-select-box">
                  <select
                    value={baths}
                    onChange={(e) => setBaths(e.target.value)}
                    className="GridBreadcrum-select"
                  >
                    <option value="">Baths: Any</option>
                    <option value="1">1 Bath</option>
                    <option value="2">2 Baths</option>
                    <option value="3">3 Baths</option>
                  </select>
                  <FiChevronDown className="GridBreadcrum-select-icon" />
                </div>

                <div className="GridBreadcrum-extended-select-box">
                  <select
                    value={beds}
                    onChange={(e) => setBeds(e.target.value)}
                    className="GridBreadcrum-select"
                  >
                    <option value="">Beds: Any</option>
                    <option value="1">1 Bed</option>
                    <option value="2">2 Beds</option>
                    <option value="3">3 Beds</option>
                  </select>
                  <FiChevronDown className="GridBreadcrum-select-icon" />
                </div>

                <div className="GridBreadcrum-filter-range-label">
                  From —
                </div>

                <div className="GridBreadcrum-filter-range-label">
                  Size —
                </div>

              </div>

              <div className="GridBreadcrum-divider"></div>

              {/* Amenities Checkboxes Grid */}
              <div className="GridBreadcrum-checkboxes-grid">
                
                <label className="GridBreadcrum-checkbox-label">
                  <input
                    type="checkbox"
                    name="swimmingPool"
                    checked={amenities.swimmingPool}
                    onChange={handleCheckboxChange}
                  />
                  <span>Swimming pool</span>
                </label>

                <label className="GridBreadcrum-checkbox-label">
                  <input
                    type="checkbox"
                    name="balcony"
                    checked={amenities.balcony}
                    onChange={handleCheckboxChange}
                  />
                  <span>Balcony</span>
                </label>

                <label className="GridBreadcrum-checkbox-label">
                  <input
                    type="checkbox"
                    name="ensuite"
                    checked={amenities.ensuite}
                    onChange={handleCheckboxChange}
                  />
                  <span>Ensuite</span>
                </label>

                <label className="GridBreadcrum-checkbox-label">
                  <input
                    type="checkbox"
                    name="tennisCourt"
                    checked={amenities.tennisCourt}
                    onChange={handleCheckboxChange}
                  />
                  <span>Tennis court</span>
                </label>

                <label className="GridBreadcrum-checkbox-label">
                  <input
                    type="checkbox"
                    name="garage"
                    checked={amenities.garage}
                    onChange={handleCheckboxChange}
                  />
                  <span>Garage</span>
                </label>

                <label className="GridBreadcrum-checkbox-label">
                  <input
                    type="checkbox"
                    name="outdoorArea"
                    checked={amenities.outdoorArea}
                    onChange={handleCheckboxChange}
                  />
                  <span>Outdoor area</span>
                </label>

                <label className="GridBreadcrum-checkbox-label">
                  <input
                    type="checkbox"
                    name="builtInRobes"
                    checked={amenities.builtInRobes}
                    onChange={handleCheckboxChange}
                  />
                  <span>Built in robes</span>
                </label>

                <label className="GridBreadcrum-checkbox-label">
                  <input
                    type="checkbox"
                    name="study"
                    checked={amenities.study}
                    onChange={handleCheckboxChange}
                  />
                  <span>Study</span>
                </label>

                <label className="GridBreadcrum-checkbox-label">
                  <input
                    type="checkbox"
                    name="alarmSystem"
                    checked={amenities.alarmSystem}
                    onChange={handleCheckboxChange}
                  />
                  <span>Alarm system</span>
                </label>

                <label className="GridBreadcrum-checkbox-label">
                  <input
                    type="checkbox"
                    name="broadband"
                    checked={amenities.broadband}
                    onChange={handleCheckboxChange}
                  />
                  <span>Broadband</span>
                </label>

                <label className="GridBreadcrum-checkbox-label">
                  <input
                    type="checkbox"
                    name="gym"
                    checked={amenities.gym}
                    onChange={handleCheckboxChange}
                  />
                  <span>Gym</span>
                </label>

                <label className="GridBreadcrum-checkbox-label">
                  <input
                    type="checkbox"
                    name="outdoorSpa"
                    checked={amenities.outdoorSpa}
                    onChange={handleCheckboxChange}
                  />
                  <span>Outdoor spa</span>
                </label>

              </div>

            </div>
          )}

        </div>
      </div>

      {/* Hero Banner Section with House Background */}
      <div className="GridBreadcrum-hero-banner" style={bgStyle}>
        <div className="GridBreadcrum-hero-container">
          
          <h1 className="GridBreadcrum-hero-title">
            Gorgeous Apartment Building
          </h1>

          <div className="GridBreadcrum-hero-meta">
            <span className="GridBreadcrum-meta-item">
              <BiBed className="GridBreadcrum-meta-icon" />
              Beds: <strong>4</strong>
            </span>

            <span className="GridBreadcrum-meta-item">
              <BiBath className="GridBreadcrum-meta-icon" />
              Baths: <strong>2</strong>
            </span>

            <span className="GridBreadcrum-meta-item">
              <BiArea className="GridBreadcrum-meta-icon" />
              Sqft: <strong>1150</strong>
            </span>

            <span className="GridBreadcrum-meta-item">
              <HiOutlineMapPin className="GridBreadcrum-meta-icon" />
              58 Hullbrook Road, Billesley, B13 0LA
            </span>
          </div>

        </div>
      </div>

    </div>
  );
};

export default GridBreadcrum;