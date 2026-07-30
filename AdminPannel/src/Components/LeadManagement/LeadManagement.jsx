import React, { useState } from 'react';
import './LeadManagement.css';
import {
  FiUsers,
  FiUserPlus,
  FiClock,
  FiMapPin,
  FiCheckCircle,
  FiXCircle,
  FiCalendar,
  FiSliders,
  FiPlus,
  FiDownload,
  FiGrid,
  FiColumns,
  FiSettings,
  FiPhone,
  FiMessageSquare,
  FiMoreVertical,
  FiMoreHorizontal,
  FiX,
  FiMail,
  FiGlobe,
  FiInstagram,
  FiShare2,
  FiUser,
  FiMinimize2,
  FiSearch,
  FiBell,
  FiChevronDown,
  FiMenu,
  FiActivity,
  FiFileText,
  FiFolder,
  FiChevronRight,
  FiArrowLeft
} from 'react-icons/fi';
import { FaFacebook, FaGoogle } from 'react-icons/fa';

const initialLeads = [
  {
    id: 'LD00141',
    name: 'Akash Kumar Roul',
    avatar: 'AK',
    avatarColor: '#e0e7ff',
    textColor: '#3730a3',
    phone: '07205303511',
    email: 'roulakashkumar2003@gmail.com',
    location: 'Bhubaneswar, Odisha',
    interestedIn: '3BHK Apartment',
    project: 'Sunshine Residency',
    budget: '₹80 Lakh',
    budgetRange: '80 - 90 L',
    source: 'Website',
    sourceIcon: 'website',
    agent: 'Aman Verma',
    agentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
    status: 'New',
    statusClass: 'status-new',
    followUp: 'Today 12:00 PM',
    followUpClass: 'followup-today',
    score: 85,
    priority: 'High',
    createdOn: '20 May, 2025 10:30 AM'
  },
  {
    id: 'LD00125',
    name: 'Rahul Sharma',
    avatar: 'RS',
    avatarColor: '#e0e7ff',
    textColor: '#3730a3',
    phone: '9876543210',
    email: 'rahul@gmail.com',
    location: 'Bhubaneswar, Odisha',
    interestedIn: '3BHK Apartment',
    project: 'Sunshine Residency',
    budget: '₹80 Lakh',
    budgetRange: '80 - 90 L',
    source: 'Facebook',
    sourceIcon: 'facebook',
    agent: 'Aman Verma',
    agentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
    status: 'New',
    statusClass: 'status-new',
    followUp: 'Today 11:30 AM',
    followUpClass: 'followup-today',
    score: 85,
    priority: 'High',
    createdOn: '20 May, 2025 10:30 AM'
  },
  {
    id: 'LD00124',
    name: 'Priya Das',
    avatar: 'PD',
    avatarColor: '#e0f2fe',
    textColor: '#075985',
    phone: '9988776655',
    email: 'priya.das@gmail.com',
    location: 'Cuttack, Odisha',
    interestedIn: '4BHK Villa',
    project: 'Green Meadows',
    budget: '₹1.5 Cr',
    budgetRange: '1.2 - 1.6 Cr',
    source: 'Website',
    sourceIcon: 'website',
    agent: 'Rohit Singh',
    agentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
    status: 'Follow Up',
    statusClass: 'status-followup',
    followUp: 'Tomorrow 10:00 AM',
    followUpClass: 'followup-tomorrow',
    score: 90,
    priority: 'Medium',
    createdOn: '19 May, 2025 04:15 PM'
  },
  {
    id: 'LD00123',
    name: 'Ajay Kumar',
    avatar: 'AK',
    avatarColor: '#ccfbf1',
    textColor: '#115e59',
    phone: '9123456789',
    email: 'ajaykumar@gmail.com',
    location: 'Bhubaneswar, Odisha',
    interestedIn: 'Commercial Space',
    project: 'Business Hub',
    budget: '₹2 Cr',
    budgetRange: '1.8 - 2.2 Cr',
    source: 'Google Ads',
    sourceIcon: 'google',
    agent: 'Ankit Patel',
    agentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
    status: 'Site Visit',
    statusClass: 'status-sitevisit',
    followUp: '23 May, 2025 03:00 PM',
    followUpClass: 'followup-date',
    score: 78,
    priority: 'High',
    createdOn: '18 May, 2025 02:20 PM'
  },
  {
    id: 'LD00122',
    name: 'Sneha Mehta',
    avatar: 'SM',
    avatarColor: '#fce7f3',
    textColor: '#9d174d',
    phone: '9090909090',
    email: 'sneha.mehta@gmail.com',
    location: 'Rourkela, Odisha',
    interestedIn: '2BHK Apartment',
    project: 'River View Enclave',
    budget: '₹60 Lakh',
    budgetRange: '50 - 65 L',
    source: 'Instagram',
    sourceIcon: 'instagram',
    agent: 'Neha Joshi',
    agentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
    status: 'Converted',
    statusClass: 'status-converted',
    followUp: 'Completed',
    followUpClass: 'followup-date',
    score: 92,
    priority: 'Low',
    createdOn: '17 May, 2025 11:00 AM'
  },
  {
    id: 'LD00121',
    name: 'Vikram Patel',
    avatar: 'VP',
    avatarColor: '#ede9fe',
    textColor: '#5b21b6',
    phone: '8765432109',
    email: 'vikram.patel@gmail.com',
    location: 'Puri, Odisha',
    interestedIn: '3BHK Apartment',
    project: 'Skyline Heights',
    budget: '₹90 Lakh',
    budgetRange: '85 - 95 L',
    source: 'Referral',
    sourceIcon: 'referral',
    agent: 'Aman Verma',
    agentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
    status: 'Lost Lead',
    statusClass: 'status-lost',
    followUp: 'Closed',
    followUpClass: 'followup-date',
    score: 40,
    priority: 'Low',
    createdOn: '16 May, 2025 09:45 AM'
  }
];

const LeadManagement = () => {
  const [leads, setLeads] = useState(initialLeads);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [activeTab, setActiveTab] = useState('All Leads');
  const [selectedLead, setSelectedLead] = useState(null);
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [activeActionMenu, setActiveActionMenu] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTabDetails, setActiveTabDetails] = useState('Overview');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const [newLeadForm, setNewLeadForm] = useState({
    fullName: '',
    mobile: '',
    email: '',
    source: 'Select source',
    interestedIn: 'Select property',
    budgetRange: 'Select budget range',
    location: '',
    agent: 'Select agent',
    status: 'New',
    priority: 'Medium',
    followUpDate: '',
    notes: ''
  });

  const renderSourceIcon = (iconType) => {
    switch (iconType) {
      case 'facebook': return <FaFacebook style={{ color: '#1877F2' }} />;
      case 'google': return <FaGoogle style={{ color: '#EA4335' }} />;
      case 'instagram': return <FiInstagram style={{ color: '#E4405F' }} />;
      case 'website': return <FiGlobe style={{ color: '#0284C7' }} />;
      case 'referral': return <FiShare2 style={{ color: '#059669' }} />;
      default: return <FiGlobe style={{ color: '#6B7280' }} />;
    }
  };

  // Filter Leads dynamically based on tab choice
  const filteredLeads = leads.filter((item) => {
    if (activeTab === 'All Leads') return true;
    if (activeTab === 'New Leads') return item.status === 'New';
    if (activeTab === 'Follow Ups') return item.status === 'Follow Up';
    if (activeTab === 'Site Visits') return item.status === 'Site Visit';
    if (activeTab === 'Converted') return item.status === 'Converted';
    if (activeTab === 'Lost Leads') return item.status === 'Lost Lead' || item.status === 'Lost';
    return true;
  });

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedLeads(filteredLeads.map((l) => l.id));
    } else {
      setSelectedLeads([]);
    }
  };

  const handleSelectOne = (id) => {
    if (selectedLeads.includes(id)) {
      setSelectedLeads(selectedLeads.filter((item) => item !== id));
    } else {
      setSelectedLeads([...selectedLeads, id]);
    }
  };

  const handleAddLeadSubmit = (e) => {
    e.preventDefault();
    if (!newLeadForm.fullName) return;

    const createdLead = {
      id: `LD00${142 + leads.length}`,
      name: newLeadForm.fullName,
      avatar: newLeadForm.fullName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() || 'LD',
      avatarColor: '#e0e7ff',
      textColor: '#3730a3',
      phone: newLeadForm.mobile || '07205303511',
      email: newLeadForm.email || 'user@gmail.com',
      location: newLeadForm.location || 'Bhubaneswar, Odisha',
      interestedIn: newLeadForm.interestedIn !== 'Select property' ? newLeadForm.interestedIn : '3BHK Apartment',
      project: 'Sunshine Residency',
      budget: '₹80 Lakh',
      budgetRange: newLeadForm.budgetRange !== 'Select budget range' ? newLeadForm.budgetRange : '80 - 90 L',
      source: newLeadForm.source !== 'Select source' ? newLeadForm.source : 'Website',
      sourceIcon: 'website',
      agent: newLeadForm.agent !== 'Select agent' ? newLeadForm.agent : 'Aman Verma',
      agentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
      status: newLeadForm.status,
      statusClass: `status-${newLeadForm.status.toLowerCase().replace(/\s+/g, '')}`,
      followUp: newLeadForm.followUpDate || 'Today 12:00 PM',
      followUpClass: 'followup-today',
      score: 85,
      priority: newLeadForm.priority,
      createdOn: 'Just now'
    };

    setLeads([createdLead, ...leads]);
    setSelectedLead(createdLead);
    setIsAddLeadModalOpen(false);
    setNewLeadForm({
      fullName: '',
      mobile: '',
      email: '',
      source: 'Select source',
      interestedIn: 'Select property',
      budgetRange: 'Select budget range',
      location: '',
      agent: 'Select agent',
      status: 'New',
      priority: 'Medium',
      followUpDate: '',
      notes: ''
    });
  };

  const totalLeads = filteredLeads.length;
  const totalPages = Math.ceil(totalLeads / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstItem, indexOfLastItem);

  const detailsTabs = [
    { key: 'Overview', icon: <FiFileText /> },
    { key: 'Activity', icon: <FiActivity /> },
    { key: 'Notes', icon: <FiFolder /> },
    { key: 'Documents', icon: <FiFileText /> },
    { key: 'More', icon: <FiMoreHorizontal /> }
  ];

  return (
    <div className="leadmanagement-page">
      {/* TOP APP HEADER */}
      <div className="leadmanagement-topbar">
        <div className="leadmanagement-topbar-left">
          <button className="leadmanagement-mobile-menu-btn" aria-label="Menu">
            <FiMenu />
          </button>
          <div>
            <h1 className="leadmanagement-page-title">Leads Management</h1>
            <div className="leadmanagement-breadcrumb">
              <span>Dashboard</span>
              <FiChevronRight size={12} />
              <span>Leads</span>
              <FiChevronRight size={12} />
              <span className="crumb-active">All Leads</span>
            </div>
          </div>
        </div>

        <div className={`leadmanagement-topbar-search ${isMobileSearchOpen ? 'search-open' : ''}`}>
          <FiSearch />
          <input type="text" placeholder="Search leads by name, phone, email..." />
          <span className="leadmanagement-search-kbd">⌘K</span>
        </div>

        <div className="leadmanagement-topbar-right">
          <button
            className="leadmanagement-topbar-icon-btn leadmanagement-mobile-search-btn"
            aria-label="Search"
            onClick={() => setIsMobileSearchOpen((v) => !v)}
          >
            <FiSearch />
          </button>
          <button className="leadmanagement-topbar-add-btn" onClick={() => setIsAddLeadModalOpen(true)} aria-label="Add Lead">
            <FiPlus />
          </button>
          <button className="leadmanagement-topbar-icon-btn">
            <FiBell />
            <span className="leadmanagement-notif-dot">12</span>
          </button>
          <button className="leadmanagement-topbar-icon-btn">
            <FiMail />
            <span className="leadmanagement-notif-dot dot-blue">5</span>
          </button>
          <div className="leadmanagement-topbar-profile">
            <img
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=100"
              alt="Admin User"
              className="leadmanagement-profile-img"
            />
            <div className="leadmanagement-profile-text">
              <span className="leadmanagement-profile-name-sm">Admin User</span>
              <span className="leadmanagement-profile-role">Super Admin</span>
            </div>
            <FiChevronDown className="leadmanagement-profile-caret" />
          </div>
        </div>
      </div>

      <div className="leadmanagement-container">
        {/* STAT CARDS */}
        <div className="leadmanagement-stats-grid">
          <div className="leadmanagement-stat-card">
            <div className="leadmanagement-stat-icon icon-blue"><FiUsers /></div>
            <div className="leadmanagement-stat-content">
              <div className="leadmanagement-stat-title">Total Leads</div>
              <div className="leadmanagement-stat-value-container">
                <span className="leadmanagement-stat-value">2,564</span>
                <span className="leadmanagement-stat-badge badge-green">↑ 15.6%</span>
              </div>
              <div className="leadmanagement-stat-sub">vs last month</div>
            </div>
          </div>

          <div className="leadmanagement-stat-card">
            <div className="leadmanagement-stat-icon icon-orange"><FiUserPlus /></div>
            <div className="leadmanagement-stat-content">
              <div className="leadmanagement-stat-title">New Leads</div>
              <div className="leadmanagement-stat-value-container">
                <span className="leadmanagement-stat-value">128</span>
                <span className="leadmanagement-stat-badge badge-green">↑ 8.3%</span>
              </div>
              <div className="leadmanagement-stat-sub">vs last month</div>
            </div>
          </div>

          <div className="leadmanagement-stat-card">
            <div className="leadmanagement-stat-icon icon-purple"><FiClock /></div>
            <div className="leadmanagement-stat-content">
              <div className="leadmanagement-stat-title">Follow Ups</div>
              <div className="leadmanagement-stat-value-container">
                <span className="leadmanagement-stat-value">56</span>
                <span className="leadmanagement-stat-badge badge-red">↓ 5.2%</span>
              </div>
              <div className="leadmanagement-stat-sub">vs last month</div>
            </div>
          </div>

          <div className="leadmanagement-stat-card">
            <div className="leadmanagement-stat-icon icon-teal"><FiMapPin /></div>
            <div className="leadmanagement-stat-content">
              <div className="leadmanagement-stat-title">Site Visits</div>
              <div className="leadmanagement-stat-value-container">
                <span className="leadmanagement-stat-value">41</span>
                <span className="leadmanagement-stat-badge badge-green">↑ 12.7%</span>
              </div>
              <div className="leadmanagement-stat-sub">vs last month</div>
            </div>
          </div>

          <div className="leadmanagement-stat-card">
            <div className="leadmanagement-stat-icon icon-green"><FiCheckCircle /></div>
            <div className="leadmanagement-stat-content">
              <div className="leadmanagement-stat-title">Converted</div>
              <div className="leadmanagement-stat-value-container">
                <span className="leadmanagement-stat-value">18</span>
                <span className="leadmanagement-stat-badge badge-green">↑ 28.6%</span>
              </div>
              <div className="leadmanagement-stat-sub">vs last month</div>
            </div>
          </div>

          <div className="leadmanagement-stat-card">
            <div className="leadmanagement-stat-icon icon-pink"><FiXCircle /></div>
            <div className="leadmanagement-stat-content">
              <div className="leadmanagement-stat-title">Lost Leads</div>
              <div className="leadmanagement-stat-value-container">
                <span className="leadmanagement-stat-value">22</span>
                <span className="leadmanagement-stat-badge badge-red">↓ 3.6%</span>
              </div>
              <div className="leadmanagement-stat-sub">vs last month</div>
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="leadmanagement-filters-bar">
          <div className={`leadmanagement-filter-inputs ${isMobileFiltersOpen ? 'filters-open' : ''}`}>
            <div className="leadmanagement-date-picker-btn">
              <FiCalendar className="leadmanagement-calendar-icon" />
              <span>01/05/2025 - 31/05/2025</span>
            </div>

            <select className="leadmanagement-select-filter">
              <option>All Status</option>
              <option>New</option>
              <option>Follow Up</option>
              <option>Site Visit</option>
              <option>Converted</option>
            </select>

            <select className="leadmanagement-select-filter">
              <option>All Sources</option>
              <option>Facebook</option>
              <option>Website</option>
              <option>Google Ads</option>
              <option>Instagram</option>
            </select>

            <select className="leadmanagement-select-filter">
              <option>All Agents</option>
              <option>Aman Verma</option>
              <option>Rohit Singh</option>
              <option>Ankit Patel</option>
            </select>

            <select className="leadmanagement-select-filter">
              <option>All Projects</option>
              <option>Sunshine Residency</option>
              <option>Green Meadows</option>
            </select>

            <button className="leadmanagement-more-filters-btn">
              More Filters <FiSliders />
            </button>
          </div>

          <div className="leadmanagement-filter-actions">
            <button
              className="leadmanagement-mobile-filter-toggle"
              onClick={() => setIsMobileFiltersOpen((v) => !v)}
            >
              <FiSliders /> Filters
            </button>
            <button className="leadmanagement-add-lead-btn" onClick={() => setIsAddLeadModalOpen(true)}>
              <FiPlus /> Add Lead
            </button>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="leadmanagement-main-layout">
          <div className={`leadmanagement-left-panel ${selectedLead ? 'panel-split' : 'panel-full'}`}>
            {/* TOP TAB CONTROL BAR */}
            <div className="leadmanagement-tab-header">
              <div className="leadmanagement-status-tabs">
                {['All Leads', 'New Leads', 'Follow Ups', 'Site Visits', 'Converted', 'Lost Leads'].map((tab) => (
                  <button
                    key={tab}
                    className={`leadmanagement-status-tab-btn ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab(tab);
                      setCurrentPage(1);
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="leadmanagement-table-actions-right">
                <button className="leadmanagement-icon-action-btn leadmanagement-export-btn">
                  <FiDownload /> <span className="btn-label">Export</span>
                </button>
                <button className="leadmanagement-icon-action-btn"><FiGrid /></button>
                <button className="leadmanagement-icon-action-btn"><FiSliders /></button>
                <button className="leadmanagement-icon-action-btn"><FiColumns /></button>
                <button className="leadmanagement-icon-action-btn"><FiSettings /></button>
              </div>
            </div>

            {/* TABLE */}
            <div className="leadmanagement-table-wrapper">
              <table className="leadmanagement-table">
                <thead>
                  <tr>
                    <th style={{ width: '38px' }}>
                      <input
                        type="checkbox"
                        className="leadmanagement-checkbox"
                        onChange={handleSelectAll}
                        checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                      />
                    </th>
                    <th>Lead Details</th>
                    <th>Contact</th>
                    <th>Interested In</th>
                    <th>Budget</th>
                    <th>Source</th>
                    <th>Agent</th>
                    <th>Status</th>
                    <th>Follow Up</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentLeads.map((lead) => {
                    const isSelected = selectedLead && selectedLead.id === lead.id;
                    return (
                      <tr
                        key={lead.id}
                        className={`leadmanagement-table-row ${isSelected ? 'row-active' : ''}`}
                        onClick={() => setSelectedLead(lead)}
                      >
                        <td className="cell-checkbox" data-label="" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            className="leadmanagement-checkbox"
                            checked={selectedLeads.includes(lead.id)}
                            onChange={() => handleSelectOne(lead.id)}
                          />
                        </td>
                        <td className="cell-lead-details" data-label="Lead Details">
                          <div className="leadmanagement-lead-cell">
                            <div
                              className="leadmanagement-avatar"
                              style={{ backgroundColor: lead.avatarColor, color: lead.textColor }}
                            >
                              {lead.avatar}
                            </div>
                            <div className="leadmanagement-lead-info">
                              <span className="leadmanagement-lead-name">{lead.name}</span>
                              <span className="leadmanagement-lead-id">{lead.id}</span>
                            </div>
                          </div>
                        </td>
                        <td data-label="Contact">
                          <div className="leadmanagement-contact-cell">
                            <span className="leadmanagement-phone-text">{lead.phone}</span>
                            <span className="leadmanagement-email-text">{lead.email}</span>
                          </div>
                        </td>
                        <td data-label="Interested In">
                          <div className="leadmanagement-interest-cell">
                            <span className="leadmanagement-property-text">{lead.interestedIn}</span>
                            <span className="leadmanagement-project-text">{lead.project}</span>
                          </div>
                        </td>
                        <td data-label="Budget">
                          <div className="leadmanagement-budget-cell">
                            <span className="leadmanagement-budget-main">{lead.budget}</span>
                            <span className="leadmanagement-budget-range">{lead.budgetRange}</span>
                          </div>
                        </td>
                        <td data-label="Source">
                          <div className="leadmanagement-source-cell">
                            <span className="leadmanagement-source-icon-wrap">{renderSourceIcon(lead.sourceIcon)}</span>
                            <span>{lead.source}</span>
                          </div>
                        </td>
                        <td data-label="Agent">
                          <div className="leadmanagement-agent-cell">
                            <img src={lead.agentAvatar} alt={lead.agent} className="leadmanagement-agent-img" />
                            <span>{lead.agent}</span>
                          </div>
                        </td>
                        <td data-label="Status">
                          <span className={`leadmanagement-status-badge ${lead.statusClass}`}>
                            {lead.status}
                          </span>
                        </td>
                        <td data-label="Follow Up">
                          <div className={`leadmanagement-followup-text ${lead.followUpClass}`}>
                            {lead.followUp}
                          </div>
                        </td>
                        <td className="cell-actions" data-label="Actions" onClick={(e) => e.stopPropagation()}>
                          <div className="leadmanagement-actions-cell">
                            <button className="leadmanagement-action-btn icon-call" onClick={() => window.open(`tel:${lead.phone}`)}>
                              <FiPhone />
                            </button>
                            <button className="leadmanagement-action-btn icon-chat" onClick={() => window.open(`https://wa.me/${lead.phone}`)}>
                              <FiMessageSquare />
                            </button>
                            <div className="leadmanagement-more-popover-container">
                              <button
                                className="leadmanagement-action-btn icon-more"
                                onClick={() => setActiveActionMenu(activeActionMenu === lead.id ? null : lead.id)}
                              >
                                <FiMoreVertical />
                              </button>

                              {activeActionMenu === lead.id && (
                                <div className="leadmanagement-action-dropdown">
                                  <button onClick={() => { window.open(`tel:${lead.phone}`); setActiveActionMenu(null); }}>
                                    <FiPhone /> Call Lead
                                  </button>
                                  <button onClick={() => { window.open(`https://wa.me/${lead.phone}`); setActiveActionMenu(null); }}>
                                    <FiMessageSquare /> WhatsApp
                                  </button>
                                  <button onClick={() => { window.open(`mailto:${lead.email}`); setActiveActionMenu(null); }}>
                                    <FiMail /> Send Email
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="leadmanagement-pagination-footer">
              <div className="leadmanagement-showing-text">
                Showing {totalLeads === 0 ? 0 : indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalLeads)} of {totalLeads} leads
              </div>

              <div className="leadmanagement-pagination-controls">
                <button
                  className="leadmanagement-page-nav-btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  &lt;
                </button>

                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    className={`leadmanagement-page-num ${currentPage === idx + 1 ? 'active' : ''}`}
                    onClick={() => setCurrentPage(idx + 1)}
                  >
                    {idx + 1}
                  </button>
                ))}

                <button
                  className="leadmanagement-page-nav-btn"
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  &gt;
                </button>

                <select
                  className="leadmanagement-page-size-select"
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={5}>5 page</option>
                  <option value={10}>10 page</option>
                  <option value={15}>15 page</option>
                  <option value={25}>25 page</option>
                </select>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL - LEAD DETAILS SIDEBAR */}
          {selectedLead && (
            <>
              <div className="leadmanagement-panel-backdrop" onClick={() => setSelectedLead(null)} />
              <div className="leadmanagement-right-panel open-anim">
                <div className="leadmanagement-details-header">
                  <button className="leadmanagement-mobile-back-btn" onClick={() => setSelectedLead(null)}>
                    <FiArrowLeft />
                  </button>
                  <h3 className="leadmanagement-details-title">Lead Details</h3>
                  <div className="leadmanagement-details-header-actions">
                    <button className="leadmanagement-close-btn" onClick={() => setSelectedLead(null)}>
                      <FiMinimize2 style={{ marginRight: '6px' }} className="desktop-only" />
                      <FiX />
                    </button>
                  </div>
                </div>

                <div className="leadmanagement-details-content">
                  {/* PROFILE SUMMARY BAR */}
                  <div className="leadmanagement-profile-summary">
                    <div
                      className="leadmanagement-avatar-large"
                      style={{ backgroundColor: selectedLead.avatarColor, color: selectedLead.textColor }}
                    >
                      {selectedLead.avatar}
                    </div>
                    <div className="leadmanagement-profile-main-info">
                      <div className="leadmanagement-name-status-row">
                        <span className="leadmanagement-profile-name">{selectedLead.name}</span>
                        <span className={`leadmanagement-mini-badge ${selectedLead.statusClass}`}>{selectedLead.status}</span>
                      </div>
                      <div className="leadmanagement-id-score-row">
                        <span className="leadmanagement-profile-id">Lead ID: {selectedLead.id}</span>
                        <span className="leadmanagement-score-badge">Score: {selectedLead.score}</span>
                      </div>
                    </div>
                  </div>

                  {/* TABS */}
                  <div className="leadmanagement-details-tabs">
                    {detailsTabs.map(({ key, icon }) => (
                      <button
                        key={key}
                        className={`leadmanagement-details-tab ${activeTabDetails === key ? 'active' : ''}`}
                        onClick={() => setActiveTabDetails(key)}
                      >
                        <span className="leadmanagement-details-tab-icon">{icon}</span>
                        <span className="leadmanagement-details-tab-label">{key}</span>
                      </button>
                    ))}
                  </div>

                  {/* CONTACT INFO */}
                  <div className="leadmanagement-info-card">
                    <h4 className="leadmanagement-section-heading">Contact Information</h4>
                    <div className="leadmanagement-info-grid">
                      <div className="leadmanagement-info-row">
                        <span className="leadmanagement-label">Phone</span>
                        <div className="leadmanagement-value-with-icon">
                          <span>{selectedLead.phone}</span>
                          <button className="leadmanagement-mini-icon-btn" onClick={() => window.open(`tel:${selectedLead.phone}`)}>
                            <FiPhone />
                          </button>
                        </div>
                      </div>

                      <div className="leadmanagement-info-row">
                        <span className="leadmanagement-label">Email</span>
                        <div className="leadmanagement-value-with-icon">
                          <span>{selectedLead.email}</span>
                          <button className="leadmanagement-mini-icon-btn" onClick={() => window.open(`mailto:${selectedLead.email}`)}>
                            <FiMail />
                          </button>
                        </div>
                      </div>

                      <div className="leadmanagement-info-row">
                        <span className="leadmanagement-label">Location</span>
                        <div className="leadmanagement-value-with-icon">
                          <span>{selectedLead.location}</span>
                          <button className="leadmanagement-mini-icon-btn">
                            <FiMapPin />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* LEAD INFO */}
                  <div className="leadmanagement-info-card">
                    <h4 className="leadmanagement-section-heading">Lead Information</h4>
                    <div className="leadmanagement-info-grid">
                      <div className="leadmanagement-info-row">
                        <span className="leadmanagement-label">Interested In</span>
                        <span className="leadmanagement-value-bold">{selectedLead.interestedIn}</span>
                      </div>
                      <div className="leadmanagement-info-row">
                        <span className="leadmanagement-label">Project</span>
                        <span className="leadmanagement-value-bold">{selectedLead.project}</span>
                      </div>
                      <div className="leadmanagement-info-row">
                        <span className="leadmanagement-label">Budget</span>
                        <span className="leadmanagement-value-bold">₹{selectedLead.budgetRange}</span>
                      </div>
                      <div className="leadmanagement-info-row">
                        <span className="leadmanagement-label">Source</span>
                        <span className="leadmanagement-value-bold">{selectedLead.source}</span>
                      </div>
                      <div className="leadmanagement-info-row">
                        <span className="leadmanagement-label">Assigned Agent</span>
                        <span className="leadmanagement-value-bold">{selectedLead.agent}</span>
                      </div>
                      <div className="leadmanagement-info-row">
                        <span className="leadmanagement-label">Status</span>
                        <span className="leadmanagement-value-blue">{selectedLead.status}</span>
                      </div>
                      <div className="leadmanagement-info-row">
                        <span className="leadmanagement-label">Priority</span>
                        <span className={`leadmanagement-value-${selectedLead.priority === 'High' ? 'red' : selectedLead.priority === 'Medium' ? 'orange' : 'bold'}`}>
                          {selectedLead.priority}
                        </span>
                      </div>
                      <div className="leadmanagement-info-row">
                        <span className="leadmanagement-label">Created On</span>
                        <span className="leadmanagement-value-bold">{selectedLead.createdOn}</span>
                      </div>
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="leadmanagement-comm-buttons">
                    <button className="leadmanagement-comm-btn comm-call" onClick={() => window.open(`tel:${selectedLead.phone}`)}>
                      <FiPhone /> Call
                    </button>
                    <button className="leadmanagement-comm-btn comm-whatsapp" onClick={() => window.open(`https://wa.me/${selectedLead.phone}`)}>
                      <FiMessageSquare /> WhatsApp
                    </button>
                    <button className="leadmanagement-comm-btn comm-email" onClick={() => window.open(`mailto:${selectedLead.email}`)}>
                      <FiMail /> Email
                    </button>
                  </div>

                  <div className="leadmanagement-bottom-actions">
                    <div className="leadmanagement-btn-row-half">
                      <button className="leadmanagement-secondary-action-btn action-purple">
                        <FiCalendar /> Schedule Visit
                      </button>
                      <button className="leadmanagement-secondary-action-btn action-orange">
                        <FiUser /> Assign Agent
                      </button>
                    </div>
                    <button className="leadmanagement-primary-convert-btn">
                      <FiUserPlus /> Convert to Customer
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ADD LEAD MODAL */}
      {isAddLeadModalOpen && (
        <div className="leadmanagement-modal-backdrop" onClick={() => setIsAddLeadModalOpen(false)}>
          <div className="leadmanagement-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="leadmanagement-modal-header">
              <h3 className="leadmanagement-modal-title">Add Lead</h3>
              <button className="leadmanagement-modal-close-btn" onClick={() => setIsAddLeadModalOpen(false)}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleAddLeadSubmit} className="leadmanagement-modal-form">
              <div className="leadmanagement-form-row">
                <div className="leadmanagement-form-group">
                  <label>Full Name <span className="required">*</span></label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    value={newLeadForm.fullName}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, fullName: e.target.value })}
                    required
                  />
                </div>

                <div className="leadmanagement-form-group">
                  <label>Mobile Number <span className="required">*</span></label>
                  <div className="leadmanagement-phone-input-wrap">
                    <div className="leadmanagement-country-flag">
                      <span className="flag-code">IN</span>
                      <span className="dial-code">+91 </span>
                    </div>
                    <input
                      type="text"
                      placeholder="07205303511"
                      value={newLeadForm.mobile}
                      onChange={(e) => setNewLeadForm({ ...newLeadForm, mobile: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="leadmanagement-form-row">
                <div className="leadmanagement-form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                  />
                </div>

                <div className="leadmanagement-form-group">
                  <label>Source</label>
                  <select
                    value={newLeadForm.source}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, source: e.target.value })}
                  >
                    <option>Select source</option>
                    <option>Facebook</option>
                    <option>Website</option>
                    <option>Google Ads</option>
                    <option>Instagram</option>
                  </select>
                </div>
              </div>

              <div className="leadmanagement-form-row">
                <div className="leadmanagement-form-group">
                  <label>Interested In</label>
                  <select
                    value={newLeadForm.interestedIn}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, interestedIn: e.target.value })}
                  >
                    <option>Select property</option>
                    <option>2BHK Apartment</option>
                    <option>3BHK Apartment</option>
                    <option>4BHK Villa</option>
                  </select>
                </div>

                <div className="leadmanagement-form-group">
                  <label>Budget Range</label>
                  <select
                    value={newLeadForm.budgetRange}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, budgetRange: e.target.value })}
                  >
                    <option>Select budget range</option>
                    <option>50 - 65 L</option>
                    <option>80 - 90 L</option>
                    <option>1.2 - 1.6 Cr</option>
                  </select>
                </div>
              </div>

              <div className="leadmanagement-form-row">
                <div className="leadmanagement-form-group">
                  <label>Location / Area</label>
                  <input
                    type="text"
                    placeholder="Enter location"
                    value={newLeadForm.location}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, location: e.target.value })}
                  />
                </div>

                <div className="leadmanagement-form-group">
                  <label>Agent</label>
                  <select
                    value={newLeadForm.agent}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, agent: e.target.value })}
                  >
                    <option>Select agent</option>
                    <option>Aman Verma</option>
                    <option>Rohit Singh</option>
                    <option>Ankit Patel</option>
                  </select>
                </div>
              </div>

              <div className="leadmanagement-form-row-3">
                <div className="leadmanagement-form-group">
                  <label>Status</label>
                  <select
                    value={newLeadForm.status}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, status: e.target.value })}
                  >
                    <option>New</option>
                    <option>Follow Up</option>
                    <option>Site Visit</option>
                    <option>Converted</option>
                    <option>Lost Lead</option>
                  </select>
                </div>

                <div className="leadmanagement-form-group">
                  <label>Priority</label>
                  <select
                    value={newLeadForm.priority}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, priority: e.target.value })}
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>

                <div className="leadmanagement-form-group">
                  <label>Follow Up Date</label>
                  <input
                    type="date"
                    value={newLeadForm.followUpDate}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, followUpDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="leadmanagement-form-group">
                <label>Notes</label>
                <textarea
                  rows="3"
                  placeholder="Enter notes about the lead.."
                  value={newLeadForm.notes}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, notes: e.target.value })}
                ></textarea>
              </div>

              <div className="leadmanagement-modal-footer">
                <button
                  type="button"
                  className="leadmanagement-cancel-btn"
                  onClick={() => setIsAddLeadModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="leadmanagement-save-btn">
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadManagement;