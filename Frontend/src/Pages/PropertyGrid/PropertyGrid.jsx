import React, { useState } from "react";
import GridBreadcrum from "../../Component/GridBreadcrum/GridBreadcrum";
import GridPropertyListing from "../../Component/GridPropertyListing/GridPropertyListing";
import GridContact from "../../Component/GridContact/GridContact";

const PropertyGrid = () => {
  const [filters, setFilters] = useState({});

  return (
    <div>
      <GridBreadcrum onSearch={setFilters} />
      <GridPropertyListing filters={filters} />
      <GridContact />
    </div>
  );
};

export default PropertyGrid;
