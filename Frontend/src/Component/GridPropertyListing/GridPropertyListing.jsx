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

// 24 Unique Property Listings with Distinct Image Sets
// const PROPERTY_DATABASE = [
//   {
//     id: 1,
//     title: "Modern White Villa",
//     address: "58 Hullbrook Road, Billesley, B13 0LA",
//     price: "$7,500",
//     beds: 4,
//     baths: 2,
//     sqft: 1150,
//     timeAgo: "3 years ago",
//     isFeatured: true,
//     isForSale: true,
//     agentAvatar:
//       "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
//     images: [
//       "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800",
//       "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800",
//       "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
//     ],
//   },
//   {
//     id: 2,
//     title: "Suburban Stone House",
//     address: "24 Green Avenue, Oxford, OX1 2JD",
//     price: "$8,200",
//     beds: 5,
//     baths: 3,
//     sqft: 1420,
//     timeAgo: "2 years ago",
//     isFeatured: true,
//     isForSale: true,
//     agentAvatar:
//       "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
//     images: [
//       "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
//       "https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=800",
//       "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800",
//     ],
//   },
//   {
//     id: 3,
//     title: "Minimalist Cubical Home",
//     address: "102 Sunset Boulevard, Bristol, BS1 5TY",
//     price: "$6,800",
//     beds: 3,
//     baths: 2,
//     sqft: 980,
//     timeAgo: "1 year ago",
//     isFeatured: true,
//     isForSale: true,
//     agentAvatar:
//       "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
//     images: [
//       "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
//       "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800",
//       "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800",
//     ],
//   },
//   {
//     id: 4,
//     title: "Tropical Coastal Estate",
//     address: "15 Ocean View Road, Brighton, BN1 3PA",
//     price: "$9,400",
//     beds: 4,
//     baths: 3,
//     sqft: 1600,
//     timeAgo: "5 months ago",
//     isFeatured: true,
//     isForSale: true,
//     agentAvatar:
//       "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
//     images: [
//       "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800",
//       "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800",
//       "https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg?auto=compress&cs=tinysrgb&w=800",
//     ],
//   },
//   {
//     id: 5,
//     title: "Luxury Villa with Pool",
//     address: "88 Palm Street, Miami, FL 33101",
//     price: "$12,500",
//     beds: 6,
//     baths: 4,
//     sqft: 2200,
//     timeAgo: "3 weeks ago",
//     isFeatured: true,
//     isForSale: true,
//     agentAvatar:
//       "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150",
//     images: [
//       "https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg?auto=compress&cs=tinysrgb&w=800",
//       "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800",
//       "https://images.pexels.com/photos/2459/stairs-design-interior-renovation.jpg?auto=compress&cs=tinysrgb&w=800",
//     ],
//   },
//   {
//     id: 6,
//     title: "Contemporary Glass House",
//     address: "42 Pine Drive, Seattle, WA 98101",
//     price: "$8,900",
//     beds: 4,
//     baths: 3,
//     sqft: 1350,
//     timeAgo: "2 months ago",
//     isFeatured: true,
//     isForSale: true,
//     agentAvatar:
//       "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150",
//     images: [
//       "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
//       "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800",
//       "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800",
//     ],
//   },
//   {
//     id: 7,
//     title: "Elegance Resort Residence",
//     address: "77 Lakeview Way, Austin, TX 78701",
//     price: "$11,000",
//     beds: 5,
//     baths: 4,
//     sqft: 1850,
//     timeAgo: "4 months ago",
//     isFeatured: true,
//     isForSale: true,
//     agentAvatar:
//       "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150",
//     images: [
//       "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800",
//       "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800",
//       "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
//     ],
//   },
//   {
//     id: 8,
//     title: "Urban Penthouse Living",
//     address: "304 High Street, London, EC1A 1BB",
//     price: "$9,800",
//     beds: 3,
//     baths: 2,
//     sqft: 1200,
//     timeAgo: "1 week ago",
//     isFeatured: true,
//     isForSale: true,
//     agentAvatar:
//       "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150",
//     images: [
//       "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800",
//       "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800",
//       "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
//     ],
//   },
//   ...Array.from({ length: 16 }).map((_, index) => ({
//     id: index + 9,
//     title: `Exclusive Residence #${index + 9}`,
//     address: `${10 + index} Grand Avenue, City Center, UK`,
//     price: `$${6500 + index * 300}`,
//     beds: (index % 3) + 2,
//     baths: (index % 2) + 1,
//     sqft: 900 + index * 50,
//     timeAgo: `${index + 1} months ago`,
//     isFeatured: true,
//     isForSale: true,
//     agentAvatar: `https://i.pravatar.cc/150?img=${(index % 12) + 1}`,
//     images: [
//       `https://images.pexels.com/photos/${106399 + (index % 5)}/pexels-photo-${106399 + (index % 5)}.jpeg?auto=compress&cs=tinysrgb&w=800`,
//       "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
//       "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
//     ],
//   })),
// ];

const ITEMS_PER_PAGE = 8;

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

