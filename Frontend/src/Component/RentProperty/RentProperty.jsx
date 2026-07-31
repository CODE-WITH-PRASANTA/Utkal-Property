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

  // Field options mapping for interactive summary table inputs & dropdowns
  const fieldConfigMap = {
    propertyTitle: {
      type: 'input',
      inputType: 'text',
      placeholder: 'e.g. 2 BHK Apartment for Rent in Whitefield'
    },
    propertyType: {
      type: 'select',
      options: ['Select Type', 'Apartment', 'Independent House', 'Builder Floor', 'Studio']
    },
    propertyFor: {
      type: 'select',
      options: ['Rent', 'Lease']
    },
    category: {
      type: 'select',
      options: ['Residential', 'Commercial']
    },
    monthlyRent: {
      type: 'input',
      inputType: 'text',
      placeholder: 'Enter monthly rent'
    },
    securityDeposit: {
      type: 'input',
      inputType: 'text',
      placeholder: 'Enter deposit'
    },
    maintenance: {
      type: 'input',
      inputType: 'text',
      placeholder: 'Enter charges'
    },
    availableFrom: {
      type: 'input',
      inputType: 'text',
      placeholder: 'dd/mm/yyyy'
    },
    leaseDuration: {
      type: 'select',
      options: ['Select Duration', '11 Months', '1 Year', '2+ Years']
    },
    builtUpArea: {
      type: 'input',
      inputType: 'text',
      placeholder: 'Enter built-up area'
    },
    bhk: {
      type: 'select',
      options: ['Select', '1 BHK', '2 BHK', '3 BHK', '4+ BHK']
    },
    bathrooms: {
      type: 'select',
      options: ['Select', '1', '2', '3', '4+']
    },
    furnishingStatus: {
      type: 'select',
      options: ['Select Status', 'Unfurnished', 'Semi-Furnished', 'Furnished']
    },
    floor: {
      type: 'input',
      inputType: 'text',
      placeholder: 'Enter floor number'
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

  // Interactive summary structure mapping to state fields
  const summaryData = [
    {
      section: 'Basic Details',
      iconType: 'badge',
      icon: '🏢',
      badgeText: 'RENT',
      rows: [
        { key: 'propertyTitle', field: 'Property Title', required: true },
        { key: 'propertyType', field: 'Property Type', required: true },
        { key: 'propertyFor', field: 'Property For', required: true },
        { key: 'category', field: 'Category', required: true }
      ]
    },
    {
      section: 'Rental Details',
      iconType: 'icon',
      icon: '₹',
      rows: [
        { key: 'monthlyRent', field: 'Monthly Rent (₹)', required: true },
        { key: 'securityDeposit', field: 'Security Deposit (₹)', required: true },
        { key: 'maintenance', field: 'Maintenance (₹)', required: false },
        { key: 'availableFrom', field: 'Available From', required: true },
        { key: 'leaseDuration', field: 'Lease Duration', required: false }
      ]
    },
    {
      section: 'Property Details',
      iconType: 'icon',
      icon: '🏠',
      rows: [
        { key: 'builtUpArea', field: 'Built-up Area (sq ft)', required: true },
        { key: 'bhk', field: 'BHK', required: true },
        { key: 'bathrooms', field: 'Bathrooms', required: true },
        { key: 'furnishingStatus', field: 'Furnishing Status', required: true },
        { key: 'floor', field: 'Floor', required: false },
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

  // Render interactive form element inside table summary cell
  const renderSummaryControl = (row) => {
    if (row.isFileUpload) {
      return (
        <div className="summary-file-control">
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
            className="rp-table-upload-btn"
            onClick={() => summaryFileInputRef.current.click()}
          >
            📷 Choose Files
          </button>
          <ul className="rp-file-list">
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
          className="rent-property-select rp-summary-select"
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
        className="rent-property-input rp-summary-input"
        placeholder={config.placeholder || ''}
        value={formData[row.key]}
        onChange={(e) => handleInputChange(row.key, e.target.value)}
      />
    );
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
            <h1>
              We will find a<br />
              <span className="highlight-green">perfect home</span> for you
            </h1>
            <p>List your property for rent and find the right tenant.</p>
          </div>
        </div>
        <div className="rent-property-banner-illustration">
          <div className="building-graphic">🏢</div>
        </div>
      </div>

      {/* Main Form Wrapper */}
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
                {fieldConfigMap.propertyType.options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="rent-property-form-group">
              <label className="rent-property-label">Property For <span>*</span></label>
              <select 
                className="rent-property-select"
                value={formData.propertyFor}
                onChange={(e) => handleInputChange('propertyFor', e.target.value)}
              >
                {fieldConfigMap.propertyFor.options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="rent-property-form-group">
              <label className="rent-property-label">Category <span>*</span></label>
              <select 
                className="rent-property-select"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
              >
                {fieldConfigMap.category.options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
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
                {fieldConfigMap.leaseDuration.options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
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
                {fieldConfigMap.bhk.options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="rent-property-form-group">
              <label className="rent-property-label">Bathrooms <span>*</span></label>
              <select 
                className="rent-property-select"
                value={formData.bathrooms}
                onChange={(e) => handleInputChange('bathrooms', e.target.value)}
              >
                {fieldConfigMap.bathrooms.options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
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
                {fieldConfigMap.furnishingStatus.options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
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
                {fieldConfigMap.parking.options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
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
                {fieldConfigMap.state.options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="rent-property-form-group">
              <label className="rent-property-label">City <span>*</span></label>
              <select 
                className="rent-property-select"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
              >
                {fieldConfigMap.city.options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
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

        {/* Section 5: Upload More Images */}
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

        {/* Section 6: Interactive Form Summary Table (Notes Column Removed) */}
        <div className="rent-property-section rent-property-summary-section">
          <h3 className="rent-property-section-title">
            <span className="title-indicator"></span> Form Summary
          </h3>
          <p className="rent-property-section-desc">Quickly view or fill out fields directly within this interactive overview table.</p>

          <div className="rp-summary-table-wrapper">
            <table className="rp-summary-table">
              <thead>
                <tr>
                  <th className="rp-col-section">Section</th>
                  <th className="rp-col-fields">Fields Included</th>
                  <th className="rp-col-types">Field Types / Controls</th>
                </tr>
              </thead>
              <tbody>
                {summaryData.map((sec) => (
                  sec.rows.map((row, rowIndex) => (
                    <tr key={`${sec.section}-${rowIndex}`} className={`rp-row rp-row-${sec.section.replace(/\s+/g, '-').toLowerCase()}`}>
                      {rowIndex === 0 && (
                        <td className="rp-section-cell" rowSpan={sec.rows.length}>
                          <div className="rp-section-cell-inner">
                            {sec.iconType === 'badge' ? (
                              <div className="rp-section-badge">
                                <span>{sec.icon}</span>
                                {sec.badgeText}
                              </div>
                            ) : (
                              <div className="rp-section-icon">{sec.icon}</div>
                            )}
                            <span className="rp-section-name">{sec.section}</span>
                          </div>
                        </td>
                      )}
                      <td className="rp-field-cell">
                        {row.field} {row.required && <span className="rp-required">*</span>}
                      </td>
                      <td className="rp-type-cell">
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