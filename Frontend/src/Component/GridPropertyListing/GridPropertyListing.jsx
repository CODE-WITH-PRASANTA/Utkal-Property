import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API, { BASE_URL } from "../../api/axios";
import "./GridPropertyListing.css";

// React Icons
import {
  BsGrid3X3GapFill,
  BsListUl,
  BsChevronDown,
  BsPlusLg,
  BsChevronLeft,
  BsChevronRight,
  BsBookmarkFill,
  BsPlus,
} from "react-icons/bs";

import { BiBed, BiBath, BiArea } from "react-icons/bi";
import { HiOutlineMapPin } from "react-icons/hi2";

// =====================================================
// ITEMS PER PAGE
// =====================================================
const ITEMS_PER_PAGE = 8;

// =====================================================
// FORMAT TIME AGO
// =====================================================
const formatTimeAgo = (createdAt) => {
  if (!createdAt) {
    return "Recently added";
  }

  const elapsedTime = Date.now() - new Date(createdAt).getTime();
  const elapsedDays = Math.max(0, Math.floor(elapsedTime / 86400000));

  if (elapsedDays < 1) {
    return "Today";
  }

  if (elapsedDays < 30) {
    return `${elapsedDays} ${elapsedDays === 1 ? "day" : "days"} ago`;
  }

  const elapsedMonths = Math.floor(elapsedDays / 30);
  return `${elapsedMonths} ${elapsedMonths === 1 ? "month" : "months"} ago`;
};

// =====================================================
// NORMALIZE PROPERTY
// =====================================================
const normalizeProperty = (property) => {
  let images = [];

  if (Array.isArray(property.propertyImages) && property.propertyImages.length > 0) {
    images = property.propertyImages.map((img) => {
      if (!img) return "";
      if (typeof img === "string") {
        if (img.startsWith("http://") || img.startsWith("https://")) {
          return img;
        }
        return `${BASE_URL}${img}`;
      }
      if (typeof img === "object") {
        const imagePath = img.url || img.path || img.file || img.image || "";
        if (!imagePath) return "";
        if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
          return imagePath;
        }
        return `${BASE_URL}${imagePath}`;
      }
      return "";
    });
    images = images.filter(Boolean);
  }

  if (images.length === 0 && property.primaryImage) {
    images = [
      property.primaryImage.startsWith("http")
        ? property.primaryImage
        : `${BASE_URL}${property.primaryImage}`,
    ];
  }

  if (images.length === 0 && property.image) {
    images = [
      property.image.startsWith("http")
        ? property.image
        : `${BASE_URL}${property.image}`,
    ];
  }

  if (images.length === 0) {
    images = [
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800",
    ];
  }

  const priceValue = property.price ?? property.propertyPrice ?? 0;

  return {
    ...property,
    id: property._id || property.id,
    title: property.name || property.propertyName || "Unnamed Property",
    address: [property.location, property.city, property.state].filter(Boolean).join(", "),
    price: priceValue ? `₹${Number(priceValue).toLocaleString("en-IN")}` : "Price on request",
    rawPrice: Number(priceValue) || 0,
    beds: property.bedrooms || 0,
    baths: property.bathrooms || 0,
    sqft: property.totalArea || property.plotArea || property.plotSize || property.projectSize || 0,
    timeAgo: formatTimeAgo(property.createdAt),
    isFeatured: property.featured ?? property.featuredProperty ?? false,
    isForSale: property.statusType === "For Sale" || property.transactionType === "For Sale",
    agentAvatar: images[0],
    images,
  };
};

// =====================================================
// PROPERTY CARD
// =====================================================
const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handlePrevImage = (event) => {
    event.stopPropagation();
    setCurrentImgIndex((previous) =>
      previous === 0 ? property.images.length - 1 : previous - 1
    );
  };

  const handleNextImage = (event) => {
    event.stopPropagation();
    setCurrentImgIndex((previous) =>
      previous === property.images.length - 1 ? 0 : previous + 1
    );
  };

  const handleOpenProperty = () => {
    const propertyId = property._id || property.id;
    if (!propertyId) return;
    navigate(`/property-details/${propertyId}`);
  };

  return (
    <div
      className="GridPropertyListing-card"
      onClick={handleOpenProperty}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          handleOpenProperty();
        }
      }}
    >
      <div className="GridPropertyListing-image-container">
        <img
          src={property.images[currentImgIndex]}
          alt={property.title}
          className="GridPropertyListing-card-img"
          loading="lazy"
        />

        <div className="GridPropertyListing-badges">
          {property.isFeatured && (
            <span className="GridPropertyListing-badge-featured">Featured</span>
          )}
          {property.isForSale && (
            <span className="GridPropertyListing-badge-sale">For Sale</span>
          )}
        </div>

        <button
          type="button"
          aria-label={isBookmarked ? "Remove bookmark" : "Bookmark property"}
          className={`GridPropertyListing-bookmark-btn ${isBookmarked ? "active" : ""}`}
          onClick={(event) => {
            event.stopPropagation();
            setIsBookmarked(!isBookmarked);
          }}
        >
          <BsBookmarkFill />
        </button>

        <div className="GridPropertyListing-overlay">
          <button
            type="button"
            aria-label="View property preview"
            className="GridPropertyListing-plus-icon-btn"
            onClick={(event) => {
              event.stopPropagation();
              handleOpenProperty();
            }}
          >
            <BsPlusLg />
          </button>

          <div className="GridPropertyListing-slider-arrows">
            <button
              type="button"
              aria-label="Previous property photo"
              className="GridPropertyListing-arrow-btn"
              onClick={handlePrevImage}
            >
              <BsChevronLeft />
            </button>

            <button
              type="button"
              aria-label="Next property photo"
              className="GridPropertyListing-arrow-btn"
              onClick={handleNextImage}
            >
              <BsChevronRight />
            </button>
          </div>
        </div>
      </div>

      <div className="GridPropertyListing-card-content">
        <h3 className="GridPropertyListing-card-title">{property.title}</h3>

        <div className="GridPropertyListing-card-address">
          <HiOutlineMapPin className="GridPropertyListing-location-icon" />
          <span>{property.address}</span>
        </div>

        <div className="GridPropertyListing-card-price">{property.price}</div>

        <div className="GridPropertyListing-card-specs">
          <span className="GridPropertyListing-spec-item">
            <BiBed className="GridPropertyListing-spec-icon" />
            Beds: <strong>{property.beds}</strong>
          </span>

          <span className="GridPropertyListing-spec-item">
            <BiBath className="GridPropertyListing-spec-icon" />
            Baths: <strong>{property.baths}</strong>
          </span>

          <span className="GridPropertyListing-spec-item">
            <BiArea className="GridPropertyListing-spec-icon" />
            Sqft: <strong>{property.sqft}</strong>
          </span>
        </div>

        <div className="GridPropertyListing-card-footer">
          <button
            type="button"
            aria-label={`Compare ${property.title}`}
            className="GridPropertyListing-compare-btn"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <BsPlus className="GridPropertyListing-compare-icon" />
            Compare
          </button>

          <div className="GridPropertyListing-agent-info">
            <img
              src={property.agentAvatar}
              alt="Agent Avatar"
              className="GridPropertyListing-agent-avatar"
              loading="lazy"
            />
            <span className="GridPropertyListing-time-posted">{property.timeAgo}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// =====================================================
