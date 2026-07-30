import React, { useState, useMemo, useRef } from 'react';
import {
  FiSearch, FiPlus, FiEye, FiEdit2, FiTrash2,
  FiCalendar, FiUploadCloud, FiX, FiChevronLeft,
  FiChevronRight, FiGrid, FiBell, FiMenu, FiFilter,
  FiArrowUp, FiArrowDown, FiCheck, FiRefreshCw
} from 'react-icons/fi';
import './BannerManagement.css';

// Initial Mock Banners Data matching screenshot
const INITIAL_BANNERS = [
  {
    id: 1,
    title: 'Fresh Vegetables Sale',
    location: 'Homepage Top Slider',
    target: 'All Users',
    clicks: 532,
    growth: '12.5%',
    status: 'Active',
    priority: 1,
    priorityDirection: 'up',
    startDate: '2025-07-20',
    endDate: '2025-08-20',
    device: 'All Devices',
    redirectUrl: 'https://example.com/fresh-veg',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    description: 'Special discounts on fresh seasonal organic vegetables.'
  },
  {
    id: 2,
    title: 'Summer Fruits Offer',
    location: 'Homepage Top Slider',
    target: 'All Users',
    clicks: 421,
    growth: '8.7%',
    status: 'Active',
    priority: 2,
    priorityDirection: 'up',
    startDate: '2025-07-15',
    endDate: '2025-08-15',
    device: 'Mobile',
    redirectUrl: 'https://example.com/summer-fruits',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80',
    description: 'Get up to 40% OFF on all fresh summer fruit baskets.'
  },
  {
    id: 3,
    title: 'Grocery Mega Sale',
    location: 'Homepage Middle',
    target: 'All Users',
    clicks: 315,
    growth: '5.3%',
    status: 'Active',
    priority: 3,
    priorityDirection: 'up',
    startDate: '2025-07-10',
    endDate: '2025-08-10',
    device: 'Desktop',
    redirectUrl: 'https://example.com/grocery-mega',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=600&q=80',
    description: 'Massive grocery savings up to 20% OFF on household items.'
  },
  {
    id: 4,
    title: 'Free Delivery Banner',
    location: 'Homepage Bottom',
    target: 'All Users',
    clicks: 287,
    growth: '4.1%',
    status: 'Active',
    priority: 4,
    priorityDirection: 'down',
    startDate: '2025-07-05',
    endDate: '2025-08-05',
    device: 'All Devices',
    redirectUrl: 'https://example.com/free-delivery',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80',
    description: 'Free delivery on all grocery orders above $99.'
  },
  {
    id: 5,
    title: 'Snacks Fest Offer',
    location: 'Category Page',
    target: 'All Users',
    clicks: 198,
    growth: '3.2%',
    status: 'Inactive',
    priority: 5,
    priorityDirection: 'down',
    startDate: '2025-06-25',
    endDate: '2025-07-25',
    device: 'Tablet',
    redirectUrl: 'https://example.com/snacks-fest',
    image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=600&q=80',
    description: 'Up to 25% OFF on premium snacks & chips.'
  },
  {
    id: 6,
    title: 'Personal Care Sale',
    location: 'Category Page',
    target: 'All Users',
    clicks: 156,
    growth: '2.5%',
    status: 'Inactive',
    priority: 6,
    priorityDirection: 'down',
    startDate: '2025-06-20',
    endDate: '2025-07-20',
    device: 'Mobile',
    redirectUrl: 'https://example.com/personal-care',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    description: 'Personal care product discount up to 30% OFF.'
  },
  {
    id: 7,
    title: 'Monsoon Special Deals',
    location: 'Homepage Top Slider',
    target: 'VIP Users',
    clicks: 412,
    growth: '9.1%',
    status: 'Active',
    priority: 7,
    priorityDirection: 'up',
    startDate: '2025-07-01',
    endDate: '2025-08-01',
    device: 'All Devices',
    redirectUrl: 'https://example.com/monsoon',
    image: 'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?auto=format&fit=crop&w=600&q=80',
    description: 'Exclusive monsoon combo deals for registered members.'
  },
  {
    id: 8,
    title: 'Organic Tea & Coffee',
    location: 'Homepage Middle',
    target: 'New Users',
    clicks: 120,
    growth: '1.8%',
    status: 'Inactive',
    priority: 8,
    priorityDirection: 'down',
    startDate: '2025-05-10',
    endDate: '2025-06-10',
    device: 'Desktop',
    redirectUrl: 'https://example.com/organic-tea',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    description: 'Try artisan herbal teas and organic coffee roast blends.'
  }
];

