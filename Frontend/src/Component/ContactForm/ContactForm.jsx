import React from 'react';
import './ContactForm.css';

const ContactForm = () => {
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

      {/* Bottom Light Section (50% Viewport Height) & Overlapping Card */}
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

            <form className="contact-form-grid" onSubmit={(e) => e.preventDefault()}>
              
              {/* Your Name */}
              <div className="contact-form-group">
                <label htmlFor="contact-name" className="contact-form-label">Your Name</label>
                <input 
                  type="text" 
                  id="contact-name" 
                  className="contact-form-input" 
                  placeholder="Your full name" 
                  required 
                />
              </div>

              {/* Email or Phone */}
              <div className="contact-form-group">
                <label htmlFor="contact-email-phone" className="contact-form-label">Email or Phone</label>
                <input 
                  type="text" 
                  id="contact-email-phone" 
                  className="contact-form-input" 
                  placeholder="Email or phone number" 
                  required 
                />
              </div>

              {/* Property Type Dropdown */}
              <div className="contact-form-group">
                <label htmlFor="contact-property-type" className="contact-form-label">Property Type</label>
                <div className="contact-select-wrapper">
                  <select id="contact-property-type" className="contact-form-input contact-select" defaultValue="">
                    <option value="" disabled>Choose type</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">Single Family House</option>
                    <option value="duplex">Duplex & Villa</option>
                    <option value="plot">Plot / Land</option>
                  </select>
                </div>
              </div>

              {/* Message Area */}
              <div className="contact-form-group contact-form-group-full">
                <label htmlFor="contact-message" className="contact-form-label">Message</label>
                <textarea 
                  id="contact-message" 
                  className="contact-form-textarea" 
                  placeholder="Write your requirement or message here..." 
                  rows="4"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="contact-form-action">
                <button type="submit" className="contact-submit-btn">
                  <svg className="contact-send-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                  Send Request
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