import React from 'react'
import AboutBetterLives from '../../Component/AboutBetterLives/AboutBetterLives'
import AboutServicesWeOffer from '../../Component/AboutServicesWeOffer/AboutServicesWeOffer'
import TrustedBrands from '../../Component/TrustedBrands/TrustedBrands'
import WhyChooseUs from '../../Component/WhyChooseUs/WhyChooseUs'
import AboutContactSection from '../../Component/AboutContactSection/AboutContactSection'
import AboutMeetAgents from '../../Component/AboutMeetAgents/AboutMeetAgents'
import AboutFindDreamHome from '../../Component/AboutFindDreamHome/AboutFindDreamHome'
import AboutBreadcrume from '../../Component/AboutBreadcrume/AboutBreadcrume'

const AboutUs = () => {
  return (
    <div>
        <AboutBreadcrume/>
        <AboutBetterLives/>
        <AboutServicesWeOffer/>
        <TrustedBrands/>
        <WhyChooseUs/>
        <AboutContactSection/>
        <AboutMeetAgents/>
        <AboutFindDreamHome/>
    </div>
  )
}

export default AboutUs