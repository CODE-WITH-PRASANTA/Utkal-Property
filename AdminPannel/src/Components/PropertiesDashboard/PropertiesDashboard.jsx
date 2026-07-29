import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiSearch, FiFilter, FiRefreshCw, FiEye, FiEdit3, FiMoreVertical, 
  FiChevronLeft, FiChevronRight, FiPlus, FiHome, FiCheckCircle, 
  FiClock, FiTag, FiEye as FiView, FiMessageSquare, FiMapPin, FiCalendar 
} from 'react-icons/fi';
import './PropertiesDashboard.css';

export default function PropertiesDashboard() {
  const navigate = useNavigate();

  // Master pool of dummy data categorized by page
  const propertyPagesData = {
    1: [
      {
        id: 1,
        name: "Rudransh South Kingdom",
        featured: true,
        location: "6PM9+7GX, Infosys Rd, Chandiheta...",
        rera: "RERA: PS/19/2026/01475",
        type: "Luxury Villa",
        subType: "G+2",
        category: "Villa",
        price: "₹ 1.86 Cr - ₹ 1.99 Cr",
        pricePerSqft: "₹ 6,350 / Sqft",
        status: "Active",
        statusType: "For Sale",
        addedDate: "20 May 2025",
        addedTime: "10:30 AM",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=300&q=80",
        showDetails: false,
        menuOpen: false
      },
      {
        id: 2,
        name: "Modern White Villa",
        featured: false,
        location: "58 Hullbrook Road, Billesley, B13 OLA",
        rera: "RERA: PS/18/2026/01412",
        type: "Villa",
        subType: "G+1",
        category: "Villa",
        price: "₹ 75.00 Lac",
        pricePerSqft: "₹ 4,500 / Sqft",
        status: "Active",
        statusType: "For Sale",
        addedDate: "18 May 2025",
        addedTime: "04:15 PM",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80",
        showDetails: false,
        menuOpen: false
      },
      {
        id: 3,
        name: "Suburban Stone House",
        featured: false,
        location: "24 Green Avenue, Oxford, OX1 2JD",
        rera: "RERA: PS/17/2026/01398",
        type: "Independent House",
        subType: "G+1",
        category: "Independent House",
        price: "₹ 82.00 Lac",
        pricePerSqft: "₹ 5,000 / Sqft",
        status: "Under Construction",
        statusType: "For Sale",
        addedDate: "17 May 2025",
        addedTime: "11:20 AM",
        image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=300&q=80",
        showDetails: false,
        menuOpen: false
      },
      {
        id: 4,
        name: "Minimalist Cubical Home",
        featured: false,
        location: "102 Sunset Boulevard, Bristol, BS1 5TY",
        rera: "RERA: PS/17/2026/01375",
        type: "Villa",
        subType: "G+1",
        category: "Villa",
        price: "₹ 68.00 Lac",
        pricePerSqft: "₹ 6,100 / Sqft",
        status: "Active",
        statusType: "For Sale",
        addedDate: "15 May 2025",
        addedTime: "02:45 PM",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=300&q=80",
        showDetails: false,
        menuOpen: false
      },
      {
        id: 5,
        name: "Tropical Coastal Estate",
        featured: false,
        location: "15 Ocean View Road, Brighton, BN1 3PA",
        rera: "RERA: PS/16/2026/01322",
        type: "Villa",
        subType: "G+2",
        category: "Villa",
        price: "₹ 94.00 Lac",
        pricePerSqft: "₹ 5,875 / Sqft",
        status: "Sold",
        statusType: "Sold Out",
        addedDate: "10 May 2025",
        addedTime: "09:30 AM",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=300&q=80",
        showDetails: false,
        menuOpen: false
      }
    ],
    2: [
      {
        id: 6,
        name: "Emerald Skyline Penthouse",
        featured: true,
        location: "44 Grand Avenue, Downtown, London",
        rera: "RERA: PS/20/2026/02111",
        type: "Penthouse",
        subType: "G+3",
        category: "Apartment",
        price: "₹ 3.50 Cr",
        pricePerSqft: "₹ 9,200 / Sqft",
        status: "Active",
        statusType: "For Sale",
        addedDate: "22 May 2025",
        addedTime: "01:00 PM",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=300&q=80",
        showDetails: false,
        menuOpen: false
      },
      {
        id: 7,
        name: "Azure Riverside Retreat",
        featured: false,
        location: "12 Riverbank Lane, Cambridge",
        rera: "RERA: PS/21/2026/03421",
        type: "Independent House",
        subType: "G+1",
        category: "Independent House",
        price: "₹ 1.25 Cr",
        pricePerSqft: "₹ 5,400 / Sqft",
        status: "Under Construction",
        statusType: "For Sale",
        addedDate: "21 May 2025",
        addedTime: "11:00 AM",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=300&q=80",
        showDetails: false,
        menuOpen: false
      }
    ],
    3: [
      {
        id: 8,
        name: "Maple Wood Cottage",
        featured: false,
        location: "98 Forest Trail, Edinburgh",
        rera: "RERA: PS/22/2026/04512",
        type: "Villa",
        subType: "G+1",
        category: "Villa",
        price: "₹ 95.00 Lac",
        pricePerSqft: "₹ 4,800 / Sqft",
        status: "Active",
        statusType: "For Sale",
        addedDate: "19 May 2025",
        addedTime: "09:00 AM",
        image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=300&q=80",
        showDetails: false,
        menuOpen: false
      }
    ]
  };

  // State Management
  const [currentPage, setCurrentPage] = useState(1);
  const [properties, setProperties] = useState(propertyPagesData[1]);

  // Filter State Management
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  // Handle Page Change and Swap Dataset
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Load new dummy data for that page if available, otherwise fallback to empty or page 1 data
    const newData = propertyPagesData[pageNumber] || [];
    setProperties(newData);
  };

  const toggleViewDetails = (id) => {
    setProperties(properties.map(prop => {
      if (prop.id === id) {
        return { ...prop, showDetails: !prop.showDetails };
      }
      return prop;
    }));
  };

  const toggleMenu = (id) => {
    setProperties(properties.map(prop => {
      if (prop.id === id) {
        return { ...prop, menuOpen: !prop.menuOpen };
      }
      return { ...prop, menuOpen: false };
    }));
  };

  const updateStatus = (id, newStatus, newStatusType) => {
    setProperties(properties.map(prop => {
      if (prop.id === id) {
        return { ...prop, status: newStatus, statusType: newStatusType, menuOpen: false };
      }
      return prop;
    }));
  };

  const handleEdit = (name) => {
    alert(`Edit property: ${name}`);
  };

  // Reset Filters Handler
  const handleReset = () => {
    setSearchTerm('');
    setSelectedStatus('All');
    setSelectedCategory('All');
    setSelectedType('All');
    setSelectedLocation('All');
  };

  // Filter Logic Implementation
  const filteredProperties = properties.filter(prop => {
    const matchesSearch = prop.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          prop.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || prop.status === selectedStatus;
    const matchesCategory = selectedCategory === 'All' || prop.category === selectedCategory;
    const matchesType = selectedType === 'All' || prop.type === selectedType;
    const matchesLocation = selectedLocation === 'All' || prop.location.includes(selectedLocation);

    return matchesSearch && matchesStatus && matchesCategory && matchesType && matchesLocation;
  });

  return (
    <div className="properties-dashboard">
      {/* Top Header */}
      <header className="dashboard-header">
        <div className="header-title-area">
          <h1>Properties</h1>
          <div className="breadcrumb">
            Dashboard <span>&gt;</span> Properties <span>&gt;</span> All Properties
          </div>
        </div>
        <button className="add-property-btn" onClick={() => navigate('/NewProperties')}>
          <FiPlus /> Add New Property
        </button>
      </header>

      {/* Metrics Cards - 2 rows of 3 columns */}
      <section className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon orange"><FiHome /></div>
          <div className="metric-content">
            <span className="metric-label">Total Properties</span>
            <h2 className="metric-value">156</h2>
            <span className="metric-sub">All Listed Properties</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon green"><FiCheckCircle /></div>
          <div className="metric-content">
            <span className="metric-label">Active Properties</span>
            <h2 className="metric-value">142</h2>
            <span className="metric-sub">Currently Active</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon blue"><FiClock /></div>
          <div className="metric-content">
            <span className="metric-label">Under Construction</span>
            <h2 className="metric-value">14</h2>
            <span className="metric-sub">In Progress</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon red"><FiTag /></div>
          <div className="metric-content">
            <span className="metric-label">Sold / Booked</span>
            <h2 className="metric-value">26</h2>
            <span className="metric-sub">Successfully Sold</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon light-blue"><FiView /></div>
          <div className="metric-content">
            <span className="metric-label">Total Views</span>
            <h2 className="metric-value">12,458</h2>
            <span className="metric-sub">All Properties</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon purple"><FiMessageSquare /></div>
          <div className="metric-content">
            <span className="metric-label">Enquiries</span>
            <h2 className="metric-value">1,245</h2>
            <span className="metric-sub">Total Enquiries</span>
          </div>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="filters-bar">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by property name, location..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-dropdowns">
          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Under Construction">Under Construction</option>
            <option value="Sold">Sold</option>
          </select>

          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Villa">Villa</option>
            <option value="Independent House">Independent House</option>
          </select>

          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            <option value="All">All Types</option>
            <option value="Luxury Villa">Luxury Villa</option>
            <option value="Villa">Villa</option>
            <option value="Independent House">Independent House</option>
          </select>

          <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
            <option value="All">All Locations</option>
            <option value="Infosys Rd">Infosys Rd</option>
            <option value="Billesley">Billesley</option>
            <option value="Oxford">Oxford</option>
            <option value="Bristol">Bristol</option>
            <option value="Brighton">Brighton</option>
          </select>

          <button className="filter-btn"><FiFilter /> More Filters</button>
          <button className="reset-btn" onClick={handleReset}><FiRefreshCw /> Reset</button>
        </div>
      </section>

      {/* Properties Table */}
      <section className="properties-table-container">
        <table className="properties-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Location</th>
              <th>Type</th>
              <th>Status</th>
              <th>Added On</th>
              <th className="actions-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProperties.length > 0 ? (
              filteredProperties.map((prop) => (
                <React.Fragment key={prop.id}>
                  <tr className="property-row">
                    <td className="property-cell">
                      <img src={prop.image} alt={prop.name} className="property-thumb" />
                      <div className="property-info">
                        <div className="title-line">
                          <strong>{prop.name}</strong>
                          {prop.featured && <span className="badge-featured">Featured</span>}
                        </div>
                        <span className="prop-address"><FiMapPin size={12}/> {prop.location}</span>
                        <span className="prop-rera">{prop.rera}</span>
                      </div>
                    </td>
                    <td>
                      <div className="location-cell">
                        <strong>{prop.type}</strong>
                        <span>{prop.subType}</span>
                      </div>
                    </td>
                    <td>
                      <div className="price-cell">
                        <strong>{prop.price}</strong>
                        <span>{prop.pricePerSqft}</span>
                      </div>
                    </td>
                    <td>
                      <div className="status-cell">
                        <span className={`status-badge ${prop.status.toLowerCase().replace(' ', '-')}`}>
                          {prop.status}
                        </span>
                        <span className="status-sub">{prop.statusType}</span>
                      </div>
                    </td>
                    <td>
                      <div className="date-cell">
                        <span><FiCalendar size={12}/> {prop.addedDate}</span>
                        <span className="time-sub">{prop.addedTime}</span>
                      </div>
                    </td>
                    <td className="actions-cell">
                      <button className="action-icon-btn" title="View Details" onClick={() => toggleViewDetails(prop.id)}>
                        <FiEye />
                      </button>
                      <button className="action-icon-btn" title="Edit" onClick={() => handleEdit(prop.name)}>
                        <FiEdit3 />
                      </button>
                      <div className="dropdown-wrapper">
                        <button className="action-icon-btn" title="Options" onClick={() => toggleMenu(prop.id)}>
                          <FiMoreVertical />
                        </button>
                        {prop.menuOpen && (
                          <div className="status-popup-menu">
                            <button onClick={() => updateStatus(prop.id, 'Active', 'For Sale')}>Active</button>
                            <button onClick={() => updateStatus(prop.id, 'Under Construction', 'For Sale')}>Under Construction</button>
                            <button onClick={() => updateStatus(prop.id, 'Sold', 'Sold Out')}>Sold</button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                  {prop.showDetails && (
                    <tr className="details-drawer">
                      <td colSpan="6">
                        <div className="drawer-content">
                          <h4>Property Quick Overview</h4>
                          <p><strong>Name:</strong> {prop.name}</p>
                          <p><strong>Full Address:</strong> {prop.location}</p>
                          <p><strong>RERA ID:</strong> {prop.rera}</p>
                          <p><strong>Pricing:</strong> {prop.price} ({prop.pricePerSqft})</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '24px', color: '#718096' }}>
                  No properties found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination-container">
          <span className="pagination-info">Showing page {currentPage} of 16 entries</span>
          <div className="pagination-controls">
            <button 
              className="page-btn" 
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            >
              <FiChevronLeft />
            </button>
            <button className={`page-btn ${currentPage === 1 ? 'active' : ''}`} onClick={() => handlePageChange(1)}>1</button>
            <button className={`page-btn ${currentPage === 2 ? 'active' : ''}`} onClick={() => handlePageChange(2)}>2</button>
            <button className={`page-btn ${currentPage === 3 ? 'active' : ''}`} onClick={() => handlePageChange(3)}>3</button>
            <span className="page-dots">...</span>
            <button className={`page-btn ${currentPage === 16 ? 'active' : ''}`} onClick={() => handlePageChange(16)}>16</button>
            <button 
              className="page-btn" 
              onClick={() => handlePageChange(Math.min(currentPage + 1, 16))}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </section>

      {/* Bottom Analytics Section */}
      <section className="analytics-grid">
        <div className="analytics-card">
          <h3>Top Locations</h3>
          <div className="location-item">
            <div className="loc-info"><span>Infosys Road</span><span>45 Properties</span></div>
            <div className="progress-bar"><div className="fill" style={{width: '85%'}}></div></div>
          </div>
          <div className="location-item">
            <div className="loc-info"><span>Chandaka</span><span>38 Properties</span></div>
            <div className="progress-bar"><div className="fill" style={{width: '70%'}}></div></div>
          </div>
          <div className="location-item">
            <div className="loc-info"><span>Patia</span><span>28 Properties</span></div>
            <div className="progress-bar"><div className="fill" style={{width: '50%'}}></div></div>
          </div>
        </div>

        <div className="analytics-card">
          <h3>Property Types</h3>
          <div className="pie-chart-container">
            <div className="fake-donut-chart"></div>
            <div className="chart-legend">
              <div><span className="dot villa"></span> Villas <strong>78 (50%)</strong></div>
              <div><span className="dot ind"></span> Independent House <strong>46 (29%)</strong></div>
              <div><span className="dot apt"></span> Apartment <strong>22 (14%)</strong></div>
              <div><span className="dot plot"></span> Plots <strong>10 (7%)</strong></div>
            </div>
          </div>
        </div>

        <div className="analytics-card">
          <h3>Price Range</h3>
          <div className="price-range-item">
            <div className="loc-info"><span>Below ₹ 50 Lac</span><span>28 Properties</span></div>
            <div className="progress-bar orange"><div className="fill" style={{width: '40%'}}></div></div>
          </div>
          <div className="price-range-item">
            <div className="loc-info"><span>₹ 50 Lac - ₹ 1 Cr</span><span>65 Properties</span></div>
            <div className="progress-bar orange"><div className="fill" style={{width: '90%'}}></div></div>
          </div>
          <div className="price-range-item">
            <div className="loc-info"><span>₹ 1 Cr - ₹ 2 Cr</span><span>42 Properties</span></div>
            <div className="progress-bar orange"><div className="fill" style={{width: '60%'}}></div></div>
          </div>
          <div className="price-range-item">
            <div className="loc-info"><span>Above ₹ 2 Cr</span><span>21 Properties</span></div>
            <div className="progress-bar orange"><div className="fill" style={{width: '30%'}}></div></div>
          </div>
        </div>

        <div className="analytics-card">
          <h3>Recent Enquiries</h3>
          <div className="enquiry-item">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Ravi" />
            <div className="enquiry-details">
              <strong>Ravi Sharma</strong>
              <p>Interested in Modern White Villa</p>
            </div>
            <span className="time-ago">2 min ago</span>
          </div>
          <div className="enquiry-item">
            <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80" alt="Sneha" />
            <div className="enquiry-details">
              <strong>Sneha Priya</strong>
              <p>Interested in Rudransh South Kingdom</p>
            </div>
            <span className="time-ago">15 min ago</span>
          </div>
          <div className="enquiry-item">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Amit" />
            <div className="enquiry-details">
              <strong>Amit Kumar</strong>
              <p>Interested in Suburban Stone House</p>
            </div>
            <span className="time-ago">1 hour ago</span>
          </div>
        </div>
      </section>
    </div>
  );
}