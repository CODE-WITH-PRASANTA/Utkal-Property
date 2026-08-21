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

  // Sidebar dynamic state
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
      <article className="BlogDetails-section">
        <div className="BlogDetails-container">
          <main className="BlogDetails-main-content">
            <div className="BlogDetails-status-box">
              <div className="BlogDetails-spinner"></div>
              <p className="BlogDetails-status-text">Loading article...</p>
            </div>
          </main>
        </div>
      </article>
    );
  }

  if (notFound || !blog) {
    return (
      <article className="BlogDetails-section">
        <div className="BlogDetails-container">
          <main className="BlogDetails-main-content">
            <div className="BlogDetails-status-box BlogDetails-not-found-box">
              <h2 className="BlogDetails-not-found-title">Article Not Found</h2>
              <p className="BlogDetails-not-found-text">This post may have been unpublished or removed.</p>
              <Link to="/blog" className="BlogDetails-back-link">← Back to Blog List</Link>
            </div>
          </main>
        </div>
      </article>
    );
  }

  return (
    <article className="BlogDetails-section">
      <div className="BlogDetails-container">
        
        {/* Main Article Body */}
        <main className="BlogDetails-main-content">
          <header className="BlogDetails-header">
            <h1 className="BlogDetails-title">{blog.title}</h1>
            
            <div className="BlogDetails-meta-row">
              <span className="BlogDetails-meta-item">
                <i className="far fa-user BlogDetails-meta-icon"></i> 
                <span>{blog.author || 'Utkal Property Consultant'}</span>
              </span>
              <span className="BlogDetails-meta-item">
                <i className="far fa-folder BlogDetails-meta-icon"></i> 
                <span>{blog.category || 'Housing'}</span>
              </span>
              {Array.isArray(blog.tags) && blog.tags.length > 0 && (
                <span className="BlogDetails-meta-item">
                  <i className="far fa-tags BlogDetails-meta-icon"></i> 
                  <span>{blog.tags.join(', ')}</span>
                </span>
              )}
              <span className="BlogDetails-meta-item">
                <i className="far fa-calendar BlogDetails-meta-icon"></i> 
                <span>{formatDate(blog.publishDate)}</span>
              </span>
            </div>
          </header>

          <div className="BlogDetails-body">
            {blog.shortDesc && (
              <p className="BlogDetails-lead-text">{blog.shortDesc}</p>
            )}

            <div className="BlogDetails-image-container">
              <img 
                src={getImageUrl(blog.blogImage)} 
                alt={blog.title} 
                className="BlogDetails-featured-image" 
              />
            </div>

            <div className="BlogDetails-article-text">
              {(blog.content || '').split('\n').map((para, idx) =>
                para.trim() ? <p key={idx}>{para}</p> : null
              )}
            </div>
          </div>
        </main>

        {/* Sidebar */}
        <aside className="BlogDetails-sidebar">
          
          {/* Search Widget */}
          <div className="BlogDetails-widget BlogDetails-search-widget">
            <h3 className="BlogDetails-widget-title">Search</h3>
            <form className="BlogDetails-search-form" onSubmit={handleSearchSubmit} role="search">
              <i className="fas fa-search BlogDetails-search-icon"></i>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search properties, blogs..."
                className="BlogDetails-search-input"
                aria-label="Search"
              />
              <button type="submit" className="BlogDetails-search-btn" aria-label="Submit search">
                <i className="fas fa-arrow-right"></i>
              </button>
            </form>
          </div>

          {/* Categories Widget */}
          <div className="BlogDetails-widget BlogDetails-categories-widget">
            <h3 className="BlogDetails-widget-title">Categories</h3>

            {sidebarLoading && <p className="BlogDetails-widget-status">Loading categories...</p>}
            {!sidebarLoading && sidebarError && (
              <p className="BlogDetails-widget-status">Categories unavailable right now.</p>
            )}
            {!sidebarLoading && !sidebarError && categories.length === 0 && (
              <p className="BlogDetails-widget-status">No categories yet.</p>
            )}

            {!sidebarLoading && !sidebarError && categories.length > 0 && (
              <ul className="BlogDetails-category-list">
                {categories.map(([cat, count]) => (
                  <li key={cat} className="BlogDetails-category-item">
                    <Link to={`/blog?category=${encodeURIComponent(cat)}`} className="BlogDetails-category-link">
                      <span className="BlogDetails-category-name">{cat}</span>
                      <span className="BlogDetails-category-count">{count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Featured Listings Widget */}
          <div className="BlogDetails-widget BlogDetails-featured-widget">
            <h3 className="BlogDetails-widget-title">Featured Listings</h3>

            {sidebarLoading && <p className="BlogDetails-widget-status">Loading listings...</p>}
            {!sidebarLoading && sidebarError && (
              <p className="BlogDetails-widget-status">Listings unavailable right now.</p>
            )}
            {!sidebarLoading && !sidebarError && featuredListings.length === 0 && (
              <p className="BlogDetails-widget-status">No other posts yet.</p>
            )}

            {!sidebarLoading &&
              !sidebarError &&
              featuredListings.map((item) => (
                <Link
                  to={`/blog-details/${item._id || item.id}`}
                  className="BlogDetails-featured-item"
                  key={item._id || item.id}
                >
                  <img
                    src={getImageUrl(item.blogImage)}
                    alt={item.title}
                    className="BlogDetails-featured-thumb"
                  />
                  <div className="BlogDetails-featured-info">
                    <h4 className="BlogDetails-featured-title">{item.title}</h4>
                    <span className="BlogDetails-featured-date">{formatDate(item.publishDate)}</span>
                  </div>
                </Link>
              ))}
          </div>

          {/* Consultant Quick Card */}
          <div className="BlogDetails-widget BlogDetails-consultant-card">
            <div className="BlogDetails-verified-badge">Verified Consultant</div>
            <h3 className="BlogDetails-consultant-title">Utkal Property</h3>
            <p className="BlogDetails-consultant-tagline">Best Property Consultant in Bhubaneswar</p>
            <p className="BlogDetails-consultant-address">
              <strong>Address:</strong> Plot No-55, Ln 2, Jagannath Vihar, Baramunda, Bhubaneswar, Odisha 751003
            </p>
            <p className="BlogDetails-consultant-phone">
              <strong>Phone:</strong> <a href="tel:09861566735">098615 66735</a>
            </p>
            <div className="BlogDetails-rating-pill">★ 4.4 (47 Google Reviews)</div>
          </div>
        </aside>

      </div>
    </article>
  );
};

export default BlogDetails;