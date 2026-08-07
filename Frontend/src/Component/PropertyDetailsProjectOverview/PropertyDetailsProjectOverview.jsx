import "./PropertyDetailsProjectOverview.css";

// ============================================
// SOCIAL ICONS
// ============================================

import {
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaTelegramPlane,
  FaLinkedinIn,
  FaEnvelope,
  FaPlus,
} from "react-icons/fa";

// ============================================
// OVERVIEW ICONS
// ============================================

import {
  MdHome,
  MdDomain,
  MdMeetingRoom,
  MdBed,
  MdBathtub,
  MdBalcony,
  MdDirectionsCar,
  MdVpnKey,
  MdVisibility,
  MdHomeRepairService,
} from "react-icons/md";

import {
  BiArea,
  BiMoveHorizontal,
  BiBuildingHouse,
} from "react-icons/bi";

// ============================================
// FORMAT CURRENCY
// ============================================

const formatCurrency = (value) => {
  const number = Number(value);

  if (
    !Number.isFinite(number) ||
    number < 0
  ) {
    return "Not specified";
  }

  return `₹ ${number.toLocaleString(
    "en-IN"
  )}`;
};

// ============================================
// DISPLAY VALUE
// ============================================

const displayValue = (
  value,
  fallback = "Not specified"
) => {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return fallback;
  }

  return value;
};

// ============================================
// PROPERTY DETAILS PROJECT OVERVIEW
// ============================================

const PropertyDetailsProjectOverview = ({
  property,
}) => {
  // ==========================================
  // PROPERTY NAME
  // ==========================================

  const propertyTitle =
    property?.name ||
    property?.title ||
    property?.propertyName ||
    "Property";

  // ==========================================
  // DESCRIPTION
  // ==========================================

  const description =
    property?.shortDescription ||
    `${propertyTitle} offers thoughtfully designed spaces and convenient connectivity.`;

  // ==========================================
  // LOCATION
  // ==========================================

  const location =
    property?.address ||
    [
      property?.location,
      property?.city,
      property?.state,
      property?.country,
    ]
      .filter(Boolean)
      .join(", ") ||
    "Location not specified";

  // ==========================================
  // PROJECT AREA
  // ==========================================

  const projectArea =
    property?.projectArea ||
    property?.totalArea ||
    property?.projectSize ||
    "Not specified";

  // ==========================================
  // NUMBER OF HOUSE / VILLA
  // ==========================================

  const noOfHouseVilla =
    property?.noOfHouseVilla ??
    property?.totalUnits ??
    "Not specified";

  // ==========================================
  // TOTAL FLOORS
  // ==========================================

  const totalFloors =
    displayValue(
      property?.totalFloors
    );

  // ==========================================
  // FACING
  // ==========================================

  const facing =
    displayValue(
      property?.facing
    );

  // ==========================================
  // PLOT AREA
  // ==========================================

  const plotArea =
    property?.plotArea ||
    property?.plotSize ||
    "Not specified";

  // ==========================================
  // BEDROOMS
  // ==========================================

  const bedrooms =
    displayValue(
      property?.bedrooms
    );

  // ==========================================
  // BATHROOMS
  // ==========================================

  const bathrooms =
    displayValue(
      property?.bathrooms
    );

  // ==========================================
  // BALCONIES
  // ==========================================

  const balconies =
    displayValue(
      property?.balconies
    );

  // ==========================================
  // PARKING
  // ==========================================

  const parking =
    displayValue(
      property?.parking
    );

  // ==========================================
  // TRANSACTION TYPE
  // ==========================================

  const transactionType =
    property?.transactionType ||
    property?.statusType ||
    "Not specified";

  // ==========================================
  // PROPERTY OVERLOOKING
  // ==========================================

  const propertyOverlooking =
    displayValue(
      property?.propertyOverlooking
    );

  // ==========================================
  // MAINTENANCE
  // ==========================================

  const maintenancePerMonth =
    property?.maintenancePerMonth !==
      undefined &&
    property?.maintenancePerMonth !==
      null
      ? formatCurrency(
          property.maintenancePerMonth
        )
      : "Not specified";

  // ==========================================
  // EXPECTED RENTAL RETURN
  // ==========================================

  const expectedRentalReturn =
    property?.expectedRentalReturn !==
      undefined &&
    property?.expectedRentalReturn !==
      null
      ? formatCurrency(
          property.expectedRentalReturn
        )
      : "Not specified";

  // ==========================================
  // OVERVIEW DATA
  // ==========================================

  const overviewData = [
    {
      id: 1,

      label:
        "Project Area",

      value:
        projectArea,

      icon: <BiArea />,
    },

    {
      id: 2,

      label:
        "No. of House/Villa",

      value:
        noOfHouseVilla,

      icon: <MdHome />,
    },

    {
      id: 3,

      label:
        "Total Floors",

      value:
        totalFloors,

      icon: <MdDomain />,
    },

    {
      id: 4,

      label:
        "Facing",

      value:
        facing,

      icon: (
        <MdMeetingRoom />
      ),
    },

    {
      id: 5,

      label:
        "Plot Area",

      value:
        plotArea,

      icon: (
        <BiMoveHorizontal />
      ),
    },

    {
      id: 6,

      label:
        "Bedrooms",

      value:
        bedrooms,

      icon: <MdBed />,
    },

    {
      id: 7,

      label:
        "Bathrooms",

      value:
        bathrooms,

      icon: <MdBathtub />,
    },

    {
      id: 8,

      label:
        "Balconies",

      value:
        balconies,

      icon: <MdBalcony />,
    },

    {
      id: 9,

      label:
        "Parking",

      value:
        parking,

      icon: (
        <MdDirectionsCar />
      ),
    },

    {
      id: 10,

      label:
        "Transaction Type",

      value:
        transactionType,

      icon: <MdVpnKey />,
    },

    {
      id: 11,

      label:
        "Property Overlooking",

      value:
        propertyOverlooking,

      icon: <MdVisibility />,
    },

    {
      id: 12,

      label:
        "Maintainance Per Month",

      value:
        maintenancePerMonth,

      icon: (
        <MdHomeRepairService />
      ),
    },

    {
      id: 13,

      label:
        "Expected Rental Return",

      value:
        expectedRentalReturn,

      icon: (
        <BiBuildingHouse />
      ),
    },
  ];

  // ==========================================
  // SHARE PROPERTY
  // ==========================================

  const getShareUrl = () => {
    return encodeURIComponent(
      window.location.href
    );
  };

  const getShareText = () => {
    return encodeURIComponent(
      `Check out ${propertyTitle}`
    );
  };

  // ==========================================
  // FACEBOOK
  // ==========================================

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${getShareUrl()}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // ==========================================
  // TWITTER
  // ==========================================

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${getShareUrl()}&text=${getShareText()}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // ==========================================
  // WHATSAPP
  // ==========================================

  const shareWhatsapp = () => {
    window.open(
      `https://wa.me/?text=${getShareText()}%20${getShareUrl()}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // ==========================================
  // TELEGRAM
  // ==========================================

  const shareTelegram = () => {
    window.open(
      `https://t.me/share/url?url=${getShareUrl()}&text=${getShareText()}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // ==========================================
  // LINKEDIN
  // ==========================================

  const shareLinkedin = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${getShareUrl()}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // ==========================================
  // EMAIL
  // ==========================================

  const shareEmail = () => {
    const subject =
      encodeURIComponent(
        propertyTitle
      );

    const body =
      encodeURIComponent(
        `Check out this property:\n\n${propertyTitle}\n${window.location.href}`
      );

    window.location.href =
      `mailto:?subject=${subject}&body=${body}`;
  };

  // ==========================================
  // COPY URL
  // ==========================================

  const copyPropertyUrl =
    async () => {
      try {
        await navigator.clipboard.writeText(
          window.location.href
        );

        alert(
          "Property link copied."
        );
      } catch (error) {
        console.error(
          "COPY URL ERROR:",
          error
        );
      }
    };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="PropertyDetailsProjectOverview-wrapper">
      <div className="PropertyDetailsProjectOverview-container">

        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <div className="PropertyDetailsProjectOverview-header">

          <h2 className="PropertyDetailsProjectOverview-title">
            Project Overview
          </h2>

          {/* =============================== */}
          {/* SOCIAL SHARE */}
          {/* =============================== */}

          <div className="PropertyDetailsProjectOverview-social">

            <button
              className="PropertyDetailsProjectOverview-social-btn fb"
              onClick={
                shareFacebook
              }
              type="button"
              aria-label="Share on Facebook"
            >
              <FaFacebook />
            </button>

            <button
              className="PropertyDetailsProjectOverview-social-btn tw"
              onClick={
                shareTwitter
              }
              type="button"
              aria-label="Share on Twitter"
            >
              <FaTwitter />
            </button>

            <button
              className="PropertyDetailsProjectOverview-social-btn wa"
              onClick={
                shareWhatsapp
              }
              type="button"
              aria-label="Share on WhatsApp"
            >
              <FaWhatsapp />
            </button>

            <button
              className="PropertyDetailsProjectOverview-social-btn tg"
              onClick={
                shareTelegram
              }
              type="button"
              aria-label="Share on Telegram"
            >
              <FaTelegramPlane />
            </button>

            <button
              className="PropertyDetailsProjectOverview-social-btn li"
              onClick={
                shareLinkedin
              }
              type="button"
              aria-label="Share on LinkedIn"
            >
              <FaLinkedinIn />
            </button>

            <button
              className="PropertyDetailsProjectOverview-social-btn em"
              onClick={
                shareEmail
              }
              type="button"
              aria-label="Share by Email"
            >
              <FaEnvelope />
            </button>

            <button
              className="PropertyDetailsProjectOverview-social-btn pl"
              onClick={
                copyPropertyUrl
              }
              type="button"
              aria-label="Copy property link"
            >
              <FaPlus />
            </button>

          </div>
        </div>

        {/* ================================= */}
        {/* OVERVIEW GRID */}
        {/* ================================= */}

        <div className="PropertyDetailsProjectOverview-grid">

          {overviewData.map(
            (item) => (
              <div
                key={item.id}
                className="PropertyDetailsProjectOverview-grid-item"
              >

                <div className="PropertyDetailsProjectOverview-icon">
                  {
                    item.icon
                  }
                </div>

                <div className="PropertyDetailsProjectOverview-details">

                  <span className="PropertyDetailsProjectOverview-label">
                    {
                      item.label
                    }
                  </span>

                  <span className="PropertyDetailsProjectOverview-value">
                    {
                      item.value
                    }
                  </span>

                </div>
              </div>
            )
          )}

        </div>

        {/* ================================= */}
        {/* DESCRIPTION */}
        {/* ================================= */}

        <div className="PropertyDetailsProjectOverview-section">

          <h3 className="PropertyDetailsProjectOverview-section-title">
            Description
          </h3>

          <div className="PropertyDetailsProjectOverview-content">

            {/* ============================= */}
            {/* SHORT DESCRIPTION */}
            {/* ============================= */}

            <p>
              {description}
            </p>

            {/* ============================= */}
            {/* HIGHLIGHTS */}
            {/* ============================= */}

            {Array.isArray(
              property?.highlights
            ) &&
            property.highlights
              .length > 0 ? (
              <p>
                {property.highlights
                  .filter(Boolean)
                  .join(". ")}
                .
              </p>
            ) : (
              <p>
                {propertyTitle} offers
                practical spaces and
                property features for
                comfortable living.
              </p>
            )}

            {/* ============================= */}
            {/* LOCATION DESCRIPTION */}
            {/* ============================= */}

            <p>
              Located at{" "}
              <strong>
                {location}
              </strong>
              , this property offers
              convenient access to
              the surrounding area.
            </p>

            {/* ============================= */}
            {/* PROPERTY INFORMATION */}
            {/* ============================= */}

            <p>
              {propertyTitle} is a{" "}
              {property?.type ||
                property?.category ||
                "property"}{" "}
              currently listed as{" "}
              {transactionType}.
            </p>

          </div>
        </div>

        {/* ================================= */}
        {/* LOCATION */}
        {/* ================================= */}

        <div className="PropertyDetailsProjectOverview-section">

          <h3 className="PropertyDetailsProjectOverview-section-title">
            Location
          </h3>

          <div className="PropertyDetailsProjectOverview-content">

            <p>
              {propertyTitle} is
              located at{" "}
              <strong>
                {location}
              </strong>
              .
            </p>

            {property?.city && (
              <p>
                City:{" "}
                <strong>
                  {
                    property.city
                  }
                </strong>
              </p>
            )}

            {property?.state && (
              <p>
                State:{" "}
                <strong>
                  {
                    property.state
                  }
                </strong>
              </p>
            )}

            {property?.country && (
              <p>
                Country:{" "}
                <strong>
                  {
                    property.country
                  }
                </strong>
              </p>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default PropertyDetailsProjectOverview;