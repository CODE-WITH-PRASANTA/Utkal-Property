import React, { useState, useEffect } from 'react';
import './HomeRealEstate.css';
import API, { IMG_URL } from '../../api/axios'; // Adjust relative import path if needed

// React Icons
import { FaChevronUp, FaTimes, FaImage } from 'react-icons/fa';

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
              <div key={itemId} className="HomeRealEstate-card">
                {!isBroken ? (
                  <img
                    src={imageUrl}
                    alt={item.title || `Property ${index + 1}`}
                    className="HomeRealEstate-card-img"
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
                  >
                    <span className="HomeRealEstate-plus-icon">+</span>
                  </div>
                )}

                {/* Bottom Content Overlay */}
                <div className="HomeRealEstate-card-content">
                  <h3 className="HomeRealEstate-card-title">
                    {item.title || 'Utkal Property'}
                  </h3>
                  <p className="HomeRealEstate-card-listings">
                    {item.location || item.listings || 'Explore Listing'}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="HomeRealEstate-empty">
            <p>No gallery images found. Upload new properties in the admin panel!</p>
          </div>
        )}
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