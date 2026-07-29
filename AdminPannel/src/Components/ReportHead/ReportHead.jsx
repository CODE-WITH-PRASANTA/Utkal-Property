import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { 
  Calendar, 
  Filter, 
  RotateCcw, 
  MessageSquare, 
  Bookmark, 
  IndianRupee, 
  Building2, 
  Users, 
  Eye, 
  TrendingUp 
} from 'lucide-react';
import './ReportHead.css';

const INITIAL_STATS = [
  { id: 'enquiries', label: 'Total Enquiries', value: '356', change: '18.7%', icon: MessageSquare, color: 'purple' },
  { id: 'bookings', label: 'Total Bookings', value: '48', change: '20.0%', icon: Bookmark, color: 'amber' },
  { id: 'revenue', label: 'Total Revenue', value: '₹ 1,85,90,000', change: '24.6%', icon: IndianRupee, color: 'emerald' },
  { id: 'sold', label: 'Properties Sold', value: '28', change: '21.2%', icon: Building2, color: 'blue' },
  { id: 'clients', label: 'Active Clients', value: '210', change: '15.3%', icon: Users, color: 'red' },
  { id: 'visits', label: 'Site Visits', value: '89', change: '10.2%', icon: Eye, color: 'teal' }
];

const LINE_DATA = [
  { date: '01 Jun', enquiries: 20, bookings: 12 },
  { date: '05 Jun', enquiries: 48, bookings: 22 },
  { date: '10 Jun', enquiries: 60, bookings: 32 },
  { date: '15 Jun', enquiries: 85, bookings: 45 },
  { date: '20 Jun', enquiries: 65, bookings: 28 },
  { date: '25 Jun', enquiries: 42, bookings: 18 },
  { date: '30 Jun', enquiries: 76, bookings: 40 }
];

const REVENUE_DATA = [
  { date: '01 Jun', val1: 10, val2: 12 },
  { date: '05 Jun', val1: 22, val2: 25 },
  { date: '10 Jun', val1: 18, val2: 22 },
  { date: '15 Jun', val1: 30, val2: 38 },
  { date: '20 Jun', val1: 25, val2: 35 },
  { date: '25 Jun', val1: 38, val2: 45 },
  { date: '30 Jun', val1: 28, val2: 38 }
];

const PIE_DATA = [
  { name: 'Confirmed', value: 26, percentage: '54.2%', color: '#10b981' },
  { name: 'Pending', value: 14, percentage: '29.2%', color: '#f59e0b' },
  { name: 'Cancelled', value: 6, percentage: '12.5%', color: '#ef4444' },
  { name: 'On Hold', value: 2, percentage: '4.1%', color: '#3b82f6' }
];

const ReportHead = () => {
  const [dateRange, setDateRange] = useState('01 Jun 2026 - 30 Jun 2026');
  const [property, setProperty] = useState('All Properties');
  const [agent, setAgent] = useState('All Agents');
  const [timeframeEnquiries, setTimeframeEnquiries] = useState('Daily');
  const [timeframeRevenue, setTimeframeRevenue] = useState('Daily');

  const handleReset = () => {
    setDateRange('01 Jun 2026 - 30 Jun 2026');
    setProperty('All Properties');
    setAgent('All Agents');
    setTimeframeEnquiries('Daily');
    setTimeframeRevenue('Daily');
  };

  const handleApplyFilter = () => {
    alert(`Filters Applied:\nDate: ${dateRange}\nProperty: ${property}\nAgent: ${agent}`);
  };

  return (
    <div className="reports-container">
      {/* Header Bar */}
      <header className="dashboard-header">
        <div className="title-area">
          <h1 className="main-title">Reports</h1>
          <p className="breadcrumb">Dashboard &gt; <span>Reports</span></p>
        </div>

        {/* Uniform Filter Bar Controls */}
        <div className="filter-controls">
          <div className="control-box calendar-box">
            <Calendar size={16} className="control-icon" />
            <input 
              type="text" 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)} 
              className="filter-input"
            />
          </div>

          <div className="control-box">
            <select value={property} onChange={(e) => setProperty(e.target.value)} className="filter-select">
              <option value="All Properties">All Properties</option>
              <option value="Luxury Villa">Luxury Villa</option>
              <option value="Skyline Apartment">Skyline Apartment</option>
            </select>
          </div>

          <div className="control-box">
            <select value={agent} onChange={(e) => setAgent(e.target.value)} className="filter-select">
              <option value="All Agents">All Agents</option>
              <option value="John Doe">John Doe</option>
              <option value="Jane Smith">Jane Smith</option>
            </select>
          </div>

          <button className="btn-apply" onClick={handleApplyFilter}>
            <Filter size={15} />
            <span>Apply Filters</span>
          </button>

          <button className="btn-reset" onClick={handleReset} title="Reset Filters">
            <RotateCcw size={15} />
            <span>Reset</span>
          </button>
        </div>
      </header>

      {/* 6 Top KPI Metric Cards */}
      <section className="stats-grid">
        {INITIAL_STATS.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <div className="stat-card" key={stat.id}>
              <div className={`icon-wrapper ${stat.color}`}>
                <IconComponent size={20} />
              </div>
              <div className="stat-content">
                <span className="stat-label">{stat.label}</span>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-footer">
                  <span className="growth-tag">
                    <TrendingUp size={12} />
                    {stat.change}
                  </span>
                  <span className="growth-period">from last month</span>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Dashboard Analytics Section */}
      <section className="charts-grid">
        {/* Enquiries vs Bookings Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Enquiries vs Bookings</h3>
            <select 
              value={timeframeEnquiries} 
              onChange={(e) => setTimeframeEnquiries(e.target.value)}
              className="dropdown-timeframe"
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>

          <div className="chart-legend">
            <span className="legend-item"><span className="dot blue"></span>Enquiries</span>
            <span className="legend-item"><span className="dot green"></span>Bookings</span>
          </div>

          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={LINE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEnquiries" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                <Area type="monotone" dataKey="enquiries" stroke="#2563eb" strokeWidth={2.5} fillOpacity={1} fill="url(#colorEnquiries)" />
                <Area type="monotone" dataKey="bookings" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorBookings)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Overview Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Revenue Overview</h3>
            <select 
              value={timeframeRevenue} 
              onChange={(e) => setTimeframeRevenue(e.target.value)}
              className="dropdown-timeframe"
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>

          <div className="chart-wrapper revenue-chart">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tickFormatter={(value) => `₹${value}L`} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip formatter={(value) => [`₹${value} Lakhs`, 'Revenue']} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                <Bar dataKey="val1" fill="#c084fc" radius={[4, 4, 0, 0]} />
                <Bar dataKey="val2" fill="#a855f7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bookings by Status Pie Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Bookings by Status</h3>
          </div>

          <div className="pie-container">
            <div className="pie-chart-wrapper">
              <ResponsiveContainer width="100%" height={190}>
                <PieChart>
                  <Pie
                    data={PIE_DATA}
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {PIE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value} bookings`, name]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="pie-center-label">
                <span className="total-num">48</span>
                <span className="total-text">Total</span>
              </div>
            </div>

            <div className="pie-legend-list">
              {PIE_DATA.map((item) => (
                <div key={item.name} className="pie-legend-row">
                  <div className="label-group">
                    <span className="indicator" style={{ backgroundColor: item.color }}></span>
                    <span className="name">{item.name}</span>
                  </div>
                  <span className="val-text">{item.value} ({item.percentage})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReportHead;