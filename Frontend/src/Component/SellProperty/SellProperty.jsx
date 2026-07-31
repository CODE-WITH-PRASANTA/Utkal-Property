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
  const summaryFileInputRef = useRef(null);

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

  // Field configurations for input types & dropdown options
  const fieldConfigMap = {
    propertyTitle: {
      type: 'input',
      inputType: 'text',
      placeholder: 'e.g. 3 BHK Luxury Apartment in Koramangala'
    },
    propertyType: {
      type: 'select',
      options: ['Select Type', 'Apartment', 'Villa', 'Independent House', 'Plot']
    },
    propertyFor: {
      type: 'select',
      options: ['Sell', 'Rent', 'Lease']
    },
    category: {
      type: 'select',
      options: ['Residential', 'Commercial', 'Land', 'Others']
    },
    expectedPrice: {
      type: 'input',
      inputType: 'text',
      placeholder: 'Enter price'
    },
    negotiable: {
      type: 'select',
      options: ['Yes', 'No']
    },
    builtUpArea: {
      type: 'input',
      inputType: 'text',
      placeholder: 'Enter area'
    },
    carpetArea: {
      type: 'input',
      inputType: 'text',
      placeholder: 'Enter area'
    },
    bhk: {
      type: 'select',
      options: ['Select', '1 BHK', '2 BHK', '3 BHK', '4+ BHK']
    },
    bathrooms: {
      type: 'select',
      options: ['Select', '1', '2', '3', '4+']
    },
    balconies: {
      type: 'select',
      options: ['Select', '0', '1', '2', '3+']
    },
    floor: {
      type: 'input',
      inputType: 'text',
      placeholder: 'Enter floor'
    },
    totalFloors: {
      type: 'input',
      inputType: 'text',
      placeholder: 'Enter total'
    },
    furnishingStatus: {
      type: 'select',
      options: ['Select Status', 'Unfurnished', 'Semi-Furnished', 'Furnished']
    },
    propertyAge: {
      type: 'select',
      options: ['Select Age', 'Under Construction', '0-1 Years', '1-5 Years', '5+ Years']
    },
    parking: {
      type: 'select',
      options: ['Select', 'None', 'Bike', 'Car', 'Both']
    },
    state: {
      type: 'select',
      options: ['Select State', 'Karnataka', 'Maharashtra', 'Delhi']
    },
    city: {
      type: 'select',
      options: ['Select City', 'Bangalore', 'Mumbai', 'New Delhi']
    },
    locality: {
      type: 'input',
      inputType: 'text',
      placeholder: 'Enter locality'
    },
    landmark: {
      type: 'input',
      inputType: 'text',
      placeholder: 'Enter landmark'
    },
    pinCode: {
      type: 'input',
      inputType: 'text',
      placeholder: 'Enter PIN code'
    }
  };

  // Structured summary table data mapped to state keys
  const summaryData = [
    {
      section: 'Basic Details',
      iconType: 'badge',
      icon: '🏠',
      badgeText: 'SALE',
      rows: [
        { key: 'propertyTitle', field: 'Property Title', required: true },
        { key: 'propertyType', field: 'Property Type', required: true },
        { key: 'propertyFor', field: 'Property For', required: true },
        { key: 'category', field: 'Category', required: true },
        { key: 'expectedPrice', field: 'Expected Price (₹)', required: true },
        { key: 'negotiable', field: 'Negotiable', required: false }
      ]
    },
    {
      section: 'Property Details',
      iconType: 'icon',
      icon: '🏡',
      rows: [
        { key: 'builtUpArea', field: 'Built-up Area (sq ft)', required: true },
        { key: 'carpetArea', field: 'Carpet Area (sq ft)', required: false },
        { key: 'bhk', field: 'BHK', required: true },
        { key: 'bathrooms', field: 'Bathrooms', required: true },
        { key: 'balconies', field: 'Balconies', required: false },
        { key: 'floor', field: 'Floor', required: false },
        { key: 'totalFloors', field: 'Total Floors', required: false },
        { key: 'furnishingStatus', field: 'Furnishing Status', required: true },
        { key: 'propertyAge', field: 'Property Age', required: false },
        { key: 'parking', field: 'Parking', required: false }
      ]
    },
    {
      section: 'Location',
      iconType: 'icon',
      icon: '📍',
      rows: [
        { key: 'state', field: 'State', required: true },
        { key: 'city', field: 'City', required: true },
        { key: 'locality', field: 'Locality', required: true },
        { key: 'landmark', field: 'Landmark', required: false },
        { key: 'pinCode', field: 'PIN Code', required: true }
      ]
    },
    {
      section: 'Upload More Images',
      iconType: 'icon',
      icon: '🖼️',
      rows: [
        {
          key: 'uploadImages',
          field: 'Upload Property Images',
          required: false,
          isFileUpload: true,
          fileList: ['Supported formats: PNG, JPG, WEBP', 'Max file size: 5MB each', 'Drag and drop or click to upload']
        }
      ]
    }
  ];

  // Render appropriate input/select controls in table cells
  const renderSummaryControl = (row) => {
    if (row.isFileUpload) {
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
            {row.fileList.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      );
    }

    const config = fieldConfigMap[row.key];
    if (!config) return null;

    if (config.type === 'select') {
      return (
        <select 
          className="sell-property-select sp-summary-select"
          value={formData[row.key]}
          onChange={(e) => handleInputChange(row.key, e.target.value)}
        >
          {config.options.map((opt, idx) => (
            <option key={idx} value={opt}>{opt}</option>
          ))}
        </select>
      );
    }

    return (
      <input 
        type={config.inputType || 'text'} 
        className="sell-property-input sp-summary-input"
        placeholder={config.placeholder || ''}
        value={formData[row.key]}
        onChange={(e) => handleInputChange(row.key, e.target.value)}
      />
    );
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
            <h1>
              We will find a <span className="highlight-green">perfect home</span> for you
            </h1>
            <p>List your property for sale and find the right buyer easily.</p>
          </div>
        </div>
        <div className="sell-property-banner-illustration">
          <div className="house-graphic">🏡</div>
        </div>
      </div>

      {/* Main Form Wrapper */}
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
                {fieldConfigMap.propertyType.options.map((opt, i) => (
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
                {fieldConfigMap.propertyFor.options.map((opt, i) => (
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
                {fieldConfigMap.category.options.map((opt, i) => (
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
                {fieldConfigMap.bhk.options.map((opt, i) => (
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
                {fieldConfigMap.bathrooms.options.map((opt, i) => (
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
                {fieldConfigMap.balconies.options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
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
                {fieldConfigMap.furnishingStatus.options.map((opt, i) => (
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
                {fieldConfigMap.propertyAge.options.map((opt, i) => (
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
                {fieldConfigMap.parking.options.map((opt, i) => (
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
                {fieldConfigMap.state.options.map((opt, i) => (
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
                {fieldConfigMap.city.options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
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

        {/* Section 4: Upload More Images */}
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
                  sec.rows.map((row, rowIndex) => (
                    <tr key={`${sec.section}-${rowIndex}`} className={`sp-row sp-row-${sec.section.replace(/\s+/g, '-').toLowerCase()}`}>
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
                        {row.field} {row.required && <span className="sp-required">*</span>}
                      </td>
                      <td className="sp-type-cell">
                        {renderSummaryControl(row)}
                      </td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>
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