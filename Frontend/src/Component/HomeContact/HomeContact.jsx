import React, { useState } from 'react';
import './HomeContact.css';

// React Icons
import { FiUser, FiMail, FiPhone, FiChevronDown, FiSend } from 'react-icons/fi';
import { HiOutlineMapPin, HiOutlinePhone, HiOutlineEnvelope } from 'react-icons/hi2';
import { BsChatDots } from 'react-icons/bs';

const HomeContact = () => {
  // Form State Management
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
          <span className="HomeContact-tag">Get In Touch</span>
          <h1 className="HomeContact-title">
            We Provide Suitable & Quality Real Estate Services Across Odisha.
          </h1>
          
          <p className="HomeContact-description">
            Have questions about buying, selling, or renting property? Reach out to Utkal Property for expert guidance and personalized real estate solutions.
          </p>

          {/* Contact Details List */}
          <div className="HomeContact-details-list">
            
            {/* Address */}
            <div className="HomeContact-detail-item">
              <div className="HomeContact-detail-icon-wrapper">
                <HiOutlineMapPin className="HomeContact-detail-icon" />
              </div>
              <div className="HomeContact-detail-divider"></div>
              <div className="HomeContact-detail-text">
                <span className="HomeContact-detail-label">Office Address</span>
                <p className="HomeContact-detail-value">
                  Plot No. 102, Patia KIIT Road, Bhubaneswar, Odisha 751024
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
                <span className="HomeContact-detail-label">Request A Call Back</span>
                <p className="HomeContact-detail-value HomeContact-phone-highlight">
                  +91 98765 43210
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="HomeContact-detail-item">
              <div className="HomeContact-detail-icon-wrapper">
                <HiOutlineEnvelope className="HomeContact-detail-icon" />
              </div>
              <div className="HomeContact-detail-divider"></div>
              <div className="HomeContact-detail-text">
                <span className="HomeContact-detail-label">Email Us</span>
                <p className="HomeContact-detail-value HomeContact-email-highlight">
                  support@utkalproperty.com
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Right Contact Form Card */}
        <div className="HomeContact-form-card">
          <div className="HomeContact-form-header">
            <div>
              <h2 className="HomeContact-form-title">Contact Us</h2>
              <p className="HomeContact-form-subtitle">
                We will respond as soon as we receive your message.
              </p>
            </div>
            <div className="HomeContact-badge-icon">
              <BsChatDots />
            </div>
          </div>

          <form className="HomeContact-form" onSubmit={handleSubmit}>
            
            {/* Your Name */}
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

            {/* Email & Phone Two-Column Row */}
            <div className="HomeContact-form-row">
              <div className="HomeContact-form-group">
                <label className="HomeContact-label">Email Address</label>
                <div className="HomeContact-input-wrapper">
                  <FiMail className="HomeContact-field-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="HomeContact-input"
                    required
                  />
                </div>
              </div>

              <div className="HomeContact-form-group">
                <label className="HomeContact-label">Phone Number</label>
                <div className="HomeContact-input-wrapper">
                  <FiPhone className="HomeContact-field-icon" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 00000 00000"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="HomeContact-input"
                  />
                </div>
              </div>
            </div>

            {/* Property Type Dropdown */}
            <div className="HomeContact-form-group">
              <label className="HomeContact-label">Property Type</label>
              <div className="HomeContact-select-wrapper">
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  className="HomeContact-select"
                >
                  <option value="" disabled hidden>
                    Select property interest
                  </option>
                  <option value="apartment">Residential Apartment</option>
                  <option value="duplex">Duplex & Villa</option>
                  <option value="commercial">Commercial Space</option>
                  <option value="plot">Plot / Land</option>
                </select>
                <FiChevronDown className="HomeContact-select-icon" />
              </div>
            </div>

            {/* Message Area */}
            <div className="HomeContact-form-group">
              <label className="HomeContact-label">Message</label>
              <textarea
                name="message"
                placeholder="Write your requirement or query here..."
                value={formData.message}
                onChange={handleInputChange}
                className="HomeContact-textarea"
                rows="4"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button type="submit" className="HomeContact-submit-btn">
              <FiSend className="HomeContact-btn-icon" />
              Send Request
            </button>

          </form>
        </div>

      </div>
    </section>
  );
};

export default HomeContact;