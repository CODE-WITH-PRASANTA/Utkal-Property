import React, { useState, useRef, useEffect } from "react";
import "./Enquire.css";
import API from "../../api/Axios";

// =====================================================
// ENQUIRE COMPONENT
// =====================================================

const Enquire = () => {
  // ===================================================
  // ENQUIRIES
  // ===================================================

  const [enquiries, setEnquiries] = useState([]);

  // ===================================================
  // SEARCH
  // ===================================================

  const [searchTerm, setSearchTerm] = useState("");

  // ===================================================
  // FILTERS
  // ===================================================

  const [statusFilter, setStatusFilter] = useState("All");
  const [propertyFilter, setPropertyFilter] = useState("All");

  // ===================================================
  // PAGINATION
  // ===================================================

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // ===================================================
  // MODALS
  // ===================================================

  const [isFormModalOpen, setIsFormModalOpen] =
    useState(false);

  const [editingId, setEditingId] = useState(null);

  const [selectedEnquiry, setSelectedEnquiry] =
    useState(null);

  // ===================================================
  // FORM
  // ===================================================

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    status: "New",
  });

  // ===================================================
  // LOADING
  // ===================================================

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [deletingId, setDeletingId] = useState(null);

  const filterRefs = useRef({});

  // ===================================================
  // FORMAT DATE
  // ===================================================

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "N/A";
    }

    try {
      const date = new Date(dateValue);

      if (Number.isNaN(date.getTime())) {
        return "N/A";
      }

      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch (error) {
      return "N/A";
    }
  };

  // ===================================================
  // GET PROPERTY NAME
  // ===================================================

  const getPropertyName = (item) => {
    if (!item?.propertyId) {
      return "N/A";
    }

    if (typeof item.propertyId === "string") {
      return item.propertyId;
    }

    return (
      item.propertyId.name ||
      item.propertyId.title ||
      "N/A"
    );
  };

  // ===================================================
  // MAP BACKEND DATA
  // ===================================================

  const mapBackendEnquiry = (item) => {
    return {
      id: item._id,
      _id: item._id,

      name: item.name || "N/A",

      email: item.email || "N/A",

      phone: item.mobile || "N/A",

      status: item.status || "New",

      date: formatDate(item.createdAt),

      property: getPropertyName(item),

      propertyId:
        typeof item.propertyId === "object"
          ? item.propertyId?._id
          : item.propertyId,
    };
  };

  // ===================================================
  // FETCH ENQUIRIES
  // ===================================================

  const fetchEnquiries = async () => {
    try {
      setLoading(true);

      const response =
        await API.get("/property-contacts");

      console.log(
        "PROPERTY CONTACTS RESPONSE:",
        response.data
      );

      const backendData =
        response.data?.data || [];

      if (Array.isArray(backendData)) {
        const mappedData =
          backendData.map(
            mapBackendEnquiry
          );

        setEnquiries(mappedData);
      } else {
        setEnquiries([]);
      }
    } catch (error) {
      console.error(
        "FETCH ENQUIRIES ERROR:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
          "Failed to load enquiries."
      );
    } finally {
      setLoading(false);
    }
  };

  // ===================================================
  // LOAD DATA
  // ===================================================

  useEffect(() => {
    fetchEnquiries();
  }, []);

  // ===================================================
  // PROPERTY OPTIONS
  // ===================================================

  const propertyOptions = Array.from(
    new Set(
      enquiries.map(
        (item) => item.property
      )
    )
  ).filter(Boolean);

  // ===================================================
  // FILTER
  // ===================================================

  const filteredEnquiries =
    enquiries.filter((item) => {
      const search =
        searchTerm.toLowerCase();

      const matchesSearch =
        String(item.name || "")
          .toLowerCase()
          .includes(search) ||
        String(item.email || "")
          .toLowerCase()
          .includes(search) ||
        String(item.property || "")
          .toLowerCase()
          .includes(search) ||
        String(item.phone || "")
          .toLowerCase()
          .includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      const matchesProperty =
        propertyFilter === "All" ||
        item.property === propertyFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesProperty
      );
    });

  // ===================================================
  // PAGINATION
  // ===================================================

  const totalPages =
    Math.ceil(
      filteredEnquiries.length /
        itemsPerPage
    ) || 1;

  const startIndex =
    (currentPage - 1) *
    itemsPerPage;

  const currentEnquiries =
    filteredEnquiries.slice(
      startIndex,
      startIndex + itemsPerPage
    );

  // ===================================================
  // RESET PAGE
  // ===================================================

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    statusFilter,
    propertyFilter,
  ]);

  // ===================================================
  // PAGE CHANGE
  // ===================================================

  const handlePageChange = (page) => {
    if (
      page >= 1 &&
      page <= totalPages
    ) {
      setCurrentPage(page);
    }
  };

  // ===================================================
  // INPUT CHANGE
  // ===================================================

  const handleInputChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===================================================
  // RESET FORM
  // ===================================================

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      status: "New",
    });

    setEditingId(null);
  };

  // ===================================================
  // OPEN EDIT
  // ===================================================

  const handleOpenEditModal = (item) => {
    setEditingId(
      item._id || item.id
    );

    setFormData({
      fullName: item.name || "",

      email: item.email || "",

      phone: item.phone || "",

      status:
        item.status || "New",
    });

    setIsFormModalOpen(true);
  };

  // ===================================================
  // UPDATE ENQUIRY
  // ===================================================

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!editingId) {
      alert(
        "Customer enquiries are submitted from the property details page."
      );

      return;
    }

    // ================================================
    // VALIDATION
    // ================================================

    if (!formData.fullName.trim()) {
      alert("Name is required.");
      return;
    }

    if (!formData.email.trim()) {
      alert("Email is required.");
      return;
    }

    if (!formData.phone.trim()) {
      alert("Mobile number is required.");
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(
        formData.email.trim()
      )
    ) {
      alert(
        "Please enter a valid email address."
      );

      return;
    }

    // ================================================
    // BACKEND PAYLOAD
    // ================================================

    const payload = {
      name:
        formData.fullName.trim(),

      email:
        formData.email
          .trim()
          .toLowerCase(),

      mobile:
        formData.phone.trim(),

      status:
        formData.status,
    };

    try {
      setSaving(true);

      console.log(
        "UPDATE CONTACT PAYLOAD:",
        payload
      );

      const response =
        await API.put(
          `/property-contacts/${editingId}`,
          payload
        );

      console.log(
        "UPDATE CONTACT RESPONSE:",
        response.data
      );

      alert(
        response.data?.message ||
          "Enquiry updated successfully."
      );

      await fetchEnquiries();

      setIsFormModalOpen(false);

      resetForm();
    } catch (error) {
      console.error(
        "UPDATE ENQUIRY ERROR:",
        error.response?.data ||
          error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update enquiry."
      );
    } finally {
      setSaving(false);
    }
  };

  // ===================================================
  // DELETE
  // ===================================================

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this enquiry?"
      )
    ) {
      return;
    }

    try {
      setDeletingId(id);

      const response =
        await API.delete(
          `/property-contacts/${id}`
        );

      alert(
        response.data?.message ||
          "Enquiry deleted successfully."
      );

      await fetchEnquiries();
    } catch (error) {
      console.error(
        "DELETE ENQUIRY ERROR:",
        error.response?.data ||
          error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete enquiry."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ===================================================
  // RESET FILTERS
  // ===================================================

  const handleResetFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setPropertyFilter("All");
    setCurrentPage(1);
  };

  // ===================================================
  // STATUS COUNT
  // ===================================================

  const getStatusCount = (status) => {
    return enquiries.filter(
      (item) =>
        item.status === status
    ).length;
  };

  // ===================================================
  // RETURN
  // ===================================================

  return (
    <div className="enquiry-container">

      {/* HEADER */}

      <div className="enquiry-header">

        <div className="enquiry-header__text">

          <h1 className="enquiry-header__title">
            Enquiry
          </h1>

          <p className="enquiry-header__subtitle">
            View and manage all property enquiries.
          </p>

        </div>

      </div>

      {/* MAIN CARD */}

      <div className="enquiry-card">

        {/* CONTROLS */}

        <div className="enquiry-controls">

          <div className="enquiry-controls__search">

            <svg
              className="search-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9CA3AF"
              strokeWidth="2"
            >
              <circle
                cx="11"
                cy="11"
                r="8"
              />

              <line
                x1="21"
                y1="21"
                x2="16.65"
                y2="16.65"
              />
            </svg>

            <input
              type="text"
              placeholder="Search enquiries..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
            />

          </div>

          <div className="enquiry-controls__filters">

            {/* STATUS */}

            <div className="filter-group">

              <select
                className="filter-select"
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value
                  )
                }
              >

                <option value="All">
                  All Status ({enquiries.length})
                </option>

                <option value="New">
                  New ({getStatusCount("New")})
                </option>

                <option value="Contacted">
                  Contacted (
                  {getStatusCount(
                    "Contacted"
                  )}
                  )
                </option>

                <option value="Closed">
                  Closed (
                  {getStatusCount(
                    "Closed"
                  )}
                  )
                </option>

              </select>

            </div>

            {/* PROPERTY */}

            <div className="filter-group">

              <select
                className="filter-select"
                value={propertyFilter}
                onChange={(e) =>
                  setPropertyFilter(
                    e.target.value
                  )
                }
              >

                <option value="All">
                  All Properties
                </option>

                {propertyOptions.map(
                  (prop, idx) => (
                    <option
                      key={idx}
                      value={prop}
                    >
                      {prop}
                    </option>
                  )
                )}

              </select>

            </div>

            {/* RESET */}

            <button
              className="filter-btn"
              onClick={
                handleResetFilters
              }
              title="Reset Filters"
            >

              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >

                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />

              </svg>

              Reset

            </button>

          </div>

        </div>

        {/* ACTIVE FILTERS */}

        {(statusFilter !== "All" ||
          propertyFilter !== "All" ||
          searchTerm) && (

          <div className="enquiry-filter-status">

            <span className="filter-status-label">
              Active Filters:
            </span>

            {searchTerm && (
              <span className="filter-tag">

                Search: "{searchTerm}"

                <button
                  className="filter-tag-remove"
                  onClick={() =>
                    setSearchTerm("")
                  }
                >
                  ×
                </button>

              </span>
            )}

            {statusFilter !== "All" && (
              <span className="filter-tag">

                Status: {statusFilter}

                <button
                  className="filter-tag-remove"
                  onClick={() =>
                    setStatusFilter(
                      "All"
                    )
                  }
                >
                  ×
                </button>

              </span>
            )}

            {propertyFilter !== "All" && (
              <span className="filter-tag">

                Property: {propertyFilter}

                <button
                  className="filter-tag-remove"
                  onClick={() =>
                    setPropertyFilter(
                      "All"
                    )
                  }
                >
                  ×
                </button>

              </span>
            )}

            <span className="filter-results-count">

              {filteredEnquiries.length}{" "}
              result
              {filteredEnquiries.length !== 1
                ? "s"
                : ""}

            </span>

          </div>
        )}

        {/* TABLE */}

        <div className="enquiry-table-wrapper">

          <table className="enquiry-table">

            <thead>

              <tr>

                <th>Name</th>

                <th>Property</th>

                <th>Contact</th>

                <th>Status</th>

                <th>Date</th>

                <th className="text-right">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan="6"
                    className="no-data"
                  >

                    <div className="no-data-content">

                      <p>
                        Loading enquiries...
                      </p>

                    </div>

                  </td>

                </tr>

              ) : currentEnquiries.length > 0 ? (

                currentEnquiries.map(
                  (item) => (

                    <tr
                      key={
                        item._id ||
                        item.id
                      }
                    >

                      <td className="font-semibold">
                        {item.name}
                      </td>

                      <td className="text-secondary">
                        {item.property}
                      </td>

                      <td>

                        <div className="contact-cell">

                          <span className="contact-email">
                            {item.email}
                          </span>

                          <span className="contact-phone">
                            {item.phone}
                          </span>

                        </div>

                      </td>

                      <td>

                        <span
                          className={`status-badge status-badge--${item.status
                            .toLowerCase()
                            .replace(
                              /\s+/g,
                              "-"
                            )}`}
                        >
                          {item.status}
                        </span>

                      </td>

                      <td className="text-secondary">
                        {item.date}
                      </td>

                      <td className="text-right">

                        <div className="action-buttons">

                          {/* VIEW */}

                          <button
                            className="action-btn action-btn--view"
                            title="View Details"
                            onClick={() =>
                              setSelectedEnquiry(
                                item
                              )
                            }
                          >

                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >

                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />

                              <circle
                                cx="12"
                                cy="12"
                                r="3"
                              />

                            </svg>

                          </button>

                          {/* EDIT */}

                          <button
                            className="action-btn action-btn--edit"
                            title="Edit Enquiry"
                            onClick={() =>
                              handleOpenEditModal(
                                item
                              )
                            }
                          >

                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >

                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />

                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />

                            </svg>

                          </button>

                          {/* DELETE */}

                          <button
                            className="action-btn action-btn--delete"
                            title="Delete"
                            disabled={
                              deletingId ===
                              (
                                item._id ||
                                item.id
                              )
                            }
                            onClick={() =>
                              handleDelete(
                                item._id ||
                                item.id
                              )
                            }
                          >

                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >

                              <polyline points="3 6 5 6 21 6" />

                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />

                            </svg>

                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    className="no-data"
                  >

                    <div className="no-data-content">

                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#94a3b8"
                        strokeWidth="1.5"
                      >

                        <circle
                          cx="11"
                          cy="11"
                          r="8"
                        />

                        <line
                          x1="21"
                          y1="21"
                          x2="16.65"
                          y2="16.65"
                        />

                      </svg>

                      <p>
                        No enquiries found
                      </p>

                      <span>
                        Try adjusting your search or filter criteria
                      </span>

                    </div>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* FOOTER */}

        <div className="enquiry-footer">

          <span className="enquiry-footer__info">

            Showing{" "}

            <strong>
              {filteredEnquiries.length === 0
                ? 0
                : startIndex + 1}
            </strong>{" "}

            to{" "}

            <strong>
              {Math.min(
                startIndex +
                  itemsPerPage,
                filteredEnquiries.length
              )}
            </strong>{" "}

            of{" "}

            <strong>
              {filteredEnquiries.length}
            </strong>{" "}

            enquiries

          </span>

          <div className="pagination">

            <button
              className="pagination__arrow"
              disabled={
                currentPage === 1
              }
              onClick={() =>
                handlePageChange(
                  currentPage - 1
                )
              }
            >
              &#8249;
            </button>

            {Array.from(
              {
                length: Math.min(
                  totalPages,
                  5
                ),
              },
              (_, i) => {

                let pageNum;

                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (
                  currentPage <= 3
                ) {
                  pageNum = i + 1;
                } else if (
                  currentPage >=
                  totalPages - 2
                ) {
                  pageNum =
                    totalPages -
                    4 +
                    i;
                } else {
                  pageNum =
                    currentPage -
                    2 +
                    i;
                }

                return (
                  <button
                    key={pageNum}
                    className={`pagination__page ${
                      currentPage ===
                      pageNum
                        ? "pagination__page--active"
                        : ""
                    }`}
                    onClick={() =>
                      handlePageChange(
                        pageNum
                      )
                    }
                  >
                    {pageNum}
                  </button>
                );
              }
            )}

            {totalPages > 5 &&
              currentPage <
                totalPages - 2 && (
                <>
                  <span className="pagination__ellipsis">
                    …
                  </span>

                  <button
                    className="pagination__page"
                    onClick={() =>
                      handlePageChange(
                        totalPages
                      )
                    }
                  >
                    {totalPages}
                  </button>
                </>
              )}

            <button
              className="pagination__arrow"
              disabled={
                currentPage ===
                totalPages
              }
              onClick={() =>
                handlePageChange(
                  currentPage + 1
                )
              }
            >
              &#8250;
            </button>

          </div>

        </div>

      </div>

      {/* =================================================
          EDIT ENQUIRY FORM
      ================================================= */}

      {isFormModalOpen && (

        <div
          className="modal-backdrop"
          onClick={(e) => {
            if (
              e.target ===
              e.currentTarget
            ) {
              setIsFormModalOpen(false);
              resetForm();
            }
          }}
        >

          <div className="modal-container">

            <div className="modal-header">

              <h2>
                Edit Enquiry
              </h2>

              <button
                className="modal-close"
                onClick={() => {
                  setIsFormModalOpen(
                    false
                  );
                  resetForm();
                }}
              >
                &times;
              </button>

            </div>

            <form
              onSubmit={
                handleFormSubmit
              }
            >

              <div className="modal-body">

                <div className="form-grid">

                  {/* NAME */}

                  <div className="form-group">

                    <label>
                      Full Name *
                    </label>

                    <input
                      type="text"
                      name="fullName"
                      placeholder="Enter full name"
                      value={
                        formData.fullName
                      }
                      onChange={
                        handleInputChange
                      }
                      required
                    />

                  </div>

                  {/* EMAIL */}

                  <div className="form-group">

                    <label>
                      Email Address *
                    </label>

                    <input
                      type="email"
                      name="email"
                      placeholder="Enter email address"
                      value={
                        formData.email
                      }
                      onChange={
                        handleInputChange
                      }
                      required
                    />

                  </div>

                  {/* MOBILE */}

                  <div className="form-group">

                    <label>
                      Phone Number *
                    </label>

                    <input
                      type="text"
                      name="phone"
                      placeholder="Enter phone number"
                      value={
                        formData.phone
                      }
                      onChange={
                        handleInputChange
                      }
                      required
                    />

                  </div>

                  {/* STATUS */}

                  <div className="form-group">

                    <label>
                      Status
                    </label>

                    <select
                      name="status"
                      value={
                        formData.status
                      }
                      onChange={
                        handleInputChange
                      }
                    >

                      <option value="New">
                        New
                      </option>

                      <option value="Contacted">
                        Contacted
                      </option>

                      <option value="Closed">
                        Closed
                      </option>

                    </select>

                  </div>

                </div>

              </div>

              <div className="modal-footer">

                <button
                  type="button"
                  className="btn btn--cancel"
                  onClick={() => {
                    setIsFormModalOpen(
                      false
                    );

                    resetForm();
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn--submit"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : "Save Changes"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* =================================================
          VIEW DETAILS
      ================================================= */}

      {selectedEnquiry && (

        <div
          className="modal-backdrop"
          onClick={(e) => {
            if (
              e.target ===
              e.currentTarget
            ) {
              setSelectedEnquiry(
                null
              );
            }
          }}
        >

          <div className="modal-container modal-container--sm">

            <div className="modal-header">

              <h2>
                Enquiry Details
              </h2>

              <button
                className="modal-close"
                onClick={() =>
                  setSelectedEnquiry(
                    null
                  )
                }
              >
                &times;
              </button>

            </div>

            <div className="modal-body detail-view">

              {/* NAME */}

              <div className="detail-row">

                <span className="detail-label">
                  Name
                </span>

                <span className="detail-value">
                  {
                    selectedEnquiry.name
                  }
                </span>

              </div>

              {/* PROPERTY */}

              <div className="detail-row">

                <span className="detail-label">
                  Property
                </span>

                <span className="detail-value">
                  {
                    selectedEnquiry.property
                  }
                </span>

              </div>

              {/* EMAIL */}

              <div className="detail-row">

                <span className="detail-label">
                  Email
                </span>

                <span className="detail-value">
                  {
                    selectedEnquiry.email
                  }
                </span>

              </div>

              {/* MOBILE */}

              <div className="detail-row">

                <span className="detail-label">
                  Phone
                </span>

                <span className="detail-value">
                  {
                    selectedEnquiry.phone
                  }
                </span>

              </div>

              {/* STATUS */}

              <div className="detail-row">

                <span className="detail-label">
                  Status
                </span>

                <span
                  className={`status-badge status-badge--${selectedEnquiry.status
                    .toLowerCase()
                    .replace(
                      /\s+/g,
                      "-"
                    )}`}
                >
                  {
                    selectedEnquiry.status
                  }
                </span>

              </div>

              {/* DATE */}

              <div className="detail-row">

                <span className="detail-label">
                  Date
                </span>

                <span className="detail-value">
                  {
                    selectedEnquiry.date
                  }
                </span>

              </div>

            </div>

            <div className="modal-footer">

              <button
                className="btn btn--cancel"
                onClick={() =>
                  setSelectedEnquiry(
                    null
                  )
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Enquire;