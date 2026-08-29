import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './BlogManagement.css';
import API, { IMG_URL } from '../../api/axios';

const BlogManagement = () => {
  const navigate = useNavigate();

  // Database State
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewingBlog, setViewingBlog] = useState(null); // Preview Modal State

  // View Mode & Filter States
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedAuthor, setSelectedAuthor] = useState('All Authors');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedDate, setSelectedDate] = useState('');

  // --- Fetch Blogs from MongoDB Backend ---
  const fetchBlogs = async (isManualRefresh = false) => {
    try {
      setLoading(true);
      const res = await API.get('/blogs');
      if (res && res.data && res.data.success) {
        setBlogs(res.data.data);
        if (isManualRefresh) {
          alert('Blogs refreshed successfully!');
        }
      }
    } catch (err) {
      console.error('Failed to fetch blogs in BlogManagement:', err);
      alert('Failed to load blog posts from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Helper to resolve cover image path
  const getImageUrl = (imgObj) => {
    if (!imgObj) return 'https://via.placeholder.com/400x250?text=No+Cover+Image';
    if (imgObj.startsWith('http') || imgObj.startsWith('data:')) return imgObj;
    return `${IMG_URL}${imgObj.startsWith('/') ? '' : '/'}${imgObj}`;
  };

  // Helper for Category Badge Class
  const getCategoryClass = (cat) => {
    switch (cat) {
      case 'Housing': return 'cat-housing';
      case 'Business': return 'cat-business';
      case 'Apartments': return 'cat-apartments';
      case 'Luxury Villa': return 'cat-villa';
      case 'Duplex House': return 'cat-duplex';
      default: return 'cat-housing';
    }
  };

  // --- Dynamic Authors List (Extracted strictly from fetched DB records) ---
  const uniqueAuthors = Array.from(
    new Set(blogs.map((b) => b.author?.trim()).filter(Boolean))
  );

  // --- Actions ---
  const handleViewAction = (blog) => {
    setViewingBlog(blog);
  };

  // STEP 2: Id-wise redirect to BlogPosting for editing
  const handleEditAction = (blog) => {
    const blogId = blog._id || blog.id;
    if (!blogId) {
      alert('This blog post has no valid ID and cannot be edited.');
      return;
    }
    navigate(`/blogposting/${blogId}`);
  };

  const handleDeleteAction = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post from database?')) {
      try {
        setLoading(true);
        const res = await API.delete(`/blogs/${id}`);
        if (res.data.success) {
          alert('Blog post deleted successfully!');
          await fetchBlogs();
        }
      } catch (err) {
        console.error('Error deleting blog:', err);
        alert('Failed to delete blog post.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSelectedAuthor('All Authors');
    setSelectedStatus('All Status');
    setSelectedDate('');
  };

  // --- Real-time Filtering Logic ---
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      searchQuery === '' ||
      blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.shortDesc?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All Categories' || blog.category === selectedCategory;

    // Strict author filtering using exact database author string
    const matchesAuthor =
      selectedAuthor === 'All Authors' || blog.author === selectedAuthor;

    const matchesStatus =
      selectedStatus === 'All Status' ||
      (blog.status || 'Published').toLowerCase() === selectedStatus.toLowerCase();

    const matchesDate =
      selectedDate === '' || (blog.publishDate && blog.publishDate.includes(selectedDate));

    return matchesSearch && matchesCategory && matchesAuthor && matchesStatus && matchesDate;
  });

  return (
    <div className="bm-container">
      {/* Redesigned Toolbar */}
      <div className="bm-toolbar-container">
        <div className="bm-main-toolbar">
          {/* Search Input */}
          <div className="bm-search-wrapper">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bm-search-field"
            />
            <span className="bm-search-icon-right">🔍</span>
          </div>

          {/* Category Filter */}
          <div className="bm-select-wrapper">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bm-dropdown-select"
            >
              <option value="All Categories">All Categories</option>
              <option value="Housing">Housing</option>
              <option value="Business">Business</option>
              <option value="Apartments">Apartments</option>
              <option value="Luxury Villa">Luxury Villa</option>
              <option value="Duplex House">Duplex House</option>
              <option value="Investment">Investment</option>
              <option value="Lifestyle">Lifestyle</option>
            </select>
          </div>

          {/* Author Filter */}
          <div className="bm-select-wrapper">
            <select
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
              className="bm-dropdown-select"
            >
              <option value="All Authors">All Authors</option>
              {uniqueAuthors.map((authorName, idx) => (
                <option key={idx} value={authorName}>
                  {authorName}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="bm-select-wrapper">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bm-dropdown-select"
            >
              <option value="All Status">All Status</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          {/* Date Picker */}
          <div className="bm-date-wrapper">
            <input
              type="text"
              placeholder="Select Date"
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => {
                if (!e.target.value) e.target.type = 'text';
              }}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bm-date-field"
            />
            <span className="bm-calendar-icon">📅</span>
          </div>

          {/* View Toggle Buttons */}
          <div className="bm-view-toggle-buttons">
            <button
              className={`bm-toggle-view-btn ${viewMode === 'list' ? 'selected' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <span className="bm-btn-icon">☰</span> List View
            </button>
            <button
              className={`bm-toggle-view-btn ${viewMode === 'grid' ? 'selected' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <span className="bm-btn-icon">☷</span> Grid View
            </button>
          </div>
        </div>

        {/* Action Controls */}
        <div className="bm-action-sub-row">
          <button
            className="bm-utility-btn"
            disabled={loading}
            onClick={() => fetchBlogs(true)}
          >
            <span className="bm-btn-icon">⏳</span> {loading ? 'Refreshing...' : 'Refresh'}
          </button>
          <button className="bm-utility-btn" onClick={handleReset}>
            <span className="bm-btn-icon">🔄</span> Reset Filters
          </button>
        </div>
      </div>

      {/* Conditionally Render List View or Grid View */}
      {viewMode === 'list' ? (
        <div className="bm-table-wrapper">
          <table className="bm-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}>
                  <input type="checkbox" className="bm-checkbox" />
                </th>
                <th style={{ width: '40px' }}>#</th>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Publish Date</th>
                <th>Status</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog, idx) => (
                  <tr key={blog._id || blog.id}>
                    <td>
                      <input type="checkbox" className="bm-checkbox" />
                    </td>
                    <td>{idx + 1}</td>
                    <td>
                      <img
                        src={getImageUrl(blog.blogImage)}
                        alt={blog.title}
                        className="bm-table-img"
                      />
                    </td>
                    <td className="bm-table-title">{blog.title}</td>
                    <td>
                      <span className={`bm-badge ${getCategoryClass(blog.category)}`}>
                        {blog.category}
                      </span>
                    </td>
                    <td>
                      <div className="bm-author-cell">
                        <img
                          src="https://i.pravatar.cc/150?img=11"
                          alt={blog.author}
                          className="bm-avatar"
                        />
                        <span>{blog.author || 'Admin User'}</span>
                      </div>
                    </td>
                    <td className="bm-table-date">
                      <div>{blog.publishDate || '—'}</div>
                      <small>{blog.publishTime || ''}</small>
                    </td>
                    <td>
                      <span className={`bm-status-label ${(blog.status || 'Published').toLowerCase()}`}>
                        {blog.status || 'Published'}
                      </span>
                    </td>
                    <td>
                      {blog.featuredPost ? (
                        <span className="bm-check-icon">✅</span>
                      ) : (
                        <span className="bm-dash-icon">—</span>
                      )}
                    </td>
                    <td>
                      <div className="bm-actions">
                        <button
                          className="bm-action-btn view"
                          title="Preview Blog"
                          onClick={() => handleViewAction(blog)}
                        >
                          👁️
                        </button>
                        <button
                          className="bm-action-btn edit"
                          title="Edit Blog"
                          onClick={() => handleEditAction(blog)}
                        >
                          📝
                        </button>
                        <button
                          className="bm-action-btn delete"
                          title="Delete Blog"
                          onClick={() => handleDeleteAction(blog._id || blog.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                    {loading ? 'Loading blog posts from database...' : 'No blog posts found matching criteria.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* List Footer */}
          <div className="bm-footer">
            <span className="bm-footer-info">
              Showing {filteredBlogs.length} blog post(s)
            </span>
          </div>
        </div>
      ) : (
        /* Grid View Wrapper */
        <div className="bm-grid-wrapper">
          {filteredBlogs.length > 0 ? (
            <div className="bm-grid">
              {filteredBlogs.map((blog) => (
                <div className="bm-card" key={blog._id || blog.id}>
                  <div className="bm-card-banner">
                    <img
                      src={getImageUrl(blog.blogImage)}
                      alt={blog.title}
                      className="bm-card-img"
                    />
                    <span className={`bm-badge bm-card-badge ${getCategoryClass(blog.category)}`}>
                      {blog.category}
                    </span>
                  </div>

                  <div className="bm-card-body">
                    <div className="bm-card-date">📅 {blog.publishDate || '31 Jul 2026'}</div>
                    <h3 className="bm-card-title">{blog.title}</h3>
                    <p className="bm-card-desc">{blog.shortDesc}</p>
                  </div>

                  <div className="bm-card-footer">
                    <div className="bm-author-cell">
                      <img
                        src="https://i.pravatar.cc/150?img=11"
                        alt={blog.author}
                        className="bm-avatar"
                      />
                      <span>{blog.author || 'Admin User'}</span>
                    </div>
                    <div className="bm-actions">
                      <button
                        className="bm-action-btn view"
                        title="Preview Blog"
                        onClick={() => handleViewAction(blog)}
                      >
                        👁️
                      </button>
                      <button
                        className="bm-action-btn edit"
                        title="Edit Blog"
                        onClick={() => handleEditAction(blog)}
                      >
                        📝
                      </button>
                      <button
                        className="bm-action-btn delete"
                        title="Delete Blog"
                        onClick={() => handleDeleteAction(blog._id || blog.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
              {loading ? 'Loading blog posts from server...' : 'No blog posts found matching criteria.'}
            </div>
          )}
        </div>
      )}

      {/* Modal Preview */}
      {viewingBlog && (
        <div className="bm-modal-overlay" onClick={() => setViewingBlog(null)}>
          <div className="bm-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="bm-modal-header">
              <h4>Preview Blog Post</h4>
              <button className="bm-modal-close" onClick={() => setViewingBlog(null)}>
                ✕
              </button>
            </div>
            <div className="bm-modal-body">
              <img
                src={getImageUrl(viewingBlog.blogImage)}
                alt={viewingBlog.title}
                className="bm-modal-image"
                style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '8px' }}
              />
              <span className={`bm-badge ${getCategoryClass(viewingBlog.category)}`} style={{ marginTop: '12px', display: 'inline-block' }}>
                {viewingBlog.category}
              </span>
              <h2 style={{ margin: '12px 0 8px 0', fontSize: '20px' }}>{viewingBlog.title}</h2>
              <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '16px' }}>
                By <strong>{viewingBlog.author || 'Admin User'}</strong> • {viewingBlog.publishDate}
              </div>
              <p style={{ fontSize: '13px', marginBottom: '12px' }}>
                <strong>Excerpt:</strong> {viewingBlog.shortDesc}
              </p>
              <div style={{ fontSize: '13px', lineHeight: '1.6', whiteSpace: 'pre-wrap', background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                {viewingBlog.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManagement;