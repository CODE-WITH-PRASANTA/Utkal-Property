import { useState, useEffect } from "react";

import {
  FaSwimmingPool,
  FaChild,
  FaParking,
  FaBasketballBall,
  FaTableTennis,
  FaDog,
  FaShieldAlt,
  FaVideo,
  FaCar,
  FaCarBattery,
  FaTree,
  FaToriiGate,
  FaBookOpen,
  FaDumbbell,
  FaArchway,
  FaStar,
  FaCheckCircle,
  FaDoorClosed,
  FaRegStar,
  FaExpand,
  FaTimes,
} from "react-icons/fa";

import { MdOutlineCurtains } from "react-icons/md";

import API from "../../api/Axios";

import "./PropertyDetailsAmenities.css";

// =====================================================
// BACKEND URL
// =====================================================

const BACKEND_URL = "http://localhost:5000";

// =====================================================
// AMENITY ICON MAP
// =====================================================

const AMENITY_ICON_MAP = {
  "Swimming Pool": <FaSwimmingPool />,
  "Children Play Area": <FaChild />,
  "Children's Play Area": <FaChild />,
  "Kids Play Area": <FaTableTennis />,
  "Kids' Play Area": <FaTableTennis />,
  "Conference Rooms": <FaDoorClosed />,
  "Conference Room": <FaDoorClosed />,
  "Reserved Parking": <FaParking />,
  Parking: <FaParking />,
  "Basketball Court": <FaBasketballBall />,
  "Table Tennis": <FaTableTennis />,
  "Pet Friendly": <FaDog />,
  Security: <FaShieldAlt />,
  "24x7 Security": <FaShieldAlt />,
  CCTV: <FaVideo />,
  "CCTV Camera": <FaVideo />,
  "Guest Parking": <FaCar />,
  "Multipurpose Hall": <MdOutlineCurtains />,
  "Club House": <FaCheckCircle />,
  Clubhouse: <FaCheckCircle />,
  "Power Backup": <FaCarBattery />,
  Landscape: <FaTree />,
  Garden: <FaTree />,
  "Grand Entrance": <FaToriiGate />,
  "Society Office": <FaCheckCircle />,
  Library: <FaBookOpen />,
  Gym: <FaDumbbell />,
  Gymnasium: <FaDumbbell />,
  "Indoor Game": <FaTableTennis />,
  "Indoor Games": <FaTableTennis />,
  "Banquet Hall": <FaArchway />,
};

// =====================================================
// GET AMENITY ICON
// =====================================================

const getAmenityIcon = (amenityName) => {
  if (!amenityName) {
    return <FaCheckCircle />;
  }

  // Direct match
  if (AMENITY_ICON_MAP[amenityName]) {
    return AMENITY_ICON_MAP[amenityName];
  }

  // Case-insensitive match
  const matchedKey = Object.keys(
    AMENITY_ICON_MAP
  ).find(
    (key) =>
      key.toLowerCase() ===
      String(amenityName).toLowerCase()
  );

  if (matchedKey) {
    return AMENITY_ICON_MAP[matchedKey];
  }

  // Default icon
  return <FaCheckCircle />;
};

// =====================================================
// FILE URL
// =====================================================

const getFileUrl = (filePath) => {
  if (!filePath) {
    return "";
  }

  if (
    filePath.startsWith("http://") ||
    filePath.startsWith("https://") ||
    filePath.startsWith("blob:")
  ) {
    return filePath;
  }

  if (filePath.startsWith("/")) {
    return `${BACKEND_URL}${filePath}`;
  }

  return `${BACKEND_URL}/${filePath}`;
};

// =====================================================
// PROPERTY DETAILS AMENITIES
// =====================================================

