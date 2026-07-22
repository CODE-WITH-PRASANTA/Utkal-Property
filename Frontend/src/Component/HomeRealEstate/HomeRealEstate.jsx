import React, { useState } from 'react';
import './HomeRealEstate.css';

// React Icons
import { FaChevronUp, FaTimes } from 'react-icons/fa';

// Mock Data for the 8 Area Cards matching the reference images
const AREA_DATA = [
  {
    id: 1,
    title: 'California',
    listings: '1570 listing',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 2,
    title: 'California',
    listings: '1570 listing',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 3,
    title: 'California',
    listings: '1570 listing',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 4,
    title: 'California',
    listings: '1570 listing',
    image: 'https://images.unsplash.com/photo-1477959858617-67f30ac4ce78?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 5,
    title: 'California',
    listings: '1570 listing',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 6,
    title: 'California',
    listings: '1570 listing',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 7,
    title: 'California',
    listings: '1570 listing',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 8,
    title: 'California',
    listings: '1570 listing',
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1000&q=80'
  }
];

const HomeRealEstate = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpenModal = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="HomeRealEstate">
      {/* Header Area */}
      <div className="HomeRealEstate-header">
        <h1 className="HomeRealEstate-title">Search real estate by area</h1>
        <p className="HomeRealEstate-subtitle">
          Find your dream apartment with our listing
        </p>
      </div>

      {/* 4x2 Grid Container */}
      <div className="HomeRealEstate-grid">
        {AREA_DATA.map((item) => (
          <div key={item.id} className="HomeRealEstate-card">
            <img
              src={item.image}
              alt={item.title}
              className="HomeRealEstate-card-img"
            />

            {/* Hover Crosshair (+) Overlay */}
            <div
              className="HomeRealEstate-hover-overlay"
              onClick={() => handleOpenModal(item.image)}
            >
              <span className="HomeRealEstate-plus-icon">+</span>
            </div>

            {/* Always Visible Text Overlay */}
            <div className="HomeRealEstate-card-content">
              <h3 className="HomeRealEstate-card-title">{item.title}</h3>
              <p className="HomeRealEstate-card-listings">{item.listings}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll To Top Button */}
      <button
        className="HomeRealEstate-scroll-top"
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <FaChevronUp />
      </button>

      {/* Lightbox / Fullscreen Modal when '+' is clicked */}
      {selectedImage && (
        <div className="HomeRealEstate-modal-overlay" onClick={handleCloseModal}>
          <div
            className="HomeRealEstate-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="HomeRealEstate-modal-close"
              onClick={handleCloseModal}
              aria-label="Close modal"
            >
              <FaTimes />
            </button>
            <img
              src={selectedImage}
              alt="Enlarged view"
              className="HomeRealEstate-modal-img"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default HomeRealEstate;