import React, { useState, useRef } from 'react';
import './Gallery.css';

// React Icons
import {
  FaCloudUploadAlt,
  FaTrash,
  FaEdit,
  FaEye,
  FaTimes,
  FaPlus,
  FaImage
} from 'react-icons/fa';

const INITIAL_GALLERY = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=400&q=80'
  }
];

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState(INITIAL_GALLERY);
  const [editingId, setEditingId] = useState(null);
  const [viewingImage, setViewingImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  // Process File Upload
  const processFile = (file) => {
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit. Please upload a smaller image.');
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  // Handle Manual File Input
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

  // Remove Selected Image Preview
  const handleRemovePreview = () => {
    setPreviewImage(null);
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Submit Handler (Add / Update)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!previewImage) {
      alert('Please select or drag & drop an image.');
      return;
    }

    if (editingId) {
      // Update existing item
      setGalleryItems((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, image: previewImage } : item
        )
      );
    } else {
      // Add new item
      const newItem = {
        id: Date.now(),
        image: previewImage
      };
      setGalleryItems((prev) => [newItem, ...prev]);
    }

    handleRemovePreview();
  };

  // Edit Action
  const handleEdit = (item) => {
    setEditingId(item.id);
    setPreviewImage(item.image);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete Action
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this gallery item?')) {
      setGalleryItems((prev) => prev.filter((item) => item.id !== id));
      if (editingId === id) handleRemovePreview();
    }
  };

  return (
    <section className="utkal-gallery-section">
      <div className="utkal-gallery-container">
        
        {/* Header Section */}
        <div className="utkal-gallery-header">
          <span className="utkal-gallery-tag">Media Manager</span>
          <h1 className="utkal-gallery-title">Property Gallery Management</h1>
          <p className="utkal-gallery-subtitle">
            Upload and manage property photos for Utkal Property.
          </p>
        </div>

        {/* ---------------- UPLOAD & FORM CARD ---------------- */}
        <div className="utkal-gallery-form-card">
          <div className="utkal-gallery-form-header">
            <div className="utkal-gallery-form-title-wrap">
              <span className="utkal-gallery-form-indicator"></span>
              <h2>{editingId ? 'Edit Media Image' : 'Upload New Media'}</h2>
            </div>
            {editingId && (
              <button className="utkal-gallery-cancel-edit-btn" onClick={handleRemovePreview}>
                <FaTimes /> Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="utkal-gallery-form">
            
            {/* Upload Zone & Preview Split Container */}
            <div className="utkal-gallery-upload-row">
              
              {/* Drag & Drop Box */}
              <div
                className={`utkal-gallery-dropzone ${dragActive ? 'drag-active' : ''}`}
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

                <div className="utkal-gallery-dropzone-icon">
                  <FaCloudUploadAlt />
                </div>
                <p className="utkal-gallery-dropzone-text">
                  Drag & Drop Image Here
                </p>
                <span className="utkal-gallery-or">OR</span>
                <button
                  type="button"
                  className="utkal-gallery-choose-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current.click();
                  }}
                >
                  Choose Image
                </button>

                <div className="utkal-gallery-dropzone-footer">
                  <span>JPG • PNG • WEBP</span>
                  <span>Max Size : 5MB</span>
                </div>
              </div>

              {/* Preview Box */}
              <div className="utkal-gallery-preview-wrapper">
                <span className="utkal-gallery-preview-label">Preview</span>
                <div className="utkal-gallery-preview-box">
                  {previewImage ? (
                    <div className="utkal-gallery-preview-content">
                      <img src={previewImage} alt="Uploaded preview" />
                      <button
                        type="button"
                        className="utkal-gallery-preview-remove"
                        onClick={handleRemovePreview}
                        title="Remove Image"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ) : (
                    <div className="utkal-gallery-preview-placeholder">
                      <FaImage />
                      <span>Image Preview Area</span>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Form Footer Action Buttons */}
            <div className="utkal-gallery-form-footer">
              <button
                type="button"
                className="utkal-gallery-cancel-btn"
                onClick={handleRemovePreview}
              >
                Cancel
              </button>
              <button type="submit" className="utkal-gallery-submit-btn">
                {editingId ? <FaEdit /> : <FaPlus />} {editingId ? 'Update Image' : 'Save Image'}
              </button>
            </div>

          </form>
        </div>

        {/* ---------------- LIST TABLE CARD ---------------- */}
        <div className="utkal-gallery-table-card">
          <div className="utkal-gallery-table-header">
            <h3>Gallery Assets List ({galleryItems.length})</h3>
          </div>

          <div className="utkal-gallery-table-responsive">
            <table className="utkal-gallery-table">
              <thead>
                <tr>
                  <th>Media Thumbnail</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {galleryItems.length > 0 ? (
                  galleryItems.map((item) => (
                    <tr key={item.id}>
                      {/* Image Thumbnail */}
                      <td>
                        <div className="utkal-gallery-thumb-wrap">
                          <img src={item.image} alt="Gallery item" />
                        </div>
                      </td>

                      {/* Actions Column with View, Edit & Delete */}
                      <td>
                        <div className="utkal-gallery-actions-cell">
                          <button
                            className="utkal-action-btn view-btn"
                            title="View Image"
                            onClick={() => setViewingImage(item)}
                          >
                            <FaEye />
                          </button>
                          <button
                            className="utkal-action-btn edit-btn"
                            title="Edit Image"
                            onClick={() => handleEdit(item)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="utkal-action-btn delete-btn"
                            title="Delete Image"
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
                    <td colSpan="2" className="utkal-gallery-empty-td">
                      No gallery assets found. Upload your first image above!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ---------------- LIGHTBOX VIEW MODAL ---------------- */}
        {viewingImage && (
          <div className="utkal-gallery-modal-overlay" onClick={() => setViewingImage(null)}>
            <div className="utkal-gallery-modal-card" onClick={(e) => e.stopPropagation()}>
              <button
                className="utkal-gallery-modal-close"
                onClick={() => setViewingImage(null)}
              >
                <FaTimes />
              </button>

              <div className="utkal-gallery-modal-body">
                <img src={viewingImage.image} alt="Full view" />
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Gallery;