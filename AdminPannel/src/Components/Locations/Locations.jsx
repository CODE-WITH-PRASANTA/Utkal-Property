import React, { useState, useMemo, useRef } from 'react';
import {
  FiPlus, FiUpload, FiDownload, FiMapPin, FiChevronDown,
  FiSearch, FiRotateCcw, FiEye, FiEdit2, FiTrash2, FiGlobe,
  FiMap, FiHome, FiMaximize2, FiX, FiCheck, FiStar, FiFileText
} from 'react-icons/fi';
import './Locations.css';

// Initial Mock Data
const INITIAL_LOCATIONS = [
  { id: 1, country: 'India', flag: '🇮🇳', state: 'Odisha', city: 'Bhubaneswar', area: 'Patia', pincode: '751024', properties: 290, featured: true, status: 'Active' },
  { id: 2, country: 'India', flag: '🇮🇳', state: 'Odisha', city: 'Bhubaneswar', area: 'Khandagiri', pincode: '751030', properties: 118, featured: true, status: 'Active' },
  { id: 3, country: 'India', flag: '🇮🇳', state: 'Odisha', city: 'Cuttack', area: 'CDA', pincode: '753014', properties: 85, featured: false, status: 'Active' },
  { id: 4, country: 'India', flag: '🇮🇳', state: 'Odisha', city: 'Puri', area: 'Swargadwar', pincode: '752001', properties: 62, featured: false, status: 'Active' },
  { id: 5, country: 'India', flag: '🇮🇳', state: 'Odisha', city: 'Rourkela', area: 'Civil Township', pincode: '769004', properties: 46, featured: false, status: 'Inactive' },
  { id: 6, country: 'India', flag: '🇮🇳', state: 'Maharashtra', city: 'Mumbai', area: 'Andheri West', pincode: '400053', properties: 412, featured: true, status: 'Active' },
  { id: 7, country: 'India', flag: '🇮🇳', state: 'Karnataka', city: 'Bengaluru', area: 'Koramangala', pincode: '560034', properties: 350, featured: true, status: 'Active' },
  { id: 8, country: 'India', flag: '🇮🇳', state: 'Delhi', city: 'New Delhi', area: 'Connaught Place', pincode: '110001', properties: 210, featured: false, status: 'Active' },
  { id: 9, country: 'USA', flag: '🇺🇸', state: 'California', city: 'Los Angeles', area: 'Hollywood', pincode: '90028', properties: 180, featured: true, status: 'Active' },
  { id: 10, country: 'USA', flag: '🇺🇸', state: 'New York', city: 'New York', area: 'Manhattan', pincode: '10001', properties: 520, featured: true, status: 'Active' },
  { id: 11, country: 'UK', flag: '🇬🇧', state: 'England', city: 'London', area: 'Westminster', pincode: 'SW1A', properties: 310, featured: true, status: 'Active' },
  { id: 12, country: 'India', flag: '🇮🇳', state: 'Odisha', city: 'Sambalpur', area: 'Burla', pincode: '768018', properties: 34, featured: false, status: 'Inactive' }
];

