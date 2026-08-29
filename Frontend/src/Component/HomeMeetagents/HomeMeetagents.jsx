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
  FaUserCircle,
  FaUserTie
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
    <section className="HomeMeetagents" aria-labelledby="consultants-team-heading">
      <div className="HomeMeetagents-container">
        
        {/* SEO Header Section */}
        <header className="HomeMeetagents-header">
          <span className="HomeMeetagents-tag">
            <FaUserTie className="HomeMeetagents-tag-icon" /> Verified Property Specialists
          </span>
          <h1 id="consultants-team-heading" className="HomeMeetagents-main-heading">
            Best Property Consultant in Bhubaneswar — <span className="highlight-green">Meet Our Best Apartment Consultants</span>
          </h1>
          <p className="HomeMeetagents-subheading">
            Get personalized real estate advisory from the <strong>best property consultant in Bhubaneswar</strong>. Consult our verified luxury flat and plot specialists for market valuations, RERA legal checks, home loan assistance, and smooth property registrations across Patia, Jaydev Vihar, Nayapalli, and Khandagiri.
          </p>
        </header>

        {/* Agents Grid */}
        <div className="HomeMeetagents-grid">
          {loading ? (
            <div className="HomeMeetagents-loading">
              <p>Loading real estate consultants...</p>
            </div>
          ) : agents.length > 0 ? (
            agents.map((agent) => {
              const agentId = agent._id || agent.id;
              const photoUrl = getImageUrl(agent.photo);
              const isBroken = brokenImages[agentId];

              return (
                <article key={agentId} className="HomeMeetagents-card">
                  {/* Image Box with Hover Overlay Bar */}
                  <div className="HomeMeetagents-img-wrapper">
                    {!isBroken ? (
                      <img
                        src={photoUrl}
                        alt={`${agent.fullName} - Property Consultant in Bhubaneswar`}
                        className="HomeMeetagents-img"
                        loading="lazy"
                        onError={() => handleImageError(agentId)}
                      />
                    ) : (
                      <div className="HomeMeetagents-broken-placeholder">
                        <FaUserCircle />
                      </div>
                    )}

                    {/* Vertical Social Bar */}
                    <div className="HomeMeetagents-social-sidebar">
                      {agent.facebook && (
                        <a
                          href={agent.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="HomeMeetagents-social-icon"
                          aria-label={`Visit ${agent.fullName}'s Facebook profile`}
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
                          aria-label={`Visit ${agent.fullName}'s Twitter profile`}
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
                          aria-label={`Visit ${agent.fullName}'s LinkedIn profile`}
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
                          aria-label={`Visit ${agent.fullName}'s Instagram profile`}
                        >
                          <FaInstagram />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Agent Details & Action Buttons */}
                  <div className="HomeMeetagents-card-body">
                    <div className="HomeMeetagents-info">
                      <h2 className="HomeMeetagents-name">{agent.fullName}</h2>
                      <p className="HomeMeetagents-role">{agent.designation || 'Apartment & Property Consultant'}</p>
                    </div>

                    <div className="HomeMeetagents-actions">
                      {agent.phone && (
                        <a
                          href={`tel:${agent.phone}`}
                          className="HomeMeetagents-action-btn"
                          title={`Call ${agent.fullName}`}
                          aria-label={`Call ${agent.fullName}`}
                        >
                          <FaPhoneAlt />
                        </a>
                      )}
                      {agent.email && (
                        <a
                          href={`mailto:${agent.email}`}
                          className="HomeMeetagents-action-btn"
                          title={`Email ${agent.fullName}`}
                          aria-label={`Email ${agent.fullName}`}
                        >
                          <FaEnvelope />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="HomeMeetagents-empty">
              <p>No active property consultants found. Add team members from the admin panel!</p>
            </div>
          )}
        </div>

        {/* Footer Callout Link */}
        <div className="HomeMeetagents-footer-text">
          Join Bhubaneswar's top real estate advisory network.{' '}
          <a href="#contact" className="HomeMeetagents-contact-link">
            Partner with us
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomeMeetagents;