import React, { useState } from 'react';
import './DashboardMain.css';

// Importing webp images from assets folder as requested
import house1 from '../../assets/dashboardhouse1.webp';
import house2 from '../../assets/dashboardhouse2.webp';
import house3 from '../../assets/dashboardhouse3.webp';
import house4 from '../../assets/dashboardhouse4.webp';
import house5 from '../../assets/dashboardhouse5.webp';

const DashboardMain = () => {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Status');
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // Pagination state (5 items per page)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Active action menu row id
  const [activeActionId, setActiveActionId] = useState(null);

  // Insights filter state
  const [insightsTab, setInsightsTab] = useState('Day');

  // Dummy listings data utilizing the 5 webp images
  const [listings, setListings] = useState([
    { id: 1, title: 'Gorgeous Apartment Building', date: 'March 22, 2023', rawDate: '2023-03-22', price: '$7,500', status: 'Approved', image: house1 },
    { id: 2, title: 'Gorgeous Apartment Building', date: 'March 22, 2023', rawDate: '2023-03-22', price: '$7,500', status: 'Approved', image: house2 },
    { id: 3, title: 'Gorgeous Apartment Building', date: 'March 22, 2023', rawDate: '2023-03-22', price: '$7,500', status: 'Pending', image: house3 },
    { id: 4, title: 'Gorgeous Apartment Building', date: 'March 22, 2023', rawDate: '2023-03-22', price: '$7,500', status: 'Sold', image: house4 },
    { id: 5, title: 'Gorgeous Apartment Building', date: 'March 22, 2023', rawDate: '2023-03-22', price: '$7,500', status: 'Pending', image: house5 },
    { id: 6, title: 'Modern Luxury Villa', date: 'March 25, 2023', rawDate: '2023-03-25', price: '$9,200', status: 'Approved', image: house1 },
    { id: 7, title: 'Urban Skyline Penthouse', date: 'March 28, 2023', rawDate: '2023-03-28', price: '$12,000', status: 'Sold', image: house2 },
  ]);

  // Messages dummy data
  const messagesData = [
    { id: 1, name: 'Themesflat', time: '3 day ago', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean scelerisque vulputate tincidunt. Maecenas lorem sapien', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' },
    { id: 2, name: 'ThemeMu', time: '3 day ago', text: 'Nullam lacinia lorem id sapien suscipit, vitae pellentesque metus maximus. Duis eu mollis dolor.', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100' },
    { id: 3, name: 'Cameron Williamson', time: '3 day ago', text: 'In consequat lacus augue, a vestibulum est aliquam non', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
    { id: 4, name: 'Esther Howard', time: '3 day ago', text: 'Cras congue in justo vel dapibus. Praesent euismod, lectus et aliquam pretium', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
    { id: 4, name: 'Esther Howard', time: '3 day ago', text: 'Cras congue in justo vel dapibus. Praesent euismod, lectus et aliquam pretium', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
    { id: 4, name: 'Esther Howard', time: '3 day ago', text: 'Cras congue in justo vel dapibus. Praesent euismod, lectus et aliquam pretium', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
  ];

  // Reviews dummy data
  const reviewsData = [
    { id: 1, name: 'Bessie Cooper', time: '3 day ago', text: 'Maecenas eu lorem et urna accumsan vestibulum vel vitae magna.', rating: 5, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
    { id: 2, name: 'Annette Black', time: '3 day ago', text: 'Nullam rhoncus dolor arcu, et commodo tellus semper vitae.', rating: 5, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100' },
    { id: 3, name: 'Ralph Edwards', time: '3 day ago', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus viverra semper convallis.', rating: 5, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
    { id: 3, name: 'Ralph Edwards', time: '3 day ago', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus viverra semper convallis.', rating: 5, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
    { id: 3, name: 'Ralph Edwards', time: '3 day ago', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus viverra semper convallis.', rating: 5, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
  ];

  // Chart datasets configuration based on toggle
  const chartDataConfig = {
    Day: {
      labels: ['4 Jan', '5 Jan', '6 Jan', '7 Jan', '8 Jan', '9 Jan', '10 Jan', '11 Jan', '12 Jan', '13 Jan', '14 Jan', '15 Jan'],
      values: [0, 105, 92, 155, 138, 205, 120, 92, 155, 138, 205, 320]
    },
    Week: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
      values: [450, 780, 620, 950, 1100, 1450]
    },
    Month: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      values: [1200, 1900, 1500, 2400, 2100, 3100, 2800, 3500, 3200, 4100, 3900, 4800]
    },
    Year: {
      labels: ['2023', '2024', '2025', '2026'],
      values: [15000, 24000, 31000, 45000]
    }
  };

  const currentChart = chartDataConfig[insightsTab];

  // Filter logic
  const filteredListings = listings.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Status' || statusFilter === 'All' || item.status.toLowerCase() === statusFilter.toLowerCase();
    
    let matchesDate = true;
    if (fromDate && item.rawDate < fromDate) matchesDate = false;
    if (toDate && item.rawDate > toDate) matchesDate = false;

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Pagination calculations (5 items per page)
  const totalPages = Math.ceil(filteredListings.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentListings = filteredListings.slice(indexOfFirstItem, indexOfLastItem);

  // Handlers for item actions
  const handleEdit = (id) => {
    alert(`Edit listing ID: ${id}`);
    setActiveActionId(null);
  };

  const handleMarkSold = (id) => {
    setListings(listings.map(item => item.id === id ? { ...item, status: 'Sold' } : item));
    setActiveActionId(null);
  };

  const handleDelete = (id) => {
    setListings(listings.filter(item => item.id !== id));
    setActiveActionId(null);
  };

  return (
    <div className="dashboard-main-container">
      {/* Top Header */}
      <h2 className="dashboard-title">Dashboard</h2>

      {/* Top Stat Cards Section */}
      <div className="dashboard-stats-grid">
        <div className="stat-card">
          <div className="stat-icon-circle">
            <span className="material-icon-inner">📋</span>
          </div>
          <div className="stat-content">
            <h4 className="stat-label">Your listing</h4>
            <p className="stat-subtext">/50 remaining</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-circle">
            <span className="material-icon-inner">⏱️</span>
          </div>
          <div className="stat-content">
            <h4 className="stat-label">Pending</h4>
            <h2 className="stat-value">02</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-circle">
            <span className="material-icon-inner">⭐</span>
          </div>
          <div className="stat-content">
            <h4 className="stat-label">Favorites</h4>
            <h2 className="stat-value">06</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-circle">
            <span className="material-icon-inner">💬</span>
          </div>
          <div className="stat-content">
            <h4 className="stat-label">Reviews</h4>
          </div>
        </div>
      </div>

      {/* Main Content Split Layout */}
      <div className="dashboard-content-split">
        
        {/* Left Column */}
        <div className="dashboard-left-column">
          
          {/* New Listing Section / Filter Card */}
          <div className="filter-card">
            <h3 className="section-title">New listing</h3>
            
            <div className="filter-controls-row">
              {/* Search Box */}
              <div className="search-input-wrapper">
                <span className="search-icon">🔍</span>
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="dashboard-search-input"
                />
              </div>

              {/* Status Custom Dropdown */}
              <div className="custom-dropdown-container">
                <div 
                  className="dropdown-select-trigger"
                  onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                >
                  <span>{statusFilter}</span>
                  <span className="dropdown-arrow">▼</span>
                </div>

                {isStatusDropdownOpen && (
                  <div className="dropdown-menu-list">
                    <div onClick={() => { setStatusFilter('Status'); setIsStatusDropdownOpen(false); }} className="dropdown-item">Status</div>
                    <div onClick={() => { setStatusFilter('All'); setIsStatusDropdownOpen(false); }} className="dropdown-item">All</div>
                    <div onClick={() => { setStatusFilter('Approved'); setIsStatusDropdownOpen(false); }} className="dropdown-item">Approved</div>
                    <div onClick={() => { setStatusFilter('Pending'); setIsStatusDropdownOpen(false); }} className="dropdown-item">Pending</div>
                    <div onClick={() => { setStatusFilter('Sold'); setIsStatusDropdownOpen(false); }} className="dropdown-item">Sold</div>
                  </div>
                )}
              </div>

              {/* From Date Picker */}
              <div className="date-input-wrapper">
                <input 
                  type="date" 
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="dashboard-date-input"
                />
                <span className="calendar-icon">📅</span>
              </div>

              {/* To Date Picker */}
              <div className="date-input-wrapper">
                <input 
                  type="date" 
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="dashboard-date-input"
                />
                <span className="calendar-icon">📅</span>
              </div>
            </div>

            <div className="results-count-text">
              {filteredListings.length} results found
            </div>

            {/* Listings Table */}
            <div className="table-responsive-wrapper">
              <table className="listings-table">
                <thead>
                  <tr>
                    <th>Listing</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentListings.length > 0 ? (
                    currentListings.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="listing-info-cell">
                            <img src={item.image} alt={item.title} className="listing-thumbnail" />
                            <div className="listing-details">
                              <h4 className="listing-item-title">{item.title}</h4>
                              <p className="listing-post-date">Posting date: {item.date}</p>
                              <span className="listing-item-price">{item.price}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`status-badge ${item.status.toLowerCase()}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="action-cell-container">
  <div className="inline-action-buttons">
    <button 
      type="button"
      className="action-inline-btn edit-btn" 
      onClick={() => handleEdit(item.id)}
    >
      <span className="action-icon">✏️</span>
      <span>Edit</span>
    </button>

    <button 
      type="button"
      className="action-inline-btn sold-btn" 
      onClick={() => handleMarkSold(item.id)}
    >
      <span className="action-icon">🚫</span>
      <span>Sold</span>
    </button>

    <button 
      type="button"
      className="action-inline-btn delete-btn" 
      onClick={() => handleDelete(item.id)}
    >
      <span className="action-icon">🗑️</span>
      <span>Delete</span>
    </button>
  </div>
</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="no-results-cell">No listings found matching criteria.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Component */}
            {totalPages > 1 && (
              <div className="pagination-container">
                <button 
                  className="page-nav-btn"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  ❮
                </button>

                {[...Array(totalPages)].map((_, index) => {
                  const pageNum = index + 1;
                  return (
                    <button
                      key={pageNum}
                      className={`page-number-btn ${currentPage === pageNum ? 'active' : ''}`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button 
                  className="page-nav-btn"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  ❯
                </button>
              </div>
            )}
          </div>

          {/* Page Insights Section */}
         <div className="page-insights-card">
  <h3 className="section-title">Page Insights</h3>

  <div className="insights-tabs-row">
    {['Day', 'Week', 'Month', 'Year'].map((tab) => (
      <button
        key={tab}
        className={`insight-tab-btn ${insightsTab === tab ? 'active' : ''}`}
        onClick={() => setInsightsTab(tab)}
      >
        {tab}
      </button>
    ))}

    <div className="date-input-wrapper insight-date">
      <input type="date" className="dashboard-date-input" placeholder="From date" />
      <span className="calendar-icon">📅</span>
    </div>
    <div className="date-input-wrapper insight-date">
      <input type="date" className="dashboard-date-input" placeholder="To date" />
      <span className="calendar-icon">📅</span>
    </div>
  </div>

  {/* Professional Blue & White SVG Chart */}
  <div className="real-chart-container">
    <svg viewBox="0 0 850 420" className="insights-svg-chart" preserveAspectRatio="xMidYMid meet">
      <defs>
        {/* Soft Blue Gradient */}
        <linearGradient id="blueChartGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
        </linearGradient>
      </defs>

      {/* Y-Axis Left Numbers & Horizontal Baseline */}
      {[350, 300, 250, 200, 150, 100, 50, 0].map((yValue) => {
        // Y coordinate mapping (Top = 20, Bottom = 360)
        const yPos = 360 - (yValue / 350) * 340;
        return (
          <g key={yValue}>
            <text
              x="45"
              y={yPos + 4}
              textAnchor="end"
              fill="#94a3b8"
              fontSize="12"
              fontWeight="500"
              fontFamily="sans-serif"
            >
              {yValue}
            </text>
          </g>
        );
      })}

      {/* Top Border Line & Left Y-Axis Border Line */}
      <line x1="60" y1="20" x2="830" y2="20" stroke="#f1f5f9" strokeWidth="1" />
      <line x1="60" y1="20" x2="60" y2="360" stroke="#e2e8f0" strokeWidth="1.5" />
      <line x1="60" y1="360" x2="830" y2="360" stroke="#cbd5e1" strokeWidth="1.5" />

      {/* Vertical Grid Lines for each X point (matches reference image) */}
      {currentChart.values.map((_, idx) => {
        const xPos = 60 + (idx * (770 / Math.max(1, currentChart.values.length - 1)));
        return (
          <line
            key={idx}
            x1={xPos}
            y1="20"
            x2={xPos}
            y2="360"
            stroke="#f1f5f9"
            strokeWidth="1"
          />
        );
      })}

      {/* Area Gradient Fill */}
      <path
        d={
          `M 60 360 ` +
          currentChart.values
            .map((val, idx) => {
              const x = 60 + (idx * (770 / Math.max(1, currentChart.values.length - 1)));
              const y = 360 - (val / 350) * 340;
              return `L ${x} ${y}`;
            })
            .join(' ') +
          ` L ${60 + ((currentChart.values.length - 1) * (770 / Math.max(1, currentChart.values.length - 1)))} 360 Z`
        }
        fill="url(#blueChartGradient)"
      />

      {/* Main Blue Line Graph */}
      <path
        d={currentChart.values
          .map((val, idx) => {
            const x = 60 + (idx * (770 / Math.max(1, currentChart.values.length - 1)));
            const y = 360 - (val / 350) * 340;
            return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
          })
          .join(' ')}
        fill="none"
        stroke="#2563eb"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Data Node Circles */}
      {currentChart.values.map((val, idx) => {
        const x = 60 + (idx * (770 / Math.max(1, currentChart.values.length - 1)));
        const y = 360 - (val / 350) * 340;
        return (
          <circle
            key={idx}
            cx={x}
            cy={y}
            r="4.5"
            fill="#2563eb"
            stroke="#ffffff"
            strokeWidth="2.5"
          />
        );
      })}

      {/* X-Axis Date Labels (Aligned cleanly underneath each vertical line) */}
      {currentChart.labels.map((label, idx) => {
        const x = 60 + (idx * (770 / Math.max(1, currentChart.values.length - 1)));
        return (
          <text
            key={idx}
            x={x}
            y="385"
            textAnchor="middle"
            fill="#64748b"
            fontSize="12"
            fontWeight="500"
            fontFamily="sans-serif"
          >
            {label}
          </text>
        );
      })}
    </svg>
  </div>
</div>
        </div>

        {/* Right Column (Messages & Recent Reviews aligned bottom edge) */}
        <div className="dashboard-right-column">
          
          {/* Messages Box */}
          <div className="sidebar-card messages-card">
            <h3 className="section-title">Messages</h3>
            <div className="sidebar-list">
              {messagesData.map((msg) => (
                <div key={msg.id} className="sidebar-item">
                  <div className="sidebar-item-header">
                    <div className="user-profile-info">
                      <img src={msg.avatar} alt={msg.name} className="user-avatar" />
                      <span className="user-name">{msg.name}</span>
                    </div>
                    <span className="item-time-ago">{msg.time}</span>
                  </div>
                  <p className="sidebar-item-text">{msg.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reviews Box */}
         <div className="sidebar-card reviews-card">
  <h3 className="section-title">Recent Reviews</h3>
  <div className="sidebar-list">
    {reviewsData.map((rev) => (
      <div key={rev.id} className="sidebar-item">
        <div className="sidebar-item-header">
          <div className="user-profile-info">
            <img src={rev.avatar} alt={rev.name} className="user-avatar" />
            <span className="user-name">{rev.name}</span>
          </div>
          <span className="item-time-ago">{rev.time}</span>
        </div>
        <p className="sidebar-item-text">{rev.text}</p>
        <div className="star-rating-row">
          {[...Array(rev.rating)].map((_, i) => (
            <span key={i} className="star-icon">★</span>
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