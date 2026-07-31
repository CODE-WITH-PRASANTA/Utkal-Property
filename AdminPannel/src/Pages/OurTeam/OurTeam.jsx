import React, { useState, useRef } from 'react';
import './OurTeam.css';

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
  FaEnvelope
} from 'react-icons/fa';

const INITIAL_TEAM = [
  {
    id: 1,
    fullName: 'Rajesh Kumar Mohanty',
    designation: 'Property Advisor',
    email: 'rajesh.utkalproperty@gmail.com',
    phone: '+91-98615-66735',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
    displayOrder: 1,
    status: 'Active',
    photo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 2,
    fullName: 'Priyanka Das',
    designation: 'Residential Specialist',
    email: 'priyanka.das@gmail.com',
    phone: '+91-98615-66735',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
    displayOrder: 2,
    status: 'Active',
    photo: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 3,
    fullName: 'Santosh Kumar Jena',
    designation: 'Commercial Consultant',
    email: 'santosh.jena@gmail.com',
    phone: '+91-98615-66735',
    facebook: '',
    twitter: '',
    linkedin: 'https://linkedin.com',
    displayOrder: 3,
    status: 'Inactive',
    photo: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];

const OurTeam = () => {
  const [teamMembers, setTeamMembers] = useState(INITIAL_TEAM);
  const [editingId, setEditingId] = useState(null);
  const [viewingMember, setViewingMember] = useState(null);
  const [dragActive, setDragActive] = useState(false);

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
    status: 'Active',
    photo: null
  });

  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  // Input Change Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Process File Upload
  const processFile = (file) => {
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size exceeds 2MB limit. Please upload a smaller image.');
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, photo: imageUrl }));
      setPreviewImage(imageUrl);
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
    setPreviewImage(null);
    setFormData((prev) => ({ ...prev, photo: null }));
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
      status: 'Active',
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
      setTeamMembers((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? { ...item, ...formData, photo: previewImage || item.photo }
            : item
        )
      );
    } else {
      const newItem = {
        id: Date.now(),
        ...formData,
        photo:
          previewImage ||
          'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300'
      };
      setTeamMembers((prev) => [newItem, ...prev]);
    }

    resetForm();
  };

  // Edit Action
  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      fullName: item.fullName,
      designation: item.designation,
      email: item.email,
      phone: item.phone,
      facebook: item.facebook || '',
      twitter: item.twitter || '',
      linkedin: item.linkedin || '',
      displayOrder: item.displayOrder || 1,
      status: item.status,
      photo: item.photo
    });
    setPreviewImage(item.photo);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete Action
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      setTeamMembers((prev) => prev.filter((item) => item.id !== id));
      if (editingId === id) resetForm();
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
              <button className="utkal-team-cancel-edit-btn" onClick={resetForm}>
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
                  onClick={() => fileInputRef.current.click()}
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
                    JPG • PNG • WEBP (Max Size 2MB)
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

              {/* Designation Text Input Box */}
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
                {teamMembers.length > 0 ? (
                  teamMembers.map((member) => (
                    <tr key={member.id}>
                      {/* Photo */}
                      <td>
                        <div className="utkal-team-avatar-cell">
                          <img src={member.photo} alt={member.fullName} />
                        </div>
                      </td>

                      {/* Name */}
                      <td>
                        <span className="utkal-team-name-cell">{member.fullName}</span>
                      </td>

                      {/* Designation */}
                      <td>
                        <span className="utkal-team-role-cell">{member.designation}</span>
                      </td>

                      {/* Email */}
                      <td>
                        <span className="utkal-team-email-cell">{member.email}</span>
                      </td>

                      {/* Phone */}
                      <td>
                        <span className="utkal-team-phone-cell">{member.phone}</span>
                      </td>

                      {/* Status */}
                      <td>
                        <span
                          className={`utkal-team-status-badge ${member.status.toLowerCase()}`}
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
                            onClick={() => handleDelete(member.id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
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
                  src={viewingMember.photo}
                  alt={viewingMember.fullName}
                  className="utkal-team-modal-avatar"
                />
                <h3>{viewingMember.fullName}</h3>
                <p className="utkal-team-modal-role">{viewingMember.designation}</p>
                <span
                  className={`utkal-team-status-badge ${viewingMember.status.toLowerCase()}`}
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