import React, { useState } from 'react';
import './Amenities.css';
import { 
  FiGrid, FiCheckCircle, FiSlash, FiHome, FiSearch, FiEdit2, 
  FiTrash2, FiPlus, FiX, FiUpload, FiChevronLeft, FiChevronRight 
} from 'react-icons/fi';

const initialAmenities = [
  { id: 1, name: 'Swimming Pool', properties: '214 Properties', status: 'Active', sortOrder: 1, icon: '🏊', description: 'Large outdoor swimming pool' },
  { id: 2, name: 'Kid Play Area', properties: '185 Properties', status: 'Active', sortOrder: 2, icon: '🤸', description: 'Safe play zone for children' },
  { id: 3, name: 'Gym', properties: '201 Properties', status: 'Active', sortOrder: 3, icon: '🏋️', description: 'Fully equipped modern gym' },
  { id: 4, name: 'Security', properties: '320 Properties', status: 'Active', sortOrder: 4, icon: '🛡️', description: '24/7 security guard and surveillance' },
  { id: 5, name: 'CCTV Camera', properties: '280 Properties', status: 'Active', sortOrder: 5, icon: '📸', description: 'Common areas covered by CCTV' },
  { id: 6, name: 'Park & Garden', properties: '142 Properties', status: 'Active', sortOrder: 6, icon: '🌳', description: 'Green landscaped gardens' },
  { id: 7, name: 'Club House', properties: '92 Properties', status: 'Active', sortOrder: 7, icon: '🏢', description: 'Community gathering space' },
];

const AddAmenityDrawer = ({
  isOpen,
  onClose,
  onSave,
  amenityName,
  setAmenityName,
  description,
  setDescription,
  status,
  setStatus,
  sortOrder,
  setSortOrder,
  selectedIcon,
  setSelectedIcon,
  isEditing
}) => {
  if (!isOpen) return null;

  return (
    <div className="add-amenity-drawer">
      <div className="drawer-header">
        <div>
          <h2>{isEditing ? 'Edit Amenity' : 'Add New Amenity'}</h2>
          <p>{isEditing ? 'Update amenity details' : 'Add a new amenity to the list'}</p>
        </div>
        <button className="close-drawer-btn" onClick={onClose}>
          <FiX />
        </button>
      </div>

      <form onSubmit={onSave} className="drawer-form">
        <div className="form-group">
          <label>Amenity Name <span>*</span></label>
          <input 
            type="text" 
            placeholder="Enter amenity name" 
            value={amenityName}
            onChange={(e) => setAmenityName(e.target.value)}
            required 
          />
        </div>

        <div className="form-group">
          <label>Icon <span>*</span></label>
          <div className="icon-upload-box">
            <FiUpload className="upload-cloud-icon" />
            <span className="upload-text">Click to upload icon</span>
            <span className="upload-subtext">PNG, JPG, SVG (Max. 2MB)</span>
          </div>
          <span className="icon-chooser-label">or choose from icons</span>
          <div className="icon-preset-grid">
            {['🏊', '🤸', '🏋️', '🛡️', '📸', '🌳', '🏢'].map((ic, idx) => (
              <button 
                type="button" 
                key={idx} 
                className={`preset-icon-btn ${selectedIcon === ic ? 'selected' : ''}`}
                onClick={() => setSelectedIcon(ic)}
              >
                {ic}
              </button>
            ))}
            <button type="button" className="preset-icon-btn more-btn">More</button>
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea 
            placeholder="Enter description (optional)" 
            rows="2"
            maxLength="200"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <span className="char-counter">{description.length} / 200</span>
        </div>

        <div className="form-group">
          <label>Status <span>*</span></label>
          <div className="radio-group">
            <label className="radio-label">
              <input 
                type="radio" 
                name="status" 
                checked={status === 'Active'} 
                onChange={() => setStatus('Active')} 
              /> Active
            </label>
            <label className="radio-label">
              <input 
                type="radio" 
                name="status" 
                checked={status === 'Inactive'} 
                onChange={() => setStatus('Inactive')} 
              /> Inactive
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Sort Order <span>*</span></label>
          <input 
            type="number" 
            placeholder="Enter sort order (e.g., 1, 2, 3...)" 
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          />
          <span className="helper-text">Lower number will show first</span>
        </div>

        <div className="drawer-footer-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-save">{isEditing ? 'Update Amenity' : 'Save Amenity'}</button>
        </div>
      </form>
    </div>
  );
};

const Amenities = () => {
  const [amenities, setAmenities] = useState(initialAmenities);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [sortBy, setSortBy] = useState('Sort By: Name (A-Z)');
   
  const [selectedIds, setSelectedIds] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [bulkAction, setBulkAction] = useState('Bulk Actions');

  const [amenityName, setAmenityName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Active');
  const [sortOrder, setSortOrder] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('🏊');

  const handleOpenAddDrawer = () => {
    setEditingId(null);
    setAmenityName('');
    setDescription('');
    setStatus('Active');
    setSortOrder('');
    setSelectedIcon('🏊');
    setIsDrawerOpen(true);
  };

  const handleOpenEditDrawer = (item) => {
    setEditingId(item.id);
    setAmenityName(item.name);
    setDescription(item.description || '');
    setStatus(item.status);
    setSortOrder(item.sortOrder);
    setSelectedIcon(item.icon);
    setIsDrawerOpen(true);
  };

  const handleSaveAmenity = (e) => {
    e.preventDefault();
    if (!amenityName.trim()) return;

    if (editingId !== null) {
      setAmenities(amenities.map(item => 
        item.id === editingId 
          ? { 
              ...item, 
              name: amenityName, 
              status: status, 
              sortOrder: sortOrder ? parseInt(sortOrder) : item.sortOrder, 
              icon: selectedIcon,
              description: description
            } 
          : item
      ));
    } else {
      const newAmenity = {
        id: amenities.length > 0 ? Math.max(...amenities.map(a => a.id)) + 1 : 1,
        name: amenityName,
        properties: '0 Properties',
        status: status,
        sortOrder: sortOrder ? parseInt(sortOrder) : amenities.length + 1,
        icon: selectedIcon,
        description: description
      };
      setAmenities([...amenities, newAmenity]);
    }

    setIsDrawerOpen(false);
    setEditingId(null);
    setAmenityName('');
    setDescription('');
    setStatus('Active');
    setSortOrder('');
  };

  const handleDeleteAmenity = (id) => {
    if (window.confirm('Are you sure you want to delete this amenity?')) {
      setAmenities(amenities.filter(item => item.id !== id));
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredAmenities.map(item => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleApplyBulkAction = () => {
    if (bulkAction === 'Delete Selected') {
      if (selectedIds.length === 0) {
        alert('Please select at least one amenity.');
        return;
      }
      if (window.confirm(`Are you sure you want to delete ${selectedIds.length} amenities?`)) {
        setAmenities(amenities.filter(item => !selectedIds.includes(item.id)));
        setSelectedIds([]);
      }
    }
  };

  const filteredAmenities = amenities
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All Status' || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'Sort By: Name (A-Z)') return a.name.localeCompare(b.name);
      if (sortBy === 'Sort By: Name (Z-A)') return b.name.localeCompare(a.name);
      return 0;
    });

  return (
    <div className="amenities-container">
      <header className="amenities-header">
        <div className="header-title-wrapper">
          <div className="header-main-title">
            <FiGrid className="header-grid-icon" />
            <h1>Amenities Management</h1>
          </div>
          <span className="breadcrumb">Dashboard &gt; Amenities</span>
        </div>
      </header>

      <div className={`dashboard-content-layout ${isDrawerOpen ? 'drawer-active' : ''}`}>
        <AddAmenityDrawer 
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          onSave={handleSaveAmenity}
          amenityName={amenityName}
          setAmenityName={setAmenityName}
          description={description}
          setDescription={setDescription}
          status={status}
          setStatus={setStatus}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
          isEditing={editingId !== null}
        />

        <div className="main-dashboard-pane">
          {/* Stats Grid updated to force 2 rows, 2 columns */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon-box purple-bg"><FiGrid /></div>
              <div className="stat-details">
                <span className="stat-label">Total Amenities</span>
                <h2 className="stat-value">{amenities.length}</h2>
                <span className="stat-subtext">All amenities added</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-box green-bg"><FiCheckCircle /></div>
              <div className="stat-details">
                <span className="stat-label">Active Amenities</span>
                <h2 className="stat-value">{amenities.filter(a => a.status === 'Active').length}</h2>
                <span className="stat-subtext">Currently active</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-box orange-bg"><FiSlash /></div>
              <div className="stat-details">
                <span className="stat-label">Inactive Amenities</span>
                <h2 className="stat-value">{amenities.filter(a => a.status === 'Inactive').length}</h2>
                <span className="stat-subtext">Currently inactive</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-box blue-bg"><FiHome /></div>
              <div className="stat-details">
                <span className="stat-label">Used In Properties</span>
                <h2 className="stat-value">412</h2>
                <span className="stat-subtext">Total properties</span>
              </div>
            </div>
          </div>

          <div className="toolbar-section">
            <div className="search-filter-group">
              <div className="search-input-wrapper">
                <FiSearch className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search amenities..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select 
                className="dropdown-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <select 
                className="dropdown-filter"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option>Sort By: Name (A-Z)</option>
                <option>Sort By: Name (Z-A)</option>
              </select>
              <button className="btn-search">Search</button>
              <button className="btn-reset" onClick={() => { setSearchTerm(''); setStatusFilter('All Status'); }}>Reset</button>
            </div>
             
            {!isDrawerOpen && (
              <button className="btn-add-new" onClick={handleOpenAddDrawer}>
                <FiPlus /> Add New Amenity
              </button>
            )}
          </div>

          <div className="table-responsive-wrapper">
            <table className="amenities-table">
              <thead>
                <tr>
                  <th>
                    <input 
                      type="checkbox" 
                      onChange={handleSelectAll}
                      checked={filteredAmenities.length > 0 && selectedIds.length === filteredAmenities.length}
                    />
                  </th>
                  <th>ICON</th>
                  <th>AMENITY NAME</th>
                  <th>USED IN PROPERTIES</th>
                  <th>STATUS</th>
                  <th>SORT ORDER</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredAmenities.length > 0 ? (
                  filteredAmenities.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <input 
                          type="checkbox" 
                          checked={selectedIds.includes(item.id)}
                          onChange={() => handleSelectOne(item.id)}
                        />
                      </td>
                      <td><span className="table-icon-cell">{item.icon}</span></td>
                      <td className="amenity-name-cell">{item.name}</td>
                      <td>{item.properties}</td>
                      <td>
                        <span className={`status-badge ${item.status.toLowerCase()}`}>
                          <span className="dot"></span> {item.status}
                        </span>
                      </td>
                      <td>{item.sortOrder}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-action edit" onClick={() => handleOpenEditDrawer(item)}><FiEdit2 /></button>
                          <button className="btn-action delete" onClick={() => handleDeleteAmenity(item.id)}><FiTrash2 /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '15px' }}>No amenities found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <span className="pagination-info">Showing 1 to {filteredAmenities.length} of {amenities.length} amenities</span>
            <div className="pagination-controls-group">
              <div className="bulk-actions-wrapper">
                <select 
                  className="dropdown-filter"
                  value={bulkAction}
                  onChange={(e) => setBulkAction(e.target.value)}
                >
                  <option>Bulk Actions</option>
                  <option>Delete Selected</option>
                </select>
                <button className="btn-apply" onClick={handleApplyBulkAction}>Apply</button>
              </div>
              <div className="pagination-pages">
                <button className="page-btn"><FiChevronLeft /></button>
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <span>...</span>
                <button className="page-btn">4</button>
                <button className="page-btn"><FiChevronRight /></button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Amenities;