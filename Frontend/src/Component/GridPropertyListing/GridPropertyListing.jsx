import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import API, {
  BASE_URL,
} from "../../api/axios";

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

import {
  BiBed,
  BiBath,
  BiArea,
} from "react-icons/bi";

import {
  HiOutlineMapPin,
} from "react-icons/hi2";

// =====================================================
// ITEMS PER PAGE
// =====================================================

const ITEMS_PER_PAGE = 8;

// =====================================================
// FORMAT TIME AGO
// =====================================================

const formatTimeAgo = (
  createdAt
) => {
  if (!createdAt) {
    return "Recently added";
  }

  const elapsedTime =
    Date.now() -
    new Date(
      createdAt
    ).getTime();

  const elapsedDays =
    Math.max(
      0,
      Math.floor(
        elapsedTime / 86400000
      )
    );

  if (elapsedDays < 1) {
    return "Today";
  }

  if (elapsedDays < 30) {
    return `${elapsedDays} ${
      elapsedDays === 1
        ? "day"
        : "days"
    } ago`;
  }

  const elapsedMonths =
    Math.floor(
      elapsedDays / 30
    );

  return `${elapsedMonths} ${
    elapsedMonths === 1
      ? "month"
      : "months"
  } ago`;
};

// =====================================================
// NORMALIZE PROPERTY
// =====================================================

const normalizeProperty = (
  property
) => {
  // ============================================
  // PROPERTY IMAGES
  // ============================================

  let images = [];

  if (
    Array.isArray(
      property.propertyImages
    ) &&
    property.propertyImages.length >
      0
  ) {
    images =
      property.propertyImages.map(
        (img) => {
          if (!img) {
            return "";
          }

          // ====================================
          // STRING IMAGE
          // ====================================

          if (
            typeof img ===
            "string"
          ) {
            if (
              img.startsWith(
                "http://"
              ) ||
              img.startsWith(
                "https://"
              )
            ) {
              return img;
            }

            return `${BASE_URL}${img}`;
          }

          // ====================================
          // OBJECT IMAGE
          // ====================================

          if (
            typeof img ===
            "object"
          ) {
            const imagePath =
              img.url ||
              img.path ||
              img.file ||
              img.image ||
              "";

            if (!imagePath) {
              return "";
            }

            if (
              imagePath.startsWith(
                "http://"
              ) ||
              imagePath.startsWith(
                "https://"
              )
            ) {
              return imagePath;
            }

            return `${BASE_URL}${imagePath}`;
          }

          return "";
        }
      );

    images =
      images.filter(Boolean);
  }

  // ============================================
  // FALLBACK PRIMARY IMAGE
  // ============================================

  if (
    images.length === 0 &&
    property.primaryImage
  ) {
    images = [
      property.primaryImage.startsWith(
        "http"
      )
        ? property.primaryImage
        : `${BASE_URL}${property.primaryImage}`,
    ];
  }

  // ============================================
  // FALLBACK IMAGE
  // ============================================

  if (
    images.length === 0 &&
    property.image
  ) {
    images = [
      property.image.startsWith(
        "http"
      )
        ? property.image
        : `${BASE_URL}${property.image}`,
    ];
  }

  // ============================================
  // FINAL FALLBACK
  // ============================================

  if (images.length === 0) {
    images = [
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800",
    ];
  }

  // ============================================
  // PRICE
  // ============================================

  const priceValue =
    property.price ??
    property.propertyPrice ??
    0;

  // ============================================
  // RETURN NORMALIZED PROPERTY
  // ============================================

  return {
    ...property,

    // IMPORTANT:
    // MongoDB _id converted to id
    id:
      property._id ||
      property.id,

    title:
      property.name ||
      property.propertyName ||
      "Unnamed Property",

    address: [
      property.location,
      property.city,
      property.state,
    ]
      .filter(Boolean)
      .join(", "),

    price: priceValue
      ? `₹${Number(
          priceValue
        ).toLocaleString(
          "en-IN"
        )}`
      : "Price on request",

    rawPrice:
      Number(priceValue) || 0,

    beds:
      property.bedrooms || 0,

    baths:
      property.bathrooms || 0,

    sqft:
      property.totalArea ||
      property.plotArea ||
      property.plotSize ||
      property.projectSize ||
      0,

    timeAgo:
      formatTimeAgo(
        property.createdAt
      ),

    isFeatured:
      property.featured ??
      property.featuredProperty ??
      false,

    isForSale:
      property.statusType ===
        "For Sale" ||
      property.transactionType ===
        "For Sale",

    agentAvatar: images[0],

    images,
  };
};

// =====================================================
// PROPERTY CARD
// =====================================================

