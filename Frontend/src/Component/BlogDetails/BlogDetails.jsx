import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './BlogDetails.css';
import API, { IMG_URL } from '../../api/axios';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Sidebar data — driven by real backend content instead of static markup
  const [allBlogs, setAllBlogs] = useState([]);
  const [sidebarLoading, setSidebarLoading] = useState(true);
  const [sidebarError, setSidebarError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getImageUrl = (imgPath) => {
    if (!imgPath) {
      return 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80';
    }
    if (imgPath.startsWith('http://') || imgPath.startsWith('https://') || imgPath.startsWith('data:')) {
      return imgPath;
    }
    const cleanPath = imgPath.replace(/\\/g, '/');
    const baseUrl = (IMG_URL || 'http://localhost:5000').replace(/\/+$/, '');
    return `${baseUrl}${cleanPath.startsWith('/') ? '' : '/'}${cleanPath}`;
  };

  const fetchBlogById = async () => {
    if (!id) return;
    try {
      setLoading(true);
      setNotFound(false);

      const res = await API.get(`/blogs/${id}`);

      if (res.data && res.data.success) {
        const data = res.data.data;
        if (data.status && data.status.toLowerCase() !== 'published') {
          setNotFound(true);
          setBlog(null);
        } else {
          setBlog(data);
        }
      } else {
        setNotFound(true);
      }
    } catch (err) {
      console.error('Failed to fetch blog details by id:', err);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the published blog list once — powers Categories (derived counts)
  // and Featured listings (most recent, excluding the post being read)
  const fetchSidebarData = async () => {
    try {
      setSidebarLoading(true);
      setSidebarError(false);

      const res = await API.get('/blogs', { params: { status: 'published', limit: 100 } });

      if (res.data && res.data.success) {
        setAllBlogs(Array.isArray(res.data.data) ? res.data.data : []);
      } else {
        setSidebarError(true);
      }
    } catch (err) {
      console.error('Failed to fetch sidebar blog data:', err);
      setSidebarError(true);
    } finally {
      setSidebarLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogById();
    fetchSidebarData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // Categories with live counts, sorted by popularity
  const categories = useMemo(() => {
    const counts = {};
    allBlogs.forEach((b) => {
      const cat = (b.category || 'Housing').trim();
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);
  }, [allBlogs]);

  // Most recent posts, excluding the one currently open
  const featuredListings = useMemo(() => {
    return allBlogs
      .filter((b) => String(b._id || b.id) !== String(id))
      .sort((a, b) => new Date(b.publishDate || 0) - new Date(a.publishDate || 0))
      .slice(0, 3);
  }, [allBlogs, id]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = searchTerm.trim();
    navigate(q ? `/blog?search=${encodeURIComponent(q)}` : '/blog');
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('default', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <article className="utkal-blog-details-container">
        <div className="utkal-blog-content-wrapper">
          <main className="utkal-blog-main">
            <p className="utkal-status-text">Loading article...</p>
          </main>
        </div>
      </article>
    );
  }

  if (notFound || !blog) {
    return (
      <article className="utkal-blog-details-container">
        <div className="utkal-blog-content-wrapper">
          <main className="utkal-blog-main">
            <div className="utkal-status-text">
              <h2 style={{ color: '#0f172a', marginBottom: '10px' }}>Article Not Found</h2>
              <p>This post may have been unpublished or removed.</p>
              <Link to="/blog" className="utkal-back-link">← Back to Blog List</Link>
            </div>
          </main>
        </div>
      </article>
    );
  }

  return (
    <article className="utkal-blog-details-container">
      <div className="utkal-blog-content-wrapper">
        {/* Main Blog Section */}
        <main className="utkal-blog-main">
          <header className="utkal-blog-header">
            <h1 className="utkal-blog-title">{blog.title}</h1>
            <div className="utkal-blog-meta">
              <span className="utkal-meta-item">
                <i className="far fa-user"></i> {blog.author || 'Utkal Property Consultant'}
              </span>
              <span className="utkal-meta-item">
                <i className="far fa-folder"></i> {blog.category || 'Housing'}
              </span>
              {Array.isArray(blog.tags) && blog.tags.length > 0 && (
                <span className="utkal-meta-item">
                  <i className="far fa-tags"></i> {blog.tags.join(', ')}
                </span>
              )}
              <span className="utkal-meta-item">
                <i className="far fa-calendar"></i> {formatDate(blog.publishDate)}
              </span>
            </div>
          </header>

          <div className="utkal-blog-body">
            {blog.shortDesc && <p className="utkal-lead-text">{blog.shortDesc}</p>}

            <div className="utkal-blog-image-container">
              <img src={getImageUrl(blog.blogImage)} alt={blog.title} className="utkal-featured-image" />
            </div>

            {(blog.content || '').split('\n').map((para, idx) =>
              para.trim() ? <p key={idx}>{para}</p> : null
            )}
          </div>
        </main>

        {/* Sidebar Section */}
        <aside className="utkal-blog-sidebar">
          {/* Search Widget */}
          <div className="utkal-sidebar-widget utkal-search-widget">
            <h3 className="utkal-widget-title">Search</h3>
            <form className="utkal-search-box" onSubmit={handleSearchSubmit} role="search">
              <i className="fas fa-search utkal-search-icon"></i>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search properties, blogs..."
                className="utkal-search-input"
                aria-label="Search"
              />
              <button type="submit" className="utkal-search-submit" aria-label="Submit search">
                <i className="fas fa-arrow-right"></i>
              </button>
            </form>
          </div>

          {/* Categories Widget */}
          <div className="utkal-sidebar-widget utkal-categories-widget">
            <h3 className="utkal-widget-title">Categories</h3>

            {sidebarLoading && <p className="utkal-widget-status">Loading categories...</p>}
            {!sidebarLoading && sidebarError && (
              <p className="utkal-widget-status">Categories unavailable right now.</p>
            )}
            {!sidebarLoading && !sidebarError && categories.length === 0 && (
              <p className="utkal-widget-status">No categories yet.</p>
            )}

            {!sidebarLoading && !sidebarError && categories.length > 0 && (
              <ul className="utkal-category-list">
                {categories.map(([cat, count]) => (
                  <li key={cat}>
                    <Link to={`/blog?category=${encodeURIComponent(cat)}`}>
                      <span>{cat}</span>
                      <span className="utkal-count-pill">{count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Featured Listings Widget */}
          <div className="utkal-sidebar-widget utkal-featured-widget">
            <h3 className="utkal-widget-title">Featured listings</h3>

            {sidebarLoading && <p className="utkal-widget-status">Loading listings...</p>}
            {!sidebarLoading && sidebarError && (
              <p className="utkal-widget-status">Listings unavailable right now.</p>
            )}
            {!sidebarLoading && !sidebarError && featuredListings.length === 0 && (
              <p className="utkal-widget-status">No other posts yet.</p>
            )}

            {!sidebarLoading &&
              !sidebarError &&
              featuredListings.map((item) => (
                <Link
                  to={`/blog/${item._id || item.id}`}
                  className="utkal-featured-item"
                  key={item._id || item.id}
                >
                  <img
                    src={getImageUrl(item.blogImage)}
                    alt={item.title}
                    className="utkal-featured-thumb"
                  />
                  <div className="utkal-featured-info">
                    <h4>{item.title}</h4>
                    <span className="utkal-price">{formatDate(item.publishDate)}</span>
                  </div>
                </Link>
              ))}
          </div>

          {/* Business Info Quick Card */}
          <div className="utkal-sidebar-widget utkal-consultant-card">
            <div className="utkal-verified-ribbon">Verified Consultant</div>
            <h3 className="utkal-widget-title">Utkal Property</h3>
            <p className="utkal-consultant-tagline">Best Property Consultant in Bhubaneswar</p>
            <p className="utkal-consultant-address">
              <strong>Address:</strong> Plot No-55, Ln 2, Jagannath Vihar, Baramunda, Bhubaneswar, Odisha 751003
            </p>
            <p className="utkal-consultant-phone">
              <strong>Phone:</strong> <a href="tel:09861566735">098615 66735</a>
            </p>
            <div className="utkal-rating-badge">★ 4.4 (47 Google Reviews)</div>
          </div>
        </aside>
      </div>
    </article>
  );
};

export default BlogDetails;