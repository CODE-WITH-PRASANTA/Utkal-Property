import React, { useState } from 'react';
import './Overview.css';

const Overview = () => {
  // Initial state mapped to fields shown in the layout reference
  const [formData, setFormData] = useState({
    projectArea: '2.5 Acre',
    noOfHouseVilla: '140',
    totalFloors: '10',
    facing: 'North',
    plotArea: '1500 sq.ft',
    bedrooms: '1',
    bathrooms: '1',
    balconies: '1-2',
    parking: '1',
    transactionType: 'For Sale',
    propertyOverlooking: '',
    maintenancePerMonth: '0.00',
    expectedRentalReturn: '40000',
  });

  // Handle input changes for all fields dynamically
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({
      projectArea: '',
      noOfHouseVilla: '',
      totalFloors: '',
      facing: '',
      plotArea: '',
      bedrooms: '',
      bathrooms: '',
      balconies: '',
      parking: '',
      transactionType: '',
      propertyOverlooking: '',
      maintenancePerMonth: '',
      expectedRentalReturn: '',
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form Data Saved:\n' + JSON.stringify(formData, null, 2));
  };

  // Handle cancel action
  const handleCancel = () => {
    console.log('Form cancelled');
    handleReset();
  };

  return (
    <div className="overview-wrapper">
      <div className="overview-container">
        <form className="overview-form" onSubmit={handleSubmit}>
          
          {/* Two Column Layout Cards */}
          <div className="overview-grid-columns">
            
            {/* Left Card */}
            <div className="overview-card">
              <div className="overview-form-group">
                <label className="overview-label">PROJECT AREA</label>
                <input 
                  type="text" 
                  name="projectArea" 
                  value={formData.projectArea} 
                  onChange={handleInputChange} 
                  placeholder="Enter project area (e.g., 2.5 Acre)" 
                  className="overview-input" 
                />
              </div>

              <div className="overview-form-group">
                <label className="overview-label">NO. OF HOUSE/VILLA</label>
                <input 
                  type="text" 
                  name="noOfHouseVilla" 
                  value={formData.noOfHouseVilla} 
                  onChange={handleInputChange} 
                  placeholder="Enter number of house/villa (e.g., 140)" 
                  className="overview-input" 
                />
              </div>

              <div className="overview-form-group">
                <label className="overview-label">TOTAL FLOORS</label>
                <input 
                  type="text" 
                  name="totalFloors" 
                  value={formData.totalFloors} 
                  onChange={handleInputChange} 
                  placeholder="Enter total floors (e.g., 10)" 
                  className="overview-input" 
                />
              </div>

              <div className="overview-form-group">
                <label className="overview-label">FACING</label>
                <input 
                  type="text" 
                  name="facing" 
                  value={formData.facing} 
                  onChange={handleInputChange} 
                  placeholder="Enter facing (e.g., North, South)" 
                  className="overview-input" 
                />
              </div>

              <div className="overview-form-group">
                <label className="overview-label">PLOT AREA</label>
                <input 
                  type="text" 
                  name="plotArea" 
                  value={formData.plotArea} 
                  onChange={handleInputChange} 
                  placeholder="Enter plot area (e.g., 1500 sq.ft)" 
                  className="overview-input" 
                />
              </div>

              <div className="overview-form-group">
                <label className="overview-label">BEDROOMS</label>
                <input 
                  type="text" 
                  name="bedrooms" 
                  value={formData.bedrooms} 
                  onChange={handleInputChange} 
                  placeholder="Enter number of bedrooms (e.g., 1)" 
                  className="overview-input" 
                />
              </div>
            </div>

            {/* Right Card */}
            <div className="overview-card">
              <div className="overview-form-group">
                <label className="overview-label">BATHROOMS</label>
                <input 
                  type="text" 
                  name="bathrooms" 
                  value={formData.bathrooms} 
                  onChange={handleInputChange} 
                  placeholder="Enter number of bathrooms (e.g., 1)" 
                  className="overview-input" 
                />
              </div>

              <div className="overview-form-group">
                <label className="overview-label">BALCONIES</label>
                <input 
                  type="text" 
                  name="balconies" 
                  value={formData.balconies} 
                  onChange={handleInputChange} 
                  placeholder="Enter number of balconies (e.g., 1-2)" 
                  className="overview-input" 
                />
              </div>

              <div className="overview-form-group">
                <label className="overview-label">PARKING</label>
                <input 
                  type="text" 
                  name="parking" 
                  value={formData.parking} 
                  onChange={handleInputChange} 
                  placeholder="Enter parking spaces (e.g., 1)" 
                  className="overview-input" 
                />
              </div>

              <div className="overview-form-group">
                <label className="overview-label">TRANSACTION TYPE</label>
                <input 
                  type="text" 
                  name="transactionType" 
                  value={formData.transactionType} 
                  onChange={handleInputChange} 
                  placeholder="Enter transaction type (e.g., For Sale)" 
                  className="overview-input" 
                />
              </div>

              <div className="overview-form-group">
                <label className="overview-label">PROPERTY OVERLOOKING</label>
                <input 
                  type="text" 
                  name="propertyOverlooking" 
                  value={formData.propertyOverlooking} 
                  onChange={handleInputChange} 
                  placeholder="Enter property overlooking" 
                  className="overview-input" 
                />
              </div>

              <div className="overview-form-group">
                <label className="overview-label">MAINTAINANCE PER MONTH</label>
                <input 
                  type="text" 
                  name="maintenancePerMonth" 
                  value={formData.maintenancePerMonth} 
                  onChange={handleInputChange} 
                  placeholder="Enter maintainance amount (e.g., 0.00)" 
                  className="overview-input" 
                />
              </div>

              <div className="overview-form-group">
                <label className="overview-label">EXPECTED RENTAL RETURN</label>
                <input 
                  type="text" 
                  name="expectedRentalReturn" 
                  value={formData.expectedRentalReturn} 
                  onChange={handleInputChange} 
                  placeholder="Enter expected rental return (e.g., 40000)" 
                  className="overview-input" 
                />
              </div>
            </div>

          </div>

        </form>
      </div>
    </div>
  );
};

export default Overview;