const normalizeProperty = (property) => {
  const image = property.image
    ? `${BASE_URL}${property.image}`
    : "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800";

  return {
    ...property,
    id: property._id,
    title: property.name,
    address: [property.location, property.city, property.state]
      .filter(Boolean)
      .join(", "),
    price: property.price
      ? `$${Number(property.price).toLocaleString()}`
      : "Price on request",
    beds: property.bedrooms || 0,
    baths: property.bathrooms || 0,
    sqft: property.totalArea || property.plotSize || 0,
    timeAgo: formatTimeAgo(property.createdAt),
    isFeatured: property.featured,
    isForSale: property.statusType === "For Sale",
    agentAvatar: image,
    images: [image],
  };
};

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1,
    );
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <div
      className="GridPropertyListing-card"
      onClick={() => navigate("/property-details", { state: { property } })}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          navigate("/property-details", { state: { property } });
        }
      }}
    >
      {/* Image Container */}
      <div className="GridPropertyListing-image-container">
        <img
          src={property.images[currentImgIndex]}
          alt={property.title}
          className="GridPropertyListing-card-img"
        />

        {/* Badges */}
        <div className="GridPropertyListing-badges">
          {property.isFeatured && (
            <span className="GridPropertyListing-badge-featured">Featured</span>
          )}
          {property.isForSale && (
            <span className="GridPropertyListing-badge-sale">For Sale</span>
          )}
        </div>

        {/* Bookmark Button */}
        <button
          className={`GridPropertyListing-bookmark-btn ${
            isBookmarked ? "active" : ""
          }`}
          onClick={(event) => {
            event.stopPropagation();
            setIsBookmarked(!isBookmarked);
          }}
        >
          <BsBookmarkFill />
        </button>

        {/* Hover Controls */}
        <div className="GridPropertyListing-overlay">
          <button
            className="GridPropertyListing-plus-icon-btn"
            onClick={(event) => event.stopPropagation()}
          >
            <BsPlusLg />
          </button>

          <div className="GridPropertyListing-slider-arrows">
            <button
              className="GridPropertyListing-arrow-btn"
              onClick={handlePrevImage}
            >
              <BsChevronLeft />
            </button>
            <button
              className="GridPropertyListing-arrow-btn"
              onClick={handleNextImage}
            >
              <BsChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Property Details */}
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
            className="GridPropertyListing-compare-btn"
            onClick={(event) => event.stopPropagation()}
          >
            <BsPlus className="GridPropertyListing-compare-icon" />
            Compare
          </button>

          <div className="GridPropertyListing-agent-info">
            <img
              src={property.agentAvatar}
              alt="Agent Avatar"
              className="GridPropertyListing-agent-avatar"
            />
            <span className="GridPropertyListing-time-posted">
              {property.timeAgo}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

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

      const response = await API.get("/properties", {
        params: {
          page: 1,
          limit: 1000,
          ...filters,
          amenities: filters.amenities?.join(","),
        },
      });

      console.log("PROPERTY RESPONSE:", response.data);

      const propertyData =
        response.data?.properties || response.data?.data || response.data || [];

      console.log("PROPERTY ARRAY:", propertyData);

      setProperties(
        Array.isArray(propertyData)
          ? propertyData.map(normalizeProperty)
          : [],
      );
    } catch (error) {
      console.error("FETCH PROPERTIES ERROR:", error.response?.data || error);

      setProperties([]);

      setError(error.response?.data?.message || "Failed to load properties");
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
      return Number(firstProperty.price.replace(/[$,]/g, "")) -
        Number(secondProperty.price.replace(/[$,]/g, ""));
    }

    if (sortOrder === "Price: High to Low") {
      return Number(secondProperty.price.replace(/[$,]/g, "")) -
        Number(firstProperty.price.replace(/[$,]/g, ""));
    }

    if (sortOrder === "Newest First") {
      return new Date(secondProperty.createdAt) - new Date(firstProperty.createdAt);
    }

    return 0;
  });

  const currentProperties = sortedProperties.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="GridPropertyListing">
      <div className="GridPropertyListing-container">
        {/* Top Header Controls */}
        <div className="GridPropertyListing-header">
          <div className="GridPropertyListing-header-left">
            {/* Title styled matching reference image: "Property" (Green) + "Listing" (Dark Navy/Black) */}
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
                className={`GridPropertyListing-toggle-btn ${
                  viewMode === "grid" ? "active" : ""
                }`}
                onClick={() => setViewMode("grid")}
              >
                <BsGrid3X3GapFill />
              </button>
              <button
                className={`GridPropertyListing-toggle-btn ${
                  viewMode === "list" ? "active" : ""
                }`}
                onClick={() => setViewMode("list")}
              >
                <BsListUl />
              </button>
            </div>

            <div className="GridPropertyListing-sort-box">
              <select
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

        {/* Grid Layout */}
        <div className={`GridPropertyListing-grid ${viewMode}`}>
          {currentProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Pagination Bar */}
        <div className="GridPropertyListing-pagination">
          <button
            className="GridPropertyListing-page-nav"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <BsChevronLeft />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`GridPropertyListing-page-btn ${
                currentPage === page ? "active" : ""
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="GridPropertyListing-page-nav"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <BsChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default GridPropertyListing;
