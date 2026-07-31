import React, { useState } from 'react';
import { FaStar, FaRegStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './PropertyDetailsPeopleSay.css';

const PropertyDetailsPeopleSay = () => {
  // Mock data for reviews. Added a few extra to demonstrate functional pagination.
  const allReviews = [
    {
      id: 1,
      name: "Bichitra Nayak",
      initial: "B",
      date: "30th June 2026",
      rating: 5,
      text: "Sand2Sky is one of the best property consultants in Bhubaneswar. Their knowledge of luxury apartments and premium properties helped us make the right investment decision. Highly recommended"
    },
    {
      id: 2,
      name: "Devayoni Services",
      initial: "D",
      date: "1st July 2026",
      rating: 5,
      text: "Very professional real estate company. Sand2Sky offers excellent options for luxury homes, villas, and premium apartments in Bhubaneswar. The team is responsive, knowledgeable, and customer-focused"
    },
    {
      id: 3,
      name: "Ankita Swain",
      initial: "A",
      date: "6th July 2026",
      rating: 4,
      text: "If you're looking for premium properties in Bhubaneswar, Sand2Sky is the right choice. Professional team, transparent advice, and excellent property options."
    },
    {
      id: 4,
      name: "Debaraj Sahoo",
      initial: "D",
      date: "7th July 2026",
      rating: 5,
      text: "Excellent experience with Sand2Sky! They helped me find the perfect luxury apartment in Bhubaneswar. Professional team, transparent guidance, and great support throughout the property buying process. Highly recommended for luxury..."
    },
    // Extra reviews to make pagination arrows functional
    {
      id: 5,
      name: "Suresh Kumar",
      initial: "S",
      date: "12th July 2026",
      rating: 5,
      text: "Great properties and smooth paperwork. The agents were very helpful in finding a home within our budget."
    },
    {
      id: 6,
      name: "Priya Mohanty",
      initial: "P",
      date: "15th July 2026",
      rating: 5,
      text: "Highly professional and trustworthy. They guided us through every step of purchasing our new villa."
    }
  ];

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 4;
  const totalPages = Math.ceil(allReviews.length / reviewsPerPage);

  // Pagination Logic
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = allReviews.slice(indexOfFirstReview, indexOfLastReview);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleViewAll = (e) => {
    e.preventDefault();
    alert("Navigating to all Google Reviews...");
  };

  // Helper to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="PropertyDetailsPeopleSay-star filled" />);
      } else {
        stars.push(<FaRegStar key={i} className="PropertyDetailsPeopleSay-star empty" />);
      }
    }
    return stars;
  };

  return (
    <div className="PropertyDetailsPeopleSay-wrapper">
      <div className="PropertyDetailsPeopleSay-card">
        
        {/* Header Section */}
        <div className="PropertyDetailsPeopleSay-header">
          <h2 className="PropertyDetailsPeopleSay-title">What People Say About Us</h2>
          <div className="PropertyDetailsPeopleSay-google-logo">
            <span style={{ color: '#4285F4' }}>G</span>
            <span style={{ color: '#EA4335' }}>o</span>
            <span style={{ color: '#FBBC05' }}>o</span>
            <span style={{ color: '#4285F4' }}>g</span>
            <span style={{ color: '#34A853' }}>l</span>
            <span style={{ color: '#EA4335' }}>e</span>
            <span className="PropertyDetailsPeopleSay-reviews-text">Reviews</span>
          </div>
        </div>

        {/* Summary Section */}
        <div className="PropertyDetailsPeopleSay-summary">
          <span className="PropertyDetailsPeopleSay-summary-score">5</span>
          <div className="PropertyDetailsPeopleSay-summary-stars">
            {renderStars(5)}
          </div>
          <span className="PropertyDetailsPeopleSay-summary-count">(12 Reviews)</span>
          <a href="#view-all" onClick={handleViewAll} className="PropertyDetailsPeopleSay-view-all">
            View All Reviews
          </a>
        </div>

        {/* Reviews Grid */}
        <div className="PropertyDetailsPeopleSay-grid">
          {currentReviews.map((review) => (
            <div key={review.id} className="PropertyDetailsPeopleSay-review-item">
              <div className="PropertyDetailsPeopleSay-review-header">
                <div className="PropertyDetailsPeopleSay-avatar">{review.initial}</div>
                <div className="PropertyDetailsPeopleSay-meta">
                  <h3 className="PropertyDetailsPeopleSay-reviewer-name">{review.name}</h3>
                  <div className="PropertyDetailsPeopleSay-rating-row">
                    <div className="PropertyDetailsPeopleSay-review-stars">
                      {renderStars(review.rating)}
                    </div>
                    <span className="PropertyDetailsPeopleSay-date">{review.date}</span>
                  </div>
                </div>
              </div>
              <p className="PropertyDetailsPeopleSay-review-text">{review.text}</p>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="PropertyDetailsPeopleSay-pagination">
          <button 
            className={`PropertyDetailsPeopleSay-nav-btn ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>
          <button 
            className={`PropertyDetailsPeopleSay-nav-btn ${currentPage === totalPages ? 'disabled' : 'active'}`}
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight />
          </button>
        </div>

      </div>
    </div>
  );
};

export default PropertyDetailsPeopleSay;