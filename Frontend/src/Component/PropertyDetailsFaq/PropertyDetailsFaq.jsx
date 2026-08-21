import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// Import local FAQ image
import faqimg from '../../assets/faqimg.webp';

import './PropertyDetailsFaq.css';

const PropertyDetailsFaq = ({ property }) => {
  // State to track the currently open accordion item (default to first item open)
  const [activeIndex, setActiveIndex] = useState(0);

  const propertyTitle = property?.title || property?.name || 'Rudransh South Kingdom';
  const propertyLocation = property?.address || property?.location || 'Madanpur, Bhubaneswar, Odisha';
  const propertyPrice = property?.price ? `₹ ${Number(property.price).toLocaleString('en-IN')}` : 'Available on Request';
  const propertyStatus = property?.status || property?.statusType || 'Ready to Move / Under Construction';
  const propertyRera = property?.rera || property?.reraId || 'Verified & ORERA Registered';
  const propertyBHK = property?.bedrooms ? `${property.bedrooms} BHK` : '3 BHK & 4 BHK Luxury Configurations';
  const propertyCarpet = property?.carpetArea || property?.carpet || '1,500 - 2,200 sq. ft.';
  const propertySuperBuiltUp = property?.totalArea || property?.superBuiltUp || '2,932 - 3,140 sq. ft.';
  const propertyParking = property?.parking || '2 Covered Parking Spaces';

  // Comprehensive SEO-optimized FAQ list incorporating all 12 target real estate keywords
  const faqs = [
    {
      id: 1,
      // Keyword 5: Best Property Consultant in Bhubaneswar
      question: `Where is ${propertyTitle} located and why consult the Best Property Consultant in Bhubaneswar?`,
      answer: `${propertyTitle} is located at ${propertyLocation}. Partnering with Utkal Property, recognized as the Best Property Consultant in Bhubaneswar, ensures 100% legal title verification, prime location benefits, and direct builder negotiations without hidden charges.`
    },
    {
      id: 2,
      // Keyword 1: Top Real estate agent in Bhubaneswar
      question: `How can I schedule a site visit with the Top Real estate agent in Bhubaneswar?`,
      answer: `You can schedule an on-ground site visit to ${propertyTitle} by calling +91 9861566735. As a Top Real estate agent in Bhubaneswar, Utkal Property arranges guided tours, master plan walk-throughs, and instant home loan assistance.`
    },
    {
      id: 3,
      // Keyword 2: Best Property dealers in Bhubaneswar
      question: `Is ${propertyTitle} RERA approved according to the Best Property dealers in Bhubaneswar?`,
      answer: `Yes, ${propertyTitle} is an ORERA-compliant development (${propertyRera}). The Best Property dealers in Bhubaneswar recommend verified RERA projects to safeguard buyer funds and ensure timely possession.`
    },
    {
      id: 4,
      // Keyword 4: best Flat dealers in Bhubaneswar
      question: `What is the price range of ${propertyTitle} offered by the best Flat dealers in Bhubaneswar?`,
      answer: `The pricing for ${propertyTitle} starts at ${propertyPrice}. As the best Flat dealers in Bhubaneswar, Utkal Property provides zero-brokerage deals on select inventory with customized installment schedules.`
    },
    {
      id: 5,
      // Keyword 3: best apartment dealers in Bhubaneswar
      question: `What are the super built-up and carpet areas verified by the best apartment dealers in Bhubaneswar?`,
      answer: `For ${propertyBHK} units in ${propertyTitle}, the super built-up area is approximately ${propertySuperBuiltUp} and the carpet area is around ${propertyCarpet}, curated by the best apartment dealers in Bhubaneswar.`
    },
    {
      id: 6,
      // Keyword 6: Top Real Estate Company in Bhubaneswar, Odisha
      question: `What is the current construction and possession status from the Top Real Estate Company in Bhubaneswar, Odisha?`,
      answer: `The current project status of ${propertyTitle} is "${propertyStatus}". Utkal Property, the Top Real Estate Company in Bhubaneswar, Odisha, provides real-time milestone updates and registry documentation for buyers.`
    },
    {
      id: 7,
      // Keyword 7: Premium Appartments and Flarts Delear in Bhubaneswar
      question: `What premium luxury amenities are available via this Premium Appartments and Flarts Delear in Bhubaneswar?`,
      answer: `As a trusted Premium Appartments and Flarts Delear in Bhubaneswar, Utkal Property confirms that ${propertyTitle} features modern clubhouses, high-speed elevators, 24/7 CCTV surveillance, landscaped jogging tracks, and ${propertyParking}.`
    },
    {
      id: 8,
      // Keyword 8: Best real estate company in Bhubaneswar
      question: `What is the estimated appreciation and rental ROI calculated by the Best real estate company in Bhubaneswar?`,
      answer: `Due to rapid infrastructure growth in ${propertyLocation}, the Best real estate company in Bhubaneswar projects steady annual capital appreciation and strong rental yields from IT professionals and corporate tenants.`
    },
    {
      id: 9,
      // Keyword 9: Best real estate company in Odisha
      question: `How far is ${propertyTitle} from Biju Patnaik International Airport and Bhubaneswar Railway Station?`,
      answer: `${propertyTitle} is approximately 15 km from Biju Patnaik International Airport and 18 km from Bhubaneswar Railway Station. The Best real estate company in Odisha highlights this seamless connectivity to NH-16 and major transit hubs.`
    },
    {
      id: 10,
      // Keyword 10: best real estate developer in Bhubaneswar
      question: `Who is the builder, and how does it compare to the best real estate developer in Bhubaneswar?`,
      answer: `${propertyTitle} is engineered by top-tier architectural consultants and built to match the high standards of the best real estate developer in Bhubaneswar, utilizing earthquake-resistant RCC frame structures and premium fittings.`
    },
    {
      id: 11,
      // Keyword 11: best real estate agency in Bhubaneswar
      question: `Can I get home loan pre-approval through the best real estate agency in Bhubaneswar?`,
      answer: `Yes. Working with the best real estate agency in Bhubaneswar like Utkal Property connects you with leading national banks (SBI, HDFC, ICICI, Axis Bank) for fast loan disbursements and competitive interest rates.`
    },
    {
      id: 12,
      // Keyword 12: top real estate brokers in Bhubaneswar
      question: `Why should home buyers and NRI investors consult top real estate brokers in Bhubaneswar before purchasing?`,
      answer: `Engaging top real estate brokers in Bhubaneswar gives buyers access to transparent deed verification, negotiation on spot-booking discounts, hassle-free registry, and tenant placement services across Odisha.`
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="PropertyDetailsFaq-wrapper" aria-labelledby="property-faq-heading">
      {/* Section Header */}
      <div className="PropertyDetailsFaq-header">
        <span className="PropertyDetailsFaq-badge">Buyer Advisory & Information</span>
        <h2 id="property-faq-heading" className="PropertyDetailsFaq-title">
          Frequently Asked Questions – <span className="highlight-text">{propertyTitle}</span>
        </h2>
        <p className="PropertyDetailsFaq-subtitle">
          Get verified answers on pricing, RERA approvals, floor configurations, and location connectivity from the <strong>Best Property Consultant in Bhubaneswar</strong>.
        </p>
        <div className="PropertyDetailsFaq-underline"></div>
      </div>

      <div className="PropertyDetailsFaq-content">
        {/* Left Column: FAQ Graphic & Quick Contact Box */}
        <div className="PropertyDetailsFaq-image-col">
          <div className="PropertyDetailsFaq-graphic-card">
            <img 
              src={faqimg} 
              alt={`${propertyTitle} - Verified FAQs by Top Real Estate Agent in Bhubaneswar`} 
              className="PropertyDetailsFaq-graphic"
              loading="lazy"
            />
            <div className="PropertyDetailsFaq-contact-card">
              <h4>Need More Details?</h4>
              <p>Speak directly with our property advisors for floor plans, brochure PDFs, and instant site visits.</p>
              <a href="tel:+919861566735" className="PropertyDetailsFaq-call-btn">
                📞 Call +91 9861566735
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Accordion List */}
        <div className="PropertyDetailsFaq-accordion-col" role="region" aria-label="Property Questions and Answers">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;
            return (
              <div 
                key={faq.id} 
                className={`PropertyDetailsFaq-item ${isActive ? 'active' : ''}`}
              >
                <div 
                  className="PropertyDetailsFaq-question-row" 
                  onClick={() => toggleAccordion(index)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isActive}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleAccordion(index);
                    }
                  }}
                >
                  <div className="PropertyDetailsFaq-number">
                    {faq.id < 10 ? `0${faq.id}` : faq.id}
                  </div>
                  <h3 className="PropertyDetailsFaq-question-text">{faq.question}</h3>
                  <div className="PropertyDetailsFaq-icon" aria-hidden="true">
                    {isActive ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </div>
                
                <div 
                  className="PropertyDetailsFaq-answer-wrapper"
                  style={{
                    maxHeight: isActive ? '300px' : '0px',
                    opacity: isActive ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <div className="PropertyDetailsFaq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PropertyDetailsFaq;