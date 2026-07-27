import React, { useState } from 'react';
import './GridPropertyListing.css';

// React Icons
import {
  BsGrid3X3GapFill,
  BsListUl,
  BsChevronDown,
  BsPlusLg,
  BsChevronLeft,
  BsChevronRight,
  BsBookmarkFill,
  BsPlus
} from 'react-icons/bs';
import { BiBed, BiBath, BiArea } from 'react-icons/bi';
import { HiOutlineMapPin } from 'react-icons/hi2';

// 24 Unique Property Listings with Distinct Image Sets
const PROPERTY_DATABASE = [
  {
    id: 1,
    title: 'Modern White Villa',
    address: '58 Hullbrook Road, Billesley, B13 0LA',
    price: '$7,500',
    beds: 4,
    baths: 2,
    sqft: 1150,
    timeAgo: '3 years ago',
    isFeatured: true,
    isForSale: true,
    agentAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  },
  {
    id: 2,
    title: 'Suburban Stone House',
    address: '24 Green Avenue, Oxford, OX1 2JD',
    price: '$8,200',
    beds: 5,
    baths: 3,
    sqft: 1420,
    timeAgo: '2 years ago',
    isFeatured: true,
    isForSale: true,
    agentAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    images: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  },
  {
    id: 3,
    title: 'Minimalist Cubical Home',
    address: '102 Sunset Boulevard, Bristol, BS1 5TY',
    price: '$6,800',
    beds: 3,
    baths: 2,
    sqft: 980,
    timeAgo: '1 year ago',
    isFeatured: true,
    isForSale: true,
    agentAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    images: [
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  },
  {
    id: 4,
    title: 'Tropical Coastal Estate',
    address: '15 Ocean View Road, Brighton, BN1 3PA',
    price: '$9,400',
    beds: 4,
    baths: 3,
    sqft: 1600,
    timeAgo: '5 months ago',
    isFeatured: true,
    isForSale: true,
    agentAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    images: [
      'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  },
  {
    id: 5,
    title: 'Luxury Villa with Pool',
    address: '88 Palm Street, Miami, FL 33101',
    price: '$12,500',
    beds: 6,
    baths: 4,
    sqft: 2200,
    timeAgo: '3 weeks ago',
    isFeatured: true,
    isForSale: true,
    agentAvatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
    images: [
      'https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2459/stairs-design-interior-renovation.jpg?auto=compress&cs=tinysrgb&w=800'
    ]
  },
  {
    id: 6,
    title: 'Contemporary Glass House',
    address: '42 Pine Drive, Seattle, WA 98101',
    price: '$8,900',
    beds: 4,
    baths: 3,
    sqft: 1350,
    timeAgo: '2 months ago',
    isFeatured: true,
    isForSale: true,
    agentAvatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  },
  {
    id: 7,
    title: 'Elegance Resort Residence',
    address: '77 Lakeview Way, Austin, TX 78701',
    price: '$11,000',
    beds: 5,
    baths: 4,
    sqft: 1850,
    timeAgo: '4 months ago',
    isFeatured: true,
    isForSale: true,
    agentAvatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150',
    images: [
      'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  },
  {
    id: 8,
    title: 'Urban Penthouse Living',
    address: '304 High Street, London, EC1A 1BB',
    price: '$9,800',
    beds: 3,
    baths: 2,
    sqft: 1200,
    timeAgo: '1 week ago',
    isFeatured: true,
    isForSale: true,
    agentAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    images: [
      'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  },
  // Additional Page 2 & 3 Items
  ...Array.from({ length: 16 }).map((_, index) => ({
    id: index + 9,
    title: `Exclusive Residence #${index + 9}`,
    address: `${10 + index} Grand Avenue, City Center, UK`,
    price: `$${6500 + index * 300}`,
    beds: (index % 3) + 2,
    baths: (index % 2) + 1,
    sqft: 900 + index * 50,
    timeAgo: `${index + 1} months ago`,
    isFeatured: true,
    isForSale: true,
    agentAvatar: `https://i.pravatar.cc/150?img=${(index % 12) + 1}`,
    images: [
      `https://images.pexels.com/photos/${106399 + (index % 5)}/pexels-photo-${106399 + (index % 5)}.jpeg?auto=compress&cs=tinysrgb&w=800`,
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  }))
];

const ITEMS_PER_PAGE = 8; // Exactly 8 items per page (4 items in 2 rows)

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
    <div className="GridPropertyListing-card">
      
      {/* Image Container with Hover Controls */}
      <div className="GridPropertyListing-image-container">
        <img
          src={property.images[currentImgIndex]}
          alt={property.title}
          className="GridPropertyListing-card-img"
        />

        {/* Badges */}
        <div className="GridPropertyListing-badges">
          {property.isFeatured && (
            <span className="GridPropertyListing-badge-featured">Featured</span>
          )}
          {property.isForSale && (
            <span className="GridPropertyListing-badge-sale">For Sale</span>
          )}
        </div>

        {/* Ribbon Bookmark Button */}
        <button
          className={`GridPropertyListing-bookmark-btn ${
            isBookmarked ? 'active' : ''
          }`}
          onClick={() => setIsBookmarked(!isBookmarked)}
        >
          <BsBookmarkFill />
        </button>

        {/* Hover Controls (3rd Reference Image) */}
        <div className="GridPropertyListing-overlay">
          <button className="GridPropertyListing-plus-icon-btn">
            <BsPlusLg />
          </button>

          <div className="GridPropertyListing-slider-arrows">
            <button
              className="GridPropertyListing-arrow-btn"
              onClick={handlePrevImage}
            >
              <BsChevronLeft />
            </button>
            <button
              className="GridPropertyListing-arrow-btn"
              onClick={handleNextImage}
            >
              <BsChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="GridPropertyListing-card-content">
        <h3 className="GridPropertyListing-card-title">{property.title}</h3>

        <div className="GridPropertyListing-card-address">
          <HiOutlineMapPin className="GridPropertyListing-location-icon" />
          <span>{property.address}</span>
        </div>

        <div className="GridPropertyListing-card-price">{property.price}</div>

        <div className="GridPropertyListing-card-specs">
          <span className="GridPropertyListing-spec-item">
            <BiBed className="GridPropertyListing-spec-icon" />
            Beds: <strong>{property.beds}</strong>
          </span>
          <span className="GridPropertyListing-spec-item">
            <BiBath className="GridPropertyListing-spec-icon" />
            Baths: <strong>{property.baths}</strong>
          </span>
          <span className="GridPropertyListing-spec-item">
            <BiArea className="GridPropertyListing-spec-icon" />
            Sqft: <strong>{property.sqft}</strong>
          </span>
        </div>

        <div className="GridPropertyListing-card-footer">
          <button className="GridPropertyListing-compare-btn">
            <BsPlus className="GridPropertyListing-compare-icon" />
            Compare
          </button>

          <div className="GridPropertyListing-agent-info">
            <img
              src={property.agentAvatar}
              alt="Agent Avatar"
              className="GridPropertyListing-agent-avatar"
            />
            <span className="GridPropertyListing-time-posted">
              {property.timeAgo}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

const GridPropertyListing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [sortOrder, setSortOrder] = useState('Default order');

  const totalPages = Math.ceil(PROPERTY_DATABASE.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProperties = PROPERTY_DATABASE.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="GridPropertyListing">
      <div className="GridPropertyListing-container">
        
        {/* Top Header Controls */}
        <div className="GridPropertyListing-header">
          <div className="GridPropertyListing-header-left">
            <h2 className="GridPropertyListing-main-title">Property Listing</h2>
            <span className="GridPropertyListing-count-text">
              There are currently 164,814 properties.
            </span>
          </div>

          <div className="GridPropertyListing-header-right">
            <div className="GridPropertyListing-view-toggle">
              <button
                className={`GridPropertyListing-toggle-btn ${
                  viewMode === 'grid' ? 'active' : ''
                }`}
                onClick={() => setViewMode('grid')}
              >
                <BsGrid3X3GapFill />
              </button>
              <button
                className={`GridPropertyListing-toggle-btn ${
                  viewMode === 'list' ? 'active' : ''
                }`}
                onClick={() => setViewMode('list')}
              >
                <BsListUl />
              </button>
            </div>

            <div className="GridPropertyListing-sort-box">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="GridPropertyListing-sort-select"
              >
                <option value="Default order">Default order</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
                <option value="Newest First">Newest First</option>
              </select>
              <BsChevronDown className="GridPropertyListing-sort-icon" />
            </div>
          </div>
        </div>

        {/* Grid (4 Cards Per Row on Desktop) */}
        <div className={`GridPropertyListing-grid ${viewMode}`}>
          {currentProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* 8-Item Pagination Bar */}
        <div className="GridPropertyListing-pagination">
          <button
            className="GridPropertyListing-page-nav"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <BsChevronLeft />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`GridPropertyListing-page-btn ${
                currentPage === page ? 'active' : ''
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="GridPropertyListing-page-nav"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <BsChevronRight />
          </button>
        </div>

      </div>
    </section>
  );
};

export default GridPropertyListing;