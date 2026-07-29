import React from 'react';
import './ContactSeller.css';
import contactSellerImg from '../../assets/mark-contact3.png'; // Adjust path if necessary based on your folder structure

const ContactSeller = () => {
  return (
    <section className="utkal-contact-section" aria-label="Utkal Property Contact Seller Hero">
      <div className="utkal-contact-container">
        
        {/* Left Content Area */}
        <div className="utkal-contact-content">
          <h1 className="utkal-contact-title">
            Find for your dream home and increase your investment opportunities
          </h1>
          <p className="utkal-contact-desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed tristique metus proin id lorem odio.
          </p>
          <div className="utkal-btn-group">
            <a href="tel:09861566735" className="utkal-seller-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              Contact Seller
            </a>
          </div>

     

        </div>

        {/* Right Image Showcase Area with Proper Height and Width */}
        <div className="utkal-contact-image-wrap">
          <img 
            src={contactSellerImg} 
            alt="Utkal Property Real Estate Professional Consulting in Bhubaneswar" 
            className="utkal-professional-img"
            width="650"
            height="450"
            loading="lazy"
          />
        </div>

      </div>
    </section>
  );
};

export default ContactSeller;