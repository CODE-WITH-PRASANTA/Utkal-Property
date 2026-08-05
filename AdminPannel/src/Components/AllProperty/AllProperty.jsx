import React, { useState, useRef } from 'react';
import './AllProperty.css';
   
const AllProperty = () => {
  // Form states
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [urlSlug, setUrlSlug] = useState('');
  
  // Publish settings toggles
  const [publishStatus, setPublishStatus] = useState(true); // true = Public, false = Private
  const [featuredProperty, setFeaturedProperty] = useState(false);
  const [publishDate, setPublishDate] = useState('');
  const [promoteProperty, setPromoteProperty] = useState(false);

  // Modal preview state
  const [showModal, setShowModal] = useState(false);

  // Hidden file input reference
  const fileInputRef = useRef(null);

  // Images list state
  const [propertyImages, setPropertyImages] = useState([
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
  ]);

  const sampleAmenities = [
    "Swimming Pool", "Kid Play Area", "Gym", "Security", 
    "CCTV Camera", "Park & Garden", "Club House"
  ];

  const handleFilesUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setPropertyImages(prev => [...prev, ...newImages]);
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  // Publish submit handler
  const handlePublishProperty = () => {
    const propertyData = {
      metaTitle,
      metaDescription,
      urlSlug,
      publishStatus: publishStatus ? 'Public' : 'Private',
      featuredProperty,
      publishDate: publishDate || new Date().toISOString().split('T')[0],
      promoteProperty,
      imagesCount: propertyImages.length
    };

    console.log("Submitting Property Data:", propertyData);
    alert("🚀 Property submitted and published successfully!");
  };

  // Set current date helper for "Now" button
  const handleSetNowDate = () => {
    const today = new Date().toISOString().split('T')[0];
    setPublishDate(today);
  };

  return (
    <div className="all-property-container">
      
      {/* 1. Property Images Section */}
      <div className="property-card">
        <div className="card-header-row">
          <div className="title-with-icon">
            <span className="purple-icon">☁️</span>
            <h3 className="section-title">Property Images <span className="required-star">*</span></h3>
          </div>
          <span className="badge-primary">Primary</span>
        </div>

        <div className="dropzone-area" onClick={triggerFileSelect}>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFilesUpload} 
            multiple 
            accept="image/*" 
            style={{ display: 'none' }} 
          />
          <div className="dropzone-content">
            <span className="upload-cloud-icon">☁️</span>
            <p className="dropzone-text">Drag & drop images here <span className="browse-text">or click to browse</span></p>
            <p className="dropzone-subtext">Recommended: 1200×800px, JPG/PNG, Max 5MB</p>
          </div>
        </div>

        <div className="thumbnail-row">
          {propertyImages.map((img, index) => (
            <div key={index} className="thumb-wrapper">
              <img src={img} alt={`Thumbnail ${index + 1}`} className="thumb-img" />
            </div>
          ))}
        </div>
      </div>

      {/* 2. Live Preview Section */}
      <div className="property-card">
        <div className="title-with-icon">
          <span className="purple-icon">👁️</span>
          <h3 className="section-title">Live Preview</h3>
        </div>

        <div className="preview-card-box">
          <div className="preview-img-container">
            <img src={propertyImages[0]} alt="Luxury Villa" className="preview-main-img" />
            <span className="default-preview-tag">Default Preview</span>
          </div>
          <div className="preview-content-box">
            <h4 className="preview-villa-title">{metaTitle || "Luxury Villa Title"}</h4>
            <p className="preview-villa-address">{metaDescription || "Luxury Villa in Location Address"}</p>
            <div className="rating-row">
              <span className="stars">⭐⭐⭐⭐⭐</span>
              <span className="rating-count">(4.5)</span>
            </div>
            <div className="price-tag">₹ --</div>
            <button className="view-full-preview-btn" onClick={() => setShowModal(true)}>
              View Full Preview →
            </button>
          </div>
        </div>
      </div>

      {/* 3. SEO Settings Section */}
      <div className="property-card">
        <div className="title-with-icon">
          <span className="purple-icon">⚙️</span>
          <h3 className="section-title">SEO Settings</h3>
        </div>

        <div className="form-group">
          <label className="input-label">Meta Title</label>
          <div className="input-with-counter">
            <input 
              type="text" 
              className="form-input" 
              maxLength={60}
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="Enter meta title..."
            />
            <span className="char-counter">{metaTitle.length}/60</span>
          </div>
        </div>

        <div className="form-group">
          <label className="input-label">Meta Description</label>
          <div className="textarea-with-counter">
            <textarea 
              className="form-textarea" 
              maxLength={160}
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Enter meta description..."
            ></textarea>
            <span className="char-counter textarea-counter">{metaDescription.length}/160</span>
          </div>
        </div>

        <div className="form-group">
          <label className="input-label">URL Slug</label>
          <input 
            type="text" 
            className="form-input" 
            value={urlSlug}
            onChange={(e) => setUrlSlug(e.target.value)}
            placeholder="property-url-slug"
          />
        </div>
      </div>

      {/* 4. Publish Settings Section */}
      <div className="property-card">
        <div className="title-with-icon">
          <span className="purple-icon">🚀</span>
          <h3 className="section-title">Publish Settings</h3>
        </div>

        {/* Toggle 1: Publish Status */}
        <div className="setting-row">
          <span className="setting-label">Publish Status</span>
          <div className="setting-control">
            <label className="switch">
              <input 
                type="checkbox" 
                checked={publishStatus} 
                onChange={() => setPublishStatus(!publishStatus)} 
              />
              <span className="slider round"></span>
            </label>
            <span className="setting-status-text">{publishStatus ? 'Public' : 'Private'}</span>
          </div>
        </div>

        {/* Toggle 2: Featured Property */}
        <div className="setting-row">
          <span className="setting-label">Featured Property</span>
          <div className="setting-control">
            <label className="switch">
              <input 
                type="checkbox" 
                checked={featuredProperty} 
                onChange={() => setFeaturedProperty(!featuredProperty)} 
              />
              <span className="slider round"></span>
            </label>
            <span className="setting-status-text">{featuredProperty ? 'Yes' : 'No'}</span>
          </div>
        </div>

        {/* Publish Date with Functional Calendar Input */}
        <div className="form-group publish-date-group">
          <label className="input-label">Publish Date</label>
          <div className="date-input-wrapper">
            <div className="date-input-container">
              <input 
                type="date" 
                className="form-input date-input-calendar"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
              />
            </div>
            <span className="now-text" onClick={handleSetNowDate}>Now</span>
          </div>
        </div>

        {/* Toggle 3: Promote Property */}
        <div className="setting-row">
          <span className="setting-label">Promote Property</span>
          <div className="setting-control">
            <label className="switch">
              <input 
                type="checkbox" 
                checked={promoteProperty} 
                onChange={() => setPromoteProperty(!promoteProperty)} 
              />
              <span className="slider round"></span>
            </label>
            <span className="setting-status-text">{promoteProperty ? 'Yes' : 'No'}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons-row">
          <button className="save-draft-btn" onClick={() => alert("Draft saved successfully!")}>
            🔖 Save as Draft
          </button>
          <button className="publish-property-btn" onClick={handlePublishProperty}>
            🚀 Publish Property
          </button>
        </div>
      </div>

      {/* 5. Modal Popup View */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content-box">
            <div className="modal-header">
              <h3 className="modal-title">Property Live Preview</h3>
              <button className="modal-close-btn" onClick={() => setShowModal(false)}>✕</button>
            </div>
            
            <div className="modal-body">
              <div className="modal-images-row">
                {propertyImages.map((img, idx) => (
                  <img key={idx} src={img} alt={`Modal preview ${idx}`} className="modal-thumb-img" />
                ))}
              </div>

              <h2 className="modal-prop-title">{metaTitle || "Untitled Property"}</h2>
              <p className="modal-prop-address">📍 {metaDescription || "Location Address not provided"}</p>

              <div className="modal-tags-row">
                <span className="modal-tag">Category: Villa</span>
                <span className="modal-tag">Type: Residential</span>
                <span className="modal-tag">Status: {publishStatus ? 'Active' : 'Private'}</span>
              </div>

              <div className="modal-desc-section">
                <h4 className="modal-section-heading">Description</h4>
                <p className="modal-desc-text">{metaDescription || "No description provided."}</p>
              </div>

              <div className="modal-specs-grid">
                <div className="spec-item"><strong>Bedrooms:</strong> 4</div>
                <div className="spec-item"><strong>Bathrooms:</strong> 4</div>
                <div className="spec-item"><strong>Total Floors:</strong> 2</div>
                <div className="spec-item"><strong>Total Area:</strong> 3500 sq.ft</div>
                <div className="spec-item"><strong>Plot Size:</strong> 4000 sq.ft</div>
                <div className="spec-item"><strong>Parking:</strong> Available</div>
              </div>

              <div className="modal-amenities-section">
                <h4 className="modal-section-heading">Selected Amenities</h4>
                <div className="amenities-chips-row">
                  {sampleAmenities.map((amenity, i) => (
                    <span key={i} className="amenity-chip">{amenity}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AllProperty;