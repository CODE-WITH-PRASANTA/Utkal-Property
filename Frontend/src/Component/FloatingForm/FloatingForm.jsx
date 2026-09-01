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
   HEADER
========================================================= */

const FloatingFormHeader = ({
  onClose,
}) => {
  return (
    <div className="FloatingForm-header">

      <div
        className="FloatingForm-home-icon-box"
        aria-hidden="true"
      >
        <Home
          size={20}
          strokeWidth={2}
        />
      </div>


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

        <div
          className="FloatingForm-header-divider"
          aria-hidden="true"
        />

      </div>


      <button
        type="button"
        className="FloatingForm-close-btn"
        onClick={onClose}
        aria-label="Close enquiry form"
      >
        <X
          size={14}
          aria-hidden="true"
        />
      </button>

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
  const options = [
    "Buy",
    "Sell",
    "Rent",
  ];

  return (
    <fieldset className="FloatingForm-field FloatingForm-field--looking">

      <legend className="FloatingForm-sr-only">
        Looking For
      </legend>

      <div
        className="FloatingForm-field-icon"
        aria-hidden="true"
      >
        <Home size={15} />
      </div>


      <div className="FloatingForm-field-body">

        <span className="FloatingForm-field-label">
          Looking For
        </span>


        <div className="FloatingForm-radio-group">

          {options.map((option) => (
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

              <span
                className="FloatingForm-radio-custom"
                aria-hidden="true"
              />

              <span className="FloatingForm-radio-text">
                {option}
              </span>

            </label>
          ))}

        </div>

      </div>

    </fieldset>
  );
};


/* =========================================================
   SELECT FIELD
========================================================= */

const SelectField = ({
  id,
  name,
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

      <div
        className="FloatingForm-field-icon"
        aria-hidden="true"
      >
        {icon}
      </div>


      <div className="FloatingForm-field-body">

        <label
          htmlFor={id}
          className="FloatingForm-field-label"
        >
          {label}
        </label>


        <select
          id={id}
          name={name}
          aria-label={label}
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
        aria-hidden="true"
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

      <div
        className="FloatingForm-field-icon"
        aria-hidden="true"
      >
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
          name="mobile"
          value={value}
          onChange={onChange}
          placeholder="Enter mobile number"
          aria-label="Enter 10-digit mobile number"
          maxLength={10}
          inputMode="numeric"
          autoComplete="tel"
          required
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
      aria-label="Submit property enquiry"
    >

      <span className="FloatingForm-submit-text">
        {loading
          ? "Submitting..."
          : "Get Property Options"}
      </span>


      <span
        className="FloatingForm-submit-icon"
        aria-hidden="true"
      >

        {loading ? (
          <span className="FloatingForm-loading-dot">
            ...
          </span>
        ) : (
          <CircleCheck size={14} />
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
        aria-hidden="true"
      />

      <span className="FloatingForm-footer-text">
        Free Consultation • No obligation
      </span>

    </div>
  );
};


/* =========================================================
   NORMALIZE LOCATION RESPONSE
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
    .map((item) => {

      if (
        typeof item ===
        "string"
      ) {
        return {
          id: item,
          country: "",
          state: "",
          city: item,
          area: "",
          pincode: "",
          status: "Active",
        };
      }


      return {
        id:
          item?._id ||
          item?.id ||
          `${item?.city || ""}-${item?.area || ""}`,

        country:
          item?.country || "",

        state:
          item?.state ||
          item?.stateName ||
          "",

        city:
          item?.city ||
          item?.cityName ||
          item?.location ||
          "",

        area:
          item?.area ||
          item?.areaName ||
          item?.locality ||
          "",

        pincode:
          item?.pincode ||
          item?.pinCode ||
          "",

        status:
          item?.status ||
          "Active",
      };
    })
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
     FORM STATE
  ======================================================= */

  const [
    isOpen,
    setIsOpen,
  ] = useState(true);


  const [
    lookingFor,
    setLookingFor,
  ] = useState("Buy");


  const [
    propertyType,
    setPropertyType,
  ] = useState("");


  const [
    location,
    setLocation,
  ] = useState("");


  const [
    preferredArea,
    setPreferredArea,
  ] = useState("");


  const [
    budget,
    setBudget,
  ] = useState("");


  const [
    mobile,
    setMobile,
  ] = useState("");


  /* =======================================================
     LOCATION STATE
  ======================================================= */

  const [
    locationData,
    setLocationData,
  ] = useState([]);


  const [
    locationLoading,
    setLocationLoading,
  ] = useState(false);


  /* =======================================================
     SUBMIT STATE
  ======================================================= */

  const [
    loading,
    setLoading,
  ] = useState(false);


  const [
    message,
    setMessage,
  ] = useState("");


  const [
    messageType,
    setMessageType,
  ] = useState("");


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

<<<<<<< HEAD
     
=======

      console.log(
        "Fetching locations from:",
        `${API.defaults.baseURL}/locations`
      );
>>>>>>> 33dc575c48257ed0367008a23664dd650efa1e77


      const response =
        await API.get(
          "/locations"
        );

<<<<<<< HEAD
     
=======

      console.log(
        "Location API Response:",
        response.data
      );
>>>>>>> 33dc575c48257ed0367008a23664dd650efa1e77


      const normalized =
        normalizeLocations(
          response.data
        );

<<<<<<< HEAD
     
=======

      console.log(
        "Normalized Locations:",
        normalized
      );
>>>>>>> 33dc575c48257ed0367008a23664dd650efa1e77


      setLocationData(
        normalized
      );

    } catch (error) {

      console.error(
        "LOCATION FETCH ERROR:",
        error?.response?.data ||
          error
      );


      /*
        Don't break the form if the
        backend temporarily fails.
      */

      setLocationData([]);

    } finally {

      setLocationLoading(false);

    }
  };


  /* =========================================================
     LOAD LOCATIONS
  ========================================================= */

  useEffect(() => {

    fetchLocations();

  }, []);


  /* =========================================================
     UNIQUE CITY OPTIONS
  ========================================================= */

  const locationOptions =
    useMemo(() => {

      const cities =
        locationData
          .map(
            (item) =>
              String(
                item.city || ""
              ).trim()
          )
          .filter(Boolean);


      return [
        ...new Set(
          cities
        ),
      ].sort();

    }, [
      locationData,
    ]);


  /* =========================================================
     AREA OPTIONS
     BASED ON SELECTED LOCATION
  ========================================================= */

  const preferredAreaOptions =
    useMemo(() => {

      if (!location) {
        return [];
      }


      const selectedCity =
        location
          .trim()
          .toLowerCase();


      const areas =
        locationData
          .filter((item) => {

            const city =
              String(
                item.city || ""
              )
                .trim()
                .toLowerCase();

            return (
              city ===
              selectedCity
            );
          })
          .map(
            (item) =>
              String(
                item.area || ""
              ).trim()
          )
          .filter(Boolean);


      return [
        ...new Set(
          areas
        ),
      ].sort();

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

    resetForm();

    clearMessage();

    setIsOpen(true);

  };


  /* =========================================================
     MOBILE CHANGE
  ========================================================= */

  const handleMobileChange = (
    event
  ) => {

    const onlyNumbers =
      event.target.value.replace(
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

  const handlePropertyTypeChange = (
    event
  ) => {

    setPropertyType(
      event.target.value
    );

    clearMessage();

  };


  /* =========================================================
     LOCATION CHANGE
  ========================================================= */

  const handleLocationChange = (
    event
  ) => {

    const selectedLocation =
      event.target.value;


    setLocation(
      selectedLocation
    );


    /*
      Always clear old area when
      changing location.
    */

    setPreferredArea("");


    clearMessage();

  };


  /* =========================================================
     AREA CHANGE
  ========================================================= */

  const handlePreferredAreaChange = (
    event
  ) => {

    setPreferredArea(
      event.target.value
    );

    clearMessage();

  };


  /* =========================================================
     BUDGET CHANGE
  ========================================================= */

  const handleBudgetChange = (
    event
  ) => {

    setBudget(
      event.target.value
    );

    clearMessage();

  };


  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async () => {

    if (loading) {
      return;
    }


    clearMessage();


    /* =====================================================
       VALIDATION
    ===================================================== */

    if (!lookingFor) {

      setMessage(
        "Please select what you are looking for."
      );

      setMessageType("error");

      return;
    }


    if (!propertyType) {

      setMessage(
        "Please select a property type."
      );

      setMessageType("error");

      return;
    }


    if (!location) {

      setMessage(
        "Please select your preferred location."
      );

      setMessageType("error");

      return;
    }


    if (!preferredArea) {

      setMessage(
        "Please select your preferred area."
      );

      setMessageType("error");

      return;
    }


    if (!budget) {

      setMessage(
        "Please select your budget range."
      );

      setMessageType("error");

      return;
    }


    if (!mobile) {

      setMessage(
        "Please enter your mobile number."
      );

      setMessageType("error");

      return;
    }


    if (
      mobile.length !== 10
    ) {

      setMessage(
        "Please enter a valid 10-digit mobile number."
      );

      setMessageType("error");

      return;
    }


    /* =====================================================
       START LOADING
    ===================================================== */

    setLoading(true);


    try {

      /* ===================================================
         COMPLETE LEAD DATA
      =================================================== */

      const leadData = {

        /* CUSTOMER */

        fullName:
          "Property Enquiry",

        mobile:
          mobile,

        email:
          "",


        /* ENQUIRY */

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


        /* PROPERTY */

        propertyId:
          propertyId || null,

        propertyName:
          propertyName || "",

        project:
          "",


        /* CRM */

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


        /* NOTES */

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

<<<<<<< HEAD
    

=======

      console.log(
        "===================================="
      );

      console.log(
        "SUBMITTING FLOATING FORM"
      );

      console.log(
        "API:",
        `${API.defaults.baseURL}/leads`
      );

      console.log(
        "LEAD DATA:",
        leadData
      );

      console.log(
        "===================================="
      );
>>>>>>> 33dc575c48257ed0367008a23664dd650efa1e77


      /* ===================================================
         CREATE LEAD
      =================================================== */

      const response =
        await API.post(
          "/leads",
          leadData
        );

<<<<<<< HEAD
    
=======

      console.log(
        "LEAD CREATED:",
        response.data
      );
>>>>>>> 33dc575c48257ed0367008a23664dd650efa1e77


      /* ===================================================
         SUCCESS
      =================================================== */

      setMessage(
        response.data?.message ||
          "Thank you! Our property expert will contact you soon."
      );

      setMessageType(
        "success"
      );


      /*
        IMPORTANT:
        Reset all fields immediately
        after successful submission.
      */

      resetForm();


      /*
        Keep success message visible,
        then close the form.
      */

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
        "FLOATING FORM SUBMISSION ERROR"
      );

      console.error(
        "STATUS:",
        error?.response?.status
      );

      console.error(
        "RESPONSE:",
        error?.response?.data
      );

      console.error(
        "MESSAGE:",
        error?.message
      );

      console.error(
        "===================================="
      );


      setMessage(
        error?.response?.data?.message ||
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
    <aside
      className="FloatingForm-wrapper"
      role="complementary"
      aria-label="Property enquiry widget"
    >

      {/* ===================================================
          OPEN BUTTON
      =================================================== */}

      <button
        type="button"
        className={`FloatingForm-trigger-btn ${
          !isOpen
            ? "FloatingForm-trigger-btn--visible"
            : ""
        }`}
        onClick={openForm}
        aria-label="Open property enquiry form"
        aria-expanded={isOpen}
      >

        <MessageSquareText
          size={20}
          aria-hidden="true"
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
        role="dialog"
        aria-modal="false"
        aria-label="Enquire Now Form"
      >

        {/* HEADER */}

        <FloatingFormHeader
          onClose={closeForm}
        />


        {/* BODY */}

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
              role="alert"
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
            value={lookingFor}
            onChange={(value) => {

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
            id="floating-property-type"
            name="propertyType"
            icon={
              <Building2
                size={15}
              />
            }
            label="Property Type"
            placeholder="Select property type"
            value={propertyType}
            onChange={
              handlePropertyTypeChange
            }
            options={
              propertyTypes
            }
          />


          {/* =================================================
              LOCATION
          ================================================= */}

          <SelectField
            id="floating-location"
            name="location"
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
            value={location}
            onChange={
              handleLocationChange
            }
            options={
              locationOptions
            }
            disabled={
              locationLoading ||
              locationOptions.length ===
                0
            }
          />


          {/* =================================================
              PREFERRED AREA
          ================================================= */}

          <SelectField
            id="floating-preferred-area"
            name="preferredArea"
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
            id="floating-budget"
            name="budgetRange"
            icon={
              <ShieldCheck
                size={15}
              />
            }
            label="Budget Range"
            placeholder="Select budget range"
            value={budget}
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
            value={mobile}
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

    </aside>
  );
};


export default FloatingForm;