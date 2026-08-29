import React, { useEffect, useState } from "react";
import "./FetchAmenities.css";
import API from "../../api/Axios";

const FetchAmenities = ({
  propertyData,
  setPropertyData,
}) => {
  const [fapList, setFapList] = useState([]);
  const [fapLoading, setFapLoading] = useState(false);

  // ============================================
  // FETCH DATA
  // ============================================

  useEffect(() => {
    const loadFapData = async () => {
      try {
        setFapLoading(true);

        const response = await API.get("/amenities");

        console.log(
          "AMENITIES RESPONSE:",
          response.data
        );

        const responseData =
          response.data?.amenities ||
          response.data?.data ||
          response.data ||
          [];

        if (Array.isArray(responseData)) {
          setFapList(responseData);
        } else {
          setFapList([]);
        }
      } catch (error) {
        console.error(
          "FETCH ERROR:",
          error.response?.data || error
        );

        setFapList([]);
      } finally {
        setFapLoading(false);
      }
    };

    loadFapData();
  }, []);

  // ============================================
  // SELECTED DATA
  // ============================================

  const fapSelected = Array.isArray(
    propertyData?.amenities
  )
    ? propertyData.amenities
    : [];

  // ============================================
  // ACTIVE DATA
  // ============================================

  const fapActive = fapList.filter(
    (item) =>
      !item.status ||
      item.status === "Active"
  );

  // ============================================
  // TOGGLE AMENITY
  // ============================================

  const handleFapChange = (itemName) => {
    setPropertyData((previousData) => {
      const currentItems = Array.isArray(
        previousData?.amenities
      )
        ? previousData.amenities
        : [];

      const exists =
        currentItems.includes(itemName);

      // REMOVE
      if (exists) {
        return {
          ...previousData,

          amenities: currentItems.filter(
            (item) => item !== itemName
          ),
        };
      }

      // ADD
      return {
        ...previousData,

        amenities: [
          ...currentItems,
          itemName,
        ],
      };
    });
  };

  // ============================================
  // SELECTED COUNT
  // ============================================

  const fapSelectedCount =
    fapSelected.length;

  // ============================================
  // UI
  // ============================================

  return (
    <section className="fap-container">

      {/* ======================================
          PREMIUM HEADER
      ====================================== */}

      <div className="fap-header">

        <div className="fap-heading">

          <div className="fap-heading-icon">
            <span>✦</span>
          </div>

          <div className="fap-heading-content">

            <div className="fap-title-row">

              <h2 className="fap-title">
                Property Amenities
              </h2>

              {!fapLoading &&
                fapActive.length > 0 && (
                  <span className="fap-available-badge">
                    {fapActive.length} Available
                  </span>
                )}

            </div>

            <p className="fap-description">
              Select the facilities and services
              available at this property.
            </p>

          </div>

        </div>

        {!fapLoading &&
          fapActive.length > 0 && (
            <div
              className={`fap-counter ${
                fapSelectedCount > 0
                  ? "fap-counter-active"
                  : ""
              }`}
            >

              <span className="fap-counter-number">
                {fapSelectedCount}
              </span>

              <span className="fap-counter-label">
                Selected
              </span>

            </div>
          )}

      </div>

      {/* ======================================
          DIVIDER
      ====================================== */}

      <div className="fap-divider" />

      {/* ======================================
          LOADING
      ====================================== */}

      {fapLoading ? (
        <div className="fap-loading">

          <div className="fap-loading-animation">
            <span className="fap-spinner" />
          </div>

          <div className="fap-loading-content">
            <span className="fap-loading-title">
              Loading amenities
            </span>

            <span className="fap-loading-text">
              Please wait...
            </span>
          </div>

        </div>
      ) : fapActive.length === 0 ? (

        /* ====================================
           EMPTY STATE
        ==================================== */

        <div className="fap-empty">

          <div className="fap-empty-icon">
            <span>✦</span>
          </div>

          <div className="fap-empty-content">

            <h3>
              No facilities available
            </h3>

            <p>
              Active facilities will appear here.
            </p>

          </div>

        </div>

      ) : (

        /* ====================================
           AMENITIES GRID
        ==================================== */

        <div className="fap-grid">

          {fapActive.map((item) => {

            const itemName =
              item.name ||
              item.title ||
              "";

            if (!itemName) {
              return null;
            }

            const isSelected =
              fapSelected.includes(itemName);

            return (
              <label
                key={
                  item._id ||
                  itemName
                }
                className={`fap-item ${
                  isSelected
                    ? "fap-item-active"
                    : ""
                }`}
              >

                {/* =================================
                    REAL CHECKBOX
                ================================= */}

                <input
                  type="checkbox"
                  className="fap-input"
                  checked={isSelected}
                  onChange={() =>
                    handleFapChange(
                      itemName
                    )
                  }
                />

                {/* =================================
                    CHECKBOX
                ================================= */}

                <span className="fap-check">

                  {isSelected && (
                    <span className="fap-check-mark">
                      ✓
                    </span>
                  )}

                </span>

                {/* =================================
                    ICON / IMAGE
                ================================= */}

                <span className="fap-visual">

                  {item.image ? (
                    <img
                      src={item.image}
                      alt={itemName}
                      className="fap-image"
                    />
                  ) : item.icon ? (
                    <span className="fap-icon">
                      {item.icon}
                    </span>
                  ) : (
                    <span className="fap-default-icon">
                      ✦
                    </span>
                  )}

                </span>

                {/* =================================
                    NAME
                ================================= */}

                <span className="fap-name">
                  {itemName}
                </span>

                {/* =================================
                    SELECTED INDICATOR
                ================================= */}

                <span
                  className={`fap-selected ${
                    isSelected
                      ? "fap-selected-visible"
                      : ""
                  }`}
                  aria-hidden="true"
                >
                  {isSelected && "✓"}
                </span>

              </label>
            );
          })}

        </div>
      )}

    </section>
  );
};

export default FetchAmenities;