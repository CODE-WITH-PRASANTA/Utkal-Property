import React, {
  useEffect,
  useState,
} from "react";

import "./Propertiesforrent.css";

import API from "../../api/axios";

// React Icons
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaBookmark,
  FaPlus,
  FaArrowLeft,
  FaArrowRight,
  FaMapMarkerAlt,
  FaChevronUp,
  FaTimes,
} from "react-icons/fa";

// =====================================================
// BACKEND URL
// =====================================================

const BACKEND_URL =
  "http://localhost:5000";

// =====================================================
// IMAGE URL HELPER
// =====================================================

const getImageUrl = (image) => {
  if (!image) {
    return "";
  }

  // Already complete URL
  if (
    image.startsWith("http://") ||
    image.startsWith("https://") ||
    image.startsWith("blob:")
  ) {
    return image;
  }

  // Example:
  // /uploads/property/image.webp
  if (image.startsWith("/")) {
    return `${BACKEND_URL}${image}`;
  }

  return `${BACKEND_URL}/${image}`;
};

// =====================================================
// GET ALL PROPERTY IMAGES
// =====================================================

const getPropertyImages = (
  property
) => {
  let images = [];

  // ============================================
  // propertyImages[]
  // ============================================

  if (
    Array.isArray(
      property.propertyImages
    )
  ) {
    images =
      property.propertyImages
        .map((image) => {
          // Image stored as string
          if (
            typeof image ===
            "string"
          ) {
            return getImageUrl(
              image
            );
          }

          // Image stored as object
          if (
            image &&
            typeof image ===
              "object"
          ) {
            const path =
              image.url ||
              image.path ||
              image.file ||
              image.image ||
              "";

            return getImageUrl(
              path
            );
          }

          return "";
        })
        .filter(Boolean);
  }

  // ============================================
  // PRIMARY IMAGE FALLBACK
  // ============================================

  if (
    images.length === 0 &&
    property.primaryImage
  ) {
    images.push(
      getImageUrl(
        property.primaryImage
      )
    );
  }

  // ============================================
  // OLD IMAGE FIELD FALLBACK
  // ============================================

  if (
    images.length === 0 &&
    property.image
  ) {
    images.push(
      getImageUrl(
        property.image
      )
    );
  }

  // ============================================
  // REMOVE DUPLICATE IMAGES
  // ============================================

  return [...new Set(images)];
};

// =====================================================
// FORMAT PRICE
// =====================================================

const formatPrice = (price) => {
  const amount = Number(price);

  if (!Number.isFinite(amount)) {
    return "₹ 0 / mo";
  }

  return `₹ ${amount.toLocaleString(
    "en-IN"
  )} / mo`;
};

// =====================================================
// CREATE ADDRESS
// =====================================================

const getPropertyAddress = (
  property
) => {
  const parts = [
    property.location,
    property.city,
    property.state,
    property.country,
  ].filter(Boolean);

  return parts.join(", ");
};

// =====================================================
// GET PROPERTY AREA
// =====================================================

const getPropertyArea = (
  property
) => {
  return (
    property.plotArea ||
    property.plotSize ||
    property.totalArea ||
    property.projectArea ||
    "0"
  );
};

// =====================================================
// TIME AGO
// =====================================================

