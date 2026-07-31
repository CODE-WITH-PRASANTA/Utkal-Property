import React, { useState } from 'react';
import './BlogPosting.css';

const BlogPosting = () => {
  // --- Form State ---
  const [blogImage, setBlogImage] = useState('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80');
  const [title, setTitle] = useState('Real estate shifts: Prices and sales trending down in two different spheres');
  const [slug, setSlug] = useState('real-estate-shifts-prices-and-sales-trending');
  const [category, setCategory] = useState('Housing');
  const [tags, setTags] = useState(['Real Estate', 'Market', 'Trends']);
  const [tagInput, setTagInput] = useState('');
  const [author, setAuthor] = useState('Admin User');
  const [publishDate, setPublishDate] = useState('2025-05-23');
  const [publishTime, setPublishTime] = useState('10:30');
  const [shortDesc, setShortDesc] = useState('Hosted by Utkal Property (Best Property Consultant in Bhubaneswar), our market insights explore the intersection of property pricing, housing demand, and urban expansion across Odisha...');
  const [content, setContent] = useState(`The real estate market is constantly evolving. In recent months, we've seen a shift in both prices and sales trends across different segments. From luxury villas to budget homes, the market dynamics are changing.

Why is the Shift Happening?
Several factors contribute to this changing landscape:
• Rising interest rates
• Changing buyer preferences
• Economic uncertainty
• Increased supply in certain areas`);
  
  const [metaTitle, setMetaTitle] = useState('Real Estate Market Trends 2025');
  const [metaDesc, setMetaDescription] = useState('Latest insights on real estate prices and sales trends');
  const [metaKeywords, setMetaKeywords] = useState('real estate, market trends, property');
  
  const [featuredPost, setFeaturedPost] = useState(true);
  const [showOnHomepage, setShowOnHomepage] = useState(true);
  const [allowComments, setAllowComments] = useState(true);

  // --- Table & Filter State ---
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');
  const [selectedAuthorFilter, setSelectedAuthorFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Newest First');
  const [currentPage, setCurrentPage] = useState(1);

  // Initial Sample Blogs Table Data
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=200&q=80',
      title: 'Real estate shifts: Prices and sales trending down in two different spheres',
      category: 'Housing',
      categoryColor: '#fef3c7', // amber soft
      categoryTextColor: '#92400e',
      author: 'Admin User',
      date: '23 May 2025 10:30 AM',
      status: 'Published',
      featured: true
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=200&q=80',
      title: 'We are hiring "moderately," says Compass CEO',
      category: 'Business',
      categoryColor: '#e0e7ff', // indigo soft
      categoryTextColor: '#3730a3',
      author: 'Admin User',
      date: '22 May 2025 09:15 AM',
      status: 'Published',
      featured: true
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=200&q=80',
      title: 'Gorgeous Apartment Building For Sale',
      category: 'Apartments',
      categoryColor: '#f3e8ff', // purple soft
      categoryTextColor: '#6b21a8',
      author: 'Admin User',
      date: '21 May 2025 04:45 PM',
      status: 'Published',
      featured: true
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=200&q=80',
      title: 'Luxury Villas with Modern Amenities',
      category: 'Luxury Villa',
      categoryColor: '#dcfce7', // green soft
      categoryTextColor: '#166534',
      author: 'Admin User',
      date: '20 May 2025 03:20 PM',
      status: 'Draft',
      featured: false
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=200&q=80',
      title: 'Best Duplex House Designs for Modern Families',
      category: 'Duplex House',
      categoryColor: '#ffedd5', // orange soft
      categoryTextColor: '#9a3412',
      author: 'Admin User',
      date: '19 May 2025 11:10 AM',
      status: 'Published',
      featured: true
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=200&q=80',
      title: 'How to Choose the Right Property in 2025',
      category: 'Business',
      categoryColor: '#e0e7ff',
      categoryTextColor: '#3730a3',
      author: 'Admin User',
      date: '18 May 2025 02:05 PM',
      status: 'Draft',
      featured: false
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=200&q=80',
      title: 'Top Locations to Invest in Bhubaneswar',
      category: 'Investment',
      categoryColor: '#fee2e2', // red soft
      categoryTextColor: '#991b1b',
      author: 'Admin User',
      date: '17 May 2025 05:30 PM',
      status: 'Published',
      featured: true
    },
    {
      id: 8,
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=200&q=80',
      title: 'Interior Design Tips for Your Dream Home',
      category: 'Lifestyle',
      categoryColor: '#e0f2fe', // cyan soft
      categoryTextColor: '#075985',
      author: 'Admin User',
      date: '16 May 2025 01:40 PM',
      status: 'Published',
      featured: false
    }
  ]);

  // --- Handlers ---
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
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBlogImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setBlogImage('https://via.placeholder.com/600x300?text=Upload+Image');
  };

  const handleReset = () => {
    setTitle('');
    setSlug('');
    setCategory('Housing');
    setTags([]);
    setAuthor('Admin User');
    setPublishDate('');
    setPublishTime('');
    setShortDesc('');
    setContent('');
    setMetaTitle('');
    setMetaDescription('');
    setMetaKeywords('');
    setFeaturedPost(false);
    setShowOnHomepage(false);
    setAllowComments(true);
  };

  const handlePublish = (statusType = 'Published') => {
    if (!title.trim()) {
      alert('Please fill in the Blog Title!');
      return;
    }

    const newBlog = {
      id: Date.now(),
      image: blogImage,
      title: title,
      category: category,
      categoryColor: '#fef3c7',
      categoryTextColor: '#92400e',
      author: author || 'Admin User',
      date: `${publishDate || '31 Jul 2026'} ${publishTime || '12:00 PM'}`,
      status: statusType,
      featured: featuredPost
    };

    setBlogs([newBlog, ...blogs]);
    alert(`Blog successfully ${statusType === 'Published' ? 'published' : 'saved as draft'}!`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      setBlogs(blogs.filter(b => b.id !== id));
    }
  };

  const handleEdit = (blog) => {
    setTitle(blog.title);
    setCategory(blog.category);
    setAuthor(blog.author);
    setFeaturedPost(blog.featured);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleView = (blog) => {
    alert(`Viewing Details:\n\nTitle: ${blog.title}\nCategory: ${blog.category}\nAuthor: ${blog.author}\nStatus: ${blog.status}`);
  };

  // --- Filtering Logic ---
  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = selectedCategoryFilter === 'All' || blog.category === selectedCategoryFilter;
    const matchesStatus = selectedStatusFilter === 'All' || blog.status === selectedStatusFilter;
    const matchesAuthor = selectedAuthorFilter === 'All' || blog.author.toLowerCase().includes(selectedAuthorFilter.toLowerCase());
    return matchesCategory && matchesStatus && matchesAuthor;
  });

  return (
    <div className="bm-container">
      {/* 50 / 50 Split Layout Container */}
      <div className="bm-wrapper">
        
        {/* ================= LEFT SIDE: FORM (50%) ================= */}
        <div className="bm-form-card">
          
          {/* Image Upload Banner */}
          <div className="bm-form-group">
            <label className="bm-label">Blog Image <span className="bm-required">*</span></label>
            <div className="bm-image-preview-container">
              <img src={blogImage} alt="Blog preview" className="bm-image-preview" />
            </div>
            <div className="bm-image-actions">
              <label className="bm-btn-outline">
                📷 Change Image
                <input type="file" accept="image/*" onChange={handleImageChange} hidden />
              </label>
              <button type="button" className="bm-btn-danger-outline" onClick={handleRemoveImage}>
                🗑️ Remove
              </button>
            </div>
          </div>

          {/* Title */}
          <div className="bm-form-group">
            <label className="bm-label">Title <span className="bm-required">*</span></label>
            <div className="bm-input-counter-wrapper">
              <input 
                type="text" 
                className="bm-input" 
                maxLength={100} 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog title"
              />
              <span className="bm-char-counter">{title.length}/100</span>
            </div>
          </div>

          {/* Slug */}
          <div className="bm-form-group">
            <label className="bm-label">Slug (URL) <span className="bm-required">*</span></label>
            <div className="bm-input-counter-wrapper">
              <input 
                type="text" 
                className="bm-input" 
                maxLength={100} 
                value={slug} 
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. real-estate-shifts"
              />
              <span className="bm-char-counter">{slug.length}/100</span>
            </div>
          </div>

          {/* Category & Tags Grid */}
          <div className="bm-grid-2">
            <div className="bm-form-group">
              <label className="bm-label">Category <span className="bm-required">*</span></label>
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
              <label className="bm-label">Tags</label>
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

          {/* Author Input, Publish Date, Publish Time */}
          <div className="bm-grid-3">
            <div className="bm-form-group">
              <label className="bm-label">Author / Posted By <span className="bm-required">*</span></label>
              {/* UPDATED: Changed from select dropdown to regular input box */}
              <input 
                type="text" 
                className="bm-input" 
                value={author} 
                onChange={(e) => setAuthor(e.target.value)} 
                placeholder="Enter author name"
              />
            </div>

            <div className="bm-form-group">
              <label className="bm-label">Publish Date <span className="bm-required">*</span></label>
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
            <label className="bm-label">Short Description <span className="bm-required">*</span></label>
            <div className="bm-input-counter-wrapper">
              <textarea 
                className="bm-textarea" 
                rows={3} 
                maxLength={200}
                value={shortDesc} 
                onChange={(e) => setShortDesc(e.target.value)}
                placeholder="Enter a brief summary..."
              />
              <span className="bm-char-counter">{shortDesc.length}/200</span>
            </div>
          </div>

          {/* Content (TinyMCE Inspired Rich Text Editor UI) */}
          <div className="bm-form-group">
            <label className="bm-label">Content <span className="bm-required">*</span></label>
            <div className="bm-editor-container">
              {/* Rich Text Toolbar Bar */}
              <div className="bm-editor-toolbar">
                <div className="bm-editor-actions-left">
                  <button type="button" className="bm-editor-btn"><b>B</b></button>
                  <button type="button" className="bm-editor-btn"><i>I</i></button>
                  <button type="button" className="bm-editor-btn"><u>U</u></button>
                  <span className="bm-toolbar-divider"></span>
                  <button type="button" className="bm-editor-btn">≡</button>
                  <button type="button" className="bm-editor-btn">≣</button>
                  <span className="bm-toolbar-divider"></span>
                  <button type="button" className="bm-editor-btn">“</button>
                  <button type="button" className="bm-editor-btn">🔗</button>
                  <button type="button" className="bm-editor-btn">📷</button>
                  <button type="button" className="bm-editor-btn">🎬</button>
                </div>
                <div className="bm-editor-actions-right">
                  <span className="bm-editor-mode-badge bm-active">Visual</span>
                  <span className="bm-editor-mode-badge">Text</span>
                </div>
              </div>

              <textarea 
                className="bm-editor-textarea" 
                rows={8}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your full blog content here..."
              />
            </div>
          </div>

          {/* Meta Information Grid */}
          <div className="bm-grid-3">
            <div className="bm-form-group">
              <label className="bm-label">Meta Title</label>
              <input 
                type="text" 
                className="bm-input" 
                value={metaTitle} 
                onChange={(e) => setMetaTitle(e.target.value)} 
                placeholder="Meta title"
              />
            </div>

            <div className="bm-form-group">
              <label className="bm-label">Meta Description</label>
              <input 
                type="text" 
                className="bm-input" 
                value={metaDesc} 
                onChange={(e) => setMetaDescription(e.target.value)} 
                placeholder="Meta description"
              />
            </div>

            <div className="bm-form-group">
              <label className="bm-label">Meta Keywords</label>
              <input 
                type="text" 
                className="bm-input" 
                value={metaKeywords} 
                onChange={(e) => setMetaKeywords(e.target.value)} 
                placeholder="Meta keywords"
              />
            </div>
          </div>

          {/* Toggles Row */}
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

          {/* Form Action Buttons */}
          <div className="bm-form-actions">
            <button type="button" className="bm-btn-primary" onClick={() => handlePublish('Published')}>
              ✅ Publish Post
            </button>
            <button type="button" className="bm-btn-secondary" onClick={() => handlePublish('Draft')}>
              💾 Save Draft
            </button>
            <button type="button" className="bm-btn-light" onClick={handleReset}>
              🔄 Reset
            </button>
          </div>

        </div>

        {/* ================= RIGHT SIDE: TABLE (50%) ================= */}
        <div className="bm-table-card">
          
          {/* Top Filter Bar */}
          <div className="bm-filters-grid">
            <div className="bm-filter-group">
              <label className="bm-filter-label">Category</label>
              <select className="bm-select" value={selectedCategoryFilter} onChange={(e) => setSelectedCategoryFilter(e.target.value)}>
                <option value="All">All Categories</option>
                <option value="Housing">Housing</option>
                <option value="Business">Business</option>
                <option value="Apartments">Apartments</option>
                <option value="Luxury Villa">Luxury Villa</option>
                <option value="Duplex House">Duplex House</option>
                <option value="Investment">Investment</option>
                <option value="Lifestyle">Lifestyle</option>
              </select>
            </div>

            <div className="bm-filter-group">
              <label className="bm-filter-label">Status</label>
              <select className="bm-select" value={selectedStatusFilter} onChange={(e) => setSelectedStatusFilter(e.target.value)}>
                <option value="All">All Status</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>

            <div className="bm-filter-group">
              <label className="bm-filter-label">Author</label>
              <select className="bm-select" value={selectedAuthorFilter} onChange={(e) => setSelectedAuthorFilter(e.target.value)}>
                <option value="All">All Authors</option>
                <option value="Admin User">Admin User</option>
              </select>
            </div>

            <div className="bm-filter-group">
              <label className="bm-filter-label">Date</label>
              <select className="bm-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="Newest First">Newest First</option>
                <option value="Oldest First">Oldest First</option>
              </select>
            </div>
          </div>

          {/* Table Area */}
          <div className="bm-table-responsive">
            <table className="bm-table">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}>#</th>
                  <th>Image</th>
                  <th style={{ minWidth: '180px' }}>Title</th>
                  <th>Category</th>
                  <th>Author</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Featured</th>
                  <th style={{ textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBlogs.length > 0 ? (
                  filteredBlogs.map((blog, index) => (
                    <tr key={blog.id}>
                      <td>{index + 1}</td>
                      <td>
                        <img src={blog.image} alt={blog.title} className="bm-table-img" />
                      </td>
                      <td className="bm-table-title-cell">{blog.title}</td>
                      <td>
                        <span 
                          className="bm-category-pill" 
                          style={{ backgroundColor: blog.categoryColor, color: blog.categoryTextColor }}
                        >
                          {blog.category}
                        </span>
                      </td>
                      <td>
                        <div className="bm-author-cell">
                          <span className="bm-author-avatar">👤</span>
                          <span>{blog.author}</span>
                        </div>
                      </td>
                      <td className="bm-table-date">{blog.date}</td>
                      <td>
                        <span className={`bm-status-badge ${blog.status.toLowerCase()}`}>
                          {blog.status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        {blog.featured ? (
                          <span className="bm-check-icon">✓</span>
                        ) : (
                          <span className="bm-dash-icon">—</span>
                        )}
                      </td>
                      <td>
                        <div className="bm-action-buttons">
                          <button type="button" className="bm-action-btn view" title="View Blog" onClick={() => handleView(blog)}>
                            👁️
                          </button>
                          <button type="button" className="bm-action-btn edit" title="Edit Blog" onClick={() => handleEdit(blog)}>
                            ✏️
                          </button>
                          <button type="button" className="bm-action-btn delete" title="Delete Blog" onClick={() => handleDelete(blog.id)}>
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                      No blogs found matching the filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Pagination Footer */}
          <div className="bm-pagination-wrapper">
            <span className="bm-pagination-info">
              Showing 1 to {filteredBlogs.length} of 24 blogs
            </span>
            <div className="bm-pagination">
              <button 
                type="button" 
                className="bm-page-btn" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              >
                Previous
              </button>
              <button 
                type="button" 
                className={`bm-page-btn ${currentPage === 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
              <button 
                type="button" 
                className={`bm-page-btn ${currentPage === 2 ? 'active' : ''}`}
                onClick={() => setCurrentPage(2)}
              >
                2
              </button>
              <button 
                type="button" 
                className={`bm-page-btn ${currentPage === 3 ? 'active' : ''}`}
                onClick={() => setCurrentPage(3)}
              >
                3
              </button>
              <button 
                type="button" 
                className="bm-page-btn"
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Next
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default BlogPosting;