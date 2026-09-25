import React, { useEffect, useRef, useState } from "react";
import "./SellProperty.css";
import API, { IMG_URL } from "../../api/axios";

/* =========================================================
   CONSTANTS
========================================================= */

const PROPERTY_ENDPOINT = "/sell-properties";

const MAX_FILE_SIZE_MB = 5;
const MAX_IMAGES = 10;

const ALLOWED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

const INITIAL_FORM_STATE = {
  propertyTitle: "",
  propertyType: "Select Type",
  propertyFor: "Sell",
  category: "Residential",
  expectedPrice: "",
  negotiable: "Yes",

  builtUpArea: "",
  carpetArea: "",
  saleableArea: "",
  bhk: "Select",
  bathrooms: "Select",
  balconies: "Select",
  floor: "",
  totalFloors: "",
  furnishingStatus: "Select Status",
  propertyAge: "Select Age",
  parking: "Select",

  state: "Odisha",
  city: "Bhubaneswar",
  locality: "",
  landmark: "",
  pinCode: "",
};

const FIELD_CONFIG_MAP = {
  propertyTitle: {
    label: "Property Title",
    required: true,
    type: "input",
    placeholder: "e.g. 3 BHK Luxury Apartment in Patia, Bhubaneswar",
  },

  propertyType: {
    label: "Property Type",
    required: true,
    type: "select",
    options: [
      "Select Type",
      "Apartment",
      "Villa",
      "Independent House",
      "Plot",
    ],
  },

  propertyFor: {
    label: "Property For",
    required: true,
    type: "select",
    options: ["Sell", "Rent", "Lease"],
  },

  category: {
    label: "Category",
    required: true,
    type: "select",
    options: ["Residential", "Commercial", "Land", "Others"],
  },

  expectedPrice: {
    label: "Expected Price (₹)",
    required: true,
    type: "input",
    placeholder: "Enter expected price",
  },

  negotiable: {
    label: "Negotiable",
    required: false,
    type: "radio",
    options: ["Yes", "No"],
  },

  builtUpArea: {
    label: "Built-up Area (sq ft)",
    required: true,
    type: "input",
    placeholder: "Enter built-up area",
  },

  carpetArea: {
    label: "Carpet Area (sq ft)",
    required: false,
    type: "input",
    placeholder: "Enter carpet area",
  },

  saleableArea: {
    label: "Saleable Area (sq ft)",
    required: false,
    type: "input",
    placeholder: "Enter saleable area",
  },

  bhk: {
    label: "BHK",
    required: true,
    type: "select",
    options: ["Select", "1 BHK", "2 BHK", "3 BHK", "4+ BHK"],
  },

  bathrooms: {
    label: "Bathrooms",
    required: true,
    type: "select",
    options: ["Select", "1", "2", "3", "4+"],
  },

  balconies: {
    label: "Balconies",
    required: false,
    type: "select",
    options: ["Select", "0", "1", "2", "3+"],
  },

  floor: {
    label: "Floor",
    required: false,
    type: "input",
    placeholder: "e.g. 5th Floor",
  },

  totalFloors: {
    label: "Total Floors",
    required: false,
    type: "input",
    placeholder: "e.g. 10",
  },

  furnishingStatus: {
    label: "Furnishing Status",
    required: true,
    type: "select",
    options: [
      "Select Status",
      "Unfurnished",
      "Semi-Furnished",
      "Furnished",
    ],
  },

  propertyAge: {
    label: "Property Age",
    required: false,
    type: "select",
    options: [
      "Select Age",
      "Under Construction",
      "1-5 Years",
      "5-10 Years",
      "Above 10 Years",
    ],
  },

  parking: {
    label: "Parking",
    required: false,
    type: "select",
    options: ["Select", "Open", "Cover", "None"],
  },

  state: {
    label: "State",
    required: true,
    type: "select",
    options: ["Odisha"],
  },

  city: {
    label: "City",
    required: true,
    type: "select",
    options: [
      "Select City",
      "Angul",
      "Balangir",
      "Bhubaneswar",
      "Balasore",
      "Bargarh",
      "Bhadrak",
      "Boudh",
      "Cuttack",
      "Deogarh",
      "Dhenkanal",
      "Gajapati",
      "Ganjam",
      "Jagatsinghpur",
      "Jajpur",
      "Jharsuguda",
      "Kalahandi",
      "Kandhamal",
      "Kendrapara",
      "Keonjhar",
      "Khordha",
      "Koraput",
      "Malkangiri",
      "Mayurbhanj",
      "Nabarangpur",
      "Nayagarh",
      "Nuapada",
      "Puri",
      "Rayagada",
      "Sambalpur",
      "Subarnapur",
      "Sundargarh",
    ],
  },

  locality: {
    label: "Locality",
    required: true,
    type: "input",
    placeholder: "e.g. Patia / Jayadev Vihar",
  },

  landmark: {
    label: "Landmark",
    required: false,
    type: "input",
    placeholder: "Enter nearby landmark",
  },

  pinCode: {
    label: "PIN Code",
    required: true,
    type: "input",
    placeholder: "Enter 6-digit PIN code",
  },
};

const UNSET_VALUES = [
  "Select Type",
  "Select",
  "Select Status",
  "Select Age",
  "Select City",
];

/* =========================================================
   ROOM CONFIGURATION (opens after a BHK is picked)
========================================================= */

// Sensible starting point for each BHK value; the person can still
// adjust every count in the popup before saving.
const BHK_DEFAULT_ROOMS = {
  "1 BHK": { bedrooms: 1, hall: 1, kitchen: 1 },
  "2 BHK": { bedrooms: 2, hall: 1, kitchen: 1 },
  "3 BHK": { bedrooms: 3, hall: 1, kitchen: 1 },
  "4+ BHK": { bedrooms: 4, hall: 1, kitchen: 1 },
};

const ADDITIONAL_ROOM_TYPES = [
  { key: "studyRoom", label: "Study Room" },
  { key: "poojaRoom", label: "Pooja Room" },
  { key: "servantRoom", label: "Servant Room" },
  { key: "storeRoom", label: "Store Room" },
];

const EMPTY_ADDITIONAL_ROOMS = {
  studyRoom: 0,
  poojaRoom: 0,
  servantRoom: 0,
  storeRoom: 0,
};

const buildRoomSummaryText = (roomConfig) => {
  if (!roomConfig) return "";

  const parts = [
    `${roomConfig.bedrooms} Bedroom${roomConfig.bedrooms > 1 ? "s" : ""}`,
    `${roomConfig.hall} Hall`,
    `${roomConfig.kitchen} Kitchen`,
  ];

  const extras = ADDITIONAL_ROOM_TYPES.filter(
    (room) => roomConfig.additionalRooms?.[room.key] > 0
  ).map(
    (room) => `${roomConfig.additionalRooms[room.key]} ${room.label}`
  );

  return [...parts, ...extras].join(" • ");
};

/* =========================================================
   COMPONENT
========================================================= */

const SellProperty = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  const [uploadedImages, setUploadedImages] = useState([]);

  const [loading, setLoading] = useState(false);

  const [submitStatus, setSubmitStatus] = useState(null);

  const [fieldErrors, setFieldErrors] = useState({});

  const [dragActive, setDragActive] = useState(false);

  /* Room configuration popup state */
  const [roomConfig, setRoomConfig] = useState(null);
  const [draftRoomConfig, setDraftRoomConfig] = useState(null);
  const [roomModalOpen, setRoomModalOpen] = useState(false);
  const [prevBhkValue, setPrevBhkValue] = useState("Select");

  const fileInputRef = useRef(null);
  const summaryFileInputRef = useRef(null);

  /* =========================================================
     CLEANUP IMAGE PREVIEWS
  ========================================================= */

  useEffect(() => {
    return () => {
      uploadedImages.forEach((image) => {
        if (image.previewUrl) {
          URL.revokeObjectURL(image.previewUrl);
        }
      });
    };
  }, [uploadedImages]);

  /* =========================================================
     INPUT CHANGE
  ========================================================= */

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setFieldErrors((prev) => {
      if (!prev[field]) return prev;

      const next = { ...prev };
      delete next[field];

      return next;
    });

    if (submitStatus?.type === "error") {
      setSubmitStatus(null);
    }
  };

  /* =========================================================
     ROOM CONFIGURATION (BHK popup)
  ========================================================= */

  const handleBhkChange = (value) => {
    const previousValue = formData.bhk;

    handleInputChange("bhk", value);

    if (value === "Select") {
      setRoomConfig(null);
      setDraftRoomConfig(null);
      return;
    }

    const defaults = BHK_DEFAULT_ROOMS[value] || {
      bedrooms: 1,
      hall: 1,
      kitchen: 1,
    };

    setPrevBhkValue(previousValue);

    setDraftRoomConfig({
      bedrooms: defaults.bedrooms,
      hall: roomConfig?.hall ?? defaults.hall,
      kitchen: roomConfig?.kitchen ?? defaults.kitchen,
      additionalRooms:
        roomConfig?.additionalRooms || { ...EMPTY_ADDITIONAL_ROOMS },
    });

    setRoomModalOpen(true);
  };

  const openRoomModalForEdit = () => {
    if (!roomConfig) return;

    setDraftRoomConfig({
      ...roomConfig,
      additionalRooms: { ...roomConfig.additionalRooms },
    });

    setRoomModalOpen(true);
  };

  const adjustDraftRoomCount = (field, delta, isAdditional = false) => {
    setDraftRoomConfig((prev) => {
      if (!prev) return prev;

      if (isAdditional) {
        const current = prev.additionalRooms[field] || 0;
        const next = Math.max(0, Math.min(9, current + delta));

        return {
          ...prev,
          additionalRooms: {
            ...prev.additionalRooms,
            [field]: next,
          },
        };
      }

      const current = prev[field] || 0;
      const next = Math.max(1, Math.min(9, current + delta));

      return {
        ...prev,
        [field]: next,
      };
    });
  };

  const saveRoomConfig = () => {
    setRoomConfig(draftRoomConfig);
    setRoomModalOpen(false);
  };

  const cancelRoomConfig = () => {
    if (!roomConfig) {
      handleInputChange("bhk", prevBhkValue);
    }

    setRoomModalOpen(false);
  };

  /* =========================================================
     IMAGE VALIDATION
  ========================================================= */

  const validateAndAddFiles = (fileList) => {
    const files = Array.from(fileList || []);

    if (!files.length) return;

    const availableSlots = MAX_IMAGES - uploadedImages.length;

    if (availableSlots <= 0) {
      setSubmitStatus({
        type: "error",
        message: `You can upload a maximum of ${MAX_IMAGES} images.`,
      });

      return;
    }

    const accepted = [];
    const rejected = [];

    files.slice(0, availableSlots).forEach((file) => {
      const tooBig =
        file.size > MAX_FILE_SIZE_MB * 1024 * 1024;

      const wrongType =
        !ALLOWED_IMAGE_TYPES.includes(file.type);

      if (tooBig || wrongType) {
        rejected.push({
          name: file.name,
          tooBig,
          wrongType,
        });

        return;
      }

      accepted.push(file);
    });

    if (files.length > availableSlots) {
      setSubmitStatus({
        type: "error",
        message: `Only ${availableSlots} more image(s) can be added. Maximum is ${MAX_IMAGES}.`,
      });
    }

    if (rejected.length > 0) {
      const reasons = rejected
        .map((item) => {
          if (item.tooBig) {
            return `${item.name} (over ${MAX_FILE_SIZE_MB}MB)`;
          }

          return `${item.name} (unsupported format)`;
        })
        .join(", ");

      setSubmitStatus({
        type: "error",
        message: `Some images were rejected: ${reasons}`,
      });
    }

    if (!accepted.length) return;

    const newImages = accepted.map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}-${Math.random()}`,
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setUploadedImages((prev) => [
      ...prev,
      ...newImages,
    ]);
  };

  /* =========================================================
     FILE INPUT
  ========================================================= */

  const handleImageUpload = (event) => {
    validateAndAddFiles(event.target.files);

    event.target.value = "";
  };

  /* =========================================================
     DRAG & DROP
  ========================================================= */

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setDragActive(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setDragActive(false);

    validateAndAddFiles(event.dataTransfer.files);
  };

  /* =========================================================
     REMOVE IMAGE
  ========================================================= */

  const removeImage = (index) => {
    setUploadedImages((prev) => {
      const imageToRemove = prev[index];

      if (imageToRemove?.previewUrl) {
        URL.revokeObjectURL(
          imageToRemove.previewUrl
        );
      }

      return prev.filter(
        (_, imageIndex) => imageIndex !== index
      );
    });
  };

  /* =========================================================
     FORM VALIDATION
  ========================================================= */

  const validateForm = () => {
    const errors = {};

    Object.entries(FIELD_CONFIG_MAP).forEach(
      ([key, config]) => {
        if (!config.required) return;

        const value = formData[key];

        if (
          value === undefined ||
          value === null ||
          String(value).trim() === "" ||
          UNSET_VALUES.includes(value)
        ) {
          errors[key] = `${config.label} is required.`;
        }
      }
    );

    /* Price validation */
    if (
      formData.expectedPrice &&
      !/^[0-9,.\s₹]+$/.test(
        formData.expectedPrice
      )
    ) {
      errors.expectedPrice =
        "Please enter a valid price.";
    }

    /* Built-up area validation */
    if (
      formData.builtUpArea &&
      !/^[0-9,.\s]+$/.test(
        formData.builtUpArea
      )
    ) {
      errors.builtUpArea =
        "Please enter a valid area.";
    }

    /* Carpet area validation */
    if (
      formData.carpetArea &&
      !/^[0-9,.\s]+$/.test(
        formData.carpetArea
      )
    ) {
      errors.carpetArea =
        "Please enter a valid carpet area.";
    }

    /* Saleable area validation */
    if (
      formData.saleableArea &&
      !/^[0-9,.\s]+$/.test(
        formData.saleableArea
      )
    ) {
      errors.saleableArea =
        "Please enter a valid saleable area.";
    }

    /* PIN validation */
    if (
      formData.pinCode &&
      !/^\d{6}$/.test(
        formData.pinCode.trim()
      )
    ) {
      errors.pinCode =
        "PIN Code must contain exactly 6 digits.";
    }

    setFieldErrors(errors);

    return errors;
  };

  /* =========================================================
     CREATE FORMDATA
  ========================================================= */

  const createPayload = () => {
    const payload = new FormData();

    Object.keys(INITIAL_FORM_STATE).forEach(
      (key) => {
        let value = formData[key];

        if (UNSET_VALUES.includes(value)) {
          value = "";
        }

        payload.append(
          key,
          value === undefined || value === null
            ? ""
            : value
        );
      }
    );

    if (roomConfig) {
      payload.append("roomConfig", JSON.stringify(roomConfig));
    }

    uploadedImages.forEach((image) => {
      payload.append(
        "images",
        image.file,
        image.file.name
      );
    });

    return payload;
  };

  /* =========================================================
     SUBMIT PROPERTY
  ========================================================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) return;

    setSubmitStatus(null);

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setSubmitStatus({
        type: "error",
        message:
          "Please correct the highlighted fields before submitting.",
      });

      document
        .querySelector(
          ".sell-property-form-wrapper"
        )
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

      return;
    }

    setLoading(true);

    try {
      const payload = createPayload();

      const response = await API.post(
        PROPERTY_ENDPOINT,
        payload
      );

      console.log(
        "SELL PROPERTY RESPONSE:",
        response.data
      );

      setSubmitStatus({
        type: "success",
        message:
          response?.data?.message ||
          "Property listed successfully!",
      });

      uploadedImages.forEach((image) => {
        if (image.previewUrl) {
          URL.revokeObjectURL(
            image.previewUrl
          );
        }
      });

      setUploadedImages([]);

      setFormData({
        ...INITIAL_FORM_STATE,
      });

      setFieldErrors({});

      setRoomConfig(null);
      setDraftRoomConfig(null);

      window.setTimeout(() => {
        document
          .querySelector(
            ".sell-property-status-banner"
          )
          ?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
      }, 100);
    } catch (error) {
      console.error(
        "SELL PROPERTY SUBMIT ERROR:",
        error
      );

      let serverMessage =
        "Failed to list property. Please try again.";

      if (error?.response) {
        serverMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          `Server error (${error.response.status}).`;
      } else if (error?.request) {
        serverMessage =
          "Unable to connect to the backend server. Check your connection.";
      } else if (error?.message) {
        serverMessage = error.message;
      }

      setSubmitStatus({
        type: "error",
        message: serverMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     SUMMARY DATA
  ========================================================= */

  const summaryData = [
    {
      section: "Basic Details",
      iconType: "badge",
      icon: "🏠",
      badgeText: "PROPERTY",
      rows: [
        "propertyTitle",
        "propertyType",
        "propertyFor",
        "category",
        "expectedPrice",
        "negotiable",
      ],
    },

    {
      section: "Property Details",
      iconType: "icon",
      icon: "🏡",
      rows: [
        "builtUpArea",
        "carpetArea",
        "saleableArea",
        "bhk",
        "bathrooms",
        "balconies",
        "floor",
        "totalFloors",
        "furnishingStatus",
        "propertyAge",
        "parking",
      ],
    },

    {
      section: "Location",
      iconType: "icon",
      icon: "📍",
      rows: [
        "state",
        "city",
        "locality",
        "landmark",
        "pinCode",
      ],
    },

    {
      section: "Upload More Images",
      iconType: "icon",
      icon: "🖼️",
      rows: ["uploadImages"],
    },
  ];

  /* =========================================================
     SUMMARY CONTROL
  ========================================================= */

  const renderSummaryControl = (key) => {
    if (key === "uploadImages") {
      return (
        <div className="sp-summary-file-control">
          <input
            type="file"
            ref={summaryFileInputRef}
            onChange={handleImageUpload}
            multiple
            accept="image/png,image/jpeg,image/jpg,image/webp"
            style={{ display: "none" }}
          />

          <button
            type="button"
            className="sp-table-upload-btn"
            onClick={() =>
              summaryFileInputRef.current?.click()
            }
          >
            📷 Choose Files
          </button>

          <ul className="sp-file-list">
            <li>
              Supported: PNG, JPG, JPEG, WEBP
            </li>

            <li>
              Maximum {MAX_FILE_SIZE_MB}MB each
            </li>

            <li>
              Maximum {MAX_IMAGES} images
            </li>

            <li>
              Uploaded: {uploadedImages.length} /{" "}
              {MAX_IMAGES}
            </li>
          </ul>
        </div>
      );
    }

    if (key === "bhk") {
      return (
        <div className="sp-summary-preview-column">
          <div className="sp-summary-preview">
            {formData.bhk || "-"}
          </div>

          {roomConfig && formData.bhk !== "Select" && (
            <div className="sp-summary-room-note">
              {buildRoomSummaryText(roomConfig)}
            </div>
          )}
        </div>
      );
    }

    const config = FIELD_CONFIG_MAP[key];

    if (!config) return null;

    if (
      config.type === "select" ||
      config.type === "radio"
    ) {
      return (
        <div className="sp-summary-preview">
          {formData[key] || "-"}
        </div>
      );
    }

    return (
      <div
        className={`sp-summary-preview ${
          !formData[key]
            ? "is-empty"
            : ""
        }`}
      >
        {formData[key] ||
          "Not entered yet"}
      </div>
    );
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="sell-property-container">

      {/* BANNER */}

      <div className="sell-property-banner">
        <div className="sell-property-banner-content">

          <div className="sell-property-banner-badge">
            <span>🏠</span>
            SELL & RENT
          </div>

          <div className="sell-property-banner-text">
            <h1>
              Sell & Rent a Property with{" "}
              <span className="highlight-green">
                Utkal Property
              </span>
            </h1>

            <p>
              List your property and reach
              trusted buyers and verified
              tenants across Odisha quickly
              and effortlessly.
            </p>
          </div>
        </div>

        <div className="sell-property-banner-illustration">
          <div className="house-graphic">
            🏡
          </div>
        </div>
      </div>

      {/* STATUS */}

      {submitStatus && (
        <div
          className={`sell-property-status-banner sell-property-status-${submitStatus.type}`}
          role="alert"
        >
          <span>
            {submitStatus.type === "success"
              ? "✅"
              : "⚠️"}
          </span>

          <span>
            {submitStatus.message}
          </span>
        </div>
      )}

      {/* FORM */}

      <form
        className="sell-property-form-wrapper"
        onSubmit={handleSubmit}
        noValidate
      >

        {/* BASIC DETAILS */}

        <div className="sell-property-section">

          <h3 className="sell-property-section-title">
            <span className="title-indicator"></span>
            Basic Details
          </h3>

          <div className="sell-property-form-group">

            <label className="sell-property-label">
              Property Title{" "}
              <span>*</span>
            </label>

            <input
              type="text"
              className={`sell-property-input ${
                fieldErrors.propertyTitle
                  ? "has-error"
                  : ""
              }`}
              placeholder={
                FIELD_CONFIG_MAP
                  .propertyTitle
                  .placeholder
              }
              value={formData.propertyTitle}
              onChange={(event) =>
                handleInputChange(
                  "propertyTitle",
                  event.target.value
                )
              }
            />

            {fieldErrors.propertyTitle && (
              <span className="sell-property-field-error">
                {fieldErrors.propertyTitle}
              </span>
            )}
          </div>

          <div className="sell-property-grid-3">

            <div className="sell-property-form-group">

              <label className="sell-property-label">
                Property Type{" "}
                <span>*</span>
              </label>

              <select
                className={`sell-property-select ${
                  fieldErrors.propertyType
                    ? "has-error"
                    : ""
                }`}
                value={formData.propertyType}
                onChange={(event) =>
                  handleInputChange(
                    "propertyType",
                    event.target.value
                  )
                }
              >
                {FIELD_CONFIG_MAP.propertyType.options.map(
                  (option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  )
                )}
              </select>

              {fieldErrors.propertyType && (
                <span className="sell-property-field-error">
                  {fieldErrors.propertyType}
                </span>
              )}
            </div>

            <div className="sell-property-form-group">

              <label className="sell-property-label">
                Property For{" "}
                <span>*</span>
              </label>

              <select
                className="sell-property-select"
                value={formData.propertyFor}
                onChange={(event) =>
                  handleInputChange(
                    "propertyFor",
                    event.target.value
                  )
                }
              >
                {FIELD_CONFIG_MAP.propertyFor.options.map(
                  (option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="sell-property-form-group">

              <label className="sell-property-label">
                Category{" "}
                <span>*</span>
              </label>

              <select
                className="sell-property-select"
                value={formData.category}
                onChange={(event) =>
                  handleInputChange(
                    "category",
                    event.target.value
                  )
                }
              >
                {FIELD_CONFIG_MAP.category.options.map(
                  (option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          <div className="sell-property-grid-price">

            <div className="sell-property-form-group">

              <label className="sell-property-label">
                Expected Price (₹){" "}
                <span>*</span>
              </label>

              <input
                type="text"
                inputMode="decimal"
                className={`sell-property-input ${
                  fieldErrors.expectedPrice
                    ? "has-error"
                    : ""
                }`}
                placeholder="e.g. 85,00,000"
                value={formData.expectedPrice}
                onChange={(event) =>
                  handleInputChange(
                    "expectedPrice",
                    event.target.value
                  )
                }
              />

              {fieldErrors.expectedPrice && (
                <span className="sell-property-field-error">
                  {fieldErrors.expectedPrice}
                </span>
              )}
            </div>

            <div className="sell-property-form-group">

              <label className="sell-property-label">
                Negotiable
              </label>

              <div className="sell-property-radio-group">

                {FIELD_CONFIG_MAP.negotiable.options.map(
                  (option) => (
                    <label
                      key={option}
                      className="sell-property-radio"
                    >
                      <input
                        type="radio"
                        name="negotiable"
                        value={option}
                        checked={
                          formData.negotiable ===
                          option
                        }
                        onChange={() =>
                          handleInputChange(
                            "negotiable",
                            option
                          )
                        }
                      />

                      {option}
                    </label>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* PROPERTY DETAILS */}

        <div className="sell-property-section">

          <h3 className="sell-property-section-title">
            <span className="title-indicator"></span>
            Property Details
          </h3>

          <div className="sell-property-grid-4">

            <div className="sell-property-form-group">

              <label className="sell-property-label">
                Built-up Area (sq ft){" "}
                <span>*</span>
              </label>

              <input
                type="text"
                inputMode="decimal"
                className={`sell-property-input ${
                  fieldErrors.builtUpArea
                    ? "has-error"
                    : ""
                }`}
                placeholder={
                  FIELD_CONFIG_MAP
                    .builtUpArea
                    .placeholder
                }
                value={formData.builtUpArea}
                onChange={(event) =>
                  handleInputChange(
                    "builtUpArea",
                    event.target.value
                  )
                }
              />

              {fieldErrors.builtUpArea && (
                <span className="sell-property-field-error">
                  {fieldErrors.builtUpArea}
                </span>
              )}
            </div>

            <div className="sell-property-form-group">

              <label className="sell-property-label">
                Carpet Area (sq ft)
              </label>

              <input
                type="text"
                inputMode="decimal"
                className={`sell-property-input ${
                  fieldErrors.carpetArea
                    ? "has-error"
                    : ""
                }`}
                placeholder={
                  FIELD_CONFIG_MAP
                    .carpetArea
                    .placeholder
                }
                value={formData.carpetArea}
                onChange={(event) =>
                  handleInputChange(
                    "carpetArea",
                    event.target.value
                  )
                }
              />

              {fieldErrors.carpetArea && (
                <span className="sell-property-field-error">
                  {fieldErrors.carpetArea}
                </span>
              )}
            </div>

            <div className="sell-property-form-group">

              <label className="sell-property-label">
                Saleable Area (sq ft)
              </label>

              <input
                type="text"
                inputMode="decimal"
                className={`sell-property-input ${
                  fieldErrors.saleableArea
                    ? "has-error"
                    : ""
                }`}
                placeholder={
                  FIELD_CONFIG_MAP
                    .saleableArea
                    .placeholder
                }
                value={formData.saleableArea}
                onChange={(event) =>
                  handleInputChange(
                    "saleableArea",
                    event.target.value
                  )
                }
              />

              {fieldErrors.saleableArea && (
                <span className="sell-property-field-error">
                  {fieldErrors.saleableArea}
                </span>
              )}
            </div>

            <div className="sell-property-form-group">

              <label className="sell-property-label">
                BHK{" "}
                <span>*</span>
              </label>

              <select
                className={`sell-property-select ${
                  fieldErrors.bhk
                    ? "has-error"
                    : ""
                }`}
                value={formData.bhk}
                onChange={(event) =>
                  handleBhkChange(event.target.value)
                }
              >
                {FIELD_CONFIG_MAP.bhk.options.map(
                  (option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  )
                )}
              </select>

              {fieldErrors.bhk && (
                <span className="sell-property-field-error">
                  {fieldErrors.bhk}
                </span>
              )}

              {roomConfig && formData.bhk !== "Select" && (
                <button
                  type="button"
                  className="sp-room-summary-chip"
                  onClick={openRoomModalForEdit}
                >
                  <span className="sp-room-summary-text">
                    {buildRoomSummaryText(roomConfig)}
                  </span>

                  <span className="sp-room-edit-label">
                    ✎ Edit
                  </span>
                </button>
              )}
            </div>
          </div>

          <div className="sell-property-grid-4">

            <div className="sell-property-form-group">

              <label className="sell-property-label">
                Bathrooms{" "}
                <span>*</span>
              </label>

              <select
                className={`sell-property-select ${
                  fieldErrors.bathrooms
                    ? "has-error"
                    : ""
                }`}
                value={formData.bathrooms}
                onChange={(event) =>
                  handleInputChange(
                    "bathrooms",
                    event.target.value
                  )
                }
              >
                {FIELD_CONFIG_MAP.bathrooms.options.map(
                  (option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  )
                )}
              </select>

              {fieldErrors.bathrooms && (
                <span className="sell-property-field-error">
                  {fieldErrors.bathrooms}
                </span>
              )}
            </div>

            <div className="sell-property-form-group">

              <label className="sell-property-label">
                Balconies
              </label>

              <select
                className="sell-property-select"
                value={formData.balconies}
                onChange={(event) =>
                  handleInputChange(
                    "balconies",
                    event.target.value
                  )
                }
              >
                {FIELD_CONFIG_MAP.balconies.options.map(
                  (option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="sell-property-form-group">

              <label className="sell-property-label">
                Floor
              </label>

              <input
                type="text"
                className="sell-property-input"
                placeholder={
                  FIELD_CONFIG_MAP.floor.placeholder
                }
                value={formData.floor}
                onChange={(event) =>
                  handleInputChange(
                    "floor",
                    event.target.value
                  )
                }
              />
            </div>

            <div className="sell-property-form-group">

              <label className="sell-property-label">
                Total Floors
              </label>

              <input
                type="text"
                inputMode="numeric"
                className="sell-property-input"
                placeholder={
                  FIELD_CONFIG_MAP
                    .totalFloors
                    .placeholder
                }
                value={formData.totalFloors}
                onChange={(event) =>
                  handleInputChange(
                    "totalFloors",
                    event.target.value
                  )
                }
              />
            </div>
          </div>

          <div className="sell-property-grid-3">

            <div className="sell-property-form-group">

              <label className="sell-property-label">
                Furnishing Status{" "}
                <span>*</span>
              </label>

              <select
                className={`sell-property-select ${
                  fieldErrors.furnishingStatus
                    ? "has-error"
                    : ""
                }`}
                value={
                  formData.furnishingStatus
                }
                onChange={(event) =>
                  handleInputChange(
                    "furnishingStatus",
                    event.target.value
                  )
                }
              >
                {FIELD_CONFIG_MAP.furnishingStatus.options.map(
                  (option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  )
                )}
              </select>

              {fieldErrors.furnishingStatus && (
                <span className="sell-property-field-error">
                  {
                    fieldErrors
                      .furnishingStatus
                  }
                </span>
              )}
            </div>

            <div className="sell-property-form-group">

              <label className="sell-property-label">
                Property Age
              </label>

              <select
                className="sell-property-select"
                value={formData.propertyAge}
                onChange={(event) =>
                  handleInputChange(
                    "propertyAge",
                    event.target.value
                  )
                }
              >
                {FIELD_CONFIG_MAP.propertyAge.options.map(
                  (option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="sell-property-form-group">

              <label className="sell-property-label">
                Parking
              </label>

              <select
                className="sell-property-select"
                value={formData.parking}
                onChange={(event) =>
                  handleInputChange(
                    "parking",
                    event.target.value
                  )
                }
              >
                {FIELD_CONFIG_MAP.parking.options.map(
                  (option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
        </div>

        {/* LOCATION */}

        <div className="sell-property-section">

          <h3 className="sell-property-section-title">
            <span className="title-indicator"></span>
            Location
          </h3>

          <div className="sell-property-grid-3">

            <div className="sell-property-form-group">

              <label className="sell-property-label">
                State{" "}
                <span>*</span>
              </label>

              <select
                className="sell-property-select"
                value={formData.state}
                onChange={(event) =>
                  handleInputChange(
                    "state",
                    event.target.value
                  )
                }
              >
                {FIELD_CONFIG_MAP.state.options.map(
                  (option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="sell-property-form-group">

              <label className="sell-property-label">
                City{" "}
                <span>*</span>
              </label>

              <select
                className={`sell-property-select ${
                  fieldErrors.city
                    ? "has-error"
                    : ""
                }`}
                value={formData.city}
                onChange={(event) =>
                  handleInputChange(
                    "city",
                    event.target.value
                  )
                }
              >
                {FIELD_CONFIG_MAP.city.options.map(
                  (option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  )
                )}
              </select>

              {fieldErrors.city && (
                <span className="sell-property-field-error">
                  {fieldErrors.city}
                </span>
              )}
            </div>

            <div className="sell-property-form-group">

              <label className="sell-property-label">
                Locality{" "}
                <span>*</span>
              </label>

              <input
                type="text"
                className={`sell-property-input ${
                  fieldErrors.locality
                    ? "has-error"
                    : ""
                }`}
                placeholder={
                  FIELD_CONFIG_MAP
                    .locality
                    .placeholder
                }
                value={formData.locality}
                onChange={(event) =>
                  handleInputChange(
                    "locality",
                    event.target.value
                  )
                }
              />

              {fieldErrors.locality && (
                <span className="sell-property-field-error">
                  {fieldErrors.locality}
                </span>
              )}
            </div>
          </div>

          <div
            className="sell-property-grid-price"
            style={{
              marginTop: "16px",
            }}
          >

            <div className="sell-property-form-group">

              <label className="sell-property-label">
                Landmark
              </label>

              <input
                type="text"
                className="sell-property-input"
                placeholder={
                  FIELD_CONFIG_MAP
                    .landmark
                    .placeholder
                }
                value={formData.landmark}
                onChange={(event) =>
                  handleInputChange(
                    "landmark",
                    event.target.value
                  )
                }
              />
            </div>

            <div className="sell-property-form-group">

              <label className="sell-property-label">
                PIN Code{" "}
                <span>*</span>
              </label>

              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                className={`sell-property-input ${
                  fieldErrors.pinCode
                    ? "has-error"
                    : ""
                }`}
                placeholder={
                  FIELD_CONFIG_MAP
                    .pinCode
                    .placeholder
                }
                value={formData.pinCode}
                onChange={(event) => {
                  const value =
                    event.target.value.replace(
                      /\D/g,
                      ""
                    );

                  handleInputChange(
                    "pinCode",
                    value
                  );
                }}
              />

              {fieldErrors.pinCode && (
                <span className="sell-property-field-error">
                  {fieldErrors.pinCode}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* UPLOAD IMAGES */}

        <div className="sell-property-section">

          <h3 className="sell-property-section-title">
            <span className="title-indicator"></span>
            Upload Property Images
          </h3>

          <p className="sell-property-section-desc">
            Add clear photos of your property
            to attract more buyers. Maximum{" "}
            {MAX_IMAGES} images, {MAX_FILE_SIZE_MB}
            MB each.
          </p>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            multiple
            accept="image/png,image/jpeg,image/jpg,image/webp"
            style={{ display: "none" }}
          />

          <div
            className={`sell-property-upload-zone ${
              dragActive
                ? "drag-active"
                : ""
            } ${
              uploadedImages.length >=
              MAX_IMAGES
                ? "upload-disabled"
                : ""
            }`}
            onClick={() => {
              if (
                uploadedImages.length <
                MAX_IMAGES
              ) {
                fileInputRef.current?.click();
              }
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="upload-icon">
              📷
            </div>

            <strong>
              {dragActive
                ? "Drop your images here"
                : "Click to upload property images"}
            </strong>

            <span>
              Or drag and drop your images
              here
            </span>

            <small>
              PNG, JPG, JPEG, WEBP • Max{" "}
              {MAX_FILE_SIZE_MB}MB each •{" "}
              {uploadedImages.length}/
              {MAX_IMAGES} uploaded
            </small>
          </div>

          {uploadedImages.length > 0 && (
            <div className="sell-property-preview-grid">

              {uploadedImages.map(
                (image, index) => (
                  <div
                    className="sell-property-preview-item"
                    key={image.id}
                  >
                    <img
                      src={image.previewUrl}
                      alt={`Property ${index + 1}`}
                    />

                    <div className="sell-property-preview-overlay">
                      <span>
                        Image {index + 1}
                      </span>

                      <button
                        type="button"
                        className="remove-img-btn"
                        aria-label={`Remove image ${
                          index + 1
                        }`}
                        onClick={(event) => {
                          event.stopPropagation();

                          removeImage(index);
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* SUMMARY */}

        <div className="sell-property-section sell-property-summary-section">

          <h3 className="sell-property-section-title">
            <span className="title-indicator"></span>
            Form Summary
          </h3>

          <p className="sell-property-section-desc">
            Review the information before
            submitting your property.
          </p>

          <div className="sp-summary-table-wrapper">

            <table className="sp-summary-table">

              <thead>
                <tr>
                  <th className="sp-col-section">
                    Section
                  </th>

                  <th className="sp-col-fields">
                    Fields Included
                  </th>

                  <th className="sp-col-types">
                    Current Value
                  </th>
                </tr>
              </thead>

              <tbody>

                {summaryData.map(
                  (section) =>
                    section.rows.map(
                      (rowKey, rowIndex) => {
                        const rowConfig =
                          FIELD_CONFIG_MAP[
                            rowKey
                          ] || {};

                        const isUpload =
                          rowKey ===
                          "uploadImages";

                        return (
                          <tr
                            key={`${section.section}-${rowKey}`}
                            className={`sp-row sp-row-${section.section
                              .replace(
                                /\s+/g,
                                "-"
                              )
                              .toLowerCase()}`}
                          >
                            {rowIndex === 0 && (
                              <td
                                className="sp-section-cell"
                                rowSpan={
                                  section.rows
                                    .length
                                }
                              >
                                <div className="sp-section-cell-inner">

                                  {section.iconType ===
                                  "badge" ? (
                                    <div className="sp-section-badge">
                                      <span>
                                        {
                                          section.icon
                                        }
                                      </span>

                                      {
                                        section.badgeText
                                      }
                                    </div>
                                  ) : (
                                    <div className="sp-section-icon">
                                      {
                                        section.icon
                                      }
                                    </div>
                                  )}

                                  <span className="sp-section-name">
                                    {
                                      section.section
                                    }
                                  </span>
                                </div>
                              </td>
                            )}

                            <td className="sp-field-cell">

                              {isUpload
                                ? "Upload Property Images"
                                : rowConfig.label}

                              {rowConfig.required && (
                                <span className="sp-required">
                                  *
                                </span>
                              )}
                            </td>

                            <td className="sp-type-cell">
                              {renderSummaryControl(
                                rowKey
                              )}
                            </td>
                          </tr>
                        );
                      }
                    )
                )}

              </tbody>
            </table>
          </div>
        </div>

        {/* SUBMIT */}

        <div className="sell-property-action-footer">

          <button
            type="submit"
            className="sell-property-submit-btn"
            disabled={loading}
          >

            {loading ? (
              <>
                <span className="sp-submit-spinner"></span>
                Submitting Property...
              </>
            ) : (
              <>
                <span>✈</span>
                Submit Your Property →
              </>
            )}

          </button>

        </div>

      </form>

      {/* ROOM CONFIGURATION POPUP */}

      {roomModalOpen && draftRoomConfig && (
        <div
          className="sp-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sp-room-modal-title"
          onClick={cancelRoomConfig}
        >
          <div
            className="sp-modal-box"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sp-modal-header">
              <div>
                <h3 id="sp-room-modal-title">
                  Set room details
                </h3>

                <p>
                  For {formData.bhk} — adjust the exact
                  count for each room type
                </p>
              </div>

              <button
                type="button"
                className="sp-modal-close"
                onClick={cancelRoomConfig}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="sp-modal-body">

              <div className="sp-room-stepper-row">
                <span className="sp-room-stepper-label">
                  Bedrooms
                </span>

                <div className="sp-room-stepper">
                  <button
                    type="button"
                    onClick={() =>
                      adjustDraftRoomCount("bedrooms", -1)
                    }
                    aria-label="Decrease bedrooms"
                  >
                    −
                  </button>

                  <span>{draftRoomConfig.bedrooms}</span>

                  <button
                    type="button"
                    onClick={() =>
                      adjustDraftRoomCount("bedrooms", 1)
                    }
                    aria-label="Increase bedrooms"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="sp-room-stepper-row">
                <span className="sp-room-stepper-label">
                  Hall / living room
                </span>

                <div className="sp-room-stepper">
                  <button
                    type="button"
                    onClick={() =>
                      adjustDraftRoomCount("hall", -1)
                    }
                    aria-label="Decrease hall count"
                  >
                    −
                  </button>

                  <span>{draftRoomConfig.hall}</span>

                  <button
                    type="button"
                    onClick={() =>
                      adjustDraftRoomCount("hall", 1)
                    }
                    aria-label="Increase hall count"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="sp-room-stepper-row">
                <span className="sp-room-stepper-label">
                  Kitchen
                </span>

                <div className="sp-room-stepper">
                  <button
                    type="button"
                    onClick={() =>
                      adjustDraftRoomCount("kitchen", -1)
                    }
                    aria-label="Decrease kitchen count"
                  >
                    −
                  </button>

                  <span>{draftRoomConfig.kitchen}</span>

                  <button
                    type="button"
                    onClick={() =>
                      adjustDraftRoomCount("kitchen", 1)
                    }
                    aria-label="Increase kitchen count"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="sp-modal-divider">
                <span>Additional rooms</span>
              </div>

              {ADDITIONAL_ROOM_TYPES.map((room) => (
                <div
                  className="sp-room-stepper-row"
                  key={room.key}
                >
                  <span className="sp-room-stepper-label">
                    {room.label}
                  </span>

                  <div className="sp-room-stepper">
                    <button
                      type="button"
                      onClick={() =>
                        adjustDraftRoomCount(
                          room.key,
                          -1,
                          true
                        )
                      }
                      aria-label={`Decrease ${room.label}`}
                    >
                      −
                    </button>

                    <span>
                      {draftRoomConfig.additionalRooms[room.key]}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        adjustDraftRoomCount(
                          room.key,
                          1,
                          true
                        )
                      }
                      aria-label={`Increase ${room.label}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="sp-modal-footer">
              <button
                type="button"
                className="sp-modal-btn-secondary"
                onClick={cancelRoomConfig}
              >
                Cancel
              </button>

              <button
                type="button"
                className="sp-modal-btn-primary"
                onClick={saveRoomConfig}
              >
                Save room details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellProperty;