import React, { useEffect, useMemo, useState } from "react";
import "./HomeRealEstate.css";

import API, { IMG_URL } from "../../api/axios";

// React Icons
import {
  FaTimes,
  FaImage,
  FaMapMarkedAlt,
  FaExpandAlt,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const HomeRealEstate = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [brokenImages, setBrokenImages] = useState({});

  // =====================================================
  // PAGINATION
  // =====================================================

  const ITEMS_PER_PAGE = 4;

  const [currentPage, setCurrentPage] = useState(1);

  // =====================================================
  // IMAGE URL RESOLVER
  // =====================================================

  const getImageUrl = (photoPath) => {
    if (!photoPath) return "";

    const value = String(photoPath).trim();

    // Absolute URL / Blob URL
    if (
      value.startsWith("http://") ||
      value.startsWith("https://") ||
      value.startsWith("blob:")
    ) {
      return value;
    }

    // Normalize Windows path
    let cleanPath = value.replace(/\\/g, "/");

    // Find uploads/
    const uploadsIndex = cleanPath
      .toLowerCase()
      .indexOf("uploads/");

    if (uploadsIndex !== -1) {
      cleanPath =
        "/" + cleanPath.substring(uploadsIndex);
    } else {
      cleanPath = cleanPath.startsWith("/")
        ? cleanPath
        : `/${cleanPath}`;
    }

    // Remove duplicate slash
    cleanPath = cleanPath.replace(/\/+/g, "/");

    // Backend URL
    let baseUrl = IMG_URL;

    if (!baseUrl) {
      baseUrl = "http://localhost:5000";
    }

    baseUrl = String(baseUrl).replace(/\/+$/, "");

    // Prevent /api/uploads
    baseUrl = baseUrl.replace(/\/api$/, "");

    return `${baseUrl}${cleanPath}`;
  };

  // =====================================================
  // FETCH GALLERY
  // =====================================================

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);

      const response = await API.get("/gallery");

      let data = [];

      if (
        response.data &&
        Array.isArray(response.data.data)
      ) {
        data = response.data.data;
      } else if (Array.isArray(response.data)) {
        data = response.data;
      }

      setGalleryItems(data);
      setBrokenImages({});
    } catch (error) {
      console.error(
        "Error fetching real estate gallery items:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  // =====================================================
  // PAGINATION CALCULATION
  // =====================================================

  const totalPages = Math.max(
    1,
    Math.ceil(
      galleryItems.length / ITEMS_PER_PAGE
    )
  );

  const paginatedItems = useMemo(() => {
    const startIndex =
      (currentPage - 1) * ITEMS_PER_PAGE;

    const endIndex =
      startIndex + ITEMS_PER_PAGE;

    return galleryItems.slice(
      startIndex,
      endIndex
    );
  }, [galleryItems, currentPage]);

  // =====================================================
  // KEEP PAGE VALID
  // =====================================================

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // =====================================================
  // IMAGE ERROR
  // =====================================================

  const handleImageError = (id, url) => {
    console.error(
      "Gallery image failed to load:",
      url
    );

    setBrokenImages((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  // =====================================================
  // MODAL
  // =====================================================

  const handleOpenModal = (image) => {
    setSelectedImage(image);

    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setSelectedImage(null);

    document.body.style.overflow = "";
  };

  // =====================================================
  // ESCAPE KEY
  // =====================================================

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };

    if (selectedImage) {
      window.addEventListener(
        "keydown",
        handleKeyDown
      );
    }

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [selectedImage]);

  // =====================================================
  // PAGE CHANGE
  // =====================================================

  const handlePageChange = (page) => {
    if (
      page < 1 ||
      page > totalPages ||
      page === currentPage
    ) {
      return;
    }

    setCurrentPage(page);

    // Scroll slightly to gallery
    window.scrollTo({
      top:
        window.scrollY -
        150,
      behavior: "smooth",
    });
  };

  // =====================================================
  // PAGINATION NUMBERS
  // =====================================================

  const paginationNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <section
      className="HomeRealEstate"
      aria-labelledby="apartment-dealers-heading"
    >
      <div className="HomeRealEstate-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="HomeRealEstate-header">

          <span className="HomeRealEstate-tag">
            <FaMapMarkedAlt className="HomeRealEstate-tag-icon" />

            Prime Location Showcase
          </span>

          <h1
            id="apartment-dealers-heading"
            className="HomeRealEstate-title"
          >
            Best Apartment Dealers in Bhubaneswar

            <span className="HomeRealEstate-title-break">
              Explore Properties by Area
            </span>
          </h1>

          <p className="HomeRealEstate-subtitle">
            Partner with the{" "}
            <strong>
              best apartment dealers in Bhubaneswar
            </strong>{" "}
            to discover luxury 2 BHK, 3 BHK, and 4 BHK
            residential flats, penthouses, and premium
            gated communities across top localities
            including Patia, Jaydev Vihar, Saheed Nagar,
            Khandagiri, and Rasulgarh.
          </p>

        </header>

        {/* =================================================
            GALLERY HEADER
        ================================================= */}

        <div className="HomeRealEstate-gallery-heading">

          <div className="HomeRealEstate-gallery-heading-left">

            <span className="HomeRealEstate-gallery-line"></span>

            <div>
              <span className="HomeRealEstate-gallery-eyebrow">
                Featured Collection
              </span>

              <h2 className="HomeRealEstate-gallery-title">
                Explore Our Property Areas
              </h2>
            </div>

          </div>

          {!loading &&
            galleryItems.length > 0 && (
              <div className="HomeRealEstate-gallery-count">

                <span>
                  {galleryItems.length}
                </span>

                <small>
                  {galleryItems.length === 1
                    ? "Property"
                    : "Properties"}
                </small>

              </div>
            )}

        </div>

        {/* =================================================
            GALLERY GRID
        ================================================= */}

        <div className="HomeRealEstate-grid">

          {/* LOADING */}
          {loading ? (
            Array.from({
              length: ITEMS_PER_PAGE,
            }).map((_, index) => (
              <div
                key={index}
                className="HomeRealEstate-skeleton-card"
              >
                <div className="HomeRealEstate-skeleton-image"></div>

                <div className="HomeRealEstate-skeleton-content">
                  <span></span>
                  <span></span>
                </div>
              </div>
            ))
          ) : galleryItems.length > 0 ? (

            /* PAGINATED ITEMS */
            paginatedItems.map(
              (item, index) => {

                const itemId =
                  item._id ||
                  item.id ||
                  `${currentPage}-${index}`;

                const imageUrl =
                  getImageUrl(item.image);

                const isBroken =
                  brokenImages[itemId];

                /*
                  Global image number.
                  Example:
                  Page 1 => 01,02,03,04
                  Page 2 => 05,06,07,08
                */
                const globalIndex =
                  (currentPage - 1) *
                    ITEMS_PER_PAGE +
                  index;

                return (
                  <article
                    key={itemId}
                    className="HomeRealEstate-card"
                  >

                    {/* =====================================
                        IMAGE
                    ===================================== */}

                    {!isBroken ? (
                      <img
                        src={imageUrl}
                        alt={
                          item.title ||
                          `Luxury Apartment in Bhubaneswar - Area ${
                            globalIndex + 1
                          }`
                        }
                        className="HomeRealEstate-card-img"
                        loading="lazy"
                        onError={() =>
                          handleImageError(
                            itemId,
                            imageUrl
                          )
                        }
                      />
                    ) : (
                      <div className="HomeRealEstate-card-broken">

                        <FaImage />

                        <span>
                          Image Unavailable
                        </span>

                      </div>
                    )}

                    {/* =====================================
                        NUMBER
                    ===================================== */}

                    {!isBroken && (
                      <div className="HomeRealEstate-card-number">
                        {String(
                          globalIndex + 1
                        ).padStart(2, "0")}
                      </div>
                    )}

                    {/* =====================================
                        TOP VIEW BUTTON
                    ===================================== */}

                    {!isBroken && (
                      <button
                        type="button"
                        className="HomeRealEstate-view-button"
                        onClick={() =>
                          handleOpenModal(
                            imageUrl
                          )
                        }
                        aria-label="View property image"
                      >
                        <FaExpandAlt />
                      </button>
                    )}

                    {/* =====================================
                        HOVER OVERLAY
                    ===================================== */}

                    {!isBroken && (
                      <div
                        className="HomeRealEstate-hover-overlay"
                        onClick={() =>
                          handleOpenModal(
                            imageUrl
                          )
                        }
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (
                            e.key === "Enter" ||
                            e.key === " "
                          ) {
                            handleOpenModal(
                              imageUrl
                            );
                          }
                        }}
                        aria-label="View enlarged property image"
                      >

                        <span className="HomeRealEstate-plus-icon">
                          +
                        </span>

                        <span className="HomeRealEstate-view-text">
                          View Property
                        </span>

                      </div>
                    )}

                    {/* =====================================
                        GRADIENT
                    ===================================== */}

                    <div className="HomeRealEstate-card-gradient"></div>

                    {/* =====================================
                        CONTENT
                    ===================================== */}

                    <div className="HomeRealEstate-card-content">

                      <div className="HomeRealEstate-card-content-top">

                        <span className="HomeRealEstate-card-location-label">
                          PRIME LOCATION
                        </span>

                      </div>

                      <h2 className="HomeRealEstate-card-title">
                        {item.title ||
                          "Utkal Luxury Apartments"}
                      </h2>

                      <div className="HomeRealEstate-card-footer">

                        <p className="HomeRealEstate-card-listings">
                          {item.location ||
                            item.listings ||
                            "Explore Area Listings"}
                        </p>

                        <span className="HomeRealEstate-card-arrow">
                          <FaArrowRight />
                        </span>

                      </div>

                    </div>

                  </article>
                );
              }
            )

          ) : (

            /* EMPTY */
            <div className="HomeRealEstate-empty">

              <div className="HomeRealEstate-empty-icon">
                <FaImage />
              </div>

              <h3>
                No Properties Available
              </h3>

              <p>
                Upload new gallery images from
                the admin panel to display them
                here.
              </p>

            </div>
          )}

        </div>

        {/* =================================================
            PAGINATION
        ================================================= */}

        {!loading &&
          galleryItems.length > ITEMS_PER_PAGE && (
            <div className="HomeRealEstate-pagination">

              {/* PREVIOUS */}
              <button
                type="button"
                className="HomeRealEstate-pagination-arrow"
                disabled={currentPage === 1}
                onClick={() =>
                  handlePageChange(
                    currentPage - 1
                  )
                }
                aria-label="Previous page"
              >
                <FaChevronLeft />
              </button>

              {/* PAGE NUMBERS */}
              <div className="HomeRealEstate-pagination-numbers">

                {paginationNumbers.map(
                  (page) => (
                    <button
                      type="button"
                      key={page}
                      className={`HomeRealEstate-pagination-number ${
                        currentPage === page
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        handlePageChange(
                          page
                        )
                      }
                      aria-label={`Go to page ${page}`}
                      aria-current={
                        currentPage === page
                          ? "page"
                          : undefined
                      }
                    >
                      {String(page).padStart(
                        2,
                        "0"
                      )}
                    </button>
                  )
                )}

              </div>

              {/* NEXT */}
              <button
                type="button"
                className="HomeRealEstate-pagination-arrow"
                disabled={
                  currentPage ===
                  totalPages
                }
                onClick={() =>
                  handlePageChange(
                    currentPage + 1
                  )
                }
                aria-label="Next page"
              >
                <FaChevronRight />
              </button>

            </div>
          )}

        {/* =================================================
            PAGINATION INFO
        ================================================= */}

        {!loading &&
          galleryItems.length > ITEMS_PER_PAGE && (
            <div className="HomeRealEstate-pagination-info">
              Showing{" "}
              <strong>
                {(currentPage - 1) *
                  ITEMS_PER_PAGE +
                  1}
              </strong>
              {" - "}
              <strong>
                {Math.min(
                  currentPage *
                    ITEMS_PER_PAGE,
                  galleryItems.length
                )}
              </strong>{" "}
              of{" "}
              <strong>
                {galleryItems.length}
              </strong>{" "}
              properties
            </div>
          )}

        {/* =================================================
            MODAL / LIGHTBOX
        ================================================= */}

        {selectedImage && (
          <div
            className="HomeRealEstate-modal-overlay"
            onClick={handleCloseModal}
            role="dialog"
            aria-modal="true"
            aria-label="Property image preview"
          >

            <div
              className="HomeRealEstate-modal-content"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <button
                type="button"
                className="HomeRealEstate-modal-close"
                onClick={handleCloseModal}
                aria-label="Close image preview"
              >
                <FaTimes />
              </button>

              <img
                src={selectedImage}
                alt="Enlarged view of Bhubaneswar Apartment"
                className="HomeRealEstate-modal-img"
              />

            </div>

          </div>
        )}

      </div>
    </section>
  );
};

export default HomeRealEstate;