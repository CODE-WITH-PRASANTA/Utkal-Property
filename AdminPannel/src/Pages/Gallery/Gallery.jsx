import React, { useState, useEffect, useRef } from 'react';
import './Gallery.css';
import API, { IMG_URL } from '../../api/axios'; // Adjust relative import path if needed

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

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [viewingImage, setViewingImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [brokenImages, setBrokenImages] = useState({});
  const fileInputRef = useRef(null);

  /**
   * Universal Image URL Resolver
   * Resolves absolute backend server paths for static files (/uploads/gallery/filename.webp)
   */
  const getImageUrl = (photoPath) => {
    if (!photoPath) return '';
    
    // 1. Direct Blob previews or absolute web URLs
    if (photoPath.startsWith('http://') || photoPath.startsWith('https://') || photoPath.startsWith('blob:')) {
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

  // Fetch all gallery items from API
  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const response = await API.get('/gallery');
      let data = [];

      if (response.data && response.data.data) {
        data = response.data.data;
      } else if (Array.isArray(response.data)) {
        data = response.data;
      }

      setGalleryItems(data);
    } catch (error) {
      console.error('Error fetching gallery assets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  // Track broken images
  const handleImageError = (id) => {
    setBrokenImages((prev) => ({ ...prev, [id]: true }));
  };

  // Process selected file for local preview
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

  // Remove Selected Image Preview & Reset State
  const handleRemovePreview = () => {
    if (previewImage && previewImage.startsWith('blob:')) {
      URL.revokeObjectURL(previewImage);
    }
    setPreviewImage(null);
    setSelectedFile(null);
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Submit Handler (Create or Update API calls)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile && !editingId) {
      alert('Please select or drag & drop an image file.');
      return;
    }

    const formData = new FormData();
    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    try {
      let response;
      if (editingId) {
        // PUT: Update existing gallery asset
        response = await API.put(`/gallery/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        // POST: Create new gallery asset
        response = await API.post('/gallery', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      if (response.status === 200 || response.status === 201) {
        await fetchGalleryItems();
        handleRemovePreview();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(error.response?.data?.message || 'Failed to save image asset.');
    }
  };

  // Trigger Edit Action
  const handleEdit = (item) => {
    const itemId = item._id || item.id;
    setEditingId(itemId);
    setPreviewImage(getImageUrl(item.image));
    setSelectedFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Trigger Delete Action
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this gallery item?')) {
      try {
        const response = await API.delete(`/gallery/${id}`);
        if (response.status === 200) {
          setGalleryItems((prev) => prev.filter((item) => (item._id || item.id) !== id));
          if (editingId === id) handleRemovePreview();
        }
      } catch (error) {
        console.error('Error deleting gallery item:', error);
        alert(error.response?.data?.message || 'Failed to delete gallery item.');
      }
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
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
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
                    fileInputRef.current && fileInputRef.current.click();
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
                {loading ? (
                  <tr>
                    <td colSpan="2" className="utkal-gallery-empty-td">
                      Loading gallery assets...
                    </td>
                  </tr>
                ) : galleryItems.length > 0 ? (
                  galleryItems.map((item) => {
                    const itemId = item._id || item.id;
                    const imageUrl = getImageUrl(item.image);
                    const isBroken = brokenImages[itemId];

                    return (
                      <tr key={itemId}>
                        {/* Image Thumbnail */}
                        <td>
                          <div className="utkal-gallery-thumb-wrap">
                            {!isBroken ? (
                              <img
                                src={imageUrl}
                                alt="Gallery item"
                                onError={() => handleImageError(itemId)}
                              />
                            ) : (
                              <div className="utkal-gallery-broken-placeholder">
                                <FaImage />
                                <span>Image Unavailable</span>
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Actions Column */}
                        <td>
                          <div className="utkal-gallery-actions-cell">
                            <button
                              className="utkal-action-btn view-btn"
                              title="View Image"
                              onClick={() => setViewingImage(imageUrl)}
                              disabled={isBroken}
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
                              onClick={() => handleDelete(itemId)}
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
                <img src={viewingImage} alt="Full view" />
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Gallery;