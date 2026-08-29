import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomeBlog.css';
import API, { IMG_URL } from "../../api/axios";
import { FiFolder, FiArrowRight } from 'react-icons/fi';

const HomeBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const DEFAULT_IMG = 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800';

  const getImageUrl = (post) => {
    const imgObj = post.blogImage; 
    if (!imgObj) return DEFAULT_IMG;

    let path = typeof imgObj === 'object' ? (imgObj.url || imgObj.path || imgObj.secure_url || '') : imgObj;
    if (!path || typeof path !== 'string') return DEFAULT_IMG;

    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
      return path;
    }

    const baseUrl = (IMG_URL || '').replace(/\/+$/, '');
    const cleanPath = path.replace(/^\/+/, '');
    return baseUrl ? `${baseUrl}/${cleanPath}` : `/${cleanPath}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recent';
    const parsedDate = new Date(dateString);
    if (isNaN(parsedDate.getTime())) return dateString;
    return parsedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  useEffect(() => {
    const fetchHomeBlogs = async () => {
      try {
        setLoading(true);
        const res = await API.get('/blogs');

        if (res?.data?.success) {
          const allBlogs = res.data.data || [];
          let filtered = allBlogs.filter((b) => (b.status ? b.status.toLowerCase() === 'published' : true) && b.showOnHomepage);

          if (filtered.length === 0) {
            filtered = allBlogs.filter((b) => (b.status ? b.status.toLowerCase() === 'published' : true)).slice(0, 3);
          } else {
            filtered = filtered.slice(0, 3);
          }

          setBlogs(filtered);
        }
      } catch (err) {
        console.error('Failed to fetch home blogs:', err);
        setError('Failed to load blog posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchHomeBlogs();
  }, []);

  return (
    <section className="HomeBlog">
      <div className="HomeBlog-container">
        <div className="HomeBlog-header">
          <span className="HomeBlog-tag">Utkal Property Insights</span>
          <h1 className="HomeBlog-main-title">
            Premium Apartments and Flats Dealer in Bhubaneswar
          </h1>
          <p className="HomeBlog-subtitle">
            Explore verified listings, market trends, and expert real estate advice from Bhubaneswar’s trusted property dealers.
          </p>
        </div>

        {loading && <div style={{ textAlign: 'center', padding: '40px 0' }}>Loading latest blogs...</div>}
        {error && !loading && <div style={{ textAlign: 'center', padding: '40px 0', color: '#ef4444' }}>{error}</div>}

        {!loading && !error && (
          <div className="HomeBlog-grid">
            {blogs.length > 0 ? (
              blogs.map((post) => {
                const targetId = post._id || post.id;
                return (
                  <article key={targetId} className="HomeBlog-card">
                    <div className="HomeBlog-img-wrapper">
                      <img
                        src={getImageUrl(post)}
                        alt={post.title || 'Blog Post'}
                        className="HomeBlog-img"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = DEFAULT_IMG;
                        }}
                      />
                      
                      <div className="HomeBlog-badge">
                        <span className="HomeBlog-badge-date">{formatDate(post.publishDate)}</span>
                        <span className="HomeBlog-badge-divider"></span>
                        <span className="HomeBlog-badge-category">
                          <FiFolder className="HomeBlog-folder-icon" />
                          {post.category || 'Real Estate'}
                        </span>
                      </div>
                    </div>

                    <div className="HomeBlog-card-body">
                      <h3 className="HomeBlog-card-title">{post.title}</h3>
                      {post.shortDesc && (
                        <p className="HomeBlog-card-desc" style={{ color: '#64748b', fontSize: '0.9rem', margin: '8px 0 14px' }}>
                          {post.shortDesc.length > 90 ? `${post.shortDesc.slice(0, 90)}...` : post.shortDesc}
                        </p>
                      )}
                      
                      {/* FIXED: Link points directly to /blog/:id */}
                      <Link to={`/blog/${targetId}`} className="HomeBlog-read-more">
                        Read More <FiArrowRight className="HomeBlog-arrow-icon" />
                      </Link>
                    </div>
                  </article>
                );
              })
            ) : (
              <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '30px 0' }}>
                No published articles available right now.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeBlog;