import React from 'react';
import './TrustedBrands.css';

// Brand Logo Imports
import brand1 from '../../assets/brand-1.webp';
import brand2 from '../../assets/brand-2.webp';
import brand3 from '../../assets/brand-3.webp';
import brand4 from '../../assets/brand-4.webp';
import brand5 from '../../assets/brand-5.webp';
import brand6 from '../../assets/brand-6.webp';

export function TrustedBrands() {
  const brands = [
    { id: 1, img: brand1, alt: 'Real Estate Logo' },
    { id: 2, img: brand2, alt: 'Company Logo' },
    { id: 3, img: brand3, alt: 'Bauhouse Real Estate' },
    { id: 4, img: brand4, alt: 'Accusaf Logo' },
    { id: 5, img: brand5, alt: 'Company Tagline Logo' },
    { id: 6, img: brand6, alt: 'Business Name Logo' },
  ];

  return (
    <section className="TrustedBrands-section">
      <div className="TrustedBrands-container">
        
        <div className="TrustedBrands-header-wrapper">
          <h2 className="TrustedBrands-heading">
            Trusted by over <span className="TrustedBrands-highlight">150+</span> major companies
          </h2>
          <div className="TrustedBrands-divider"></div>
        </div>

        <div className="TrustedBrands-grid">
          {brands.map((brand) => (
            <div key={brand.id} className="TrustedBrands-item">
              <div className="TrustedBrands-logo-box">
                <img
                  src={brand.img}
                  alt={brand.alt}
                  className="TrustedBrands-img"
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default TrustedBrands;