const PropertyCard = ({
  property,
}) => {
  const navigate =
    useNavigate();

  const [
    currentImgIndex,
    setCurrentImgIndex,
  ] = useState(0);

  const [
    isBookmarked,
    setIsBookmarked,
  ] = useState(false);

  // ===================================================
  // PREVIOUS IMAGE
  // ===================================================

  const handlePrevImage = (
    event
  ) => {
    event.stopPropagation();

    setCurrentImgIndex(
      (previous) =>
        previous === 0
          ? property.images
              .length - 1
          : previous - 1
    );
  };

  // ===================================================
  // NEXT IMAGE
  // ===================================================

  const handleNextImage = (
    event
  ) => {
    event.stopPropagation();

    setCurrentImgIndex(
      (previous) =>
        previous ===
        property.images.length -
          1
          ? 0
          : previous + 1
    );
  };

  // ===================================================
  // OPEN PROPERTY DETAILS BY ID
  // ===================================================

  const handleOpenProperty =
    () => {
      const propertyId =
        property._id ||
        property.id;

      if (!propertyId) {
        console.error(
          "PROPERTY ID NOT FOUND:",
          property
        );

        return;
      }

      console.log(
        "================================"
      );

      console.log(
        "OPEN PROPERTY DETAILS"
      );

      console.log(
        "PROPERTY ID:",
        propertyId
      );

      console.log(
        "PROPERTY:",
        property
      );

      console.log(
        "================================"
      );

      navigate(
        `/property-details/${propertyId}`
      );
    };

  // ===================================================
  // UI
  // ===================================================

  return (
    <div
      className="GridPropertyListing-card"
      onClick={
        handleOpenProperty
      }
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (
          event.key ===
            "Enter" ||
          event.key === " "
        ) {
          handleOpenProperty();
        }
      }}
    >
      {/* ==================================== */}
      {/* IMAGE CONTAINER */}
      {/* ==================================== */}

      <div className="GridPropertyListing-image-container">
        <img
          src={
            property.images[
              currentImgIndex
            ]
          }
          alt={property.title}
          className="GridPropertyListing-card-img"
        />

        {/* ================================== */}
        {/* BADGES */}
        {/* ================================== */}

        <div className="GridPropertyListing-badges">
          {property.isFeatured && (
            <span className="GridPropertyListing-badge-featured">
              Featured
            </span>
          )}

          {property.isForSale && (
            <span className="GridPropertyListing-badge-sale">
              For Sale
            </span>
          )}
        </div>

        {/* ================================== */}
        {/* BOOKMARK BUTTON */}
        {/* ================================== */}

        <button
          className={`GridPropertyListing-bookmark-btn ${
            isBookmarked
              ? "active"
              : ""
          }`}
          onClick={(
            event
          ) => {
            event.stopPropagation();

            setIsBookmarked(
              !isBookmarked
            );
          }}
        >
          <BsBookmarkFill />
        </button>

        {/* ================================== */}
        {/* HOVER CONTROLS */}
        {/* ================================== */}

        <div className="GridPropertyListing-overlay">
          <button
            className="GridPropertyListing-plus-icon-btn"
            onClick={(
              event
            ) => {
              event.stopPropagation();
            }}
          >
            <BsPlusLg />
          </button>

          <div className="GridPropertyListing-slider-arrows">
            <button
              className="GridPropertyListing-arrow-btn"
              onClick={
                handlePrevImage
              }
            >
              <BsChevronLeft />
            </button>

            <button
              className="GridPropertyListing-arrow-btn"
              onClick={
                handleNextImage
              }
            >
              <BsChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* ==================================== */}
      {/* PROPERTY DETAILS */}
      {/* ==================================== */}

      <div className="GridPropertyListing-card-content">
        <h3 className="GridPropertyListing-card-title">
          {property.title}
        </h3>

        {/* ================================== */}
        {/* ADDRESS */}
        {/* ================================== */}

        <div className="GridPropertyListing-card-address">
          <HiOutlineMapPin className="GridPropertyListing-location-icon" />

          <span>
            {property.address}
          </span>
        </div>

        {/* ================================== */}
        {/* PRICE */}
        {/* ================================== */}

        <div className="GridPropertyListing-card-price">
          {property.price}
        </div>

        {/* ================================== */}
        {/* SPECS */}
        {/* ================================== */}

        <div className="GridPropertyListing-card-specs">
          <span className="GridPropertyListing-spec-item">
            <BiBed className="GridPropertyListing-spec-icon" />

            Beds:{" "}
            <strong>
              {property.beds}
            </strong>
          </span>

          <span className="GridPropertyListing-spec-item">
            <BiBath className="GridPropertyListing-spec-icon" />

            Baths:{" "}
            <strong>
              {property.baths}
            </strong>
          </span>

          <span className="GridPropertyListing-spec-item">
            <BiArea className="GridPropertyListing-spec-icon" />

            Sqft:{" "}
            <strong>
              {property.sqft}
            </strong>
          </span>
        </div>

        {/* ================================== */}
        {/* FOOTER */}
        {/* ================================== */}

        <div className="GridPropertyListing-card-footer">
          <button
            className="GridPropertyListing-compare-btn"
            onClick={(
              event
            ) => {
              event.stopPropagation();
            }}
          >
            <BsPlus className="GridPropertyListing-compare-icon" />

            Compare
          </button>

          <div className="GridPropertyListing-agent-info">
            <img
              src={
                property.agentAvatar
              }
              alt="Agent Avatar"
              className="GridPropertyListing-agent-avatar"
            />

            <span className="GridPropertyListing-time-posted">
              {
                property.timeAgo
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// =====================================================
// GRID PROPERTY LISTING
// =====================================================

const GridPropertyListing = ({
  filters = {},
}) => {
  // ===================================================
  // STATE
  // ===================================================

  const [
    properties,
    setProperties,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const [
    viewMode,
    setViewMode,
  ] = useState("grid");

  const [
    sortOrder,
    setSortOrder,
  ] = useState(
    "Default order"
  );

  // ===================================================
  // FETCH PROPERTIES
  // ===================================================

  const fetchProperties =
    async () => {
      try {
        setLoading(true);

        setError("");

        // =============================================
        // REQUEST PARAMS
        // =============================================

        const params = {
          page: 1,
          limit: 1000,
          ...filters,
        };

        // =============================================
        // AMENITIES
        // =============================================

        if (
          Array.isArray(
            filters.amenities
          ) &&
          filters.amenities
            .length > 0
        ) {
          params.amenities =
            filters.amenities.join(
              ","
            );
        } else {
          delete params.amenities;
        }

        console.log(
          "================================"
        );

        console.log(
          "PROPERTY FILTERS:",
          filters
        );

        console.log(
          "PROPERTY API PARAMS:",
          params
        );

        console.log(
          "================================"
        );

        // =============================================
        // API
        // =============================================

        const response =
          await API.get(
            "/properties",
            {
              params,
            }
          );

        console.log(
          "PROPERTY RESPONSE:",
          response.data
        );

        // =============================================
        // GET PROPERTY ARRAY
        // =============================================

        const propertyData =
          response.data
            ?.properties ||
          response.data?.data ||
          response.data ||
          [];

        console.log(
          "PROPERTY ARRAY:",
          propertyData
        );

        // =============================================
        // NORMALIZE
        // =============================================

        const normalizedProperties =
          Array.isArray(
            propertyData
          )
            ? propertyData.map(
                normalizeProperty
              )
            : [];

        console.log(
          "NORMALIZED PROPERTIES:",
          normalizedProperties
        );

        setProperties(
          normalizedProperties
        );
      } catch (error) {
        console.error(
          "FETCH PROPERTIES ERROR:",
          error.response?.data ||
            error
        );

        setProperties([]);

        setError(
          error.response?.data
            ?.message ||
            "Failed to load properties"
        );
      } finally {
        setLoading(false);
      }
    };

  // ===================================================
  // FETCH WHEN FILTER CHANGES
  // ===================================================

  useEffect(() => {
    fetchProperties();

    setCurrentPage(1);
  }, [filters]);

  // ===================================================
  // TOTAL PAGES
  // ===================================================

  const totalPages =
    Math.ceil(
      properties.length /
        ITEMS_PER_PAGE
    );

  // ===================================================
  // START INDEX
  // ===================================================

  const startIndex =
    (currentPage - 1) *
    ITEMS_PER_PAGE;

  // ===================================================
  // SORT PROPERTIES
  // ===================================================

  const sortedProperties = [
    ...properties,
  ].sort(
    (
      firstProperty,
      secondProperty
    ) => {
      // =============================================
      // LOW TO HIGH
      // =============================================

      if (
        sortOrder ===
        "Price: Low to High"
      ) {
        return (
          firstProperty.rawPrice -
          secondProperty.rawPrice
        );
      }

      // =============================================
      // HIGH TO LOW
      // =============================================

      if (
        sortOrder ===
        "Price: High to Low"
      ) {
        return (
          secondProperty.rawPrice -
          firstProperty.rawPrice
        );
      }

      // =============================================
      // NEWEST
      // =============================================

      if (
        sortOrder ===
        "Newest First"
      ) {
        return (
          new Date(
            secondProperty.createdAt
          ) -
          new Date(
            firstProperty.createdAt
          )
        );
      }

      return 0;
    }
  );

  // ===================================================
  // CURRENT PAGE PROPERTIES
  // ===================================================

  const currentProperties =
    sortedProperties.slice(
      startIndex,
      startIndex +
        ITEMS_PER_PAGE
    );

  // ===================================================
  // PAGE CHANGE
  // ===================================================

  const handlePageChange = (
    page
  ) => {
    if (
      page >= 1 &&
      page <= totalPages
    ) {
      setCurrentPage(page);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // ===================================================
  // UI
  // ===================================================

  return (
    <section className="GridPropertyListing">
      <div className="GridPropertyListing-container">

        {/* ==================================== */}
        {/* TOP HEADER CONTROLS */}
        {/* ==================================== */}

        <div className="GridPropertyListing-header">

          <div className="GridPropertyListing-header-left">

            <h2 className="GridPropertyListing-main-title">

              <span className="GridPropertyListing-title-green">
                Property
              </span>{" "}

              <span className="GridPropertyListing-title-dark">
                Listing
              </span>

            </h2>

            <span className="GridPropertyListing-count-text">

              There are currently{" "}
              {properties.length}{" "}
              properties.

            </span>

          </div>

          {/* ================================== */}
          {/* RIGHT HEADER */}
          {/* ================================== */}

          <div className="GridPropertyListing-header-right">

            {/* ================================ */}
            {/* VIEW TOGGLE */}
            {/* ================================ */}

            <div className="GridPropertyListing-view-toggle">

              <button
                className={`GridPropertyListing-toggle-btn ${
                  viewMode ===
                  "grid"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setViewMode(
                    "grid"
                  )
                }
              >
                <BsGrid3X3GapFill />
              </button>

              <button
                className={`GridPropertyListing-toggle-btn ${
                  viewMode ===
                  "list"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setViewMode(
                    "list"
                  )
                }
              >
                <BsListUl />
              </button>

            </div>

            {/* ================================ */}
            {/* SORT */}
            {/* ================================ */}

            <div className="GridPropertyListing-sort-box">

              <select
                value={
                  sortOrder
                }
                onChange={(e) =>
                  setSortOrder(
                    e.target.value
                  )
                }
                className="GridPropertyListing-sort-select"
              >
                <option value="Default order">
                  Default order
                </option>

                <option value="Price: Low to High">
                  Price: Low to High
                </option>

                <option value="Price: High to Low">
                  Price: High to Low
                </option>

                <option value="Newest First">
                  Newest First
                </option>

              </select>

              <BsChevronDown className="GridPropertyListing-sort-icon" />

            </div>

          </div>

        </div>

        {/* ==================================== */}
        {/* LOADING */}
        {/* ==================================== */}

        {loading && (
          <div>
            Loading properties...
          </div>
        )}

        {/* ==================================== */}
        {/* ERROR */}
        {/* ==================================== */}

        {!loading &&
          error && (
            <div>
              {error}
            </div>
          )}

        {/* ==================================== */}
        {/* GRID */}
        {/* ==================================== */}

        {!loading &&
          !error && (
            <div
              className={`GridPropertyListing-grid ${viewMode}`}
            >
              {currentProperties.map(
                (property) => (
                  <PropertyCard
                    key={
                      property.id
                    }
                    property={
                      property
                    }
                  />
                )
              )}
            </div>
          )}

        {/* ==================================== */}
        {/* PAGINATION */}
        {/* ==================================== */}

        {!loading &&
          !error &&
          totalPages > 0 && (
            <div className="GridPropertyListing-pagination">

              <button
                className="GridPropertyListing-page-nav"
                onClick={() =>
                  handlePageChange(
                    currentPage -
                      1
                  )
                }
                disabled={
                  currentPage ===
                  1
                }
              >
                <BsChevronLeft />
              </button>

              {Array.from(
                {
                  length:
                    totalPages,
                },
                (_, index) =>
                  index + 1
              ).map(
                (page) => (
                  <button
                    key={page}
                    className={`GridPropertyListing-page-btn ${
                      currentPage ===
                      page
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      handlePageChange(
                        page
                      )
                    }
                  >
                    {page}
                  </button>
                )
              )}

              <button
                className="GridPropertyListing-page-nav"
                onClick={() =>
                  handlePageChange(
                    currentPage +
                      1
                  )
                }
                disabled={
                  currentPage ===
                  totalPages
                }
              >
                <BsChevronRight />
              </button>

            </div>
          )}

      </div>
    </section>
  );
};

export default GridPropertyListing;