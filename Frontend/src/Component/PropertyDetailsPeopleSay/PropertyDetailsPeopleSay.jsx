import { useEffect, useState } from "react";
import {
  FaStar,
  FaRegStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "./PropertyDetailsPeopleSay.css";
import API from "../../api/Axios";

const PropertyDetailsPeopleSay = ({
  property,
}) => {
  // =====================================================
  // REVIEWS STATE
  // =====================================================

  const [allReviews, setAllReviews] = useState([]);

  const [loadingReviews, setLoadingReviews] =
    useState(false);

  // =====================================================
  // PAGINATION STATE
  // =====================================================

  const [currentPage, setCurrentPage] = useState(1);

  const reviewsPerPage = 4;

  // =====================================================
  // FETCH APPROVED REVIEWS
  // =====================================================

  useEffect(() => {
    const fetchApprovedReviews = async () => {
      try {
        setLoadingReviews(true);

        // =================================================
        // PROPERTY ID
        // =================================================

        const propertyId =
          property?._id ||
          property?.id;

        console.log(
          "PROPERTY ID FOR REVIEWS:",
          propertyId
        );

        if (!propertyId) {
          console.warn(
            "Property ID not found."
          );

          setAllReviews([]);
          return;
        }

        // =================================================
        // API REQUEST
        // =================================================

        const response =
          await API.get(
            `/property-reviews/property/${propertyId}`
          );

        console.log(
          "APPROVED REVIEWS RESPONSE:",
          response.data
        );

        // =================================================
        // SUPPORT DIFFERENT RESPONSE FORMATS
        // =================================================

        const responseReviews =
          response.data?.reviews ||
          response.data?.data ||
          response.data ||
          [];

        // =================================================
        // ONLY APPROVED REVIEWS
        // =================================================
        //
        // Backend already returns approved reviews,
        // but this additional check keeps the frontend safe.
        //

        const approvedReviews =
          Array.isArray(responseReviews)
            ? responseReviews.filter(
                (review) =>
                  !review.status ||
                  review.status === "Approved"
              )
            : [];

        // =================================================
        // SET REVIEWS
        // =================================================

        setAllReviews(
          approvedReviews
        );

        // =================================================
        // RESET PAGINATION
        // =================================================

        setCurrentPage(1);

      } catch (error) {
        console.error(
          "FETCH APPROVED REVIEWS ERROR:",
          error.response?.data ||
            error
        );

        setAllReviews([]);

      } finally {
        setLoadingReviews(false);
      }
    };

    fetchApprovedReviews();

  }, [
    property?._id,
    property?.id,
  ]);

  // =====================================================
  // TOTAL PAGES
  // =====================================================

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        allReviews.length /
          reviewsPerPage
      )
    );

  // =====================================================
  // PAGINATION LOGIC
  // =====================================================

  const indexOfLastReview =
    currentPage *
    reviewsPerPage;

  const indexOfFirstReview =
    indexOfLastReview -
    reviewsPerPage;

  const currentReviews =
    allReviews.slice(
      indexOfFirstReview,
      indexOfLastReview
    );

  // =====================================================
  // NEXT
  // =====================================================

  const handleNext = () => {
    if (
      currentPage <
      totalPages
    ) {
      setCurrentPage(
        currentPage + 1
      );
    }
  };

  // =====================================================
  // PREVIOUS
  // =====================================================

  const handlePrev = () => {
    if (
      currentPage > 1
    ) {
      setCurrentPage(
        currentPage - 1
      );
    }
  };

  // =====================================================
  // VIEW ALL
  // =====================================================

  const handleViewAll = (e) => {
    e.preventDefault();

    alert(
      "Showing all approved reviews..."
    );
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatReviewDate = (
    date
  ) => {
    if (!date) {
      return "";
    }

    const reviewDate =
      new Date(date);

    if (
      Number.isNaN(
        reviewDate.getTime()
      )
    ) {
      return date;
    }

    const day =
      reviewDate.getDate();

    const month =
      reviewDate.toLocaleString(
        "en-US",
        {
          month: "long",
        }
      );

    const year =
      reviewDate.getFullYear();

    const getOrdinal = (
      value
    ) => {
      if (
        value > 3 &&
        value < 21
      ) {
        return "th";
      }

      switch (
        value % 10
      ) {
        case 1:
          return "st";

        case 2:
          return "nd";

        case 3:
          return "rd";

        default:
          return "th";
      }
    };

    return `${day}${getOrdinal(
      day
    )} ${month} ${year}`;
  };

  // =====================================================
  // RENDER STARS
  // =====================================================

  const renderStars = (
    rating
  ) => {
    const stars = [];

    const numericRating =
      Number(rating) || 0;

    for (
      let i = 1;
      i <= 5;
      i++
    ) {
      if (
        i <=
        numericRating
      ) {
        stars.push(
          <FaStar
            key={i}
            className="PropertyDetailsPeopleSay-star filled"
          />
        );
      } else {
        stars.push(
          <FaRegStar
            key={i}
            className="PropertyDetailsPeopleSay-star empty"
          />
        );
      }
    }

    return stars;
  };

  // =====================================================
  // AVERAGE RATING
  // =====================================================

  const averageRating =
    allReviews.length > 0
      ? (
          allReviews.reduce(
            (
              total,
              review
            ) =>
              total +
              (Number(
                review.rating
              ) || 0),
            0
          ) /
          allReviews.length
        ).toFixed(1)
      : "0";

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="PropertyDetailsPeopleSay-wrapper">

      <div className="PropertyDetailsPeopleSay-card">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="PropertyDetailsPeopleSay-header">

          <h2 className="PropertyDetailsPeopleSay-title">
            What People Say About{" "}
            {property?.title ||
              "Us"}
          </h2>

          <div className="PropertyDetailsPeopleSay-google-logo">

            <span
              style={{
                color: "#4285F4",
              }}
            >
              G
            </span>

            <span
              style={{
                color: "#EA4335",
              }}
            >
              o
            </span>

            <span
              style={{
                color: "#FBBC05",
              }}
            >
              o
            </span>

            <span
              style={{
                color: "#4285F4",
              }}
            >
              g
            </span>

            <span
              style={{
                color: "#34A853",
              }}
            >
              l
            </span>

            <span
              style={{
                color: "#EA4335",
              }}
            >
              e
            </span>

            <span className="PropertyDetailsPeopleSay-reviews-text">
              Reviews
            </span>

          </div>

        </div>

        {/* =================================================
            SUMMARY
        ================================================= */}

        <div className="PropertyDetailsPeopleSay-summary">

          <span className="PropertyDetailsPeopleSay-summary-score">
            {averageRating}
          </span>

          <div className="PropertyDetailsPeopleSay-summary-stars">

            {renderStars(
              Math.round(
                Number(
                  averageRating
                )
              )
            )}

          </div>

          <span className="PropertyDetailsPeopleSay-summary-count">

            ({allReviews.length}{" "}

            {allReviews.length ===
            1
              ? "Review"
              : "Reviews"})

          </span>

          <a
            href="#view-all"
            onClick={
              handleViewAll
            }
            className="PropertyDetailsPeopleSay-view-all"
          >
            View All Reviews
          </a>

        </div>

        {/* =================================================
            LOADING
        ================================================= */}

        {loadingReviews ? (

          <div
            style={{
              width: "100%",
              padding:
                "30px 0",
              textAlign:
                "center",
              color: "#777",
              fontSize:
                "14px",
            }}
          >
            Loading reviews...
          </div>

        ) : allReviews.length ===
          0 ? (

          /* =================================================
             NO APPROVED REVIEWS
          ================================================= */

          <div
            style={{
              width: "100%",
              padding:
                "30px 0",
              textAlign:
                "center",
              color: "#777",
              fontSize:
                "14px",
            }}
          >
            No approved reviews yet.
          </div>

        ) : (

          <>
            {/* =================================================
                REVIEWS GRID
            ================================================= */}

            <div className="PropertyDetailsPeopleSay-grid">

              {currentReviews.map(
                (review) => {

                  const reviewerName =
                    review.name ||
                    "Anonymous";

                  const reviewerInitial =
                    reviewerName
                      .charAt(0)
                      .toUpperCase();

                  const reviewText =
                    review.review ||
                    review.text ||
                    "";

                  const adminReply =
                    review.adminReply ||
                    "";

                  return (

                    <div
                      key={
                        review._id ||
                        review.id
                      }
                      className="PropertyDetailsPeopleSay-review-item"
                    >

                      {/* =================================================
                          REVIEW HEADER
                      ================================================= */}

                      <div className="PropertyDetailsPeopleSay-review-header">

                        <div className="PropertyDetailsPeopleSay-avatar">
                          {reviewerInitial}
                        </div>

                        <div className="PropertyDetailsPeopleSay-meta">

                          <h3 className="PropertyDetailsPeopleSay-reviewer-name">
                            {reviewerName}
                          </h3>

                          <div className="PropertyDetailsPeopleSay-rating-row">

                            <div className="PropertyDetailsPeopleSay-review-stars">

                              {renderStars(
                                review.rating
                              )}

                            </div>

                            <span className="PropertyDetailsPeopleSay-date">

                              {formatReviewDate(
                                review.createdAt ||
                                  review.date
                              )}

                            </span>

                          </div>

                        </div>

                      </div>

                      {/* =================================================
                          CUSTOMER REVIEW
                      ================================================= */}

                      <p className="PropertyDetailsPeopleSay-review-text">
                        {reviewText}
                      </p>

                      {/* =================================================
                          ADMIN REPLY
                      ================================================= */}

                      {adminReply.trim() !==
                        "" && (

                        <div
                          style={{
                            marginTop:
                              "14px",
                            padding:
                              "12px 14px",
                            background:
                              "#f6f8f7",
                            borderLeft:
                              "3px solid #176634",
                            borderRadius:
                              "6px",
                          }}
                        >

                          <div
                            style={{
                              display:
                                "flex",
                              alignItems:
                                "center",
                              gap:
                                "7px",
                              marginBottom:
                                "6px",
                            }}
                          >

                            <span
                              style={{
                                fontSize:
                                  "13px",
                                fontWeight:
                                  "700",
                                color:
                                  "#176634",
                              }}
                            >
                              Response from Management
                            </span>

                          </div>

                          <p
                            style={{
                              margin:
                                "0",
                              fontSize:
                                "13px",
                              lineHeight:
                                "1.6",
                              color:
                                "#4b5563",
                            }}
                          >
                            {adminReply}
                          </p>

                          {review.repliedAt && (
                            <span
                              style={{
                                display:
                                  "block",
                                marginTop:
                                  "7px",
                                fontSize:
                                  "10px",
                                color:
                                  "#9ca3af",
                              }}
                            >
                              Replied on{" "}
                              {formatReviewDate(
                                review.repliedAt
                              )}
                            </span>
                          )}

                        </div>

                      )}

                    </div>

                  );
                }
              )}

            </div>

            {/* =================================================
                PAGINATION
            ================================================= */}

            {totalPages > 1 && (

              <div className="PropertyDetailsPeopleSay-pagination">

                <button
                  className={`PropertyDetailsPeopleSay-nav-btn ${
                    currentPage ===
                    1
                      ? "disabled"
                      : ""
                  }`}
                  onClick={
                    handlePrev
                  }
                  disabled={
                    currentPage ===
                    1
                  }
                >
                  <FaChevronLeft />
                </button>

                <button
                  className={`PropertyDetailsPeopleSay-nav-btn ${
                    currentPage ===
                    totalPages
                      ? "disabled"
                      : "active"
                  }`}
                  onClick={
                    handleNext
                  }
                  disabled={
                    currentPage ===
                    totalPages
                  }
                >
                  <FaChevronRight />
                </button>

              </div>

            )}

          </>

        )}

      </div>

    </div>
  );
};

export default PropertyDetailsPeopleSay;