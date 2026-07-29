import React, { useState } from 'react';
import { 
  FiEye, FiSave, FiSend, FiChevronDown, FiChevronLeft, FiChevronRight, 
  FiPlus, FiX, FiCheck, FiUpload, FiCalendar, FiStar 
} from 'react-icons/fi';
import { 
  BiBuildingHouse, BiImages, BiMap, BiListUl, BiCheckShield, 
  BiDollarCircle, BiGlobe 
} from 'react-icons/bi';
import './AddNewProperty.css';

const AddNewProperty = () => {
  const [showFullPreview, setShowFullPreview] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  
  const [propertyImages, setPropertyImages] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const [formData, setFormData] = useState({
    propertyName: '',
    category: 'Residential Project',
    propertyType: 'Luxury Villas',
    status: 'Active',
    projectSize: '',
    completionStatus: 'Under Construction',
    shortDescription: '',
    highlights: [],
    newHighlight: '',
    location: '',
    city: '',
    state: '',
    country: '',
    quickStats: {
      totalUnits: '',
      availableUnits: '',
      totalArea: '',
      launchDate: ''
    },
    propertyDetails: {
      totalFloors: '',
      bedrooms: '',
      bathrooms: '',
      plotSize: '',
      facing: ''
    },
    amenities: [
      { name: 'Swimming Pool', checked: false },
      { name: 'Kids Play Area', checked: false },
      { name: 'Club House', checked: false },
      { name: 'Gym', checked: false },
      { name: 'Security', checked: false },
      { name: 'CCTV Camera', checked: false },
      { name: 'Park & Garden', checked: false }
    ],
    seo: {
      metaTitle: '',
      metaDescription: '',
      urlSlug: ''
    },
    publishSettings: {
      publishStatus: false,
      featuredProperty: false,
      publishDate: '',
      promoteProperty: false
    }
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: { ...prev[category], [field]: value }
    }));
  };

  const handleAmenityToggle = (index) => {
    const updatedAmenities = [...formData.amenities];
    updatedAmenities[index].checked = !updatedAmenities[index].checked;
    setFormData(prev => ({ ...prev, amenities: updatedAmenities }));
  };

  const addHighlight = (e) => {
    if (e.key === 'Enter' && formData.newHighlight.trim() !== '') {
      e.preventDefault();
      setFormData(prev => ({
        ...prev,
        highlights: [...prev.highlights, prev.newHighlight.trim()],
        newHighlight: ''
      }));
    }
  };

  const removeHighlight = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newFileNames = files.map(file => file.name);
      setUploadedFiles(prev => [...prev, ...newFileNames]);
    }
  };

  const removeFile = (indexToRemove) => {
    setUploadedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSaveDraft = () => {
    alert('Property saved as draft successfully!');
  };

  const handlePublish = () => {
    alert('Property published successfully!');
  };

  return (
    <div className="AddNewProperty">
      {/* Top Header Bar */}
      <div className="anp-header">
        <div className="anp-title-area">
          <h1>Add New Property</h1>
          <div className="anp-breadcrumb">
            Dashboard <span>&gt;</span> Properties <span>&gt;</span> Add New Property
          </div>
        </div>
        <div className="anp-header-actions">
          <button className="anp-btn-secondary" onClick={() => setShowFullPreview(true)}>
            <FiEye /> Preview
          </button>
          <button className="anp-btn-outline" onClick={handleSaveDraft}>
            <FiSave /> Save as Draft
          </button>
          <button className="anp-btn-primary" onClick={handlePublish}>
            <FiSend /> Publish Property
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="anp-grid-layout">
        
        {/* Left Form Section */}
        <div className="anp-left-column">
          
          {/* Basic Information Card */}
          <div className="anp-card">
            <h3>Basic Information</h3>
            
            <div className="anp-form-group">
              <label>Property Name *</label>
              <input 
                type="text" 
                value={formData.propertyName} 
                placeholder="Enter property name"
                onChange={(e) => handleInputChange('propertyName', e.target.value)} 
              />
            </div>

            <div className="anp-form-row">
              <div className="anp-form-group">
                <label>Category *</label>
                <div className="anp-select-wrapper">
                  <select 
                    value={formData.category} 
                    onChange={(e) => handleInputChange('category', e.target.value)}
                  >
                    <option>Residential Project</option>
                    <option>Commercial Project</option>
                    <option>Industrial</option>
                  </select>
                  <FiChevronDown className="anp-select-icon" />
                </div>
              </div>

              <div className="anp-form-group">
                <label>Property Type *</label>
                <div className="anp-select-wrapper">
                  <select 
                    value={formData.propertyType} 
                    onChange={(e) => handleInputChange('propertyType', e.target.value)}
                  >
                    <option>Luxury Villas</option>
                    <option>Apartments</option>
                    <option>Independent House</option>
                  </select>
                  <FiChevronDown className="anp-select-icon" />
                </div>
              </div>
            </div>

            <div className="anp-form-row">
              <div className="anp-form-group">
                <label>Status *</label>
                <div className="anp-select-wrapper">
                  <select 
                    value={formData.status} 
                    onChange={(e) => handleInputChange('status', e.target.value)}
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Pending</option>
                  </select>
                  <FiChevronDown className="anp-select-icon" />
                </div>
              </div>

              <div className="anp-form-group">
                <label>Project Size (sq ft)</label>
                <input 
                  type="text" 
                  value={formData.projectSize} 
                  placeholder="e.g. 15000"
                  onChange={(e) => handleInputChange('projectSize', e.target.value)} 
                />
              </div>
            </div>

            <div className="anp-form-row">
              <div className="anp-form-group">
                <label>Completion Status</label>
                <div className="anp-select-wrapper">
                  <select 
                    value={formData.completionStatus} 
                    onChange={(e) => handleInputChange('completionStatus', e.target.value)}
                  >
                    <option>Under Construction</option>
                    <option>Ready to Move</option>
                    <option>Upcoming</option>
                  </select>
                  <FiChevronDown className="anp-select-icon" />
                </div>
              </div>
            </div>

            <div className="anp-form-group">
              <label>Short Description</label>
              <textarea 
                rows="3" 
                value={formData.shortDescription}
                placeholder="Enter short description"
                onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                maxLength="160"
              ></textarea>
              <span className="anp-char-count">{formData.shortDescription.length}/160</span>
            </div>

            <div className="anp-form-group">
              <label>Highlights (Key Features)</label>
              <div className="anp-tags-container">
                {formData.highlights.map((tag, index) => (
                  <span key={index} className="anp-tag">
                    {tag} <FiX onClick={() => removeHighlight(index)} />
                  </span>
                ))}
                <input 
                  type="text" 
                  className="anp-tag-input"
                  placeholder="+ Add highlight"
                  value={formData.newHighlight}
                  onChange={(e) => handleInputChange('newHighlight', e.target.value)}
                  onKeyDown={addHighlight}
                />
              </div>
            </div>
          </div>

          {/* Location & Details Section */}
          <div className="anp-card">
            <h3>Location & Details</h3>
            <div className="anp-form-group">
              <label>Location</label>
              <input 
                type="text" 
                value={formData.location}
                placeholder="Street address or landmark"
                onChange={(e) => handleInputChange('location', e.target.value)}
              />
            </div>

            <div className="anp-form-row three-col">
              <div className="anp-form-group">
                <label>City</label>
                <input 
                  type="text" 
                  value={formData.city}
                  placeholder="City"
                  onChange={(e) => handleInputChange('city', e.target.value)}
                />
              </div>
              <div className="anp-form-group">
                <label>State</label>
                <input 
                  type="text" 
                  value={formData.state}
                  placeholder="State"
                  onChange={(e) => handleInputChange('state', e.target.value)}
                />
              </div>
              <div className="anp-form-group">
                <label>Country</label>
                <input 
                  type="text" 
                  value={formData.country}
                  placeholder="Country"
                  onChange={(e) => handleInputChange('country', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Bottom Grid Cards */}
          <div className="anp-row-cards">
            {/* Quick Stats */}
            <div className="anp-card half-card">
              <h3>Quick Stats</h3>
              <div className="anp-form-group">
                <label>Total Units</label>
                <input 
                  type="text" 
                  value={formData.quickStats.totalUnits}
                  onChange={(e) => handleNestedChange('quickStats', 'totalUnits', e.target.value)}
                />
              </div>
              <div className="anp-form-group">
                <label>Available Units</label>
                <input 
                  type="text" 
                  value={formData.quickStats.availableUnits}
                  onChange={(e) => handleNestedChange('quickStats', 'availableUnits', e.target.value)}
                />
              </div>
              <div className="anp-form-group">
                <label>Total Area (sq ft)</label>
                <input 
                  type="text" 
                  value={formData.quickStats.totalArea}
                  onChange={(e) => handleNestedChange('quickStats', 'totalArea', e.target.value)}
                />
              </div>
              <div className="anp-form-group">
                <label>Launch Date</label>
                <input 
                  type="text" 
                  value={formData.quickStats.launchDate}
                  onChange={(e) => handleNestedChange('quickStats', 'launchDate', e.target.value)}
                />
              </div>
            </div>

            {/* Property Details */}
            <div className="anp-card half-card">
              <h3>Property Details</h3>
              <div className="anp-form-group">
                <label>Total Floors</label>
                <input 
                  type="text" 
                  value={formData.propertyDetails.totalFloors}
                  onChange={(e) => handleNestedChange('propertyDetails', 'totalFloors', e.target.value)}
                />
              </div>
              <div className="anp-form-group">
                <label>Bedrooms</label>
                <input 
                  type="text" 
                  value={formData.propertyDetails.bedrooms}
                  onChange={(e) => handleNestedChange('propertyDetails', 'bedrooms', e.target.value)}
                />
              </div>
              <div className="anp-form-group">
                <label>Bathrooms</label>
                <input 
                  type="text" 
                  value={formData.propertyDetails.bathrooms}
                  onChange={(e) => handleNestedChange('propertyDetails', 'bathrooms', e.target.value)}
                />
              </div>
              <div className="anp-form-group">
                <label>Plot Size (sq ft)</label>
                <input 
                  type="text" 
                  value={formData.propertyDetails.plotSize}
                  onChange={(e) => handleNestedChange('propertyDetails', 'plotSize', e.target.value)}
                />
              </div>
              <div className="anp-form-group">
                <label>Facing</label>
                <input 
                  type="text" 
                  value={formData.propertyDetails.facing}
                  onChange={(e) => handleNestedChange('propertyDetails', 'facing', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Amenities & Documents Section */}
          <div className="anp-row-cards">
            <div className="anp-card half-card">
              <h3>Amenities</h3>
              <label className="anp-sub-label">Select Amenities</label>
              <div className="anp-amenities-list">
                {formData.amenities.map((item, index) => (
                  <label key={index} className="anp-checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={item.checked} 
                      onChange={() => handleAmenityToggle(index)}
                    />
                    <span className="anp-custom-checkbox"><FiCheck /></span>
                    {item.name}
                  </label>
                ))}
              </div>
              <button className="anp-add-more-btn"><FiPlus /> Add More</button>
            </div>

            <div className="anp-card half-card">
              <h3>Documents</h3>
              <div className="anp-dropzone">
                <input type="file" multiple onChange={handleFileUpload} />
                <FiUpload className="anp-upload-icon" />
                <p>Drag & drop files here<br/><span>or click to browse</span></p>
              </div>
              <div className="anp-doc-list-container">
                {uploadedFiles.map((fileName, idx) => (
                  <div key={idx} className="anp-uploaded-file-item">
                    <span>{fileName}</span>
                    <button className="anp-remove-file" onClick={() => removeFile(idx)}>
                      <FiX size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Right Preview & Settings Column */}
        <div className="anp-right-column">
          
          {/* Property Images Section */}
          <div className="anp-card">
            <h3>Property Images *</h3>
            <div className="anp-main-img-preview">
              <span className="anp-badge-primary">Primary</span>
              {propertyImages.length > 0 ? (
                <img src={propertyImages[activeImageIndex]} alt="Property" />
              ) : (
                <div className="anp-no-image-placeholder">No Image Uploaded</div>
              )}
              {propertyImages.length > 0 && (
                <>
                  <button className="anp-slider-btn left" onClick={() => setActiveImageIndex((prev) => (prev === 0 ? propertyImages.length - 1 : prev - 1))}>
                    <FiChevronLeft />
                  </button>
                  <button className="anp-slider-btn right" onClick={() => setActiveImageIndex((prev) => (prev === propertyImages.length - 1 ? 0 : prev + 1))}>
                    <FiChevronRight />
                  </button>
                </>
              )}
            </div>
            
            <div className="anp-thumbnail-row">
              {propertyImages.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`anp-thumb ${activeImageIndex === idx ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(idx)}
                >
                  <img src={img} alt={`Thumb ${idx}`} />
                </div>
              ))}
              <div className="anp-thumb add-thumb">
                <FiPlus />
                <span>Add More</span>
              </div>
            </div>
            <p className="anp-img-note">Recommended: 1200x800px, JPG/PNG, Max 5MB</p>
          </div>

          {/* Live Preview Box */}
          <div className="anp-card anp-live-preview-box">
            <div className="anp-preview-header-row">
              <h3>Live Preview</h3>
              <div className="anp-device-icons">
                <span className="active"><FiStar size={14} /></span>
              </div>
            </div>
            <div className="anp-preview-card-content">
              {propertyImages.length > 0 ? (
                <img src={propertyImages[0]} alt="Live Preview" />
              ) : (
                <div className="anp-no-image-placeholder">No Preview Image</div>
              )}
              <div className="anp-preview-details">
                <h4>{formData.propertyName || 'Property Name'}</h4>
                <p className="anp-location-sub">{formData.propertyType} in {formData.city || 'Location'}</p>
                <div className="anp-rating">
                  <FiStar fill="#f59e0b" color="#f59e0b" />
                  <FiStar fill="#f59e0b" color="#f59e0b" />
                  <FiStar fill="#f59e0b" color="#f59e0b" />
                  <FiStar fill="#f59e0b" color="#f59e0b" />
                  <FiStar fill="#f59e0b" color="#f59e0b" />
                  <span>(0)</span>
                </div>
                <div className="anp-price">₹ -</div>
                <div className="anp-sqft-rate">₹ - / Sqft</div>
                <button className="anp-full-preview-btn" onClick={() => setShowFullPreview(true)}>
                  View Full Preview &rarr;
                </button>
              </div>
            </div>
          </div>

          {/* SEO Settings */}
          <div className="anp-card">
            <h3>SEO Settings</h3>
            <div className="anp-form-group">
              <label>Meta Title</label>
              <input 
                type="text" 
                value={formData.seo.metaTitle}
                onChange={(e) => handleNestedChange('seo', 'metaTitle', e.target.value)}
                maxLength="60"
              />
              <span className="anp-char-count">{formData.seo.metaTitle.length}/60</span>
            </div>
            <div className="anp-form-group">
              <label>Meta Description</label>
              <textarea 
                rows="3"
                value={formData.seo.metaDescription}
                onChange={(e) => handleNestedChange('seo', 'metaDescription', e.target.value)}
                maxLength="160"
              ></textarea>
              <span className="anp-char-count">{formData.seo.metaDescription.length}/160</span>
            </div>
            <div className="anp-form-group">
              <label>URL Slug</label>
              <input 
                type="text" 
                value={formData.seo.urlSlug}
                onChange={(e) => handleNestedChange('seo', 'urlSlug', e.target.value)}
              />
            </div>
          </div>

          {/* Publish Settings */}
          <div className="anp-card">
            <h3>Publish Settings</h3>
            <div className="anp-toggle-row">
              <span>Publish Status</span>
              <label className="anp-switch">
                <input 
                  type="checkbox" 
                  checked={formData.publishSettings.publishStatus}
                  onChange={(e) => handleNestedChange('publishSettings', 'publishStatus', e.target.checked)}
                />
                <span className="anp-slider"></span>
              </label>
              <span className="anp-toggle-label">{formData.publishSettings.publishStatus ? 'Active' : 'Draft'}</span>
            </div>

            <div className="anp-toggle-row">
              <span>Featured Property</span>
              <label className="anp-switch">
                <input 
                  type="checkbox" 
                  checked={formData.publishSettings.featuredProperty}
                  onChange={(e) => handleNestedChange('publishSettings', 'featuredProperty', e.target.checked)}
                />
                <span className="anp-slider"></span>
              </label>
              <span className="anp-toggle-label">Yes</span>
            </div>

            <div className="anp-form-group">
              <label>Publish Date</label>
              <div className="anp-input-icon-wrap">
                <input 
                  type="date" 
                  value={formData.publishSettings.publishDate}
                  onChange={(e) => handleNestedChange('publishSettings', 'publishDate', e.target.value)}
                />
                <FiCalendar className="anp-right-icon" />
              </div>
            </div>

            <div className="anp-toggle-row">
              <span>Promote Property</span>
              <label className="anp-switch">
                <input 
                  type="checkbox" 
                  checked={formData.publishSettings.promoteProperty}
                  onChange={(e) => handleNestedChange('publishSettings', 'promoteProperty', e.target.checked)}
                />
                <span className="anp-slider"></span>
              </label>
              <span className="anp-toggle-label">No</span>
            </div>

            <div className="anp-bottom-action-buttons">
              <button className="anp-btn-outline full" onClick={handleSaveDraft}>Save as Draft</button>
              <button className="anp-btn-primary full" onClick={handlePublish}>Publish Property</button>
            </div>
          </div>

        </div>

      </div>

      {/* Footer */}
      <div className="anp-footer">
        <div>© 2026 Admin Panel. All rights reserved.</div>
        <div className="anp-footer-built">Built with <span>❤</span> for better living</div>
      </div>

      {/* FULL PREVIEW MODAL */}
      {showFullPreview && (
        <div className="anp-modal-overlay" onClick={() => setShowFullPreview(false)}>
          <div className="anp-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="anp-modal-header">
              <h2>Property Full Preview</h2>
              <button className="anp-modal-close-btn" onClick={() => setShowFullPreview(false)}>
                <FiX size={20} />
              </button>
            </div>
            <div className="anp-modal-body">
              <div className="anp-modal-gallery">
                <div className="anp-modal-main-image">
                  {propertyImages.length > 0 ? (
                    <img src={propertyImages[activeImageIndex]} alt="Modal Preview" />
                  ) : (
                    <div className="anp-no-image-placeholder">No Image Available</div>
                  )}
                </div>
              </div>
              <div className="anp-modal-info">
                <h3>{formData.propertyName || 'Property Name'}</h3>
                <p className="anp-modal-desc">{formData.shortDescription || 'No description available.'}</p>
                
                <div className="anp-modal-stats-grid">
                  <div className="anp-modal-stat-item">
                    <span>Category</span>
                    <span>{formData.category}</span>
                  </div>
                  <div className="anp-modal-stat-item">
                    <span>Type</span>
                    <span>{formData.propertyType}</span>
                  </div>
                  <div className="anp-modal-stat-item">
                    <span>City</span>
                    <span>{formData.city || '-'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
  </div>
  );
};

export default AddNewProperty;