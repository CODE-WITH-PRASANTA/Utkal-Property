
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Search,
  RefreshCw,
  Eye,
  Pencil,
  Trash2,
  X,
  Phone,
  Mail,
  MapPin,
  Home,
  Building2,
  Wallet,
  UserRound,
  CalendarDays,
  CircleCheck,
  Clock3,
  AlertCircle,
} from "lucide-react";

import API from "../../api/axios";

import "./Enquire.css";

/* =========================================================
   CONSTANTS
========================================================= */

const STATUS_OPTIONS = [
  "All Status",
  "New",
  "Follow Up",
  "Site Visit",
  "Converted",
  "Lost Lead",
];

const PRIORITY_OPTIONS = [
  "Low",
  "Medium",
  "High",
];

/* =========================================================
   HELPERS
========================================================= */

const formatDate = (date) => {
  if (!date) {
    return "-";
  }

  const parsedDate =
    new Date(date);

  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {
    return "-";
  }

  return parsedDate.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

const getInitials = (name) => {
  if (!name) {
    return "PE";
  }

  return String(name)
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(
      (word) =>
        word
          .charAt(0)
          .toUpperCase()
    )
    .join("");
};

/* =========================================================
   STATUS BADGE
========================================================= */

const StatusBadge = ({
  status,
}) => {
  const normalized =
    status || "New";

  const className =
    normalized
      .toLowerCase()
      .replace(/\s+/g, "-");

  return (
    <span
      className={`Enquiry-status Enquiry-status--${className}`}
    >
      {normalized}
    </span>
  );
};

/* =========================================================
   PRIORITY BADGE
========================================================= */

const PriorityBadge = ({
  priority,
}) => {
  const normalized =
    priority || "Medium";

  return (
    <span
      className={`Enquiry-priority Enquiry-priority--${normalized.toLowerCase()}`}
    >
      {normalized}
    </span>
  );
};

/* =========================================================
   DETAIL ITEM
========================================================= */

const DetailItem = ({
  icon,
  label,
  value,
  fullWidth = false,
}) => {
  return (
    <div
      className={`Enquiry-detail-item ${
        fullWidth
          ? "Enquiry-detail-item--full"
          : ""
      }`}
    >
      <div className="Enquiry-detail-icon">
        {icon}
      </div>

      <div className="Enquiry-detail-content">
        <span className="Enquiry-detail-label">
          {label}
        </span>

        <strong className="Enquiry-detail-value">
          {value || "-"}
        </strong>
      </div>
    </div>
  );
};

/* =========================================================
   EDIT FIELD
========================================================= */

const EditField = ({
  label,
  value,
  onChange,
  type = "text",
  options = [],
  placeholder = "",
}) => {
  return (
    <div className="Enquiry-edit-field">

      <label>
        {label}
      </label>

      {options.length > 0 ? (
        <select
          value={value || ""}
          onChange={onChange}
        >
          <option value="">
            Select {label}
          </option>

          {options.map(
            (option) => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            )
          )}
        </select>
      ) : (
        <input
          type={type}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}

    </div>
  );
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const Enquiry = () => {

  /* =======================================================
     DATA
  ======================================================= */

  const [enquiries, setEnquiries] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [refreshing, setRefreshing] =
    useState(false);

  /* =======================================================
     SEARCH / FILTER
  ======================================================= */

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All Status");

  /* =======================================================
     PAGINATION
  ======================================================= */

  const [currentPage, setCurrentPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [total, setTotal] =
    useState(0);

  /* =======================================================
     MODALS
  ======================================================= */

  const [selectedEnquiry, setSelectedEnquiry] =
    useState(null);

  const [viewOpen, setViewOpen] =
    useState(false);

  const [editOpen, setEditOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  /* =======================================================
     EDIT DATA
  ======================================================= */

  const [editData, setEditData] =
    useState({});

  const [saving, setSaving] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  /* =======================================================
     MESSAGE
  ======================================================= */

  const [message, setMessage] =
    useState("");

  const [messageType, setMessageType] =
    useState("");

  /* =========================================================
     FETCH ENQUIRIES
  ========================================================= */

  const fetchEnquiries = useCallback(
    async ({
      showLoader = true,
    } = {}) => {

      try {

        if (showLoader) {
          setLoading(true);
        } else {
          setRefreshing(true);
        }

        const response =
          await API.get(
            "/leads",
            {
              params: {
                page:
                  currentPage,

                limit:
                  100,

                search:
                  search.trim(),

                status:
                  statusFilter ===
                  "All Status"
                    ? ""
                    : statusFilter,
              },
            }
          );

        console.log(
          "ENQUIRIES RESPONSE:",
          response.data
        );

        const leads =
          response.data?.leads ||
          [];

        setEnquiries(
          leads
        );

        setTotal(
          Number(
            response.data?.total
          ) || leads.length
        );

        setTotalPages(
          Number(
            response.data
              ?.totalPages
          ) || 1
        );

      } catch (error) {

        console.error(
          "FETCH ENQUIRIES ERROR:",
          error.response?.data ||
            error
        );

        setEnquiries([]);

        setMessage(
          error.response?.data
            ?.message ||
            "Unable to fetch enquiries."
        );

        setMessageType(
          "error"
        );

      } finally {

        setLoading(false);
        setRefreshing(false);

      }
    },
    [
      currentPage,
      search,
      statusFilter,
    ]
  );

  /* =========================================================
     INITIAL FETCH
  ========================================================= */

  useEffect(() => {

    fetchEnquiries();

  }, [
    fetchEnquiries,
  ]);

  /* =========================================================
     AUTO CLEAR MESSAGE
  ========================================================= */

  useEffect(() => {

    if (!message) {
      return;
    }

    const timer =
      setTimeout(() => {

        setMessage("");
        setMessageType("");

      }, 4000);

    return () =>
      clearTimeout(timer);

  }, [message]);

  /* =========================================================
     FILTERED DATA
  ========================================================= */

  const displayedEnquiries =
    useMemo(() => {

      /*
       * Backend already handles
       * search and status.
       *
       * This local filter is only
       * an additional safety layer.
       */

      let result =
        [...enquiries];

      if (
        search.trim()
      ) {

        const query =
          search
            .trim()
            .toLowerCase();

        result =
          result.filter(
            (item) => {

              const values = [
                item.fullName,
                item.mobile,
                item.email,
                item.lookingFor,
                item.interestedIn,
                item.location,
                item.preferredArea,
                item.budgetRange,
                item.propertyName,
                item.source,
                item.agent,
              ];

              return values.some(
                (value) =>
                  String(
                    value || ""
                  )
                    .toLowerCase()
                    .includes(
                      query
                    )
              );
            }
          );
      }

      return result;

    }, [
      enquiries,
      search,
    ]);

  /* =========================================================
     VIEW ENQUIRY
  ========================================================= */

  const handleView = async (
    enquiry
  ) => {

    try {

      setLoading(true);

      const response =
        await API.get(
          `/leads/${enquiry._id}`
        );

<<<<<<< HEAD
     
=======
      const lead =
        response.data?.lead ||
        enquiry;

      setSelectedEnquiry(
        lead
      );
>>>>>>> 33dc575c48257ed0367008a23664dd650efa1e77

      setViewOpen(true);

    } catch (error) {

      console.error(
        "VIEW ENQUIRY ERROR:",
        error.response?.data ||
          error
      );

      /*
       * Fallback to existing
       * table object.
       */

      setSelectedEnquiry(
        enquiry
      );

      setViewOpen(true);

    } finally {

      setLoading(false);

    }
  };

  /* =========================================================
     EDIT ENQUIRY
  ========================================================= */

  const handleEdit = (
    enquiry
  ) => {

    setSelectedEnquiry(
      enquiry
    );

    setEditData({
      fullName:
        enquiry.fullName ||
        "Property Enquiry",

      mobile:
        enquiry.mobile ||
        "",

      email:
        enquiry.email ||
        "",

      lookingFor:
        enquiry.lookingFor ||
        "Buy",

      interestedIn:
        enquiry.interestedIn ||
        "",

      location:
        enquiry.location ||
        "",

      preferredArea:
        enquiry.preferredArea ||
        "",

      budgetRange:
        enquiry.budgetRange ||
        "",

      propertyName:
        enquiry.propertyName ||
        "",

      project:
        enquiry.project ||
        "",

      source:
        enquiry.source ||
        "Website",

      agent:
        enquiry.agent ||
        "",

      status:
        enquiry.status ||
        "New",

      priority:
        enquiry.priority ||
        "Medium",

      followUpDate:
        enquiry.followUpDate ||
        "",

      score:
        enquiry.score ||
        0,

      notes:
        enquiry.notes ||
        "",
    });

    setEditOpen(true);

  };

  /* =========================================================
     EDIT FIELD CHANGE
  ========================================================= */

  const handleEditChange = (
    field,
    value
  ) => {

    setEditData(
      (previous) => ({
        ...previous,
        [field]: value,
      })
    );

  };

  /* =========================================================
     SAVE EDIT
  ========================================================= */

  const handleSaveEdit =
    async () => {

      if (
        !selectedEnquiry?._id
      ) {
        return;
      }

      try {

        setSaving(true);

        const response =
          await API.put(
            `/leads/${selectedEnquiry._id}`,
            editData
          );

        console.log(
          "UPDATED ENQUIRY:",
          response.data
        );

        setMessage(
          response.data?.message ||
            "Enquiry updated successfully."
        );

        setMessageType(
          "success"
        );

        setEditOpen(false);

        setSelectedEnquiry(null);

        await fetchEnquiries({
          showLoader: false,
        });

      } catch (error) {

        console.error(
          "UPDATE ENQUIRY ERROR:",
          error.response?.data ||
            error
        );

        setMessage(
          error.response?.data
            ?.message ||
            "Unable to update enquiry."
        );

        setMessageType(
          "error"
        );

      } finally {

        setSaving(false);

      }
    };

  /* =========================================================
     DELETE CONFIRM
  ========================================================= */

<<<<<<< HEAD
     
=======
  const handleDeleteConfirm =
    async () => {
>>>>>>> 33dc575c48257ed0367008a23664dd650efa1e77

      if (
        !selectedEnquiry?._id
      ) {
        return;
      }

      try {

        setDeleting(true);

        const response =
          await API.delete(
            `/leads/${selectedEnquiry._id}`
          );

        console.log(
          "DELETE RESPONSE:",
          response.data
        );

<<<<<<< HEAD
     

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
=======
        setMessage(
          response.data?.message ||
            "Enquiry deleted successfully."
>>>>>>> 33dc575c48257ed0367008a23664dd650efa1e77
        );

        setMessageType(
          "success"
        );

        setDeleteOpen(false);

        setSelectedEnquiry(null);

        await fetchEnquiries({
          showLoader: false,
        });

      } catch (error) {

        console.error(
          "DELETE ENQUIRY ERROR:",
          error.response?.data ||
            error
        );

        setMessage(
          error.response?.data
            ?.message ||
            "Unable to delete enquiry."
        );

        setMessageType(
          "error"
        );

      } finally {

        setDeleting(false);

      }
    };

  /* =========================================================
     REFRESH
  ========================================================= */

  const handleRefresh = () => {

    fetchEnquiries({
      showLoader: false,
    });

  };

  /* =========================================================
     SEARCH CHANGE
  ========================================================= */

  const handleSearchChange = (
    e
  ) => {

    setSearch(
      e.target.value
    );

    setCurrentPage(1);

  };

  /* =========================================================
     STATUS CHANGE
  ========================================================= */

  const handleStatusChange = (
    e
  ) => {

    setStatusFilter(
      e.target.value
    );

    setCurrentPage(1);

  };

  /* =========================================================
     CLOSE MODALS
  ========================================================= */

  const closeAllModals = () => {

    setViewOpen(false);
    setEditOpen(false);
    setDeleteOpen(false);

    setSelectedEnquiry(null);

  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="Enquiry-page">

      {/* ===================================================
          HEADER
      =================================================== */}

      <div className="Enquiry-header">

        <div>
          <h1 className="Enquiry-title">
            Enquiries
          </h1>

          <p className="Enquiry-subtitle">
            Manage property enquiries submitted
            from your website.
          </p>
        </div>

        <button
          type="button"
          className="Enquiry-refresh-btn"
          onClick={
            handleRefresh
          }
          disabled={
            refreshing
          }
        >
          <RefreshCw
            size={16}
            className={
              refreshing
                ? "Enquiry-spin"
                : ""
            }
          />

          Refresh
        </button>

      </div>

      {/* ===================================================
          MESSAGE
      =================================================== */}

      {message && (
        <div
          className={`Enquiry-message ${
            messageType ===
            "success"
              ? "Enquiry-message--success"
              : "Enquiry-message--error"
          }`}
        >
          {messageType ===
          "success" ? (
            <CircleCheck
              size={17}
            />
          ) : (
            <AlertCircle
              size={17}
            />
          )}

          <span>
            {message}
          </span>

          <button
            type="button"
            onClick={() => {
              setMessage("");
              setMessageType("");
            }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* ===================================================
          FILTER BAR
      =================================================== */}

      <div className="Enquiry-toolbar">

        <div className="Enquiry-search">

          <Search
            size={17}
          />

          <input
            type="text"
            value={search}
            onChange={
              handleSearchChange
            }
            placeholder="Search name, mobile, location, area, property..."
          />

          {search && (
            <button
              type="button"
              className="Enquiry-search-clear"
              onClick={() => {
                setSearch("");
                setCurrentPage(1);
              }}
            >
              <X size={14} />
            </button>
          )}

        </div>

        <select
          className="Enquiry-filter"
          value={
            statusFilter
          }
          onChange={
            handleStatusChange
          }
        >

          {STATUS_OPTIONS.map(
            (status) => (
              <option
                key={status}
                value={status}
              >
                {status}
              </option>
            )
          )}

        </select>

        <div className="Enquiry-total">
          {total} Enquiries
        </div>

      </div>

      {/* ===================================================
          TABLE
      =================================================== */}

      <div className="Enquiry-table-card">

        {loading ? (
          <div className="Enquiry-loading">
            <RefreshCw
              size={25}
              className="Enquiry-spin"
            />

            <span>
              Loading enquiries...
            </span>
          </div>
        ) : displayedEnquiries.length ===
          0 ? (

          <div className="Enquiry-empty">

            <div className="Enquiry-empty-icon">
              <MessageEmptyIcon />
            </div>

            <h3>
              No enquiries found
            </h3>

            <p>
              New website enquiries will
              appear here.
            </p>

          </div>

        ) : (

          <div className="Enquiry-table-wrapper">

            <table className="Enquiry-table">

              <thead>
                <tr>

                  <th>
                    Customer
                  </th>

                  <th>
                    Looking For
                  </th>

                  <th>
                    Property Type
                  </th>

                  <th>
                    Location
                  </th>

                  <th>
                    Preferred Area
                  </th>

                  <th>
                    Budget
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Date
                  </th>

                  <th>
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody>

                {displayedEnquiries.map(
                  (enquiry) => (

                    <tr
                      key={
                        enquiry._id
                      }
                    >

                      {/* CUSTOMER */}

                      <td>

                        <div className="Enquiry-customer">

                          <div className="Enquiry-avatar">
                            {getInitials(
                              enquiry.fullName
                            )}
                          </div>

                          <div className="Enquiry-customer-info">

                            <strong>
                              {
                                enquiry.fullName ||
                                "Property Enquiry"
                              }
                            </strong>

                            <span>
                              <Phone
                                size={11}
                              />

                              {
                                enquiry.mobile ||
                                "-"
                              }
                            </span>

                          </div>

                        </div>

                      </td>

                      {/* LOOKING FOR */}

                      <td>
                        <span
                          className={`Enquiry-looking Enquiry-looking--${String(
                            enquiry.lookingFor ||
                              "Buy"
                          ).toLowerCase()}`}
                        >
                          {
                            enquiry.lookingFor ||
                            "-"
                          }
                        </span>
                      </td>

                      {/* PROPERTY TYPE */}

                      <td>

                        <div className="Enquiry-property-type">

                          <Building2
                            size={14}
                          />

                          <span>
                            {
                              enquiry.interestedIn ||
                              "-"
                            }
                          </span>

                        </div>

                      </td>

                      {/* LOCATION */}

                      <td>

                        <div className="Enquiry-location">

                          <MapPin
                            size={14}
                          />

                          <span>
                            {
                              enquiry.location ||
                              "-"
                            }
                          </span>

                        </div>

                      </td>

                      {/* AREA */}

                      <td>

                        <span className="Enquiry-area">
                          {
                            enquiry.preferredArea ||
                            "-"
                          }
                        </span>

                      </td>

                      {/* BUDGET */}

                      <td>

                        <div className="Enquiry-budget">

                          <Wallet
                            size={14}
                          />

                          <span>
                            {
                              enquiry.budgetRange ||
                              "-"
                            }
                          </span>

                        </div>

                      </td>

                      {/* STATUS */}

                      <td>
                        <StatusBadge
                          status={
                            enquiry.status
                          }
                        />
                      </td>

                      {/* DATE */}

                      <td>

                        <div className="Enquiry-date">

                          <CalendarDays
                            size={13}
                          />

                          {formatDate(
                            enquiry.createdAt
                          )}

                        </div>

                      </td>

                      {/* ACTIONS */}

                      <td>

                        <div className="Enquiry-actions">

                          <button
                            type="button"
                            title="View"
                            className="Enquiry-action Enquiry-action--view"
                            onClick={() =>
                              handleView(
                                enquiry
                              )
                            }
                          >
                            <Eye
                              size={15}
                            />
                          </button>

                          <button
                            type="button"
                            title="Edit"
                            className="Enquiry-action Enquiry-action--edit"
                            onClick={() =>
                              handleEdit(
                                enquiry
                              )
                            }
                          >
                            <Pencil
                              size={15}
                            />
                          </button>

                          <button
                            type="button"
                            title="Delete"
                            className="Enquiry-action Enquiry-action--delete"
                            onClick={() => {

                              setSelectedEnquiry(
                                enquiry
                              );

                              setDeleteOpen(
                                true
                              );

                            }}
                          >
                            <Trash2
                              size={15}
                            />
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* ===================================================
          PAGINATION
      =================================================== */}

      {totalPages > 1 && (
        <div className="Enquiry-pagination">

          <button
            type="button"
            disabled={
              currentPage <= 1
            }
            onClick={() =>
              setCurrentPage(
                (page) =>
                  Math.max(
                    page - 1,
                    1
                  )
              )
            }
          >
            Previous
          </button>

          <span>
            Page{" "}
            <strong>
              {currentPage}
            </strong>{" "}
            of{" "}
            <strong>
              {totalPages}
            </strong>
          </span>

          <button
            type="button"
            disabled={
              currentPage >=
              totalPages
            }
            onClick={() =>
              setCurrentPage(
                (page) =>
                  Math.min(
                    page + 1,
                    totalPages
                  )
              )
            }
          >
            Next
          </button>

        </div>
      )}

      {/* ===================================================
          VIEW MODAL
      =================================================== */}

      {viewOpen &&
        selectedEnquiry && (
          <div
            className="Enquiry-modal-overlay"
            onMouseDown={(e) => {

              if (
                e.target ===
                e.currentTarget
              ) {
                setViewOpen(
                  false
                );
              }

            }}
          >

            <div className="Enquiry-modal Enquiry-view-modal">

              <div className="Enquiry-modal-header">

                <div>
                  <h2>
                    Enquiry Details
                  </h2>

                  <p>
                    Complete information submitted
                    by the customer.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setViewOpen(
                      false
                    )
                  }
                >
                  <X size={18} />
                </button>

              </div>

              <div className="Enquiry-modal-body">

                {/* CUSTOMER */}

                <div className="Enquiry-section">

                  <h3>
                    Customer Information
                  </h3>

                  <div className="Enquiry-details-grid">

                    <DetailItem
                      icon={
                        <UserRound
                          size={16}
                        />
                      }
                      label="Name"
                      value={
                        selectedEnquiry.fullName
                      }
                    />

                    <DetailItem
                      icon={
                        <Phone
                          size={16}
                        />
                      }
                      label="Mobile"
                      value={
                        selectedEnquiry.mobile
                      }
                    />

                    <DetailItem
                      icon={
                        <Mail
                          size={16}
                        />
                      }
                      label="Email"
                      value={
                        selectedEnquiry.email
                      }
                    />

                  </div>

                </div>

                {/* ENQUIRY */}

                <div className="Enquiry-section">

                  <h3>
                    Property Requirement
                  </h3>

                  <div className="Enquiry-details-grid">

                    <DetailItem
                      icon={
                        <Home
                          size={16}
                        />
                      }
                      label="Looking For"
                      value={
                        selectedEnquiry.lookingFor
                      }
                    />

                    <DetailItem
                      icon={
                        <Building2
                          size={16}
                        />
                      }
                      label="Property Type"
                      value={
                        selectedEnquiry.interestedIn
                      }
                    />

                    <DetailItem
                      icon={
                        <MapPin
                          size={16}
                        />
                      }
                      label="Preferred Location"
                      value={
                        selectedEnquiry.location
                      }
                    />

                    <DetailItem
                      icon={
                        <MapPin
                          size={16}
                        />
                      }
                      label="Preferred Area"
                      value={
                        selectedEnquiry.preferredArea
                      }
                    />

                    <DetailItem
                      icon={
                        <Wallet
                          size={16}
                        />
                      }
                      label="Budget Range"
                      value={
                        selectedEnquiry.budgetRange
                      }
                    />

                  </div>

                </div>

                {/* PROPERTY */}

                <div className="Enquiry-section">

                  <h3>
                    Property Information
                  </h3>

                  <div className="Enquiry-details-grid">

                    <DetailItem
                      icon={
                        <Home
                          size={16}
                        />
                      }
                      label="Property"
                      value={
                        selectedEnquiry.propertyName
                      }
                    />

                    <DetailItem
                      icon={
                        <Building2
                          size={16}
                        />
                      }
                      label="Project"
                      value={
                        selectedEnquiry.project
                      }
                    />

                  </div>

                </div>

                {/* CRM */}

                <div className="Enquiry-section">

                  <h3>
                    CRM Information
                  </h3>

                  <div className="Enquiry-details-grid">

                    <DetailItem
                      icon={
                        <CircleCheck
                          size={16}
                        />
                      }
                      label="Status"
                      value={
                        selectedEnquiry.status
                      }
                    />

                    <DetailItem
                      icon={
                        <AlertCircle
                          size={16}
                        />
                      }
                      label="Priority"
                      value={
                        selectedEnquiry.priority
                      }
                    />

                    <DetailItem
                      icon={
                        <UserRound
                          size={16}
                        />
                      }
                      label="Agent"
                      value={
                        selectedEnquiry.agent
                      }
                    />

                    <DetailItem
                      icon={
                        <Clock3
                          size={16}
                        />
                      }
                      label="Follow-up Date"
                      value={
                        selectedEnquiry.followUpDate
                      }
                    />

                    <DetailItem
                      icon={
                        <CircleCheck
                          size={16}
                        />
                      }
                      label="Lead Score"
                      value={
                        selectedEnquiry.score
                      }
                    />

                    <DetailItem
                      icon={
                        <CalendarDays
                          size={16}
                        />
                      }
                      label="Created"
                      value={
                        formatDate(
                          selectedEnquiry.createdAt
                        )
                      }
                    />

                    <DetailItem
                      icon={
                        <Home
                          size={16}
                        />
                      }
                      label="Source"
                      value={
                        selectedEnquiry.source
                      }
                    />

                  </div>

                </div>

                {/* NOTES */}

                <div className="Enquiry-section">

                  <h3>
                    Notes
                  </h3>

                  <div className="Enquiry-notes">
                    {
                      selectedEnquiry.notes ||
                      "No notes available."
                    }
                  </div>

                </div>

              </div>

              <div className="Enquiry-modal-footer">

                <button
                  type="button"
                  className="Enquiry-secondary-btn"
                  onClick={() =>
                    setViewOpen(
                      false
                    )
                  }
                >
                  Close
                </button>

                <button
                  type="button"
                  className="Enquiry-primary-btn"
                  onClick={() => {

                    setViewOpen(
                      false
                    );

                    handleEdit(
                      selectedEnquiry
                    );

                  }}
                >
                  <Pencil
                    size={15}
                  />

                  Edit Enquiry
                </button>

              </div>

            </div>

          </div>
        )}

      {/* ===================================================
          EDIT MODAL
      =================================================== */}

      {editOpen &&
        selectedEnquiry && (
          <div
            className="Enquiry-modal-overlay"
            onMouseDown={(e) => {

              if (
                e.target ===
                e.currentTarget
              ) {
                setEditOpen(
                  false
                );
              }

            }}
          >

            <div className="Enquiry-modal Enquiry-edit-modal">

              <div className="Enquiry-modal-header">

                <div>
                  <h2>
                    Edit Enquiry
                  </h2>

                  <p>
                    Update the enquiry details.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setEditOpen(
                      false
                    )
                  }
                >
                  <X size={18} />
                </button>

              </div>

              <div className="Enquiry-modal-body">

                <div className="Enquiry-edit-grid">

                  <EditField
                    label="Name"
                    value={
                      editData.fullName
                    }
                    onChange={(e) =>
                      handleEditChange(
                        "fullName",
                        e.target.value
                      )
                    }
                  />

                  <EditField
                    label="Mobile"
                    value={
                      editData.mobile
                    }
                    onChange={(e) =>
                      handleEditChange(
                        "mobile",
                        e.target.value
                      )
                    }
                  />

                  <EditField
                    label="Email"
                    value={
                      editData.email
                    }
                    onChange={(e) =>
                      handleEditChange(
                        "email",
                        e.target.value
                      )
                    }
                  />

                  <EditField
                    label="Looking For"
                    value={
                      editData.lookingFor
                    }
                    options={[
                      "Buy",
                      "Sell",
                      "Rent",
                    ]}
                    onChange={(e) =>
                      handleEditChange(
                        "lookingFor",
                        e.target.value
                      )
                    }
                  />

                  <EditField
                    label="Property Type"
                    value={
                      editData.interestedIn
                    }
                    options={[
                      "Apartment",
                      "Villa",
                      "Independent House",
                      "Plot",
                      "Commercial Property",
                    ]}
                    onChange={(e) =>
                      handleEditChange(
                        "interestedIn",
                        e.target.value
                      )
                    }
                  />

                  <EditField
                    label="Preferred Location"
                    value={
                      editData.location
                    }
                    onChange={(e) =>
                      handleEditChange(
                        "location",
                        e.target.value
                      )
                    }
                  />

                  <EditField
                    label="Preferred Area"
                    value={
                      editData.preferredArea
                    }
                    onChange={(e) =>
                      handleEditChange(
                        "preferredArea",
                        e.target.value
                      )
                    }
                  />

                  <EditField
                    label="Budget Range"
                    value={
                      editData.budgetRange
                    }
                    options={[
                      "Starting - ₹60 Lakhs",
                      "₹60 Lakhs - ₹1.2 Crore",
                      "₹1.2 Crore - ₹2.5 Crore",
                      "Above ₹2.5 Crore",
                    ]}
                    onChange={(e) =>
                      handleEditChange(
                        "budgetRange",
                        e.target.value
                      )
                    }
                  />

                  <EditField
                    label="Property"
                    value={
                      editData.propertyName
                    }
                    onChange={(e) =>
                      handleEditChange(
                        "propertyName",
                        e.target.value
                      )
                    }
                  />

                  <EditField
                    label="Project"
                    value={
                      editData.project
                    }
                    onChange={(e) =>
                      handleEditChange(
                        "project",
                        e.target.value
                      )
                    }
                  />

                  <EditField
                    label="Agent"
                    value={
                      editData.agent
                    }
                    onChange={(e) =>
                      handleEditChange(
                        "agent",
                        e.target.value
                      )
                    }
                  />

                  <EditField
                    label="Status"
                    value={
                      editData.status
                    }
                    options={
                      STATUS_OPTIONS.filter(
                        (item) =>
                          item !==
                          "All Status"
                      )
                    }
                    onChange={(e) =>
                      handleEditChange(
                        "status",
                        e.target.value
                      )
                    }
                  />

                  <EditField
                    label="Priority"
                    value={
                      editData.priority
                    }
                    options={
                      PRIORITY_OPTIONS
                    }
                    onChange={(e) =>
                      handleEditChange(
                        "priority",
                        e.target.value
                      )
                    }
                  />

                  <EditField
                    label="Follow-up Date"
                    value={
                      editData.followUpDate
                    }
                    type="date"
                    onChange={(e) =>
                      handleEditChange(
                        "followUpDate",
                        e.target.value
                      )
                    }
                  />

                  <EditField
                    label="Lead Score"
                    value={
                      editData.score
                    }
                    type="number"
                    onChange={(e) =>
                      handleEditChange(
                        "score",
                        e.target.value
                      )
                    }
                  />

                </div>

                <div className="Enquiry-edit-field Enquiry-edit-field--full">

                  <label>
                    Notes
                  </label>

                  <textarea
                    value={
                      editData.notes ||
                      ""
                    }
                    onChange={(e) =>
                      handleEditChange(
                        "notes",
                        e.target.value
                      )
                    }
                    rows={5}
                    placeholder="Enter notes..."
                  />

                </div>

              </div>

              <div className="Enquiry-modal-footer">

                <button
                  type="button"
                  className="Enquiry-secondary-btn"
                  onClick={() =>
                    setEditOpen(
                      false
                    )
                  }
                  disabled={
                    saving
                  }
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="Enquiry-primary-btn"
                  onClick={
                    handleSaveEdit
                  }
                  disabled={
                    saving
                  }
                >

                  {saving ? (
                    <>
                      <RefreshCw
                        size={15}
                        className="Enquiry-spin"
                      />

                      Saving...
                    </>
                  ) : (
                    <>
                      <CircleCheck
                        size={15}
                      />

                      Save Changes
                    </>
                  )}

                </button>

              </div>

            </div>

          </div>
        )}

      {/* ===================================================
          DELETE MODAL
      =================================================== */}

      {deleteOpen &&
        selectedEnquiry && (
          <div
            className="Enquiry-modal-overlay"
            onMouseDown={(e) => {

              if (
                e.target ===
                e.currentTarget
              ) {
                setDeleteOpen(
                  false
                );
              }

            }}
          >

            <div className="Enquiry-delete-modal">

              <div className="Enquiry-delete-icon">
                <Trash2
                  size={22}
                />
              </div>

              <h2>
                Delete Enquiry?
              </h2>

              <p>
                Are you sure you want to delete
                this enquiry? This action cannot
                be undone.
              </p>

              <div className="Enquiry-delete-info">

                <strong>
                  {
                    selectedEnquiry.fullName ||
                    "Property Enquiry"
                  }
                </strong>

                <span>
                  {
                    selectedEnquiry.mobile ||
                    "-"
                  }
                </span>

              </div>

              <div className="Enquiry-delete-actions">

                <button
                  type="button"
                  className="Enquiry-secondary-btn"
                  onClick={() =>
                    setDeleteOpen(
                      false
                    )
                  }
                  disabled={
                    deleting
                  }
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="Enquiry-delete-confirm-btn"
                  onClick={
                    handleDeleteConfirm
                  }
                  disabled={
                    deleting
                  }
                >

                  {deleting ? (
                    <>
                      <RefreshCw
                        size={15}
                        className="Enquiry-spin"
                      />

                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2
                        size={15}
                      />

                      Delete
                    </>
                  )}

                </button>

              </div>

            </div>

          </div>
        )}

    </div>
  );
};

/* =========================================================
   EMPTY ICON
========================================================= */

const MessageEmptyIcon = () => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
      <path d="M8 9h8" />
      <path d="M8 13h5" />
    </svg>
  );
};

export default Enquiry;

