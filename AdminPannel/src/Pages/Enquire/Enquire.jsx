import React, { useState, useRef, useEffect } from 'react';
import './Enquire.css';

const initialEnquiries = [
  { id: 1, name: 'Ravi Patel', property: 'Gorgeous Apartment', email: 'ravi.patel@gmail.com', phone: '+91 9876543210', status: 'New', date: '22 Mar 2023', source: 'Website', message: 'Interested in a 3BHK flat.' },
  { id: 2, name: 'Anita Desai', property: 'Luxury Villa', email: 'anita.desai@gmail.com', phone: '+91 9123456780', status: 'Contacted', date: '21 Mar 2023', source: 'Instagram', message: 'Looking for villa pricing.' },
  { id: 3, name: 'Mohit Sharma', property: 'Modern Studio', email: 'mohit.sharma@gmail.com', phone: '+91 9988776655', status: 'Follow Up', date: '20 Mar 2023', source: 'Direct Call', message: 'Requires a callback tomorrow.' },
  { id: 4, name: 'Neha Gupta', property: 'City Apartment', email: 'neha.gupta@gmail.com', phone: '+91 9090909090', status: 'Converted', date: '19 Mar 2023', source: 'Referral', message: 'Booking completed.' },
  { id: 5, name: 'Karan Mehta', property: 'Penthouse Suite', email: 'karan.mehta@gmail.com', phone: '+91 8888888888', status: 'Closed', date: '18 Mar 2023', source: 'Facebook', message: 'Not interested at this time.' },
  { id: 6, name: 'Priya Sharma', property: 'Luxury Villa', email: 'priya.s@gmail.com', phone: '+91 9876500011', status: 'New', date: '17 Mar 2023', source: 'Website', message: 'Wants weekend visit schedule.' },
  { id: 7, name: 'Sanjay Dutt', property: 'Modern Studio', email: 'sanjay.d@gmail.com', phone: '+91 9112233445', status: 'Contacted', date: '16 Mar 2023', source: 'Direct Call', message: 'Shared brochure PDF.' },
  { id: 8, name: 'Ritu Varma', property: 'Gorgeous Apartment', email: 'ritu.v@gmail.com', phone: '+91 9554433221', status: 'Follow Up', date: '15 Mar 2023', source: 'Instagram', message: 'Discussing loan details.' },
];

