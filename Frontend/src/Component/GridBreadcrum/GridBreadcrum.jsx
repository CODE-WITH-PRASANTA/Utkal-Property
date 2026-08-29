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

import {
  BiBed,
  BiBath,
  BiArea,
} from "react-icons/bi";

import { HiOutlineMapPin } from "react-icons/hi2";

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

  const [isFilterOpen, setIsFilterOpen] =
    useState(false);

  // =====================================================
  // FILTER STATES
  // =====================================================

  const [keyword, setKeyword] = useState("");

  const [propertyType, setPropertyType] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [baths, setBaths] =
    useState("");

  const [beds, setBeds] =
    useState("");

  // =====================================================
  // CATEGORY DATA
  // =====================================================

  const [categories, setCategories] =
    useState([]);

  const [
    parentCategories,
    setParentCategories,
  ] = useState([]);

  const [
    loadingParents,
    setLoadingParents,
  ] = useState(false);

  // =====================================================
  // AMENITIES
  // =====================================================

  const [
    amenitiesList,
    setAmenitiesList,
  ] = useState([]);

  // IMPORTANT:
  // Store selected amenity names directly.
  //
  // Example:
  // [
  //   "Swimming Pool",
  //   "Gym",
  //   "CCTV"
  // ]

  const [
    selectedAmenities,
    setSelectedAmenities,
  ] = useState([]);

  const [
    loadingAmenities,
    setLoadingAmenities,
  ] = useState(false);

  // =====================================================
  // FETCH CATEGORIES
  // =====================================================

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingParents(true);

        const response =
          await API.get("/categories");

        console.log(
          "CATEGORY RESPONSE:",
          response.data
        );

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

        // =============================================
        // ONLY ACTIVE CATEGORIES
        // =============================================

        const activeCategories =
          categoryData.filter(
            (category) =>
              !category.status ||
              category.status === "Active"
          );

        console.log(
          "ACTIVE CATEGORIES:",
          activeCategories
        );

        setCategories(activeCategories);

        // =============================================
        // UNIQUE PARENTS
        // =============================================

        const parents = [
          ...new Set(
            activeCategories
              .map(
                (category) =>
                  category.parent
              )
              .filter(
                (parent) =>
                  parent &&
                  parent.trim() !== "" &&
                  parent !== "None"
              )
          ),
        ];

        console.log(
          "CATEGORY PARENTS:",
          parents
        );

        setParentCategories(parents);

        // =============================================
        // DEFAULT FIRST PARENT
        // =============================================

        if (
          parents.length > 0 &&
          !activeTab
        ) {
          setActiveTab(parents[0]);
        }
      } catch (error) {
        console.error(
          "CATEGORY FETCH ERROR:",
          error.response?.data ||
            error
        );

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

        const response =
          await API.get("/amenities");

        console.log(
          "AMENITIES RESPONSE:",
          response.data
        );

        const amenityData =
          response.data?.amenities ||
          response.data?.data ||
          response.data ||
          [];

        if (!Array.isArray(amenityData)) {
          setAmenitiesList([]);

          return;
        }

        // =============================================
        // ONLY ACTIVE AMENITIES
        // =============================================

        const activeAmenities =
          amenityData.filter(
            (amenity) =>
              !amenity.status ||
              amenity.status === "Active"
          );

        console.log(
          "ACTIVE AMENITIES:",
          activeAmenities
        );

        setAmenitiesList(
          activeAmenities
        );
      } catch (error) {
        console.error(
          "AMENITIES FETCH ERROR:",
          error.response?.data ||
            error
        );

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

  const filteredCategories =
    categories.filter(
      (category) =>
        category.parent === activeTab
    );

  console.log(
    "SELECTED PARENT:",
    activeTab
  );

  console.log(
    "FILTERED CATEGORIES:",
    filteredCategories
  );

  // =====================================================
  // AMENITY CHECKBOX
  // =====================================================

  const handleCheckboxChange = (
    amenityName
  ) => {
    setSelectedAmenities(
      (previous) => {
        // Already selected
        if (
          previous.includes(
            amenityName
          )
        ) {
          return previous.filter(
            (item) =>
              item !== amenityName
          );
        }

        // Add new amenity
        return [
          ...previous,
          amenityName,
        ];
      }
    );
  };

  // =====================================================
  // PARENT CHANGE
  // =====================================================

  const handleParentChange = (
    parent
  ) => {
    console.log(
      "PARENT SELECTED:",
      parent
    );

    setActiveTab(parent);

    // Reset child property category
    setPropertyType("");

    // Run filter immediately
    onSearch?.({
      search: keyword.trim(),

      type: "",

      location,

      bedrooms: beds,

      bathrooms: baths,

      parent,

      amenities:
        selectedAmenities,
    });
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = () => {
    const filters = {
      search:
        keyword.trim(),

      type:
        propertyType,

      location:
        location,

      bedrooms:
        beds,

      bathrooms:
        baths,

      parent:
        activeTab,

      amenities:
        selectedAmenities,
    };

    console.log(
      "SEARCH FILTERS:",
      filters
    );

    onSearch?.(filters);
  };

  // =====================================================
  // BACKGROUND
  // =====================================================

  const bgStyle = {
    backgroundImage: `linear-gradient(
      rgba(11, 59, 36, 0.45),
      rgba(0, 0, 0, 0.65)
    ), url(${heroBg})`,
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="GridBreadcrum">

      {/* ============================================== */}
      {/* FILTER SECTION */}
      {/* ============================================== */}

      <div className="GridBreadcrum-filter-section">

        <div className="GridBreadcrum-container">

          {/* ========================================== */}
          {/* PARENT CATEGORY TABS */}
          {/* ========================================== */}

          <div className="GridBreadcrum-tab-wrapper">

            {loadingParents ? (
              <button
                type="button"
                className="GridBreadcrum-tab-btn"
                disabled
              >
                Loading...
              </button>
            ) : (
              parentCategories.map(
                (parent) => (
                  <button
                    key={parent}
                    type="button"
                    className={`GridBreadcrum-tab-btn ${
                      activeTab === parent
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      handleParentChange(
                        parent
                      )
                    }
                  >
                    {activeTab ===
                      parent && (
                      <FiCheck className="GridBreadcrum-check-icon" />
                    )}

                    {parent}
                  </button>
                )
              )
            )}

          </div>

          {/* ========================================== */}
          {/* MAIN SEARCH BAR */}
          {/* ========================================== */}

          <div className="GridBreadcrum-search-bar">

            {/* KEYWORD */}

            <div className="GridBreadcrum-input-box">

              <FiSearch className="GridBreadcrum-input-icon" />

              <input
                type="text"
                placeholder="Type keyword"
                value={keyword}
                onChange={(e) =>
                  setKeyword(
                    e.target.value
                  )
                }
                className="GridBreadcrum-input"
              />

            </div>

            {/* ======================================== */}
            {/* PROPERTY TYPE */}
            {/* CHILD CATEGORY ACCORDING TO PARENT */}
            {/* ======================================== */}

            <div className="GridBreadcrum-select-box">

              <select
                value={propertyType}
                onChange={(e) =>
                  setPropertyType(
                    e.target.value
                  )
                }
                className="GridBreadcrum-select"
              >

                <option value="">
                  Property type
                </option>

                {filteredCategories.map(
                  (category) => (
                    <option
                      key={
                        category._id ||
                        category.name
                      }
                      value={
                        category.name
                      }
                    >
                      {category.name}
                    </option>
                  )
                )}

              </select>

              <FiChevronDown className="GridBreadcrum-select-icon" />

            </div>

            {/* ======================================== */}
            {/* LOCATION */}
            {/* ======================================== */}

            <div className="GridBreadcrum-select-box">

              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) =>
                  setLocation(
                    e.target.value
                  )
                }
                className="GridBreadcrum-select"
              />

            </div>

            {/* ======================================== */}
            {/* BATHS */}
            {/* ======================================== */}

            <div className="GridBreadcrum-select-box">

              <select
                value={baths}
                onChange={(e) =>
                  setBaths(
                    e.target.value
                  )
                }
                className="GridBreadcrum-select"
              >

                <option value="">
                  Baths
                </option>

                <option value="1">
                  1 Bath
                </option>

                <option value="2">
                  2 Baths
                </option>

                <option value="3">
                  3+ Baths
                </option>

              </select>

              <FiChevronDown className="GridBreadcrum-select-icon" />

            </div>

            {/* ======================================== */}
            {/* BEDS */}
            {/* ======================================== */}

            <div className="GridBreadcrum-select-box">

              <select
                value={beds}
                onChange={(e) =>
                  setBeds(
                    e.target.value
                  )
                }
                className="GridBreadcrum-select"
              >

                <option value="">
                  Beds
                </option>

                <option value="1">
                  1 Bed
                </option>

                <option value="2">
                  2 Beds
                </option>

                <option value="3">
                  3 Beds
                </option>

                <option value="4">
                  4 Beds
                </option>

              </select>

              <FiChevronDown className="GridBreadcrum-select-icon" />

            </div>

            {/* ======================================== */}
            {/* FILTER TOGGLE */}
            {/* ======================================== */}

            <button
              className={`GridBreadcrum-filters-toggle-btn ${
                isFilterOpen
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setIsFilterOpen(
                  !isFilterOpen
                )
              }
            >

              <span>
                Filters
              </span>

              <FiSliders className="GridBreadcrum-sliders-icon" />

            </button>

            {/* ======================================== */}
            {/* SEARCH */}
            {/* ======================================== */}

            <button
              className="GridBreadcrum-search-btn"
              onClick={
                handleSearch
              }
            >

              <span>
                Search Now
              </span>

              <FiSearch className="GridBreadcrum-btn-search-icon" />

            </button>

          </div>

          {/* ========================================== */}
          {/* EXTENDED FILTER */}
          {/* ========================================== */}

          {isFilterOpen && (
            <div className="GridBreadcrum-extended-panel">

              {/* ====================================== */}
              {/* TOP ROW */}
              {/* ====================================== */}

              <div className="GridBreadcrum-extended-header-row">

                <div className="GridBreadcrum-extended-select-box">

                  <select
                    value={baths}
                    onChange={(e) =>
                      setBaths(
                        e.target.value
                      )
                    }
                    className="GridBreadcrum-select"
                  >

                    <option value="">
                      Baths: Any
                    </option>

                    <option value="1">
                      1 Bath
                    </option>

                    <option value="2">
                      2 Baths
                    </option>

                    <option value="3">
                      3 Baths
                    </option>

                  </select>

                  <FiChevronDown className="GridBreadcrum-select-icon" />

                </div>

                <div className="GridBreadcrum-extended-select-box">

                  <select
                    value={beds}
                    onChange={(e) =>
                      setBeds(
                        e.target.value
                      )
                    }
                    className="GridBreadcrum-select"
                  >

                    <option value="">
                      Beds: Any
                    </option>

                    <option value="1">
                      1 Bed
                    </option>

                    <option value="2">
                      2 Beds
                    </option>

                    <option value="3">
                      3 Beds
                    </option>

                  </select>

                  <FiChevronDown className="GridBreadcrum-select-icon" />

                </div>

                <div className="GridBreadcrum-filter-range-label">
                  From —
                </div>

                <div className="GridBreadcrum-filter-range-label">
                  Size —
                </div>

              </div>

              <div className="GridBreadcrum-divider"></div>

              {/* ====================================== */}
              {/* AMENITIES */}
              {/* SAME EXISTING CLASS */}
              {/* ====================================== */}

              <div className="GridBreadcrum-checkboxes-grid">

                {loadingAmenities ? (
                  <span>
                    Loading amenities...
                  </span>
                ) : amenitiesList.length ===
                  0 ? (
                  <span>
                    No amenities found
                  </span>
                ) : (
                  amenitiesList.map(
                    (amenity) => {
                      const amenityName =
                        amenity.name ||
                        amenity.title ||
                        "";

                      if (
                        !amenityName
                      ) {
                        return null;
                      }

                      const checked =
                        selectedAmenities.includes(
                          amenityName
                        );

                      return (
                        <label
                          key={
                            amenity._id ||
                            amenityName
                          }
                          className="GridBreadcrum-checkbox-label"
                        >

                          <input
                            type="checkbox"
                            name={
                              amenityName
                            }
                            checked={
                              checked
                            }
                            onChange={() =>
                              handleCheckboxChange(
                                amenityName
                              )
                            }
                          />

                          <span>
                            {amenityName}
                          </span>

                        </label>
                      );
                    }
                  )
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
