import React from 'react'
import PropertyDetailsCard from '../../Component/PropertyDetailsCard/PropertyDetailsCard'
import PropertyDetailsProjectOverview from '../../Component/PropertyDetailsProjectOverview/PropertyDetailsProjectOverview'
import PropertyDetailsAmenities from '../../Component/PropertyDetailsAmenities/PropertyDetailsAmenities'
import PropertyDetailsMap from '../../Component/PropertyDetailsMap/PropertyDetailsMap'
import PropertyDetailsSimilarProjects from '../../Component/PropertyDetailsSimilarProjects/PropertyDetailsSimilarProjects'
import PropertyDetailsPeopleSay from '../../Component/PropertyDetailsPeopleSay/PropertyDetailsPeopleSay'
import PropertyDetailsFaq from '../../Component/PropertyDetailsFaq/PropertyDetailsFaq'

const PropertyDetails = () => {
  return (
    <div>
        <PropertyDetailsCard/>
        <PropertyDetailsProjectOverview/>
        <PropertyDetailsAmenities/>
        <PropertyDetailsMap/>
        <PropertyDetailsSimilarProjects/>
        <PropertyDetailsPeopleSay/>
        <PropertyDetailsFaq/>


    </div>
  )
}

export default PropertyDetails