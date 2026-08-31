
import React, {
  useEffect,
  useMemo,
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
            "Buy",
            "Sell",
            "Rent",
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
  disabled = false,
}) => {

  return (
    <div
      className={`FloatingForm-field FloatingForm-field--select ${
        disabled
          ? "FloatingForm-field--disabled"
          : ""
      }`}
    >

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
          disabled={disabled}
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
          inputMode="numeric"
          autoComplete="tel"
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

        {loading ? (
          <span className="FloatingForm-loading-dot">
            ...
          </span>
        ) : (
          <CircleCheck
            size={14}
          />
        )}

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
    responseData?.data ||
    responseData?.locations ||
    responseData?.results ||
    responseData;

  if (!Array.isArray(raw)) {
    return [];
  }

  return raw

    .filter(
      (item) =>
        item &&
        typeof item === "object"
    )

    .map((item) => ({

      id:
        item._id ||
        item.id ||
        `${item.city || ""}-${item.area || ""}`,

      country:
        item.country ||
        "",

      state:
        item.state ||
        "",

      city:
        item.city ||
        "",

      area:
        item.area ||
        "",

      pincode:
        item.pincode ||
        "",

      status:
        item.status ||
        "Active",

    }))

    .filter(
      (item) =>
        item.city ||
        item.area
    );
};


/* =========================================================
   MAIN FLOATING FORM
========================================================= */

const FloatingForm = ({
  propertyId = "",
  propertyName = "",
}) => {

  /* =======================================================
     FORM OPEN / CLOSE
  ======================================================= */

  const [isOpen, setIsOpen] =
    useState(true);


  /* =======================================================
     FORM VALUES
  ======================================================= */

  const [lookingFor, setLookingFor] =
    useState("Buy");

  const [propertyType, setPropertyType] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [preferredArea, setPreferredArea] =
    useState("");

  const [budget, setBudget] =
    useState("");

  const [mobile, setMobile] =
    useState("");


  /* =======================================================
     LOCATION DATA
  ======================================================= */

  const [locationData, setLocationData] =
    useState([]);

  const [locationLoading, setLocationLoading] =
    useState(false);


  /* =======================================================
     SUBMIT STATES
  ======================================================= */

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [messageType, setMessageType] =
    useState("");


  /* =========================================================
     PROPERTY TYPES
  ========================================================= */

  const propertyTypes = [
    "Apartment",
  "Villa",
  "Duplex / Independent House",
  "Plot",
  "Commercial Property",
  ];


  /* =========================================================
     BUDGET OPTIONS
  ========================================================= */

  const budgetOptions = [
    "Starting - ₹60 Lakhs",
    "₹60 Lakhs - ₹1.2 Crore",
    "₹1.2 Crore - ₹2.5 Crore",
    "Above ₹2.5 Crore",
  ];


  /* =========================================================
     FETCH LOCATIONS
  ========================================================= */

  const fetchLocations = async () => {

    try {

      setLocationLoading(true);

      console.log(
        "Fetching locations..."
      );

      const response =
        await API.get(
          "/locations"
        );

      console.log(
        "Location API response:",
        response.data
      );

      const normalized =
        normalizeLocations(
          response.data
        );

      console.log(
        "Normalized locations:",
        normalized
      );

      setLocationData(
        normalized
      );

    } catch (error) {

      console.error(
        "LOCATION FETCH ERROR:",
        error.response?.data ||
          error
      );

      setLocationData([]);

    } finally {

      setLocationLoading(false);

    }
  };


  /* =========================================================
     FETCH LOCATIONS ON COMPONENT LOAD
  ========================================================= */

  useEffect(() => {

    fetchLocations();

  }, []);


  /* =========================================================
     UNIQUE CITY / LOCATION OPTIONS
  ========================================================= */

  const locationOptions =
    useMemo(() => {

      const cities =
        locationData

          .map(
            (item) =>
              item.city
          )

          .filter(Boolean);

      return [
        ...new Set(cities),
      ];

    }, [
      locationData,
    ]);


  /* =========================================================
     PREFERRED AREA OPTIONS
     BASED ON LOCATION
  ========================================================= */

  const preferredAreaOptions =
    useMemo(() => {

      if (!location) {
        return [];
      }

      const areas =
        locationData

          .filter(
            (item) =>
              item.city ===
              location
          )

          .map(
            (item) =>
              item.area
          )

          .filter(Boolean);

      return [
        ...new Set(areas),
      ];

    }, [
      location,
      locationData,
    ]);


  /* =========================================================
     CLEAR MESSAGE
  ========================================================= */

  const clearMessage = () => {

    setMessage("");
    setMessageType("");

  };


  /* =========================================================
     RESET FORM
  ========================================================= */

  const resetForm = () => {

    setLookingFor("Buy");

    setPropertyType("");

    setLocation("");

    setPreferredArea("");

    setBudget("");

    setMobile("");

  };


  /* =========================================================
     CLOSE FORM
  ========================================================= */

  const closeForm = () => {

    resetForm();

    clearMessage();

    setIsOpen(false);

  };


  /* =========================================================
     OPEN FORM
  ========================================================= */

  const openForm = () => {

    /*
     * Always make sure the form is clean
     * when it opens again.
     */

    resetForm();

    clearMessage();

    setIsOpen(true);

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
      onlyNumbers.slice(
        0,
        10
      )
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

      const selectedLocation =
        e.target.value;

      setLocation(
        selectedLocation
      );

      /*
       * Reset area whenever location
       * changes so an old area cannot
       * be submitted with a new location.
       */

      setPreferredArea("");

      clearMessage();

    };


  /* =========================================================
     AREA CHANGE
  ========================================================= */

  const handlePreferredAreaChange =
    (e) => {

      setPreferredArea(
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
     SUBMIT FORM
  ========================================================= */

  const handleSubmit = async () => {

    /*
     * Prevent double click / duplicate
     * enquiry submission.
     */

    if (loading) {
      return;
    }


    try {

      clearMessage();


      /* ===================================================
         VALIDATION
      =================================================== */

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


      if (!preferredArea) {

        setMessage(
          "Please select your preferred area."
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


      /* ===================================================
         START LOADING
      =================================================== */

      setLoading(true);


      /* ===================================================
         COMPLETE LEAD PAYLOAD
      =================================================== */

      const leadData = {

        /*
         * CUSTOMER
         */

        fullName:
          "Property Enquiry",

        mobile:
          mobile,

        email:
          "",


        /*
         * ENQUIRY
         */

        source:
          "Website Floating Enquiry Form",

        lookingFor:
          lookingFor,

        interestedIn:
          propertyType,

        location:
          location,

        preferredArea:
          preferredArea,

        budgetRange:
          budget,


        /*
         * PROPERTY
         */

        propertyId:
          propertyId ||
          null,

        propertyName:
          propertyName ||
          "",

        project:
          "",


        /*
         * CRM
         */

        agent:
          "",

        status:
          "New",

        priority:
          "Medium",

        followUpDate:
          "",

        score:
          0,


        /*
         * NOTES
         */

        notes:
          `Looking For: ${lookingFor}. ` +
          `Property Type: ${propertyType}. ` +
          `Preferred Location: ${location}. ` +
          `Preferred Area: ${preferredArea}. ` +
          `Budget Range: ${budget}.` +
          (
            propertyName
              ? ` Property: ${propertyName}.`
              : ""
          ),
      };


      console.log(
        "===================================="
      );

      console.log(
        "SUBMITTING FLOATING FORM"
      );

      console.log(
        "LEAD DATA:",
        leadData
      );

      console.log(
        "===================================="
      );


      /* ===================================================
         BACKEND REQUEST
      =================================================== */

      const response =
        await API.post(
          "/leads",
          leadData
        );


      console.log(
        "LEAD CREATED SUCCESSFULLY:",
        response.data
      );


      /* ===================================================
         SUCCESS MESSAGE
      =================================================== */

      setMessage(
        response.data?.message ||
          "Thank you! Our property expert will contact you soon."
      );

      setMessageType(
        "success"
      );


      /* ===================================================
         RESET ALL FORM FIELDS
      =================================================== */

      resetForm();


      /* ===================================================
         CLOSE FORM AFTER SUCCESS
      =================================================== */

      setTimeout(() => {

        setMessage("");

        setMessageType("");

        setIsOpen(false);

      }, 1800);


    } catch (error) {

      console.error(
        "===================================="
      );

      console.error(
        "FLOATING FORM SUBMISSION ERROR:",
        error.response?.data ||
          error
      );

      console.error(
        "===================================="
      );


      /* ===================================================
         ERROR MESSAGE
      =================================================== */

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


      {/* ===================================================
          FLOATING OPEN BUTTON
      =================================================== */}

      <button
        type="button"
        className={`FloatingForm-trigger-btn ${
          !isOpen
            ? "FloatingForm-trigger-btn--visible"
            : ""
        }`}
        onClick={
          openForm
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


      {/* ===================================================
          FORM CARD
      =================================================== */}

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
          onClose={
            closeForm
          }
        />


        {/* =================================================
            BODY
        ================================================= */}

        <div className="FloatingForm-body">


          {/* =================================================
              MESSAGE
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

              {messageType ===
              "success" ? (
                <CircleCheck
                  size={15}
                />
              ) : (
                <X
                  size={15}
                />
              )}

              <span>
                {message}
              </span>

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
              PREFERRED LOCATION
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
                : locationOptions.length
                ? "Select location"
                : "No locations available"
            }
            value={
              location
            }
            onChange={
              handleLocationChange
            }
            options={
              locationOptions
            }
            disabled={
              locationLoading ||
              locationOptions.length === 0
            }
          />


          {/* =================================================
              PREFERRED AREA
          ================================================= */}

          <SelectField
            icon={
              <MapPin
                size={15}
              />
            }
            label="Preferred Area"
            placeholder={
              !location
                ? "Select location first"
                : preferredAreaOptions.length
                ? "Select preferred area"
                : "No areas available"
            }
            value={
              preferredArea
            }
            onChange={
              handlePreferredAreaChange
            }
            options={
              preferredAreaOptions
            }
            disabled={
              !location ||
              preferredAreaOptions.length ===
                0
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

