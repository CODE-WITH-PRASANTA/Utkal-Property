import React, { useState } from 'react';
import './MyProperties.css';

// Import local property images
import propertieimage1 from '../../assets/propertieimage1.webp';
import propertieimage2 from '../../assets/propertieimage2.webp';
import propertieimage3 from '../../assets/propertieimage3.webp';
import propertieimage4 from '../../assets/propertieimage4.webp';
import propertieimage5 from '../../assets/propertieimage5.webp';

const MyProperties = () => {
  // Photo upload state initialized with imported local images
  const [photos, setPhotos] = useState([
    propertieimage1,
    propertieimage2,
    propertieimage3,
    propertieimage4,
    propertieimage5
  ]);

  // Information state
  const [streetAddress, setStreetAddress] = useState('');
  const [unitNumber, setUnitNumber] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [state, setState] = useState('');

  // Price & Duration state
  const [rentalCosts, setRentalCosts] = useState('$ 500.00');
  const [lateCharge, setLateCharge] = useState('$ 20.00');
  const [downPayment, setDownPayment] = useState('$ 20.00');
  const [rentalMonths, setRentalMonths] = useState(1);

  // Additional Information state
  const [parentProperty, setParentProperty] = useState('');
  const [status, setStatus] = useState('');
  const [listingLabel, setListingLabel] = useState('Rent');
  const [material, setMaterial] = useState('');
  const [rooms, setRooms] = useState('');
  const [beds, setBeds] = useState('Beds');
  const [baths, setBaths] = useState('Baths');
  const [garages, setGarages] = useState('');
  const [yearBuilt, setYearBuilt] = useState('');
  const [homeArea, setHomeArea] = useState('');
  const [lotDimensions, setLotDimensions] = useState('');
  const [lotArea, setLotArea] = useState('');

  // Amenities selection state
  const [selectedAmenities, setSelectedAmenities] = useState({
    'Swimming pool': true,
    'Balcony': true,
    'Undercover parking': true
  });

  // Handle Photo Upload
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newPhotoUrls = files.map((file) => URL.createObjectURL(file));
      setPhotos((prev) => [...prev, ...newPhotoUrls].slice(0, 10));
    }
  };

  // Handle Photo Remove
  const handleRemovePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle Amenity Checkbox Toggle
  const handleAmenityToggle = (amenity) => {
    setSelectedAmenities((prev) => ({
      ...prev,
      [amenity]: !prev[amenity]
    }));
  };

  // Rental Duration Counter
  const handleMonthIncrement = () => setRentalMonths((prev) => prev + 1);
  const handleMonthDecrement = () => setRentalMonths((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="MyProperties">
      <h1 className="MyProperties-title">Add properties</h1>

      {/* Upload Photo Section */}
      <div className="MyProperties-card">
        <h2 className="MyProperties-card-title">Upload photo</h2>
        <div className="MyProperties-upload-box">
          <div className="MyProperties-upload-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          <label className="MyProperties-btn-select-photos">
            Select photos
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handlePhotoUpload}
              hidden
            />
          </label>
          <p className="MyProperties-upload-subtext">or drag photos here</p>
          <span className="MyProperties-upload-limit">(Up to 10 photos)</span>
        </div>

        {/* Thumbnail Preview Grid */}
        <div className="MyProperties-photos-grid">
          {photos.map((src, index) => (
            <div key={index} className="MyProperties-photo-item">
              <img src={src} alt={`Property preview ${index + 1}`} />
              <button
                type="button"
                className="MyProperties-btn-delete-photo"
                onClick={() => handleRemovePhoto(index)}
                title="Delete photo"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Information Section */}
      <div className="MyProperties-card">
        <h2 className="MyProperties-card-title">Infomation</h2>
        
        <div className="MyProperties-field-group">
          <label className="MyProperties-label">Street address *</label>
          <input
            type="text"
            className="MyProperties-input"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
            placeholder="Choose or type address"
            list="street-suggestions"
            autoComplete="off"
          />
          <datalist id="street-suggestions">
            <option value="Janpath Road, Unit 3" />
            <option value="Khandagiri Main Road" />
            <option value="Jaydev Vihar Highway" />
            <option value="Patia DLF Cybercity" />
          </datalist>
        </div>

        <div className="MyProperties-grid-3">
          <div className="MyProperties-field-group">
            <label className="MyProperties-label">Unit number *</label>
            <input
              type="text"
              className="MyProperties-input"
              value={unitNumber}
              onChange={(e) => setUnitNumber(e.target.value)}
              placeholder="Choose"
              list="unit-suggestions"
              autoComplete="off"
            />
            <datalist id="unit-suggestions">
              <option value="A-101" />
              <option value="B-204" />
              <option value="Suite 302" />
            </datalist>
          </div>

          <div className="MyProperties-field-group">
            <label className="MyProperties-label">Zip code *</label>
            <input
              type="text"
              className="MyProperties-input"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="Choose"
              list="zip-suggestions"
              autoComplete="off"
            />
            <datalist id="zip-suggestions">
              <option value="751001" />
              <option value="751013" />
              <option value="751024" />
            </datalist>
          </div>

          <div className="MyProperties-field-group">
            <label className="MyProperties-label">State</label>
            <select
              className="MyProperties-select"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="">Choose</option>
              <option value="Odisha">Odisha</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Delhi">Delhi</option>
            </select>
          </div>
        </div>
      </div>

      {/* Price & Duration Section */}
      <div className="MyProperties-card">
        <h2 className="MyProperties-card-title">Price & Duration</h2>

        <div className="MyProperties-grid-2">
          <div className="MyProperties-field-group">
            <label className="MyProperties-label">Rental costs *</label>
            <select
              className="MyProperties-select"
              value={rentalCosts}
              onChange={(e) => setRentalCosts(e.target.value)}
            >
              <option value="$ 500.00">$ 500.00</option>
              <option value="$ 1,000.00">$ 1,000.00</option>
              <option value="$ 1,500.00">$ 1,500.00</option>
              <option value="$ 2,000.00">$ 2,000.00</option>
            </select>
          </div>

          <div className="MyProperties-field-group">
            <label className="MyProperties-label">Late charge (Optinal)</label>
            <select
              className="MyProperties-select"
              value={lateCharge}
              onChange={(e) => setLateCharge(e.target.value)}
            >
              <option value="$ 20.00">$ 20.00</option>
              <option value="$ 50.00">$ 50.00</option>
              <option value="$ 100.00">$ 100.00</option>
            </select>
          </div>
        </div>

        <div className="MyProperties-grid-2">
          <div className="MyProperties-field-group">
            <label className="MyProperties-label">Minimum down payment (Optinal)</label>
            <select
              className="MyProperties-select"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
            >
              <option value="$ 20.00">$ 20.00</option>
              <option value="$ 50.00">$ 50.00</option>
              <option value="$ 100.00">$ 100.00</option>
            </select>
          </div>

          <div className="MyProperties-field-group">
            <label className="MyProperties-label">Minimum rental time *</label>
            <div className="MyProperties-duration-counter-row">
              <span className="MyProperties-duration-sublabel">Minimum duration (in months)</span>
              <div className="MyProperties-counter-box">
                <button
                  type="button"
                  className="MyProperties-counter-btn"
                  onClick={handleMonthIncrement}
                >
                  +
                </button>
                <span className="MyProperties-counter-value">{rentalMonths}</span>
                <button
                  type="button"
                  className="MyProperties-counter-btn"
                  onClick={handleMonthDecrement}
                >
                  −
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="MyProperties-card">
        <h2 className="MyProperties-card-title">Additional information</h2>

        <div className="MyProperties-grid-3">
          <div className="MyProperties-field-group">
            <label className="MyProperties-label">Parent property</label>
            <select
              className="MyProperties-select"
              value={parentProperty}
              onChange={(e) => setParentProperty(e.target.value)}
            >
              <option value="">Choose</option>
              <option value="Villa Alpha">Villa Alpha</option>
              <option value="Tower Beta">Tower Beta</option>
            </select>
          </div>

          <div className="MyProperties-field-group">
            <label className="MyProperties-label">Status</label>
            <select
              className="MyProperties-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Choose</option>
              <option value="Available">Available</option>
              <option value="Pending">Pending</option>
              <option value="Sold">Sold</option>
            </select>
          </div>

          <div className="MyProperties-field-group">
            <label className="MyProperties-label">Label</label>
            <div className="MyProperties-label-toggle-group">
              <button
                type="button"
                className={`MyProperties-btn-rent ${listingLabel === 'Rent' ? 'active' : ''}`}
                onClick={() => setListingLabel('Rent')}
              >
                <span className="MyProperties-rent-check-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                Rent
              </button>
              <button
                type="button"
                className={`MyProperties-btn-buy ${listingLabel === 'Buy' ? 'active' : ''}`}
                onClick={() => setListingLabel('Buy')}
              >
                Buy
              </button>
            </div>
          </div>
        </div>

        <div className="MyProperties-grid-3">
          <div className="MyProperties-field-group">
            <label className="MyProperties-label">Material</label>
            <input
              type="text"
              className="MyProperties-input"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              placeholder="Choose"
            />
          </div>

          <div className="MyProperties-field-group">
            <label className="MyProperties-label">Rooms</label>
            <input
              type="text"
              className="MyProperties-input"
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
              placeholder="Choose"
            />
          </div>

          <div className="MyProperties-field-group">
            <label className="MyProperties-label">Beds</label>
            <select
              className="MyProperties-select"
              value={beds}
              onChange={(e) => setBeds(e.target.value)}
            >
              <option value="Beds">Beds</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4+">4+</option>
            </select>
          </div>
        </div>

        <div className="MyProperties-grid-3">
          <div className="MyProperties-field-group">
            <label className="MyProperties-label">Baths</label>
            <select
              className="MyProperties-select"
              value={baths}
              onChange={(e) => setBaths(e.target.value)}
            >
              <option value="Baths">Baths</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3+">3+</option>
            </select>
          </div>

          <div className="MyProperties-field-group">
            <label className="MyProperties-label">Garages</label>
            <input
              type="text"
              className="MyProperties-input"
              value={garages}
              onChange={(e) => setGarages(e.target.value)}
              placeholder="Choose"
            />
          </div>

          <div className="MyProperties-field-group">
            <label className="MyProperties-label">Year built</label>
            <select
              className="MyProperties-select"
              value={yearBuilt}
              onChange={(e) => setYearBuilt(e.target.value)}
            >
              <option value="">Choose</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2020+">2020+</option>
            </select>
          </div>
        </div>

        <div className="MyProperties-grid-3">
          <div className="MyProperties-field-group">
            <label className="MyProperties-label">Home area (sqft)</label>
            <input
              type="text"
              className="MyProperties-input"
              value={homeArea}
              onChange={(e) => setHomeArea(e.target.value)}
              placeholder="Choose"
            />
          </div>

          <div className="MyProperties-field-group">
            <label className="MyProperties-label">Lot dimensions</label>
            <input
              type="text"
              className="MyProperties-input"
              value={lotDimensions}
              onChange={(e) => setLotDimensions(e.target.value)}
              placeholder="Choose"
            />
          </div>

          <div className="MyProperties-field-group">
            <label className="MyProperties-label">Lot area (sqft)</label>
            <input
              type="text"
              className="MyProperties-input"
              value={lotArea}
              onChange={(e) => setLotArea(e.target.value)}
              placeholder="eg: 20x20, 20x20x20"
            />
          </div>
        </div>
      </div>

      {/* Amenities Section */}
      <div className="MyProperties-card">
        <h2 className="MyProperties-card-title">Amenities</h2>

        <div className="MyProperties-amenities-grid">
          {/* Outdoor features */}
          <div className="MyProperties-amenities-column">
            <h3 className="MyProperties-amenities-subtitle">Outdoor features</h3>
            {[
              'Swimming pool',
              'Balcony',
              'Undercover parking',
              'Fully fenced',
              'Outdoor spa',
              'Tennis court',
              'Garage',
              'Outdoor area',
              'Shed'
            ].map((item) => (
              <label key={item} className="MyProperties-checkbox-label">
                <input
                  type="checkbox"
                  checked={!!selectedAmenities[item]}
                  onChange={() => handleAmenityToggle(item)}
                  className="MyProperties-checkbox-input"
                />
                <span className="MyProperties-custom-checkbox"></span>
                <span className="MyProperties-checkbox-text">{item}</span>
              </label>
            ))}
          </div>

          {/* Indoor features */}
          <div className="MyProperties-amenities-column">
            <h3 className="MyProperties-amenities-subtitle">Indoor features</h3>
            {[
              'Ensuite',
              'Study',
              'Alarm system',
              'Floorboards',
              'Rumpus room',
              'Dishwasher',
              'Built in robes',
              'Broadband',
              'Gym',
              'Workshop'
            ].map((item) => (
              <label key={item} className="MyProperties-checkbox-label">
                <input
                  type="checkbox"
                  checked={!!selectedAmenities[item]}
                  onChange={() => handleAmenityToggle(item)}
                  className="MyProperties-checkbox-input"
                />
                <span className="MyProperties-custom-checkbox"></span>
                <span className="MyProperties-checkbox-text">{item}</span>
              </label>
            ))}
          </div>

          {/* Climate control & energy */}
          <div className="MyProperties-amenities-column">
            <h3 className="MyProperties-amenities-subtitle">Climate control & energy</h3>
            {[
              'Air conditioning',
              'Heating',
              'Water tank',
              'Solar panels',
              'Solar hot water',
              'Electric stove system',
              'Heating system',
              'Dust filter'
            ].map((item) => (
              <label key={item} className="MyProperties-checkbox-label">
                <input
                  type="checkbox"
                  checked={!!selectedAmenities[item]}
                  onChange={() => handleAmenityToggle(item)}
                  className="MyProperties-checkbox-input"
                />
                <span className="MyProperties-custom-checkbox"></span>
                <span className="MyProperties-checkbox-text">{item}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="MyProperties-action-bar">
        <button type="button" className="MyProperties-btn-list-now">
          List Now
        </button>
        <button type="button" className="MyProperties-btn-save-preview">
          Save & Preview
        </button>
      </div>
    </div>
  );
};

export default MyProperties;