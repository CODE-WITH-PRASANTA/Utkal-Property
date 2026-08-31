import { useEffect, useState } from 'react';
import './HomeFeaturedproperties.css';
import API, { BASE_URL } from '../../api/axios';

// Local AVIF Image Imports
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

// Categories for Tabs
const CATEGORIES = ['Houses', 'Smart home', 'Apartments', 'Office', 'Villa', 'Bungalow'];

// Helper to format Indian Rupee values dynamically
const formatIndianCurrency = (amount, isRent = false) => {
  if (isRent) {
    return `₹${amount.toLocaleString('en-IN')} / mo`;
  }
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} Lakhs`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
};

// Fallback image using local asset
const FALLBACK_IMAGE = prop1;

// Mock Property Data referencing local AVIF images
const PROPERTIES_DATA = {
  Houses: [
    {
      id: 1,
      title: 'Gorgeous Residential Building',
      address: 'Plot 58, Sailashree Vihar, Bhubaneswar',
      rawPrice: 75000,
      isRent: true,
      beds: 4,
      baths: 2,
      sqft: 1850,
      featured: true,
      forSale: false,
      verified: true,
      timeAgo: '2 days ago',
      avatar: 'https://i.pravatar.cc/150?img=11',
      images: [prop1, prop2, prop3]
    },
    {
      id: 2,
      title: 'Modern Luxury Villa',
      address: 'Patia Square, Bhubaneswar, Odisha',
      rawPrice: 12500000,
      isRent: false,
      beds: 4,
      baths: 3,
      sqft: 2600,
      featured: true,
      forSale: true,
      verified: true,
      timeAgo: '1 week ago',
      avatar: 'https://i.pravatar.cc/150?img=20',
      images: [prop2, prop3, prop4]
    },
    {
      id: 3,
      title: 'Premium Independent Duplex',
      address: 'VIP Road, Puri, Odisha',
      rawPrice: 8500000,
      isRent: false,
      beds: 3,
      baths: 2,
      sqft: 1650,
      featured: false,
      forSale: true,
      verified: true,
      timeAgo: '3 days ago',
      avatar: 'https://i.pravatar.cc/150?img=33',
      images: [prop3, prop4, prop5]
    },
    {
      id: 4,
      title: 'Executive Smart Bungalow',
      address: 'Jaydev Vihar, Bhubaneswar',
      rawPrice: 21000000,
      isRent: false,
      beds: 5,
      baths: 4,
      sqft: 3400,
      featured: true,
      forSale: true,
      verified: true,
      timeAgo: 'Just now',
      avatar: 'https://i.pravatar.cc/150?img=60',
      images: [prop4, prop5, prop6]
    },
    {
      id: 5,
      title: 'Suburban Family Home',
      address: 'Khandagiri, Bhubaneswar',
      rawPrice: 45000,
      isRent: true,
      beds: 3,
      baths: 2,
      sqft: 1350,
      featured: true,
      forSale: false,
      verified: false,
      timeAgo: '5 days ago',
      avatar: 'https://i.pravatar.cc/150?img=12',
      images: [prop5, prop6, prop7]
    },
    {
      id: 6,
      title: 'Classic Heritage Villa',
      address: 'Old Town, Bhubaneswar',
      rawPrice: 18000000,
      isRent: false,
      beds: 4,
      baths: 3,
      sqft: 2900,
      featured: true,
      forSale: true,
      verified: true,
      timeAgo: '2 weeks ago',
      avatar: 'https://i.pravatar.cc/150?img=15',
      images: [prop6, prop7, prop8]
    },
    {
      id: 7,
      title: 'Green View Residency',
      address: 'CDA Sector 9, Cuttack',
      rawPrice: 9500000,
      isRent: false,
      beds: 3,
      baths: 2,
      sqft: 1700,
      featured: true,
      forSale: true,
      verified: true,
      timeAgo: '1 month ago',
      avatar: 'https://i.pravatar.cc/150?img=32',
      images: [prop7, prop8, prop1]
    },
    {
      id: 8,
      title: 'Urban Heights Complex',
      address: 'Saheed Nagar, Bhubaneswar',
      rawPrice: 60000,
      isRent: true,
      beds: 2,
      baths: 2,
      sqft: 1100,
      featured: false,
      forSale: false,
      verified: true,
      timeAgo: '4 days ago',
      avatar: 'https://i.pravatar.cc/150?img=47',
      images: [prop8, prop1, prop2]
    }
  ]
};

// Populate other categories with modified prices/titles
CATEGORIES.slice(1).forEach((cat) => {
  PROPERTIES_DATA[cat] = PROPERTIES_DATA['Houses'].map((item, idx) => ({
    ...item,
    id: `${cat}-${item.id}-${idx}`,
    title: `Utkal ${cat} Spot ${idx + 1}`,
    rawPrice: item.rawPrice + idx * 500000
  }));
});

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

const normalizeProperty = (property) => {
  const image = property.image ? `${BASE_URL}${property.image}` : FALLBACK_IMAGE;

  return {
    ...property,
    id: property._id || property.id,
    title: property.name || property.title,
    address: [property.location, property.city, property.state]
      .filter(Boolean)
      .join(', ') || property.address,
    rawPrice: Number(property.price) || property.rawPrice || 0,
    isRent: property.statusType?.toLowerCase().includes('rent') ?? property.isRent,
    beds: property.bedrooms || property.beds || 0,
    baths: property.bathrooms || property.baths || 0,
    sqft: property.totalArea || property.plotSize || property.sqft || 0,
    featured: property.featured ?? false,
    forSale: property.statusType?.toLowerCase().includes('sale') ?? property.forSale,
    verified: property.publishStatus !== false && property.status === 'Active',
    timeAgo: formatTimeAgo(property.createdAt) || property.timeAgo,
    avatar: image,
    images: [image],
  };
};

const categoryMatches = (property, category) => {
  const value = `${property.type || ''} ${property.category || ''}`.toLowerCase();
  const categoryAliases = {
    Houses: ['house', 'houses', 'independent'],
    'Smart home': ['smart home', 'smart'],
    Apartments: ['apartment', 'apartments'],
    Office: ['office', 'commercial'],
    Villa: ['villa'],
    Bungalow: ['bungalow'],
  };

  return categoryAliases[category]?.some((alias) => value.includes(alias)) ?? false;
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

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <article className="HomeFeaturedproperties-card">
      {/* Image Wrapper */}
      <div className="HomeFeaturedproperties-card-img-wrapper">
        <img
          src={property.images[currentImgIndex]}
          alt={property.title}
          className="HomeFeaturedproperties-card-img"
          loading="lazy"
          decoding="async"
          width="400"
          height="220"
        />

        {/* Badges */}
        <div className="HomeFeaturedproperties-badges">
          {property.featured && (
            <span className="HomeFeaturedproperties-badge-featured">Featured</span>
          )}
          <span className={`HomeFeaturedproperties-badge-type ${property.forSale ? 'sale' : 'rent'}`}>
            {property.forSale ? 'For Sale' : 'For Rent'}
          </span>
        </div>

        {/* Bookmark Ribbon Button */}
        <button
          type="button"
          className="HomeFeaturedproperties-bookmark-btn"
          onClick={toggleBookmark}
          aria-label={`Bookmark ${property.title}`}
        >
          <FaBookmark className={isBookmarked ? 'filled' : 'outline'} aria-hidden="true" />
        </button>

        {/* Hover Overlay */}
        <div className="HomeFeaturedproperties-hover-overlay">
          <div className="HomeFeaturedproperties-crosshair-icon" aria-hidden="true">+</div>
          {property.images.length > 1 && (
            <div className="HomeFeaturedproperties-nav-arrows">
              <button
                type="button"
                className="HomeFeaturedproperties-arrow-btn"
                onClick={handlePrevImage}
                aria-label="Previous property image"
              >
                <FaArrowLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                className="HomeFeaturedproperties-arrow-btn"
                onClick={handleNextImage}
                aria-label="Next property image"
              >
                <FaArrowRight aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="HomeFeaturedproperties-card-content">
        <div className="HomeFeaturedproperties-card-header-row">
          <h2 className="HomeFeaturedproperties-title">{property.title}</h2>
          {property.verified && (
            <span className="HomeFeaturedproperties-verified" title="Verified by Utkal Property" aria-label="Verified listing">
              <FaCheckCircle aria-hidden="true" />
            </span>
          )}
        </div>
        
        <p className="HomeFeaturedproperties-address">
          <FaMapMarkerAlt className="HomeFeaturedproperties-address-icon" aria-hidden="true" />
          {property.address}
        </p>

        {/* Indian Currency Formatting */}
        <div className="HomeFeaturedproperties-price">
          {formatIndianCurrency(property.rawPrice, property.isRent)}
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
          <button type="button" className="HomeFeaturedproperties-compare-btn" aria-label={`Compare ${property.title}`}>
            <FaPlus className="HomeFeaturedproperties-plus-icon" aria-hidden="true" /> Compare
          </button>
          
          <div className="HomeFeaturedproperties-user-info">
            <img
              src={property.avatar}
              alt="Agent Avatar"
              className="HomeFeaturedproperties-avatar"
              loading="lazy"
              width="28"
              height="28"
            />
            <span className="HomeFeaturedproperties-time">{property.timeAgo}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

const HomeFeaturedproperties = () => {
  const [activeTab, setActiveTab] = useState('Houses');
  const [currentPage, setCurrentPage] = useState(1);
  const [properties, setProperties] = useState([]);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const response = await API.get('/properties', {
          params: { page: 1, limit: 1000, featured: true },
        });
        const propertyData = response.data?.properties || [];
        if (Array.isArray(propertyData) && propertyData.length > 0) {
          setProperties(propertyData.map(normalizeProperty));
        }
      } catch (error) {
        console.error('FETCH FEATURED PROPERTIES ERROR:', error);
      }
    };

    fetchFeaturedProperties();
  }, []);

  const activeProperties = properties.length
    ? properties.filter((property) => categoryMatches(property, activeTab))
    : PROPERTIES_DATA[activeTab] || [];
  const totalPages = Math.ceil(activeProperties.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProperties = activeProperties.slice(indexOfFirstItem, indexOfLastItem);

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
            Best Property Dealers in Bhubaneswar — <span className="highlight-green">Featured Flats and Apartments</span>
          </h1>
          <p className="HomeFeaturedproperties-subheading">
            Looking for top-rated real estate consultants? Connect with the <strong>best property dealers in Bhubaneswar</strong> to explore RERA-registered luxury villas, independent duplexes, commercial offices, and verified residential plots across Patia, Jaydev Vihar, Khandagiri, and Cuttack.
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
              aria-label={`View ${category} properties`}
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
          <div className="HomeFeaturedproperties-pagination" role="navigation" aria-label="Properties pagination">
            <button
              type="button"
              className="HomeFeaturedproperties-page-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              aria-label="Previous page"
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
                aria-label={`Go to page ${pageNum}`}
                aria-current={currentPage === pageNum ? 'page' : undefined}
              >
                {pageNum}
              </button>
            ))}
            <button
              type="button"
              className="HomeFeaturedproperties-page-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              aria-label="Next page"
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