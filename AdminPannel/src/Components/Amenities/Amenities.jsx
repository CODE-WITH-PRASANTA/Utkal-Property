import React, { useEffect, useState } from "react";
import "./Amenities.css";

import {
  FiGrid,
  FiCheckCircle,
  FiSlash,
  FiHome,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiX,
  FiUpload,
  FiChevronLeft,
  FiChevronRight,
  FiBell,
  FiImage,
  FiSmile,
} from "react-icons/fi";

import API from "../../api/Axios";

const BASE_URL = "http://localhost:5000";

/* =====================================================
   ICON LIST
===================================================== */

const BASIC_ICONS = [
  "🏊",
  "🤸",
  "🏋️",
  "🛡️",
  "📸",
  "🌳",
  "🏢",
  "🚗",
];

const MORE_ICONS = [
  "🛏️",
  "🚿",
  "📺",
  "❄️",
  "🔥",
  "🍳",
  "☕",
  "🍽️",
  "🛜",
  "📶",
  "🔒",
  "🅿️",
  "🏠",
  "🏡",
  "🌊",
  "🏖️",
  "🌴",
  "🛋️",
  "🧺",
  "🧹",
  "🧯",
  "🚪",
  "🛗",
  "⚡",
];


/* =====================================================
   ADD / EDIT MODAL
===================================================== */

