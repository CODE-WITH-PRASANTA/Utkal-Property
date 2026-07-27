import React, { useState } from 'react';
import { FiHelpCircle, FiPlus, FiMinus, FiExternalLink } from 'react-icons/fi';
import './FrequentlyAskedQuestions.css';

// Replace with your actual team/avatar image path
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
        question: 'Vivamus at orci ut neque tincidunt convallis.',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at orci ut neque tincidunt convallis.',
      },
      right: {
        question: 'Nam nec justo congue, gravida velit et, viverra nibh.',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec justo congue.',
      },
    },
    {
      id: 2,
      left: {
        question: 'Cras ac purus sed lectus volutpat feugiat in et nunc.',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac purus sed lectus volutpat.',
      },
      right: {
        question: 'Fusce at arcu dapibus, fermentum diam sed, pretium mi.',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at arcu dapibus.',
      },
    },
    {
      id: 3,
      left: {
        question: 'Nulla facilisis lorem vel turpis hendrerit faucibus.',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis lorem vel turpis.',
      },
      right: {
        question: 'Pellentesque faucibus ante id nunc molestie elementum.',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque faucibus ante.',
      },
    },
    {
      id: 4,
      left: {
        question: 'Phasellus luctus nibh vitae leo malesuada tempus.',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus luctus nibh vitae.',
      },
      right: {
        question: 'Vestibulum malesuada eros et nisi ornare feugiat.',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum malesuada eros.',
      },
    },
    {
      id: 5,
      left: {
        question: 'Nulla non turpis non diam tincidunt convallis.',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non turpis non diam.',
      },
      right: {
        question: 'Curabitur eget risus venenatis risus consectetur tristique.',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget risus venenatis.',
      },
    },
    {
      id: 6,
      left: {
        question: 'Mauris ultrices nibh ac augue porta iaculis.',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultrices nibh ac augue.',
      },
      right: {
        question: 'Etiam nec dolor non nunc luctus sodales.',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec dolor non nunc.',
      },
    },
  ];

  return (
    <section className="FAQ-wrapper">
      <div className="FAQ-container">
        
        {/* Header Section */}
        <div className="FAQ-header">
          <h2 className="FAQ-title">Frequently asked questions</h2>
          <p className="FAQ-subtitle">
            Quick answers to questions you may have. Can't find what you're looking for? Check out our{' '}
            <a href="#docs" className="FAQ-doc-link">full documentation</a>
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

        {/* Bottom Support Section (Still have question?) */}
        <div className="FAQ-support-section">
          <div className="FAQ-support-avatar-wrapper">
            <img src={supportAvatar} alt="Support Team" className="FAQ-support-avatar" />
          </div>
          <h3 className="FAQ-support-title">Still have question?</h3>
          <p className="FAQ-support-subtitle">
            Can't find what you're looking for? Please{' '}
            <a href="#chat" className="FAQ-chat-link">chat to our friendly team</a>.
          </p>
          <div className="FAQ-support-buttons">
            <a href="#documentation" className="FAQ-btn-documentation">
              <span>Documentation</span>
              <FiExternalLink className="FAQ-btn-icon" />
            </a>
            <a href="#get-in-touch" className="FAQ-btn-touch">
              <span>Get in touch</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

export default FrequentlyAskedQuestions;