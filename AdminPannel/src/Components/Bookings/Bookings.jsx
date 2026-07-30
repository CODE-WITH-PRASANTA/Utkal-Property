import React, { useState, useEffect, useRef } from 'react';
import { 
  FiSearch, FiCalendar, FiDownload, FiRotateCcw, FiEye, 
  FiMoreVertical, FiChevronLeft, FiChevronRight, FiChevronDown, 
  FiCheckCircle, FiClock, FiXCircle, FiX
} from 'react-icons/fi';
import './Bookings.css';

const Bookings = () => {
  // State for property details sidebar toggle (triggered by eye icon)
  const [selectedBooking, setSelectedBooking] = useState(null);

  // State for 3-dots action menu dropdown per row
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  
  // State for bookings data (made mutable so status can be updated from dropdown)
  const [bookingsData, setBookingsData] = useState([
    {
      id: 'BK-2026-00048',
      propertyName: 'Luxury 3BHK Apartment',
      location: 'Bhubaneswar',
      clientName: 'Rakesh Kumar',
      clientPhone: '+91 98765 43210',
      clientInitials: 'RK',
      bookingDate: '28 Jul 2026',
      amount: '₹ 1,00,000',
      status: 'Confirmed',
      paymentStatus: 'Paid',
      propertyImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&auto=format&fit=crop&q=60',
      description: 'A premium 3BHK luxury apartment featuring high-end modular interiors, panoramic city views, modern smart home automation, and dedicated parking space.',
      amenities: ['Swimming Pool', 'Gym', '24/7 Security', 'Power Backup', 'Lift']
    },
    {
      id: 'BK-2026-00047',
      propertyName: 'Premium Villa',
      location: 'Puri, Odisha',
      clientName: 'Priya Senapati',
      clientPhone: '+91 87654 32109',
      clientInitials: 'PS',
      bookingDate: '27 Jul 2026',
      amount: '₹ 50,000',
      status: 'Pending',
      paymentStatus: 'Partial',
      propertyImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&auto=format&fit=crop&q=60',
      description: 'Exquisite beachside villa offering breathtaking ocean views, private lawn, expansive living spaces, and top-tier luxury furnishings.',
      amenities: ['Private Beach Access', 'Garden', 'Modular Kitchen', 'AC Rooms']
    },
    {
      id: 'BK-2026-00046',
      propertyName: 'Modern 2BHK Flat',
      location: 'Cuttack, Odisha',
      clientName: 'Amit Behera',
      clientPhone: '+91 76543 21098',
      clientInitials: 'AB',
      bookingDate: '26 Jul 2026',
      amount: '₹ 75,000',
      status: 'Confirmed',
      paymentStatus: 'Paid',
      propertyImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&auto=format&fit=crop&q=60',
      description: 'Cozy and modern 2BHK flat situated in a prime urban hub, close to shopping malls, corporate parks, and transit terminals.',
      amenities: ['Covered Parking', 'CCTV Surveillance', 'Intercom', 'Water Supply']
    },
    {
      id: 'BK-2026-00045',
      propertyName: 'Commercial Space',
      location: 'Bhubaneswar',
      clientName: 'Subhashree Mohanty',
      clientPhone: '+91 65432 10987',
      clientInitials: 'SM',
      bookingDate: '25 Jul 2026',
      amount: '₹ 2,00,000',
      status: 'Pending',
      paymentStatus: 'Partial',
      propertyImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&auto=format&fit=crop&q=60',
      description: 'Spacious high-footfall commercial office space ideal for startups, corporate headquarters, and retail showrooms.',
      amenities: ['Central AC', 'High-speed Elevators', 'Cafeteria', 'Conference Room']
    },
    {
      id: 'BK-2026-00044',
      propertyName: 'Luxury 4BHK Apartment',
      location: 'Bhubaneswar',
      clientName: 'Debashis Patnaik',
      clientPhone: '+91 54321 09876',
      clientInitials: 'DP',
      bookingDate: '24 Jul 2026',
      amount: '₹ 1,25,000',
      status: 'Confirmed',
      paymentStatus: 'Paid',
      propertyImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&auto=format&fit=crop&q=60',
      description: 'Grand 4BHK residence with ultra-luxurious marble flooring, sprawling balconies, premium architectural detailing, and elite community amenities.',
      amenities: ['Clubhouse', 'Swimming Pool', 'Valet Parking', 'Concierge Service']
    },
    {
      id: 'BK-2026-00043',
      propertyName: 'Beachside Villa',
      location: 'Puri, Odisha',
      clientName: 'Sourav Lenka',
      clientPhone: '+91 98701 23456',
      clientInitials: 'SL',
      bookingDate: '23 Jul 2026',
      amount: '₹ 3,00,000',
      status: 'Cancelled',
      paymentStatus: 'Refunded',
      propertyImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop&q=60',
      description: 'Stunning luxury villa directly facing the coastline with custom outdoor decking, private swimming pool, and luxury suites.',
      amenities: ['Private Pool', 'Ocean View Deck', 'Barbecue Area', 'Spa Room']
    },
    {
      id: 'BK-2026-00042',
      propertyName: 'Office Space',
      location: 'Bhubaneswar',
      clientName: 'Niharika Kar',
      clientPhone: '+91 87610 23456',
      clientInitials: 'NK',
      bookingDate: '22 Jul 2026',
      amount: '₹ 1,80,000',
      status: 'Confirmed',
      paymentStatus: 'Paid',
      propertyImage: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500&auto=format&fit=crop&q=60',
      description: 'Fully furnished, tech-enabled plug-and-play office workspace designed for maximum efficiency and modern business operations.',
      amenities: ['High-speed Wi-Fi', 'Printer Station', 'Meeting Pods', 'Lounge Area']
    },
    {
      id: 'BK-2026-00041',
      propertyName: 'Duplex Penthouse',
      location: 'Rourkela, Odisha',
      clientName: 'Manas Swain',
      clientPhone: '+91 91234 56789',
      clientInitials: 'MS',
      bookingDate: '21 Jul 2026',
      amount: '₹ 2,50,000',
      status: 'Confirmed',
      paymentStatus: 'Paid',
      propertyImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&auto=format&fit=crop&q=60',
      description: 'Ultra-modern rooftop duplex penthouse featuring private terrace gardens and panoramic skyline views.',
      amenities: ['Private Terrace', 'Jacuzzi', 'Smart Lighting', 'Valet Parking']
    },
    {
      id: 'BK-2026-00040',
      propertyName: 'Cozy Studio Apartment',
      location: 'Bhubaneswar',
      clientName: 'Ananya Rout',
      clientPhone: '+91 99887 76655',
      clientInitials: 'AR',
      bookingDate: '20 Jul 2026',
      amount: '₹ 35,000',
      status: 'Pending',
      paymentStatus: 'Partial',
      propertyImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&auto=format&fit=crop&q=60',
      description: 'Compact and stylish studio apartment designed specifically for young corporate professionals and digital nomads.',
      amenities: ['High-speed Internet', 'Furnished Kitchenette', 'Laundry Service']
    },
    {
      id: 'BK-2026-00039',
      propertyName: 'Luxury 3BHK Apartment',
      location: 'Bhubaneswar',
      clientName: 'Siddharth Das',
      clientPhone: '+91 94380 12345',
      clientInitials: 'SD',
      bookingDate: '19 Jul 2026',
      amount: '₹ 95,000',
      status: 'Confirmed',
      paymentStatus: 'Paid',
      propertyImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&auto=format&fit=crop&q=60',
      description: 'Spacious apartment layout equipped with premium wooden flooring and custom lighting fixtures.',
      amenities: ['Swimming Pool', 'Gym', '24/7 Security']
    },
    {
      id: 'BK-2026-00038',
      propertyName: 'Premium Villa',
      location: 'Puri, Odisha',
      clientName: 'Lipsa Mishra',
      clientPhone: '+91 97766 55443',
      clientInitials: 'LM',
      bookingDate: '18 Jul 2026',
      amount: '₹ 1,50,000',
      status: 'Cancelled',
      paymentStatus: 'Refunded',
      propertyImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&auto=format&fit=crop&q=60',
      description: 'Serene beachside accommodation with private lawns and peaceful surroundings.',
      amenities: ['Private Garden', 'Ocean View', 'Modular Kitchen']
    },
    {
      id: 'BK-2026-00037',
      propertyName: 'Modern 2BHK Flat',
      location: 'Cuttack, Odisha',
      clientName: 'Chinmay Tripathy',
      clientPhone: '+91 93322 11000',
      clientInitials: 'CT',
      bookingDate: '17 Jul 2026',
      amount: '₹ 60,000',
      status: 'Confirmed',
      paymentStatus: 'Paid',
      propertyImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&auto=format&fit=crop&q=60',
      description: 'Well-ventilated flat located near main city connectors and public parks.',
      amenities: ['Covered Parking', 'Water Supply', 'Security Guard']
    },
    {
      id: 'BK-2026-00036',
      propertyName: 'Commercial Space',
      location: 'Bhubaneswar',
      clientName: 'Snehalata Jena',
      clientPhone: '+91 90011 22334',
      clientInitials: 'SJ',
      bookingDate: '16 Jul 2026',
      amount: '₹ 1,75,000',
      status: 'Pending',
      paymentStatus: 'Partial',
      propertyImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&auto=format&fit=crop&q=60',
      description: 'Prime ground-floor commercial unit suitable for banks, retail outlets, or corporate offices.',
      amenities: ['Power Backup', 'Central AC', 'Ample Parking']
    },
    {
      id: 'BK-2026-00035',
      propertyName: 'Beachside Villa',
      location: 'Puri, Odisha',
      clientName: 'Abinash Swain',
      clientPhone: '+91 95544 33221',
      clientInitials: 'AS',
      bookingDate: '15 Jul 2026',
      amount: '₹ 2,20,000',
      status: 'Confirmed',
      paymentStatus: 'Paid',
      propertyImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop&q=60',
      description: 'Luxurious resort-style villa just minutes away from the main beach temple stretch.',
      amenities: ['Private Pool', 'Barbecue Area', 'Balcony Deck']
    }
  ]);
  
  // State for pagination & filters
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(9);
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [propertyFilter, setPropertyFilter] = useState('All Properties');
  const [dateRange, setDateRange] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.bookings-dropdown-container')) {
        setActiveDropdownId(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Update booking status handler
  const handleStatusChange = (id, newStatus) => {
    setBookingsData(prev => 
      prev.map(item => item.id === id ? { ...item, status: newStatus } : item)
    );
    // Also update selectedBooking sidebar if it's currently open for this item
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking(prev => ({ ...prev, status: newStatus }));
    }
    setActiveDropdownId(null);
  };

  // Filter logic
  const filteredBookings = bookingsData.filter(item => {
    const matchesSearch = item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.propertyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || item.status === statusFilter;
    const matchesProperty = propertyFilter === 'All Properties' || item.propertyName === propertyFilter;
    return matchesSearch && matchesStatus && matchesProperty;
  });

  // Pagination calculation
  const totalPages = Math.ceil(filteredBookings.length / rowsPerPage) || 1;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstRow, indexOfLastRow);

  const clearFilters = () => {
    setStatusFilter('All Status');
    setPropertyFilter('All Properties');
    setDateRange('');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Confirmed':
        return <span className="bookings-badge bookings-badge-confirmed"><span className="bookings-dot-confirmed"></span>Confirmed</span>;
      case 'Pending':
        return <span className="bookings-badge bookings-badge-pending"><span className="bookings-dot-pending"></span>Pending</span>;
      case 'Cancelled':
        return <span className="bookings-badge bookings-badge-cancelled"><span className="bookings-dot-cancelled"></span>Cancelled</span>;
      default:
        return null;
    }
  };

  const getPaymentBadge = (paymentStatus) => {
    switch(paymentStatus) {
      case 'Paid':
        return <span className="bookings-payment-paid">Paid</span>;
      case 'Partial':
        return <span className="bookings-payment-partial">Partial</span>;
      case 'Refunded':
        return <span className="bookings-payment-refunded">Refunded</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bookings-container">
      
      {/* Header Section */}
      <div className="bookings-header-row">
        <div>
          <h1 className="bookings-main-title">Bookings</h1>
          <p className="bookings-breadcrumb">
            Dashboard <span className="bookings-breadcrumb-separator">›</span> Bookings
          </p>
        </div>
        <button className="bookings-export-btn">
          <FiDownload size={16} />
          <span>Export Report</span>
        </button>
      </div>

      {/* Analytics Metric Cards Grid */}
      <div className="bookings-metrics-grid">
        <div className="bookings-metric-card">
          <div className="bookings-metric-card-header">
            <span className="bookings-metric-label">Total Bookings</span>
            <div className="bookings-metric-icon-box bookings-bg-blue">
              <FiCalendar size={18} />
            </div>
          </div>
          <div>
            <h2 className="bookings-metric-value">{bookingsData.length}</h2>
            <p className="bookings-metric-trend-green">↑ 20.0% from last month</p>
          </div>
        </div>

        <div className="bookings-metric-card">
          <div className="bookings-metric-card-header">
            <span className="bookings-metric-label">Confirmed</span>
            <div className="bookings-metric-icon-box bookings-bg-emerald">
              <FiCheckCircle size={18} />
            </div>
          </div>
          <div>
            <h2 className="bookings-metric-value">{bookingsData.filter(i => i.status === 'Confirmed').length}</h2>
            <p className="bookings-metric-trend-green">↑ 15.8% from last month</p>
          </div>
        </div>

        <div className="bookings-metric-card">
          <div className="bookings-metric-card-header">
            <span className="bookings-metric-label">Pending</span>
            <div className="bookings-metric-icon-box bookings-bg-amber">
              <FiClock size={18} />
            </div>
          </div>
          <div>
            <h2 className="bookings-metric-value">{bookingsData.filter(i => i.status === 'Pending').length}</h2>
            <p className="bookings-metric-trend-green">↑ 12.5% from last month</p>
          </div>
        </div>

        <div className="bookings-metric-card">
          <div className="bookings-metric-card-header">
            <span className="bookings-metric-label">Cancelled</span>
            <div className="bookings-metric-icon-box bookings-bg-rose">
              <FiXCircle size={18} />
            </div>
          </div>
          <div>
            <h2 className="bookings-metric-value">{bookingsData.filter(i => i.status === 'Cancelled').length}</h2>
            <p className="bookings-metric-trend-rose">↓ 5.1% from last month</p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar Panel */}
      <div className="bookings-filter-bar">
        <div className="bookings-filter-inputs-group">
          <div className="bookings-search-wrapper">
            <span className="bookings-search-icon"><FiSearch /></span>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              placeholder="Search by booking ID, client or property..." 
              className="bookings-search-input"
            />
          </div>

          <div className="bookings-select-wrapper">
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="bookings-select-input"
            >
              <option>All Status</option>
              <option>Confirmed</option>
              <option>Pending</option>
              <option>Cancelled</option>
            </select>
            <span className="bookings-select-arrow"><FiChevronDown size={12} /></span>
          </div>

          <div className="bookings-select-wrapper">
            <select
              value={propertyFilter}
              onChange={(e) => { setPropertyFilter(e.target.value); setCurrentPage(1); }}
              className="bookings-select-input"
            >
              <option>All Properties</option>
              {Array.from(new Set(bookingsData.map(item => item.propertyName))).map((prop, idx) => (
                <option key={idx} value={prop}>{prop}</option>
              ))}
            </select>
            <span className="bookings-select-arrow"><FiChevronDown size={12} /></span>
          </div>

          <div className="bookings-select-wrapper">
            <input 
              type="text"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              placeholder="Select Date Range"
              className="bookings-select-input"
            />
            <span className="bookings-select-arrow"><FiCalendar size={12} /></span>
          </div>
        </div>

        <button onClick={clearFilters} className="bookings-clear-btn">
          <FiRotateCcw size={12} />
          <span>Clear Filters</span>
        </button>
      </div>

      {/* Main Content Layout */}
      <div className={`bookings-content-layout ${selectedBooking ? 'has-sidebar' : ''}`}>
        
        {/* Booking List Container */}
        <div className="bookings-table-container">
          <div className="bookings-table-header-section">
            <h3 className="bookings-table-title">Bookings List</h3>
            <span className="bookings-table-count">{filteredBookings.length} Bookings Found</span>
          </div>

          <div className="bookings-table-responsive">
            <table className="bookings-table">
              <thead>
                <tr className="bookings-tr-head">
                  <th className="bookings-th">Booking ID</th>
                  <th className="bookings-th">Property</th>
                  <th className="bookings-th">Client</th>
                  <th className="bookings-th">Booking Date</th>
                  <th className="bookings-th">Amount</th>
                  <th className="bookings-th">Status</th>
                  <th className="bookings-th">Payment Status</th>
                  <th className="bookings-th bookings-text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentBookings.length > 0 ? (
                  currentBookings.map((item, index) => (
                    <tr key={index} className="bookings-tr-body">
                      <td className="bookings-td bookings-font-semibold bookings-dark-text">{item.id}</td>
                      <td className="bookings-td">
                        <div className="bookings-flex-center">
                          <img src={item.propertyImage} alt={item.propertyName} className="bookings-table-thumb" />
                          <div>
                            <p className="bookings-prop-name-text">{item.propertyName}</p>
                            <p className="bookings-prop-location-text">{item.location}</p>
                          </div>
                        </div>
                      </td>
                      <td className="bookings-td">
                        <div className="bookings-flex-center">
                          <div className="bookings-avatar">{item.clientInitials}</div>
                          <div>
                            <p className="bookings-client-name-text">{item.clientName}</p>
                            <p className="bookings-client-phone-text">{item.clientPhone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="bookings-td bookings-gray-text">{item.bookingDate}</td>
                      <td className="bookings-td bookings-font-semibold bookings-dark-text">{item.amount}</td>
                      <td className="bookings-td">{getStatusBadge(item.status)}</td>
                      <td className="bookings-td">{getPaymentBadge(item.paymentStatus)}</td>
                      <td className="bookings-td bookings-text-center">
                        <div className="bookings-action-buttons-group">
                          <button 
                            onClick={() => setSelectedBooking(selectedBooking?.id === item.id ? null : item)}
                            className={`bookings-action-btn ${selectedBooking?.id === item.id ? 'active' : ''}`}
                            title="View Property Details"
                          >
                            <FiEye size={14} />
                          </button>

                          {/* 3-Dots Action Dropdown Menu */}
                          <div className="bookings-dropdown-container">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveDropdownId(activeDropdownId === item.id ? null : item.id);
                              }}
                              className={`bookings-action-btn ${activeDropdownId === item.id ? 'active' : ''}`}
                              title="Change Status"
                            >
                              <FiMoreVertical size={14} />
                            </button>

                            {activeDropdownId === item.id && (
                              <div className="bookings-status-dropdown-menu">
                                <div className="bookings-dropdown-header">Change Status</div>
                                <button 
                                  onClick={() => handleStatusChange(item.id, 'Confirmed')}
                                  className="bookings-dropdown-item bookings-dropdown-confirmed"
                                >
                                  <span className="bookings-dot-confirmed"></span> Confirmed
                                </button>
                                <button 
                                  onClick={() => handleStatusChange(item.id, 'Pending')}
                                  className="bookings-dropdown-item bookings-dropdown-pending"
                                >
                                  <span className="bookings-dot-pending"></span> Pending
                                </button>
                                <button 
                                  onClick={() => handleStatusChange(item.id, 'Cancelled')}
                                  className="bookings-dropdown-item bookings-dropdown-cancelled"
                                >
                                  <span className="bookings-dot-cancelled"></span> Cancelled
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
                    <td colSpan="8" className="bookings-no-data-row">
                      No bookings found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="bookings-pagination-footer">
            <span className="bookings-pagination-info">
              Showing {filteredBookings.length > 0 ? indexOfFirstRow + 1 : 0} to {Math.min(indexOfLastRow, filteredBookings.length)} of {filteredBookings.length} bookings
            </span>
            <div className="bookings-pagination-controls">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={`bookings-page-btn ${currentPage === 1 ? 'disabled' : ''}`}
                disabled={currentPage === 1}
              >
                <FiChevronLeft size={14} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`bookings-page-number-btn ${currentPage === page ? 'active' : ''}`}
                >
                  {page}
                </button>
              ))}

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={`bookings-page-btn ${currentPage === totalPages || totalPages === 0 ? 'disabled' : ''}`}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                <FiChevronRight size={14} />
              </button>

              <div className="bookings-select-wrapper bookings-rows-select-wrap">
                <select
                  value={rowsPerPage}
                  onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                  className="bookings-rows-per-page-select"
                >
                  <option value={9}>9 / page</option>
                  <option value={15}>15 / page</option>
                  <option value={30}>30 / page</option>
                </select>
                <span className="bookings-select-arrow bookings-small-arrow"><FiChevronDown size={10} /></span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Property Details Sidebar */}
        {selectedBooking && (
          <div className="bookings-sidebar">
            <div className="bookings-sidebar-header">
              <h3 className="bookings-sidebar-title">Property & Booking Details</h3>
              <button 
                onClick={() => setSelectedBooking(null)}
                className="bookings-sidebar-close-btn"
              >
                <FiX size={14} />
              </button>
            </div>

            <div className="bookings-sidebar-body">
              <div className="bookings-sidebar-img-wrapper">
                <img 
                  src={selectedBooking.propertyImage} 
                  alt={selectedBooking.propertyName} 
                  className="bookings-sidebar-image" 
                />
                <div className="bookings-sidebar-status-badge">
                  {getStatusBadge(selectedBooking.status)}
                </div>
              </div>

              <div>
                <span className="bookings-sidebar-booking-id-badge">
                  {selectedBooking.id}
                </span>
                <h4 className="bookings-sidebar-prop-title">{selectedBooking.propertyName}</h4>
                <p className="bookings-sidebar-location">{selectedBooking.location}</p>
              </div>

              <p className="bookings-sidebar-description">
                {selectedBooking.description}
              </p>

              <div className="bookings-sidebar-grid">
                <div className="bookings-sidebar-card">
                  <span className="bookings-sidebar-card-label">Booking Date</span>
                  <span className="bookings-sidebar-card-val">{selectedBooking.bookingDate}</span>
                </div>
                <div className="bookings-sidebar-card">
                  <span className="bookings-sidebar-card-label">Total Amount</span>
                  <span className="bookings-sidebar-card-val bookings-text-emerald">{selectedBooking.amount}</span>
                </div>
              </div>

              <div className="bookings-sidebar-card">
                <span className="bookings-sidebar-card-label bookings-mb-4">Client Contact Info</span>
                <div className="bookings-flex-between">
                  <span className="bookings-client-bold">{selectedBooking.clientName}</span>
                  <span className="bookings-client-phone-info">{selectedBooking.clientPhone}</span>
                </div>
              </div>

              <div>
                <span className="bookings-amenities-heading">Key Amenities</span>
                <div className="bookings-amenities-wrap">
                  {selectedBooking.amenities.map((amenity, idx) => (
                    <span key={idx} className="bookings-amenity-tag">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bookings-pt-8">
                <button 
                  onClick={() => setSelectedBooking(null)}
                  className="bookings-close-details-btn"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Bookings;