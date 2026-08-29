import React, { useState, useEffect } from 'react';
import './HomeCustomer.css';
import API, { IMG_URL } from "../../api/axios";

// React Icons
import { BsChatLeftTextFill } from 'react-icons/bs';
import { FaUserCircle, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CHAR_LIMIT = 130; // Length threshold for long descriptions

const HomeCustomer = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [brokenImages, setBrokenImages] = useState({});
  const [expandedCards, setExpandedCards] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  // Helper function to resolve backend uploaded photos vs external URLs safely
  const getImageUrl = (photoPath) => {
    if (!photoPath) return null;

    if (photoPath.startsWith('http://') || photoPath.startsWith('https://')) {
      return photoPath;
    }

    let clean = photoPath.replace(/\\/g, '/');
    const uploadsIndex = clean.indexOf('uploads/');
    if (uploadsIndex !== -1) {
      clean = '/' + clean.substring(uploadsIndex);
    } else {
      clean = clean.startsWith('/') ? clean : `/${clean}`;
    }

    const baseUrl = IMG_URL || 'http://localhost:5000';
    return `${baseUrl}${clean}`;
  };

  // Fetch testimonials from API on component mount
  useEffect(() => {
    const fetchCustomerTestimonials = async () => {
      try {
        const response = await API.get('/testimonials');
        let data = [];

        if (response.data && response.data.data) {
          data = response.data.data;
        } else if (Array.isArray(response.data)) {
          data = response.data;
        }

        // Filter only Active testimonials for the public view
        const activeTestimonials = data.filter(
          (item) => !item.status || item.status.toLowerCase() === 'active'
        );

        setTestimonials(activeTestimonials);
      } catch (error) {
        console.error('Error fetching testimonials for homepage:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerTestimonials();
  }, []);

  const handleImageError = (id) => {
    setBrokenImages((prev) => ({ ...prev, [id]: true }));
  };

  const toggleExpand = (id) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Pagination navigation for sets of 3 cards
  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 3, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + 3 < testimonials.length ? prev + 3 : prev
    );
  };

  // Extract the currently active slice of 3 cards
  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3);
  const totalPages = Math.ceil(testimonials.length / 3);
  const currentPage = Math.floor(currentIndex / 3);

  return (
    <section className="HomeCustomer">
      <div className="HomeCustomer-container">
        
        {/* Section Header with Managed Heading Hierarchy */}
        <div className="HomeCustomer-header">
          <span className="HomeCustomer-tag">Testimonials</span>
          
          {/* SEO Primary Target Keyword */}
          <h1 className="HomeCustomer-seo-title">
            Top Real Estate Company in Bhubaneswar, Odisha
          </h1>
          
          {/* Customer Reviews Subheading */}
          <h2 className="HomeCustomer-main-title">
            What Our Happy Customers Say
          </h2>
          
          <p className="HomeCustomer-subtitle">
            See how Utkal Property has helped families and businesses find their ideal properties across Odisha
          </p>
        </div>

        {/* Dynamic Testimonials Grid */}
        {loading ? (
          <div className="HomeCustomer-loading">Loading testimonials...</div>
        ) : testimonials.length > 0 ? (
          <>
            <div className="HomeCustomer-grid">
              {visibleTestimonials.map((item) => {
                const id = item._id || item.id;
                const avatarUrl = getImageUrl(item.photo);
                const isImageBroken = brokenImages[id];
                const isExpanded = !!expandedCards[id];

                // Combine designation and location for the role string
                const roleInfo = [item.designation, item.location].filter(Boolean).join(', ');

                // Description truncation setup
                const rawDescription = item.description || '';
                const needsTruncation = rawDescription.length > CHAR_LIMIT;
                const displayedDescription = isExpanded || !needsTruncation
                  ? rawDescription
                  : `${rawDescription.substring(0, CHAR_LIMIT)}...`;

                return (
                  <div key={id} className="HomeCustomer-card-wrapper">
                    
                    {/* White Floating Card */}
                    <div className="HomeCustomer-card">
                      <div className="HomeCustomer-badge-icon">
                        <BsChatLeftTextFill />
                      </div>

                      {/* Star Rating Display */}
                      {item.rating && (
                        <div className="HomeCustomer-stars">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              color={i < item.rating ? '#ffc107' : '#e4e5e9'}
                              size={14}
                            />
                          ))}
                        </div>
                      )}

                      {/* Quote Text & Read More Trigger */}
                      <div className="HomeCustomer-quote-container">
                        <p className="HomeCustomer-quote">“{displayedDescription}”</p>
                        {needsTruncation && (
                          <button
                            type="button"
                            className="HomeCustomer-readmore-btn"
                            onClick={() => toggleExpand(id)}
                          >
                            {isExpanded ? 'Read Less' : 'Read More'}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* User Avatar & Name Details */}
                    <div className="HomeCustomer-author-info">
                      <div className="HomeCustomer-avatar-wrapper">
                        {avatarUrl && !isImageBroken ? (
                          <img
                            src={avatarUrl}
                            alt={item.name}
                            className="HomeCustomer-avatar"
                            onError={() => handleImageError(id)}
                          />
                        ) : (
                          <FaUserCircle className="HomeCustomer-avatar-placeholder" />
                        )}
                      </div>
                      <h3 className="HomeCustomer-author-name">{item.name}</h3>
                      {roleInfo && <p className="HomeCustomer-author-role">{roleInfo}</p>}
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Pagination Controls when items exceed 3 */}
            {testimonials.length > 3 && (
              <div className="HomeCustomer-controls">
                <button
                  type="button"
                  className="HomeCustomer-control-btn"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  aria-label="Previous testimonials"
                >
                  <FaChevronLeft size={14} />
                </button>

                <div className="HomeCustomer-dots">
                  {[...Array(totalPages)].map((_, pageIdx) => (
                    <span
                      key={pageIdx}
                      className={`HomeCustomer-dot ${currentPage === pageIdx ? 'active' : ''}`}
                      onClick={() => setCurrentIndex(pageIdx * 3)}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  className="HomeCustomer-control-btn"
                  onClick={handleNext}
                  disabled={currentIndex + 3 >= testimonials.length}
                  aria-label="Next testimonials"
                >
                  <FaChevronRight size={14} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="HomeCustomer-empty">No testimonials available at the moment.</div>
        )}

        {/* Rounded Bottom Callout Banner */}
        <div className="HomeCustomer-footer-callout">
          <span>Become our next customer, and find your dream property with Utkal Property. </span>
          <a href="tel:+919876543210" className="HomeCustomer-contact-highlight">
            Call Us: +91 98765 43210
          </a>
        </div>

      </div>
    </section>
  );
};

export default HomeCustomer;