import React from "react";
import "./Overview.css";

const Overview = ({
  propertyData,
  setPropertyData,
}) => {

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setPropertyData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  return (
    <div className="overview-wrapper">
      <div className="overview-container">

        <form
          className="overview-form"
          onSubmit={(e) => e.preventDefault()}
        >

          {/* Two Column Layout Cards */}

          <div className="overview-grid-columns">

            {/* ========================= */}
            {/* LEFT CARD */}
            {/* ========================= */}

            <div className="overview-card">

              {/* PROJECT AREA */}

              <div className="overview-form-group">
                <label className="overview-label">
                  PROJECT AREA
                </label>

                <input
                  type="text"
                  name="projectArea"
                  value={propertyData.projectArea || ""}
                  onChange={handleInputChange}
                  placeholder="Enter project area (e.g., 2.5 Acre)"
                  className="overview-input"
                />
              </div>

              {/* NO OF HOUSE / VILLA */}

              <div className="overview-form-group">
                <label className="overview-label">
                  NO. OF HOUSE/VILLA
                </label>

                <input
                  type="text"
                  name="noOfHouseVilla"
                  value={propertyData.noOfHouseVilla || ""}
                  onChange={handleInputChange}
                  placeholder="Enter number of house/villa (e.g., 140)"
                  className="overview-input"
                />
              </div>

              {/* TOTAL FLOORS */}

              <div className="overview-form-group">
                <label className="overview-label">
                  TOTAL FLOORS
                </label>

                <input
                  type="text"
                  name="totalFloors"
                  value={propertyData.totalFloors || ""}
                  onChange={handleInputChange}
                  placeholder="Enter total floors (e.g., 10)"
                  className="overview-input"
                />
              </div>

              {/* FACING */}

              <div className="overview-form-group">
                <label className="overview-label">
                  FACING
                </label>

                <input
                  type="text"
                  name="facing"
                  value={propertyData.facing || ""}
                  onChange={handleInputChange}
                  placeholder="Enter facing (e.g., North, South)"
                  className="overview-input"
                />
              </div>

              {/* PLOT AREA */}

              <div className="overview-form-group">
                <label className="overview-label">
                  PLOT AREA
                </label>

                <input
                  type="text"
                  name="plotArea"
                  value={propertyData.plotArea || ""}
                  onChange={handleInputChange}
                  placeholder="Enter plot area (e.g., 1500 sq.ft)"
                  className="overview-input"
                />
              </div>

              {/* BEDROOMS */}

              <div className="overview-form-group">
                <label className="overview-label">
                  BEDROOMS
                </label>

                <input
                  type="text"
                  name="bedrooms"
                  value={propertyData.bedrooms || ""}
                  onChange={handleInputChange}
                  placeholder="Enter number of bedrooms (e.g., 1)"
                  className="overview-input"
                />
              </div>

            </div>

            {/* ========================= */}
            {/* RIGHT CARD */}
            {/* ========================= */}

            <div className="overview-card">

              {/* BATHROOMS */}

              <div className="overview-form-group">
                <label className="overview-label">
                  BATHROOMS
                </label>

                <input
                  type="text"
                  name="bathrooms"
                  value={propertyData.bathrooms || ""}
                  onChange={handleInputChange}
                  placeholder="Enter number of bathrooms (e.g., 1)"
                  className="overview-input"
                />
              </div>

              {/* BALCONIES */}

              <div className="overview-form-group">
                <label className="overview-label">
                  BALCONIES
                </label>

                <input
                  type="text"
                  name="balconies"
                  value={propertyData.balconies || ""}
                  onChange={handleInputChange}
                  placeholder="Enter number of balconies (e.g., 1-2)"
                  className="overview-input"
                />
              </div>

              {/* PARKING */}

              <div className="overview-form-group">
                <label className="overview-label">
                  PARKING
                </label>

                <input
                  type="text"
                  name="parking"
                  value={propertyData.parking || ""}
                  onChange={handleInputChange}
                  placeholder="Enter parking spaces (e.g., 1)"
                  className="overview-input"
                />
              </div>

              {/* TRANSACTION TYPE */}

              <div className="overview-form-group">
                <label className="overview-label">
                  TRANSACTION TYPE
                </label>

                <input
                  type="text"
                  name="transactionType"
                  value={propertyData.transactionType || ""}
                  onChange={handleInputChange}
                  placeholder="Enter transaction type (e.g., For Sale)"
                  className="overview-input"
                />
              </div>

              {/* PROPERTY OVERLOOKING */}

              <div className="overview-form-group">
                <label className="overview-label">
                  PROPERTY OVERLOOKING
                </label>

                <input
                  type="text"
                  name="propertyOverlooking"
                  value={propertyData.propertyOverlooking || ""}
                  onChange={handleInputChange}
                  placeholder="Enter property overlooking"
                  className="overview-input"
                />
              </div>

              {/* MAINTENANCE */}

              <div className="overview-form-group">
                <label className="overview-label">
                  MAINTAINANCE PER MONTH
                </label>

                <input
                  type="text"
                  name="maintenancePerMonth"
                  value={propertyData.maintenancePerMonth || ""}
                  onChange={handleInputChange}
                  placeholder="Enter maintainance amount (e.g., 0.00)"
                  className="overview-input"
                />
              </div>

              {/* EXPECTED RENTAL RETURN */}

              <div className="overview-form-group">
                <label className="overview-label">
                  EXPECTED RENTAL RETURN
                </label>

                <input
                  type="text"
                  name="expectedRentalReturn"
                  value={propertyData.expectedRentalReturn || ""}
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