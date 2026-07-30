import React, { useState, useMemo, useRef } from 'react';
import { 
  Folder, CheckCircle2, XCircle, Home, Star, Search, RotateCcw, 
  Upload, Download, Layers, Eye, Edit2, Trash2, Plus, Settings, 
  ChevronLeft, ChevronRight, X, ArrowUp, ArrowDown
} from 'lucide-react';
import './Categories.css';

const INITIAL_CATEGORIES = [
  { id: 'cat-1', name: 'Apartments', parent: '—', slug: 'apartments', properties: 230, featured: true, status: 'Active', date: '2026-01-12', icon: '🏢', previewImg: null },
  { id: 'cat-2', name: 'Commercial', parent: '—', slug: 'commercial', properties: 88, featured: true, status: 'Active', date: '2026-01-14', icon: '🏙️', previewImg: null },
  { id: 'cat-3', name: 'Villas', parent: 'Residential', slug: 'villas', properties: 54, featured: false, status: 'Active', date: '2026-01-20', icon: '🏡', previewImg: null },
  { id: 'cat-4', name: 'Plots', parent: '—', slug: 'plots', properties: 346, featured: true, status: 'Active', date: '2026-01-21', icon: '🌳', previewImg: null },
  { id: 'cat-5', name: 'Row Houses', parent: 'Residential', slug: 'row-houses', properties: 67, featured: false, status: 'Inactive', date: '2026-01-22', icon: '🏠', previewImg: null },
  { id: 'cat-6', name: 'Penthouses', parent: 'Residential', slug: 'penthouses', properties: 15, featured: true, status: 'Active', date: '2026-01-25', icon: '🏢', previewImg: null },
  { id: 'cat-7', name: 'Industrial', parent: '—', slug: 'industrial', properties: 42, featured: false, status: 'Inactive', date: '2026-01-28', icon: '🏭', previewImg: null },
];

