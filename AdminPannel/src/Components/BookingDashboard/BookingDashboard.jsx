import React from 'react';
import './BookingDashboard.css';

// Import React Icons
import { FaCircle, FaRegCalendarCheck, FaRegClock, FaBan, FaBuilding } from 'react-icons/fa';
import { IoMdArrowDropright } from 'react-icons/io';

// Mock images for the listings. Replace these paths with your actual image paths.
// For this example, we will assume these images are in your public/images folder.
const listingImages = {
  luxury3BHK: '/images/luxury-apartment.jpg', // Example: place a file named luxury-apartment.jpg in public/images
  premiumVilla: '/images/premium-villa.jpg',
  modern2BHK: '/images/modern-flat.jpg',
  commercialSpace: '/images/commercial-space.jpg',
  luxury4BHK: '/images/luxury-apartment.jpg',
};

const BookingDashboard = () => {
  // Mock data for Recent Bookings
  const recentBookings = [
    { id: 1, type: 'Luxury 3BHK Apartment', host: 'Rakesh Kumar', date: '28 Jul 2026', amount: '₹ 1,00,000', status: 'Confirmed', image: listingImages.luxury3BHK },
    { id: 2, type: 'Premium Villa', host: 'Priya Senapati', date: '27 Jul 2026', amount: '₹ 50,000', status: 'Pending', image: listingImages.premiumVilla },
    { id: 3, type: 'Modern 2BHK Flat', host: 'Amit Behera', date: '26 Jul 2026', amount: '₹ 75,000', status: 'Confirmed', image: listingImages.modern2BHK },
    { id: 4, type: 'Commercial Space', host: 'Subhashree Mohanty', date: '25 Jul 2026', amount: '₹ 2,00,000', status: 'Pending', image: listingImages.commercialSpace },
    { id: 5, type: 'Luxury 4BHK Apartment', host: 'Debashis Patnaik', date: '24 Jul 2026', amount: '₹ 1,25,000', status: 'Confirmed', image: listingImages.luxury4BHK },
  ];

  // Data for the Donut Chart
  const totalBookings = 48;
  const confirmedCount = 26;
  const pendingCount = 14;
  const cancelledCount = 8;

  // Helper to calculate percentages
  const getPercentage = (count) => ((count / totalBookings) * 100).toFixed(1);

  // CSS variables for the conic-gradient donut chart
  const chartVars = {
    '--confirmed-percentage': getPercentage(confirmedCount),
    '--pending-percentage': getPercentage(pendingCount),
    '--cancelled-percentage': getPercentage(cancelledCount),
  };

  return (
    <div className="booking-dashboard-container">
      <div className="dashboard-content">
        
        {/* Left Side: Booking Summary */}
        <div className="booking-summary-section">
          <div className="widget-card">
            <h3>Booking Summary</h3>
            <div className="summary-body">
              {/* Donut Chart */}
              <div className="donut-chart-wrapper" style={chartVars}>
                <div className="donut-chart">
                  <div className="center-circle">
                    <span className="total-number">{totalBookings}</span>
                    <span className="total-label">Total</span>
                  </div>
                </div>
              </div>
              
              {/* Legend */}
              <div className="chart-legend">
                <div className="legend-item">
                  <FaCircle className="icon confirmed" />
                  <span className="label">Confirmed</span>
                  <span className="value">{confirmedCount} ({getPercentage(confirmedCount)}%)</span>
                </div>
                <div className="legend-item">
                  <FaCircle className="icon pending" />
                  <span className="label">Pending</span>
                  <span className="value">{pendingCount} ({getPercentage(pendingCount)}%)</span>
                </div>
                <div className="legend-item">
                  <FaCircle className="icon cancelled" />
                  <span className="label">Cancelled</span>
                  <span className="value">{cancelledCount} ({getPercentage(cancelledCount)}%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Recent Bookings */}
        <div className="recent-bookings-section">
          <div className="widget-card recent-bookings-card">
            <div className="card-header">
              <h3>Recent Bookings</h3>
              <button className="view-all-btn">
                View All <IoMdArrowDropright />
              </button>
            </div>
            
            <div className="bookings-list">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="booking-item">
                  <div className="booking-info">
                    <div className="image-wrapper">
                      {/* Use a placeholder if image fails to load */}
                      <img 
                        src={booking.image} 
                        alt={booking.type} 
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/50'; }} 
                      />
                    </div>
                    <div className="details">
                      <h4>{booking.type}</h4>
                      <p className="host-name">{booking.host}</p>
                      <p className="meta">
                        <FaRegCalendarCheck className="meta-icon" /> {booking.date} 
                        <span className="separator">•</span>
                        {booking.amount}
                      </p>
                    </div>
                  </div>
                  <div className={`status-badge ${booking.status.toLowerCase()}`}>
                    {booking.status === 'Confirmed' && <FaRegCalendarCheck className="status-icon" />}
                    {booking.status === 'Pending' && <FaRegClock className="status-icon" />}
                    {booking.status === 'Cancelled' && <FaBan className="status-icon" />}
                    {booking.status}
                  </div>
                </div>
              ))}
            </div>

            <button className="view-all-bookings-btn">
              View All Bookings
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BookingDashboard;