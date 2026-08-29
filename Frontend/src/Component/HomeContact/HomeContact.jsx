import React, { useState } from 'react';
import './HomeContact.css';

// React Icons
import { FiUser, FiPhone, FiChevronDown, FiSend } from 'react-icons/fi';
import { HiOutlineMapPin, HiOutlinePhone } from 'react-icons/hi2';
import { BsChatDots } from 'react-icons/bs';

const HomeContact = () => {
  // Form State Management (Optimized without Email)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    propertyType: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted Data:', formData);
    alert('Thank you! Your request has been sent to Utkal Property.');
  };

  return (
    <section className="HomeContact">
      <div className="HomeContact-container">
        
        {/* Left Info Column */}
        <div className="HomeContact-info-section">
          <span className="HomeContact-tag">Contact Utkal Property</span>
          <h1 className="HomeContact-title">
            Best Real Estate Agency in Bhubaneswar for Flats, Apartments & Plots
          </h1>
          
          <p className="HomeContact-description">
            Looking to buy, sell, or invest in premium properties across Odisha? Connect with <strong>Utkal Property</strong>—the best real estate agency in Bhubaneswar for verified listings, legal assistance, and complete property guidance.
          </p>

          {/* Contact Details List (NAP-Compliant) */}
          <div className="HomeContact-details-list">
            
            {/* Locate At Us / Address */}
            <div className="HomeContact-detail-item">
              <div className="HomeContact-detail-icon-wrapper">
                <HiOutlineMapPin className="HomeContact-detail-icon" />
              </div>
              <div className="HomeContact-detail-divider"></div>
              <div className="HomeContact-detail-text">
                <span className="HomeContact-detail-label">Locate At Us</span>
                <p className="HomeContact-detail-value">
                  Plot No-55, Ln 2, Jagannath Vihar, Baramunda, Bhubaneswar, Odisha 751003
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="HomeContact-detail-item">
              <div className="HomeContact-detail-icon-wrapper">
                <HiOutlinePhone className="HomeContact-detail-icon" />
              </div>
              <div className="HomeContact-detail-divider"></div>
              <div className="HomeContact-detail-text">
                <span className="HomeContact-detail-label">Call / WhatsApp</span>
                <p className="HomeContact-detail-value HomeContact-phone-highlight">
                  <a href="tel:+919861566735" style={{ color: 'inherit', textDecoration: 'none' }}>
                    +91 9861566735
                  </a>
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Right Contact Form Card */}
        <div className="HomeContact-form-card">
          <div className="HomeContact-form-header">
            <div>
              <h2 className="HomeContact-form-title">Schedule a Consultation</h2>
              <p className="HomeContact-form-subtitle">
                Get in touch with our Bhubaneswar property consultants today.
              </p>
            </div>
            <div className="HomeContact-badge-icon">
              <BsChatDots />
            </div>
          </div>

          <form className="HomeContact-form" onSubmit={handleSubmit}>
            
            {/* Full Name */}
            <div className="HomeContact-form-group">
              <label className="HomeContact-label">Your Name</label>
              <div className="HomeContact-input-wrapper">
                <FiUser className="HomeContact-field-icon" />
                <input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="HomeContact-input"
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="HomeContact-form-group">
              <label className="HomeContact-label">Phone Number</label>
              <div className="HomeContact-input-wrapper">
                <FiPhone className="HomeContact-field-icon" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 98615 66735"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="HomeContact-input"
                  required
                />
              </div>
            </div>

            {/* Property Type Dropdown */}
            <div className="HomeContact-form-group">
              <label className="HomeContact-label">Property Requirement</label>
              <div className="HomeContact-select-wrapper">
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  className="HomeContact-select"
                  required
                >
                  <option value="" disabled hidden>
                    Select property type
                  </option>
                  <option value="apartment">2/3/4 BHK Residential Apartment</option>
                  <option value="duplex">Duplex & Luxury Villa</option>
                  <option value="commercial">Commercial Shop / Office Space</option>
                  <option value="plot">Residential / Commercial Plot</option>
                </select>
                <FiChevronDown className="HomeContact-select-icon" />
              </div>
            </div>

            {/* Message Area */}
            <div className="HomeContact-form-group">
              <label className="HomeContact-label">Requirement Details</label>
              <textarea
                name="message"
                placeholder="Tell us your preferred location, budget, or specific requirements..."
                value={formData.message}
                onChange={handleInputChange}
                className="HomeContact-textarea"
                rows="4"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button type="submit" className="HomeContact-submit-btn">
              <FiSend className="HomeContact-btn-icon" />
              Get Free Consultation
            </button>

          </form>
        </div>

      </div>
    </section>
  );
};

export default HomeContact;