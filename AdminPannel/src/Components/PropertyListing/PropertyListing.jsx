import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import API, { IMG_URL } from "../../api/axios";
import {
  FiHome,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiRefreshCw,
  FiFilter,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiArchive,
  FiPlus,
  FiX,
  FiSave,
  FiMapPin,
  FiPhone,
  FiMail,
  FiCalendar,
  FiLayers,
  FiCompass,
  FiTruck,
  FiTag,
  FiLoader,
} from "react-icons/fi";

import "./PropertyListing.css";


/* =========================================================
   CONSTANTS
========================================================= */

const ITEMS_PER_PAGE = 8;
const PROPERTY_ENDPOINT = "/sell-properties";

const PROPERTY_TYPES = [
  "Apartment",
  "Villa",
  "Independent House",
  "Plot",
  "Commercial Property",
];

const PROPERTY_FOR = [
  "Sell",
  "Rent",
  "Lease",
];

const CATEGORIES = [
  "Residential",
  "Commercial",
  "Land",
  "Others",
];

const STATUS_OPTIONS = [
  "Pending",
  "Approved",
  "Rejected",
  "Inactive",
];


/* =========================================================
   EMPTY FORM STATE
========================================================= */

const EMPTY_FORM = {
  propertyTitle: "",
  propertyType: "Apartment",
  propertyFor: "Sell",
  category: "Residential",
  expectedPrice: "",
  negotiable: "Yes",

  builtUpArea: "",
  carpetArea: "",
  bhk: "1 BHK",
  bathrooms: "1",
  balconies: "0",
  floor: "",
  totalFloors: "",
  furnishingStatus: "Unfurnished",
  propertyAge: "1-5 Years",
  parking: "Open",

  state: "Odisha",
  city: "Bhubaneswar",
  locality: "",
  landmark: "",
  pinCode: "",

  phone: "",
  email: "",
  status: "Pending",
  images: [],
};


/* =========================================================
   COMPONENT
========================================================= */

const PropertyListing = () => {

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [typeFilter, setTypeFilter] = useState("All Type");
  const [categoryFilter, setCategoryFilter] = useState("All Category");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [viewingProperty, setViewingProperty] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);
  const [viewError, setViewError] = useState("");


  /* =======================================================
     FETCH PROPERTIES FROM BACKEND
  ======================================================= */

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get(PROPERTY_ENDPOINT);
      const data = response.data?.properties || response.data || [];
      setProperties(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("FETCH PROPERTIES ERROR:", err);
      setError("Failed to load properties from server. Make sure your server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);


  /* =======================================================
     HELPERS — Safe Data Extractors
  ========================================================= */

  const getId = (p) => p?.id || p?._id || "";
  const getTitle = (p) => p?.propertyTitle || "Untitled Property";
  const getType = (p) => p?.propertyType || "Apartment";
  const getFor = (p) => p?.propertyFor || "Sell";
  const getCategory = (p) => p?.category || "Residential";

  const getLocation = (p) => {
    const city = p?.city || "";
    const locality = p?.locality || "";
    if (locality && city) return `${locality}, ${city}`;
    return locality || city || "Location not available";
  };

  const getPrice = (p) => p?.expectedPrice ?? p?.price ?? "";
  const getStatus = (p) => p?.status || "Pending";

  const normalizeStatus = (status) =>
    STATUS_OPTIONS.includes(status) ? status : "Pending";

  const getSubmittedBy = (p) => p?.submittedBy || "Admin User";
  const getEmail = (p) => p?.email || "";
  const getPhone = (p) => p?.phone || "";
  const getDate = (p) => p?.createdAt || null;

  const resolveImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("blob:")) {
      return path;
    }
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${IMG_URL || "http://localhost:5000"}${cleanPath}`;
  };

  const getImageUrl = (p) => {
    if (Array.isArray(p?.images) && p.images.length > 0) {
      return resolveImageUrl(p.images[0]);
    }
    return p?.image ? resolveImageUrl(p.image) : "";
  };

  const getImages = (p) => {
    if (Array.isArray(p?.images) && p.images.length > 0) {
      return p.images.map(resolveImageUrl);
    }
    return p?.image ? [resolveImageUrl(p.image)] : [];
  };

  const getState = (p) => p?.state || "";
  const getLandmark = (p) => p?.landmark || "";
  const getBuiltUpArea = (p) => p?.builtUpArea ?? p?.area ?? "";
  const getCarpetArea = (p) => p?.carpetArea || "";
  const getBHK = (p) => p?.bhk ?? "";
  const getBathrooms = (p) => p?.bathrooms ?? "";
  const getBalconies = (p) => p?.balconies ?? "";
  const getFloor = (p) => p?.floor ?? "";
  const getTotalFloors = (p) => p?.totalFloors ?? "";
  const getFurnishingStatus = (p) => p?.furnishingStatus || "";
  const getPropertyAge = (p) => p?.propertyAge || "";
  const getParking = (p) => p?.parking || "";
  const getNegotiable = (p) => p?.negotiable ?? "";

  const formatPrice = (value, property) => {
    if (value === "" || value === null || value === undefined) return "—";
    const numeric = Number(String(value).replace(/[₹,\s]/g, ""));
    if (Number.isNaN(numeric)) return String(value);
    if (String(getFor(property)).toLowerCase() === "rent") {
      return `₹ ${numeric.toLocaleString("en-IN")} /month`;
    }
    return `₹ ${numeric.toLocaleString("en-IN")}`;
  };

  const formatArea = (value) => {
    if (value === "" || value === null || value === undefined) return "—";
    return `${Number(value).toLocaleString("en-IN")} sq ft`;
  };

  const formatDate = (value) => {
    if (!value) return { date: "—", time: "" };
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return { date: String(value), time: "" };
    return {
      date: date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      time: date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
    };
  };


  /* =======================================================
     FILTER OPTIONS
  ======================================================= */

  const propertyTypes = useMemo(() => {
    return [...new Set(properties.map(getType).filter(Boolean))];
  }, [properties]);

  const categories = useMemo(() => {
    return [...new Set(properties.map(getCategory).filter(Boolean))];
  }, [properties]);


  /* =======================================================
     FILTER ENGINE
  ======================================================= */

  const filteredProperties = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return properties.filter((property) => {
      if (searchText) {
        const text = [
          getTitle(property),
          getType(property),
          getFor(property),
          getCategory(property),
          getLocation(property),
          getSubmittedBy(property),
          getEmail(property),
        ]
          .join(" ")
          .toLowerCase();

        if (!text.includes(searchText)) return false;
      }

      if (statusFilter !== "All Status") {
        if (normalizeStatus(getStatus(property)) !== statusFilter) return false;
      }

      if (typeFilter !== "All Type") {
        if (getType(property) !== typeFilter) return false;
      }

      if (categoryFilter !== "All Category") {
        if (getCategory(property) !== categoryFilter) return false;
      }

      const propertyDate = getDate(property);

      if (propertyDate) {
        const date = new Date(propertyDate);

        if (startDate) {
          const start = new Date(`${startDate}T00:00:00`);
          if (date < start) return false;
        }

        if (endDate) {
          const end = new Date(`${endDate}T23:59:59`);
          if (date > end) return false;
        }
      }

      return true;
    });
  }, [properties, search, statusFilter, typeFilter, categoryFilter, startDate, endDate]);


  /* =======================================================
     PAGINATION
  ======================================================= */

  const totalPages = Math.max(1, Math.ceil(filteredProperties.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const pageProperties = filteredProperties.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, typeFilter, categoryFilter, startDate, endDate]);


  /* =======================================================
     STATISTICS
  ======================================================= */

  const stats = useMemo(() => {
    return {
      total: properties.length,
      pending: properties.filter((p) => normalizeStatus(getStatus(p)) === "Pending").length,
      approved: properties.filter((p) => normalizeStatus(getStatus(p)) === "Approved").length,
      rejected: properties.filter((p) => normalizeStatus(getStatus(p)) === "Rejected").length,
      inactive: properties.filter((p) => normalizeStatus(getStatus(p)) === "Inactive").length,
    };
  }, [properties]);


  /* =======================================================
     MODAL HANDLERS
  ======================================================= */

  const handleAddProperty = () => {
    setEditingProperty(null);
    setFormData({ ...EMPTY_FORM });
    setSelectedFiles([]);
    setShowForm(true);
  };

  const handleEdit = (property) => {
    setEditingProperty(property);
    setSelectedFiles([]);

    setFormData({
      propertyTitle: property?.propertyTitle || "",
      propertyType: property?.propertyType || "Apartment",
      propertyFor: property?.propertyFor || "Sell",
      category: property?.category || "Residential",
      expectedPrice: property?.expectedPrice ?? property?.price ?? "",
      negotiable: property?.negotiable || "Yes",

      builtUpArea: property?.builtUpArea || "",
      carpetArea: property?.carpetArea || "",
      bhk: property?.bhk || "",
      bathrooms: property?.bathrooms || "",
      balconies: property?.balconies || "",
      floor: property?.floor ?? "",
      totalFloors: property?.totalFloors ?? "",
      furnishingStatus: property?.furnishingStatus || "",
      propertyAge: property?.propertyAge || "",
      parking: property?.parking || "",

      state: property?.state || "",
      city: property?.city || "",
      locality: property?.locality || "",
      landmark: property?.landmark || "",
      pinCode: property?.pinCode || "",

      phone: property?.phone || "",
      email: property?.email || "",
      status: normalizeStatus(getStatus(property)),
      images: property?.images || [],
    });

    setShowForm(true);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };


  /* =======================================================
     SAVE PROPERTY (BACKEND INTEGRATED)
  ======================================================= */

  const handleSaveProperty = async (event) => {
    event.preventDefault();

    if (!formData.propertyTitle.trim()) {
      alert("Please enter property title.");
      return;
    }
    if (!formData.city.trim()) {
      alert("Please enter city.");
      return;
    }
    if (!formData.locality.trim()) {
      alert("Please enter locality.");
      return;
    }
    if (!formData.expectedPrice) {
      alert("Please enter expected price.");
      return;
    }

    try {
      setFormSubmitting(true);
      const dataPayload = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key !== "images") {
          dataPayload.append(key, formData[key] ?? "");
        }
      });

      selectedFiles.forEach((file) => {
        dataPayload.append("images", file);
      });

      const id = editingProperty ? getId(editingProperty) : null;

      if (id) {
        const response = await API.put(`${PROPERTY_ENDPOINT}/${id}`, dataPayload);
        const updatedDoc = response.data?.property || response.data;

        setProperties((previous) =>
          previous.map((item) => (getId(item) === id ? { ...item, ...updatedDoc } : item))
        );
        alert("Property updated successfully.");
      } else {
        const response = await API.post(PROPERTY_ENDPOINT, dataPayload);
        const newDoc = response.data?.property || response.data;

        setProperties((previous) => [newDoc, ...previous]);
        alert("Property listed successfully.");
      }

      setShowForm(false);
      setEditingProperty(null);
      setFormData({ ...EMPTY_FORM });
      setSelectedFiles([]);
      fetchProperties();
    } catch (err) {
      console.error("SAVE PROPERTY ERROR:", err);
      alert(err?.response?.data?.message || "Failed to save property. Please check server logs.");
    } finally {
      setFormSubmitting(false);
    }
  };


  /* =======================================================
     DELETE PROPERTY
  ======================================================= */

  const handleDelete = async (property) => {
    const id = getId(property);
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${getTitle(property)}"?`
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`${PROPERTY_ENDPOINT}/${id}`);
      setProperties((previous) => previous.filter((item) => getId(item) !== id));
      alert("Property deleted successfully.");
    } catch (err) {
      console.error("DELETE PROPERTY ERROR:", err);
      alert("Failed to delete property from server.");
    }
  };


  /* =======================================================
     VIEW PROPERTY DETAILS
  ======================================================= */

  const handleView = async (property) => {
    setViewingProperty(property);
    setViewError("");

    const id = getId(property);
    if (!id) return;

    try {
      setViewLoading(true);
      const response = await API.get(`${PROPERTY_ENDPOINT}/${id}`);
      const fullData = response.data?.property || response.data;

      setViewingProperty((previous) => ({ ...previous, ...fullData }));

      setProperties((previous) =>
        previous.map((item) => (getId(item) === id ? { ...item, ...fullData } : item))
      );
    } catch (error) {
      console.error("FAILED TO FETCH FULL DETAILS:", error);
      setViewError("Couldn't load full property details from server. Showing available data.");
    } finally {
      setViewLoading(false);
    }
  };

  const closeView = () => {
    setViewingProperty(null);
    setViewError("");
    setViewLoading(false);
  };


  /* =======================================================
     RESET FILTERS
  ======================================================= */

  const handleReset = () => {
    setSearch("");
    setStatusFilter("All Status");
    setTypeFilter("All Type");
    setCategoryFilter("All Category");
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);
  };


  /* =======================================================
     STATUS ICON
  ======================================================= */

  const statusIcon = (status) => {
    switch (normalizeStatus(status)) {
      case "Approved":
        return <FiCheckCircle />;
      case "Rejected":
        return <FiXCircle />;
      case "Inactive":
        return <FiArchive />;
      default:
        return <FiClock />;
    }
  };


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="PropertyListing">

      <main className="PropertyListing-main">

        {/* PAGE HEADING */}
        <section className="PropertyListing-pageHeading">
          <div>
            <h1>Property Listings</h1>
            <div className="PropertyListing-breadcrumb">
              <span>Dashboard</span>
              <span>›</span>
              <span>Property Listings</span>
            </div>
          </div>

          <button type="button" className="PropertyListing-addButton" onClick={handleAddProperty}>
            <span className="PropertyListing-addButtonIcon"><FiPlus /></span>
            <span className="PropertyListing-addButtonLabel">Add Property</span>
          </button>
        </section>

        {/* STATISTICS */}
        <section className="PropertyListing-statistics">
          <div className="PropertyListing-statCard">
            <div className="PropertyListing-statIcon PropertyListing-statIcon-total"><FiHome /></div>
            <div className="PropertyListing-statContent">
              <span>Total Listings</span>
              <strong>{stats.total}</strong>
              <small>All Properties</small>
            </div>
          </div>

          <div className="PropertyListing-statCard">
            <div className="PropertyListing-statIcon PropertyListing-statIcon-pending"><FiEye /></div>
            <div className="PropertyListing-statContent">
              <span>Pending Review</span>
              <strong>{stats.pending}</strong>
              <small>Awaiting Approval</small>
            </div>
          </div>

          <div className="PropertyListing-statCard">
            <div className="PropertyListing-statIcon PropertyListing-statIcon-approved"><FiCheckCircle /></div>
            <div className="PropertyListing-statContent">
              <span>Approved</span>
              <strong>{stats.approved}</strong>
              <small>Published</small>
            </div>
          </div>

          <div className="PropertyListing-statCard">
            <div className="PropertyListing-statIcon PropertyListing-statIcon-rejected"><FiXCircle /></div>
            <div className="PropertyListing-statContent">
              <span>Rejected</span>
              <strong>{stats.rejected}</strong>
              <small>Not Approved</small>
            </div>
          </div>

          <div className="PropertyListing-statCard">
            <div className="PropertyListing-statIcon PropertyListing-statIcon-inactive"><FiArchive /></div>
            <div className="PropertyListing-statContent">
              <span>Inactive</span>
              <strong>{stats.inactive}</strong>
              <small>Not Active</small>
            </div>
          </div>
        </section>

        {/* FILTERS */}
        <section className="PropertyListing-filterCard">
          <div className="PropertyListing-searchWrapper">
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by title, location, or user..."
            />
            <FiSearch />
          </div>

          <div className="PropertyListing-filterField">
            <label>Status</label>
            <div className="PropertyListing-select">
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                <option>All Status</option>
                {STATUS_OPTIONS.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
              <FiChevronDown />
            </div>
          </div>

          <div className="PropertyListing-filterField">
            <label>Property Type</label>
            <div className="PropertyListing-select">
              <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
                <option>All Type</option>
                {propertyTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
              <FiChevronDown />
            </div>
          </div>

          <div className="PropertyListing-filterField">
            <label>Category</label>
            <div className="PropertyListing-select">
              <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
                <option>All Category</option>
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
              <FiChevronDown />
            </div>
          </div>

          <div className="PropertyListing-filterField">
            <label>Date Range</label>
            <div className="PropertyListing-dateInputs">
              <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
              <input type="date" value={endDate} min={startDate || undefined} onChange={(event) => setEndDate(event.target.value)} />
            </div>
          </div>

          <button type="button" className="PropertyListing-resetButton" onClick={handleReset}>
            <FiRefreshCw /> Reset
          </button>

          <button type="button" className="PropertyListing-filterButton">
            <FiFilter /> Filter
          </button>
        </section>

        {/* TABLE */}
        <section className="PropertyListing-tableCard">
          <div className="PropertyListing-tableScroll">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Property Title</th>
                  <th>Property Type</th>
                  <th>For</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Price (₹)</th>
                  <th>Submitted By</th>
                  <th>Submitted On</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="11" className="PropertyListing-messageCell">
                      <FiLoader className="PropertyListing-spin" /> Loading properties...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="11" className="PropertyListing-messageCell" style={{ color: "red" }}>{error}</td>
                  </tr>
                ) : pageProperties.length === 0 ? (
                  <tr>
                    <td colSpan="11" className="PropertyListing-messageCell">
                      <FiHome /> No properties found.
                    </td>
                  </tr>
                ) : (
                  pageProperties.map((property, index) => {
                    const id = getId(property);
                    const status = normalizeStatus(getStatus(property));
                    const date = formatDate(getDate(property));
                    const image = getImageUrl(property);

                    return (
                      <tr key={id || index}>
                        <td>{startIndex + index + 1}</td>

                        <td>
                          <div className="PropertyListing-propertyCell">
                            <div className="PropertyListing-propertyImage">
                              {image ? <img src={image} alt={getTitle(property)} /> : <FiHome />}
                            </div>
                            <strong>{getTitle(property)}</strong>
                          </div>
                        </td>

                        <td>{getType(property)}</td>
                        <td>{getFor(property)}</td>
                        <td>{getCategory(property)}</td>

                        <td>
                          <span className="PropertyListing-location">{getLocation(property)}</span>
                        </td>

                        <td className="PropertyListing-price">{formatPrice(getPrice(property), property)}</td>

                        <td>
                          <div className="PropertyListing-submitted">
                            <strong>{getSubmittedBy(property)}</strong>
                            {getEmail(property) && <span>{getEmail(property)}</span>}
                          </div>
                        </td>

                        <td>
                          <div className="PropertyListing-submitted">
                            <strong>{date.date}</strong>
                            <span>{date.time}</span>
                          </div>
                        </td>

                        <td>
                          <span className={`PropertyListing-status PropertyListing-status-${status.toLowerCase()}`}>
                            {statusIcon(status)} {status}
                          </span>
                        </td>

                        <td>
                          <div className="PropertyListing-actions">
                            <button type="button" title="View" className="PropertyListing-actionView" onClick={() => handleView(property)}>
                              <FiEye />
                            </button>

                            <button type="button" title="Edit" className="PropertyListing-actionEdit" onClick={() => handleEdit(property)}>
                              <FiEdit2 />
                            </button>

                            <button type="button" title="Delete" className="PropertyListing-actionDelete" onClick={() => handleDelete(property)}>
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* FOOTER */}
          <div className="PropertyListing-footer">
            <span>
              {filteredProperties.length === 0
                ? "Showing 0 entries"
                : `Showing ${startIndex + 1} to ${Math.min(startIndex + ITEMS_PER_PAGE, filteredProperties.length)} of ${filteredProperties.length} entries`}
            </span>

            {totalPages > 1 && (
              <div className="PropertyListing-pagination">
                <button type="button" disabled={safePage === 1} onClick={() => setCurrentPage(safePage - 1)}>
                  <FiChevronLeft />
                </button>

                {Array.from({ length: totalPages }, (_, index) => index + 1)
                  .filter((page) => page === 1 || page === totalPages || Math.abs(page - safePage) <= 1)
                  .map((page, index, arr) => {
                    const previous = arr[index - 1];
                    return (
                      <React.Fragment key={page}>
                        {previous && page - previous > 1 && <span>...</span>}
                        <button type="button" className={safePage === page ? "active" : ""} onClick={() => setCurrentPage(page)}>
                          {page}
                        </button>
                      </React.Fragment>
                    );
                  })}

                <button type="button" disabled={safePage === totalPages} onClick={() => setCurrentPage(safePage + 1)}>
                  <FiChevronRight />
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* ADD / EDIT MODAL */}
      {showForm && (
        <div className="PropertyListing-modalOverlay" onMouseDown={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}>
          <div className="PropertyListing-formModal">
            <div className="PropertyListing-modalHeader">
              <div>
                <h2>{editingProperty ? "Edit Property" : "Add Property"}</h2>
                <p>{editingProperty ? "Update property information" : "Add a new property listing"}</p>
              </div>
              <button type="button" onClick={() => setShowForm(false)}><FiX /></button>
            </div>

            <form onSubmit={handleSaveProperty}>
              <div className="PropertyListing-formBody">
                <div className="PropertyListing-formGroup PropertyListing-fullWidth">
                  <label>Property Title *</label>
                  <input type="text" name="propertyTitle" value={formData.propertyTitle} onChange={handleFormChange} placeholder="Enter property title" required />
                </div>
                <div className="PropertyListing-formGroup">
                  <label>Property Type *</label>
                  <select name="propertyType" value={formData.propertyType} onChange={handleFormChange}>
                    {PROPERTY_TYPES.map((type) => (<option key={type} value={type}>{type}</option>))}
                  </select>
                </div>
                <div className="PropertyListing-formGroup">
                  <label>Property For *</label>
                  <select name="propertyFor" value={formData.propertyFor} onChange={handleFormChange}>
                    {PROPERTY_FOR.map((item) => (<option key={item} value={item}>{item}</option>))}
                  </select>
                </div>
                <div className="PropertyListing-formGroup">
                  <label>Category *</label>
                  <select name="category" value={formData.category} onChange={handleFormChange}>
                    {CATEGORIES.map((category) => (<option key={category} value={category}>{category}</option>))}
                  </select>
                </div>
                <div className="PropertyListing-formGroup">
                  <label>Expected Price (₹) *</label>
                  <input type="text" name="expectedPrice" value={formData.expectedPrice} onChange={handleFormChange} placeholder="8500000" required />
                </div>
                <div className="PropertyListing-formGroup">
                  <label>Negotiable</label>
                  <select name="negotiable" value={formData.negotiable} onChange={handleFormChange}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="PropertyListing-formGroup">
                  <label>Built-up Area (sq ft) *</label>
                  <input type="text" name="builtUpArea" value={formData.builtUpArea} onChange={handleFormChange} placeholder="1500" required />
                </div>
                <div className="PropertyListing-formGroup">
                  <label>Carpet Area (sq ft)</label>
                  <input type="text" name="carpetArea" value={formData.carpetArea} onChange={handleFormChange} placeholder="1350" />
                </div>
                <div className="PropertyListing-formGroup">
                  <label>BHK *</label>
                  <input type="text" name="bhk" value={formData.bhk} onChange={handleFormChange} placeholder="3 BHK" required />
                </div>
                <div className="PropertyListing-formGroup">
                  <label>Bathrooms *</label>
                  <input type="text" name="bathrooms" value={formData.bathrooms} onChange={handleFormChange} placeholder="2" required />
                </div>
                <div className="PropertyListing-formGroup">
                  <label>Balconies</label>
                  <input type="text" name="balconies" value={formData.balconies} onChange={handleFormChange} placeholder="1" />
                </div>
                <div className="PropertyListing-formGroup">
                  <label>Floor</label>
                  <input type="text" name="floor" value={formData.floor} onChange={handleFormChange} placeholder="4th" />
                </div>
                <div className="PropertyListing-formGroup">
                  <label>Total Floors</label>
                  <input type="text" name="totalFloors" value={formData.totalFloors} onChange={handleFormChange} placeholder="8" />
                </div>
                <div className="PropertyListing-formGroup">
                  <label>Furnishing Status *</label>
                  <input type="text" name="furnishingStatus" value={formData.furnishingStatus} onChange={handleFormChange} placeholder="Semi-Furnished" required />
                </div>
                <div className="PropertyListing-formGroup">
                  <label>Property Age</label>
                  <input type="text" name="propertyAge" value={formData.propertyAge} onChange={handleFormChange} placeholder="1-5 Years" />
                </div>
                <div className="PropertyListing-formGroup">
                  <label>Parking</label>
                  <input type="text" name="parking" value={formData.parking} onChange={handleFormChange} placeholder="Covered" />
                </div>
                <div className="PropertyListing-formGroup">
                  <label>State *</label>
                  <input type="text" name="state" value={formData.state} onChange={handleFormChange} placeholder="Odisha" required />
                </div>
                <div className="PropertyListing-formGroup">
                  <label>City *</label>
                  <input type="text" name="city" value={formData.city} onChange={handleFormChange} placeholder="Bhubaneswar" required />
                </div>
                <div className="PropertyListing-formGroup">
                  <label>Locality *</label>
                  <input type="text" name="locality" value={formData.locality} onChange={handleFormChange} placeholder="Patia" required />
                </div>
                <div className="PropertyListing-formGroup">
                  <label>Landmark</label>
                  <input type="text" name="landmark" value={formData.landmark} onChange={handleFormChange} placeholder="Near KIIT Square" />
                </div>
                <div className="PropertyListing-formGroup">
                  <label>PIN Code *</label>
                  <input type="text" name="pinCode" value={formData.pinCode} onChange={handleFormChange} placeholder="751024" required />
                </div>
                <div className="PropertyListing-formGroup">
                  <label>Contact Number</label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleFormChange} placeholder="9876543210" />
                </div>
                <div className="PropertyListing-formGroup">
                  <label>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleFormChange} placeholder="owner@example.com" />
                </div>
                <div className="PropertyListing-formGroup">
                  <label>Status</label>
                  <select name="status" value={formData.status} onChange={handleFormChange}>
                    {STATUS_OPTIONS.map((status) => (<option key={status}>{status}</option>))}
                  </select>
                </div>
                <div className="PropertyListing-formGroup PropertyListing-fullWidth">
                  <label>Upload Images (Max 10)</label>
                  <input type="file" multiple accept="image/png,image/jpeg,image/jpg,image/webp" onChange={handleFileChange} />
                  {selectedFiles.length > 0 && (
                    <small style={{ marginTop: "6px", display: "block", color: "#666" }}>
                      {selectedFiles.length} file(s) selected for upload.
                    </small>
                  )}
                </div>
              </div>

              <div className="PropertyListing-formFooter">
                <button type="button" className="PropertyListing-cancelButton" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="PropertyListing-saveButton" disabled={formSubmitting}>
                  <FiSave /> {formSubmitting ? "Saving..." : editingProperty ? "Update Property" : "Save Property"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}
      {viewingProperty && (
        <div className="PropertyListing-modalOverlay" onMouseDown={(e) => { if (e.target === e.currentTarget) closeView(); }}>
          <div className="PropertyListing-viewModal">
            <div className="PropertyListing-modalHeader">
              <div>
                <h2>Property Details</h2>
                <p>Property listing preview</p>
              </div>
              <button type="button" onClick={closeView}><FiX /></button>
            </div>

            {viewLoading && (
              <div className="PropertyListing-viewLoading">
                <FiLoader className="PropertyListing-spin" /> <span>Loading full details...</span>
              </div>
            )}

            {viewError && <div className="PropertyListing-viewError">{viewError}</div>}

            <div className="PropertyListing-viewBody">
              <div className="PropertyListing-viewImage">
                {getImageUrl(viewingProperty) ? (
                  <img src={getImageUrl(viewingProperty)} alt={getTitle(viewingProperty)} />
                ) : (
                  <FiHome />
                )}
              </div>

              {getImages(viewingProperty).length > 1 && (
                <div className="PropertyListing-viewThumbs">
                  {getImages(viewingProperty).map((src, i) => (
                    <img key={i} src={src} alt={`${getTitle(viewingProperty)} ${i + 1}`} />
                  ))}
                </div>
              )}

              <div className="PropertyListing-viewContent">
                <h3>{getTitle(viewingProperty)}</h3>
                <span className={`PropertyListing-status PropertyListing-status-${normalizeStatus(getStatus(viewingProperty)).toLowerCase()}`}>
                  {statusIcon(getStatus(viewingProperty))} {normalizeStatus(getStatus(viewingProperty))}
                </span>

                <div className="PropertyListing-viewGrid">
                  <div><FiHome /><span>Property Type</span><strong>{getType(viewingProperty)}</strong></div>
                  <div><FiTag /><span>For</span><strong>{getFor(viewingProperty)}</strong></div>
                  <div><FiHome /><span>Category</span><strong>{getCategory(viewingProperty)}</strong></div>
                  <div><FiCalendar /><span>Price</span><strong>{formatPrice(getPrice(viewingProperty), viewingProperty)}</strong></div>
                  <div><FiTag /><span>Negotiable</span><strong>{getNegotiable(viewingProperty) || "—"}</strong></div>
                  <div><FiLayers /><span>Built-up Area</span><strong>{formatArea(getBuiltUpArea(viewingProperty))}</strong></div>
                  <div><FiLayers /><span>Carpet Area</span><strong>{formatArea(getCarpetArea(viewingProperty))}</strong></div>
                  <div><FiHome /><span>BHK</span><strong>{getBHK(viewingProperty) || "—"}</strong></div>
                  <div><FiHome /><span>Bathrooms</span><strong>{getBathrooms(viewingProperty) || "—"}</strong></div>
                  <div><FiHome /><span>Balconies</span><strong>{getBalconies(viewingProperty) || "—"}</strong></div>
                  <div><FiLayers /><span>Floor</span><strong>{getFloor(viewingProperty) !== "" ? getFloor(viewingProperty) : "—"}</strong></div>
                  <div><FiLayers /><span>Total Floors</span><strong>{getTotalFloors(viewingProperty) !== "" ? getTotalFloors(viewingProperty) : "—"}</strong></div>
                  <div><FiHome /><span>Furnishing</span><strong>{getFurnishingStatus(viewingProperty) || "—"}</strong></div>
                  <div><FiClock /><span>Age</span><strong>{getPropertyAge(viewingProperty) || "—"}</strong></div>
                  <div><FiTruck /><span>Parking</span><strong>{getParking(viewingProperty) || "—"}</strong></div>
                  <div><FiCompass /><span>State</span><strong>{getState(viewingProperty) || "—"}</strong></div>
                  <div><FiMapPin /><span>Location</span><strong>{getLocation(viewingProperty)}</strong></div>
                  <div><FiMapPin /><span>Landmark</span><strong>{getLandmark(viewingProperty) || "—"}</strong></div>
                  <div><FiMapPin /><span>PIN Code</span><strong>{viewingProperty?.pinCode || "—"}</strong></div>
                  <div><FiPhone /><span>Contact</span><strong>{getPhone(viewingProperty) || "Not provided"}</strong></div>
                  <div><FiMail /><span>Email</span><strong>{getEmail(viewingProperty) || "Not provided"}</strong></div>
                  <div><FiHome /><span>Submitted By</span><strong>{getSubmittedBy(viewingProperty)}</strong></div>
                  <div><FiCalendar /><span>Submitted On</span><strong>{formatDate(getDate(viewingProperty)).date}</strong></div>
                </div>
              </div>
            </div>

            <div className="PropertyListing-formFooter">
              <button type="button" className="PropertyListing-cancelButton" onClick={closeView}>Close</button>
              <button type="button" className="PropertyListing-saveButton" onClick={() => { const p = viewingProperty; closeView(); handleEdit(p); }}>
                <FiEdit2 /> Edit Property
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyListing;