import React, { useState } from 'react';
import './ContactForm.css';
import API from '../../api/axios'; // Adjust relative path as needed

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    property: '',
    source: 'Website Contact', // Default source for user submissions
    message: ''
  });

  const [loading, setLoading] = useState(false);

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
      
      // Post directly to your Backend Enquiry / Contact API endpoint
      const response = await API.post('/enquiries', {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        property: formData.property,
        source: formData.source,
        message: formData.message,
        status: 'New' // Automatically set to New for incoming website inquiries
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
    <section className="contact-form-section" aria-label="Utkal Property Contact Section">
      {/* Top Map Section (50% Viewport Height) */}
      <div className="contact-map-background">
        <iframe
          title="Utkal Property Location Map - Baramunda Bhubaneswar"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.105128362624!2d85.8038596!3d20.2762144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909b2d861d8b7%3A0xc3644f107f9c87cf!2sBaramunda%2C%20Bhubaneswar%2C%20Odisha%20751003!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Bottom Light Section & Overlapping Card */}
      <div className="contact-lower-section">
        <div className="contact-form-container">
          <div className="contact-form-card">
            
            <header className="contact-form-header">
              <span className="contact-form-tag">Get In Touch</span>
              <h2 className="contact-form-title">Contact Form</h2>
              <p className="contact-form-subtitle">
                Utkal Property (Best Property Consultant in Bhubaneswar) – Find your dream home easily with our trusted property options tailored to your budget.
              </p>
            </header>

            <form className="contact-form-grid" onSubmit={handleSubmit}>
              
              {/* Row 1: Full Name & Email Address */}
              <div className="contact-form-group">
                <label htmlFor="fullName" className="contact-form-label">Full Name *</label>
                <input 
                  type="text" 
                  id="fullName" 
                  className="contact-form-input" 
                  placeholder="Enter full name" 
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
                  className="contact-form-input" 
                  placeholder="Enter email address" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>

              {/* Row 2: Phone Number & Property */}
              <div className="contact-form-group">
                <label htmlFor="phone" className="contact-form-label">Phone Number *</label>
                <input 
                  type="text" 
                  id="phone" 
                  className="contact-form-input" 
                  placeholder="Enter phone number" 
                  value={formData.phone}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="contact-form-group">
                <label htmlFor="property" className="contact-form-label">Property *</label>
                <div className="contact-select-wrapper">
                  <select 
                    id="property" 
                    className="contact-form-input contact-select" 
                    value={formData.property}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select property</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Single Family House">Single Family House</option>
                    <option value="Duplex & Villa">Duplex & Villa</option>
                    <option value="Plot / Land">Plot / Land</option>
                    <option value="Commercial Space">Commercial Space</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Message Area (Full Width) */}
              <div className="contact-form-group contact-form-group-full">
                <label htmlFor="message" className="contact-form-label">Message</label>
                <textarea 
                  id="message" 
                  className="contact-form-textarea" 
                  placeholder="Enter your message or notes..." 
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="contact-form-action">
                <button type="submit" className="contact-submit-btn" disabled={loading}>
                  <svg className="contact-send-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                  {loading ? 'Submitting...' : 'Send Request'}
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