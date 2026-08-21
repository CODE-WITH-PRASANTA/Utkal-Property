import React from 'react';
import { 
  HiOutlineBuildingOffice2, 
  HiOutlineCheckBadge 
} from 'react-icons/hi2';
import { 
  TbBuildingEstate, 
  TbSquareKey, 
  TbBuildingSkyscraper 
} from 'react-icons/tb';
import { 
  MdOutlineApartment 
} from 'react-icons/md';
import './HomeCompanies.css';

const HomeCompanies = () => {
  const builders = [
    {
      id: 1,
      icon: <TbBuildingSkyscraper className="HomeCompanies-logoIcon" />,
      title: 'Utkal Builders',
      subtitle: 'Luxury Properties & Apartments'
    },
    {
      id: 2,
      icon: <HiOutlineBuildingOffice2 className="HomeCompanies-logoIcon" />,
      title: 'Pramod Signature',
      subtitle: 'Premium Living Spaces'
    },
    {
      id: 3,
      icon: <TbBuildingEstate className="HomeCompanies-logoIcon" />,
      title: 'DN Homes',
      subtitle: 'Integrated Smart Townships'
    },
    {
      id: 4,
      icon: <HiOutlineCheckBadge className="HomeCompanies-logoIcon" />,
      title: 'Mani Tribhuvan',
      subtitle: 'Elite Residential Enclaves'
    },
    {
      id: 5,
      icon: <MdOutlineApartment className="HomeCompanies-logoIcon" />,
      title: 'Z Estates',
      subtitle: 'Modern Lifestyle Infrastructure'
    },
    {
      id: 6,
      icon: <TbSquareKey className="HomeCompanies-logoIcon" />,
      title: 'Falcon Realties',
      subtitle: 'Commercial & Luxury Housing'
    }
  ];

  return (
    <section className="HomeCompanies" aria-labelledby="real-estate-heading">
      <div className="HomeCompanies-container">
        
        {/* SEO-Optimized Header Section */}
        <div className="HomeCompanies-header">
          <span className="HomeCompanies-badgeTag">Trusted Developer Network</span>
          
          <h1 id="real-estate-heading" className="HomeCompanies-title">
            Best Real Estate Agency in Bhubaneswar — Partnered with <span className="highlight-green">Odisha's Top Builders</span>
          </h1>
          
          <p className="HomeCompanies-description">
            Connect with RERA-approved developers and premium residential projects across Bhubaneswar and Odisha.
          </p>
        </div>

        {/* Builder Brand Grid */}
        <div className="HomeCompanies-grid">
          {builders.map((builder) => (
            <article key={builder.id} className="HomeCompanies-card">
              <div className="HomeCompanies-iconWrapper" aria-hidden="true">
                {builder.icon}
              </div>
              <div className="HomeCompanies-textGroup">
                <span className="HomeCompanies-companyTitle">
                  {builder.title}
                </span>
                <span className="HomeCompanies-companySubtitle">
                  {builder.subtitle}
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HomeCompanies;