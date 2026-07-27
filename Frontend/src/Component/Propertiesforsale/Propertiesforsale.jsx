import React, { useState } from 'react';
import './Propertiesforsale.css';

// React Icons
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaBookmark,
  FaPlus,
  FaArrowLeft,
  FaArrowRight,
  FaMapMarkerAlt,
  FaChevronUp,
  FaTimes
} from 'react-icons/fa';

// Mock Data for the 3 Cards matching the reference images
const PROPERTIES_DATA = [
  {
    id: 1,
    title: 'Gorgeous Apartment Building',
    address: '58 Hullbrook Road, Billesley, B13 0LA',
    price: '$7,500',
    beds: 4,
    baths: 2,
    sqft: 1150,
    featured: true,
    forSale: true,
    timeAgo: '3 years ago',
    avatar: 'https://i.pravatar.cc/150?img=11',
    images: [
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
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
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
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
    featured: true,
    forSale: true,
    timeAgo: '3 years ago',
    avatar: 'https://i.pravatar.cc/150?img=33',
    images: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

// Single Card Component with Carousel & Modal Zoom feature
const PropertyCard = ({ property, onOpenModal }) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

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

  return (
    <div className="Propertiesforsale-card">
      {/* Image Container with Hover Controls */}
      <div className="Propertiesforsale-card-img-wrapper">
        <img
          src={property.images[currentImgIndex]}
          alt={property.title}
          className="Propertiesforsale-card-img"
        />

        {/* Badges */}
        <div className="Propertiesforsale-badges">
          {property.featured && (
            <span className="Propertiesforsale-badge-featured">Featured</span>
          )}
          {property.forSale && (
            <span className="Propertiesforsale-badge-forsale">For Sale</span>
          )}
        </div>

        {/* Top-Right Ribbon Icon */}
        <div className="Propertiesforsale-bookmark-tag">
          <FaBookmark />
        </div>

        {/* Hover Overlay with Crosshair (+) and Nav Arrows */}
        <div className="Propertiesforsale-hover-overlay">
          <div
            className="Propertiesforsale-crosshair-icon"
            onClick={() => onOpenModal(property.images[currentImgIndex])}
            title="Click to view image"
          >
            +
          </div>
          <div className="Propertiesforsale-nav-arrows">
            <button
              className="Propertiesforsale-arrow-btn"
              onClick={handlePrevImage}
              aria-label="Previous Image"
            >
              <FaArrowLeft />
            </button>
            <button
              className="Propertiesforsale-arrow-btn"
              onClick={handleNextImage}
              aria-label="Next Image"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* Card Content Section */}
      <div className="Propertiesforsale-card-content">
        <h3 className="Propertiesforsale-card-title">{property.title}</h3>

        <p className="Propertiesforsale-address">
          <FaMapMarkerAlt className="Propertiesforsale-address-icon" />
          {property.address}
        </p>

        <div className="Propertiesforsale-price">{property.price}</div>

        <div className="Propertiesforsale-specs">
          <span className="Propertiesforsale-spec-item">
            <FaBed /> Beds: <strong>{property.beds}</strong>
          </span>
          <span className="Propertiesforsale-spec-item">
            <FaBath /> Baths: <strong>{property.baths}</strong>
          </span>
          <span className="Propertiesforsale-spec-item">
            <FaRulerCombined /> Sqft: <strong>{property.sqft}</strong>
          </span>
        </div>

        {/* Footer */}
        <div className="Propertiesforsale-card-footer">
          <button className="Propertiesforsale-compare-btn">
            <FaPlus className="Propertiesforsale-plus-icon" /> Compare
          </button>

          <div className="Propertiesforsale-user-info">
            <img
              src={property.avatar}
              alt="Agent Avatar"
              className="Propertiesforsale-avatar"
            />
            <span className="Propertiesforsale-time">{property.timeAgo}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Propertiesforsale = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpenModal = (imgUrl) => {
    setSelectedImage(imgUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="Propertiesforsale">
      <div className="Propertiesforsale-container">
        {/* Main Heading & Subtitle */}
        <div className="Propertiesforsale-header">
          <h1 className="Propertiesforsale-main-heading">Properties for sale</h1>
          <p className="Propertiesforsale-subheading">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel lobortis justo
          </p>
        </div>

        {/* 3-Card Grid */}
        <div className="Propertiesforsale-grid">
          {PROPERTIES_DATA.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onOpenModal={handleOpenModal}
            />
          ))}
        </div>

        {/* Scroll-to-top Floating Button */}
        <button
          className="Propertiesforsale-scroll-top-btn"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <FaChevronUp />
        </button>

        {/* Image Lightbox Modal */}
        {selectedImage && (
          <div
            className="Propertiesforsale-modal-overlay"
            onClick={handleCloseModal}
          >
            <div
              className="Propertiesforsale-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="Propertiesforsale-modal-close"
                onClick={handleCloseModal}
                aria-label="Close image modal"
              >
                <FaTimes />
              </button>
              <img
                src={selectedImage}
                alt="Enlarged property"
                className="Propertiesforsale-modal-img"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Propertiesforsale;