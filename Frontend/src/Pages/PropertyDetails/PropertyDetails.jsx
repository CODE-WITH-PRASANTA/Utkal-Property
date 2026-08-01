import { useLocation } from 'react-router-dom'
import PropertyDetailsCard from '../../Component/PropertyDetailsCard/PropertyDetailsCard'
import PropertyDetailsProjectOverview from '../../Component/PropertyDetailsProjectOverview/PropertyDetailsProjectOverview'
import PropertyDetailsAmenities from '../../Component/PropertyDetailsAmenities/PropertyDetailsAmenities'
import PropertyDetailsMap from '../../Component/PropertyDetailsMap/PropertyDetailsMap'
import PropertyDetailsSimilarProjects from '../../Component/PropertyDetailsSimilarProjects/PropertyDetailsSimilarProjects'
import PropertyDetailsPeopleSay from '../../Component/PropertyDetailsPeopleSay/PropertyDetailsPeopleSay'
import PropertyDetailsFaq from '../../Component/PropertyDetailsFaq/PropertyDetailsFaq'

const PropertyDetails = () => {
  const { state } = useLocation();
  const property = state?.property;

  return (
    <div>
        <PropertyDetailsCard property={property}/>
        <PropertyDetailsProjectOverview property={property}/>
        <PropertyDetailsAmenities property={property}/>
        <PropertyDetailsMap property={property}/>
        <PropertyDetailsSimilarProjects property={property}/>
        <PropertyDetailsFaq property={property}/>
        <PropertyDetailsPeopleSay property={property}/>



    </div>
  )
}

export default PropertyDetails