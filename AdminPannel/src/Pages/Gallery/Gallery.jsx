import React, { useEffect, useRef, useState } from "react";
import "./Gallery.css";
import API, { IMG_URL } from "../../api/axios";

import {
  FaCloudUploadAlt,
  FaTrash,
  FaEdit,
  FaEye,
  FaTimes,
  FaPlus,
  FaImage,
} from "react-icons/fa";

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

  // =====================================================
  // IMAGE URL RESOLVER
  // =====================================================

  const getImageUrl = (photoPath) => {
    if (!photoPath) return "";

    const value = String(photoPath).trim();

    // Blob URL
    if (value.startsWith("blob:")) {
      return value;
    }

    // Already absolute URL
    if (
      value.startsWith("http://") ||
      value.startsWith("https://")
    ) {
      return value;
    }

    // Normalize Windows path
    let cleanPath = value.replace(/\\/g, "/");

    // Find uploads folder
    const uploadsIndex = cleanPath.toLowerCase().indexOf("uploads/");

    if (uploadsIndex !== -1) {
      cleanPath = "/" + cleanPath.substring(uploadsIndex);
    } else {
      cleanPath = cleanPath.startsWith("/")
        ? cleanPath
        : `/${cleanPath}`;
    }

    // Remove duplicate slashes
    cleanPath = cleanPath.replace(/\/+/g, "/");

    // Base image URL
    let baseUrl = IMG_URL;

    if (!baseUrl) {
      baseUrl = "http://localhost:5000";
    }

    baseUrl = String(baseUrl).replace(/\/+$/, "");

    // If IMG_URL accidentally contains /api, remove it
    baseUrl = baseUrl.replace(/\/api$/, "");

    return `${baseUrl}${cleanPath}`;
  };

  // =====================================================
  // FETCH GALLERY
  // =====================================================

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);

      const response = await API.get("/gallery");

      let data = [];

      if (response.data?.data && Array.isArray(response.data.data)) {
        data = response.data.data;
      } else if (Array.isArray(response.data)) {
        data = response.data;
      }

      setGalleryItems(data);

      // Reset broken image states after fresh fetch
      setBrokenImages({});
    } catch (error) {
      console.error("Error fetching gallery assets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  // =====================================================
  // IMAGE ERROR
  // =====================================================

  const handleImageError = (id, url) => {
    console.error("Gallery image failed to load:", url);

    setBrokenImages((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  // =====================================================
  // PROCESS SELECTED FILE
  // =====================================================

  const processFile = (file) => {
    if (!file) return;

    // Check file type
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, JPEG, PNG and WEBP images are allowed.");
      return;
    }

    // 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert(
        "File size exceeds 5MB limit. Please upload a smaller image."
      );
      return;
    }

    // Remove previous blob URL
    if (previewImage && previewImage.startsWith("blob:")) {
      URL.revokeObjectURL(previewImage);
    }

    const objectUrl = URL.createObjectURL(file);

    setSelectedFile(file);
    setPreviewImage(objectUrl);
  };

  // =====================================================
  // FILE INPUT
  // =====================================================

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      processFile(file);
    }
  };

  // =====================================================
  // DRAG HANDLERS
  // =====================================================

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    }

    if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      processFile(file);
    }
  };

  // =====================================================
  // RESET FORM
  // =====================================================

  const handleRemovePreview = () => {
    if (previewImage && previewImage.startsWith("blob:")) {
      URL.revokeObjectURL(previewImage);
    }

    setPreviewImage(null);
    setSelectedFile(null);
    setEditingId(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // CREATE
    if (!editingId && !selectedFile) {
      alert("Please select or drag & drop an image file.");
      return;
    }

    // UPDATE
    if (editingId && !selectedFile) {
      alert("Please choose a new image to update.");
      return;
    }

    const formData = new FormData();

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      let response;

      if (editingId) {
        response = await API.put(
          `/gallery/${editingId}`,
          formData
        );
      } else {
        response = await API.post(
          "/gallery",
          formData
        );
      }

      if (
        response.status === 200 ||
        response.status === 201
      ) {
        alert(
          editingId
            ? "Gallery image updated successfully!"
            : "Gallery image uploaded successfully!"
        );

        await fetchGalleryItems();

        handleRemovePreview();
      }
    } catch (error) {
      console.error(
        "Gallery submit error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to save gallery image."
      );
    }
  };

  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (item) => {
    const itemId = item._id || item.id;

    const imageUrl = getImageUrl(item.image);

    setEditingId(itemId);
    setSelectedFile(null);
    setPreviewImage(imageUrl);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this gallery item?"
    );

    if (!confirmed) return;

    try {
      const response = await API.delete(
        `/gallery/${id}`
      );

      if (
        response.status === 200 ||
        response.status === 204
      ) {
        setGalleryItems((prev) =>
          prev.filter(
            (item) => (item._id || item.id) !== id
          )
        );

        if (editingId === id) {
          handleRemovePreview();
        }

        alert("Gallery image deleted successfully!");
      }
    } catch (error) {
      console.error(
        "Error deleting gallery item:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete gallery image."
      );
    }
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <section className="utkal-gallery-section">
      <div className="utkal-gallery-container">

        {/* HEADER */}
        <div className="utkal-gallery-header">
          <span className="utkal-gallery-tag">
            Media Manager
          </span>

          <h1 className="utkal-gallery-title">
            Property Gallery Management
          </h1>

          <p className="utkal-gallery-subtitle">
            Upload and manage property photos for Utkal Property.
          </p>
        </div>

        {/* =====================================================
            UPLOAD CARD
        ===================================================== */}

        <div className="utkal-gallery-form-card">

          <div className="utkal-gallery-form-header">
            <div className="utkal-gallery-form-title-wrap">
              <span className="utkal-gallery-form-indicator"></span>

              <h2>
                {editingId
                  ? "Edit Media Image"
                  : "Upload New Media"}
              </h2>
            </div>

            {editingId && (
              <button
                type="button"
                className="utkal-gallery-cancel-edit-btn"
                onClick={handleRemovePreview}
              >
                <FaTimes />
                Cancel Edit
              </button>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="utkal-gallery-form"
          >

            {/* UPLOAD ROW */}
            <div className="utkal-gallery-upload-row">

              {/* DROPZONE */}
              <div
                className={`utkal-gallery-dropzone ${
                  dragActive ? "drag-active" : ""
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() =>
                  fileInputRef.current?.click()
                }
              >

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                  style={{ display: "none" }}
                />

                <div className="utkal-gallery-dropzone-icon">
                  <FaCloudUploadAlt />
                </div>

                <p className="utkal-gallery-dropzone-text">
                  Drag & Drop Image Here
                </p>

                <span className="utkal-gallery-or">
                  OR
                </span>

                <button
                  type="button"
                  className="utkal-gallery-choose-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                >
                  Choose Image
                </button>

                <div className="utkal-gallery-dropzone-footer">
                  <span>JPG • PNG • WEBP</span>
                  <span>Max Size : 5MB</span>
                </div>

              </div>

              {/* PREVIEW */}
              <div className="utkal-gallery-preview-wrapper">

                <span className="utkal-gallery-preview-label">
                  Preview
                </span>

                <div className="utkal-gallery-preview-box">

                  {previewImage ? (
                    <div className="utkal-gallery-preview-content">

                      <img
                        src={previewImage}
                        alt="Gallery preview"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />

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

                      <span>
                        Image Preview Area
                      </span>
                    </div>
                  )}

                </div>
              </div>
            </div>

            {/* FOOTER BUTTONS */}
            <div className="utkal-gallery-form-footer">

              <button
                type="button"
                className="utkal-gallery-cancel-btn"
                onClick={handleRemovePreview}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="utkal-gallery-submit-btn"
              >
                {editingId ? (
                  <FaEdit />
                ) : (
                  <FaPlus />
                )}

                {editingId
                  ? "Update Image"
                  : "Save Image"}
              </button>

            </div>
          </form>
        </div>

        {/* =====================================================
            GALLERY TABLE
        ===================================================== */}

        <div className="utkal-gallery-table-card">

          <div className="utkal-gallery-table-header">
            <h3>
              Gallery Assets List ({galleryItems.length})
            </h3>
          </div>

          <div className="utkal-gallery-table-responsive">

            <table className="utkal-gallery-table">

              <thead>
                <tr>
                  <th>Media Thumbnail</th>
                  <th className="text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>

                {loading ? (
                  <tr>
                    <td
                      colSpan="2"
                      className="utkal-gallery-empty-td"
                    >
                      Loading gallery assets...
                    </td>
                  </tr>
                ) : galleryItems.length > 0 ? (

                  galleryItems.map((item) => {
                    const itemId =
                      item._id || item.id;

                    const imageUrl =
                      getImageUrl(item.image);

                    const isBroken =
                      brokenImages[itemId];

                    return (
                      <tr key={itemId}>

                        {/* THUMBNAIL */}
                        <td>

                          <div className="utkal-gallery-thumb-wrap">

                            {!isBroken ? (
                              <img
                                src={imageUrl}
                                alt="Gallery item"
                                loading="lazy"
                                onError={() =>
                                  handleImageError(
                                    itemId,
                                    imageUrl
                                  )
                                }
                              />
                            ) : (
                              <div className="utkal-gallery-broken-placeholder">
                                <FaImage />

                                <span>
                                  Image Unavailable
                                </span>
                              </div>
                            )}

                          </div>

                        </td>

                        {/* ACTIONS */}
                        <td>

                          <div className="utkal-gallery-actions-cell">

                            {/* VIEW */}
                            <button
                              type="button"
                              className="utkal-action-btn view-btn"
                              title="View Image"
                              disabled={isBroken}
                              onClick={() =>
                                setViewingImage(
                                  imageUrl
                                )
                              }
                            >
                              <FaEye />
                            </button>

                            {/* EDIT */}
                            <button
                              type="button"
                              className="utkal-action-btn edit-btn"
                              title="Edit Image"
                              onClick={() =>
                                handleEdit(item)
                              }
                            >
                              <FaEdit />
                            </button>

                            {/* DELETE */}
                            <button
                              type="button"
                              className="utkal-action-btn delete-btn"
                              title="Delete Image"
                              onClick={() =>
                                handleDelete(itemId)
                              }
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
                    <td
                      colSpan="2"
                      className="utkal-gallery-empty-td"
                    >
                      No gallery assets found.
                      Upload your first image above!
                    </td>
                  </tr>

                )}

              </tbody>

            </table>

          </div>
        </div>

        {/* =====================================================
            LIGHTBOX
        ===================================================== */}

        {viewingImage && (
          <div
            className="utkal-gallery-modal-overlay"
            onClick={() =>
              setViewingImage(null)
            }
          >

            <div
              className="utkal-gallery-modal-card"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <button
                type="button"
                className="utkal-gallery-modal-close"
                onClick={() =>
                  setViewingImage(null)
                }
              >
                <FaTimes />
              </button>

              <div className="utkal-gallery-modal-body">

                <img
                  src={viewingImage}
                  alt="Full gallery view"
                />

              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};

export default Gallery;