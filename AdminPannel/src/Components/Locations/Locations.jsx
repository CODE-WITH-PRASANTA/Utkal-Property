import { useEffect, useMemo, useRef, useState } from 'react';
import {
  FiPlus, FiUpload, FiDownload, FiMapPin, FiChevronDown,
  FiSearch, FiRotateCcw, FiEye, FiEdit2, FiTrash2, FiGlobe,
  FiMap, FiHome, FiMaximize2, FiX, FiCheck, FiStar, FiFileText
} from 'react-icons/fi';
import './Locations.css';
import API, { IMG_URL } from '../../api/axios';

const COUNTRY_FLAGS = {
  India: '🇮🇳',
  USA: '🇺🇸',
  UK: '🇬🇧',
};

const toLocationView = (location) => ({
  id: location._id,
  country: location.country,
  flag: COUNTRY_FLAGS[location.country] || '📍',
  state: location.state,
  city: location.city,
  area: location.area,
  pincode: location.pincode,
  latitude: location.latitude ?? '',
  longitude: location.longitude ?? '',
  properties: Number(location.properties) || 0,
  featured: Boolean(location.featured),
  status: location.status,
  image: location.image ? (location.image.startsWith('http') ? location.image : `${IMG_URL}${location.image}`) : null,
});

// Initial Mock Data
const Locations = () => {
  // Data & Selection State
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
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
    featured: false,
    status: 'Active',
    image: null,
    imagePreview: null
  });

  const fileInputRef = useRef(null);
  const importFileRef = useRef(null);

  useEffect(() => {
    let isCurrent = true;

    API.get('/locations')
      .then(({ data }) => {
        if (isCurrent) setLocations((data.data || []).map(toLocationView));
      })
      .catch((requestError) => {
        if (isCurrent) setError(requestError.response?.data?.message || 'Unable to load locations.');
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

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
        latitude: item.latitude?.toString() || '',
        longitude: item.longitude?.toString() || '',
        properties: item.properties.toString(),
        featured: item.featured,
        status: item.status,
        image: null,
        imagePreview: item.image
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
        featured: false,
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

  const handleSaveLocation = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      setError('');
      const payload = new FormData();
      ['country', 'state', 'city', 'area', 'pincode', 'latitude', 'longitude', 'properties', 'status'].forEach((field) => {
        payload.append(field, formData[field]);
      });
      payload.append('featured', String(formData.featured));
      if (formData.image) payload.append('image', formData.image);

      const response = editingLocation
        ? await API.put(`/locations/${editingLocation.id}`, payload)
        : await API.post('/locations', payload);
      const savedLocation = toLocationView(response.data.data);

      setLocations((previous) => editingLocation
        ? previous.map((location) => location.id === savedLocation.id ? savedLocation : location)
        : [savedLocation, ...previous]);
      setIsAddEditOpen(false);
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to save location.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      setError('');
      await API.delete(`/locations/${deleteId}`);
      setLocations((previous) => previous.filter((location) => location.id !== deleteId));
      setSelectedIds((previous) => previous.filter((id) => id !== deleteId));
      setDeleteId(null);
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to delete location.');
    }
  };

  const handleExportCSV = () => {
    if (!filteredLocations.length) {
      setError('There are no locations to export.');
      return;
    }

    const headers = ['ID,Country,State,City,Area,Pincode,Properties,Status'];
    const rows = filteredLocations.map(l => 
      `${l.id},"${l.country}","${l.state}","${l.city}","${l.area}","${l.pincode}",${l.properties},"${l.status}"`
    );
    const blob = new Blob([[headers, ...rows].join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'locations.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleBulkDelete = async () => {
    if (!selectedIds.length) return;
    try {
      setError('');
      await Promise.all(selectedIds.map((id) => API.delete(`/locations/${id}`)));
      setLocations((previous) => previous.filter((location) => !selectedIds.includes(location.id)));
      setSelectedIds([]);
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to delete selected locations.');
    } finally {
      setIsBulkOpen(false);
    }
  };

  const handleImportLocations = async () => {
    const file = importFileRef.current?.files[0];
    if (!file) {
      setError('Choose a CSV or JSON file to import locations.');
      return;
    }

    try {
      setError('');
      const content = await file.text();
      const parsed = file.name.toLowerCase().endsWith('.json')
        ? JSON.parse(content)
        : (() => {
            const [headerLine, ...rows] = content.trim().split(/\r?\n/);
            const headers = headerLine.split(',').map((header) => header.trim().toLowerCase());
            return rows.filter(Boolean).map((row) => {
              const values = row.split(',').map((value) => value.trim().replace(/^"|"$/g, ''));
              return headers.reduce((location, header, index) => ({ ...location, [header]: values[index] }), {});
            });
          })();
      const importedLocations = Array.isArray(parsed) ? parsed : parsed.locations || [];
      const validLocations = importedLocations.filter((location) =>
        location.country && location.state && location.city && location.area && location.pincode,
      );

      if (!validLocations.length) {
        throw new Error('Each imported location needs country, state, city, area, and pincode values.');
      }

      const responses = await Promise.all(validLocations.map((location) => API.post('/locations', {
        country: location.country,
        state: location.state,
        city: location.city,
        area: location.area,
        pincode: location.pincode,
        latitude: location.latitude || '',
        longitude: location.longitude || '',
        properties: Number(location.properties) || 0,
        featured: location.featured === true || String(location.featured).toLowerCase() === 'true',
        status: location.status === 'Inactive' ? 'Inactive' : 'Active',
      })));

      setLocations((previous) => [
        ...responses.map((response) => toLocationView(response.data.data)),
        ...previous,
      ]);
      setIsImportOpen(false);
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || 'Unable to import locations.');
    }
  };

  const mapLocation = viewData || filteredLocations[0];
  const mapQuery = mapLocation
    ? encodeURIComponent([mapLocation.area, mapLocation.city, mapLocation.state, mapLocation.country].filter(Boolean).join(', '))
    : 'India';
  const mapUrl = `https://maps.google.com/maps?q=${mapQuery}&t=&z=11&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="locations-wrapper">
      {/* Top Header */}
      <header className="locations-header">
        <div>
          <h1 className="locations-title">Locations</h1>
          <nav className="locations-breadcrumb">
            Dashboard &gt; Property Management &gt; <span>Locations</span>
          </nav>
        </div>
        <div className="locations-header-actions">
          <button className="locations-btn locations-btn-primary" onClick={() => openAddEditModal()}>
            <FiPlus /> Add New Location
          </button>

          <button className="locations-btn locations-btn-outline" onClick={() => setIsImportOpen(true)}>
            <FiUpload /> Import
          </button>

          <button className="locations-btn locations-btn-outline" onClick={handleExportCSV}>
            <FiDownload /> Export CSV
          </button>

          <button className="locations-btn locations-btn-outline" onClick={() => setIsMapModalOpen(true)}>
            <FiMapPin /> Map View
          </button>
          
          <div className="locations-bulk-wrapper">
            <button className="locations-btn locations-btn-outline" onClick={() => setIsBulkOpen(!isBulkOpen)}>
              Bulk Actions <FiChevronDown />
            </button>
            {isBulkOpen && (
              <div className="locations-bulk-dropdown">
                <button onClick={handleBulkDelete} disabled={selectedIds.length === 0}>
                  Delete Selected ({selectedIds.length})
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {error && <div role="alert" className="locations-error-message">{error}</div>}

      {/* 6 Top Stats Cards */}
      <section className="locations-stats-grid">
        <div className="locations-stat-card">
          <div className="locations-stat-icon locations-icon-blue"><FiMapPin /></div>
          <div>
            <span className="locations-stat-label">Total Locations</span>
            <h2>{stats.total}</h2>
            <span className="locations-stat-sub">All Locations</span>
          </div>
        </div>
        <div className="locations-stat-card">
          <div className="locations-stat-icon locations-icon-green"><FiGlobe /></div>
          <div>
            <span className="locations-stat-label">Countries</span>
            <h2>{stats.countries}</h2>
            <span className="locations-stat-sub">Active Countries</span>
          </div>
        </div>
        <div className="locations-stat-card">
          <div className="locations-stat-icon locations-icon-emerald"><FiMap /></div>
          <div>
            <span className="locations-stat-label">States</span>
            <h2>{stats.states}</h2>
            <span className="locations-stat-sub">Active States</span>
          </div>
        </div>
        <div className="locations-stat-card">
          <div className="locations-stat-icon locations-icon-purple"><FiHome /></div>
          <div>
            <span className="locations-stat-label">Cities</span>
            <h2>{stats.cities}</h2>
            <span className="locations-stat-sub">Total Cities</span>
          </div>
        </div>
        <div className="locations-stat-card">
          <div className="locations-stat-icon locations-icon-rose"><FiMapPin /></div>
          <div>
            <span className="locations-stat-label">Local Areas</span>
            <h2>{stats.areas}</h2>
            <span className="locations-stat-sub">Total Areas</span>
          </div>
        </div>
        <div className="locations-stat-card">
          <div className="locations-stat-icon locations-icon-amber"><FiHome /></div>
          <div>
            <span className="locations-stat-label">Properties</span>
            <h2>{stats.properties.toLocaleString()}</h2>
            <span className="locations-stat-sub">In All Locations</span>
          </div>
        </div>
      </section>

      {/* Dynamic Filter Section */}
      <section className="locations-filter-card">
        <div className="locations-search-input-wrapper">
          <FiSearch className="locations-search-icon" />
          <input 
            type="text" 
            placeholder="Search location..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="locations-filter-group">
          <label>Country</label>
          <select value={filters.country} onChange={(e) => setFilters({...filters, country: e.target.value})}>
            {uniqueCountries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="locations-filter-group">
          <label>State</label>
          <select value={filters.state} onChange={(e) => setFilters({...filters, state: e.target.value})}>
            {uniqueStates.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="locations-filter-group">
          <label>City</label>
          <select value={filters.city} onChange={(e) => setFilters({...filters, city: e.target.value})}>
            {uniqueCities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="locations-filter-group">
          <label>Area</label>
          <select value={filters.area} onChange={(e) => setFilters({...filters, area: e.target.value})}>
            {uniqueAreas.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>

        <div className="locations-filter-group">
          <label>Status</label>
          <select value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})}>
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="locations-filter-group">
          <label>Property Count</label>
          <select value={filters.propertyCount} onChange={(e) => setFilters({...filters, propertyCount: e.target.value})}>
            <option value="All">All</option>
            <option value="0-50">0 - 50</option>
            <option value="51-150">51 - 150</option>
            <option value="150+">150+</option>
          </select>
        </div>

        <button className="locations-btn-reset" onClick={resetFilters}>
          <FiRotateCcw /> Reset Filter
        </button>
      </section>

      {/* Main Table Area */}
      <div className="locations-table-wrapper">
        <table className="locations-table">
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
            {isLoading ? (
              <tr>
                <td colSpan="10" className="locations-no-data-cell">Loading locations…</td>
              </tr>
            ) : currentTableData.length > 0 ? (
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
                    <span className="locations-country-cell"><span className="locations-flag-icon">{row.flag}</span> {row.country}</span>
                  </td>
                  <td>{row.state}</td>
                  <td>{row.city}</td>
                  <td className="locations-fw-semibold">{row.area}</td>
                  <td>{row.pincode}</td>
                  <td>{row.properties}</td>
                  <td>
                    {row.featured ? (
                      <span className="locations-badge-featured locations-featured-yes"><FiStar /> Yes</span>
                    ) : (
                      <span className="locations-badge-featured locations-featured-no"><FiStar /> No</span>
                    )}
                  </td>
                  <td>
                    <span className={`locations-badge-status locations-status-${row.status.toLowerCase()}`}>
                      {row.status}
                    </span>
                  </td>
                  <td>
                    <div className="locations-action-buttons">
                      <button className="locations-btn-action locations-btn-view" onClick={() => { setViewData(row); setIsViewOpen(true); }}>
                        <FiEye />
                      </button>
                      <button className="locations-btn-action locations-btn-edit" onClick={() => openAddEditModal(row)}>
                        <FiEdit2 />
                      </button>
                      <button className="locations-btn-action locations-btn-delete" onClick={() => setDeleteId(row.id)}>
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="locations-no-data-cell">No matching locations found</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Footer & Pagination */}
        <div className="locations-pagination">
          <span>
            Showing {filteredLocations.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredLocations.length)} of {filteredLocations.length} entries
          </span>

          <div className="locations-pagination-controls">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>&lt;</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button 
                key={page} 
                className={currentPage === page ? 'locations-page-active' : ''}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>&gt;</button>
          </div>

          <div className="locations-page-size-selector">
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
      <div className="locations-bottom-grid">
        <div className="locations-map-overview-card">
          <div className="locations-card-header">
            <h3>Location Map Overview</h3>
          </div>
          <div className="locations-map-preview-wrapper">
            <iframe 
              title="Location Map"
                src={mapUrl}
              width="100%" 
              height="280" 
              style={{ border: 0, borderRadius: '8px' }} 
              allowFullScreen="" 
              loading="lazy"
            ></iframe>
            <button className="locations-btn-open-map" onClick={() => setIsMapModalOpen(true)}>
              <FiMaximize2 /> Open Full Map
            </button>
          </div>
        </div>

        <div className="locations-top-card">
          <h3>Top Performing Locations</h3>
          <ul className="locations-top-list">
            {locations.slice().sort((a,b) => b.properties - a.properties).slice(0, 4).map((item, idx) => (
              <li key={item.id}>
                <span className={`locations-rank-badge locations-rank-${idx + 1}`}>{idx + 1}</span>
                <div className="locations-top-info">
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
        <div className="locations-modal-overlay">
          <div className="locations-modal-box">
            <div className="locations-modal-header">
              <h2>{editingLocation ? 'Edit Location' : 'Add New Location'}</h2>
              <button className="locations-btn-close" onClick={() => setIsAddEditOpen(false)}><FiX /></button>
            </div>
            <form onSubmit={handleSaveLocation}>
              <div className="locations-modal-body">
                <h4 className="locations-section-title">Location Information</h4>
                <div className="locations-form-row">
                  <div className="locations-form-group">
                    <label>Country <span className="locations-req">*</span></label>
                    <select value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})}>
                      <option value="India">India</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                    </select>
                  </div>
                  <div className="locations-form-group">
                    <label>State <span className="locations-req">*</span></label>
                    <input 
                      type="text" 
                      placeholder="Enter state" 
                      required 
                      value={formData.state} 
                      onChange={e => setFormData({...formData, state: e.target.value})}
                    />
                  </div>
                  <div className="locations-form-group">
                    <label>City <span className="locations-req">*</span></label>
                    <input 
                      type="text" 
                      placeholder="Enter city name" 
                      required 
                      value={formData.city} 
                      onChange={e => setFormData({...formData, city: e.target.value})}
                    />
                  </div>
                </div>

                <div className="locations-form-row">
                  <div className="locations-form-group">
                    <label>Area / Locality <span className="locations-req">*</span></label>
                    <input 
                      type="text" 
                      placeholder="Enter area or locality" 
                      required 
                      value={formData.area} 
                      onChange={e => setFormData({...formData, area: e.target.value})}
                    />
                  </div>
                  <div className="locations-form-group">
                    <label>Pincode <span className="locations-req">*</span></label>
                    <input 
                      type="text" 
                      placeholder="Enter pincode" 
                      required 
                      value={formData.pincode} 
                      onChange={e => setFormData({...formData, pincode: e.target.value})}
                    />
                  </div>
                  <div className="locations-form-group">
                    <label>Latitude (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="Enter latitude" 
                      value={formData.latitude} 
                      onChange={e => setFormData({...formData, latitude: e.target.value})}
                    />
                  </div>
                </div>

                <div className="locations-form-row">
                  <div className="locations-form-group">
                    <label>Longitude (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="Enter longitude" 
                      value={formData.longitude} 
                      onChange={e => setFormData({...formData, longitude: e.target.value})}
                    />
                  </div>
                  <div className="locations-form-group">
                    <label>Properties Assigned</label>
                    <input 
                      type="number" 
                      placeholder="Enter number of properties" 
                      value={formData.properties} 
                      onChange={e => setFormData({...formData, properties: e.target.value})}
                    />
                  </div>
                  <div className="locations-form-group">
                    <label>Status</label>
                    <div className="locations-status-toggle-btns">
                      <button 
                        type="button" 
                        className={`locations-status-btn locations-active-btn ${formData.status === 'Active' ? 'locations-status-selected' : ''}`}
                        onClick={() => setFormData({...formData, status: 'Active'})}
                      >
                        <FiCheck /> Active
                      </button>
                      <button 
                        type="button" 
                        className={`locations-status-btn locations-inactive-btn ${formData.status === 'Inactive' ? 'locations-status-selected' : ''}`}
                        onClick={() => setFormData({...formData, status: 'Inactive'})}
                      >
                        <FiX /> Inactive
                      </button>
                    </div>
                  </div>
                </div>

                <div className="locations-form-group">
                  <label>Location Image (Optional)</label>
                  <div className="locations-file-upload-box" onClick={() => fileInputRef.current.click()}>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleImageUpload} 
                      hidden 
                      accept="image/*" 
                    />
                    {formData.imagePreview ? (
                      <div className="locations-preview-info">
                        <img src={formData.imagePreview} alt="Preview" className="locations-img-thumb" />
                        <span>{formData.image?.name || 'Image Uploaded'}</span>
                      </div>
                    ) : (
                      <>
                        <FiUpload className="locations-upload-icon" />
                        <span>Upload Image</span>
                        <small>JPG, PNG or WEBP (Max. 2MB)</small>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="locations-modal-footer">
                <button type="button" className="locations-btn-cancel" onClick={() => setIsAddEditOpen(false)}>Cancel</button>
                <button type="submit" className="locations-btn-save" disabled={isSaving}>
                  {isSaving ? 'Saving…' : 'Save Location'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POPUP 2: Import Locations Modal */}
      {isImportOpen && (
        <div className="locations-modal-overlay">
          <div className="locations-modal-box locations-small-modal">
            <div className="locations-modal-header">
              <h2>Import Locations</h2>
              <button className="locations-btn-close" onClick={() => setIsImportOpen(false)}><FiX /></button>
            </div>
            <div className="locations-modal-body">
              <p className="locations-modal-desc">Upload a CSV or JSON file with Country, State, City, Area, and Pincode columns.</p>
              <div className="locations-file-upload-box" onClick={() => importFileRef.current.click()}>
                <input type="file" ref={importFileRef} hidden accept=".csv,.json" />
                <FiFileText className="locations-upload-icon" />
                <span>Click to Upload CSV / JSON</span>
                <small>Max file size 5MB</small>
              </div>
            </div>
            <div className="locations-modal-footer">
              <button className="locations-btn-cancel" onClick={() => setIsImportOpen(false)}>Cancel</button>
              <button className="locations-btn-save" onClick={handleImportLocations}>Upload & Import</button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP 3: Delete Confirmation Modal */}
      {deleteId && (
        <div className="locations-modal-overlay">
          <div className="locations-confirm-modal-box">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this location? This action cannot be undone.</p>
            <div className="locations-confirm-actions">
              <button className="locations-btn-cancel" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="locations-btn-danger" onClick={handleDelete}>Delete Location</button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP 4: Full Map Modal */}
      {isMapModalOpen && (
        <div className="locations-modal-overlay">
          <div className="locations-modal-box locations-large-modal">
            <div className="locations-modal-header">
              <h2>Location Map View</h2>
              <button className="locations-btn-close" onClick={() => setIsMapModalOpen(false)}><FiX /></button>
            </div>
            <div className="locations-modal-body locations-p-0">
              <iframe 
                title="Full Map"
                src={mapUrl}
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
        <div className="locations-modal-overlay">
          <div className="locations-modal-box locations-small-modal">
            <div className="locations-modal-header">
              <h2>Location Details</h2>
              <button className="locations-btn-close" onClick={() => setIsViewOpen(false)}><FiX /></button>
            </div>
            <div className="locations-modal-body locations-view-details-grid">
              <div><strong>Country:</strong> {viewData.flag} {viewData.country}</div>
              <div><strong>State:</strong> {viewData.state}</div>
              <div><strong>City:</strong> {viewData.city}</div>
              <div><strong>Area:</strong> {viewData.area}</div>
              <div><strong>Pincode:</strong> {viewData.pincode}</div>
              <div><strong>Properties:</strong> {viewData.properties}</div>
              <div><strong>Status:</strong> <span className={`locations-badge-status locations-status-${viewData.status.toLowerCase()}`}>{viewData.status}</span></div>
            </div>
            <div className="locations-modal-footer">
              <button className="locations-btn-save" onClick={() => setIsViewOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Locations;
