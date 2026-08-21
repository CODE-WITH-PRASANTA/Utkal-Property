<<<<<<< HEAD
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
=======
import React from 'react';
import { Helmet } from 'react-helmet-async'; // Use 'react-helmet' if you don't use react-helmet-async
import AboutBetterLives from '../../Component/AboutBetterLives/AboutBetterLives';
import AboutServicesWeOffer from '../../Component/AboutServicesWeOffer/AboutServicesWeOffer';
import TrustedBrands from '../../Component/TrustedBrands/TrustedBrands';
import WhyChooseUs from '../../Component/WhyChooseUs/WhyChooseUs';
import AboutContactSection from '../../Component/AboutContactSection/AboutContactSection';
import AboutMeetAgents from '../../Component/AboutMeetAgents/AboutMeetAgents';
import AboutFindDreamHome from '../../Component/AboutFindDreamHome/AboutFindDreamHome';

const AboutUs = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Utkal Property",
    "url": "https://utkalproperty.com/about",
    "description": "Learn about Utkal Property, the top real estate company and property consultant in Bhubaneswar, Odisha, delivering premium flats, apartments, and land advisory.",
    "mainEntity": {
      "@type": "RealEstateAgent",
      "name": "Utkal Property",
      "telephone": "+919861566735",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Plot No-55, Ln 2, Jagannath Vihar, Baramunda",
        "addressLocality": "Bhubaneswar",
        "addressRegion": "Odisha",
        "postalCode": "751003",
        "addressCountry": "IN"
      }
    }
  };
>>>>>>> b528116333291ad149e0ee8c11abab86e795c84f

  return (
    <>
      <Helmet>
        {/* Primary SEO Title & Description */}
        <title>About Us | Top Real Estate Company in Bhubaneswar, Odisha - Utkal Property</title>
        <meta
          name="description"
          content="Discover Utkal Property, the top real estate company in Bhubaneswar, Odisha. Meet our expert real estate agents and property consultants helping you find premium flats, apartments, and luxury homes."
        />

        {/* Targeted Keyword Matrix */}
        <meta
          name="keywords"
          content="Top Real Estate Company in Bhubaneswar Odisha, Best real estate company in Bhubaneswar, Best real estate company in Odisha, Top Real estate agent in Bhubaneswar, Best Property dealers in Bhubaneswar, Best Property Consultant in Bhubaneswar, best real estate agency in Bhubaneswar, top real estate brokers in Bhubaneswar, Premium Apartments and Flats Dealer in Bhubaneswar, best real estate developer in Bhubaneswar"
        />

        {/* Canonical Link */}
        <link rel="canonical" href="https://utkalproperty.com/about" />

        {/* Open Graph (Facebook / WhatsApp / LinkedIn) */}
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content="Utkal Property" />
        <meta property="og:title" content="About Utkal Property | Top Real Estate Company in Bhubaneswar, Odisha" />
        <meta
          property="og:description"
          content="Learn why Utkal Property is the most trusted real estate agency and property dealer for luxury apartments, duplexes, and plots in Bhubaneswar, Odisha."
        />
        <meta property="og:url" content="https://utkalproperty.com/about" />
        <meta property="og:image" content="https://utkalproperty.com/og-about-image.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us | Utkal Property - Top Real Estate Company in Bhubaneswar" />
        <meta
          name="twitter:description"
          content="Get to know the leading real estate agents and consultants behind Bhubaneswar's premier property solutions."
        />
        <meta name="twitter:image" content="https://utkalproperty.com/og-about-image.jpg" />

        {/* Page-Specific JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <main className="about-page">
        <AboutBetterLives />
        <AboutServicesWeOffer />
        <TrustedBrands />
        <WhyChooseUs />
        <AboutContactSection />
        <AboutMeetAgents />
        <AboutFindDreamHome />
      </main>
    </>
  );
};

export default AboutUs;