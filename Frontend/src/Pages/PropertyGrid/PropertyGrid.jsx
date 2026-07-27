import React from 'react'
import GridBreadcrum from '../../Component/GridBreadcrum/GridBreadcrum'
import GridPropertyListing from '../../Component/GridPropertyListing/GridPropertyListing'
import GridContact from '../../Component/GridContact/GridContact'

const PropertyGrid = () => {
  return (
    <div>
<GridBreadcrum/>
<GridPropertyListing/>
<GridContact/>
    </div>
  )
}

export default PropertyGrid