const PropertyDetailsAmenities = ({
  property,
  propertyId,
}) => {
  // =================================================
  // REVIEW
  // =================================================

  const [rating, setRating] = useState(0);

  const [hover, setHover] = useState(0);

  const [reviewForm, setReviewForm] = useState({
    name: "",
    email: "",
    phone: "",
    review: "",
  });

  const [reviewSubmitting, setReviewSubmitting] =
    useState(false);

  // =================================================
  // CONTACT
  // =================================================

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    mobile: "",
    captchaInput: "",
  });

  const [captchaCode, setCaptchaCode] =
    useState("");

  const [contactSubmitting, setContactSubmitting] =
    useState(false);

  // =================================================
  // FLOOR PLAN
  // =================================================

  const [activeTab, setActiveTab] =
    useState(0);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  // =================================================
  // GENERATE CAPTCHA
  // =================================================

  useEffect(() => {
    generateCaptcha();
  }, []);

  // =================================================
  // RESET FLOOR PLAN TAB WHEN PROPERTY CHANGES
  // =================================================

  useEffect(() => {
    setActiveTab(0);
  }, [property?._id]);

  // =================================================
  // MODAL SCROLL
  // =================================================

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  // =================================================
  // CAPTCHA
  // =================================================

  function generateCaptcha() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%";

    let result = "";

    for (let i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(
          Math.random() *
            characters.length
        )
      );
    }

    setCaptchaCode(result);
  }

  // =================================================
  // REVIEW CHANGE
  // =================================================

  const handleReviewChange = (e) => {
    const { name, value } = e.target;

    setReviewForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =================================================
  // CONTACT CHANGE
  // =================================================

  const handleContactChange = (e) => {
    const { name, value } = e.target;

    setContactForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =================================================
  // SUBMIT REVIEW
  // =================================================

  const submitReview = async (e) => {
    e.preventDefault();

    // ==============================================
    // CHECK RATING
    // ==============================================

    if (!rating) {
      alert("Please select a rating.");
      return;
    }

    // ==============================================
    // GET PROPERTY ID
    // ==============================================

    const currentPropertyId =
      propertyId ||
      property?._id ||
      property?.id;

    console.log(
      "PROPERTY DATA:",
      property
    );

    console.log(
      "PROPERTY ID:",
      currentPropertyId
    );

    // ==============================================
    // CHECK PROPERTY ID
    // ==============================================

    if (!currentPropertyId) {
      console.error(
        "PROPERTY ID NOT FOUND:",
        property
      );

      alert(
        "Property information is missing."
      );

      return;
    }

    // ==============================================
    // VALIDATE NAME
    // ==============================================

    if (!reviewForm.name.trim()) {
      alert("Please enter your name.");
      return;
    }

    // ==============================================
    // VALIDATE EMAIL
    // ==============================================

    if (!reviewForm.email.trim()) {
      alert("Please enter your email.");
      return;
    }

    // ==============================================
    // VALIDATE PHONE
    // ==============================================

    if (!reviewForm.phone.trim()) {
      alert(
        "Please enter your phone number."
      );

      return;
    }

    // ==============================================
    // VALIDATE REVIEW
    // ==============================================

    if (!reviewForm.review.trim()) {
      alert("Please write your review.");
      return;
    }

    // ==============================================
    // SUBMIT
    // ==============================================

    try {
      setReviewSubmitting(true);

      const reviewPayload = {
        propertyId: currentPropertyId,

        name:
          reviewForm.name.trim(),

        email:
          reviewForm.email
            .trim()
            .toLowerCase(),

        phone:
          reviewForm.phone.trim(),

        rating: Number(rating),

        review:
          reviewForm.review.trim(),
      };

      console.log(
        "REVIEW PAYLOAD:",
        reviewPayload
      );

      const response =
        await API.post(
          "/property-reviews",
          reviewPayload
        );

      console.log(
        "REVIEW RESPONSE:",
        response.data
      );

      alert(
        response.data?.message ||
          "Review submitted successfully."
      );

      // ==========================================
      // RESET REVIEW FORM
      // ==========================================

      setReviewForm({
        name: "",
        email: "",
        phone: "",
        review: "",
      });

      setRating(0);
      setHover(0);
    } catch (error) {
      console.error(
        "SUBMIT REVIEW ERROR:",
        error.response?.data ||
          error
      );

      alert(
        error.response?.data?.message ||
          "Failed to submit review."
      );
    } finally {
      setReviewSubmitting(false);
    }
  };

  // =================================================
  // SUBMIT CONTACT
  // =================================================

  const submitContact = async (e) => {
    e.preventDefault();

    // ==============================================
    // PREVENT DOUBLE SUBMIT
    // ==============================================

    if (contactSubmitting) {
      return;
    }

    // ==============================================
    // CAPTCHA VALIDATION
    // ==============================================

    if (
      contactForm.captchaInput.trim() !==
      captchaCode
    ) {
      alert(
        "Invalid Captcha! Please try again."
      );

      generateCaptcha();

      setContactForm((previous) => ({
        ...previous,
        captchaInput: "",
      }));

      return;
    }

    // ==============================================
    // GET CURRENT PROPERTY ID
    // ==============================================

    const currentPropertyId =
      propertyId ||
      property?._id ||
      property?.id;

    console.log(
      "================================"
    );

    console.log(
      "CONTACT PROPERTY:"
    );

    console.log(
      property
    );

    console.log(
      "CONTACT PROPERTY ID:",
      currentPropertyId
    );

    console.log(
      "================================"
    );

    // ==============================================
    // CHECK PROPERTY ID
    // ==============================================

    if (!currentPropertyId) {
      console.error(
        "CONTACT PROPERTY ID NOT FOUND:",
        property
      );

      alert(
        "Property information is missing."
      );

      return;
    }

    // ==============================================
    // VALIDATE NAME
    // ==============================================

    if (!contactForm.name.trim()) {
      alert("Please enter your name.");
      return;
    }

    // ==============================================
    // VALIDATE EMAIL
    // ==============================================

    if (!contactForm.email.trim()) {
      alert("Please enter your email.");
      return;
    }

    // ==============================================
    // VALIDATE MOBILE
    // ==============================================

    if (!contactForm.mobile.trim()) {
      alert(
        "Please enter your contact number."
      );

      return;
    }

    // ==============================================
    // MOBILE VALIDATION
    // ==============================================

    const mobileRegex =
      /^[0-9]{10}$/;

    if (
      !mobileRegex.test(
        contactForm.mobile.trim()
      )
    ) {
      alert(
        "Please enter a valid 10 digit mobile number."
      );

      return;
    }

    // ==============================================
    // EMAIL VALIDATION
    // ==============================================

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(
        contactForm.email.trim()
      )
    ) {
      alert(
        "Please enter a valid email address."
      );

      return;
    }

    // ==============================================
    // CREATE CONTACT PAYLOAD
    // ==============================================

    const contactPayload = {
      propertyId:
        currentPropertyId,

      name:
        contactForm.name.trim(),

      email:
        contactForm.email
          .trim()
          .toLowerCase(),

      mobile:
        contactForm.mobile.trim(),
    };

    console.log(
      "CONTACT PAYLOAD:",
      contactPayload
    );

    // ==============================================
    // SUBMIT CONTACT
    // ==============================================

    try {
      setContactSubmitting(true);

      const response =
        await API.post(
          "/property-contacts",
          contactPayload
        );

      console.log(
        "CONTACT RESPONSE:",
        response.data
      );

      // ==========================================
      // SUCCESS
      // ==========================================

      alert(
        response.data?.message ||
          "Contact details submitted successfully."
      );

      // ==========================================
      // RESET CONTACT FORM
      // ==========================================

      setContactForm({
        name: "",
        email: "",
        mobile: "",
        captchaInput: "",
      });

      // ==========================================
      // GENERATE NEW CAPTCHA
      // ==========================================

      generateCaptcha();
    } catch (error) {
      console.error(
        "SUBMIT CONTACT ERROR:",
        error
      );

      console.error(
        "CONTACT ERROR RESPONSE:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
          "Failed to submit contact details."
      );
    } finally {
      setContactSubmitting(false);
    }
  };

  // =================================================
  // PROPERTY NAME
  // =================================================

  const propertyName =
    property?.name ||
    property?.title ||
    "Property";

  // =================================================
  // PROPERTY AMENITIES
  // =================================================

  const propertyAmenities =
    Array.isArray(property?.amenities)
      ? property.amenities.filter(Boolean)
      : [];

  // =================================================
  // HIGHLIGHTS
  // =================================================

  const propertyHighlights =
    Array.isArray(property?.highlights)
      ? property.highlights.filter(Boolean)
      : [];

  // =================================================
  // FLOOR PLANS
  // =================================================

  const floorPlans =
    Array.isArray(property?.floorPlans)
      ? property.floorPlans
      : [];

  // =================================================
  // CURRENT FLOOR PLAN
  // =================================================

  const currentFloorPlan =
    floorPlans[activeTab] ||
    null;

  // =================================================
  // NEARBY PLACES
  // =================================================

  const nearbyPlaces =
    Array.isArray(
      property?.nearbyPlaces
    )
      ? property.nearbyPlaces
      : [];

  // =================================================
  // DOCUMENTS
  // =================================================

  const documents =
    Array.isArray(
      property?.documents
    )
      ? property.documents
      : [];

  // =================================================
  // UI
  // =================================================

  return (
    <>
      <div className="PropertyDetailsAmenities-wrapper">

        <div className="PropertyDetailsAmenities-main-layout">

          {/* =================================
              LEFT COLUMN
          ================================= */}

          <div className="PropertyDetailsAmenities-left-col">

            {/* ===============================
                1. AMENITIES
            =============================== */}

            <div className="PropertyDetailsAmenities-section-header">

              <h2 className="PropertyDetailsAmenities-title">
                Amenities {propertyName}
              </h2>

              <div className="PropertyDetailsAmenities-underline"></div>

            </div>

            <div className="PropertyDetailsAmenities-card">

              <div className="PropertyDetailsAmenities-grid">

                {propertyAmenities.length > 0 ? (

                  propertyAmenities.map(
                    (amenity, index) => {

                      const amenityName =
                        typeof amenity ===
                        "string"
                          ? amenity
                          : amenity?.name ||
                            amenity?.title ||
                            "";

                      if (!amenityName) {
                        return null;
                      }

                      return (
                        <div
                          key={
                            amenityName +
                            index
                          }
                          className="PropertyDetailsAmenities-grid-item active"
                        >

                          <div className="PropertyDetailsAmenities-icon">

                            {getAmenityIcon(
                              amenityName
                            )}

                          </div>

                          <span className="PropertyDetailsAmenities-name">
                            {amenityName}
                          </span>

                        </div>
                      );
                    }
                  )

                ) : (

                  <p>
                    No amenities available
                    for this property.
                  </p>

                )}

              </div>

            </div>


            {/* ===============================
                2. KEY FEATURES
            =============================== */}

            <div
              className="PropertyDetailsAmenities-section-header"
              style={{
                marginTop: "30px",
              }}
            >

              <h2 className="PropertyDetailsAmenities-title">
                Key Features {propertyName}
              </h2>

              <div className="PropertyDetailsAmenities-underline"></div>

            </div>

            <div className="PropertyDetailsAmenities-card">

              <div className="PropertyDetailsAmenities-features-container">

                {propertyHighlights.length > 0 ? (

                  propertyHighlights.map(
                    (feature, index) => (

                      <div
                        key={index}
                        className="PropertyDetailsAmenities-feature-pill"
                      >

                        <FaRegStar className="PropertyDetailsAmenities-feature-icon" />

                        {feature}

                      </div>

                    )
                  )

                ) : (

                  <p>
                    No key features available.
                  </p>

                )}

              </div>

            </div>


            {/* ===============================
                3. FLOOR PLANS & DOCUMENTS
            =============================== */}

            <div
              className="PropertyDetailsAmenities-section-header"
              style={{
                marginTop: "30px",
              }}
            >

              <h2 className="PropertyDetailsAmenities-title">
                Floor Plans & Documents
              </h2>

              <div className="PropertyDetailsAmenities-underline"></div>

            </div>

            <div className="PropertyDetailsAmenities-card PropertyDetailsAmenities-floor-plan-card">

              {/* =============================
                  FLOOR PLAN TABS
              ============================= */}

              {floorPlans.length > 0 && (

                <div className="PropertyDetailsAmenities-tabs">

                  {floorPlans.map(
                    (plan, index) => (

                      <div
                        key={
                          plan._id ||
                          index
                        }
                        className={`PropertyDetailsAmenities-tab ${
                          activeTab === index
                            ? "active"
                            : ""
                        }`}
                        onClick={() =>
                          setActiveTab(
                            index
                          )
                        }
                      >

                        {plan.planTitle ||
                          plan.planType ||
                          `Plan ${index + 1}`}

                      </div>

                    )
                  )}

                </div>

              )}

              {/* =============================
                  CURRENT FLOOR PLAN
              ============================= */}

              {currentFloorPlan ? (

                <div className="PropertyDetailsAmenities-tab-content">

                  <h3 className="PropertyDetailsAmenities-content-title">

                    {currentFloorPlan.planTitle ||
                      currentFloorPlan.planType ||
                      "Floor Plan"}

                  </h3>

                  <div className="PropertyDetailsAmenities-stats-row">

                    <span>
                      <strong>Bed:</strong>{" "}
                      {currentFloorPlan.beds ??
                        0}
                    </span>

                    <span>
                      <strong>Bath:</strong>{" "}
                      {currentFloorPlan.baths ??
                        0}
                    </span>

                    <span>
                      <strong>Balconies:</strong>{" "}
                      {currentFloorPlan.balconies ??
                        0}
                    </span>

                    <span>
                      <strong>Puja:</strong>{" "}
                      {currentFloorPlan.pujaRoom ??
                        0}
                    </span>

                    <span>
                      <strong>Servant:</strong>{" "}
                      {currentFloorPlan.servantRoom ??
                        0}
                    </span>

                    <span>
                      <strong>Store:</strong>{" "}
                      {currentFloorPlan.storeRoom ??
                        0}
                    </span>

                    <span>
                      <strong>SBA:</strong>{" "}
                      {currentFloorPlan.sbaSqft ??
                        0}{" "}
                      sqft
                    </span>

                    <span>
                      <strong>Plot:</strong>{" "}
                      {currentFloorPlan.plotSqft ??
                        0}{" "}
                      sqft
                    </span>

                  </div>

                  {/* =========================
                      FLOOR PLAN IMAGE
                  ========================= */}

                  {currentFloorPlan.floorPlanSketch && (

                    <div className="PropertyDetailsAmenities-floor-image-container">

                      <img
                        src={getFileUrl(
                          currentFloorPlan.floorPlanSketch
                        )}
                        alt={
                          currentFloorPlan.planTitle ||
                          "Floor Plan"
                        }
                        className="PropertyDetailsAmenities-floor-image"
                        onClick={() =>
                          setIsModalOpen(
                            true
                          )
                        }
                        style={{
                          cursor: "pointer",
                        }}
                      />

                      <button
                        className="PropertyDetailsAmenities-fullscreen-btn"
                        onClick={() =>
                          setIsModalOpen(
                            true
                          )
                        }
                      >

                        <FaExpand />

                        View Full Screen

                      </button>

                    </div>

                  )}

                </div>

              ) : (

                <div className="PropertyDetailsAmenities-tab-content">

                  <p>
                    No floor plans available
                    for this property.
                  </p>

                </div>

              )}

              {/* =============================
                  DOCUMENTS
              ============================= */}

              {documents.length > 0 && (

                <div
                  className="PropertyDetailsAmenities-features-container"
                  style={{
                    marginTop: "20px",
                  }}
                >

                  {documents.map(
                    (document, index) => (

                      <a
                        key={
                          document._id ||
                          index
                        }
                        href={getFileUrl(
                          document.file
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="PropertyDetailsAmenities-feature-pill"
                      >

                        <FaBookOpen className="PropertyDetailsAmenities-feature-icon" />

                        {document.originalName ||
                          `Document ${index + 1}`}

                      </a>

                    )
                  )}

                </div>

              )}

            </div>


            {/* ===============================
                4. NEARBY PLACES
            =============================== */}

            <div
              className="PropertyDetailsAmenities-section-header"
              style={{
                marginTop: "30px",
              }}
            >

              <h2 className="PropertyDetailsAmenities-title">

                Explore Neighbourhood -{" "}

                {propertyName}

              </h2>

              <div className="PropertyDetailsAmenities-underline"></div>

            </div>

            <div className="PropertyDetailsAmenities-card">

              <div className="PropertyDetailsAmenities-neighbourhood-grid">

                {nearbyPlaces.length > 0 ? (

                  nearbyPlaces.map(
                    (item, index) => (

                      <div
                        key={
                          item._id ||
                          item.id ||
                          index
                        }
                        className="PropertyDetailsAmenities-neighbourhood-item"
                      >

                        <div className="PropertyDetailsAmenities-neighbourhood-inner">

                          <span className="PropertyDetailsAmenities-neighbourhood-title">

                            {item.category ||
                              item.name ||
                              "Nearby Place"}

                          </span>

                          <span className="PropertyDetailsAmenities-neighbourhood-desc">

                            {item.name &&
                            item.category
                              ? `${item.name} - `
                              : ""}

                            {item.distance ||
                              `${item.distanceValue || 0} ${
                                item.unit ||
                                "Km"
                              }`}

                          </span>

                        </div>

                      </div>

                    )
                  )

                ) : (

                  <p>
                    No nearby places available.
                  </p>

                )}

              </div>

            </div>

          </div>


          {/* =================================
              RIGHT COLUMN
          ================================= */}

          <div className="PropertyDetailsAmenities-right-col">

            {/* ===============================
                RATE & REVIEW
            =============================== */}

            <div className="PropertyDetailsAmenities-sidebar-card">

              <h3 className="PropertyDetailsAmenities-sidebar-title">
                Rate & Review
              </h3>

              {/* =================================
                  STAR RATING
              ================================= */}

              <div className="PropertyDetailsAmenities-stars-container">

                {[...Array(5)].map(
                  (_, index) => {

                    const ratingValue =
                      index + 1;

                    return (
                      <label
                        key={index}
                        className="PropertyDetailsAmenities-star-label"
                      >

                        <input
                          type="radio"
                          name="rating"
                          value={
                            ratingValue
                          }
                          checked={
                            rating ===
                            ratingValue
                          }
                          onChange={() =>
                            setRating(
                              ratingValue
                            )
                          }
                          className="PropertyDetailsAmenities-radio-input"
                        />

                        <FaStar
                          className="PropertyDetailsAmenities-star"
                          color={
                            ratingValue <=
                            (hover ||
                              rating)
                              ? "#176634"
                              : "#d3d3d3"
                          }
                          size={24}
                          onMouseEnter={() =>
                            setHover(
                              ratingValue
                            )
                          }
                          onMouseLeave={() =>
                            setHover(0)
                          }
                        />

                      </label>
                    );
                  }
                )}

              </div>


              {/* =================================
                  SELECTED RATING
              ================================= */}

              {rating > 0 && (

                <div className="PropertyDetailsAmenities-rating-text">

                  You selected{" "}

                  {rating}{" "}

                  {rating === 1
                    ? "star"
                    : "stars"}

                </div>

              )}


              {/* =================================
                  REVIEW FORM
              ================================= */}

              <form
                onSubmit={
                  submitReview
                }
                className="PropertyDetailsAmenities-form"
              >

                {/* NAME */}

                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  value={
                    reviewForm.name
                  }
                  onChange={
                    handleReviewChange
                  }
                  className="PropertyDetailsAmenities-input"
                  required
                />


                {/* EMAIL */}

                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  value={
                    reviewForm.email
                  }
                  onChange={
                    handleReviewChange
                  }
                  className="PropertyDetailsAmenities-input"
                  required
                />


                {/* PHONE */}

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter Your Phone"
                  value={
                    reviewForm.phone
                  }
                  onChange={
                    handleReviewChange
                  }
                  className="PropertyDetailsAmenities-input"
                  required
                />


                {/* REVIEW */}

                <textarea
                  name="review"
                  placeholder="Write your review..."
                  value={
                    reviewForm.review
                  }
                  onChange={
                    handleReviewChange
                  }
                  className="PropertyDetailsAmenities-textarea"
                  rows="4"
                  maxLength={1000}
                  required
                ></textarea>


                {/* CHARACTER COUNT */}

                <div className="PropertyDetailsAmenities-review-count">

                  {
                    reviewForm.review
                      .length
                  }

                  /1000

                </div>


                {/* SUBMIT */}

                <button
                  type="submit"
                  className="PropertyDetailsAmenities-submit-btn"
                  disabled={
                    reviewSubmitting
                  }
                >

                  {reviewSubmitting ? (

                    <>
                      <span className="PropertyDetailsAmenities-button-spinner" />

                      Submitting...
                    </>

                  ) : (

                    "Submit Review"

                  )}

                </button>

              </form>

            </div>


            {/* ===============================
                CONTACT FORM
            =============================== */}

            <div className="PropertyDetailsAmenities-sidebar-card">

              <p className="PropertyDetailsAmenities-contact-heading">

                Kindly fill in your details
                to view the contact number.

              </p>

              <form
                onSubmit={
                  submitContact
                }
                className="PropertyDetailsAmenities-contact-form"
              >

                {/* NAME */}

                <div className="PropertyDetailsAmenities-input-group">

                  <label>
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={
                      contactForm.name
                    }
                    onChange={
                      handleContactChange
                    }
                    className="PropertyDetailsAmenities-input"
                    required
                  />

                </div>


                {/* EMAIL */}

                <div className="PropertyDetailsAmenities-input-group">

                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={
                      contactForm.email
                    }
                    onChange={
                      handleContactChange
                    }
                    className="PropertyDetailsAmenities-input"
                    required
                  />

                </div>


                {/* MOBILE */}

                <div className="PropertyDetailsAmenities-input-group">

                  <label>
                    Mobile
                  </label>

                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Enter your contact number"
                    value={
                      contactForm.mobile
                    }
                    onChange={
                      handleContactChange
                    }
                    className="PropertyDetailsAmenities-input"
                    required
                  />

                </div>


                {/* CAPTCHA */}

                <div className="PropertyDetailsAmenities-input-group">

                  <label>
                    Captcha
                  </label>

                  <div className="PropertyDetailsAmenities-captcha-row">

                    <div className="PropertyDetailsAmenities-captcha-box">

                      {captchaCode}

                    </div>

                    <button
                      type="button"
                      onClick={
                        generateCaptcha
                      }
                      className="PropertyDetailsAmenities-refresh-btn"
                    >
                      Refresh
                    </button>

                  </div>

                </div>


                {/* ENTER CAPTCHA */}

                <div className="PropertyDetailsAmenities-input-group">

                  <label>
                    Enter Captcha
                  </label>

                  <input
                    type="text"
                    name="captchaInput"
                    placeholder="Enter the text"
                    value={
                      contactForm.captchaInput
                    }
                    onChange={
                      handleContactChange
                    }
                    className="PropertyDetailsAmenities-input"
                    required
                  />

                </div>


                {/* SUBMIT */}

                <button
                  type="submit"
                  className="PropertyDetailsAmenities-submit-btn"
                  style={{
                    marginTop: "10px",
                  }}
                  disabled={
                    contactSubmitting
                  }
                >

                  {contactSubmitting
                    ? "Submitting..."
                    : "Submit"}

                </button>

              </form>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================
          FULL SCREEN FLOOR PLAN MODAL
      ===================================== */}

      {isModalOpen &&
        currentFloorPlan &&
        currentFloorPlan.floorPlanSketch && (

          <div
            className="PropertyDetailsAmenities-modal-overlay"
            onClick={() =>
              setIsModalOpen(false)
            }
          >

            <div
              className="PropertyDetailsAmenities-modal-content"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <button
                className="PropertyDetailsAmenities-modal-close"
                onClick={() =>
                  setIsModalOpen(false)
                }
              >

                <FaTimes />

              </button>

              <h3 className="PropertyDetailsAmenities-modal-title">

                {currentFloorPlan.planTitle ||
                  currentFloorPlan.planType ||
                  "Floor Plan"}

              </h3>

              <img
                src={getFileUrl(
                  currentFloorPlan.floorPlanSketch
                )}
                alt={
                  currentFloorPlan.planTitle ||
                  "Floor Plan"
                }
                className="PropertyDetailsAmenities-modal-image"
              />

            </div>

          </div>

        )}

    </>
  );
};

export default PropertyDetailsAmenities;