import React from "react";
import "./AddNewProperty.css";

import BasicInformation from "../../Components/BasicInformation/BasicInformation";
import LocationDetails from "../../Components/LocationDetails/LocationDetails";
import LoadProPerty from "../../Components/LoadProPerty/LoadProPerty";
import Amenities from "../../Components/Amenities/Amenities";
import Document from "../../Components/Document/Document";
import AllProperty from "../../Components/AllProperty/AllProperty";

const AddNewProperty = () => {
  return (
    <div className="add-property-page">

      {/* Left Side */}
      <div className="left-section">
        <BasicInformation />
        <LocationDetails />
        <LoadProPerty />
        <Amenities />
        <Document />
      </div>


      {/* Right Side */}
      <div className="right-section">
        <AllProperty />
      </div>

    </div>
  );
};

export default AddNewProperty;