const BannerManagement = () => {
  // State Management
  const [banners, setBanners] = useState(INITIAL_BANNERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedDevice, setSelectedDevice] = useState('All Devices');
  const [selectedDateRange, setSelectedDateRange] = useState('');

  // Selection & Pagination
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Modal States
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [viewBanner, setViewBanner] = useState(null);

  // File Upload Ref & Form
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    location: 'Homepage Top Slider',
    target: 'All Users',
    device: 'All Devices',
    status: 'Active',
    priority: 1,
    startDate: '',
    endDate: '',
    redirectUrl: '',
    image: '',
    description: ''
  });

  // Dynamic Options derived from Data
  const locationsList = ['All Locations', ...new Set(banners.map(b => b.location))];
  const statusList = ['All Status', 'Active', 'Inactive'];
  const deviceList = ['All Devices', 'Desktop', 'Mobile', 'Tablet'];

  // Filtering Logic
  const filteredBanners = useMemo(() => {
    return banners.filter(banner => {
      const matchesSearch =
        banner.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        banner.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLoc = selectedLocation === 'All Locations' || banner.location === selectedLocation;
      const matchesStatus = selectedStatus === 'All Status' || banner.status === selectedStatus;
      const matchesDevice = selectedDevice === 'All Devices' || banner.device === selectedDevice;
      const matchesDate = !selectedDateRange || banner.startDate >= selectedDateRange;

      return matchesSearch && matchesLoc && matchesStatus && matchesDevice && matchesDate;
    });
  }, [banners, searchQuery, selectedLocation, selectedStatus, selectedDevice, selectedDateRange]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredBanners.length / itemsPerPage) || 1;
  const currentTableData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredBanners.slice(start, start + itemsPerPage);
  }, [filteredBanners, currentPage, itemsPerPage]);

  // Bulk Select Toggle
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(currentTableData.map(b => b.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedLocation('All Locations');
    setSelectedStatus('All Status');
    setSelectedDevice('All Devices');
    setSelectedDateRange('');
    setCurrentPage(1);
  };

  // Open Modal Add / Edit
  const handleOpenAddEditModal = (banner = null) => {
    if (banner) {
      setEditingBanner(banner);
      setFormData({
        title: banner.title,
        location: banner.location,
        target: banner.target || 'All Users',
        device: banner.device || 'All Devices',
        status: banner.status,
        priority: banner.priority,
        startDate: banner.startDate,
        endDate: banner.endDate,
        redirectUrl: banner.redirectUrl || '',
        image: banner.image,
        description: banner.description || ''
      });
    } else {
      setEditingBanner(null);
      setFormData({
        title: '',
        location: 'Homepage Top Slider',
        target: 'All Users',
        device: 'All Devices',
        status: 'Active',
        priority: 1,
        startDate: '',
        endDate: '',
        redirectUrl: '',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
        description: ''
      });
    }
    setIsAddEditOpen(true);
  };

  // File Upload Handler
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, image: imageURL }));
    }
  };

  // Save Banner
  const handleSaveBanner = (e) => {
    e.preventDefault();
    if (editingBanner) {
      setBanners(prev => prev.map(item => item.id === editingBanner.id ? {
        ...item,
        ...formData,
        clicks: item.clicks,
        growth: item.growth
      } : item));
    } else {
      const newBanner = {
        id: Date.now(),
        ...formData,
        clicks: 0,
        growth: '0.0%',
        priorityDirection: 'up'
      };
      setBanners(prev => [newBanner, ...prev]);
    }
    setIsAddEditOpen(false);
  };

  // Delete Banner
  const handleDeleteConfirm = () => {
    setBanners(prev => prev.filter(b => b.id !== deleteId));
    setSelectedIds(prev => prev.filter(id => id !== deleteId));
    setDeleteId(null);
  };

  // Date Formatting Helper
  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return 'N/A';
    const options = { month: 'short', day: '2-digit', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
  };

  return (
    <div className="bm-wrapper">
      {/* Top Navbar */}
     
      <div className="bm-container">
        {/* Page Header */}
        <div className="bm-page-header">
          <div>
            <h1>Banners Management</h1>
            <nav className="bm-breadcrumb">
              Dashboard &gt; Banners &gt; <span>All Banners</span>
            </nav>
          </div>
          <button className="bm-btn-add-new" onClick={() => handleOpenAddEditModal()}>
            <FiPlus /> Add New Banner
          </button>
        </div>

        {/* Dynamic Metric Cards */}
        <section className="bm-metrics-grid">
          <div className="bm-metric-card">
            <div className="metric-icon icon-green-bg"><FiGrid /></div>
            <div className="metric-content">
              <span className="metric-label">Total Banners</span>
              <h2>{banners.length}</h2>
              <span className="metric-trend trend-up">↑ 12.5% this month</span>
            </div>
          </div>

          <div className="bm-metric-card">
            <div className="metric-icon icon-amber-bg"><FiEye /></div>
            <div className="metric-content">
              <span className="metric-label">Active Banners</span>
              <h2>{banners.filter(b => b.status === 'Active').length}</h2>
              <span className="metric-trend trend-up">↑ 8.3% this month</span>
            </div>
          </div>

          <div className="bm-metric-card">
            <div className="metric-icon icon-blue-bg"><FiGrid /></div>
            <div className="metric-content">
              <span className="metric-label">Inactive Banners</span>
              <h2>{banners.filter(b => b.status === 'Inactive').length}</h2>
              <span className="metric-trend trend-down">↓ 4.1% this month</span>
            </div>
          </div>

          <div className="bm-metric-card">
            <div className="metric-icon icon-purple-bg"><FiCalendar /></div>
            <div className="metric-content">
              <span className="metric-label">Total Clicks</span>
              <h2>{banners.reduce((acc, item) => acc + item.clicks, 0).toLocaleString()}</h2>
              <span className="metric-trend trend-up">↑ 15.2% this month</span>
            </div>
          </div>
        </section>

        {/* Filters Toolbar */}
        <section className="bm-filter-toolbar">
          <div className="bm-search-input">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search banners by title or location..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="bm-filter-dropdowns">
            <select value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)}>
              {locationsList.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>

            <select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
              {statusList.map(st => <option key={st} value={st}>{st}</option>)}
            </select>

            <select value={selectedDevice} onChange={e => setSelectedDevice(e.target.value)}>
              {deviceList.map(dev => <option key={dev} value={dev}>{dev}</option>)}
            </select>

            <div className="bm-date-picker-wrapper">
              <input
                type="date"
                value={selectedDateRange}
                onChange={e => setSelectedDateRange(e.target.value)}
                className="bm-date-input"
              />
              <FiCalendar className="calendar-icon" />
            </div>

            <button className="bm-btn-filter-reset" onClick={handleResetFilters} title="Reset Filters">
              <FiRefreshCw />
            </button>
          </div>
        </section>

        {/* Main Banner Data Table */}
        <div className="bm-table-wrapper">
          <table className="bm-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}>
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={currentTableData.length > 0 && currentTableData.every(b => selectedIds.includes(b.id))}
                  />
                </th>
                <th>Banner</th>
                <th>Title & Location</th>
                <th>Target</th>
                <th>Clicks</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Duration</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentTableData.length > 0 ? (
                currentTableData.map(banner => (
                  <tr key={banner.id} className="bm-table-row">
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(banner.id)}
                        onChange={() => handleSelectOne(banner.id)}
                      />
                    </td>
                    <td>
                      <div className="bm-banner-thumb-container">
                        <img src={banner.image} alt={banner.title} className="bm-banner-thumb" />
                      </div>
                    </td>
                    <td>
                      <div className="bm-title-cell">
                        <strong>{banner.title}</strong>
                        <span className="bm-tag-location">{banner.location}</span>
                      </div>
                    </td>
                    <td><span className="bm-target-text">{banner.target}</span></td>
                    <td>
                      <div className="bm-clicks-cell">
                        <strong>{banner.clicks}</strong>
                        <small className="trend-up">↑ {banner.growth}</small>
                      </div>
                    </td>
                    <td>
                      <span className={`bm-status-badge ${banner.status.toLowerCase()}`}>
                        <span className="dot"></span> {banner.status}
                      </span>
                    </td>
                    <td>
                      <div className="bm-priority-cell">
                        {banner.priorityDirection === 'up' ? (
                          <FiArrowUp className="arrow-up" />
                        ) : (
                          <FiArrowDown className="arrow-down" />
                        )}
                        <span>{banner.priority}</span>
                      </div>
                    </td>
                    <td>
                      <div className="bm-duration-cell">
                        <span>{formatDateDisplay(banner.startDate)}</span>
                        <span className="sep">-</span>
                        <span>{formatDateDisplay(banner.endDate)}</span>
                      </div>
                    </td>
                    <td>
                      <div className="bm-action-buttons">
                        <button className="btn-action view" onClick={() => setViewBanner(banner)} title="View Banner Details">
                          <FiEye />
                        </button>
                        <button className="btn-action edit" onClick={() => handleOpenAddEditModal(banner)} title="Edit Banner">
                          <FiEdit2 />
                        </button>
                        <button className="btn-action delete" onClick={() => setDeleteId(banner.id)} title="Delete Banner">
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="no-data">No banners matching your filters</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Table Footer with Exact Pagination */}
          <div className="bm-pagination-bar">
            <div className="bm-page-info">
              Showing {filteredBanners.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
              {Math.min(currentPage * itemsPerPage, filteredBanners.length)} of {filteredBanners.length} banners
            </div>

            <div className="bm-page-size-selector">
              <span>Rows per page:</span>
              <select value={itemsPerPage} onChange={e => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
                <option value={3}>3</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>

            <div className="bm-pagination-controls">
              <button
                className="btn-page-nav"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
              >
                <FiChevronLeft />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`btn-page-num ${currentPage === page ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}

              <button
                className="btn-page-nav"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* POPUP 1: Add/Edit Banner Modal */}
      {isAddEditOpen && (
        <div className="bm-modal-overlay">
          <div className="bm-modal-box">
            <div className="bm-modal-header">
              <h2>{editingBanner ? 'Edit Banner' : 'Add New Banner'}</h2>
              <button className="btn-modal-close" onClick={() => setIsAddEditOpen(false)}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSaveBanner}>
              <div className="bm-modal-body">
                <div className="bm-form-row">
                  <div className="bm-form-group">
                    <label>Banner Title <span className="req">*</span></label>
                    <input
                      type="text"
                      placeholder="Enter banner title"
                      required
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>

                  <div className="bm-form-group">
                    <label>Banner Location <span className="req">*</span></label>
                    <select
                      value={formData.location}
                      onChange={e => setFormData({ ...formData, location: e.target.value })}
                    >
                      <option value="Homepage Top Slider">Homepage Top Slider</option>
                      <option value="Homepage Middle">Homepage Middle</option>
                      <option value="Homepage Bottom">Homepage Bottom</option>
                      <option value="Category Page">Category Page</option>
                    </select>
                  </div>
                </div>

                <div className="bm-form-row">
                  <div className="bm-form-group">
                    <label>Target Users</label>
                    <select
                      value={formData.target}
                      onChange={e => setFormData({ ...formData, target: e.target.value })}
                    >
                      <option value="All Users">All Users</option>
                      <option value="New Users">New Users</option>
                      <option value="VIP Users">VIP Users</option>
                    </select>
                  </div>

                  <div className="bm-form-group">
                    <label>Device</label>
                    <select
                      value={formData.device}
                      onChange={e => setFormData({ ...formData, device: e.target.value })}
                    >
                      <option value="All Devices">All Devices</option>
                      <option value="Desktop">Desktop</option>
                      <option value="Mobile">Mobile</option>
                      <option value="Tablet">Tablet</option>
                    </select>
                  </div>
                </div>

                <div className="bm-form-row">
                  <div className="bm-form-group">
                    <label>Status <span className="req">*</span></label>
                    <select
                      value={formData.status}
                      onChange={e => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="bm-form-group">
                    <label>Priority <span className="req">*</span></label>
                    <input
                      type="number"
                      required
                      value={formData.priority}
                      onChange={e => setFormData({ ...formData, priority: Number(e.target.value) })}
                    />
                    <small className="input-hint">Lower number = Higher priority</small>
                  </div>
                </div>

                <div className="bm-form-row">
                  <div className="bm-form-group">
                    <label>Start Date <span className="req">*</span></label>
                    <div className="input-with-icon">
                      <input
                        type="date"
                        required
                        value={formData.startDate}
                        onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                      />
                      <FiCalendar className="field-icon" />
                    </div>
                  </div>

                  <div className="bm-form-group">
                    <label>End Date <span className="req">*</span></label>
                    <div className="input-with-icon">
                      <input
                        type="date"
                        required
                        value={formData.endDate}
                        onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                      />
                      <FiCalendar className="field-icon" />
                    </div>
                  </div>
                </div>

                <div className="bm-form-group">
                  <label>Redirect URL</label>
                  <input
                    type="url"
                    placeholder="https://example.com"
                    value={formData.redirectUrl}
                    onChange={e => setFormData({ ...formData, redirectUrl: e.target.value })}
                  />
                </div>

                <div className="bm-image-upload-section">
                  <div className="bm-upload-left">
                    <label>Banner Image <span className="req">*</span></label>
                    <div
                      className="bm-dropzone"
                      onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        hidden
                        accept="image/*"
                      />
                      <FiUploadCloud className="upload-icon" />
                      <p><strong>Drag & drop your image here</strong></p>
                      <p className="browse-link">or <span>click to browse</span></p>
                      <small>PNG, JPG, SVG or WEBP (Max. 2MB)</small>
                    </div>
                  </div>

                  <div className="bm-upload-right">
                    <label>Image Preview</label>
                    <div className="bm-preview-box">
                      {formData.image ? (
                        <img src={formData.image} alt="Preview" className="preview-img" />
                      ) : (
                        <div className="no-preview">No image uploaded</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bm-form-group" style={{ marginTop: '16px' }}>
                  <label>Description</label>
                  <textarea
                    rows="3"
                    placeholder="Write banner description..."
                    maxLength="200"
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                  ></textarea>
                  <small className="char-count">{formData.description.length}/200</small>
                </div>
              </div>

              <div className="bm-modal-footer">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setIsAddEditOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-save-banner">
                  Save Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POPUP 2: Delete Banner Confirmation Modal */}
      {deleteId && (
        <div className="bm-modal-overlay">
          <div className="bm-delete-modal-box">
            <h3>Delete Banner</h3>
            <p>Are you sure you want to delete this banner? This action cannot be undone.</p>
            <div className="bm-delete-actions">
              <button className="btn-cancel" onClick={() => setDeleteId(null)}>
                Cancel
              </button>
              <button className="btn-confirm-delete" onClick={handleDeleteConfirm}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP 3: View Banner Detail Modal */}
      {viewBanner && (
        <div className="bm-modal-overlay">
          <div className="bm-modal-box view-modal">
            <div className="bm-modal-header">
              <h2>{viewBanner.title}</h2>
              <button className="btn-modal-close" onClick={() => setViewBanner(null)}>
                <FiX />
              </button>
            </div>
            <div className="bm-modal-body">
              <div className="bm-view-preview">
                <img src={viewBanner.image} alt={viewBanner.title} />
              </div>
              <div className="bm-view-details-grid">
                <div><strong>Location:</strong> {viewBanner.location}</div>
                <div><strong>Target Users:</strong> {viewBanner.target}</div>
                <div><strong>Device:</strong> {viewBanner.device}</div>
                <div><strong>Clicks:</strong> {viewBanner.clicks}</div>
                <div><strong>Status:</strong> {viewBanner.status}</div>
                <div><strong>Priority:</strong> {viewBanner.priority}</div>
                <div><strong>Start Date:</strong> {viewBanner.startDate}</div>
                <div><strong>End Date:</strong> {viewBanner.endDate}</div>
              </div>
              <div style={{ marginTop: '14px' }}>
                <strong>Description:</strong>
                <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '13px' }}>
                  {viewBanner.description || 'No description available for this banner.'}
                </p>
              </div>
            </div>
            <div className="bm-modal-footer">
              <button className="btn-cancel" onClick={() => setViewBanner(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerManagement;