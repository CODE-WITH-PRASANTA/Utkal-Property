import React, {
  useEffect,
  useState,
} from "react";

import {
  Home,
  X,
  Building2,
  MapPin,
  ShieldCheck,
  Phone,
  ChevronDown,
  CircleCheck,
  MessageSquareText,
} from "lucide-react";

import API from "../../api/axios";

import "./FloatingForm.css";

/* =========================================================
   HEADER SECTION
========================================================= */

const FloatingFormHeader = ({
  onClose,
}) => {
  return (
    <div className="FloatingForm-header">

      <div className="FloatingForm-home-icon-box">
        <Home
          size={20}
          strokeWidth={2}
        />
      </div>

      <button
        type="button"
        className="FloatingForm-close-btn"
        onClick={onClose}
        aria-label="Close form"
      >
        <X size={14} />
      </button>

      <div className="FloatingForm-header-content">

        <h2 className="FloatingForm-header-title">
          Enquire Now
        </h2>

        <p className="FloatingForm-header-subtitle">
          Fill in your details and our property expert
          <br />
          will{" "}
          <span className="FloatingForm-header-highlight">
            contact you soon.
          </span>
        </p>

        <div className="FloatingForm-header-divider"></div>

      </div>
    </div>
  );
};

/* =========================================================
   LOOKING FOR
========================================================= */

const LookingFor = ({
  value,
  onChange,
}) => {
  return (
    <div className="FloatingForm-field FloatingForm-field--looking">

      <div className="FloatingForm-field-icon">
        <Home size={15} />
      </div>

      <div className="FloatingForm-field-body">

        <label className="FloatingForm-field-label">
          Looking For
        </label>

        <div className="FloatingForm-radio-group">

          {[
            "Rent",
            "Buy",
            "Sell",
          ].map((option) => (
            <label
              className="FloatingForm-radio-option"
              key={option}
            >

              <input
                type="radio"
                name="lookingFor"
                value={option}
                checked={
                  value === option
                }
                onChange={(e) =>
                  onChange(
                    e.target.value
                  )
                }
                className="FloatingForm-radio-input"
              />

              <span className="FloatingForm-radio-custom"></span>

              <span className="FloatingForm-radio-text">
                {option}
              </span>

            </label>
          ))}

        </div>
      </div>
    </div>
  );
};

/* =========================================================
   SELECT FIELD
========================================================= */

const SelectField = ({
  icon,
  label,
  placeholder,
  value,
  options,
  onChange,
}) => {
  return (
    <div className="FloatingForm-field FloatingForm-field--select">

      <div className="FloatingForm-field-icon">
        {icon}
      </div>

      <div className="FloatingForm-field-body">

        <label className="FloatingForm-field-label">
          {label}
        </label>

        <select
          value={value}
          onChange={onChange}
          className="FloatingForm-select-element"
          required
        >

          <option
            value=""
            disabled
          >
            {placeholder}
          </option>

          {options.map(
            (option) => (
              <option
                value={option}
                key={option}
              >
                {option}
              </option>
            )
          )}

        </select>
      </div>

      <ChevronDown
        className="FloatingForm-select-arrow"
        size={15}
      />

    </div>
  );
};

/* =========================================================
   MOBILE NUMBER
========================================================= */

const MobileNumber = ({
  value,
  onChange,
}) => {
  return (
    <div className="FloatingForm-field FloatingForm-field--mobile">

      <div className="FloatingForm-field-icon">
        <Phone size={15} />
      </div>

      <div className="FloatingForm-field-body">

        <label
          htmlFor="FloatingFormMobile"
          className="FloatingForm-field-label"
        >
          Mobile Number
        </label>

        <input
          id="FloatingFormMobile"
          type="tel"
          value={value}
          onChange={onChange}
          placeholder="Enter mobile number"
          maxLength={10}
          className="FloatingForm-input-element"
        />

      </div>
    </div>
  );
};

/* =========================================================
   SUBMIT BUTTON
========================================================= */

const SubmitButton = ({
  onClick,
  loading,
}) => {
  return (
    <button
      type="button"
      className="FloatingForm-submit-btn"
      onClick={onClick}
      disabled={loading}
    >

      <span className="FloatingForm-submit-text">
        {loading
          ? "Submitting..."
          : "Get Property Options"}
      </span>

      <span className="FloatingForm-submit-icon">
        <CircleCheck size={14} />
      </span>

    </button>
  );
};

/* =========================================================
   FOOTER
========================================================= */

const FloatingFormFooter = () => {
  return (
    <div className="FloatingForm-footer">

      <ShieldCheck
        size={12}
        className="FloatingForm-footer-icon"
      />

      <span className="FloatingForm-footer-text">
        Free Consultation • No obligation
      </span>

    </div>
  );
};

/* =========================================================
   LOCATION NORMALIZER
========================================================= */

const normalizeLocations = (
  responseData
) => {
  const raw =
    responseData?.locations ||
    responseData?.data ||
    responseData?.results ||
    responseData;

  if (!Array.isArray(raw)) {
    return [];
  }

  const values = raw
    .map((item) => {
      if (
        typeof item ===
        "string"
      ) {
        return item;
      }

      return (
        item?.name ||
        item?.location ||
        item?.city ||
        item?.title ||
        item?.area ||
        item?.locality ||
        item?.locationName ||
        ""
      );
    })
    .filter(Boolean)
    .map((item) =>
      String(item).trim()
    );

  return [
    ...new Set(values),
  ];
};

/* =========================================================
   MAIN FLOATING FORM
========================================================= */

const FloatingForm = ({
  propertyId = "",
  propertyName = "",
}) => {

  const [isOpen, setIsOpen] =
    useState(true);

  const [lookingFor, setLookingFor] =
    useState("Rent");

  const [propertyType, setPropertyType] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [budget, setBudget] =
    useState("");

  const [mobile, setMobile] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [locationLoading, setLocationLoading] =
    useState(false);

  const [locations, setLocations] =
    useState([]);

  const [message, setMessage] =
    useState("");

  const [messageType, setMessageType] =
    useState("");

  /* =========================================================
     PROPERTY TYPES
     
     UI stays exactly the same.
  ========================================================= */

  const propertyTypes = [
    "Apartment",
    "Villa",
    "Independent House",
    "Plot",
    "Commercial Property",
  ];

  /* =========================================================
     BUDGET OPTIONS
  ========================================================= */

  const budgetOptions = [
    "Under ₹20 Lakhs",
    "₹20 - ₹40 Lakhs",
    "₹40 - ₹60 Lakhs",
    "₹60 Lakhs - ₹1 Crore",
    "Above ₹1 Crore",
  ];

  /* =========================================================
     FETCH LOCATIONS
  ========================================================= */

  const fetchLocations = async () => {
    try {
      setLocationLoading(true);

     

      const response =
        await API.get(
          "/locations"
        );

     

      const locationList =
        normalizeLocations(
          response.data
        );

     

      setLocations(
        locationList
      );
    } catch (error) {
      console.error(
        "FETCH LOCATIONS ERROR:",
        error.response?.data ||
          error
      );

      /*
       * Fallback only if API fails.
       * This does not change your UI.
       */
      setLocations([
        "Bhubaneswar",
        "Cuttack",
        "Puri",
        "Khurda",
        "Kendrapara",
      ]);
    } finally {
      setLocationLoading(false);
    }
  };

  /* =========================================================
     FETCH LOCATIONS ON FORM LOAD
  ========================================================= */

  useEffect(() => {
    fetchLocations();
  }, []);

  /* =========================================================
     RESET MESSAGE
  ========================================================= */

  const clearMessage = () => {
    setMessage("");
    setMessageType("");
  };

  /* =========================================================
     MOBILE CHANGE
  ========================================================= */

  const handleMobileChange = (
    e
  ) => {
    const onlyNumbers =
      e.target.value.replace(
        /\D/g,
        ""
      );

    setMobile(
      onlyNumbers.slice(0, 10)
    );

    clearMessage();
  };

  /* =========================================================
     PROPERTY TYPE CHANGE
  ========================================================= */

  const handlePropertyTypeChange =
    (e) => {
      setPropertyType(
        e.target.value
      );

      clearMessage();
    };

  /* =========================================================
     LOCATION CHANGE
  ========================================================= */

  const handleLocationChange =
    (e) => {
      setLocation(
        e.target.value
      );

      clearMessage();
    };

  /* =========================================================
     BUDGET CHANGE
  ========================================================= */

  const handleBudgetChange =
    (e) => {
      setBudget(
        e.target.value
      );

      clearMessage();
    };

  /* =========================================================
     SUBMIT LEAD
  ========================================================= */

  const handleSubmit = async () => {
    try {
      clearMessage();

      /* =================================================
         VALIDATION
      ================================================= */

      if (!lookingFor) {
        setMessage(
          "Please select what you are looking for."
        );

        setMessageType(
          "error"
        );

        return;
      }

      if (!propertyType) {
        setMessage(
          "Please select a property type."
        );

        setMessageType(
          "error"
        );

        return;
      }

      if (!location) {
        setMessage(
          "Please select your preferred location."
        );

        setMessageType(
          "error"
        );

        return;
      }

      if (!budget) {
        setMessage(
          "Please select your budget range."
        );

        setMessageType(
          "error"
        );

        return;
      }

      if (!mobile) {
        setMessage(
          "Please enter your mobile number."
        );

        setMessageType(
          "error"
        );

        return;
      }

      if (
        mobile.length !== 10
      ) {
        setMessage(
          "Please enter a valid 10-digit mobile number."
        );

        setMessageType(
          "error"
        );

        return;
      }

      /* =================================================
         START LOADING
      ================================================= */

      setLoading(true);

      /* =================================================
         LEAD PAYLOAD
         
         IMPORTANT:
         These names match the backend schema.
      ================================================= */

      const leadData = {
        /*
         * Since your current UI does not have
         * a customer name field, backend will
         * use "Property Enquiry".
         */
        fullName:
          "Property Enquiry",

        mobile:
          mobile,

        email: "",

        source:
          "Website Floating Enquiry Form",

        /*
         * Keep lookingFor in backend
         * as a separate field.
         */
        lookingFor:
          lookingFor,

        /*
         * Property type
         */
        interestedIn:
          propertyType,

        /*
         * Selected location
         */
        location:
          location,

        /*
         * Budget
         */
        budgetRange:
          budget,

        /*
         * If form is opened from
         * PropertyDetails, save
         * the particular property.
         */
        propertyId:
          propertyId || null,

        propertyName:
          propertyName || "",

        /*
         * Default CRM values
         */
        agent: "",

        status: "New",

        priority: "Medium",

        followUpDate: "",

        score: 0,

        /*
         * Save all enquiry information
         * in notes as well.
         */
        notes:
          `Looking For: ${lookingFor}. ` +
          `Property Type: ${propertyType}. ` +
          `Location: ${location}. ` +
          `Budget: ${budget}.` +
          (propertyName
            ? ` Property: ${propertyName}.`
            : ""),
      };

    


      /* =================================================
         POST API
      ================================================= */

      const response =
        await API.post(
          "/leads",
          leadData
        );

    

      /* =================================================
         SUCCESS
      ================================================= */

      setMessage(
        response.data?.message ||
          "Thank you! Our property expert will contact you soon."
      );

      setMessageType(
        "success"
      );

      /* =================================================
         RESET FORM
      ================================================= */

      setLookingFor(
        "Rent"
      );

      setPropertyType("");

      setLocation("");

      setBudget("");

      setMobile("");

    } catch (error) {
      console.error(
        "===================================="
      );

      console.error(
        "LEAD SUBMISSION ERROR:",
        error.response?.data ||
          error
      );

      console.error(
        "===================================="
      );

      setMessage(
        error.response?.data
          ?.message ||
          "Unable to submit your enquiry. Please try again."
      );

      setMessageType(
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="FloatingForm-wrapper">

      {/* =================================================
          FLOATING TOGGLE
      ================================================= */}

      <button
        type="button"
        className={`FloatingForm-trigger-btn ${
          !isOpen
            ? "FloatingForm-trigger-btn--visible"
            : ""
        }`}
        onClick={() =>
          setIsOpen(true)
        }
        aria-label="Open property enquiry form"
      >
        <MessageSquareText
          size={20}
        />

        <span className="FloatingForm-trigger-text">
          Enquire Now
        </span>
      </button>

      {/* =================================================
          FORM CARD
      ================================================= */}

      <div
        className={`FloatingForm-card ${
          isOpen
            ? "FloatingForm-card--open"
            : "FloatingForm-card--closed"
        }`}
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <FloatingFormHeader
          onClose={() => {
            setIsOpen(false);

            clearMessage();
          }}
        />

        {/* =================================================
            BODY
        ================================================= */}

        <div className="FloatingForm-body">

          {/* =================================================
              STATUS MESSAGE
          ================================================= */}

          {message && (
            <div
              className={`FloatingForm-message ${
                messageType ===
                "success"
                  ? "FloatingForm-message--success"
                  : "FloatingForm-message--error"
              }`}
            >
              {message}
            </div>
          )}

          {/* =================================================
              LOOKING FOR
          ================================================= */}

          <LookingFor
            value={
              lookingFor
            }
            onChange={(
              value
            ) => {
              setLookingFor(
                value
              );

              clearMessage();
            }}
          />

          {/* =================================================
              PROPERTY TYPE
          ================================================= */}

          <SelectField
            icon={
              <Building2
                size={15}
              />
            }
            label="Property Type"
            placeholder="Select property type"
            value={
              propertyType
            }
            onChange={
              handlePropertyTypeChange
            }
            options={
              propertyTypes
            }
          />

          {/* =================================================
              LOCATION
              
              NOW COMES FROM:
              GET /api/locations
          ================================================= */}

          <SelectField
            icon={
              <MapPin
                size={15}
              />
            }
            label="Preferred Location"
            placeholder={
              locationLoading
                ? "Loading locations..."
                : "Select location"
            }
            value={
              location
            }
            onChange={
              handleLocationChange
            }
            options={
              locations
            }
          />

          {/* =================================================
              BUDGET
          ================================================= */}

          <SelectField
            icon={
              <ShieldCheck
                size={15}
              />
            }
            label="Budget Range"
            placeholder="Select budget range"
            value={
              budget
            }
            onChange={
              handleBudgetChange
            }
            options={
              budgetOptions
            }
          />

          {/* =================================================
              MOBILE
          ================================================= */}

          <MobileNumber
            value={
              mobile
            }
            onChange={
              handleMobileChange
            }
          />

          {/* =================================================
              SUBMIT
          ================================================= */}

          <SubmitButton
            onClick={
              handleSubmit
            }
            loading={
              loading
            }
          />

          {/* =================================================
              FOOTER
          ================================================= */}

          <FloatingFormFooter />

        </div>
      </div>
    </div>
  );
};

export default FloatingForm;