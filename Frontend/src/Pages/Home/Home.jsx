import React from 'react'
import HomeBreadcrum from '../../Component/HomeBreadcrum/HomeBreadcrum'
import HomeCompanies from '../../Component/HomeCompanies/HomeCompanies'
import HomeFeaturedproperties from '../../Component/HomeFeaturedproperties/HomeFeaturedproperties'
import HomeRealEstate from '../../Component/HomeRealEstate/HomeRealEstate'
import Propertiesforsale from '../../Component/Propertiesforsale/Propertiesforsale'
import Propertiesforrent from '../../Component/Propertiesforrent/Propertiesforrent'
import HomeMeetagents from '../../Component/HomeMeetagents/HomeMeetagents'
import HomeContact from '../../Component/HomeContact/HomeContact'
import HomeBlog from '../../Component/HomeBlog/HomeBlog'
import HomeCustomer from '../../Component/HomeCustomer/HomeCustomer'

const Home = () => {
  return (
    <div>
        <HomeBreadcrum/>
        <HomeCompanies/>
        <HomeFeaturedproperties/>
        <HomeRealEstate/>
        <Propertiesforsale/>
        <Propertiesforrent/>
        <HomeMeetagents/>
        <HomeContact/>
        <HomeBlog/>
        <HomeCustomer/>
    </div>
  )
}

export default Home