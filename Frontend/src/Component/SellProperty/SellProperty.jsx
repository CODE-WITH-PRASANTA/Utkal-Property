import React, { useState, useRef, useEffect } from 'react';
import './SellProperty.css';

// Centralized field config to ensure single source of truth
const FIELD_CONFIG_MAP = {
  propertyTitle: {
    label: 'Property Title',
    required: true,
    type: 'input',
    inputType: 'text',
    placeholder: 'e.g. 3 BHK Luxury Apartment in Patia, Bhubaneswar'
  },
  propertyType: {
    label: 'Property Type',
    required: true,
    type: 'select',
    options: ['Select Type', 'Apartment', 'Villa', 'Independent House', 'Plot']
  },
  propertyFor: {
    label: 'Property For',
    required: true,
    type: 'select',
    options: ['Sell', 'Rent', 'Lease']
  },
  category: {
    label: 'Category',
    required: true,
    type: 'select',
    options: ['Residential', 'Commercial', 'Land', 'Others']
  },
  expectedPrice: {
    label: 'Expected Price (₹)',
    required: true,
    type: 'input',
    inputType: 'text',
    placeholder: 'Enter price'
  },
  negotiable: {
    label: 'Negotiable',
    required: false,
    type: 'radio',
    options: ['Yes', 'No']
  },
  builtUpArea: {
    label: 'Built-up Area (sq ft)',
    required: true,
    type: 'input',
    inputType: 'text',
    placeholder: 'Enter area'
  },
  carpetArea: {
    label: 'Carpet Area (sq ft)',
    required: false,
    type: 'input',
    inputType: 'text',
    placeholder: 'Enter area'
  },
  bhk: {
    label: 'BHK',
    required: true,
    type: 'select',
    options: ['Select', '1 BHK', '2 BHK', '3 BHK', '4+ BHK']
  },
  bathrooms: {
    label: 'Bathrooms',
    required: true,
    type: 'select',
    options: ['Select', '1', '2', '3', '4+']
  },
  balconies: {
    label: 'Balconies',
    required: false,
    type: 'select',
    options: ['Select', '0', '1', '2', '3+']
  },
  floor: {
    label: 'Floor',
    required: false,
    type: 'input',
    inputType: 'text',
    placeholder: 'Enter floor'
  },
  totalFloors: {
    label: 'Total Floors',
    required: false,
    type: 'input',
    inputType: 'text',
    placeholder: 'Enter total'
  },
  furnishingStatus: {
    label: 'Furnishing Status',
    required: true,
    type: 'select',
    options: ['Select Status', 'Unfurnished', 'Semi-Furnished', 'Furnished']
  },
  propertyAge: {
    label: 'Property Age',
    required: false,
    type: 'select',
    options: ['Select Age', 'Under Construction', '0-1 Years', '1-5 Years', '5+ Years']
  },
  parking: {
    label: 'Parking',
    required: false,
    type: 'select',
    options: ['Select', 'None', 'Bike', 'Car', 'Both']
  },
  state: {
    label: 'State',
    required: true,
    type: 'select',
    options: ['Select State', 'Odisha', 'Karnataka', 'Maharashtra', 'Delhi']
  },
  city: {
    label: 'City',
    required: true,
    type: 'select',
    options: ['Select City', 'Bhubaneswar', 'Cuttack', 'Puri', 'Sambalpur', 'Bangalore', 'Mumbai', 'New Delhi']
  },
  locality: {
    label: 'Locality',
    required: true,
    type: 'input',
    inputType: 'text',
    placeholder: 'e.g. Patia / Jayadev Vihar'
  },
  landmark: {
    label: 'Landmark',
    required: false,
    type: 'input',
    inputType: 'text',
    placeholder: 'Enter landmark'
  },
  pinCode: {
    label: 'PIN Code',
    required: true,
    type: 'input',
    inputType: 'text',
    placeholder: 'Enter PIN code'
  }
};

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
    state: 'Odisha',
    city: 'Bhubaneswar',
    locality: '',
    landmark: '',
    pinCode: ''
  });

  const [uploadedImages, setUploadedImages] = useState([]);
  const fileInputRef = useRef(null);
  const summaryFileInputRef = useRef(null);

  // Clean up object URLs on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      uploadedImages.forEach(img => URL.revokeObjectURL(img.previewUrl));
    };
  }, [uploadedImages]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newImageObjs = files.map(file => ({
      file,
      previewUrl: URL.createObjectURL(file)
    }));

    setUploadedImages(prev => [...prev, ...newImageObjs]);
  };

  const removeImage = (index) => {
    setUploadedImages(prev => {
      const itemToRemove = prev[index];
      if (itemToRemove?.previewUrl) {
        URL.revokeObjectURL(itemToRemove.previewUrl);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting Form Data:', formData);
    console.log('Uploaded Files:', uploadedImages.map(img => img.file));
    alert('Property listed successfully!');
  };

  const summaryData = [
    {
      section: 'Basic Details',
      iconType: 'badge',
      icon: '🏠',
      badgeText: 'SALE',
      rows: ['propertyTitle', 'propertyType', 'propertyFor', 'category', 'expectedPrice', 'negotiable']
    },
    {
      section: 'Property Details',
      iconType: 'icon',
      icon: '🏡',
      rows: ['builtUpArea', 'carpetArea', 'bhk', 'bathrooms', 'balconies', 'floor', 'totalFloors', 'furnishingStatus', 'propertyAge', 'parking']
    },
    {
      section: 'Location',
      iconType: 'icon',
      icon: '📍',
      rows: ['state', 'city', 'locality', 'landmark', 'pinCode']
    },
    {
      section: 'Upload More Images',
      iconType: 'icon',
      icon: '🖼️',
      rows: ['uploadImages']
    }
  ];

  const renderSummaryControl = (key) => {
    if (key === 'uploadImages') {
      return (
        <div className="sp-summary-file-control">
          <input 
            type="file" 
            ref={summaryFileInputRef} 
            onChange={handleImageUpload} 
            multiple 
            accept="image/*" 
            style={{ display: 'none' }} 
          />
          <button 
            type="button" 
            className="sp-table-upload-btn"
            onClick={() => summaryFileInputRef.current.click()}
          >
            📷 Choose Files
          </button>
          <ul className="sp-file-list">
            <li>Supported formats: PNG, JPG, WEBP</li>
            <li>Max file size: 5MB each</li>
            <li>Uploaded: {uploadedImages.length} image(s)</li>
          </ul>
        </div>
      );
    }

    const config = FIELD_CONFIG_MAP[key];
    if (!config) return null;

    if (config.type === 'select') {
      return (
        <select 
          className="sell-property-select sp-summary-select"
          value={formData[key]}
          onChange={(e) => handleInputChange(key, e.target.value)}
        >
          {config.options.map((opt, idx) => (
            <option key={idx} value={opt}>{opt}</option>
          ))}
        </select>
      );
    }

    if (config.type === 'radio') {
      return (
        <div className="sell-property-radio-group">
          {config.options.map((opt, idx) => (
            <label key={idx} className="sell-property-radio">
              <input 
                type="radio" 
                name={`summary-${key}`}
                checked={formData[key] === opt}
                onChange={() => handleInputChange(key, opt)}
              /> {opt}
            </label>
          ))}
        </div>
      );
    }

    return (
      <input 
        type={config.inputType || 'text'} 
        className="sell-property-input sp-summary-input"
        placeholder={config.placeholder || ''}
        value={formData[key]}
        onChange={(e) => handleInputChange(key, e.target.value)}
      />
    );
  };

  return (
    <div className="sell-property-container">
      {/* Banner */}
      <div className="sell-property-banner">
        <div className="sell-property-banner-content">
          <div className="sell-property-banner-badge">
            <span>🏠</span> SALE
          </div>
          <div className="sell-property-banner-text">
            <h1>
              Sell a Property with <span className="highlight-green">Utkal Property</span>
            </h1>
            <p>List your property for sale and connect with potential buyers across Odisha easily.</p>
          </div>
        </div>
        <div className="sell-property-banner-illustration">
          <div className="house-graphic">🏡</div>
        </div>
      </div>

      <form className="sell-property-form-wrapper" onSubmit={handleSubmit}>
        
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
              placeholder={FIELD_CONFIG_MAP.propertyTitle.placeholder}
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
                {FIELD_CONFIG_MAP.propertyType.options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="sell-property-form-group">
              <label className="sell-property-label">Property For <span>*</span></label>
              <select 
                className="sell-property-select"
                value={formData.propertyFor}
                onChange={(e) => handleInputChange('propertyFor', e.target.value)}
              >
                {FIELD_CONFIG_MAP.propertyFor.options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="sell-property-form-group">
              <label className="sell-property-label">Category <span>*</span></label>
              <select 
                className="sell-property-select"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
              >
                {FIELD_CONFIG_MAP.category.options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="sell-property-grid-price">
            <div className="sell-property-form-group">
              <label className="sell-property-label">Expected Price (₹) <span>*</span></label>
              <input 
                type="text" 
                className="sell-property-input"
                placeholder={FIELD_CONFIG_MAP.expectedPrice.placeholder}
                value={formData.expectedPrice}
                onChange={(e) => handleInputChange('expectedPrice', e.target.value)}
              />
            </div>

            <div className="sell-property-form-group">
              <label className="sell-property-label">Negotiable</label>
              <div className="sell-property-radio-group">
                {FIELD_CONFIG_MAP.negotiable.options.map((opt, i) => (
                  <label key={i} className="sell-property-radio">
                    <input 
                      type="radio" 
                      name="negotiable" 
                      checked={formData.negotiable === opt}
                      onChange={() => handleInputChange('negotiable', opt)}
                    /> {opt}
                  </label>
                ))}
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
                placeholder={FIELD_CONFIG_MAP.builtUpArea.placeholder}
                value={formData.builtUpArea}
                onChange={(e) => handleInputChange('builtUpArea', e.target.value)}
              />
            </div>

            <div className="sell-property-form-group">
              <label className="sell-property-label">Carpet Area (sq ft)</label>
              <input 
                type="text" 
                className="sell-property-input"
                placeholder={FIELD_CONFIG_MAP.carpetArea.placeholder}
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
                {FIELD_CONFIG_MAP.bhk.options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
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
                {FIELD_CONFIG_MAP.bathrooms.options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="sell-property-form-group">
              <label className="sell-property-label">Balconies</label>
              <select 
                className="sell-property-select"
                value={formData.balconies}
                onChange={(e) => handleInputChange('balconies', e.target.value)}
              >
                {FIELD_CONFIG_MAP.balconies.options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="sell-property-form-group">
              <label className="sell-property-label">Floor</label>
              <input 
                type="text" 
                className="sell-property-input"
                placeholder={FIELD_CONFIG_MAP.floor.placeholder}
                value={formData.floor}
                onChange={(e) => handleInputChange('floor', e.target.value)}
              />
            </div>

            <div className="sell-property-form-group">
              <label className="sell-property-label">Total Floors</label>
              <input 
                type="text" 
                className="sell-property-input"
                placeholder={FIELD_CONFIG_MAP.totalFloors.placeholder}
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
                {FIELD_CONFIG_MAP.furnishingStatus.options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="sell-property-form-group">
              <label className="sell-property-label">Property Age</label>
              <select 
                className="sell-property-select"
                value={formData.propertyAge}
                onChange={(e) => handleInputChange('propertyAge', e.target.value)}
              >
                {FIELD_CONFIG_MAP.propertyAge.options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="sell-property-form-group">
              <label className="sell-property-label">Parking</label>
              <select 
                className="sell-property-select"
                value={formData.parking}
                onChange={(e) => handleInputChange('parking', e.target.value)}
              >
                {FIELD_CONFIG_MAP.parking.options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
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
                {FIELD_CONFIG_MAP.state.options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="sell-property-form-group">
              <label className="sell-property-label">City <span>*</span></label>
              <select 
                className="sell-property-select"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
              >
                {FIELD_CONFIG_MAP.city.options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="sell-property-form-group">
              <label className="sell-property-label">Locality <span>*</span></label>
              <input 
                type="text" 
                className="sell-property-input"
                placeholder={FIELD_CONFIG_MAP.locality.placeholder}
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
                placeholder={FIELD_CONFIG_MAP.landmark.placeholder}
                value={formData.landmark}
                onChange={(e) => handleInputChange('landmark', e.target.value)}
              />
            </div>

            <div className="sell-property-form-group">
              <label className="sell-property-label">PIN Code <span>*</span></label>
              <input 
                type="text" 
                className="sell-property-input"
                placeholder={FIELD_CONFIG_MAP.pinCode.placeholder}
                value={formData.pinCode}
                onChange={(e) => handleInputChange('pinCode', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Section 4: Image Upload */}
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
              {uploadedImages.map((imgObj, index) => (
                <div className="sell-property-preview-item" key={index}>
                  <img src={imgObj.previewUrl} alt={`Property upload ${index + 1}`} />
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

        {/* Section 5: Interactive Form Summary Table */}
        <div className="sell-property-section sell-property-summary-section">
          <h3 className="sell-property-section-title">
            <span className="title-indicator"></span> Form Summary
          </h3>
          <p className="sell-property-section-desc">Quickly view or fill out fields directly within this interactive overview table.</p>

          <div className="sp-summary-table-wrapper">
            <table className="sp-summary-table">
              <thead>
                <tr>
                  <th className="sp-col-section">Section</th>
                  <th className="sp-col-fields">Fields Included</th>
                  <th className="sp-col-types">Field Types / Controls</th>
                </tr>
              </thead>
              <tbody>
                {summaryData.map((sec) => (
                  sec.rows.map((rowKey, rowIndex) => {
                    const rowConfig = FIELD_CONFIG_MAP[rowKey] || {};
                    const isUpload = rowKey === 'uploadImages';

                    return (
                      <tr key={`${sec.section}-${rowKey}`} className={`sp-row sp-row-${sec.section.replace(/\s+/g, '-').toLowerCase()}`}>
                        {rowIndex === 0 && (
                          <td className="sp-section-cell" rowSpan={sec.rows.length}>
                            <div className="sp-section-cell-inner">
                              {sec.iconType === 'badge' ? (
                                <div className="sp-section-badge">
                                  <span>{sec.icon}</span>
                                  {sec.badgeText}
                                </div>
                              ) : (
                                <div className="sp-section-icon">{sec.icon}</div>
                              )}
                              <span className="sp-section-name">{sec.section}</span>
                            </div>
                          </td>
                        )}
                        <td className="sp-field-cell">
                          {isUpload ? 'Upload Property Images' : rowConfig.label} 
                          {rowConfig.required && <span className="sp-required">*</span>}
                        </td>
                        <td className="sp-type-cell">
                          {renderSummaryControl(rowKey)}
                        </td>
                      </tr>
                    );
                  })
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Submit Action Button */}
        <div className="sell-property-action-footer">
          <button type="submit" className="sell-property-submit-btn">
            <span>✈</span> Continue to Next Step &rarr;
          </button>
        </div>

      </form>
    </div>
  );
};

export default SellProperty;