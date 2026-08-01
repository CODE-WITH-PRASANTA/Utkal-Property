import React, { useState } from 'react';
import './Propertiesforrent.css';

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

// Mock Data updated to Indian currency (₹/month) and local Odisha rental locations
const PROPERTIES_DATA = [
  {
    id: 1,
    title: 'Modern 3BHK Fully Furnished Flat',
    address: 'Near KIIT Square, Patia, Bhubaneswar',
    price: '₹ 28,000 / mo',
    beds: 3,
    baths: 2,
    sqft: 1450,
    featured: true,
    forRent: true,
    timeAgo: '1 day ago',
    avatar: 'https://i.pravatar.cc/150?img=12',
    images: [
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 2,
    title: 'Luxury Residency Apartment',
    address: 'Saheed Nagar, Bhubaneswar, Odisha',
    price: '₹ 35,000 / mo',
    beds: 3,
    baths: 3,
    sqft: 1650,
    featured: true,
    forRent: true,
    timeAgo: '3 days ago',
    avatar: 'https://i.pravatar.cc/150?img=15',
    images: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 3,
    title: 'Spacious 2BHK Rental Unit',
    address: 'Chandrasekharpur, Bhubaneswar, Odisha',
    price: '₹ 18,500 / mo',
    beds: 2,
    baths: 2,
    sqft: 1100,
    featured: true,
    forRent: true,
    timeAgo: '5 days ago',
    avatar: 'https://i.pravatar.cc/150?img=32',
    images: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 4,
    title: 'Commercial Office Space',
    address: 'Cuttack Road, Bhubaneswar, Odisha',
    price: '₹ 45,000 / mo',
    beds: 4,
    baths: 2,
    sqft: 2100,
    featured: true,
    forRent: true,
    timeAgo: '1 week ago',
    avatar: 'https://i.pravatar.cc/150?img=51',
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

// Single Card Component with Image Carousel & Zoom Trigger
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
    <div className="Propertiesforrent-card">
      {/* Image Container with Hover Overlay */}
      <div className="Propertiesforrent-card-img-wrapper">
        <img
          src={property.images[currentImgIndex]}
          alt={property.title}
          className="Propertiesforrent-card-img"
        />

        {/* Top-Left Badges */}
        <div className="Propertiesforrent-badges">
          {property.featured && (
            <span className="Propertiesforrent-badge-featured">Featured</span>
          )}
          {property.forRent && (
            <span className="Propertiesforrent-badge-forrent">For Rent</span>
          )}
        </div>

        {/* Top-Right Bookmark Icon */}
        <div className="Propertiesforrent-bookmark-tag">
          <FaBookmark />
        </div>

        {/* Hover Overlay with (+) & Navigation Arrows */}
        <div className="Propertiesforrent-hover-overlay">
          <div
            className="Propertiesforrent-crosshair-icon"
            onClick={() => onOpenModal(property.images[currentImgIndex])}
            title="View image full size"
          >
            +
          </div>

          <div className="Propertiesforrent-nav-arrows">
            <button
              className="Propertiesforrent-arrow-btn"
              onClick={handlePrevImage}
              aria-label="Previous Image"
            >
              <FaArrowLeft />
            </button>
            <button
              className="Propertiesforrent-arrow-btn"
              onClick={handleNextImage}
              aria-label="Next Image"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="Propertiesforrent-card-content">
        <h3 className="Propertiesforrent-card-title">{property.title}</h3>

        <p className="Propertiesforrent-address">
          <FaMapMarkerAlt className="Propertiesforrent-address-icon" />
          <span>{property.address}</span>
        </p>

        <div className="Propertiesforrent-price">{property.price}</div>

        <div className="Propertiesforrent-specs">
          <span className="Propertiesforrent-spec-item">
            <FaBed /> Beds: <strong>{property.beds}</strong>
          </span>
          <span className="Propertiesforrent-spec-item">
            <FaBath /> Baths: <strong>{property.baths}</strong>
          </span>
          <span className="Propertiesforrent-spec-item">
            <FaRulerCombined /> Sqft: <strong>{property.sqft}</strong>
          </span>
        </div>

        {/* Card Footer */}
        <div className="Propertiesforrent-card-footer">
          <button className="Propertiesforrent-compare-btn">
            <FaPlus className="Propertiesforrent-plus-icon" /> Compare
          </button>

          <div className="Propertiesforrent-user-info">
            <img
              src={property.avatar}
              alt="Agent Avatar"
              className="Propertiesforrent-avatar"
            />
            <span className="Propertiesforrent-time">{property.timeAgo}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Propertiesforrent = () => {
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
    <section className="Propertiesforrent">
      <div className="Propertiesforrent-container">
        {/* Header */}
        <div className="Propertiesforrent-header">
          <span className="Propertiesforrent-tag">Rental Spaces</span>
          <h1 className="Propertiesforrent-main-heading">Properties For Rent</h1>
          <p className="Propertiesforrent-subheading">
            Find premium residential and commercial rental options curated by Utkal Property
          </p>
        </div>

        {/* 4 Card Grid */}
        <div className="Propertiesforrent-grid">
          {PROPERTIES_DATA.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onOpenModal={handleOpenModal}
            />
          ))}
        </div>

        {/* Scroll-to-Top Button */}
        <button
          className="Propertiesforrent-scroll-top-btn"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <FaChevronUp />
        </button>

        {/* Modal Lightbox */}
        {selectedImage && (
          <div
            className="Propertiesforrent-modal-overlay"
            onClick={handleCloseModal}
          >
            <div
              className="Propertiesforrent-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="Propertiesforrent-modal-close"
                onClick={handleCloseModal}
                aria-label="Close modal"
              >
                <FaTimes />
              </button>
              <img
                src={selectedImage}
                alt="Enlarged property"
                className="Propertiesforrent-modal-img"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Propertiesforrent;