import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiEye,
  FiEdit3,
  FiMoreVertical,
  FiChevronLeft,
  FiChevronRight,
  FiPlus,
  FiHome,
  FiCheckCircle,
  FiClock,
  FiTag,
  FiEye as FiView,
  FiMessageSquare,
  FiMapPin,
  FiCalendar,
  FiX,
  FiDollarSign,
  FiTrash2,
} from "react-icons/fi";
import "./PropertiesDashboard.css";
import React, { useState, useEffect } from "react";
import API, { BASE_URL } from "../../api/axios";

const PropertiesDashboard = () => {
  const navigate = useNavigate();

  // State Management
  const [currentPage, setCurrentPage] = useState(1);

  // Modal State
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter State Management
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const [dashboard, setDashboard] = useState({
    totalProperties: 0,
    activeProperties: 0,
    underConstruction: 0,
    soldProperties: 0,
    totalViews: 0,
    totalEnquiries: 0,
  });

  const [totalPages, setTotalPages] = useState(1);

  const [topLocations, setTopLocations] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);
  const fetchAnalytics = async () => {
    try {
      const [locationsRes, typesRes, priceRes] = await Promise.all([
        API.get("/properties/top-locations"),
        API.get("/properties/property-types"),
        API.get("/properties/price-range"),
      ]);

      console.log("TOP LOCATIONS:", locationsRes.data);

      console.log("PROPERTY TYPES:", typesRes.data);

      console.log("PRICE RANGES:", priceRes.data);

      setTopLocations(
        locationsRes.data.locations || locationsRes.data.data || [],
      );

      setPropertyTypes(typesRes.data.types || typesRes.data.data || []);

      setPriceRanges(priceRes.data.priceRanges || priceRes.data.data || []);
    } catch (error) {
      console.error("ANALYTICS ERROR:", error.response?.data || error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // const totalPages = 1;

  const fetchProperties = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/properties", {
        params: {
          page: currentPage,
          search: searchTerm,
          status: selectedStatus,
          category: selectedCategory,
          type: selectedType,
          location: selectedLocation,
        },
      });

      setProperties(data.properties);
      setTotalPages(data.totalPages);

      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  const fetchDashboard = async () => {
    try {
      const { data } = await API.get("/properties/dashboard/stats");

      setDashboard(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [
    currentPage,
    searchTerm,
    selectedStatus,
    selectedCategory,
    selectedType,
    selectedLocation,
  ]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const deleteProperty = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this property?"))
        return;

      await API.delete(`/properties/${id}`);

      fetchProperties();
      fetchDashboard();
    } catch (error) {
      console.log(error);
    }
  };
  // Page switcher
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleOpenDetails = (prop) => {
    setSelectedProperty(prop);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
  };

  // Toggle dropdown menu for a specific row
  const toggleMenu = (id) => {
    setProperties(
      properties.map((prop) => {
        if (prop._id === id) {
          return { ...prop, menuOpen: !prop.menuOpen };
        }
        return { ...prop, menuOpen: false };
      }),
    );
  };

  // Update property status directly from 3-dot menu
  const updateStatus = async (id, status, statusType) => {
    try {
      await API.put(`/properties/${id}/status`, {
        status,
        statusType,
      });

      fetchProperties();
      fetchDashboard();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/properties/edit/${id}`);
  };
  const handleReset = () => {
    setSearchTerm("");
    setSelectedStatus("All");
    setSelectedCategory("All");
    setSelectedType("All");
    setSelectedLocation("All");
  };

  // Filter Logic Implementation
  // const properties = properties.filter((prop) => {
  //   const matchesSearch =
  //     prop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     prop.location.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesStatus =
  //     selectedStatus === "All" || prop.status === selectedStatus;
  //   const matchesCategory =
  //     selectedCategory === "All" || prop.category === selectedCategory;
  //   const matchesType = selectedType === "All" || prop.type === selectedType;
  //   const matchesLocation =
  //     selectedLocation === "All" || prop.location.includes(selectedLocation);

  //   return (
  //     matchesSearch &&
  //     matchesStatus &&
  //     matchesCategory &&
  //     matchesType &&
  //     matchesLocation
  //   );
  // });

  const getImageUrl = (image) => {
    if (!image) {
      return "/no-image.png";
    }

    // Already complete URL
    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    // Ensure leading /
    const cleanPath = image.startsWith("/") ? image : `/${image}`;

    return `${BASE_URL}${cleanPath}`;
  };

  return (
    <div className="all-property-dashboard full-screen-dashboard">
      {/* Top Header */}
      <header className="all-property-dashboard-header">
        <div className="all-property-header-title-area">
          <h1>Properties</h1>
          <div className="all-property-breadcrumb">
            Dashboard <span>&gt;</span> Properties <span>&gt;</span> All
            Properties
          </div>
        </div>
        <button
          className="all-property-add-btn"
          onClick={() => navigate("/properties/add")}
        >
          <FiPlus /> Add New Property
        </button>
      </header>

      {/* Metrics Cards Grid (3 per row) */}
      <section className="all-property-metrics-grid">
        <div className="all-property-metric-card">
          <div className="all-property-metric-icon orange">
            <FiHome />
          </div>
          <div className="all-property-metric-content">
            <span className="all-property-metric-label">Total Properties</span>
            <h2 className="all-property-metric-value">
              {dashboard.totalProperties}
            </h2>
            <span className="all-property-metric-sub">
              All Listed Properties
            </span>
          </div>
        </div>

        <div className="all-property-metric-card">
          <div className="all-property-metric-icon green">
            <FiCheckCircle />
          </div>
          <div className="all-property-metric-content">
            <span className="all-property-metric-label">Active Properties</span>
            <h2 className="all-property-metric-value">
              {dashboard.activeProperties}
            </h2>
            <span className="all-property-metric-sub">Currently Active</span>
          </div>
        </div>

        <div className="all-property-metric-card">
          <div className="all-property-metric-icon blue">
            <FiClock />
          </div>
          <div className="all-property-metric-content">
            <span className="all-property-metric-label">
              Under Construction
            </span>
            <h2 className="all-property-metric-value">
              {dashboard.underConstruction}
            </h2>
            <span className="all-property-metric-sub">In Progress</span>
          </div>
        </div>

        <div className="all-property-metric-card">
          <div className="all-property-metric-icon red">
            <FiTag />
          </div>
          <div className="all-property-metric-content">
            <span className="all-property-metric-label">Sold / Booked</span>
            <h2 className="all-property-metric-value">
              {dashboard.soldProperties}
            </h2>
            <span className="all-property-metric-sub">Successfully Sold</span>
          </div>
        </div>

        <div className="all-property-metric-card">
          <div className="all-property-metric-icon light-blue">
            <FiView />
          </div>
          <div className="all-property-metric-content">
            <span className="all-property-metric-label">Total Views</span>
            <h2 className="all-property-metric-value">
              {dashboard.totalViews}
            </h2>
            <span className="all-property-metric-sub">All Properties</span>
          </div>
        </div>

        <div className="all-property-metric-card">
          <div className="all-property-metric-icon purple">
            <FiMessageSquare />
          </div>
          <div className="all-property-metric-content">
            <span className="all-property-metric-label">Enquiries</span>
            <h2 className="all-property-metric-value">
              {dashboard.totalEnquiries}
            </h2>
            <span className="all-property-metric-sub">Total Enquiries</span>
          </div>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="all-property-filters-bar">
        <div className="all-property-search-box">
          <FiSearch className="all-property-search-icon" />
          <input
            type="text"
            placeholder="Search by property name, location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="all-property-filter-dropdowns">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Under Construction">Under Construction</option>
            <option value="Sold">Sold</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Villa">Villa</option>
            <option value="Independent House">Independent House</option>
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Luxury Villa">Luxury Villa</option>
            <option value="Villa">Villa</option>
            <option value="Independent House">Independent House</option>
          </select>

          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="All">All Locations</option>
            <option value="Infosys Rd">Infosys Rd</option>
            <option value="Billesley">Billesley</option>
            <option value="Oxford">Oxford</option>
            <option value="Bristol">Bristol</option>
            <option value="Brighton">Brighton</option>
          </select>

          <button className="all-property-filter-btn">
            <FiFilter /> More Filters
          </button>
          <button className="all-property-reset-btn" onClick={handleReset}>
            <FiRefreshCw /> Reset
          </button>
        </div>
      </section>

      {/* Properties Table */}
      <section className="all-property-table-container">
        <div className="all-property-table-wrapper">
          <table className="all-property-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Type</th>
                <th>Price</th>
                <th>Status</th>
                <th>Added On</th>
                <th className="all-property-actions-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.length > 0 ? (
                properties.map((prop) => (
                  <React.Fragment key={prop._id}>
                    <tr className="all-property-row">
                      <td className="all-property-cell-info">
                        <img
                          src={
                            prop.image
                              ? `${BASE_URL}${prop.image}`
                              : "/no-image.png"
                          }
                          alt={prop.name}
                          className="all-property-thumb"
                        />
                        <div className="all-property-details">
                          <div className="all-property-title-line">
                            <strong>{prop.name}</strong>
                            {prop.featured && (
                              <span className="all-property-badge-featured">
                                Featured
                              </span>
                            )}
                          </div>
                          <span className="all-property-address">
                            <FiMapPin size={12} /> {prop.location}
                          </span>
                          {prop.rera && (
                            <span className="all-property-rera">
                              {prop.rera}
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="all-property-cell-meta">
                          <strong>{prop.type}</strong>
                          <span>{prop.subType}</span>
                        </div>
                      </td>
                      <td>
                        <div className="all-property-cell-price">
                          <strong>
                            ₹ {Number(prop.price).toLocaleString("en-IN")}
                          </strong>
                          <span>{prop.pricePerSqft}</span>
                        </div>
                      </td>
                      <td>
                        <div className="all-property-cell-status">
                          <span
                            className={`all-property-status-badge ${prop.status.toLowerCase().replace(/\s+/g, "-")}`}
                          >
                            <span className="status-dot"></span>
                            {prop.status}
                          </span>
                          <span className="all-property-status-sub">
                            {prop.statusType}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="all-property-cell-date">
                          <span>
                            <FiCalendar size={12} />
                            {new Date(prop.createdAt).toLocaleDateString()}
                          </span>
                          <span className="all-property-time-sub">
                            {new Date(prop.createdAt).toLocaleTimeString()}
                          </span>
                        </div>
                      </td>
                      <td className="all-property-actions-cell">
                        <button
                          className="all-property-action-btn"
                          title="View Details"
                          onClick={() => handleOpenDetails(prop)}
                        >
                          <FiEye />
                        </button>
                        <button
                          className="all-property-action-btn"
                          title="Edit"
                          onClick={() => handleEdit(prop._id)}
                        >
                          <FiEdit3 />
                        </button>

                        <button
                          className="all-property-action-btn delete-btn"
                          title="Delete"
                          onClick={() => deleteProperty(prop._id)}
                        >
                          <FiTrash2 />
                        </button>

                        {/* 3-Dot Status Selection Menu */}
                        <div className="all-property-dropdown-wrapper">
                          <button
                            className={`all-property-action-btn ${prop.menuOpen ? "active" : ""}`}
                            title="Status Options"
                            onClick={() => toggleMenu(prop._id)}
                          >
                            <FiMoreVertical />
                          </button>
                          {prop.menuOpen && (
                            <div className="all-property-status-popup-menu">
                              <div className="popup-menu-title">
                                Set Property Status
                              </div>
                              <button
                                className={`popup-option ${prop.status === "Active" ? "selected" : ""}`}
                                onClick={() =>
                                  updateStatus(prop._id, "Active", "For Sale")
                                }
                              >
                                <span className="option-dot green-dot"></span>{" "}
                                Active
                              </button>
                              <button
                                className={`popup-option ${prop.status === "Under Construction" ? "selected" : ""}`}
                                onClick={() =>
                                  updateStatus(
                                    prop._id,
                                    "Under Construction",
                                    "For Sale",
                                  )
                                }
                              >
                                <span className="option-dot orange-dot"></span>{" "}
                                Under Construction
                              </button>
                              <button
                                className={`popup-option ${prop.status === "Sold" ? "selected" : ""}`}
                                onClick={() =>
                                  updateStatus(prop._id, "Sold", "Sold Out")
                                }
                              >
                                <span className="option-dot red-dot"></span>{" "}
                                Sold
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="all-property-empty">
                    No properties found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="all-property-pagination">
          <span className="all-property-pagination-info">
            Showing page {currentPage} of {totalPages}
          </span>
          <div className="all-property-pagination-controls">
            <button
              className="all-property-page-btn"
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
            >
              <FiChevronLeft />
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`all-property-page-btn ${currentPage === page ? "active" : ""}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            <span className="all-property-page-dots">...</span>
            <button
              className={`all-property-page-btn ${currentPage === 16 ? "active" : ""}`}
              onClick={() => handlePageChange(16)}
            >
              16
            </button>
            <button
              className="all-property-page-btn"
              onClick={() => handlePageChange(Math.min(currentPage + 1, 16))}
              disabled={currentPage === 16}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </section>

      {/* View Details Modal */}
      {isModalOpen && selectedProperty && (
        <div className="all-property-modal-overlay" onClick={handleCloseModal}>
          <div
            className="all-property-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="all-property-modal-close"
              onClick={handleCloseModal}
            >
              <FiX />
            </button>
            <div className="all-property-modal-header">
              <img
                src={`${BASE_URL}${selectedProperty.image}`}
                alt={selectedProperty.name}
                className="all-property-modal-hero"
              />
              <div className="all-property-modal-header-badge">
                <span
                  className={`all-property-status-badge ${selectedProperty.status?.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <span className="status-dot"></span>
                  {selectedProperty.status}
                </span>
              </div>
            </div>
            <div className="all-property-modal-body">
              <div className="all-property-modal-title-row">
                <h2>{selectedProperty.name}</h2>
                <span className="all-property-modal-price">
                  {selectedProperty.price}
                </span>
              </div>

              <p className="all-property-modal-location">
                <FiMapPin /> {selectedProperty.location}
              </p>

              <div className="all-property-modal-grid">
                <div className="all-property-modal-item">
                  <FiHome className="modal-icon" />
                  <div>
                    <label>Property Type</label>
                    <p>
                      {selectedProperty.type} ({selectedProperty.subType})
                    </p>
                  </div>
                </div>
                <div className="all-property-modal-item">
                  <FiDollarSign className="modal-icon" />
                  <div>
                    <label>Rate / Sq.Ft</label>
                    <p>{selectedProperty.pricePerSqft || "N/A"}</p>
                  </div>
                </div>
                <div className="all-property-modal-item">
                  <FiTag className="modal-icon" />
                  <div>
                    <label>RERA Number</label>
                    <p>{selectedProperty.rera || "Not Applicable"}</p>
                  </div>
                </div>
                <div className="all-property-modal-item">
                  <FiCheckCircle className="modal-icon" />
                  <div>
                    <label>Availability</label>
                    <p>{selectedProperty.statusType || "Standard"}</p>
                  </div>
                </div>
              </div>

              <div className="all-property-modal-footer">
                <span className="all-property-modal-date">
                  Added on{" "}
                  {new Date(selectedProperty.createdAt).toLocaleDateString()}
                  at {new Date(selectedProperty.createdAt).toLocaleTimeString()}
                </span>
                <button
                  className="all-property-btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Section */}
      <section className="all-property-analytics-grid">
        <div className="all-property-analytics-card">
          <h3>Top Locations</h3>

          {topLocations.length > 0 ? (
            topLocations.map((item, index) => {
              const maxCount = Math.max(
                ...topLocations.map((location) => Number(location.count) || 0),
                1,
              );

              const percentage = ((Number(item.count) || 0) / maxCount) * 100;

              return (
                <div
                  className="all-property-location-item"
                  key={item.location || item._id || index}
                >
                  <div className="all-property-loc-info">
                    <span>{item.location || item._id || "Unknown"}</span>

                    <span>{item.count || 0} Properties</span>
                  </div>

                  <div className="all-property-progress-bar">
                    <div
                      className="fill"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <p>No location data available.</p>
          )}
        </div>

        <div className="all-property-analytics-card">
          <h3>Property Types</h3>

          <div className="all-property-pie-chart-container">
            <div className="all-property-fake-donut-chart">
              <div className="all-property-donut-center">
                <strong>
                  {propertyTypes.reduce(
                    (total, item) => total + (Number(item.count) || 0),
                    0,
                  )}
                </strong>

                <span>Properties</span>
              </div>
            </div>

            <div className="all-property-chart-legend">
              {propertyTypes.length > 0 ? (
                propertyTypes.map((item, index) => {
                  const total = propertyTypes.reduce(
                    (sum, type) => sum + (Number(type.count) || 0),
                    0,
                  );

                  const count = Number(item.count) || 0;

                  const percentage =
                    total > 0 ? Math.round((count / total) * 100) : 0;

                  return (
                    <div key={item.type || item._id || index}>
                      <span className={`dot type-${index}`} />
                      {item.type || item._id || "Unknown"}{" "}
                      <strong>
                        {count} ({percentage}%)
                      </strong>
                    </div>
                  );
                })
              ) : (
                <p>No property type data.</p>
              )}
            </div>
          </div>
        </div>

        <div className="all-property-analytics-card">
          <h3>Price Range</h3>

          {priceRanges.length > 0 ? (
            priceRanges.map((item, index) => {
              const maxCount = Math.max(
                ...priceRanges.map((range) => Number(range.count) || 0),
                1,
              );

              const count = Number(item.count) || 0;

              const percentage = (count / maxCount) * 100;

              return (
                <div
                  className="all-property-price-range-item"
                  key={item.range || item._id || index}
                >
                  <div className="all-property-loc-info">
                    <span>{item.range || item._id || "Unknown"}</span>

                    <span>{count} Properties</span>
                  </div>

                  <div className="all-property-progress-bar orange">
                    <div
                      className="fill"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <p>No price range data available.</p>
          )}
        </div>

        <div className="all-property-analytics-card">
          <h3>Recent Enquiries</h3>
          <div className="all-property-enquiry-item">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
              alt="Ravi"
            />
            <div className="all-property-enquiry-details">
              <strong>Ravi Sharma</strong>
              <p>Interested in Modern White Villa</p>
            </div>
            <span className="all-property-time-ago">2 min ago</span>
          </div>
          <div className="all-property-enquiry-item">
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80"
              alt="Sneha"
            />
            <div className="all-property-enquiry-details">
              <strong>Sneha Priya</strong>
              <p>Interested in Rudransh South Kingdom</p>
            </div>
            <span className="all-property-time-ago">15 min ago</span>
          </div>
          <div className="all-property-enquiry-item">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
              alt="Amit"
            />
            <div className="all-property-enquiry-details">
              <strong>Amit Kumar</strong>
              <p>Interested in Suburban Stone House</p>
            </div>
            <span className="all-property-time-ago">1 hour ago</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertiesDashboard;
