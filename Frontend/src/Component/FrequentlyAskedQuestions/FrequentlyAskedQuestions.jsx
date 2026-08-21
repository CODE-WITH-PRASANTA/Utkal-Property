import React, { useState } from 'react';
import { FiHelpCircle, FiPlus, FiMinus, FiPhoneCall, FiMapPin } from 'react-icons/fi';
import './FrequentlyAskedQuestions.css';
import supportAvatar from '../../assets/faq1.webp';

export function FrequentlyAskedQuestions() {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

const faqData = [
    {
      id: 1,
      left: {
        // Keyword 5: Best Property Consultant in Bhubaneswar
        question: 'Why choose Utkal Property as the Best Property Consultant in Bhubaneswar?',
        answer: 'Utkal Property is recognized as the Best Property Consultant in Bhubaneswar because we provide 100% verified titles, ORERA-approved inventory, transparent valuations, and end-to-end legal registry guidance across prime growth corridors like Patia, Pahala, and Baramunda.',
      },
      right: {
        // Keyword 1: Top Real estate agent in Bhubaneswar
        question: 'How do I select the Top Real estate agent in Bhubaneswar for buying a residential home?',
        answer: 'To choose the Top Real estate agent in Bhubaneswar, verify their local track record, market valuation accuracy, and RERA compliance. Utkal Property offers verified property listings, unbiased advisory, and hassle-free documentation for buyers.',
      },
    },
    {
      id: 2,
      left: {
        // Keyword 2: Best Property dealers in Bhubaneswar
        question: 'Who are the Best Property dealers in Bhubaneswar for verified residential plots?',
        answer: 'Utkal Property ranks among the Best Property dealers in Bhubaneswar, offering high-appreciation residential and commercial plots with clear BDA approvals, demarcation, and immediate registry in prime localities.',
      },
      right: {
        // Keyword 4: best Flat dealers in Bhubaneswar
        question: 'Where can I find the best Flat dealers in Bhubaneswar for 2BHK & 3BHK homes?',
        answer: 'If you want affordable to luxury housing, Utkal Property is among the best Flat dealers in Bhubaneswar, delivering ready-to-move and under-construction 2BHK, 3BHK, and 4BHK flats near key IT hubs and schools.',
      },
    },
    {
      id: 3,
      left: {
        // Keyword 3: best apartment dealers in Bhubaneswar
        question: 'How can the best apartment dealers in Bhubaneswar help find gated communities?',
        answer: 'As one of the best apartment dealers in Bhubaneswar, Utkal Property shortlists luxury gated communities equipped with modern clubhouses, 24/7 security, power backup, and landscaped open spaces at direct builder prices.',
      },
      right: {
        // Keyword 7: Premium Appartments and Flarts Delear in Bhubaneswar
        question: 'Why consult Utkal Property as your Premium Appartments and Flarts Delear in Bhubaneswar?',
        answer: 'As a leading Premium Appartments and Flarts Delear in Bhubaneswar, Utkal Property curates high-end penthouses, luxury duplex flats, and smart condominiums across Jayadev Vihar, Patia, and Khandagiri.',
      },
    },
    {
      id: 4,
      left: {
        // Keyword 6: Top Real Estate Company in Bhubaneswar, Odisha
        question: 'Which is the Top Real Estate Company in Bhubaneswar, Odisha for NRI property buyers?',
        answer: 'Utkal Property is a trusted Top Real Estate Company in Bhubaneswar, Odisha, assisting NRIs and outstation investors with virtual tours, legal title verification, power of attorney handling, and seamless tenant onboarding.',
      },
      right: {
        // Keyword 8: Best real estate company in Bhubaneswar
        question: 'What benefits come with choosing the Best real estate company in Bhubaneswar?',
        answer: 'Partnering with the Best real estate company in Bhubaneswar ensures zero hidden charges, bank-approved housing projects, verified land titles, and expert price negotiation for both residential and commercial investments.',
      },
    },
    {
      id: 5,
      left: {
        // Keyword 9: Best real estate company in Odisha
        question: 'What defines the Best real estate company in Odisha for commercial real estate?',
        answer: 'The Best real estate company in Odisha must offer prime highway-facing locations, transparent legal paperwork, and high rental yields. Utkal Property specializes in prime retail shops, office spaces, and commercial plots.',
      },
      right: {
        // Keyword 10: best real estate developer in Bhubaneswar
        question: 'How do you find projects from the best real estate developer in Bhubaneswar?',
        answer: 'Utkal Property partners exclusively with every certified and best real estate developer in Bhubaneswar, ensuring buyers access RERA-registered construction quality, timely possession guarantees, and modern township amenities.',
      },
    },
    {
      id: 6,
      left: {
        // Keyword 11: best real estate agency in Bhubaneswar
        question: 'Why work with the best real estate agency in Bhubaneswar for home loans and registry?',
        answer: 'Working with the best real estate agency in Bhubaneswar gives you access to complete banking tie-ups for easy home loan approval, encumbrance verification, and hassle-free property mutation support.',
      },
      right: {
        // Keyword 12: top real estate brokers in Bhubaneswar
        question: 'How do top real estate brokers in Bhubaneswar help get the best market deals?',
        answer: 'As top real estate brokers in Bhubaneswar, the Utkal Property team leverages on-ground market intelligence to negotiate competitive pricing, verify ownership deeds, and schedule on-demand site visits. Call +91 9861566735 to get started.',
      },
    },
  ];

  return (
    <section className="FAQ-wrapper" aria-label="Real Estate Frequently Asked Questions">
      <div className="FAQ-container">
        
        {/* Header Section */}
        <div className="FAQ-header">
          <span className="FAQ-badge">Real Estate Buying & Investment Guide</span>
          <h2 className="FAQ-title">
            Frequently Asked <span className="FAQ-highlight-text">Questions</span>
          </h2>
          <p className="FAQ-subtitle">
            Get expert insights on property investments, RERA approvals, and market valuations from the{' '}
            <strong>best property consultant in Bhubaneswar</strong>.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="FAQ-grid">
          {faqData.map((row) => (
            <React.Fragment key={row.id}>
              
              {/* Left Column Box */}
              <div 
                className={`FAQ-card ${openItems[`left-${row.id}`] ? 'FAQ-card-open' : ''}`}
                onClick={() => toggleItem(`left-${row.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleItem(`left-${row.id}`); }}
              >
                <div className="FAQ-card-content">
                  <div className="FAQ-question-row">
                    <div className="FAQ-icon-wrapper">
                      <FiHelpCircle className="FAQ-question-icon" />
                    </div>
                    <h3 className="FAQ-question-text">{row.left.question}</h3>
                  </div>
                  <div className="FAQ-toggle-icon">
                    {openItems[`left-${row.id}`] ? <FiMinus /> : <FiPlus />}
                  </div>
                </div>
                {openItems[`left-${row.id}`] && (
                  <div className="FAQ-answer-dropdown">
                    <p>{row.left.answer}</p>
                  </div>
                )}
              </div>

              {/* Right Column Box */}
              <div 
                className={`FAQ-card ${openItems[`right-${row.id}`] ? 'FAQ-card-open' : ''}`}
                onClick={() => toggleItem(`right-${row.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleItem(`right-${row.id}`); }}
              >
                <div className="FAQ-card-content">
                  <div className="FAQ-question-row">
                    <div className="FAQ-icon-wrapper">
                      <FiHelpCircle className="FAQ-question-icon" />
                    </div>
                    <h3 className="FAQ-question-text">{row.right.question}</h3>
                  </div>
                  <div className="FAQ-toggle-icon">
                    {openItems[`right-${row.id}`] ? <FiMinus /> : <FiPlus />}
                  </div>
                </div>
                {openItems[`right-${row.id}`] && (
                  <div className="FAQ-answer-dropdown">
                    <p>{row.right.answer}</p>
                  </div>
                )}
              </div>

            </React.Fragment>
          ))}
        </div>

        {/* Bottom Support Section */}
        <div className="FAQ-support-section">
          <div className="FAQ-support-avatar-wrapper">
            <img src={supportAvatar} alt="Utkal Property Advisory Team" className="FAQ-support-avatar" />
          </div>
          <h3 className="FAQ-support-title">Still have questions about real estate in Bhubaneswar?</h3>
          <p className="FAQ-support-subtitle">
            Speak directly with our property specialists for verified project portfolios, site visits, and price comparisons.
          </p>
          <div className="FAQ-support-buttons">
            <a href="tel:+919861566735" className="FAQ-btn-touch">
              <FiPhoneCall className="FAQ-btn-icon" />
              <span>Call +91 9861566735</span>
            </a>
            <a 
              href="https://maps.app.goo.gl/6V1DiPBNsYKihR418" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="FAQ-btn-documentation"
            >
              <FiMapPin className="FAQ-btn-icon" />
              <span>Visit Baramunda Office</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

export default FrequentlyAskedQuestions;