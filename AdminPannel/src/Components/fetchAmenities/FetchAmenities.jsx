import React, { useEffect, useState } from "react";
import "./FetchAmenities.css";
import API from "../../api/Axios";

const FetchAmenities = ({
  propertyData,
  setPropertyData,
}) => {
  const [amenitiesList, setAmenitiesList] = useState([]);
  const [loading, setLoading] = useState(false);

  // ============================================
  // FETCH AMENITIES
  // ============================================

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        setLoading(true);

        const response = await API.get("/amenities");

        console.log(
          "AMENITIES RESPONSE:",
          response.data
        );

        // Support:
        // { amenities: [...] }
        // { data: [...] }
        // [...]

        const data =
          response.data?.amenities ||
          response.data?.data ||
          response.data ||
          [];

        if (Array.isArray(data)) {
          setAmenitiesList(data);
        } else {
          setAmenitiesList([]);
        }
      } catch (error) {
        console.error(
          "FETCH AMENITIES ERROR:",
          error.response?.data || error
        );

        setAmenitiesList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAmenities();
  }, []);

  // ============================================
  // SELECTED AMENITIES
  // ============================================

  const selectedAmenities =
    Array.isArray(propertyData?.amenities)
      ? propertyData.amenities
      : [];

  // ============================================
  // CHECKBOX CHANGE
  // ============================================

  const handleAmenityChange = (amenityName) => {
    setPropertyData((previous) => {
      const currentAmenities =
        Array.isArray(previous.amenities)
          ? previous.amenities
          : [];

      // Already selected -> remove
      if (currentAmenities.includes(amenityName)) {
        return {
          ...previous,

          amenities: currentAmenities.filter(
            (item) => item !== amenityName
          ),
        };
      }

      // Not selected -> add
      return {
        ...previous,

        amenities: [
          ...currentAmenities,
          amenityName,
        ],
      };
    });
  };

  // ============================================
  // ACTIVE AMENITIES
  // ============================================

  const activeAmenities = amenitiesList.filter(
    (amenity) =>
      !amenity.status ||
      amenity.status === "Active"
  );

  // ============================================
  // UI
  // ============================================

  return (
    <div className="amenities-container">

      <div className="amenities-header">
        <h2 className="amenities-title">
          Amenities
        </h2>
      </div>

      {loading ? (
        <div className="amenities-loading">
          Loading amenities...
        </div>
      ) : activeAmenities.length === 0 ? (
        <div className="amenities-empty">
          No amenities found.
        </div>
      ) : (
        <div className="amenities-grid">

          {activeAmenities.map((amenity) => {
            const amenityName =
              amenity.name ||
              amenity.title ||
              "";

            if (!amenityName) {
              return null;
            }

            const isChecked =
              selectedAmenities.includes(
                amenityName
              );

            return (
              <label
                key={amenity._id || amenityName}
                className={`amenities-item ${
                  isChecked ? "selected" : ""
                }`}
              >

                <input
                  type="checkbox"
                  className="amenities-checkbox"
                  checked={isChecked}
                  onChange={() =>
                    handleAmenityChange(
                      amenityName
                    )
                  }
                />

                <span className="amenities-check-box">
                  {isChecked && "✓"}
                </span>

                {/* ICON / IMAGE */}

                {amenity.icon && (
                  <span className="amenities-icon">
                    {amenity.icon}
                  </span>
                )}

                {amenity.image && (
                  <img
                    src={amenity.image}
                    alt={amenityName}
                    className="amenities-image"
                  />
                )}

                <span className="amenities-name">
                  {amenityName}
                </span>

              </label>
            );
          })}

        </div>
      )}

    </div>
  );
};

export default FetchAmenities;