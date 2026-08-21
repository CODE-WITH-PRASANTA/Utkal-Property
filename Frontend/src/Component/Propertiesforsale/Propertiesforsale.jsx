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
  FaUserCheck,
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

  if (!Number.isFinite(numericPrice)) {
    return "₹ 0";
  }

  if (numericPrice >= 10000000) {
    return `₹ ${(numericPrice / 10000000).toFixed(2)} Cr`;
  } else if (numericPrice >= 100000) {
    return `₹ ${(numericPrice / 100000).toFixed(2)} Lakhs`;
  }

  return `₹ ${numericPrice.toLocaleString("en-IN")}`;
};

// =====================================================
// CREATE ADDRESS
// =====================================================

const getPropertyAddress = (property) => {
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

const getPropertyArea = (property) => {
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

const getTimeAgo = (createdAt) => {
  if (!createdAt) {
    return "Recently added";
  }

  const createdDate = new Date(createdAt);
  const currentDate = new Date();
  const difference = currentDate.getTime() - createdDate.getTime();

  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  if (seconds < 60) return "Just now";
  if (minutes < 60) return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  if (hours < 24) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  if (days < 7) return `${days} ${days === 1 ? "day" : "days"} ago`;
  if (weeks < 5) return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  return `${months} ${months === 1 ? "month" : "months"} ago`;
};

// =====================================================
// GET PROPERTY IMAGES
// =====================================================

const getPropertyImages = (property) => {
  let images = [];

  if (Array.isArray(property.propertyImages)) {
    images = property.propertyImages
      .map((image) => {
        if (typeof image === "string") {
          return getImageUrl(image);
        }
        if (image && typeof image === "object") {
          const imagePath =
            image.url || image.path || image.file || image.image || "";
          return getImageUrl(imagePath);
        }
        return "";
      })
      .filter(Boolean);
  }

  if (images.length === 0 && property.primaryImage) {
    images.push(getImageUrl(property.primaryImage));
  }

  if (images.length === 0 && property.image) {
    images.push(getImageUrl(property.image));
  }

  return [...new Set(images)];
};

// =====================================================
// PROPERTY CARD
// =====================================================

const PropertyCard = ({ property, onOpenModal }) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const images = getPropertyImages(property);

  const handlePrevImage = (e) => {
    e.stopPropagation();
    if (images.length <= 1) return;
    setCurrentImgIndex((previous) =>
      previous === 0 ? images.length - 1 : previous - 1
    );
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    if (images.length <= 1) return;
    setCurrentImgIndex((previous) =>
      previous === images.length - 1 ? 0 : previous + 1
    );
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const currentImage = images[currentImgIndex] || "";

  const isForSale =
    property.statusType === "For Sale" ||
    property.transactionType === "For Sale" ||
    property.forSale !== false;

  return (
    <article className="Propertiesforsale-card">
      {/* IMAGE WRAPPER */}
      <div className="Propertiesforsale-card-img-wrapper">
        {currentImage ? (
          <img
            src={currentImage}
            alt={property.name || "Verified Residential Property for Sale in Bhubaneswar"}
            className="Propertiesforsale-card-img"
            loading="lazy"
          />
        ) : (
          <div className="Propertiesforsale-card-img Propertiesforsale-card-placeholder">
            No Image Available
          </div>
        )}

        {/* BADGES */}
        <div className="Propertiesforsale-badges">
          {property.featured && (
            <span className="Propertiesforsale-badge-featured">Featured</span>
          )}
          {isForSale && (
            <span className="Propertiesforsale-badge-forsale">For Sale</span>
          )}
        </div>

        {/* BOOKMARK */}
        <button
          className="Propertiesforsale-bookmark-tag"
          onClick={toggleBookmark}
          aria-label="Save property to favorites"
        >
          <FaBookmark className={isBookmarked ? "bookmarked" : ""} />
        </button>

        {/* IMAGE HOVER OVERLAY */}
        <div className="Propertiesforsale-hover-overlay">
          <div
            className="Propertiesforsale-crosshair-icon"
            onClick={() => {
              if (currentImage) {
                onOpenModal(currentImage);
              }
            }}
            title="Click to expand view"
            role="button"
            tabIndex={0}
            aria-label="Expand image"
          >
            +
          </div>

          {/* IMAGE NAVIGATION */}
          {images.length > 1 && (
            <div className="Propertiesforsale-nav-arrows">
              <button
                className="Propertiesforsale-arrow-btn"
                onClick={handlePrevImage}
                aria-label="Previous Image"
              >
                <FaArrowLeft />
              </button>
              <button
                className="Propertiesforsale-arrow-btn"
                onClick={handleNextImage}
                aria-label="Next Image"
              >
                <FaArrowRight />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="Propertiesforsale-card-content">
        <h2 className="Propertiesforsale-card-title">
          {property.name || "Premium Property"}
        </h2>

        <p className="Propertiesforsale-address">
          <FaMapMarkerAlt className="Propertiesforsale-address-icon" />
          <span>
            {getPropertyAddress(property) || "Bhubaneswar, Odisha"}
          </span>
        </p>

        <div className="Propertiesforsale-price">
          {formatPrice(property.price)}
        </div>

        {/* SPECS */}
        <div className="Propertiesforsale-specs">
          <span className="Propertiesforsale-spec-item">
            <FaBed /> Beds: <strong>{property.bedrooms ?? 0}</strong>
          </span>
          <span className="Propertiesforsale-spec-item">
            <FaBath /> Baths: <strong>{property.bathrooms ?? 0}</strong>
          </span>
          <span className="Propertiesforsale-spec-item">
            <FaRulerCombined /> Area: <strong>{getPropertyArea(property)} sqft</strong>
          </span>
        </div>

        {/* FOOTER */}
        <div className="Propertiesforsale-card-footer">
          <button className="Propertiesforsale-compare-btn">
            <FaPlus className="Propertiesforsale-plus-icon" /> Compare
          </button>
          <div className="Propertiesforsale-user-info">
            <span className="Propertiesforsale-time">
              {getTimeAgo(property.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

// =====================================================
// MAIN COMPONENT
// =====================================================

const Propertiesforsale = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await API.get("/properties", {
          params: {
            page: 1,
            limit: 3,
            parent: "Residential",
          },
        });

        const propertyData =
          response.data?.properties ||
          response.data?.data ||
          response.data ||
          [];

        if (!Array.isArray(propertyData)) {
          setProperties([]);
          return;
        }

        const forSaleProperties = propertyData.filter((property) => {
          const transaction =
            property.statusType || property.transactionType || "";
          return transaction.toLowerCase() === "for sale" || property.forSale;
        });

        setProperties(forSaleProperties.slice(0, 3));
      } catch (error) {
        console.error(
          "FETCH PROPERTIES FOR SALE ERROR:",
          error.response?.data || error
        );
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleOpenModal = (imgUrl) => {
    setSelectedImage(imgUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="Propertiesforsale" aria-labelledby="consultant-heading">
      <div className="Propertiesforsale-container">
        
        {/* SEO-Optimized Header Section */}
        <header className="Propertiesforsale-header">
          <span className="Propertiesforsale-tag">
            <FaUserCheck className="tag-icon" /> Expert Real Estate Advisory
          </span>
          <h1 id="consultant-heading" className="Propertiesforsale-main-heading">
            Best Property Consultant in Bhubaneswar — <span className="highlight-green">Verified Properties for Sale</span>
          </h1>
          <p className="Propertiesforsale-subheading">
            Get expert guidance from the <strong>best property consultant in Bhubaneswar</strong>. Buy handpicked RERA-approved luxury villas, duplexes, residential land, and premium apartments across Patia, Jaydev Vihar, Pahala, Khandagiri, and Sundarpada with 100% transparent documentation and verified title deeds.
          </p>
        </header>

        {/* PROPERTY GRID */}
        <div className="Propertiesforsale-grid">
          {loading ? (
            <p className="Propertiesforsale-status-msg">Loading properties...</p>
          ) : properties.length === 0 ? (
            <p className="Propertiesforsale-status-msg">No properties for sale found.</p>
          ) : (
            properties.map((property) => (
              <PropertyCard
                key={property._id || property.id}
                property={property}
                onOpenModal={handleOpenModal}
              />
            ))
          )}
        </div>

        {/* SCROLL TOP */}
        <button
          className="Propertiesforsale-scroll-top-btn"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
        >
          <FaChevronUp />
        </button>

        {/* IMAGE LIGHTBOX MODAL */}
        {selectedImage && (
          <div
            className="Propertiesforsale-modal-overlay"
            onClick={handleCloseModal}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="Propertiesforsale-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="Propertiesforsale-modal-close"
                onClick={handleCloseModal}
                aria-label="Close image modal"
              >
                <FaTimes />
              </button>
              <img
                src={selectedImage}
                alt="Enlarged view of property for sale in Bhubaneswar"
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