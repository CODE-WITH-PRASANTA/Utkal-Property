import React, { useState } from 'react';
import agent1 from '../../assets/agents-2.jpg';
import agent2 from '../../assets/agents-3.jpg';
import bannerImg from '../../assets/mark-contact3.png'; // Adjust path/filename as needed for the banner image
import './OurTeam.css';

const OurTeam = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortOrder, setSortOrder] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Comprehensive list of agents representing Utkal Property - Best Property Consultant in Bhubaneswar
  const agentsData = [
    {
      id: 1,
      name: 'Darlene Robertson',
      role: 'Senior Real Estate Consultant',
      phone: '+91-98615-66735',
      email: 'darlenerobertson@gmail.com',
      image: agent1,
      facebook: '#',
      twitter: '#',
      linkedin: '#'
    },
    {
      id: 2,
      name: 'Rajesh Kumar Mohanty',
      role: 'Property Advisor',
      phone: '+91-98615-66735',
      email: 'rajesh.utkalproperty@gmail.com',
      image: agent2,
      facebook: '#',
      twitter: '#',
      linkedin: '#'
    },
    {
      id: 3,
      name: 'Priyanka Das',
      role: 'Residential Specialist',
      phone: '+91-98615-66735',
      email: 'priyanka.das@gmail.com',
      image: agent1,
      facebook: '#',
      twitter: '#',
      linkedin: '#'
    },
    {
      id: 4,
      name: 'Santosh Kumar Jena',
      role: 'Commercial Consultant',
      phone: '+91-98615-66735',
      email: 'santosh.jena@gmail.com',
      image: agent2,
      facebook: '#',
      twitter: '#',
      linkedin: '#'
    },
    {
      id: 5,
      name: 'Ananya Mishra',
      role: 'Luxury Villa Expert',
      phone: '+91-98615-66735',
      email: 'ananya.mishra@gmail.com',
      image: agent1,
      facebook: '#',
      twitter: '#',
      linkedin: '#'
    },
    {
      id: 6,
      name: 'Debasis Swain',
      role: 'Plot & Land Specialist',
      phone: '+91-98615-66735',
      email: 'debasis.swain@gmail.com',
      image: agent2,
      facebook: '#',
      twitter: '#',
      linkedin: '#'
    },
    {
      id: 7,
      name: 'Siddharth Patel',
      role: 'Apartment Leasing Executive',
      phone: '+91-98615-66735',
      email: 'siddharth.patel@gmail.com',
      image: agent1,
      facebook: '#',
      twitter: '#',
      linkedin: '#'
    },
    {
      id: 8,
      name: 'Monika Sahoo',
      role: 'Client Relation Manager',
      phone: '+91-98615-66735',
      email: 'monika.sahoo@gmail.com',
      image: agent2,
      facebook: '#',
      twitter: '#',
      linkedin: '#'
    },
    {
      id: 9,
      name: 'Subrat Kumar Behera',
      role: 'Investment Advisor',
      phone: '+91-98615-66735',
      email: 'subrat.behera@gmail.com',
      image: agent1,
      facebook: '#',
      twitter: '#',
      linkedin: '#'
    },
    {
      id: 10,
      name: 'Swati Rout',
      role: 'Property Coordinator',
      phone: '+91-98615-66735',
      email: 'swati.rout@gmail.com',
      image: agent2,
      facebook: '#',
      twitter: '#',
      linkedin: '#'
    }
  ];

  // Filter agents based on search
  const filteredAgents = agentsData.filter((agent) =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort agents based on dropdown value
  const sortedAgents = [...filteredAgents].sort((a, b) => {
    if (sortOrder === 'name-asc') return a.name.localeCompare(b.name);
    if (sortOrder === 'name-desc') return b.name.localeCompare(a.name);
    return 0; 
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
          <h1 id="agents-heading" className="utkal-agents-main-title">Our Agents</h1>
          <p className="utkal-agents-subtitle">
            Meet the expert team at <strong>Utkal Property</strong> — the best property consultant in Bhubaneswar.
          </p>
        </div>

        <div className="utkal-agents-controls">
          {/* Search Bar */}
          <div className="utkal-agents-search-box">
            <span className="utkal-search-icon" aria-hidden="true">🔍</span>
            <input 
              type="text" 
              placeholder="Search agent's name..." 
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
                <path d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z"/>
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
                <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"/>
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
              <option value="default">Default order</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </div>
      </div>

      {/* Agents Card Container */}
      {currentAgents.length > 0 ? (
        <div className={`utkal-agents-grid ${viewMode === 'list' ? 'list-view-mode' : ''}`}>
          {currentAgents.map((agent) => (
            <article key={agent.id} className="utkal-agent-card">
              <div className="utkal-agent-img-container">
                <img 
                  src={agent.image} 
                  alt={`${agent.name} - ${agent.role} at Utkal Property Bhubaneswar`} 
                  className="utkal-agent-img"
                />
              </div>

              <div className="utkal-agent-content">
                <div className="utkal-agent-info-group">
                  <h2 className="utkal-agent-name">{agent.name}</h2>
                  <p className="utkal-agent-role">{agent.role}</p>
                </div>

                <div className="utkal-agent-contact-details">
                  <a href={`tel:${agent.phone}`} className="utkal-agent-contact-row">
                    <span className="utkal-contact-icon" aria-hidden="true">📞</span>
                    <span>{agent.phone}</span>
                  </a>
                  <a href={`mailto:${agent.email}`} className="utkal-agent-contact-row">
                    <span className="utkal-contact-icon" aria-hidden="true">✉️</span>
                    <span className="utkal-email-text">{agent.email}</span>
                  </a>
                </div>

                <div className="utkal-agent-socials">
                  <a href={agent.facebook} aria-label={`${agent.name} Facebook Profile`} className="utkal-social-link">f</a>
                  <a href={agent.twitter} aria-label={`${agent.name} Twitter Profile`} className="utkal-social-link">t</a>
                  <a href={agent.linkedin} aria-label={`${agent.name} LinkedIn Profile`} className="utkal-social-link">in</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="utkal-agents-no-results">
          <p>No agents found matching your search. Please try another name or browse all agents.</p>
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
          <h2 className="utkal-promo-title">Find your dream home & boost your investment opportunities</h2>
          <p className="utkal-promo-desc">
            Buying your first home can be fun and exciting, but it requires careful research. With Utkal Property, the best property consultant in Bhubaneswar, you can easily find your dream home without reaching out to multiple brokers—all at the best market prices.
          </p>
          <a href="tel:+919861566735" className="utkal-contact-seller-btn">
            <span aria-hidden="true">📞</span> Contact Seller
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