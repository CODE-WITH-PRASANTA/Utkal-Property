import { useState, useEffect } from 'react';
import { 
  FaSwimmingPool, FaChild, FaParking, FaBasketballBall, 
  FaTableTennis, FaDog, FaShieldAlt, FaVideo, FaCar, 
  FaCarBattery, FaTree, FaToriiGate, FaBookOpen, FaDumbbell, 
  FaArchway, FaStar, FaCheckCircle, FaDoorClosed, FaRegStar,
  FaExpand, FaTimes 
} from 'react-icons/fa';
import { MdOutlineCurtains } from 'react-icons/md';

// Adjusted imports
import plan1 from '../../assets/map.webp';
import plan2 from '../../assets/map1.webp';
import plan3 from '../../assets/map2.webp';
import plan4 from '../../assets/map3.webp';

import './PropertyDetailsAmenities.css';

const PropertyDetailsAmenities = ({ property }) => {
  // --- States for Rate & Review ---
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewForm, setReviewForm] = useState({ name: '', email: '', phone: '', review: '' });

  // --- States for Amenities ---
  const [activeAmenities, setActiveAmenities] = useState(property?.amenities || []);

  // --- States for Contact Form & Captcha ---
  const [contactForm, setContactForm] = useState({ name: '', email: '', mobile: '', captchaInput: '' });
  const [captchaCode, setCaptchaCode] = useState('');

  // --- States for Floor Plans & Modal ---
  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  // Generate initial Captcha on mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  function generateCaptcha() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptchaCode(result);
  }

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({ ...prev, [name]: value }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const submitReview = (e) => {
    e.preventDefault();
    alert(`Review Submitted!\nRating: ${rating} Stars\nName: ${reviewForm.name}`);
    setReviewForm({ name: '', email: '', phone: '', review: '' });
    setRating(0);
  };

  const submitContact = (e) => {
    e.preventDefault();
    if (contactForm.captchaInput !== captchaCode) {
      alert("Invalid Captcha! Please try again.");
      generateCaptcha();
      setContactForm(prev => ({ ...prev, captchaInput: '' }));
      return;
    }
    alert(`Contact Details Submitted!\nName: ${contactForm.name}`);
    setContactForm({ name: '', email: '', mobile: '', captchaInput: '' });
    generateCaptcha();
  };

  const toggleAmenity = (name) => {
    setActiveAmenities(prev => 
      prev.includes(name) ? prev.filter(item => item !== name) : [...prev, name]
    );
  };

  // --- Data Objects ---
  const amenitiesList = [
    { name: "Swimming Pool", icon: <FaSwimmingPool /> },
    { name: "Children Play Area", icon: <FaChild /> },
    { name: "Conference Rooms", icon: <FaDoorClosed /> },
    { name: "Kids' Play Area", icon: <FaTableTennis /> },
    { name: "Reserved Parking", icon: <FaParking /> },
    { name: "Basketball Court", icon: <FaBasketballBall /> },
    { name: "Table Tennis", icon: <FaTableTennis /> },
    { name: "Pet Friendly", icon: <FaDog /> },
    { name: "Security", icon: <FaShieldAlt /> },
    { name: "CCTV Camera", icon: <FaVideo /> },
    { name: "Guest Parking", icon: <FaCar /> },
    { name: "Multipurpose Hall", icon: <MdOutlineCurtains /> },
    { name: "Club House", icon: <FaCheckCircle /> },
    { name: "Power Backup", icon: <FaCarBattery /> },
    { name: "Landscape", icon: <FaTree /> },
    { name: "Grand Entrance", icon: <FaToriiGate /> },
    { name: "Society Office", icon: <FaCheckCircle /> },
    { name: "Library", icon: <FaBookOpen /> },
    { name: "Gym", icon: <FaDumbbell /> },
    { name: "Indoor Game", icon: <FaTableTennis /> },
    { name: "Banquet Hall", icon: <FaArchway /> }
  ];

  const keyFeatures = [
    "Low Density Society", "3 Side Open", "Open Space", "Building Information Modeling"
  ];

  const floorPlans = [
    { id: 0, tabLabel: "4BHK", title: "4BHK - 3140 sqft", bed: 4, bath: 4, balc: 2, puja: 1, serv: 0, store: 0, sba: "3140 sqft", plot: "1500 sqft", image: plan1 },
    { id: 1, tabLabel: "4BHK", title: "4BHK - 3500 sqft", bed: 4, bath: 5, balc: 3, puja: 1, serv: 1, store: 1, sba: "3500 sqft", plot: "1800 sqft", image: plan2 },
    { id: 2, tabLabel: "5BHK", title: "5BHK - 4200 sqft", bed: 5, bath: 6, balc: 4, puja: 1, serv: 1, store: 1, sba: "4200 sqft", plot: "2200 sqft", image: plan3 },
    { id: 3, tabLabel: "Masterplan", title: "Project Masterplan", bed: "-", bath: "-", balc: "-", puja: "-", serv: "-", store: "-", sba: "-", plot: "10 Acres", image: plan4 }
  ];

  const neighbourhoodList = [
    { title: "Airport", desc: "15 Km" },
    { title: "Railway Station", desc: "18 Km" },
    { title: "ATM", desc: "700 Meter" },
    { title: "School", desc: "G D Goenka Public Schoo 1.5 Km" },
    { title: "Temple", desc: "2 Km" },
    { title: "Shopping Mall", desc: "DN Regaliya 4.5 Km" },
    { title: "Highway", desc: "1.6 Km" },
    { title: "Business Hubs", desc: "1.6 Km" },
    { title: "College", desc: "Gita Autonomous College 1.5 Km" },
    { title: "Hotel", desc: "Taj Vivanta 4.5 Km" }
  ];

  return (
    <>
      <div className="PropertyDetailsAmenities-wrapper">
        <div className="PropertyDetailsAmenities-main-layout">
          
          {/* ================= LEFT COLUMN ================= */}
          <div className="PropertyDetailsAmenities-left-col">
            
            {/* 1. Amenities Section */}
            <div className="PropertyDetailsAmenities-section-header">
              <h2 className="PropertyDetailsAmenities-title">Amenities {property?.title || 'Rudransh South Kingdom'}</h2>
              <div className="PropertyDetailsAmenities-underline"></div>
            </div>
            <div className="PropertyDetailsAmenities-card">
              <div className="PropertyDetailsAmenities-grid">
                {amenitiesList.map((amenity, index) => (
                  <div 
                    key={index} 
                    className={`PropertyDetailsAmenities-grid-item ${activeAmenities.includes(amenity.name) ? 'active' : ''}`}
                    onClick={() => toggleAmenity(amenity.name)}
                  >
                    <div className="PropertyDetailsAmenities-icon">{amenity.icon}</div>
                    <span className="PropertyDetailsAmenities-name">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Key Features Section */}
            <div className="PropertyDetailsAmenities-section-header" style={{marginTop: '30px'}}>
              <h2 className="PropertyDetailsAmenities-title">Key Features {property?.title || 'Rudransh South Kingdom'}</h2>
              <div className="PropertyDetailsAmenities-underline"></div>
            </div>
            <div className="PropertyDetailsAmenities-card">
              <div className="PropertyDetailsAmenities-features-container">
                {(property?.highlights?.length ? property.highlights : keyFeatures).map((feature, idx) => (
                  <div key={idx} className="PropertyDetailsAmenities-feature-pill">
                    <FaRegStar className="PropertyDetailsAmenities-feature-icon" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Floor Plans & Documents Section */}
            <div className="PropertyDetailsAmenities-section-header" style={{marginTop: '30px'}}>
              <h2 className="PropertyDetailsAmenities-title">Floor Plans & Documents</h2>
              <div className="PropertyDetailsAmenities-underline"></div>
            </div>
            <div className="PropertyDetailsAmenities-card PropertyDetailsAmenities-floor-plan-card">
              <div className="PropertyDetailsAmenities-tabs">
                {floorPlans.map((plan) => (
                  <div 
                    key={plan.id}
                    className={`PropertyDetailsAmenities-tab ${activeTab === plan.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(plan.id)}
                  >
                    {plan.tabLabel}
                  </div>
                ))}
              </div>
              
              <div className="PropertyDetailsAmenities-tab-content">
                <h3 className="PropertyDetailsAmenities-content-title">{floorPlans[activeTab].title}</h3>
                <div className="PropertyDetailsAmenities-stats-row">
                  <span><strong>Bed:</strong> {floorPlans[activeTab].bed}</span>
                  <span><strong>Bath:</strong> {floorPlans[activeTab].bath}</span>
                  <span><strong>Balconies:</strong> {floorPlans[activeTab].balc}</span>
                  <span><strong>Puja:</strong> {floorPlans[activeTab].puja}</span>
                  <span><strong>Servant:</strong> {floorPlans[activeTab].serv}</span>
                  <span><strong>Store:</strong> {floorPlans[activeTab].store}</span>
                  <span><strong>SBA:</strong> {floorPlans[activeTab].sba}</span>
                  <span><strong>Plot:</strong> {floorPlans[activeTab].plot}</span>
                </div>
                
                <div className="PropertyDetailsAmenities-floor-image-container">
                  <img 
                      src={floorPlans[activeTab].image} 
                      alt={floorPlans[activeTab].title} 
                      className="PropertyDetailsAmenities-floor-image" 
                      onClick={() => setIsModalOpen(true)}
                      style={{ cursor: 'pointer' }}
                  />
                  <button 
                    className="PropertyDetailsAmenities-fullscreen-btn"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <FaExpand /> View Full Screen
                  </button>
                </div>
              </div>
            </div>

            {/* 4. Explore Neighbourhood Section */}
            <div className="PropertyDetailsAmenities-section-header" style={{marginTop: '30px'}}>
              <h2 className="PropertyDetailsAmenities-title">Explore Neighbourhood - {property?.title || 'Rudransh South Kingdom'}</h2>
              <div className="PropertyDetailsAmenities-underline"></div>
            </div>
            <div className="PropertyDetailsAmenities-card">
              <div className="PropertyDetailsAmenities-neighbourhood-grid">
                {neighbourhoodList.map((item, idx) => (
                  <div key={idx} className="PropertyDetailsAmenities-neighbourhood-item">
                    <div className="PropertyDetailsAmenities-neighbourhood-inner">
                      <span className="PropertyDetailsAmenities-neighbourhood-title">{item.title}</span>
                      <span className="PropertyDetailsAmenities-neighbourhood-desc">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN (SIDEBAR) ================= */}
          <div className="PropertyDetailsAmenities-right-col">
            
            {/* Rate & Review Form */}
            <div className="PropertyDetailsAmenities-sidebar-card">
              <h3 className="PropertyDetailsAmenities-sidebar-title">Rate & Review</h3>
              <div className="PropertyDetailsAmenities-stars-container">
                {[...Array(5)].map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <label key={index} className="PropertyDetailsAmenities-star-label">
                      <input 
                        type="radio" 
                        name="rating" 
                        value={ratingValue} 
                        onClick={() => setRating(ratingValue)}
                        className="PropertyDetailsAmenities-radio-input"
                      />
                      <FaStar 
                        className="PropertyDetailsAmenities-star" 
                        color={ratingValue <= (hover || rating) ? "#176634" : "#d3d3d3"} 
                        size={24}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                      />
                    </label>
                  );
                })}
              </div>
              <form onSubmit={submitReview} className="PropertyDetailsAmenities-form">
                <input type="text" name="name" placeholder="Enter Your Name" value={reviewForm.name} onChange={handleReviewChange} className="PropertyDetailsAmenities-input" required />
                <input type="email" name="email" placeholder="Enter Your Email" value={reviewForm.email} onChange={handleReviewChange} className="PropertyDetailsAmenities-input" required />
                <input type="tel" name="phone" placeholder="Enter Your Phone" value={reviewForm.phone} onChange={handleReviewChange} className="PropertyDetailsAmenities-input" required />
                <textarea name="review" placeholder="Write your review..." value={reviewForm.review} onChange={handleReviewChange} className="PropertyDetailsAmenities-textarea" rows="3" required ></textarea>
                <button type="submit" className="PropertyDetailsAmenities-submit-btn">Submit</button>
              </form>
            </div>

            {/* Contact Form */}
            <div className="PropertyDetailsAmenities-sidebar-card">
              <p className="PropertyDetailsAmenities-contact-heading">Kindly fill in your details to view the contact number.</p>
              
              <form onSubmit={submitContact} className="PropertyDetailsAmenities-contact-form">
                <div className="PropertyDetailsAmenities-input-group">
                  <label>Name</label>
                  <input type="text" name="name" placeholder="Enter your name" value={contactForm.name} onChange={handleContactChange} className="PropertyDetailsAmenities-input" required />
                </div>
                <div className="PropertyDetailsAmenities-input-group">
                  <label>Email</label>
                  <input type="email" name="email" placeholder="Enter your email" value={contactForm.email} onChange={handleContactChange} className="PropertyDetailsAmenities-input" required />
                </div>
                <div className="PropertyDetailsAmenities-input-group">
                  <label>Mobile</label>
                  <input type="tel" name="mobile" placeholder="Enter your contact number" value={contactForm.mobile} onChange={handleContactChange} className="PropertyDetailsAmenities-input" required />
                </div>

                <div className="PropertyDetailsAmenities-input-group">
                  <label>Captcha</label>
                  <div className="PropertyDetailsAmenities-captcha-row">
                    <div className="PropertyDetailsAmenities-captcha-box">{captchaCode}</div>
                    <button type="button" onClick={generateCaptcha} className="PropertyDetailsAmenities-refresh-btn">Refresh</button>
                  </div>
                </div>

                <div className="PropertyDetailsAmenities-input-group">
                  <label>Enter Captcha</label>
                  <input type="text" name="captchaInput" placeholder="Enter the text" value={contactForm.captchaInput} onChange={handleContactChange} className="PropertyDetailsAmenities-input" required />
                </div>

                <button type="submit" className="PropertyDetailsAmenities-submit-btn" style={{marginTop: '10px'}}>Submit</button>
              </form>
            </div>

          </div>
        </div>
      </div>

      {/* ================= FULL SCREEN MODAL ================= */}
      {isModalOpen && (
        <div className="PropertyDetailsAmenities-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="PropertyDetailsAmenities-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="PropertyDetailsAmenities-modal-close" onClick={() => setIsModalOpen(false)}>
              <FaTimes />
            </button>
            <h3 className="PropertyDetailsAmenities-modal-title">{floorPlans[activeTab].title}</h3>
            <img 
              src={floorPlans[activeTab].image} 
              alt={floorPlans[activeTab].title} 
              className="PropertyDetailsAmenities-modal-image" 
            />
          </div>
        </div>
      )}
    </>
  );
}

export default PropertyDetailsAmenities;