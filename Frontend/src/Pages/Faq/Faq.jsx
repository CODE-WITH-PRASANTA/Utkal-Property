import React from 'react';
import { Helmet } from 'react-helmet-async';
import FaqBreadcrume from '../../Component/FaqBreadcrume/FaqBreadcrume';
import FrequentlyAskedQuestions from '../../Component/FrequentlyAskedQuestions/FrequentlyAskedQuestions';
import AboutFindDreamHome from '../../Component/AboutFindDreamHome/AboutFindDreamHome';
import './Faq.css';

const Faq = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateAgent",
        "@id": "https://utkalproperty.com/#organization",
        "name": "Utkal Property",
        "url": "https://utkalproperty.com",
        "telephone": "+919861566735",
        "description": "Utkal Property is the best property consultant in Bhubaneswar, offering verified residential plots, premium apartments, luxury villas, and commercial real estate advisory.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Plot No-55, Ln 2, Jagannath Vihar, Baramunda",
          "addressLocality": "Bhubaneswar",
          "addressRegion": "Odisha",
          "postalCode": "751003",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "20.2796",
          "longitude": "85.7950"
        },
        "priceRange": "₹₹ - ₹₹₹₹",
        "areaServed": [
          "Bhubaneswar",
          "Patia",
          "Pahala",
          "Baramunda",
          "Sundarpada",
          "Khandagiri",
          "Jayadev Vihar",
          "Infocity"
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://utkalproperty.com/faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Why is Utkal Property considered the best property consultant in Bhubaneswar?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Utkal Property provides 100% verified legal titles, RERA-approved residential flats, luxury duplexes, and prime commercial plots across Bhubaneswar. Our local expertise, transparent pricing, and end-to-end documentation make us the trusted real estate consultancy in Odisha."
            }
          },
          {
            "@type": "Question",
            "name": "Which localities in Bhubaneswar offer the highest real estate ROI?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Key growth corridors include Patia, Pahala (NH-16), Baramunda, Jayadev Vihar, Infocity, and Hanspal due to continuous infrastructure development, IT parks, and seamless connectivity."
            }
          },
          {
            "@type": "Question",
            "name": "How can I schedule a site visit with Utkal Property?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can visit our office at Plot No-55, Ln 2, Jagannath Vihar, Baramunda, Bhubaneswar, or call our expert advisors directly at +91 9861566735 for free consultations and guided site visits."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>FAQs | Best Property Consultant in Bhubaneswar | Utkal Property</title>
        <meta
          name="description"
          content="Have real estate questions? Contact Utkal Property, the best property consultant in Bhubaneswar at Baramunda. Expert guidance on RERA flats, plots, and duplexes. Call +91 9861566735."
        />
        <meta
          name="keywords"
          content="Best Property Consultant in Bhubaneswar, Real Estate Consultant Bhubaneswar, Utkal Property, Buy 2BHK 3BHK Flat in Bhubaneswar, Verified Plots in Baramunda, Real Estate Agents Bhubaneswar"
        />
        <link rel="canonical" href="https://utkalproperty.com/faq" />

        {/* Open Graph / Social Media Meta */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Utkal Property" />
        <meta property="og:title" content="FAQs - Utkal Property | Best Property Consultant in Bhubaneswar" />
        <meta
          property="og:description"
          content="Get trusted real estate guidance from Utkal Property, Baramunda, Bhubaneswar. Call +91 9861566735 for verified plots and apartments."
        />
        <meta property="og:url" content="https://utkalproperty.com/faq" />

        {/* JSON-LD Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <FaqBreadcrume />

      <main className="faq-page">
        {/* SEO Hero Header */}
        <section className="faq-page-hero">
          <div className="faq-page-hero-container">
            <span className="faq-page-badge">
              Trusted Real Estate Advisory
            </span>
            <h1 className="faq-page-title">
              Best Property Consultant in Bhubaneswar – FAQs
            </h1>
            <p className="faq-page-description">
              Looking for verified residential apartments, commercial spaces, or premium plots? 
              Get clear, expert answers from <strong>Utkal Property</strong>, your trusted real estate partner in Odisha.
            </p>

            {/* Quick Contact & NAP Badge */}
            <div className="faq-page-nap-badge">
              <span className="faq-page-nap-address">
                📍 Plot No-55, Ln 2, Jagannath Vihar, Baramunda, Bhubaneswar, 751003
              </span>
              <span className="faq-page-nap-divider">|</span>
              <a
                href="tel:+919861566735"
                className="faq-page-nap-phone"
              >
                📞 +91 9861566735
              </a>
            </div>
          </div>
        </section>

        {/* Core FAQ Component */}
        <div className="faq-page-component-wrapper">
          <FrequentlyAskedQuestions />
        </div>

        {/* About Component */}
        <AboutFindDreamHome />

        {/* Bottom CTA Section */}
        <section className="faq-page-cta">
          <div className="faq-page-cta-container">
            <h2 className="faq-page-cta-title">
              Ready to Find Your Dream Property in Bhubaneswar?
            </h2>
            <p className="faq-page-cta-subtitle">
              Speak directly with <strong>Utkal Property</strong> for personalized recommendations, on-ground site visits, and 100% legal title verification.
            </p>
            <div className="faq-page-cta-actions">
              <a
                href="tel:+919861566735"
                className="faq-page-btn-primary"
              >
                Call +91 9861566735
              </a>
              <a
                href="https://maps.google.com/?q=Jagannath+Vihar+Baramunda+Bhubaneswar"
                target="_blank"
                rel="noopener noreferrer"
                className="faq-page-btn-secondary"
              >
                Visit Our Baramunda Office
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Faq;