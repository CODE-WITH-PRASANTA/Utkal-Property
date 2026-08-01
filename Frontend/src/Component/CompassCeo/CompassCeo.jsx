import React, { useState, useEffect, useMemo } from 'react';
import './CompassCeo.css';
import API, { IMG_URL } from "../../api/axios";

// Default High-Quality Property Visuals for Fallback Rendering
const PROPERTY_FALLBACKS = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'
];

const DEFAULT_CITIES = ['Moncton', 'Mississauga', 'Halifax', 'Ottawa', 'Iqaluit', 'Toronto'];

const CompassCeo = () => {
  // Main Article Feed State
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dynamic Sidebar State (Fetched from Gallery API)
  const [miniListings, setMiniListings] = useState([]);
  const [locations, setLocations] = useState([]);
  const [featuredCard, setFeaturedCard] = useState(null);

  // Pagination State (6 items per page)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Selected tag filter, driven by the Popular Tags widget
  const [selectedTag, setSelectedTag] = useState(null);

  // Universal Image URL Resolver
  const getImageUrl = (imgPath, fallback = PROPERTY_FALLBACKS[0]) => {
    if (!imgPath) return fallback;
    if (typeof imgPath === 'object' && imgPath !== null) {
      imgPath = imgPath.path || imgPath.url || imgPath.filename || '';
    }
    if (typeof imgPath !== 'string' || !imgPath.trim()) return fallback;

    if (imgPath.startsWith('http://') || imgPath.startsWith('https://') || imgPath.startsWith('data:')) {
      return imgPath;
    }
    const cleanPath = imgPath.replace(/\\/g, '/');
    const baseUrl = (IMG_URL || 'http://localhost:5000').replace(/\/+$/, '');
    return `${baseUrl}${cleanPath.startsWith('/') ? '' : '/'}${cleanPath}`;
  };

  // --- Fetch Main Feed (Blogs) & Sidebar Data (Gallery) ---
  const fetchAllData = async () => {
    try {
      setLoading(true);

      // 1. Fetch Main Blog Feed Data
      const res = await API.get('/blogs');
      let data = [];
      if (res.data && res.data.success) {
        data = res.data.data;
      } else if (Array.isArray(res.data)) {
        data = res.data;
      }

      // Filter Published Posts
      const published = data.filter(
        (b) => !b.status || b.status.toLowerCase() === 'published'
      );
      setArticles(published);

      // 2. Fetch Gallery Assets for Sidebar Widgets (Matching Reference Images 1, 2, and 3)
      try {
        const galleryRes = await API.get('/gallery');
        let galleryData = [];
        if (galleryRes.data && galleryRes.data.data) {
          galleryData = galleryRes.data.data;
        } else if (Array.isArray(galleryRes.data)) {
          galleryData = galleryRes.data;
        }

        if (galleryData.length > 0) {
          // --- Top Mini Cards (Ref Image 1) ---
          const mini = [0, 1].map((idx) => {
            const item = galleryData[idx];
            return {
              id: item?._id || item?.id || `mini-${idx}`,
              title: item?.title || 'Gorgeous Apartment Building',
              price: item?.price || '$7,500',
              image: item?.image ? getImageUrl(item.image, PROPERTY_FALLBACKS[idx]) : PROPERTY_FALLBACKS[idx]
            };
          });
          setMiniListings(mini);

          // --- Real Estate Near You Grid (Ref Image 3) ---
          const locItems = DEFAULT_CITIES.map((cityName, index) => {
            const item = galleryData[index + 2] || galleryData[index % galleryData.length];
            return {
              id: item?._id || item?.id || `loc-${index}`,
              name: cityName,
              listings: item?.listings || '1570 listing',
              image: item?.image ? getImageUrl(item.image, PROPERTY_FALLBACKS[index % PROPERTY_FALLBACKS.length]) : PROPERTY_FALLBACKS[index % PROPERTY_FALLBACKS.length]
            };
          });
          setLocations(locItems);

          // --- Featured Reference Card (Ref Image 2) ---
          const feat = galleryData[8] || galleryData[0];
          setFeaturedCard({
            title: feat?.title || 'Gorgeous Apartment Building',
            address: feat?.location || feat?.address || '58 Hullbrook Road, Billesley, B13 0LA',
            image: feat?.image ? getImageUrl(feat.image, PROPERTY_FALLBACKS[5]) : PROPERTY_FALLBACKS[5]
          });
        } else {
          setFallbackSidebarData();
        }
      } catch (galleryErr) {
        console.warn('Gallery API unavailable, populating default property visuals:', galleryErr);
        setFallbackSidebarData();
      }

    } catch (err) {
      console.error('Failed to fetch articles for CompassCeo:', err);
      setArticles([]);
      setFallbackSidebarData();
    } finally {
      setLoading(false);
    }
  };

  const setFallbackSidebarData = () => {
    // 1st Reference Image Section
    setMiniListings([
      { id: 1, title: 'Gorgeous Apartment Building', price: '$7,500', image: PROPERTY_FALLBACKS[3] },
      { id: 2, title: 'Gorgeous Apartment Building', price: '$7,500', image: PROPERTY_FALLBACKS[4] }
    ]);

    // 3rd Reference Image Section
    setLocations(DEFAULT_CITIES.map((cityName, index) => ({
      id: index + 1,
      name: cityName,
      listings: '1570 listing',
      image: PROPERTY_FALLBACKS[index % PROPERTY_FALLBACKS.length]
    })));

    // 2nd Reference Image Section
    setFeaturedCard({
      title: 'Gorgeous Apartment Building',
      address: '58 Hullbrook Road, Billesley, B13 0LA',
      image: PROPERTY_FALLBACKS[5]
    });
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // --- Popular Tags widget, fetched live from actual published article tags ---
  const popularTags = useMemo(() => {
    const freq = {};
    articles.forEach((a) => {
      let tagList = a.tags;
      if (typeof tagList === 'string') {
        try {
          tagList = JSON.parse(tagList);
        } catch (e) {
          tagList = tagList.split(',').map((t) => t.trim());
        }
      }
      if (Array.isArray(tagList)) {
        tagList.forEach((t) => {
          const clean = typeof t === 'string' ? t.trim() : '';
          if (!clean) return;
          freq[clean] = (freq[clean] || 0) + 1;
        });
      }
    });

    const extracted = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([tag]) => tag);

    return extracted.length > 0
      ? extracted
      : ['For sale', 'Office', 'Business', 'Luxury villa', 'Apartments', 'Duplex House'];
  }, [articles]);

  const handleTagClick = (tag) => {
    setSelectedTag((prev) => (prev === tag ? null : tag));
    setCurrentPage(1);
  };

  // Apply tag filter (if any) before paginating
  const filteredArticles = selectedTag
    ? articles.filter((a) => {
        let tagList = a.tags;
        if (typeof tagList === 'string') {
          try {
            tagList = JSON.parse(tagList);
          } catch (e) {
            tagList = tagList.split(',').map((t) => t.trim());
          }
        }
        return Array.isArray(tagList) && tagList.some((t) => t.toLowerCase() === selectedTag.toLowerCase());
      })
    : articles;

  // Pagination Calculations
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentArticles = filteredArticles.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="compass-section" aria-label="Utkal Property Real Estate Articles and Locations">
      <div className="compass-container">

        {/* Main Content Feed (Left 65%) */}
        <div className="compass-main-feed">

          {selectedTag && (
            <div className="compass-active-tag-bar">
              <span>Filtered by tag: <strong>#{selectedTag}</strong></span>
              <button onClick={() => setSelectedTag(null)}>Clear ✕</button>
            </div>
          )}

          {loading ? (
            <div className="compass-loading-state" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
              <p>Loading market updates & articles...</p>
            </div>
          ) : currentArticles.length > 0 ? (
            currentArticles.map((article) => {
              const articleId = article._id || article.id;
              const imageUrl = getImageUrl(article.blogImage);

              return (
                <article className="compass-article-card" key={articleId}>
                  <div className="compass-article-img-wrap">
                    <img
                      src={imageUrl}
                      alt={article.title || "Real Estate Update"}
                      className="compass-article-img"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = PROPERTY_FALLBACKS[0];
                      }}
                    />
                    <div className="compass-badge">
                      <span className="compass-badge-date">
                        {article.publishDate
                          ? new Date(article.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                          : 'Jan 30'}
                      </span>
                      <span className="compass-badge-cat">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                        </svg>
                        {article.category || 'Housing'}
                      </span>
                    </div>
                  </div>

                  <div className="compass-article-content">
                    <h2 className="compass-article-title">
                      {article.title}
                    </h2>
                    <p className="compass-article-desc">
                      {article.shortDesc || (article.content ? article.content.substring(0, 160) + '...' : '')}
                    </p>
                    <a href={`/details/${articleId}`} className="compass-read-more">
                      Read more
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </a>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="compass-empty-state" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
              <p>
                {selectedTag
                  ? `No published articles found for #${selectedTag}.`
                  : 'No published articles found. Publish new posts in the admin panel to view them here.'}
              </p>
            </div>
          )}

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

        {/* Sidebar Area (Right 35%) */}
        <aside className="compass-sidebar" aria-label="Sidebar Widgets">

          {/* 1st Reference Image Section: Top Featured Mini-Listings (Gallery API) */}
          <div className="compass-mini-listings">
            {miniListings.map((item, idx) => (
              <div className="compass-mini-card" key={item.id || idx}>
                <img
                  src={item.image}
                  alt={item.title || 'Apartment'}
                  className="compass-mini-thumb"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = PROPERTY_FALLBACKS[idx % PROPERTY_FALLBACKS.length];
                  }}
                />
                <div className="compass-mini-info">
                  <h4 className="compass-mini-title">{item.title}</h4>
                  <span className="compass-mini-price">{item.price}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 3rd Reference Image Section: Real Estate Near You (Gallery API) */}
          <div className="compass-locations-widget">
            <h3 className="compass-sidebar-heading">Real estate near you</h3>

            <div className="compass-locations-grid">
              {locations.map((loc, idx) => (
                <a href={`#${loc.name.toLowerCase()}`} className="compass-location-card" key={loc.id}>
                  <img
                    src={loc.image}
                    alt={`${loc.name} Properties`}
                    className="compass-location-img"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = PROPERTY_FALLBACKS[idx % PROPERTY_FALLBACKS.length];
                    }}
                  />
                  <div className="compass-location-overlay">
                    <span className="compass-location-name">{loc.name}</span>
                    <span className="compass-location-count">{loc.listings}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* 2nd Reference Image Section: Featured Reference Card (Gallery API) */}
          {featuredCard && (
            <div className="compass-reference-card-wrap">
              <div className="compass-ref-card">
                <img
                  src={featuredCard.image}
                  alt={featuredCard.title}
                  className="compass-ref-img"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = PROPERTY_FALLBACKS[5];
                  }}
                />
                <div className="compass-ref-overlay">
                  <h3 className="compass-ref-title">{featuredCard.title}</h3>
                  <p className="compass-ref-address">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7l9-4 9 4M3 7v10l9 4 9-4V7M3 7l9 4 9-4"></path></svg>
                    {featuredCard.address}
                  </p>
                  <div className="compass-ref-rating" aria-label="5 out of 5 stars rating">
                    {'★★★★★'.split('').map((star, idx) => (
                      <span key={idx} className="compass-star">★</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Popular Tags Section (Live from Blogs) */}
          <div className="compass-tags-widget">
            <h3 className="compass-sidebar-heading">Popular tags</h3>
            <div className="compass-tags-list">
              {popularTags.length > 0 ? (
                popularTags.map((tag, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`compass-tag-pill ${selectedTag === tag ? 'active' : ''}`}
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </button>
                ))
              ) : (
                <span className="compass-tags-empty">No tags yet</span>
              )}
            </div>
          </div>

        </aside>

      </div>
    </section>
  );
};

export default CompassCeo;