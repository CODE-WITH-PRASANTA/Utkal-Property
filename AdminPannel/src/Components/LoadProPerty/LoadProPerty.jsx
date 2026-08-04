import React, { useState } from 'react';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import SaveIcon from '@mui/icons-material/Save';
import './LoadProPerty.css';

const LoadProPerty = () => {
  // Initial state with clean dummy data
  const [formData, setFormData] = useState({
    title: 'Project Area',
    icon: 'Default',
    value: '2.5 Acre, 45, G+2',
    category: 'Select Category',
    unit: 'sq.ft, Acre, ₹',
    position: 1,
    status: 'Active',
    highlight: true,
    description: 'Pool, Road, Club, Garden',
  });

  // Handle input changes for text, number, textarea, selects, and checkboxes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form reset to empty or default states
  const handleReset = () => {
    setFormData({
      title: '',
      icon: 'Default',
      value: '',
      category: 'Select Category',
      unit: '',
      position: '',
      status: 'Active',
      highlight: false,
      description: '',
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form Data Saved:\n' + JSON.stringify(formData, null, 2));
    // Add your API call logic here
  };

  // Handle cancel action
  const handleCancel = () => {
    console.log('Form cancelled');
    handleReset();
  };

  return (
    <div className="lp-wrapper">
      <div className="lp-container">
        <form className="lp-form" onSubmit={handleSubmit}>
          
          {/* Header Section */}
          <div className="lp-header">
            <div className="lp-header-icon-container">
              <AspectRatioIcon className="lp-header-icon" />
            </div>
            <div className="lp-header-text">
              <h2 className="lp-title">Add / Edit Project Overview Item</h2>
              <p className="lp-subtitle">Fill in the details to add or update a project overview item.</p>
            </div>
          </div>

          {/* Form Grid - Row 1 */}
          <div className="lp-form-row">
            <div className="lp-form-group">
              <label className="lp-label">Title / Label <span className="lp-required">*</span></label>
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleInputChange} 
                placeholder="e.g., Project Area" 
                className="lp-input" 
                required 
              />
            </div>

            <div className="lp-form-group">
              <label className="lp-label">Icon <span className="lp-required">*</span></label>
              <div className="lp-select-wrapper">
                <AspectRatioIcon className="lp-select-prefix-icon" fontSize="small"/>
                <select 
                  name="icon" 
                  value={formData.icon} 
                  onChange={handleInputChange} 
                  className="lp-input lp-select-with-icon"
                >
                  <option value="Default">Select Icon</option>
                  <option value="Other Icon">Other Icon</option>
                </select>
              </div>
            </div>

            <div className="lp-form-group">
              <label className="lp-label">Value / Data <span className="lp-required">*</span></label>
              <input 
                type="text" 
                name="value" 
                value={formData.value} 
                onChange={handleInputChange} 
                placeholder="e.g., 2.5 Acre, 45" 
                className="lp-input" 
                required 
              />
            </div>

            <div className="lp-form-group">
              <label className="lp-label">Category / Type <span className="lp-required">*</span></label>
              <select 
                name="category" 
                value={formData.category} 
                onChange={handleInputChange} 
                className="lp-input"
              >
                <option value="Select Category">Select Category</option>
                <option value="Area">Area</option>
                <option value="Amenities">Amenities</option>
              </select>
            </div>
          </div>

          {/* Form Grid - Row 2 */}
          <div className="lp-form-row">
            <div className="lp-form-group">
              <label className="lp-label">Unit / Suffix (Optional)</label>
              <input 
                type="text" 
                name="unit" 
                value={formData.unit} 
                onChange={handleInputChange} 
                placeholder="e.g., sq.ft, Acre, ₹" 
                className="lp-input" 
              />
            </div>

            <div className="lp-form-group">
              <label className="lp-label">Order / Position <span className="lp-required">*</span></label>
              <input 
                type="number" 
                name="position" 
                value={formData.position} 
                onChange={handleInputChange} 
                className="lp-input lp-input-number" 
                required
              />
            </div>

            <div className="lp-form-group">
              <label className="lp-label">Status <span className="lp-required">*</span></label>
              <div className="lp-select-wrapper">
                <span className={`lp-status-dot ${formData.status === 'Active' ? 'active' : 'inactive'}`}></span>
                <select 
                  name="status" 
                  value={formData.status} 
                  onChange={handleInputChange} 
                  className="lp-input lp-select-with-icon"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="lp-form-group lp-checkbox-group">
              <label className="lp-label">Highlight Background</label>
              <div className="lp-checkbox-container">
                <input 
                  type="checkbox" 
                  name="highlight" 
                  checked={formData.highlight} 
                  onChange={handleInputChange} 
                  className="lp-checkbox" 
                  id="highlightCheck" 
                />
                <label htmlFor="highlightCheck" className="lp-checkbox-label">
                  Show as highlighted (Green background)
                </label>
              </div>
            </div>
          </div>

          {/* Description Row */}
          <div className="lp-form-row">
            <div className="lp-form-group full-width">
              <label className="lp-label">Description (Optional)</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleInputChange} 
                placeholder="Enter a short description..." 
                className="lp-textarea" 
                rows="3"
              ></textarea>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lp-preview-section">
            <h3 className="lp-preview-title">Live Preview</h3>
            <div className={`lp-preview-card ${formData.highlight ? 'highlighted' : ''}`}>
              <div className="lp-header-icon-container lp-preview-icon-bg">
                <AspectRatioIcon className="lp-preview-icon" />
              </div>
              <div className="lp-preview-text-block">
                <span className="lp-preview-label-text">{formData.title || 'TITLE / LABEL'}</span>
                <p className="lp-preview-value-text">{formData.value || 'Value / Data'}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="lp-actions">
            <button type="button" className="lp-btn lp-btn-reset" onClick={handleReset}>
              Reset Form
            </button>
            <div className="lp-actions-right">
              <button type="button" className="lp-btn lp-btn-cancel" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="lp-btn lp-btn-save">
                <SaveIcon fontSize="small" style={{ marginRight: '6px' }} />
                Save Item
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default LoadProPerty;