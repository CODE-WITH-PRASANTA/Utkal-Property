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
  FaTimes,
  FaHandshake,
} from "react-icons/fa";

// =====================================================
// BACKEND URL
// =====================================================

const BACKEND_URL = "http://localhost:5000";

// =====================================================
// IMAGE URL HELPER
// =====================================================

const getImageUrl = (image) => {
  if (!image) {
    return "";
  }

  if (
    image.startsWith("http://") ||
    image.startsWith("https://") ||
    image.startsWith("blob:")
  ) {
    return image;
  }

  if (image.startsWith("/")) {
    return `${BACKEND_URL}${image}`;
  }

  return `${BACKEND_URL}/${image}`;
};

// =====================================================
// GET ALL PROPERTY IMAGES
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
          const path =
            image.url ||
            image.path ||
            image.file ||
            image.image ||
            "";

          return getImageUrl(path);
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
// FORMAT PRICE
// =====================================================

const formatPrice = (price) => {
  const amount = Number(price);

  if (!Number.isFinite(amount)) {
    return "₹ 0 / mo";
  }

  return `₹ ${amount.toLocaleString("en-IN")} / mo`;
};

// =====================================================
// CREATE ADDRESS
// =====================================================

const getPropertyAddress = (property) => {
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

  const created = new Date(createdAt);
  const now = new Date();
  const difference = now.getTime() - created.getTime();

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
// SINGLE PROPERTY CARD
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

  return (
    <article className="Propertiesforrent-card">
      {/* IMAGE CONTAINER */}
      <div className="Propertiesforrent-card-img-wrapper">
        {currentImage ? (
          <img
            src={currentImage}
            alt={property.name || "Verified Rental Flat in Bhubaneswar"}
            className="Propertiesforrent-card-img"
            loading="lazy"
          />
        ) : (
          <div className="Propertiesforrent-card-img Propertiesforrent-card-placeholder">
            No Image Available
          </div>
        )}

        {/* BADGES */}
        <div className="Propertiesforrent-badges">
          {property.featured && (
            <span className="Propertiesforrent-badge-featured">Featured</span>
          )}
          <span className="Propertiesforrent-badge-forrent">For Rent</span>
        </div>

        {/* BOOKMARK */}
        <button
          className="Propertiesforrent-bookmark-tag"
          onClick={toggleBookmark}
          aria-label="Bookmark property"
        >
          <FaBookmark className={isBookmarked ? "bookmarked" : ""} />
        </button>

        {/* HOVER OVERLAY */}
        <div className="Propertiesforrent-hover-overlay">
          <div
            className="Propertiesforrent-crosshair-icon"
            onClick={() => {
              if (currentImage) {
                onOpenModal(currentImage);
              }
            }}
            title="View image full size"
            role="button"
            tabIndex={0}
            aria-label="Expand image view"
          >
            +
          </div>

          {/* IMAGE NAVIGATION */}
          {images.length > 1 && (
            <div className="Propertiesforrent-nav-arrows">
              <button
                className="Propertiesforrent-arrow-btn"
                onClick={handlePrevImage}
                aria-label="Previous Image"
              >
                <FaArrowLeft />
              </button>
              <button
                className="Propertiesforrent-arrow-btn"
                onClick={handleNextImage}
                aria-label="Next Image"
              >
                <FaArrowRight />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CARD CONTENT */}
      <div className="Propertiesforrent-card-content">
        <h2 className="Propertiesforrent-card-title">
          {property.name || "Rental Property"}
        </h2>

        <p className="Propertiesforrent-address">
          <FaMapMarkerAlt className="Propertiesforrent-address-icon" />
          <span>
            {getPropertyAddress(property) || "Bhubaneswar, Odisha"}
          </span>
        </p>

        <div className="Propertiesforrent-price">
          {formatPrice(property.price)}
        </div>

        {/* SPECS */}
        <div className="Propertiesforrent-specs">
          <span className="Propertiesforrent-spec-item">
            <FaBed /> Beds: <strong>{property.bedrooms ?? 0}</strong>
          </span>
          <span className="Propertiesforrent-spec-item">
            <FaBath /> Baths: <strong>{property.bathrooms ?? 0}</strong>
          </span>
          <span className="Propertiesforrent-spec-item">
            <FaRulerCombined /> Area: <strong>{getPropertyArea(property)} sqft</strong>
          </span>
        </div>

        {/* CARD FOOTER */}
        <div className="Propertiesforrent-card-footer">
          <button className="Propertiesforrent-compare-btn">
            <FaPlus className="Propertiesforrent-plus-icon" /> Compare
          </button>
          <div className="Propertiesforrent-user-info">
            <span className="Propertiesforrent-time">
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

const Propertiesforrent = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchRentProperties = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await API.get("/properties", {
          params: {
            parent: "Rent",
            limit: 1000,
            page: 1,
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

        const rentProperties = propertyData.filter((property) => {
          const parent = property.categoryParent || "";
          return parent.trim().toLowerCase() === "rent";
        });

        setProperties(rentProperties);
      } catch (err) {
        console.error(
          "FETCH RENT PROPERTY ERROR:",
          err.response?.data || err
        );
        setProperties([]);
        setError(
          err.response?.data?.message || "Failed to load rental properties."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRentProperties();
  }, []);

  const handleOpenModal = (imgUrl) => {
    setSelectedImage(imgUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <section className="Propertiesforrent" aria-labelledby="rental-brokers-heading">
      <div className="Propertiesforrent-container">
        
        {/* SEO-Optimized Header Section */}
        <header className="Propertiesforrent-header">
          <span className="Propertiesforrent-tag">
            <FaHandshake className="tag-icon" /> Verified Rental Solutions
          </span>
          <h1 id="rental-brokers-heading" className="Propertiesforrent-main-heading">
            Top Real Estate Brokers in Bhubaneswar — <span className="highlight-green">Verified Properties For Rent</span>
          </h1>
          <p className="Propertiesforrent-subheading">
            Connect with the <strong>top real estate brokers in Bhubaneswar</strong> to rent fully furnished apartments, modern luxury villas, corporate commercial office spaces, and budget-friendly builder floors across prime hubs such as Patia, Jaydev Vihar, Saheed Nagar, Khandagiri, and Chandrasekharpur.
          </p>
        </header>

        {/* PROPERTY GRID */}
        <div className="Propertiesforrent-grid">
          {loading && (
            <p className="Propertiesforrent-status-msg">Loading rental properties...</p>
          )}

          {!loading && error && (
            <p className="Propertiesforrent-error-msg">{error}</p>
          )}

          {!loading && !error && properties.length === 0 && (
            <p className="Propertiesforrent-status-msg">No rental properties found.</p>
          )}

          {!loading &&
            !error &&
            properties.map((property) => (
              <PropertyCard
                key={property._id || property.id}
                property={property}
                onOpenModal={handleOpenModal}
              />
            ))}
        </div>

        {/* IMAGE MODAL */}
        {selectedImage && (
          <div
            className="Propertiesforrent-modal-overlay"
            onClick={handleCloseModal}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="Propertiesforrent-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="Propertiesforrent-modal-close"
                onClick={handleCloseModal}
                aria-label="Close modal"
              >
                <FaTimes />
              </button>
              <img
                src={selectedImage}
                alt="Enlarged view of rental property in Bhubaneswar"
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