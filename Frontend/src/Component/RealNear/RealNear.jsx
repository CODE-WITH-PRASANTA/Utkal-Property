import React, { useState } from 'react';
import contactSellerImg from '../../assets/mark-contact3.png';
import footerImage from '../../assets/footerImage.avif'; // Update the path if stored in a different folder
import './RealNear.css';

const RealNear = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comment: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Comment submitted:', formData);
    alert('Thank you! Your comment has been submitted successfully.');
  };

  return (
    <section className="utkal-real-near-container" aria-label="Real Estate Near You & Market Insights">
      {/* Top Content & Real Estate Near You Grid */}
      <div className="utkal-rn-top-section">
        {/* Left Text & Highlight Box */}
        <div className="utkal-rn-content-left">
          <p className="utkal-rn-text">
            Mortgage applications to purchase a home, however, dropped 4% last week compared with the 
            previous week, according to the Mortgage Bankers Association’s seasonally adjusted index. Demand 
            was 35% lower than the same week one year ago.
          </p>

          <div className="utkal-rn-highlight-box">
            <blockquote className="utkal-rn-quote">
              "Spring has arrived, but the housing market is missing the customary burst in listings and 
              purchase activity that typically mark the season. After four weeks of increasing purchase 
              application activity, volume declined a bit this week even with another small drop in 
              mortgage rates," said Mike Fratantoni, MBA’s chief economist.
            </blockquote>
          </div>

          <p className="utkal-rn-text">
            New listings were down 20% year over year in March, according to Realtor.com, and total inventory 
            was about half of what it was in March 2019, pre-Covid pandemic.
          </p>
        </div>

        {/* Right Sidebar: Real Estate Near You Widget */}
        <aside className="utkal-rn-sidebar-right">
          <h3 className="utkal-rn-sidebar-title">Real estate near you</h3>
          <div className="utkal-rn-grid">
            
            <div className="utkal-rn-card">
              <img 
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=300&q=80" 
                alt="Moncton Real Estate" 
                className="utkal-rn-card-img"
              />
              <div className="utkal-rn-card-overlay">
                <h4 className="utkal-rn-location-name">Moncton</h4>
                <span className="utkal-rn-listing-count">1570 listing</span>
              </div>
            </div>

            <div className="utkal-rn-card">
              <img 
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=300&q=80" 
                alt="Mississauga Real Estate" 
                className="utkal-rn-card-img"
              />
              <div className="utkal-rn-card-overlay">
                <h4 className="utkal-rn-location-name">Mississauga</h4>
                <span className="utkal-rn-listing-count">1570 listing</span>
              </div>
            </div>

            <div className="utkal-rn-card">
              <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=300&q=80" 
                alt="Halifax Real Estate" 
                className="utkal-rn-card-img"
              />
              <div className="utkal-rn-card-overlay">
                <h4 className="utkal-rn-location-name">Halifax</h4>
                <span className="utkal-rn-listing-count">1570 listing</span>
              </div>
            </div>

            <div className="utkal-rn-card">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80" 
                alt="Ottawa Real Estate" 
                className="utkal-rn-card-img"
              />
              <div className="utkal-rn-card-overlay">
                <h4 className="utkal-rn-location-name">Ottawa</h4>
                <span className="utkal-rn-listing-count">1570 listing</span>
              </div>
            </div>

            <div className="utkal-rn-card">
              <img 
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=300&q=80" 
                alt="Iqaluit Real Estate" 
                className="utkal-rn-card-img"
              />
              <div className="utkal-rn-card-overlay">
                <h4 className="utkal-rn-location-name">Iqaluit</h4>
                <span className="utkal-rn-listing-count">1570 listing</span>
              </div>
            </div>

            <div className="utkal-rn-card">
              <img 
                src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=300&q=80" 
                alt="Toronto Real Estate" 
                className="utkal-rn-card-img"
              />
              <div className="utkal-rn-card-overlay">
                <h4 className="utkal-rn-location-name">Toronto</h4>
                <span className="utkal-rn-listing-count">1570 listing</span>
              </div>
            </div>

          </div>
        </aside>
      </div>

      {/* Bottom Section with Secondary Article & Tags */}
      <div className="utkal-rn-bottom-section">
        <div className="utkal-rn-content-left">
          <div className="utkal-rn-highlight-box">
            <blockquote className="utkal-rn-quote">
              "Although the mortgage rate for conforming balance loans declined by five basis points over the week to 6.40%, the mortgage rate for jumbo loans increased by nine basis points to 6.36%," added Fratantoni. "While we have seen relative weakness at the high end of the housing market in recent months, the divergence in rates suggests that banks may be tightening credit in response to recent challenges, preserving balance sheet capacity as deposit balances have declined."
            </blockquote>
          </div>

          <p className="utkal-rn-text">Most jumbo loans are held on bank balance sheets.</p>

          <p className="utkal-rn-text">
            Demand for Federal Housing Administration and Department of Veterans Affairs loans, which are favored by lower-income borrowers due to low down payment requirements, declined more than those for conventional loans. While there is strong demand from first-time homebuyers, with millennials hitting their peak buying age, affordability is still a challenge right now.
          </p>

          <p className="utkal-rn-text">
            Applications to refinance a home loan also dropped, down 5% for the week and 59% lower than the same week a year ago. The refinance share of mortgage activity decreased to 28.6% of total applications from 29.1% the previous week. Rates are 150 basis points higher than they were at the same time last year, so there are precious few borrowers who can now benefit from a refinance.
          </p>
        </div>

        {/* Featured Property Card & Tags Column */}
        <aside className="utkal-rn-sidebar-right">
          <div className="utkal-rn-featured-card">
            <img 
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80" 
              alt="Gorgeous Apartment Building in Bhubaneswar" 
              className="utkal-rn-featured-img"
            />
            <div className="utkal-rn-featured-details">
              <h4 className="utkal-rn-featured-title">Gorgeous Apartment Building</h4>
              <p className="utkal-rn-featured-address">Plot No-55, Ln 2, Jagannath Vihar, Baramunda, Bhubaneswar</p>
              <div className="utkal-rn-stars">★★★★★</div>
            </div>
          </div>

          <div className="utkal-rn-tags-container">
            <h4 className="utkal-rn-tags-heading">Popular tags</h4>
            <div className="utkal-rn-tag-list">
              <span className="utkal-rn-tag">For sale</span>
              <span className="utkal-rn-tag">Office</span>
              <span className="utkal-rn-tag">Business</span>
              <span className="utkal-rn-tag">Luxury villa</span>
              <span className="utkal-rn-tag">Apartments</span>
              <span className="utkal-rn-tag">Duplex House</span>
            </div>
          </div>
        </aside>
      </div>

      {/* Comment Section (4) */}
      <div className="utkal-rn-comments-section">
        <h3 className="utkal-rn-comments-heading">Comment (4)</h3>

        {/* Comment 1 */}
        <div className="utkal-rn-comment-item">
          <div className="utkal-rn-comment-avatar-col">
            <img 
              src={footerImage} 
              alt="Leslie Alexander" 
              className="utkal-rn-avatar"
            />
          </div>
          <div className="utkal-rn-comment-body-col">
            <div className="utkal-rn-comment-header">
              <div className="utkal-rn-author-info">
                <h4 className="utkal-rn-author-name">Leslie Alexander</h4>
                <div className="utkal-rn-comment-stars">★★★★★</div>
              </div>
              <span className="utkal-rn-comment-date">April 5, 2023</span>
            </div>
            <p className="utkal-rn-comment-text">
              Buying your first home can be fun and exciting but requires lots of research. Utkal Property made it so easy to find the place of our dreams without reaching out to different brokers!
            </p>
            <div className="utkal-rn-comment-images">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&q=80" alt="Interior preview" />
              <img src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=200&q=80" alt="Living room preview" />
              <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=200&q=80" alt="House exterior preview" />
            </div>
            <div className="utkal-rn-comment-actions">
              <button type="button" className="utkal-rn-action-btn">👍 Useful</button>
              <button type="button" className="utkal-rn-action-btn">👎 Not helpful</button>
            </div>
          </div>
        </div>

        {/* Comment 2 */}
        <div className="utkal-rn-comment-item">
          <div className="utkal-rn-comment-avatar-col">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" 
              alt="Jenny Wilson" 
              className="utkal-rn-avatar"
            />
          </div>
          <div className="utkal-rn-comment-body-col">
            <div className="utkal-rn-comment-header">
              <div className="utkal-rn-author-info">
                <h4 className="utkal-rn-author-name">Jenny Wilson</h4>
                <div className="utkal-rn-comment-stars">★★★★★</div>
              </div>
              <span className="utkal-rn-comment-date">April 5, 2023</span>
            </div>
            <p className="utkal-rn-comment-text">
              As the best property consultant in Bhubaneswar, they have a complete list of houses, apartments, and bungalows on sale at the best possible market price. Highly recommended!
            </p>
            <div className="utkal-rn-comment-actions">
              <button type="button" className="utkal-rn-action-btn">👍 Useful</button>
              <button type="button" className="utkal-rn-action-btn">👎 Not helpful</button>
            </div>
          </div>
        </div>

        {/* Comment 3 */}
        <div className="utkal-rn-comment-item">
          <div className="utkal-rn-comment-avatar-col">
            <img 
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80" 
              alt="Bessie Cooper" 
              className="utkal-rn-avatar"
            />
          </div>
          <div className="utkal-rn-comment-body-col">
            <div className="utkal-rn-comment-header">
              <div className="utkal-rn-author-info">
                <h4 className="utkal-rn-author-name">Bessie Cooper</h4>
                <div className="utkal-rn-comment-stars">★★★★★</div>
              </div>
              <span className="utkal-rn-comment-date">April 5, 2023</span>
            </div>
            <p className="utkal-rn-comment-text">
              If you are planning to move out of your old place into your own house, Utkal Property provides trusted property options that fit your budget perfectly in Odisha.
            </p>
            <div className="utkal-rn-comment-actions">
              <button type="button" className="utkal-rn-action-btn">👍 Useful</button>
              <button type="button" className="utkal-rn-action-btn">👎 Not helpful</button>
            </div>
          </div>
        </div>
      </div>

      {/* Leave a Comment Form Section */}
      <div className="utkal-rn-leave-comment-section">
        <h3 className="utkal-rn-form-title">Leave a comment</h3>
        <p className="utkal-rn-form-subtitle">Your email address will not be published. Required fields are marked *</p>

        <form onSubmit={handleSubmit} className="utkal-rn-form">
          <div className="utkal-rn-form-group">
            <label htmlFor="name" className="utkal-rn-label">Your name *</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              placeholder="Your name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              className="utkal-rn-input"
            />
          </div>

          <div className="utkal-rn-form-row">
            <div className="utkal-rn-form-group">
              <label htmlFor="email" className="utkal-rn-label">Email address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="Your email" 
                value={formData.email} 
                onChange={handleChange} 
                className="utkal-rn-input"
              />
            </div>
            <div className="utkal-rn-form-group">
              <label htmlFor="phone" className="utkal-rn-label">Phone number</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                placeholder="Your phone" 
                value={formData.phone} 
                onChange={handleChange} 
                className="utkal-rn-input"
              />
            </div>
          </div>

          <div className="utkal-rn-form-group">
            <label htmlFor="comment" className="utkal-rn-label">Your Comment</label>
            <textarea 
              id="comment" 
              name="comment" 
              rows="5" 
              placeholder="Your message" 
              value={formData.comment} 
              onChange={handleChange} 
              className="utkal-rn-textarea"
            ></textarea>
          </div>

          <button type="submit" className="utkal-rn-submit-btn">
            Send comment
          </button>
        </form>
      </div>

      {/* Related Posts Section */}
      <div className="utkal-rn-related-posts-section">
        <h3 className="utkal-rn-related-heading">Related posts</h3>
        <div className="utkal-rn-related-grid">
          
          {/* Post 1 */}
          <article className="utkal-rn-related-card">
            <div className="utkal-rn-related-img-wrap">
              <img 
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=500&q=80" 
                alt="Traditional House in Odisha" 
                className="utkal-rn-related-img"
              />
              <div className="utkal-rn-related-badge">
                <span>April</span>
                <span className="utkal-rn-badge-divider">📁</span>
                <span>Housing</span>
              </div>
            </div>
            <div className="utkal-rn-related-content">
              <h4 className="utkal-rn-related-title">We are hiring 'moderately,' says Compass CEO</h4>
              <a href="#read-more" className="utkal-rn-read-more">Read more →</a>
            </div>
          </article>

          {/* Post 2 */}
          <article className="utkal-rn-related-card">
            <div className="utkal-rn-related-img-wrap">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80" 
                alt="Architecture View Bhubaneswar" 
                className="utkal-rn-related-img"
              />
              <div className="utkal-rn-related-badge">
                <span>April</span>
                <span className="utkal-rn-badge-divider">📁</span>
                <span>Housing</span>
              </div>
            </div>
            <div className="utkal-rn-related-content">
              <h4 className="utkal-rn-related-title">We are hiring 'moderately,' says Compass CEO</h4>
              <a href="#read-more" className="utkal-rn-read-more">Read more →</a>
            </div>
          </article>

          {/* Post 3 */}
          <article className="utkal-rn-related-card">
            <div className="utkal-rn-related-img-wrap">
              <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=500&q=80" 
                alt="Modern House Listing" 
                className="utkal-rn-related-img"
              />
              <div className="utkal-rn-related-badge">
                <span>April</span>
                <span className="utkal-rn-badge-divider">📁</span>
                <span>Housing</span>
              </div>
            </div>
            <div className="utkal-rn-related-content">
              <h4 className="utkal-rn-related-title">We are hiring 'moderately,' says Compass CEO</h4>
              <a href="#read-more" className="utkal-rn-read-more">Read more →</a>
            </div>
          </article>

        </div>
      </div>

      {/* Promotional Banner Section */}
      <div className="utkal-rn-promo-banner">
        <div className="utkal-rn-promo-content">
          <h2 className="utkal-rn-promo-title">
            Find for your dream home and increase your investment opportunities
          </h2>
          <p className="utkal-rn-promo-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed tristique metus proin id lorem odio
          </p>
          <a href="tel:09861566735" className="utkal-rn-contact-seller-btn">
            📞 Contact Seller
          </a>
        </div>
        <div className="utkal-rn-promo-image-wrapper">
          <img 
            src={contactSellerImg} 
            alt="Utkal Property Consultant Bhubaneswar" 
            className="utkal-rn-promo-img"
          />
        </div>
      </div>

      {/* SEO Local Business Footer Info */}
      <div className="utkal-rn-seo-footer">
        <p>
          From <strong>Utkal Property (Best Property Consultant in Bhubaneswar)</strong>: Buying your first home can be fun and exciting but requires lots of research. Find the place of your dreams easily without reaching out to different brokers at the best possible market price. Visit us at <strong>Plot No-55, Ln 2, Jagannath Vihar, Baramunda, Bhubaneswar, Odisha 751003</strong> or call us at <strong>098615 66735</strong>.
        </p>
      </div>
    </section>
  );
};

export default RealNear;