const Enquire = () => {
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [propertyFilter, setPropertyFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    property: '',
    source: '',
    status: 'New',
    message: ''
  });

  // Filter dropdown refs
  const filterRefs = useRef({});

  // Dynamic unique properties list for dropdown filter
  const propertyOptions = Array.from(new Set(enquiries.map(item => item.property)));

  // Dynamic Filter Logic - FULLY WORKING
  const filteredEnquiries = enquiries.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm);

    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchesProperty = propertyFilter === 'All' || item.property === propertyFilter;

    return matchesSearch && matchesStatus && matchesProperty;
  });

  // Pagination Calculations
  const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEnquiries = filteredEnquiries.slice(startIndex, startIndex + itemsPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, propertyFilter]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Open Form Modal for Adding
  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData({ fullName: '', email: '', phone: '', property: '', source: '', status: 'New', message: '' });
    setIsFormModalOpen(true);
  };

  // Open Form Modal for Editing
  const handleOpenEditModal = (item) => {
    setEditingId(item.id);
    setFormData({
      fullName: item.name,
      email: item.email,
      phone: item.phone,
      property: item.property,
      source: item.source,
      status: item.status,
      message: item.message
    });
    setIsFormModalOpen(true);
  };

  // Submit Handler for Add & Edit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.property) {
      alert('Please fill out all required fields');
      return;
    }

    if (editingId) {
      // Update existing enquiry
      setEnquiries(enquiries.map(item => item.id === editingId ? {
        ...item,
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone || 'N/A',
        property: formData.property,
        source: formData.source || 'Website',
        status: formData.status || 'New',
        message: formData.message || ''
      } : item));
    } else {
      // Create new enquiry
      const newEntry = {
        id: Date.now(),
        name: formData.fullName,
        property: formData.property,
        email: formData.email,
        phone: formData.phone || 'N/A',
        status: formData.status || 'New',
        source: formData.source || 'Website',
        message: formData.message || '',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      };
      setEnquiries([newEntry, ...enquiries]);
    }

    setIsFormModalOpen(false);
    setFormData({ fullName: '', email: '', phone: '', property: '', source: '', status: 'New', message: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      setEnquiries(enquiries.filter(item => item.id !== id));
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setPropertyFilter('All');
    setCurrentPage(1);
  };

  // Get status count for filter display
  const getStatusCount = (status) => {
    return enquiries.filter(item => item.status === status).length;
  };

  return (
    <div className="enquiry-container">
      {/* Header */}
      <div className="enquiry-header">
        <div className="enquiry-header__text">
          <h1 className="enquiry-header__title">Enquiry</h1>
          <p className="enquiry-header__subtitle">View and manage all property enquiries.</p>
        </div>
        <button className="enquiry-header__add-btn" onClick={handleOpenAddModal}>
          <span className="add-icon">+</span> Add Enquiry
        </button>
      </div>

      {/* Main Card */}
      <div className="enquiry-card">
        {/* Controls Bar */}
        <div className="enquiry-controls">
          <div className="enquiry-controls__search">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              placeholder="Search enquiries..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="enquiry-controls__filters">
            <div className="filter-group">
              <select 
                className="filter-select" 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status ({enquiries.length})</option>
                <option value="New">New ({getStatusCount('New')})</option>
                <option value="Contacted">Contacted ({getStatusCount('Contacted')})</option>
                <option value="Follow Up">Follow Up ({getStatusCount('Follow Up')})</option>
                <option value="Converted">Converted ({getStatusCount('Converted')})</option>
                <option value="Closed">Closed ({getStatusCount('Closed')})</option>
              </select>
            </div>

            <div className="filter-group">
              <select 
                className="filter-select"
                value={propertyFilter}
                onChange={(e) => setPropertyFilter(e.target.value)}
              >
                <option value="All">All Properties</option>
                {propertyOptions.map((prop, idx) => (
                  <option key={idx} value={prop}>{prop}</option>
                ))}
              </select>
            </div>

            <button className="filter-btn" onClick={handleResetFilters} title="Reset Filters">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              Reset
            </button>
          </div>
        </div>

        {/* Filter Status Bar */}
        {(statusFilter !== 'All' || propertyFilter !== 'All' || searchTerm) && (
          <div className="enquiry-filter-status">
            <span className="filter-status-label">Active Filters:</span>
            {searchTerm && (
              <span className="filter-tag">
                Search: "{searchTerm}"
                <button className="filter-tag-remove" onClick={() => setSearchTerm('')}>×</button>
              </span>
            )}
            {statusFilter !== 'All' && (
              <span className="filter-tag">
                Status: {statusFilter}
                <button className="filter-tag-remove" onClick={() => setStatusFilter('All')}>×</button>
              </span>
            )}
            {propertyFilter !== 'All' && (
              <span className="filter-tag">
                Property: {propertyFilter}
                <button className="filter-tag-remove" onClick={() => setPropertyFilter('All')}>×</button>
              </span>
            )}
            <span className="filter-results-count">
              {filteredEnquiries.length} result{filteredEnquiries.length !== 1 ? 's' : ''}
            </span>
          </div>
        )}

        {/* Table View */}
        <div className="enquiry-table-wrapper">
          <table className="enquiry-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Property</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Date</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentEnquiries.length > 0 ? (
                currentEnquiries.map((item) => (
                  <tr key={item.id}>
                    <td className="font-semibold">{item.name}</td>
                    <td className="text-secondary">{item.property}</td>
                    <td>
                      <div className="contact-cell">
                        <span className="contact-email">{item.email}</span>
                        <span className="contact-phone">{item.phone}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge status-badge--${item.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="text-secondary">{item.date}</td>
                    <td className="text-right">
                      <div className="action-buttons">
                        <button className="action-btn action-btn--view" title="View Details" onClick={() => setSelectedEnquiry(item)}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        </button>
                        <button className="action-btn action-btn--edit" title="Edit Enquiry" onClick={() => handleOpenEditModal(item)}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </button>
                        <button className="action-btn action-btn--delete" title="Delete" onClick={() => handleDelete(item.id)}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    <div className="no-data-content">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                      <p>No enquiries found</p>
                      <span>Try adjusting your search or filter criteria</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="enquiry-footer">
          <span className="enquiry-footer__info">
            Showing <strong>{filteredEnquiries.length === 0 ? 0 : startIndex + 1}</strong> to <strong>{Math.min(startIndex + itemsPerPage, filteredEnquiries.length)}</strong> of <strong>{filteredEnquiries.length}</strong> enquiries
          </span>

          <div className="pagination">
            <button 
              className="pagination__arrow" 
              disabled={currentPage === 1} 
              onClick={() => handlePageChange(currentPage - 1)}
            >
              &#8249;
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  className={`pagination__page ${currentPage === pageNum ? 'pagination__page--active' : ''}`}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <>
                <span className="pagination__ellipsis">…</span>
                <button
                  className="pagination__page"
                  onClick={() => handlePageChange(totalPages)}
                >
                  {totalPages}
                </button>
              </>
            )}
            <button 
              className="pagination__arrow" 
              disabled={currentPage === totalPages} 
              onClick={() => handlePageChange(currentPage + 1)}
            >
              &#8250;
            </button>
          </div>
        </div>
      </div>

      {/* Add / Edit Enquiry Modal */}
      {isFormModalOpen && (
        <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && setIsFormModalOpen(false)}>
          <div className="modal-container">
            <div className="modal-header">
              <h2>{editingId ? 'Edit Enquiry' : 'Add New Enquiry'}</h2>
              <button className="modal-close" onClick={() => setIsFormModalOpen(false)}>&times;</button>
            </div>
            
            <form onSubmit={handleFormSubmit}>
              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input 
                      type="text" 
                      name="fullName" 
                      placeholder="Enter full name" 
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address *</label>
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="Enter email address" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <input 
                      type="text" 
                      name="phone" 
                      placeholder="Enter phone number" 
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Property *</label>
                    <select name="property" value={formData.property} onChange={handleInputChange} required>
                      <option value="" disabled>Select property</option>
                      <option value="Gorgeous Apartment">Gorgeous Apartment</option>
                      <option value="Luxury Villa">Luxury Villa</option>
                      <option value="Modern Studio">Modern Studio</option>
                      <option value="City Apartment">City Apartment</option>
                      <option value="Penthouse Suite">Penthouse Suite</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Enquiry Source</label>
                    <select name="source" value={formData.source} onChange={handleInputChange}>
                      <option value="" disabled>Select source</option>
                      <option value="Website">Website</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Direct Call">Direct Call</option>
                      <option value="Referral">Referral</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Status</label>
                    <select name="status" value={formData.status} onChange={handleInputChange}>
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Follow Up">Follow Up</option>
                      <option value="Converted">Converted</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>

                  <div className="form-group form-group--full">
                    <label>Message</label>
                    <textarea 
                      name="message" 
                      rows="3" 
                      placeholder="Enter your message or notes..." 
                      value={formData.message}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn--cancel" onClick={() => setIsFormModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn--submit">
                  {editingId ? 'Save Changes' : 'Add Enquiry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {selectedEnquiry && (
        <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && setSelectedEnquiry(null)}>
          <div className="modal-container modal-container--sm">
            <div className="modal-header">
              <h2>Enquiry Details</h2>
              <button className="modal-close" onClick={() => setSelectedEnquiry(null)}>&times;</button>
            </div>
            <div className="modal-body detail-view">
              <div className="detail-row">
                <span className="detail-label">Name</span>
                <span className="detail-value">{selectedEnquiry.name}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Property</span>
                <span className="detail-value">{selectedEnquiry.property}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email</span>
                <span className="detail-value">{selectedEnquiry.email}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Phone</span>
                <span className="detail-value">{selectedEnquiry.phone}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status</span>
                <span className={`status-badge status-badge--${selectedEnquiry.status.toLowerCase().replace(/\s+/g, '-')}`}>
                  {selectedEnquiry.status}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Source</span>
                <span className="detail-value">{selectedEnquiry.source}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Date</span>
                <span className="detail-value">{selectedEnquiry.date}</span>
              </div>
              <div className="detail-row detail-row--full">
                <span className="detail-label">Message</span>
                <span className="detail-value detail-value--message">
                  {selectedEnquiry.message || 'No notes provided.'}
                </span>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn--cancel" onClick={() => setSelectedEnquiry(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Enquire;