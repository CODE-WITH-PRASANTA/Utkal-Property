import {
  useEffect,
  useState,
} from "react";

import {
  FaRupeeSign,
  FaHome,
  FaArrowsAltH,
  FaBuilding,
  FaMapMarkerAlt,
} from "react-icons/fa";

import {
  useNavigate,
} from "react-router-dom";

import API from "../../api/Axios";

import "./PropertyDetailsSimilarProjects.css";

// =====================================================
// BACKEND URL
// =====================================================

const BACKEND_URL =
  "http://localhost:5000";

// =====================================================
// IMAGE URL
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
// GET PROPERTY IMAGE
// =====================================================

const getPropertyImage = (
  property
) => {
  // propertyImages[]
  if (
    Array.isArray(
      property?.propertyImages
    ) &&
    property.propertyImages.length >
      0
  ) {
    const firstImage =
      property.propertyImages[0];

    // Image stored as string
    if (
      typeof firstImage ===
      "string"
    ) {
      return getImageUrl(
        firstImage
      );
    }

    // Image stored as object
    if (
      firstImage &&
      typeof firstImage ===
        "object"
    ) {
      return getImageUrl(
        firstImage.url ||
          firstImage.path ||
          firstImage.file ||
          firstImage.image ||
          ""
      );
    }
  }

  // primaryImage
  if (property?.primaryImage) {
    return getImageUrl(
      property.primaryImage
    );
  }

  // old image field
  if (property?.image) {
    return getImageUrl(
      property.image
    );
  }

  return "";
};

// =====================================================
// FORMAT PRICE
// =====================================================

const formatPrice = (price) => {
  const amount = Number(price);

  if (
    !Number.isFinite(amount)
  ) {
    return "Price on request";
  }

  // Crore
  if (amount >= 10000000) {
    const crore =
      amount / 10000000;

    return `₹ ${crore.toFixed(
      2
    )} Cr`;
  }

  // Lakh
  if (amount >= 100000) {
    const lakh =
      amount / 100000;

    return `₹ ${lakh.toFixed(
      2
    )} Lakh`;
  }

  return `₹ ${amount.toLocaleString(
    "en-IN"
  )}`;
};

// =====================================================
// GET SBA
// =====================================================

const getSBA = (property) => {
  // Try floor plan first
  if (
    Array.isArray(
      property?.floorPlans
    ) &&
    property.floorPlans.length >
      0
  ) {
    const sizes =
      property.floorPlans
        .map((plan) =>
          Number(plan.sbaSqft)
        )
        .filter(
          (size) =>
            Number.isFinite(
              size
            ) && size > 0
        );

    if (sizes.length > 0) {
      const min =
        Math.min(...sizes);

      const max =
        Math.max(...sizes);

      if (min === max) {
        return `${min} sq.ft.`;
      }

      return `${min}-${max} sq.ft.`;
    }
  }

  // plotArea
  if (property?.plotArea) {
    return property.plotArea;
  }

  // plotSize
  if (property?.plotSize) {
    return property.plotSize;
  }

  // totalArea
  if (property?.totalArea) {
    return property.totalArea;
  }

  // projectArea
  if (property?.projectArea) {
    return property.projectArea;
  }

  return "N/A";
};

// =====================================================
// GET LOCATION
// =====================================================

const getLocation = (
  property
) => {
  const locationParts = [
    property?.location,
    property?.city,
  ].filter(Boolean);

  // Remove duplicate values
  return [
    ...new Set(
      locationParts
    ),
  ].join(", ");
};

// =====================================================
// GET BUILDER
// =====================================================

const getBuilder = (
  property
) => {
  return (
    property?.builder ||
    property?.builderName ||
    property?.developer ||
    property?.developerName ||
    "Utkal Property"
  );
};

// =====================================================
// COMPONENT
// =====================================================

const PropertyDetailsSimilarProjects =
  ({ property }) => {
    // =================================================
    // NAVIGATION
    // =================================================

    const navigate =
      useNavigate();

    // =================================================
    // STATE
    // =================================================

    const [
      projects,
      setProjects,
    ] = useState([]);

    const [
      loading,
      setLoading,
    ] = useState(false);

    const [
      error,
      setError,
    ] = useState("");

    // =================================================
    // FETCH RECENT PROPERTIES
    // =================================================

    useEffect(() => {
      const fetchRecentProperties =
        async () => {
          try {
            setLoading(true);

            setError("");

            console.log(
              "================================"
            );

            console.log(
              "FETCHING RECENT PROPERTIES"
            );

            console.log(
              "CURRENT PROPERTY:",
              property
            );

            console.log(
              "================================"
            );

            // =========================================
            // FETCH PROPERTIES
            // =========================================
            //
            // Request a few instead of exactly 2
            // because we need to remove the current
            // property.
            // =========================================

            const response =
              await API.get(
                "/properties",
                {
                  params: {
                    page: 1,
                    limit: 5,
                  },
                }
              );

            console.log(
              "RECENT PROPERTY RESPONSE:",
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

            if (
              !Array.isArray(
                propertyData
              )
            ) {
              setProjects([]);

              return;
            }

            // =========================================
            // REMOVE CURRENT PROPERTY
            // =========================================

            let filtered =
              propertyData.filter(
                (item) =>
                  String(
                    item._id
                  ) !==
                  String(
                    property?._id
                  )
              );

            // =========================================
            // SORT LATEST FIRST
            // =========================================

            filtered.sort(
              (a, b) => {
                return (
                  new Date(
                    b.createdAt
                  ).getTime() -
                  new Date(
                    a.createdAt
                  ).getTime()
                );
              }
            );

            // =========================================
            // ONLY RECENT 2
            // =========================================

            filtered =
              filtered.slice(
                0,
                2
              );

            console.log(
              "FINAL RECENT 2:",
              filtered
            );

            setProjects(
              filtered
            );
          } catch (error) {
            console.error(
              "FETCH RECENT PROPERTY ERROR:",
              error.response
                ?.data ||
                error
            );

            setProjects([]);

            setError(
              error.response?.data
                ?.message ||
                "Failed to load recent properties."
            );
          } finally {
            setLoading(false);
          }
        };

      fetchRecentProperties();
    }, [property?._id]);

    // =================================================
    // VIEW DETAILS
    // =================================================

    const handleViewDetails = (
      project
    ) => {
      console.log(
        "VIEW PROPERTY:",
        project
      );

      if (!project?._id) {
        return;
      }

      // =========================================
      // IMPORTANT
      // Change this route only if your frontend
      // property-details route is different.
      // =========================================

      navigate(
        `/property-details/${project._id}`
      );

      // When opening another property while already
      // on details page, scroll back to top.

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    // =================================================
    // UI
    // =================================================

    return (
      <div className="PropertyDetailsSimilarProjects-wrapper">

        {/* ==================================== */}
        {/* SECTION HEADER */}
        {/* ==================================== */}

        <div className="PropertyDetailsSimilarProjects-section-header">

          <h2 className="PropertyDetailsSimilarProjects-title">
            Similar Projects for{" "}
            {property?.name ||
              property?.title ||
              "This Property"}
          </h2>

          <div className="PropertyDetailsSimilarProjects-underline"></div>

        </div>

        {/* ==================================== */}
        {/* LOADING */}
        {/* ==================================== */}

        {loading && (
          <p>
            Loading recent
            properties...
          </p>
        )}

        {/* ==================================== */}
        {/* ERROR */}
        {/* ==================================== */}

        {!loading && error && (
          <p>
            {error}
          </p>
        )}

        {/* ==================================== */}
        {/* NO PROPERTY */}
        {/* ==================================== */}

        {!loading &&
          !error &&
          projects.length ===
            0 && (
            <p>
              No recent properties
              available.
            </p>
          )}

        {/* ==================================== */}
        {/* PROJECTS GRID */}
        {/* ==================================== */}

        {!loading &&
          !error &&
          projects.length > 0 && (
            <div className="PropertyDetailsSimilarProjects-grid">

              {projects.map(
                (project) => {
                  const image =
                    getPropertyImage(
                      project
                    );

                  return (
                    <div
                      key={
                        project._id
                      }
                      className="PropertyDetailsSimilarProjects-card"
                    >

                      {/* ======================= */}
                      {/* IMAGE SECTION */}
                      {/* ======================= */}

                      <div className="PropertyDetailsSimilarProjects-img-container">

                        {image ? (
                          <img
                            src={
                              image
                            }
                            alt={
                              project.name ||
                              "Property"
                            }
                            className="PropertyDetailsSimilarProjects-image"
                          />
                        ) : (
                          <div className="PropertyDetailsSimilarProjects-image">
                            No Image
                          </div>
                        )}

                        {/* ===================== */}
                        {/* FEATURED */}
                        {/* ===================== */}

                        {project.featured && (
                          <div className="PropertyDetailsSimilarProjects-featured-badge">
                            Featured
                          </div>
                        )}

                      </div>

                      {/* ======================= */}
                      {/* CONTENT SECTION */}
                      {/* ======================= */}

                      <div className="PropertyDetailsSimilarProjects-content">

                        {/* ===================== */}
                        {/* NAME */}
                        {/* ===================== */}

                        <h3 className="PropertyDetailsSimilarProjects-card-title">

                          {project.name ||
                            project.title ||
                            "Property"}

                        </h3>

                        {/* ===================== */}
                        {/* DETAILS GRID */}
                        {/* ===================== */}

                        <div className="PropertyDetailsSimilarProjects-details-grid">

                          {/* =================== */}
                          {/* PRICE */}
                          {/* =================== */}

                          <div className="PropertyDetailsSimilarProjects-detail-item">

                            <div className="PropertyDetailsSimilarProjects-icon-box">
                              <FaRupeeSign />
                            </div>

                            <div className="PropertyDetailsSimilarProjects-detail-text">

                              <span className="PropertyDetailsSimilarProjects-detail-label">
                                Price
                              </span>

                              <span className="PropertyDetailsSimilarProjects-detail-val">

                                {formatPrice(
                                  project.price
                                )}

                              </span>

                            </div>

                          </div>

                          {/* =================== */}
                          {/* TYPE */}
                          {/* =================== */}

                          <div className="PropertyDetailsSimilarProjects-detail-item">

                            <div className="PropertyDetailsSimilarProjects-icon-box">
                              <FaHome />
                            </div>

                            <div className="PropertyDetailsSimilarProjects-detail-text">

                              <span className="PropertyDetailsSimilarProjects-detail-label">
                                Type
                              </span>

                              <span className="PropertyDetailsSimilarProjects-detail-val">

                                {project.type ||
                                  project.category ||
                                  "N/A"}

                              </span>

                            </div>

                          </div>

                          {/* =================== */}
                          {/* SBA */}
                          {/* =================== */}

                          <div className="PropertyDetailsSimilarProjects-detail-item">

                            <div className="PropertyDetailsSimilarProjects-icon-box">
                              <FaArrowsAltH />
                            </div>

                            <div className="PropertyDetailsSimilarProjects-detail-text">

                              <span className="PropertyDetailsSimilarProjects-detail-label">
                                SBA
                              </span>

                              <span className="PropertyDetailsSimilarProjects-detail-val">

                                {getSBA(
                                  project
                                )}

                              </span>

                            </div>

                          </div>

                          {/* =================== */}
                          {/* BUILDER */}
                          {/* =================== */}

                          <div className="PropertyDetailsSimilarProjects-detail-item">

                            <div className="PropertyDetailsSimilarProjects-icon-box">
                              <FaBuilding />
                            </div>

                            <div className="PropertyDetailsSimilarProjects-detail-text">

                              <span className="PropertyDetailsSimilarProjects-detail-label">
                                Builder
                              </span>

                              <span className="PropertyDetailsSimilarProjects-detail-val">

                                {getBuilder(
                                  project
                                )}

                              </span>

                            </div>

                          </div>

                        </div>

                        {/* ===================== */}
                        {/* LOCATION */}
                        {/* ===================== */}

                        <div className="PropertyDetailsSimilarProjects-location-row">

                          <div className="PropertyDetailsSimilarProjects-icon-box">
                            <FaMapMarkerAlt />
                          </div>

                          <div className="PropertyDetailsSimilarProjects-detail-text">

                            <span className="PropertyDetailsSimilarProjects-detail-label">
                              Location
                            </span>

                            <span className="PropertyDetailsSimilarProjects-detail-val">

                              {getLocation(
                                project
                              ) ||
                                "Location not available"}

                            </span>

                          </div>

                        </div>

                        {/* ===================== */}
                        {/* VIEW DETAILS */}
                        {/* ===================== */}

                        <button
                          className="PropertyDetailsSimilarProjects-view-btn"
                          onClick={() =>
                            handleViewDetails(
                              project
                            )
                          }
                        >
                          View Details
                        </button>

                      </div>

                    </div>
                  );
                }
              )}

            </div>
          )}

      </div>
    );
  };

export default PropertyDetailsSimilarProjects;