const Locations = () => {
  // Data & Selection State
  const [locations, setLocations] = useState(INITIAL_LOCATIONS);
  const [selectedIds, setSelectedIds] = useState([]);
  
  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    country: 'All',
    state: 'All',
    city: 'All',
    area: 'All',
    status: 'All',
    propertyCount: 'All'
  });

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Modals & Popups
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [isBulkOpen, setIsBulkOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    country: 'India',
    state: '',
    city: '',
    area: '',
    pincode: '',
    latitude: '',
    longitude: '',
    properties: '0',
    status: 'Active',
    image: null,
    imagePreview: null
  });

  const fileInputRef = useRef(null);
  const importFileRef = useRef(null);

  // Filter Dropdown Unique Options
  const uniqueCountries = useMemo(() => ['All', ...new Set(locations.map(item => item.country))], [locations]);
  const uniqueStates = useMemo(() => ['All', ...new Set(locations.map(item => item.state))], [locations]);
  const uniqueCities = useMemo(() => ['All', ...new Set(locations.map(item => item.city))], [locations]);
  const uniqueAreas = useMemo(() => ['All', ...new Set(locations.map(item => item.area))], [locations]);

  // Handle Filtering & Searching
  const filteredLocations = useMemo(() => {
    return locations.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.pincode.includes(searchQuery);

      const matchesCountry = filters.country === 'All' || item.country === filters.country;
      const matchesState = filters.state === 'All' || item.state === filters.state;
      const matchesCity = filters.city === 'All' || item.city === filters.city;
      const matchesArea = filters.area === 'All' || item.area === filters.area;
      const matchesStatus = filters.status === 'All' || item.status === filters.status;
      
      let matchesProps = true;
      if (filters.propertyCount === '0-50') matchesProps = item.properties <= 50;
      else if (filters.propertyCount === '51-150') matchesProps = item.properties > 50 && item.properties <= 150;
      else if (filters.propertyCount === '150+') matchesProps = item.properties > 150;

      return matchesSearch && matchesCountry && matchesState && matchesCity && matchesArea && matchesStatus && matchesProps;
    });
  }, [locations, searchQuery, filters]);

  // Stats Calculation
  const stats = useMemo(() => ({
    total: locations.length,
    countries: new Set(locations.map(i => i.country)).size,
    states: new Set(locations.map(i => i.state)).size,
    cities: new Set(locations.map(i => i.city)).size,
    areas: locations.length,
    properties: locations.reduce((acc, i) => acc + Number(i.properties), 0)
  }), [locations]);

  // Pagination Calculations
  const totalPages = Math.ceil(filteredLocations.length / itemsPerPage) || 1;
  const currentTableData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredLocations.slice(start, start + itemsPerPage);
  }, [filteredLocations, currentPage, itemsPerPage]);

  // Handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(currentTableData.map(item => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const resetFilters = () => {
    setSearchQuery('');
    setFilters({ country: 'All', state: 'All', city: 'All', area: 'All', status: 'All', propertyCount: 'All' });
    setCurrentPage(1);
  };

  // Open Modal for Add or Edit
  const openAddEditModal = (item = null) => {
    if (item) {
      setEditingLocation(item);
      setFormData({
        country: item.country,
        state: item.state,
        city: item.city,
        area: item.area,
        pincode: item.pincode,
        latitude: '',
        longitude: '',
        properties: item.properties.toString(),
        status: item.status,
        image: null,
        imagePreview: null
      });
    } else {
      setEditingLocation(null);
      setFormData({
        country: 'India',
        state: '',
        city: '',
        area: '',
        pincode: '',
        latitude: '',
        longitude: '',
        properties: '0',
        status: 'Active',
        image: null,
        imagePreview: null
      });
    }
    setIsAddEditOpen(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSaveLocation = (e) => {
    e.preventDefault();
    if (editingLocation) {
      setLocations(prev => prev.map(item => item.id === editingLocation.id ? {
        ...item,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        area: formData.area,
        pincode: formData.pincode,
        properties: Number(formData.properties),
        status: formData.status
      } : item));
    } else {
      const newItem = {
        id: Date.now(),
        country: formData.country,
        flag: formData.country === 'USA' ? '🇺🇸' : formData.country === 'UK' ? '🇬🇧' : '🇮🇳',
        state: formData.state || 'Odisha',
        city: formData.city || 'Bhubaneswar',
        area: formData.area || 'New Area',
        pincode: formData.pincode || '751001',
        properties: Number(formData.properties) || 0,
        featured: false,
        status: formData.status
      };
      setLocations(prev => [newItem, ...prev]);
    }
    setIsAddEditOpen(false);
  };

  const handleDelete = () => {
    setLocations(prev => prev.filter(item => item.id !== deleteId));
    setSelectedIds(prev => prev.filter(i => i !== deleteId));
    setDeleteId(null);
  };

  const handleExportCSV = () => {
    const headers = ['ID,Country,State,City,Area,Pincode,Properties,Status\n'];
    const rows = filteredLocations.map(l => 
      `${l.id},"${l.country}","${l.state}","${l.city}","${l.area}","${l.pincode}",${l.properties},"${l.status}"`
    );
    const blob = new Blob([...headers, ...rows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'locations.csv';
    a.click();
  };

  const handleBulkDelete = () => {
    setLocations(prev => prev.filter(item => !selectedIds.includes(item.id)));
    setSelectedIds([]);
    setIsBulkOpen(false);
  };

  return (
    <div className="loc-container">
      {/* Top Header */}
      <header className="loc-header">
        <div>
          <h1>Locations</h1>
          <nav className="loc-breadcrumb">
            Dashboard &gt; Property Management &gt; <span>Locations</span>
          </nav>
        </div>
        <div className="loc-header-actions">
          <button className="btn btn-primary" onClick={() => openAddEditModal()}>
            <FiPlus /> Add New Location
          </button>
          <button className="btn btn-outline" onClick={() => setIsImportOpen(true)}>
            <FiUpload /> Import Locations
          </button>
          <button className="btn btn-outline" onClick={handleExportCSV}>
            <FiDownload /> Export CSV
          </button>
          <button className="btn btn-outline" onClick={() => setIsMapModalOpen(true)}>
            <FiMapPin /> Map View
          </button>
          
          <div className="bulk-wrapper">
            <button className="btn btn-outline" onClick={() => setIsBulkOpen(!isBulkOpen)}>
              Bulk Actions <FiChevronDown />
            </button>
            {isBulkOpen && (
              <div className="bulk-dropdown">
                <button onClick={handleBulkDelete} disabled={selectedIds.length === 0}>
                  Delete Selected ({selectedIds.length})
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 6 Top Stats Cards */}
      <section className="loc-stats-grid">
        <div className="stat-card">
          <div className="stat-icon icon-blue"><FiMapPin /></div>
          <div>
            <span className="stat-label">Total Locations</span>
            <h2>{stats.total}</h2>
            <span className="stat-sub">All Locations</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon icon-green"><FiGlobe /></div>
          <div>
            <span className="stat-label">Countries</span>
            <h2>{stats.countries}</h2>
            <span className="stat-sub">Active Countries</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon icon-emerald"><FiMap /></div>
          <div>
            <span className="stat-label">States</span>
            <h2>{stats.states}</h2>
            <span className="stat-sub">Active States</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon icon-purple"><FiHome /></div>
          <div>
            <span className="stat-label">Cities</span>
            <h2>{stats.cities}</h2>
            <span className="stat-sub">Total Cities</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon icon-rose"><FiMapPin /></div>
          <div>
            <span className="stat-label">Local Areas</span>
            <h2>{stats.areas}</h2>
            <span className="stat-sub">Total Areas</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon icon-amber"><FiHome /></div>
          <div>
            <span className="stat-label">Properties</span>
            <h2>{stats.properties.toLocaleString()}</h2>
            <span className="stat-sub">In All Locations</span>
          </div>
        </div>
      </section>

      {/* Dynamic Filter Section */}
      <section className="loc-filter-card">
        <div className="search-input-wrapper">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search location..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Country</label>
          <select value={filters.country} onChange={(e) => setFilters({...filters, country: e.target.value})}>
            {uniqueCountries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="filter-group">
          <label>State</label>
          <select value={filters.state} onChange={(e) => setFilters({...filters, state: e.target.value})}>
            {uniqueStates.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="filter-group">
          <label>City</label>
          <select value={filters.city} onChange={(e) => setFilters({...filters, city: e.target.value})}>
            {uniqueCities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="filter-group">
          <label>Area</label>
          <select value={filters.area} onChange={(e) => setFilters({...filters, area: e.target.value})}>
            {uniqueAreas.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>

        <div className="filter-group">
          <label>Status</label>
          <select value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})}>
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Property Count</label>
          <select value={filters.propertyCount} onChange={(e) => setFilters({...filters, propertyCount: e.target.value})}>
            <option value="All">All</option>
            <option value="0-50">0 - 50</option>
            <option value="51-150">51 - 150</option>
            <option value="150+">150+</option>
          </select>
        </div>

        <button className="btn-reset" onClick={resetFilters}>
          <FiRotateCcw /> Reset Filter
        </button>
      </section>

      {/* Main Table Area */}
      <div className="table-wrapper">
        <table className="loc-table">
          <thead>
            <tr>
              <th>
                <input 
                  type="checkbox" 
                  onChange={handleSelectAll} 
                  checked={currentTableData.length > 0 && currentTableData.every(i => selectedIds.includes(i.id))}
                />
              </th>
              <th>Country</th>
              <th>State</th>
              <th>City</th>
              <th>Area / Locality</th>
              <th>Pincode</th>
              <th>Properties</th>
              <th>Featured</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTableData.length > 0 ? (
              currentTableData.map((row) => (
                <tr key={row.id}>
                  <td>
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(row.id)} 
                      onChange={() => handleSelectOne(row.id)}
                    />
                  </td>
                  <td>
                    <span className="country-cell"><span className="flag-icon">{row.flag}</span> {row.country}</span>
                  </td>
                  <td>{row.state}</td>
                  <td>{row.city}</td>
                  <td className="fw-semibold">{row.area}</td>
                  <td>{row.pincode}</td>
                  <td>{row.properties}</td>
                  <td>
                    {row.featured ? (
                      <span className="badge-featured featured-yes"><FiStar /> Yes</span>
                    ) : (
                      <span className="badge-featured featured-no"><FiStar /> No</span>
                    )}
                  </td>
                  <td>
                    <span className={`badge-status ${row.status.toLowerCase()}`}>
                      {row.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-action view" onClick={() => { setViewData(row); setIsViewOpen(true); }}>
                        <FiEye />
                      </button>
                      <button className="btn-action edit" onClick={() => openAddEditModal(row)}>
                        <FiEdit2 />
                      </button>
                      <button className="btn-action delete" onClick={() => setDeleteId(row.id)}>
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="no-data-cell">No matching locations found</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Footer & Pagination */}
        <div className="loc-pagination">
          <span>
            Showing {filteredLocations.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredLocations.length)} of {filteredLocations.length} entries
          </span>

          <div className="pagination-controls">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>&lt;</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button 
                key={page} 
                className={currentPage === page ? 'active' : ''}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>&gt;</button>
          </div>

          <div className="page-size-selector">
            <select 
              value={itemsPerPage} 
              onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
            >
              <option value={3}>3 / page</option>
              <option value={5}>5 / page</option>
              <option value={10}>10 / page</option>
              <option value={15}>15 / page</option>
              <option value={20}>20 / page</option>
            </select>
          </div>
        </div>
      </div>

      {/* Map Overview Section & Top Performing Locations */}
      <div className="loc-bottom-grid">
        <div className="map-overview-card">
          <div className="card-header">
            <h3>Location Map Overview</h3>
          </div>
          <div className="map-preview-wrapper">
            <iframe 
              title="Location Map"
              src="https://maps.google.com/maps?q=Bhubaneswar&t=&z=11&ie=UTF8&iwloc=&output=embed"
              width="100%" 
              height="280" 
              style={{ border: 0, borderRadius: '8px' }} 
              allowFullScreen="" 
              loading="lazy"
            ></iframe>
            <button className="btn-open-map" onClick={() => setIsMapModalOpen(true)}>
              <FiMaximize2 /> Open Full Map
            </button>
          </div>
        </div>

        <div className="top-locations-card">
          <h3>Top Performing Locations</h3>
          <ul className="top-locations-list">
            {locations.slice().sort((a,b) => b.properties - a.properties).slice(0, 4).map((item, idx) => (
              <li key={item.id}>
                <span className={`rank-badge rank-${idx + 1}`}>{idx + 1}</span>
                <div className="top-loc-info">
                  <strong>{item.area}, {item.city}</strong>
                  <span>{item.properties} Properties</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* POPUP 1: Add/Edit Location Modal */}
      {isAddEditOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h2>{editingLocation ? 'Edit Location' : 'Add New Location'}</h2>
              <button className="btn-close" onClick={() => setIsAddEditOpen(false)}><FiX /></button>
            </div>
            <form onSubmit={handleSaveLocation}>
              <div className="modal-body">
                <h4 className="section-title">Location Information</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>Country <span className="req">*</span></label>
                    <select value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})}>
                      <option value="India">India</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>State <span className="req">*</span></label>
                    <input 
                      type="text" 
                      placeholder="Enter state" 
                      required 
                      value={formData.state} 
                      onChange={e => setFormData({...formData, state: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>City <span className="req">*</span></label>
                    <input 
                      type="text" 
                      placeholder="Enter city name" 
                      required 
                      value={formData.city} 
                      onChange={e => setFormData({...formData, city: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Area / Locality <span className="req">*</span></label>
                    <input 
                      type="text" 
                      placeholder="Enter area or locality" 
                      required 
                      value={formData.area} 
                      onChange={e => setFormData({...formData, area: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Pincode <span className="req">*</span></label>
                    <input 
                      type="text" 
                      placeholder="Enter pincode" 
                      required 
                      value={formData.pincode} 
                      onChange={e => setFormData({...formData, pincode: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Latitude (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="Enter latitude" 
                      value={formData.latitude} 
                      onChange={e => setFormData({...formData, latitude: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Longitude (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="Enter longitude" 
                      value={formData.longitude} 
                      onChange={e => setFormData({...formData, longitude: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Properties Assigned</label>
                    <input 
                      type="number" 
                      placeholder="Enter number of properties" 
                      value={formData.properties} 
                      onChange={e => setFormData({...formData, properties: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <div className="status-toggle-btns">
                      <button 
                        type="button" 
                        className={`status-btn active-btn ${formData.status === 'Active' ? 'selected' : ''}`}
                        onClick={() => setFormData({...formData, status: 'Active'})}
                      >
                        <FiCheck /> Active
                      </button>
                      <button 
                        type="button" 
                        className={`status-btn inactive-btn ${formData.status === 'Inactive' ? 'selected' : ''}`}
                        onClick={() => setFormData({...formData, status: 'Inactive'})}
                      >
                        <FiX /> Inactive
                      </button>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Location Image (Optional)</label>
                  <div className="file-upload-box" onClick={() => fileInputRef.current.click()}>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleImageUpload} 
                      hidden 
                      accept="image/*" 
                    />
                    {formData.imagePreview ? (
                      <div className="preview-info">
                        <img src={formData.imagePreview} alt="Preview" className="img-thumb" />
                        <span>{formData.image?.name || 'Image Uploaded'}</span>
                      </div>
                    ) : (
                      <>
                        <FiUpload className="upload-icon" />
                        <span>Upload Image</span>
                        <small>JPG, PNG or WEBP (Max. 2MB)</small>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setIsAddEditOpen(false)}>Cancel</button>
                <button type="submit" className="btn-save">Save Location</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POPUP 2: Import Locations Modal */}
      {isImportOpen && (
        <div className="modal-overlay">
          <div className="modal-box small-modal">
            <div className="modal-header">
              <h2>Import Locations</h2>
              <button className="btn-close" onClick={() => setIsImportOpen(false)}><FiX /></button>
            </div>
            <div className="modal-body">
              <p className="modal-desc">Upload a CSV or Excel file containing location data structured with Country, State, City, Area, Pincode.</p>
              <div className="file-upload-box" onClick={() => importFileRef.current.click()}>
                <input type="file" ref={importFileRef} hidden accept=".csv, .xlsx" />
                <FiFileText className="upload-icon" />
                <span>Click to Upload CSV / Excel</span>
                <small>Max file size 5MB</small>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setIsImportOpen(false)}>Cancel</button>
              <button className="btn-save" onClick={() => { alert('Import Processed!'); setIsImportOpen(false); }}>Upload & Import</button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP 3: Delete Confirmation Modal */}
      {deleteId && (
        <div className="modal-overlay">
          <div className="confirm-modal-box">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this location? This action cannot be undone.</p>
            <div className="confirm-actions">
              <button className="btn-cancel" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="btn-danger" onClick={handleDelete}>Delete Location</button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP 4: Full Map Modal */}
      {isMapModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box large-modal">
            <div className="modal-header">
              <h2>Location Map View</h2>
              <button className="btn-close" onClick={() => setIsMapModalOpen(false)}><FiX /></button>
            </div>
            <div className="modal-body p-0">
              <iframe 
                title="Full Map"
                src="https://maps.google.com/maps?q=Bhubaneswar&t=&z=12&ie=UTF8&iwloc=&output=embed"
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* POPUP 5: View Details Modal */}
      {isViewOpen && viewData && (
        <div className="modal-overlay">
          <div className="modal-box small-modal">
            <div className="modal-header">
              <h2>Location Details</h2>
              <button className="btn-close" onClick={() => setIsViewOpen(false)}><FiX /></button>
            </div>
            <div className="modal-body view-details-grid">
              <div><strong>Country:</strong> {viewData.flag} {viewData.country}</div>
              <div><strong>State:</strong> {viewData.state}</div>
              <div><strong>City:</strong> {viewData.city}</div>
              <div><strong>Area:</strong> {viewData.area}</div>
              <div><strong>Pincode:</strong> {viewData.pincode}</div>
              <div><strong>Properties:</strong> {viewData.properties}</div>
              <div><strong>Status:</strong> <span className={`badge-status ${viewData.status.toLowerCase()}`}>{viewData.status}</span></div>
            </div>
            <div className="modal-footer">
              <button className="btn-save" onClick={() => setIsViewOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Locations;