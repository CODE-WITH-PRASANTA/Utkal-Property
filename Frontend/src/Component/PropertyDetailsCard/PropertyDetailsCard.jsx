import {
  useEffect,
  useMemo,
  useState,
} from "react";

import "./PropertyDetailsCard.css";

// ============================================
// FALLBACK LOCAL IMAGES
// ============================================

import house from "../../assets/house.webp";
import house2 from "../../assets/house2.webp";
import house3 from "../../assets/house3.webp";

// ============================================
// API BASE URL
// ============================================

import {
  BASE_URL,
} from "../../api/axios";

// ============================================
// REACT ICONS
// ============================================

import {
  MdLocationOn,
  MdHome,
  MdAttachMoney,
  MdChair,
  MdSquareFoot,
  MdDateRange,
  MdCheckCircle,
  MdPhone,
  MdDownload,
  MdRemoveRedEye,
  MdChevronLeft,
  MdChevronRight,
  MdBusiness,
  MdClose,
} from "react-icons/md";

// ============================================
// GENERATE CAPTCHA
// ============================================

const generateCaptcha = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%@#";

  let result = "";

  for (
    let i = 0;
    i < 6;
    i++
  ) {
    result +=
      chars.charAt(
        Math.floor(
          Math.random() *
            chars.length
        )
      );
  }

  return result;
};

// ============================================
// FORMAT IMAGE URL
// ============================================

const getImageUrl = (
  image
) => {
  if (!image) {
    return "";
  }

  // ==========================================
  // STRING IMAGE
  // ==========================================

  if (
    typeof image ===
    "string"
  ) {
    if (
      image.startsWith(
        "http://"
      ) ||
      image.startsWith(
        "https://"
      ) ||
      image.startsWith(
        "blob:"
      ) ||
      image.startsWith(
        "data:"
      )
    ) {
      return image;
    }

    return `${BASE_URL}${image}`;
  }

  // ==========================================
  // OBJECT IMAGE
  // ==========================================

  if (
    typeof image ===
    "object"
  ) {
    const imagePath =
      image.url ||
      image.path ||
      image.file ||
      image.image ||
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
};

// ============================================
// FORMAT PRICE
// ============================================

const formatPrice = (
  price
) => {
  const numericPrice =
    Number(price);

  if (
    !Number.isFinite(
      numericPrice
    ) ||
    numericPrice <= 0
  ) {
    return "Price on request";
  }

  // ==========================================
  // CRORE
  // ==========================================

  if (
    numericPrice >= 10000000
  ) {
    const crore =
      numericPrice /
      10000000;

    return `₹ ${crore.toFixed(
      crore % 1 === 0
        ? 0
        : 2
    )} Cr`;
  }

  // ==========================================
  // LAKH
  // ==========================================

  if (
    numericPrice >= 100000
  ) {
    const lakh =
      numericPrice /
      100000;

    return `₹ ${lakh.toFixed(
      lakh % 1 === 0
        ? 0
        : 2
    )} Lac`;
  }

  // ==========================================
  // NORMAL INDIAN FORMAT
  // ==========================================

  return `₹ ${numericPrice.toLocaleString(
    "en-IN"
  )}`;
};

// ============================================
// FORMAT DATE
// ============================================

const formatDate = (
  date
) => {
  if (!date) {
    return "Not specified";
  }

  const parsedDate =
    new Date(date);

  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {
    return "Not specified";
  }

  return parsedDate.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

// ============================================
// PROPERTY DETAILS CARD
// ============================================

const PropertyDetailsCard = ({
  property,
}) => {
  // ==========================================
  // SLIDER STATE
  // ==========================================

  const [
    currentIndex,
    setCurrentIndex,
  ] = useState(0);

  const [
    isHovered,
    setIsHovered,
  ] = useState(false);

  // ==========================================
  // MODAL STATE
  // ==========================================

  const [
    isModalOpen,
    setIsModalOpen,
  ] = useState(false);

  const [
    captchaText,
    setCaptchaText,
  ] = useState(
    generateCaptcha()
  );

  const [
    enteredCaptcha,
    setEnteredCaptcha,
  ] = useState("");

  // ==========================================
  // PROPERTY IMAGES
  // ==========================================

  const images =
    useMemo(() => {
      let propertyImages =
        [];

      // ========================================
      // propertyImages FROM DATABASE
      // ========================================

      if (
        Array.isArray(
          property?.propertyImages
        )
      ) {
        propertyImages =
          property.propertyImages
            .map(
              getImageUrl
            )
            .filter(Boolean);
      }

      // ========================================
      // SUPPORT NORMALIZED images
      // ========================================

      if (
        propertyImages.length ===
          0 &&
        Array.isArray(
          property?.images
        )
      ) {
        propertyImages =
          property.images
            .map(
              getImageUrl
            )
            .filter(Boolean);
      }

      // ========================================
      // PRIMARY IMAGE
      // ========================================

      if (
        propertyImages.length ===
          0 &&
        property?.primaryImage
      ) {
        const primary =
          getImageUrl(
            property.primaryImage
          );

        if (primary) {
          propertyImages.push(
            primary
          );
        }
      }

      // ========================================
      // OLD IMAGE FIELD
      // ========================================

      if (
        propertyImages.length ===
          0 &&
        property?.image
      ) {
        const oldImage =
          getImageUrl(
            property.image
          );

        if (oldImage) {
          propertyImages.push(
            oldImage
          );
        }
      }

      // ========================================
      // FALLBACK IMAGES
      // ========================================

      if (
        propertyImages.length ===
        0
      ) {
        propertyImages = [
          house,
          house2,
          house3,
        ];
      }

      return propertyImages;
    }, [property]);

  // ==========================================
  // RESET SLIDER WHEN PROPERTY CHANGES
  // ==========================================

  useEffect(() => {
    setCurrentIndex(0);
  }, [
    property?._id,
  ]);

  // ==========================================
  // SAFETY FOR IMAGE INDEX
  // ==========================================

  useEffect(() => {
    if (
      currentIndex >=
      images.length
    ) {
      setCurrentIndex(0);
    }
  }, [
    images.length,
    currentIndex,
  ]);

  // ==========================================
  // AUTO SLIDE
  // ==========================================

  useEffect(() => {
    if (
      isHovered ||
      images.length <= 1
    ) {
      return;
    }

    const slideInterval =
      setInterval(() => {
        setCurrentIndex(
          (previousIndex) =>
            previousIndex ===
            images.length - 1
              ? 0
              : previousIndex +
                1
        );
      }, 3500);

    return () =>
      clearInterval(
        slideInterval
      );
  }, [
    images.length,
    isHovered,
  ]);

  // ==========================================
  // NEXT IMAGE
  // ==========================================

  const nextSlide = () => {
    if (
      images.length <= 1
    ) {
      return;
    }

    setCurrentIndex(
      (previousIndex) =>
        previousIndex ===
        images.length - 1
          ? 0
          : previousIndex + 1
    );
  };

  // ==========================================
  // PREVIOUS IMAGE
  // ==========================================

  const prevSlide = () => {
    if (
      images.length <= 1
    ) {
      return;
    }

    setCurrentIndex(
      (previousIndex) =>
        previousIndex === 0
          ? images.length - 1
          : previousIndex - 1
    );
  };

  // ==========================================
  // OPEN MODAL
  // ==========================================

  const openModal = () => {
    setCaptchaText(
      generateCaptcha()
    );

    setEnteredCaptcha(
      ""
    );

    setIsModalOpen(true);
  };

  // ==========================================
  // CLOSE MODAL
  // ==========================================

  const closeModal = () => {
    setIsModalOpen(false);

    setEnteredCaptcha(
      ""
    );
  };

  // ==========================================
  // REFRESH CAPTCHA
  // ==========================================

  const handleRefreshCaptcha =
    (event) => {
      event.preventDefault();

      setCaptchaText(
        generateCaptcha()
      );

      setEnteredCaptcha(
        ""
      );
    };

  // ==========================================
  // FORM SUBMIT
  // ==========================================

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    if (
      enteredCaptcha.trim() !==
      captchaText
    ) {
      alert(
        "Captcha does not match."
      );

      return;
    }

    alert(
      "Form Submitted Successfully!"
    );

    closeModal();
  };

  // ==========================================
  // PROPERTY NAME
  // ==========================================

  const propertyName =
    property?.name ||
    property?.title ||
    property?.propertyName ||
    "Property";

  // ==========================================
  // DESCRIPTION
  // ==========================================

  const description =
    property?.shortDescription ||
    "Property details";

  // ==========================================
  // ADDRESS
  // ==========================================

  const address =
    property?.address ||
    [
      property?.location,
      property?.city,
      property?.state,
      property?.country,
    ]
      .filter(Boolean)
      .join(", ") ||
    "Location not available";

  // ==========================================
  // PRICE
  // ==========================================

  const price =
    formatPrice(
      property?.rawPrice ??
        property?.price ??
        property?.propertyPrice
    );

  // ==========================================
  // PRICE PER SQFT
  // ==========================================

  const pricePerSqft =
    Number(
      property?.pricePerSqft ??
        property?.pricePerSqFt
    );

  // ==========================================
  // PROPERTY TYPE
  // ==========================================

  const propertyType =
    property?.type ||
    property?.propertyType ||
    property?.subType ||
    property?.category ||
    "Not specified";

  // ==========================================
  // SBA / AREA
  // ==========================================

  const sba =
    property?.totalArea ||
    property?.plotArea ||
    property?.plotSize ||
    property?.projectArea ||
    property?.projectSize ||
    "Not specified";

  // ==========================================
  // AVAILABLE DATE
  // ==========================================

  const availableFrom =
    property?.launchDate ||
    property?.publishDate;

  // ==========================================
  // STATUS
  // ==========================================

  const status =
    property?.completionStatus ||
    property?.status ||
    "Not specified";

  // ==========================================
  // RERA
  // ==========================================

  const rera =
    property?.rera ||
    property?.reraNumber ||
    "Not available";

  // ==========================================
  // VIEWS
  // ==========================================

  const views =
    Number(
      property?.views
    ) || 0;

  // ==========================================
  // BOOKING AMOUNT
  // ==========================================
  // Your current property schema does not
  // contain bookingAmount, but this supports
  // it automatically if you add it later.

  const bookingAmount =
    property?.bookingAmount
      ? formatPrice(
          property.bookingAmount
        )
      : "Not specified";

  // ==========================================
  // FURNISHING
  // ==========================================
  // Supports backend furnishing field if added.

  const furnishing =
    property?.furnishing ||
    property?.furnishingStatus ||
    "Not specified";

  // ==========================================
  // UI
  // ==========================================

  return (
    <>
      <div className="PropertyDetailsCard-wrapper">
        <div className="PropertyDetailsCard">

          {/* ================================= */}
          {/* LEFT SECTION: IMAGE SLIDER */}
          {/* ================================= */}

          <div
            className="pdc-slider-section"
            onMouseEnter={() =>
              setIsHovered(
                true
              )
            }
            onMouseLeave={() =>
              setIsHovered(
                false
              )
            }
          >
            <div className="pdc-image-container">

              {/* ============================= */}
              {/* PREVIOUS BUTTON */}
              {/* ============================= */}

              {images.length >
                1 && (
                <button
                  className="pdc-arrow left-arrow"
                  onClick={
                    prevSlide
                  }
                  aria-label="Previous image"
                  type="button"
                >
                  <MdChevronLeft
                    size={
                      28
                    }
                  />
                </button>
              )}

              {/* ============================= */}
              {/* MAIN IMAGE */}
              {/* ============================= */}

              <img
                src={
                  images[
                    currentIndex
                  ]
                }
                alt={`${propertyName} view ${
                  currentIndex +
                  1
                }`}
                className="pdc-main-image"
              />

              {/* ============================= */}
              {/* INDICATORS */}
              {/* ============================= */}

              {images.length >
                1 && (
                <div className="slider-indicators">
                  {images.map(
                    (
                      _,
                      index
                    ) => (
                      <span
                        key={
                          index
                        }
                        className={`dot ${
                          index ===
                          currentIndex
                            ? "active"
                            : ""
                        }`}
                        onClick={() =>
                          setCurrentIndex(
                            index
                          )
                        }
                      />
                    )
                  )}
                </div>
              )}

              {/* ============================= */}
              {/* NEXT BUTTON */}
              {/* ============================= */}

              {images.length >
                1 && (
                <button
                  className="pdc-arrow right-arrow"
                  onClick={
                    nextSlide
                  }
                  aria-label="Next image"
                  type="button"
                >
                  <MdChevronRight
                    size={
                      28
                    }
                  />
                </button>
              )}
            </div>
          </div>

          {/* ================================= */}
          {/* RIGHT SECTION */}
          {/* ================================= */}

          <div className="pdc-details-section">

            {/* =============================== */}
            {/* HEADER */}
            {/* =============================== */}

            <div className="pdc-header">
              <h2>
                {propertyName}
              </h2>

              <p className="pdc-subtitle">
                {description}
              </p>

              <p className="pdc-location">
                <span className="icon-loc">
                  <MdLocationOn />
                </span>

                {address}
              </p>
            </div>

            {/* =============================== */}
            {/* BUILDER */}
            {/* =============================== */}

            <div className="pdc-builder-badge">
              <div className="builder-avatar">
                <MdBusiness
                  size={18}
                />
              </div>

              <div className="builder-info">
                <span className="builder-label">
                  Builder :
                </span>

                <span className="builder-name">
                  {property?.builder ||
                    property?.builderName ||
                    "Not specified"}
                </span>
              </div>
            </div>

            {/* =============================== */}
            {/* PRICE */}
            {/* =============================== */}

            <div className="pdc-pricing">
              <h3 className="price-main">
                {price}
              </h3>

              <span className="price-sqft">
                {Number.isFinite(
                  pricePerSqft
                ) &&
                pricePerSqft >
                  0
                  ? `₹${pricePerSqft.toLocaleString(
                      "en-IN"
                    )} / Sqft`
                  : "Price / Sqft not available"}
              </span>
            </div>

            {/* =============================== */}
            {/* DETAILS GRID */}
            {/* =============================== */}

            <div className="pdc-grid">

              {/* TYPE */}

              <div className="grid-item">
                <span className="grid-label">
                  <MdHome
                    size={16}
                  />{" "}
                  Type
                </span>

                <span className="grid-value">
                  {
                    propertyType
                  }
                </span>
              </div>

              {/* BOOKING AMOUNT */}

              <div className="grid-item">
                <span className="grid-label">
                  <MdAttachMoney
                    size={16}
                  />{" "}
                  Booking Amount
                </span>

                <span className="grid-value">
                  {
                    bookingAmount
                  }
                </span>
              </div>

              {/* FURNISHING */}

              <div className="grid-item">
                <span className="grid-label">
                  <MdChair
                    size={16}
                  />{" "}
                  Furnishing
                </span>

                <span className="grid-value">
                  {furnishing}
                </span>
              </div>

              {/* SBA */}

              <div className="grid-item">
                <span className="grid-label">
                  <MdSquareFoot
                    size={16}
                  />{" "}
                  SBA
                </span>

                <span className="grid-value">
                  {sba}
                </span>
              </div>

              {/* AVAILABLE FROM */}

              <div className="grid-item">
                <span className="grid-label">
                  <MdDateRange
                    size={16}
                  />{" "}
                  Available From
                </span>

                <span className="grid-value">
                  {formatDate(
                    availableFrom
                  )}
                </span>
              </div>

              {/* STATUS */}

              <div className="grid-item">
                <span className="grid-label">
                  <MdCheckCircle
                    size={16}
                  />{" "}
                  Status
                </span>

                <span className="grid-value status-highlight">
                  {status}
                </span>
              </div>
            </div>

            {/* =============================== */}
            {/* ACTIONS */}
            {/* =============================== */}

            <div className="pdc-actions">
              <button
                className="btn-contact"
                onClick={
                  openModal
                }
                type="button"
              >
                <MdPhone
                  size={18}
                />

                Contact Builder
              </button>

              <button
                className="btn-brochure"
                onClick={
                  openModal
                }
                type="button"
              >
                <MdDownload
                  size={18}
                />

                Download Brochure
              </button>
            </div>

            {/* =============================== */}
            {/* FOOTER */}
            {/* =============================== */}

            <div className="pdc-footer">
              <span className="rera-no">
                RERA NO:{" "}
                {rera}
              </span>

              <span className="views">
                <MdRemoveRedEye
                  size={16}
                />

                {views.toLocaleString(
                  "en-IN"
                )}{" "}
                Views
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================== */}
      {/* MODAL */}
      {/* ===================================== */}

      {isModalOpen && (
        <div
          className="modal-overlay"
          onClick={
            closeModal
          }
        >
          <div
            className="modal-content"
            onClick={(
              event
            ) =>
              event.stopPropagation()
            }
          >
            {/* ============================= */}
            {/* CLOSE */}
            {/* ============================= */}

            <button
              className="modal-close"
              onClick={
                closeModal
              }
              type="button"
            >
              <MdClose
                size={24}
              />
            </button>

            {/* ============================= */}
            {/* HEADER */}
            {/* ============================= */}

            <h3 className="modal-header">
              Kindly fill in
              your details to
              view the contact
              number.
            </h3>

            {/* ============================= */}
            {/* FORM */}
            {/* ============================= */}

            <form
              className="modal-form"
              onSubmit={
                handleSubmit
              }
            >

              {/* NAME */}

              <div className="form-group">
                <label>
                  Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  required
                />
              </div>

              {/* EMAIL */}

              <div className="form-group">
                <label>
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* CONTACT */}

              <div className="form-group">
                <label>
                  Contact
                </label>

                <input
                  type="tel"
                  placeholder="Enter your contact number"
                  required
                />
              </div>

              {/* CAPTCHA */}

              <div className="form-group">
                <label>
                  Captcha
                </label>

                <div className="captcha-row">
                  <div className="captcha-box">
                    {
                      captchaText
                    }
                  </div>

                  <button
                    className="btn-refresh"
                    onClick={
                      handleRefreshCaptcha
                    }
                    type="button"
                  >
                    Refresh
                  </button>
                </div>
              </div>

              {/* ENTER CAPTCHA */}

              <div className="form-group">
                <label>
                  Enter Captcha
                </label>

                <input
                  type="text"
                  placeholder="Enter the text"
                  value={
                    enteredCaptcha
                  }
                  onChange={(
                    event
                  ) =>
                    setEnteredCaptcha(
                      event
                        .target
                        .value
                    )
                  }
                  required
                />
              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                className="btn-submit"
              >
                Submit
              </button>

            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyDetailsCard;