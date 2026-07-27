import React from 'react';
import './HomeCustomer.css';

// React Icons
import { BsChatLeftTextFill } from 'react-icons/bs';

// Testimonials Data
const TESTIMONIALS_DATA = [
  {
    id: 1,
    quote:
      '“ Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel tortor justo. Vestibulum vitae vulputate lacus. Aliquam sollicitudin mauris odio. Fusce egestas consectetur semper vulputate ”',
    name: 'Esther Howard',
    role: 'Internet Security Assistant',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 2,
    quote:
      '“ Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel tortor justo. Vestibulum vitae vulputate lacus. Aliquam sollicitudin mauris odio. Fusce egestas consectetur semper vulputate ”',
    name: 'Esther Howard',
    role: 'Internet Security Assistant',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 3,
    quote:
      '“ Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel tortor justo. Vestibulum vitae vulputate lacus. Aliquam sollicitudin mauris odio. Fusce egestas consectetur semper vulputate ”',
    name: 'Esther Howard',
    role: 'Internet Security Assistant',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];

const HomeCustomer = () => {
  return (
    <section className="HomeCustomer">
      <div className="HomeCustomer-container">
        
        {/* Section Header */}
        <div className="HomeCustomer-header">
          <h2 className="HomeCustomer-main-title">From our happy customers</h2>
          <p className="HomeCustomer-subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed tristique metus proin id lorem odio
          </p>
        </div>

        {/* 3 Testimonial Cards Grid */}
        <div className="HomeCustomer-grid">
          {TESTIMONIALS_DATA.map((item) => (
            <div key={item.id} className="HomeCustomer-card-wrapper">
              
              {/* White Floating Card */}
              <div className="HomeCustomer-card">
                <div className="HomeCustomer-badge-icon">
                  <BsChatLeftTextFill />
                </div>
                <p className="HomeCustomer-quote">{item.quote}</p>
              </div>

              {/* User Avatar & Name Details */}
              <div className="HomeCustomer-author-info">
                <div className="HomeCustomer-avatar-wrapper">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="HomeCustomer-avatar"
                  />
                </div>
                <h3 className="HomeCustomer-author-name">{item.name}</h3>
                <p className="HomeCustomer-author-role">{item.role}</p>
              </div>

            </div>
          ))}
        </div>

        {/* Rounded Bottom Banner */}
        <div className="HomeCustomer-footer-callout">
          <span>Become our next customer, and find your dream home </span>
          <a href="tel:314-555-0123" className="HomeCustomer-contact-highlight">
            Contact us: 314-555-0123
          </a>
        </div>

      </div>
    </section>
  );
};

export default HomeCustomer;