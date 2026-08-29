import React, { useState, useRef, useEffect } from "react";
import "./AllProperty.css";

const AllProperty = ({
  propertyData,
  setPropertyData,
  propertyImages,
  setPropertyImages,
  handlePublish,
  publishing,
}) => {
  // =====================================================
  // MODAL PREVIEW
  // =====================================================

  const [showModal, setShowModal] =
    useState(false);

  // =====================================================
  // FILE INPUT
  // =====================================================

  const fileInputRef = useRef(null);

  // =====================================================
  // IMAGE PREVIEW URLS
  // Actual File objects stay inside propertyImages
  // =====================================================

  const [imagePreviews, setImagePreviews] =
    useState([]);

  // =====================================================
  // PROPERTY VALUES FROM PARENT
  // =====================================================

  const {
    metaTitle = "",
    metaDescription = "",
    urlSlug = "",

    publishStatus = true,
    featuredProperty = false,
    publishDate = "",
    promoteProperty = false,
  } = propertyData || {};

  // =====================================================
  // SAMPLE AMENITIES
  // Keep existing UI
  // =====================================================

  const sampleAmenities = [
    "Swimming Pool",
    "Kid Play Area",
    "Gym",
    "Security",
    "CCTV Camera",
    "Park & Garden",
    "Club House",
  ];

  // =====================================================
  // UPDATE PARENT PROPERTY DATA
  // =====================================================

  const updatePropertyData = (
    name,
    value
  ) => {
    setPropertyData((previous) => ({
      ...previous,

      [name]: value,
    }));
  };

  // =====================================================
  // CREATE IMAGE PREVIEWS
  // =====================================================

  useEffect(() => {
    const urls = (propertyImages || []).map(
      (image) => {
        // Newly selected browser File
        if (image instanceof File) {
          return URL.createObjectURL(image);
        }

        // Existing backend image / URL
        if (typeof image === "string") {
          return image;
        }

        return "";
      }
    );

    setImagePreviews(urls);

    // Cleanup blob URLs
    return () => {
      urls.forEach((url) => {
        if (
          url &&
          url.startsWith("blob:")
        ) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [propertyImages]);

  // =====================================================
  // OPEN FILE SELECT
  // =====================================================

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  // =====================================================
  // PROPERTY IMAGE UPLOAD
  // =====================================================

  const handleFilesUpload = (e) => {
    const files = Array.from(
      e.target.files || []
    );

    if (files.length === 0) {
      return;
    }

    const validFiles = [];

    files.forEach((file) => {
      // ---------------------------------------------
      // Validate image
      // ---------------------------------------------

      if (!file.type.startsWith("image/")) {
        alert(
          `${file.name} is not a valid image.`
        );

        return;
      }

      // ---------------------------------------------
      // Maximum 5MB
      // ---------------------------------------------

      if (
        file.size >
        5 * 1024 * 1024
      ) {
        alert(
          `${file.name} exceeds the 5MB limit.`
        );

        return;
      }

      validFiles.push(file);
    });

    if (validFiles.length === 0) {
      return;
    }

    // ---------------------------------------------
    // Store actual Files in parent
    // ---------------------------------------------

    setPropertyImages((previous) => [
      ...(previous || []),

      ...validFiles,
    ]);

    console.log(
      "PROPERTY IMAGES:",
      validFiles
    );

    // Allows selecting same file again
    e.target.value = "";
  };

  // =====================================================
  // REMOVE PROPERTY IMAGE
  // =====================================================

  const handleRemoveImage = (
    index,
    event
  ) => {
    if (event) {
      event.stopPropagation();
    }

    setPropertyImages((previous) =>
      previous.filter(
        (_, imageIndex) =>
          imageIndex !== index
      )
    );
  };

  // =====================================================
  // SET PRIMARY IMAGE
  // Move selected image to index 0
  // =====================================================

  const handleSetPrimaryImage = (
    index,
    event
  ) => {
    if (event) {
      event.stopPropagation();
    }

    if (index === 0) {
      return;
    }

    setPropertyImages((previous) => {
      const updated = [...previous];

      const [selectedImage] =
        updated.splice(index, 1);

      updated.unshift(selectedImage);

      return updated;
    });
  };

  // =====================================================
  // SET CURRENT DATE
  // =====================================================

  const handleSetNowDate = () => {
    const today = new Date()
      .toISOString()
      .split("T")[0];

    updatePropertyData(
      "publishDate",
      today
    );
  };

  // =====================================================
  // SAVE DRAFT
  // =====================================================

  const handleSaveDraft = () => {
    try {
      const draftData = {
        ...propertyData,

        // We cannot save File objects properly in JSON.
        // Store only file names for draft information.
        propertyImageNames:
          (propertyImages || [])
            .filter(
              (image) =>
                image instanceof File
            )
            .map(
              (image) => image.name
            ),
      };

      localStorage.setItem(
        "property_draft",
        JSON.stringify(draftData)
      );

      alert(
        "Draft saved successfully!"
      );
    } catch (error) {
      console.error(
        "SAVE DRAFT ERROR:",
        error
      );

      alert(
        "Failed to save draft."
      );
    }
  };

  // =====================================================
  // PUBLISH
  // Parent handles actual backend request
  // =====================================================

  const handlePublishProperty = () => {
    if (publishing) {
      return;
    }

    if (
      typeof handlePublish !==
      "function"
    ) {
      console.error(
        "handlePublish prop is missing."
      );

      alert(
        "Publish handler is not connected."
      );

      return;
    }

    handlePublish();
  };

  // =====================================================
  // PREVIEW VALUES
  // =====================================================

  const previewTitle =
    propertyData?.propertyName ||
    propertyData?.name ||
    metaTitle ||
    "Luxury Villa Title";

  const previewDescription =
    propertyData?.shortDescription ||
    metaDescription ||
    "Luxury Villa in Location Address";

  const previewLocation = [
    propertyData?.location,
    propertyData?.city,
    propertyData?.state,
  ]
    .filter(Boolean)
    .join(", ");

  const previewPrice =
    Number(propertyData?.price || 0);

  // =====================================================
  // COMPONENT
  // =====================================================

  return (
    <div className="all-property-container">

      {/* =================================================
          1. PROPERTY IMAGES
      ================================================= */}

      <div className="property-card">

        <div className="card-header-row">

          <div className="title-with-icon">

            <span className="purple-icon">
              ☁️
            </span>

            <h3 className="section-title">

              Property Images{" "}

              <span className="required-star">
                *
              </span>

            </h3>

          </div>

          <span className="badge-primary">
            Primary
          </span>

        </div>

        {/* =============================================
            FILE INPUT
        ============================================= */}

        <div
          className="dropzone-area"
          onClick={triggerFileSelect}
        >

          <input
            type="file"
            ref={fileInputRef}
            onChange={
              handleFilesUpload
            }
            multiple
            accept="image/*"
            style={{
              display: "none",
            }}
          />

          <div className="dropzone-content">

            <span className="upload-cloud-icon">
              ☁️
            </span>

            <p className="dropzone-text">

              Drag & drop images here{" "}

              <span className="browse-text">
                or click to browse
              </span>

            </p>

            <p className="dropzone-subtext">
              Recommended: 1200×800px,
              JPG/PNG, Max 5MB
            </p>

          </div>

        </div>

        {/* =============================================
            THUMBNAILS
        ============================================= */}

        <div className="thumbnail-row">

          {imagePreviews.map(
            (img, index) => (

              <div
                key={index}
                className="thumb-wrapper"
              >

                <img
                  src={img}
                  alt={`Thumbnail ${
                    index + 1
                  }`}
                  className="thumb-img"
                />

                {/* Primary */}

                {index === 0 && (

                  <span className="badge-primary">
                    Primary
                  </span>

                )}

                {/* Set Primary */}

                {index !== 0 && (

                  <button
                    type="button"
                    onClick={(e) =>
                      handleSetPrimaryImage(
                        index,
                        e
                      )
                    }
                  >
                    Primary
                  </button>

                )}

                {/* Remove */}

                <button
                  type="button"
                  onClick={(e) =>
                    handleRemoveImage(
                      index,
                      e
                    )
                  }
                >
                  ✕
                </button>

              </div>

            )
          )}

        </div>

      </div>

      {/* =================================================
          2. LIVE PREVIEW
      ================================================= */}

      <div className="property-card">

        <div className="title-with-icon">

          <span className="purple-icon">
            👁️
          </span>

          <h3 className="section-title">
            Live Preview
          </h3>

        </div>

        <div className="preview-card-box">

          <div className="preview-img-container">

            {imagePreviews.length >
            0 ? (

              <img
                src={
                  imagePreviews[0]
                }
                alt={previewTitle}
                className="preview-main-img"
              />

            ) : (

              <div className="preview-main-img">
                No Image Selected
              </div>

            )}

            <span className="default-preview-tag">
              Default Preview
            </span>

          </div>

          <div className="preview-content-box">

            <h4 className="preview-villa-title">
              {previewTitle}
            </h4>

            <p className="preview-villa-address">

              {previewLocation ||
                previewDescription}

            </p>

            <div className="rating-row">

              <span className="stars">
                ⭐⭐⭐⭐⭐
              </span>

              <span className="rating-count">
                (4.5)
              </span>

            </div>

            <div className="price-tag">

              {previewPrice > 0
                ? `₹ ${previewPrice.toLocaleString(
                    "en-IN"
                  )}`
                : "₹ --"}

            </div>

            <button
              type="button"
              className="view-full-preview-btn"
              onClick={() =>
                setShowModal(true)
              }
            >
              View Full Preview →
            </button>

          </div>

        </div>

      </div>

      {/* =================================================
          3. SEO SETTINGS
      ================================================= */}

      <div className="property-card">

        <div className="title-with-icon">

          <span className="purple-icon">
            ⚙️
          </span>

          <h3 className="section-title">
            SEO Settings
          </h3>

        </div>

        {/* META TITLE */}

        <div className="form-group">

          <label className="input-label">
            Meta Title
          </label>

          <div className="input-with-counter">

            <input
              type="text"
              className="form-input"
              maxLength={60}
              value={metaTitle}
              onChange={(e) =>
                updatePropertyData(
                  "metaTitle",
                  e.target.value
                )
              }
              placeholder="Enter meta title..."
            />

            <span className="char-counter">
              {metaTitle.length}/60
            </span>

          </div>

        </div>

        {/* META DESCRIPTION */}

        <div className="form-group">

          <label className="input-label">
            Meta Description
          </label>

          <div className="textarea-with-counter">

            <textarea
              className="form-textarea"
              maxLength={160}
              value={
                metaDescription
              }
              onChange={(e) =>
                updatePropertyData(
                  "metaDescription",
                  e.target.value
                )
              }
              placeholder="Enter meta description..."
            ></textarea>

            <span className="char-counter textarea-counter">

              {
                metaDescription.length
              }
              /160

            </span>

          </div>

        </div>

        {/* URL SLUG */}

        <div className="form-group">

          <label className="input-label">
            URL Slug
          </label>

          <input
            type="text"
            className="form-input"
            value={urlSlug}
            onChange={(e) =>
              updatePropertyData(
                "urlSlug",
                e.target.value
              )
            }
            placeholder="property-url-slug"
          />

        </div>

      </div>

      {/* =================================================
          4. PUBLISH SETTINGS
      ================================================= */}

      <div className="property-card">

        <div className="title-with-icon">

          <span className="purple-icon">
            🚀
          </span>

          <h3 className="section-title">
            Publish Settings
          </h3>

        </div>

        {/* =============================================
            PUBLISH STATUS
        ============================================= */}

        <div className="setting-row">

          <span className="setting-label">
            Publish Status
          </span>

          <div className="setting-control">

            <label className="switch">

              <input
                type="checkbox"
                checked={
                  publishStatus
                }
                onChange={(e) =>
                  updatePropertyData(
                    "publishStatus",
                    e.target.checked
                  )
                }
              />

              <span className="slider round"></span>

            </label>

            <span className="setting-status-text">

              {publishStatus
                ? "Public"
                : "Private"}

            </span>

          </div>

        </div>

        {/* =============================================
            FEATURED PROPERTY
        ============================================= */}

        <div className="setting-row">

          <span className="setting-label">
            Featured Property
          </span>

          <div className="setting-control">

            <label className="switch">

              <input
                type="checkbox"
                checked={
                  featuredProperty
                }
                onChange={(e) =>
                  updatePropertyData(
                    "featuredProperty",
                    e.target.checked
                  )
                }
              />

              <span className="slider round"></span>

            </label>

            <span className="setting-status-text">

              {featuredProperty
                ? "Yes"
                : "No"}

            </span>

          </div>

        </div>

        {/* =============================================
            PUBLISH DATE
        ============================================= */}

        <div className="form-group publish-date-group">

          <label className="input-label">
            Publish Date
          </label>

          <div className="date-input-wrapper">

            <div className="date-input-container">

              <input
                type="date"
                className="form-input date-input-calendar"
                value={publishDate}
                onChange={(e) =>
                  updatePropertyData(
                    "publishDate",
                    e.target.value
                  )
                }
              />

            </div>

            <span
              className="now-text"
              onClick={
                handleSetNowDate
              }
            >
              Now
            </span>

          </div>

        </div>

        {/* =============================================
            PROMOTE PROPERTY
        ============================================= */}

        <div className="setting-row">

          <span className="setting-label">
            Promote Property
          </span>

          <div className="setting-control">

            <label className="switch">

              <input
                type="checkbox"
                checked={
                  promoteProperty
                }
                onChange={(e) =>
                  updatePropertyData(
                    "promoteProperty",
                    e.target.checked
                  )
                }
              />

              <span className="slider round"></span>

            </label>

            <span className="setting-status-text">

              {promoteProperty
                ? "Yes"
                : "No"}

            </span>

          </div>

        </div>

        {/* =============================================
            ACTION BUTTONS
        ============================================= */}

        <div className="action-buttons-row">

          <button
            type="button"
            className="save-draft-btn"
            onClick={
              handleSaveDraft
            }
          >
            🔖 Save as Draft
          </button>

          <button
            type="button"
            className="publish-property-btn"
            onClick={
              handlePublishProperty
            }
            disabled={publishing}
          >

            {publishing
              ? "Publishing..."
              : "🚀 Publish Property"}

          </button>

        </div>

      </div>

      {/* =================================================
          5. MODAL POPUP VIEW
      ================================================= */}

      {showModal && (

        <div className="modal-overlay">

          <div className="modal-content-box">

            {/* HEADER */}

            <div className="modal-header">

              <h3 className="modal-title">
                Property Live Preview
              </h3>

              <button
                type="button"
                className="modal-close-btn"
                onClick={() =>
                  setShowModal(false)
                }
              >
                ✕
              </button>

            </div>

            {/* BODY */}

            <div className="modal-body">

              {/* =======================================
                  IMAGES
              ======================================= */}

              <div className="modal-images-row">

                {imagePreviews.map(
                  (img, idx) => (

                    <img
                      key={idx}
                      src={img}
                      alt={`Modal preview ${idx}`}
                      className="modal-thumb-img"
                    />

                  )
                )}

              </div>

              {/* =======================================
                  TITLE
              ======================================= */}

              <h2 className="modal-prop-title">

                {previewTitle ||
                  "Untitled Property"}

              </h2>

              {/* =======================================
                  LOCATION
              ======================================= */}

              <p className="modal-prop-address">

                📍{" "}

                {previewLocation ||
                  "Location Address not provided"}

              </p>

              {/* =======================================
                  TAGS
              ======================================= */}

              <div className="modal-tags-row">

                <span className="modal-tag">

                  Category:{" "}

                  {propertyData
                    ?.category ||
                    "Not selected"}

                </span>

                <span className="modal-tag">

                  Type:{" "}

                  {propertyData
                    ?.propertyType ||
                    propertyData?.type ||
                    "Not selected"}

                </span>

                <span className="modal-tag">

                  Status:{" "}

                  {publishStatus
                    ? "Active"
                    : "Private"}

                </span>

              </div>

              {/* =======================================
                  DESCRIPTION
              ======================================= */}

              <div className="modal-desc-section">

                <h4 className="modal-section-heading">
                  Description
                </h4>

                <p className="modal-desc-text">

                  {propertyData
                    ?.shortDescription ||
                    metaDescription ||
                    "No description provided."}

                </p>

              </div>

              {/* =======================================
                  PROPERTY SPECS
              ======================================= */}

              <div className="modal-specs-grid">

                <div className="spec-item">

                  <strong>
                    Bedrooms:
                  </strong>{" "}

                  {propertyData
                    ?.bedrooms ||
                    0}

                </div>

                <div className="spec-item">

                  <strong>
                    Bathrooms:
                  </strong>{" "}

                  {propertyData
                    ?.bathrooms ||
                    0}

                </div>

                <div className="spec-item">

                  <strong>
                    Total Floors:
                  </strong>{" "}

                  {propertyData
                    ?.totalFloors ||
                    0}

                </div>

                <div className="spec-item">

                  <strong>
                    Total Area:
                  </strong>{" "}

                  {propertyData
                    ?.totalArea ||
                    propertyData
                      ?.projectArea ||
                    0}{" "}

                  sq.ft

                </div>

                <div className="spec-item">

                  <strong>
                    Plot Size:
                  </strong>{" "}

                  {propertyData
                    ?.plotSize ||
                    propertyData
                      ?.plotArea ||
                    0}{" "}

                  sq.ft

                </div>

                <div className="spec-item">

                  <strong>
                    Parking:
                  </strong>{" "}

                  {propertyData
                    ?.parking ||
                    "Not specified"}

                </div>

              </div>

              {/* =======================================
                  AMENITIES
              ======================================= */}

              <div className="modal-amenities-section">

                <h4 className="modal-section-heading">
                  Selected Amenities
                </h4>

                <div className="amenities-chips-row">

                  {propertyData
                    ?.amenities &&
                  propertyData
                    .amenities
                    .length > 0 ? (

                    propertyData.amenities.map(
                      (
                        amenity,
                        index
                      ) => (

                        <span
                          key={index}
                          className="amenity-chip"
                        >
                          {amenity}
                        </span>

                      )
                    )

                  ) : (

                    sampleAmenities.map(
                      (
                        amenity,
                        index
                      ) => (

                        <span
                          key={index}
                          className="amenity-chip"
                        >
                          {amenity}
                        </span>

                      )
                    )

                  )}

                </div>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default AllProperty;