const getTimeAgo = (
  createdAt
) => {
  if (!createdAt) {
    return "";
  }

  const created =
    new Date(createdAt);

  const now = new Date();

  const difference =
    now.getTime() -
    created.getTime();

  const seconds = Math.floor(
    difference / 1000
  );

  const minutes = Math.floor(
    seconds / 60
  );

  const hours = Math.floor(
    minutes / 60
  );

  const days = Math.floor(
    hours / 24
  );

  const weeks = Math.floor(
    days / 7
  );

  const months = Math.floor(
    days / 30
  );

  if (seconds < 60) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes} ${
      minutes === 1
        ? "minute"
        : "minutes"
    } ago`;
  }

  if (hours < 24) {
    return `${hours} ${
      hours === 1
        ? "hour"
        : "hours"
    } ago`;
  }

  if (days < 7) {
    return `${days} ${
      days === 1
        ? "day"
        : "days"
    } ago`;
  }

  if (weeks < 5) {
    return `${weeks} ${
      weeks === 1
        ? "week"
        : "weeks"
    } ago`;
  }

  return `${months} ${
    months === 1
      ? "month"
      : "months"
  } ago`;
};

// =====================================================
// SINGLE PROPERTY CARD
// =====================================================

const PropertyCard = ({
  property,
  onOpenModal,
}) => {
  const [
    currentImgIndex,
    setCurrentImgIndex,
  ] = useState(0);

  // ============================================
  // GET PROPERTY IMAGES
  // ============================================

  const images =
    getPropertyImages(property);

  // ============================================
  // PREVIOUS IMAGE
  // ============================================

  const handlePrevImage = (e) => {
    e.stopPropagation();

    if (images.length <= 1) {
      return;
    }

    setCurrentImgIndex(
      (previous) =>
        previous === 0
          ? images.length - 1
          : previous - 1
    );
  };

  // ============================================
  // NEXT IMAGE
  // ============================================

  const handleNextImage = (e) => {
    e.stopPropagation();

    if (images.length <= 1) {
      return;
    }

    setCurrentImgIndex(
      (previous) =>
        previous ===
        images.length - 1
          ? 0
          : previous + 1
    );
  };

  // ============================================
  // CURRENT IMAGE
  // ============================================

  const currentImage =
    images[currentImgIndex] || "";

  // ============================================
  // UI
  // ============================================

  return (
    <div className="Propertiesforrent-card">

      {/* ====================================== */}
      {/* IMAGE CONTAINER */}
      {/* ====================================== */}

      <div className="Propertiesforrent-card-img-wrapper">

        {currentImage ? (
          <img
            src={currentImage}
            alt={
              property.name ||
              "Property"
            }
            className="Propertiesforrent-card-img"
          />
        ) : (
          <div className="Propertiesforrent-card-img">
            No Image
          </div>
        )}

        {/* ==================================== */}
        {/* BADGES */}
        {/* ==================================== */}

        <div className="Propertiesforrent-badges">

          {property.featured && (
            <span className="Propertiesforrent-badge-featured">
              Featured
            </span>
          )}

          <span className="Propertiesforrent-badge-forrent">
            For Rent
          </span>

        </div>

        {/* ==================================== */}
        {/* BOOKMARK */}
        {/* ==================================== */}

        <div className="Propertiesforrent-bookmark-tag">
          <FaBookmark />
        </div>

        {/* ==================================== */}
        {/* HOVER OVERLAY */}
        {/* ==================================== */}

        <div className="Propertiesforrent-hover-overlay">

          <div
            className="Propertiesforrent-crosshair-icon"
            onClick={() => {
              if (currentImage) {
                onOpenModal(
                  currentImage
                );
              }
            }}
            title="View image full size"
          >
            +
          </div>

          {/* ================================== */}
          {/* IMAGE NAVIGATION */}
          {/* ================================== */}

          {images.length > 1 && (
            <div className="Propertiesforrent-nav-arrows">

              <button
                className="Propertiesforrent-arrow-btn"
                onClick={
                  handlePrevImage
                }
                aria-label="Previous Image"
              >
                <FaArrowLeft />
              </button>

              <button
                className="Propertiesforrent-arrow-btn"
                onClick={
                  handleNextImage
                }
                aria-label="Next Image"
              >
                <FaArrowRight />
              </button>

            </div>
          )}

        </div>

      </div>

      {/* ====================================== */}
      {/* CARD CONTENT */}
      {/* ====================================== */}

      <div className="Propertiesforrent-card-content">

        {/* ==================================== */}
        {/* PROPERTY NAME */}
        {/* ==================================== */}

        <h3 className="Propertiesforrent-card-title">
          {property.name ||
            "Property"}
        </h3>

        {/* ==================================== */}
        {/* ADDRESS */}
        {/* ==================================== */}

        <p className="Propertiesforrent-address">

          <FaMapMarkerAlt className="Propertiesforrent-address-icon" />

          <span>
            {getPropertyAddress(
              property
            ) ||
              "Location not available"}
          </span>

        </p>

        {/* ==================================== */}
        {/* PRICE */}
        {/* ==================================== */}

        <div className="Propertiesforrent-price">
          {formatPrice(
            property.price
          )}
        </div>

        {/* ==================================== */}
        {/* SPECS */}
        {/* ==================================== */}

        <div className="Propertiesforrent-specs">

          {/* BEDROOMS */}

          <span className="Propertiesforrent-spec-item">

            <FaBed />

            Beds:{" "}

            <strong>
              {property.bedrooms ??
                0}
            </strong>

          </span>

          {/* BATHROOMS */}

          <span className="Propertiesforrent-spec-item">

            <FaBath />

            Baths:{" "}

            <strong>
              {property.bathrooms ??
                0}
            </strong>

          </span>

          {/* AREA */}

          <span className="Propertiesforrent-spec-item">

            <FaRulerCombined />

            Sqft:{" "}

            <strong>
              {getPropertyArea(
                property
              )}
            </strong>

          </span>

        </div>

        {/* ==================================== */}
        {/* CARD FOOTER */}
        {/* ==================================== */}

        <div className="Propertiesforrent-card-footer">

          <button className="Propertiesforrent-compare-btn">

            <FaPlus className="Propertiesforrent-plus-icon" />

            Compare

          </button>

          <div className="Propertiesforrent-user-info">

            <span className="Propertiesforrent-time">
              {getTimeAgo(
                property.createdAt
              )}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
};

// =====================================================
// MAIN COMPONENT
// =====================================================

const Propertiesforrent = () => {
  // ============================================
  // PROPERTIES
  // ============================================

  const [
    properties,
    setProperties,
  ] = useState([]);

  // ============================================
  // LOADING
  // ============================================

  const [
    loading,
    setLoading,
  ] = useState(false);

  // ============================================
  // ERROR
  // ============================================

  const [
    error,
    setError,
  ] = useState("");

  // ============================================
  // MODAL IMAGE
  // ============================================

  const [
    selectedImage,
    setSelectedImage,
  ] = useState(null);

  // =================================================
  // FETCH ALL RENT PROPERTIES
  // =================================================

  useEffect(() => {
    const fetchRentProperties =
      async () => {
        try {
          setLoading(true);

          setError("");

          console.log(
            "================================"
          );

          console.log(
            "FETCHING RENT PROPERTIES"
          );

          console.log(
            "================================"
          );

          // =========================================
          // IMPORTANT
          //
          // parent=Rent
          //
          // This means:
          //
          // Rent
          //   Apartment
          //   House
          //   Villa
          //
          // All will be returned.
          // =========================================

          const response =
            await API.get(
              "/properties",
              {
                params: {
                  parent: "Rent",

                  // Large limit because you said
                  // show ALL rent properties.
                  limit: 1000,

                  page: 1,
                },
              }
            );

          console.log(
            "RENT PROPERTY RESPONSE:",
            response.data
          );

          // =========================================
          // GET ARRAY
          // =========================================

          const propertyData =
            response.data
              ?.properties ||
            response.data?.data ||
            response.data ||
            [];

          console.log(
            "RENT PROPERTY ARRAY:",
            propertyData
          );

          if (
            !Array.isArray(
              propertyData
            )
          ) {
            setProperties([]);

            return;
          }

          // =========================================
          // EXTRA FRONTEND SAFETY FILTER
          //
          // Backend should already filter parent=Rent.
          //
          // This protects against an older backend
          // controller that ignores parent.
          // =========================================

          const rentProperties =
            propertyData.filter(
              (property) => {
                const parent =
                  property.categoryParent ||
                  "";

                return (
                  parent
                    .trim()
                    .toLowerCase() ===
                  "rent"
                );
              }
            );

          console.log(
            "FINAL RENT PROPERTIES:",
            rentProperties
          );

          // =========================================
          // SHOW ALL
          // =========================================

          setProperties(
            rentProperties
          );
        } catch (error) {
          console.error(
            "================================"
          );

          console.error(
            "FETCH RENT PROPERTY ERROR"
          );

          console.error(
            error.response?.data ||
              error
          );

          console.error(
            "================================"
          );

          setProperties([]);

          setError(
            error.response?.data
              ?.message ||
              "Failed to load rental properties."
          );
        } finally {
          setLoading(false);
        }
      };

    fetchRentProperties();
  }, []);

  // =================================================
  // OPEN IMAGE
  // =================================================

  const handleOpenModal = (
    imgUrl
  ) => {
    setSelectedImage(
      imgUrl
    );
  };

  // =================================================
  // CLOSE IMAGE
  // =================================================

  const handleCloseModal =
    () => {
      setSelectedImage(
        null
      );
    };

  // =================================================
  // SCROLL TOP
  // =================================================

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =================================================
  // UI
  // =================================================

  return (
    <section className="Propertiesforrent">

      <div className="Propertiesforrent-container">

        {/* ==================================== */}
        {/* HEADER */}
        {/* ==================================== */}

        <div className="Propertiesforrent-header">

          <span className="Propertiesforrent-tag">
            Rental Spaces
          </span>

          <h1 className="Propertiesforrent-main-heading">
            Properties For Rent
          </h1>

          <p className="Propertiesforrent-subheading">
            Find premium residential
            and commercial rental
            options curated by Utkal
            Property
          </p>

        </div>

        {/* ==================================== */}
        {/* PROPERTY GRID */}
        {/* ==================================== */}

        <div className="Propertiesforrent-grid">

          {/* LOADING */}

          {loading && (
            <p>
              Loading rental
              properties...
            </p>
          )}

          {/* ERROR */}

          {!loading &&
            error && (
              <p>
                {error}
              </p>
            )}

          {/* NO PROPERTY */}

          {!loading &&
            !error &&
            properties.length ===
              0 && (
              <p>
                No rental properties
                found.
              </p>
            )}

          {/* ================================== */}
          {/* SHOW ALL RENT PROPERTIES */}
          {/* ================================== */}

          {!loading &&
            !error &&
            properties.map(
              (property) => (
                <PropertyCard
                  key={
                    property._id
                  }
                  property={
                    property
                  }
                  onOpenModal={
                    handleOpenModal
                  }
                />
              )
            )}

        </div>

        {/* ==================================== */}
        {/* SCROLL TO TOP */}
        {/* ==================================== */}

        <button
          className="Propertiesforrent-scroll-top-btn"
          onClick={
            scrollToTop
          }
          aria-label="Scroll to top"
        >
          <FaChevronUp />
        </button>

        {/* ==================================== */}
        {/* IMAGE MODAL */}
        {/* ==================================== */}

        {selectedImage && (
          <div
            className="Propertiesforrent-modal-overlay"
            onClick={
              handleCloseModal
            }
          >

            <div
              className="Propertiesforrent-modal-content"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <button
                className="Propertiesforrent-modal-close"
                onClick={
                  handleCloseModal
                }
                aria-label="Close modal"
              >
                <FaTimes />
              </button>

              <img
                src={
                  selectedImage
                }
                alt="Enlarged property"
                className="Propertiesforrent-modal-img"
              />

            </div>

          </div>
        )}

      </div>

    </section>
  );
};

export default Propertiesforrent;