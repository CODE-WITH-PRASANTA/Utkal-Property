import React, {
  useEffect,
  useRef,
  useState,
} from "react";

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
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const Gallery = () => {
  // =====================================================
  // STATES
  // =====================================================

  const [galleryItems, setGalleryItems] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedFile, setSelectedFile] = useState(null);

  const [editingId, setEditingId] = useState(null);

  const [viewingImage, setViewingImage] = useState(null);

  const [dragActive, setDragActive] = useState(false);

  const [previewImage, setPreviewImage] = useState(null);

  const [brokenImages, setBrokenImages] = useState({});

  const [currentPage, setCurrentPage] = useState(1);

  // =====================================================
  // PAGINATION
  // =====================================================

  const ITEMS_PER_PAGE = 10;

  // =====================================================
  // FORM DATA
  // =====================================================

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
  });

  const fileInputRef = useRef(null);

  // =====================================================
  // IMAGE URL RESOLVER
  // =====================================================

  const getImageUrl = (photoPath) => {
    if (!photoPath) {
      return "";
    }

    const value = String(photoPath).trim();

    // Already complete URL
    if (
      value.startsWith("http://") ||
      value.startsWith("https://") ||
      value.startsWith("blob:")
    ) {
      return value;
    }

    // Normalize path
    let cleanPath = value.replace(/\\/g, "/");

    // Find uploads folder
    const uploadsIndex = cleanPath
      .toLowerCase()
      .indexOf("uploads/");

    if (uploadsIndex !== -1) {
      cleanPath =
        "/" + cleanPath.substring(uploadsIndex);
    } else {
      cleanPath = cleanPath.startsWith("/")
        ? cleanPath
        : `/${cleanPath}`;
    }

    // Remove duplicate slash
    cleanPath = cleanPath.replace(/\/+/g, "/");

    let baseUrl = IMG_URL;

    if (!baseUrl) {
      baseUrl = "http://localhost:5000";
    }

    baseUrl = String(baseUrl).replace(/\/+$/, "");

    // If IMG_URL contains /api remove it
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

      if (
        response.data?.data &&
        Array.isArray(response.data.data)
      ) {
        data = response.data.data;
      } else if (Array.isArray(response.data)) {
        data = response.data;
      }

      setGalleryItems(data);

      setBrokenImages({});

      // Keep page valid after refresh/update/delete
      const totalPages = Math.max(
        1,
        Math.ceil(data.length / ITEMS_PER_PAGE)
      );

      setCurrentPage((previousPage) =>
        previousPage > totalPages
          ? totalPages
          : previousPage
      );
    } catch (error) {
      console.error(
        "Error fetching gallery assets:",
        error
      );

      setGalleryItems([]);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL FETCH
  // =====================================================

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // IMAGE ERROR
  // =====================================================

  const handleImageError = (id, url) => {
    console.error(
      "Gallery image failed to load:",
      url
    );

    setBrokenImages((previous) => ({
      ...previous,
      [id]: true,
    }));
  };

  // =====================================================
  // PROCESS FILE
  // =====================================================

  const processFile = (file) => {
    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert(
        "Only JPG, JPEG, PNG and WEBP images are allowed."
      );
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert(
        "File size exceeds 5MB limit."
      );
      return;
    }

    // Revoke old blob preview
    if (
      previewImage &&
      previewImage.startsWith("blob:")
    ) {
      URL.revokeObjectURL(previewImage);
    }

    const objectUrl = URL.createObjectURL(file);

    setSelectedFile(file);
    setPreviewImage(objectUrl);
  };

  // =====================================================
  // FILE CHANGE
  // =====================================================

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      processFile(file);
    }
  };

  // =====================================================
  // DRAG EVENTS
  // =====================================================

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      e.type === "dragenter" ||
      e.type === "dragover"
    ) {
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
    if (
      previewImage &&
      previewImage.startsWith("blob:")
    ) {
      URL.revokeObjectURL(previewImage);
    }

    setPreviewImage(null);
    setSelectedFile(null);
    setEditingId(null);

    setFormData({
      title: "",
      category: "",
      description: "",
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Please enter gallery title.");
      return;
    }

    if (!formData.category.trim()) {
      alert("Please enter gallery category.");
      return;
    }

    if (!formData.description.trim()) {
      alert(
        "Please enter gallery description."
      );
      return;
    }

    // New gallery item needs image
    if (!editingId && !selectedFile) {
      alert(
        "Please select or drag & drop an image file."
      );
      return;
    }

    const data = new FormData();

    data.append(
      "title",
      formData.title.trim()
    );

    data.append(
      "category",
      formData.category.trim()
    );

    data.append(
      "description",
      formData.description.trim()
    );

    if (selectedFile) {
      data.append("image", selectedFile);
    }

    try {
      let response;

      if (editingId) {
        response = await API.put(
          `/gallery/${editingId}`,
          data
        );
      } else {
        response = await API.post(
          "/gallery",
          data
        );
      }

      if (
        response.status === 200 ||
        response.status === 201
      ) {
        alert(
          editingId
            ? "Gallery item updated successfully!"
            : "Gallery item uploaded successfully!"
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
          "Failed to save gallery item."
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

    setFormData({
      title: item.title || "",
      category: item.category || "",
      description: item.description || "",
    });

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

    if (!confirmed) {
      return;
    }

    try {
      const response = await API.delete(
        `/gallery/${id}`
      );

      if (
        response.status === 200 ||
        response.status === 204
      ) {
        const updatedItems =
          galleryItems.filter(
            (item) =>
              (item._id || item.id) !== id
          );

        setGalleryItems(updatedItems);

        // Calculate pages after deletion
        const totalPages = Math.max(
          1,
          Math.ceil(
            updatedItems.length /
              ITEMS_PER_PAGE
          )
        );

        setCurrentPage((previousPage) =>
          previousPage > totalPages
            ? totalPages
            : previousPage
        );

        if (editingId === id) {
          handleRemovePreview();
        }

        alert(
          "Gallery item deleted successfully!"
        );
      }
    } catch (error) {
      console.error(
        "Error deleting gallery item:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete gallery item."
      );
    }
  };

  // =====================================================
  // PAGINATION CALCULATIONS
  // =====================================================

  const totalItems = galleryItems.length;

  const totalPages = Math.max(
    1,
    Math.ceil(
      totalItems / ITEMS_PER_PAGE
    )
  );

  const startIndex =
    (currentPage - 1) *
    ITEMS_PER_PAGE;

  const endIndex =
    startIndex + ITEMS_PER_PAGE;

  const currentItems =
    galleryItems.slice(
      startIndex,
      endIndex
    );

  // =====================================================
  // PAGE CHANGE
  // =====================================================

  const handlePageChange = (page) => {
    if (
      page < 1 ||
      page > totalPages ||
      page === currentPage
    ) {
      return;
    }

    setCurrentPage(page);

    // Scroll to table
    setTimeout(() => {
      const tableCard =
        document.querySelector(
          ".utkal-gallery-table-card"
        );

      if (tableCard) {
        tableCard.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 50);
  };

  // =====================================================
  // PAGE NUMBERS
  // =====================================================

  const getPageNumbers = () => {
    const pages = [];

    // Small number of pages
    if (totalPages <= 7) {
      for (
        let i = 1;
        i <= totalPages;
        i++
      ) {
        pages.push(i);
      }

      return pages;
    }

    // First pages
    if (currentPage <= 4) {
      return [
        1,
        2,
        3,
        4,
        5,
        "...",
        totalPages,
      ];
    }

    // Last pages
    if (
      currentPage >=
      totalPages - 3
    ) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    // Middle pages
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <section className="utkal-gallery-section">
      <div className="utkal-gallery-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="utkal-gallery-header">
          <span className="utkal-gallery-tag">
            Media Manager
          </span>

          <h1 className="utkal-gallery-title">
            Property Gallery Management
          </h1>

          <p className="utkal-gallery-subtitle">
            Upload and manage property
            photos, titles, categories and
            descriptions for Utkal Property.
          </p>
        </div>

        {/* =================================================
            FORM CARD
        ================================================= */}

        <div className="utkal-gallery-form-card">

          <div className="utkal-gallery-form-header">

            <div className="utkal-gallery-form-title-wrap">
              <span className="utkal-gallery-form-indicator"></span>

              <h2>
                {editingId
                  ? "Edit Gallery Item"
                  : "Upload New Media"}
              </h2>
            </div>

            {editingId && (
              <button
                type="button"
                className="utkal-gallery-cancel-edit-btn"
                onClick={
                  handleRemovePreview
                }
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

            {/* =================================================
                TEXT FIELDS
            ================================================= */}

            <div className="utkal-gallery-fields">

              <div className="utkal-gallery-field">

                <label htmlFor="gallery-title">
                  Title
                  <span>*</span>
                </label>

                <input
                  id="gallery-title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={
                    handleInputChange
                  }
                  placeholder="e.g. Utkal Luxury Apartments"
                  maxLength={150}
                />

              </div>

              <div className="utkal-gallery-field">

                <label htmlFor="gallery-category">
                  Category
                  <span>*</span>
                </label>

                <input
                  id="gallery-category"
                  type="text"
                  name="category"
                  value={
                    formData.category
                  }
                  onChange={
                    handleInputChange
                  }
                  placeholder="e.g. Prime Location"
                  maxLength={100}
                />

              </div>

              <div className="utkal-gallery-field utkal-gallery-field-full">

                <label htmlFor="gallery-description">
                  Description
                  <span>*</span>
                </label>

                <textarea
                  id="gallery-description"
                  name="description"
                  value={
                    formData.description
                  }
                  onChange={
                    handleInputChange
                  }
                  placeholder="Write a short description about this property area..."
                  rows={4}
                  maxLength={500}
                />

                <div className="utkal-gallery-character-count">
                  {
                    formData.description
                      .length
                  }
                  /500
                </div>

              </div>

            </div>

            {/* =================================================
                UPLOAD + PREVIEW
            ================================================= */}

            <div className="utkal-gallery-upload-row">

              {/* DROPZONE */}

              <div
                className={`utkal-gallery-dropzone ${
                  dragActive
                    ? "drag-active"
                    : ""
                }`}
                onDragEnter={
                  handleDrag
                }
                onDragLeave={
                  handleDrag
                }
                onDragOver={
                  handleDrag
                }
                onDrop={handleDrop}
                onClick={() =>
                  fileInputRef.current?.click()
                }
              >

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={
                    handleFileChange
                  }
                  accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                  style={{
                    display: "none",
                  }}
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
                  <span>
                    JPG • PNG • WEBP
                  </span>

                  <span>
                    Max Size : 5MB
                  </span>
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
                      />

                      <button
                        type="button"
                        className="utkal-gallery-preview-remove"
                        onClick={
                          handleRemovePreview
                        }
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

            {/* =================================================
                FORM BUTTONS
            ================================================= */}

            <div className="utkal-gallery-form-footer">

              <button
                type="button"
                className="utkal-gallery-cancel-btn"
                onClick={
                  handleRemovePreview
                }
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
                  ? "Update Gallery"
                  : "Save Gallery"}

              </button>

            </div>

          </form>
        </div>

        {/* =================================================
            TABLE CARD
        ================================================= */}

        <div className="utkal-gallery-table-card">

          {/* TABLE HEADER */}

          <div className="utkal-gallery-table-header">

            <div>
              <h3>
                Gallery Assets List
              </h3>

              <p>
                Manage your property gallery
                content.
              </p>
            </div>

            <span className="utkal-gallery-total-badge">
              {totalItems} Items
            </span>

          </div>

          {/* TABLE */}

          <div className="utkal-gallery-table-responsive">

            <table className="utkal-gallery-table">

              <thead>
                <tr>

                  <th>
                    Media
                  </th>

                  <th>
                    Property Information
                  </th>

                  <th className="text-center">
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody>

                {loading ? (

                  <tr>
                    <td
                      colSpan="3"
                      className="utkal-gallery-empty-td"
                    >
                      <div className="utkal-gallery-loading">
                        <div className="utkal-gallery-spinner"></div>
                        Loading gallery assets...
                      </div>
                    </td>
                  </tr>

                ) : currentItems.length > 0 ? (

                  currentItems.map(
                    (item, index) => {

                      const itemId =
                        item._id ||
                        item.id;

                      const imageUrl =
                        getImageUrl(
                          item.image
                        );

                      const isBroken =
                        brokenImages[
                          itemId
                        ];

                      const globalIndex =
                        startIndex +
                        index;

                      return (
                        <tr
                          key={itemId}
                        >

                          {/* MEDIA */}

                          <td>

                            <div className="utkal-gallery-media-cell">

                              <div className="utkal-gallery-thumb-wrap">

                                {!isBroken ? (
                                  <img
                                    src={
                                      imageUrl
                                    }
                                    alt={
                                      item.title ||
                                      "Gallery item"
                                    }
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

                              <span className="utkal-gallery-row-number">
                                #{String(
                                  globalIndex + 1
                                ).padStart(
                                  2,
                                  "0"
                                )}
                              </span>

                            </div>

                          </td>

                          {/* INFORMATION */}

                          <td>

                            <div className="utkal-gallery-info-cell">

                              <h4>
                                {item.title ||
                                  "Untitled Property"}
                              </h4>

                              <span className="utkal-gallery-category-badge">
                                {item.category ||
                                  "General"}
                              </span>

                              <p>
                                {item.description ||
                                  "No description available."}
                              </p>

                            </div>

                          </td>

                          {/* ACTIONS */}

                          <td>

                            <div className="utkal-gallery-actions-cell">

                              <button
                                type="button"
                                className="utkal-action-btn view-btn"
                                title="View Image"
                                disabled={
                                  isBroken
                                }
                                onClick={() =>
                                  setViewingImage(
                                    imageUrl
                                  )
                                }
                              >
                                <FaEye />
                              </button>

                              <button
                                type="button"
                                className="utkal-action-btn edit-btn"
                                title="Edit Gallery"
                                onClick={() =>
                                  handleEdit(
                                    item
                                  )
                                }
                              >
                                <FaEdit />
                              </button>

                              <button
                                type="button"
                                className="utkal-action-btn delete-btn"
                                title="Delete Gallery"
                                onClick={() =>
                                  handleDelete(
                                    itemId
                                  )
                                }
                              >
                                <FaTrash />
                              </button>

                            </div>

                          </td>

                        </tr>
                      );
                    }
                  )

                ) : (

                  <tr>
                    <td
                      colSpan="3"
                      className="utkal-gallery-empty-td"
                    >
                      <div className="utkal-gallery-empty-content">

                        <FaImage />

                        <strong>
                          No gallery assets found.
                        </strong>

                        <span>
                          Upload your first gallery
                          item above.
                        </span>

                      </div>
                    </td>
                  </tr>

                )}

              </tbody>

            </table>

          </div>

          {/* =================================================
              PAGINATION FOOTER
          ================================================= */}

          {!loading && totalItems > 0 && (
            <div className="utkal-gallery-pagination-footer">

              {/* PAGINATION INFO */}

              <div className="utkal-gallery-pagination-info">

                Showing{" "}

                <strong>
                  {startIndex + 1}
                </strong>

                {" - "}

                <strong>
                  {Math.min(
                    endIndex,
                    totalItems
                  )}
                </strong>

                {" of "}

                <strong>
                  {totalItems}
                </strong>

                {" items"}

              </div>

              {/* PAGINATION */}

              {totalPages > 1 && (
                <div className="utkal-gallery-pagination">

                  {/* PREVIOUS */}

                  <button
                    type="button"
                    className="utkal-gallery-pagination-arrow"
                    disabled={
                      currentPage === 1
                    }
                    onClick={() =>
                      handlePageChange(
                        currentPage - 1
                      )
                    }
                    aria-label="Previous page"
                  >
                    <FaChevronLeft />
                  </button>

                  {/* PAGE NUMBERS */}

                  <div className="utkal-gallery-pagination-numbers">

                    {getPageNumbers().map(
                      (page, index) => {

                        if (
                          page ===
                          "..."
                        ) {
                          return (
                            <span
                              key={`dots-${index}`}
                              className="utkal-gallery-pagination-dots"
                            >
                              ...
                            </span>
                          );
                        }

                        return (
                          <button
                            key={page}
                            type="button"
                            className={`utkal-gallery-pagination-number ${
                              currentPage ===
                              page
                                ? "active"
                                : ""
                            }`}
                            onClick={() =>
                              handlePageChange(
                                page
                              )
                            }
                            aria-label={`Go to page ${page}`}
                            aria-current={
                              currentPage ===
                              page
                                ? "page"
                                : undefined
                            }
                          >
                            {page}
                          </button>
                        );
                      }
                    )}

                  </div>

                  {/* NEXT */}

                  <button
                    type="button"
                    className="utkal-gallery-pagination-arrow"
                    disabled={
                      currentPage ===
                      totalPages
                    }
                    onClick={() =>
                      handlePageChange(
                        currentPage + 1
                      )
                    }
                    aria-label="Next page"
                  >
                    <FaChevronRight />
                  </button>

                </div>
              )}

            </div>
          )}

        </div>

        {/* =================================================
            VIEW IMAGE MODAL
        ================================================= */}

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
                aria-label="Close image"
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