// GRID PROPERTY LISTING
// =====================================================
const GridPropertyListing = ({ filters = {} }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");
  const [sortOrder, setSortOrder] = useState("Default order");

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError("");

      const params = {
        page: 1,
        limit: 1000,
        ...filters,
      };

      if (Array.isArray(filters.amenities) && filters.amenities.length > 0) {
        params.amenities = filters.amenities.join(",");
      } else {
        delete params.amenities;
      }

      const response = await API.get("/properties", { params });
      const propertyData =
        response.data?.properties || response.data?.data || response.data || [];

      const normalizedProperties = Array.isArray(propertyData)
        ? propertyData.map(normalizeProperty)
        : [];

      setProperties(normalizedProperties);
    } catch (err) {
      console.error("FETCH PROPERTIES ERROR:", err.response?.data || err);
      setProperties([]);
      setError(err.response?.data?.message || "Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
    setCurrentPage(1);
  }, [filters]);

  const totalPages = Math.ceil(properties.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const sortedProperties = [...properties].sort((firstProperty, secondProperty) => {
    if (sortOrder === "Price: Low to High") {
      return firstProperty.rawPrice - secondProperty.rawPrice;
    }
    if (sortOrder === "Price: High to Low") {
      return secondProperty.rawPrice - firstProperty.rawPrice;
    }
    if (sortOrder === "Newest First") {
      return new Date(secondProperty.createdAt) - new Date(firstProperty.createdAt);
    }
    return 0;
  });

  const currentProperties = sortedProperties.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="GridPropertyListing" aria-label="Available Properties">
      <div className="GridPropertyListing-container">
        <div className="GridPropertyListing-header">
          <div className="GridPropertyListing-header-left">
            <h2 className="GridPropertyListing-main-title">
              <span className="GridPropertyListing-title-green">Property</span>{" "}
              <span className="GridPropertyListing-title-dark">Listing</span>
            </h2>
            <span className="GridPropertyListing-count-text">
              There are currently {properties.length} properties.
            </span>
          </div>

          <div className="GridPropertyListing-header-right">
            <div className="GridPropertyListing-view-toggle">
              <button
                type="button"
                aria-label="Switch to grid view"
                className={`GridPropertyListing-toggle-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                <BsGrid3X3GapFill />
              </button>

              <button
                type="button"
                aria-label="Switch to list view"
                className={`GridPropertyListing-toggle-btn ${viewMode === "list" ? "active" : ""}`}
                onClick={() => setViewMode("list")}
              >
                <BsListUl />
              </button>
            </div>

            <div className="GridPropertyListing-sort-box">
              <select
                aria-label="Sort properties by"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="GridPropertyListing-sort-select"
              >
                <option value="Default order">Default order</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
                <option value="Newest First">Newest First</option>
              </select>
              <BsChevronDown className="GridPropertyListing-sort-icon" />
            </div>
          </div>
        </div>

        {loading && <div className="GridPropertyListing-status">Loading properties...</div>}
        {!loading && error && <div className="GridPropertyListing-status error">{error}</div>}

        {!loading && !error && (
          <div className={`GridPropertyListing-grid ${viewMode}`}>
            {currentProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

        {!loading && !error && totalPages > 1 && (
          <nav className="GridPropertyListing-pagination" aria-label="Properties pagination">
            <button
              type="button"
              aria-label="Previous page"
              className="GridPropertyListing-page-nav"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <BsChevronLeft />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                type="button"
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
                key={page}
                className={`GridPropertyListing-page-btn ${currentPage === page ? "active" : ""}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              aria-label="Next page"
              className="GridPropertyListing-page-nav"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <BsChevronRight />
            </button>
          </nav>
        )}
      </div>
    </section>
  );
};

export default GridPropertyListing;