import React, { useState } from "react";

import {
  FaMapMarkerAlt,
  FaPlus,
  FaTimes,
  FaSave,
  FaPlane,
  FaTrain,
  FaUniversity,
  FaSchool,
  FaLandmark,
  FaShoppingBag,
  FaRoad,
  FaBriefcase,
  FaHotel,
  FaChevronLeft,
  FaChevronRight,
  FaLayerGroup,
} from "react-icons/fa";

import "./NearbyPlaces.css";

// =============================================
// ICON MAP
// =============================================

const iconMap = {
  Airport: <FaPlane />,
  "Railway Station": <FaTrain />,
  ATM: <FaLandmark />,
  School: <FaSchool />,
  Temple: <FaLandmark />,
  "Shopping Mall": <FaShoppingBag />,
  Highway: <FaRoad />,
  "Business Hubs": <FaBriefcase />,
  College: <FaUniversity />,
  Hotel: <FaHotel />,
  Airplane: <FaPlane />,
};

// =============================================
// COMPONENT
// =============================================

const NearbyPlaces = ({
  propertyData,
  setPropertyData,
}) => {
  // =============================================
  // GET PLACES FROM PARENT
  // =============================================

  const places =
    propertyData?.nearbyPlaces || [];

  // =============================================
  // MODAL
  // =============================================

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  // =============================================
  // FILTER
  // =============================================

  const [
    selectedCategoryFilter,
    setSelectedCategoryFilter,
  ] = useState("All Categories");

  // =============================================
  // FORM STATES
  // =============================================

  const [category, setCategory] =
    useState("Airport");

  const [placeName, setPlaceName] =
    useState("");

  const [distance, setDistance] =
    useState("");

  const [unit, setUnit] =
    useState("Km");

  const [icon, setIcon] =
    useState("Airplane");

  const [status, setStatus] =
    useState(true);

  // =============================================
  // FILTER PLACES
  // =============================================

  const filteredPlaces =
    selectedCategoryFilter ===
    "All Categories"
      ? places
      : places.filter(
          (place) =>
            place.category ===
            selectedCategoryFilter
        );

  // =============================================
  // ACTIVE COUNT
  // =============================================

  const activeCount = places.filter(
    (place) =>
      place.status === "Active"
  ).length;

  // =============================================
  // OPEN MODAL
  // =============================================

  const openModal = () => {
    setIsModalOpen(true);
  };

  // =============================================
  // CLOSE MODAL
  // =============================================

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // =============================================
  // RESET FORM
  // =============================================

  const resetForm = () => {
    setCategory("Airport");

    setPlaceName("");

    setDistance("");

    setUnit("Km");

    setIcon("Airplane");

    setStatus(true);
  };

  // =============================================
  // SAVE NEARBY PLACE
  // =============================================

  const handleSavePlace = (e) => {
    e.preventDefault();

    // -----------------------------------------
    // VALIDATION
    // -----------------------------------------

    if (!placeName.trim()) {
      alert("Place name is required.");
      return;
    }

    if (!distance) {
      alert("Distance is required.");
      return;
    }

    // -----------------------------------------
    // CREATE PLACE
    // -----------------------------------------

    const newEntry = {
      // Frontend temporary id
      id: Date.now(),

      category: category,

      name: placeName.trim(),

      distance: `${distance} ${unit}`,

      distanceValue:
        Number(distance) || 0,

      unit: unit,

      icon: icon,

      status: status
        ? "Active"
        : "Inactive",
    };

    // -----------------------------------------
    // SAVE INTO PARENT PROPERTY DATA
    // -----------------------------------------

    setPropertyData((previous) => ({
      ...previous,

      nearbyPlaces: [
        ...(previous.nearbyPlaces ||
          []),

        newEntry,
      ],
    }));

    console.log(
      "Nearby Place Added:",
      newEntry
    );

    // -----------------------------------------
    // CLOSE + RESET
    // -----------------------------------------

    closeModal();

    resetForm();
  };

  // =============================================
  // RENDER
  // =============================================

  return (
    <div className="nearby-places__container">

      <div className="nearby-places__card">

        {/* =====================================
            HEADER ROW
        ===================================== */}

        <div className="nearby-places__header-row">

          <div className="nearby-places__title-group">

            <FaMapMarkerAlt className="nearby-places__map-icon-green" />

            <div>

              <h1>
                Nearby Places
              </h1>

              <p>
                Manage and explore nearby
                places easily.
              </p>

            </div>

          </div>

          {/* =================================
              STATS
          ================================= */}

          <div className="nearby-places__stats-group">

            {/* TOTAL */}

            <div className="nearby-places__stat-card">

              <FaMapMarkerAlt className="nearby-places__stat-icon nearby-places__stat-icon--total" />

              <div>

                <h3>
                  {places.length}
                </h3>

                <p>
                  All Listed Places
                </p>

              </div>

            </div>

            {/* ACTIVE */}

            <div className="nearby-places__stat-card">

              <FaLayerGroup className="nearby-places__stat-icon nearby-places__stat-icon--active" />

              <div>

                <h3>
                  {activeCount}
                </h3>

                <p>
                  Currently Active
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================
            TOOLBAR & FILTER
        ===================================== */}

        <div className="nearby-places__toolbar">

          <select
            className="nearby-places__category-filter"
            value={
              selectedCategoryFilter
            }
            onChange={(e) =>
              setSelectedCategoryFilter(
                e.target.value
              )
            }
          >

            <option>
              All Categories
            </option>

            <option>
              Airport
            </option>

            <option>
              Railway Station
            </option>

            <option>
              ATM
            </option>

            <option>
              School
            </option>

            <option>
              Temple
            </option>

            <option>
              Shopping Mall
            </option>

            <option>
              Highway
            </option>

            <option>
              Business Hubs
            </option>

            <option>
              College
            </option>

            <option>
              Hotel
            </option>

          </select>

          <button
            type="button"
            className="nearby-places__add-btn"
            onClick={openModal}
          >

            <FaPlus />

            Add Nearby Place

          </button>

        </div>

        {/* =====================================
            DATA TABLE
        ===================================== */}

        <div className="nearby-places__table-wrapper">

          <table className="nearby-places__table">

            <thead>

              <tr>

                <th>#</th>

                <th>
                  CATEGORY
                </th>

                <th>
                  PLACE NAME
                </th>

                <th>
                  DISTANCE
                </th>

                <th>
                  STATUS
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredPlaces.length >
              0 ? (

                filteredPlaces.map(
                  (item, index) => (

                    <tr
                      key={
                        item.id ||
                        index
                      }
                    >

                      <td>
                        {index + 1}
                      </td>

                      {/* CATEGORY */}

                      <td>

                        <div className="nearby-places__cat-cell">

                          <div className="nearby-places__icon-box">

                            {iconMap[
                              item.category
                            ] || (
                              <FaMapMarkerAlt />
                            )}

                          </div>

                          <span>
                            {
                              item.category
                            }
                          </span>

                        </div>

                      </td>

                      {/* NAME */}

                      <td>
                        {item.name}
                      </td>

                      {/* DISTANCE */}

                      <td>
                        {item.distance}
                      </td>

                      {/* STATUS */}

                      <td>

                        <span
                          className={`nearby-places__status-tag nearby-places__status-tag--${(
                            item.status ||
                            "Inactive"
                          ).toLowerCase()}`}
                        >

                          {
                            item.status
                          }

                        </span>

                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="5"
                    style={{
                      textAlign:
                        "center",
                    }}
                  >
                    No nearby places
                    added.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* =====================================
            PAGINATION ROW
        ===================================== */}

        <div className="nearby-places__pagination-row">

          <span>

            Showing 1 to{" "}

            {
              filteredPlaces.length
            }{" "}

            of {places.length} places

          </span>

          <div className="nearby-places__pagination-controls">

            <button
              type="button"
              className="nearby-places__page-btn"
            >

              <FaChevronLeft
                size={10}
              />

            </button>

            <button
              type="button"
              className="nearby-places__page-btn nearby-places__page-btn--active"
            >
              1
            </button>

            <button
              type="button"
              className="nearby-places__page-btn"
            >
              2
            </button>

            <button
              type="button"
              className="nearby-places__page-btn"
            >
              3
            </button>

            <button
              type="button"
              className="nearby-places__page-btn"
            >

              <FaChevronRight
                size={10}
              />

            </button>

          </div>

        </div>

      </div>

      {/* =======================================
          ADD NEARBY PLACE POPUP
      ======================================= */}

      <div
        className={`nearby-places__popup-overlay ${
          isModalOpen
            ? "nearby-places__popup-overlay--open"
            : ""
        }`}
      >

        <div className="nearby-places__add-card">

          {/* ===================================
              MODAL HEADER
          =================================== */}

          <div className="nearby-places__add-header">

            <h2>

              <FaMapMarkerAlt
                color="#006738"
              />

              Add Nearby Place

            </h2>

            <button
              type="button"
              className="nearby-places__close-btn"
              onClick={() => {
                closeModal();
                resetForm();
              }}
            >

              <FaTimes />

            </button>

          </div>

          {/* ===================================
              FORM
          =================================== */}

          <form
            onSubmit={
              handleSavePlace
            }
            className="nearby-places__form"
          >

            {/* =================================
                CATEGORY
            ================================= */}

            <div className="nearby-places__form-group">

              <label>
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value
                  )
                }
              >

                <option>
                  Airport
                </option>

                <option>
                  Railway Station
                </option>

                <option>
                  ATM
                </option>

                <option>
                  School
                </option>

                <option>
                  Temple
                </option>

                <option>
                  Shopping Mall
                </option>

                <option>
                  Highway
                </option>

                <option>
                  Business Hubs
                </option>

                <option>
                  College
                </option>

                <option>
                  Hotel
                </option>

              </select>

            </div>

            {/* =================================
                PLACE NAME
            ================================= */}

            <div className="nearby-places__form-group">

              <label>
                Place Name
              </label>

              <input
                type="text"
                placeholder="Enter place name"
                value={placeName}
                onChange={(e) =>
                  setPlaceName(
                    e.target.value
                  )
                }
                required
              />

            </div>

            {/* =================================
                DISTANCE + UNIT
            ================================= */}

            <div className="nearby-places__form-row">

              {/* DISTANCE */}

              <div className="nearby-places__form-group nearby-places__form-group--half">

                <label>
                  Distance
                </label>

                <input
                  type="number"
                  placeholder="Distance"
                  value={distance}
                  onChange={(e) =>
                    setDistance(
                      e.target.value
                    )
                  }
                  min="0"
                  required
                />

              </div>

              {/* UNIT */}

              <div className="nearby-places__form-group nearby-places__form-group--half">

                <label>
                  Unit
                </label>

                <select
                  value={unit}
                  onChange={(e) =>
                    setUnit(
                      e.target.value
                    )
                  }
                >

                  <option>
                    Km
                  </option>

                  <option>
                    Meter
                  </option>

                </select>

              </div>

            </div>

            {/* =================================
                ICON
            ================================= */}

            <div className="nearby-places__form-group">

              <label className="nearby-places__optional-label">
                Icon
              </label>

              <select
                value={icon}
                onChange={(e) =>
                  setIcon(
                    e.target.value
                  )
                }
              >

                <option>
                  Airplane
                </option>

                <option>
                  Railway Station
                </option>

                <option>
                  ATM
                </option>

                <option>
                  School
                </option>

                <option>
                  Temple
                </option>

                <option>
                  Shopping Mall
                </option>

                <option>
                  Highway
                </option>

                <option>
                  Business Hubs
                </option>

                <option>
                  College
                </option>

                <option>
                  Hotel
                </option>

              </select>

            </div>

            {/* =================================
                STATUS
            ================================= */}

            <div className="nearby-places__form-group">

              <label>
                Status
              </label>

              <div className="nearby-places__toggle-group">

                <label className="nearby-places__switch">

                  <input
                    type="checkbox"
                    checked={status}
                    onChange={(e) =>
                      setStatus(
                        e.target
                          .checked
                      )
                    }
                  />

                  <span className="nearby-places__slider"></span>

                </label>

                <span className="nearby-places__status-label">

                  {status
                    ? "Active"
                    : "Inactive"}

                </span>

              </div>

            </div>

            {/* =================================
                LIVE PREVIEW
            ================================= */}

            <div className="nearby-places__preview-box">

              <div className="nearby-places__icon-box">

                {iconMap[icon] || (
                  <FaMapMarkerAlt />
                )}

              </div>

              <div className="nearby-places__preview-details">

                <p className="nearby-places__preview-subtext">
                  Preview
                </p>

                <h4>

                  {placeName ||
                    "Place Name"}

                </h4>

                <p>

                  {distance
                    ? `${distance} ${unit}`
                    : "0 Km"}

                </p>

              </div>

            </div>

            {/* =================================
                ACTION BUTTONS
            ================================= */}

            <div className="nearby-places__form-actions">

              <button
                type="button"
                className="nearby-places__action-btn nearby-places__action-btn--cancel"
                onClick={() => {
                  closeModal();
                  resetForm();
                }}
              >

                Cancel

              </button>

              <button
                type="submit"
                className="nearby-places__action-btn nearby-places__action-btn--save"
              >

                <FaSave />

                Save Place

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default NearbyPlaces;