import React, { useState, useEffect, useRef } from 'react';
import './OurTeam.css';
import API, { IMG_URL } from '../../api/axios'; // Adjust relative import path if needed

// React Icons
import {
  FaCloudUploadAlt,
  FaTrash,
  FaEdit,
  FaEye,
  FaTimes,
  FaPlus,
  FaUserCircle,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaImage
} from 'react-icons/fa';

const OurTeam = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [viewingMember, setViewingMember] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [brokenImages, setBrokenImages] = useState({});

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    designation: '',
    email: '',
    phone: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    displayOrder: 1,
    status: 'Active'
  });

  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  /**
   * Universal Image URL Resolver
   * Resolves absolute backend server paths for static WebP files (/uploads/team/filename.webp)
   */
  const getImageUrl = (photoPath) => {
    if (!photoPath) return '';

    // 1. Direct Blob previews or absolute web URLs
    if (
      photoPath.startsWith('http://') ||
      photoPath.startsWith('https://') ||
      photoPath.startsWith('blob:')
    ) {
      return photoPath;
    }

    // 2. Normalize Windows backslashes
    let clean = photoPath.replace(/\\/g, '/');

    // 3. Isolate path starting from uploads/
    const uploadsIndex = clean.indexOf('uploads/');
    if (uploadsIndex !== -1) {
      clean = '/' + clean.substring(uploadsIndex);
    } else {
      clean = clean.startsWith('/') ? clean : `/${clean}`;
    }

    // 4. Attach base URL safely without double slashes
    const baseUrl = (IMG_URL || 'http://localhost:5000').replace(/\/+$/, '');
    return `${baseUrl}${clean}`;
  };

  // Fetch Team Members from API
  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await API.get('/team');
      let data = [];

      if (response.data && response.data.data) {
        data = response.data.data;
      } else if (Array.isArray(response.data)) {
        data = response.data;
      }

      setTeamMembers(data);
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  // Track broken images
  const handleImageError = (id) => {
    setBrokenImages((prev) => ({ ...prev, [id]: true }));
  };

  // Input Change Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Process File Upload
  const processFile = (file) => {
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit. Please upload a smaller image.');
        return;
      }
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
    }
  };

  // Handle File Input Change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  // Drag and Drop Handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  // Remove Selected Image
  const handleRemoveImage = () => {
    if (previewImage && previewImage.startsWith('blob:')) {
      URL.revokeObjectURL(previewImage);
    }
    setPreviewImage(null);
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Reset Form
  const resetForm = () => {
    setFormData({
      fullName: '',
      designation: '',
      email: '',
      phone: '',
      facebook: '',
      twitter: '',
      linkedin: '',
      displayOrder: 1,
      status: 'Active'
    });
    handleRemoveImage();
    setEditingId(null);
  };

  // Submit Handler (Create or Update API calls)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile && !editingId) {
      alert('Please select or drag & drop a profile photo.');
      return;
    }

    const payload = new FormData();
    payload.append('fullName', formData.fullName);
    payload.append('designation', formData.designation);
    payload.append('email', formData.email);
    payload.append('phone', formData.phone);
    payload.append('facebook', formData.facebook);
    payload.append('twitter', formData.twitter);
    payload.append('linkedin', formData.linkedin);
    payload.append('displayOrder', formData.displayOrder);
    payload.append('status', formData.status);

    if (selectedFile) {
      payload.append('photo', selectedFile);
    }

    try {
      let response;
      if (editingId) {
        // PUT: Update team member
        response = await API.put(`/team/${editingId}`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        // POST: Create team member
        response = await API.post('/team', payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      if (response.status === 200 || response.status === 201) {
        await fetchTeamMembers();
        resetForm();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(error.response?.data?.message || 'Failed to save team member.');
    }
  };

  // Trigger Edit Action
  const handleEdit = (item) => {
    const itemId = item._id || item.id;
    setEditingId(itemId);
    setFormData({
      fullName: item.fullName || '',
      designation: item.designation || '',
      email: item.email || '',
      phone: item.phone || '',
      facebook: item.facebook || '',
      twitter: item.twitter || '',
      linkedin: item.linkedin || '',
      displayOrder: item.displayOrder || 1,
      status: item.status || 'Active'
    });
    setPreviewImage(getImageUrl(item.photo));
    setSelectedFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Trigger Delete Action
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        const response = await API.delete(`/team/${id}`);
        if (response.status === 200) {
          setTeamMembers((prev) =>
            prev.filter((item) => (item._id || item.id) !== id)
          );
          if (editingId === id) resetForm();
        }
      } catch (error) {
        console.error('Error deleting team member:', error);
        alert(error.response?.data?.message || 'Failed to delete team member.');
      }
    }
  };

  return (
    <section className="utkal-team-section">
      <div className="utkal-team-container">
        {/* Page Header */}
        <div className="utkal-team-header">
          <span className="utkal-team-tag">Our Team</span>
          <h1 className="utkal-team-title">Team Member Management</h1>
          <p className="utkal-team-subtitle">
            Add, update, and manage expert property consultants representing Utkal Property.
          </p>
        </div>

        {/* ---------------- ADD / EDIT FORM CARD ---------------- */}
        <div className="utkal-team-form-card">
          <div className="utkal-team-form-header">
            <div className="utkal-team-form-title-wrap">
              <span className="utkal-team-form-indicator"></span>
              <h2>{editingId ? 'Edit Team Member' : 'Add Team Member'}</h2>
            </div>
            {editingId && (
              <button
                className="utkal-team-cancel-edit-btn"
                onClick={resetForm}
              >
                <FaTimes /> Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="utkal-team-form">
            {/* Profile Photo Upload & Preview Row */}
            <div className="utkal-team-upload-row">
              {/* Dropzone */}
              <div className="utkal-team-upload-wrapper">
                <label className="utkal-team-label">
                  Profile Photo <span>*</span>
                </label>
                <div
                  className={`utkal-team-dropzone ${dragActive ? 'drag-active' : ''}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() =>
                    fileInputRef.current && fileInputRef.current.click()
                  }
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/jpeg, image/png, image/webp"
                    style={{ display: 'none' }}
                  />
                  <div className="utkal-team-dropzone-icon">
                    <FaCloudUploadAlt />
                  </div>
                  <p className="utkal-team-dropzone-text">
                    Drag & Drop or Browse
                  </p>
                  <span className="utkal-team-dropzone-note">
                    JPG • PNG • WEBP (Auto converted to WEBP)
                  </span>
                </div>
              </div>

              {/* Preview */}
              <div className="utkal-team-preview-wrapper">
                <span className="utkal-team-preview-label">Preview</span>
                <div className="utkal-team-preview-box">
                  {previewImage ? (
                    <div className="utkal-team-preview-content">
                      <img src={previewImage} alt="Team Member Preview" />
                      <button
                        type="button"
                        className="utkal-team-preview-remove"
                        onClick={handleRemoveImage}
                        title="Remove Image"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ) : (
                    <div className="utkal-team-preview-placeholder">
                      <FaUserCircle />
                      <span>Team Image</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <hr className="utkal-team-divider" />

            {/* Form Fields */}
            <div className="utkal-team-grid-2">
              {/* Full Name */}
              <div className="utkal-team-form-group">
                <label className="utkal-team-label">
                  Full Name <span>*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Rajesh Kumar Mohanty"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="utkal-team-input"
                />
              </div>

              {/* Designation */}
              <div className="utkal-team-form-group">
                <label className="utkal-team-label">
                  Designation <span>*</span>
                </label>
                <input
                  type="text"
                  name="designation"
                  required
                  placeholder="e.g. Property Advisor"
                  value={formData.designation}
                  onChange={handleInputChange}
                  className="utkal-team-input"
                />
              </div>
            </div>

            <div className="utkal-team-grid-2">
              {/* Email */}
              <div className="utkal-team-form-group">
                <label className="utkal-team-label">
                  Email <span>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="e.g. rajesh.utkalproperty@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="utkal-team-input"
                />
              </div>

              {/* Phone Number */}
              <div className="utkal-team-form-group">
                <label className="utkal-team-label">
                  Phone Number <span>*</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  required
                  placeholder="e.g. +91-98615-66735"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="utkal-team-input"
                />
              </div>
            </div>

            {/* Social Links Row */}
            <div className="utkal-team-grid-3">
              <div className="utkal-team-form-group">
                <label className="utkal-team-label">Facebook Link</label>
                <input
                  type="url"
                  name="facebook"
                  placeholder="https://facebook.com/..."
                  value={formData.facebook}
                  onChange={handleInputChange}
                  className="utkal-team-input"
                />
              </div>

              <div className="utkal-team-form-group">
                <label className="utkal-team-label">Twitter Link</label>
                <input
                  type="url"
                  name="twitter"
                  placeholder="https://twitter.com/..."
                  value={formData.twitter}
                  onChange={handleInputChange}
                  className="utkal-team-input"
                />
              </div>

              <div className="utkal-team-form-group">
                <label className="utkal-team-label">LinkedIn Link</label>
                <input
                  type="url"
                  name="linkedin"
                  placeholder="https://linkedin.com/in/..."
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  className="utkal-team-input"
                />
              </div>
            </div>

            {/* Order & Status Row */}
            <div className="utkal-team-grid-2">
              <div className="utkal-team-form-group">
                <label className="utkal-team-label">Display Order</label>
                <input
                  type="number"
                  name="displayOrder"
                  min="1"
                  placeholder="1"
                  value={formData.displayOrder}
                  onChange={handleInputChange}
                  className="utkal-team-input"
                />
              </div>

              <div className="utkal-team-form-group">
                <label className="utkal-team-label">Status</label>
                <div className="utkal-team-radio-group">
                  <label className="utkal-team-radio">
                    <input
                      type="radio"
                      name="status"
                      value="Active"
                      checked={formData.status === 'Active'}
                      onChange={handleInputChange}
                    />
                    <span>Active</span>
                  </label>
                  <label className="utkal-team-radio">
                    <input
                      type="radio"
                      name="status"
                      value="Inactive"
                      checked={formData.status === 'Inactive'}
                      onChange={handleInputChange}
                    />
                    <span>Inactive</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Action Buttons */}
            <div className="utkal-team-form-footer">
              <button
                type="button"
                className="utkal-team-cancel-btn"
                onClick={resetForm}
              >
                Cancel
              </button>
              <button type="submit" className="utkal-team-submit-btn">
                {editingId ? <FaEdit /> : <FaPlus />}{' '}
                {editingId ? 'Update Team Member' : 'Save Team Member'}
              </button>
            </div>
          </form>
        </div>

        {/* ---------------- TEAM LIST TABLE CARD ---------------- */}
        <div className="utkal-team-table-card">
          <div className="utkal-team-table-header">
            <h3>Team Members List ({teamMembers.length})</h3>
          </div>

          <div className="utkal-team-table-responsive">
            <table className="utkal-team-table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="utkal-team-empty-td">
                      Loading team members...
                    </td>
                  </tr>
                ) : teamMembers.length > 0 ? (
                  teamMembers.map((member) => {
                    const memberId = member._id || member.id;
                    const photoUrl = getImageUrl(member.photo);
                    const isBroken = brokenImages[memberId];

                    return (
                      <tr key={memberId}>
                        {/* Photo */}
                        <td>
                          <div className="utkal-team-avatar-cell">
                            {!isBroken ? (
                              <img
                                src={photoUrl}
                                alt={member.fullName}
                                onError={() => handleImageError(memberId)}
                              />
                            ) : (
                              <div className="utkal-team-broken-placeholder">
                                <FaUserCircle />
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Name */}
                        <td>
                          <span className="utkal-team-name-cell">
                            {member.fullName}
                          </span>
                        </td>

                        {/* Designation */}
                        <td>
                          <span className="utkal-team-role-cell">
                            {member.designation}
                          </span>
                        </td>

                        {/* Email */}
                        <td>
                          <span className="utkal-team-email-cell">
                            {member.email}
                          </span>
                        </td>

                        {/* Phone */}
                        <td>
                          <span className="utkal-team-phone-cell">
                            {member.phone}
                          </span>
                        </td>

                        {/* Status */}
                        <td>
                          <span
                            className={`utkal-team-status-badge ${member.status?.toLowerCase()}`}
                          >
                            {member.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td>
                          <div className="utkal-team-actions-cell">
                            <button
                              className="utkal-action-btn view-btn"
                              title="View Member Details"
                              onClick={() => setViewingMember(member)}
                            >
                              <FaEye />
                            </button>
                            <button
                              className="utkal-action-btn edit-btn"
                              title="Edit Member"
                              onClick={() => handleEdit(member)}
                            >
                              <FaEdit />
                            </button>
                            <button
                              className="utkal-action-btn delete-btn"
                              title="Delete Member"
                              onClick={() => handleDelete(memberId)}
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
                    <td colSpan="7" className="utkal-team-empty-td">
                      No team members found. Add your first team member above!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ---------------- MEMBER VIEW LIGHTBOX MODAL ---------------- */}
        {viewingMember && (
          <div
            className="utkal-team-modal-overlay"
            onClick={() => setViewingMember(null)}
          >
            <div
              className="utkal-team-modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="utkal-team-modal-close"
                onClick={() => setViewingMember(null)}
              >
                <FaTimes />
              </button>

              <div className="utkal-team-modal-header">
                <img
                  src={getImageUrl(viewingMember.photo)}
                  alt={viewingMember.fullName}
                  className="utkal-team-modal-avatar"
                />
                <h3>{viewingMember.fullName}</h3>
                <p className="utkal-team-modal-role">
                  {viewingMember.designation}
                </p>
                <span
                  className={`utkal-team-status-badge ${viewingMember.status?.toLowerCase()}`}
                >
                  {viewingMember.status}
                </span>
              </div>

              <div className="utkal-team-modal-body">
                <div className="utkal-team-modal-info-row">
                  <FaEnvelope /> <span>{viewingMember.email}</span>
                </div>
                <div className="utkal-team-modal-info-row">
                  <FaPhoneAlt /> <span>{viewingMember.phone}</span>
                </div>

                <div className="utkal-team-modal-socials">
                  {viewingMember.facebook && (
                    <a
                      href={viewingMember.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="utkal-team-modal-social-btn"
                    >
                      <FaFacebookF />
                    </a>
                  )}
                  {viewingMember.twitter && (
                    <a
                      href={viewingMember.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="utkal-team-modal-social-btn"
                    >
                      <FaTwitter />
                    </a>
                  )}
                  {viewingMember.linkedin && (
                    <a
                      href={viewingMember.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="utkal-team-modal-social-btn"
                    >
                      <FaLinkedinIn />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OurTeam;