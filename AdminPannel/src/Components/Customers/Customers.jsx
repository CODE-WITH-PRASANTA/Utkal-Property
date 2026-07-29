import React, { useState, useMemo, useRef } from 'react';
import {
  FiSearch, FiPlus, FiEye, FiEdit2, FiMoreVertical,
  FiCalendar, FiUploadCloud, FiX, FiChevronLeft,
  FiChevronRight, FiUsers, FiUserCheck, FiUserPlus,
  FiRepeat, FiDownload, FiFilter, FiTrash2, FiUserX, FiUser
} from 'react-icons/fi';
import './Customers.css';

const INITIAL_CUSTOMERS = [
  { id: 1, firstName: 'Rohit', lastName: 'Kumar', email: 'rohitkumar@gmail.com', phone: '+91 98705 43210', orders: 12, totalSpent: 320.50, lastOrder: '2 hours ago', status: 'Active', type: 'Repeat', gender: 'Male', dob: '1995-04-12', address: '123 MG Road', city: 'Mumbai', state: 'Maharashtra', zip: '400001', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80' },
  { id: 2, firstName: 'Priya', lastName: 'Singh', email: 'priyasingh@gmail.com', phone: '+91 91234 56789', orders: 8, totalSpent: 215.30, lastOrder: '5 hours ago', status: 'Active', type: 'Repeat', gender: 'Female', dob: '1998-08-21', address: '45 Park Street', city: 'Kolkata', state: 'West Bengal', zip: '700016', avatar: null, initials: 'PS', bg: '#8b5cf6' },
  { id: 3, firstName: 'Amit', lastName: 'Mishra', email: 'amitmishra@gmail.com', phone: '+91 99887 76655', orders: 5, totalSpent: 189.75, lastOrder: '1 day ago', status: 'Active', type: 'New', gender: 'Male', dob: '1992-11-05', address: '88 Civil Lines', city: 'Delhi', state: 'Delhi', zip: '110054', avatar: null, initials: 'AM', bg: '#ec4899' },
  { id: 4, firstName: 'Neha', lastName: 'Sharma', email: 'nehasharma@gmail.com', phone: '+91 87654 32109', orders: 15, totalSpent: 450.20, lastOrder: '3 hours ago', status: 'Active', type: 'Repeat', gender: 'Female', dob: '1994-02-14', address: '12 Residency Road', city: 'Bangalore', state: 'Karnataka', zip: '560025', avatar: null, initials: 'NS', bg: '#3b82f6' },
  { id: 5, firstName: 'Vikas', lastName: 'Kumar', email: 'vikaskumar@gmail.com', phone: '+91 76543 21098', orders: 3, totalSpent: 95.60, lastOrder: '2 days ago', status: 'Inactive', type: 'New', gender: 'Male', dob: '1999-06-30', address: '77 Station Road', city: 'Jaipur', state: 'Rajasthan', zip: '302001', avatar: null, initials: 'VK', bg: '#6366f1' },
  { id: 6, firstName: 'Rahul', lastName: 'Tiwari', email: 'rahultiwari@gmail.com', phone: '+91 65432 10987', orders: 7, totalSpent: 178.90, lastOrder: '4 days ago', status: 'Active', type: 'Repeat', gender: 'Male', dob: '1996-09-18', address: '10 Ring Road', city: 'Ahmedabad', state: 'Gujarat', zip: '380009', avatar: null, initials: 'RT', bg: '#8b5cf6' },
  { id: 7, firstName: 'Sneha', lastName: 'Joshi', email: 'snehajoshi@gmail.com', phone: '+91 54321 09876', orders: 9, totalSpent: 245.00, lastOrder: '1 day ago', status: 'Active', type: 'Repeat', gender: 'Female', dob: '1997-03-25', address: '34 FC Road', city: 'Pune', state: 'Maharashtra', zip: '411004', avatar: null, initials: 'SJ', bg: '#3b82f6' },
  { id: 8, firstName: 'Anjali', lastName: 'Bansal', email: 'anjalibansal@gmail.com', phone: '+91 43210 98765', orders: 2, totalSpent: 65.40, lastOrder: '5 days ago', status: 'Inactive', type: 'New', gender: 'Female', dob: '2001-01-10', address: '56 Model Town', city: 'Ludhiana', state: 'Punjab', zip: '141002', avatar: null, initials: 'AB', bg: '#ec4899' },
  { id: 9, firstName: 'Manoj', lastName: 'Mehta', email: 'manojmehta@gmail.com', phone: '+91 32109 87654', orders: 6, totalSpent: 142.75, lastOrder: '3 days ago', status: 'Active', type: 'New', gender: 'Male', dob: '1990-12-12', address: '90 Marine Drive', city: 'Mumbai', state: 'Maharashtra', zip: '400020', avatar: null, initials: 'MM', bg: '#3b82f6' },
  { id: 10, firstName: 'Kiran', lastName: 'Patel', email: 'kiranpatel@gmail.com', phone: '+91 21098 76543', orders: 11, totalSpent: 330.10, lastOrder: '6 hours ago', status: 'Active', type: 'Repeat', gender: 'Male', dob: '1993-07-07', address: '15 SG Highway', city: 'Ahmedabad', state: 'Gujarat', zip: '380015', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&q=80' }
];

const Customers = () => {
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [activeTab, setActiveTab] = useState('All Customers');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);

  // Timeframe filter state
  const [overviewTimeframe, setOverviewTimeframe] = useState('This Month');
  const [topCustomersTimeframe, setTopCustomersTimeframe] = useState('This Month');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Modals & Popups
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [viewCustomer, setViewCustomer] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  // Form State
  const fileInputRef = useRef(null);
  const dateInputRef = useRef(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    type: 'Regular Customer',
    status: 'Active',
    gender: 'Male',
    dob: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    photo: '',
    notes: ''
  });

  // Filtered list for table
  const filteredCustomers = useMemo(() => {
    return customers.filter(cust => {
      const matchesTab = activeTab === 'All Customers' || cust.status === activeTab;
      const fullName = `${cust.firstName} ${cust.lastName}`.toLowerCase();
      const matchesSearch =
        fullName.includes(searchQuery.toLowerCase()) ||
        cust.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cust.phone.includes(searchQuery);
      return matchesTab && matchesSearch;
    });
  }, [customers, activeTab, searchQuery]);

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage) || 1;
  const currentTableData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCustomers.slice(start, start + itemsPerPage);
  }, [filteredCustomers, currentPage, itemsPerPage]);

  // Customer Overview Metrics calculation
  const overviewData = useMemo(() => {
    const activeCount = customers.filter(c => c.status === 'Active').length;
    const inactiveCount = customers.filter(c => c.status === 'Inactive').length;
    const blockedCount = customers.filter(c => c.status === 'Blocked').length;
    const total = customers.length || 1;

    const activePct = (activeCount / total) * 100;
    const inactivePct = (inactiveCount / total) * 100;

    const p1 = activePct;
    const p2 = p1 + inactivePct;

    const gradientStr = `conic-gradient(#16a34a 0% ${p1}%, #f59e0b ${p1}% ${p2}%, #3b82f6 ${p2}% 100%)`;

    return {
      total,
      activeCount,
      activePct: activePct.toFixed(1),
      inactiveCount,
      inactivePct: inactivePct.toFixed(1),
      blockedCount,
      blockedPct: ((blockedCount / total) * 100).toFixed(1),
      gradientStr
    };
  }, [customers, overviewTimeframe]);

  // Sorted Top Customers list
  const sortedTopCustomers = useMemo(() => {
    return [...customers]
      .filter(c => c.totalSpent > 0)
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 5);
  }, [customers, topCustomersTimeframe]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(currentTableData.map(c => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleExportCSV = () => {
    const headers = ["ID,First Name,Last Name,Email,Phone,Orders,Total Spent,Status\n"];
    const rows = filteredCustomers.map(c =>
      `${c.id},"${c.firstName}","${c.lastName}","${c.email}","${c.phone}",${c.orders},${c.totalSpent},${c.status}`
    ).join("\n");

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Customers_Export_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  };

  const handleOpenModal = (cust = null) => {
    setOpenMenuId(null);
    if (cust) {
      setEditingCustomer(cust);
      setFormData({
        firstName: cust.firstName,
        lastName: cust.lastName,
        email: cust.email,
        phone: cust.phone.replace('+91 ', ''),
        type: cust.type || 'Regular Customer',
        status: cust.status,
        gender: cust.gender || 'Male',
        dob: cust.dob || '',
        address: cust.address || '',
        city: cust.city || '',
        state: cust.state || '',
        zip: cust.zip || '',
        photo: cust.avatar || '',
        notes: ''
      });
    } else {
      setEditingCustomer(null);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        type: 'Regular Customer',
        status: 'Active',
        gender: 'Male',
        dob: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        photo: '',
        notes: ''
      });
    }
    setIsAddEditOpen(true);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const photoURL = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, photo: photoURL }));
    }
  };

  const handleSaveCustomer = (e) => {
    e.preventDefault();
    if (editingCustomer) {
      setCustomers(prev => prev.map(c => c.id === editingCustomer.id ? {
        ...c,
        ...formData,
        phone: `+91 ${formData.phone}`,
        avatar: formData.photo || c.avatar
      } : c));
    } else {
      const newCust = {
        id: Date.now(),
        ...formData,
        phone: `+91 ${formData.phone}`,
        orders: 0,
        totalSpent: 0.00,
        lastOrder: 'Just now',
        avatar: formData.photo || null,
        initials: `${formData.firstName[0] || 'C'}${formData.lastName[0] || 'U'}`,
        bg: '#0f9f59'
      };
      setCustomers(prev => [newCust, ...prev]);
    }
    setIsAddEditOpen(false);
  };

  const handleToggleStatus = (id, newStatus) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    setOpenMenuId(null);
  };

  const handleDeleteCustomer = (id) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
    setSelectedIds(prev => prev.filter(i => i !== id));
    setOpenMenuId(null);
  };

  return (
    <div className="cust-container">
      {/* Top Header */}
      <div className="cust-page-header">
        <div>
          <h1>Customers</h1>
          <nav className="cust-breadcrumb">
            Dashboard &gt; <span>Customers</span>
          </nav>
        </div>
        <div className="cust-header-actions">
          <button className="cust-btn-export" onClick={handleExportCSV}>
            <FiDownload /> Export
          </button>
          <button className="cust-btn-add" onClick={() => handleOpenModal()}>
            <FiPlus /> Add Customer
          </button>
        </div>
      </div>

      {/* Top 4 Cards Grid with Smooth Hover Effects */}
      <section className="cust-metrics-grid">
        <div className="cust-metric-card">
          <div className="metric-icon green-bg"><FiUsers /></div>
          <div className="metric-info">
            <span className="label">Total Customers</span>
            <h2>{customers.length.toLocaleString()}</h2>
            <span className="trend green">↑ 18.2% this month</span>
          </div>
        </div>

        <div className="cust-metric-card">
          <div className="metric-icon blue-bg"><FiUserPlus /></div>
          <div className="metric-info">
            <span className="label">New Customers</span>
            <h2>324</h2>
            <span className="trend green">↑ 12.5% this month</span>
          </div>
        </div>

        <div className="cust-metric-card">
          <div className="metric-icon purple-bg"><FiUserCheck /></div>
          <div className="metric-info">
            <span className="label">Active Customers</span>
            <h2>{customers.filter(c => c.status === 'Active').length.toLocaleString()}</h2>
            <span className="trend green">↑ 16.3% this month</span>
          </div>
        </div>

        <div className="cust-metric-card">
          <div className="metric-icon orange-bg"><FiRepeat /></div>
          <div className="metric-info">
            <span className="label">Repeat Customers</span>
            <h2>1,482</h2>
            <span className="trend green">↑ 22.8% this month</span>
          </div>
        </div>
      </section>

      {/* Main Table Card */}
      <div className="cust-main-card">
        {/* Navigation Tabs and Toolbar */}
        <div className="cust-table-toolbar">
          <div className="cust-tabs">
            {['All Customers', 'Active', 'Inactive', 'Blocked'].map(tab => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="cust-toolbar-right">
            <button className="cust-icon-btn"><FiFilter /> Filters</button>
            <button className="cust-icon-btn" onClick={handleExportCSV}><FiDownload /> Export</button>
            <div className="cust-search-box">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              />
            </div>
          </div>
        </div>

        {/* Customer Data Table */}
        <div className="cust-table-responsive">
          <table className="cust-table">
            <thead>
              <tr>
                <th style={{ width: '30px' }}>
                  <input
                    type="checkbox"
                    checked={currentTableData.length > 0 && currentTableData.every(c => selectedIds.includes(c.id))}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Customer</th>
                <th>Contact</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Last Order</th>
                <th>Status</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentTableData.length > 0 ? (
                currentTableData.map(cust => (
                  <tr key={cust.id} className="cust-table-row">
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(cust.id)}
                        onChange={() => handleSelectOne(cust.id)}
                      />
                    </td>
                    <td>
                      <div className="cust-profile-cell">
                        {cust.avatar ? (
                          <img src={cust.avatar} alt={cust.firstName} className="cust-avatar-img" />
                        ) : (
                          <div className="cust-avatar-initials" style={{ backgroundColor: cust.bg || '#0f9f59' }}>
                            {cust.initials || `${cust.firstName[0]}${cust.lastName[0]}`}
                          </div>
                        )}
                        <div className="cust-name-email">
                          <strong>{cust.firstName} {cust.lastName}</strong>
                          <span>{cust.email}</span>
                        </div>
                      </div>
                    </td>
                    <td><span className="contact-text">{cust.phone}</span></td>
                    <td><span className="orders-count">{cust.orders}</span></td>
                    <td><span className="spent-amount">${cust.totalSpent.toFixed(2)}</span></td>
                    <td><span className="last-order-text">{cust.lastOrder}</span></td>
                    <td>
                      <span className={`status-pill ${cust.status.toLowerCase()}`}>
                        {cust.status}
                      </span>
                    </td>
                    <td>
                      <div className="cust-actions">
                        <button className="action-btn" title="View Details" onClick={() => setViewCustomer(cust)}>
                          <FiEye />
                        </button>
                        <button className="action-btn" title="Edit Customer" onClick={() => handleOpenModal(cust)}>
                          <FiEdit2 />
                        </button>

                        <div className="dropdown-wrapper">
                          <button
                            className="action-btn"
                            title="More Options"
                            onClick={() => setOpenMenuId(openMenuId === cust.id ? null : cust.id)}
                          >
                            <FiMoreVertical />
                          </button>
                          {openMenuId === cust.id && (
                            <div className="dropdown-menu">
                              <button onClick={() => handleToggleStatus(cust.id, cust.status === 'Active' ? 'Inactive' : 'Active')}>
                                <FiUserCheck /> Mark as {cust.status === 'Active' ? 'Inactive' : 'Active'}
                              </button>
                              <button onClick={() => handleToggleStatus(cust.id, 'Blocked')}>
                                <FiUserX /> Block Customer
                              </button>
                              <button className="danger" onClick={() => handleDeleteCustomer(cust.id)}>
                                <FiTrash2 /> Delete Customer
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-data">No customers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="cust-pagination-bar">
          <div className="page-info">
            Showing {filteredCustomers.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredCustomers.length)} of {filteredCustomers.length} customers
          </div>

          <div className="pagination-right">
            <div className="pagination-buttons">
              <button
                className="page-nav-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
              >
                <FiChevronLeft />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`page-num-btn ${currentPage === page ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}

              <button
                className="page-nav-btn"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
              >
                <FiChevronRight />
              </button>
            </div>

            <div className="page-size-selector">
              <select
                value={itemsPerPage}
                onChange={e => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
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
      </div>

      {/* Bottom Grid Section */}
      <section className="cust-bottom-grid">
        {/* CUSTOMER OVERVIEW CARD */}
        {/* CUSTOMER OVERVIEW CARD (50% Diagram / 50% Data) */}
<div className="cust-card overview-card">
  <div className="card-header">
    <h3>Customer Overview</h3>
    <select
      className="cust-select-sm"
      value={overviewTimeframe}
      onChange={(e) => setOverviewTimeframe(e.target.value)}
    >
      <option value="This Month">This Month</option>
      <option value="This Week">This Week</option>
      <option value="This Year">This Year</option>
      <option value="All Time">All Time</option>
    </select>
  </div>

  <div className="donut-chart-container">
    {/* Top 50%: Diagram */}
    <div className="donut-graphic-wrapper">
      <div className="donut-graphic" style={{ background: overviewData.gradientStr }}>
        <div className="donut-center">
          <strong>{overviewData.total}</strong>
          <span>Total</span>
        </div>
      </div>
    </div>

    {/* Bottom 50%: Data */}
    <div className="donut-legend">
      <div className="legend-item">
        <div className="legend-item-left">
          <span className="dot green"></span>
          <span className="legend-label">Active Customers</span>
        </div>
        <span className="legend-value">
          {overviewData.activeCount} ({overviewData.activePct}%)
        </span>
      </div>

      <div className="legend-item">
        <div className="legend-item-left">
          <span className="dot orange"></span>
          <span className="legend-label">Inactive Customers</span>
        </div>
        <span className="legend-value">
          {overviewData.inactiveCount} ({overviewData.inactivePct}%)
        </span>
      </div>

      <div className="legend-item">
        <div className="legend-item-left">
          <span className="dot blue"></span>
          <span className="legend-label">Blocked Customers</span>
        </div>
        <span className="legend-value">
          {overviewData.blockedCount} ({overviewData.blockedPct}%)
        </span>
      </div>
    </div>
  </div>
</div>

        {/* TOP CUSTOMERS CARD */}
        <div className="cust-card top-customers-card">
          <div className="card-header">
            <h3>Top Customers</h3>
            <select
              className="cust-select-sm"
              value={topCustomersTimeframe}
              onChange={(e) => setTopCustomersTimeframe(e.target.value)}
            >
              <option value="This Month">This Month</option>
              <option value="This Week">This Week</option>
              <option value="This Year">This Year</option>
              <option value="All Time">All Time</option>
            </select>
          </div>
          <div className="top-list">
            {sortedTopCustomers.length > 0 ? (
              sortedTopCustomers.map((cust, idx) => (
                <div key={cust.id} className="top-item">
                  <span className={`rank-badge rank-${idx + 1}`}>{idx + 1}</span>
                  {cust.avatar ? (
                    <img src={cust.avatar} alt={cust.firstName} className="list-avatar" />
                  ) : (
                    <div className="list-avatar-initials" style={{ backgroundColor: cust.bg || '#0f9f59' }}>
                      {cust.initials || `${cust.firstName[0]}${cust.lastName[0]}`}
                    </div>
                  )}
                  <div className="top-item-info">
                    <strong>{cust.firstName} {cust.lastName}</strong>
                    <span>{cust.orders} Orders</span>
                  </div>
                  <div className="top-item-amount">${cust.totalSpent.toFixed(2)}</div>
                </div>
              ))
            ) : (
              <p className="no-data-sm">No sales recorded for this timeframe.</p>
            )}
          </div>
          <a href="#view-all" className="card-footer-link">View All Top Customers →</a>
        </div>

        {/* RECENT SIGNUPS CARD */}
        <div className="cust-card recent-signups-card">
          <div className="card-header">
            <h3>Recent Signups</h3>
          </div>
          <div className="recent-list">
            <div className="recent-item">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" alt="Sanjay" className="list-avatar" />
              <div className="recent-info">
                <strong>Sanjay Verma</strong>
                <span>sanjayverma@gmail.com</span>
              </div>
              <span className="signup-time">Today</span>
            </div>
            <div className="recent-item">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" alt="Pooja" className="list-avatar" />
              <div className="recent-info">
                <strong>Pooja Rani</strong>
                <span>poojarani@gmail.com</span>
              </div>
              <span className="signup-time">2 hours ago</span>
            </div>
            <div className="recent-item">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80" alt="Arjun" className="list-avatar" />
              <div className="recent-info">
                <strong>Arjun Singh</strong>
                <span>arjunsingh@gmail.com</span>
              </div>
              <span className="signup-time">5 hours ago</span>
            </div>
          </div>
          <a href="#view-all" className="card-footer-link">View All New Customers →</a>
        </div>
      </section>

      {/* Add / Edit Customer Modal */}
      {isAddEditOpen && (
        <div className="cust-modal-overlay">
          <div className="cust-modal-box">
            <div className="cust-modal-header">
              <h2>{editingCustomer ? 'Edit Customer' : 'Add New Customer'}</h2>
              <button className="btn-modal-close" onClick={() => setIsAddEditOpen(false)}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSaveCustomer} className="cust-modal-form">
              <div className="cust-modal-body">
                <div className="cust-form-row">
                  <div className="cust-form-group">
                    <label>First Name <span className="req">*</span></label>
                    <input
                      type="text"
                      placeholder="Enter first name"
                      required
                      value={formData.firstName}
                      onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </div>
                  <div className="cust-form-group">
                    <label>Last Name <span className="req">*</span></label>
                    <input
                      type="text"
                      placeholder="Enter last name"
                      required
                      value={formData.lastName}
                      onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="cust-form-row">
                  <div className="cust-form-group">
                    <label>Email Address <span className="req">*</span></label>
                    <input
                      type="email"
                      placeholder="Enter email address"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="cust-form-group">
                    <label>Phone Number <span className="req">*</span></label>
                    <div className="phone-input-group">
                      <span className="flag-prefix">🇮🇳 +91 ▾</span>
                      <input
                        type="tel"
                        placeholder="Enter phone number"
                        required
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="cust-form-row">
                  <div className="cust-form-group">
                    <label>Customer Type</label>
                    <select
                      value={formData.type}
                      onChange={e => setFormData({ ...formData, type: e.target.value })}
                    >
                      <option value="Regular Customer">Regular Customer</option>
                      <option value="VIP Customer">VIP Customer</option>
                      <option value="Wholesale Customer">Wholesale Customer</option>
                    </select>
                  </div>
                  <div className="cust-form-group">
                    <label>Status <span className="req">*</span></label>
                    <select
                      value={formData.status}
                      onChange={e => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Blocked">Blocked</option>
                    </select>
                  </div>
                </div>

                <div className="cust-form-row">
                  <div className="cust-form-group">
                    <label>Gender</label>
                    <select
                      value={formData.gender}
                      onChange={e => setFormData({ ...formData, gender: e.target.value })}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="cust-form-group">
                    <label>Date of Birth</label>
                    <div className="input-with-calendar" onClick={() => dateInputRef.current && dateInputRef.current.showPicker()}>
                      <input
                        type="date"
                        ref={dateInputRef}
                        value={formData.dob}
                        onChange={e => setFormData({ ...formData, dob: e.target.value })}
                      />
                      <FiCalendar className="calendar-field-icon" />
                    </div>
                  </div>
                </div>

                <div className="cust-form-group" style={{ marginBottom: '14px' }}>
                  <label>Address <span className="req">*</span></label>
                  <input
                    type="text"
                    placeholder="Enter full address"
                    required
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>

                <div className="cust-form-row">
                  <div className="cust-form-group">
                    <label>City <span className="req">*</span></label>
                    <input
                      type="text"
                      placeholder="Enter city"
                      required
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                  <div className="cust-form-group">
                    <label>State <span className="req">*</span></label>
                    <select
                      value={formData.state}
                      onChange={e => setFormData({ ...formData, state: e.target.value })}
                    >
                      <option value="">Select state</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="West Bengal">West Bengal</option>
                    </select>
                  </div>
                  <div className="cust-form-group">
                    <label>ZIP / Postal Code <span className="req">*</span></label>
                    <input
                      type="text"
                      placeholder="Enter ZIP code"
                      required
                      value={formData.zip}
                      onChange={e => setFormData({ ...formData, zip: e.target.value })}
                    />
                  </div>
                </div>

                <div className="cust-upload-section">
                  <div className="upload-left">
                    <label>Profile Photo</label>
                    <div className="cust-dropzone" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handlePhotoUpload}
                        hidden
                        accept="image/*"
                      />
                      <FiUploadCloud className="upload-icon" />
                      <p><strong>Upload photo</strong></p>
                      <small>PNG, JPG or JPEG (Max. 2MB)</small>
                    </div>
                  </div>

                  <div className="upload-right">
                    <label>Photo Preview</label>
                    <div className="preview-avatar-box">
                      {formData.photo ? (
                        <img src={formData.photo} alt="Preview" className="preview-avatar-img" />
                      ) : (
                        <div className="professional-avatar-placeholder">
                          <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                            alt="Default Preview"
                            className="preview-avatar-img opacity-80"
                          />
                          <div className="placeholder-overlay">
                            <FiUser className="user-icon-center" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="cust-form-group" style={{ marginTop: '14px' }}>
                  <label>Notes</label>
                  <textarea
                    rows="2"
                    placeholder="Enter any additional notes (optional)"
                    maxLength="200"
                    value={formData.notes}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  ></textarea>
                  <small className="char-count">{formData.notes.length}/200</small>
                </div>
              </div>

              <div className="cust-modal-footer">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setIsAddEditOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-save-customer">
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Customer Details Modal */}
      {viewCustomer && (
        <div className="cust-modal-overlay">
          <div className="cust-modal-box view-modal">
            <div className="cust-modal-header">
              <h2>Customer Details</h2>
              <button className="btn-modal-close" onClick={() => setViewCustomer(null)}>
                <FiX />
              </button>
            </div>
            <div className="cust-modal-body">
              <div className="view-profile-header">
                {viewCustomer.avatar ? (
                  <img src={viewCustomer.avatar} alt={viewCustomer.firstName} className="view-avatar" />
                ) : (
                  <div className="view-avatar-initials" style={{ backgroundColor: viewCustomer.bg || '#0f9f59' }}>
                    {viewCustomer.initials}
                  </div>
                )}
                <div>
                  <h3>{viewCustomer.firstName} {viewCustomer.lastName}</h3>
                  <span className={`status-pill ${viewCustomer.status.toLowerCase()}`}>{viewCustomer.status}</span>
                </div>
              </div>
              <div className="view-grid">
                <div><strong>Email:</strong> {viewCustomer.email}</div>
                <div><strong>Phone:</strong> {viewCustomer.phone}</div>
                <div><strong>Total Orders:</strong> {viewCustomer.orders}</div>
                <div><strong>Total Spent:</strong> ${viewCustomer.totalSpent.toFixed(2)}</div>
                <div><strong>Gender:</strong> {viewCustomer.gender || 'N/A'}</div>
                <div><strong>DOB:</strong> {viewCustomer.dob || 'N/A'}</div>
                <div><strong>Address:</strong> {viewCustomer.address || 'N/A'}, {viewCustomer.city}, {viewCustomer.state}</div>
              </div>
            </div>
            <div className="cust-modal-footer">
              <button className="btn-cancel" onClick={() => setViewCustomer(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;