import React, { useState, useEffect } from 'react';
import bannerImg from '../../assets/mark-contact3.png'; // Adjust path/filename as needed for banner
import './OurTeam.css';
import API, { IMG_URL } from '../../api/axios'; // Adjust relative import path if needed

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
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortOrder, setSortOrder] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [brokenImages, setBrokenImages] = useState({});
  const itemsPerPage = 9;

  /**
   * Universal Image URL Resolver
   * Resolves absolute backend server paths for static WebP files (/uploads/team/filename.webp)
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

  // Fetch Team Members from API
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

      // Filter only Active members for the public website view
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

  // Track broken image URLs gracefully
  const handleImageError = (id) => {
    setBrokenImages((prev) => ({ ...prev, [id]: true }));
  };

  // Filter agents based on search (Name or Designation/Role)
  const filteredAgents = agents.filter((agent) => {
    const name = agent.fullName || agent.name || '';
    const role = agent.designation || agent.role || '';
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Sort agents based on dropdown selection
  const sortedAgents = [...filteredAgents].sort((a, b) => {
    const nameA = a.fullName || a.name || '';
    const nameB = b.fullName || b.name || '';

    if (sortOrder === 'name-asc') return nameA.localeCompare(nameB);
    if (sortOrder === 'name-desc') return nameB.localeCompare(nameA);
    
    // Default: Sort by display order first
    return (a.displayOrder || 1) - (b.displayOrder || 1);
  });

  // Pagination Logic
  const totalPages = Math.ceil(sortedAgents.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAgents = sortedAgents.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="utkal-agents-section" aria-labelledby="agents-heading">
      {/* Header & Controls Bar */}
      <div className="utkal-agents-header-container">
        <div className="utkal-agents-title-wrap">
          <span className="utkal-agents-tag">Expert Consultants</span>
          <h1 id="agents-heading" className="utkal-agents-main-title">
            Our Agents
          </h1>
          <p className="utkal-agents-subtitle">
            Meet the expert team at <strong>Utkal Property</strong> — the best property consultant in Bhubaneswar.
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
              placeholder="Search agent's name or role..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="utkal-agents-search-input"
              aria-label="Search agent's name"
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
              aria-label="Default order"
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
          <p>Loading property consultants...</p>
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
              <article key={agentId} className="utkal-agent-card">
                <div className="utkal-agent-img-container">
                  {!isBroken ? (
                    <img
                      src={photoUrl}
                      alt={`${name} - ${role} at Utkal Property Bhubaneswar`}
                      className="utkal-agent-img"
                      onError={() => handleImageError(agentId)}
                    />
                  ) : (
                    <div className="utkal-agent-placeholder" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: '#f5f5f5', fontSize: '48px', color: '#ccc' }}>
                      <FaUserCircle />
                    </div>
                  )}
                </div>

                <div className="utkal-agent-content">
                  <div className="utkal-agent-info-group">
                    <h2 className="utkal-agent-name">{name}</h2>
                    <p className="utkal-agent-role">{role}</p>
                  </div>

                  <div className="utkal-agent-contact-details">
                    {agent.phone && (
                      <a href={`tel:${agent.phone}`} className="utkal-agent-contact-row">
                        <span className="utkal-contact-icon" aria-hidden="true"><FaPhoneAlt /></span>
                        <span>{agent.phone}</span>
                      </a>
                    )}
                    {agent.email && (
                      <a href={`mailto:${agent.email}`} className="utkal-agent-contact-row">
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
          <p>No active agents found matching your criteria. Please try another search or check back later.</p>
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
      <section className="utkal-promo-banner" aria-label="Investment Opportunities">
        <div className="utkal-promo-content">
          <h2 className="utkal-promo-title">
            Find your dream home & boost your investment opportunities
          </h2>
          <p className="utkal-promo-desc">
            Buying your first home can be fun and exciting, but it requires careful research. With Utkal Property, the best property consultant in Bhubaneswar, you can easily find your dream home without reaching out to multiple brokers—all at the best market prices.
          </p>
          <a href="tel:+919861566735" className="utkal-contact-seller-btn">
            <span aria-hidden="true"><FaPhoneAlt /></span> Contact Seller
          </a>
        </div>
        <div className="utkal-promo-image-container">
          <img
            src={bannerImg}
            alt="Utkal Property Consultant in Bhubaneswar helping client find dream home"
            className="utkal-promo-img"
          />
        </div>
      </section>

      {/* SEO Footer Description */}
      <footer className="utkal-team-seo-footer">
        <div className="utkal-seo-content">
          <h3>Utkal Property (Best Property Consultant in Bhubaneswar)</h3>
          <p>
            "Buying your first home can be fun and exciting but requires lots of research and visits to various brokers to find a perfect home for you and your family. With Utkal Property, now you can find the place of your dreams easily without reaching out to different brokers at the best possible market price. We have a complete list of houses, apartments, and bungalows on sale in various parts of Odisha."
          </p>
          <p className="utkal-seo-address">
            <strong>Office Address:</strong> Plot No-55, Ln 2, Jagannath Vihar, Baramunda, Bhubaneswar, Odisha 751003 | <strong>Phone:</strong> 098615 66735
          </p>
        </div>
      </footer>
    </section>
  );
};

export default OurTeam;