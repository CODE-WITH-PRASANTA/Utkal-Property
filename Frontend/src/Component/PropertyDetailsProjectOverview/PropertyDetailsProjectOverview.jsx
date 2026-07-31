import React from 'react';
import './PropertyDetailsProjectOverview.css';

// Importing necessary icons from react-icons
import { 
  FaFacebook, 
  FaTwitter, 
  FaWhatsapp, 
  FaTelegramPlane, 
  FaLinkedinIn, 
  FaEnvelope, 
  FaPlus 
} from 'react-icons/fa';

import { 
  MdHome, 
  MdDomain, 
  MdMeetingRoom, 
  MdBed, 
  MdBathtub, 
  MdBalcony, 
  MdDirectionsCar, 
  MdVpnKey, 
  MdVisibility, 
  MdHomeRepairService 
} from 'react-icons/md';

import { BiArea, BiMoveHorizontal, BiBuildingHouse } from 'react-icons/bi';

const PropertyDetailsProjectOverview = () => {
  // Data for the grid based on the provided image
  const overviewData = [
    { id: 1, label: 'Project Area', value: '2.5 Acre', icon: <BiArea /> },
    { id: 2, label: 'No. of House/Villa', value: '45', icon: <MdHome /> },
    { id: 3, label: 'Total Floors', value: 'G+2', icon: <MdDomain /> },
    { id: 4, label: 'Facing', value: 'North, South', icon: <MdMeetingRoom /> },
    { id: 5, label: 'Plot Area', value: '1500 - 1500 sq.ft', icon: <BiMoveHorizontal /> },
    { id: 6, label: 'Bedrooms', value: '4-5', icon: <MdBed /> },
    { id: 7, label: 'Bathrooms', value: '4-5', icon: <MdBathtub /> },
    { id: 8, label: 'Balconies', value: '1-2', icon: <MdBalcony /> },
    { id: 9, label: 'Parking', value: '2', icon: <MdDirectionsCar /> },
    { id: 10, label: 'Transaction Type', value: 'New property', icon: <MdVpnKey /> },
    { id: 11, label: 'Property Overlooking', value: 'Pool, Road, Club, Garden', icon: <MdVisibility /> },
    { id: 12, label: 'Maintainance Per Month', value: '₹ 0.00', icon: <MdHomeRepairService /> },
    { id: 13, label: 'Expected Rental Return', value: '₹ 40,000', icon: <BiBuildingHouse /> },
  ];

  return (
    <div className="PropertyDetailsProjectOverview-wrapper">
      <div className="PropertyDetailsProjectOverview-container">
        
        {/* Header Section */}
        <div className="PropertyDetailsProjectOverview-header">
          <h2 className="PropertyDetailsProjectOverview-title">Project Overview</h2>
          
          <div className="PropertyDetailsProjectOverview-social">
            <button className="PropertyDetailsProjectOverview-social-btn fb"><FaFacebook /></button>
            <button className="PropertyDetailsProjectOverview-social-btn tw"><FaTwitter /></button>
            <button className="PropertyDetailsProjectOverview-social-btn wa"><FaWhatsapp /></button>
            <button className="PropertyDetailsProjectOverview-social-btn tg"><FaTelegramPlane /></button>
            <button className="PropertyDetailsProjectOverview-social-btn li"><FaLinkedinIn /></button>
            <button className="PropertyDetailsProjectOverview-social-btn em"><FaEnvelope /></button>
            <button className="PropertyDetailsProjectOverview-social-btn pl"><FaPlus /></button>
          </div>
        </div>

        {/* Grid Section */}
        <div className="PropertyDetailsProjectOverview-grid">
          {overviewData.map((item) => (
            <div key={item.id} className="PropertyDetailsProjectOverview-grid-item">
              <div className="PropertyDetailsProjectOverview-icon">
                {item.icon}
              </div>
              <div className="PropertyDetailsProjectOverview-details">
                <span className="PropertyDetailsProjectOverview-label">{item.label}</span>
                <span className="PropertyDetailsProjectOverview-value">{item.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Description Section */}
        <div className="PropertyDetailsProjectOverview-section">
          <h3 className="PropertyDetailsProjectOverview-section-title">Description</h3>
          <div className="PropertyDetailsProjectOverview-content">
            <p>
              Rudransh South Kingdom is a thoughtfully designed luxury villa community located in the rapidly developing Info Valley corridor of Bhubaneswar. Combining contemporary architecture, premium lifestyle amenities, and excellent connectivity, the project offers an ideal living environment for families seeking comfort, privacy, and convenience.
            </p>
            <p>
              The development features elegant villas with spacious layouts, modern interiors, abundant natural light, and private outdoor spaces. Residents can enjoy a premium clubhouse, rooftop swimming pool, fitness center, yoga zone, indoor recreation facilities, landscaped gardens, children's play area, outdoor sports facilities, and beautifully designed community spaces.
            </p>
            <p>
              Strategically positioned near Info Valley, Infosys, RBI Data Centre, GITA Autonomous College, NMIMS University, Grand Hyatt Hotel, and National Highway 16, Rudransh South Kingdom ensures seamless access to workplaces, educational institutions, healthcare facilities, shopping destinations, and entertainment hubs.
            </p>
            <p>
              Designed to deliver a balanced lifestyle surrounded by greenery and modern infrastructure, Rudransh South Kingdom is a perfect destination for those looking for a premium residential address in Bhubaneswar.
            </p>
          </div>
        </div>

        {/* Location Section */}
        <div className="PropertyDetailsProjectOverview-section">
          <h3 className="PropertyDetailsProjectOverview-section-title">Location</h3>
          <div className="PropertyDetailsProjectOverview-content">
            <p>
              Located in the fast-growing Info Valley corridor of Bhubaneswar, Rudransh South Kingdom offers excellent connectivity to Infosys, RBI Data Centre, NMIMS University, GITA College, and NH-16. Surrounded by major infrastructure and institutional developments, this location is poised for strong future appreciation, making it ideal for both homebuyers and investors.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PropertyDetailsProjectOverview;