const AddAmenityModal = ({
  isOpen,
  onClose,
  onSave,

  amenityName,
  setAmenityName,

  description,
  setDescription,

  status,
  setStatus,

  sortOrder,
  setSortOrder,

  selectedIcon,
  setSelectedIcon,

  isEditing,

  imageFile,
  setImageFile,

  imagePreview,
  setImagePreview,

  saving,
}) => {

  const [showMoreIcons, setShowMoreIcons] =
    useState(false);


  /* =====================================================
     RESET MORE ICONS
  ===================================================== */

  useEffect(() => {
    if (!isOpen) {
      setShowMoreIcons(false);
    }
  }, [isOpen]);


  if (!isOpen) {
    return null;
  }


  /* =====================================================
     IMAGE CHANGE
  ===================================================== */

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }


    /* ---------------------------------------------
       FILE SIZE
    --------------------------------------------- */

    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be less than 2MB");

      e.target.value = "";

      return;
    }


    /* ---------------------------------------------
       FILE TYPE
    --------------------------------------------- */

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/svg+xml",
    ];

    if (
      file.type &&
      !allowedTypes.includes(file.type)
    ) {
      alert(
        "Please upload PNG, JPG, WEBP or SVG image."
      );

      e.target.value = "";

      return;
    }


    /* ---------------------------------------------
       IMAGE SELECTED
       CLEAR PRESET ICON
    --------------------------------------------- */

    setImageFile(file);

    setSelectedIcon("");

    setImagePreview("");
  };


  /* =====================================================
     PRESET ICON SELECT
  ===================================================== */

  const handlePresetIconSelect = (icon) => {

    /*
      User selected an icon.

      Therefore uploaded image
      should be removed.
    */

    setSelectedIcon(icon);

    setImageFile(null);

    setImagePreview("");
  };


  /* =====================================================
     REMOVE UPLOADED IMAGE
  ===================================================== */

  const handleRemoveImage = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setImageFile(null);
    setImagePreview("");
  };


  /* =====================================================
     CLEAR SELECTED ICON
  ===================================================== */

  const handleClearIcon = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setSelectedIcon("");
  };


  /* =====================================================
     IMAGE PREVIEW
  ===================================================== */

  const getCurrentImagePreview = () => {

    if (imageFile) {
      return URL.createObjectURL(imageFile);
    }

    if (imagePreview) {
      return imagePreview;
    }

    return "";
  };


  const currentImagePreview =
    getCurrentImagePreview();


  /* =====================================================
     UI
  ===================================================== */

  return (
    <div
      className="amx-modal-overlay"
      onClick={onClose}
    >

      <div
        className="amx-modal-container"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        {/* =========================================
            HEADER
        ========================================= */}

        <div className="amx-modal-header">

          <div className="amx-modal-heading">

            <div className="amx-modal-heading-icon">
              <FiGrid />
            </div>

            <div>

              <h2>
                {isEditing
                  ? "Edit Amenity"
                  : "Add New Amenity"}
              </h2>

              <p>
                {isEditing
                  ? "Update amenity details and appearance"
                  : "Create a new facility with a custom icon"}
              </p>

            </div>

          </div>


          <button
            type="button"
            className="amx-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <FiX />
          </button>

        </div>


        {/* =========================================
            FORM
        ========================================= */}

        <form
          onSubmit={onSave}
          className="amx-modal-form"
        >

          {/* =======================================
              NAME
          ======================================= */}

          <div className="amx-form-group">

            <label>
              Amenity Name
              <span>*</span>
            </label>

            <input
              type="text"
              className="amx-text-input"
              placeholder="Enter amenity name"
              value={amenityName}
              onChange={(e) =>
                setAmenityName(
                  e.target.value
                )
              }
              required
            />

          </div>


          {/* =======================================
              ICON / IMAGE
          ======================================= */}

          <div className="amx-form-group">

            <div className="amx-label-row">

              <label>
                Amenity Icon
                <span>*</span>
              </label>

              <span className="amx-choice-hint">
                Choose one option
              </span>

            </div>


            {/* =====================================
                CHOICE CARDS
            ===================================== */}

            <div className="amx-icon-choice-grid">

              {/* -----------------------------------
                  UPLOAD
              ----------------------------------- */}

              <label
                className={`amx-choice-card ${
                  imageFile || imagePreview
                    ? "amx-choice-card-active"
                    : ""
                }`}
              >

                <input
                  type="file"
                  accept=".png,.jpg,.jpeg,.webp,.svg,image/*"
                  onChange={handleImageChange}
                  className="amx-hidden-file"
                />


                {currentImagePreview ? (

                  <div className="amx-upload-preview-wrapper">

                    <img
                      src={currentImagePreview}
                      alt="Amenity preview"
                      className="amx-upload-preview"
                    />

                    <button
                      type="button"
                      className="amx-preview-remove"
                      onClick={handleRemoveImage}
                    >
                      <FiX />
                    </button>

                  </div>

                ) : (

                  <div className="amx-choice-icon amx-upload-choice-icon">
                    <FiUpload />
                  </div>

                )}


                <div className="amx-choice-content">

                  <strong>
                    Upload Icon
                  </strong>

                  <span>
                    PNG, JPG, WEBP or SVG
                  </span>

                </div>


                <span className="amx-choice-check">

                  {(imageFile ||
                    imagePreview) && (
                    <FiCheckCircle />
                  )}

                </span>

              </label>


              {/* -----------------------------------
                  PRESET ICON
              ----------------------------------- */}

              <div
                className={`amx-choice-card amx-preset-choice-card ${
                  selectedIcon
                    ? "amx-choice-card-active"
                    : ""
                }`}
              >

                <div className="amx-choice-icon amx-preset-choice-icon">
                  {selectedIcon || (
                    <FiSmile />
                  )}
                </div>


                <div className="amx-choice-content">

                  <strong>
                    Choose Icon
                  </strong>

                  <span>
                    Select from presets
                  </span>

                </div>


                <span className="amx-choice-check">

                  {selectedIcon && (
                    <FiCheckCircle />
                  )}

                </span>


                {selectedIcon && (
                  <button
                    type="button"
                    className="amx-selected-icon-clear"
                    onClick={handleClearIcon}
                    title="Clear selected icon"
                  >
                    <FiX />
                  </button>
                )}

              </div>

            </div>


            {/* =====================================
                PRESET ICON SECTION
            ===================================== */}

            <div className="amx-preset-section">

              <div className="amx-preset-header">

                <div>

                  <span className="amx-preset-title">
                    Select an icon
                  </span>

                  <span className="amx-preset-description">
                    Click any icon to use it
                  </span>

                </div>


                <button
                  type="button"
                  className={`amx-more-icon-button ${
                    showMoreIcons
                      ? "amx-more-icon-button-active"
                      : ""
                  }`}
                  onClick={() =>
                    setShowMoreIcons(
                      (previous) =>
                        !previous
                    )
                  }
                >

                  {showMoreIcons
                    ? "Show Less"
                    : "More Icons"}

                  <span
                    className={
                      showMoreIcons
                        ? "amx-more-arrow amx-more-arrow-up"
                        : "amx-more-arrow"
                    }
                  >
                    ↓
                  </span>

                </button>

              </div>


              {/* ===================================
                  ICON GRID
              =================================== */}

              <div className="amx-icon-grid">

                {BASIC_ICONS.map(
                  (icon, index) => (

                    <button
                      type="button"
                      key={`basic-${index}`}
                      className={`amx-preset-icon ${
                        selectedIcon === icon
                          ? "amx-preset-icon-selected"
                          : ""
                      }`}
                      onClick={() =>
                        handlePresetIconSelect(
                          icon
                        )
                      }
                    >

                      <span>
                        {icon}
                      </span>

                      {selectedIcon ===
                        icon && (
                        <small>
                          ✓
                        </small>
                      )}

                    </button>

                  )
                )}


                {/* =================================
                    MORE ICONS
                ================================= */}

                {showMoreIcons &&
                  MORE_ICONS.map(
                    (icon, index) => (

                      <button
                        type="button"
                        key={`more-${index}`}
                        className={`amx-preset-icon amx-preset-icon-extra ${
                          selectedIcon === icon
                            ? "amx-preset-icon-selected"
                            : ""
                        }`}
                        onClick={() =>
                          handlePresetIconSelect(
                            icon
                          )
                        }
                      >

                        <span>
                          {icon}
                        </span>

                        {selectedIcon ===
                          icon && (
                          <small>
                            ✓
                          </small>
                        )}

                      </button>

                    )
                  )}

              </div>

            </div>


            {/* =====================================
                CURRENT SELECTION
            ===================================== */}

            {(selectedIcon ||
              imageFile ||
              imagePreview) && (

              <div className="amx-current-selection">

                <div className="amx-selection-preview">

                  {imageFile ||
                  imagePreview ? (

                    <img
                      src={
                        currentImagePreview
                      }
                      alt="Selected"
                    />

                  ) : (

                    <span>
                      {selectedIcon}
                    </span>

                  )}

                </div>


                <div className="amx-selection-info">

                  <strong>
                    {imageFile ||
                    imagePreview
                      ? "Uploaded icon selected"
                      : "Preset icon selected"}
                  </strong>

                  <span>
                    Only one icon type can be used.
                  </span>

                </div>

              </div>

            )}

          </div>


          {/* =======================================
              DESCRIPTION
          ======================================= */}

          <div className="amx-form-group">

            <label>
              Description
            </label>

            <div className="amx-textarea-wrapper">

              <textarea
                placeholder="Enter description (optional)"
                rows="3"
                maxLength="200"
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
              />

              <span className="amx-character-counter">
                {description.length} / 200
              </span>

            </div>

          </div>


          {/* =======================================
              STATUS
          ======================================= */}

          <div className="amx-form-group">

            <label>
              Status
              <span>*</span>
            </label>


            <div className="amx-radio-group">

              <label
                className={`amx-radio-option ${
                  status === "Active"
                    ? "amx-radio-active"
                    : ""
                }`}
              >

                <input
                  type="radio"
                  name="amenitiesStatus"
                  checked={
                    status === "Active"
                  }
                  onChange={() =>
                    setStatus("Active")
                  }
                />

                <span className="amx-radio-custom" />

                <span>
                  Active
                </span>

              </label>


              <label
                className={`amx-radio-option ${
                  status === "Inactive"
                    ? "amx-radio-inactive"
                    : ""
                }`}
              >

                <input
                  type="radio"
                  name="amenitiesStatus"
                  checked={
                    status === "Inactive"
                  }
                  onChange={() =>
                    setStatus("Inactive")
                  }
                />

                <span className="amx-radio-custom" />

                <span>
                  Inactive
                </span>

              </label>

            </div>

          </div>


          {/* =======================================
              SORT ORDER
          ======================================= */}

          <div className="amx-form-group">

            <label>
              Sort Order
              <span>*</span>
            </label>

            <input
              type="number"
              className="amx-text-input"
              placeholder="Enter sort order"
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(
                  e.target.value
                )
              }
            />

            <span className="amx-helper-text">
              Lower number will show first
            </span>

          </div>


          {/* =======================================
              FOOTER
          ======================================= */}

          <div className="amx-modal-footer">

            <button
              type="button"
              className="amx-cancel-button"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>


            <button
              type="submit"
              className="amx-save-button"
              disabled={saving}
            >

              {saving ? (
                <>
                  <span className="amx-button-spinner" />
                  Saving...
                </>
              ) : (
                <>
                  <FiCheckCircle />

                  {isEditing
                    ? "Update Amenity"
                    : "Save Amenity"}
                </>
              )}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
};


