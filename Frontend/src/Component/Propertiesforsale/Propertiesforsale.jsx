import React, {
  useEffect,
  useState,
} from "react";

import "./Propertiesforsale.css";

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
// IMAGE BASE URL
// =====================================================

// Change only if your backend runs on another port
const BACKEND_URL = "http://localhost:5000";

// =====================================================
// GET FULL IMAGE URL
// =====================================================

const getImageUrl = (image) => {
  if (!image) {
    return "";
  }

  // Already full URL
  if (
    image.startsWith("http://") ||
    image.startsWith("https://") ||
    image.startsWith("blob:")
  ) {
    return image;
  }

  // Backend uploaded image
  if (image.startsWith("/")) {
    return `${BACKEND_URL}${image}`;
  }

  return `${BACKEND_URL}/${image}`;
};

// =====================================================
// FORMAT PRICE
// =====================================================

const formatPrice = (price) => {
  const numericPrice = Number(price);

  if (
    !Number.isFinite(numericPrice)
  ) {
    return "₹ 0";
  }

  return `₹ ${numericPrice.toLocaleString(
    "en-IN"
  )}`;
};

// =====================================================
// CREATE ADDRESS
// =====================================================

const getPropertyAddress = (
  property
) => {
  const addressParts = [
    property.location,
    property.city,
    property.state,
    property.country,
  ].filter(Boolean);

  return addressParts.join(", ");
};

// =====================================================
// PROPERTY AREA
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

  const createdDate =
    new Date(createdAt);

  const currentDate =
    new Date();

  const difference =
    currentDate.getTime() -
    createdDate.getTime();

  const seconds =
    Math.floor(
      difference / 1000
    );

  const minutes =
    Math.floor(
      seconds / 60
    );

  const hours =
    Math.floor(
      minutes / 60
    );

  const days =
    Math.floor(
      hours / 24
    );

  const weeks =
    Math.floor(
      days / 7
    );

  const months =
    Math.floor(
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
// GET PROPERTY IMAGES
// =====================================================

const getPropertyImages = (
  property
) => {
  let images = [];

  // ============================================
  // PROPERTY IMAGES ARRAY
  // ============================================

  if (
    Array.isArray(
      property.propertyImages
    )
  ) {
    images =
      property.propertyImages
        .map((image) => {
          // String
          if (
            typeof image ===
            "string"
          ) {
            return getImageUrl(
              image
            );
          }

          // Object compatibility
          if (
            image &&
            typeof image ===
              "object"
          ) {
            const imagePath =
              image.url ||
              image.path ||
              image.file ||
              image.image ||
              "";

            return getImageUrl(
              imagePath
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
  // REMOVE DUPLICATES
  // ============================================

  return [
    ...new Set(images),
  ];
};

// =====================================================
// PROPERTY CARD
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
  // PROPERTY IMAGES
  // ============================================

  const images =
    getPropertyImages(
      property
    );

  // ============================================
  // PREVIOUS IMAGE
  // ============================================

  const handlePrevImage = (
    e
  ) => {
    e.stopPropagation();

    if (
      images.length <= 1
    ) {
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

  const handleNextImage = (
    e
  ) => {
    e.stopPropagation();

    if (
      images.length <= 1
    ) {
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
    images[
      currentImgIndex
    ] || "";

  // ============================================
  // FOR SALE
  // ============================================

  const isForSale =
    property.statusType ===
      "For Sale" ||
    property.transactionType ===
      "For Sale";

  // ============================================
  // UI
  // ============================================

  return (
    <div className="Propertiesforsale-card">

      {/* ====================================== */}
      {/* IMAGE */}
      {/* ====================================== */}

      <div className="Propertiesforsale-card-img-wrapper">

        {currentImage ? (
          <img
            src={
              currentImage
            }
            alt={
              property.name ||
              "Property"
            }
            className="Propertiesforsale-card-img"
          />
        ) : (
          <div className="Propertiesforsale-card-img">
            No Image
          </div>
        )}

        {/* ==================================== */}
        {/* BADGES */}
        {/* ==================================== */}

        <div className="Propertiesforsale-badges">

          {property.featured && (
            <span className="Propertiesforsale-badge-featured">
              Featured
            </span>
          )}

          {isForSale && (
            <span className="Propertiesforsale-badge-forsale">
              For Sale
            </span>
          )}

        </div>

        {/* ==================================== */}
        {/* BOOKMARK */}
        {/* ==================================== */}

        <div className="Propertiesforsale-bookmark-tag">
          <FaBookmark />
        </div>

        {/* ==================================== */}
        {/* IMAGE HOVER */}
        {/* ==================================== */}

        <div className="Propertiesforsale-hover-overlay">

          <div
            className="Propertiesforsale-crosshair-icon"
            onClick={() => {
              if (
                currentImage
              ) {
                onOpenModal(
                  currentImage
                );
              }
            }}
            title="Click to expand view"
          >
            +
          </div>

          {/* ================================== */}
          {/* IMAGE NAVIGATION */}
          {/* ================================== */}

          {images.length > 1 && (
            <div className="Propertiesforsale-nav-arrows">

              <button
                className="Propertiesforsale-arrow-btn"
                onClick={
                  handlePrevImage
                }
                aria-label="Previous Image"
              >
                <FaArrowLeft />
              </button>

              <button
                className="Propertiesforsale-arrow-btn"
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
      {/* CONTENT */}
      {/* ====================================== */}

      <div className="Propertiesforsale-card-content">

        {/* PROPERTY NAME */}

        <h3 className="Propertiesforsale-card-title">
          {property.name ||
            "Property"}
        </h3>

        {/* ADDRESS */}

        <p className="Propertiesforsale-address">

          <FaMapMarkerAlt className="Propertiesforsale-address-icon" />

          <span>
            {getPropertyAddress(
              property
            ) ||
              "Location not available"}
          </span>

        </p>

        {/* PRICE */}

        <div className="Propertiesforsale-price">
          {formatPrice(
            property.price
          )}
        </div>

        {/* ==================================== */}
        {/* SPECS */}
        {/* ==================================== */}

        <div className="Propertiesforsale-specs">

          <span className="Propertiesforsale-spec-item">

            <FaBed />

            Beds:{" "}

            <strong>
              {property.bedrooms ??
                0}
            </strong>

          </span>

          <span className="Propertiesforsale-spec-item">

            <FaBath />

            Baths:{" "}

            <strong>
              {property.bathrooms ??
                0}
            </strong>

          </span>

          <span className="Propertiesforsale-spec-item">

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
        {/* FOOTER */}
        {/* ==================================== */}

        <div className="Propertiesforsale-card-footer">

          <button className="Propertiesforsale-compare-btn">

            <FaPlus className="Propertiesforsale-plus-icon" />

            Compare

          </button>

          <div className="Propertiesforsale-user-info">

            {/* Keep same existing UI */}

            <span className="Propertiesforsale-time">
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

const Propertiesforsale = () => {
  // ============================================
  // STATES
  // ============================================

  const [
    properties,
    setProperties,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    selectedImage,
    setSelectedImage,
  ] = useState(null);

  // ============================================
  // FETCH PROPERTIES FOR SALE
  // ============================================

  useEffect(() => {
    const fetchProperties =
      async () => {
        try {
          setLoading(true);

          const response =
            await API.get(
              "/properties",
              {
                params: {
                  page: 1,

                  // We only need 3 cards
                  limit: 3,

                  // Parent/category filtering
                  // according to your backend
                  parent:
                    "Residential",
                },
              }
            );

          console.log(
            "PROPERTIES FOR SALE RESPONSE:",
            response.data
          );

          const propertyData =
            response.data
              ?.properties ||
            response.data?.data ||
            response.data ||
            [];

          if (
            !Array.isArray(
              propertyData
            )
          ) {
            setProperties([]);

            return;
          }

          // ====================================
          // FOR SALE FILTER
          // ====================================

          const forSaleProperties =
            propertyData.filter(
              (property) => {
                const transaction =
                  property.statusType ||
                  property.transactionType ||
                  "";

                return (
                  transaction.toLowerCase() ===
                  "for sale"
                );
              }
            );

          console.log(
            "FOR SALE PROPERTIES:",
            forSaleProperties
          );

          setProperties(
            forSaleProperties.slice(
              0,
              3
            )
          );
        } catch (error) {
          console.error(
            "FETCH PROPERTIES FOR SALE ERROR:",
            error.response?.data ||
              error
          );

          setProperties([]);
        } finally {
          setLoading(false);
        }
      };

    fetchProperties();
  }, []);

  // ============================================
  // OPEN MODAL
  // ============================================

  const handleOpenModal = (
    imgUrl
  ) => {
    setSelectedImage(
      imgUrl
    );
  };

  // ============================================
  // CLOSE MODAL
  // ============================================

  const handleCloseModal =
    () => {
      setSelectedImage(
        null
      );
    };

  // ============================================
  // SCROLL TOP
  // ============================================

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ============================================
  // UI
  // ============================================

  return (
    <section className="Propertiesforsale">

      <div className="Propertiesforsale-container">

        {/* ==================================== */}
        {/* HEADER */}
        {/* ==================================== */}

        <div className="Propertiesforsale-header">

          <span className="Propertiesforsale-tag">
            Featured Listings
          </span>

          <h1 className="Propertiesforsale-main-heading">
            Properties For Sale
          </h1>

          <p className="Propertiesforsale-subheading">
            Explore premium verified
            listings across prime
            locations by Utkal Property
          </p>

        </div>

        {/* ==================================== */}
        {/* PROPERTY GRID */}
        {/* ==================================== */}

        <div className="Propertiesforsale-grid">

          {loading ? (
            <p>
              Loading properties...
            </p>
          ) : properties.length ===
            0 ? (
            <p>
              No properties for sale
              found.
            </p>
          ) : (
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
            )
          )}

        </div>

        {/* ==================================== */}
        {/* SCROLL TOP */}
        {/* ==================================== */}

        <button
          className="Propertiesforsale-scroll-top-btn"
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
            className="Propertiesforsale-modal-overlay"
            onClick={
              handleCloseModal
            }
          >

            <div
              className="Propertiesforsale-modal-content"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <button
                className="Propertiesforsale-modal-close"
                onClick={
                  handleCloseModal
                }
                aria-label="Close image modal"
              >
                <FaTimes />
              </button>

              <img
                src={
                  selectedImage
                }
                alt="Enlarged property"
                className="Propertiesforsale-modal-img"
              />

            </div>

          </div>
        )}

      </div>

    </section>
  );
};

export default Propertiesforsale;