const Categories = () => {
  // Main Data State
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);

  // Filters State
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [parentFilter, setParentFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [propertyFilter, setPropertyFilter] = useState('All');

  // Selection & Bulk Operations State
  const [selectedIds, setSelectedIds] = useState([]);
  const [isBulkOpen, setIsBulkOpen] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Modal Dialog States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [viewCategory, setViewCategory] = useState(null);

  // File Upload Reference
  const fileInputRef = useRef(null);
  const importInputRef = useRef(null);

  // Chart Interactive Hover State
  const [hoveredChartIndex, setHoveredChartIndex] = useState(null);

  // Category Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    parent: '',
    properties: 0,
    featured: true,
    status: 'Active',
    previewImg: null,
    icon: '🏢'
  });

  // Settings Form State
  const [settings, setSettings] = useState({
    defaultStatus: 'Active',
    enableAutoSlug: true,
    requireParentCategory: false,
    maxUploadMB: 2
  });

  // Dynamic Multi-Filter Logic
  const filteredData = useMemo(() => {
    return categories.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      const matchesParent = parentFilter === 'All' || item.parent === parentFilter;

      // Created Date Filter Logic
      let matchesDate = true;
      const itemDate = new Date(item.date);
      const now = new Date();
      if (dateFilter === 'Last 7 Days') {
        const diffDays = (now - itemDate) / (1000 * 60 * 60 * 24);
        matchesDate = diffDays <= 7;
      } else if (dateFilter === 'Last 30 Days') {
        const diffDays = (now - itemDate) / (1000 * 60 * 60 * 24);
        matchesDate = diffDays <= 30;
      }

      // Property Count Range Filter Logic
      let matchesProperty = true;
      if (propertyFilter === '0-50') {
        matchesProperty = item.properties >= 0 && item.properties <= 50;
      } else if (propertyFilter === '50-150') {
        matchesProperty = item.properties > 50 && item.properties <= 150;
      } else if (propertyFilter === '150+') {
        matchesProperty = item.properties > 150;
      }

      return matchesSearch && matchesStatus && matchesParent && matchesDate && matchesProperty;
    });
  }, [categories, search, statusFilter, parentFilter, dateFilter, propertyFilter]);

  // Pagination Slice
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  // Master Checkbox Logic (Select All on current page)
  const isAllSelected = useMemo(() => {
    if (paginatedData.length === 0) return false;
    return paginatedData.every(cat => selectedIds.includes(cat.id));
  }, [paginatedData, selectedIds]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const pageIds = paginatedData.map(c => c.id);
      setSelectedIds(prev => Array.from(new Set([...prev, ...pageIds])));
    } else {
      const pageIds = paginatedData.map(c => c.id);
      setSelectedIds(prev => prev.filter(id => !pageIds.includes(id)));
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Dynamic Category Input Handling
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setFormData(prev => ({
        ...prev,
        name: value,
        slug: settings.enableAutoSlug ? value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : prev.slug
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Modal Triggers
  const openModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({ ...category });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        slug: '',
        parent: '',
        properties: 0,
        featured: true,
        status: settings.defaultStatus,
        previewImg: null,
        icon: '🏢'
      });
    }
    setIsModalOpen(true);
  };

  // Image Upload Handler inside Modal
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, previewImg: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // CSV Category Data Import Handler
  const handleImportSubmit = (e) => {
    e.preventDefault();
    const file = importInputRef.current?.files[0];
    if (file) {
      const mockImport = {
        id: `cat-${Date.now()}`,
        name: file.name.replace(/\.[^/.]+$/, "") || 'Imported Category',
        parent: '—',
        slug: 'imported-cat',
        properties: Math.floor(Math.random() * 100),
        featured: false,
        status: 'Active',
        date: new Date().toISOString().split('T')[0],
        icon: '📁',
        previewImg: null
      };
      setCategories(prev => [mockImport, ...prev]);
      setIsImportModalOpen(false);
      alert('Categories imported successfully!');
    }
  };

  // Save Category Handler
  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    if (editingCategory) {
      setCategories(prev => prev.map(item => item.id === editingCategory.id ? { ...item, ...formData } : item));
    } else {
      const newCategory = {
        id: `cat-${Date.now()}`,
        ...formData,
        parent: formData.parent || '—',
        date: new Date().toISOString().split('T')[0],
      };
      setCategories(prev => [newCategory, ...prev]);
    }
    setIsModalOpen(false);
  };

  // CSV Export Trigger
  const handleExportCSV = () => {
    const headers = ['ID,Name,Parent,Slug,Properties,Featured,Status,Date'];
    const rows = filteredData.map(c => 
      `${c.id},"${c.name}","${c.parent}",${c.slug},${c.properties},${c.featured},${c.status},${c.date}`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `categories_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Bulk Operations Handlers
  const handleBulkAction = (action) => {
    if (selectedIds.length === 0) return;
    if (action === 'delete') {
      setCategories(prev => prev.filter(c => !selectedIds.includes(c.id)));
      setSelectedIds([]);
    } else if (action === 'active') {
      setCategories(prev => prev.map(c => selectedIds.includes(c.id) ? { ...c, status: 'Active' } : c));
    } else if (action === 'inactive') {
      setCategories(prev => prev.map(c => selectedIds.includes(c.id) ? { ...c, status: 'Inactive' } : c));
    }
    setIsBulkOpen(false);
  };

  // Delete Handler
  const handleDeleteConfirm = () => {
    setCategories(prev => prev.filter(cat => cat.id !== deleteId));
    setSelectedIds(prev => prev.filter(id => id !== deleteId));
    setDeleteId(null);
  };

  // Filter Reset Handler
  const handleResetFilters = () => {
    setSearch('');
    setStatusFilter('All');
    setParentFilter('All');
    setDateFilter('All');
    setPropertyFilter('All');
    setCurrentPage(1);
  };

  // Category Reorder Handler
  const moveCategoryOrder = (index, direction) => {
    const newCategories = [...categories];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newCategories.length) {
      const temp = newCategories[index];
      newCategories[index] = newCategories[targetIndex];
      newCategories[targetIndex] = temp;
      setCategories(newCategories);
    }
  };

  // Dynamic Chart Values
  const chartData = [
    { label: 'Apartments', value: 35.7, color: '#2563eb' },
    { label: 'Plots', value: 28.7, color: '#22c55e' },
    { label: 'Commercial', value: 18.8, color: '#a855f7' },
    { label: 'Villas', value: 12.4, color: '#eab308' },
    { label: 'Row Houses', value: 7.7, color: '#ef4444' }
  ];

  return (
    <div className="cat-management-container">
      {/* Top Breadcrumb */}
      <header className="cat-header">
        <h1>Category Management</h1>
        <p className="breadcrumb">Dashboard &gt; <span>Categories</span></p>
      </header>

      {/* 5 Stats Cards Row */}
      <div className="cat-stats-grid">
        <div className="stat-card">
          <div className="stat-icon bg-blue-light"><Folder size={20} color="#2563eb" /></div>
          <div>
            <span className="stat-title">Total Categories</span>
            <h2>{categories.length}</h2>
            <span className="stat-sub">All Categories</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-green-light"><CheckCircle2 size={20} color="#16a34a" /></div>
          <div>
            <span className="stat-title">Active Categories</span>
            <h2>{categories.filter(c => c.status === 'Active').length}</h2>
            <span className="stat-sub">
              {((categories.filter(c => c.status === 'Active').length / (categories.length || 1)) * 100).toFixed(1)}% Active
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-red-light"><XCircle size={20} color="#dc2626" /></div>
          <div>
            <span className="stat-title">Inactive Categories</span>
            <h2>{categories.filter(c => c.status === 'Inactive').length}</h2>
            <span className="stat-sub">
              {((categories.filter(c => c.status === 'Inactive').length / (categories.length || 1)) * 100).toFixed(1)}% Inactive
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-purple-light"><Home size={20} color="#9333ea" /></div>
          <div>
            <span className="stat-title">Properties Assigned</span>
            <h2>{categories.reduce((sum, c) => sum + (Number(c.properties) || 0), 0)}</h2>
            <span className="stat-sub">In All Categories</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-yellow-light"><Star size={20} color="#d97706" /></div>
          <div>
            <span className="stat-title">Featured Categories</span>
            <h2>{categories.filter(c => c.featured).length}</h2>
            <span className="stat-sub">
              {((categories.filter(c => c.featured).length / (categories.length || 1)) * 100).toFixed(1)}% Featured
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Header Actions */}
      <div className="cat-top-actions">
        <button className="btn btn-primary" onClick={() => openModal()}>
          <Plus size={18} /> Add New Category
        </button>

        <button className="btn btn-outline" onClick={() => setIsImportModalOpen(true)}>
          <Upload size={16} /> Import Categories
        </button>

        <button className="btn btn-outline" onClick={handleExportCSV}>
          <Download size={16} /> Export CSV
        </button>

        <div className="bulk-dropdown-container">
          <button className="btn btn-outline" onClick={() => setIsBulkOpen(!isBulkOpen)}>
            <Layers size={16} /> Bulk Actions ▾
          </button>
          {isBulkOpen && (
            <div className="bulk-menu">
              <button onClick={() => handleBulkAction('active')}>Set Active</button>
              <button onClick={() => handleBulkAction('inactive')}>Set Inactive</button>
              <button className="text-danger" onClick={() => handleBulkAction('delete')}>Delete Selected</button>
            </div>
          )}
        </div>

        {selectedIds.length > 0 && (
          <span className="selected-count-badge">{selectedIds.length} items selected</span>
        )}
      </div>

      {/* Multi-Filter Component */}
      <div className="cat-filter-card">
        <div className="filter-input-group">
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search category name..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-select-group">
          <label>Status</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="filter-select-group">
          <label>Parent Category</label>
          <select value={parentFilter} onChange={(e) => setParentFilter(e.target.value)}>
            <option value="All">All Parents</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="—">None (—)</option>
          </select>
        </div>

        <div className="filter-select-group">
          <label>Created Date</label>
          <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
            <option value="All">All Dates</option>
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="Last 30 Days">Last 30 Days</option>
          </select>
        </div>

        <div className="filter-select-group">
          <label>Property Count</label>
          <select value={propertyFilter} onChange={(e) => setPropertyFilter(e.target.value)}>
            <option value="All">All Counts</option>
            <option value="0-50">0 - 50 Properties</option>
            <option value="50-150">50 - 150 Properties</option>
            <option value="150+">150+ Properties</option>
          </select>
        </div>

        <button className="btn-reset" onClick={handleResetFilters}>
          <RotateCcw size={14} /> Reset Filter
        </button>
      </div>

      {/* Main Table */}
      <div className="cat-table-wrapper">
        <table className="cat-table">
          <thead>
            <tr>
              <th>
                <input 
                  type="checkbox" 
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Image</th>
              <th>Category Name</th>
              <th>Parent Category</th>
              <th>Slug</th>
              <th>Properties</th>
              <th>Featured</th>
              <th>Status</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((cat) => (
                <tr key={cat.id} className="table-row">
                  <td>
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(cat.id)}
                      onChange={() => handleSelectRow(cat.id)}
                    />
                  </td>
                  {/* Keep <td> as a normal table cell, wrap content in a span instead */}
<td className="cell-icon">
  <span className="cell-icon-wrapper">
    {cat.previewImg ? (
      <img src={cat.previewImg} alt={cat.name} className="cell-img-preview" />
    ) : (
      cat.icon
    )}
  </span>
</td>
                  <td className="font-semibold">{cat.name}</td>
                  <td>{cat.parent}</td>
                  <td className="text-muted">{cat.slug}</td>
                  <td className="font-semibold">{cat.properties}</td>
                  <td>
                    {cat.featured ? (
                      <span className="badge-featured-yes"><Star size={12} fill="#d97706" /> Yes</span>
                    ) : (
                      <span className="badge-featured-no"><Star size={12} /> No</span>
                    )}
                  </td>
                  <td>
                    <span className={`badge-status ${cat.status.toLowerCase()}`}>
                      {cat.status}
                    </span>
                  </td>
                  <td className="text-muted">{cat.date}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon view" title="View Details" onClick={() => setViewCategory(cat)}>
                        <Eye size={16} />
                      </button>
                      <button className="btn-icon edit" title="Edit Category" onClick={() => openModal(cat)}>
                        <Edit2 size={16} />
                      </button>
                      <button className="btn-icon delete" title="Delete Category" onClick={() => setDeleteId(cat.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="no-data">No categories matching filters found.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Dynamic Pagination Bar */}
        <div className="cat-pagination">
          <span>
            Showing {paginatedData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
          </span>
          
          <div className="pagination-controls">
            <button 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(p => p - 1)}
            >
              <ChevronLeft size={16} />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button 
                key={`page-${page}`} 
                className={currentPage === page ? 'active' : ''}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button 
              disabled={currentPage === totalPages} 
              onClick={() => setCurrentPage(p => p + 1)}
            >
              <ChevronRight size={16} />
            </button>

            {/* Configurable Page Size Switcher */}
            <select 
              className="page-size-select"
              value={`${itemsPerPage} / page`}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value.split(' ')[0]));
                setCurrentPage(1);
              }}
            >
              <option value="5 / page">5 / page</option>
              <option value="10 / page">10 / page</option>
              <option value="15 / page">15 / page</option>
              <option value="20 / page">20 / page</option>
            </select>
          </div>
        </div>
      </div>

      {/* Interactive Bottom Widgets */}
      <div className="cat-widgets-grid">
        {/* Category Summary / Donut Chart */}
        <div className="widget-card">
          <h3>Category Summary</h3>
          <div className="donut-chart-container">
            <div className="donut-chart">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="circle" strokeDasharray="35.7, 100" stroke="#2563eb" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="circle" strokeDasharray="28.7, 100" strokeDashoffset="-35.7" stroke="#22c55e" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="circle" strokeDasharray="18.8, 100" strokeDashoffset="-64.4" stroke="#a855f7" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="circle" strokeDasharray="12.4, 100" strokeDashoffset="-83.2" stroke="#eab308" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="circle" strokeDasharray="7.7, 100" strokeDashoffset="-95.6" stroke="#ef4444" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="donut-hole">
                <span>Total Categories</span>
                <strong>{categories.length}</strong>
              </div>
            </div>

            <div className="donut-legend">
              {chartData.map((item, index) => (
                <div 
                  key={`chart-legend-${item.label}`} 
                  className={`legend-item ${hoveredChartIndex === index ? 'highlight' : ''}`}
                  onMouseEnter={() => setHoveredChartIndex(index)}
                  onMouseLeave={() => setHoveredChartIndex(null)}
                >
                  <span className="legend-dot" style={{ backgroundColor: item.color }}></span>
                  <span className="legend-label">{item.label}</span>
                  <span className="legend-value">{item.value}%</span>
                  {hoveredChartIndex === index && (
                    <div className="legend-tooltip">{item.label}: {item.value}% Share</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions Component */}
        <div className="widget-card">
          <h3>Quick Actions</h3>
          <div className="quick-actions-grid">
            <div className="qa-item" onClick={() => openModal()}>
              <div className="qa-icon blue"><Plus size={20} /></div>
              <div>
                <strong>Add New Category</strong>
                <p>Create a new category</p>
              </div>
            </div>

            <div className="qa-item" onClick={() => setIsOrderModalOpen(true)}>
              <div className="qa-icon green"><Layers size={20} /></div>
              <div>
                <strong>Manage Category Order</strong>
                <p>Reorder display sequence</p>
              </div>
            </div>

            <div className="qa-item" onClick={() => setIsSettingsModalOpen(true)}>
              <div className="qa-icon purple"><Settings size={20} /></div>
              <div>
                <strong>Category Settings</strong>
                <p>Manage defaults & rules</p>
              </div>
            </div>

            <div className="qa-item" onClick={() => setIsImportModalOpen(true)}>
              <div className="qa-icon yellow"><Upload size={20} /></div>
              <div>
                <strong>Import Categories</strong>
                <p>Import categories from file</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Categories */}
        <div className="widget-card">
          <div className="widget-header">
            <h3>Top Categories</h3>
            <button className="btn-link">View All</button>
          </div>
          <ul className="top-categories-list">
            {[...categories]
              .sort((a, b) => b.properties - a.properties)
              .slice(0, 5)
              .map((item, idx) => (
                <li key={`top-cat-${item.id}`}>
                  <span className={`rank rank-${idx + 1}`}>{idx + 1}</span>
                  <span className="cat-name">{item.name}</span>
                  <span className="cat-props">{item.properties} Properties</span>
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* Add / Edit Category Dialog Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
              <button className="btn-close" onClick={() => setIsModalOpen(false)}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveCategory} className="modal-body">
              <h3 className="section-subtitle">Category Information</h3>

              <div className="form-row">
                <div className="form-group">
                  <label>Category Name <span className="required">*</span></label>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Enter category name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label>Slug <span className="required">*</span></label>
                  <input 
                    type="text" 
                    name="slug" 
                    placeholder="Enter slug" 
                    value={formData.slug} 
                    onChange={handleInputChange} 
                    required 
                  />
                  <small className="field-hint">URL-friendly slug format</small>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Parent Category</label>
                  <select name="parent" value={formData.parent} onChange={handleInputChange}>
                    <option value="">Select parent category</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>

                {/* Upload Section with File Preview */}
                <div className="form-group">
                  <label>Category Icon / Image</label>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    style={{ display: 'none' }} 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <div className="upload-box" onClick={() => fileInputRef.current?.click()}>
                    {formData.previewImg ? (
                      <div className="uploaded-preview-container">
                        <img src={formData.previewImg} alt="Preview" className="preview-thumb" />
                        <span>Change Image</span>
                      </div>
                    ) : (
                      <>
                        <Upload size={20} className="upload-icon" />
                        <span>Upload Icon File</span>
                        <small>PNG, SVG or JPG (Max. {settings.maxUploadMB}MB)</small>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Properties Assigned</label>
                  <input 
                    type="number" 
                    name="properties" 
                    value={formData.properties} 
                    onChange={handleInputChange} 
                  />
                </div>

                <div className="form-group">
                  <label>Featured Category</label>
                  <div className="toggle-group">
                    <button 
                      type="button" 
                      className={`btn-toggle ${!formData.featured ? 'active' : ''}`}
                      onClick={() => setFormData(p => ({ ...p, featured: false }))}
                    >
                      <Star size={14} /> No
                    </button>
                    <button 
                      type="button" 
                      className={`btn-toggle ${formData.featured ? 'active-featured' : ''}`}
                      onClick={() => setFormData(p => ({ ...p, featured: true }))}
                    >
                      <Star size={14} fill="#d97706" /> Yes
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Status</label>
                <div className="status-toggle-group">
                  <button 
                    type="button" 
                    className={`status-btn active-btn ${formData.status === 'Active' ? 'selected' : ''}`}
                    onClick={() => setFormData(p => ({ ...p, status: 'Active' }))}
                  >
                    <CheckCircle2 size={16} /> Active
                  </button>
                  <button 
                    type="button" 
                    className={`status-btn inactive-btn ${formData.status === 'Inactive' ? 'selected' : ''}`}
                    onClick={() => setFormData(p => ({ ...p, status: 'Inactive' }))}
                  >
                    <XCircle size={16} /> Inactive
                  </button>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-save">
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Import File Dialog Modal */}
      {isImportModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Import Categories</h2>
              <button className="btn-close" onClick={() => setIsImportModalOpen(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleImportSubmit} className="modal-body">
              <p style={{ fontSize: '13px', color: '#64748b' }}>
                Upload a CSV or JSON file with category details to quickly populate data.
              </p>
              <div className="form-group">
                <input type="file" ref={importInputRef} required accept=".csv, .json" />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setIsImportModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-save">Import File</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reorder Sequence Modal */}
      {isOrderModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Manage Category Sequence</h2>
              <button className="btn-close" onClick={() => setIsOrderModalOpen(false)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <ul className="order-list">
                {categories.map((cat, idx) => (
                  <li key={`order-${cat.id}`} className="order-item">
                    <span>{cat.name}</span>
                    <div className="order-controls">
                      <button 
                        className="btn-arrow" 
                        disabled={idx === 0} 
                        onClick={() => moveCategoryOrder(idx, 'up')}
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button 
                        className="btn-arrow" 
                        disabled={idx === categories.length - 1} 
                        onClick={() => moveCategoryOrder(idx, 'down')}
                      >
                        <ArrowDown size={14} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="modal-footer">
                <button className="btn-save" onClick={() => setIsOrderModalOpen(false)}>Done</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Category Preferences Settings Modal */}
      {isSettingsModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Category Preferences</h2>
              <button className="btn-close" onClick={() => setIsSettingsModalOpen(false)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Default Category Status</label>
                <select 
                  value={settings.defaultStatus} 
                  onChange={(e) => setSettings(s => ({ ...s, defaultStatus: e.target.value }))}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="form-group">
                <label>Max Icon Upload Size (MB)</label>
                <input 
                  type="number" 
                  value={settings.maxUploadMB} 
                  onChange={(e) => setSettings(s => ({ ...s, maxUploadMB: Number(e.target.value) }))} 
                />
              </div>
              <div className="modal-footer">
                <button className="btn-save" onClick={() => setIsSettingsModalOpen(false)}>Save Settings</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Box */}
      {deleteId && (
        <div className="modal-overlay">
          <div className="confirm-modal">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this category? This action cannot be undone.</p>
            <div className="confirm-actions">
              <button className="btn-cancel" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="btn-delete-confirm" onClick={handleDeleteConfirm}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* View Item Details Modal */}
      {viewCategory && (
        <div className="modal-overlay">
          <div className="confirm-modal align-left">
            <h3>Category Details</h3>
            <div>
              <p><strong>Name:</strong> {viewCategory.name}</p>
              <p><strong>Slug:</strong> {viewCategory.slug}</p>
              <p><strong>Parent:</strong> {viewCategory.parent}</p>
              <p><strong>Properties:</strong> {viewCategory.properties}</p>
              <p><strong>Status:</strong> {viewCategory.status}</p>
              <p><strong>Created:</strong> {viewCategory.date}</p>
            </div>
            <div className="confirm-actions">
              <button className="btn-cancel" onClick={() => setViewCategory(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;