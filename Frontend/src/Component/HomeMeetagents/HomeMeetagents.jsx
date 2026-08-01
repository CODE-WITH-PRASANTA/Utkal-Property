import React, { useState, useEffect } from 'react';
import './HomeMeetagents.css';
import API, { IMG_URL } from '../../api/axios'; // Adjust relative import path if needed

// React Icons
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaUserCircle
} from 'react-icons/fa';

const HomeMeetagents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [brokenImages, setBrokenImages] = useState({});

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

  // Fetch Team Members from Backend API
  const fetchAgents = async () => {
    try {
      setLoading(true);
      const response = await API.get('/team');
      let data = [];

      if (response.data && response.data.data) {
        data = response.data.data;
      } else if (Array.isArray(response.data)) {
        data = response.data;
      }

      // Filter to display active members sorted by displayOrder
      const activeAgents = data
        .filter((member) => member.status === 'Active')
        .sort((a, b) => (a.displayOrder || 1) - (b.displayOrder || 1));

      setAgents(activeAgents);
    } catch (error) {
      console.error('Error fetching team agents:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  // Track broken images
  const handleImageError = (id) => {
    setBrokenImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="HomeMeetagents">
      <div className="HomeMeetagents-container">
        {/* Section Header */}
        <div className="HomeMeetagents-header">
          <span className="HomeMeetagents-tag">Expert Team</span>
          <h1 className="HomeMeetagents-main-heading">Meet Our Agents</h1>
          <p className="HomeMeetagents-subheading">
            Our experienced team at Utkal Property is ready to guide you to your ideal real estate investment
          </p>
        </div>

        {/* Agents Grid */}
        <div className="HomeMeetagents-grid">
          {loading ? (
            <div className="HomeMeetagents-loading">
              <p>Loading expert team members...</p>
            </div>
          ) : agents.length > 0 ? (
            agents.map((agent) => {
              const agentId = agent._id || agent.id;
              const photoUrl = getImageUrl(agent.photo);
              const isBroken = brokenImages[agentId];

              return (
                <div key={agentId} className="HomeMeetagents-card">
                  {/* Image Box with Hover Overlay Bar */}
                  <div className="HomeMeetagents-img-wrapper">
                    {!isBroken ? (
                      <img
                        src={photoUrl}
                        alt={agent.fullName}
                        className="HomeMeetagents-img"
                        onError={() => handleImageError(agentId)}
                      />
                    ) : (
                      <div className="HomeMeetagents-broken-placeholder">
                        <FaUserCircle />
                      </div>
                    )}

                    {/* Utkal Green Vertical Social Bar */}
                    <div className="HomeMeetagents-social-sidebar">
                      {agent.facebook && (
                        <a
                          href={agent.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="HomeMeetagents-social-icon"
                          aria-label="Facebook"
                        >
                          <FaFacebookF />
                        </a>
                      )}
                      {agent.twitter && (
                        <a
                          href={agent.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="HomeMeetagents-social-icon"
                          aria-label="Twitter"
                        >
                          <FaTwitter />
                        </a>
                      )}
                      {agent.linkedin && (
                        <a
                          href={agent.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="HomeMeetagents-social-icon"
                          aria-label="LinkedIn"
                        >
                          <FaLinkedinIn />
                        </a>
                      )}
                      {agent.instagram && (
                        <a
                          href={agent.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="HomeMeetagents-social-icon"
                          aria-label="Instagram"
                        >
                          <FaInstagram />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Agent Details & Action Buttons */}
                  <div className="HomeMeetagents-card-body">
                    <div className="HomeMeetagents-info">
                      <h3 className="HomeMeetagents-name">{agent.fullName}</h3>
                      <p className="HomeMeetagents-role">{agent.designation}</p>
                    </div>

                    <div className="HomeMeetagents-actions">
                      {agent.phone && (
                        <a
                          href={`tel:${agent.phone}`}
                          className="HomeMeetagents-action-btn"
                          title={`Call ${agent.fullName}`}
                          aria-label="Call Agent"
                        >
                          <FaPhoneAlt />
                        </a>
                      )}
                      {agent.email && (
                        <a
                          href={`mailto:${agent.email}`}
                          className="HomeMeetagents-action-btn"
                          title={`Email ${agent.fullName}`}
                          aria-label="Email Agent"
                        >
                          <FaEnvelope />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="HomeMeetagents-empty">
              <p>No active agents found. Add team members from the admin panel!</p>
            </div>
          )}
        </div>

        {/* Footer Callout Link */}
        <div className="HomeMeetagents-footer-text">
          Become an agent and get the commission you deserve.{' '}
          <a href="#contact" className="HomeMeetagents-contact-link">
            Contact us
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomeMeetagents;