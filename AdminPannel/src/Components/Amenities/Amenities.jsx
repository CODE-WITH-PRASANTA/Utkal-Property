import React, {
  useEffect,
  useState,
} from "react";

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
} from "react-icons/fi";

// ================================================
// YOUR AXIOS INSTANCE
// Change path only if Axios.js is elsewhere
// ================================================

import API from "../../api/Axios";

// ================================================
// BACKEND BASE URL
// Used only for uploaded images
// ================================================

const BASE_URL = "http://localhost:5000";

// =====================================================
// ADD / EDIT MODAL
// =====================================================

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

  // Backend additions
  imageFile,
  setImageFile,
  imagePreview,
  saving,
}) => {
  if (!isOpen) return null;

  // ================================================
  // IMAGE SELECT
  // ================================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    // 2 MB validation
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be less than 2MB");
      e.target.value = "";
      return;
    }

    setImageFile(file);
  };

  return (
    <div
      className="amenities-modal-overlay"
      onClick={onClose}
    >
      <div
        className="amenities-modal-container"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <div className="amenities-modal-header">
          <div>
            <h2>
              {isEditing
                ? "Edit Amenity"
                : "Add New Amenity"}
            </h2>

            <p>
              {isEditing
                ? "Update amenity details"
                : "Add a new amenity to the list"}
            </p>
          </div>

          <button
            type="button"
            className="amenities-close-modal-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <FiX />
          </button>
        </div>

        <form
          onSubmit={onSave}
          className="amenities-modal-form"
        >
          {/* ================================= */}
          {/* AMENITY NAME */}
          {/* ================================= */}

          <div className="amenities-form-group">
            <label>
              Amenity Name <span>*</span>
            </label>

            <input
              type="text"
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

          {/* ================================= */}
          {/* ICON / IMAGE */}
          {/* ================================= */}

          <div className="amenities-form-group">
            <label>
              Icon <span>*</span>
            </label>

            <label
              className="amenities-icon-upload-box"
              style={{
                cursor: "pointer",
              }}
            >
              {imageFile ? (
                <img
                  src={URL.createObjectURL(
                    imageFile
                  )}
                  alt="Amenity Preview"
                  style={{
                    width: "55px",
                    height: "55px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              ) : imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Amenity"
                  style={{
                    width: "55px",
                    height: "55px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              ) : (
                <FiUpload className="amenities-upload-cloud-icon" />
              )}

              <span className="amenities-upload-text">
                Click to upload icon
              </span>

              <span className="amenities-upload-subtext">
                PNG, JPG, SVG (Max. 2MB)
              </span>

              <input
                type="file"
                accept=".png,.jpg,.jpeg,.webp,.svg,image/*"
                onChange={
                  handleImageChange
                }
                style={{
                  display: "none",
                }}
              />
            </label>

            <span className="amenities-icon-chooser-label">
              or choose from icons
            </span>

            <div className="amenities-icon-preset-grid">
              {[
                "🏊",
                "🤸",
                "🏋️",
                "🛡️",
                "📸",
                "🌳",
                "🏢",
              ].map((ic, idx) => (
                <button
                  type="button"
                  key={idx}
                  className={`amenities-preset-icon-btn ${
                    selectedIcon === ic
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedIcon(ic)
                  }
                >
                  {ic}
                </button>
              ))}

              <button
                type="button"
                className="amenities-preset-icon-btn amenities-more-btn"
              >
                More
              </button>
            </div>
          </div>

          {/* ================================= */}
          {/* DESCRIPTION */}
          {/* ================================= */}

          <div className="amenities-form-group">
            <label>Description</label>

            <textarea
              placeholder="Enter description (optional)"
              rows="2"
              maxLength="200"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
            ></textarea>

            <span className="amenities-char-counter">
              {description.length} / 200
            </span>
          </div>

          {/* ================================= */}
          {/* STATUS */}
          {/* ================================= */}

          <div className="amenities-form-group">
            <label>
              Status <span>*</span>
            </label>

            <div className="amenities-radio-group">
              <label className="amenities-radio-label">
                <input
                  type="radio"
                  name="amenitiesStatus"
                  checked={
                    status === "Active"
                  }
                  onChange={() =>
                    setStatus("Active")
                  }
                />{" "}
                Active
              </label>

              <label className="amenities-radio-label">
                <input
                  type="radio"
                  name="amenitiesStatus"
                  checked={
                    status === "Inactive"
                  }
                  onChange={() =>
                    setStatus("Inactive")
                  }
                />{" "}
                Inactive
              </label>
            </div>
          </div>

          {/* ================================= */}
          {/* SORT ORDER */}
          {/* ================================= */}

          <div className="amenities-form-group">
            <label>
              Sort Order <span>*</span>
            </label>

            <input
              type="number"
              placeholder="Enter sort order (e.g., 1, 2, 3...)"
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(
                  e.target.value
                )
              }
            />

            <span className="amenities-helper-text">
              Lower number will show first
            </span>
          </div>

          {/* ================================= */}
          {/* BUTTONS */}
          {/* ================================= */}

          <div className="amenities-modal-footer-actions">
            <button
              type="button"
              className="amenities-btn-cancel"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="amenities-btn-save"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : isEditing
                  ? "Update Amenity"
                  : "Save Amenity"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// =====================================================
// MAIN AMENITIES COMPONENT
// =====================================================

const Amenities = () => {
  // ================================================
  // BACKEND DATA
  // ================================================

  const [amenities, setAmenities] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  // ================================================
  // EXISTING UI STATES
  // ================================================

  const [
    isModalOpen,
    setIsModalOpen,
  ] = useState(false);

  const [
    searchTerm,
    setSearchTerm,
  ] = useState("");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState("All Status");

  const [sortBy, setSortBy] =
    useState(
      "Sort By: Name (A-Z)"
    );

  const [
    selectedIds,
    setSelectedIds,
  ] = useState([]);

  const [
    editingId,
    setEditingId,
  ] = useState(null);

  const [
    bulkAction,
    setBulkAction,
  ] = useState("Bulk Actions");

  // ================================================
  // FORM STATES
  // ================================================

  const [
    amenityName,
    setAmenityName,
  ] = useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [status, setStatus] =
    useState("Active");

  const [
    sortOrder,
    setSortOrder,
  ] = useState("");

  const [
    selectedIcon,
    setSelectedIcon,
  ] = useState("🏊");

  // ================================================
  // IMAGE
  // ================================================

  const [
    imageFile,
    setImageFile,
  ] = useState(null);

  const [
    imagePreview,
    setImagePreview,
  ] = useState("");

  // =====================================================
  // FETCH ALL AMENITIES
  // GET /api/amenities
  // =====================================================

  const fetchAmenities = async () => {
    try {
      setLoading(true);

      const response =
        await API.get(
          "/amenities"
        );

      console.log(
        "AMENITIES RESPONSE:",
        response.data
      );

      const result =
        response.data;

      const amenityData =
        result?.amenities ||
        result?.data ||
        [];

      setAmenities(
        Array.isArray(amenityData)
          ? amenityData
          : []
      );
    } catch (error) {
      console.error(
        "FETCH AMENITIES ERROR:",
        error.response?.data ||
          error
      );

      alert(
        error.response?.data
          ?.message ||
          "Failed to load amenities"
      );

      setAmenities([]);
    } finally {
      setLoading(false);
    }
  };

  // ================================================
  // FETCH ON PAGE LOAD
  // ================================================

  useEffect(() => {
    fetchAmenities();
  }, []);

  // =====================================================
  // GET IMAGE URL
  // =====================================================

  const getImageUrl = (image) => {
    if (!image) {
      return "";
    }

    if (
      image.startsWith(
        "http://"
      ) ||
      image.startsWith(
        "https://"
      ) ||
      image.startsWith(
        "blob:"
      ) ||
      image.startsWith(
        "data:"
      )
    ) {
      return image;
    }

    return `${BASE_URL}${
      image.startsWith("/")
        ? image
        : `/${image}`
    }`;
  };

  // =====================================================
  // RESET FORM
  // =====================================================

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

  // =====================================================
  // OPEN ADD MODAL
  // =====================================================

  const handleOpenAddModal = () => {
    resetForm();

    setIsModalOpen(true);
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const handleCloseModal = () => {
    if (saving) {
      return;
    }

    setIsModalOpen(false);

    resetForm();
  };

  // =====================================================
  // OPEN EDIT MODAL
  // =====================================================

  const handleOpenEditModal = (
    item
  ) => {
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

    setSelectedIcon(
      item.icon || "🏊"
    );

    setImageFile(null);

    setImagePreview(
      getImageUrl(item.image)
    );

    setIsModalOpen(true);
  };

  // =====================================================
  // CREATE / UPDATE AMENITY
  // =====================================================

  const handleSaveAmenity =
    async (e) => {
      e.preventDefault();

      if (!amenityName.trim()) {
        alert(
          "Amenity name is required."
        );

        return;
      }

      try {
        setSaving(true);

        // ============================================
        // FORMDATA
        // ============================================

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

        form.append(
          "icon",
          selectedIcon
        );

        // Image optional
        if (imageFile) {
          form.append(
            "image",
            imageFile
          );
        }

        // ============================================
        // DEBUG
        // ============================================

        console.log(
          "========= AMENITY FORM ========="
        );

        for (
          const [key, value]
          of form.entries()
        ) {
          console.log(
            key,
            value
          );
        }

        // ============================================
        // UPDATE
        // ============================================

        if (editingId) {
          const response =
            await API.put(
              `/amenities/${editingId}`,
              form
            );

          console.log(
            "UPDATE AMENITY:",
            response.data
          );

          alert(
            response.data
              ?.message ||
              "Amenity updated successfully."
          );
        }

        // ============================================
        // CREATE
        // ============================================

        else {
          const response =
            await API.post(
              "/amenities",
              form
            );

          console.log(
            "CREATE AMENITY:",
            response.data
          );

          alert(
            response.data
              ?.message ||
              "Amenity created successfully."
          );
        }

        // ============================================
        // CLOSE MODAL
        // ============================================

        setIsModalOpen(false);

        resetForm();

        // ============================================
        // REFRESH DATA
        // ============================================

        await fetchAmenities();
      } catch (error) {
        console.error(
          "SAVE AMENITY ERROR:",
          error.response?.data ||
            error
        );

        alert(
          error.response?.data
            ?.message ||
            "Failed to save amenity."
        );
      } finally {
        setSaving(false);
      }
    };

  // =====================================================
  // DELETE ONE AMENITY
  // =====================================================

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

        console.log(
          "DELETE AMENITY:",
          response.data
        );

        alert(
          response.data
            ?.message ||
            "Amenity deleted successfully."
        );

        // Remove selection
        setSelectedIds(
          (prev) =>
            prev.filter(
              (selectedId) =>
                selectedId !== id
            )
        );

        // Reload
        await fetchAmenities();
      } catch (error) {
        console.error(
          "DELETE AMENITY ERROR:",
          error.response?.data ||
            error
        );

        alert(
          error.response?.data
            ?.message ||
            "Failed to delete amenity."
        );
      }
    };

  // =====================================================
  // FILTERED AMENITIES
  // =====================================================

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

  // =====================================================
  // SELECT ALL
  // =====================================================

  const handleSelectAll = (
    e
  ) => {
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

  // =====================================================
  // SELECT ONE
  // =====================================================

  const handleSelectOne = (
    id
  ) => {
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

  // =====================================================
  // BULK DELETE
  // =====================================================

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

        console.log(
          "BULK DELETE:",
          response.data
        );

        alert(
          response.data
            ?.message ||
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
          error.response?.data
            ?.message ||
            "Failed to delete amenities."
        );
      }
    };

  // =====================================================
  // ACTIVE / INACTIVE COUNTS
  // =====================================================

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

  // =====================================================
  // USED PROPERTY COUNT
  // =====================================================

  const usedInProperties =
    amenities.reduce(
      (total, item) => {
        return (
          total +
          Number(
            item.propertiesCount ||
              0
          )
        );
      },
      0
    );

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div className="amenities-container">
      {/* ======================================== */}
      {/* HEADER */}
      {/* ======================================== */}

      <header className="amenities-header">
        <div className="amenities-header-title-wrapper">
          <div className="amenities-header-main-title">
            <FiGrid className="amenities-header-grid-icon" />

            <h1>
              Amenities Management
            </h1>
          </div>

          <span className="amenities-breadcrumb">
            Dashboard &gt; Amenities
          </span>
        </div>

        <div className="amenities-header-user-actions">
          <div className="amenities-notification-wrapper">
            <FiBell className="amenities-notification-icon" />

            <span className="amenities-notification-badge">
              5
            </span>
          </div>

          <div className="amenities-user-profile-box">
            <div className="amenities-avatar-placeholder">
              AU
            </div>

            <div className="amenities-user-meta">
              <span className="amenities-user-name">
                Admin User
              </span>

              <span className="amenities-user-role">
                Super Admin
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ======================================== */}
      {/* CONTENT */}
      {/* ======================================== */}

      <div className="amenities-dashboard-content-layout">
        <div className="amenities-main-dashboard-pane">
          {/* ==================================== */}
          {/* STATS GRID */}
          {/* ==================================== */}

          <div className="amenities-stats-grid">
            {/* TOTAL */}

            <div className="amenities-stat-card">
              <div className="amenities-stat-icon-box amenities-purple-bg">
                <FiGrid />
              </div>

              <div className="amenities-stat-details">
                <span className="amenities-stat-label">
                  Total Amenities
                </span>

                <h2 className="amenities-stat-value">
                  {
                    amenities.length
                  }
                </h2>

                <span className="amenities-stat-subtext">
                  All amenities added
                </span>
              </div>
            </div>

            {/* ACTIVE */}

            <div className="amenities-stat-card">
              <div className="amenities-stat-icon-box amenities-green-bg">
                <FiCheckCircle />
              </div>

              <div className="amenities-stat-details">
                <span className="amenities-stat-label">
                  Active Amenities
                </span>

                <h2 className="amenities-stat-value">
                  {activeCount}
                </h2>

                <span className="amenities-stat-subtext">
                  Currently active
                </span>
              </div>
            </div>

            {/* INACTIVE */}

            <div className="amenities-stat-card">
              <div className="amenities-stat-icon-box amenities-orange-bg">
                <FiSlash />
              </div>

              <div className="amenities-stat-details">
                <span className="amenities-stat-label">
                  Inactive Amenities
                </span>

                <h2 className="amenities-stat-value">
                  {inactiveCount}
                </h2>

                <span className="amenities-stat-subtext">
                  Currently inactive
                </span>
              </div>
            </div>

            {/* USED */}

            <div className="amenities-stat-card">
              <div className="amenities-stat-icon-box amenities-blue-bg">
                <FiHome />
              </div>

              <div className="amenities-stat-details">
                <span className="amenities-stat-label">
                  Used In Properties
                </span>

                <h2 className="amenities-stat-value">
                  {
                    usedInProperties
                  }
                </h2>

                <span className="amenities-stat-subtext">
                  Total properties
                </span>
              </div>
            </div>
          </div>

          {/* ==================================== */}
          {/* TOOLBAR */}
          {/* ==================================== */}

          <div className="amenities-toolbar-section">
            <div className="amenities-search-filter-group">
              <div className="amenities-search-input-wrapper">
                <FiSearch className="amenities-search-icon" />

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
                className="amenities-dropdown-filter"
                value={
                  statusFilter
                }
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
                className="amenities-dropdown-filter"
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
                className="amenities-btn-search"
              >
                Search
              </button>

              <button
                type="button"
                className="amenities-btn-reset"
                onClick={() => {
                  setSearchTerm(
                    ""
                  );

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
              className="amenities-btn-add-new"
              onClick={
                handleOpenAddModal
              }
            >
              <FiPlus />

              Add New Amenity
            </button>
          </div>

          {/* ==================================== */}
          {/* TABLE */}
          {/* ==================================== */}

          <div className="amenities-table-responsive-wrapper">
            <table className="amenities-table">
              <thead>
                <tr>
                  <th
                    style={{
                      width: "40px",
                    }}
                  >
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

                  <th>ICON</th>

                  <th>
                    AMENITY NAME
                  </th>

                  <th>
                    USED IN PROPERTIES
                  </th>

                  <th>STATUS</th>

                  <th>
                    SORT ORDER
                  </th>

                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan="7"
                      style={{
                        textAlign:
                          "center",
                        padding:
                          "24px",
                      }}
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
                        {/* CHECKBOX */}

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

                        {/* ICON */}

                        <td>
                          {item.image ? (
                            <span className="amenities-table-icon-cell">
                              <img
                                src={getImageUrl(
                                  item.image
                                )}
                                alt={
                                  item.name
                                }
                                style={{
                                  width:
                                    "38px",
                                  height:
                                    "38px",
                                  objectFit:
                                    "cover",
                                  borderRadius:
                                    "6px",
                                }}
                                onError={(
                                  e
                                ) => {
                                  e.currentTarget.style.display =
                                    "none";
                                }}
                              />
                            </span>
                          ) : (
                            <span className="amenities-table-icon-cell">
                              {item.icon ||
                                "🏊"}
                            </span>
                          )}
                        </td>

                        {/* NAME */}

                        <td className="amenities-amenity-name-cell">
                          {
                            item.name
                          }
                        </td>

                        {/* PROPERTY COUNT */}

                        <td>
                          {Number(
                            item.propertiesCount ||
                              0
                          )}{" "}
                          Properties
                        </td>

                        {/* STATUS */}

                        <td>
                          <span
                            className={`amenities-status-badge ${(
                              item.status ||
                              "Inactive"
                            ).toLowerCase()}`}
                          >
                            <span className="amenities-dot"></span>

                            {" "}
                            {item.status ||
                              "Inactive"}
                          </span>
                        </td>

                        {/* SORT */}

                        <td>
                          {item.sortOrder ??
                            0}
                        </td>

                        {/* ACTION */}

                        <td>
                          <div className="amenities-action-buttons">
                            <button
                              type="button"
                              className="amenities-btn-action edit"
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
                              className="amenities-btn-action delete"
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
                      style={{
                        textAlign:
                          "center",
                        padding:
                          "24px",
                      }}
                    >
                      No amenities found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ==================================== */}
          {/* FOOTER */}
          {/* ==================================== */}

          <div className="amenities-table-footer">
            <span className="amenities-pagination-info">
              Showing 1 to{" "}
              {
                filteredAmenities.length
              }{" "}
              of {amenities.length}{" "}
              amenities
            </span>

            <div className="amenities-pagination-controls-group">
              <div className="amenities-bulk-actions-wrapper">
                <select
                  className="amenities-dropdown-filter"
                  value={
                    bulkAction
                  }
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
                  className="amenities-btn-apply"
                  onClick={
                    handleApplyBulkAction
                  }
                >
                  Apply
                </button>
              </div>

              {/* Existing Pagination UI */}

              <div className="amenities-pagination-pages">
                <button
                  type="button"
                  className="amenities-page-btn"
                >
                  <FiChevronLeft />
                </button>

                <button
                  type="button"
                  className="amenities-page-btn active"
                >
                  1
                </button>

                <button
                  type="button"
                  className="amenities-page-btn"
                >
                  2
                </button>

                <button
                  type="button"
                  className="amenities-page-btn"
                >
                  3
                </button>

                <span>...</span>

                <button
                  type="button"
                  className="amenities-page-btn"
                >
                  4
                </button>

                <button
                  type="button"
                  className="amenities-page-btn"
                >
                  <FiChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================== */}
        {/* ADD / EDIT MODAL */}
        {/* ======================================== */}

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
          sortOrder={sortOrder}
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
          saving={saving}
        />
      </div>
    </div>
  );
};

export default Amenities;