/* =====================================================
   MAIN COMPONENT
===================================================== */

const Amenities = () => {

  const [amenities, setAmenities] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All Status");

  const [sortBy, setSortBy] =
    useState("Sort By: Name (A-Z)");

  const [selectedIds, setSelectedIds] =
    useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [bulkAction, setBulkAction] =
    useState("Bulk Actions");

  const [amenityName, setAmenityName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [status, setStatus] =
    useState("Active");

  const [sortOrder, setSortOrder] =
    useState("");

  const [selectedIcon, setSelectedIcon] =
    useState("🏊");

  const [imageFile, setImageFile] =
    useState(null);

  const [imagePreview, setImagePreview] =
    useState("");


  /* =====================================================
     FETCH
  ===================================================== */

  const fetchAmenities = async () => {

    try {

      setLoading(true);

      const response =
        await API.get("/amenities");

      console.log(
        "AMENITIES RESPONSE:",
        response.data
      );

      const result =
        response.data;

      const data =
        result?.amenities ||
        result?.data ||
        [];

      setAmenities(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.error(
        "FETCH AMENITIES ERROR:",
        error.response?.data ||
          error
      );

      alert(
        error.response?.data?.message ||
          "Failed to load amenities"
      );

      setAmenities([]);

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    fetchAmenities();

  }, []);


  /* =====================================================
     IMAGE URL
  ===================================================== */

  const getImageUrl = (image) => {

    if (!image) {
      return "";
    }

    if (
      image.startsWith("http://") ||
      image.startsWith("https://") ||
      image.startsWith("blob:") ||
      image.startsWith("data:")
    ) {
      return image;
    }

    return `${BASE_URL}${
      image.startsWith("/")
        ? image
        : `/${image}`
    }`;
  };


  /* =====================================================
     RESET FORM
  ===================================================== */

  const resetForm = () => {

    setAmenityName("");

    setDescription("");

    setStatus("Active");

    setSortOrder("");

    setSelectedIcon("🏊");

    setImageFile(null);

    setImagePreview("");

    setEditingId(null);
  };


  /* =====================================================
     OPEN ADD
  ===================================================== */

  const handleOpenAddModal = () => {

    resetForm();

    setIsModalOpen(true);
  };


  /* =====================================================
     CLOSE MODAL
  ===================================================== */

  const handleCloseModal = () => {

    if (saving) {
      return;
    }

    setIsModalOpen(false);

    resetForm();
  };


  /* =====================================================
     EDIT
  ===================================================== */

  const handleOpenEditModal = (item) => {

    setEditingId(item._id);

    setAmenityName(
      item.name || ""
    );

    setDescription(
      item.description || ""
    );

    setStatus(
      item.status || "Active"
    );

    setSortOrder(
      item.sortOrder ?? ""
    );


    /*
      IMPORTANT:

      If database contains image,
      image gets priority.

      Otherwise use preset icon.
    */

    if (item.image) {

      setSelectedIcon("");

      setImageFile(null);

      setImagePreview(
        getImageUrl(
          item.image
        )
      );

    } else {

      setSelectedIcon(
        item.icon || "🏊"
      );

      setImageFile(null);

      setImagePreview("");

    }

    setIsModalOpen(true);
  };


  /* =====================================================
     SAVE
  ===================================================== */

  const handleSaveAmenity = async (e) => {

    e.preventDefault();


    if (!amenityName.trim()) {

      alert(
        "Amenity name is required."
      );

      return;
    }


    /*
      Make sure only one icon type
      is submitted.
    */

    if (
      !selectedIcon &&
      !imageFile &&
      !imagePreview
    ) {

      alert(
        "Please upload an icon or choose a preset icon."
      );

      return;
    }


    try {

      setSaving(true);


      const form =
        new FormData();


      form.append(
        "name",
        amenityName.trim()
      );


      form.append(
        "description",
        description.trim()
      );


      form.append(
        "status",
        status
      );


      form.append(
        "sortOrder",
        sortOrder || "0"
      );


      /*
        If preset icon is selected,
        send icon.

        If image is selected,
        send empty icon.
      */

      form.append(
        "icon",
        imageFile || imagePreview
          ? ""
          : selectedIcon
      );


      /*
        New uploaded image
      */

      if (imageFile) {

        form.append(
          "image",
          imageFile
        );
      }


      if (editingId) {

        const response =
          await API.put(
            `/amenities/${editingId}`,
            form
          );

        alert(
          response.data?.message ||
            "Amenity updated successfully."
        );

      } else {

        const response =
          await API.post(
            "/amenities",
            form
          );

        alert(
          response.data?.message ||
            "Amenity created successfully."
        );
      }


      setIsModalOpen(false);

      resetForm();

      await fetchAmenities();

    } catch (error) {

      console.error(
        "SAVE AMENITY ERROR:",
        error.response?.data ||
          error
      );

      alert(
        error.response?.data?.message ||
          "Failed to save amenity."
      );

    } finally {

      setSaving(false);

    }
  };


  /* =====================================================
     DELETE
  ===================================================== */

  const handleDeleteAmenity =
    async (id) => {

      const confirmed =
        window.confirm(
          "Are you sure you want to delete this amenity?"
        );

      if (!confirmed) {
        return;
      }


      try {

        const response =
          await API.delete(
            `/amenities/${id}`
          );

        alert(
          response.data?.message ||
            "Amenity deleted successfully."
        );


        setSelectedIds(
          (previous) =>
            previous.filter(
              (selectedId) =>
                selectedId !== id
            )
        );


        await fetchAmenities();

      } catch (error) {

        console.error(
          "DELETE ERROR:",
          error.response?.data ||
            error
        );

        alert(
          error.response?.data?.message ||
            "Failed to delete amenity."
        );
      }
    };


  /* =====================================================
     FILTER + SORT
  ===================================================== */

  const filteredAmenities =
    amenities

      .filter((item) => {

        const name =
          item.name || "";


        const matchesSearch =
          name
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            );


        const matchesStatus =
          statusFilter ===
            "All Status" ||
          item.status ===
            statusFilter;


        return (
          matchesSearch &&
          matchesStatus
        );
      })


      .sort((a, b) => {

        if (
          sortBy ===
          "Sort By: Name (A-Z)"
        ) {

          return (
            a.name || ""
          ).localeCompare(
            b.name || ""
          );
        }


        if (
          sortBy ===
          "Sort By: Name (Z-A)"
        ) {

          return (
            b.name || ""
          ).localeCompare(
            a.name || ""
          );
        }


        return 0;
      });


  /* =====================================================
     SELECT ALL
  ===================================================== */

  const handleSelectAll = (e) => {

    if (e.target.checked) {

      setSelectedIds(
        filteredAmenities.map(
          (item) => item._id
        )
      );

    } else {

      setSelectedIds([]);
    }
  };


  /* =====================================================
     SELECT ONE
  ===================================================== */

  const handleSelectOne = (id) => {

    if (
      selectedIds.includes(id)
    ) {

      setSelectedIds(
        selectedIds.filter(
          (item) =>
            item !== id
        )
      );

    } else {

      setSelectedIds([
        ...selectedIds,
        id,
      ]);
    }
  };


  /* =====================================================
     BULK DELETE
  ===================================================== */

  const handleApplyBulkAction =
    async () => {

      if (
        bulkAction !==
        "Delete Selected"
      ) {
        return;
      }


      if (
        selectedIds.length === 0
      ) {

        alert(
          "Please select at least one amenity."
        );

        return;
      }


      const confirmed =
        window.confirm(
          `Are you sure you want to delete ${selectedIds.length} amenities?`
        );


      if (!confirmed) {
        return;
      }


      try {

        const response =
          await API.delete(
            "/amenities/bulk/delete",
            {
              data: {
                ids: selectedIds,
              },
            }
          );


        alert(
          response.data?.message ||
            "Amenities deleted successfully."
        );


        setSelectedIds([]);

        setBulkAction(
          "Bulk Actions"
        );


        await fetchAmenities();

      } catch (error) {

        console.error(
          "BULK DELETE ERROR:",
          error.response?.data ||
            error
        );


        alert(
          error.response?.data?.message ||
            "Failed to delete amenities."
        );
      }
    };


  /* =====================================================
     COUNTS
  ===================================================== */

  const activeCount =
    amenities.filter(
      (item) =>
        item.status === "Active"
    ).length;


  const inactiveCount =
    amenities.filter(
      (item) =>
        item.status === "Inactive"
    ).length;


  const usedInProperties =
    amenities.reduce(
      (total, item) =>
        total +
        Number(
          item.propertiesCount || 0
        ),
      0
    );


  /* =====================================================
     UI
  ===================================================== */

  return (
    <div className="amx-container">

      {/* =========================================
          HEADER
      ========================================= */}

      <header className="amx-header">

        <div className="amx-header-title">

          <div className="amx-header-main">

            <FiGrid className="amx-header-icon" />

            <h1>
              Amenities Management
            </h1>

          </div>

          <span className="amx-breadcrumb">
            Dashboard &gt; Amenities
          </span>

        </div>


        <div className="amx-user-actions">

          <div className="amx-notification">

            <FiBell className="amx-notification-icon" />

            <span className="amx-notification-badge">
              5
            </span>

          </div>


          <div className="amx-profile">

            <div className="amx-avatar">
              AU
            </div>

            <div className="amx-user-info">

              <span className="amx-user-name">
                Admin User
              </span>

              <span className="amx-user-role">
                Super Admin
              </span>

            </div>

          </div>

        </div>

      </header>


      {/* =========================================
          CONTENT
      ========================================= */}

      <div className="amx-content">

        <div className="amx-main">

          {/* =====================================
              STATS
          ===================================== */}

          <div className="amx-stats">

            <div className="amx-stat-card">

              <div className="amx-stat-icon amx-stat-purple">
                <FiGrid />
              </div>

              <div className="amx-stat-info">

                <span>
                  Total Amenities
                </span>

                <strong>
                  {amenities.length}
                </strong>

                <small>
                  All amenities added
                </small>

              </div>

            </div>


            <div className="amx-stat-card">

              <div className="amx-stat-icon amx-stat-green">
                <FiCheckCircle />
              </div>

              <div className="amx-stat-info">

                <span>
                  Active Amenities
                </span>

                <strong>
                  {activeCount}
                </strong>

                <small>
                  Currently active
                </small>

              </div>

            </div>


            <div className="amx-stat-card">

              <div className="amx-stat-icon amx-stat-orange">
                <FiSlash />
              </div>

              <div className="amx-stat-info">

                <span>
                  Inactive Amenities
                </span>

                <strong>
                  {inactiveCount}
                </strong>

                <small>
                  Currently inactive
                </small>

              </div>

            </div>


            <div className="amx-stat-card">

              <div className="amx-stat-icon amx-stat-blue">
                <FiHome />
              </div>

              <div className="amx-stat-info">

                <span>
                  Used In Properties
                </span>

                <strong>
                  {usedInProperties}
                </strong>

                <small>
                  Total properties
                </small>

              </div>

            </div>

          </div>


          {/* =====================================
              TOOLBAR
          ===================================== */}

          <div className="amx-toolbar">

            <div className="amx-filter-group">

              <div className="amx-search">

                <FiSearch />

                <input
                  type="text"
                  placeholder="Search amenities..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(
                      e.target.value
                    )
                  }
                />

              </div>


              <select
                className="amx-filter"
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value
                  )
                }
              >

                <option>
                  All Status
                </option>

                <option>
                  Active
                </option>

                <option>
                  Inactive
                </option>

              </select>


              <select
                className="amx-filter"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value
                  )
                }
              >

                <option>
                  Sort By: Name (A-Z)
                </option>

                <option>
                  Sort By: Name (Z-A)
                </option>

              </select>


              <button
                type="button"
                className="amx-search-button"
              >
                Search
              </button>


              <button
                type="button"
                className="amx-reset-button"
                onClick={() => {

                  setSearchTerm("");

                  setStatusFilter(
                    "All Status"
                  );

                  setSortBy(
                    "Sort By: Name (A-Z)"
                  );

                }}
              >
                Reset
              </button>

            </div>


            <button
              type="button"
              className="amx-add-button"
              onClick={
                handleOpenAddModal
              }
            >

              <FiPlus />

              Add New Amenity

            </button>

          </div>


          {/* =====================================
              TABLE
          ===================================== */}

          <div className="amx-table-wrapper">

            <table className="amx-table">

              <thead>

                <tr>

                  <th className="amx-check-column">

                    <input
                      type="checkbox"
                      onChange={
                        handleSelectAll
                      }
                      checked={
                        filteredAmenities.length >
                          0 &&
                        filteredAmenities.every(
                          (item) =>
                            selectedIds.includes(
                              item._id
                            )
                        )
                      }
                    />

                  </th>

                  <th>
                    ICON
                  </th>

                  <th>
                    AMENITY NAME
                  </th>

                  <th>
                    USED IN PROPERTIES
                  </th>

                  <th>
                    STATUS
                  </th>

                  <th>
                    SORT ORDER
                  </th>

                  <th>
                    ACTIONS
                  </th>

                </tr>

              </thead>


              <tbody>

                {loading ? (

                  <tr>

                    <td
                      colSpan="7"
                      className="amx-table-message"
                    >
                      Loading amenities...
                    </td>

                  </tr>

                ) : filteredAmenities.length >
                  0 ? (

                  filteredAmenities.map(
                    (item) => (

                      <tr
                        key={
                          item._id
                        }
                      >

                        <td>

                          <input
                            type="checkbox"
                            checked={selectedIds.includes(
                              item._id
                            )}
                            onChange={() =>
                              handleSelectOne(
                                item._id
                              )
                            }
                          />

                        </td>


                        <td>

                          {item.image ? (

                            <span className="amx-table-icon">

                              <img
                                src={getImageUrl(
                                  item.image
                                )}
                                alt={
                                  item.name
                                }
                                onError={(e) => {
                                  e.currentTarget.style.display =
                                    "none";
                                }}
                              />

                            </span>

                          ) : (

                            <span className="amx-table-icon amx-table-emoji">

                              {item.icon ||
                                "🏊"}

                            </span>

                          )}

                        </td>


                        <td className="amx-name-cell">

                          {item.name}

                        </td>


                        <td>

                          {Number(
                            item.propertiesCount ||
                              0
                          )}{" "}
                          Properties

                        </td>


                        <td>

                          <span
                            className={`amx-status ${
                              item.status ===
                              "Active"
                                ? "amx-status-active"
                                : "amx-status-inactive"
                            }`}
                          >

                            <span className="amx-status-dot" />

                            {item.status ||
                              "Inactive"}

                          </span>

                        </td>


                        <td>

                          {item.sortOrder ??
                            0}

                        </td>


                        <td>

                          <div className="amx-actions">

                            <button
                              type="button"
                              className="amx-action amx-action-edit"
                              onClick={() =>
                                handleOpenEditModal(
                                  item
                                )
                              }
                            >
                              <FiEdit2 />
                            </button>


                            <button
                              type="button"
                              className="amx-action amx-action-delete"
                              onClick={() =>
                                handleDeleteAmenity(
                                  item._id
                                )
                              }
                            >
                              <FiTrash2 />
                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="7"
                      className="amx-table-message"
                    >
                      No amenities found.
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>


          {/* =====================================
              FOOTER
          ===================================== */}

          <div className="amx-footer">

            <span className="amx-pagination-info">

              Showing 1 to{" "}
              {filteredAmenities.length}{" "}
              of {amenities.length} amenities

            </span>


            <div className="amx-footer-controls">

              <div className="amx-bulk">

                <select
                  className="amx-filter"
                  value={bulkAction}
                  onChange={(e) =>
                    setBulkAction(
                      e.target.value
                    )
                  }
                >

                  <option>
                    Bulk Actions
                  </option>

                  <option>
                    Delete Selected
                  </option>

                </select>


                <button
                  type="button"
                  className="amx-apply-button"
                  onClick={
                    handleApplyBulkAction
                  }
                >
                  Apply
                </button>

              </div>


              <div className="amx-pagination">

                <button
                  type="button"
                  className="amx-page-button"
                >
                  <FiChevronLeft />
                </button>


                <button
                  type="button"
                  className="amx-page-button amx-page-active"
                >
                  1
                </button>


                <button
                  type="button"
                  className="amx-page-button"
                >
                  2
                </button>


                <button
                  type="button"
                  className="amx-page-button"
                >
                  3
                </button>


                <span className="amx-page-dots">
                  ...
                </span>


                <button
                  type="button"
                  className="amx-page-button"
                >
                  4
                </button>


                <button
                  type="button"
                  className="amx-page-button"
                >
                  <FiChevronRight />
                </button>

              </div>

            </div>

          </div>

        </div>


        {/* =======================================
            MODAL
        ======================================= */}

        <AddAmenityModal
          isOpen={isModalOpen}
          onClose={
            handleCloseModal
          }
          onSave={
            handleSaveAmenity
          }

          amenityName={
            amenityName
          }
          setAmenityName={
            setAmenityName
          }

          description={
            description
          }
          setDescription={
            setDescription
          }

          status={status}
          setStatus={setStatus}

          sortOrder={
            sortOrder
          }
          setSortOrder={
            setSortOrder
          }

          selectedIcon={
            selectedIcon
          }
          setSelectedIcon={
            setSelectedIcon
          }

          isEditing={
            editingId !== null
          }

          imageFile={
            imageFile
          }
          setImageFile={
            setImageFile
          }

          imagePreview={
            imagePreview
          }

          setImagePreview={
            setImagePreview
          }

          saving={
            saving
          }
        />

      </div>

    </div>
  );
};

export default Amenities;