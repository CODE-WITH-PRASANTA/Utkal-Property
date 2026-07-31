import React, { useState, useEffect } from 'react';
import './PropertyDetailsCard.css';

// Exact imports as requested
import house from '../../assets/house.webp';
import house2 from '../../assets/house2.webp';
import house3 from '../../assets/house3.webp';

// Importing modern React Icons
import { 
  MdLocationOn, 
  MdHome, 
  MdAttachMoney, 
  MdChair, 
  MdSquareFoot, 
  MdDateRange, 
  MdCheckCircle, 
  MdPhone, 
  MdDownload, 
  MdRemoveRedEye,
  MdChevronLeft,
  MdChevronRight,
  MdBusiness,
  MdClose
} from 'react-icons/md';

// Helper function to generate random captcha text
const generateCaptcha = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%@#';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const PropertyDetailsCard = () => {
  const images = [house, house2, house3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [captchaText, setCaptchaText] = useState(generateCaptcha());

  // Auto-slide functionality - pauses on hover
  useEffect(() => {
    if (isHovered) return;
    
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 3500); 

    return () => clearInterval(slideInterval);
  }, [images.length, isHovered]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const openModal = () => {
    setCaptchaText(generateCaptcha()); // Generate new captcha on open
    setIsModalOpen(true);
  };

  const handleRefreshCaptcha = (e) => {
    e.preventDefault();
    setCaptchaText(generateCaptcha());
  };

  return (
    <>
      <div className="PropertyDetailsCard-wrapper">
        <div className="PropertyDetailsCard">
          
          {/* Left Section: Image Slider */}
          <div 
            className="pdc-slider-section"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="pdc-image-container">
              <button className="pdc-arrow left-arrow" onClick={prevSlide} aria-label="Previous image">
                <MdChevronLeft size={28} />
              </button>
              
              <img 
                src={images[currentIndex]} 
                alt={`Property view ${currentIndex + 1}`} 
                className="pdc-main-image"
              />
              
              <div className="slider-indicators">
                {images.map((_, idx) => (
                  <span 
                    key={idx} 
                    className={`dot ${idx === currentIndex ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(idx)}
                  />
                ))}
              </div>

              <button className="pdc-arrow right-arrow" onClick={nextSlide} aria-label="Next image">
                <MdChevronRight size={28} />
              </button>
            </div>
          </div>

          {/* Right Section: Details */}
          <div className="pdc-details-section">
            <div className="pdc-header">
              <h2>Rudransh South Kingdom</h2>
              <p className="pdc-subtitle">Luxury Villas in a Premium Gated Community</p>
              <p className="pdc-location">
                <span className="icon-loc"><MdLocationOn /></span> 
                6PM9+7GX, Infosys Rd, Chandiheta, Odisha ...
              </p>
            </div>

            <div className="pdc-builder-badge">
              <div className="builder-avatar">
                <MdBusiness size={18} />
              </div>
              <div className="builder-info">
                <span className="builder-label">Builder :</span>
                <span className="builder-name">Subasini Builders</span>
              </div>
            </div>

            <div className="pdc-pricing">
              <h3 className="price-main">₹ 1.86 Cr - ₹ 1.99 Cr</h3>
              <span className="price-sqft">₹6,350 / Sqft</span>
            </div>

            <div className="pdc-grid">
              <div className="grid-item">
                <span className="grid-label"><MdHome size={16} /> Type</span>
                <span className="grid-value">Luxury Villa</span>
              </div>
              <div className="grid-item">
                <span className="grid-label"><MdAttachMoney size={16} /> Booking Amount</span>
                <span className="grid-value">₹ 10.00 Lac</span>
              </div>
              <div className="grid-item">
                <span className="grid-label"><MdChair size={16} /> Furnishing</span>
                <span className="grid-value">Unfurnished</span>
              </div>
              <div className="grid-item">
                <span className="grid-label"><MdSquareFoot size={16} /> SBA</span>
                <span className="grid-value">2932 - 3140 sq.ft</span>
              </div>
              <div className="grid-item">
                <span className="grid-label"><MdDateRange size={16} /> Available From</span>
                <span className="grid-value">27 Jul 2028</span>
              </div>
              <div className="grid-item">
                <span className="grid-label"><MdCheckCircle size={16} /> Status</span>
                <span className="grid-value status-highlight">Under Construction</span>
              </div>
            </div>

            <div className="pdc-actions">
              <button className="btn-contact" onClick={openModal}>
                <MdPhone size={18} /> Contact Builder
              </button>
              <button className="btn-brochure" onClick={openModal}>
                <MdDownload size={18} /> Download Brochure
              </button>
            </div>

            <div className="pdc-footer">
              <span className="rera-no">RERA NO: PS/19/2026/01475</span>
              <span className="views"><MdRemoveRedEye size={16} /> 1,204 Views</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Modal Popup --- */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
              <MdClose size={24} />
            </button>
            
            <h3 className="modal-header">
              Kindly fill in your details to view the contact number.
            </h3>

            <form className="modal-form" onSubmit={(e) => { e.preventDefault(); alert("Form Submitted Successfully!"); setIsModalOpen(false); }}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Enter your name" required />
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Enter your email" required />
              </div>
              
              <div className="form-group">
                <label>Contact</label>
                <input type="tel" placeholder="Enter your contact number" required />
              </div>

              <div className="form-group">
                <label>Captcha</label>
                <div className="captcha-row">
                  <div className="captcha-box">{captchaText}</div>
                  <button className="btn-refresh" onClick={handleRefreshCaptcha}>Refresh</button>
                </div>
              </div>

              <div className="form-group">
                <label>Enter Captcha</label>
                <input type="text" placeholder="Enter the text" required />
              </div>

              <button type="submit" className="btn-submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyDetailsCard;