import { useEffect, useState } from 'react';
import './HomeFeaturedproperties.css';
import API, { BASE_URL } from '../../api/axios';

// Local AVIF Fallback Images
import prop1 from '../../assets/property1.avif';
import prop2 from '../../assets/property2.avif';
import prop3 from '../../assets/property3.avif';
import prop4 from '../../assets/property4.avif';
import prop5 from '../../assets/property5.avif';
import prop6 from '../../assets/property6.avif';
import prop7 from '../../assets/property7.avif';
import prop8 from '../../assets/property8.avif';

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
  FaShieldAlt,
  FaCheckCircle
} from 'react-icons/fa';

// Updated Categories list (backend query values remain mapped/unchanged)
const CATEGORIES = [
  'All',
  'Luxury Villa',
  'Independent House',
  'Apartments',
  'Office Space or Shops',
  'Land'
];

// Helper to format Indian Rupee values dynamically (matches dashboard formatting)
const formatIndianCurrency = (amount, statusType = '') => {
  const numericAmount = Number(amount) || 0;
  if (statusType.toLowerCase().includes('rent')) {
    return `₹${numericAmount.toLocaleString('en-IN')} / mo`;
  }
  if (numericAmount >= 10000000) {
    return `₹${(numericAmount / 10000000).toFixed(2)} Cr`;
  } else if (numericAmount >= 100000) {
    return `₹${(numericAmount / 100000).toFixed(2)} Lakhs`;
  }
  return `₹${numericAmount.toLocaleString('en-IN')}`;
};

const FALLBACK_IMAGE = prop1;

// Format time elapsed
const formatTimeAgo = (createdAt) => {
  if (!createdAt) return 'Recently added';
  const elapsedDays = Math.max(
    0,
    Math.floor((Date.now() - new Date(createdAt).getTime()) / 86400000),
  );
  if (elapsedDays === 0) return 'Today';
  if (elapsedDays < 30) return `${elapsedDays} days ago`;
  return `${Math.floor(elapsedDays / 30)} months ago`;
};

