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
} from "lucide-react";

import "./FloatingForm.css";

/* =========================================================
   HEADER
========================================================= */

const FloatingFormHeader = ({ onClose }) => {
  return (
    <div className="floating-form-header">
      <div className="floating-home-icon">
        <Home size={20} strokeWidth={2} />
      </div>

      <button
        type="button"
        className="floating-close-btn"
        onClick={onClose}
        aria-label="Close form"
      >
        <X size={14} />
      </button>

      <div className="floating-header-content">
        <h2>Enquire Now</h2>

        <p>
          Fill in your details and our expert
          <br />
          will <span>contact you soon.</span>
        </p>

        <div className="header-line"></div>
      </div>
    </div>
  );
};

/* =========================================================
   LOOKING FOR SECTION
========================================================= */

const LookingFor = ({ value, onChange }) => {
  return (
    <div className="floating-field looking-field">
      <div className="field-icon">
        <Home size={15} />
      </div>

      <div className="field-content">
        <label>Looking For</label>

        <div className="radio-group">
          <label className="radio-option">
            <input
              type="radio"
              name="lookingFor"
              value="Rent"
              checked={value === "Rent"}
              onChange={(e) => onChange(e.target.value)}
            />
            <span className="custom-radio"></span>
            <span>Rent</span>
          </label>

          <label className="radio-option">
            <input
              type="radio"
              name="lookingFor"
              value="Buy"
              checked={value === "Buy"}
              onChange={(e) => onChange(e.target.value)}
            />
            <span className="custom-radio"></span>
            <span>Buy</span>
          </label>

          <label className="radio-option">
            <input
              type="radio"
              name="lookingFor"
              value="Sell"
              checked={value === "Sell"}
              onChange={(e) => onChange(e.target.value)}
            />
            <span className="custom-radio"></span>
            <span>Sell</span>
          </label>
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
    <div className="floating-field select-field">
      <div className="field-icon">{icon}</div>

      <div className="field-content">
        <label>{label}</label>

        <select value={value} onChange={onChange} required>
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

      <ChevronDown className="select-arrow" size={15} />
    </div>
  );
};

/* =========================================================
   MOBILE NUMBER
========================================================= */

const MobileNumber = ({ value, onChange }) => {
  return (
    <div className="floating-field mobile-field">
      <div className="field-icon">
        <Phone size={15} />
      </div>

      <div className="field-content">
        <label htmlFor="mobileNumber">Mobile Number</label>

        <input
          id="mobileNumber"
          type="tel"
          value={value}
          onChange={onChange}
          placeholder="Enter mobile number"
          maxLength={10}
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
      className="floating-submit-btn"
      onClick={onClick}
    >
      <span>Get Property Options</span>

      <span className="submit-icon">
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
    <div className="floating-form-footer">
      <ShieldCheck size={11} />

      <span>Free Consultation • No obligation</span>
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

    console.log("Property Enquiry:", formData);
  };

  if (!isOpen) return null;

  return (
    <div className="floating-form-wrapper">
      <div className="floating-form-card">

        {/* Header */}
        <FloatingFormHeader
          onClose={() => setIsOpen(false)}
        />

        {/* Form */}
        <div className="floating-form-body">

          {/* Looking For */}
          <LookingFor
            value={lookingFor}
            onChange={setLookingFor}
          />

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

          {/* Budget */}
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

          {/* Mobile */}
          <MobileNumber
            value={mobile}
            onChange={(e) =>
              setMobile(e.target.value.replace(/\D/g, ""))
            }
          />

          {/* Submit */}
          <SubmitButton onClick={handleSubmit} />

          {/* Footer */}
          <FloatingFormFooter />

        </div>
      </div>
    </div>
  );
};

export default FloatingForm;