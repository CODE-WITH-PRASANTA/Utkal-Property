import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './BlogPosting.css';
import API, { IMG_URL } from '../../api/axios';


const BlogPosting = () => {
  
  const navigate = useNavigate();
const { id } = useParams();
  // --- Form & Edit State ---
  const [editingId, setEditingId] = useState(null);
  const [blogImage, setBlogImage] = useState('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80');
  const [selectedFile, setSelectedFile] = useState(null);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Housing');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [author, setAuthor] = useState('Admin User');
  const [publishDate, setPublishDate] = useState('2026-07-31');
  const [publishTime, setPublishTime] = useState('10:30');
  const [shortDesc, setShortDesc] = useState('');
  const [content, setContent] = useState('');

  const [metaTitle, setMetaTitle] = useState('');
  const [metaDesc, setMetaDescription] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');

  const [featuredPost, setFeaturedPost] = useState(false);
  const [showOnHomepage, setShowOnHomepage] = useState(false);
  const [allowComments, setAllowComments] = useState(true);

  // Modal & Loading States
  const [viewingBlog, setViewingBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fileInputRef = useRef(null);
  const contentTextareaRef = useRef(null);

  // Database State
  const [blogs, setBlogs] = useState([]);
  const fetchBlogById = async () => {
  if (!id) return;

  try {
    setLoading(true);

    const res = await API.get(`/blogs/${id}`);

    if (res.data.success) {
      const blog = res.data.data;

      setEditingId(blog._id);

      setBlogImage(getImageUrl(blog.blogImage));
      setSelectedFile(null);

      setTitle(blog.title || "");
      setSlug(blog.slug || "");
      setCategory(blog.category || "Housing");

      setTags(Array.isArray(blog.tags) ? blog.tags : []);

      setAuthor(blog.author || "Admin User");
      setPublishDate(blog.publishDate || "");
      setPublishTime(blog.publishTime || "");

      setShortDesc(blog.shortDesc || "");
      setContent(blog.content || "");

      setMetaTitle(blog.metaTitle || "");
      setMetaDescription(blog.metaDesc || "");
      setMetaKeywords(blog.metaKeywords || "");

      setFeaturedPost(Boolean(blog.featuredPost));
      setShowOnHomepage(Boolean(blog.showOnHomepage));
      setAllowComments(Boolean(blog.allowComments));
    }
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  // --- Fetch Blogs from Backend API ---
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      // Hits http://localhost:5000/api/blogs
      const res = await API.get('/blogs');
      if (res && res.data && res.data.success) {
        setBlogs(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch blogs from API:', err);
    } finally {
      setLoading(false);
    }
  };
useEffect(() => {
  fetchBlogs();

  if (id) {
    fetchBlogById();
  }
}, [id]);

  // Category Theme Helper
  const getCategoryTheme = (catName) => {
    switch (catName) {
      case 'Housing': return { bg: '#fef3c7', text: '#92400e' };
      case 'Business': return { bg: '#e0e7ff', text: '#3730a3' };
      case 'Apartments': return { bg: '#f3e8ff', text: '#6b21a8' };
      case 'Luxury Villa': return { bg: '#dcfce7', text: '#166534' };
      case 'Duplex House': return { bg: '#ffedd5', text: '#9a3412' };
      case 'Investment': return { bg: '#fee2e2', text: '#991b1b' };
      default: return { bg: '#e0f2fe', text: '#075985' };
    }
  };

  // Image URL Resolver
  const getImageUrl = (imgObj) => {
    if (!imgObj) return 'https://via.placeholder.com/800x400?text=No+Cover+Image';
    if (imgObj.startsWith('http') || imgObj.startsWith('data:')) return imgObj;
    return `${IMG_URL}${imgObj.startsWith('/') ? '' : '/'}${imgObj}`;
  };

  // --- Image Handlers ---
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setBlogImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setBlogImage('https://via.placeholder.com/800x400?text=Upload+Cover+Image');
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // --- Title & Slug Synchronization ---
  const handleTitleChange = (val) => {
    setTitle(val);
    if (!editingId) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      setSlug(generatedSlug);
    }
  };

  // --- Tags Management ---
  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // --- Rich Text Format Helper ---
  const applyTextFormat = (wrapper) => {
    const el = contentTextareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = content.substring(start, end) || 'text';
    const formatted = `${wrapper}${selected}${wrapper}`;
    const newContent = content.substring(0, start) + formatted + content.substring(end);
    setContent(newContent);
  };

  // --- Reset Form ---
  const handleReset = () => {
    setEditingId(null);
    setTitle('');
    setSlug('');
    setCategory('Housing');
    setTags([]);
    setAuthor('Admin User');
    setPublishDate('2026-07-31');
    setPublishTime('10:30');
    setShortDesc('');
    setContent('');
    setMetaTitle('');
    setMetaDescription('');
    setMetaKeywords('');
    setFeaturedPost(false);
    setShowOnHomepage(false);
    setAllowComments(true);
    setBlogImage('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80');
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // --- Save / Update Post via API ---
  const handlePublish = async (statusType = 'Published') => {
    if (!title.trim()) {
      alert('Please enter a blog title!');
      return;
    }
    if (!shortDesc.trim()) {
      alert('Please enter a short description!');
      return;
    }
    if (!content.trim()) {
      alert('Please enter post content!');
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      if (selectedFile) {
        formData.append('blogImage', selectedFile);
      } else {
        formData.append('blogImage', blogImage);
      }

      formData.append('title', title);
      formData.append('slug', slug);
      formData.append('category', category);
      formData.append('tags', JSON.stringify(tags));
      formData.append('author', author || 'Admin User');
      formData.append('publishDate', publishDate || '2026-07-31');
      formData.append('publishTime', publishTime || '10:30');
      formData.append('shortDesc', shortDesc);
      formData.append('content', content);
      formData.append('metaTitle', metaTitle);
      formData.append('metaDesc', metaDesc);
      formData.append('metaKeywords', metaKeywords);
      formData.append('featuredPost', featuredPost);
      formData.append('showOnHomepage', showOnHomepage);
      formData.append('allowComments', allowComments);
      formData.append('status', statusType);

      let res;
      if (editingId) {
        res = await API.put(`/blogs/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        res = await API.post('/blogs', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      if (res.data.success) {
    alert(editingId ? "Blog updated successfully!" : "Blog created successfully!");

    navigate("/blogmanagement", {
        replace: true
    });
}
    } catch (err) {
      console.error('Error publishing blog:', err);
      alert(err.response?.data?.message || 'Failed to save blog post to server.');
    } finally {
      setLoading(false);
    }
  };

  // --- Table Actions ---
  const handleEdit = (blog) => {
    setEditingId(blog._id || blog.id);
    setBlogImage(getImageUrl(blog.blogImage));
    setSelectedFile(null);
    setTitle(blog.title || '');
    setSlug(blog.slug || '');
    setCategory(blog.category || 'Housing');
    setTags(Array.isArray(blog.tags) ? blog.tags : []);
    setAuthor(blog.author || 'Admin User');
    setPublishDate(blog.publishDate || '2026-07-31');
    setPublishTime(blog.publishTime || '10:30');
    setShortDesc(blog.shortDesc || '');
    setContent(blog.content || '');
    setMetaTitle(blog.metaTitle || '');
    setMetaDescription(blog.metaDesc || '');
    setMetaKeywords(blog.metaKeywords || '');
    setFeaturedPost(Boolean(blog.featuredPost));
    setShowOnHomepage(Boolean(blog.showOnHomepage));
    setAllowComments(blog.allowComments !== undefined ? Boolean(blog.allowComments) : true);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        setLoading(true);
        const res = await API.delete(`/blogs/${id}`);
        if (res.data.success) {
          alert('Blog post deleted successfully!');
          await fetchBlogs();
          if (editingId === id) handleReset();
        }
      } catch (err) {
        console.error('Delete error:', err);
        alert('Failed to delete blog post.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleView = (blog) => {
    setViewingBlog(blog);
  };

  // --- Pagination Computations ---
  const totalPages = Math.ceil(blogs.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBlogs = blogs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bm-container">
      <div className="bm-wrapper">
        {/* ================= LEFT SIDE: FORM (50%) ================= */}
        <div className="bm-form-card">
          <div className="bm-card-header">
            <h3>{editingId ? '✏️ Edit Blog Post' : '📝 Create New Blog Post'}</h3>
            {editingId && (
              <span className="bm-editing-badge">Editing Post ID #{String(editingId).slice(-6)}</span>
            )}
          </div>

          {/* Cover Image Upload */}
          <div className="bm-form-group">
            <label className="bm-label">
              Blog Cover Image <span className="bm-required">*</span>
            </label>
            <div
              className="bm-image-dropzone"
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
            >
              <img src={blogImage} alt="Blog Cover" className="bm-image-preview" />
              <div className="bm-dropzone-overlay">
                <span>📷 Click to upload new image</span>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
            <div className="bm-image-actions">
              <button
                type="button"
                className="bm-btn-outline"
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
              >
                📁 Choose File
              </button>
              <button type="button" className="bm-btn-danger-outline" onClick={handleRemoveImage}>
                🗑️ Remove Image
              </button>
            </div>
          </div>

          {/* Title Field */}
          <div className="bm-form-group">
            <label className="bm-label">
              Blog Title <span className="bm-required">*</span>
            </label>
            <div className="bm-input-counter-wrapper">
              <input
                type="text"
                className="bm-input"
                maxLength={100}
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter post title..."
              />
              <span className="bm-char-counter">{title.length}/100</span>
            </div>
          </div>

          {/* Slug Field */}
          <div className="bm-form-group">
            <label className="bm-label">
              Slug (URL) <span className="bm-required">*</span>
            </label>
            <div className="bm-input-counter-wrapper">
              <input
                type="text"
                className="bm-input"
                maxLength={100}
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. real-estate-shifts-prices"
              />
              <span className="bm-char-counter">{slug.length}/100</span>
            </div>
          </div>

          {/* Category & Tags Grid */}
          <div className="bm-grid-2">
            <div className="bm-form-group">
              <label className="bm-label">
                Category <span className="bm-required">*</span>
              </label>
              <select className="bm-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Housing">Housing</option>
                <option value="Business">Business</option>
                <option value="Apartments">Apartments</option>
                <option value="Luxury Villa">Luxury Villa</option>
                <option value="Duplex House">Duplex House</option>
                <option value="Investment">Investment</option>
                <option value="Lifestyle">Lifestyle</option>
              </select>
            </div>

            <div className="bm-form-group">
              <label className="bm-label">Tags (Press Enter)</label>
              <div className="bm-tags-input-container">
                {tags.map((tag, idx) => (
                  <span key={idx} className="bm-tag-badge">
                    {tag} <button type="button" onClick={() => handleRemoveTag(tag)}>✕</button>
                  </span>
                ))}
                <input
                  type="text"
                  className="bm-tag-input"
                  placeholder="Type tag & press enter"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                />
              </div>
            </div>
          </div>

          {/* Author, Date & Time */}
          <div className="bm-grid-3">
            <div className="bm-form-group">
              <label className="bm-label">
                Author / Posted By <span className="bm-required">*</span>
              </label>
              <input
                type="text"
                className="bm-input"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter author name"
              />
            </div>

            <div className="bm-form-group">
              <label className="bm-label">
                Publish Date <span className="bm-required">*</span>
              </label>
              <input
                type="date"
                className="bm-input"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
              />
            </div>

            <div className="bm-form-group">
              <label className="bm-label">Publish Time</label>
              <input
                type="time"
                className="bm-input"
                value={publishTime}
                onChange={(e) => setPublishTime(e.target.value)}
              />
            </div>
          </div>

          {/* Short Description */}
          <div className="bm-form-group">
            <label className="bm-label">
              Short Description <span className="bm-required">*</span>
            </label>
            <div className="bm-input-counter-wrapper">
              <textarea
                className="bm-textarea"
                rows={3}
                maxLength={200}
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                placeholder="Brief excerpt for list cards..."
              />
              <span className="bm-char-counter">{shortDesc.length}/200</span>
            </div>
          </div>

          {/* Content Area */}
          <div className="bm-form-group">
            <label className="bm-label">
              Full Content <span className="bm-required">*</span>
            </label>
            <div className="bm-editor-container">
              <div className="bm-editor-toolbar">
                <div className="bm-editor-actions-left">
                  <button type="button" className="bm-editor-btn" onClick={() => applyTextFormat('**')}><b>B</b></button>
                  <button type="button" className="bm-editor-btn" onClick={() => applyTextFormat('*')}><i>I</i></button>
                  <button type="button" className="bm-editor-btn" onClick={() => applyTextFormat('<u>')}><u>U</u></button>
                  <span className="bm-toolbar-divider"></span>
                  <button type="button" className="bm-editor-btn" onClick={() => applyTextFormat('\n• ')}>≡</button>
                  <button type="button" className="bm-editor-btn" onClick={() => applyTextFormat('\n> ')}>“</button>
                </div>
                <div className="bm-editor-actions-right">
                  <span className="bm-editor-mode-badge bm-active">Visual</span>
                </div>
              </div>

              <textarea
                ref={contentTextareaRef}
                className="bm-editor-textarea"
                rows={8}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write full article body content..."
              />
            </div>
          </div>

          {/* SEO Meta Fields */}
          <div className="bm-grid-3">
            <div className="bm-form-group">
              <label className="bm-label">Meta Title</label>
              <input
                type="text"
                className="bm-input"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="SEO meta title"
              />
            </div>

            <div className="bm-form-group">
              <label className="bm-label">Meta Description</label>
              <input
                type="text"
                className="bm-input"
                value={metaDesc}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="SEO description"
              />
            </div>

            <div className="bm-form-group">
              <label className="bm-label">Meta Keywords</label>
              <input
                type="text"
                className="bm-input"
                value={metaKeywords}
                onChange={(e) => setMetaKeywords(e.target.value)}
                placeholder="Keywords, property"
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="bm-toggles-row">
            <label className="bm-toggle-item">
              <input
                type="checkbox"
                checked={featuredPost}
                onChange={(e) => setFeaturedPost(e.target.checked)}
              />
              <span className="bm-toggle-slider"></span>
              <span className="bm-toggle-text">Featured Post</span>
            </label>

            <label className="bm-toggle-item">
              <input
                type="checkbox"
                checked={showOnHomepage}
                onChange={(e) => setShowOnHomepage(e.target.checked)}
              />
              <span className="bm-toggle-slider"></span>
              <span className="bm-toggle-text">Show on Homepage</span>
            </label>

            <label className="bm-toggle-item">
              <input
                type="checkbox"
                checked={allowComments}
                onChange={(e) => setAllowComments(e.target.checked)}
              />
              <span className="bm-toggle-slider"></span>
              <span className="bm-toggle-text">Allow Comments</span>
            </label>
          </div>

          {/* Actions */}
          <div className="bm-form-actions">
            <button
              type="button"
              className="bm-btn-primary"
              disabled={loading}
              onClick={() => handlePublish('Published')}
            >
              {loading ? '⌛ Processing...' : editingId ? '🔄 Update Post' : '✅ Publish Post'}
            </button>
            <button
              type="button"
              className="bm-btn-secondary"
              disabled={loading}
              onClick={() => handlePublish('Draft')}
            >
              💾 Save Draft
            </button>
            <button type="button" className="bm-btn-light" onClick={handleReset}>
              🔄 Reset Form
            </button>
          </div>
        </div>

        {/* ================= RIGHT SIDE: TABLE (50%) ================= */}
        <div className="bm-table-card">
          <div className="bm-card-header">
            <h3>📚 Managed Blog Posts ({blogs.length})</h3>
          </div>

          <div className="bm-table-responsive">
            <table className="bm-table">
              <thead>
                <tr>
                  <th style={{ width: '35px' }}>#</th>
                  <th>Image</th>
                  <th style={{ minWidth: '160px' }}>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Featured</th>
                  <th style={{ textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedBlogs.length > 0 ? (
                  paginatedBlogs.map((blog, index) => {
                    const catStyle = getCategoryTheme(blog.category);
                    const isEditing = editingId === (blog._id || blog.id);
                    return (
                      <tr key={blog._id || blog.id} className={isEditing ? 'bm-row-editing' : ''}>
                        <td>{startIndex + index + 1}</td>
                        <td>
                          <img
                            src={getImageUrl(blog.blogImage)}
                            alt={blog.title}
                            className="bm-table-img"
                          />
                        </td>
                        <td className="bm-table-title-cell">
                          <strong>{blog.title}</strong>
                          <div className="bm-table-subtext">
                            By {blog.author} • {blog.publishDate}
                          </div>
                        </td>
                        <td>
                          <span
                            className="bm-category-pill"
                            style={{ backgroundColor: catStyle.bg, color: catStyle.text }}
                          >
                            {blog.category}
                          </span>
                        </td>
                        <td>
                          <span className={`bm-status-badge ${(blog.status || 'Published').toLowerCase()}`}>
                            {blog.status || 'Published'}
                          </span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          {blog.featuredPost ? <span className="bm-check-icon">✓</span> : <span className="bm-dash-icon">—</span>}
                        </td>
                        <td>
                          <div className="bm-action-buttons">
                            <button
                              type="button"
                              className="bm-action-btn view"
                              title="View Preview"
                              onClick={() => handleView(blog)}
                            >
                              👁️
                            </button>
                            <button
                              type="button"
                              className="bm-action-btn edit"
                              title="Edit Post"
                              onClick={() => handleEdit(blog)}
                            >
                              ✏️
                            </button>
                            <button
                              type="button"
                              className="bm-action-btn delete"
                              title="Delete Post"
                              onClick={() => handleDelete(blog._id || blog.id)}
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                      {loading ? 'Loading blog posts from database...' : 'No blog posts found.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bm-pagination-wrapper">
            <span className="bm-pagination-info">
              Showing {blogs.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + itemsPerPage, blogs.length)} of {blogs.length} entries
            </span>
            <div className="bm-pagination">
              <button
                type="button"
                className="bm-page-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, pageIdx) => (
                <button
                  key={pageIdx}
                  type="button"
                  className={`bm-page-btn ${currentPage === pageIdx + 1 ? 'active' : ''}`}
                  onClick={() => setCurrentPage(pageIdx + 1)}
                >
                  {pageIdx + 1}
                </button>
              ))}
              <button
                type="button"
                className="bm-page-btn"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

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
              />
              <span
                className="bm-category-pill"
                style={{
                  ...getCategoryTheme(viewingBlog.category),
                  marginTop: '12px',
                }}
              >
                {viewingBlog.category}
              </span>
              <h2>{viewingBlog.title}</h2>
              <div className="bm-modal-meta">
                <span>
                  By <strong>{viewingBlog.author}</strong>
                </span>{' '}
                • <span>{viewingBlog.publishDate}</span>
              </div>
              <p className="bm-modal-desc">
                <strong>Excerpt:</strong> {viewingBlog.shortDesc}
              </p>
              <div className="bm-modal-text">{viewingBlog.content}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPosting;