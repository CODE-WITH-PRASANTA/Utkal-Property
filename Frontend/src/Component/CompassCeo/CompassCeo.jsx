import React, { useState } from 'react';
import './CompassCeo.css';

const CompassCeo = () => {
  // Main article feed items data with pagination state (6 items per page)
  const allArticles = [
    {
      id: 1,
      title: "We are hiring ‘moderately,’ says Compass CEO",
      date: "January 30",
      category: "Housing",
      description: "Hosted by Utkal Property (Best Property Consultant in Bhubaneswar), our market updates explore major corporate shifts, strategic residential expansions, and real estate opportunities across Odisha...",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      alt: "Luxury Stone House in Bhubaneswar Odisha"
    },
    {
      id: 2,
      title: "We are hiring ‘moderately,’ says Compass CEO",
      date: "January 30",
      category: "Housing",
      description: "Hosted by Utkal Property (Best Property Consultant in Bhubaneswar), our market updates explore major corporate shifts, strategic residential expansions, and real estate opportunities across Odisha...",
      img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      alt: "Modern Residential Duplex Homes in Baramunda Bhubaneswar"
    },
    {
      id: 3,
      title: "We are hiring ‘moderately,’ says Compass CEO",
      date: "January 30",
      category: "Housing",
      description: "Hosted by Utkal Property (Best Property Consultant in Bhubaneswar), our market updates explore major corporate shifts, strategic residential expansions, and real estate opportunities across Odisha...",
      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      alt: "Luxury Villa Project in Bhubaneswar"
    },
    {
      id: 4,
      title: "We are hiring ‘moderately,’ says Compass CEO",
      date: "January 30",
      category: "Housing",
      description: "Hosted by Utkal Property (Best Property Consultant in Bhubaneswar), our market updates explore major corporate shifts, strategic residential expansions, and real estate opportunities across Odisha...",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      alt: "Luxury Stone House in Bhubaneswar Odisha"
    },
    {
      id: 5,
      title: "We are hiring ‘moderately,’ says Compass CEO",
      date: "January 30",
      category: "Housing",
      description: "Hosted by Utkal Property (Best Property Consultant in Bhubaneswar), our market updates explore major corporate shifts, strategic residential expansions, and real estate opportunities across Odisha...",
      img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      alt: "Modern Residential Duplex Homes in Baramunda Bhubaneswar"
    },
    {
      id: 6,
      title: "We are hiring ‘moderately,’ says Compass CEO",
      date: "January 30",
      category: "Housing",
      description: "Hosted by Utkal Property (Best Property Consultant in Bhubaneswar), our market updates explore major corporate shifts, strategic residential expansions, and real estate opportunities across Odisha...",
      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      alt: "Luxury Villa Project in Bhubaneswar"
    },
    {
      id: 7,
      title: "We are hiring ‘moderately,’ says Compass CEO",
      date: "January 31",
      category: "Housing",
      description: "Hosted by Utkal Property (Best Property Consultant in Bhubaneswar), our market updates explore major corporate shifts, strategic residential expansions, and real estate opportunities across Odisha...",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      alt: "Luxury Villa in Odisha"
    },
    {
      id: 8,
      title: "We are hiring ‘moderately,’ says Compass CEO",
      date: "January 31",
      category: "Housing",
      description: "Hosted by Utkal Property (Best Property Consultant in Bhubaneswar), our market updates explore major corporate shifts, strategic residential expansions, and real estate opportunities across Odisha...",
      img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      alt: "Modern Duplex Home"
    }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(allArticles.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentArticles = allArticles.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="compass-section" aria-label="Utkal Property Real Estate Articles and Locations">
      <div className="compass-container">
        
        {/* Main Content Feed (Left) */}
        <div className="compass-main-feed">
          
          {currentArticles.map((article) => (
            <article className="compass-article-card" key={article.id}>
              <div className="compass-article-img-wrap">
                <img 
                  src={article.img} 
                  alt={article.alt} 
                  className="compass-article-img"
                  loading="lazy"
                />
                <div className="compass-badge">
                  <span className="compass-badge-date">{article.date}</span>
                  <span className="compass-badge-cat">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="compass-article-content">
                <h2 className="compass-article-title">{article.title}</h2>
                <p className="compass-article-desc">{article.description}</p>
                <a href="#read-more" className="compass-read-more">
                  Read more 
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </a>
              </div>
            </article>
          ))}

          {/* Pagination Component */}
          {totalPages > 1 && (
            <nav className="compass-pagination" aria-label="Article Pagination">
              <button 
                className="compass-page-btn" 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              
              <div className="compass-page-numbers">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    className={`compass-page-num ${currentPage === index + 1 ? 'active' : ''}`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <button 
                className="compass-page-btn" 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </nav>
          )}

        </div>

        {/* Sidebar Area (Right) */}
        <aside className="compass-sidebar" aria-label="Sidebar Widgets">
          
          {/* Top Featured Listings Mini-Widget */}
          <div className="compass-mini-listings">
            <div className="compass-mini-card">
              <img src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=200&q=80" alt="Gorgeous Apartment Building" className="compass-mini-thumb" />
              <div className="compass-mini-info">
                <h4 className="compass-mini-title">Gorgeous Apartment Building</h4>
                <span className="compass-mini-price">$7,500</span>
              </div>
            </div>
            <div className="compass-mini-card">
              <img src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=200&q=80" alt="Gorgeous Apartment Building" className="compass-mini-thumb" />
              <div className="compass-mini-info">
                <h4 className="compass-mini-title">Gorgeous Apartment Building</h4>
                <span className="compass-mini-price">$7,500</span>
              </div>
            </div>
          </div>

          {/* Real Estate Near You Section */}
          <div className="compass-locations-widget">
            <h3 className="compass-sidebar-heading">Real estate near you</h3>
            
            <div className="compass-locations-grid">
              <a href="#moncton" className="compass-location-card">
                <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80" alt="Moncton Properties" className="compass-location-img" />
                <div className="compass-location-overlay">
                  <span className="compass-location-name">Moncton</span>
                  <span className="compass-location-count">1570 listing</span>
                </div>
              </a>

              <a href="#mississauga" className="compass-location-card">
                <img src="https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=400&q=80" alt="Mississauga Properties" className="compass-location-img" />
                <div className="compass-location-overlay">
                  <span className="compass-location-name">Mississauga</span>
                  <span className="compass-location-count">1570 listing</span>
                </div>
              </a>

              <a href="#halifax" className="compass-location-card">
                <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80" alt="Halifax Properties" className="compass-location-img" />
                <div className="compass-location-overlay">
                  <span className="compass-location-name">Halifax</span>
                  <span className="compass-location-count">1570 listing</span>
                </div>
              </a>

              <a href="#ottawa" className="compass-location-card">
                <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Ottawa Properties" className="compass-location-img" />
                <div className="compass-location-overlay">
                  <span className="compass-location-name">Ottawa</span>
                  <span className="compass-location-count">1570 listing</span>
                </div>
              </a>

              <a href="#iqaluit" className="compass-location-card">
                <img src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80" alt="Iqaluit Properties" className="compass-location-img" />
                <div className="compass-location-overlay">
                  <span className="compass-location-name">Iqaluit</span>
                  <span className="compass-location-count">1570 listing</span>
                </div>
              </a>

              <a href="#toronto" className="compass-location-card">
                <img src="https://images.unsplash.com/photo-1503614472328-8eed3f3952b6?auto=format&fit=crop&w=400&q=80" alt="Toronto Properties" className="compass-location-img" />
                <div className="compass-location-overlay">
                  <span className="compass-location-name">Toronto</span>
                  <span className="compass-location-count">1570 listing</span>
                </div>
              </a>
            </div>
          </div>

          {/* New Featured Reference Card (Matched to design reference) */}
          <div className="compass-reference-card-wrap">
            <div className="compass-ref-card">
              <img 
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80" 
                alt="Gorgeous Apartment Building Interior in Bhubaneswar" 
                className="compass-ref-img"
                loading="lazy"
              />
              <div className="compass-ref-overlay">
                <h3 className="compass-ref-title">Gorgeous Apartment Building</h3>
                <p className="compass-ref-address">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7l9-4 9 4M3 7v10l9 4 9-4V7M3 7l9 4 9-4"></path></svg>
                  58 Hullbrook Road, Billesley, B13 0LA
                </p>
                <div className="compass-ref-rating" aria-label="5 out of 5 stars rating">
                  {'★★★★★'.split('').map((star, idx) => (
                    <span key={idx} className="compass-star">★</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Popular Tags Section */}
          <div className="compass-tags-widget">
            <h3 className="compass-sidebar-heading">Popular tags</h3>
            <div className="compass-tags-list">
              <span className="compass-tag-pill">For sale</span>
              <span className="compass-tag-pill">Office</span>
              <span className="compass-tag-pill">Business</span>
              <span className="compass-tag-pill">Luxury villa</span>
              <span className="compass-tag-pill">Apartments</span>
              <span className="compass-tag-pill">Duplex House</span>
            </div>
          </div>

        </aside>

      </div>
    </section>
  );
};

export default CompassCeo;