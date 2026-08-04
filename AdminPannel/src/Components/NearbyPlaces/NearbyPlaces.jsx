import React, { useState } from 'react';
import { 
  FaMapMarkerAlt, 
  FaPlus, 
  FaTimes, 
  FaSave, 
  FaPlane, 
  FaTrain, 
  FaUniversity, 
  FaSchool, 
  FaLandmark, 
  FaShoppingBag, 
  FaRoad, 
  FaBriefcase, 
  FaHotel,
  FaChevronLeft,
  FaChevronRight,
  FaLayerGroup
} from 'react-icons/fa';
import './NearbyPlaces.css';

const iconMap = {
  Airport: <FaPlane />,
  'Railway Station': <FaTrain />,
  ATM: <FaLandmark />,
  School: <FaSchool />,
  Temple: <FaLandmark />,
  'Shopping Mall': <FaShoppingBag />,
  Highway: <FaRoad />,
  'Business Hubs': <FaBriefcase />,
  College: <FaUniversity />,
  Hotel: <FaHotel />,
  Airplane: <FaPlane />
};

const initialPlaces = [
  { id: 1, category: 'Airport', name: 'Biju Patnaik Airport', distance: '15 Km', status: 'Active' },
  { id: 2, category: 'Railway Station', name: 'Bhubaneswar Railway Station', distance: '18 Km', status: 'Active' },
  { id: 3, category: 'ATM', name: 'State Bank ATM', distance: '700 Meter', status: 'Active' },
  { id: 4, category: 'School', name: 'G D Goenka Public School', distance: '1.5 Km', status: 'Active' },
  { id: 5, category: 'Temple', name: 'Lingaraj Temple', distance: '2 Km', status: 'Inactive' },
  { id: 6, category: 'Shopping Mall', name: 'DN Regaliya', distance: '4.5 Km', status: 'Active' },
  { id: 7, category: 'Highway', name: 'NH-16', distance: '1.6 Km', status: 'Active' },
  { id: 8, category: 'Business Hubs', name: 'Infocity Square', distance: '1.6 Km', status: 'Active' },
  { id: 9, category: 'College', name: 'Gita Autonomous College', distance: '1.5 Km', status: 'Active' },
  { id: 10, category: 'Hotel', name: 'Taj Vivanta', distance: '4.5 Km', status: 'Active' },
];

