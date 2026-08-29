import React, { useState, useEffect } from 'react';
import './HomeRealEstate.css';
import API, { IMG_URL } from '../../api/axios';

// React Icons
import { FaTimes, FaImage, FaMapMarkedAlt } from 'react-icons/fa';

const HomeRealEstate = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [brokenImages, setBrokenImages] = useState({});

  /**
   * Universal Image URL Resolver
   * Resolves absolute backend server paths for static files (/uploads/gallery/filename.webp)
   */
  const getImageUrl = (photoPath) => {
    if (!photoPath) return '';

    // 1. Direct Blob previews or absolute web URLs
    if (
      photoPath.startsWith('http://') ||
      photoPath.startsWith('https://') ||
      photoPath.startsWith('blob:')
    ) {
      return photoPath;
    }

    // 2. Normalize Windows backslashes
    let clean = photoPath.replace(/\\/g, '/');

    // 3. Isolate path starting from uploads/
    const uploadsIndex = clean.indexOf('uploads/');
    if (uploadsIndex !== -1) {
      clean = '/' + clean.substring(uploadsIndex);
    } else {
      clean = clean.startsWith('/') ? clean : `/${clean}`;
    }

    // 4. Attach base URL safely without double slashes
    const baseUrl = (IMG_URL || 'http://localhost:5000').replace(/\/+$/, '');
    return `${baseUrl}${clean}`;
  };

  // Fetch all gallery items from Backend API
  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const response = await API.get('/gallery');
      let data = [];

      if (response.data && response.data.data) {
        data = response.data.data;
      } else if (Array.isArray(response.data)) {
        data = response.data;
      }

      setGalleryItems(data);
    } catch (error) {
      console.error('Error fetching real estate gallery items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  // Track broken image links gracefully
  const handleImageError = (id) => {
    setBrokenImages((prev) => ({ ...prev, [id]: true }));
  };

  const handleOpenModal = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <section className="HomeRealEstate" aria-labelledby="apartment-dealers-heading">
      <div className="HomeRealEstate-container">
        
        {/* SEO Header Section */}
        <header className="HomeRealEstate-header">
          <span className="HomeRealEstate-tag">
            <FaMapMarkedAlt className="HomeRealEstate-tag-icon" /> Prime Location Showcase
          </span>
          <h1 id="apartment-dealers-heading" className="HomeRealEstate-title">
            Best Apartment Dealers in Bhubaneswar — <span className="highlight-green">Explore Properties by Area</span>
          </h1>
          <p className="HomeRealEstate-subtitle">
            Partner with the <strong>best apartment dealers in Bhubaneswar</strong> to discover luxury 2 BHK, 3 BHK, and 4 BHK residential flats, penthouses, and premium gated communities across top localities including Patia, Jaydev Vihar, Saheed Nagar, Khandagiri, and Rasulgarh.
          </p>
        </header>

        {/* Grid Container */}
        <div className="HomeRealEstate-grid">
          {loading ? (
            <div className="HomeRealEstate-loading">
              <p>Loading gallery properties...</p>
            </div>
          ) : galleryItems.length > 0 ? (
            galleryItems.map((item, index) => {
              const itemId = item._id || item.id || index;
              const imageUrl = getImageUrl(item.image);
              const isBroken = brokenImages[itemId];

              return (
                <article key={itemId} className="HomeRealEstate-card">
                  {!isBroken ? (
                    <img
                      src={imageUrl}
                      alt={item.title || `Luxury Apartment in Bhubaneswar - Area ${index + 1}`}
                      className="HomeRealEstate-card-img"
                      loading="lazy"
                      onError={() => handleImageError(itemId)}
                    />
                  ) : (
                    <div className="HomeRealEstate-card-broken">
                      <FaImage />
                      <span>Image Unavailable</span>
                    </div>
                  )}

                  {/* Hover Crosshair (+) Overlay */}
                  {!isBroken && (
                    <div
                      className="HomeRealEstate-hover-overlay"
                      onClick={() => handleOpenModal(imageUrl)}
                      role="button"
                      tabIndex={0}
                      aria-label="View enlarged image"
                    >
                      <span className="HomeRealEstate-plus-icon">+</span>
                    </div>
                  )}

                  {/* Bottom Content Overlay */}
                  <div className="HomeRealEstate-card-content">
                    <h2 className="HomeRealEstate-card-title">
                      {item.title || 'Utkal Luxury Apartments'}
                    </h2>
                    <p className="HomeRealEstate-card-listings">
                      {item.location || item.listings || 'Explore Area Listings'}
                    </p>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="HomeRealEstate-empty">
              <p>No gallery images found. Upload new properties in the admin panel!</p>
            </div>
          )}
        </div>

        {/* Fullscreen Lightbox Modal */}
        {selectedImage && (
          <div 
            className="HomeRealEstate-modal-overlay" 
            onClick={handleCloseModal}
            role="dialog"
            aria-modal="true"
          >
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
                alt="Enlarged view of Bhubaneswar Apartment"
                className="HomeRealEstate-modal-img"
              />
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default HomeRealEstate;