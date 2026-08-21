import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  FaStar,
  FaCheck,
  FaTimes,
  FaTrash,
  FaReply,
  FaSearch,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaFilter,
  FaSyncAlt,
} from "react-icons/fa";

import API from "../../api/Axios";

import "./AdminPropertyReviews.css";

const AdminPropertyReviews = () => {
  // =====================================================
  // STATES
  // =====================================================

  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] =
    useState(false);

  const [refreshing, setRefreshing] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [selectedReview, setSelectedReview] =
    useState(null);

  const [replyText, setReplyText] =
    useState("");

  const [showReplyBox, setShowReplyBox] =
    useState(false);

  const [showDetails, setShowDetails] =
    useState(false);

  const [processingId, setProcessingId] =
    useState(null);

  const [currentPage, setCurrentPage] =
    useState(1);

  const [itemsPerPage] = useState(10);

  // =====================================================
  // FETCH REVIEWS
  // =====================================================

  const fetchReviews = async (
    showLoader = true
  ) => {
    try {
      if (showLoader) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      const response =
        await API.get(
          "/property-reviews/admin/all"
        );

      console.log(
        "ADMIN REVIEWS:",
        response.data
      );

      const responseReviews =
        response.data?.reviews ||
        response.data?.data ||
        [];

      if (Array.isArray(responseReviews)) {
        setReviews(responseReviews);
      } else {
        setReviews([]);
      }

    } catch (error) {
      console.error(
        "FETCH ADMIN REVIEWS ERROR:",
        error.response?.data ||
          error
      );

      setReviews([]);

      alert(
        error.response?.data?.message ||
          "Failed to load reviews."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    fetchReviews();
  }, []);

  // =====================================================
  // FILTER REVIEWS
  // =====================================================

  const filteredReviews = useMemo(() => {
    const searchValue =
      search.trim().toLowerCase();

    return reviews.filter(
      (review) => {
        const matchesStatus =
          statusFilter === "All" ||
          review.status ===
            statusFilter;

        if (!matchesStatus) {
          return false;
        }

        if (!searchValue) {
          return true;
        }

        const propertyName =
          review.propertyId?.name ||
          review.propertyId?.title ||
          "";

        return (
          review.name
            ?.toLowerCase()
            .includes(searchValue) ||

          review.email
            ?.toLowerCase()
            .includes(searchValue) ||

          review.phone
            ?.toLowerCase()
            .includes(searchValue) ||

          review.review
            ?.toLowerCase()
            .includes(searchValue) ||

          propertyName
            .toLowerCase()
            .includes(searchValue)
        );
      }
    );
  }, [
    reviews,
    search,
    statusFilter,
  ]);

  // =====================================================
  // PAGINATION
  // =====================================================

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredReviews.length /
        itemsPerPage
    )
  );

  const startIndex =
    (currentPage - 1) *
    itemsPerPage;

  const currentReviews =
    filteredReviews.slice(
      startIndex,
      startIndex + itemsPerPage
    );

  // =====================================================
  // RESET PAGE WHEN FILTER CHANGES
  // =====================================================

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    statusFilter,
  ]);

  // =====================================================
  // COUNTS
  // =====================================================

  const pendingCount =
    reviews.filter(
      (item) =>
        item.status === "Pending"
    ).length;

  const approvedCount =
    reviews.filter(
      (item) =>
        item.status === "Approved"
    ).length;

  const rejectedCount =
    reviews.filter(
      (item) =>
        item.status === "Rejected"
    ).length;

  // =====================================================
  // UPDATE STATUS
  // =====================================================

  const updateReviewStatus = async (
    reviewId,
    status
  ) => {
    try {
      setProcessingId(reviewId);

      const response =
        await API.put(
          `/property-reviews/admin/${reviewId}/status`,
          {
            status,
          }
        );

      console.log(
        "STATUS UPDATE:",
        response.data
      );

      setReviews((previous) =>
        previous.map((review) =>
          review._id === reviewId
            ? {
                ...review,
                status,
              }
            : review
        )
      );

      if (
        selectedReview?._id ===
        reviewId
      ) {
        setSelectedReview(
          (previous) =>
            previous
              ? {
                  ...previous,
                  status,
                }
              : null
        );
      }

    } catch (error) {
      console.error(
        "UPDATE STATUS ERROR:",
        error.response?.data ||
          error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update review."
      );
    } finally {
      setProcessingId(null);
    }
  };

  // =====================================================
  // APPROVE
  // =====================================================

  const handleApprove = async (
    review
  ) => {
    await updateReviewStatus(
      review._id,
      "Approved"
    );
  };

  // =====================================================
  // REJECT
  // =====================================================

  const handleReject = async (
    review
  ) => {
    await updateReviewStatus(
      review._id,
      "Rejected"
    );
  };

  // =====================================================
  // SET PENDING
  // =====================================================

  const handlePending = async (
    review
  ) => {
    await updateReviewStatus(
      review._id,
      "Pending"
    );
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (
    review
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this review?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setProcessingId(review._id);

      const response =
        await API.delete(
          `/property-reviews/admin/${review._id}`
        );

      console.log(
        "DELETE REVIEW:",
        response.data
      );

      setReviews((previous) =>
        previous.filter(
          (item) =>
            item._id !==
            review._id
        )
      );

      if (
        selectedReview?._id ===
        review._id
      ) {
        closeDetails();
      }

    } catch (error) {
      console.error(
        "DELETE REVIEW ERROR:",
        error.response?.data ||
          error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete review."
      );
    } finally {
      setProcessingId(null);
    }
  };

  // =====================================================
  // REPLY
  // =====================================================

  const handleReply = async () => {
    if (
      !selectedReview?._id
    ) {
      return;
    }

    if (!replyText.trim()) {
      alert(
        "Please enter a reply."
      );

      return;
    }

    try {
      setProcessingId(
        selectedReview._id
      );

      const response =
        await API.put(
          `/property-reviews/admin/${selectedReview._id}/reply`,
          {
            adminReply:
              replyText.trim(),
          }
        );

      console.log(
        "REPLY RESPONSE:",
        response.data
      );

      const updatedReview =
        response.data?.review;

      setReviews((previous) =>
        previous.map((review) =>
          review._id ===
          selectedReview._id
            ? {
                ...review,
                ...(updatedReview ||
                  {}),
                adminReply:
                  replyText.trim(),
                repliedAt:
                  new Date().toISOString(),
              }
            : review
        )
      );

      setSelectedReview(
        (previous) =>
          previous
            ? {
                ...previous,
                ...(updatedReview ||
                  {}),
                adminReply:
                  replyText.trim(),
                repliedAt:
                  new Date().toISOString(),
              }
            : null
      );

      setReplyText("");
      setShowReplyBox(false);

      alert(
        response.data?.message ||
          "Reply added successfully."
      );

    } catch (error) {
      console.error(
        "REPLY ERROR:",
        error.response?.data ||
          error
      );

      alert(
        error.response?.data?.message ||
          "Failed to add reply."
      );
    } finally {
      setProcessingId(null);
    }
  };

  // =====================================================
  // OPEN DETAILS
  // =====================================================

  const openDetails = (
    review
  ) => {
    setSelectedReview(review);

    setReplyText(
      review.adminReply ||
        ""
    );

    setShowDetails(true);

    setShowReplyBox(false);
  };

  // =====================================================
  // CLOSE DETAILS
  // =====================================================

  const closeDetails = () => {
    setSelectedReview(null);

    setShowDetails(false);

    setShowReplyBox(false);

    setReplyText("");
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (
    date
  ) => {
    if (!date) {
      return "-";
    }

    return new Date(
      date
    ).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // FORMAT TIME
  // =====================================================

  const formatTime = (
    date
  ) => {
    if (!date) {
      return "";
    }

    return new Date(
      date
    ).toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  // =====================================================
  // PROPERTY NAME
  // =====================================================

  const getPropertyName = (
    review
  ) => {
    return (
      review?.propertyId?.name ||
      review?.propertyId?.title ||
      "Property"
    );
  };

  // =====================================================
  // STAR DISPLAY
  // =====================================================

  const renderStars = (
    value
  ) => {
    const rating =
      Number(value) || 0;

    return (
      <div className="admin-review-stars">

        {[1, 2, 3, 4, 5].map(
          (star) => (
            <FaStar
              key={star}
              className={
                star <= rating
                  ? "admin-review-star-filled"
                  : "admin-review-star-empty"
              }
            />
          )
        )}

      </div>
    );
  };

  // =====================================================
  // STATUS CLASS
  // =====================================================

  const getStatusClass = (
    status
  ) => {
    if (
      status === "Approved"
    ) {
      return "admin-review-status-approved";
    }

    if (
      status === "Rejected"
    ) {
      return "admin-review-status-rejected";
    }

    return "admin-review-status-pending";
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="admin-review-panel">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="admin-review-page-header">

        <div>
          <h1 className="admin-review-page-title">
            Property Reviews
          </h1>

          <p className="admin-review-page-description">
            Manage customer reviews,
            approve feedback and
            respond to customers.
          </p>
        </div>

        <button
          type="button"
          className="admin-review-refresh-button"
          onClick={() =>
            fetchReviews(false)
          }
          disabled={refreshing}
        >
          <FaSyncAlt
            className={
              refreshing
                ? "admin-review-refresh-spin"
                : ""
            }
          />

          Refresh
        </button>

      </div>


      {/* =================================================
          STATISTICS
      ================================================= */}

      <div className="admin-review-stat-grid">

        <div className="admin-review-stat-card">

          <div className="admin-review-stat-icon admin-review-stat-icon-total">
            <FaEye />
          </div>

          <div>
            <span className="admin-review-stat-label">
              Total Reviews
            </span>

            <strong className="admin-review-stat-number">
              {reviews.length}
            </strong>
          </div>

        </div>


        <div className="admin-review-stat-card">

          <div className="admin-review-stat-icon admin-review-stat-icon-pending">
            <FaClock />
          </div>

          <div>
            <span className="admin-review-stat-label">
              Pending
            </span>

            <strong className="admin-review-stat-number">
              {pendingCount}
            </strong>
          </div>

        </div>


        <div className="admin-review-stat-card">

          <div className="admin-review-stat-icon admin-review-stat-icon-approved">
            <FaCheck />
          </div>

          <div>
            <span className="admin-review-stat-label">
              Approved
            </span>

            <strong className="admin-review-stat-number">
              {approvedCount}
            </strong>
          </div>

        </div>


        <div className="admin-review-stat-card">

          <div className="admin-review-stat-icon admin-review-stat-icon-rejected">
            <FaTimes />
          </div>

          <div>
            <span className="admin-review-stat-label">
              Rejected
            </span>

            <strong className="admin-review-stat-number">
              {rejectedCount}
            </strong>
          </div>

        </div>

      </div>


      {/* =================================================
          FILTER BAR
      ================================================= */}

      <div className="admin-review-filter-card">

        <div className="admin-review-search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search by name, email, property or review..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>


        <div className="admin-review-status-filter">

          <FaFilter />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
          >
            <option value="All">
              All Reviews
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Approved">
              Approved
            </option>

            <option value="Rejected">
              Rejected
            </option>

          </select>

        </div>

      </div>


      {/* =================================================
          REVIEW TABLE
      ================================================= */}

      <div className="admin-review-table-card">

        {loading ? (

          <div className="admin-review-loading">

            <div className="admin-review-loader" />

            <span>
              Loading reviews...
            </span>

          </div>

        ) : currentReviews.length ===
          0 ? (

          <div className="admin-review-empty">

            <div className="admin-review-empty-icon">
              <FaStar />
            </div>

            <h3>
              No reviews found
            </h3>

            <p>
              There are no reviews
              matching your current
              filter.
            </p>

          </div>

        ) : (

          <div className="admin-review-table-wrapper">

            <table className="admin-review-table">

              <thead>

                <tr>

                  <th>
                    Customer
                  </th>

                  <th>
                    Property
                  </th>

                  <th>
                    Rating
                  </th>

                  <th>
                    Review
                  </th>

                  <th>
                    Date
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {currentReviews.map(
                  (review) => (

                    <tr
                      key={
                        review._id
                      }
                    >

                      {/* CUSTOMER */}

                      <td>

                        <div className="admin-review-customer">

                          <div className="admin-review-avatar">
                            {review.name
                              ?.charAt(
                                0
                              )
                              ?.toUpperCase() ||
                              "U"}
                          </div>

                          <div>

                            <strong>
                              {review.name ||
                                "Unknown"}
                            </strong>

                            <span>
                              {review.email}
                            </span>

                          </div>

                        </div>

                      </td>


                      {/* PROPERTY */}

                      <td>

                        <div className="admin-review-property">

                          <FaBuilding />

                          <span>
                            {getPropertyName(
                              review
                            )}
                          </span>

                        </div>

                      </td>


                      {/* RATING */}

                      <td>

                        <div className="admin-review-rating-cell">

                          {renderStars(
                            review.rating
                          )}

                          <span>
                            {review.rating}/5
                          </span>

                        </div>

                      </td>


                      {/* REVIEW */}

                      <td>

                        <div className="admin-review-text">

                          {review.review}

                        </div>

                      </td>


                      {/* DATE */}

                      <td>

                        <div className="admin-review-date">

                          <span>
                            {formatDate(
                              review.createdAt
                            )}
                          </span>

                          <small>
                            {formatTime(
                              review.createdAt
                            )}
                          </small>

                        </div>

                      </td>


                      {/* STATUS */}

                      <td>

                        <span
                          className={`admin-review-status ${getStatusClass(
                            review.status
                          )}`}
                        >
                          {review.status ||
                            "Pending"}
                        </span>

                      </td>


                      {/* ACTIONS */}

                      <td>

                        <div className="admin-review-actions">

                          <button
                            type="button"
                            className="admin-review-action-view"
                            title="View Review"
                            onClick={() =>
                              openDetails(
                                review
                              )
                            }
                          >
                            <FaEye />
                          </button>


                          {review.status !==
                            "Approved" && (

                            <button
                              type="button"
                              className="admin-review-action-approve"
                              title="Approve"
                              disabled={
                                processingId ===
                                review._id
                              }
                              onClick={() =>
                                handleApprove(
                                  review
                                )
                              }
                            >
                              <FaCheck />
                            </button>

                          )}


                          {review.status !==
                            "Rejected" && (

                            <button
                              type="button"
                              className="admin-review-action-reject"
                              title="Reject"
                              disabled={
                                processingId ===
                                review._id
                              }
                              onClick={() =>
                                handleReject(
                                  review
                                )
                              }
                            >
                              <FaTimes />
                            </button>

                          )}


                          <button
                            type="button"
                            className="admin-review-action-delete"
                            title="Delete"
                            disabled={
                              processingId ===
                              review._id
                            }
                            onClick={() =>
                              handleDelete(
                                review
                              )
                            }
                          >
                            <FaTrash />
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {/* =================================================
          PAGINATION
      ================================================= */}

      {!loading &&
        filteredReviews.length >
          0 && (

          <div className="admin-review-pagination">

            <span>
              Showing{" "}
              {startIndex + 1}-
              {Math.min(
                startIndex +
                  itemsPerPage,
                filteredReviews.length
              )}{" "}
              of{" "}
              {filteredReviews.length}
            </span>

            <div className="admin-review-pagination-buttons">

              <button
                type="button"
                disabled={
                  currentPage === 1
                }
                onClick={() =>
                  setCurrentPage(
                    (previous) =>
                      Math.max(
                        previous - 1,
                        1
                      )
                  )
                }
              >
                <FaChevronLeft />
              </button>

              <span>
                {currentPage} /{" "}
                {totalPages}
              </span>

              <button
                type="button"
                disabled={
                  currentPage >=
                  totalPages
                }
                onClick={() =>
                  setCurrentPage(
                    (previous) =>
                      Math.min(
                        previous + 1,
                        totalPages
                      )
                  )
                }
              >
                <FaChevronRight />
              </button>

            </div>

          </div>

        )}


      {/* =================================================
          DETAILS MODAL
      ================================================= */}

      {showDetails &&
        selectedReview && (

          <div
            className="admin-review-modal-overlay"
            onClick={
              closeDetails
            }
          >

            <div
              className="admin-review-modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              {/* MODAL HEADER */}

              <div className="admin-review-modal-header">

                <div>

                  <h2>
                    Review Details
                  </h2>

                  <p>
                    {getPropertyName(
                      selectedReview
                    )}
                  </p>

                </div>

                <button
                  type="button"
                  className="admin-review-modal-close"
                  onClick={
                    closeDetails
                  }
                >
                  <FaTimes />
                </button>

              </div>


              {/* CUSTOMER */}

              <div className="admin-review-detail-customer">

                <div className="admin-review-detail-avatar">
                  {selectedReview.name
                    ?.charAt(
                      0
                    )
                    ?.toUpperCase() ||
                    "U"}
                </div>

                <div>

                  <h3>
                    {selectedReview.name}
                  </h3>

                  <p>
                    {selectedReview.email}
                  </p>

                </div>

              </div>


              {/* CONTACT */}

              <div className="admin-review-contact-grid">

                <div>

                  <FaEnvelope />

                  <span>
                    {selectedReview.email ||
                      "-"}
                  </span>

                </div>

                <div>

                  <FaPhone />

                  <span>
                    {selectedReview.phone ||
                      "-"}
                  </span>

                </div>

              </div>


              {/* RATING */}

              <div className="admin-review-detail-rating">

                <span>
                  Rating
                </span>

                {renderStars(
                  selectedReview.rating
                )}

                <strong>
                  {selectedReview.rating}/5
                </strong>

              </div>


              {/* STATUS */}

              <div className="admin-review-detail-status-row">

                <span>
                  Status
                </span>

                <span
                  className={`admin-review-status ${getStatusClass(
                    selectedReview.status
                  )}`}
                >
                  {selectedReview.status}
                </span>

              </div>


              {/* REVIEW */}

              <div className="admin-review-detail-content">

                <h4>
                  Customer Review
                </h4>

                <p>
                  {selectedReview.review}
                </p>

              </div>


              {/* ADMIN REPLY */}

              {selectedReview.adminReply && (

                <div className="admin-review-existing-reply">

                  <div>

                    <FaReply />

                    <strong>
                      Admin Reply
                    </strong>

                  </div>

                  <p>
                    {selectedReview.adminReply}
                  </p>

                  {selectedReview.repliedAt && (
                    <small>
                      Replied on{" "}
                      {formatDate(
                        selectedReview.repliedAt
                      )}
                    </small>
                  )}

                </div>

              )}


              {/* REPLY BOX */}

              {showReplyBox && (

                <div className="admin-review-reply-box">

                  <label>
                    Reply to customer
                  </label>

                  <textarea
                    value={
                      replyText
                    }
                    onChange={(e) =>
                      setReplyText(
                        e.target.value
                      )
                    }
                    placeholder="Write your response..."
                    rows="4"
                    maxLength={1000}
                  />

                  <div className="admin-review-reply-actions">

                    <button
                      type="button"
                      className="admin-review-cancel-button"
                      onClick={() => {
                        setShowReplyBox(
                          false
                        );

                        setReplyText(
                          selectedReview.adminReply ||
                            ""
                        );
                      }}
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      className="admin-review-send-button"
                      disabled={
                        processingId ===
                        selectedReview._id
                      }
                      onClick={
                        handleReply
                      }
                    >
                      <FaReply />

                      {processingId ===
                      selectedReview._id
                        ? "Sending..."
                        : "Send Reply"}
                    </button>

                  </div>

                </div>

              )}


              {/* ACTIONS */}

              <div className="admin-review-modal-actions">

                {selectedReview.status !==
                  "Approved" && (

                  <button
                    type="button"
                    className="admin-review-modal-approve"
                    disabled={
                      processingId ===
                      selectedReview._id
                    }
                    onClick={() =>
                      handleApprove(
                        selectedReview
                      )
                    }
                  >
                    <FaCheck />

                    Approve Review
                  </button>

                )}


                {selectedReview.status !==
                  "Rejected" && (

                  <button
                    type="button"
                    className="admin-review-modal-reject"
                    disabled={
                      processingId ===
                      selectedReview._id
                    }
                    onClick={() =>
                      handleReject(
                        selectedReview
                      )
                    }
                  >
                    <FaTimes />

                    Reject
                  </button>

                )}

                <button
                  type="button"
                  className="admin-review-modal-reply"
                  onClick={() =>
                    setShowReplyBox(
                      (previous) =>
                        !previous
                    )
                  }
                >
                  <FaReply />

                  {selectedReview.adminReply
                    ? "Edit Reply"
                    : "Reply"}
                </button>

                <button
                  type="button"
                  className="admin-review-modal-delete"
                  disabled={
                    processingId ===
                    selectedReview._id
                  }
                  onClick={() =>
                    handleDelete(
                      selectedReview
                    )
                  }
                >
                  <FaTrash />

                  Delete
                </button>

              </div>

            </div>

          </div>

        )}

    </div>
  );
};

export default AdminPropertyReviews;