import React, { useEffect, useState } from "react";
import "./GridBreadcrum.css";
import API from "../../api/axios";

// React Icons
import {
  FiSearch,
  FiSliders,
  FiChevronDown,
  FiCheck,
} from "react-icons/fi";

// Local Asset Image Import
import heroBg from "../../assets/bg1.jpg";

const GridBreadcrum = ({ onSearch }) => {
  // =====================================================
  // PARENT CATEGORY
  // Residential / Commercial / Rent
  // =====================================================
  const [activeTab, setActiveTab] = useState("");

  // =====================================================
  // FILTER PANEL
  // =====================================================
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // =====================================================
  // FILTER STATES
  // =====================================================
  const [keyword, setKeyword] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [baths, setBaths] = useState("");
  const [beds, setBeds] = useState("");

  // =====================================================
  // CATEGORY DATA
  // =====================================================
  const [categories, setCategories] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);
  const [loadingParents, setLoadingParents] = useState(false);

  // =====================================================
  // AMENITIES
  // =====================================================
  const [amenitiesList, setAmenitiesList] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [loadingAmenities, setLoadingAmenities] = useState(false);

  // =====================================================
  // FETCH CATEGORIES
  // =====================================================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingParents(true);
        const response = await API.get("/categories");
        const categoryData =
          response.data?.categories ||
          response.data?.data ||
          response.data ||
          [];

        if (!Array.isArray(categoryData)) {
          setCategories([]);
          setParentCategories([]);
          return;
        }

        const activeCategories = categoryData.filter(
          (category) => !category.status || category.status === "Active"
        );

        setCategories(activeCategories);

        const parents = [
          ...new Set(
            activeCategories
              .map((category) => category.parent)
              .filter(
                (parent) =>
                  parent && parent.trim() !== "" && parent !== "None"
              )
          ),
        ];

        setParentCategories(parents);

        if (parents.length > 0 && !activeTab) {
          setActiveTab(parents[0]);
        }
      } catch (error) {
        console.error("CATEGORY FETCH ERROR:", error.response?.data || error);
        setCategories([]);
        setParentCategories([]);
      } finally {
        setLoadingParents(false);
      }
    };

    fetchCategories();
  }, []);

  // =====================================================
  // FETCH AMENITIES
  // =====================================================
  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        setLoadingAmenities(true);
        const response = await API.get("/amenities");
        const amenityData =
          response.data?.amenities ||
          response.data?.data ||
          response.data ||
          [];

        if (!Array.isArray(amenityData)) {
          setAmenitiesList([]);
          return;
        }

        const activeAmenities = amenityData.filter(
          (amenity) => !amenity.status || amenity.status === "Active"
        );

        setAmenitiesList(activeAmenities);
      } catch (error) {
        console.error("AMENITIES FETCH ERROR:", error.response?.data || error);
        setAmenitiesList([]);
      } finally {
        setLoadingAmenities(false);
      }
    };

    fetchAmenities();
  }, []);

  // =====================================================
  // CHILD CATEGORIES ACCORDING TO PARENT
  // =====================================================
  const filteredCategories = categories.filter(
    (category) => category.parent === activeTab
  );

  // =====================================================
  // AMENITY CHECKBOX
  // =====================================================
  const handleCheckboxChange = (amenityName) => {
    setSelectedAmenities((previous) => {
      if (previous.includes(amenityName)) {
        return previous.filter((item) => item !== amenityName);
      }
      return [...previous, amenityName];
    });
  };

  // =====================================================
  // PARENT CHANGE
  // =====================================================
  const handleParentChange = (parent) => {
    setActiveTab(parent);
    setPropertyType("");

    onSearch?.({
      search: keyword.trim(),
      type: "",
      location,
      bedrooms: beds,
      bathrooms: baths,
      parent,
      amenities: selectedAmenities,
    });
  };

  // =====================================================
  // SEARCH
  // =====================================================
  const handleSearch = () => {
    const filters = {
      search: keyword.trim(),
      type: propertyType,
      location,
      bedrooms: beds,
      bathrooms: baths,
      parent: activeTab,
      amenities: selectedAmenities,
    };

    onSearch?.(filters);
  };

  return (
    <div className="GridBreadcrum" role="search" aria-label="Property Search & Filters">
      <div className="GridBreadcrum-filter-section">
        <div className="GridBreadcrum-container">
          
          {/* PARENT CATEGORY TABS */}
          <div className="GridBreadcrum-tab-wrapper" role="tablist" aria-label="Property Category Tabs">
            {loadingParents ? (
              <button
                type="button"
                className="GridBreadcrum-tab-btn"
                disabled
              >
                Loading...
              </button>
            ) : (
              parentCategories.map((parent) => (
                <button
                  key={parent}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === parent}
                  aria-label={`Show ${parent} properties`}
                  className={`GridBreadcrum-tab-btn ${
                    activeTab === parent ? "active" : ""
                  }`}
                  onClick={() => handleParentChange(parent)}
                >
                  {activeTab === parent && (
                    <FiCheck className="GridBreadcrum-check-icon" aria-hidden="true" />
                  )}
                  {parent}
                </button>
              ))
            )}
          </div>

          {/* MAIN SEARCH BAR */}
          <div className="GridBreadcrum-search-bar">
            {/* KEYWORD */}
            <div className="GridBreadcrum-input-box">
              <FiSearch className="GridBreadcrum-input-icon" aria-hidden="true" />
              <input
                type="text"
                placeholder="Type keyword"
                aria-label="Search properties by keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="GridBreadcrum-input"
              />
            </div>

            {/* PROPERTY TYPE */}
            <div className="GridBreadcrum-select-box">
              <select
                value={propertyType}
                aria-label="Filter by property type"
                onChange={(e) => setPropertyType(e.target.value)}
                className="GridBreadcrum-select"
              >
                <option value="">Property type</option>
                {filteredCategories.map((category) => (
                  <option
                    key={category._id || category.name}
                    value={category.name}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
              <FiChevronDown className="GridBreadcrum-select-icon" aria-hidden="true" />
            </div>

            {/* LOCATION */}
            <div className="GridBreadcrum-select-box">
              <input
                type="text"
                placeholder="Location"
                aria-label="Search properties by location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="GridBreadcrum-select"
              />
            </div>

            {/* BATHS */}
            <div className="GridBreadcrum-select-box">
              <select
                value={baths}
                aria-label="Filter by number of bathrooms"
                onChange={(e) => setBaths(e.target.value)}
                className="GridBreadcrum-select"
              >
                <option value="">Baths</option>
                <option value="1">1 Bath</option>
                <option value="2">2 Baths</option>
                <option value="3">3+ Baths</option>
              </select>
              <FiChevronDown className="GridBreadcrum-select-icon" aria-hidden="true" />
            </div>

            {/* BEDS */}
            <div className="GridBreadcrum-select-box">
              <select
                value={beds}
                aria-label="Filter by number of bedrooms"
                onChange={(e) => setBeds(e.target.value)}
                className="GridBreadcrum-select"
              >
                <option value="">Beds</option>
                <option value="1">1 Bed</option>
                <option value="2">2 Beds</option>
                <option value="3">3 Beds</option>
                <option value="4">4 Beds</option>
              </select>
              <FiChevronDown className="GridBreadcrum-select-icon" aria-hidden="true" />
            </div>

            {/* FILTER TOGGLE */}
            <button
              type="button"
              aria-label={isFilterOpen ? "Collapse additional filters" : "Expand additional filters"}
              aria-expanded={isFilterOpen}
              className={`GridBreadcrum-filters-toggle-btn ${
                isFilterOpen ? "active" : ""
              }`}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <span>Filters</span>
              <FiSliders className="GridBreadcrum-sliders-icon" aria-hidden="true" />
            </button>

            {/* SEARCH */}
            <button
              type="button"
              aria-label="Search properties now"
              className="GridBreadcrum-search-btn"
              onClick={handleSearch}
            >
              <span>Search Now</span>
              <FiSearch className="GridBreadcrum-btn-search-icon" aria-hidden="true" />
            </button>
          </div>

          {/* EXTENDED FILTER */}
          {isFilterOpen && (
            <div className="GridBreadcrum-extended-panel" aria-label="Extended filter options">
              <div className="GridBreadcrum-extended-header-row">
                <div className="GridBreadcrum-extended-select-box">
                  <select
                    value={baths}
                    aria-label="Filter by minimum bathrooms"
                    onChange={(e) => setBaths(e.target.value)}
                    className="GridBreadcrum-select"
                  >
                    <option value="">Baths: Any</option>
                    <option value="1">1 Bath</option>
                    <option value="2">2 Baths</option>
                    <option value="3">3 Baths</option>
                  </select>
                  <FiChevronDown className="GridBreadcrum-select-icon" aria-hidden="true" />
                </div>

                <div className="GridBreadcrum-extended-select-box">
                  <select
                    value={beds}
                    aria-label="Filter by minimum bedrooms"
                    onChange={(e) => setBeds(e.target.value)}
                    className="GridBreadcrum-select"
                  >
                    <option value="">Beds: Any</option>
                    <option value="1">1 Bed</option>
                    <option value="2">2 Beds</option>
                    <option value="3">3 Beds</option>
                  </select>
                  <FiChevronDown className="GridBreadcrum-select-icon" aria-hidden="true" />
                </div>

                <div className="GridBreadcrum-filter-range-label">From —</div>
                <div className="GridBreadcrum-filter-range-label">Size —</div>
              </div>

              <div className="GridBreadcrum-divider" role="separator"></div>

              {/* AMENITIES */}
              <div className="GridBreadcrum-checkboxes-grid" aria-label="Filter by amenities">
                {loadingAmenities ? (
                  <span>Loading amenities...</span>
                ) : amenitiesList.length === 0 ? (
                  <span>No amenities found</span>
                ) : (
                  amenitiesList.map((amenity) => {
                    const amenityName =
                      amenity.name || amenity.title || "";

                    if (!amenityName) return null;

                    const checked = selectedAmenities.includes(amenityName);

                    return (
                      <label
                        key={amenity._id || amenityName}
                        className="GridBreadcrum-checkbox-label"
                      >
                        <input
                          type="checkbox"
                          name={amenityName}
                          aria-label={`Include ${amenityName}`}
                          checked={checked}
                          onChange={() => handleCheckboxChange(amenityName)}
                        />
                        <span>{amenityName}</span>
                      </label>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GridBreadcrum;