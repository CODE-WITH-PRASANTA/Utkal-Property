import React, { useState } from 'react';
import './ContactForm.css';
import API from '../../api/axios';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    property: '',
    source: 'Website Contact',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Submit Handler to Send Enquiry to Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await API.post('/enquiries', {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        property: formData.property,
        source: formData.source,
        message: formData.message,
        status: 'New'
      });

      if (response.status === 200 || response.status === 201) {
        alert('Thank you! Your enquiry has been submitted successfully.');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          property: '',
          source: 'Website Contact',
          message: ''
        });
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert(error.response?.data?.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section 
      className="contact-form-section" 
      aria-labelledby="contact-form-heading"
      itemScope 
      itemType="https://schema.org/RealEstateAgent"
    >
      {/* Top Map Section (Privacy-Friendly Deferred Google Map) */}
      <div className="contact-map-background" role="region" aria-label="Office Location Map">
        {!isMapLoaded ? (
          <div className="contact-map-facade">
            <div className="contact-map-facade-content">
              <span className="contact-map-pin-icon" aria-hidden="true">📍</span>
              <p className="contact-map-facade-text">
                Utkal Property Head Office — Baramunda, Bhubaneswar, Odisha
              </p>
              <button
                type="button"
                className="contact-load-map-btn"
                onClick={() => setIsMapLoaded(true)}
                aria-label="Load interactive Google Map location"
              >
                Load Interactive Map
              </button>
            </div>
          </div>
        ) : (
          <iframe
            title="Utkal Property Office Location Map - Baramunda, Bhubaneswar, Odisha"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.105128362624!2d85.8038596!3d20.2762144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909b2d861d8b7%3A0xc3644f107f9c87cf!2sBaramunda%2C%20Bhubaneswar%2C%20Odisha%20751003!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        )}
      </div>

      {/* Hidden microdata to link the company with the location */}
      <meta itemProp="name" content="Utkal Property" />
      <meta itemProp="telephone" content="+919861566735" />
      <meta itemProp="email" content="support@utkalproperty.com" />

      {/* Bottom Light Section & Overlapping Card */}
      <div className="contact-lower-section">
        <div className="contact-form-container">
          <div className="contact-form-card">

            <header className="contact-form-header">
              <span className="contact-form-tag">Book a Free Property Consultation</span>
              <h2 id="contact-form-heading" className="contact-form-title">
                Connect with the <span className="real-estate-highlight">Top Real Estate Company in Bhubaneswar, Odisha</span>
              </h2>
              <p className="contact-form-subtitle" itemProp="description">
                Looking to buy, sell, or invest in Bhubaneswar real estate? Share your requirements below to explore verified <strong>2 &amp; 3 BHK luxury flats</strong>, <strong>BDA-approved residential plots</strong>, and premium commercial spaces across Patia, Baramunda, Khandagiri, and Pahala at zero brokerage hassle.
              </p>
            </header>

            <form className="contact-form-grid" onSubmit={handleSubmit} aria-label="Property Enquiry Form">

              {/* Row 1: Full Name & Email Address */}
              <div className="contact-form-group">
                <label htmlFor="fullName" className="contact-form-label">Full Name *</label>
                <input 
                  type="text" 
                  id="fullName" 
                  name="fullName" 
                  className="contact-form-input" 
                  placeholder="e.g. Rahul Mishra" 
                  autoComplete="name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="contact-form-group">
                <label htmlFor="email" className="contact-form-label">Email Address *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="contact-form-input" 
                  placeholder="e.g. rahul@example.com" 
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>

              {/* Row 2: Phone Number & Property */}
              <div className="contact-form-group">
                <label htmlFor="phone" className="contact-form-label">Phone Number *</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  className="contact-form-input" 
                  placeholder="e.g. +91 98765 43210" 
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="contact-form-group">
                <label htmlFor="property" className="contact-form-label">Property Type *</label>
                <div className="contact-select-wrapper">
                  <select 
                    id="property" 
                    name="property" 
                    aria-label="Select Property Type"
                    className="contact-form-input contact-select" 
                    value={formData.property}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select Property Type</option>
                    <option value="2 & 3 BHK Apartments">2 &amp; 3 BHK Ready-to-Move Apartments</option>
                    <option value="BDA Approved Residential Plots">BDA Approved Residential Plots</option>
                    <option value="Luxury Duplex & Villas">Luxury Duplex &amp; Modern Villas</option>
                    <option value="Single Family Independent House">Single Family Independent House</option>
                    <option value="Commercial Space / Office">Prime Commercial &amp; Retail Space</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Message Area (Full Width) */}
              <div className="contact-form-group contact-form-group-full">
                <label htmlFor="message" className="contact-form-label">Tell Us About Your Requirement</label>
                <textarea 
                  id="message" 
                  name="message" 
                  className="contact-form-textarea" 
                  placeholder="Share preferred locality (e.g. Patia, Baramunda, Khandagiri), budget range, or specific property needs..." 
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="contact-form-action">
                <button type="submit" className="contact-submit-btn" disabled={loading} aria-label="Submit property enquiry">
                  <svg className="contact-send-icon" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                  {loading ? 'Submitting Enquiry...' : 'Get Instant Property Details'}
                </button>
              </div>

            </form>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;