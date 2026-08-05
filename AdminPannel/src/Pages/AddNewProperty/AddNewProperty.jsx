import React from "react";
import "./AddNewProperty.css";

import BasicInformation from "../../Components/BasicInformation/BasicInformation";
import LocationDetails from "../../Components/LocationDetails/LocationDetails";
import Overview from "../../Components/Overview/Overview";
import Document from "../../Components/Document/Document";
import NearbyPlaces from "../../Components/NearbyPlaces/NearbyPlaces";
import AllProperty from "../../Components/AllProperty/AllProperty";
 
const AddNewProperty = () => {
  return (
    <div className="add-property-page">
      {/* Left Side */}
      <div className="left-section">
        <BasicInformation />
        <LocationDetails />
        <Overview/>
        <Document/>
        <NearbyPlaces/>
      </div>
 
      {/* Right Side */}
      <div className="right-section">
        <AllProperty />
      </div>
    </div>
  );
};

export default AddNewProperty;