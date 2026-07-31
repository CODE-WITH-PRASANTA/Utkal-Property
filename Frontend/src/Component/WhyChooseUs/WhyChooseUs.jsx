import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import './WhyChooseUs.css';

import whyChoose1Img from '../../assets/why-choose-1.webp';
import whyChoose2Img from '../../assets/why-choose-2.webp';
import whyChoose3Img from '../../assets/why-choose-3.webp';

export function WhyChooseUs() {
  const cards = [
    {
      id: 1,
      title: 'Thousands of posts every day',
      image: whyChoose1Img,
      description: 'The lists are always refreshed and updated constantly, you will never miss',
      linkText: 'See all listings',
      linkUrl: '#listings',
      icon: (
        <svg className="WhyChooseUs-svg-icon icon-posts" viewBox="0 0 80 80" fill="none" stroke="#18522e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <g className="doc-body">
            <rect x="22" y="10" width="30" height="42" rx="4" fill="#ffffff" />
            <path d="M22 10h30a4 4 0 0 1 4 4v34a4 4 0 0 1-4 4H22a4 4 0 0 1-4-4V14a4 4 0 0 1 4-4z" />
            <rect x="23" y="18" width="5" height="5" rx="1" />
            <line x1="32" y1="20.5" x2="46" y2="20.5" />
            <rect x="23" y="27" width="5" height="5" rx="1" />
            <line x1="32" y1="29.5" x2="46" y2="29.5" />
            <rect x="23" y="36" width="5" height="5" rx="1" />
            <line x1="32" y1="38.5" x2="42" y2="38.5" />
          </g>
          <g className="clock-badge">
            <circle cx="50" cy="48" r="11" fill="#ffffff" />
            <circle cx="50" cy="48" r="11" strokeWidth="2.5" />
            <polyline className="clock-hand" points="50 42 50 48 54 50" strokeWidth="2" />
            <line x1="50" y1="39" x2="50" y2="40.5" strokeWidth="1.5" />
            <line x1="50" y1="55.5" x2="50" y2="57" strokeWidth="1.5" />
            <line x1="41" y1="48" x2="42.5" y2="48" strokeWidth="1.5" />
            <line x1="57.5" y1="48" x2="59" y2="48" strokeWidth="1.5" />
          </g>
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Smart filter',
      image: whyChoose2Img,
      description: 'Find the right house for you in the shortest amount of time',
      linkText: 'See all listings',
      linkUrl: '#listings',
      icon: (
        <svg className="WhyChooseUs-svg-icon icon-filter" viewBox="0 0 80 80" fill="none" stroke="#18522e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <g className="filter-paper">
            <rect x="30" y="8" width="20" height="14" rx="2" fill="#ffffff" />
            <rect x="30" y="8" width="20" height="14" rx="2" />
            <line x1="35" y1="13" x2="45" y2="13" strokeWidth="2" />
            <line x1="35" y1="17" x2="41" y2="17" strokeWidth="2" />
          </g>
          <g className="funnel-body">
            <polygon points="18,24 62,24 45,44 45,58 35,58 35,44" fill="#ffffff" />
            <polygon points="18,24 62,24 45,44 45,58 35,58 35,44" />
          </g>
          <g className="arrow-left">
            <path d="M22 40v14m-4-4l4 4 4-4" />
          </g>
          <g className="arrow-right">
            <path d="M58 40v14m-4-4l4 4 4-4" />
          </g>
        </svg>
      ),
    },
    {
      id: 3,
      title: 'Great support',
      image: whyChoose3Img,
      description: 'After-sales care service, helpful advice to avoid scams',
      linkText: 'See all listings',
      linkUrl: '#listings',
      icon: (
        <svg className="WhyChooseUs-svg-icon icon-support" viewBox="0 0 80 80" fill="none" stroke="#18522e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <g className="support-box">
            <path d="M40 22l14 8v16l-14 8-14-8V30l14-8z" fill="#ffffff" />
            <path d="M40 22l14 8v16l-14 8-14-8V30l14-8z" />
            <path d="M40 22v32" />
            <path d="M26 30l14 8 14-8" />
          </g>
          <g className="orbit-ring">
            <path d="M40 12a28 28 0 0 1 25 14" />
            <path d="M67 25l0-7" />
            <path d="M67 25l-7 0" />
            <path d="M40 68a28 28 0 0 1-25-14" />
            <path d="M13 53l0 7" />
            <path d="M13 53l7 0" />
            <circle cx="68" cy="40" r="1.5" fill="#18522e" />
            <circle cx="12" cy="40" r="1.5" fill="#18522e" />
          </g>
        </svg>
      ),
    },
  ];

  return (
    <section className="WhyChooseUs-section">
      <div className="WhyChooseUs-container">
        
        <div className="WhyChooseUs-header">
          {/* Title styled matching second image: "Why" (Dark Navy) + "choose us" (Dark Green) */}
          <h2 className="WhyChooseUs-title">
            <span className="WhyChooseUs-title-dark">Why</span>{' '}
            <span className="WhyChooseUs-title-green">choose us</span>
          </h2>
          <p className="WhyChooseUs-subtitle">Save your time and effort with our tools</p>
        </div>

        <div className="WhyChooseUs-grid">
          {cards.map((card) => (
            <div key={card.id} className="WhyChooseUs-card">
              
              <div className="WhyChooseUs-icon-wrapper">
                {card.icon}
              </div>

              <h3 className="WhyChooseUs-card-title">{card.title}</h3>

              <div className="WhyChooseUs-img-wrapper">
                <img src={card.image} alt={card.title} className="WhyChooseUs-img" />
              </div>

              <p className="WhyChooseUs-card-desc">{card.description}</p>

              <a href={card.linkUrl} className="WhyChooseUs-link">
                <span>{card.linkText}</span>
                <FaArrowRight className="WhyChooseUs-arrow" />
              </a>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;