const NearbyPlaces = () => {
  const [places, setPlaces] = useState(initialPlaces);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All Categories');

  const [category, setCategory] = useState('Airport');
  const [placeName, setPlaceName] = useState('Biju Patnaik Airport');
  const [distance, setDistance] = useState('15');
  const [unit, setUnit] = useState('Km');
  const [icon, setIcon] = useState('Airplane');
  const [status, setStatus] = useState(true);

  const filteredPlaces = selectedCategoryFilter === 'All Categories' 
    ? places 
    : places.filter(p => p.category === selectedCategoryFilter);

  const activeCount = places.filter(p => p.status === 'Active').length;

  const handleSavePlace = (e) => {
    e.preventDefault();
    if (!placeName || !distance) return;

    const newEntry = {
      id: places.length + 1,
      category,
      name: placeName,
      distance: `${distance} ${unit}`,
      status: status ? 'Active' : 'Inactive'
    };

    setPlaces([newEntry, ...places]);
    setIsModalOpen(false);
    
    setPlaceName('');
    setDistance('');
  };

  return (
    <div className="nearby-places__container">
      <div className="nearby-places__card">
        
        {/* Header Row */}
        <div className="nearby-places__header-row">
          <div className="nearby-places__title-group">
            <FaMapMarkerAlt className="nearby-places__map-icon-green" />
            <div>
              <h1>Nearby Places</h1>
              <p>Manage and explore nearby places easily.</p>
            </div>
          </div>

          <div className="nearby-places__stats-group">
            <div className="nearby-places__stat-card">
              <FaMapMarkerAlt className="nearby-places__stat-icon nearby-places__stat-icon--total" />
              <div>
                <h3>{places.length}</h3>
                <p>All Listed Places</p>
              </div>
            </div>
            <div className="nearby-places__stat-card">
              <FaLayerGroup className="nearby-places__stat-icon nearby-places__stat-icon--active" />
              <div>
                <h3>{activeCount}</h3>
                <p>Currently Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar & Filter */}
        <div className="nearby-places__toolbar">
          <select 
            className="nearby-places__category-filter"
            value={selectedCategoryFilter}
            onChange={(e) => setSelectedCategoryFilter(e.target.value)}
          >
            <option>All Categories</option>
            <option>Airport</option>
            <option>Railway Station</option>
            <option>ATM</option>
            <option>School</option>
            <option>Temple</option>
            <option>Shopping Mall</option>
            <option>Highway</option>
            <option>Business Hubs</option>
            <option>College</option>
            <option>Hotel</option>
          </select>

          <button className="nearby-places__add-btn" onClick={() => setIsModalOpen(true)}>
            <FaPlus /> Add Nearby Place
          </button>
        </div>

        {/* Data Table */}
        <div className="nearby-places__table-wrapper">
          <table className="nearby-places__table">
            <thead>
              <tr>
                <th>#</th>
                <th>CATEGORY</th>
                <th>PLACE NAME</th>
                <th>DISTANCE</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlaces.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="nearby-places__cat-cell">
                      <div className="nearby-places__icon-box">
                        {iconMap[item.category] || <FaMapMarkerAlt />}
                      </div>
                      <span>{item.category}</span>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.distance}</td>
                  <td>
                    <span className={`nearby-places__status-tag nearby-places__status-tag--${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Row */}
        <div className="nearby-places__pagination-row">
          <span>Showing 1 to {filteredPlaces.length} of {places.length} places</span>
          <div className="nearby-places__pagination-controls">
            <button className="nearby-places__page-btn"><FaChevronLeft size={10} /></button>
            <button className="nearby-places__page-btn nearby-places__page-btn--active">1</button>
            <button className="nearby-places__page-btn">2</button>
            <button className="nearby-places__page-btn">3</button>
            <button className="nearby-places__page-btn"><FaChevronRight size={10} /></button>
          </div>
        </div>

      </div>

      {/* Add Nearby Place Popup Modal */}
      <div className={`nearby-places__popup-overlay ${isModalOpen ? 'nearby-places__popup-overlay--open' : ''}`}>
        <div className="nearby-places__add-card">
          
          <div className="nearby-places__add-header">
            <h2><FaMapMarkerAlt color="#006738" /> Add Nearby Place</h2>
            <button className="nearby-places__close-btn" onClick={() => setIsModalOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <form onSubmit={handleSavePlace} className="nearby-places__form">
            
            {/* Category Field */}
            <div className="nearby-places__form-group">
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>Airport</option>
                <option>Railway Station</option>
                <option>ATM</option>
                <option>School</option>
                <option>Temple</option>
                <option>Shopping Mall</option>
                <option>Highway</option>
                <option>Business Hubs</option>
                <option>College</option>
                <option>Hotel</option>
              </select>
            </div>

            {/* Place Name Field */}
            <div className="nearby-places__form-group">
              <label>Place Name</label>
              <input 
                type="text" 
                placeholder="Enter place name" 
                value={placeName} 
                onChange={(e) => setPlaceName(e.target.value)} 
                required 
              />
            </div>

            {/* Distance & Unit Row */}
            <div className="nearby-places__form-row">
              <div className="nearby-places__form-group nearby-places__form-group--half">
                <label>Distance</label>
                <input 
                  type="number" 
                  placeholder="Distance" 
                  value={distance} 
                  onChange={(e) => setDistance(e.target.value)} 
                  required 
                />
              </div>
              <div className="nearby-places__form-group nearby-places__form-group--half">
                <label>Unit</label>
                <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                  <option>Km</option>
                  <option>Meter</option>
                </select>
              </div>
            </div>

            {/* Icon Optional */}
            <div className="nearby-places__form-group">
              <label className="nearby-places__optional-label">Icon</label>
              <select value={icon} onChange={(e) => setIcon(e.target.value)}>
                <option>Airplane</option>
                <option>Railway Station</option>
                <option>ATM</option>
                <option>School</option>
                <option>Temple</option>
                <option>Shopping Mall</option>
                <option>Highway</option>
                <option>Business Hubs</option>
                <option>College</option>
                <option>Hotel</option>
              </select>
            </div>

            {/* Status Switch */}
            <div className="nearby-places__form-group">
              <label>Status</label>
              <div className="nearby-places__toggle-group">
                <label className="nearby-places__switch">
                  <input 
                    type="checkbox" 
                    checked={status} 
                    onChange={(e) => setStatus(e.target.checked)} 
                  />
                  <span className="nearby-places__slider"></span>
                </label>
                <span className="nearby-places__status-label">{status ? 'Active' : 'Inactive'}</span>
              </div>
            </div>

            {/* Live Preview Box */}
            <div className="nearby-places__preview-box">
              <div className="nearby-places__icon-box">
                {iconMap[icon] || <FaMapMarkerAlt />}
              </div>
              <div className="nearby-places__preview-details">
                <p className="nearby-places__preview-subtext">Preview</p>
                <h4>{placeName || 'Place Name'}</h4>
                <p>{distance ? `${distance} ${unit}` : '0 Km'}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="nearby-places__form-actions">
              <button 
                type="button" 
                className="nearby-places__action-btn nearby-places__action-btn--cancel" 
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button type="submit" className="nearby-places__action-btn nearby-places__action-btn--save">
                <FaSave /> Save Place
              </button>
            </div>

          </form>

        </div>
      </div>

    </div>
  );
};

export default NearbyPlaces;