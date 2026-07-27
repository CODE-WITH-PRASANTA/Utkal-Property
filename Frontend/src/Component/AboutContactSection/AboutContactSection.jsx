import React, { useState } from 'react';
import { FiMapPin, FiPhoneCall, FiMail, FiSend } from 'react-icons/fi';
import './AboutContactSection.css';

export function AboutContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    propertyType: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  return (
    <section className="AboutContactSection-wrapper">
      {/* Top Hero Banner */}
      <div className="AboutContactSection-hero">
        <div className="AboutContactSection-hero-content">
          <h2 className="AboutContactSection-main-heading">
            We provide the most suitable and quality real estate.
          </h2>
          <p className="AboutContactSection-sub-heading">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed tristique metus proin id lorem odio
          </p>

          {/* Contact Details Row */}
          <div className="AboutContactSection-info-grid">
            
            {/* Address */}
            <div className="AboutContactSection-info-item">
              <div className="AboutContactSection-info-icon">
                <FiMapPin />
              </div>
              <div className="AboutContactSection-info-text">
                <span className="AboutContactSection-info-label">Office address</span>
                <p className="AboutContactSection-info-value">
                  2715 Ash Dr. San Jose, South Dakota 83475
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="AboutContactSection-info-item">
              <div className="AboutContactSection-info-icon">
                <FiPhoneCall />
              </div>
              <div className="AboutContactSection-info-text">
                <span className="AboutContactSection-info-label">Request a call back</span>
                <p className="AboutContactSection-info-value phone-highlight">
                  314-555-0123
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="AboutContactSection-info-item">
              <div className="AboutContactSection-info-icon">
                <FiMail />
              </div>
              <div className="AboutContactSection-info-text">
                <span className="AboutContactSection-info-label">Email us</span>
                <p className="AboutContactSection-info-value">
                  hellosupport@gmail.com
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Floating Card Form */}
      <div className="AboutContactSection-card-container">
        <form className="AboutContactSection-form" onSubmit={handleSubmit}>
          
          <div className="AboutContactSection-form-row">
            {/* Name Input */}
            <div className="AboutContactSection-field-group">
              <label htmlFor="name" className="AboutContactSection-label">
                Your name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="AboutContactSection-input"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Email or Phone Input */}
            <div className="AboutContactSection-field-group">
              <label htmlFor="emailOrPhone" className="AboutContactSection-label">
                Email or phone
              </label>
              <input
                type="text"
                id="emailOrPhone"
                name="emailOrPhone"
                className="AboutContactSection-input"
                placeholder="Email or phone number"
                value={formData.emailOrPhone}
                onChange={handleChange}
              />
            </div>

            {/* Property Type Dropdown */}
            <div className="AboutContactSection-field-group">
              <label htmlFor="propertyType" className="AboutContactSection-label">
                Property type
              </label>
              <div className="AboutContactSection-select-wrapper">
                <select
                  id="propertyType"
                  name="propertyType"
                  className="AboutContactSection-select"
                  value={formData.propertyType}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>
                    Choose
                  </option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="commercial">Commercial</option>
                  <option value="land">Land</option>
                </select>
              </div>
            </div>
          </div>

          {/* Message Area */}
          <div className="AboutContactSection-field-group full-width">
            <label htmlFor="message" className="AboutContactSection-label">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="AboutContactSection-textarea"
              placeholder="Your message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="AboutContactSection-submit-btn">
            <FiSend className="AboutContactSection-btn-icon" />
            <span>Send request</span>
          </button>

        </form>
      </div>
    </section>
  );
}

export default AboutContactSection;