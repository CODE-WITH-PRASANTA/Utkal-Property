import React, { useState } from 'react';
import './BlogManagement.css';

// Mock Data matching the UI
const initialBlogs = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80',
    title: 'Real estate shifts: Prices and sales trending down in two different spheres',
    description: 'Hosted by Utkal Property, our market insights explore the intersection of property pricing, housing demand...',
    category: 'Housing',
    categoryClass: 'cat-housing',
    author: 'Admin User',
    authorImage: 'https://i.pravatar.cc/150?img=11',
    date: '23 May 2025',
    time: '10:30 AM',
    status: 'Published',
    featured: true
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=80',
    title: "We are hiring 'moderately,' says Compass CEO",
    description: 'Our market updates explore major corporate shifts, strategic residential expansions, and real estate...',
    category: 'Business',
    categoryClass: 'cat-business',
    author: 'Admin User',
    authorImage: 'https://i.pravatar.cc/150?img=11',
    date: '22 May 2025',
    time: '09:15 AM',
    status: 'Published',
    featured: true
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80',
    title: 'Gorgeous Apartment Building For Sale',
    description: 'Explore premium apartments with modern amenities in prime locations. Perfect for families and investors...',
    category: 'Apartments',
    categoryClass: 'cat-apartments',
    author: 'Admin User',
    authorImage: 'https://i.pravatar.cc/150?img=11',
    date: '21 May 2025',
    time: '04:45 PM',
    status: 'Published',
    featured: true
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=400&q=80',
    title: 'Luxury Villas with Modern Amenities',
    description: 'Discover elegant villas designed for comfort and luxury. World-class facilities and beautiful environments.',
    category: 'Luxury Villa',
    categoryClass: 'cat-villa',
    author: 'Admin User',
    authorImage: 'https://i.pravatar.cc/150?img=11',
    date: '20 May 2025',
    time: '03:20 PM',
    status: 'Draft',
    featured: false
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=400&q=80',
    title: 'Best Duplex House Designs for Modern Families',
    description: 'Stylish and functional duplex house designs that provide space, comfort, and modern living.',
    category: 'Duplex House',
    categoryClass: 'cat-duplex',
    author: 'Admin User',
    authorImage: 'https://i.pravatar.cc/150?img=11',
    date: '19 May 2025',
    time: '11:10 AM',
    status: 'Published',
    featured: true
  }
];

