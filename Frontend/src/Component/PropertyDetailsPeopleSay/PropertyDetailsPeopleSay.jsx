import { useEffect, useState } from "react";
import {
  FaStar,
  FaRegStar,
  FaChevronLeft,
  FaChevronRight,
  FaCheckCircle,
} from "react-icons/fa";
import Swal from "sweetalert2";
import "./PropertyDetailsPeopleSay.css";
import API from "../../api/Axios";

const PropertyDetailsPeopleSay = ({ property }) => {
  // =====================================================
  // REVIEWS STATE
  // =====================================================
  const [allReviews, setAllReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);

  // =====================================================
  // PAGINATION STATE
  // =====================================================
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 4;

  const propertyTitle = property?.title || property?.name || "Verified Residential Properties";

  // =====================================================
  // FETCH APPROVED REVIEWS
  // =====================================================
  useEffect(() => {
    const fetchApprovedReviews = async () => {
      try {
        setLoadingReviews(true);

        const propertyId = property?._id || property?.id;

        if (!propertyId) {
          setAllReviews([]);
          return;
        }

        const response = await API.get(
          `/property-reviews/property/${propertyId}`
        );

        const responseReviews =
          response.data?.reviews ||
          response.data?.data ||
          response.data ||
          [];

        const approvedReviews = Array.isArray(responseReviews)
          ? responseReviews.filter(
              (review) => !review.status || review.status === "Approved"
            )
          : [];

        setAllReviews(approvedReviews);
        setCurrentPage(1);
      } catch (error) {
        console.error(
          "FETCH APPROVED REVIEWS ERROR:",
          error.response?.data || error
        );
        setAllReviews([]);
      } finally {
        setLoadingReviews(false);
      }
    };

    fetchApprovedReviews();
  }, [property?._id, property?.id]);

  // =====================================================
  // PAGINATION LOGIC
  // =====================================================
  const totalPages = Math.max(1, Math.ceil(allReviews.length / reviewsPerPage));
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = allReviews.slice(indexOfFirstReview, indexOfLastReview);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // =====================================================
  // SWEETALERT2 POPUP FOR "VIEW ALL REVIEWS"
  // =====================================================
  const handleViewAll = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "<strong>Client Reviews & Testimonials</strong>",
      icon: "info",
      html: `
        <div style="text-align: left; font-size: 14px; line-height: 1.6; color: #334155;">
          <p>Showing verified customer feedback for <b>${propertyTitle}</b>.</p>
          <p>All reviews are validated by <b>Utkal Property</b> — the <i>Best Property Consultant in Bhubaneswar</i>.</p>
          <hr style="margin: 12px 0; border: none; border-top: 1px solid #e2e8f0;" />
          <p style="margin-bottom: 0;">Have a query or want to schedule a site visit? <a href="tel:+919861566735" style="color: #176634; font-weight: 600; text-decoration: underline;" autofocus>Call +91 9861566735</a></p>
        </div>
      `,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "👍 Helpful",
      confirmButtonAriaLabel: "Thumbs up, helpful!",
      confirmButtonColor: "#176634",
      cancelButtonText: "👎 Close",
      cancelButtonAriaLabel: "Thumbs down, close",
      cancelButtonColor: "#64748b"
    });
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================
  const formatReviewDate = (date) => {
    if (!date) return "";
    const reviewDate = new Date(date);
    if (Number.isNaN(reviewDate.getTime())) return date;

    const day = reviewDate.getDate();
    const month = reviewDate.toLocaleString("en-US", { month: "long" });
    const year = reviewDate.getFullYear();

    const getOrdinal = (value) => {
      if (value > 3 && value < 21) return "th";
      switch (value % 10) {
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

    return `${day}${getOrdinal(day)} ${month} ${year}`;
  };

  // =====================================================
  // RENDER STARS
  // =====================================================
  const renderStars = (rating) => {
    const stars = [];
    const numericRating = Number(rating) || 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= numericRating) {
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
            (total, review) => total + (Number(review.rating) || 0),
            0
          ) / allReviews.length
        ).toFixed(1)
      : "5.0";

  return (
    <section className="PropertyDetailsPeopleSay-wrapper" aria-labelledby="reviews-main-heading">
      <div className="PropertyDetailsPeopleSay-card">

        {/* =================================================
            SEO HEADER WITH TARGET KEYWORD IN H1 & SUBHEADING
        ================================================= */}
        <header className="PropertyDetailsPeopleSay-seo-header">
          <span className="PropertyDetailsPeopleSay-badge">
            <FaCheckCircle className="PropertyDetailsPeopleSay-badge-icon" /> Verified Client Testimonials
          </span>

          <h1 id="reviews-main-heading" className="PropertyDetailsPeopleSay-main-title">
            Best Property Consultant in Bhubaneswar – <span className="highlight-green">Customer Reviews for {propertyTitle}</span>
          </h1>

          <p className="PropertyDetailsPeopleSay-subheading">
            Read verified feedback from genuine home buyers and investors who chose <strong>Utkal Property</strong>, the <strong>Best Property Consultant in Bhubaneswar</strong>, for seamless title deed verification, transparent pricing, and RERA-approved properties.
          </p>
        </header>

        {/* =================================================
            GOOGLE RATINGS SUMMARY BAR
        ================================================= */}
        <div className="PropertyDetailsPeopleSay-header">
          <div className="PropertyDetailsPeopleSay-google-logo">
            <span style={{ color: "#4285F4" }}>G</span>
            <span style={{ color: "#EA4335" }}>o</span>
            <span style={{ color: "#FBBC05" }}>o</span>
            <span style={{ color: "#4285F4" }}>g</span>
            <span style={{ color: "#34A853" }}>l</span>
            <span style={{ color: "#EA4335" }}>e</span>
            <span className="PropertyDetailsPeopleSay-reviews-text">Verified Reviews</span>
          </div>

          <div className="PropertyDetailsPeopleSay-summary">
            <span className="PropertyDetailsPeopleSay-summary-score">
              {averageRating}
            </span>

            <div className="PropertyDetailsPeopleSay-summary-stars">
              {renderStars(Math.round(Number(averageRating)))}
            </div>

            <span className="PropertyDetailsPeopleSay-summary-count">
              ({allReviews.length} {allReviews.length === 1 ? "Review" : "Reviews"})
            </span>

            <a
              href="#view-all"
              onClick={handleViewAll}
              className="PropertyDetailsPeopleSay-view-all"
            >
              View All Reviews
            </a>
          </div>
        </div>

        {/* =================================================
            LOADING / EMPTY / GRID CONTENT
        ================================================= */}
        {loadingReviews ? (
          <div className="PropertyDetailsPeopleSay-status-message">
            Loading client reviews...
          </div>
        ) : allReviews.length === 0 ? (
          <div className="PropertyDetailsPeopleSay-status-message">
            No reviews published yet for this listing. Be the first to share your experience with the <strong>Best Property Consultant in Bhubaneswar</strong>!
          </div>
        ) : (
          <>
            {/* Reviews Grid */}
            <div className="PropertyDetailsPeopleSay-grid">
              {currentReviews.map((review) => {
                const reviewerName = review.name || "Verified Buyer";
                const reviewerInitial = reviewerName.charAt(0).toUpperCase();
                const reviewText = review.review || review.text || "";
                const adminReply = review.adminReply || "";

                return (
                  <article
                    key={review._id || review.id}
                    className="PropertyDetailsPeopleSay-review-item"
                  >
                    {/* Reviewer Meta */}
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
                            {renderStars(review.rating)}
                          </div>
                          <span className="PropertyDetailsPeopleSay-date">
                            {formatReviewDate(review.createdAt || review.date)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Review Body */}
                    <p className="PropertyDetailsPeopleSay-review-text">
                      {reviewText}
                    </p>

                    {/* Official Response */}
                    {adminReply.trim() !== "" && (
                      <div className="PropertyDetailsPeopleSay-admin-reply">
                        <div className="PropertyDetailsPeopleSay-admin-header">
                          <span className="PropertyDetailsPeopleSay-admin-title">
                            Response from Utkal Property Management
                          </span>
                        </div>
                        <p className="PropertyDetailsPeopleSay-admin-text">
                          {adminReply}
                        </p>
                        {review.repliedAt && (
                          <span className="PropertyDetailsPeopleSay-admin-date">
                            Replied on {formatReviewDate(review.repliedAt)}
                          </span>
                        )}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="PropertyDetailsPeopleSay-pagination">
                <button
                  type="button"
                  className={`PropertyDetailsPeopleSay-nav-btn ${currentPage === 1 ? "disabled" : ""}`}
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  aria-label="Previous reviews page"
                >
                  <FaChevronLeft />
                </button>

                <span className="PropertyDetailsPeopleSay-page-indicator">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  type="button"
                  className={`PropertyDetailsPeopleSay-nav-btn ${currentPage === totalPages ? "disabled" : "active"}`}
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  aria-label="Next reviews page"
                >
                  <FaChevronRight />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default PropertyDetailsPeopleSay;