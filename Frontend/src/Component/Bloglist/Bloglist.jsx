import React from 'react';
import './Bloglist.css';

const Bloglist = () => {
  return (
    <section className="blog-list-section" aria-label="Utkal Property Real Estate Blog & Market Trends">
      <div className="blog-list-container">
        
        {/* Left Content Area: Main Blog Feed */}
        <div className="blog-main-content">
          
          {/* Section Header */}
          <div className="blog-section-header">
            <h1 className="blog-page-title">Blog List</h1>
            <div className="blog-view-toggle">
              <button type="button" className="blog-toggle-btn active" aria-label="Grid view">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              </button>
              <button type="button" className="blog-toggle-btn" aria-label="List view">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
              </button>
            </div>
          </div>

          {/* Blog Post Card */}
          <article className="blog-post-card">
            <div className="blog-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" 
                alt="Modern Real Estate Property Trends in Bhubaneswar Odisha" 
                className="blog-featured-image"
                loading="lazy"
              />
              <div className="blog-category-badge">
                <span className="blog-badge-date">April</span>
                <span className="blog-badge-category">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                  Housing
                </span>
              </div>
            </div>

            <div className="blog-content-wrapper">
              <h2 className="blog-post-title">
                Real estate shifts: Prices and sales trending down in two different spheres
              </h2>
              <p className="blog-post-snippet">
                Hosted by Utkal Property (Best Property Consultant in Bhubaneswar), our market insights explore the intersection of property pricing, housing demand, and urban expansion across Odisha. Discover smart ways to secure budget homes and luxury villas without hassle.
              </p>
            </div>
          </article>

        </div>

        {/* Right Sidebar Area */}
        <aside className="blog-sidebar" aria-label="Sidebar Widgets">
          
          {/* Search Widget */}
          <div className="blog-widget search-widget">
            <h3 className="blog-widget-title">Search</h3>
            <div className="blog-search-box">
              <svg className="blog-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input 
                type="text" 
                className="blog-search-input" 
                placeholder="Search..." 
                aria-label="Search blog posts"
              />
            </div>
          </div>

          {/* Categories Widget */}
          <div className="blog-widget categories-widget">
            <h3 className="blog-widget-title">Categories</h3>
            <ul className="blog-category-list">
              <li>
                <a href="#office" className="blog-category-item">
                  <span>Office</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </a>
              </li>
              <li>
                <a href="#business" className="blog-category-item">
                  <span>Business</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </a>
              </li>
              <li>
                <a href="#luxury-villa" className="blog-category-item">
                  <span>Luxury villa</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </a>
              </li>
              <li>
                <a href="#apartments" className="blog-category-item">
                  <span>Apartments</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </a>
              </li>
              <li>
                <a href="#duplex-house" className="blog-category-item">
                  <span>Duplex House</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </a>
              </li>
            </ul>
          </div>

          {/* Featured Listings Widget */}
          <div className="blog-widget featured-widget">
            <h3 className="blog-widget-title">Featured listings</h3>
            <div className="blog-featured-card">
              <img 
                src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=200&q=80" 
                alt="Gorgeous Apartment Building in Bhubaneswar" 
                className="blog-featured-thumb"
                loading="lazy"
              />
              <div className="blog-featured-info">
                <h4 className="blog-featured-item-title">Gorgeous Apartment Building</h4>
                <span className="blog-featured-price">$7,500</span>
              </div>
              
              
            </div>
          </div>

        </aside>

      </div>
    </section>
  );
};

export default Bloglist;