const BlogManagement = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedAuthor, setSelectedAuthor] = useState('All Authors');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedDate, setSelectedDate] = useState('');

  // Action Button Handlers
  const handleViewAction = (id) => alert(`Viewing blog ID: ${id}`);
  const handleEditAction = (id) => alert(`Editing blog ID: ${id}`);
  const handleDeleteAction = (id) => alert(`Deleting blog ID: ${id}`);
  const handleFilter = () => alert('Filtering applied based on settings.');
  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSelectedAuthor('All Authors');
    setSelectedStatus('All Status');
    setSelectedDate('');
  };

  return (
    <div className="bm-container">
      {/* Redesigned Toolbar */}
      <div className="bm-toolbar-container">
        <div className="bm-main-toolbar">
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

          <div className="bm-select-wrapper">
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bm-dropdown-select"
            >
              <option>All Categories</option>
              <option>Housing</option>
              <option>Business</option>
              <option>Apartments</option>
              <option>Luxury Villa</option>
              <option>Duplex House</option>
            </select>
          </div>

          <div className="bm-select-wrapper">
            <select 
              value={selectedAuthor} 
              onChange={(e) => setSelectedAuthor(e.target.value)}
              className="bm-dropdown-select"
            >
              <option>All Authors</option>
              <option>Admin User</option>
            </select>
          </div>

          <div className="bm-select-wrapper">
            <select 
              value={selectedStatus} 
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bm-dropdown-select"
            >
              <option>All Status</option>
              <option>Published</option>
              <option>Draft</option>
            </select>
          </div>

          <div className="bm-date-wrapper">
            <input 
              type="text"
              placeholder="Select Date"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => { if(!e.target.value) e.target.type = "text"; }}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bm-date-field"
            />
            <span className="bm-calendar-icon">📅</span>
          </div>

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

        {/* Lower row action buttons aligned right (Visible when in list mode) */}
        {viewMode === 'list' && (
          <div className="bm-action-sub-row">
            <button className="bm-utility-btn" onClick={handleFilter}>
              <span className="bm-btn-icon">⏳</span> Filter
            </button>
            <button className="bm-utility-btn" onClick={handleReset}>
              <span className="bm-btn-icon">🔄</span> Reset
            </button>
          </div>
        )}
      </div>

      {/* Conditionally Render List View or Grid View */}
      {viewMode === 'list' ? (
        <div className="bm-table-wrapper">
          <table className="bm-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}><input type="checkbox" className="bm-checkbox" /></th>
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
              {initialBlogs.map((blog, idx) => (
                <tr key={blog.id}>
                  <td><input type="checkbox" className="bm-checkbox" /></td>
                  <td>{idx + 1}</td>
                  <td>
                    <img src={blog.image} alt={blog.title} className="bm-table-img" />
                  </td>
                  <td className="bm-table-title">{blog.title}</td>
                  <td>
                    <span className={`bm-badge ${blog.categoryClass}`}>{blog.category}</span>
                  </td>
                  <td>
                    <div className="bm-author-cell">
                      <img src={blog.authorImage} alt={blog.author} className="bm-avatar" />
                      <span>{blog.author}</span>
                    </div>
                  </td>
                  <td className="bm-table-date">
                    <div>{blog.date}</div>
                    <small>{blog.time}</small>
                  </td>
                  <td>
                    <span className={`bm-status-label ${blog.status.toLowerCase()}`}>
                      {blog.status}
                    </span>
                  </td>
                  <td>
                    {blog.featured ? (
                      <span className="bm-check-icon">✅</span>
                    ) : (
                      <span className="bm-dash-icon">—</span>
                    )}
                  </td>
                  <td>
                    <div className="bm-actions">
                      <button className="bm-action-btn view" onClick={() => handleViewAction(blog.id)}>👁️</button>
                      <button className="bm-action-btn edit" onClick={() => handleEditAction(blog.id)}>📝</button>
                      <button className="bm-action-btn delete" onClick={() => handleDeleteAction(blog.id)}>🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* List Footer / Pagination */}
          <div className="bm-footer">
            <span className="bm-footer-info">Showing 1 to 5 of 24 blogs</span>
            <div className="bm-pagination">
              <button className="bm-page-btn">Previous</button>
              <button className="bm-page-btn active-page">1</button>
              <button className="bm-page-btn">2</button>
              <button className="bm-page-btn">3</button>
              <button className="bm-page-btn">4</button>
              <button className="bm-page-btn">5</button>
              <button className="bm-page-btn">Next</button>
            </div>
          </div>
        </div>
      ) : (
        /* Grid View Wrapper */
        <div className="bm-grid-wrapper">
          <div className="bm-grid">
            {initialBlogs.map((blog) => (
              <div className="bm-card" key={blog.id}>
                <div className="bm-card-banner">
                  <img src={blog.image} alt={blog.title} className="bm-card-img" />
                  <span className={`bm-badge bm-card-badge ${blog.categoryClass}`}>{blog.category}</span>
                  <button className="bm-card-save-btn">🔖</button>
                </div>
                
                <div className="bm-card-body">
                  <div className="bm-card-date">📅 {blog.date}</div>
                  <h3 className="bm-card-title">{blog.title}</h3>
                  <p className="bm-card-desc">{blog.description}</p>
                </div>
                
                <div className="bm-card-footer">
                  <div className="bm-author-cell">
                    <img src={blog.authorImage} alt={blog.author} className="bm-avatar" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="bm-actions">
                    <button className="bm-action-btn view" onClick={() => handleViewAction(blog.id)}>👁️</button>
                    <button className="bm-action-btn edit" onClick={() => handleEditAction(blog.id)}>📝</button>
                    <button className="bm-action-btn delete" onClick={() => handleDeleteAction(blog.id)}>🗑️</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bm-grid-load-more">
            <button className="bm-load-btn" onClick={() => alert('Loading more blogs...')}>
              Load More Blogs ↓
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManagement;