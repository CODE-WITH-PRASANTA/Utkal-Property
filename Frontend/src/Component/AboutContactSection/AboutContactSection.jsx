import React, { useState } from 'react';
import { FiMapPin, FiPhoneCall, FiSend, FiClock } from 'react-icons/fi';
import './AboutContactSection.css';

export function AboutContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    propertyType: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Directly open WhatsApp with structured form lead
    const targetPhone = '919861566735';
    const text = encodeURIComponent(
      `*New Property Inquiry - Utkal Property*\n` +
      `👤 *Name:* ${formData.name || 'Not provided'}\n` +
      `📞 *Phone:* ${formData.phone || 'Not provided'}\n` +
      `🏠 *Property Type:* ${formData.propertyType || 'General Inquiry'}\n` +
      `💬 *Message:* ${formData.message || 'Looking for available properties.'}`
    );

    window.open(`https://wa.me/${targetPhone}?text=${text}`, '_blank');
  };

  return (
    <section className="AboutContactSection-wrapper" aria-labelledby="contact-heading">
      {/* Top Hero Banner */}
      <div className="AboutContactSection-hero">
        <div className="AboutContactSection-hero-content">
          <p className="AboutContactSection-badge">Top Real Estate Agency in Bhubaneswar</p>
          
          <h2 id="contact-heading" className="AboutContactSection-main-heading">
            <span className="AboutContactSection-heading-white">Find Prime Verified Properties With </span>
            <span className="AboutContactSection-heading-green">Utkal Property</span>
          </h2>
          
          <p className="AboutContactSection-sub-heading">
            Connect directly with leading property experts for residential plots, luxury duplexes, flats, and prime commercial spaces across Bhubaneswar.
          </p>

          {/* Contact Details Row */}
          <div className="AboutContactSection-info-grid">
            
            {/* Address */}
            <div className="AboutContactSection-info-item">
              <div className="AboutContactSection-info-icon" aria-hidden="true">
                <FiMapPin />
              </div>
              <div className="AboutContactSection-info-text">
                <span className="AboutContactSection-info-label">Visit Our Office</span>
                <address className="AboutContactSection-info-value not-italic">
                  Plot No-55, Ln 2, Jagannath Vihar, Baramunda, Bhubaneswar, Odisha 751003
                </address>
              </div>
            </div>

            {/* Direct Phone / Call Back */}
            <div className="AboutContactSection-info-item">
              <div className="AboutContactSection-info-icon" aria-hidden="true">
                <FiPhoneCall />
              </div>
              <div className="AboutContactSection-info-text">
                <span className="AboutContactSection-info-label">Direct Call / WhatsApp</span>
                <p className="AboutContactSection-info-value phone-highlight">
                  <a href="tel:+919861566735" className="AboutContactSection-contact-link">
                    +91 9861566735
                  </a>
                </p>
              </div>
            </div>

            {/* Working Hours (Replaced Email) */}
            <div className="AboutContactSection-info-item">
              <div className="AboutContactSection-info-icon" aria-hidden="true">
                <FiClock />
              </div>
              <div className="AboutContactSection-info-text">
                <span className="AboutContactSection-info-label">Consultation Hours</span>
                <p className="AboutContactSection-info-value">
                  Mon - Sun: 9:00 AM - 8:00 PM
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Floating Inquiry Form */}
      <div className="AboutContactSection-card-container">
        <form className="AboutContactSection-form" onSubmit={handleSubmit}>
          
          <div className="AboutContactSection-form-row">
            {/* Name Input */}
            <div className="AboutContactSection-field-group">
              <label htmlFor="name" className="AboutContactSection-label">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="AboutContactSection-input"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Phone Input */}
            <div className="AboutContactSection-field-group">
              <label htmlFor="phone" className="AboutContactSection-label">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                pattern="[0-9]{10}"
                className="AboutContactSection-input"
                placeholder="10-digit mobile number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Property Type Dropdown */}
            <div className="AboutContactSection-field-group">
              <label htmlFor="propertyType" className="AboutContactSection-label">
                Interested Property *
              </label>
              <div className="AboutContactSection-select-wrapper">
                <select
                  id="propertyType"
                  name="propertyType"
                  required
                  className="AboutContactSection-select"
                  value={formData.propertyType}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>
                    Select Property Type
                  </option>
                  <option value="Residential Plot / Land">Residential Plot / Land</option>
                  <option value="Apartment / Flat">Apartment / Flat</option>
                  <option value="Independent House / Villa">Independent House / Villa</option>
                  <option value="Commercial Space / Shop">Commercial Space / Shop</option>
                </select>
              </div>
            </div>
          </div>

          {/* Message Area */}
          <div className="AboutContactSection-field-group full-width">
            <label htmlFor="message" className="AboutContactSection-label">
              Requirements / Location Preference
            </label>
            <textarea
              id="message"
              name="message"
              className="AboutContactSection-textarea"
              placeholder="Tell us your budget, preferred locality (e.g., Baramunda, Patia, Khandagiri), or query..."
              rows={4}
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="AboutContactSection-submit-btn">
            <FiSend className="AboutContactSection-btn-icon" />
            <span>Request Immediate Callback</span>
          </button>

        </form>
      </div>
    </section>
  );
}

export default AboutContactSection;