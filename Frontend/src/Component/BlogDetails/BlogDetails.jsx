import React from 'react';
import './BlogDetails.css';

const BlogDetails = () => {
  return (
    <article className="utkal-blog-details-container">
      {/* SEO-friendly Metadata Head tags can be added here using react-helmet or Next.js head */}
      
      <div className="utkal-blog-content-wrapper">
        {/* Main Blog Section */}
        <main className="utkal-blog-main">
          <header className="utkal-blog-header">
            <h1 className="utkal-blog-title">
              Lack of home listings is taking a toll on mortgage demand in Bhubaneswar & Odisha
            </h1>
            <div className="utkal-blog-meta">
              <span className="utkal-meta-item">
                <i className="far fa-user"></i> Utkal Property Consultant
              </span>
              <span className="utkal-meta-item">
                <i className="far fa-folder"></i> Housing Market
              </span>
              <span className="utkal-meta-item">
                <i className="far fa-comment"></i> 0 comments
              </span>
              <span className="utkal-meta-item">
                <i className="far fa-calendar"></i> July 28, 2026
              </span>
            </div>
          </header>

          <div className="utkal-blog-body">
            <p className="utkal-lead-text">
              Mortgage rates fell last week, but demand for home loans didn’t move higher as a 
              result. Other aspects of today’s housing market are outweighing the benefit of 
              lower mortgage rates right now, namely a lack of supply.
            </p>

            <p>
              Buying your first home can be fun and exciting but requires lots of research and visits 
              to various brokers to find a perfect home for you and your family. With <strong>Utkal Property</strong>, 
              now you can find the place of your dreams easily without reaching out to different brokers 
              at the best possible market price.
            </p>

            <div className="utkal-blog-image-container">
              <img 
                src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80" 
                alt="Utkal Property - Real Estate and Housing in Bhubaneswar" 
                className="utkal-featured-image"
              />
              <figcaption className="utkal-image-caption">
                Modern independent house & residential properties in Bhubaneswar, Odisha.
              </figcaption>
            </div>

            <p>
              We have a complete list of houses, apartments, and bungalows on sale in various parts of Odisha. 
              If you are planning to move out of your old place or a rented one into your own house, we have 
              a complete list of all the latest properties in the sales category. At Utkal Property, we only provide 
              the trusted property options on our site that can fit your budget.
            </p>
          </div>
        </main>

        {/* Sidebar Section */}
        <aside className="utkal-blog-sidebar">
          {/* Search Widget */}
          <div className="utkal-sidebar-widget utkal-search-widget">
            <h3 className="utkal-widget-title">Search</h3>
            <div className="utkal-search-box">
              <i className="fas fa-search utkal-search-icon"></i>
              <input 
                type="text" 
                placeholder="Search properties, blogs..." 
                className="utkal-search-input"
                aria-label="Search"
              />
            </div>
          </div>

          {/* Categories Widget */}
          <div className="utkal-sidebar-widget utkal-categories-widget">
            <h3 className="utkal-widget-title">Categories</h3>
            <ul className="utkal-category-list">
              <li><a href="#office">Office <span className="utkal-arrow">→</span></a></li>
              <li><a href="#business">Business <span className="utkal-arrow">→</span></a></li>
              <li><a href="#luxury-villa">Luxury villa <span className="utkal-arrow">→</span></a></li>
              <li><a href="#apartments">Apartments <span className="utkal-arrow">→</span></a></li>
              <li><a href="#duplex-house">Duplex House <span className="utkal-arrow">→</span></a></li>
            </ul>
          </div>

          {/* Featured Listings Widget */}
          <div className="utkal-sidebar-widget utkal-featured-widget">
            <h3 className="utkal-widget-title">Featured listings</h3>
            
            <div className="utkal-featured-item">
              <img 
                src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=200&q=80" 
                alt="Gorgeous Apartment Building" 
                className="utkal-featured-thumb"
              />
              <div className="utkal-featured-info">
                <h4>Gorgeous Apartment Building</h4>
                <span className="utkal-price">$7,500</span>
              </div>
            </div>

            <div className="utkal-featured-item">
              <img 
                src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=200&q=80" 
                alt="Luxury Villa in Baramunda" 
                className="utkal-featured-thumb"
              />
              <div className="utkal-featured-info">
                <h4>Luxury Duplex House</h4>
                <span className="utkal-price">$9,200</span>
              </div>
            </div>
          </div>

          {/* Business Info Quick Card (SEO & Trust Booster) */}
          <div className="utkal-sidebar-widget utkal-consultant-card">
            <h3 className="utkal-widget-title">Utkal Property</h3>
            <p className="utkal-consultant-tagline">Best Property Consultant in Bhubaneswar</p>
            <p className="utkal-consultant-address">
              <strong>Address:</strong> Plot No-55, Ln 2, Jagannath Vihar, Baramunda, Bhubaneswar, Odisha 751003
            </p>
            <p className="utkal-consultant-phone">
              <strong>Phone:</strong> <a href="tel:09861566735">098615 66735</a>
            </p>
            <div className="utkal-rating-badge">
              ★ 4.4 (47 Google Reviews)
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
};

export default BlogDetails;