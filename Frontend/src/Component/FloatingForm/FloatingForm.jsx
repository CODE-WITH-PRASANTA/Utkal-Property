import React, { useState } from "react";
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

import "./FloatingForm.css";

/* =========================================================
   HEADER SECTION
========================================================= */
const FloatingFormHeader = ({ onClose }) => {
  return (
    <div className="FloatingForm-header">
      <div className="FloatingForm-home-icon-box">
        <Home size={20} strokeWidth={2} />
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
        <h2 className="FloatingForm-header-title">Enquire Now</h2>
        <p className="FloatingForm-header-subtitle">
          Fill in your details and our property expert
          <br />
          will <span className="FloatingForm-header-highlight">contact you soon.</span>
        </p>
        <div className="FloatingForm-header-divider"></div>
      </div>
    </div>
  );
};

/* =========================================================
   LOOKING FOR (RADIO) SECTION
========================================================= */
const LookingFor = ({ value, onChange }) => {
  return (
    <div className="FloatingForm-field FloatingForm-field--looking">
      <div className="FloatingForm-field-icon">
        <Home size={15} />
      </div>

      <div className="FloatingForm-field-body">
        <label className="FloatingForm-field-label">Looking For</label>

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
              />
              <span className="FloatingForm-radio-custom"></span>
              <span className="FloatingForm-radio-text">{option}</span>
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
      <div className="FloatingForm-field-icon">{icon}</div>

      <div className="FloatingForm-field-body">
        <label className="FloatingForm-field-label">{label}</label>

        <select
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

      <ChevronDown className="FloatingForm-select-arrow" size={15} />
    </div>
  );
};

/* =========================================================
   MOBILE NUMBER FIELD
========================================================= */
const MobileNumber = ({ value, onChange }) => {
  return (
    <div className="FloatingForm-field FloatingForm-field--mobile">
      <div className="FloatingForm-field-icon">
        <Phone size={15} />
      </div>

      <div className="FloatingForm-field-body">
        <label htmlFor="FloatingFormMobile" className="FloatingForm-field-label">
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
const SubmitButton = ({ onClick }) => {
  return (
    <button
      type="button"
      className="FloatingForm-submit-btn"
      onClick={onClick}
    >
      <span className="FloatingForm-submit-text">Get Property Options</span>
      <span className="FloatingForm-submit-icon">
        <CircleCheck size={14} />
      </span>
    </button>
  );
};

/* =========================================================
   FOOTER SECTION
========================================================= */
const FloatingFormFooter = () => {
  return (
    <div className="FloatingForm-footer">
      <ShieldCheck size={12} className="FloatingForm-footer-icon" />
      <span className="FloatingForm-footer-text">Free Consultation • No obligation</span>
    </div>
  );
};

/* =========================================================
   MAIN FLOATING FORM
========================================================= */
const FloatingForm = () => {
  const [isOpen, setIsOpen] = useState(true);

  const [lookingFor, setLookingFor] = useState("Rent");
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSubmit = () => {
    const formData = {
      lookingFor,
      propertyType,
      location,
      budget,
      mobile,
    };

    console.log("Property Enquiry Submitted:", formData);
  };

  return (
    <div className="FloatingForm-wrapper">
      {/* Floating Toggle Button (Appears when form is minimized) */}
      <button
        type="button"
        className={`FloatingForm-trigger-btn ${!isOpen ? "FloatingForm-trigger-btn--visible" : ""}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open property enquiry form"
      >
        <MessageSquareText size={20} />
        <span className="FloatingForm-trigger-text">Enquire Now</span>
      </button>

      {/* Main Form Popup Card */}
      <div className={`FloatingForm-card ${isOpen ? "FloatingForm-card--open" : "FloatingForm-card--closed"}`}>
        {/* Header */}
        <FloatingFormHeader onClose={() => setIsOpen(false)} />

        {/* Form Body */}
        <div className="FloatingForm-body">
          {/* Looking For */}
          <LookingFor value={lookingFor} onChange={setLookingFor} />

          {/* Property Type */}
          <SelectField
            icon={<Building2 size={15} />}
            label="Property Type"
            placeholder="Select property type"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            options={[
              "Apartment",
              "Villa",
              "Independent House",
              "Plot",
              "Commercial Property",
            ]}
          />

          {/* Preferred Location */}
          <SelectField
            icon={<MapPin size={15} />}
            label="Preferred Location"
            placeholder="Select location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            options={[
              "Bhubaneswar",
              "Cuttack",
              "Puri",
              "Khurda",
              "Kendrapara",
            ]}
          />

          {/* Budget Range */}
          <SelectField
            icon={<ShieldCheck size={15} />}
            label="Budget Range"
            placeholder="Select budget range"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            options={[
              "Under ₹20 Lakhs",
              "₹20 - ₹40 Lakhs",
              "₹40 - ₹60 Lakhs",
              "₹60 Lakhs - ₹1 Crore",
              "Above ₹1 Crore",
            ]}
          />

          {/* Mobile Number */}
          <MobileNumber
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
          />

          {/* Submit Action */}
          <SubmitButton onClick={handleSubmit} />

          {/* Security / Assurance Footer */}
          <FloatingFormFooter />
        </div>
      </div>
    </div>
  );
};

export default FloatingForm;