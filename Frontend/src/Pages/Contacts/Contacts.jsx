import React from 'react';
import { Helmet } from 'react-helmet-async';
import RealEstate from '../../Component/RealEstate/RealEstate';
import ContactForm from '../../Component/ContactForm/ContactForm';
import Companies from '../../Component/Companies/Companies';

const Contacts = () => {
  // Schema Markup for Local Real Estate Business in Bhubaneswar
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    'name': 'Utkal Property',
    'image': 'https://utkalproperty.com/assets/logo.png',
    'url': 'https://utkalproperty.com/contact',
    'telephone': '+919861566735',
    'priceRange': '₹₹₹',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Bhubaneswar',
      'addressRegion': 'Odisha',
      'addressCountry': 'IN'
    },
    'description':
      'Top premium apartments and flats dealer in Bhubaneswar. Verified luxury flats, residential plots, and duplexes for sale with legal clearance.'
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>
          Premium Apartments & Flats Dealer in Bhubaneswar | Contact Utkal Property
        </title>
        <meta
          name="description"
          content="Get in touch with the leading premium apartments and flats dealer in Bhubaneswar. Contact Utkal Property for verified 2/3/4 BHK luxury flats, plots, and duplexes."
        />
        <meta
          name="keywords"
          content="Premium Apartments and Flats Dealer in Bhubaneswar, luxury flats in Bhubaneswar, buy 3 BHK flat Bhubaneswar, real estate agent Bhubaneswar, property consultant contact"
        />
        <link rel="canonical" href="https://utkalproperty.com/contact" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://utkalproperty.com/contact" />
        <meta
          property="og:title"
          content="Premium Apartments & Flats Dealer in Bhubaneswar | Contact Us"
        />
        <meta
          property="og:description"
          content="Connect with Bhubaneswar's top real estate dealer for verified premium apartments, luxury flats, and residential properties."
        />
        <meta
          property="og:image"
          content="https://utkalproperty.com/assets/og-contact.jpg"
        />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Premium Apartments & Flats Dealer in Bhubaneswar"
        />
        <meta
          name="twitter:description"
          content="Connect with Bhubaneswar's top real estate dealer for verified premium apartments and luxury flats."
        />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* Semantic Page Content */}
      <main className="contact-page-wrapper">
        {/* Hidden H1 for SEO hierarchy if RealEstate component uses h2 */}
        <h1 className="sr-only" style={{ display: 'none' }}>
          Premium Apartments and Flats Dealer in Bhubaneswar - Contact Utkal Property
        </h1>

        <RealEstate />
        <ContactForm />
        <Companies />
      </main>
    </>
  );
};

export default Contacts;