import React, { useState } from 'react';
import './HomeRealEstate.css';

// React Icons
import { FaChevronUp, FaTimes } from 'react-icons/fa';

const AREA_DATA = [
  {
    id: 1,
    title: 'Bhubaneswar',
    listings: '1,570 Listings',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 2,
    title: 'Cuttack',
    listings: '980 Listings',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 3,
    title: 'Puri',
    listings: '640 Listings',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 4,
    title: 'Rourkela',
    listings: '420 Listings',
    image: 'https://images.unsplash.com/photo-1477959858617-67f30ac4ce78?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 5,
    title: 'Sambalpur',
    listings: '310 Listings',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 6,
    title: 'Berhampur',
    listings: '250 Listings',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 7,
    title: 'Balasore',
    listings: '190 Listings',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 8,
    title: 'Jharsuguda',
    listings: '150 Listings',
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
      {/* Header Section */}
      <div className="HomeRealEstate-header">
        <span className="HomeRealEstate-tag">Explore Properties</span>
        <h1 className="HomeRealEstate-title">Search Real Estate By Area</h1>
        <p className="HomeRealEstate-subtitle">
          Discover premium commercial and residential spaces with Utkal Property
        </p>
      </div>

      {/* Grid Container */}
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

            {/* Bottom Content Overlay */}
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

      {/* Fullscreen Lightbox Modal */}
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