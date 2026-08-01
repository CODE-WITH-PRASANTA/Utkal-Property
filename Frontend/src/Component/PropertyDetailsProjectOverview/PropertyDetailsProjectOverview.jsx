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

const PropertyDetailsProjectOverview = ({ property }) => {
  const propertyTitle = property?.title || 'Rudransh South Kingdom';
  const description = property?.shortDescription || `${propertyTitle} offers a thoughtfully designed property with comfortable spaces, modern amenities, and convenient connectivity.`;
  const location = property?.address || 'Info Valley corridor of Bhubaneswar';

  // Data for the grid based on the provided image
  const overviewData = [
    { id: 1, label: 'Project Area', value: property?.projectSize ? `${property.projectSize} Acre` : '2.5 Acre', icon: <BiArea /> },
    { id: 2, label: 'No. of House/Villa', value: property?.totalUnits || '45', icon: <MdHome /> },
    { id: 3, label: 'Total Floors', value: property?.totalFloors || 'G+2', icon: <MdDomain /> },
    { id: 4, label: 'Facing', value: 'North, South', icon: <MdMeetingRoom /> },
    { id: 5, label: 'Plot Area', value: property?.plotSize ? `${property.plotSize} sq.ft` : '1500 - 1500 sq.ft', icon: <BiMoveHorizontal /> },
    { id: 6, label: 'Bedrooms', value: property?.bedrooms || '4-5', icon: <MdBed /> },
    { id: 7, label: 'Bathrooms', value: property?.bathrooms || '4-5', icon: <MdBathtub /> },
    { id: 8, label: 'Balconies', value: '1-2', icon: <MdBalcony /> },
    { id: 9, label: 'Parking', value: property?.parking || '2', icon: <MdDirectionsCar /> },
    { id: 10, label: 'Transaction Type', value: property?.statusType || 'New property', icon: <MdVpnKey /> },
    { id: 11, label: 'Property Overlooking', value: property?.amenities?.join(', ') || 'Pool, Road, Club, Garden', icon: <MdVisibility /> },
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
              {description}
            </p>
            <p>
              {property?.highlights?.length ? property.highlights.join('. ') : `${propertyTitle} includes spacious layouts, practical features, and lifestyle amenities for comfortable everyday living.`}
            </p>
            <p>
              Located at {location}, this property is positioned for convenient access to nearby workplaces, educational institutions, healthcare facilities, shopping destinations, and entertainment hubs.
            </p>
            <p>
              {propertyTitle} is a suitable choice for buyers looking for a well-connected residential or investment property.
            </p>
          </div>
        </div>

        {/* Location Section */}
        <div className="PropertyDetailsProjectOverview-section">
          <h3 className="PropertyDetailsProjectOverview-section-title">Location</h3>
          <div className="PropertyDetailsProjectOverview-content">
            <p>
              {propertyTitle} is located at {location}, offering convenient connectivity and access to the surrounding area.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PropertyDetailsProjectOverview;