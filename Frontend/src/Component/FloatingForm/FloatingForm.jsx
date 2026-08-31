import React, { useEffect, useState } from "react";
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
const FloatingFormHeader = ({ onClose }) => {
  return (
    <div className="FloatingForm-header">
      <div className="FloatingForm-home-icon-box" aria-hidden="true">
        <Home size={20} strokeWidth={2} />
      </div>

      <button
        type="button"
        className="FloatingForm-close-btn"
        onClick={onClose}
        aria-label="Close enquiry form"
      >
        <X size={14} aria-hidden="true" />
      </button>

      <div className="FloatingForm-header-content">
        <h2 className="FloatingForm-header-title">Enquire Now</h2>
        <p className="FloatingForm-header-subtitle">
          Fill in your details and our property expert
          <br />
          will{" "}
          <span className="FloatingForm-header-highlight">
            contact you soon.
          </span>
        </p>
        <div className="FloatingForm-header-divider" aria-hidden="true"></div>
      </div>
    </div>
  );
};

/* =========================================================
   LOOKING FOR
========================================================= */
const LookingFor = ({ value, onChange }) => {
  return (
    <fieldset className="FloatingForm-field FloatingForm-field--looking">
      <legend className="FloatingForm-sr-only">Looking For</legend>
      <div className="FloatingForm-field-icon" aria-hidden="true">
        <Home size={15} />
      </div>

      <div className="FloatingForm-field-body">
        <span className="FloatingForm-field-label">Looking For</span>
        <div className="FloatingForm-radio-group">
          {["Rent", "Buy", "Sell"].map((option) => (
            <label className="FloatingForm-radio-option" key={option}>
              <input
                type="radio"
                name="lookingFor"
                value={option}
                checked={value === option}
                onChange={(e) => onChange(e.target.value)}
                className="FloatingForm-radio-input"
                aria-label={`Looking to ${option}`}
              />
              <span className="FloatingForm-radio-custom" aria-hidden="true"></span>
              <span className="FloatingForm-radio-text">{option}</span>
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
}) => {
  return (
    <div className="FloatingForm-field FloatingForm-field--select">
      <div className="FloatingForm-field-icon" aria-hidden="true">
        {icon}
      </div>

      <div className="FloatingForm-field-body">
        <label htmlFor={id} className="FloatingForm-field-label">
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
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
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
const MobileNumber = ({ value, onChange }) => {
  return (
    <div className="FloatingForm-field FloatingForm-field--mobile">
      <div className="FloatingForm-field-icon" aria-hidden="true">
        <Phone size={15} />
      </div>

      <div className="FloatingForm-field-body">
        <label htmlFor="FloatingFormMobile" className="FloatingForm-field-label">
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
const SubmitButton = ({ onClick, loading }) => {
  return (
    <button
      type="button"
      className="FloatingForm-submit-btn"
      onClick={onClick}
      disabled={loading}
      aria-label="Submit property enquiry"
    >
      <span className="FloatingForm-submit-text">
        {loading ? "Submitting..." : "Get Property Options"}
      </span>
      <span className="FloatingForm-submit-icon" aria-hidden="true">
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
      <ShieldCheck size={12} className="FloatingForm-footer-icon" aria-hidden="true" />
      <span className="FloatingForm-footer-text">
        Free Consultation • No obligation
      </span>
    </div>
  );
};

/* =========================================================
   LOCATION NORMALIZER
========================================================= */
const normalizeLocations = (responseData) => {
  const raw =
    responseData?.locations ||
    responseData?.data ||
    responseData?.results ||
    responseData;

  if (!Array.isArray(raw)) return [];

  const values = raw
    .map((item) => {
      if (typeof item === "string") return item;
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
    .map((item) => String(item).trim());

  return [...new Set(values)];
};

/* =========================================================
   MAIN FLOATING FORM
========================================================= */
const FloatingForm = ({ propertyId = "", propertyName = "" }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [lookingFor, setLookingFor] = useState("Rent");
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const propertyTypes = [
    "Apartment",
    "Villa",
    "Independent House",
    "Plot",
    "Commercial Property",
  ];

  const budgetOptions = [
    "Under ₹20 Lakhs",
    "₹20 - ₹40 Lakhs",
    "₹40 - ₹60 Lakhs",
    "₹60 Lakhs - ₹1 Crore",
    "Above ₹1 Crore",
  ];

  const fetchLocations = async () => {
    try {
      setLocationLoading(true);
      const response = await API.get("/locations");
      const locationList = normalizeLocations(response.data);
      setLocations(
        locationList.length > 0
          ? locationList
          : ["Bhubaneswar", "Cuttack", "Puri", "Khurda", "Kendrapara"]
      );
    } catch (error) {
      console.error("FETCH LOCATIONS ERROR:", error.response?.data || error);
      setLocations(["Bhubaneswar", "Cuttack", "Puri", "Khurda", "Kendrapara"]);
    } finally {
      setLocationLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const clearMessage = () => {
    setMessage("");
    setMessageType("");
  };

  const handleMobileChange = (e) => {
    const onlyNumbers = e.target.value.replace(/\D/g, "");
    setMobile(onlyNumbers.slice(0, 10));
    clearMessage();
  };

  const handlePropertyTypeChange = (e) => {
    setPropertyType(e.target.value);
    clearMessage();
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    clearMessage();
  };

  const handleBudgetChange = (e) => {
    setBudget(e.target.value);
    clearMessage();
  };

  const handleSubmit = async () => {
    try {
      clearMessage();

      if (!lookingFor) {
        setMessage("Please select what you are looking for.");
        setMessageType("error");
        return;
      }

      if (!propertyType) {
        setMessage("Please select a property type.");
        setMessageType("error");
        return;
      }

      if (!location) {
        setMessage("Please select your preferred location.");
        setMessageType("error");
        return;
      }

      if (!budget) {
        setMessage("Please select your budget range.");
        setMessageType("error");
        return;
      }

      if (!mobile || mobile.length !== 10) {
        setMessage("Please enter a valid 10-digit mobile number.");
        setMessageType("error");
        return;
      }

      setLoading(true);

      const leadData = {
        fullName: "Property Enquiry",
        mobile,
        email: "",
        source: "Website Floating Enquiry Form",
        lookingFor,
        interestedIn: propertyType,
        location,
        budgetRange: budget,
        propertyId: propertyId || null,
        propertyName: propertyName || "",
        agent: "",
        status: "New",
        priority: "Medium",
        followUpDate: "",
        score: 0,
        notes:
          `Looking For: ${lookingFor}. ` +
          `Property Type: ${propertyType}. ` +
          `Location: ${location}. ` +
          `Budget: ${budget}.` +
          (propertyName ? ` Property: ${propertyName}.` : ""),
      };

      const response = await API.post("/leads", leadData);

      setMessage(
        response.data?.message ||
          "Thank you! Our property expert will contact you soon."
      );
      setMessageType("success");

      setLookingFor("Rent");
      setPropertyType("");
      setLocation("");
      setBudget("");
      setMobile("");
    } catch (error) {
      console.error("LEAD SUBMISSION ERROR:", error.response?.data || error);
      setMessage(
        error.response?.data?.message ||
          "Unable to submit your enquiry. Please try again."
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside
      className="FloatingForm-wrapper"
      role="complementary"
      aria-label="Property enquiry widget"
    >
      <button
        type="button"
        className={`FloatingForm-trigger-btn ${
          !isOpen ? "FloatingForm-trigger-btn--visible" : ""
        }`}
        onClick={() => setIsOpen(true)}
        aria-label="Open property enquiry form"
        aria-expanded={isOpen}
      >
        <MessageSquareText size={20} aria-hidden="true" />
        <span className="FloatingForm-trigger-text">Enquire Now</span>
      </button>

      <div
        className={`FloatingForm-card ${
          isOpen ? "FloatingForm-card--open" : "FloatingForm-card--closed"
        }`}
        role="dialog"
        aria-modal="false"
        aria-label="Enquire Now Form"
      >
        <FloatingFormHeader
          onClose={() => {
            setIsOpen(false);
            clearMessage();
          }}
        />

        <div className="FloatingForm-body">
          {message && (
            <div
              className={`FloatingForm-message ${
                messageType === "success"
                  ? "FloatingForm-message--success"
                  : "FloatingForm-message--error"
              }`}
              role="alert"
            >
              {message}
            </div>
          )}

          <LookingFor
            value={lookingFor}
            onChange={(val) => {
              setLookingFor(val);
              clearMessage();
            }}
          />

          <SelectField
            id="floating-property-type"
            name="propertyType"
            icon={<Building2 size={15} />}
            label="Property Type"
            placeholder="Select property type"
            value={propertyType}
            onChange={handlePropertyTypeChange}
            options={propertyTypes}
          />

          <SelectField
            id="floating-location"
            name="location"
            icon={<MapPin size={15} />}
            label="Preferred Location"
            placeholder={
              locationLoading ? "Loading locations..." : "Select location"
            }
            value={location}
            onChange={handleLocationChange}
            options={locations}
          />

          <SelectField
            id="floating-budget"
            name="budget"
            icon={<ShieldCheck size={15} />}
            label="Budget Range"
            placeholder="Select budget range"
            value={budget}
            onChange={handleBudgetChange}
            options={budgetOptions}
          />

          <MobileNumber value={mobile} onChange={handleMobileChange} />

          <SubmitButton onClick={handleSubmit} loading={loading} />

          <FloatingFormFooter />
        </div>
      </div>
    </aside>
  );
};

export default FloatingForm;