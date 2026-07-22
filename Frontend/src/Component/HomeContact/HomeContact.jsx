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
    alert('Request sent successfully!');
  };

  return (
    <section className="HomeContact">
      <div className="HomeContact-container">
        
        {/* Left Info Column */}
        <div className="HomeContact-info-section">
          <h1 className="HomeContact-title">
            We provide the most suitable and quality real estate.
          </h1>
          
          <p className="HomeContact-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed tristique metus proin id lorem odio
          </p>

          {/* Contact Details Grid */}
          <div className="HomeContact-details-list">
            
            {/* Address */}
            <div className="HomeContact-detail-item">
              <div className="HomeContact-detail-icon-wrapper">
                <HiOutlineMapPin className="HomeContact-detail-icon" />
              </div>
              <div className="HomeContact-detail-divider"></div>
              <div className="HomeContact-detail-text">
                <span className="HomeContact-detail-label">Office address</span>
                <p className="HomeContact-detail-value">
                  2715 Ash Dr. San Jose, South Dakota 83475
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
                <span className="HomeContact-detail-label">Request a call back</span>
                <p className="HomeContact-detail-value HomeContact-phone-highlight">
                  314-555-0123
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
                <span className="HomeContact-detail-label">Email us</span>
                <p className="HomeContact-detail-value HomeContact-email-highlight">
                  hellosupport@gmail.com
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Right Contact Form Card */}
        <div className="HomeContact-form-card">
          <div className="HomeContact-form-header">
            <div>
              <h2 className="HomeContact-form-title">Contact us</h2>
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
              <label className="HomeContact-label">Your name</label>
              <div className="HomeContact-input-wrapper">
                <FiUser className="HomeContact-field-icon" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
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
                <label className="HomeContact-label">Email</label>
                <div className="HomeContact-input-wrapper">
                  <FiMail className="HomeContact-field-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="HomeContact-input"
                    required
                  />
                </div>
              </div>

              <div className="HomeContact-form-group">
                <label className="HomeContact-label">Phone</label>
                <div className="HomeContact-input-wrapper">
                  <FiPhone className="HomeContact-field-icon" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="HomeContact-input"
                  />
                </div>
              </div>
            </div>

            {/* Property Type Dropdown */}
            <div className="HomeContact-form-group">
              <label className="HomeContact-label">Property type</label>
              <div className="HomeContact-select-wrapper">
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  className="HomeContact-select"
                >
                  <option value="" disabled hidden>
                    Choose
                  </option>
                  <option value="apartment">Apartment</option>
                  <option value="house">Single Family House</option>
                  <option value="commercial">Commercial Space</option>
                  <option value="villa">Luxury Villa</option>
                </select>
                <FiChevronDown className="HomeContact-select-icon" />
              </div>
            </div>

            {/* Message Area */}
            <div className="HomeContact-form-group">
              <label className="HomeContact-label">Message</label>
              <textarea
                name="message"
                placeholder="Your message"
                value={formData.message}
                onChange={handleInputChange}
                className="HomeContact-textarea"
                rows="4"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button type="submit" className="HomeContact-submit-btn">
              <FiSend className="HomeContact-btn-icon" />
              Send request
            </button>

          </form>
        </div>

      </div>
    </section>
  );
};

export default HomeContact;