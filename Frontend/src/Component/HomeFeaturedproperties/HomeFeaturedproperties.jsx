import React, { useState } from 'react';
import './HomeFeaturedproperties.css';

// React Icons
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaBookmark,
  FaRegBookmark,
  FaPlus,
  FaArrowLeft,
  FaArrowRight,
  FaMapMarkerAlt,
  FaChevronUp
} from 'react-icons/fa';

// Categories for Tabs
const CATEGORIES = ['Houses', 'Smart home', 'Apartments', 'Office', 'Villa', 'Bungalow'];

// Mock Property Data (8 items per category to support pagination of 4 per page across 2 pages)
const PROPERTIES_DATA = {
  Houses: [
    {
      id: 1,
      title: 'Gorgeous Apartment Building',
      address: '58 Hullbrook Road, Billesley, B13 0LA',
      price: '$7,500',
      beds: 4,
      baths: 2,
      sqft: 1150,
      featured: true,
      forSale: false,
      timeAgo: '3 years ago',
      avatar: 'https://i.pravatar.cc/150?img=11',
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 2,
      title: 'Gorgeous Apartment Building',
      address: '58 Hullbrook Road, Billesley, B13 0LA',
      price: '$7,500',
      beds: 4,
      baths: 2,
      sqft: 1150,
      featured: true,
      forSale: true,
      timeAgo: '3 years ago',
      avatar: 'https://i.pravatar.cc/150?img=20',
      images: [
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 3,
      title: 'Gorgeous Apartment Building',
      address: '58 Hullbrook Road, Billesley, B13 0LA',
      price: '$7,500',
      beds: 4,
      baths: 2,
      sqft: 1150,
      featured: false,
      forSale: false,
      timeAgo: '3 years ago',
      avatar: 'https://i.pravatar.cc/150?img=33',
      images: [
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 4,
      title: 'Gorgeous Apartment Building',
      address: '58 Hullbrook Road, Billesley, B13 0LA',
      price: '$7,500',
      beds: 4,
      baths: 2,
      sqft: 1150,
      featured: true,
      forSale: true,
      timeAgo: '3 years ago',
      avatar: 'https://i.pravatar.cc/150?img=60',
      images: [
        'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80'
      ]
    },
    // Page 2 items
    {
      id: 5,
      title: 'Gorgeous Apartment Building',
      address: '58 Hullbrook Road, Billesley, B13 0LA',
      price: '$7,500',
      beds: 4,
      baths: 2,
      sqft: 1150,
      featured: true,
      forSale: true,
      timeAgo: '3 years ago',
      avatar: 'https://i.pravatar.cc/150?img=12',
      images: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 6,
      title: 'Gorgeous Apartment Building',
      address: '58 Hullbrook Road, Billesley, B13 0LA',
      price: '$7,500',
      beds: 4,
      baths: 2,
      sqft: 1150,
      featured: true,
      forSale: false,
      timeAgo: '3 years ago',
      avatar: 'https://i.pravatar.cc/150?img=15',
      images: [
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 7,
      title: 'Gorgeous Apartment Building',
      address: '58 Hullbrook Road, Billesley, B13 0LA',
      price: '$7,500',
      beds: 4,
      baths: 2,
      sqft: 1150,
      featured: true,
      forSale: true,
      timeAgo: '3 years ago',
      avatar: 'https://i.pravatar.cc/150?img=32',
      images: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 8,
      title: 'Gorgeous Apartment Building',
      address: '58 Hullbrook Road, Billesley, B13 0LA',
      price: '$7,500',
      beds: 4,
      baths: 2,
      sqft: 1150,
      featured: false,
      forSale: false,
      timeAgo: '3 years ago',
      avatar: 'https://i.pravatar.cc/150?img=47',
      images: [
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80'
      ]
    }
  ]
};

// Populate other categories with slight mock tweaks
CATEGORIES.slice(1).forEach((cat) => {
  PROPERTIES_DATA[cat] = PROPERTIES_DATA['Houses'].map((item, idx) => ({
    ...item,
    id: idx + 100,
    title: `${cat} Modern Design ${idx + 1}`
  }));
});

// Single Property Card Component
const PropertyCard = ({ property }) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="HomeFeaturedproperties-card">
      {/* Image Container with Hover Controls */}
      <div className="HomeFeaturedproperties-card-img-wrapper">
        <img
          src={property.images[currentImgIndex]}
          alt={property.title}
          className="HomeFeaturedproperties-card-img"
        />

        {/* Badges */}
        <div className="HomeFeaturedproperties-badges">
          {property.featured && (
            <span className="HomeFeaturedproperties-badge-featured">Featured</span>
          )}
          {property.forSale && (
            <span className="HomeFeaturedproperties-badge-forsale">For Sale</span>
          )}
        </div>

        {/* Bookmark Icon */}
        <button
          className="HomeFeaturedproperties-bookmark-btn"
          onClick={toggleBookmark}
          aria-label="Bookmark property"
        >
          {isBookmarked ? (
            <FaBookmark className="HomeFeaturedproperties-bookmark-filled" />
          ) : (
            <FaBookmark className="HomeFeaturedproperties-bookmark-outline" />
          )}
        </button>

        {/* Hover Overlay with Crosshair (+) and Arrows */}
        <div className="HomeFeaturedproperties-hover-overlay">
          <div className="HomeFeaturedproperties-crosshair-icon">+</div>
          <div className="HomeFeaturedproperties-nav-arrows">
            <button
              className="HomeFeaturedproperties-arrow-btn"
              onClick={handlePrevImage}
            >
              <FaArrowLeft />
            </button>
            <button
              className="HomeFeaturedproperties-arrow-btn"
              onClick={handleNextImage}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="HomeFeaturedproperties-card-content">
        <h3 className="HomeFeaturedproperties-title">{property.title}</h3>
        
        <p className="HomeFeaturedproperties-address">
          <FaMapMarkerAlt className="HomeFeaturedproperties-address-icon" />
          {property.address}
        </p>

        <div className="HomeFeaturedproperties-price">{property.price}</div>

        <div className="HomeFeaturedproperties-specs">
          <span className="HomeFeaturedproperties-spec-item">
            <FaBed /> Beds: <strong>{property.beds}</strong>
          </span>
          <span className="HomeFeaturedproperties-spec-item">
            <FaBath /> Baths: <strong>{property.baths}</strong>
          </span>
          <span className="HomeFeaturedproperties-spec-item">
            <FaRulerCombined /> Sqft: <strong>{property.sqft}</strong>
          </span>
        </div>

        <div className="HomeFeaturedproperties-card-footer">
          <button className="HomeFeaturedproperties-compare-btn">
            <FaPlus className="HomeFeaturedproperties-plus-icon" /> Compare
          </button>
          
          <div className="HomeFeaturedproperties-user-info">
            <img
              src={property.avatar}
              alt="Agent Avatar"
              className="HomeFeaturedproperties-avatar"
            />
            <span className="HomeFeaturedproperties-time">{property.timeAgo}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomeFeaturedproperties = () => {
  const [activeTab, setActiveTab] = useState('Houses');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const activeProperties = PROPERTIES_DATA[activeTab] || [];
  const totalPages = Math.ceil(activeProperties.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProperties = activeProperties.slice(indexOfFirstItem, indexOfLastItem);

  const handleTabChange = (category) => {
    setActiveTab(category);
    setCurrentPage(1); // Reset to page 1 on category change
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="HomeFeaturedproperties">
      <div className="HomeFeaturedproperties-container">
        {/* Header Section */}
        <div className="HomeFeaturedproperties-header">
          <h1 className="HomeFeaturedproperties-main-heading">Featured properties</h1>
          <p className="HomeFeaturedproperties-subheading">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel lobortis justo
          </p>
        </div>

        {/* Category Tabs */}
        <div className="HomeFeaturedproperties-tabs">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              className={`HomeFeaturedproperties-tab-btn ${
                activeTab === category ? 'active' : ''
              }`}
              onClick={() => handleTabChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Property Grid */}
        <div className="HomeFeaturedproperties-grid">
          {currentProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="HomeFeaturedproperties-pagination">
            <button
              className="HomeFeaturedproperties-page-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                className={`HomeFeaturedproperties-page-num ${
                  currentPage === pageNum ? 'active' : ''
                }`}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </button>
            ))}
            <button
              className="HomeFeaturedproperties-page-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        )}

        {/* Floating Scroll to Top Button */}
        <button className="HomeFeaturedproperties-scroll-top-btn" onClick={scrollToTop}>
          <FaChevronUp />
        </button>
      </div>
    </div>
  );
};

export default HomeFeaturedproperties;