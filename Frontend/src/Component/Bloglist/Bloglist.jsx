import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Bloglist.css';
import API, { IMG_URL } from "../../api/axios";

const Bloglist = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Universal Image URL Resolver
  const getImageUrl = (imgPath) => {
    if (!imgPath) {
      return 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
    }
    if (imgPath.startsWith('http://') || imgPath.startsWith('https://') || imgPath.startsWith('data:')) {
      return imgPath;
    }
    const cleanPath = imgPath.replace(/\\/g, '/');
    const baseUrl = (IMG_URL || 'http://localhost:5000').replace(/\/+$/, '');
    return `${baseUrl}${cleanPath.startsWith('/') ? '' : '/'}${cleanPath}`;
  };

  // Fetch Published Blogs from Backend API
  const fetchPublishedBlogs = async () => {
    try {
      setLoading(true);
      const res = await API.get('/blogs');

      let data = [];
      if (res.data && res.data.success) {
        data = res.data.data;
      } else if (Array.isArray(res.data)) {
        data = res.data;
      }

      // Filter only published blogs
      const published = data.filter(
        (b) => !b.status || b.status.toLowerCase() === 'published'
      );

      setBlogs(published);
    } catch (err) {
      console.error('Error fetching blogs for frontend list:', err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublishedBlogs();
  }, []);

  // Filter Blogs based on Search Term, Category, and Tag
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      (blog.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (blog.shortDesc || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (blog.tags || []).some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' ||
      (blog.category || '').toLowerCase() === selectedCategory.toLowerCase();

    const matchesTag =
      !selectedTag ||
      (blog.tags || []).some((t) => t.toLowerCase() === selectedTag.toLowerCase());

    return matchesSearch && matchesCategory && matchesTag;
  });

  // Category counts calculated from live database items
  const categoryCounts = useMemo(() => {
    const counts = {};
    blogs.forEach((b) => {
      const cat = b.category || 'Housing';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [blogs]);

  const categoriesList = useMemo(() => {
    const baseOrder = ['Office', 'Business', 'Luxury Villa', 'Apartments', 'Duplex House', 'Housing', 'Investment', 'Lifestyle'];
    const present = Object.keys(categoryCounts);
    const ordered = baseOrder.filter((c) => present.includes(c));
    const extras = present.filter((c) => !baseOrder.includes(c));
    return ['All', ...ordered, ...extras];
  }, [categoryCounts]);

  // Dynamic tags cloud from blog keywords
  const popularTags = useMemo(() => {
    const freq = {};
    blogs.forEach((b) => {
      (b.tags || []).forEach((t) => {
        const clean = t.trim();
        if (!clean) return;
        freq[clean] = (freq[clean] || 0) + 1;
      });
    });
    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([tag]) => tag);
  }, [blogs]);

  // Recent posts for sidebar
  const recentPosts = useMemo(() => {
    return [...blogs]
      .sort((a, b) => new Date(b.publishDate || 0) - new Date(a.publishDate || 0))
      .slice(0, 4);
  }, [blogs]);

  const hasActiveFilters = searchTerm !== '' || selectedCategory !== 'All' || !!selectedTag;

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedTag(null);
  };

  return (
    <section className="blog-list-section" aria-label="Utkal Property Real Estate Blog & Market Trends">
      <div className="blog-list-container">

        {/* Left Content Area: Main Blog Feed */}
        <div className="blog-main-content">

          {/* Section Header */}
          <div className="blog-section-header">
            <h1 className="blog-page-title">
              Real Estate <span className="blog-highlight-text">Insights & News</span>
            </h1>

            {/* Grid / List View Toggle Controls */}
            <div className="blog-view-toggle">
              <button
                type="button"
                className={`blog-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </button>

              <button
                type="button"
                className={`blog-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          {/* Active Filters Banner */}
          {hasActiveFilters && (
            <div className="blog-active-filter-bar">
              <div className="blog-active-filter-chips">
                {searchTerm && (
                  <span className="blog-filter-chip">
                    Search: <strong>{searchTerm}</strong>
                    <button onClick={() => setSearchTerm('')} aria-label="Clear search">✕</button>
                  </span>
                )}
                {selectedCategory !== 'All' && (
                  <span className="blog-filter-chip">
                    Category: <strong>{selectedCategory}</strong>
                    <button onClick={() => setSelectedCategory('All')} aria-label="Clear category">✕</button>
                  </span>
                )}
                {selectedTag && (
                  <span className="blog-filter-chip">
                    Tag: <strong>#{selectedTag}</strong>
                    <button onClick={() => setSelectedTag(null)} aria-label="Clear tag">✕</button>
                  </span>
                )}
              </div>
              <button className="blog-clear-all-btn" onClick={clearAllFilters}>Clear All</button>
            </div>
          )}

          {/* Results Count */}
          {!loading && (
            <p className="blog-results-count">
              Showing {filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'}
            </p>
          )}

          {/* Dynamic Blog Posts List */}
          <div className={`blog-posts-wrapper ${viewMode}-view`}>
            {loading ? (
              <div className="blog-loading-state">
                <div className="blog-spinner"></div>
                <p>Loading real estate blogs...</p>
              </div>
            ) : filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => {
                const blogId = blog._id || blog.id;
                const coverImage = getImageUrl(blog.blogImage);
                const detailUrl = `/blog-details/${blogId}`;

                return (
                  <article className="blog-post-card" key={blogId}>
                    {/* Clickable Image Banner */}
                    <Link to={detailUrl} className="blog-image-wrapper" tabIndex={-1} aria-hidden="true">
                      <img
                        src={coverImage}
                        alt={blog.title || "Real Estate Blog"}
                        className="blog-featured-image"
                        loading="lazy"
                      />
                      <div className="blog-category-badge">
                        <span className="blog-badge-date">
                          {blog.publishDate ? new Date(blog.publishDate).toLocaleString('default', { month: 'short' }) : 'Recent'}
                        </span>
                        <span className="blog-badge-category">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                          </svg>
                          {blog.category || 'Housing'}
                        </span>
                      </div>
                    </Link>

                    {/* Content Section */}
                    <div className="blog-content-wrapper">
                      <h2 className="blog-post-title">
                        <Link to={detailUrl} className="blog-post-link">
                          {blog.title}
                        </Link>
                      </h2>

                      <p className="blog-post-snippet">
                        {blog.shortDesc || (blog.content ? blog.content.substring(0, 150) + '...' : '')}
                      </p>

                      {/* Meta & Read More Button */}
                      <div className="blog-post-footer">
                        <div className="blog-post-meta">
                          <span className="blog-meta-author">By {blog.author || 'Utkal Property'}</span>
                          {blog.publishDate && <span className="blog-meta-date">• {blog.publishDate}</span>}
                        </div>
                        <Link to={detailUrl} className="blog-read-more-btn">
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="blog-empty-state">
                <h3>No Blog Posts Found</h3>
                <p>Try clearing your search filters or browse another category from the sidebar.</p>
                {hasActiveFilters && (
                  <button className="blog-empty-reset-btn" onClick={clearAllFilters}>Reset All Filters</button>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Right Sidebar Area */}
        <aside className="blog-sidebar" aria-label="Sidebar Widgets">

          {/* Search Widget */}
          <div className="blog-widget search-widget">
            <h3 className="blog-widget-title">Search Articles</h3>
            <div className="blog-search-box">
              <svg className="blog-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                className="blog-search-input"
                placeholder="Search keywords, localities..."
                aria-label="Search blog posts"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button className="blog-search-clear" onClick={() => setSearchTerm('')}>✕</button>
              )}
            </div>
          </div>

          {/* Interactive Categories Widget */}
          <div className="blog-widget categories-widget">
            <h3 className="blog-widget-title">Categories</h3>
            <ul className="blog-category-list">
              {categoriesList.map((cat, idx) => {
                const count = cat === 'All' ? blogs.length : (categoryCounts[cat] || 0);
                return (
                  <li key={idx}>
                    <button
                      type="button"
                      className={`blog-category-item ${selectedCategory === cat ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      <span className="blog-category-name">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                        {cat}
                      </span>
                      <span className="blog-category-count">{count}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Popular Tags Widget */}
          {popularTags.length > 0 && (
            <div className="blog-widget tags-widget">
              <h3 className="blog-widget-title">Popular Tags</h3>
              <div className="blog-tags-cloud">
                {popularTags.map((tag, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`blog-tag-chip ${selectedTag === tag ? 'active' : ''}`}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recent Posts Widget (Clickable Link Items) */}
          {recentPosts.length > 0 && (
            <div className="blog-widget recent-widget">
              <h3 className="blog-widget-title">Recent Posts</h3>
              <ul className="blog-recent-list">
                {recentPosts.map((blog) => {
                  const blogId = blog._id || blog.id;
                  const detailUrl = `/blog-details/${blogId}`;

                  return (
                    <li className="blog-recent-item" key={blogId}>
                      <Link to={detailUrl} className="blog-recent-link">
                        <img
                          src={getImageUrl(blog.blogImage)}
                          alt={blog.title}
                          className="blog-recent-thumb"
                          loading="lazy"
                        />
                        <div className="blog-recent-info">
                          <p className="blog-recent-title">{blog.title}</p>
                          <span className="blog-recent-date">{blog.publishDate || 'Recent'}</span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

        </aside>

      </div>
    </section>
  );
};

export default Bloglist;