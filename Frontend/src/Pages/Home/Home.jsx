import React from 'react'
import { Helmet } from 'react-helmet-async' // or 'react-helmet'
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
    <>
      <Helmet>
        {/* Standard SEO */}
        <title>Premium Apartments &amp; Flats Dealer in Bhubaneswar | Utkal Property</title>
        <meta
          name="description"
          content="Looking for premium apartments and flats in Bhubaneswar? Utkal Property offers quality residential properties in prime locations with trusted property assistance and expert guidance."
        />
        <meta
          name="keywords"
          content="Premium Apartments and Flats Dealer in Bhubaneswar, Top Real estate agent in Bhubaneswar, flats for sale in Bhubaneswar, luxury apartments Bhubaneswar, Utkal Property"
        />
        <link rel="canonical" href="https://utkalproperty.com/" />

        {/* Open Graph (Facebook / WhatsApp / LinkedIn) */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Utkal Property" />
        <meta
          property="og:title"
          content="Premium Apartments &amp; Flats Dealer in Bhubaneswar | Utkal Property"
        />
        <meta
          property="og:description"
          content="Explore premium flats, luxury apartments, and residential properties in prime locations of Bhubaneswar with top real estate experts at Utkal Property."
        />
        <meta property="og:url" content="https://utkalproperty.com/" />
        <meta property="og:image" content="https://utkalproperty.com/assets/og-home-banner.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Premium Apartments &amp; Flats Dealer in Bhubaneswar | Utkal Property"
        />
        <meta
          name="twitter:description"
          content="Find your dream home in Bhubaneswar. Trusted property assistance and expert guidance for premium flats &amp; apartments."
        />
        <meta name="twitter:image" content="https://utkalproperty.com/assets/og-home-banner.jpg" />

        {/* Structured Data (LocalBusiness & RealEstateAgent Schema) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "name": "Utkal Property",
            "image": "https://utkalproperty.com/assets/og-home-banner.jpg",
            "description": "Top Real estate agent & premium apartments dealer in Bhubaneswar offering verified residential flats and properties.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Bhubaneswar",
              "addressRegion": "Odisha",
              "addressCountry": "IN"
            },
            "url": "https://utkalproperty.com/"
          })}
        </script>
      </Helmet>

      <div>
        <HomeBreadcrum />
        <HomeCompanies />
        <HomeFeaturedproperties />
        <HomeRealEstate />
        <Propertiesforsale />
        <Propertiesforrent />
        <HomeMeetagents />
        <HomeContact />
        <HomeBlog />
        <HomeCustomer />
      </div>
    </>
  )
}

export default Home