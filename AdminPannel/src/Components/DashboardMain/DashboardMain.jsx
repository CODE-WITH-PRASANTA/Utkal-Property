import React, { useState } from 'react';
import './DashboardMain.css';

// Asset imports
import house1 from '../../assets/dashboardhouse1.webp';
import house2 from '../../assets/dashboardhouse2.webp';
import house3 from '../../assets/dashboardhouse3.webp';
import house4 from '../../assets/dashboardhouse4.webp';
import house5 from '../../assets/dashboardhouse5.webp';

const DashboardMain = () => {
  // Filter & Search State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Status');
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Insights State
  const [insightsTab, setInsightsTab] = useState('Day');
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Listing Data
  const [listings, setListings] = useState([
    { id: 1, title: 'Gorgeous Apartment Building', date: 'March 22, 2023', rawDate: '2023-03-22', price: '$7,500', status: 'Approved', image: house1 },
    { id: 2, title: 'Gorgeous Apartment Building', date: 'March 22, 2023', rawDate: '2023-03-22', price: '$7,500', status: 'Approved', image: house2 },
    { id: 3, title: 'Gorgeous Apartment Building', date: 'March 22, 2023', rawDate: '2023-03-22', price: '$7,500', status: 'Pending', image: house3 },
    { id: 4, title: 'Gorgeous Apartment Building', date: 'March 22, 2023', rawDate: '2023-03-22', price: '$7,500', status: 'Sold', image: house4 },
    { id: 5, title: 'Gorgeous Apartment Building', date: 'March 22, 2023', rawDate: '2023-03-22', price: '$7,500', status: 'Pending', image: house5 },
    { id: 6, title: 'Modern Luxury Villa', date: 'March 25, 2023', rawDate: '2023-03-25', price: '$9,200', status: 'Approved', image: house1 },
    { id: 7, title: 'Urban Skyline Penthouse', date: 'March 28, 2023', rawDate: '2023-03-28', price: '$12,000', status: 'Sold', image: house2 },
  ]);

  // Messages Data
  const messagesData = [
    { id: 1, name: 'Themesflat', time: '3 days ago', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean scelerisque vulputate tincidunt.', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' },
    { id: 2, name: 'ThemeMu', time: '3 days ago', text: 'Nullam lacinia lorem id sapien suscipit, vitae pellentesque metus maximus.', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100' },
    { id: 3, name: 'Cameron Williamson', time: '3 days ago', text: 'In consequat lacus augue, a vestibulum est aliquam non.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
    { id: 4, name: 'Esther Howard', time: '3 days ago', text: 'Cras congue in justo vel dapibus. Praesent euismod, lectus et aliquam pretium.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
  ];

  // Reviews Data
  const reviewsData = [
    { id: 1, name: 'Bessie Cooper', time: '3 days ago', text: 'Maecenas eu lorem et urna accumsan vestibulum vel vitae magna.', rating: 5, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
    { id: 2, name: 'Annette Black', time: '3 days ago', text: 'Nullam rhoncus dolor arcu, et commodo tellus semper vitae.', rating: 5, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100' },
    { id: 3, name: 'Ralph Edwards', time: '3 days ago', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', rating: 5, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
  ];

  // Configured datasets for chart metrics
  const chartDataConfig = {
    Day: {
      labels: ['4 Jan', '5 Jan', '6 Jan', '7 Jan', '8 Jan', '9 Jan', '10 Jan', '11 Jan', '12 Jan', '13 Jan', '14 Jan', '15 Jan'],
      values: [40, 105, 92, 155, 138, 205, 120, 92, 155, 138, 205, 320],
      maxVal: 350
    },
    Week: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
      values: [450, 780, 620, 950, 1100, 1450],
      maxVal: 1600
    },
    Month: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      values: [1200, 1900, 1500, 2400, 2100, 3100, 2800, 3500, 3200, 4100, 3900, 4800],
      maxVal: 5000
    },
    Year: {
      labels: ['2023', '2024', '2025', '2026'],
      values: [15000, 24000, 31000, 45000],
      maxVal: 50000
    }
  };

  const currentChart = chartDataConfig[insightsTab];

  // Filtering Logic
  const filteredListings = listings.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Status' || statusFilter === 'All' || item.status.toLowerCase() === statusFilter.toLowerCase();
    
    let matchesDate = true;
    if (fromDate && item.rawDate < fromDate) matchesDate = false;
    if (toDate && item.rawDate > toDate) matchesDate = false;

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredListings.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentListings = filteredListings.slice(indexOfFirstItem, indexOfLastItem);

  // Actions
  const handleEdit = (id) => alert(`Edit listing ID: ${id}`);
  const handleMarkSold = (id) => setListings(listings.map(item => item.id === id ? { ...item, status: 'Sold' } : item));
  const handleDelete = (id) => setListings(listings.filter(item => item.id !== id));

  return (
    <div className="dashboard-main__wrapper">
      <header className="dashboard-main__header">
        <div>
          <h2 className="dashboard-main__title">Overview Dashboard</h2>
          <p className="dashboard-main__subtitle">Track your performance, listings, and client communications</p>
        </div>
      </header>

      {/* KPI Stats Cards */}
      <section className="dashboard-main__stats-grid">
        <div className="dashboard-main__stat-card">
          <div className="dashboard-main__stat-icon dashboard-main__stat-icon--blue">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div className="dashboard-main__stat-info">
            <span className="dashboard-main__stat-label">Your Listings</span>
            <div className="dashboard-main__stat-value-group">
              <span className="dashboard-main__stat-value">45</span>
              <span className="dashboard-main__stat-subtext">/ 50 limit</span>
            </div>
          </div>
        </div>

        <div className="dashboard-main__stat-card">
          <div className="dashboard-main__stat-icon dashboard-main__stat-icon--amber">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="dashboard-main__stat-info">
            <span className="dashboard-main__stat-label">Pending Approval</span>
            <span className="dashboard-main__stat-value">02</span>
          </div>
        </div>

        <div className="dashboard-main__stat-card">
          <div className="dashboard-main__stat-icon dashboard-main__stat-icon--emerald">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <div className="dashboard-main__stat-info">
            <span className="dashboard-main__stat-label">Favorites</span>
            <span className="dashboard-main__stat-value">06</span>
          </div>
        </div>

        <div className="dashboard-main__stat-card">
          <div className="dashboard-main__stat-icon dashboard-main__stat-icon--purple">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div className="dashboard-main__stat-info">
            <span className="dashboard-main__stat-label">Total Reviews</span>
            <span className="dashboard-main__stat-value">28</span>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="dashboard-main__grid">
        
        {/* Left Column */}
        <div className="dashboard-main__column-left">
          
          {/* Listings Card */}
          <div className="dashboard-main__card">
            <div className="dashboard-main__card-header">
              <h3 className="dashboard-main__card-title">Manage Listings</h3>
              <span className="dashboard-main__badge-count">{filteredListings.length} items found</span>
            </div>
            
            <div className="dashboard-main__filter-bar">
              <div className="dashboard-main__input-group">
                <svg className="dashboard-main__input-icon" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text" 
                  placeholder="Search title..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="dashboard-main__input"
                />
              </div>

              <div className="dashboard-main__dropdown-wrapper">
                <button 
                  type="button"
                  className="dashboard-main__dropdown-trigger"
                  onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                >
                  <span>{statusFilter}</span>
                  <svg className={`dashboard-main__dropdown-chevron ${isStatusDropdownOpen ? 'is-open' : ''}`} width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isStatusDropdownOpen && (
                  <div className="dashboard-main__dropdown-menu">
                    {['Status', 'All', 'Approved', 'Pending', 'Sold'].map((opt) => (
                      <div 
                        key={opt}
                        onClick={() => { setStatusFilter(opt); setIsStatusDropdownOpen(false); }} 
                        className={`dashboard-main__dropdown-item ${statusFilter === opt ? 'is-selected' : ''}`}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="dashboard-main__input-group">
                <input 
                  type="date" 
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="dashboard-main__input dashboard-main__input--date"
                />
              </div>

              <div className="dashboard-main__input-group">
                <input 
                  type="date" 
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="dashboard-main__input dashboard-main__input--date"
                />
              </div>
            </div>

            {/* Listings Table */}
            <div className="dashboard-main__table-container">
              <table className="dashboard-main__table">
                <thead>
                  <tr>
                    <th>Listing Details</th>
                    <th>Status</th>
                    <th className="dashboard-main__th-actions">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentListings.length > 0 ? (
                    currentListings.map((item) => (
                      <tr key={item.id} className="dashboard-main__table-row">
                        <td>
                          <div className="dashboard-main__property">
                            <img src={item.image} alt={item.title} className="dashboard-main__property-img" />
                            <div className="dashboard-main__property-meta">
                              <h4 className="dashboard-main__property-title">{item.title}</h4>
                              <span className="dashboard-main__property-date">Posted on {item.date}</span>
                              <span className="dashboard-main__property-price">{item.price}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`dashboard-main__status-tag dashboard-main__status-tag--${item.status.toLowerCase()}`}>
                            {item.status}
                          </span>
                        </td>
                        <td>
                          <div className="dashboard-main__actions-group">
                            <button 
                              type="button"
                              className="dashboard-main__action-btn dashboard-main__action-btn--edit" 
                              onClick={() => handleEdit(item.id)}
                              title="Edit Item"
                            >
                              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              <span>Edit</span>
                            </button>

                            <button 
                              type="button"
                              className="dashboard-main__action-btn dashboard-main__action-btn--sold" 
                              onClick={() => handleMarkSold(item.id)}
                              title="Mark as Sold"
                            >
                              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                              </svg>
                              <span>Sold</span>
                            </button>

                            <button 
                              type="button"
                              className="dashboard-main__action-btn dashboard-main__action-btn--delete" 
                              onClick={() => handleDelete(item.id)}
                              title="Delete Item"
                            >
                              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              <span>Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="dashboard-main__empty-state">No matching listings found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="dashboard-main__pagination">
                <button 
                  className="dashboard-main__page-btn"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  &#8249;
                </button>

                {[...Array(totalPages)].map((_, index) => {
                  const pageNum = index + 1;
                  return (
                    <button
                      key={pageNum}
                      className={`dashboard-main__page-btn ${currentPage === pageNum ? 'is-active' : ''}`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button 
                  className="dashboard-main__page-btn"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  &#8250;
                </button>
              </div>
            )}
          </div>

          {/* Page Insights & Interactive Chart */}
          <div className="dashboard-main__card">
            <div className="dashboard-main__card-header">
              <h3 className="dashboard-main__card-title">Page Insights</h3>
              <div className="dashboard-main__tabs">
                {['Day', 'Week', 'Month', 'Year'].map((tab) => (
                  <button
                    key={tab}
                    className={`dashboard-main__tab-btn ${insightsTab === tab ? 'is-active' : ''}`}
                    onClick={() => { setInsightsTab(tab); setHoveredPoint(null); }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="dashboard-main__chart-wrapper">
              <svg viewBox="0 0 850 380" className="dashboard-main__chart-svg" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="dashboardChartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Y Grid Lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                  const yPos = 320 - (ratio * 280);
                  const labelVal = Math.round(currentChart.maxVal * ratio);
                  return (
                    <g key={i}>
                      <line x1="55" y1={yPos} x2="820" y2={yPos} stroke="#f1f5f9" strokeWidth="1" />
                      <text x="45" y={yPos + 4} textAnchor="end" className="dashboard-main__chart-axis-text">
                        {labelVal}
                      </text>
                    </g>
                  );
                })}

                {/* Baseline */}
                <line x1="55" y1="320" x2="820" y2="320" stroke="#e2e8f0" strokeWidth="1.5" />

                {/* Area Under Curve */}
                <path
                  d={
                    `M 55 320 ` +
                    currentChart.values
                      .map((val, idx) => {
                        const x = 55 + (idx * (765 / Math.max(1, currentChart.values.length - 1)));
                        const y = 320 - (val / currentChart.maxVal) * 280;
                        return `L ${x} ${y}`;
                      })
                      .join(' ') +
                    ` L ${55 + ((currentChart.values.length - 1) * (765 / Math.max(1, currentChart.values.length - 1)))} 320 Z`
                  }
                  fill="url(#dashboardChartGradient)"
                />

                {/* Line Path */}
                <path
                  d={currentChart.values
                    .map((val, idx) => {
                      const x = 55 + (idx * (765 / Math.max(1, currentChart.values.length - 1)));
                      const y = 320 - (val / currentChart.maxVal) * 280;
                      return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Nodes & Hover Hit Targets */}
                {currentChart.values.map((val, idx) => {
                  const x = 55 + (idx * (765 / Math.max(1, currentChart.values.length - 1)));
                  const y = 320 - (val / currentChart.maxVal) * 280;
                  const label = currentChart.labels[idx];
                  const isHovered = hoveredPoint && hoveredPoint.index === idx;

                  return (
                    <g key={idx} className="dashboard-main__chart-node-group">
                      {/* Vertical highlight line on hover */}
                      {isHovered && (
                        <line x1={x} y1="40" x2={x} y2="320" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="4 4" />
                      )}

                      {/* Visible Node */}
                      <circle
                        cx={x}
                        cy={y}
                        r={isHovered ? "7" : "4.5"}
                        className={`dashboard-main__chart-node ${isHovered ? 'is-active' : ''}`}
                      />

                      {/* Transparent Hover Hitbox */}
                      <circle
                        cx={x}
                        cy={y}
                        r="20"
                        fill="transparent"
                        style={{ cursor: 'pointer' }}
                        onMouseEnter={() => setHoveredPoint({ index: idx, x, y, val, label })}
                        onMouseLeave={() => setHoveredPoint(null)}
                      />

                      {/* X Labels */}
                      <text x={x} y="348" textAnchor="middle" className="dashboard-main__chart-axis-text">
                        {label}
                      </text>
                    </g>
                  );
                })}

                {/* Floating Tooltip */}
                {hoveredPoint && (
                  <g transform={`translate(${Math.min(Math.max(hoveredPoint.x - 50, 10), 730)}, ${Math.max(hoveredPoint.y - 55, 10)})`}>
                    <rect
                      width="100"
                      height="42"
                      rx="8"
                      className="dashboard-main__chart-tooltip-bg"
                    />
                    <text x="50" y="18" textAnchor="middle" className="dashboard-main__chart-tooltip-title">
                      {hoveredPoint.label}
                    </text>
                    <text x="50" y="33" textAnchor="middle" className="dashboard-main__chart-tooltip-value">
                      {hoveredPoint.val.toLocaleString()} views
                    </text>
                  </g>
                )}
              </svg>
            </div>
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div className="dashboard-main__column-right">
          
          {/* Messages Card */}
          <div className="dashboard-main__card">
            <div className="dashboard-main__card-header">
              <h3 className="dashboard-main__card-title">Messages</h3>
              <button type="button" className="dashboard-main__link-btn">View All</button>
            </div>
            <div className="dashboard-main__sidebar-list">
              {messagesData.map((msg) => (
                <div key={msg.id} className="dashboard-main__feed-item">
                  <div className="dashboard-main__feed-header">
                    <div className="dashboard-main__user">
                      <img src={msg.avatar} alt={msg.name} className="dashboard-main__avatar" />
                      <div>
                        <h5 className="dashboard-main__user-name">{msg.name}</h5>
                        <span className="dashboard-main__feed-time">{msg.time}</span>
                      </div>
                    </div>
                  </div>
                  <p className="dashboard-main__feed-text">{msg.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reviews Card */}
          <div className="dashboard-main__card">
            <div className="dashboard-main__card-header">
              <h3 className="dashboard-main__card-title">Recent Reviews</h3>
              <button type="button" className="dashboard-main__link-btn">View All</button>
            </div>
            <div className="dashboard-main__sidebar-list">
              {reviewsData.map((rev) => (
                <div key={rev.id} className="dashboard-main__feed-item">
                  <div className="dashboard-main__feed-header">
                    <div className="dashboard-main__user">
                      <img src={rev.avatar} alt={rev.name} className="dashboard-main__avatar" />
                      <div>
                        <h5 className="dashboard-main__user-name">{rev.name}</h5>
                        <span className="dashboard-main__feed-time">{rev.time}</span>
                      </div>
                    </div>
                  </div>
                  <p className="dashboard-main__feed-text">{rev.text}</p>
                  <div className="dashboard-main__stars">
                    {[...Array(rev.rating)].map((_, i) => (
                      <svg key={i} className="dashboard-main__star-icon" width="14" height="14" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DashboardMain;