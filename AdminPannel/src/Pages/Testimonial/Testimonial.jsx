import React, { useState, useEffect, useRef } from 'react';
import './Testimonial.css';
import API, { IMG_URL } from "../../api/axios";

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

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [existingPhotoPath, setExistingPhotoPath] = useState('');
  const [viewingTestimonial, setViewingTestimonial] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [brokenImages, setBrokenImages] = useState({});

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    location: '',
    rating: 5,
    status: 'Active',
    description: '',
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  /**
   * Helper: Extracts photo path from item
   */
  const getItemPhoto = (item) => {
    if (!item) return null;
    return item.photo || item.image || item.photoPath || item.avatar || null;
  };

  /**
   * Clean, reliable image URL resolver
   * Resolves absolute server path for static files (e.g., http://localhost:5000/uploads/gallery/xxx.webp)
   */
  const getImageUrl = (photoPath) => {
    if (!photoPath) return null;

    // 1. Direct Blob previews or absolute web URLs
    if (photoPath.startsWith('http://') || photoPath.startsWith('https://') || photoPath.startsWith('blob:')) {
      return photoPath;
    }

    // 2. Standardize backslashes to forward slashes
    let clean = photoPath.replace(/\\/g, '/');

    // 3. Extract relative path starting from "uploads/"
    const uploadsIndex = clean.toLowerCase().indexOf('uploads/');
    if (uploadsIndex !== -1) {
      clean = '/' + clean.substring(uploadsIndex);
    } else {
      clean = clean.startsWith('/') ? clean : `/${clean}`;
    }

    // 4. Sanitize multiple consecutive leading slashes
    clean = clean.replace(/^\/+/, '/');

    // 5. Prepend BASE_URL
    const baseUrl = (IMG_URL || 'http://localhost:5000').replace(/\/+$/, '');
    return `${baseUrl}${clean}`;
  };

  // Fetch Testimonials
  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const response = await API.get('/testimonials');
      if (response.data && response.data.data) {
        setTestimonials(response.data.data);
      } else if (Array.isArray(response.data)) {
        setTestimonials(response.data);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      alert(error.response?.data?.message || 'Failed to fetch testimonials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Form Change Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Image Upload Handler
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (previewImage && previewImage.startsWith('blob:')) {
        URL.revokeObjectURL(previewImage);
      }
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Remove Selected/Existing Image
  const handleRemoveImage = () => {
    if (previewImage && previewImage.startsWith('blob:')) {
      URL.revokeObjectURL(previewImage);
    }
    setSelectedFile(null);
    setPreviewImage(null);
    setExistingPhotoPath('');
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
    });
    handleRemoveImage();
    setEditingId(null);
  };

  // Form Submit Handler (Create / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('designation', formData.designation);
      data.append('location', formData.location);
      data.append('rating', formData.rating);
      data.append('status', formData.status);
      data.append('description', formData.description);

      // CRITICAL FIX: Only append 'photo' if a real File is selected!
      if (selectedFile) {
        data.append('photo', selectedFile);
      } else if (editingId && existingPhotoPath) {
        data.append('existingPhoto', existingPhotoPath);
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      if (editingId) {
        await API.put(`/testimonials/${editingId}`, data, config);
        alert('Testimonial updated successfully!');
      } else {
        await API.post('/testimonials', data, config);
        alert('Testimonial created successfully!');
      }

      resetForm();
      fetchTestimonials();
    } catch (error) {
      console.error('Error saving testimonial:', error);
      alert(error.response?.data?.message || 'Failed to save testimonial');
    } finally {
      setSubmitting(false);
    }
  };

  // Populate Form for Editing
  const handleEdit = (item) => {
    const id = item._id || item.id;
    const photo = getItemPhoto(item);

    setEditingId(id);
    setFormData({
      name: item.name || '',
      designation: item.designation || '',
      location: item.location || '',
      rating: item.rating || 5,
      status: item.status || 'Active',
      description: item.description || '',
    });

    setSelectedFile(null);
    setExistingPhotoPath(photo || '');
    setPreviewImage(getImageUrl(photo));

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete Action
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await API.delete(`/testimonials/${id}`);
        alert('Testimonial deleted successfully');
        if (editingId === id) resetForm();
        fetchTestimonials();
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        alert(error.response?.data?.message || 'Failed to delete testimonial');
      }
    }
  };

  const handleImageError = (id) => {
    setBrokenImages((prev) => ({ ...prev, [id]: true }));
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
                    <img
                      src={previewImage}
                      alt="Customer Preview"
                      className="utkal-testimonial-preview-img"
                      onError={() => setPreviewImage(null)}
                    />
                  ) : (
                    <FaUserCircle className="utkal-testimonial-placeholder-icon" />
                  )}
                </div>

                <div className="utkal-testimonial-upload-actions">
                  <button
                    type="button"
                    className="utkal-testimonial-upload-btn"
                    onClick={() => fileInputRef.current?.click()}
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
                  <span className="utkal-testimonial-upload-note">Recommended: Square JPG/PNG/WEBP (Up to 5MB)</span>
                </div>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="utkal-testimonial-grid-3">
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
              <button type="submit" className="utkal-testimonial-submit-btn" disabled={submitting}>
                <FaPlus /> {submitting ? 'Saving...' : editingId ? 'Update Testimonial' : 'Save Testimonial'}
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
                {loading ? (
                  <tr>
                    <td colSpan="6" className="utkal-testimonial-empty-td">
                      Loading testimonials...
                    </td>
                  </tr>
                ) : testimonials.length > 0 ? (
                  testimonials.map((item) => {
                    const id = item._id || item.id;
                    const rawPhotoPath = getItemPhoto(item);
                    const avatarSrc = getImageUrl(rawPhotoPath);
                    const isImageBroken = brokenImages[id];

                    return (
                      <tr key={id}>
                        {/* Customer Info */}
                        <td>
                          <div className="utkal-testimonial-user-cell">
                            {avatarSrc && !isImageBroken ? (
                              <img
                                src={avatarSrc}
                                alt={item.name}
                                className="utkal-testimonial-avatar-cell"
                                onError={() => handleImageError(id)}
                              />
                            ) : (
                              <FaUserCircle className="utkal-testimonial-avatar-cell placeholder" />
                            )}
                            <div>
                              <span className="utkal-testimonial-name-cell">{item.name}</span>
                              <span className="utkal-testimonial-role-cell">{item.designation}</span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span className="utkal-testimonial-loc-cell">{item.location}</span>
                        </td>

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

                        <td>
                          <span className={`utkal-testimonial-status-badge ${item.status ? item.status.toLowerCase() : 'active'}`}>
                            {item.status}
                          </span>
                        </td>

                        <td>
                          <p className="utkal-testimonial-desc-cell">{item.description}</p>
                        </td>

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
                              onClick={() => handleDelete(id)}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
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
                {getItemPhoto(viewingTestimonial) && !brokenImages[viewingTestimonial._id || viewingTestimonial.id] ? (
                  <img
                    src={getImageUrl(getItemPhoto(viewingTestimonial))}
                    alt={viewingTestimonial.name}
                    className="utkal-testimonial-modal-avatar"
                    onError={() => handleImageError(viewingTestimonial._id || viewingTestimonial.id)}
                  />
                ) : (
                  <FaUserCircle className="utkal-testimonial-modal-avatar placeholder" />
                )}
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