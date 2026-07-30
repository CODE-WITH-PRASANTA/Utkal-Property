import React, { useState } from 'react';
import { 
  ChevronRight, 
  FileText, 
  Calendar, 
  DollarSign, 
  Users, 
  Building, 
  FileDown, 
  Printer, 
  X,
  PieChart,
  BarChart3
} from 'lucide-react';
import './ReportMain.css';

const PROPERTY_DATA = [
  { id: 'UP-125', name: 'Luxury 3BHK Apartment', enquiries: 128, bookings: 18, revenue: '₹ 72,00,000', rate: '14.06%', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=100' },
  { id: 'UP-124', name: 'Premium Villa', enquiries: 96, bookings: 12, revenue: '₹ 54,00,000', rate: '12.50%', image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=100' },
  { id: 'UP-123', name: 'Modern 2BHK Flat', enquiries: 72, bookings: 8, revenue: '₹ 36,00,000', rate: '11.11%', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=100' },
  { id: 'UP-122', name: 'Commercial Space', enquiries: 38, bookings: 6, revenue: '₹ 18,90,000', rate: '15.79%', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100' },
  { id: 'UP-121', name: 'Beachside Villa', enquiries: 22, bookings: 4, revenue: '₹ 12,00,000', rate: '18.18%', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=100' },
];

const AGENT_DATA = [
  { name: 'Rakesh Kumar', enquiries: 128, bookings: 18, revenue: '₹ 72,00,000', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
  { name: 'Priya Senapati', enquiries: 84, bookings: 12, revenue: '₹ 45,00,000', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
  { name: 'Amit Behera', enquiries: 68, bookings: 8, revenue: '₹ 28,50,000', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
  { name: 'Subhashree Mohanty', enquiries: 46, bookings: 6, revenue: '₹ 21,30,000', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100' },
  { name: 'Debashis Patnaik', enquiries: 30, bookings: 4, revenue: '₹ 12,00,000', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
];

const SUMMARY_REPORTS = [
  { id: 'enquiry', title: 'Enquiry Report', desc: 'Detailed enquiry source and status report', icon: FileText, color: 'blue', details: 'Contains 356 total enquiries across online ads, direct walk-ins, and agent referrals.' },
  { id: 'booking', title: 'Booking Report', desc: 'All booking details and status report', icon: Calendar, color: 'green', details: 'Contains 48 total confirmed, pending, and cancelled client bookings.' },
  { id: 'revenue', title: 'Revenue Report', desc: 'Revenue collection and payment report', icon: DollarSign, color: 'amber', details: 'Detailed breakdown of payment schedules, milestone collections, and token amounts.' },
  { id: 'agent', title: 'Agent Performance', desc: 'Individual agent performance analytics', icon: Users, color: 'purple', details: 'Individual agent conversion rate comparisons, lead assignments, and total commission generated.' },
  { id: 'property', title: 'Property Report', desc: 'Property wise performance and analytics', icon: Building, color: 'indigo', details: 'Unit availability, total inventory sold vs remaining, and view analytics for all listings.' },
];

const QUICK_REPORTS = [
  { id: 'today', label: "Today's Report", icon: Calendar },
  { id: 'week', label: "This Week Report", icon: Calendar },
  { id: 'month', label: "This Month Report", icon: Calendar },
  { id: 'quarter', label: "This Quarter Report", icon: BarChart3 },
  { id: 'year', label: "This Year Report", icon: Calendar },
  { id: 'custom', label: "Custom Date Report", icon: Calendar }
];

const ReportMain = () => {
  const [activeQuickReport, setActiveQuickReport] = useState('today');
  const [activeModal, setActiveModal] = useState(null);

  const closeModal = () => setActiveModal(null);

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Property,Enquiries,Bookings,Revenue\n"
      + PROPERTY_DATA.map(p => `"${p.name}",${p.enquiries},${p.bookings},"${p.revenue}"`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "property_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="report-dashboard-wrapper">
      {/* Top Section */}
      <div className="top-dashboard-grid">

        {/* 1. Property Performance */}
        <div className="dashboard-card prop-card">
          <div className="card-top-bar">
            <h2>Property Performance</h2>
            <button className="btn-detail-report" onClick={() => setActiveModal({ title: 'Detailed Property Performance', type: 'property_detailed' })}>
              View Detailed Report
            </button>
          </div>

          <div className="table-scroll-container">
            <table className="custom-data-table">
              <thead>
                <tr>
                  <th style={{ width: '38%' }}>PROPERTY</th>
                  <th className="align-center">ENQUIRIES</th>
                  <th className="align-center">BOOKINGS</th>
                  <th className="align-right">REVENUE</th>
                  <th style={{ width: '22%' }}>CONVERSION RATE</th>
                </tr>
              </thead>
              <tbody>
                {PROPERTY_DATA.map((item) => (
                  <tr key={item.id} className="interactive-row">
                    <td>
                      <div className="property-item-box">
                        <img src={item.image} alt={item.name} className="property-img" />
                        <div className="property-info">
                          <span className="property-name">{item.name}</span>
                          <span className="property-code">{item.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="align-center val-text">{item.enquiries}</td>
                    <td className="align-center val-text">{item.bookings}</td>
                    <td className="align-right val-text semibold">{item.revenue}</td>
                    <td>
                      <div className="conversion-wrapper">
                        <span className="conversion-percentage">{item.rate}</span>
                        <div className="conversion-track">
                          <div className="conversion-progress" style={{ width: item.rate }}></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card-bottom-bar">
            <span className="showing-info">Showing 1 to 5 of 12 properties</span>
            <button className="blue-link-btn" onClick={() => setActiveModal({ title: 'All Properties', type: 'all_properties' })}>
              View All Properties &rarr;
            </button>
          </div>
        </div>

        {/* 2. Top Performing Agents */}
        <div className="dashboard-card agent-card">
          <div className="card-top-bar">
            <h2>Top Performing Agents</h2>
          </div>

          <div className="table-scroll-container">
            <table className="custom-data-table">
              <thead>
                <tr>
                  <th style={{ width: '45%' }}>AGENT</th>
                  <th className="align-center">ENQUIRIES</th>
                  <th className="align-center">BOOKINGS</th>
                  <th className="align-right">REVENUE</th>
                </tr>
              </thead>
              <tbody>
                {AGENT_DATA.map((agent, idx) => (
                  <tr key={idx} className="interactive-row">
                    <td>
                      <div className="agent-item-box">
                        <img src={agent.avatar} alt={agent.name} className="agent-img" />
                        <span className="agent-name-text">{agent.name}</span>
                      </div>
                    </td>
                    <td className="align-center val-text">{agent.enquiries}</td>
                    <td className="align-center val-text">{agent.bookings}</td>
                    <td className="align-right val-text semibold">{agent.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card-bottom-bar end-aligned">
            <button className="blue-link-btn" onClick={() => setActiveModal({ title: 'All Agents', type: 'all_agents' })}>
              View All Agents &rarr;
            </button>
          </div>
        </div>

        {/* 3. Reports Summary */}
        <div className="dashboard-card summary-card">
          <div className="card-top-bar">
            <h2>Reports Summary</h2>
          </div>

          <div className="summary-cards-container">
            {SUMMARY_REPORTS.map((report) => {
              const IconComponent = report.icon;
              return (
                <div 
                  key={report.id} 
                  className="summary-pill-row"
                  onClick={() => setActiveModal({ title: report.title, type: 'summary_item', data: report })}
                >
                  <div className={`summary-badge-icon ${report.color}`}>
                    <IconComponent size={16} />
                  </div>
                  <div className="summary-pill-content">
                    <h3>{report.title}</h3>
                    <p>{report.desc}</p>
                  </div>
                  <ChevronRight size={14} className="chevron-right-arrow" />
                </div>
              );
            })}
          </div>

          <div className="card-bottom-bar end-aligned">
            <button className="blue-link-btn" onClick={() => setActiveModal({ title: 'All System Reports', type: 'all_reports' })}>
              View All Reports &rarr;
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="bottom-dashboard-grid">
        {/* Quick Reports */}
        <div className="dashboard-card quick-reports-box">
          <h2>Quick Reports</h2>
          <div className="quick-actions-flex">
            {QUICK_REPORTS.map((btn) => {
              const IconComp = btn.icon;
              return (
                <button 
                  key={btn.id}
                  className={`quick-report-circle-btn ${activeQuickReport === btn.id ? 'active' : ''}`}
                  onClick={() => setActiveQuickReport(btn.id)}
                >
                  <div className="icon-circle-bg">
                    <IconComp size={18} />
                  </div>
                  <span className="quick-label-text">{btn.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Download Center */}
        <div className="dashboard-card download-center-box">
          <h2>Download Center</h2>
          <p className="download-subtext">Download your important reports</p>

          <div className="download-actions-flex">
            <button className="download-btn-pill pdf" onClick={() => alert("Downloading PDF Report...")}>
              <FileText size={15} className="pdf-icon-color" />
              <span>PDF Report</span>
            </button>

            <button className="download-btn-pill excel" onClick={handleExportCSV}>
              <FileDown size={15} className="excel-icon-color" />
              <span>Excel Report</span>
            </button>

            <button className="download-btn-pill print" onClick={handlePrint}>
              <Printer size={15} className="print-icon-color" />
              <span>Print Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal View */}
      {activeModal && (
        <div className="modal-overlay-bg" onClick={closeModal}>
          <div className="modal-dialog-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top-header">
              <h3>{activeModal.title}</h3>
              <button className="modal-close-icon" onClick={closeModal}><X size={18} /></button>
            </div>
            <div className="modal-inner-content">
              {activeModal.type === 'summary_item' ? (
                <div>
                  <p className="modal-description">{activeModal.data.desc}</p>
                  <div className="modal-details-card">
                    <strong>Report Overview:</strong>
                    <p>{activeModal.data.details}</p>
                  </div>
                </div>
              ) : (
                <div className="modal-empty-state">
                  <PieChart size={36} className="modal-state-icon" />
                  <p>Detailed view data for <strong>{activeModal.title}</strong> is ready.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportMain;