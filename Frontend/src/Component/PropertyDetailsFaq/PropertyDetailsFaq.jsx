import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// Import local FAQ image
import faqimg from '../../assets/faqimg.webp';

import './PropertyDetailsFaq.css';

const PropertyDetailsFaq = ({ property }) => {
  // State to track the currently open accordion item (default to first item open)
  const [activeIndex, setActiveIndex] = useState(0);

  // FAQ Data provided in the prompt
  const propertyTitle = property?.title || 'Rudransh South Kingdom';
  const propertyLocation = property?.address || 'Madanpur, Bhubaneswar';
  const faqs = [
    { id: 1, question: `Where is ${propertyTitle} Located?`, answer: `This property is located at ${propertyLocation}.` },
    { id: 2, question: `How Many Reserved Parking are In ${propertyTitle}?`, answer: `${property?.parking || '2'} parking space(s) are available.` },
    { id: 3, question: `Is ${propertyTitle} RERA Registered?`, answer: property?.rera ? `Yes, it is RERA registered with ID ${property.rera}.` : 'RERA information is available on request.' },
    { id: 4, question: `What is the Status of ${propertyTitle}?`, answer: `The current status of this property is ${property?.status || 'Under Construction'}.` },
    { id: 5, question: `What is the Price Range of ${propertyTitle}?`, answer: `The price is ${property?.price || 'available on request'}.` },
    { id: 6, question: `Expected Rental Return of ${propertyTitle}?`, answer: property?.pricePerSqft ? `The listed rate is ${property.pricePerSqft} per square foot.` : 'Rental return information is available on request.' },
    { id: 7, question: "How Far From Airport?", answer: "It is approximately 15 Km km from the airport." },
    { id: 8, question: "How Far From Railway Station?", answer: "It is approximately 18 Km km from the nearest railway station." },
    { id: 9, question: "What is the super built-up area for 4BHK?", answer: "The super built-up area for 4BHK is 3140.00 sq. ft." },
    { id: 10, question: "What is the carpet area for 4BHK?", answer: "The carpet area for 4BHK is 1500.00 sq. ft." },
    { id: 11, question: "How many balconies are available in 4BHK?", answer: "4BHK configuration includes 2 balcony/balconies." },
    { id: 12, question: "What is the super built-up area for 4BHK?", answer: "The super built-up area for 4BHK is 2932.00 sq. ft." },
    { id: 13, question: "What is the carpet area for 4BHK?", answer: "The carpet area for 4BHK is 1500.00 sq. ft." },
    { id: 14, question: "How many balconies are available in 4BHK?", answer: "4BHK configuration includes 2 balcony/balconies." },
    { id: 15, question: "What is the super built-up area for 5BHK?", answer: "The super built-up area for 5BHK is 2932.00 sq. ft." },
    { id: 16, question: "What is the carpet area for 5BHK?", answer: "The carpet area for 5BHK is 1500.00 sq. ft." },
    { id: 17, question: "How many balconies are available in 5BHK?", answer: "5BHK configuration includes 1 balcony/balconies." }
  ];

  const toggleAccordion = (index) => {
    // If clicking the same item, close it by setting to null. Otherwise, open the new index.
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="PropertyDetailsFaq-wrapper">
      {/* Section Header */}
      <div className="PropertyDetailsFaq-header">
        <h2 className="PropertyDetailsFaq-title">Frequently Asked Questions</h2>
        <div className="PropertyDetailsFaq-underline"></div>
      </div>

      <div className="PropertyDetailsFaq-content">
        {/* Left Column: FAQ Image Graphic */}
        <div className="PropertyDetailsFaq-image-col">
          <img 
            src={faqimg} 
            alt="FAQ Illustration" 
            className="PropertyDetailsFaq-graphic"
          />
        </div>

        {/* Right Column: Accordion List */}
        <div className="PropertyDetailsFaq-accordion-col">
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
                >
                  <div className="PropertyDetailsFaq-number">{faq.id}</div>
                  <h3 className="PropertyDetailsFaq-question-text">{faq.question}</h3>
                  <div className="PropertyDetailsFaq-icon">
                    {isActive ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </div>
                
                <div className="PropertyDetailsFaq-answer-wrapper">
                  <div className="PropertyDetailsFaq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsFaq;