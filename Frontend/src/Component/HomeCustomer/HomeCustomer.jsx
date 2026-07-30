import React from 'react';
import './HomeCustomer.css';

// React Icons
import { BsChatLeftTextFill } from 'react-icons/bs';

// Testimonials Data localized for Utkal Property
const TESTIMONIALS_DATA = [
  {
    id: 1,
    quote:
      '“ Buying our 3BHK flat in Patia through Utkal Property was seamless! Their team guided us through legal verifications and bank loan processing with complete transparency. ”',
    name: 'Rajesh Kumar Swain',
    role: 'IT Professional, Bhubaneswar',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 2,
    quote:
      '“ Utkal Property helped us find a prime commercial rental space in Saheed Nagar for our office. Highly professional team, fast documentation, and excellent support. ”',
    name: 'Priya Das',
    role: 'Business Owner, Cuttack',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 3,
    quote:
      '“ We bought a residential plot near Puri Highway through Utkal Property. Their verified listings and honest advice made the entire deal hassle-free for my family. ”',
    name: 'Subhashish Mohanty',
    role: 'Government Officer, Puri',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];

const HomeCustomer = () => {
  return (
    <section className="HomeCustomer">
      <div className="HomeCustomer-container">
        
        {/* Section Header */}
        <div className="HomeCustomer-header">
          <span className="HomeCustomer-tag">Testimonials</span>
          <h2 className="HomeCustomer-main-title">From Our Happy Customers</h2>
          <p className="HomeCustomer-subtitle">
            See how Utkal Property has helped families and businesses find their ideal properties across Odisha
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

        {/* Rounded Bottom Callout Banner */}
        <div className="HomeCustomer-footer-callout">
          <span>Become our next customer, and find your dream property with Utkal Property. </span>
          <a href="tel:+919876543210" className="HomeCustomer-contact-highlight">
            Call Us: +91 98765 43210
          </a>
        </div>

      </div>
    </section>
  );
};

export default HomeCustomer;