// Normalize backend property objects to match UI expectations
const normalizeProperty = (property) => {
  const getImageUrl = (img) => {
    if (!img) return FALLBACK_IMAGE;
    if (img.startsWith('http://') || img.startsWith('https://')) return img;
    const cleanPath = img.startsWith('/') ? img : `/${img}`;
    return `${BASE_URL}${cleanPath}`;
  };

  const primaryImage = getImageUrl(property.image || (property.images && property.images[0]));
  const additionalImages = property.images && property.images.length > 1 
    ? property.images.map(getImageUrl) 
    : [primaryImage];

  return {
    ...property,
    id: property._id || property.id,
    title: property.name || property.title,
    address: property.location || 'Bhubaneswar, Odisha',
    rawPrice: Number(property.price) || 0,
    isRent: property.statusType?.toLowerCase().includes('rent') ?? false,
    forSale: property.statusType?.toLowerCase().includes('sale') ?? true,
    beds: property.bedrooms || property.beds || 3,
    baths: property.bathrooms || property.baths || 2,
    sqft: property.totalArea || property.sqft || 1500,
    featured: property.featured ?? false,
    verified: property.status === 'Active',
    timeAgo: formatTimeAgo(property.createdAt),
    avatar: primaryImage,
    images: additionalImages,
  };
};

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

  return (
    <article className="HomeFeaturedproperties-card">
      <div className="HomeFeaturedproperties-card-img-wrapper">
        <img
          src={property.images[currentImgIndex]}
          alt={property.title}
          className="HomeFeaturedproperties-card-img"
          loading="lazy"
          width="400"
          height="220"
        />

        <div className="HomeFeaturedproperties-badges">
          {property.featured && (
            <span className="HomeFeaturedproperties-badge-featured">Featured</span>
          )}
          <span className={`HomeFeaturedproperties-badge-type ${property.forSale ? 'sale' : 'rent'}`}>
            {property.status || (property.forSale ? 'For Sale' : 'For Rent')}
          </span>
        </div>

        <button
          type="button"
          className="HomeFeaturedproperties-bookmark-btn"
          onClick={() => setIsBookmarked(!isBookmarked)}
          aria-label={`Bookmark ${property.title}`}
        >
          <FaBookmark className={isBookmarked ? 'filled' : 'outline'} aria-hidden="true" />
        </button>

        <div className="HomeFeaturedproperties-hover-overlay">
          <div className="HomeFeaturedproperties-crosshair-icon" aria-hidden="true">+</div>
          {property.images.length > 1 && (
            <div className="HomeFeaturedproperties-nav-arrows">
              <button type="button" className="HomeFeaturedproperties-arrow-btn" onClick={handlePrevImage}>
                <FaArrowLeft aria-hidden="true" />
              </button>
              <button type="button" className="HomeFeaturedproperties-arrow-btn" onClick={handleNextImage}>
                <FaArrowRight aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="HomeFeaturedproperties-card-content">
        <div className="HomeFeaturedproperties-card-header-row">
          <h2 className="HomeFeaturedproperties-title">{property.title}</h2>
          {property.verified && (
            <span className="HomeFeaturedproperties-verified" title="Verified Listing">
              <FaCheckCircle aria-hidden="true" />
            </span>
          )}
        </div>
        
        <p className="HomeFeaturedproperties-address">
          <FaMapMarkerAlt className="HomeFeaturedproperties-address-icon" aria-hidden="true" />
          {property.address}
        </p>

        <div className="HomeFeaturedproperties-price">
          {formatIndianCurrency(property.rawPrice, property.statusType)}
        </div>

        <div className="HomeFeaturedproperties-specs">
          <span className="HomeFeaturedproperties-spec-item">
            <FaBed aria-hidden="true" /> <strong>{property.beds}</strong> Beds
          </span>
          <span className="HomeFeaturedproperties-spec-item">
            <FaBath aria-hidden="true" /> <strong>{property.baths}</strong> Baths
          </span>
          <span className="HomeFeaturedproperties-spec-item">
            <FaRulerCombined aria-hidden="true" /> <strong>{property.sqft}</strong> sqft
          </span>
        </div>

        <div className="HomeFeaturedproperties-card-footer">
          <button type="button" className="HomeFeaturedproperties-compare-btn">
            <FaPlus className="HomeFeaturedproperties-plus-icon" aria-hidden="true" /> Compare
          </button>
          
          <div className="HomeFeaturedproperties-user-info">
            <span className="HomeFeaturedproperties-time">{property.timeAgo}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

const HomeFeaturedproperties = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 4;

  // Fetch properties dynamically from the backend API using query params
  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        setLoading(true);
        const params = { page: 1, limit: 50 };
        if (activeTab !== 'All') {
          params.category = activeTab;
          params.type = activeTab;
        }

        const response = await API.get('/properties', { params });
        const propertyData = response.data?.properties || response.data || [];
        
        if (Array.isArray(propertyData)) {
          setProperties(propertyData.map(normalizeProperty));
        }
        setLoading(false);
      } catch (error) {
        console.error('FETCH PROPERTIES ERROR:', error);
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, [activeTab]);

  const totalPages = Math.ceil(properties.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProperties = properties.slice(indexOfFirstItem, indexOfLastItem);

  const handleTabChange = (category) => {
    setActiveTab(category);
    setCurrentPage(1);
  };

  return (
    <section className="HomeFeaturedproperties" aria-labelledby="featured-properties-heading">
      <div className="HomeFeaturedproperties-container">
        
        {/* SEO Header Section */}
        <header className="HomeFeaturedproperties-header">
          <span className="HomeFeaturedproperties-badgeTag">
            <FaShieldAlt className="tag-icon" aria-hidden="true" /> Verified Property Listings
          </span>
          <h1 id="featured-properties-heading" className="HomeFeaturedproperties-main-heading">
            Best Property Dealers in Bhubaneswar — <span className="highlight-green">Featured Apartments & Duplex</span>
          </h1>
          <p className="HomeFeaturedproperties-subheading">
            Connect with top-rated real estate consultants and explore RERA-registered Luxury villas / independent House, Apartments and residential plots.
          </p>
        </header>

        {/* Category Tabs */}
        <div className="HomeFeaturedproperties-tabs" role="tablist" aria-label="Property categories">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={activeTab === category}
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
        {loading ? (
          <div className="HomeFeaturedproperties-loading">Loading properties...</div>
        ) : (
          <div className="HomeFeaturedproperties-grid">
            {currentProperties.length > 0 ? (
              currentProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            ) : (
              <p className="HomeFeaturedproperties-empty">No properties available in this category.</p>
            )}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="HomeFeaturedproperties-pagination" role="navigation" aria-label="Properties pagination">
            <button
              type="button"
              className="HomeFeaturedproperties-page-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                className={`HomeFeaturedproperties-page-num ${
                  currentPage === pageNum ? 'active' : ''
                }`}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </button>
            ))}
            <button
              type="button"
              className="HomeFeaturedproperties-page-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeFeaturedproperties;