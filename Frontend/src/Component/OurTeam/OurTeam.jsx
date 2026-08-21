import React, { useState, useEffect } from 'react';
import bannerImg from '../../assets/mark-contact3.png';
import './OurTeam.css';
import API, { IMG_URL } from '../../api/axios';

// React Icons
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaUserCircle
} from 'react-icons/fa';

const OurTeam = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortOrder, setSortOrder] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [brokenImages, setBrokenImages] = useState({});
  const itemsPerPage = 9;

  const getImageUrl = (photoPath) => {
    if (!photoPath) return '';

    if (
      photoPath.startsWith('http://') ||
      photoPath.startsWith('https://') ||
      photoPath.startsWith('blob:')
    ) {
      return photoPath;
    }

    let clean = photoPath.replace(/\\/g, '/');
    const uploadsIndex = clean.indexOf('uploads/');
    if (uploadsIndex !== -1) {
      clean = '/' + clean.substring(uploadsIndex);
    } else {
      clean = clean.startsWith('/') ? clean : `/${clean}`;
    }

    const baseUrl = (IMG_URL || 'http://localhost:5000').replace(/\/+$/, '');
    return `${baseUrl}${clean}`;
  };

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await API.get('/team');
      let data = [];

      if (response.data && response.data.data) {
        data = response.data.data;
      } else if (Array.isArray(response.data)) {
        data = response.data;
      }

      const activeMembers = data.filter(
        (member) => member.status === 'Active'
      );
      setAgents(activeMembers);
    } catch (error) {
      console.error('Error fetching team agents:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const handleImageError = (id) => {
    setBrokenImages((prev) => ({ ...prev, [id]: true }));
  };

  const filteredAgents = agents.filter((agent) => {
    const name = agent.fullName || agent.name || '';
    const role = agent.designation || agent.role || '';
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const sortedAgents = [...filteredAgents].sort((a, b) => {
    const nameA = a.fullName || a.name || '';
    const nameB = b.fullName || b.name || '';

    if (sortOrder === 'name-asc') return nameA.localeCompare(nameB);
    if (sortOrder === 'name-desc') return nameB.localeCompare(nameA);
    
    return (a.displayOrder || 1) - (b.displayOrder || 1);
  });

  const totalPages = Math.ceil(sortedAgents.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAgents = sortedAgents.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section 
      className="utkal-agents-section" 
      aria-labelledby="agents-heading"
      itemScope 
      itemType="https://schema.org/RealEstateAgent"
    >
      {/* Header & Controls Bar */}
      <div className="utkal-agents-header-container">
        <div className="utkal-agents-title-wrap">
          <span className="utkal-agents-tag">Trusted Property Advisors</span>
          <h1 id="agents-heading" className="utkal-agents-main-title">
            Our Property Advisors &amp; Real Estate Agents
          </h1>
          <p className="utkal-agents-subtitle">
            Connect with dedicated property specialists at <strong>Utkal Property</strong> — recognized as the <strong>best real estate agency in Bhubaneswar</strong> and the leading <strong>Best Property Consultant in Bhubaneswar</strong> for residential and commercial investments.
          </p>
        </div>

        <div className="utkal-agents-controls">
          {/* Search Bar */}
          <div className="utkal-agents-search-box">
            <span className="utkal-search-icon" aria-hidden="true">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search agent by name or specialty..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="utkal-agents-search-input"
              aria-label="Search real estate agent"
            />
          </div>

          {/* View Mode Switcher */}
          <div className="utkal-agents-view-toggle">
            <button
              type="button"
              className={`utkal-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
              aria-label="Switch to Grid View"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z" />
              </svg>
            </button>
            <button
              type="button"
              className={`utkal-view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List View"
              aria-label="Switch to List View"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
              </svg>
            </button>
          </div>

          {/* Sort Order Selector */}
          <div className="utkal-agents-sort-wrapper">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="utkal-agents-sort-select"
              aria-label="Sort agents order"
            >
              <option value="default">Default Order</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </div>
      </div>

      {/* Agents Card Container */}
      {loading ? (
        <div className="utkal-agents-loading" style={{ textAlign: 'center', padding: '40px' }}>
          <p>Loading real estate consultants...</p>
        </div>
      ) : currentAgents.length > 0 ? (
        <div className={`utkal-agents-grid ${viewMode === 'list' ? 'list-view-mode' : ''}`}>
          {currentAgents.map((agent) => {
            const agentId = agent._id || agent.id;
            const photoUrl = getImageUrl(agent.photo || agent.image);
            const isBroken = brokenImages[agentId];
            const name = agent.fullName || agent.name;
            const role = agent.designation || agent.role;

            return (
              <article 
                key={agentId} 
                className="utkal-agent-card" 
                itemScope 
                itemType="https://schema.org/Person"
              >
                <div className="utkal-agent-img-container">
                  {!isBroken ? (
                    <img
                      src={photoUrl}
                      alt={`${name} - Property Consultant at Utkal Property, Best Real Estate Agency in Bhubaneswar`}
                      className="utkal-agent-img"
                      itemProp="image"
                      loading="lazy"
                      onError={() => handleImageError(agentId)}
                    />
                  ) : (
                    <div 
                      className="utkal-agent-placeholder" 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        height: '100%', 
                        background: '#f5f5f5', 
                        fontSize: '48px', 
                        color: '#ccc' 
                      }}
                    >
                      <FaUserCircle />
                    </div>
                  )}
                </div>

                <div className="utkal-agent-content">
                  <div className="utkal-agent-info-group">
                    <h2 className="utkal-agent-name" itemProp="name">{name}</h2>
                    <p className="utkal-agent-role" itemProp="jobTitle">{role}</p>
                  </div>

                  <div className="utkal-agent-contact-details">
                    {agent.phone && (
                      <a href={`tel:${agent.phone}`} className="utkal-agent-contact-row" itemProp="telephone">
                        <span className="utkal-contact-icon" aria-hidden="true"><FaPhoneAlt /></span>
                        <span>{agent.phone}</span>
                      </a>
                    )}
                    {agent.email && (
                      <a href={`mailto:${agent.email}`} className="utkal-agent-contact-row" itemProp="email">
                        <span className="utkal-contact-icon" aria-hidden="true"><FaEnvelope /></span>
                        <span className="utkal-email-text">{agent.email}</span>
                      </a>
                    )}
                  </div>

                  <div className="utkal-agent-socials">
                    {agent.facebook && (
                      <a href={agent.facebook} target="_blank" rel="noopener noreferrer" aria-label={`${name} Facebook Profile`} className="utkal-social-link">
                        <FaFacebookF />
                      </a>
                    )}
                    {agent.twitter && (
                      <a href={agent.twitter} target="_blank" rel="noopener noreferrer" aria-label={`${name} Twitter Profile`} className="utkal-social-link">
                        <FaTwitter />
                      </a>
                    )}
                    {agent.linkedin && (
                      <a href={agent.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${name} LinkedIn Profile`} className="utkal-social-link">
                        <FaLinkedinIn />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="utkal-agents-no-results">
          <p>No active property consultants found matching your criteria. Please try another search or contact our office directly.</p>
        </div>
      )}

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <nav className="utkal-agents-pagination" aria-label="Agents Pagination">
          <button
            type="button"
            className="utkal-page-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const pageNum = index + 1;
            return (
              <button
                key={pageNum}
                type="button"
                className={`utkal-page-num ${currentPage === pageNum ? 'active' : ''}`}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            type="button"
            className="utkal-page-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </nav>
      )}

      {/* Banner Section */}
      <section className="utkal-promo-banner" aria-label="Real Estate Investment & Advisory Services">
        <div className="utkal-promo-content">
          <h2 className="utkal-promo-title">
            Find Your Dream Home &amp; Maximize Investment Value in Bhubaneswar
          </h2>
          <p className="utkal-promo-desc">
            Navigating property options should be seamless and rewarding. As the <strong>best real estate agency in Bhubaneswar</strong>, <strong>Utkal Property (Best Property Consultant in Bhubaneswar)</strong> eliminates broker hassles by connecting you directly with verified luxury flats, residential plots, and modern duplexes at transparent market pricing.
          </p>
          <a href="tel:+919861566735" className="utkal-contact-seller-btn">
            <span aria-hidden="true"><FaPhoneAlt /></span> Call +91 98615 66735
          </a>
        </div>
        <div className="utkal-promo-image-container">
          <img
            src={bannerImg}
            alt="Utkal Property - Best Real Estate Agency and Property Consultant in Bhubaneswar"
            className="utkal-promo-img"
            loading="lazy"
          />
        </div>
      </section>

      {/* SEO Footer Description with Schema Microdata */}
      <footer className="utkal-team-seo-footer">
        <div className="utkal-seo-content">
          <h3 itemProp="name">Utkal Property (Best Property Consultant in Bhubaneswar)</h3>
          <p itemProp="description">
            Buying your first home or expanding your commercial portfolio requires verified listings, clear titles, and strategic local insights. As the premier <strong>best real estate agency in Bhubaneswar</strong>, <strong>Utkal Property</strong> offers a comprehensive inventory of BDA-approved residential plots, luxury duplexes, and affordable 2 &amp; 3 BHK apartments across Baramunda, Patia, Khandagiri, and Sundarpada.
          </p>
          <address 
            className="utkal-seo-address" 
            itemProp="address" 
            itemScope 
            itemType="https://schema.org/PostalAddress"
          >
            <strong>Office Address:</strong>{' '}
            <span itemProp="streetAddress">Plot No-55, Ln 2, Jagannath Vihar, Baramunda</span>,{' '}
            <span itemProp="addressLocality">Bhubaneswar</span>,{' '}
            <span itemProp="addressRegion">Odisha</span>{' '}
            <span itemProp="postalCode">751003</span> |{' '}
            <strong>Phone:</strong>{' '}
            <a href="tel:+919861566735" itemProp="telephone">+91 9861566735</a>
          </address>
        </div>
      </footer>
    </section>
  );
};

export default OurTeam;