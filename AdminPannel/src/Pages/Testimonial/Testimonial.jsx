import React, { useState, useRef } from 'react';
import './Testimonial.css';

// React Icons
import {
  FaStar,
  FaPlus,
  FaUpload,
  FaTrash,
  FaEdit,
  FaEye,
  FaTimes,
  FaUserCircle,
  FaQuoteLeft
} from 'react-icons/fa';

const INITIAL_TESTIMONIALS = [
  {
    id: 1,
    name: 'Rajesh Kumar Swain',
    designation: 'IT Professional',
    location: 'Bhubaneswar, Odisha',
    rating: 5,
    status: 'Active',
    photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    description: 'Buying our 3BHK flat in Patia through Utkal Property was seamless! Their team guided us through legal verifications and loan processing.'
  },
  {
    id: 2,
    name: 'Priya Das',
    designation: 'Business Owner',
    location: 'Cuttack, Odisha',
    rating: 5,
    status: 'Active',
    photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    description: 'Utkal Property helped us find a prime commercial rental space in Saheed Nagar for our office. Fast documentation and great support.'
  },
  {
    id: 3,
    name: 'Subhashish Mohanty',
    designation: 'Government Officer',
    location: 'Puri, Odisha',
    rating: 4,
    status: 'Inactive',
    photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    description: 'We bought a residential plot near Puri Highway through Utkal Property. Verified listings and honest advice made it hassle-free.'
  }
];

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState(INITIAL_TESTIMONIALS);
  const [editingId, setEditingId] = useState(null);
  const [viewingTestimonial, setViewingTestimonial] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    location: '',
    rating: 5,
    status: 'Active',
    description: '',
    photo: null
  });

  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  // Form Change Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Image Upload Handler
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, photo: imageUrl }));
      setPreviewImage(imageUrl);
    }
  };

  // Remove Selected Image
  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, photo: null }));
    setPreviewImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Reset Form
  const resetForm = () => {
    setFormData({
      name: '',
      designation: '',
      location: '',
      rating: 5,
      status: 'Active',
      description: '',
      photo: null
    });
    setPreviewImage(null);
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Form Submit Handler (Add / Edit)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setTestimonials((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, ...formData } : item
        )
      );
    } else {
      const newItem = {
        id: Date.now(),
        ...formData,
        photo: previewImage || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
      };
      setTestimonials((prev) => [newItem, ...prev]);
    }

    resetForm();
  };

  // Edit Action
  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      designation: item.designation,
      location: item.location,
      rating: item.rating,
      status: item.status,
      description: item.description,
      photo: item.photo
    });
    setPreviewImage(item.photo);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete Action
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      setTestimonials((prev) => prev.filter((item) => item.id !== id));
      if (editingId === id) resetForm();
    }
  };

  return (
    <section className="utkal-testimonial-section">
      <div className="utkal-testimonial-container">
        
        {/* Header Badge */}
        <div className="utkal-testimonial-header">
          <span className="utkal-testimonial-tag">Customer Feedback</span>
          <h1 className="utkal-testimonial-title">Testimonial Management</h1>
          <p className="utkal-testimonial-subtitle">
            Manage, edit, and publish client testimonials for Utkal Property.
          </p>
        </div>

        {/* ---------------- FORM SECTION ---------------- */}
        <div className="utkal-testimonial-form-card">
          <div className="utkal-testimonial-form-header">
            <div className="utkal-testimonial-form-title-wrap">
              <span className="utkal-testimonial-form-indicator"></span>
              <h2>{editingId ? 'Edit Testimonial' : 'Add New Testimonial'}</h2>
            </div>
            {editingId && (
              <button className="utkal-testimonial-cancel-edit-btn" onClick={resetForm}>
                <FaTimes /> Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="utkal-testimonial-form">
            {/* Image Upload Row */}
            <div className="utkal-testimonial-form-group utkal-testimonial-upload-group">
              <label className="utkal-testimonial-label">Customer Photo</label>
              <div className="utkal-testimonial-upload-wrapper">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  style={{ display: 'none' }}
                />

                <div className="utkal-testimonial-preview-box">
                  {previewImage ? (
                    <img src={previewImage} alt="Customer Preview" className="utkal-testimonial-preview-img" />
                  ) : (
                    <FaUserCircle className="utkal-testimonial-placeholder-icon" />
                  )}
                </div>

                <div className="utkal-testimonial-upload-actions">
                  <button
                    type="button"
                    className="utkal-testimonial-upload-btn"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <FaUpload /> {previewImage ? 'Change Image' : 'Upload Image'}
                  </button>
                  {previewImage && (
                    <button
                      type="button"
                      className="utkal-testimonial-remove-img-btn"
                      onClick={handleRemoveImage}
                    >
                      <FaTrash /> Remove
                    </button>
                  )}
                  <span className="utkal-testimonial-upload-note">Recommended: Square JPG/PNG (Up to 2MB)</span>
                </div>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="utkal-testimonial-grid-3">
              {/* Customer Name */}
              <div className="utkal-testimonial-form-group">
                <label className="utkal-testimonial-label">Customer Name <span>*</span></label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="utkal-testimonial-input"
                />
              </div>

              {/* Designation */}
              <div className="utkal-testimonial-form-group">
                <label className="utkal-testimonial-label">Designation <span>*</span></label>
                <input
                  type="text"
                  name="designation"
                  required
                  placeholder="e.g. IT Professional / Business Owner"
                  value={formData.designation}
                  onChange={handleInputChange}
                  className="utkal-testimonial-input"
                />
              </div>

              {/* Location */}
              <div className="utkal-testimonial-form-group">
                <label className="utkal-testimonial-label">Location <span>*</span></label>
                <input
                  type="text"
                  name="location"
                  required
                  placeholder="e.g. Bhubaneswar, Odisha"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="utkal-testimonial-input"
                />
              </div>
            </div>

            {/* Rating & Status Grid */}
            <div className="utkal-testimonial-grid-2">
              {/* Rating Dropdown */}
              <div className="utkal-testimonial-form-group">
                <label className="utkal-testimonial-label">Rating <span>*</span></label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="utkal-testimonial-select"
                >
                  <option value={5}>★★★★★ (5 Stars)</option>
                  <option value={4}>★★★★☆ (4 Stars)</option>
                  <option value={3}>★★★☆☆ (3 Stars)</option>
                  <option value={2}>★★☆☆☆ (2 Stars)</option>
                  <option value={1}>★☆☆☆☆ (1 Star)</option>
                </select>
              </div>

              {/* Status Dropdown */}
              <div className="utkal-testimonial-form-group">
                <label className="utkal-testimonial-label">Status <span>*</span></label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="utkal-testimonial-select"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Testimonial Description */}
            <div className="utkal-testimonial-form-group">
              <label className="utkal-testimonial-label">Testimonial Description <span>*</span></label>
              <textarea
                name="description"
                rows="4"
                required
                placeholder="Write the customer testimonial here..."
                value={formData.description}
                onChange={handleInputChange}
                className="utkal-testimonial-textarea"
              ></textarea>
            </div>

            {/* Submit Action Buttons */}
            <div className="utkal-testimonial-form-footer">
              <button type="button" className="utkal-testimonial-cancel-btn" onClick={resetForm}>
                Cancel
              </button>
              <button type="submit" className="utkal-testimonial-submit-btn">
                <FaPlus /> {editingId ? 'Update Testimonial' : 'Save Testimonial'}
              </button>
            </div>
          </form>
        </div>

        {/* ---------------- LIST TABLE SECTION ---------------- */}
        <div className="utkal-testimonial-table-card">
          <div className="utkal-testimonial-table-header">
            <h3>Testimonials List ({testimonials.length})</h3>
          </div>

          <div className="utkal-testimonial-table-responsive">
            <table className="utkal-testimonial-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Location</th>
                  <th>Rating</th>
                  <th>Status</th>
                  <th>Testimonial</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.length > 0 ? (
                  testimonials.map((item) => (
                    <tr key={item.id}>
                      {/* Customer Info */}
                      <td>
                        <div className="utkal-testimonial-user-cell">
                          <img
                            src={item.photo}
                            alt={item.name}
                            className="utkal-testimonial-avatar-cell"
                          />
                          <div>
                            <span className="utkal-testimonial-name-cell">{item.name}</span>
                            <span className="utkal-testimonial-role-cell">{item.designation}</span>
                          </div>
                        </div>
                      </td>

                      {/* Location */}
                      <td>
                        <span className="utkal-testimonial-loc-cell">{item.location}</span>
                      </td>

                      {/* Rating */}
                      <td>
                        <div className="utkal-testimonial-stars-cell">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={i < item.rating ? 'star-gold' : 'star-gray'}
                            />
                          ))}
                        </div>
                      </td>

                      {/* Status */}
                      <td>
                        <span className={`utkal-testimonial-status-badge ${item.status.toLowerCase()}`}>
                          {item.status}
                        </span>
                      </td>

                      {/* Description Preview */}
                      <td>
                        <p className="utkal-testimonial-desc-cell">{item.description}</p>
                      </td>

                      {/* Actions */}
                      <td>
                        <div className="utkal-testimonial-actions-cell">
                          <button
                            className="utkal-action-btn view-btn"
                            title="View Testimonial"
                            onClick={() => setViewingTestimonial(item)}
                          >
                            <FaEye />
                          </button>
                          <button
                            className="utkal-action-btn edit-btn"
                            title="Edit Testimonial"
                            onClick={() => handleEdit(item)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="utkal-action-btn delete-btn"
                            title="Delete Testimonial"
                            onClick={() => handleDelete(item.id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="utkal-testimonial-empty-td">
                      No testimonials found. Add your first testimonial above!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ---------------- VIEW MODAL ---------------- */}
        {viewingTestimonial && (
          <div className="utkal-testimonial-modal-overlay" onClick={() => setViewingTestimonial(null)}>
            <div className="utkal-testimonial-modal-card" onClick={(e) => e.stopPropagation()}>
              <button
                className="utkal-testimonial-modal-close"
                onClick={() => setViewingTestimonial(null)}
              >
                <FaTimes />
              </button>

              <div className="utkal-testimonial-modal-header">
                <FaQuoteLeft className="utkal-testimonial-modal-quote-icon" />
                <img
                  src={viewingTestimonial.photo}
                  alt={viewingTestimonial.name}
                  className="utkal-testimonial-modal-avatar"
                />
                <h3>{viewingTestimonial.name}</h3>
                <p className="utkal-testimonial-modal-sub">{viewingTestimonial.designation} • {viewingTestimonial.location}</p>
                <div className="utkal-testimonial-stars-cell">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < viewingTestimonial.rating ? 'star-gold' : 'star-gray'} />
                  ))}
                </div>
              </div>

              <div className="utkal-testimonial-modal-body">
                <p>"{viewingTestimonial.description}"</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Testimonial;