import React, { useState } from 'react';
import './BasicInformation.css';

const BasicInformation = () => {
  const [formData, setFormData] = useState({
    propertyName: 'Sunrise Luxury Estate',
    category: 'Apartment',
    propertyType: 'Luxury Villas',
    status: 'Active',
    projectSize: '15000',
    completionStatus: 'Under Construction',
    shortDescription: 'A premier residential project located in the heart of the city, offering world-class amenities and breathtaking views.',
    propertyPrice: '12500000',
    pricePerSqFt: '8500',
    reraNumber: 'RERA/P/MUM/2023/001234',
    highlights: 'Add key feature'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'shortDescription' && value.length > 120) {
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const addHighlight = () => {
    console.log('Add Highlight clicked');
  };

  return (
    <div className="basic-info-container">
      <div className="basic-info-card">
        
        {/* Section Header */}
        <div className="basic-info-header">
          <svg className="header-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          <h2 className="header-title">Basic Information</h2>
        </div>

        {/* Form Grid */}
        <form className="basic-info-form">
          
          {/* Property Name */}
          <div className="form-group full-width">
            <label htmlFor="propertyName" className="form-label">
              Property Name <span className="required-star">*</span>
            </label>
            <input
              type="text"
              id="propertyName"
              name="propertyName"
              value={formData.propertyName}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter property name"
            />
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="category" className="form-label">
              Category <span className="required-star">*</span>
            </label>
            <div className="select-wrapper">
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="form-input form-select"
              >
                <option value="" disabled>Select category</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Plot">Plot</option>
              </select>
            </div>
          </div>

          {/* Property Type */}
          <div className="form-group">
            <label htmlFor="propertyType" className="form-label">
              Property Type <span className="required-star">*</span>
            </label>
            <div className="select-wrapper">
              <select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleInputChange}
                className="form-input form-select"
              >
                <option value="" disabled>Select property type</option>
                <option value="Luxury Villas">Luxury Villas</option>
                <option value="Standard House">Standard House</option>
              </select>
            </div>
          </div>

          {/* Status */}
          <div className="form-group">
            <label htmlFor="status" className="form-label">
              Status <span className="required-star">*</span>
            </label>
            <div className="select-wrapper">
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="form-input form-select"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Project Size (sq ft) */}
          <div className="form-group">
            <label htmlFor="projectSize" className="form-label">
              Project Size (sq ft)
            </label>
            <input
              type="text"
              id="projectSize"
              name="projectSize"
              value={formData.projectSize}
              onChange={handleInputChange}
              className="form-input"
              placeholder="e.g. 15000"
            />
          </div>

          {/* Completion Status */}
          <div className="form-group full-width">
            <label htmlFor="completionStatus" className="form-label">
              Completion Status
            </label>
            <div className="select-wrapper">
              <select
                id="completionStatus"
                name="completionStatus"
                value={formData.completionStatus}
                onChange={handleInputChange}
                className="form-input form-select"
              >
                <option value="Under Construction">Under Construction</option>
                <option value="Completed">Completed</option>
                <option value="Upcoming">Upcoming</option>
              </select>
            </div>
          </div>

          {/* Short Description */}
          <div className="form-group full-width">
            <label htmlFor="shortDescription" className="form-label">
              Short Description
            </label>
            <div className="textarea-container">
              <textarea
                id="shortDescription"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                rows="4"
                className="form-input form-textarea"
                placeholder="Enter short description"
              />
              <span className="char-counter">
                {formData.shortDescription.length}/120
              </span>
            </div>
          </div>

          {/* Property Price */}
          <div className="form-group">
            <label htmlFor="propertyPrice" className="form-label">
              Property Price <span className="required-star">*</span>
            </label>
            <input
              type="text"
              id="propertyPrice"
              name="propertyPrice"
              value={formData.propertyPrice}
              onChange={handleInputChange}
              className="form-input"
              placeholder="e.g. 12500000"
            />
          </div>

          {/* Price Per Sq Ft */}
          <div className="form-group">
            <label htmlFor="pricePerSqFt" className="form-label">
              Price Per Sq Ft
            </label>
            <input
              type="text"
              id="pricePerSqFt"
              name="pricePerSqFt"
              value={formData.pricePerSqFt}
              onChange={handleInputChange}
              className="form-input"
              placeholder="e.g. 8500"
            />
          </div>

          {/* RERA Number */}
          <div className="form-group full-width">
            <label htmlFor="reraNumber" className="form-label">
              RERA Number
            </label>
            <input
              type="text"
              id="reraNumber"
              name="reraNumber"
              value={formData.reraNumber}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter RERA registration number"
            />
          </div>

          {/* Highlights (Key Features) */}
          <div className="form-group full-width">
            <label htmlFor="highlights" className="form-label">
              Highlights (Key Features)
            </label>
            <input
              type="text"
              id="highlights"
              name="highlights"
              value={formData.highlights}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Add key feature"
            />
          </div>

          {/* Add Highlight Button */}
          <div className="form-group full-width">
            <button
              type="button"
              onClick={addHighlight}
              className="add-highlight-btn"
            >
              <span className="plus-icon">+</span> Add Highlight
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default BasicInformation;