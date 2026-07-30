import React, { useState, useRef } from 'react';
import './SellProperty.css';

const SellProperty = () => {
  const [formData, setFormData] = useState({
    propertyTitle: '',
    propertyType: 'Select Type',
    propertyFor: 'Sell',
    category: 'Residential',
    expectedPrice: '',
    negotiable: 'Yes',
    builtUpArea: '',
    carpetArea: '',
    bhk: 'Select',
    bathrooms: 'Select',
    balconies: 'Select',
    floor: '',
    totalFloors: '',
    furnishingStatus: 'Select Status',
    propertyAge: 'Select Age',
    parking: 'Select',
    state: 'Select State',
    city: 'Select City',
    locality: '',
    landmark: '',
    pinCode: ''
  });

  const [uploadedImages, setUploadedImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setUploadedImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="sell-property-container">
      {/* Top Banner Header */}
      <div className="sell-property-banner">
        <div className="sell-property-banner-content">
          <div className="sell-property-banner-badge">
            <span>🏠</span> SALE
          </div>
          <div className="sell-property-banner-text">
            <h1>Sell a Property</h1>
            <p>List your property for sale and find the right buyer.</p>
          </div>
        </div>
        <div className="sell-property-banner-illustration">
          <div className="house-graphic">🏡</div>
        </div>
      </div>

      {/* Main Single-Column Form Wrapper */}
      <div className="sell-property-form-wrapper">
        
        {/* Section 1: Basic Details */}
        <div className="sell-property-section">
          <h3 className="sell-property-section-title">
            <span className="title-indicator"></span> Basic Details
          </h3>

          <div className="sell-property-form-group">
            <label className="sell-property-label">Property Title <span>*</span></label>
            <input 
              type="text" 
              className="sell-property-input"
              placeholder="e.g. 3 BHK Luxury Apartment in Koramangala"
              value={formData.propertyTitle}
              onChange={(e) => handleInputChange('propertyTitle', e.target.value)}
            />
          </div>

          <div className="sell-property-grid-3">
            <div className="sell-property-form-group">
              <label className="sell-property-label">Property Type <span>*</span></label>
              <select 
                className="sell-property-select"
                value={formData.propertyType}
                onChange={(e) => handleInputChange('propertyType', e.target.value)}
              >
                <option value="Select Type">Select Type</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Independent House">Independent House</option>
                <option value="Plot">Plot</option>
              </select>
            </div>

            <div className="sell-property-form-group">
              <label className="sell-property-label">Property For <span>*</span></label>
              <select 
                className="sell-property-select"
                value={formData.propertyFor}
                onChange={(e) => handleInputChange('propertyFor', e.target.value)}
              >
                <option value="Sell">Sell</option>
                <option value="Rent">Rent</option>
              </select>
            </div>

            <div className="sell-property-form-group">
              <label className="sell-property-label">Category <span>*</span></label>
              <select 
                className="sell-property-select"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
              >
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>
          </div>

          <div className="sell-property-grid-price">
            <div className="sell-property-form-group">
              <label className="sell-property-label">Expected Price (₹) <span>*</span></label>
              <input 
                type="text" 
                className="sell-property-input"
                placeholder="Enter price"
                value={formData.expectedPrice}
                onChange={(e) => handleInputChange('expectedPrice', e.target.value)}
              />
            </div>

            <div className="sell-property-form-group">
              <label className="sell-property-label">Negotiable</label>
              <div className="sell-property-radio-group">
                <label className="sell-property-radio">
                  <input 
                    type="radio" 
                    name="negotiable" 
                    checked={formData.negotiable === 'Yes'}
                    onChange={() => handleInputChange('negotiable', 'Yes')}
                  /> Yes
                </label>
                <label className="sell-property-radio">
                  <input 
                    type="radio" 
                    name="negotiable" 
                    checked={formData.negotiable === 'No'}
                    onChange={() => handleInputChange('negotiable', 'No')}
                  /> No
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Property Details */}
        <div className="sell-property-section">
          <h3 className="sell-property-section-title">
            <span className="title-indicator"></span> Property Details
          </h3>

          <div className="sell-property-grid-3">
            <div className="sell-property-form-group">
              <label className="sell-property-label">Built-up Area (sq ft) <span>*</span></label>
              <input 
                type="text" 
                className="sell-property-input"
                placeholder="Enter area"
                value={formData.builtUpArea}
                onChange={(e) => handleInputChange('builtUpArea', e.target.value)}
              />
            </div>

            <div className="sell-property-form-group">
              <label className="sell-property-label">Carpet Area (sq ft)</label>
              <input 
                type="text" 
                className="sell-property-input"
                placeholder="Enter area"
                value={formData.carpetArea}
                onChange={(e) => handleInputChange('carpetArea', e.target.value)}
              />
            </div>

            <div className="sell-property-form-group">
              <label className="sell-property-label">BHK <span>*</span></label>
              <select 
                className="sell-property-select"
                value={formData.bhk}
                onChange={(e) => handleInputChange('bhk', e.target.value)}
              >
                <option value="Select">Select</option>
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="4+ BHK">4+ BHK</option>
              </select>
            </div>
          </div>

          <div className="sell-property-grid-4">
            <div className="sell-property-form-group">
              <label className="sell-property-label">Bathrooms <span>*</span></label>
              <select 
                className="sell-property-select"
                value={formData.bathrooms}
                onChange={(e) => handleInputChange('bathrooms', e.target.value)}
              >
                <option value="Select">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4+">4+</option>
              </select>
            </div>

            <div className="sell-property-form-group">
              <label className="sell-property-label">Balconies</label>
              <select 
                className="sell-property-select"
                value={formData.balconies}
                onChange={(e) => handleInputChange('balconies', e.target.value)}
              >
                <option value="Select">Select</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3+">3+</option>
              </select>
            </div>

            <div className="sell-property-form-group">
              <label className="sell-property-label">Floor</label>
              <input 
                type="text" 
                className="sell-property-input"
                placeholder="Enter floor"
                value={formData.floor}
                onChange={(e) => handleInputChange('floor', e.target.value)}
              />
            </div>

            <div className="sell-property-form-group">
              <label className="sell-property-label">Total Floors</label>
              <input 
                type="text" 
                className="sell-property-input"
                placeholder="Enter total"
                value={formData.totalFloors}
                onChange={(e) => handleInputChange('totalFloors', e.target.value)}
              />
            </div>
          </div>

          <div className="sell-property-grid-3">
            <div className="sell-property-form-group">
              <label className="sell-property-label">Furnishing Status <span>*</span></label>
              <select 
                className="sell-property-select"
                value={formData.furnishingStatus}
                onChange={(e) => handleInputChange('furnishingStatus', e.target.value)}
              >
                <option value="Select Status">Select Status</option>
                <option value="Unfurnished">Unfurnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Furnished">Furnished</option>
              </select>
            </div>

            <div className="sell-property-form-group">
              <label className="sell-property-label">Property Age</label>
              <select 
                className="sell-property-select"
                value={formData.propertyAge}
                onChange={(e) => handleInputChange('propertyAge', e.target.value)}
              >
                <option value="Select Age">Select Age</option>
                <option value="Under Construction">Under Construction</option>
                <option value="0-1 Years">0-1 Years</option>
                <option value="1-5 Years">1-5 Years</option>
                <option value="5+ Years">5+ Years</option>
              </select>
            </div>

            <div className="sell-property-form-group">
              <label className="sell-property-label">Parking</label>
              <select 
                className="sell-property-select"
                value={formData.parking}
                onChange={(e) => handleInputChange('parking', e.target.value)}
              >
                <option value="Select">Select</option>
                <option value="None">None</option>
                <option value="Bike">Bike</option>
                <option value="Car">Car</option>
                <option value="Both">Both</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Location */}
        <div className="sell-property-section">
          <h3 className="sell-property-section-title">
            <span className="title-indicator"></span> Location
          </h3>

          <div className="sell-property-grid-3">
            <div className="sell-property-form-group">
              <label className="sell-property-label">State <span>*</span></label>
              <select 
                className="sell-property-select"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
              >
                <option value="Select State">Select State</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>

            <div className="sell-property-form-group">
              <label className="sell-property-label">City <span>*</span></label>
              <select 
                className="sell-property-select"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
              >
                <option value="Select City">Select City</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Mumbai">Mumbai</option>
                <option value="New Delhi">New Delhi</option>
              </select>
            </div>

            <div className="sell-property-form-group">
              <label className="sell-property-label">Locality <span>*</span></label>
              <input 
                type="text" 
                className="sell-property-input"
                placeholder="Enter locality"
                value={formData.locality}
                onChange={(e) => handleInputChange('locality', e.target.value)}
              />
            </div>
          </div>

          <div className="sell-property-grid-price" style={{ marginTop: '16px' }}>
            <div className="sell-property-form-group">
              <label className="sell-property-label">Landmark</label>
              <input 
                type="text" 
                className="sell-property-input"
                placeholder="Enter landmark"
                value={formData.landmark}
                onChange={(e) => handleInputChange('landmark', e.target.value)}
              />
            </div>

            <div className="sell-property-form-group">
              <label className="sell-property-label">PIN Code <span>*</span></label>
              <input 
                type="text" 
                className="sell-property-input"
                placeholder="Enter PIN code"
                value={formData.pinCode}
                onChange={(e) => handleInputChange('pinCode', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* NEW SECTION: Upload More Images (Placed below Location) */}
        <div className="sell-property-section">
          <h3 className="sell-property-section-title">
            <span className="title-indicator"></span> Upload More Images
          </h3>
          <p className="sell-property-section-desc">Add clear photos of your property to attract more buyers (PNG, JPG, WEBP up to 5MB each).</p>

          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            multiple 
            accept="image/*" 
            style={{ display: 'none' }} 
          />

          <div 
            className="sell-property-upload-zone"
            onClick={() => fileInputRef.current.click()}
          >
            <div className="upload-icon">📷</div>
            <strong>Click to upload property images</strong>
            <span>Drag and drop your images here</span>
          </div>

          {uploadedImages.length > 0 && (
            <div className="sell-property-preview-grid">
              {uploadedImages.map((imgSrc, index) => (
                <div className="sell-property-preview-item" key={index}>
                  <img src={imgSrc} alt={`Property upload ${index + 1}`} />
                  <button 
                    type="button" 
                    className="remove-img-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(index);
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Action Button */}
        <div className="sell-property-action-footer">
          <button className="sell-property-submit-btn">
            <span>✈</span> Continue to Next Step &rarr;
          </button>
        </div>

      </div>
    </div>
  );
};

export default SellProperty;