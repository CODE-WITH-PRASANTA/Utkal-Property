import React, { useState, useRef } from 'react';
import './RentProperty.css';

const RentProperty = () => {
  const [formData, setFormData] = useState({
    propertyTitle: '',
    propertyType: 'Select Type',
    propertyFor: 'Rent',
    category: 'Residential',
    monthlyRent: '',
    securityDeposit: '',
    maintenance: '',
    availableFrom: '',
    leaseDuration: 'Select Duration',
    builtUpArea: '',
    bhk: 'Select',
    bathrooms: 'Select',
    furnishingStatus: 'Select Status',
    floor: '',
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
    <div className="rent-property-container">
      {/* Top Banner Header */}
      <div className="rent-property-banner">
        <div className="rent-property-banner-content">
          <div className="rent-property-banner-badge">
            <span>🏢</span> RENT
          </div>
          <div className="rent-property-banner-text">
            <h1>Rent a Property</h1>
            <p>List your property for rent and find the right tenant.</p>
          </div>
        </div>
        <div className="rent-property-banner-illustration">
          <div className="building-graphic">🏢</div>
        </div>
      </div>

      {/* Main Single-Column Form Wrapper */}
      <div className="rent-property-form-wrapper">
        
        {/* Section 1: Basic Details */}
        <div className="rent-property-section">
          <h3 className="rent-property-section-title">
            <span className="title-indicator"></span> Basic Details
          </h3>

          <div className="rent-property-form-group">
            <label className="rent-property-label">Property Title <span>*</span></label>
            <input 
              type="text" 
              className="rent-property-input"
              placeholder="e.g. 2 BHK Apartment for Rent in Whitefield"
              value={formData.propertyTitle}
              onChange={(e) => handleInputChange('propertyTitle', e.target.value)}
            />
          </div>

          <div className="rent-property-grid-3">
            <div className="rent-property-form-group">
              <label className="rent-property-label">Property Type <span>*</span></label>
              <select 
                className="rent-property-select"
                value={formData.propertyType}
                onChange={(e) => handleInputChange('propertyType', e.target.value)}
              >
                <option value="Select Type">Select Type</option>
                <option value="Apartment">Apartment</option>
                <option value="Independent House">Independent House</option>
                <option value="Builder Floor">Builder Floor</option>
                <option value="Studio">Studio</option>
              </select>
            </div>

            <div className="rent-property-form-group">
              <label className="rent-property-label">Property For <span>*</span></label>
              <select 
                className="rent-property-select"
                value={formData.propertyFor}
                onChange={(e) => handleInputChange('propertyFor', e.target.value)}
              >
                <option value="Rent">Rent</option>
                <option value="Lease">Lease</option>
              </select>
            </div>

            <div className="rent-property-form-group">
              <label className="rent-property-label">Category <span>*</span></label>
              <select 
                className="rent-property-select"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
              >
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Rental Details */}
        <div className="rent-property-section">
          <h3 className="rent-property-section-title">
            <span className="title-indicator"></span> Rental Details
          </h3>

          <div className="rent-property-grid-3">
            <div className="rent-property-form-group">
              <label className="rent-property-label">Monthly Rent (₹) <span>*</span></label>
              <input 
                type="text" 
                className="rent-property-input"
                placeholder="Enter monthly rent"
                value={formData.monthlyRent}
                onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
              />
            </div>

            <div className="rent-property-form-group">
              <label className="rent-property-label">Security Deposit (₹) <span>*</span></label>
              <input 
                type="text" 
                className="rent-property-input"
                placeholder="Enter deposit"
                value={formData.securityDeposit}
                onChange={(e) => handleInputChange('securityDeposit', e.target.value)}
              />
            </div>

            <div className="rent-property-form-group">
              <label className="rent-property-label">Maintenance (₹)</label>
              <input 
                type="text" 
                className="rent-property-input"
                placeholder="Enter charges"
                value={formData.maintenance}
                onChange={(e) => handleInputChange('maintenance', e.target.value)}
              />
            </div>
          </div>

          <div className="rent-property-grid-price" style={{ marginTop: '16px' }}>
            <div className="rent-property-form-group">
              <label className="rent-property-label">Available From <span>*</span></label>
              <input 
                type="text" 
                className="rent-property-input"
                placeholder="dd/mm/yyyy"
                value={formData.availableFrom}
                onChange={(e) => handleInputChange('availableFrom', e.target.value)}
              />
            </div>

            <div className="rent-property-form-group">
              <label className="rent-property-label">Lease Duration</label>
              <select 
                className="rent-property-select"
                value={formData.leaseDuration}
                onChange={(e) => handleInputChange('leaseDuration', e.target.value)}
              >
                <option value="Select Duration">Select Duration</option>
                <option value="11 Months">11 Months</option>
                <option value="1 Year">1 Year</option>
                <option value="2+ Years">2+ Years</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Property Details */}
        <div className="rent-property-section">
          <h3 className="rent-property-section-title">
            <span className="title-indicator"></span> Property Details
          </h3>

          <div className="rent-property-grid-3">
            <div className="rent-property-form-group">
              <label className="rent-property-label">Built-up Area (sq ft) <span>*</span></label>
              <input 
                type="text" 
                className="rent-property-input"
                placeholder="Enter area"
                value={formData.builtUpArea}
                onChange={(e) => handleInputChange('builtUpArea', e.target.value)}
              />
            </div>

            <div className="rent-property-form-group">
              <label className="rent-property-label">BHK <span>*</span></label>
              <select 
                className="rent-property-select"
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

            <div className="rent-property-form-group">
              <label className="rent-property-label">Bathrooms <span>*</span></label>
              <select 
                className="rent-property-select"
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
          </div>

          <div className="rent-property-grid-3" style={{ marginTop: '16px' }}>
            <div className="rent-property-form-group">
              <label className="rent-property-label">Furnishing Status <span>*</span></label>
              <select 
                className="rent-property-select"
                value={formData.furnishingStatus}
                onChange={(e) => handleInputChange('furnishingStatus', e.target.value)}
              >
                <option value="Select Status">Select Status</option>
                <option value="Unfurnished">Unfurnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Furnished">Furnished</option>
              </select>
            </div>

            <div className="rent-property-form-group">
              <label className="rent-property-label">Floor</label>
              <input 
                type="text" 
                className="rent-property-input"
                placeholder="Enter floor"
                value={formData.floor}
                onChange={(e) => handleInputChange('floor', e.target.value)}
              />
            </div>

            <div className="rent-property-form-group">
              <label className="rent-property-label">Parking</label>
              <select 
                className="rent-property-select"
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

        {/* Section 4: Location */}
        <div className="rent-property-section">
          <h3 className="rent-property-section-title">
            <span className="title-indicator"></span> Location
          </h3>

          <div className="rent-property-grid-3">
            <div className="rent-property-form-group">
              <label className="rent-property-label">State <span>*</span></label>
              <select 
                className="rent-property-select"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
              >
                <option value="Select State">Select State</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>

            <div className="rent-property-form-group">
              <label className="rent-property-label">City <span>*</span></label>
              <select 
                className="rent-property-select"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
              >
                <option value="Select City">Select City</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Mumbai">Mumbai</option>
                <option value="New Delhi">New Delhi</option>
              </select>
            </div>

            <div className="rent-property-form-group">
              <label className="rent-property-label">Locality <span>*</span></label>
              <input 
                type="text" 
                className="rent-property-input"
                placeholder="Enter locality"
                value={formData.locality}
                onChange={(e) => handleInputChange('locality', e.target.value)}
              />
            </div>
          </div>

          <div className="rent-property-grid-price" style={{ marginTop: '16px' }}>
            <div className="rent-property-form-group">
              <label className="rent-property-label">Landmark</label>
              <input 
                type="text" 
                className="rent-property-input"
                placeholder="Enter landmark"
                value={formData.landmark}
                onChange={(e) => handleInputChange('landmark', e.target.value)}
              />
            </div>

            <div className="rent-property-form-group">
              <label className="rent-property-label">PIN Code <span>*</span></label>
              <input 
                type="text" 
                className="rent-property-input"
                placeholder="Enter PIN code"
                value={formData.pinCode}
                onChange={(e) => handleInputChange('pinCode', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* NEW SECTION: Upload More Images (Placed below Location) */}
        <div className="rent-property-section">
          <h3 className="rent-property-section-title">
            <span className="title-indicator"></span> Upload More Images
          </h3>
          <p className="rent-property-section-desc">Add clear photos of your rental property to attract more tenants (PNG, JPG, WEBP up to 5MB each).</p>

          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            multiple 
            accept="image/*" 
            style={{ display: 'none' }} 
          />

          <div 
            className="rent-property-upload-zone"
            onClick={() => fileInputRef.current.click()}
          >
            <div className="upload-icon">📷</div>
            <strong>Click to upload property images</strong>
            <span>Drag and drop your images here</span>
          </div>

          {uploadedImages.length > 0 && (
            <div className="rent-property-preview-grid">
              {uploadedImages.map((imgSrc, index) => (
                <div className="rent-property-preview-item" key={index}>
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
        <div className="rent-property-action-footer">
          <button className="rent-property-submit-btn">
            <span>✈</span> Continue to Next Step &rarr;
          </button>
        </div>

      </div>
    </div>
  );
};

export default RentProperty;