import React from 'react';
import { 
  MdOutlineHouse, 
  MdGraphicEq 
} from 'react-icons/md';
import { 
  HiOutlineCheckBadge, 
  HiOutlineBuildingOffice2 
} from 'react-icons/hi2';
import { 
  TbBuildingEstate, 
  TbSquareKey 
} from 'react-icons/tb';
import { 
  BiTrendingUp 
} from 'react-icons/bi';
import './HomeCompanies.css';

const HomeCompanies = () => {
  const companies = [
    {
      id: 1,
      icon: <TbBuildingEstate className="HomeCompanies-logoIcon" />,
      title: 'Real Estate',
      subtitle: 'your tagline goes here'
    },
    {
      id: 2,
      icon: <HiOutlineCheckBadge className="HomeCompanies-logoIcon" />,
      title: 'C O M P A N Y',
      subtitle: 'TAGLINE GOES HERE'
    },
    {
      id: 3,
      icon: <TbSquareKey className="HomeCompanies-logoIcon" />,
      title: 'Bauhouse',
      subtitle: 'REAL ESTATE'
    },
    {
      id: 4,
      icon: <MdGraphicEq className="HomeCompanies-logoIcon" />,
      title: 'Accusaf',
      subtitle: 'accounting & financial'
    },
    {
      id: 5,
      icon: <HiOutlineBuildingOffice2 className="HomeCompanies-logoIcon" />,
      title: 'COMPANY',
      subtitle: 'TAGLINE GOES HERE'
    },
    {
      id: 6,
      icon: <BiTrendingUp className="HomeCompanies-logoIcon" />,
      title: 'BUSINESS NAME',
      subtitle: 'TAGLINE HERE'
    }
  ];

  return (
    <div className="HomeCompanies">
      <div className="HomeCompanies-container">
        
        {/* Header Section */}
        <div className="HomeCompanies-header">
          <span className="HomeCompanies-badgeTag">Trusted Partners</span>
          <h2 className="HomeCompanies-title">
            Trusted by over <span className="highlight-green">150+ major companies</span> across India
          </h2>
        </div>

        {/* Company Logos Grid */}
        <div className="HomeCompanies-grid">
          {companies.map((company) => (
            <div key={company.id} className="HomeCompanies-card">
              <div className="HomeCompanies-iconWrapper">
                {company.icon}
              </div>
              <div className="HomeCompanies-textGroup">
                <span className="HomeCompanies-companyTitle">
                  {company.title}
                </span>
                <span className="HomeCompanies-companySubtitle">
                  {company.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default HomeCompanies;